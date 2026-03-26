package com.reviewkiosk.app;

import android.annotation.SuppressLint;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static final String KIOSK_URL = "https://reviewkiosk.vercel.app";

    private WebView webView;
    private DevicePolicyManager dpm;
    private ComponentName adminComponent;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        dpm = (DevicePolicyManager) getSystemService(DEVICE_POLICY_SERVICE);
        adminComponent = new ComponentName(this, KioskDeviceAdmin.class);

        // Keep screen on and go fullscreen
        getWindow().addFlags(
                WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                        | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
                        | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                        | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
        );
        hideSystemUI();

        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);

        // Configure WebView settings
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportMultipleWindows(false);
        settings.setAllowFileAccess(false);

        // Handle navigation and intent:// URLs for admin panel
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                String scheme = url.getScheme();

                // Handle intent:// URLs (used by admin panel for WiFi, Sound, etc.)
                if ("intent".equals(scheme)) {
                    try {
                        Intent intent = Intent.parseUri(url.toString(), Intent.URI_INTENT_SCHEME);
                        String action = intent.getAction();
                        if (action != null && action.startsWith("android.settings.")) {
                            // Temporarily exit lock task to allow settings access
                            stopLockTaskIfOwner();
                            startActivity(intent);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return true;
                }

                // Keep all other navigation internal
                return false;
            }
        });

        // Support fullscreen video
        webView.setWebChromeClient(new WebChromeClient() {
            private View fullscreenView;
            private CustomViewCallback fullscreenCallback;

            @Override
            public void onShowCustomView(View view, CustomViewCallback callback) {
                fullscreenView = view;
                fullscreenCallback = callback;
                setContentView(view);
                hideSystemUI();
            }

            @Override
            public void onHideCustomView() {
                if (fullscreenCallback != null) {
                    fullscreenCallback.onCustomViewHidden();
                }
                fullscreenView = null;
                fullscreenCallback = null;
                setContentView(R.layout.activity_main);
                webView = findViewById(R.id.webview);
                hideSystemUI();
            }
        });

        // Clear cache on fresh start to always get the latest deployment
        webView.clearCache(true);
        webView.clearHistory();

        // Start lock task mode if we're device owner
        startLockTaskIfOwner();

        // Load the kiosk URL
        webView.loadUrl(KIOSK_URL);
    }

    private void startLockTaskIfOwner() {
        if (dpm != null && dpm.isDeviceOwnerApp(getPackageName())) {
            // Whitelist this app for lock task mode
            dpm.setLockTaskPackages(adminComponent,
                    new String[]{getPackageName(), "com.android.settings"});
            startLockTask();
        }
    }

    private void stopLockTaskIfOwner() {
        if (dpm != null && dpm.isDeviceOwnerApp(getPackageName())) {
            try {
                stopLockTask();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void hideSystemUI() {
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideSystemUI();
            // Re-enter lock task if we left for settings
            startLockTaskIfOwner();
        }
    }

    @Override
    public void onBackPressed() {
        // Do nothing -- kiosk mode
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_HOME:
            case KeyEvent.KEYCODE_BACK:
            case KeyEvent.KEYCODE_APP_SWITCH:
            case KeyEvent.KEYCODE_VOLUME_UP:
            case KeyEvent.KEYCODE_VOLUME_DOWN:
            case KeyEvent.KEYCODE_MENU:
                return true;
            default:
                return super.onKeyDown(keyCode, event);
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_HOME:
            case KeyEvent.KEYCODE_BACK:
            case KeyEvent.KEYCODE_APP_SWITCH:
            case KeyEvent.KEYCODE_VOLUME_UP:
            case KeyEvent.KEYCODE_VOLUME_DOWN:
            case KeyEvent.KEYCODE_MENU:
                return true;
            default:
                return super.onKeyUp(keyCode, event);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        hideSystemUI();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}

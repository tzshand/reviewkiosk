package com.reviewkiosk.app;

import android.app.admin.DevicePolicyManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

/**
 * Starts the kiosk app automatically when the device boots up.
 * Also re-enforces preferred launcher status on every boot.
 */
public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(action)
                || "android.intent.action.QUICKBOOT_POWERON".equals(action)) {

            // Re-enforce this app as the default launcher on every boot
            enforceHomeLauncher(context);

            Intent launchIntent = new Intent(context, SplashActivity.class);
            launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(launchIntent);
        }
    }

    private void enforceHomeLauncher(Context context) {
        DevicePolicyManager dpm =
                (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        ComponentName admin = new ComponentName(context, KioskDeviceAdmin.class);

        if (dpm != null && dpm.isDeviceOwnerApp(context.getPackageName())) {
            IntentFilter homeFilter = new IntentFilter(Intent.ACTION_MAIN);
            homeFilter.addCategory(Intent.CATEGORY_HOME);
            homeFilter.addCategory(Intent.CATEGORY_DEFAULT);

            ComponentName splash = new ComponentName(context, SplashActivity.class);
            dpm.addPersistentPreferredActivity(admin, homeFilter, splash);
        }
    }
}

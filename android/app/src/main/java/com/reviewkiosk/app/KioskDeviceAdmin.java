package com.reviewkiosk.app;

import android.app.admin.DeviceAdminReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Device admin receiver for kiosk lock task mode.
 * When set as device owner, enables true kiosk lockdown
 * (blocks home, recents, status bar at the OS level).
 */
public class KioskDeviceAdmin extends DeviceAdminReceiver {

    @Override
    public void onEnabled(Context context, Intent intent) {
        // Device admin enabled
    }
}

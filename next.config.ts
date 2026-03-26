import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Android WebView sends x-requested-with header with the app package name.
        // Redirect those requests from / to the kiosk demo route.
        source: "/",
        destination: "/k/35968d04",
        has: [
          {
            type: "header",
            key: "x-requested-with",
            value: "com.reviewkiosk.app",
          },
        ],
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

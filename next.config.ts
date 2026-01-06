import type { NextConfig } from "next";
// @ts-ignore
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// @ts-ignore
export default withPWA(nextConfig);
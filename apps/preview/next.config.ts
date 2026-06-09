import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    basePath: "/dash-magazin",
  }),
  ...(process.env.NODE_ENV !== "production" && {
    basePath: "",
  }),
};

export default nextConfig;

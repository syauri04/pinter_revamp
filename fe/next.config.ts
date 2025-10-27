import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

// FOR SERVER
// root@pinter:~/project/pinter_revamp/fe# cat next.config.ts
// const nextConfig = {
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;

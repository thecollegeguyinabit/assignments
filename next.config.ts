import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports =  {  
  images:{
    remotePatterns: [{
      protocol: "https",
      hostname: "api.dicebear.com",
      port: "",
      pathname: "/9.x/personas/svg",
      search:"?seed=%7B%7Busername%7D%7D",
    }],
  unoptimized: true
  }
}

export default nextConfig;

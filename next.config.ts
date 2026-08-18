import type { NextConfig } from "next"

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/en/services",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/en/industries",
        permanent: true,
      },
      {
        source: "/industries/:slug",
        destination: "/en/industries/:slug",
        permanent: true,
      },
      {
        source: "/insights",
        has: [{ type: "query", key: "locale", value: "ar" }],
        destination: "/ar/insights",
        permanent: true,
      },
      {
        source: "/insights/:slug",
        has: [{ type: "query", key: "locale", value: "ar" }],
        destination: "/ar/insights/:slug",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/en/insights",
        permanent: true,
      },
      {
        source: "/insights/:slug",
        destination: "/en/insights/:slug",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig

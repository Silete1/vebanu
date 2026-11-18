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
  // Self-contained server bundle for the Docker image (deploy/Dockerfile); Vercel ignores it.
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // staging (site.brain.anu.ltd) and preview hosts stay out of search; only anu.ltd is indexed
        source: "/:path*",
        missing: [{ type: "host", value: "(www\\.)?anu\\.ltd" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]
  },
  async rewrites() {
    return {
      // Paths outside /en and /ar (and not files or framework assets) go to
      // the English catch-all, so they get the branded 404 page.
      beforeFiles: [
        {
          source: "/:segment((?!(?:en|ar|_next)(?:/|$))[^/.]+)/:path*",
          destination: "/en/:segment/:path*",
        },
      ],
    }
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

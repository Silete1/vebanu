import type { NextConfig } from "next"

// Everything comes from this origin. Inline scripts stay allowed: the pages are
// prerendered static HTML (no per-request nonce) and Next inlines its payload.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
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
  // every marketing page is prerendered (ensureStatic in app/[locale]/layout.tsx) and
  // links prefetch a shared route shell, so moving between pages is near-instant
  cacheComponents: true,
  partialPrefetching: true,
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
}

export default nextConfig

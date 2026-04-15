/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🐳 Optimization for Docker (keeps image size small)
  output: "standalone",

  // 🔐 Secure bridge to backend (Nginx doesn't need to see the backend)
  async rewrites() {
    return [
      {
        // When the browser hits /api/...
        source: '/api/:path*',
        // ...the Next.js server fetches it internally from the backend container.
        destination: 'http://backend:5001/:path*', 
      },
    ];
  },
};

module.exports = nextConfig;
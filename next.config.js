const withNextra = require("nextra")({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  defaultShowCopyCode: true,
  readingTime: true,
});

module.exports = withNextra({
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/thoughts-about-while-building-real-time-collaboration-tool",
        destination: "/websocket",
        permanent: false,
      },
      {
        source:
          "/migration-of-automated-deployment-process-with-serverless-framework-to-aws-amplify",
        destination: "/aws-amplify",
        permanent: false,
      },
      {
        source: "/use-github-actions-wisely-in-monorepo",
        destination: "/github-actions",
        permanent: false,
      },
    ];
  },
});

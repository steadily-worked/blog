/* eslint sort-keys: error */
const themeConfig = {
  components: {
    h1: ({ children }) => (
      <h1
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          backgroundImage: "linear-gradient(90deg,#7928CA,#FF0080)",
        }}
      >
        {children}
      </h1>
    ),
  },
  darkMode: true,
  dateFormatter: (date: Date) => `Last updated at ${date.toDateString()}`,
  footer: (
    <small style={{ display: "block", marginTop: "8rem" }}>
      <time>{new Date().getFullYear()}</time> © Sangmin Park .
      <a href="/feed.xml">RSS</a>
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  ),
}

export default themeConfig

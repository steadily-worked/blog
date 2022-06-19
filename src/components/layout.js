import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          social {
            github
            tistory
          }
        }
      }
    }
  `)

  const social = data.site.siteMetadata?.social
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <div>
          <StyledLink
            href={`https://github.com/${social?.github || ``}`}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </StyledLink>
          {` | `}
          <StyledLink
            href={`https://${social?.tistory || ``}.tistory.com`}
            target="_blank"
            rel="noreferrer"
          >
            Tistory
          </StyledLink>
          {` | `}
          <StyledLink href="mailto:iamsangminpark@gmail.com">
            iamsangminpark@gmail.com
          </StyledLink>
        </div>
        © {new Date().getFullYear()}, Built with
        {` `}
        <StyledLink href="https://www.gatsbyjs.com">Gatsby</StyledLink>
      </footer>
    </div>
  )
}

const StyledLink = styled.a`
  text-decoration: none;
`

export default Layout

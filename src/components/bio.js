import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            tistory
            instagram
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name},</strong> {author?.summary || null}
          {` `}
          <br />
          <Link
            href={`https://github.com/${social?.github || ``}`}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          {`  `}
          <Link
            href={`https://${social?.tistory || ``}.tistory.com`}
            target="_blank"
            rel="noreferrer"
          >
            Tistory
          </Link>
          {`  `}
          <Link
            href={`https://instagram.com/${social?.instagram || ``}`}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </Link>
        </p>
      )}
    </div>
  )
}

const Link = styled.a`
  text-decoration: none;
`

export default Bio

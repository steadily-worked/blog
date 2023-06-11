import Link from "next/link"
import React from "react"

type ImageWithCaptionProps = {
  title: string
  src: string
  alt: string
  link?: string
}

const ImageWithCaption = ({ title, src, alt, link }: ImageWithCaptionProps) => {
  if (title !== undefined) {
    return (
      <Link href={link} style={{ textDecoration: "none" }} target="_blank">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "default",
          }}
        >
          <img src={src} alt={alt} style={{ margin: "0" }} />
          <figcaption>{title}</figcaption>
        </div>
      </Link>
    )
  } else {
    return <img src={src} alt={alt} />
  }
}

export default ImageWithCaption

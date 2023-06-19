import styled from "styled-components"
import Link from "next/link"
import React from "react"
import Image from "next/image"

type ImageWithCaptionProps = {
  title: string
  src: string
  alt: string
  link?: string
  width: number
  height: number
}

const ImageWithCaption = ({
  title,
  src,
  alt,
  link,
  width,
  height,
}: ImageWithCaptionProps) => {
  if (title !== undefined) {
    return (
      <StyledLink href={link ?? '#'} target="_blank">
        <ImageWrapper>
          <Image
            src={src}
            alt={alt}
            style={{ margin: "0" }}
            width={width}
            height={height}
          />
          <figcaption>{title}</figcaption>
        </ImageWrapper>
      </StyledLink>
    )
  } else {
    return <Image src={src} alt={alt} />
  }
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
`

export default ImageWithCaption

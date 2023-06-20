import styled from "styled-components"
import React from "react"
import Image from "next/image"

type ImageWithCaptionProps = {
  title: string
  src: string
  alt: string
  width: number
  height: number
}

const ImageWithCaption = ({
  title,
  src,
  alt,
  width,
  height,
}: ImageWithCaptionProps) => {
  if (title !== undefined) {
    return (
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
    )
  } else {
    return <Image src={src} alt={alt} />
  }
}

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: default;
`

export default ImageWithCaption

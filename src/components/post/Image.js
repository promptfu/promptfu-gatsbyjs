import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

const Image = ({ alt, className, imgName }) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.allImageSharp.edges.find(
        edge => edge.node.fluid.originalName === imgName
      )
      if (!image) {
        return null
      }
      return (
        <Img
          fluid={image.node.fluid}
          alt={alt}
          className={`rounded ${className || ''}`}
          style={imgWrapperStyle}
          imgStyle={imgInnerStyle}
        />
      )
    }}
  />
)
export default Image

Image.propTypes = {
  alt: PropTypes.string,
  imgName: PropTypes.string,
}

Image.defaultProps = {
  alt: '',
  imgName: '',
}

const imgWrapperStyle = {
  height: `200px`,
}

const imgInnerStyle = {
  objectFit: `cover`,
  objectPosition: `center top`,
}

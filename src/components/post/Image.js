import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

const Image = ({ className, imgName }) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid {
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
          className={`rounded` + className}
          style={imgStyle}

        />
      )
    }}
  />
)
export default Image

Image.propTypes = {
  imgName: PropTypes.string,
}

Image.defaultProps = {
  imgName: '',
}

const imgStyle = {
  maxHeight: `360px`
}

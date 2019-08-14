import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { Jumbotron, Container } from "react-bootstrap"
import BackgroundImage from "gatsby-background-image"

const JumbotronHeader = ({ siteDescription, siteTitle }) => {
  const data = useStaticQuery(graphql`
    {
      file(name: {eq: "tetris"}) {
        childImageSharp {
          fluid(
            maxWidth: 4160,
            duotone: { highlight: "#30596e", shadow: "#292b2c", opacity: 50 },
            toFormat: PNG

          ) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Jumbotron fluid className="text-white p-0">
      <BackgroundImage
        id={`test`}
        fluid={data.file.childImageSharp.fluid}
        title="Jumbotron Background Image"
        className="p-5"
      >
        <Container>
          <h1>{siteTitle}</h1>
          <p>{siteDescription}</p>
        </Container>
      </BackgroundImage>
    </Jumbotron>
  )
}

JumbotronHeader.propTypes = {
  siteDescription: PropTypes.string,
  siteTitle: PropTypes.string,
}

JumbotronHeader.defaultProps = {
  siteDescription: ``,
  siteTitle: ``,
}

export default JumbotronHeader


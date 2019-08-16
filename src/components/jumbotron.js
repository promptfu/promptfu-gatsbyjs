import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { Jumbotron, Container } from "react-bootstrap"
import BackgroundImage from "gatsby-background-image"

const JumbotronHeader = ({ description, title }) => {
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
          <h1>{title}</h1>
          <p>{description}</p>
        </Container>
      </BackgroundImage>
    </Jumbotron>
  )
}

JumbotronHeader.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}

JumbotronHeader.defaultProps = {
  description: ``,
  title: ``,
}

export default JumbotronHeader


import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

import { Container, Row, Col, Navbar } from "react-bootstrap"
import {
  FaRegCopyright,
  FaGithub,
  // FaInstagram,
  FaTwitter,
} from "react-icons/fa"
import Img from "gatsby-image"

const Footer = ({ description, title }) => {
  const data = useStaticQuery(graphql`
    {
      navbarBrandImage: file(relativePath: { eq: "favicon.png" }) {
        childImageSharp {
          fixed(width: 38, height: 32) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)

  return (
    <footer className="bg-gradient-dark text-white py-3">
      <Container>
        <Row className="text-center">
          <Col>
            {/* Github */}
            <a
              href="https://github.com/promptfu"
              target="_blank"
              rel="noopener noreferrer"
              className="xpros-social-icon"
            >
              <FaGithub size={`2em`} className="text-white mx-2 grow" />
            </a>

            {/* Instagram */}
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="xpros-social-icon"
            >
              <FaInstagram
                size={`2em`}
                className="text-white mx-2 grow"
              />
            </a> */}

            {/* Twitter */}
            <a
              href="https://twitter.com/promptfu"
              target="_blank"
              rel="noopener noreferrer"
              className="xpros-social-icon"
            >
              <FaTwitter size={`2em`} className="text-white mx-2 grow" />
            </a>
          </Col>
        </Row>
        <Row>
          <Col lx={4} lg={4} md={3} sm={12} xs={12}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Navbar variant="dark" className="p-0">
                      <Navbar.Brand as={Link} to="/">
                        <Img
                          fixed={data.navbarBrandImage.childImageSharp.fixed}
                          loading="auto"
                          draggable={false}
                          className="d-inline-block align-top"
                          alt="Promptfu Logo"
                        />
                        {title}
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </Navbar>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{description}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <span>
                        {/* Copyright */}
                        <FaRegCopyright />
                        {/* Copyright */}
                        &nbsp;
                        {new Date().getFullYear()}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}

Footer.defaultProps = {
  description: ``,
  title: ``,
}

export default Footer

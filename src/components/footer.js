import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

import { Container, Row, Col, Navbar } from "react-bootstrap"
import Img from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  // faLinkedin,
  // faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faCopyright } from "@fortawesome/free-regular-svg-icons"

const Footer = ({ siteDescription, siteTitle }) => {
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
              <FontAwesomeIcon
                icon={faGithub}
                size="2x"
                className="text-white mx-2 grow"
              />
            </a>

            {/* Instagram */}
            {/* <a
              href="https://www.instagram.com/matthew.hassel/"
              target="_blank"
              rel="noopener noreferrer"
              className="xpros-social-icon"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
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
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className="text-white mx-2 grow"
              />
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
                        {siteTitle}
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </Navbar>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{siteDescription}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <span>
                        {/* Copyright */}
                        <FontAwesomeIcon icon={faCopyright} size="1x" />
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
  siteDescription: PropTypes.string,
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteDescription: ``,
  siteTitle: ``,
}

export default Footer

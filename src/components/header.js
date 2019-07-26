import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

import { Container, Nav, Navbar } from "react-bootstrap"
import Img from "gatsby-image"

const Header = ({ siteLinks, siteTitle }) => {
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
    <header>
      <Navbar collapseOnSelect expand="md" bg="gradient-dark" variant="dark">
        <Container>
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
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {siteLinks.map(link => (
                <Nav.Link
                  as={Link}
                  to={link.link}
                  title={link.title}
                  activeClassName="active"
                  key={link.link}
                >
                  {link.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteLinks: PropTypes.array,
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteLinks: [],
  siteTitle: ``,
}

export default Header

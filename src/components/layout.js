import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "components/header"
import Footer from "components/footer"
import ScrollUpButton from "components/scrollUpButton"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          description
          title
          links {
            name
            title
            link
          }
        }
      }
    }
  `)

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header
          links={data.site.siteMetadata.links}
          title={data.site.siteMetadata.title}
        />
        <ScrollUpButton />
        <main className="flex-grow-1 flex-shrink-1">{children}</main>
        <Footer
          description={data.site.siteMetadata.description}
          title={data.site.siteMetadata.title}
        />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

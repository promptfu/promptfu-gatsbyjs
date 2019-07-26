import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import ScrollUpButton from "./scrollUpButton"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          description
          title
          siteLinks {
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
          siteLinks={data.site.siteMetadata.siteLinks}
          siteTitle={data.site.siteMetadata.title}
        />
        <ScrollUpButton />
        <main className="flex-grow-1 flex-shrink-1">{children}</main>
        <Footer
          siteDescription={data.site.siteMetadata.description}
          siteTitle={data.site.siteMetadata.title}
        />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

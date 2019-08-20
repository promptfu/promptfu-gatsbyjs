import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  url: PropTypes.string,
}

const defaultProps = {
  links: [],
  url: ``,
}

const SiteNavigationElement = (props) => {
  console.log("SiteNavigationElement")
  console.log(props)
  return (
    <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(
          {
            "@context": "https://schema.org",
            "@graph": 
            [
              props.links.map((link, index) => {
                return (
                  {
                    "@context": "https://schema.org",
                    "@type":"SiteNavigationElement",
                    "@id":`${props.url}#header-nav`,
                    "name": `${link.name}`,
                    "url": `${props.url}${link.link}`
                  }
                )
              })
            ]
          }
        )}
      </script>
    </Helmet>
  </>
)
}

SiteNavigationElement.propTypes = propTypes
SiteNavigationElement.defaultProps = defaultProps
export default SiteNavigationElement

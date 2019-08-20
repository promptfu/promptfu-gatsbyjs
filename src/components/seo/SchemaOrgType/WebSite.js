import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
}

const defaultProps = {
  name: ``,
  url: ``,
}

const WebSite = (props) => {
  console.log("WebSite")
  console.log(props)
  return (
    <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(
          {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": `${props.name}`,
            "url": `${props.url}`,
          }
        )}
      </script>
    </Helmet>
  </>
)
}

WebSite.propTypes = propTypes
WebSite.defaultProps = defaultProps
export default WebSite

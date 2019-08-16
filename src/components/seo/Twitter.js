import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  username: PropTypes.string,
}

const defaultProps = {
  type: `summary_large_image`,
  username: null,

}

const Twitter = (props) => {
  console.log("Twitter")
  console.log(props)
  return (
    <Helmet>
      <meta name="twitter:card" content={props.type} />
      <meta name="twitter:site" content={`@${props.site}`} />
      {props.username && <meta name="twitter:creator" content={`@${props.username}`} />}
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </Helmet>
  )
}

Twitter.propTypes = propTypes
Twitter.defaultProps = defaultProps
export default Twitter
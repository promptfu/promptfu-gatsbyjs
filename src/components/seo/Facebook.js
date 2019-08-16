import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const propTypes = {
  author: PropTypes.string,
  description: PropTypes.string.isRequired,
  expiration_time: PropTypes.any,
  image: PropTypes.string.isRequired,
  locale: PropTypes.string,
  modified_time: PropTypes.any,
  published_time: PropTypes.any,
  section: PropTypes.string,
  site: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired,
}

const defaultProps = {
  author: ``,
  expiration_time: null,
  locale: `en_US`,
  modified_time: null,
  published_time: null,
  section: ``,
  tags: [],
  type: `website`,
}

const Facebook = (props) => {

  const articleMeta = (
    <>
      <meta property="article:published_time" content={props.published_time} />
      {props.modified_time && <meta property="article:modified_time" content={props.modified_time} />}
      {props.expiration_time && <meta property="article:expiration_time" content={props.expiration_time} />}
      <meta property="article:author" content={props.author} />
      <meta property="article:section" content={props.section} />
      <meta property="article:tag" content={props.tags} />
    </>
  )

  return (
    <Helmet>
      {/* Opengraph tags */}
      <meta property="og:type" content={props.type} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:alt" content={props.description} />
      <meta property="og:locale" content={props.locale} />
      <meta property="og:url" content={props.url} />
      <meta property="og:site_name" content={props.site} />
      {props.type === 'article' ? articleMeta : null}
    </Helmet>
  )
}

Facebook.propTypes = propTypes
Facebook.defaultProps = defaultProps
export default Facebook

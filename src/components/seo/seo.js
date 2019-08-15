import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import {graphql, StaticQuery } from "gatsby"

const propTypes = {
  author: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  location: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

const defaultProps = {
  author: '',
  description: '',
  image: '',
  keywords: [],
  lang: 'en',
  location: '',
  meta: [],
  title: '',
}

class SEO extends React.Component {
  constructor(props) {
    super(props)
    console.log("SEO")
    console.log(this.props)

    this.state = {

    }

    this.getImageUrl = this.getImageUrl.bind(this)
  }

  getImageUrl(imgName) {
    const image = this.props.data.allImageSharp.edges.find(
      edge => edge.node.fixed.originalName === imgName
    )
    if (!image) {
      return
    }
    return image.node.fixed.src
  }

  render() {

    const { site } = this.props.data
    const defaultTitle = `${site.siteMetadata.title} | ${site.siteMetadata.description}`
    const titleTemplate = `%s | ${site.siteMetadata.title}`

    const description = this.props.description || site.siteMetadata.description
    const keywords = this.props.keywords
    const imageUrl = this.props.image ? this.getImageUrl(this.props.image) : this.getImageUrl(this.props.data.site.siteMetadata.siteImage)
    const lang = this.props.lang
    const location = this.props.location
    // const meta = this.props.
    const siteTitle = site.siteMetadata.title
    const siteUrl = site.siteMetadata.siteUrl
    const title = this.props.title

    const twitterSite = site.siteMetadata.social.twitter.site

    return(
      <Helmet
        defaultTitle={defaultTitle}
        titleTemplate={titleTemplate}
      >
        <html lang={lang} />
        <title>{title}</title>
        {/* General tags */}

        <meta name="description" content={description} />
        {keywords.length > 0 ? <meta name="keywords" content={keywords.join(`, `)} /> : ''}
        <meta name="image" content={`${siteUrl}${imageUrl}`} />

        {/* Opengraph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${imageUrl}`} />
        <meta property="og:url" content={`${siteUrl}${location}`} />
        <meta property="og:site_name" content={siteTitle} />

        {/* Twitter cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={`@${twitterSite}`} />
        {/* <meta name="twitter:creator" content="" /> */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${imageUrl}`} />
      </Helmet>
    )
  }
}

SEO.propTypes = propTypes
SEO.defaultProps = defaultProps

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        description
        siteImage
        siteUrl
        social {
          twitter {
            site
          }
        }
        title
      }
    }
    allImageSharp {
      edges {
        node {
          fixed(width: 1200, height: 630) {
            originalName
            src
          }
        }
      }
    }
  }
`


export default props => (
  <StaticQuery
    query={detailsQuery}
    render={ data => {
      return (
        <SEO data={data} {...props} />
      )
    }}
  />
)

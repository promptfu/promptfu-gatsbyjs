import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql, StaticQuery } from "gatsby"
import Facebook from "./Facebook"
import Twitter from "./Twitter"
import { PageType } from "./PageType"
import { getImageUrl } from "utils/getImageUrl"
import { Article, WebPage } from "./SchemaOrgType"

const propTypes = {
  author: PropTypes.string,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        defaultDescription: PropTypes.string.isRequired,
        defaultImage: PropTypes.string.isRequired,
        defaultTitle: PropTypes.string.isRequired,
        defaultUrl: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        social: PropTypes.shape({
          facebook: PropTypes.shape({
            language: PropTypes.string,
            name: PropTypes.string.isRequired,
            site: PropTypes.string,
          }),
          twitter: PropTypes.shape({
            name: PropTypes.name,
            site: PropTypes.string.isRequired,
          }),
        }),          
        url: PropTypes.string.isRequired,
      }),
    }),
  }),
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  // node: PropTypes.any,
  pathname: PropTypes.string,
  pageType: PropTypes.string,
  title: PropTypes.string,
  article: PropTypes.bool,
}

const defaultProps = {
  author: ``,
  description: ``,
  image: ``,
  keywords: [],
  pathname: ``,
  pageType: PageType.WEBPAGE,
  title: ``,
  article: false,
}

const SEO = (props) => {
  console.log("SEO")
  console.log(props)
  
  const {
    siteMetadata: {
      defaultDescription,
      defaultImage,
      defaultTitle,
      language,
      social,
      url,
    },
  } = props.data.site

  const seo = {
    description: props.description || defaultDescription,
    image: props.image || defaultImage,
    title: props.title ? `${props.title} | ${defaultTitle}` : `${defaultTitle} | ${defaultDescription}`,
    url: `${url}${props.pathname || ''}`
  }

  const renderSchemaOrg = (pageType) => {
    switch(pageType) {
      case PageType.ARTICLE:
        return (
          <Article
          />
        )
      default:
        return (
          <WebPage
          />          
        )
    }

  }

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <html lang={language} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={`${url}${getImageUrl(seo.image)}`} />
        {props.keywords.length > 0 ? <meta name="keywords" content={props.keywords.join(`, `)} /> : ''}
      </Helmet>

      <Facebook
        description={seo.description}
        image={`${url}${getImageUrl(seo.image)}`}
        locale={social.facebook.language}
        site={social.facebook.name}
        title={seo.title}
        type={props.article ? 'article' : 'website'}
        url={seo.url}
      />

      <Twitter
        description={seo.description}
        image={`${url}${getImageUrl(seo.image)}`}
        site={social.twitter.site}
        title={seo.title}
      />

      {renderSchemaOrg(props.pageType)}
    </>
  )
}

SEO.propTypes = propTypes
SEO.defaultProps = defaultProps
export default props => (
  <StaticQuery
    query={query}
    render={data => <SEO data={data} {...props} />}
  />
)

const query = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        defaultDescription: description
        defaultImage: image
        defaultTitle: title
        defaultUrl: url
        language
        social {
          facebook {
            language
            name
            site
          }
          twitter {
            name
            site
          }
        }
        url
      }
    }
  }
`

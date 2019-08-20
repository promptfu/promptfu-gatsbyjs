import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql, StaticQuery } from "gatsby"
import Facebook from "./Facebook"
import Twitter from "./Twitter"
import { PageType } from "./PageType"
import { getImageUrl } from "utils/getImageUrl"
import {
  Article,
  Blog,
  BlogPost,
  SiteNavigationElement,
  WebPage,
  WebSite
} from "./SchemaOrgType"

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
  dateCreated: PropTypes.string,
  dateModified: PropTypes.string,
  datePublished: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  node: PropTypes.any,
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
  node: {},
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
      defaultUrl,
      language,
      links,
      social,
      url,
    },
  } = props.data.site

  const seo = {
    description: props.description || defaultDescription,
    image: props.image || defaultImage, // node image or props.image or (lastly) defaultImage 
    title: props.title ? `${props.title} | ${defaultTitle}` : `${defaultTitle} | ${defaultDescription}`,
    url: `${url}${props.pathname || ''}`
  }

  const renderSchemaOrgSwitch = (pageType) => {
    console.log("MY PAGE TYPE: ", pageType)
    switch(pageType) {
      case PageType.ARTICLE:
        return (
          <Article
            dateCreated={props.dateCreated}
            dateModified={props.dateModified}
            datePublished={props.datePublished}
            description={seo.description}
            headline={seo.title}
            image={`${url}${getImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${url}${getImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={defaultUrl}
            url={seo.url}
          />
        )
      case PageType.BLOG:
        return (
          <Blog
            // dateCreated={props.dateCreated}
            // dateModified={props.dateModified}
            // datePublished={props.datePublished}
            description={seo.description}
            headline={seo.title}
            image={`${url}${getImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${url}${getImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={defaultUrl}
            url={seo.url}
          />
        )
      case PageType.BLOGPOST:
        return (
          <BlogPost
            dateCreated={props.dateCreated}
            dateModified={props.dateModified}
            datePublished={props.datePublished}
            description={seo.description}
            headline={seo.title}
            image={`${url}${getImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${url}${getImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={defaultUrl}
            url={seo.url}
          />
        )
      default:
        return (
          <WebPage
            // dateCreated={props.dateCreated}
            // dateModified={props.dateModified}
            // datePublished={props.datePublished}
            description={seo.description}
            headline={seo.title}
            image={`${url}${getImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${url}${getImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={defaultUrl}
            url={seo.url}
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

      <WebSite name={defaultTitle} url={defaultUrl} />
      <SiteNavigationElement links={links} url={defaultUrl} />
      {renderSchemaOrgSwitch(props.pageType)}
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
  query {
    site {
      ...SiteInformation
    }
  }
`

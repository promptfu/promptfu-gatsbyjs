import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql, StaticQuery } from "gatsby"
import Facebook from "./Facebook"
import Twitter from "./Twitter"
import { PageType } from "./PageType"
import { GetImageUrl } from "utils/GetImageUrl"
import {
  Article,
  Blog,
  BlogPost,
  BreadcrumbList,
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
        siteUrl: PropTypes.string.isRequired,
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
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
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
  breadcrumbs: [],
}

const SEO = (props) => {

  const {
    siteMetadata: {
      defaultDescription,
      defaultImage,
      defaultTitle,
      siteUrl,
      language,
      links,
      social,
    },
  } = props.data.site

  const seo = {
    description: props.description || defaultDescription,
    image: props.image || defaultImage, // node image or props.image or (lastly) defaultImage 
    title: props.title ? `${props.title} | ${defaultTitle}` : `${defaultTitle} | ${defaultDescription}`,
    url: `${siteUrl}${props.pathname || ''}`
  }

  const renderSchemaOrgSwitch = (pageType) => {
    switch(pageType) {
      case PageType.ARTICLE:
        return (
          <Article
            dateCreated={props.dateCreated}
            dateModified={props.dateModified}
            datePublished={props.datePublished}
            description={seo.description}
            headline={seo.title}
            image={`${siteUrl}${GetImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${siteUrl}${GetImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={siteUrl}
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
            image={`${siteUrl}${GetImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${siteUrl}${GetImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={siteUrl}
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
            image={`${siteUrl}${GetImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${siteUrl}${GetImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={siteUrl}
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
            image={`${siteUrl}${GetImageUrl(seo.image)}`}
            mainEntityOfPage={seo.url}
            name={seo.title}
            orgImageUrl={`${siteUrl}${GetImageUrl(defaultImage)}`}
            orgName={defaultTitle}
            orgUrl={siteUrl}
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
        <meta name="image" content={`${siteUrl}${GetImageUrl(seo.image)}`} />
        {props.keywords.length > 0 ? <meta name="keywords" content={props.keywords.join(`, `)} /> : ''}
        <link rel="canonical" href={seo.url} />
      </Helmet>

      <Facebook
        description={seo.description}
        image={`${siteUrl}${GetImageUrl(seo.image)}`}
        locale={social.facebook.language}
        site={social.facebook.name}
        title={seo.title}
        type={props.article ? 'article' : 'website'}
        url={seo.url}
      />

      <Twitter
        description={seo.description}
        image={`${siteUrl}${GetImageUrl(seo.image)}`}
        site={social.twitter.site}
        title={seo.title}
        username={props.author || ``}
      />

      <WebSite name={defaultTitle} url={siteUrl} />
      <SiteNavigationElement links={links} url={siteUrl} />
      {props.breadcrumbs && props.breadcrumbs.length > 0 && (
        <BreadcrumbList
          items={props.breadcrumbs.map(crumb => ({
            name: crumb.name,
            url: `${siteUrl}${crumb.path}`,
          }))}
        />
      )}
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

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { getSchemaOrgAuthor } from "utils/getSchemaOrgAuthor"

const propTypes = {
  alternativeHeadline: PropTypes.string,
  author: PropTypes.string,
  // dateCreated: PropTypes.string.isRequired,
  // dateModified: PropTypes.string.isRequired,
  // datePublished: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isFamilyFriendly: PropTypes.bool,
  language: PropTypes.string,
  mainEntityOfPage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  orgImageUrl: PropTypes.string.isRequired,
  orgName: PropTypes.string.isRequired,
  orgUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

const defaultProps = {
  alternativeHeadline: ``,
  author: ``,
  isFamilyFriendly: true,
  language: `en-US`,
}

const WebPage = (props) => {
  console.log("WebPage")
  return (
    <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(
          {
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": `${props.headline}`,
            "description": `${props.description}`,
            "image": `${props.image}`,
            "url": `${props.url}`,
            "headline": `${props.headline}`,
            "alternativeHeadline": `${props.alternativeHeadline}`,
            // "dateCreated": `${props.dateCreated}`,
            // "datePublished": `${props.datePublished}`,
            // "dateModified": `${props.dateModified}`,
            "inLanguage": `${props.language}`,
            "isFamilyFriendly": `${props.isFamilyFriendly}`,
            copyrightYear: `${new Date().getFullYear()}`,
            // copyrightHolder: getSchemaOrgAuthor(props.author),
            author: getSchemaOrgAuthor(props.author),
            "publisher": {
              "@type": "Organization",
              "name": `${props.orgName}`,
              "url": `${props.orgUrl}`,
              "logo": {
                "@type": "ImageObject",
                "url": `${props.orgImageUrl}`,
              }
            },
            "mainEntityOfPage": `${props.mainEntityOfPage}`,
          }  
        )}
      </script>
    </Helmet>
  </>
)
}

WebPage.propTypes = propTypes
WebPage.defaultProps = defaultProps
export default WebPage

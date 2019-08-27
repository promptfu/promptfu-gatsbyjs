import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { getSchemaOrgAuthor } from "utils/getSchemaOrgAuthor"

const propTypes = {
  alternativeHeadline: PropTypes.string,
  author: PropTypes.string,
  dateCreated: PropTypes.string.isRequired,
  dateModified: PropTypes.string.isRequired,
  datePublished: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isFamilyFriendly: PropTypes.bool,
  lanugage: PropTypes.string,
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

const BlogPost = (props) => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context":"http://schema.org",
              "@type": "BlogPosting",
              "name": `${props.name}`,
              "description": `${props.description}`,
              "image": `${props.image}`,
              "url": `${props.url}`,
              "headline": `${props.headline}`,
              "alternativeHeadline": `${props.alternativeHeadline}`,
              "dateCreated": `${props.datePublished}`,
              "datePublished": `${props.datePublished}`,
              "dateModified": `${props.dateModified}`,
              "inLanguage": `${props.language}`,
              "isFamilyFriendly": `${props.isFamilyFriendly}`,
              "copyrightYear": `${new Date().getFullYear()}`,
              // "copyrightHolder": getSchemaOrgAuthor(props.author),
              // "contentLocation": {
              //   "@type": "Place",
              //   "name": "Delray Beach, FL"
              // },
              "author": getSchemaOrgAuthor(props.author),
              "publisher": {
                "@type": "Organization",
                "name": `${props.orgName}`,
                "url": `${props.orgUrl}`,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${props.orgImageUrl}`,
                }
              },
              // "sponsor": {
              //   "@type": "Organization",
              //   "name": "Acme Widgets",
              //   "url": "https://example.com",
              //   "logo": {
              //     "@type": "ImageObject",
              //     "url": "http://www.example.com/logo.png"
              //   }
              // },
              "mainEntityOfPage": `${props.mainEntityOfPage}`,
              // "keywords": [
              //   "keyword1",
              //   "keyword2",
              //   "keyword3",
              //   "keyword4"
              // ],
              // "genre":["SEO","JSON-LD"],
              // "articleSection": "Uncategorized posts",
              // "articleBody": "Paste the body of your content in here in plaintext"
            }  
          )}
        </script>
      </Helmet>
    </>
  )
}

BlogPost.propTypes = propTypes
BlogPost.defaultProps = defaultProps
export default BlogPost

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const propTypes = {
  author: PropTypes.string,
  dateModified: PropTypes.string,
  datePublished: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  language: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
}

const defaultProps = {
  author: ``,
  dateModified: null,
  datePublished: null,
  description: ``,
  image: ``,
  language: ``,
  title: ``,
  url: ``,
}

const WebPage = (props) => {
  console.log("WebPage")
  return (
    <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(
          {
            '@context': 'http://schema.org',
            '@type': 'WebPage',
            url: props.url,
            headline: props.title,
            inLanguage: props.language,
            mainEntityOfPage: props.url,
            description: props.description,
            name: props.title,
            author: {
              '@type': 'Person',
              name: props.author,
            },
            copyrightHolder: {
              '@type': 'Person',
              name: props.author,
            },
            copyrightYear: `${new Date().getFullYear()}`,
            creator: {
              '@type': 'Person',
              name: props.author,
            },
            publisher: {
              '@type': 'Person',
              name: props.author,
            },
            datePublished: props.datePublished,
            dateModified: props.dateModified,
            image: {
              '@type': 'ImageObject',
              url: props.image,
            },
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

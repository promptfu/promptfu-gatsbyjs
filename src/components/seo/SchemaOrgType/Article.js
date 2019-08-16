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

const Article = (props) => {
  console.log("Article")
  console.log(props)
  return (
      <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(
            {
              '@context': 'http://schema.org',
              '@type': 'Article',
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
                '@type': 'Organization',
                name: props.author,
                logo: {
                  '@type': 'ImageObject',
                  url: props.image,
                },
              },
              datePublished: props.datePublished,
              dateModified: props.dateModified,
              description: props.description,
              headline: props.title,
              inLanguage: props.language,
              url: props.url,
              name: props.title,
              image: {
                '@type': 'ImageObject',
                url: props.image,
              },
              mainEntityOfPage: props.url,
            }  
          )}
        </script>
      </Helmet>
    </>
  )
}

Article.propTypes = propTypes
Article.defaultProps = defaultProps
export default Article

import { useStaticQuery, graphql } from "gatsby"
import { getImageUrl } from "utils/getImageUrl"


export function getSchemaOrgAuthor(author) {
  const data = useStaticQuery(siteInformation)
  
  const {
    siteMetadata: {
      defaultImage,
      defaultTitle,
      defaultUrl,
    }
  } = data.site

  if (author) {
    return (
      {
        "@type": "Person",
        "name": `${author}`,
        // "url": "https://matthassel.com",
      }

    )
  } else {
    return (
      {
        "@type": "Organization",
        "name": `${defaultTitle}`,
        "url": `${defaultUrl}`,
        "logo": {
          "@type": "ImageObject",
          "url": `${defaultUrl}${getImageUrl(defaultImage)}`,
        }
      }
    )
  }
}

const siteInformation = graphql`
query {
  site {
    ...SiteInformation
  }
}
`
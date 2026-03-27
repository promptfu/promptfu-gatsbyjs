import { useStaticQuery, graphql } from "gatsby"
import { GetImageUrl } from "utils/GetImageUrl"

export function GetSchemaOrgAuthor(author) {
  const data = useStaticQuery(siteInformation)

  const {
    siteMetadata: { defaultImage, defaultTitle, siteUrl },
  } = data.site

  if (author) {
    return {
      "@type": "Person",
      name: `${author}`,
      // "url": "https://matthassel.com",
    }
  } else {
    return {
      "@type": "Organization",
      name: `${defaultTitle}`,
      url: `${siteUrl}`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${GetImageUrl(defaultImage)}`,
      },
    }
  }
}

const siteInformation = graphql`
  query {
    site {
      ...SiteInformation
    }
  }
`

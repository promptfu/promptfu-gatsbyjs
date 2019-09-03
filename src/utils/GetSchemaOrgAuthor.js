import { useStaticQuery, graphql } from "gatsby"
import { GetImageUrl } from "utils/GetImageUrl"

export function GetSchemaOrgAuthor(author) {
  const data = useStaticQuery(siteInformation)

  const {
    siteMetadata: { defaultImage, defaultTitle, defaultUrl },
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
      url: `${defaultUrl}`,
      logo: {
        "@type": "ImageObject",
        url: `${defaultUrl}${GetImageUrl(defaultImage)}`,
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

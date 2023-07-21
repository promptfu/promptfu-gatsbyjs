import { graphql } from "gatsby"

export const query = graphql`
  fragment SiteInformation on Site {
    siteMetadata {
      defaultDescription: description
      defaultImage: image
      defaultTitle: title
      defaultUrl: url
      language
      links {
        link
        name
        title
      }
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
`




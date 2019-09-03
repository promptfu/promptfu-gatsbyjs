import { useStaticQuery, graphql } from "gatsby"

export function GetImageUrl(imgName) {
  const data = useStaticQuery(allImageSharpQuery)
  const image = data.allImageSharp.edges.find(
    edge => edge.node.fixed.originalName === imgName
  )
  if (!image) {
    return
  }
  return image.node.fixed.src
}

const allImageSharpQuery = graphql`
  query {
    allImageSharp {
      edges {
        node {
          fixed(width: 1200, height: 630) {
            originalName
            src
          }
        }
      }
    }
  }
`

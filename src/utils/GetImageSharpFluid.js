import { useStaticQuery, graphql } from "gatsby"

export function GetImageSharpFluid(imgName) {
  const data = useStaticQuery(allImageSharpQuery)
  const image = data.allImageSharp.edges.find(
    edge => edge.node.fluid.originalName === imgName
  )
  if (!image) {
    return
  }
  return image.node.fluid
}

const allImageSharpQuery = graphql`
query {
    allImageSharp {
      edges {
        node {
          fluid(
            duotone: { highlight: "#30596e", shadow: "#292b2c", opacity: 90 }
            toFormat: PNG
          ) {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
  }
`

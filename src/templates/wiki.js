import React from "react"
import { graphql } from "gatsby"


import Layout from "../components/layout"
import Post from "../components/post"

export default ({ data }) => {
  const post = data.markdownRemark
  console.log(post)
  return (
    <Layout>
      <Post
        categories={post.frontmatter.categories}
        content={post.html}
        imgName={post.frontmatter.image}
        pathPrefix={post.parent.sourceInstanceName}
        slug={post.fields.slug}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        toc={post.tableOfContents}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        categories
        image
        tags
        title
      }
      parent {
        ... on File {
          sourceInstanceName
        }
      }
    }
  }
`

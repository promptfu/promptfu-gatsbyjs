import React from "react"
import { graphql } from "gatsby"


import Layout from "components/layout"
import SEO from "components/seo"
import { PageType } from "components/seo"
import Post from "components/post"

class WikiPost extends React.Component {
  constructor(props) {
    super(props)
    console.log("WikiPost")
    console.log(this.props)

    this.state = {
    }
  }

  render() {
    const post = this.props.data.markdownRemark
    
    return (
      <Layout>
        <SEO
          dateCreated={post.frontmatter.created}
          dateModified={post.frontmatter.updated}
          datePublished={post.frontmatter.created}
          image={post.frontmatter.image}
          pathname={this.props.location.pathname}
          pageType={PageType.ARTICLE}
          title={post.frontmatter.title}
        />
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
}

// export default ({ data }) => {
//   const post = data.markdownRemark
//   return (
//     <Layout>
//         <SEO
//           dateCreated={post.frontmatter.created}
//           dateModified={post.frontmatter.updated}
//           datePublished={post.frontmatter.created}
//           image={post.frontmatter.image}
//           pathname={this.props.location.pathname}
//           pageType={PageType.ARTICLE}
//           title={post.frontmatter.title}
//         />
//       <Post
//         categories={post.frontmatter.categories}
//         content={post.html}
//         imgName={post.frontmatter.image}
//         pathPrefix={post.parent.sourceInstanceName}
//         slug={post.fields.slug}
//         tags={post.frontmatter.tags}
//         title={post.frontmatter.title}
//         toc={post.tableOfContents}
//       />
//     </Layout>
//   )
// }

export default WikiPost

export const pageQuery = graphql`
query($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    tableOfContents
    fields {
      slug
    }
    frontmatter {
      author
      categories
      created
      feature
      image
      show
      tags
      title
      updated
    }
    parent {
      ... on File {
        sourceInstanceName
      }
    }
  }
}
`

import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "components/layout"
// import { SEO } from "components/seo"
import Pagination from "components/pagination"
import { Container } from "react-bootstrap"
import PostCardDeck from "components/post-card-deck"


class BlogIndexPage extends React.Component {
  constructor(props) {
    super(props)
    console.log("BlogIndexPage")
    console.log(this.props)

    var blogPostsFeatured = this.props.data.blogPostsFeatured.edges
    var blogPosts = this.props.data.blogPosts.edges
    var paginateItems = [].concat(blogPostsFeatured, blogPosts)

    this.state = {
      isLoading: true,
      paginateItems: paginateItems,
      pageOfItems: []
    }

    // bind function(s) in constructor instead of render
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: false })
  }
  
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  render() {

    const postsFeatured = []
    const posts = []

    for (var i = 0; i < this.state.pageOfItems.length; i++ ) {
      var item = this.state.pageOfItems[i]

      if(item.node.frontmatter.feature) {
        postsFeatured.push(item)
      } else {
        posts.push(item)
      }
    }

    return (
      <Layout>
        {/* <SEO
          location={this.props.location.pathname}
        /> */}
        <Container>
          {/* Display featured blog posts as cards that can take the full width of the container */}
          <PostCardDeck items={postsFeatured} cardClass={"my-3 shadow"} cardButtonClass={"mt-auto btn-xs-block btn-sm-block btn-md-block"} />

          {/* Display blog posts as cards in a CardDeck */}
          <PostCardDeck items={posts} columnsSM={1} columnsMD={1} columnsLG={2} columnsXL={2} cardClass={"my-3 shadow"} cardBodyClass={"d-flex flex-column"} cardButtonClass={"mt-auto"} fillCols />

          {(this.state.isLoading) ? <div /> : <Pagination items={this.state.paginateItems} onChangePage={this.onChangePage} /> }
        </Container>
      </Layout>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }

        blogPosts: 
          allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___created]},
            filter: {fileAbsolutePath: {glob: "**/content/blog/**/*.md"},
            frontmatter: {feature: {eq: false}, show: {eq: true}}}
          ) {
          edges {
            node {
              id
              excerpt(pruneLength: 125, format: HTML)
              timeToRead
              fields {
                slug
              }
              excerpt(pruneLength: 125, format: HTML)
              frontmatter {
                categories
                created(formatString: "YYYY-MM-DD")
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
        }

        blogPostsFeatured: allMarkdownRemark(
          sort: {order: DESC, fields: [frontmatter___created]},
          filter: {fileAbsolutePath: {glob: "**/content/blog/**/*.md"},
          frontmatter: {feature: {eq: true}, show: {eq: true}}}
          ) {
          edges {
            node {
              id
              excerpt(pruneLength: 125, format: HTML)
              timeToRead
              fields {
                slug
              }
              frontmatter {
                categories
                created(formatString: "YYYY-MM-DD")
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
        }
      }
    `}
    render={ data => <BlogIndexPage data={data} {...props} /> }
  />
)

import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
import { PageType } from "components/seo"
import Pagination from "components/pagination"
import { Container, Row, Col } from "react-bootstrap"
import PostCardDeck from "components/post-card-deck"

const sectionHeadingStyle = {
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#17718e",
  borderBottom: "2px solid #17718e",
  paddingBottom: "0.4rem",
  marginBottom: "1rem",
}


class BlogIndexPage extends React.Component {
  constructor(props) {
    super(props)

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
        <SEO
          pathname={this.props.location.pathname}
          pageType={PageType.BLOG}
          title="Blog"
        />
        <Container>
          <Row className="mt-4 mb-2">
            <Col>
              <h1 style={{ color: "#0d1b2a", fontWeight: 700 }}>Blog</h1>
              <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                Articles, guides, and deep dives on AI testing and prompt engineering.
              </p>
            </Col>
          </Row>

          {postsFeatured.length > 0 && (
            <>
              <p style={sectionHeadingStyle}>Featured</p>
              <PostCardDeck
                items={postsFeatured}
                columnsSM={1}
                columnsMD={1}
                columnsLG={2}
                columnsXL={2}
                horizontal={true}
                cardClass={"my-3 shadow"}
                cardButtonClass={"mt-auto"}
              />
            </>
          )}

          {posts.length > 0 && (
            <>
              <p style={{ ...sectionHeadingStyle, marginTop: "1.5rem" }}>All posts</p>
              <PostCardDeck items={posts} columnsSM={1} columnsMD={1} columnsLG={2} columnsXL={2} cardClass={"my-3 shadow"} cardBodyClass={"d-flex flex-column"} cardButtonClass={"mt-auto"} fillCols />
            </>
          )}

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
            sort: {order: DESC, fields: [frontmatter___updated]},
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
              frontmatter {
                categories
                created(formatString: "YYYY-MM-DD")
                feature
                image
                show
                tags
                title
                updated(formatString: "YYYY-MM-DD")
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
          sort: {order: DESC, fields: [frontmatter___updated]},
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
                updated(formatString: "YYYY-MM-DD")
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

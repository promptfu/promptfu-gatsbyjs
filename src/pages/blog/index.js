import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
import { PageType } from "components/seo"
import Pagination from "components/pagination"
import { Container } from "react-bootstrap"
import PostCardDeck from "components/post-card-deck"

const pageIntroStyle = {
  borderLeft: "4px solid #17718e",
  paddingLeft: "1rem",
  marginBottom: "2rem",
  marginTop: "1.5rem",
}

const dividerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  margin: "1.5rem 0 1rem",
}

const dividerLabelStyle = {
  fontSize: "0.65rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "#17718e",
  whiteSpace: "nowrap",
}

const dividerLineStyle = {
  flexGrow: 1,
  height: "1px",
  background: "linear-gradient(to right, #17718e44, transparent)",
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
          <div style={pageIntroStyle}>
            <h1 style={{ color: "#0d1b2a", fontWeight: 700, marginBottom: "0.25rem" }}>Blog</h1>
            <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
              Articles, guides, and deep dives on AI testing and prompt engineering.
            </p>
          </div>

          {postsFeatured.length > 0 && (
            <>
              <div style={dividerStyle}>
                <span style={dividerLabelStyle}>Featured</span>
                <span style={dividerLineStyle} />
              </div>
              <PostCardDeck
                items={postsFeatured}
                columnsSM={1}
                columnsMD={2}
                columnsLG={2}
                columnsXL={2}
                cardClass={"my-3 shadow"}
                cardBodyClass={"d-flex flex-column"}
                cardButtonClass={"mt-auto"}
                fillCols
              />
            </>
          )}

          {posts.length > 0 && (
            <>
              <div style={{ ...dividerStyle, marginTop: "2rem" }}>
                <span style={dividerLabelStyle}>All posts</span>
                <span style={dividerLineStyle} />
              </div>
              <PostCardDeck
                items={posts}
                columnsSM={1}
                columnsMD={2}
                columnsLG={3}
                columnsXL={3}
                cardClass={"my-3 shadow"}
                cardBodyClass={"d-flex flex-column"}
                cardButtonClass={"mt-auto"}
                fillCols
              />
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

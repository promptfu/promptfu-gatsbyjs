import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
import { PageType } from "components/seo"
import PostLinkListGroup from "components/post-link-list-group"
import { Container, Row, Col } from "react-bootstrap"

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

const browseAllStyle = {
  fontSize: "0.82rem",
  color: "#17718e",
  fontWeight: 600,
}

class WikiIndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data } = this.props
    const wikiPostsFeatured = data.wikiPostsFeatured.edges
    const wikiPosts = data.wikiPosts.edges

    return (
      <Layout>
        <SEO
          pathname={this.props.location.pathname}
          pageType={PageType.WEBPAGE}
          title="Wiki"
        />
        <Container>
          <Row className="mt-4 mb-2">
            <Col>
              <h1 style={{ color: "#0d1b2a", fontWeight: 700 }}>Wiki</h1>
              <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                Quick-reference cheat sheets and guides.
              </p>
            </Col>
          </Row>
          <Row className="my-3">
            <Col lg={6} md={12} sm={12} xs={12}>
              <p style={sectionHeadingStyle}>Featured</p>
              <PostLinkListGroup items={wikiPostsFeatured} />
            </Col>
            <Col lg={6} md={12} sm={12} xs={12} className="mt-4 mt-lg-0">
              <p style={sectionHeadingStyle}>Recent activity</p>
              <PostLinkListGroup items={wikiPosts} />
              <div className="mt-3">
                <Link to="/wiki/categories" style={browseAllStyle}>
                  Browse all wiki articles →
                </Link>
              </div>
            </Col>
          </Row>
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

        wikiPosts:
          allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___created]},
            limit: 8,
            filter: {fileAbsolutePath: {glob: "**/content/wiki/**/*.md"},
            frontmatter: {feature: {eq: false}, show: {eq: true}}}
          ) {
          edges {
            node {
              id
              fields {
                slug
              }
              excerpt(pruneLength: 125, format: HTML)
              frontmatter {
                categories
                created(formatString: "MMM DD, YYYY")
                feature
                image
                show
                tags
                title
                updated(formatString: "MMM DD, YYYY")
              }
              parent {
                ... on File {
                  id
                  name
                  sourceInstanceName
                }
              }
            }
          }
        }

        wikiPostsFeatured: allMarkdownRemark(
          sort: {order: DESC, fields: [frontmatter___created]},
          filter: {fileAbsolutePath: {glob: "**/content/wiki/**/*.md"},
          frontmatter: {feature: {eq: true}, show: {eq: true}}}
          ) {
          edges {
            node {
              id
              fields {
                slug
              }
              excerpt(pruneLength: 125, format: HTML)
              frontmatter {
                categories
                created(formatString: "MMM DD, YYYY")
                feature
                image
                show
                title
                updated(formatString: "MMM DD, YYYY")
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
    render={ data => <WikiIndexPage data={data} {...props} /> }
  />
)

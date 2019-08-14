import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import PostLinkListGroup from "../../components/post-link-list-group"
import { Container, Row, Col } from "react-bootstrap"


class WikiIndexPage extends React.Component {
  constructor(props) {
    super(props)
    console.log("WikiIndexPage")
    console.log(this.props)
    console.log(this.state)

    this.state = {
    }

    // bind function(s) in constructor instead of render
  }

  render() {

    const { data } = this.props
    const wikiPostsFeatured = data.wikiPostsFeatured.edges
    const wikiPosts = data.wikiPosts.edges

    return (
      <Layout>
        <Container>
          <Row className="my-3">
            <Col lg={6} md={12} sm={12} xs={12}>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h1>FEATURED WIKI</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <PostLinkListGroup items={wikiPostsFeatured} pathPrefix={this.props.path} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={12} sm={12} xs={12}>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h1>RECENT ACTIVITY</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <PostLinkListGroup items={wikiPosts} />
                    </Col>
                  </Row>
                </Col>
              </Row>
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
            sort: {order: DESC, fields: [frontmatter___date]},
            filter: {fileAbsolutePath: {glob: "**/content/wiki/**/*.md"},
            frontmatter: {feature: {eq: false}}}
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
                created
                date(formatString: "YYYY-MM-DD")
                feature
                image
                show
                tags
                title
                updated
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
          sort: {order: DESC, fields: [frontmatter___date]},
          filter: {fileAbsolutePath: {glob: "**/content/wiki/**/*.md"},
          frontmatter: {feature: {eq: true}}}
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
                created
                date(formatString: "YYYY-MM-DD")
                feature
                image
                show
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
    render={ data => <WikiIndexPage data={data} {...props} /> }
  />
)
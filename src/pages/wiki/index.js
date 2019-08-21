import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
import { PageType } from "components/seo"
import PostLinkListGroup from "components/post-link-list-group"
import { Container, Row, Col } from "react-bootstrap"


class WikiIndexPage extends React.Component {
  constructor(props) {
    super(props)
    console.log("WikiIndexPage")
    console.log(this.props)

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
        <SEO
          pathname={this.props.location.pathname}
          pageType={PageType.WEBPAGE}
          title="Wiki"
        />
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
            sort: {order: DESC, fields: [frontmatter___created]},
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

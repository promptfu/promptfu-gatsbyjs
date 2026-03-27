import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
import JumbotronHeader from "components/jumbotron"
import { Container, Row, Col } from "react-bootstrap"
import PostCardDeck from "components/post-card-deck"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    // bind function(s) in constructor instead of render
  }

  render() {
    const description = this.props.data.site.siteMetadata.description
    const title = this.props.data.site.siteMetadata.title

    const blogPostsFeatured = this.props.data.blogPostsFeatured.edges
    const wikiPostsFeatured = this.props.data.wikiPostsFeatured.edges

    return (
      <Layout>
        <SEO />
        <JumbotronHeader description={description} title={title} />
        <Container>
          <Row>
            <Col className="text-center">
              <h2>
                <span className="font-weight-light">THE </span>
                <span className="font-weight-bold">LATEST </span>
                <span className="font-weight-light">FROM THE </span>
                <span className="font-weight-blod">BLOG</span>
              </h2>
            </Col>
          </Row>
          {/* Display featured blog posts as cards that can take the full width of the container */}
          <PostCardDeck
            items={blogPostsFeatured}
            cardClass={"my-4 shadow"}
            cardButtonClass={"mt-auto btn-xs-block btn-sm-block btn-md-block"}
            horizontal
          />
          <Row className="my-3">
            <Col className="text-center">
              <Link to={`/blog`}>more blog posts</Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="text-center">
              <h2>
                <span className="font-weight-light">THE </span>
                <span className="font-weight-bold">LATEST </span>
                <span className="font-weight-light">FROM THE </span>
                <span className="font-weight-blod">WIKI</span>
              </h2>
            </Col>
          </Row>
          <PostCardDeck
            items={wikiPostsFeatured}
            cardClass={"my-4 shadow"}
            cardButtonClass={"mt-auto btn-xs-block btn-sm-block btn-md-block"}
            horizontal
          />
          <Row className="my-3">
            <Col className="text-center">
              <Link to={`/wiki`}>more wiki posts</Link>
            </Col>
          </Row>
        </Container>
        <Container className="my-5 py-4 border-top">
          <Row>
            <Col>
              <h2>About PromptFu</h2>
              <p>
                <strong>PromptFu</strong> (promptfu.com) is an independent resource for prompt engineers and AI
                developers. We publish vendor-neutral tutorials, cheat sheets, framework comparisons, and LLM
                evaluation guides — covering the tools and techniques that matter in the AI era.
              </p>
              <p>
                Our coverage spans the full prompt engineering ecosystem: testing frameworks, CLI tools, evaluation
                strategies, and prompt patterns that work across OpenAI, Anthropic, Google, and open-source models.
              </p>
              <ul>
                <li><Link to="/blog/what-is-promptfoo-ai-prompt-testing">What is Promptfoo? Complete Guide to AI Prompt Testing</Link></li>
                <li><Link to="/blog/promptfoo-openai-acquisition-what-it-means">OpenAI Acquires Promptfoo.dev — What It Means</Link></li>
                <li><Link to="/wiki/promptfoo-cheat-sheet">Promptfoo CLI Cheat Sheet</Link></li>
              </ul>
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
            description
            image
            title
          }
        }

        blogPostsFeatured: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___updated] }
          filter: {
            fileAbsolutePath: { glob: "**/content/blog/**/*.md" }
            frontmatter: {
              show: { eq: true }
              feature: { eq: true }
            }
          }
          limit: 5
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

        wikiPostsFeatured: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___updated] }
          filter: {
            fileAbsolutePath: { glob: "**/content/wiki/**/*.md" }
            frontmatter: {
              show: { eq: true }
              feature: { eq: true }
            }
          }
          limit: 5
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
    render={data => <IndexPage data={data} {...props} />}
  />
)

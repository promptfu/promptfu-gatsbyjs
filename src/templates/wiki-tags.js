import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "components/layout"
import PostCardDeck from "components/post-card-deck"
import Pagination from "components/pagination"
import { Container, Row, Col } from "react-bootstrap"

const propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              categories: PropTypes.arrayOf(PropTypes.string),
              created: PropTypes.string,
              feature: PropTypes.bool,
              image: PropTypes.string,
              show: PropTypes.bool,
              tags: PropTypes.arrayOf(PropTypes.string),
              title: PropTypes.string.isRequired,
              updated: PropTypes.string,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
            parent: PropTypes.shape({
              sourceInstanceName: PropTypes.string,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

const defaultProps = {}

class WikiTags extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      paginateItems: this.props.data.allMarkdownRemark.edges,
      pageOfItems: [],
    }

    // bind function(s) in constructor instead of render
    this.onChangePage = this.onChangePage.bind(this)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  render() {

    const { tag } = this.props.pageContext
    const { totalCount } = this.props.data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

    return (
      <Layout>
        <Container>
          <Row>
            <Col className="text-center">
              <h1>{tagHeader}</h1>
            </Col>
          </Row>
          <PostCardDeck
            items={this.state.pageOfItems}
            columnsSM={1}
            columnsMD={2}
            columnsLG={2}
            columnsXL={2}
            cardClass={"my-3 shadow"}
            cardBodyClass={"d-flex flex-column"}
            cardButtonClass={"mt-auto"}
            fillCols
          />
          <Row>
            <Col>
              <Pagination
                items={this.state.paginateItems}
                onChangePage={this.onChangePage}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="text-center">
              <Link to={`/wiki/tags`}>all tags</Link>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

WikiTags.propTypes = propTypes
WikiTags.defaultProps = defaultProps
export default WikiTags
export const query = graphql`
  query WikiTagsQuery ($tag: String) {
    allMarkdownRemark(limit: 2000, sort: {fields: [frontmatter___created], order: DESC}, filter: {fileAbsolutePath: {glob: "**/content/wiki/**/*.md"}, frontmatter: {tags: {in: [$tag]}}}) {
      totalCount
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
`

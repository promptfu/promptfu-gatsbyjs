import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"

import Layout from "components/layout"
import PostCardDeck from "components/post-card-deck"
import Pagination from "components/pagination"
import { Container, Row, Col } from "react-bootstrap"

const propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
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

class Categories extends React.Component {
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

    const { category } = this.props.pageContext
    const { totalCount } = this.props.data.allMarkdownRemark
    const categoryHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } categorized with "${category}"`

    return (
      <Layout>
        <Container>
          <Row>
            <Col className="text-center">
              <h1>{categoryHeader}</h1>
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
              <Link to={`/blog/categories`}>all categories</Link>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

Categories.propTypes = propTypes
Categories.defaultProps = defaultProps
export default props => (
  <StaticQuery
    query={graphql`
      query($category: String) {
        allMarkdownRemark(
          limit: 2000
          sort: { fields: [frontmatter___created], order: DESC }
          filter: {
            fileAbsolutePath: { glob: "**/content/blog/**/*.md" }
            frontmatter: { categories: { in: [$category] } }
          }
        ) {
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
    `}
    render={data => <Categories data={data} {...props} />}
  />
)

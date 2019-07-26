import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

import slugify from "slugify"

import Layout from "../../../components/layout"
import { Badge, Button, Container, Row, Col } from "react-bootstrap"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <Container>
      <Row>
        <Col>
          <Helmet title={title} />
          <h1 className="text-center">Tags</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="text-center">
            {group.map(tag => (
              <Button key={tag.fieldValue} variant="info" as={Link} to={`/blog/tags/${slugify(tag.fieldValue)}/`} type="null" className="m-1">
                {tag.fieldValue}&nbsp;<Badge variant="light">{tag.totalCount}</Badge>
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {fileAbsolutePath: {glob: "**/content/blog/**/*.md"}},
      limit: 2000) {
        group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
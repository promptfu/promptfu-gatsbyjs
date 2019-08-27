import React from "react"
import PropTypes from "prop-types"

import Categories from "./Categories"
import Comments from "./Comments"
import Content from "./Content"
import Header from "./Header"
import Image from "./Image"
import Meta from "./Meta"
import TableOfContents from "./TableOfContents"
import { Container, Row, Col } from "react-bootstrap"

const propTypes = {
  post: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
    frontmatter: PropTypes.shape({
      author: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired,
      created: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
    }),
    html: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      sourceInstanceName: PropTypes.string,
    }),
    tableOfContents: PropTypes.string.isRequired,
  }),
}

const defaultProps = {
  author: ``,
}

const Post = ({ post }) => {
  const {
    fields: {
      slug,
    },
    frontmatter: {
      author,
      created,
      categories,
      image,
      tags,
      title,
      updated,
    },
    html,
    parent: {
      sourceInstanceName
    },
    tableOfContents,
    timeToRead,
  } = post
  return (
    <Container className="shadow-lg">
      <Row>
        <Col>
          <Header title={title} />
          <Meta
            author={author}
            created={created}
            pathPrefix={sourceInstanceName}
            slug={slug}
            tags={tags}
            timeToRead={timeToRead}
            title={title}
            updated={updated}
          />
          <Image imgName={image} />
          {(tableOfContents === null || tableOfContents.length === 0) ? null : <TableOfContents tableOfContents={tableOfContents} />}
          <Content content={html} />
          <Categories
            pathPrefix={sourceInstanceName}
            categories={categories}
          />
          <Comments slug={slug} title={title} />
        </Col>
      </Row>
    </Container>
  )
}

Post.propTypes = propTypes
Post.defaultProps = defaultProps
export default Post

import React from "react"
import PropTypes from "prop-types"

import Categories from "./categories"
import Comments from "./comments"
import Content from "./content"
import Header from "./header"
import Image from "./image"
import TableOfContents from "./table-of-contents"
import Tags from "./tags"
import { Container, Row, Col } from "react-bootstrap"

const Post = ({ categories, content, imgName, pathPrefix, slug, tags, title, toc }) => {
  return (
    <Container className="shadow-lg">
      <Row>
        <Col>
          <Header title={title} />
          <Categories pathPrefix={pathPrefix} categories={categories}/>
          <Image imgName={imgName} />
          {(toc === null || toc.length === 0) ? null : <TableOfContents toc={toc} /> }
          <Content content={content} />
          <Tags pathPrefix={pathPrefix} tags={tags} />
          <Comments slug={slug} title={title} />
        </Col>
      </Row>
    </Container>
  )
}

export default Post

Post.propTypes = {
  categories: PropTypes.array,
  content: PropTypes.string,
  imgName: PropTypes.string,
  pathPrefix: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  toc: PropTypes.string,
}

Post.defaultProps = {
  categories: [],
  content: '',
  imgName: '',
  pathPrefix: '',
  tags: [],
  title: '',
  toc: '',
}

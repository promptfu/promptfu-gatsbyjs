import React from "react"
import PropTypes from "prop-types"

import { Row, Col } from "react-bootstrap"
import { FaFolder } from "react-icons/fa"
import PostCategories from "../post-categories"

const Categories = ({ categories, pathPrefix }) => {
  return (
    <Row className="my-2">
      <Col>
        <hr className="m-0" />
        <p style={pStyle} className="text-right text-muted my-1">
          <span>
            <FaFolder />
            &nbsp;Categories:&nbsp;
            <PostCategories categories={categories} pathPrefix={pathPrefix} />
          </span>
        </p>
        <hr className="m-0" />
      </Col>
    </Row>
  )
}

export default Categories

Categories.propTypes = {
  categories: PropTypes.array,
  pathPrefix: PropTypes.string
}

Categories.defaultProps = {
  categories: [],
  pathPrefix: '',
}

const pStyle = {
  fontSize: `.8rem`
}

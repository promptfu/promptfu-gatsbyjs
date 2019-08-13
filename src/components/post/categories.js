import React from "react"
import PropTypes from "prop-types"

import { Row, Col } from "react-bootstrap"
import { config } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import PostCategories from "../post-categories"

config.autoAddCss = false

const Categories = ({ categories, pathPrefix }) => {
  return (
    <Row className="my-2">
      <Col>
        <hr className="m-0" />
        <p style={pStyle} className="text-right text-muted my-1">
          <span>
            <FontAwesomeIcon icon={faFolder} size="1x" />
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

import React from "react"
import PropTypes from "prop-types"

import { Row, Col } from "react-bootstrap"
import "./content.module.scss"

const Content = ({ content }) => {
  return (
    <Row className="my-2">
      <Col>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Col>
    </Row>
  )
}

export default Content

Content.propTypes = {
  content: PropTypes.string
}

Content.defaultProps = {
  content: '',
}
import React from "react"
import PropTypes from "prop-types"

import { Row, Col } from "react-bootstrap"

const Header = ({ title }) => {
  return (
    <Row>
      <Col>
        <h1 className="text-center">{title}</h1>
      </Col>
    </Row>
  )
}

export default Header

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: '',
}
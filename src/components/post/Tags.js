import React from "react"
import PropTypes from "prop-types"

// Components
import { Row, Col } from "react-bootstrap"
import { FaTags } from "react-icons/fa"
import PostTags from "../post-tags"

const Tags = ({ pathPrefix, tags }) => {
  return (
    <Row className="my-2">
      <Col>
        <hr className="m-0" />
        <p style={pStyle} className="text-left text-muted my-1">
          <span>
            <FaTags />
            &nbsp;Tags:&nbsp;
            <PostTags tags={tags} pathPrefix={pathPrefix} />
          </span>
        </p>
        <hr className="m-0" />
      </Col>
    </Row>
  )
}

export default Tags

Tags.propTypes = {
  pathPrefix: PropTypes.string,
  tags: PropTypes.array
}

Tags.defaultProps = {
  pathPrefix: '',
  tags: [],
}

const pStyle = {
  fontSize: `.8rem`
}

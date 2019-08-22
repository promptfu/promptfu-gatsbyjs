import React from "react"
import PropTypes from "prop-types"

import { Row, Col } from "react-bootstrap"
import PostTags from "components/post-tags"
import PostCommentCount from "components/post-comment-count"
import { FaRegCalendarAlt, FaRegClock, FaTags } from 'react-icons/fa'


const propTypes = {
  pathPrefix: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
}

const defaultProps = {

}

const Meta = ({ created, pathPrefix, slug, tags, timeToRead, title, updated }) => {
  console.log(pathPrefix, tags)
  return (
    <Row className="my-2">
      <Col>
        <hr className="m-0" />
        <div className="text-center text-muted my-1">
        <span className="mr-2 d-line-block">
            <FaRegCalendarAlt />
            &nbsp;
            {updated > created ? updated : created}
          </span>
          <span className="mr-2 d-inline-block">
            <FaRegClock />
            &nbsp;
            {timeToRead} minute read
          </span>
          <span className="mr-2 d-inline-block">
            <PostCommentCount slug={slug} title={title} />
          </span>
          <span className="d-inline-block">
            <FaTags />
            &nbsp;Tags:&nbsp;
            <PostTags tags={tags} pathPrefix={pathPrefix} />
          </span>
        </div>
        <hr className="m-0" />

      </Col>
    </Row>
  )
}

Meta.propTypes = propTypes
Meta.defaultProps = defaultProps
export default Meta

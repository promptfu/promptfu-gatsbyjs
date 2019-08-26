import React from "react"
import PropTypes from "prop-types"

import { Row, Col } from "react-bootstrap"
import PostTags from "components/post-tags"
import PostCommentCount from "components/post-comment-count"
import { FaEdit, FaRegCalendarAlt, FaRegClock, FaTags } from 'react-icons/fa'


const propTypes = {
  editable: PropTypes.bool,
  pathPrefix: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
}

const defaultProps = {
  editable: false,
}

const Meta = ({ created, editable, pathPrefix, slug, tags, timeToRead, title, updated }) => {
  return (
    <Row className="my-2">
      <Col>
        <hr className="m-0" />
        <div className="text-center text-muted my-1">
        <span className="mr-3 d-line-block">
            <FaRegCalendarAlt />
            &nbsp;
            {updated > created ? updated : created}
          </span>
          <span className="mr-3 d-inline-block">
            <FaRegClock />
            &nbsp;
            {timeToRead} minute read
          </span>
          <span className="mr-3 d-inline-block">
            <PostCommentCount slug={slug} title={title} />
          </span>
          {editable &&
            <span className="mr-3 d-inline-block">
              <FaEdit />
              &nbsp;
              <a href={`https://github.com/promptfu/promptfu-gatsbyjs/edit/master/content${slug}index.md`} className="text-muted">improve this post</a>
            </span>
          }
          <span className="mr-3 d-inline-block">
            <FaTags />
            &nbsp;
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

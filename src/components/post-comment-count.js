import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments } from "@fortawesome/free-regular-svg-icons"
import { CommentCount } from "disqus-react"

const propTypes = {
  className: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
}

const defaultProps = {
  className: ``,
  slug: ``,
  title: ``,
}

const PostCommentCount = ({ className, slug, title }) => {

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title}
  }

  return (
    <span className={className}>
      <FontAwesomeIcon
        icon={faComments}
      />
      &nbsp;
      <Link to={slug + `#comments`}>
        <CommentCount {...disqusConfig}>
          0 Comments
        </CommentCount>
       </Link>
    </span>
  )
}

PostCommentCount.propTypes = propTypes
PostCommentCount.defaultProps = defaultProps
export default PostCommentCount

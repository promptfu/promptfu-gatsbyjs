import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import { FaRegComments } from "react-icons/fa"
import { CommentCount } from "disqus-react"

const propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const defaultProps = {
  slug: ``,
  title: ``,
}

const PostCommentCount = ({ slug, title }) => {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  }

  return (
    <>
      <FaRegComments />
      &nbsp;
      <Link to={slug + `#comments`} className="text-muted">
        <CommentCount {...disqusConfig}>0 Comments</CommentCount>
      </Link>
    </>
  )
}

PostCommentCount.propTypes = propTypes
PostCommentCount.defaultProps = defaultProps
export default PostCommentCount

import React from "react"
import PropTypes from "prop-types"

import slugify from "slugify"

import { Link } from "gatsby"
import { Badge } from "react-bootstrap"

const PostTags = ({ linkClassName, linkStyle, separator, tags, pathPrefix }) => {
  return (
    <React.Fragment>
      {tags.map((tag, index) => {
        const slug = `/${pathPrefix}/tags/${slugify(tag)}`.toLowerCase()
        if((index + 1) === tags.length) { // Check if item is last in array
          separator = ``
        }
        return (
          <span key={`${tag}-${index}`}>
            <Badge variant="info">
              <Link to={slug} style={linkStyle} className={`text-white ${linkClassName}`}>#{tag.toLowerCase()}</Link>
            </Badge>
            {separator}
          </span>
        )
      })}
    </React.Fragment>
  )
}

export default PostTags

PostTags.propTypes = {
  linkClassName: PropTypes.object,
  linkStyle: PropTypes.object,
  separator: PropTypes.string,
  tags: PropTypes.array,
  pathPrefix: PropTypes.string
}

PostTags.defaultProps = {
  linkClassName: ``,
  linkStyle: {},
  separator: ` | `,
  tags: [],
  pathPrefix: '',
}

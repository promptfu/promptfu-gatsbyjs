import React from "react"
import PropTypes from "prop-types"

import slugify from "slugify"

import { Link } from "gatsby"
import { Badge } from "react-bootstrap"

const PostCategories = ({ categories, pathPrefix }) => {
  // Elements should be generated here when logic is needed
  return (
    <React.Fragment>
      {categories.map((category, index) => {
        const slug = `/${pathPrefix}/categories/${slugify(category)}`.toLowerCase()
        var separator = ` | `
        if((index + 1) === categories.length) { // Check if item is last in array
          separator = ``
        }
        return (
          <span key={`${category}-${index}`}>
            <Badge variant="info">
            <Link to={slug} className="text-white">#{category.toLowerCase()}</Link>
            </Badge>
            {separator}
          </span>
        )
      })}
    </React.Fragment>
  )
}

export default PostCategories

PostCategories.propTypes = {
  categories: PropTypes.array,
  pathPrefix: PropTypes.string
}

PostCategories.defaultProps = {
  categories: [],
  pathPrefix: '',
}

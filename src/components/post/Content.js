import React from "react"
import PropTypes from "prop-types"

import "./Content.module.scss"

const wrapTables = (html) =>
  html
    .replace(/<table/g, '<div class="table-responsive"><table')
    .replace(/<\/table>/g, "</table></div>")

const Content = ({ content }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: wrapTables(content) }} />
    </>
  )
}

export default Content

Content.propTypes = {
  content: PropTypes.string
}

Content.defaultProps = {
  content: '',
}
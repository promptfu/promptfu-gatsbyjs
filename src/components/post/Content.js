import React from "react"
import PropTypes from "prop-types"

import "./Content.module.scss"

const Content = ({ content }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }}/>
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
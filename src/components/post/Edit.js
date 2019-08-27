import React from "react"
import PropTypes from "prop-types"

import { FaEdit } from 'react-icons/fa'

const Edit = ({ slug }) => {
  return (
    <>
      <span>
        <FaEdit className="text-muted" />
        &nbsp;
        <a
          href={`https://github.com/promptfu/promptfu-gatsbyjs/edit/master/content${slug}index.md`}
          className="text-muted"
        >
          improve this post
        </a>
      </span>
    </>
  )
}

Edit.propTypes = {
  slug: PropTypes.string.isRequired,
}

Edit.defaultProps = {
}

export default Edit

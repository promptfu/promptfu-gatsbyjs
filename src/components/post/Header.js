import React from "react"
import PropTypes from "prop-types"

const Header = ({ title }) => {
  return (
    <>
      <h1 className="post-page-title text-center">{title}</h1>
    </>
  )
}

export default Header

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: '',
}
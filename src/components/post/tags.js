import React from "react"
import PropTypes from "prop-types"

// Components
import { Row, Col } from "react-bootstrap"
import { config } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"
import PostTags from "../post-tags"

config.autoAddCss = false

const Tags = ({ pathPrefix, tags }) => {
  return (
    <Row className="my-2">
      <Col>
        <hr className="m-0" />
        <p style={pStyle} className="text-left text-muted my-1">
          <span>
            <FontAwesomeIcon icon={faTags} size="1x" />
            &nbsp;Tags:&nbsp;
            <PostTags tags={tags} pathPrefix={pathPrefix} />
          </span>
        </p>
        <hr className="m-0" />
      </Col>
    </Row>
    // <Row className="my-2">
    //   <Col>
    //     <hr className="m-0" />
    //     <p style={pStyle} className="text-left text-muted m-1">
    //       <span>
    //         <FontAwesomeIcon icon={faTags} size="1x" />
    //         &nbsp;Tags:&nbsp;
    //         {tags.map((tag, index) => {
    //           const slug = `/${pathPrefix}/tags/${slugify(tag)}`.toLowerCase()
    //           var separator = ` | `
    //           if((index + 1) === tags.length) { // Check if item is last in array
    //             separator = ``
    //           }
    //           return (
    //             <span key={`${tag}-${index}`}>
    //               <Link to={slug}>{tag.toLowerCase()}</Link>{separator}
    //             </span>
    //           )
    //         })}
    //       </span>
    //     </p>
    //   </Col>
    // </Row>
  )
}

export default Tags

Tags.propTypes = {
  pathPrefix: PropTypes.string,
  tags: PropTypes.array
}

Tags.defaultProps = {
  pathPrefix: '',
  tags: [],
}

const pStyle = {
  fontSize: `.8rem`
}

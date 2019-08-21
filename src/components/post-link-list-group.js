import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import { Row, Col, ListGroup } from "react-bootstrap"
import { FaRegEdit } from "react-icons/fa"
import PostCategories from "./post-categories"
import PostCommentCount from "components/post-comment-count"
// import styles from "./post-link-list-group.module.scss"

const propTypes = {
  items: PropTypes.array
}

const defaultProps = {
  items: []
}

const PostLinkListGroup = ({ items }) => {
  return (
    <ListGroup as='ul' variant="flush">
      {items.map((item, index) => {
        const {
          fields: {
            slug,
          },
          frontmatter: {
            categories,
            created,
            title,
            updated,
          },
          parent: {
            sourceInstanceName,
          },
        } = item.node
        
        return(
          <ListGroup.Item key={`${item}-${index}`} as='li' className="p-0 py-1">
            <Row>
              <Col>
                <Link to={slug} className="text-dark">
                  <FaRegEdit
                    className="mr-1"
                  />
                  {title}
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-muted my-1" style={spanStyle}>
                 {updated > created ?
                    `Updated on ${updated} in` :
                    `Created on ${created} in`
                  }
                  <span className="ml-1">
                    <PostCategories categories={categories} pathPrefix={sourceInstanceName} />
                  </span>
                  <PostCommentCount slug={slug} title={title} className="float-right" />
                </p>
              </Col>
            </Row>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

PostLinkListGroup.propTypes = propTypes
PostLinkListGroup.defaultProps = defaultProps
export default PostLinkListGroup

const spanStyle = {
  fontSize: `.8rem`
}

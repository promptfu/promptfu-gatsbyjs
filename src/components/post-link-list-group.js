import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import { Row, Col, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import PostCategories from "./post-categories"
import PostCommentCount from "./post-comment-count"
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
        var categories = item.node.frontmatter.categories
        var slug = item.node.fields.slug
        var title = item.node.frontmatter.title
        var pathPrefix = item.node.parent.sourceInstanceName
        return(
          <ListGroup.Item key={`${item}-${index}`} as='li' className="p-0 py-1">
            <Row>
              <Col>
                <Link to={slug} className="text-dark">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="mr-1"
                  />
                  {title}
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-muted my-1" style={spanStyle}>
                  Updated on Jun 25, 2019 in
                  <span className="ml-1">
                    <PostCategories categories={categories} pathPrefix={pathPrefix} />
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


                //   {/* <ul>
                //     <li>
                //       <div class="row">
                //         <div class="col">
                //           <a href="/wiki/linux/xargs" class="text-dark page-a-link"><i class="far fa-edit text-dark mr-1"></i>xargs</a>
                //         </div>
                //       </div>
                //       <div class="row">
                //         <div class="col">
                //           <span class="page-meta">
                //             Updated on Jun 25, 2019 in
                //             <a href="/wiki/categories/#linux">linux</a>
                //             <span class="page-comments-count">
                //               <i class="far fa-comments mr-1"></i>
                //               <a href="/wiki/linux/xargs#disqus_thread">1 Comment</a>
                //             </span>
                //           </span>
                //         </div>
                //       </div>
                //       <hr />
                //     </li>
                //   </ul> */}
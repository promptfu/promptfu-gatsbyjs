import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"
import Image from "components/post/image"
import { Card, Row, Col } from "react-bootstrap"
import { config } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons"
import { faFolder, faTags } from "@fortawesome/free-solid-svg-icons"
import PostCategories from "components/post-categories"
import PostCommentCount from "components/post-comment-count"
import PostTags from "components/post-tags"

config.autoAddCss = false

const PostCard = ({ categories, created, imgName, pathPrefix, slug, tags, text, timeToRead, title, cardClass, cardBodyClass, cardButtonClass, horizontal }) => {
  const verticalPostCard = (
    <Card className={cardClass}>
      <Link to={slug}>
        <Card.Img as={Image} imgName={imgName} className={`fade-in`} />
      </Link>
      <Card.Body className={cardBodyClass}>
        <Link to={slug} className="text-dark">
          <Card.Title>{title}</Card.Title>
        </Link>
        {/* <Card.Subtitle>Card Subtitle</Card.Subtitle> */}
        <div style={cardMetaStyle} className="my-1 text-muted">
          <span className="mr-2 d-line-block">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size="1x"
            />
            &nbsp;
            {created}
          </span>
          <span className="mr-2 d-inline-block">
            <FontAwesomeIcon
              icon={faClock}
              size="1x"
            />
            &nbsp;
            {timeToRead} minute read
          </span>
          <PostCommentCount slug={slug} title={title} className="d-inline-block" />
        </div>
        <Card.Text dangerouslySetInnerHTML={{ __html: text }} className={"my-3"}></Card.Text>
        {/* <Button variant="dark" as={Link} to={slug} type="null" className={cardButtonClass}>read more</Button> */}
      </Card.Body>
      <Card.Footer className="text-muted">
        <span className="mr-2 d-inline-block">
          <FontAwesomeIcon icon={faFolder} size="1x" />
          <span>&nbsp;Categories:&nbsp;</span>
          <PostCategories categories={categories} pathPrefix={pathPrefix} />
        </span>
        <span className="mr-2 d-inline-block">
          <FontAwesomeIcon icon={faTags} size="1x" />
          <span>&nbsp;Tags:&nbsp;</span>
          <PostTags tags={tags} pathPrefix={pathPrefix} />
        </span>
      </Card.Footer>
    </Card>
  )
  const horizontalPostCard = (
    <Card className={cardClass}>
      <Row>
        <Col lg={6}>
          <Link to={slug}>
            <Card.Img as={Image} imgName={imgName} className={"m-lg-4 fade-in"} />
          </Link>
        </Col>
        <Col lg={6}>
          <Card.Body className={`m-lg-4 p-lg-0` + cardBodyClass}>
            <Card.Title><Link to={slug} className="text-dark">{title}</Link></Card.Title>
            {/* <Card.Subtitle>Card Subtitle</Card.Subtitle> */}
            <div style={cardMetaStyle} className="my-1 text-muted">
              <span className="mr-2 d-line-block">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  size="1x"
                />
                &nbsp;
                {created}
              </span>
              <span className="mr-2 d-inline-block">
                <FontAwesomeIcon
                  icon={faClock}
                  size="1x"
                />
                &nbsp;
                {timeToRead} minute read
              </span>
              <PostCommentCount slug={slug} title={title} className="d-inline-block" />
            </div>
            <Card.Text as="div" dangerouslySetInnerHTML={{ __html: text }} className={"my-3"}></Card.Text>
            {/* <Button variant="dark" as={Link} to={slug} type="null" className={cardButtonClass}>read more</Button> */}
          </Card.Body>
        </Col>
      </Row>
      {/* <Card.Footer className="text-muted">
        <span className="mr-2 d-inline-block">
          <FontAwesomeIcon icon={faFolder} size="1x" />
          <span>&nbsp;Categories:&nbsp;</span>
          <PostCategories categories={categories} pathPrefix={pathPrefix} />
        </span>
        <span className="mr-2 d-inline-block">
          <FontAwesomeIcon icon={faTags} size="1x" />
          <span>&nbsp;Tags:&nbsp;</span>
          <PostTags tags={tags} pathPrefix={pathPrefix} />
        </span>
      </Card.Footer> */}
    </Card>
  )
  return (
    <React.Fragment>
      {(horizontal) ? horizontalPostCard : verticalPostCard }

    </React.Fragment>
  )
}

export default PostCard

PostCard.propTypes = {
  data: PropTypes.string,
  imgName: PropTypes.string,
  slug: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  cardBodyClass: PropTypes.string,
  cardButtonClass: PropTypes.string,
}

PostCard.defaultProps = {
  data: '',
  imgName: '',
  slug: '',
  text: '',
  title: '',
  cardBodyClass: '',
  cardButtonClass: '',
}

const cardMetaStyle = {
  fontSize: `.8rem`
}
import React from "react"
import PropTypes from "prop-types"

import PostCard from "components/post-card"
import { CardDeck, Card, Row, Col } from "react-bootstrap"

const propTypes = {
  cardBodyClass: PropTypes.string,
  cardButtonClass: PropTypes.string,
  cardClass: PropTypes.string,
  columnsSM: PropTypes.number,
  columnsMD: PropTypes.number,
  columnsLG: PropTypes.number,
  columnsXL: PropTypes.number,
  fillCols: PropTypes.bool,
  items: PropTypes.array.isRequired,
  horizontal: PropTypes.bool,
}

const defaultProps = {
  cardBodyClass: "",
  cardButtonClass: "",
  cardClass: "",
  columnsSM: 1,
  columnsMD: 1,
  columnsLG: 1,
  columnsXL: 1,
  fillCols: false,
  horizontal: false,
}

class PostCardDeck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    // bind function(s) in constructor instead of render
    this.renderPostCards = this.renderPostCards.bind(this)
  }

  renderPostCards() {
    var cardBodyClass = this.props.cardBodyClass
    var cardButtonClass = this.props.cardButtonClass
    var cardClass = this.props.cardClass
    var posts = this.props.items
    var loopMax = this.props.fillCols
      ? Math.ceil(posts.length / 10) * 10
      : posts.length
    var horizontal = this.props.horizontal

    var elements = []
    for (var i = 1; i <= loopMax; i++) {
      var post = posts[i - 1]

      if (typeof post === "undefined") {
        elements.push(<Card key={i} style={{ border: "none" }}></Card>)
      } else {
        elements.push(
          <PostCard
            key={post.node.id}
            categories={post.node.frontmatter.categories}
            created={post.node.frontmatter.created}
            imgName={post.node.frontmatter.image}
            pathPrefix={post.node.parent.sourceInstanceName}
            slug={post.node.fields.slug}
            tags={post.node.frontmatter.tags}
            text={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            title={post.node.frontmatter.title}
            updated={post.node.frontmatter.updated}
            cardClass={cardClass}
            cardBodyClass={cardBodyClass}
            cardButtonClass={cardButtonClass}
            horizontal={horizontal}
          />
        )
      }

      if (i % this.props.columnsSM === 0) {
        elements.push(
          <div
            key={`col-sm-every-` + i}
            className="w-100 d-none d-sm-block d-md-none"
          ></div>
        ) // <!-- wrap every 2 on sm-->
      }
      if (i % this.props.columnsMD === 0) {
        elements.push(
          <div
            key={`col-md-every-` + i}
            className="w-100 d-none d-md-block d-lg-none"
          ></div>
        ) // <!-- wrap every 3 on md-->
      }
      if (i % this.props.columnsLG === 0) {
        elements.push(
          <div
            key={`col-lg-every-` + i}
            className="w-100 d-none d-lg-block d-xl-none"
          ></div>
        ) // <!-- wrap every 4 on lg-->
      }
      if (i % this.props.columnsXL === 0) {
        elements.push(
          <div
            key={`col-xl-every-` + i}
            className="w-100 d-none d-xl-block"
          ></div>
        ) // <!-- wrap every 5 on xl-->
      }
    }
    return elements
  }

  render() {
    return (
      <Row>
        <Col>
          <CardDeck>{this.renderPostCards()}</CardDeck>
        </Col>
      </Row>
    )
  }
}

PostCardDeck.propTypes = propTypes
PostCardDeck.defaultProps = defaultProps
export default PostCardDeck

import React from "react"
import PropTypes from "prop-types"

import { Row, Col } from "react-bootstrap"
import { DiscussionEmbed } from "disqus-react"

const propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
}

const defaultProps = {
  slug: '',
  title: '',
}

class Comments extends React.Component {
  constructor(props) {
    super(props)
    console.log("Comments")

    this.state = {
    }

    this.scrollToLocation = this.scrollToLocation.bind(this)
    this.isInViewPort = this.isInViewPort.bind(this)
  }

  componentDidMount() {
    if (this.$ref && window.location.hash === '#comments') {
      this.scrollToLocation(this.$ref)
    }
  }

  // attempt to scroll to ref and retry until element is in viewport
  scrollToLocation = (ref) => {
    let retries = 0
    let lastScrollY = window.scrollY
    const scroll = () => {
      if (retries >= 50) return
      if (this.isInViewPort(ref)) return

      retries += 1
      const currentScrollY = window.scrollY

      // console.log("lastScrollY: ", lastScrollY)
      // console.log("currentScrollY: ", currentScrollY)
 
      // return if scrolls up before scrollintoview is complete
      if (lastScrollY > currentScrollY) return

      // If we made it to this part...
      // If we are not currently scrolling, attempt to scrollIntoView
      const isScrolling = (lastScrollY < currentScrollY)

      // console.log(isScrolling)
      if (!isScrolling) {
        ref.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
      }
      
      // Make sure to set lastScorllY to currentScrollY for next iteration
      lastScrollY = currentScrollY
      setTimeout(scroll, 100)
    }
    scroll()
  }

  isInViewPort(ref,offset = 0) {
    if (!ref) return false;
    const top = ref.getBoundingClientRect().top
    var isVisible = (top + offset) >= 0 && (top - offset) <= window.innerHeight
    return isVisible

  }
  
  render() {
    const slug = this.props.slug
    const title = this.props.title

    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: { identifier: slug, title}
    }

    return(
      <Row>
        <Col>
          <div id="comments" ref={ ref => {this.$ref = ref; }}></div>
          <DiscussionEmbed {...disqusConfig} />
        </Col>
      </Row>
    )
  }
}

Comments.propTypes = propTypes
Comments.defaultProps = defaultProps
export default Comments

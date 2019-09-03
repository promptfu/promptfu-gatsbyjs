import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { Button, Card, Row, Col } from "react-bootstrap"
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight
} from 'react-icons/fa'
import Img from "gatsby-image"
import { GetImageSharpFluid } from "../../utils/GetImageSharpFluid";

const defaultProps = {
}

const propTypes = {
  heading: PropTypes.string,
  prev: PropTypes.shape({
    excerpt: PropTypes.string,
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
    })
  }),
  next: PropTypes.shape({
    excerpt: PropTypes.string,
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
    })
  }),
}

const PrevNext = ({ heading, prev, next }) => {
  console.log(prev)
  console.log(next)
  return (
    <>
      {(prev || next) &&
        <Row className="text-center">
          <Col>
            <h5>{heading}</h5>
          </Col>
        </Row>
      }
      <Row className="text-center">
        {prev ?
          <Col>
            <Row>
              <Col>
                <Card as={Link} to={prev.fields.slug} className="text-white overflow-hidden" style={cardStyle}>
                  <Card.Img as={Img} fluid={GetImageSharpFluid(prev.frontmatter.image)} />
                  <Card.ImgOverlay>
                    <Card.Title>{prev.frontmatter.title}</Card.Title>
                    <Card.Text
                      dangerouslySetInnerHTML={{ __html: prev.excerpt }}
                    />
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="info" as={Link} to={prev.fields.slug} type="null" className="my-2" size="lg" block>
                  <FaRegArrowAltCircleLeft size={`2em`} />
                  {/* &nbsp; */}
                  {/* NEXT */}
                </Button>
              </Col>
            </Row>
          </Col>
          :
          <Col>
          </Col>
        }
        {next ?
          <Col>
            <Row>
              <Col>
                <Card as={Link} to={next.fields.slug} className="text-white overflow-hidden" style={cardStyle}>
                  <Card.Img as={Img} fluid={GetImageSharpFluid(next.frontmatter.image)} />
                  <Card.ImgOverlay>
                    <Card.Title>{next.frontmatter.title}</Card.Title>
                    <Card.Text
                      dangerouslySetInnerHTML={{ __html: next.excerpt }}
                    />
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="info" as={Link} to={next.fields.slug} type="null" className="my-2" size="lg" block>
                  <FaRegArrowAltCircleRight size={`2em`} />
                  {/* &nbsp; */}
                  {/* NEXT */}
                </Button>
              </Col>
            </Row>
          </Col>
          :
          <Col>
          </Col>
        }
      </Row>
    </>
  )
}

const cardStyle={
  maxHeight: `20vh`,
}

PrevNext.propTypes = propTypes
PrevNext.defaultProps = defaultProps
export default PrevNext

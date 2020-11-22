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
import styles from "./PrevNext.module.scss";

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
          <Col className="col-12 col-md-6 col-lg-6 col-xl-6 order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1">
            <Card className="border-0 text-white d-flex flex-column h-100">
              <Card.Img as={Img} fluid={GetImageSharpFluid(prev.frontmatter.image)} className="flex-grow-1" />
              <Card.ImgOverlay className="card-body">
                <Card.Title>{prev.frontmatter.title}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: prev.excerpt }} />
              </Card.ImgOverlay>
              <Card.Footer className="bg-transparent border-0 p-0 mt-auto position-relative">
                <Button variant="info" as={Link} to={prev.fields.slug} type="null" className="my-2" size="lg" block>
                  <FaRegArrowAltCircleLeft size={`2em`} />
                  {/* &nbsp; */}
                  {/* PREV */}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          :
          <Col className="order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1">
          </Col>
        }
        {next ?
          <Col className="col-12 col-md-6 col-lg-6 col-xl-6 order-1 order-sm-1 order-md-2 order-lg-2 order-lx-2">
            <Card className="border-0 text-white h-100">
              <Card.Img as={Img} fluid={GetImageSharpFluid(next.frontmatter.image)} className="flex-grow-1" />
              <Card.ImgOverlay>
                <Card.Title>{next.frontmatter.title}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: next.excerpt }} />
              </Card.ImgOverlay>
              <Card.Footer className="p-0 position-relative">
                <Button variant="info" as={Link} to={next.fields.slug} type="null" className="my-2" size="lg" block>
                  <FaRegArrowAltCircleRight size={`2em`} />
                  {/* &nbsp; */}
                  {/* NEXT */}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          :
          <Col className="order-1 order-sm-1 order-md-2 order-lg-2 order-lx-2">
          </Col>
        }
      </Row>
    </>
  )
}

PrevNext.propTypes = propTypes
PrevNext.defaultProps = defaultProps
export default PrevNext

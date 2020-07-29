import React from "react"
import { graphql } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
import { PageType } from "components/seo"
import { Container, Row, Col } from "react-bootstrap"
import {
  Categories,
  Comments,
  Content,
  Header,
  Image,
  Meta,
  PrevNext,
  TableOfContents,
} from "components/post"

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    // console.log('BlogPost')
    // console.log(props)

    this.state = {}
  }
  render() {
    const {
      markdownRemark: {
        fields: { slug },
        frontmatter: {
          author,
          categories,
          created,
          description,
          image,
          tags,
          title,
          updated,
        },
        html,
        parent: { sourceInstanceName },
        tableOfContents,
        timeToRead,
      },
    } = this.props.data

    const {
      next,
      previous,
    } = this.props.pageContext

    return (
      <Layout>
        <SEO
          dateCreated={created}
          dateModified={updated}
          datePublished={created}
          description={description}
          image={image}
          pathname={this.props.location.pathname}
          pageType={PageType.ARTICLE}
          title={title}
        />
        <Container className="shadow-lg">
          <Row>
            <Col>
              <Header title={title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Meta
                author={author}
                created={created}
                editable={false}
                pathPrefix={sourceInstanceName}
                slug={slug}
                tags={tags}
                timeToRead={timeToRead}
                title={title}
                updated={updated}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Image imgName={image} />
            </Col>
          </Row>
          <Row>
            <Col>
              {tableOfContents === null ||
              tableOfContents.length === 0 ? null : (
                <TableOfContents tableOfContents={tableOfContents} />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Content content={html} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Categories
                pathPrefix={sourceInstanceName}
                categories={categories}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <PrevNext heading={`Ready for another?`} prev={previous && previous.node} next={next && next.node} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Comments slug={slug} title={title} />
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      timeToRead
      fields {
        slug
      }
      frontmatter {
        author
        categories
        created(formatString: "YYYY-MM-DD")
        description
        feature
        image
        show
        tags
        title
        updated(formatString: "YYYY-MM-DD")
      }
      parent {
        ... on File {
          sourceInstanceName
        }
      }
    }
  }
`

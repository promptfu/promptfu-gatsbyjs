import React, { useState, useEffect } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import { Container, Row, Col, Form, InputGroup, Badge } from "react-bootstrap"

import Layout from "components/layout"
import SEO from "components/seo"

function normalize(str) {
  return str ? str.toLowerCase() : ""
}

function scorePost(post, terms) {
  const title = normalize(post.frontmatter.title)
  const excerpt = normalize(post.excerpt)
  const tags = (post.frontmatter.tags || []).map(normalize).join(" ")
  const categories = (post.frontmatter.categories || []).map(normalize).join(" ")

  let score = 0
  for (const term of terms) {
    if (title.includes(term)) score += 3
    if (tags.includes(term)) score += 2
    if (categories.includes(term)) score += 1
    if (excerpt.includes(term)) score += 1
  }
  return score
}

function SearchPage({ data }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const allPosts = [
    ...data.blogPosts.edges.map(e => ({ ...e.node, section: "blog" })),
    ...data.wikiPosts.edges.map(e => ({ ...e.node, section: "wiki" })),
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const q = params.get("q") || ""
      setQuery(q)
    }
  }, [])

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setResults([])
      return
    }
    const terms = trimmed.toLowerCase().split(/\s+/).filter(Boolean)
    const scored = allPosts
      .map(post => ({ post, score: scorePost(post, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
    setResults(scored.map(({ post }) => post))
  }, [query])

  function handleChange(e) {
    const val = e.target.value
    setQuery(val)
    if (typeof window !== "undefined") {
      const url = val.trim()
        ? `${window.location.pathname}?q=${encodeURIComponent(val.trim())}`
        : window.location.pathname
      window.history.replaceState(null, "", url)
    }
  }

  return (
    <Layout>
      <SEO title="Search" description="Search blog posts and wiki articles on PromptFu" />
      <Container className="my-5">
        <Row className="justify-content-center mb-4">
          <Col md={8}>
            <h1 className="post-page-title mb-4">Search</h1>
            <InputGroup>
              <Form.Control
                autoFocus
                type="search"
                placeholder="Search blog posts and wiki articles…"
                value={query}
                onChange={handleChange}
                size="lg"
                aria-label="Search"
              />
            </InputGroup>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            {query.trim() === "" && (
              <p className="text-muted">Start typing to search across all posts and wiki articles.</p>
            )}

            {query.trim() !== "" && results.length === 0 && (
              <p className="text-muted">No results found for <strong>{query}</strong>.</p>
            )}

            {results.length > 0 && (
              <>
                <p className="text-muted mb-3">
                  {results.length} result{results.length !== 1 ? "s" : ""} for <strong>{query}</strong>
                </p>
                <ul className="list-unstyled">
                  {results.map(post => (
                    <li key={post.id} className="mb-4 pb-4 border-bottom">
                      <div className="d-flex align-items-baseline gap-2 mb-1">
                        <Badge
                          variant="secondary"
                          className="mr-2 text-uppercase"
                          style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
                        >
                          {post.section}
                        </Badge>
                        <Link to={post.fields.slug} className="h5 mb-0 text-decoration-none">
                          {post.frontmatter.title}
                        </Link>
                      </div>
                      {post.excerpt && (
                        <p
                          className="text-muted small mb-1"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                      )}
                      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                        <div>
                          {post.frontmatter.tags.slice(0, 5).map(tag => (
                            <Badge
                              key={tag}
                              variant="outline-secondary"
                              className="mr-1 border"
                              style={{ fontSize: "0.65rem" }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query SearchQuery {
        blogPosts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___updated] }
          filter: {
            fileAbsolutePath: { glob: "**/content/blog/**/*.md" }
            frontmatter: { show: { eq: true } }
          }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 200)
              fields {
                slug
              }
              frontmatter {
                title
                tags
                categories
                updated(formatString: "YYYY-MM-DD")
              }
            }
          }
        }
        wikiPosts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___updated] }
          filter: {
            fileAbsolutePath: { glob: "**/content/wiki/**/*.md" }
            frontmatter: { show: { eq: true } }
          }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 200)
              fields {
                slug
              }
              frontmatter {
                title
                tags
                categories
                updated(formatString: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    `}
    render={data => <SearchPage data={data} {...props} />}
  />
)

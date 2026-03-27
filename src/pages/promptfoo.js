import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import Layout from "components/layout"
import SEO from "components/seo"
import JumbotronHeader from "components/jumbotron"
import { Container, Row, Col, Card, Badge } from "react-bootstrap"

const keywords = [
  "promptfoo",
  "prompt foo",
  "promptfoo.com",
  "promptfoo vs promptfu",
  "ai prompt testing",
  "llm evaluation",
  "prompt engineering tools",
  "promptfoo openai acquisition",
  "promptfoo alternatives",
]

class PromptfooLandingPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO
          title="Promptfoo — AI Prompt Testing Resources, Guides & Community"
          description="Looking for promptfoo? You're in the right place. PromptFu is the independent home of promptfoo knowledge: tutorials, cheat sheets, LLM evaluation guides, and everything prompt testing."
          keywords={keywords}
          pathname="/promptfoo"
        />
        <JumbotronHeader
          title="Promptfoo Resources"
          description="The independent home of AI prompt testing knowledge — tutorials, guides, and everything promptfoo."
        />

        <Container className="my-5">
          <Row>
            <Col lg={8}>
              <h2>You searched for promptfoo. You're in the right place.</h2>
              <p className="lead">
                <strong>Promptfoo</strong> (also written <em>prompt foo</em> or <em>prompt-foo</em>) is the
                open-source framework that became the standard for AI prompt testing and LLM evaluation.
                This site — <strong>PromptFu</strong> at <code>promptfu.com</code> — is the independent community
                hub for everything promptfoo.
              </p>
              <p>
                Following OpenAI's acquisition of <strong>promptfoo.dev</strong> in March 2026, the community needed an
                independent, vendor-neutral destination. That's this site. We cover promptfoo tutorials, configuration
                references, prompt evaluation strategies, and LLM testing best practices that work across all providers.
              </p>
            </Col>
            <Col lg={4}>
              <Card className="border-primary shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Quick Navigation</Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link to="/blog/what-is-promptfoo-ai-prompt-testing">→ What is Promptfoo?</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/blog/promptfu-vs-promptfoo-what-is-the-difference">→ PromptFu vs promptfoo</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/wiki/promptfoo-cheat-sheet">→ Promptfoo CLI Cheat Sheet</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/blog/promptfoo-openai-acquisition-what-it-means">→ OpenAI Acquisition Explained</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/blog">→ All Blog Posts</Link>
                    </li>
                    <li>
                      <Link to="/wiki">→ All Wiki Articles</Link>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="py-4 bg-light" fluid>
          <Container>
            <Row className="text-center mb-4">
              <Col>
                <h2>PromptFu vs promptfoo — the key distinction</h2>
                <p className="text-muted">These are related but different things. Here's how they fit together.</p>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Header className="bg-primary text-white">
                    <strong>promptfoo</strong> <Badge variant="light" className="ml-2">the framework</Badge>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      The open-source CLI and Node.js library for <strong>testing and evaluating LLM prompts</strong>.
                      You install it, write test cases in YAML, and run <code>promptfoo eval</code> to grade your
                      prompts automatically.
                    </p>
                    <p className="text-muted mb-0">
                      Originally at promptfoo.dev. Now acquired by OpenAI (March 2026).
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Header className="bg-success text-white">
                    <strong>PromptFu</strong> <Badge variant="light" className="ml-2">this site</Badge>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      An <strong>independent knowledge hub</strong> for prompt engineers and AI developers. We publish
                      tutorials, cheat sheets, framework comparisons, and LLM evaluation guides — all vendor-neutral
                      and community-driven.
                    </p>
                    <p className="text-muted mb-0">
                      Lives at promptfu.com and promptfoo.com. Run independently since 2024.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Link to="/blog/promptfu-vs-promptfoo-what-is-the-difference" className="btn btn-outline-primary">
                  Read the full comparison →
                </Link>
              </Col>
            </Row>
          </Container>
        </Container>

        <Container className="my-5">
          <Row className="mb-4">
            <Col>
              <h2>Essential Promptfoo Resources</h2>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Getting Started</Card.Title>
                  <Card.Text>
                    New to promptfoo? Start here. Learn what it is, how it works, and how to write
                    your first test suite for LLM prompts.
                  </Card.Text>
                  <Link to="/blog/what-is-promptfoo-ai-prompt-testing" className="btn btn-primary btn-sm">
                    Read the guide
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>CLI Cheat Sheet</Card.Title>
                  <Card.Text>
                    The complete promptfoo CLI reference. Commands, flags, configuration options,
                    and example YAML test cases all in one place.
                  </Card.Text>
                  <Link to="/wiki/promptfoo-cheat-sheet" className="btn btn-primary btn-sm">
                    View cheat sheet
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>OpenAI Acquisition</Card.Title>
                  <Card.Text>
                    What does OpenAI's acquisition of promptfoo mean for the community, the tool,
                    and independent prompt engineers?
                  </Card.Text>
                  <Link to="/blog/promptfoo-openai-acquisition-what-it-means" className="btn btn-primary btn-sm">
                    What it means
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="my-5 py-4 border-top">
          <Row>
            <Col>
              <h3>About This Site</h3>
              <p>
                <strong>PromptFu</strong> (promptfu.com) is an independent publication covering AI prompt engineering,
                LLM evaluation, and developer tools for the AI era. We are not affiliated with OpenAI or the promptfoo
                project maintainers. Our content is community-driven and vendor-neutral.
              </p>
              <p>
                We also operate <strong>promptfoo.com</strong> as a community landing page for the promptfoo ecosystem —
                linking to tutorials, tools, and resources regardless of where they live.
              </p>
              <Link to="/" className="btn btn-outline-secondary btn-sm">← Back to home</Link>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            description
            title
          }
        }
      }
    `}
    render={data => <PromptfooLandingPage data={data} />}
  />
)

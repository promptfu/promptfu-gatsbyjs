import React from "react"

import Layout from "../components/layout"

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
      </Layout>
    )
  }
}

export default NotFoundPage

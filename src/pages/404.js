import React from "react"

import Layout from "components/layout"

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout>
        <h1 className="text-center display-1">Not Found</h1>
        <p className="text-center">You just hit a route that doesn&#39;t exist... sorry about that.</p>
      </Layout>
    )
  }
}

export default NotFoundPage

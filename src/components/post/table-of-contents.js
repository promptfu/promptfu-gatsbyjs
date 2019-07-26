import React from "react"

import { Row, Col } from "react-bootstrap"
import styles from "./table-of-contents.module.scss"

const TableOfContents = ({ toc }) => {
  return (
    <Row>
      <Col>
        <div
          dangerouslySetInnerHTML={{ __html: toc }}
          className={styles.tableOfContents}
        />
      </Col>
    </Row>
  )
}

export default TableOfContents

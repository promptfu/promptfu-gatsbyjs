import React from "react"
import * as styles from "./TableOfContents.module.scss"

const TableOfContents = ({ tableOfContents }) => {
  if (!tableOfContents) {
    return null
  }
  
  return (
    <>
        <div 
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
          className={styles.tableOfContents}
         />
    </>
  )
}

export default TableOfContents

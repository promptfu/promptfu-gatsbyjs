import React from "react"
import styles from "./TableOfContents.module.scss"

const TableOfContents = ({ tableOfContents }) => {
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

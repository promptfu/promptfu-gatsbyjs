const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// exports.onCreateNode = async (
//   {
//     actions: { createNode },
//     node,
//     createContentDigest,
//     store,
//     cache,
//     reporter,
//   },
//   { filter, nodeName = `localFile` }
// ) => {
//   if (filter(node)) {
//     const fileNode = await createRemoteFileNode({
//       url: node.url,
//       store,
//       cache,
//       createNode,
//       createNodeId: createContentDigest,
//       reporter,
//     })

//     if (fileNode) {
//       const fileNodeLink = `${nodeName}___NODE`
//       node[fileNodeLink] = fileNode.id
//     }
//   }
// }

exports.onCreateNode = async (
  {
    node,
    actions: { createNode },
    store,
    cache,
    createNodeId,
  }, {
    filter
  }) => {
    if (filter(node)) {
      let fileNode
      try {
        fileNode = await createRemoteFileNode({
          url: node.url,
          parentNodeId: node.id,
          store,
          cache,
          createNode,
          createNodeId,
        })
      } catch (e) {
        console.error('gatsby-source-remote-images: ', e)
      }
      
      if (fileNode) {
      node.localFile___NODE = fileNode.id
    }
  }
}

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require(`slugify`)

let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {

    const preFix = `/${getNode(node.parent).sourceInstanceName}`

    const slug = `${preFix}${createFilePath({ node, getNode })}`
    createNodeField(
      {
        node,
        name: `slug`,
        value: slug
      }
    )
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve('./src/templates/blog.js')
  const blogCategoryTemplate = path.resolve('./src/templates/blog-categories.js')
  const blogTagTemplate = path.resolve('./src/templates/blog-tags.js')
  const wikiTemplate = path.resolve('./src/templates/wiki.js')
  const wikiCategoryTemplate = path.resolve(`./src/templates/wiki-categories.js`)
  const wikiTagTemplate = path.resolve('./src/templates/wiki-tags.js')


  const blogs = graphql(`
    {
      blogs: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/content/blog/**/*.md" } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              categories
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.error) {
      Promise.reject(result.error)
    }

    let categories = []
    let tags = []

    const posts = result.data.blogs.edges

    // Create blog pages
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index -1].node

      createPage({
        path: post.node.fields.slug,
        component: blogTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

      if(post.node.frontmatter.categories) {
        categories = categories.concat(post.node.frontmatter.categories)
      }

      if(post.node.frontmatter.tags) {
        tags = tags.concat(post.node.frontmatter.tags)
      }
    })

    // return only unique categories and tags with a new Set() and then create
    // respective page
    categories = new Set(categories)
    categories.forEach(category => {
      createPage({
        path: `blog/categories/${slugify(category)}`,
        component: blogCategoryTemplate,
        context: {
          category,
        }
      })
    })

    tags = new Set(tags)
    tags.forEach(tag => {
      createPage({
        path: `blog/tags/${slugify(tag)}`,
        component: blogTagTemplate,
        context: {
          tag,
        }
      })
    })
  })

  const wikis = graphql(`
    {
      wikis: allMarkdownRemark(
        filter: {fileAbsolutePath: {glob: "**/content/wiki/**/*.md"}}, 
        sort: {order: DESC, fields: frontmatter___date}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              categories
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.error) {
      Promise.reject(result.error)
    }

    let categories = []
    let tags = []

    // Create wiki pages and get categories and tags
    result.data.wikis.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: wikiTemplate,
        context: {
          slug: node.fields.slug
        },
      })

      if(node.frontmatter.categories) {
        categories = categories.concat(node.frontmatter.categories)
      }

      if(node.frontmatter.tags) {
        tags = tags.concat(node.frontmatter.tags)
      }
    })

    categories = new Set(categories)
    categories.forEach(category => {
      createPage({
        path: `wiki/categories/${slugify(category)}`,
        component: wikiCategoryTemplate,
        context: {
          category,
        }
      })
    })

    tags = new Set(tags)
    tags.forEach(tag => {
      createPage({
        path: `wiki/tags/${slugify(tag)}`,
        component: wikiTagTemplate,
        context: {
          tag,
        }
      })
    })
  })

  return Promise.all([blogs, wikis])
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
      },
    },
  })
}

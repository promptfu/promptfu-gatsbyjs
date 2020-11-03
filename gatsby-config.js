/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

var path = require('path');

module.exports = {
  siteMetadata: {
    author: `Matthew Hassel`,
    description: `Tech tips and command line fu found within this dojo`,
    image: `tetris.jpg`,
    language: 'en',
    links: [
      {
        name: 'home',
        title: 'home',
        link: '/'
      },
      {
        name: 'blog',
        title: 'blog',
        link: '/blog'
      },
      {
        name: 'wiki',
        title: 'wiki',
        link: '/wiki',
      }
    ],
    url: `https://promptfu.com`,
    social: {
      facebook: {
        language: 'en_US',
        name: `Prompt Fu`,
        site: ``,
      },
      twitter: {
        name: `Prompt Fu`,
        site: `promptfu`,
      },
    },
    title: `Prompt Fu`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: path.join(__dirname, `content`, `blog`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `wiki`,
        path: path.join(__dirname, `content`, `wiki`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `content`, `assets`, `images`),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!--more-->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-embed-video`,
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        excludePattern: /(excluded-link|external)/,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-146282315-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl: url
                site_url: url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.updated,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___updated] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        updated
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Prompt Fu's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/*/categories`, `/*/categories/*`, `/*/tags`, `/*/tags/*`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl: url
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }

            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    updated
                  }
                }
              }
            }
          }
        `,
        serialize: ({ site, allSitePage, allMarkdownRemark }) =>
          allSitePage.edges.map(edge => {
          const {
            node: {
              frontmatter: {
                updated
              }
            }
          } = allMarkdownRemark.edges.find(element => element.node.fields.slug === edge.node.path) || {node: { frontmatter: { updated: undefined }}}

          if (updated) {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,

              lastmod: `${updated}`,
            }
          } else {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `monthly`,
            }
          }
        })
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prompt Fu`,
        short_name: `PromptFu`,
        description: `A wiki where collaboration and shared knowledge meet. Share knowledge, share and discuss     questions, answers, wiki, and projects.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: path.join(__dirname, `content`, `assets`, `images`, `favicon.png`),
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-twitter`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-remote-images`,
      options: {
        filter: node => node.internal.type === `DropboxImagesYaml`,
      }
    },
    `gatsby-plugin-offline`,
  ]
}


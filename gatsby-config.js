/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
    siteUrl: `https://promptfu.com`,
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
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `wiki`,
        path: `${__dirname}/content/wiki`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/assets/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!--more-->`,
        plugins: [
          {
            resolve: 'gatsby-remark-emoji',
            options: {
              emojiConversion: 'shortnameToUnicode',
              ascii: false,
            }
          },
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
              noInlineHighlight: true,
              prompt: {
                user: `user`,
                host: `promptfu.com`,
                global: true,
              },
            },
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
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          "G-F96Q6LQHNC"
        ]
      }
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
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return {
                  title: node.frontmatter.title,
                  description: node.excerpt,
                  date: node.frontmatter.updated,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___updated] },
                ) {
                  nodes {
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
            `,
            output: "/rss.xml",
            title: "Prompt Fu's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prompt Fu`,
        short_name: `PromptFu`,
        description: `A wiki where collaboration and shared knowledge meet. Share knowledge, share and discuss questions, answers, wiki, and projects.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `${__dirname}/content/assets/images/favicon.png`,
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
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/*/categories`, `/*/categories/*`, `/*/tags`, `/*/tags/*`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark {
              nodes {
                fields {
                  slug
                }
                frontmatter {
                  created
                  updated
                }
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: allPosts },
        }) => {
          const pathToDateMap = {};

          allPosts.map(post => {
            pathToDateMap[post.fields.slug] = { date: post.frontmatter.updated || post.frontmatter.created };
          });

          const pages = allPages.map(page => {
            return { ...page, ...pathToDateMap [page.path] }
          })

          return pages;
        },
        serialize: ({ path, date }) => {
          let entry = {
            url: path,
            changefreq: 'monthly',
            priority: 0.5,
          };

          if (date) {
            delete entry.changefreq;
            delete entry.priority;
            entry.lastmod = date;
          }

          return entry;

        },
      },
    },
  ],
};

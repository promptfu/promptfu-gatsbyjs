/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

var path = require('path');

module.exports = {
  siteMetadata: {
    author: `Matthew Hassel`,
    description: `A wiki where collaboration and shared knowledge meet. Share knowledge,
    share and discuss questions, answers, wikis, and projects.`,
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
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    // `gatsby-plugin-feed`,
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
    // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-twitter`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-remote-images`,
      options: {
        filter: node => node.internal.type === `DropboxImagesYaml`,
      }
    }
  ]
}


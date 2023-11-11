---
categories: ["web"]
created: 2023-11-10 19:27:00 -0600
description: "Discover how to host your Gatsby website on Firebase (by Google) with this step-by-step guide. This tutorial covers everything from site creation and building to Firebase setup and deployment, ensuring a seamless hosting process."
feature: true
image: clean-desk-setup-with-mac.png
show: true
tags: ["firebase", "gatsby", "promptfu", "web"]
title: "Deploy Your Gatsby Website to Firebase (by Google)"
updated: 2023-11-10 19:27:00 -0600
---
<br />
Discover how to host your Gatsby website on Firebase (by Google) with this step-by-step guide. This tutorial covers everything from site creation and building to Firebase setup and deployment, ensuring a seamless hosting process.

<br />
<br />
<center><q>To Infinity and Beyond Code!</q></center>

<!--more-->

# Prerequisites

- Node.js installed
- Gatsby CLI installed
- Firebase CLI installed
- A Google Firebase account

# Step 1: Create a Gatsby Website

If you already have a <a href="https://www.gatsbyjs.com/" target="_blank">Gatsby</a> website, you can skip to Step 2. Otherwise, create a new Gatsby site using the following command:

```shell
gatsby new my-gatsby-site
cd my-gatsby-site
```

# Step 2: Build Your Gatsby Site

Build your Gatsby site to generate static files:

```shell
gatsby build
```

This command creates a `public` directory with your site's static files.

# Step 3: Install Firebase Tools

Install Firebase CLI tools globally using npm:

```shell
npm install -g firebase-tools
```

# Step 4: Login to Firebase

Log in to Firebase using your Google account:

```shell
firebase login
```

Follow the prompts to authenticate.

# Step 5: Initialize Firebase in Your Project

Initialize Firebase in your Gatsby project directory:

```shell
firebase init
```

- Select **Hosting**.
- Choose an existing project or create a new one.
- Set `public` as your public directory.
- Choose not to configure as a single-page app.
- Do not overwrite your `index.html`.

# Step 6: Deploy to Firebase

Deploy your site to Firebase:

```shell
firebase deploy
```

Your Gatsby site is now deployed! Firebase will provide a URL to view your live site.

# Conclusion

Congratulations! You have successfully deployed your Gatsby website to Google Firebase. You can now share your site with the world and enjoy the benefits of Firebase's hosting features.

---
categories: ["web"]
created: 2023-11-15 19:35:00 -0600
description: "Deploy your Gatsby website to Firebase automatically with GitHub Actions."
feature: true
image: gatsby-deploy-to-firebase-hosting-with-github-actions.png
show: true
tags: ["firebase", "gatsby", "promptfu", "web"]
title: "Automagically Deploy Gastby Site with GitHub Actions"
---
After setting up your Gatsby website and manually deploying it to Firebase as detailed in our previous guide, it's time to streamline your deployment process. This article will guide you through the steps to set up automatic deployment to Firebase Hosting using GitHub Actions.

<center><q>May your deploys be smooth, and your build errors few. Keep automating and innovating!</q></center>

<!--more-->

# Prerequisites

- A Gatsby website as detailed in [Part 1](/blog/gatsby-deploy-to-firebase-hosting/)
- GitHub repository for your Gatsby project
- Firebase project set up and configured

# Setting Up Firebase Hosting with GitHub

1. **Initialize Firebase Hosting for GitHub**: In your project directory, run:

   ```shell
   firebase init hosting:github
   ```
   _Ref:_ <a href="https://firebase.google.com/docs/hosting/github-integration#set-up" target="_blank">Set up the GitHub Action to deploy to Firebase Hosting</a>

2. **Automated Setup**: The command will prompt you through setting up GitHub Actions, which includes:
   - Creating a service account in Firebase with deployment permissions.
   - Encrypting and uploading the service account's JSON key to your GitHub repository as a secret.
   - Writing GitHub workflow YAML configuration files to deploy to Firebase Hosting.

3. **Commit and Push**: Create a new branch, commit the workflow files, and push to GitHub.

4. **Merge to Main**: Merge the branch to your main branch.

# Conclusion

With these steps, every push to your main branch will trigger an automatic build and deployment of your Gatsby site to Firebase Hosting. This setup not only saves time, it also ensures consistency in your deployment process. Now, you can focus more on development and less on manual deployment tasks.

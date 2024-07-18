+++
title = 'Issue with CSS Not Loading for a Hugo Website Deployed with GitHub Pages'
date = 2024-07-18T15:38:30+05:30
description = 'Learn how to resolve the common issue of CSS not loading for Hugo websites deployed on GitHub Pages. Follow this step-by-step guide to fix the base URL configuration and ensure your Hugo site looks great.'
draft = false
keywords = 'Hugo website CSS not loading, GitHub Pages CSS issue, Hugo deployment GitHub Pages, Hugo CSS 404 error, fix Hugo CSS not loading, Hugo GitHub Pages deployment, Hugo baseURL configuration, web development troubleshooting, Hugo theme CSS path issue, Hugo GitHub Pages workflow'
+++
Deploying a Hugo website on GitHub Pages is a seamless process, thanks to the comprehensive documentation provided [here](https://gohugo.io/hosting-and-deployment/hosting-on-github/). However, I recently encountered an issue where my Hugo website launched successfully but failed to load the CSS.

## The Problem

Upon checking the developer console, I noticed the following error:

```
https://namanattri.dev/namanattri.dev/ananke/css/main.min.css 404
```

It was clear that the path to the CSS was incorrect. The generated HTML included the following line:

```html
<link rel="stylesheet" href="/namanattri.dev/ananke/css/main.min.css">
```

The base path `namanattri.dev` was being prepended to the theme CSS path incorrectly. The correct URL should have been:

```html
https://namanattri.dev/ananke/css/main.min.css
```

This would correspond to the following HTML:

```html
<link rel="stylesheet" href="/ananke/css/main.min.css">
```

## Investigating the Issue

The `config.toml` file already had the correct `baseURL` set:

```toml
baseURL = 'https://namanattri.dev/'
languageCode = 'en-us'
title = 'Naman Attri'
theme = 'ananke'
```

Upon further investigation, I realized the GitHub workflow file suggested by the documentation was passing `--baseURL "${{ steps.pages.outputs.base_url }}/"` to the Hugo command:

```yaml
run: |
  hugo \
    --gc \
    --minify \
    --baseURL "${{ steps.pages.outputs.base_url }}/"        
```

This was causing the `baseURL` to be appended incorrectly.

## The Solution

Removing `--baseURL "${{ steps.pages.outputs.base_url }}/"` from the workflow file fixed the issue. Here is the corrected workflow file:

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.128.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
          TZ: America/Los_Angeles
        run: |
          hugo \
            --gc \
            --minify         
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

After making this change, the website's CSS loaded correctly, and the site appeared as expected.

## Conclusion

If you're encountering a similar issue with CSS not loading for your Hugo site on GitHub Pages, check the `--baseURL` parameter in your workflow file. Removing it might resolve the path issues for your static assets. Happy coding!
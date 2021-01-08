# Contributing


Check if there are [issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues) related to your contribution, or post a [new issue](https://github.com/MaastrichtU-IDS/dsri-documentation/issues/new) to discuss improvement to the documentation. 

<a href="https://github.com/MaastrichtU-IDS/dsri-documentation/issues" target="_blank" rel="noopener noreferrer" aria-label="GitHub issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/MaastrichtU-IDS/dsri-documentation?label=dsri-documentation"/></a>

:::info Fork this repository

Otherwise you will need to first [fork this repository](https://github.com/MaastrichtU-IDS/dsri-documentation/fork), then send a pull request when your changes have been pushed.

:::

:::note Direct change if permission

If you are part of the [MaastrichtU-IDS organization on GitHub](https://github.com/MaastrichtU-IDS) you can directly create a new branch to make your change in the main repository. 

:::

---

## ⚡ Quick edit on GitHub

You can really easily make quick changes directly on the GitHub website by clicking the **Edit this page** button at the bottom left of each documentation page. Or browsing to your forked repository.

For example to edit the introduction page you can go to https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/introduction.md

---

## 🏗️ Larger changes locally

To edit the documentation it is easier to clone the repository on your laptop, and use a [user-friendly markdown editor](https://typora.io).

:::info Use a Markdown editor

We strongly recommend you to use a markdown editor, such as [Typora](https://typora.io). It makes writing documentation much faster, and more enjoyable.

:::

1. Clone the repository on your machine:

```bash
git clone https://github.com/MaastrichtU-IDS/dsri-documentation.git
cd dsri-documentation
```

2. Create a new branch from the `master` branch 🕊️

```bash
git checkout -b my-branch
```

3. Add your changes in this branch ✒️

4. Start the website on [http://localhost:3000](http://localhost:3000) to test it:

```bash
cd website
yarn install
yarn start
```


:::info Send a pull request

Send a pull request to the `master` branch when your changes are done

:::

:::note Development documentation

Read more about running the API in development at https://github.com/MaastrichtU-IDS/dsri-documentation#run-for-development

:::

---

## 🔄 Automated deployment

The documentation website is automatically updated and redeployed at each change to the `main` branch using a [GitHub Actions workflow](https://github.com/MaastrichtU-IDS/dsri-documentation/actions).

[![Publish to GitHub Pages](https://github.com/MaastrichtU-IDS/dsri-documentation/workflows/Publish%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/dsri-documentation/actions?query=workflow%3A%22Publish+to+GitHub+Pages%22)

---

## 📝 Help

Most pages of this website are written in Markdown, hence they are really easy to edit, especially when you are using a [convenient markdown editor](https://typora.io/). Only the `index.js` page is written in React JavaScript.

### 🔎 Files locations

* Main DSRI documentation markdown files in `website/docs`
  * Left docs menu defined in `website/sidebars.json` 
* Blog articles as markdown files in `website/docs`
* Index and contribute pages in `website/src/pages`
* Images in `website/src/static/img`
* Website configuration file in `website/docusaurus.config.js` 

### 🦄 Markdown tip

:::warning Colorful boxes

Use the following tags to create colorful boxes in markdown files:

:::

```markdown
:::note You can specify an optional title
Grey box
:::

:::tip Green box
The content and title *can* include markdown.
:::

:::info Blue box
Useful information.
:::

:::caution Be careful!
Yellow box
:::

:::danger Fire red box
Danger danger, mayday!
:::
```


## ✔️ Pull Request process

1. Before sending a pull request make sure the DSRI documentation website still work as expected with the new changes properly integrated:
```
cd website
yarn install
yarn start
```
2. [Send a pull request](https://github.com/MaastrichtU-IDS/dsri-documentation/compare) to the `master` branch.
3. Project contributors will review your change as soon as they can!


[![Build](https://github.com/MaastrichtU-IDS/dsri-documentation/workflows/Publish%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/dsri-documentation/actions?query=workflow%3A%22Publish+to+GitHub+Pages%22) [![Gitter](https://badges.gitter.im/um-dsri/community.svg)](https://gitter.im/um-dsri/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

The documentation website at [maastrichtu-ids.github.io/dsri-documentation](https://maastrichtu-ids.github.io/dsri-documentation/) is automatically updated by a [GitHub Action](/actions) at each push to this `master` branch.

## Edit documentation pages

Editing a documentation file is as easy as going to https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/docs/introduction.md.

* Edit a page by login with an account that has edit permissions.

* Otherwise fork the repository and modify the files you want. Pull requests are welcome!

Browse all documentation pages [here](https://github.com/MaastrichtU-IDS/dsri-documentation/tree/master/docs).

> We recommend using [Typora](https://typora.io/) to edit [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) files on your computer.

### Files locations

- Add new `docs` pages to [website/sidebars.json](https://github.com/MaastrichtU-IDS/d2s-docs/blob/master/website/sidebars.json).

- Main parameters of the website can be found in [website/siteConfig.js](https://github.com/MaastrichtU-IDS/d2s-docs/blob/master/website/siteConfig.js).

- Static content (any resource to download, images, css, js) can be provided in [website/static](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/website/static)
- HTML pages (other than docs markdown) are in [website/pages/en](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/website/pages/en)

## Run for development

To run in the `/website` directory.

```shell
cd website
yarn install
yarn start
```

## Deploy to GitHub pages

Make sure the `/website/build` directory has been generated before deploying.

```shell
./publish-github-page.sh
```

Script details:

```shell
cd website/
yarn install
yarn run build
GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true yarn run publish-gh-pages
git pull
```

## Run with Docker

```bash
docker-compose up
```

> Access at http://localhost:3000/dsri-documentation/

## Deploy on server

Using jwilder's [nginx-proxy](https://github.com/jwilder/nginx-proxy) and [nip.io](https://nip.io/).

Set environment `VIRTUAL_HOST` and `VIRTUAL_PORT` in `docker-compose.yml`.

```bash
docker-compose up -d
```

> Access at http://dsri.137.120.31.101.nip.io/dsri-documentation/

## Install Docusaurus boostrap tool

```shell
sudo npm install --global yarn
sudo npm install --global docusaurus-init

npx docusaurus-init
```

## Acknowledgments

Documentation website generated using [Docusaurus](https://docusaurus.io/).
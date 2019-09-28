# DSRI documentation

Generated using [Docusaurus](https://docusaurus.io/).

## Development

To run in the `/website` directory.

```shell
npm install
npm start
```

## Run with Docker

```bash
docker-compose up
```

> Access at http://localhost:3000/data2services/

## Deploy on server

Using jwilder's [nginx-proxy](https://github.com/jwilder/nginx-proxy) and [nip.io](https://nip.io/).

Set environment `VIRTUAL_HOST` and `VIRTUAL_PORT` in `docker-compose.yml`.

```bash
docker-compose up -d
```

> Access at http://data2services.137.120.31.101.nip.io/data2services/

## Deploy to GitHub pages

To run in `/website` directory. Make sure the `/website/build` directory has been generated before deploying.

```shell
npm install
npm run build
GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
```

## Add new docs page

* Create the `.md` in `/docs` and define it's `id` in the header (it will be used to build the URL path)
* Add the page in the right category in `sideBars.json`

## Search with Algolia

https://community.algolia.com/docsearch/

## Install boostrap tool

```shell
sudo npm install --global yarn
sudo npm install --global docusaurus-init

npx docusaurus-init
```

## Logo created with

[freelogodesign.org](https://preview.freelogodesign.org/?lang=EN&name=&logo=4ecd9498-e2b0-4510-9ff4-54659e900382)


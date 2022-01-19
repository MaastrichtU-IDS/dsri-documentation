[![Build](https://github.com/MaastrichtU-IDS/dsri-documentation/workflows/Publish%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/dsri-documentation/actions?query=workflow%3A%22Publish+to+GitHub+Pages%22) [![Slack](https://img.shields.io/badge/Chat%20on-Slack-blueviolet)](https://dsri.slack.com)

The documentation website at [maastrichtu-ids.github.io/dsri-documentation](https://maastrichtu-ids.github.io/dsri-documentation/) is automatically updated by a [GitHub Action](/actions) at each push to this `master` branch.

## Contribute

Contributions are welcome! See the [guidelines to contribute 👨‍💻](https://maastrichtu-ids.github.io/dsri-documentation/contributing).

## Edit documentation pages

Editing a documentation file is as easy as going to https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/introduction.md.

* Edit a page by login with an account that has edit permissions.

* Otherwise fork the repository and modify the files you want. Pull requests are welcome!

Browse all documentation pages [here](https://github.com/MaastrichtU-IDS/dsri-documentation/tree/master/website/docs).

> We recommend using [Typora](https://typora.io/) to edit [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) files on your computer.

### Files locations

- All documentation pages are in `website/docs`
- Add new `docs` pages links to the sidebar: [website/sidebars.json](https://github.com/MaastrichtU-IDS/d2s-docs/blob/master/website/sidebars.json).
- Main parameters of the website can be found in [website/docusaurus.config.js](https://github.com/MaastrichtU-IDS/d2s-docs/blob/master/website/docusaurus.config.js).
- Static content (any resource to download, images, css, js) can be provided in [website/static](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/website/static)
- Pages other than `docs` are in [website/src/pages](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/website/src/pages) (e.g. `help.md` or `index.js`)

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
GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true yarn deploy
git pull
```

## Run with Docker

Run the database on http://localhost:8080, API on http://localhost:8000, and CRON job:

```bash
docker-compose up
```

## Deploy on server

Define the `.env` file to change the default configuration (admin password, Slack config):

```
PASSWORD=password
SLACK_BOT_TOKEN=xoxb-0000000000-0000000000-0000000000
SLACK_CHANNEL=UQL6BCQJH
SMTP_USER=user@example.com
SMTP_PASSWORD=password
```

Start the docker-compose in production using jwilder's [nginx-proxy](https://github.com/jwilder/nginx-proxy) and [nip.io](https://nip.io/).

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

To import a CSV of users in the database: remove the header, set `created_at` as a `VARCHAR(255)`, import the CSV file via phpMyAdmin, then set back `created_at` as `DATETIME`

```sql
UPDATE user SET created_at = STR_TO_DATE(created_at, '%d-%m-%Y %H:%i:%s');
UPDATE user SET use_dsri_date = STR_TO_DATE(use_dsri_date, '%d-%m-%Y');
```

## Markdown tips

```
:::note
The content and title *can* include markdown.
:::

:::tip You can specify an optional title
Heads up! Here's a pro-tip.
:::

:::info
Useful information.
:::

:::caution
Warning! You better pay attention!
:::

:::danger
Danger danger, mayday!
:::
```

Embed a Google docs presentation (size does not change dynamically). You can check the ["documentation" by gitlab](https://about.gitlab.com/handbook/markdown-guide/#google-slides) but it does not work (how can they expect to get a responsive website by providing hardcoded pixel size?):

```bash
<figure class="video_container">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRAfZdOfGt761tIAj2e35OYrOL4uIKWiAQB15MXvsqso3XJ5Mr3-W4dOa9KjDTZpi1LE_D2CU1F5Thy/embed?start=false&loop=false&delayms=15000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</figure>

# With CSS:
.video-container{
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
}
```

## Video

Convert mkv to webm:

```bash
ffmpeg -i video_dsri_introduction.mkv -c:v libvpx -crf 10 -c:a libvorbis video_dsri_introduction.webm
```

## Acknowledgments

Documentation website generated using [Docusaurus](https://docusaurus.io/).
[![Build](https://github.com/MaastrichtU-IDS/dsri-documentation/workflows/Publish%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/dsri-documentation/actions?query=workflow%3A%22Publish+to+GitHub+Pages%22) [![Slack](https://img.shields.io/badge/Chat%20on-Slack-blueviolet)](https://dsri.slack.com)

The documentation website at [dsri.maastrichtuniversity.nl](https://dsri.maastrichtuniversity.nl/) is automatically updated by a [GitHub Action](/actions) at each push to this `master` branch.

## Contribute

Contributions are welcome! See the [guidelines to contribute to the website 👨‍💻](https://dsri.maastrichtuniversity.nl/docs/contribute).

### Edit documentation pages

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
- Pages other than `docs` are in [website/src/pages](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/website/src/pages) (e.g. `help.md` or `index.tsx`)

### Add an announcement

You can easily add a general announcement bar on the website if you want to pass some information to your users, like dates of maintenance

Open the file `website/docusaurus.config.js` and update the `announcementBar` variable.

You can comment the `announcementBar` code block when you want to remove the announcement bar.

## Run for development

### Just run the website

To check changes in the documentation, go to the `/website` directory and start the website on http://localhost:19006 using the production API for user statistics:

```shell
cd website
yarn install
yarn start
```

### Run the full stack

To run the full stack including the database and API, we use docker-compose

1. Define the `.env` file to change the default configuration (user credential to enable/disable GPU on the cluster, Slack config):

   ```bash
   DB_PASSWORD=password
   API_PASSWORD=password
   CLUSTER_USER=dsri.username
   CLUSTER_PASSWORD=password
   SLACK_BOT_TOKEN=xoxb-0000000000-0000000000-0000000000
   SLACK_CHANNEL=C03B48CQ3QW
   ```

2. Run the stack:

   * API on http://localhost:8000, automatically reloaded on change to the code, with CRON job enabled
   * The GPU calendar on http://localhost:8001
   * Database accessible through phpMyAdmin on http://localhost:8002

   ```bash
   docker-compose up
   ```

   > ⚠️ The first time you start the stack you might need to stop and restart the stack once the SQL database has been initialized for the API to properly connect to the database

3. In another terminal, run the website on http://localhost:3000, it will use the local API to display stats:

   ```bash
   cd website
   yarn install
   yarn dev
   ```

### Update dependencies

Dependabot will automatically create pull requests to update libraries containing a known vulnerability that have been fixed in newer version.

You can also use `yarn` to automatically upgrade packages that can:

```bash
yarn upgrade
```

Alternatively you can also change the packages versions requirements in the `package.json` and run `yarn`

## Deploy in production

### Deploy the frontend to GitHub pages

The documentation website at [dsri.maastrichtuniversity.nl](https://dsri.maastrichtuniversity.nl/) is automatically updated by a [GitHub Action](https://github.com/MaastrichtU-IDS/dsri-documentation/blob/master/actions) at each push to the `master` branch of this repository.

The GitHub Action will automatically compile the website to HTML in the `gh-page` branch which is served by GitHub Page.

### Deploy the backend on a server

Define the `.env` file to change the default configuration (user credential to enable/disable GPU on the cluster, Slack config):

```bash
DB_PASSWORD=password
API_PASSWORD=password
CLUSTER_USER=dsri.username
CLUSTER_PASSWORD=password
SLACK_BOT_TOKEN=xoxb-0000000000-0000000000-0000000000
SLACK_CHANNEL=C03B48CQ3QW
```

Start the docker-compose in production using jwilder's [nginx-proxy](https://github.com/jwilder/nginx-proxy) and [nip.io](https://nip.io/).

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Database setup

#### Import CSV

To import a CSV of users in the database: remove the header, set `created_at` and `use_dsri_date`as a `VARCHAR(255)`, import the CSV file via phpMyAdmin, then set back `created_at` and `use_dsri_date` as `DATETIME`

```sql
UPDATE user SET created_at = STR_TO_DATE(created_at, '%d-%m-%Y %H:%i:%s');
UPDATE user SET use_dsri_date = STR_TO_DATE(use_dsri_date, '%d-%m-%Y');
```

#### Create new database users

Login with the `root` user, and click on the **SQL** tab

Replace `username` by the username, and `password` by the password (thanks captain obvious):

Commands to create a read-only user:

```sql
DROP USER IF EXISTS 'username'@'%';
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT USAGE ON *.* TO 'username'@'%' IDENTIFIED BY 'password';
GRANT SELECT ON `dsri-db`.* TO 'username'@'%';
FLUSH PRIVILEGES;
```

Or give full access:

```sql
GRANT ALL PRIVILEGES ON `dsri-db`.* TO 'username'@'%';
```

### Change your user password

To change the password of your database user, click on the **SQL** tab, and execute:

```sql
SET PASSWORD FOR 'username'@'%' = PASSWORD('newpassword');
```

### Backup

#### Export as CSV

1. Go to phpMyAdmin > click on the `dsri-db` database > go to the **Export** tab
2. Change the **Export method** to **Custom**
3. Change the **Format** to **CSV** or **CSV for MS Excel**
4. Check **Export tables as separate files**
4. Click **Go**

#### Complete database backup

A CSV backup of the database is generated every week by a CRON job (cf. https://github.com/MaastrichtU-IDS/dsri-documentation/blob/master/server/api/main.py#L52) and stored locally on the server where the service is deployed.

For reliability reason we choose to export as CSV: open, lightweight, hard to corrupt, and contains all information we need to backup (otherwise we would need to fight with weird backup tools poorly built by lost sysadmins that fails most of the time just to save some useless indexes, which just leads to increased chances of corrupting the data we backup...)

## Markdown tips

```markdown
:::note
Grey box
:::
:::tip You can specify an optional title
Green box
:::
:::info
Blue box
:::
:::caution
Orange bpx
:::
:::danger
Red box
:::
```

Embed a Google docs presentation (size does not change dynamically). You can check the ["documentation" by gitlab](https://about.gitlab.com/handbook/markdown-guide/#google-slides) but it does not work (how can they expect to get a responsive website by providing hardcoded pixel size?):

```html
<figure class="video_container">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRAfZdOfGt761tIAj2e35OYrOL4uIKWiAQB15MXvsqso3XJ5Mr3-W4dOa9KjDTZpi1LE_D2CU1F5Thy/embed?start=false&loop=false&delayms=15000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</figure>

# With CSS:
<script>
.video-container{
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
}
</script>
```

Convert a mkv video to webm (better for direct embedding):

```bash
ffmpeg -i video_dsri_introduction.mkv -c:v libvpx -crf 10 -c:a libvorbis video_dsri_introduction.webm
```

## Mermaid sourcecodes

Request access to UM internal servers

```
sequenceDiagram
    Researcher->>+DSRI-team: Request DSRI access to UM system
    DSRI-team->>+UM-SOC: Request DSRI access to UM system
    UM-SOC-->>+DSRI-team: Go ahead
    DSRI-team-->>+System admin:



    sequenceDiagram
     Researcher->>+DSRI-team: Request DSRI access to UM system
    DSRI-team->>+UM-SOC: Request DSRI access to UM system
    UM-SOC-->>+DSRI-team: Go ahead
    DSRI-team->>+UM System admin: Request access from DSRI
    UM System admin-->>+ICTS: Request change in firewall
    DSRI-team-->>+ICTS: Request change in firewall
    DSRI-team->>+Researcher: UM system accessible from DSRI
```

## Acknowledgments

Documentation website generated using [Docusaurus](https://docusaurus.io/).
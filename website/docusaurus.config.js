module.exports={
  "title": "Data Science Research Infrastructure",
  "tagline": "A distributed and scalable infrastructure to run Data Science experiments at Maastricht University",
  "url": "https://maastrichtu-ids.github.io/",
  "baseUrl": "/dsri-documentation/",
  "organizationName": "MaastrichtU-IDS",
  "projectName": "dsri-documentation",
  "scripts": [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/dsri-documentation/js/code-blocks-buttons.js"
  ],
  "stylesheets": [
    "https://fonts.googleapis.com/css?family=Roboto:200,300,400,400i,500,600,700",
    "/dsri-documentation/css/code-blocks-buttons.css"
  ],
  "favicon": "img/favicon.ico",
  "customFields": {
    "repoUrl": "https://github.com/MaastrichtU-IDS/dsri-documentation",
    "users": [
      {
        "caption": "Maastricht University",
        "image": "img/favicon.ico",
        "infoLink": "https://www.maastrichtuniversity.nl/",
        "pinned": true
      },
      {
        "caption": "Bio2RDF project",
        "image": "img/bio2rdf.png",
        "infoLink": "http://bio2rdf.org/",
        "pinned": true
      },
      {
        "caption": "NCATS Biomedical Data Translator",
        "image": "img/biolink-logo.png",
        "infoLink": "https://ncats.nih.gov/translator",
        "pinned": true
      },
      {
        "caption": "Brightlands",
        "image": "img/brightlands-logo.svg",
        "infoLink": "https://www.brightlands.com/",
        "pinned": true
      },
      {
        "caption": "BReIN project",
        "image": "img/Logo_BReIN.png",
        "infoLink": "https://www.breinmaastricht.nl/",
        "pinned": true
      }
    ],
    "markdownPlugins": [
      null,
      null,
      null
    ],
    "gaGtag": true
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "editUrl": "https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/",
          "path": "./docs",
          "sidebarPath": require.resolve('./sidebars.json')
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": "../src/css/customTheme.css"
        }
      }
    ]
  ],
  "plugins": [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        language: ["en"],
      },
    ],
  ],
  "themeConfig": {
    "hideableSidebar": true,
    "announcementBar": {
      "id": 'supportus',
      "content":
        '⭐️ If you like the DSRI, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/MaastrichtU-IDS/dsri-documentation">GitHub</a>! ⭐️',
    },
    "navbar": {
      "hideOnScroll": false,
      "title": "Data Science Research Infrastructure",
      "logo": {
        "src": "img/favicon.ico"
      },
      "items": [
        {
          "to": "docs/",
          "label": "Documentation",
          "position": "left"
        },
        {
          "to": "/help",
          "label": "Help",
          "position": "left"
        },
        {
          "href": "/contributing",
          "label": "Contribute",
          "position": "left"
        },
        {
          "href": "https://github.com/MaastrichtU-IDS/dsri-documentation",
          // "label": "GitHub",
          "position": "right",
          "className": 'header-github-link'
        }
      ]
    },
    "image": "img/undraw_online.svg",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2021 <a href='https://maastrichtuniversity.nl/ids' target='_blank' rel='noopener noreferrer'>Institute of Data Science</a> at Maastricht University",
      "logo": {
        "src": "img/favicon.ico",
        "href": "https://maastrichtuniversity.nl/"
      }
    },
    "gtag": {
      "trackingID": "UA-172146359-1"
    }
  }
}
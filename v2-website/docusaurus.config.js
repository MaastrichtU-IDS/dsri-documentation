module.exports={
  "title": "Data Science Research Infrastructure",
  "tagline": "A distributed and scalable infrastructure to run Data Science experiments",
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
          "editUrl": "https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/docs/",
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
  "plugins": [],
  "themeConfig": {
    "navbar": {
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
          "href": "https://github.com/MaastrichtU-IDS/dsri-documentation/issues",
          "label": "Issues",
          "position": "left"
        }
      ]
    },
    "image": "img/undraw_online.svg",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2020 Institute of Data Science at Maastricht University",
      "logo": {
        "src": "img/favicon.ico"
      }
    },
    "gtag": {
      "trackingID": "UA-172146359-1"
    }
  }
}
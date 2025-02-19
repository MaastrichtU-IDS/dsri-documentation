module.exports={
  "title": "Data Science Research Infrastructure",
  "tagline": "A distributed and scalable infrastructure to run Data Science experiments at Maastricht University",
  // "url": "https://maastrichtu-ids.github.io/",
  // "baseUrl": "/",
  "url": "https://dsri.maastrichtuniversity.nl/",
  "baseUrl": "/",
  "organizationName": "MaastrichtU-IDS",
  "projectName": "dsri-documentation",
  // trailingSlash: false,
  "scripts": [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-blocks-buttons.js"
  ],
  "stylesheets": [
    "https://fonts.googleapis.com/css?family=Roboto:200,300,400,400i,500,600,700",
    "/css/code-blocks-buttons.css"
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
    "gaGtag": false
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
          "customCss": "./src/css/customTheme.css"
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
    require.resolve('docusaurus-plugin-image-zoom'),
    [
      "docusaurus2-dotenv",
      {
        systemvars: true,
      },
    ],
  ],
  "themeConfig": {
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      }
    },
    //announcementBar: {
    //  id: 'support_us',
    //  content:
    //    '🔨 <b>Maintenance</b> will be performed on the DSRI <b>from the 22 to the 30 of October</b>, please take necessary precautions make sure your data is backed up by this date 🔨',
    //  backgroundColor: '#fdd835',
    //   textColor: '#091E42',
    //   isCloseable: false,
    //},
    "prism": {
      "additionalLanguages": ['powershell'],
      // "additionalLanguages": ['powershell', 'dockerfile'],
    },
    "navbar": {
      "hideOnScroll": false,
      "title": " Data Science Reasearch Infrastructure",
      "logo": {
        "src": "img/dsri_.ico"
      },
      "items": [
        {
          "to": "docs/",
          "label": "Documentation",
          "position": "left"
        },
        {
          "to": "/gpu-booking",
          "label": "GPU calendar",
          "position": "left"
        },
        //{
        //  "to": "/training",
        //  "label": "Training",
        //  "position": "left"
        //},
        //{
        //  "to": "/help",
        //  "label": "Help",
        //  "position": "left"
        //},
        {
          "to": "/acknowledgement",
          "label": "Acknowledgement",
          "position": "left"
        },
         {
          "to": "/contact",
          "label": "Contact",
          "position": "left"
        },
        {
          "href": "https://github.com/MaastrichtU-IDS/dsri-documentation",
          // "label": "GitHub",
          "position": "right",
          "className": 'header-github-link'
        },
        {
          type: 'html',
          position: 'right',
          value: `<a href="https://library.maastrichtuniversity.nl/"><img src="/img/favicon.ico" alt="UM" width="30" height="30"/></a>`,
        },
      ]
    },
    "image": "img/undraw_online.svg",
    "footer": {
      "links": [
        {
          title: "More",
          items: [
            { label: "Acknowledgement", to: "/acknowledgement" },
            { label: "Training", to: "/training"}
          ]
        }
      ],
      "copyright": `Copyright © ${new Date().getFullYear()} <a href='https://library.maastrichtuniversity.nl/' target='_blank' rel='noopener noreferrer'>University Library</a> at Maastricht University`,
      "logo": {
        "src": "img/favicon.ico",
        "href": "https://maastrichtuniversity.nl/"
      }
    },
    zoom: {
      selector: '.markdown > img',
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        }
      }
    },
    // "gtag": {
    //   "trackingID": "UA-172146359-1"
    // }
  }
}

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all options

const extlink = require('remarkable-extlink');

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Maastricht University',
    image: 'img/favicon.ico',
    infoLink: 'https://www.maastrichtuniversity.nl/',
    pinned: true,
  }, 
  {
    caption: 'Bio2RDF project',
    image: 'img/bio2rdf.png',
    infoLink: 'http://bio2rdf.org/',
    pinned: true,
  },
  {
    caption: 'NCATS Biomedical Data Translator',
    image: 'img/biolink-logo.png',
    infoLink: 'https://ncats.nih.gov/translator',
    pinned: true,
  },
  {
    // TODO: Brein logo and URL
    caption: 'Brightlands',
    image: 'img/brightlands-logo.svg',
    infoLink: 'https://www.brightlands.com/',
    pinned: true,
  }
];

const siteConfig = {
  title: 'Data Science Research Infrastructure', // Title for your website.
  tagline: 'A scalable, distributed, and user-friendly infrastructure to run Data Science workloads',
  url: 'https://maastrichtu-ids.github.io/', // Your website URL
  baseUrl: '/dsri-documentation/', // Base URL for your project */
  // We deploy at https://maastrichtu-ids.github.io/dsri-documentation/

  projectName: 'dsri-documentation',  // The name of your GitHub project. Same as above.
  organizationName: 'MaastrichtU-IDS', // Your GitHub username.
  repoUrl: 'https://github.com/MaastrichtU-IDS/dsri-documentation',
  // URL for editing docs
  editUrl: 'https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/docs/',

  // Deploy to GitHub pages (first generate build dir)
  // npm run build
  // GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages

  /* Colors for website, see https://material.io/resources/color/#!/ */
  colors: {
    // primaryColor: '#ef4c22', // Maastricht University Orange 
    // primaryColor: '#eb2126', // MapR light Red
    // primaryColor: '#db212e', // MapR Red
    primaryColor: '#c62828', // Red 800 (Fire Engine Red)
    // primaryColor: '#ff2800', // Fer Red
    // primaryColor: '#ba2133', // MapR Redder
    // primaryColor: '#ad213b', // MapR Reddest
    // secondaryColor: '#0277bd',  // Blue
    secondaryColor: '#1565c0',  // Bluer
    // secondaryColor: '#001f3e',  // Maastricht University Blue
    // secondaryColor: '#1a237e',  // Mat close to Maastricht University Blue
  },
  // themes: ['@docusaurus/theme-live-codeblock'],
  // npm i @docusaurus/theme-live-codeblock

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'introduction', label: 'Documentation'},
    {page: 'help', label: 'Help'},
    {href: 'https://github.com/MaastrichtU-IDS/dsri-documentation/issues', label: 'Issues'},
    // {blog: true, label: 'Blog'},
    { search: false },
    // { languages: true }
  ],

  // For search: https://community.algolia.com/docsearch/documentation/
  // algolia: {
  //   apiKey: 'efewfw343242',
  //   indexName: 'dsri-documentation',
  //   algoliaOptions: {} // Optional, if provided by Algolia
  // },

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Institute of Data Science at Maastricht University`,

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/dsri-documentation/js/code-blocks-buttons.js',
  ],
  stylesheets: [
    // TODO: warning to fix, remove '400i'?
    // downloadable font: no supported format found (font-family: "Roboto" style:normal weight:400 stretch:100 src index:1) source: (end of source list)
    'https://fonts.googleapis.com/css?family=Roboto:200,300,400,400i,500,600,700',
    '/dsri-documentation/css/code-blocks-buttons.css'
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: false,

  markdownPlugins: [
    function(md) {
      extlink(md, {
        host: 'localhost', // The hrefs that you DON'T want to be external
      });
    },
    /**
     * Enable some defaults on the Markdown class
     */
    function enableInlineRuler(md) {
      md.inline.ruler.enable([
        'sub',
        'sup'
      ]);
    },
    /**
     * Not working
     * This will add a class to an image. To use structure as:
     *   [<title>](<img path){: .<class>}
     */
    function addImageClass(md) {
      // This takes a render method in as an arg.
      const rule = (imageRule) => (tokens, idx, options, env) => {
        // Get the default image
        const img = imageRule(tokens, idx, options, env);

        const clsTkn = tokens[idx+1];
        // The token we are looking for will be text with content
        if (!clsTkn || clsTkn.type !== 'text' || !clsTkn.content) {
          return img;
        }

        //Finds the "{: .<className>}" and pulls out the className only
        const getClassName = (name) => {
          return name.match(/\{\:\s*\.[\w-]*\s*\}/g)
            ? name.match(/(\w|\-)+/g)
            : '';
        }

        const classString = ` class="${getClassName(clsTkn.content)}">`;
        // Remove the special token or it will get rendered
        clsTkn.content = '';

        return img.slice(0, -1) + classString;
      };

      md.renderer.rules.image = rule(md.renderer.rules.image);
    }
  ],

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,
  // Show documentation's last update time.
  // enableUpdateTime: true,

  /* Custom fonts for website. Not working. Directly in custom.css */
  // fonts: {
  //   myFont: [
  //     "Open Sans",
  //     "Roboto",
  //     "Serif"
  //   ]
  // },

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    // TODO: add SPARQL
    // theme: 'solarized-dark',
    // theme: 'tomorrow-night',
    // theme: 'ocean',
    // theme: 'tomorrow-night-eighties',
    theme: 'atom-one-dark',
    hljs: function(hljs) {
      // Redefine Shell lang to add some keywords to highlight
      // className: variable and attr (orange), keyword (purple), symbol and meta (blue), function (grey), subst (red), built_in (light orange)
      hljs.registerLanguage('shell', function(hljs) {
        var VAR = {
          className: 'variable',
          variants: [
            {begin: /\$[\w\d#@][\w\d_]*/},
            {begin: /\$\{(.*?)}/}
          ]
        };
        var ARGS = {
          className: 'template-variable',
          variants: [
            {begin: /\s-[-]?[\w-]*/},
          ]
        };
        var TOOLS = {
          className: 'keyword',
          variants: [
            {begin: /(?:\s|^)(cd|mv|cp|chmod|chown|sed|wget|curl|tar|oc|brew|git|argo|apt-get|apt|docker|docker-compose|cwl-runner)(?:\s|$)/},
          ]
        };
        // Mysteriously not doing his job, it is defined the same way as ARGS and TOOLS though.
        // But still finding a way to do it through the built_in in return. 
        // Note: this highlight framework logic makes no sense and is poorly documented 
        var COMMAND = {
          className: 'built_in',
          variants: [
            {begin: /(?:\s|^)(ps|config|clone|submodule|pull|install|up|submit|terminate|delete|get|create|build|run|stop|rsh|login|list)(?:\s|$)/},
          ]
        };
        var RARE = {
          className: 'meta',
          variants: [
            {begin: /(?:\s|^)(sudo|nohup)(?:\s|$)/},
          ]
        };
        var QUOTE_STRING = {
          className: 'string',
          begin: /"/, end: /"/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            VAR,
            {
              className: 'variable',
              begin: /\$\(/, end: /\)/,
              contains: [hljs.BACKSLASH_ESCAPE]
            }
          ]
        };
        var ESCAPED_QUOTE = {
          className: '',
          begin: /\\"/
      
        };
        var APOS_STRING = {
          className: 'string',
          begin: /'/, end: /'/
        };
      
        return {
          aliases: ['sh', 'zsh'],
          lexemes: /\b-?[a-z\._]+\b/,
          keywords: {
            keyword:    // purple
              'if then else elif fi for while in do done case esac function ' ,
              // + 'cd mv cp chmod chown sed wget curl tar oc brew git argo apt-get apt docker docker-compose cwl-runner',
            literal:
              'true false',
            built_in:   // orange
              // Shell built-ins
              // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
              'break cd continue eval exec exit export getopts hash pwd readonly return shift test times ' +
              'trap umask unset ' +
              // Bash built-ins
              'alias bind builtin caller command declare echo enable help let logout mapfile printf ' +
              'read readarray source type typeset ulimit unalias ' +
              // Shell modifiers
              'set shopt ' +
              // Zsh built-ins
              'autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles ' +
              'compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate ' +
              'fc fg float functions getcap getln history integer jobs kill limit log noglob popd print ' +
              'pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit ' +
              'unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof ' +
              'zpty zregexparse zsocket zstyle ztcp'
              // Vincent built-ins,
              + 'ps clone submodule pull install up submit terminate delete get create build run stop rsh login list',
            _:
              '-ne -eq -lt -gt -f -d -e -s -l -a' // relevance booster
          },
          contains: [
            {
              className: 'meta',
              begin: /^#![^\n]+sh\s*$/,
              relevance: 10
            },
            {
              className: 'function',
              begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
              returnBegin: true,
              contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /\w[\w\d_]*/})],
              relevance: 0
            },
            hljs.HASH_COMMENT_MODE,
            COMMAND,
            QUOTE_STRING,
            ESCAPED_QUOTE,
            APOS_STRING,
            VAR,
            ARGS, TOOLS, RARE
          ]
        };
      }),
      hljs.registerLanguage('ttl',function(hljs) {
        var KEYWORDS = {
          keyword: 'base|10 prefix|10 @base|10 @prefix|10',
          literal: 'true|0 false|0',
          built_in: 'a|0'
        };
      
        var IRI_LITERAL = {// https://www.w3.org/TR/turtle/#grammar-production-IRIREF
          className: 'literal',
          relevance: 1, // XML tags look also like relative IRIs
          begin: /</,
          end: />/,
          illegal: /[^\x00-\x20<>"{}|^`]/, // TODO: https://www.w3.org/TR/turtle/#grammar-production-UCHAR
        };
        
        // https://www.w3.org/TR/turtle/#terminals
        var PN_CHARS_BASE    = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u10000-\uEFFFF';
        var PN_CHARS_U       = PN_CHARS_BASE+'_';
        var PN_CHARS         = '-'+PN_CHARS_U+'0-9\u00B7\u0300-\u036F\u203F-\u2040';
        var BLANK_NODE_LABEL = '_:['+PN_CHARS_U+'0-9](['+PN_CHARS+'.]*['+PN_CHARS+'])?';
        var PN_PREFIX        = '['+PN_CHARS_BASE+'](['+PN_CHARS+'.]*['+PN_CHARS+'])?';
        var PERCENT          = '%[0-9A-Fa-f][0-9A-Fa-f]';
        var PN_LOCAL_ESC     = '\\\\[_~.!$&\'()*+,;=/?#@%-]';
        var PLX              = PERCENT+'|'+PN_LOCAL_ESC;
        var PNAME_NS         = '('+PN_PREFIX+')?:';
        var PN_LOCAL         = '(['+PN_CHARS_U+':0-9]|'+PLX+')(['+PN_CHARS+'.:]|'+PLX+')*(['+PN_CHARS+':]|'+PLX+')?';
        var PNAME_LN         = PNAME_NS+PN_LOCAL;
        var PNAME_NS_or_LN   = PNAME_NS+'('+PN_LOCAL+')?';
        
        var PNAME = {
          begin: PNAME_NS_or_LN,
          relevance: 0,
          className: 'symbol',
        };
      
        var BLANK_NODE = {
          begin: BLANK_NODE_LABEL,
          relevance: 10,
          className: 'template-variable',
        };
      
        var LANGTAG = {
          begin: /@[a-zA-Z]+([a-zA-Z0-9-]+)*/,
          className: 'type',
          relevance: 5, // also catches objectivec keywords like: @protocol, @optional
        };
      
        var DATATYPE =  {
          begin: '\\^\\^'+PNAME_LN,
          className: 'type',
          relevance: 10,
        };
      
        var TRIPLE_APOS_STRING = {
          begin: /'''/,
          end: /'''/,
          className: 'string',
          relevance: 0,
        };
      
        var TRIPLE_QUOTE_STRING = {
          begin: /"""/,
          end: /"""/,
          className: 'string',
          relevance: 0,
        };
        
        var APOS_STRING_LITERAL = JSON.parse(JSON.stringify(hljs.APOS_STRING_MODE));
        APOS_STRING_LITERAL.relevance = 0;
      
        var QUOTE_STRING_LITERAL = JSON.parse(JSON.stringify(hljs.QUOTE_STRING_MODE));
        QUOTE_STRING_LITERAL.relevance = 0;
      
        var NUMBER = JSON.parse(JSON.stringify(hljs.C_NUMBER_MODE));
        NUMBER.relevance = 0;
      
        return {
          case_insensitive: true,
          keywords: KEYWORDS,
          aliases: ['turtle', 'n3'],
          contains: [
            LANGTAG,
            DATATYPE,
            IRI_LITERAL,
            BLANK_NODE,
            PNAME,
            TRIPLE_APOS_STRING, TRIPLE_QUOTE_STRING, // order matters
            APOS_STRING_LITERAL, QUOTE_STRING_LITERAL,
            NUMBER,
            hljs.HASH_COMMENT_MODE,
          ],
          exports: {
            LANGTAG: LANGTAG,
            DATATYPE: DATATYPE,
            IRI_LITERAL: IRI_LITERAL,
            BLANK_NODE: BLANK_NODE,
            PNAME: PNAME,
            TRIPLE_APOS_STRING: TRIPLE_APOS_STRING,
            TRIPLE_QUOTE_STRING: TRIPLE_QUOTE_STRING,
            APOS_STRING_LITERAL: APOS_STRING_LITERAL,
            QUOTE_STRING_LITERAL: QUOTE_STRING_LITERAL,
            NUMBER: NUMBER,
            KEYWORDS: KEYWORDS,
          }
        };
      }      
    );
      hljs.registerLanguage("sparql",
      function(hljs) {
        var ttl = hljs.getLanguage('ttl').exports;
        var KEYWORDS = {
          keyword: 'base|10 prefix|10 @base|10 @prefix|10 add all as|0 ask bind by|0 clear construct|10 copymove create data default define delete describe distinct drop exists filter from|0 graph|10 group having in|0 insert limit load minus named|10 not offset optional order reduced select|0 service silent to union using values where with|0',
          function: 'abs asc avg bound ceil coalesce concat containsstrbefore count dayhours desc encode_for_uri floor group_concat if|0 iri isblank isiri isliteral isnumeric isuri langdatatype langmatches lcase max md5 min|0 minutes month now rand regex replace round sameterm sample seconds separator sha1 sha256 sha384 sha512 str strafter strdt strends strlang strlen strstarts struuid substr sum then timezone tz ucase uribnode uuid year',
          literal: 'true|0 false|0',
          built_in: 'a|0'
        };
      
        var VARIABLE = {
          className: 'variable',
          begin: '[?$]' + hljs.IDENT_RE,
          relevance: 0,
        };
      
        var JSON_QUOTE_STRING = {
          begin: /"""\s*\{/,          // TODO why can't I write (?=\{)
          end: /"""/,
          subLanguage: 'json',
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0,
        };
        
        var JSON_APOS_STRING = {
          begin: /'''\s*\{/,          // TODO why can't I write (?=\{)
          end: /'''/,
          subLanguage: 'json',
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0,
        };
        
        return {
          case_insensitive: true,
          keywords: KEYWORDS,
          aliases: ['rql', 'rq', 'ru'],
          contains: [
            ttl.LANGTAG,
            ttl.DATATYPE,
            ttl.IRI_LITERAL,
            ttl.BLANK_NODE,
            ttl.PNAME,
            VARIABLE,
            JSON_QUOTE_STRING, // order matters
            JSON_APOS_STRING,
            ttl.TRIPLE_QUOTE_STRING,
            ttl.TRIPLE_APOS_STRING,
            ttl.QUOTE_STRING_LITERAL,
            ttl.APOS_STRING_LITERAL,
            ttl.NUMBER,
            hljs.HASH_COMMENT_MODE,
          ]
        };
      }      
    )
  }}
};

module.exports = siteConfig;

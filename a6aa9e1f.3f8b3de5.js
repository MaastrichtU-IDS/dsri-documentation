(window.webpackJsonp=window.webpackJsonp||[]).push([[48,13,15],{146:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(20),c=t(173),i=t(318),o=t(160);var m=function(e){var a=e.metadata,t=a.previousPage,n=a.nextPage;return r.a.createElement("nav",{className:"pagination-nav","aria-label":"Blog list page navigation"},r.a.createElement("div",{className:"pagination-nav__item"},t&&r.a.createElement(o.a,{className:"pagination-nav__link",to:t},r.a.createElement("h4",{className:"pagination-nav__label"},"\xab Newer Entries"))),r.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},n&&r.a.createElement(o.a,{className:"pagination-nav__link",to:n},r.a.createElement("h4",{className:"pagination-nav__label"},"Older Entries \xbb"))))},s=t(319);a.default=function(e){var a=e.metadata,t=e.items,n=e.sidebar,o=Object(l.default)().siteConfig.title,u=a.blogDescription,d=a.blogTitle,f="/"===a.permalink?o:d;return r.a.createElement(c.a,{title:f,description:u,wrapperClassName:"blog-wrapper"},r.a.createElement("div",{className:"container margin-vert--lg"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col col--2"},r.a.createElement(s.a,{sidebar:n})),r.a.createElement("main",{className:"col col--8"},t.map((function(e){var a=e.content;return r.a.createElement(i.a,{key:a.metadata.permalink,frontMatter:a.frontMatter,metadata:a.metadata,truncated:a.metadata.truncated},r.a.createElement(a,null))})),r.a.createElement(m,{metadata:a})))))}},171:function(e,a,t){"use strict";t.d(a,"c",(function(){return n})),t.d(a,"d",(function(){return r})),t.d(a,"a",(function(){return l})),t.d(a,"b",(function(){return c})),t.d(a,"f",(function(){return i})),t.d(a,"e",(function(){return o}));t(167);var n=["en"],r=!1,l=null,c="6c6e0587",i=8,o=50},174:function(e,a,t){"use strict";var n=t(3),r=t(7),l=t(0),c=t.n(l),i=t(152),o=t(160),m=t(157),s=t(164),u=t(2),d=["to","href","label","prependBaseUrlToHref"];function f(e){var a=e.to,t=e.href,l=e.label,i=e.prependBaseUrlToHref,m=Object(r.a)(e,d),u=Object(s.a)(a),f=Object(s.a)(t,{forcePrependBaseUrl:!0});return c.a.createElement(o.a,Object(n.a)({className:"footer__link-item"},t?{target:"_blank",rel:"noopener noreferrer",href:i?f:t}:{to:u},m),l)}a.a=function(){var e=Object(m.useThemeConfig)().footer,a=(Object(u.l)(),e||{}),t=a.copyright,n=a.links,r=void 0===n?[]:n,l=a.logo,o=void 0===l?{}:l;return Object(s.a)(o.src),e?c.a.createElement("footer",{className:Object(i.a)("footer",{"footer--dark":"dark"===e.style})},c.a.createElement("div",{className:"container"},r&&r.length>0&&c.a.createElement("div",{className:"row footer__links"},r.map((function(e,a){return c.a.createElement("div",{key:a,className:"col footer__col"},null!=e.title?c.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?c.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,a){return e.html?c.a.createElement("li",{key:a,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):c.a.createElement("li",{key:e.href||e.to,className:"footer__item"},c.a.createElement(f,e))}))):null)}))),(o||t)&&c.a.createElement("div",{className:"text--center"},c.a.createElement("div",null,c.a.createElement("a",{href:"https://creativecommons.org/licenses/by/4.0/",title:"Creative Commons Attribution 4.0 International license",target:"_blank",rel:"noopener noreferrer"},c.a.createElement("img",{src:"/dsri-documentation/img/cc-by.svg",alt:"cc by license"}))),c.a.createElement("div",{style:{marginBottom:"10px"},dangerouslySetInnerHTML:{__html:t}}),c.a.createElement("div",{style:{marginBottom:"10px",color:"grey"}},"We don't use any tracker, enjoy the freedom and peace of mind \ud83d\udd4a\ufe0f")))):null}}}]);
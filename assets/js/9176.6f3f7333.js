"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9176],{6669:(e,t,a)=>{a.d(t,{A:()=>_});var r=a(1367),l=a(6540),n=a(870),i=a(6750),s=a(4581),o=a(5489),m=a(1312);const c="sidebar_re4s",u="sidebarItemTitle_pO2u",d="sidebarItemList_Yudw",g="sidebarItem__DBe",v="sidebarItemLink_mo7H",p="sidebarItemLinkActive_I1ZP";function h(e){var t=e.sidebar;return l.createElement("aside",{className:"col col--3"},l.createElement("nav",{className:(0,n.A)(c,"thin-scrollbar"),"aria-label":(0,m.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,n.A)(u,"margin-bottom--md")},t.title),l.createElement("ul",{className:(0,n.A)(d,"clean-list")},t.items.map((function(e){return l.createElement("li",{key:e.permalink,className:g},l.createElement(o.A,{isNavLink:!0,to:e.permalink,className:v,activeClassName:p},e.title))})))))}var E=a(5600);function f(e){var t=e.sidebar;return l.createElement("ul",{className:"menu__list"},t.items.map((function(e){return l.createElement("li",{key:e.permalink,className:"menu__list-item"},l.createElement(o.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active"},e.title))})))}function b(e){return l.createElement(E.GX,{component:f,props:e})}function N(e){var t=e.sidebar,a=(0,s.l)();return null!=t&&t.items.length?"mobile"===a?l.createElement(b,{sidebar:t}):l.createElement(h,{sidebar:t}):null}var A=["sidebar","toc","children"];function _(e){var t=e.sidebar,a=e.toc,s=e.children,o=(0,r.A)(e,A),m=t&&t.items.length>0;return l.createElement(i.A,o,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement(N,{sidebar:t}),l.createElement("main",{className:(0,n.A)("col",{"col--7":m,"col--9 col--offset-1":!m}),itemScope:!0,itemType:"http://schema.org/Blog"},s),a&&l.createElement("div",{className:"col col--2"},a))))}},8004:(e,t,a)=>{a.d(t,{A:()=>H});var r=a(6540),l=a(870),n=a(7131),i=a(6025);function s(e){var t,a=e.children,l=e.className,s=(0,n.e)(),o=s.frontMatter,m=s.assets,c=(0,i.h)().withBaseUrl,u=null!=(t=m.image)?t:o.image;return r.createElement("article",{className:l,itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},u&&r.createElement("meta",{itemProp:"image",content:c(u,{absolute:!0})}),a)}var o=a(5489);const m="title_f1Hy";function c(e){var t=e.className,a=(0,n.e)(),i=a.metadata,s=a.isBlogPostPage,c=i.permalink,u=i.title,d=s?"h1":"h2";return r.createElement(d,{className:(0,l.A)(m,t),itemProp:"headline"},s?u:r.createElement(o.A,{itemProp:"url",to:c},u))}var u=a(1312),d=a(4586),g=["zero","one","two","few","many","other"];function v(e){return g.filter((function(t){return e.includes(t)}))}var p={locale:"en",pluralForms:v(["one","other"]),select:function(e){return 1===e?"one":"other"}};function h(){var e=(0,d.A)().i18n.currentLocale;return(0,r.useMemo)((function(){try{return t=e,a=new Intl.PluralRules(t),{locale:t,pluralForms:v(a.resolvedOptions().pluralCategories),select:function(e){return a.select(e)}}}catch(r){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+r.message+"\n"),p}var t,a}),[e])}function E(){var e=h();return{selectMessage:function(t,a){return function(e,t,a){var r=e.split("|");if(1===r.length)return r[0];r.length>a.pluralForms.length&&console.error("For locale="+a.locale+", a maximum of "+a.pluralForms.length+" plural forms are expected ("+a.pluralForms.join(",")+"), but the message contains "+r.length+": "+e);var l=a.select(t),n=a.pluralForms.indexOf(l);return r[Math.min(n,r.length-1)]}(a,t,e)}}}const f="container_mt6G";function b(e){var t,a=e.readingTime,l=(t=E().selectMessage,function(e){var a=Math.ceil(e);return t(a,(0,u.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))});return r.createElement(r.Fragment,null,l(a))}function N(e){var t=e.date,a=e.formattedDate;return r.createElement("time",{dateTime:t,itemProp:"datePublished"},a)}function A(){return r.createElement(r.Fragment,null," \xb7 ")}function _(e){var t=e.className,a=(0,n.e)().metadata,i=a.date,s=a.formattedDate,o=a.readingTime;return r.createElement("div",{className:(0,l.A)(f,"margin-vert--md",t)},r.createElement(N,{date:i,formattedDate:s}),void 0!==o&&r.createElement(r.Fragment,null,r.createElement(A,null),r.createElement(b,{readingTime:o})))}function P(e){return e.href?r.createElement(o.A,e):r.createElement(r.Fragment,null,e.children)}function k(e){var t=e.author,a=e.className,n=t.name,i=t.title,s=t.url,o=t.imageURL,m=t.email,c=s||m&&"mailto:"+m||void 0;return r.createElement("div",{className:(0,l.A)("avatar margin-bottom--sm",a)},o&&r.createElement(P,{href:c,className:"avatar__photo-link"},r.createElement("img",{className:"avatar__photo",src:o,alt:n})),n&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(P,{href:c,itemProp:"url"},r.createElement("span",{itemProp:"name"},n))),i&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},i)))}const T="authorCol_Hf19",w="imageOnlyAuthorRow_pa_O",y="imageOnlyAuthorCol_G86a";function B(e){var t=e.className,a=(0,n.e)(),i=a.metadata.authors,s=a.assets;if(0===i.length)return null;var o=i.every((function(e){return!e.name}));return r.createElement("div",{className:(0,l.A)("margin-top--md margin-bottom--sm",o?w:"row",t)},i.map((function(e,t){var a;return r.createElement("div",{className:(0,l.A)(!o&&"col col--6",o?y:T),key:t},r.createElement(k,{author:Object.assign({},e,{imageURL:null!=(a=s.authorsImageUrls[t])?a:e.imageURL})}))})))}function F(){return r.createElement("header",null,r.createElement(c,null),r.createElement(_,null),r.createElement(B,null))}var x=a(440),L=a(6685);function M(e){var t=e.children,a=e.className,i=(0,n.e)().isBlogPostPage;return r.createElement("div",{id:i?x.blogPostContainerID:void 0,className:(0,l.A)("markdown",a),itemProp:"articleBody"},r.createElement(L.A,null,t))}var C=a(1943),I=a(8046),R=a(9668),U=a(1367),O=["blogPostTitle"];function D(){return r.createElement("b",null,r.createElement(u.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))}function z(e){var t=e.blogPostTitle,a=(0,U.A)(e,O);return r.createElement(o.A,(0,R.A)({"aria-label":(0,u.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t})},a),r.createElement(D,null))}const G="blogPostFooterDetailsFull_mRVl";function j(){var e=(0,n.e)(),t=e.metadata,a=e.isBlogPostPage,i=t.tags,s=t.title,o=t.editUrl,m=t.hasTruncateMarker,c=!a&&m,u=i.length>0;return u||c||o?r.createElement("footer",{className:(0,l.A)("row docusaurus-mt-lg",a&&G)},u&&r.createElement("div",{className:(0,l.A)("col",{"col--9":c})},r.createElement(I.A,{tags:i})),a&&o&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(C.A,{editUrl:o})),c&&r.createElement("div",{className:(0,l.A)("col text--right",{"col--3":u})},r.createElement(z,{blogPostTitle:s,to:t.permalink}))):null}function H(e){var t=e.children,a=e.className,i=(0,n.e)().isBlogPostPage?void 0:"margin-bottom--xl";return r.createElement(s,{className:(0,l.A)(i,a)},r.createElement(F,null),r.createElement(M,null,t),r.createElement(j,null))}},1943:(e,t,a)=>{a.d(t,{A:()=>d});var r=a(6540),l=a(1312),n=a(7559),i=a(9668),s=a(1367),o=a(870);const m="iconEdit_Z9Sw";var c=["className"];function u(e){var t=e.className,a=(0,s.A)(e,c);return r.createElement("svg",(0,i.A)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,o.A)(m,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function d(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:n.G.common.editThisPage},r.createElement(u,null),r.createElement(l.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},9022:(e,t,a)=>{a.d(t,{A:()=>i});var r=a(6540),l=a(870),n=a(5489);function i(e){var t=e.permalink,a=e.title,i=e.subLabel,s=e.isNext;return r.createElement(n.A,{className:(0,l.A)("pagination-nav__link",s?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},i&&r.createElement("div",{className:"pagination-nav__sublabel"},i),r.createElement("div",{className:"pagination-nav__label"},a))}},8046:(e,t,a)=>{a.d(t,{A:()=>g});var r=a(6540),l=a(870),n=a(1312),i=a(5489);const s="tag_zVej",o="tagRegular_sFm0",m="tagWithCount_h2kH";function c(e){var t=e.permalink,a=e.label,n=e.count;return r.createElement(i.A,{href:t,className:(0,l.A)(s,n?m:o)},a,n&&r.createElement("span",null,n))}const u="tags_jXut",d="tag_QGVx";function g(e){var t=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(n.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,l.A)(u,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return r.createElement("li",{key:a,className:d},r.createElement(c,{label:t,permalink:a}))}))))}},7131:(e,t,a)=>{a.d(t,{e:()=>s,i:()=>i});var r=a(6540),l=a(2021),n=r.createContext(null);function i(e){var t=e.children,a=e.content,l=e.isBlogPostPage,i=function(e){var t=e.content,a=e.isBlogPostPage;return(0,r.useMemo)((function(){return{metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a}}),[t,a])}({content:a,isBlogPostPage:void 0!==l&&l});return r.createElement(n.Provider,{value:i},t)}function s(){var e=(0,r.useContext)(n);if(null===e)throw new l.dV("BlogPostProvider");return e}}}]);
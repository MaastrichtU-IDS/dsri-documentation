"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4048],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(r),d=a,g=m["".concat(c,".").concat(d)]||m[d]||u[d]||o;return r?n.createElement(g,i(i({ref:t},l),{},{components:r})):n.createElement(g,i({ref:t},l))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8621:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>p,toc:()=>u});var n=r(3117),a=r(102),o=(r(7294),r(3905)),i=["components"],s={id:"catalog-genomics",title:"Genomics"},c=void 0,p={unversionedId:"catalog-genomics",id:"catalog-genomics",title:"Genomics",description:"Feel free to propose new services using pull requests, or to request them by creating new issues.",source:"@site/docs/catalog-genomics.md",sourceDirName:".",slug:"/catalog-genomics",permalink:"/docs/catalog-genomics",draft:!1,editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/catalog-genomics.md",tags:[],version:"current",lastUpdatedBy:"Brouwers, Marcel (ICTS)",lastUpdatedAt:1721026613,formattedLastUpdatedAt:"Jul 15, 2024",frontMatter:{id:"catalog-genomics",title:"Genomics"},sidebar:"docs",previous:{title:"Neuroscience research",permalink:"/docs/neuroscience"},next:{title:"Imaging softwares",permalink:"/docs/catalog-imaging"}},l={},u=[{value:"Trinity RNA Seq",id:"trinity-rna-seq",level:2}],m={toc:u};function d(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Feel free to propose new services using ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/dsri-documentation/pulls"},"pull requests"),", or to request them by creating ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/dsri-documentation/issues"},"new issues"),"."),(0,o.kt)("h2",{id:"trinity-rna-seq"},"Trinity RNA Seq"),(0,o.kt)("p",null,"Trinity assembles transcript sequences from Illumina RNA-Seq data. It represents a novel method for the efficient and robust the new reconstruction of transcriptomes from RNA-seq data. See ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/trinityrnaseq/trinityrnaseq/wiki"},"their documentation"),"."),(0,o.kt)("p",null,"You can start a container using the ",(0,o.kt)("strong",{parentName:"p"},"Trinity RNA-Seq")," template in the ",(0,o.kt)("a",{parentName:"p",href:"https://console-openshift-console.apps.dsri2.unimaas.nl/catalog"},"Catalog web UI")," (make sure the ",(0,o.kt)("strong",{parentName:"p"},"Templates")," checkbox is checked)"),(0,o.kt)("img",{src:"/img/screenshot_trinityrnaseq.png",alt:"Deploy Trinity RNA Seq",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,o.kt)("p",null,"This template uses the Trinity RNA-Seq image hosted in the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/orgs/maastrichtu-ids/packages/container/package/trinityrnaseq"},"UM IDS GitHub Container Registry")," "),(0,o.kt)("admonition",{title:"Persistent data folder",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"\ud83d\udcc2 Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"/usr/local/src/work")," folder (home of the root user) to store your data in the existing persistent storage. You can find the persistent volumes in the DSRI web UI, go to the ",(0,o.kt)("strong",{parentName:"p"},"Administrator")," view > ",(0,o.kt)("strong",{parentName:"p"},"Storage")," > ",(0,o.kt)("strong",{parentName:"p"},"Persistent Volume Claims"),".")),(0,o.kt)("p",null,"We enabled the port ",(0,o.kt)("inlineCode",{parentName:"p"},"8787")," in the container, if you need to deploy applications."))}d.isMDXComponent=!0}}]);
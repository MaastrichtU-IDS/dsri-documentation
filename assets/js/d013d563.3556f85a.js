"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5299],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>y});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),s=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(r),y=n,h=d["".concat(p,".").concat(y)]||d[y]||g[y]||o;return r?a.createElement(h,i(i({ref:t},c),{},{components:r})):a.createElement(h,i({ref:t},c))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3128:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>y,frontMatter:()=>l,metadata:()=>s,toc:()=>g});var a=r(9668),n=r(1367),o=(r(6540),r(5680)),i=["components"],l={id:"tools-machine-learning",title:"Libraries for Machine Learning"},p=void 0,s={unversionedId:"tools-machine-learning",id:"tools-machine-learning",title:"Libraries for Machine Learning",description:"This page is in development, feel free to edit it to add more information.",source:"@site/docs/tools-machine-learning.md",sourceDirName:".",slug:"/tools-machine-learning",permalink:"/docs/tools-machine-learning",draft:!1,editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/tools-machine-learning.md",tags:[],version:"current",lastUpdatedBy:"Adekunle Onaopepo",lastUpdatedAt:1733326582,formattedLastUpdatedAt:"Dec 4, 2024",frontMatter:{id:"tools-machine-learning",title:"Libraries for Machine Learning"},sidebar:"docs",previous:{title:"Create a new Project",permalink:"/docs/project-management"},next:{title:"Glossary",permalink:"/docs/glossary"}},c={},g=[{value:"Machine Learning libraries",id:"machine-learning-libraries",level:2},{value:"SciKit Learn",id:"scikit-learn",level:3},{value:"Deep Learning libraries",id:"deep-learning-libraries",level:2},{value:"Tensorflow",id:"tensorflow",level:3},{value:"PyTorch",id:"pytorch",level:3},{value:"Deep Java Library",id:"deep-java-library",level:3},{value:"Sonnet",id:"sonnet",level:3},{value:"Keras",id:"keras",level:3},{value:"Metaflow",id:"metaflow",level:3}],d={toc:g};function y(e){var t=e.components,r=(0,n.A)(e,i);return(0,o.yg)("wrapper",(0,a.A)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("admonition",{title:"Work in progress",type:"caution"},(0,o.yg)("p",{parentName:"admonition"},"This page is in development, feel free to ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/docs/tools-machine-learning.md"},"edit it")," to add more information.")),(0,o.yg)("h2",{id:"machine-learning-libraries"},"Machine Learning libraries"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"See ",(0,o.yg)("a",{parentName:"li",href:"https://www.saagie.com/blog/machine-learning-for-grandmas/"},"this vulgarisation article")," explaining the different principles of Machine Learning."),(0,o.yg)("li",{parentName:"ul"},"The ",(0,o.yg)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/azure/machine-learning/algorithm-cheat-sheet"},"Azure Machine Learning Algorithm Cheat Sheet")," helps you choose the right algorithm for a predictive analytics model."),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"https://github.com/TarrySingh/Artificial-Intelligence-Deep-Learning-Machine-Learning-Tutorials"},"This repository")," provides tutorials and examples to a vast number of Machine / Deep Learning library.")),(0,o.yg)("h3",{id:"scikit-learn"},"SciKit Learn"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://scikit-learn.org/stable/"},"https://scikit-learn.org/stable/"))),(0,o.yg)("h2",{id:"deep-learning-libraries"},"Deep Learning libraries"),(0,o.yg)("p",null,"See ",(0,o.yg)("a",{parentName:"p",href:"https://towardsdatascience.com/top-10-best-deep-learning-frameworks-in-2019-5ccb90ea6de"},"this article")," for more details about modern Deep Learning libraries."),(0,o.yg)("h3",{id:"tensorflow"},"Tensorflow"),(0,o.yg)("p",null,"Python library developed by Google."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://www.tensorflow.org/"},"https://www.tensorflow.org/"))),(0,o.yg)("h3",{id:"pytorch"},"PyTorch"),(0,o.yg)("p",null,"Python library developed by Facebook."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://pytorch.org/"},"https://pytorch.org/"))),(0,o.yg)("h3",{id:"deep-java-library"},"Deep Java Library"),(0,o.yg)("p",null,"Java library developed by Amazon. See the ",(0,o.yg)("a",{parentName:"p",href:"https://towardsdatascience.com/introducing-deep-java-library-djl-9de98de8c6ca"},"introduction article"),"."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://djl.ai/"},"https://djl.ai/"))),(0,o.yg)("h3",{id:"sonnet"},"Sonnet"),(0,o.yg)("p",null,"Layer on top of Tensorflow."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://sonnet.readthedocs.io/en/latest/"},"https://sonnet.readthedocs.io/en/latest/"))),(0,o.yg)("h3",{id:"keras"},"Keras"),(0,o.yg)("p",null,"Python library. Layer on top of Tensorflow, CNTK, Theano."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://keras.io/"},"https://keras.io/"))),(0,o.yg)("h3",{id:"metaflow"},"Metaflow"),(0,o.yg)("p",null,"Layer on top of Tensorflow, PyTorch, SciKit Learn developed by Netflix. "),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://metaflow.org/"},"https://metaflow.org/"))))}y.isMDXComponent=!0}}]);
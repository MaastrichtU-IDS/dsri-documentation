"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8013],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>g});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=p(a),g=r,h=c["".concat(l,".").concat(g)]||c[g]||d[g]||o;return a?n.createElement(h,i(i({ref:t},m),{},{components:a})):n.createElement(h,i({ref:t},m))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},8107:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>g,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var n=a(7462),r=a(3366),o=(a(7294),a(3905)),i=["components"],s={id:"openshift-storage",title:"Data storage"},l=void 0,p={unversionedId:"openshift-storage",id:"openshift-storage",title:"Data storage",description:"Different storages can be used when running services on the DSRI:",source:"@site/docs/openshift-storage.md",sourceDirName:".",slug:"/openshift-storage",permalink:"/docs/openshift-storage",editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/openshift-storage.md",tags:[],version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1649178560,formattedLastUpdatedAt:"4/5/2022",frontMatter:{id:"openshift-storage",title:"Data storage"},sidebar:"docs",previous:{title:"Command Line Interface",permalink:"/docs/openshift-commands"},next:{title:"Publish a Docker image",permalink:"/docs/guide-publish-image"}},m={},d=[{value:"Create the Persistent Storage",id:"create-the-persistent-storage",level:3},{value:"Connect the Existing Persistent Storage",id:"connect-the-existing-persistent-storage",level:3},{value:"Use the dynamic storage",id:"use-the-dynamic-storage",level:3},{value:"Use the ephemeral storage",id:"use-the-ephemeral-storage",level:3}],c={toc:d};function g(e){var t=e.components,a=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Different storages can be used when running services on the DSRI:"),(0,o.kt)("p",null,"\ud83e\udd8b ",(0,o.kt)("strong",{parentName:"p"},"Ephemeral storage"),": storage is bound to the pod, data will be lost when the pod is deleted (but this deployment does not require to request the creation of a persistent storage, and is faster to test code)."),(0,o.kt)("p",null,"\u26a1 ",(0,o.kt)("strong",{parentName:"p"},"Dynamic storage"),":  automatically create a persistent storage when starting an application. Can also be created in the OpenShift web UI, using the ",(0,o.kt)("inlineCode",{parentName:"p"},"dynamic-maprfs")," Storage Class."),(0,o.kt)("p",null,"\ud83d\uddc4\ufe0f ",(0,o.kt)("strong",{parentName:"p"},"Persistent storage"),":  a persistent storage can be created by the DSRI team for a persistent storage of the data. ",(0,o.kt)("a",{parentName:"p",href:"/help"},"Contact the DSRI team")," to request a persistent storage. "),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Storage per project")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"A storage (aka. Persistent Volume Claim) is only accessible in the project where it has been created."))),(0,o.kt)("h3",{id:"create-the-persistent-storage"},"Create the Persistent Storage"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Switch to the ",(0,o.kt)("strong",{parentName:"p"},"Administrator")," view")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Go to the ",(0,o.kt)("strong",{parentName:"p"},"Project")," panel ")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Select your project")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Expand the ",(0,o.kt)("strong",{parentName:"p"},"Storage")," panel then go to the ",(0,o.kt)("strong",{parentName:"p"},"Persistent Volume Claim")," panel")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Click the button call ",(0,o.kt)("strong",{parentName:"p"},"Create Persistent Volume Claim")),(0,o.kt)("p",{parentName:"li"},"then you will redirect the wizard of Create Persistent Volume Claim ")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Provide the unique ",(0,o.kt)("strong",{parentName:"p"},"Persistent Volume Claim Name")," start with ",(0,o.kt)("inlineCode",{parentName:"p"}," pvc-")," "),(0,o.kt)("p",{parentName:"li"},"example: ",(0,o.kt)("inlineCode",{parentName:"p"}," pvc-filebrowser"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Select the ",(0,o.kt)("strong",{parentName:"p"},"Access Mode")," ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("inlineCode",{parentName:"strong"}," RWO")),"and ",(0,o.kt)("strong",{parentName:"p"},"Storage Size")),(0,o.kt)("table",{parentName:"li"},(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Access Mode"),(0,o.kt)("th",{parentName:"tr",align:"left"},"CLI abbreviation"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"ReadWriteOnce"),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"RWO")),(0,o.kt)("td",{parentName:"tr",align:"left"},"The volume can be mounted as read-write by a single node.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"ReadOnlyMany"),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"ROX")),(0,o.kt)("td",{parentName:"tr",align:"left"},"The volume can be mounted as read-only by many nodes.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"ReadWriteMany"),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"RWX")),(0,o.kt)("td",{parentName:"tr",align:"left"},"The volume can be mounted as read-write by many nodes."))))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Click ",(0,o.kt)("strong",{parentName:"p"},"Create")))),(0,o.kt)("img",{src:"/img/screenshot_pvc_storage.png",alt:"Create Persistent Storage",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,o.kt)("img",{src:"/img/screenshot_pvc_storage_create.png",alt:"Create Persistent Storage",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The DSRI using the ",(0,o.kt)("a",{parentName:"p",href:"https://www.openshift.com/products/container-storage/"},(0,o.kt)("strong",{parentName:"a"},"Openshift Container Stroage"))," (",(0,o.kt)("inlineCode",{parentName:"p"}," OCS"),")  which is based on ",(0,o.kt)("a",{parentName:"p",href:"https://ceph.io/ceph-storage/"},(0,o.kt)("strong",{parentName:"a"},"CEPH"))," offers ",(0,o.kt)("inlineCode",{parentName:"p"},"ReadWriteOnce")," access mode. "),(0,o.kt)("ul",{parentName:"div"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"ReadWriteOnce")," (",(0,o.kt)("a",{parentName:"li",href:"https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html"},(0,o.kt)("strong",{parentName:"a"},"RWO")),") volumes cannot be mounted on multiple nodes. If a node fails, the system does not allow the attached RWO volume to be mounted on a new node because it is already assigned to the failed node. If you encounter a multi-attach error message as a result, force delete the pod on a shut down or crashed node.")))),(0,o.kt)("p",null,"Static persistent volumes provides a sustainable persistent storage over time for applications that need to run regular Docker images (which usually use the ",(0,o.kt)("inlineCode",{parentName:"p"},"root")," user)."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Some Applications such as ",(0,o.kt)("strong",{parentName:"p"},"Jupyter")," template automatically creates a persistent storage"))),(0,o.kt)("h3",{id:"connect-the-existing-persistent-storage"},"Connect the Existing Persistent Storage"),(0,o.kt)("p",null,"On the ",(0,o.kt)("strong",{parentName:"p"},"Topology")," page select your application,"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Click ",(0,o.kt)("strong",{parentName:"p"},"Action")," on your application")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Select the ",(0,o.kt)("strong",{parentName:"p"},"Add Storage")," option from the dropdown list.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Select the ",(0,o.kt)("strong",{parentName:"p"},"Use Existing Claim")," option from the Add Storage wizard and Select the Claim")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add the ",(0,o.kt)("strong",{parentName:"p"},"Mount Path"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Save"))),(0,o.kt)("img",{src:"/img/screenshot_existing_storage.png",alt:"Add Existing Persistent Storage",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,o.kt)("img",{src:"/img/screenshot_add_storage.png",alt:"Add Existing Persistent Storage",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"You can try above method if you want to connect ",(0,o.kt)("strong",{parentName:"p"},"more applications to the same storage")))),(0,o.kt)("h3",{id:"use-the-dynamic-storage"},"Use the dynamic storage"),(0,o.kt)("p",null,"Dynamic ",(0,o.kt)("strong",{parentName:"p"},"persistent")," volumes can be created automatically by an application template."),(0,o.kt)("p",null,"Dynamic storage can also be created manually, go to ",(0,o.kt)("strong",{parentName:"p"},"Storage")," on the left sidebar in a project:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Click ",(0,o.kt)("strong",{parentName:"li"},"Create Storage")," top right of the Storage page."),(0,o.kt)("li",{parentName:"ol"},"Storage class: ",(0,o.kt)("strong",{parentName:"li"},"ceph-fs")),(0,o.kt)("li",{parentName:"ol"},"Access Mode:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Single User (RWO)"),": only the user who created this volume can read/write to this volume."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Shared Access (RWX)"),": all users with access to the projects can read/write this volume."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Read Only (ROX)"),": all users with access to the projects can read this volume.")))),(0,o.kt)("h3",{id:"use-the-ephemeral-storage"},"Use the ephemeral storage"),(0,o.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"Disabled")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"We currently disabled this solution by default, as it was confusing for users and would lead to data loss."))),(0,o.kt)("p",null,"When creating a pod, OpenShift will by default use ephemeral storage. It creates a volumes bind to the pod. So the volume will be deleted."),(0,o.kt)("p",null,"It is recommended to use dynamic provisioning for a more sustainable storage solution. But ephemeral storage can be sufficient for testing."))}g.isMDXComponent=!0}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9259],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>h});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},d=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=l(a),h=r,u=m["".concat(p,".").concat(h)]||m[h]||c[h]||o;return a?n.createElement(u,s(s({ref:t},d),{},{components:a})):n.createElement(u,s({ref:t},d))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,s=new Array(o);s[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var l=2;l<o;l++)s[l]=a[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5514:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>p,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=a(7462),r=a(3366),o=(a(7294),a(3905)),s=["components"],i={id:"deploy-database",title:"Databases"},p=void 0,l={unversionedId:"deploy-database",id:"deploy-database",title:"Databases",description:"SQL databases",source:"@site/docs/deploy-database.md",sourceDirName:".",slug:"/deploy-database",permalink:"/docs/deploy-database",editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/deploy-database.md",tags:[],version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1649854323,formattedLastUpdatedAt:"4/13/2022",frontMatter:{id:"deploy-database",title:"Databases"},sidebar:"docs",previous:{title:"VisualStudio Code",permalink:"/docs/deploy-vscode"},next:{title:"Matlab",permalink:"/docs/deploy-matlab"}},d={},c=[{value:"SQL databases",id:"sql-databases",level:2},{value:"Start PostgreSQL \ud83d\udc18",id:"start-postgresql-",level:3},{value:"Start MySQL \ud83d\udc2c",id:"start-mysql-",level:3},{value:"NoSQL databases",id:"nosql-databases",level:2},{value:"MongoDB \ud83c\udf3f",id:"mongodb-",level:3},{value:"Redis \ud83c\udfb2",id:"redis-",level:3},{value:"Graph databases",id:"graph-databases",level:2},{value:"OpenLink Virtuoso triplestore",id:"openlink-virtuoso-triplestore",level:3},{value:"Ontotext GraphDB triplestore",id:"ontotext-graphdb-triplestore",level:3},{value:"AllegroGraph",id:"allegrograph",level:3}],m={toc:c};function h(e){var t=e.components,a=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"sql-databases"},"SQL databases"),(0,o.kt)("p",null,"You can easily create a database from the templates available in the DSRI OpenShift web UI catalog:"),(0,o.kt)("img",{src:"/img/screenshot-databases.png",alt:"Databases in catalog web UI",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,o.kt)("p",null,"You can connect to a database from another application in the same project by using the database service name as hostname:"),(0,o.kt)("img",{src:"/img/screenshot_database_service.png",alt:"Databases in catalog web UI",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,o.kt)("p",null,"You can also use the ",(0,o.kt)("inlineCode",{parentName:"p"},"oc")," CLI to get the services in your project:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"oc get services\n")),(0,o.kt)("h3",{id:"start-postgresql-"},"Start PostgreSQL \ud83d\udc18"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("strong",{parentName:"p"},"Postgresql")," template in the DSRI OpenShift web UI catalog to start a SQL database. "),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Connect to the database")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"When the database has been deployed, you can connect from another pod using your favorite language and connector."))),(0,o.kt)("p",null,"Example with the ",(0,o.kt)("inlineCode",{parentName:"p"},"psql")," Command Line Interface:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"apt-get update && apt-get install postgresql-client -y\n")),(0,o.kt)("p",null,"Connect to the Postgresql database using the service name (change depending on the username and database name you chose):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"psql -h postgresql-db -U postgres db\n")),(0,o.kt)("p",null,"Checkout the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/dsri-demo"},"dsri-demo repository")," for a quick demo for accessing and using a PostgreSQL database from a Jupyter notebook on the DSRI."),(0,o.kt)("h3",{id:"start-mysql-"},"Start MySQL \ud83d\udc2c"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("strong",{parentName:"p"},"MySQL")," template in the DSRI OpenShift web UI catalog."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Connect to the database")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"When the database has been deployed, you can connect from another pod using your favorite language and connector."))),(0,o.kt)("p",null,"Example with the ",(0,o.kt)("inlineCode",{parentName:"p"},"mysql")," Command Line Interface:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"apt-get update && apt-get install mariadb-client -y\n")),(0,o.kt)("p",null,"Connect to the MySQL database using the service name:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"mysql -h example-mysql -p\n")),(0,o.kt)("p",null,"Checkout the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/dsri-demo"},"dsri-demo repository")," for a quick demo for accessing and using a MySQL database from a Jupyter notebook on the DSRI."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Alternatively, MySQL databases can be started using Helm, see the ",(0,o.kt)("a",{parentName:"p",href:"/docs/helm#install-a-helm-chart"},"Helm documentation page")," for more details.")),(0,o.kt)("h2",{id:"nosql-databases"},"NoSQL databases"),(0,o.kt)("h3",{id:"mongodb-"},"MongoDB \ud83c\udf3f"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.mongodb.com/"},"MongoDB")," is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. "),(0,o.kt)("p",null,"Use the ",(0,o.kt)("strong",{parentName:"p"},"MongoDB")," template in the DSRI OpenShift web UI catalog."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Connect to the database")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Use the service name as hostname to connect from another pod in the same project."))),(0,o.kt)("h3",{id:"redis-"},"Redis \ud83c\udfb2"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"http://redis.io/"},"Redis")," is an advanced key-value cache and store. It is often referred to as a data structure server since keys can contain  strings, hashes, lists, sets, sorted sets, bitmaps and hyperlog."),(0,o.kt)("p",null,"Use the ",(0,o.kt)("strong",{parentName:"p"},"Redis")," template in the DSRI OpenShift web UI catalog."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Connect to the database")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Use the service name as hostname to connect from another pod in the same project."))),(0,o.kt)("h2",{id:"graph-databases"},"Graph databases"),(0,o.kt)("h3",{id:"openlink-virtuoso-triplestore"},"OpenLink Virtuoso triplestore"),(0,o.kt)("p",null,"Search for the ",(0,o.kt)("strong",{parentName:"p"},"Virtuoso triplestore")," template in the DSRI web UI catalog. Instantiate the template to create a Virtuoso triplestore in your project."),(0,o.kt)("p",null,"The deployment is based on the latest open source version of Virtuoso: ",(0,o.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/openlink/virtuoso-opensource-7"},"https://hub.docker.com/r/openlink/virtuoso-opensource-7")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Connect to the database")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Use the service name as hostname to connect from another pod in the same project."))),(0,o.kt)("h3",{id:"ontotext-graphdb-triplestore"},"Ontotext GraphDB triplestore"),(0,o.kt)("p",null,"Use the official DockerHub image if you have an enterprise license. Or ",(0,o.kt)("a",{parentName:"p",href:"https://maastrichtu-ids.github.io/dsri-documentation/docs/guide-dockerfile-to-openshift"},"build")," GraphDB free edition image from ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Ontotext-AD/graphdb-docker"},"graphdb-docker on GitHub"),"."),(0,o.kt)("p",null,"After copying the ",(0,o.kt)("inlineCode",{parentName:"p"},".zip")," file in the ",(0,o.kt)("inlineCode",{parentName:"p"},"graphdb-docker/free-edition")," folder, go the ",(0,o.kt)("inlineCode",{parentName:"p"},"graphdb-docker")," folder in your terminal:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd graphdb-docker\n")),(0,o.kt)("p",null,"Before creating your GraphDB ImageStream, make sure you are in the right project:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"oc project my-project\n")),(0,o.kt)("p",null,"Create the ImageStream for GraphDB:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"oc new-build --name graphdb --binary\n")),(0,o.kt)("p",null,"Build the image on the DSRI and save it in the ImageStream:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"oc start-build graphdb --from-dir=free-edition --follow --wait\n")),(0,o.kt)("p",null,"You can now use the ",(0,o.kt)("strong",{parentName:"p"},"Ontotext GraphDB")," template to deploy a GraphDB instance on DSRI. "),(0,o.kt)("p",null,"Use the name of the ImageStream when instantiating the template, you can check if the image was properly built in ",(0,o.kt)("strong",{parentName:"p"},"Search")," > Filter ",(0,o.kt)("strong",{parentName:"p"},"Resources")," for ImageStreams"),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Connect to the database")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Use the service name as hostname to connect from another pod in the same project."))),(0,o.kt)("h3",{id:"allegrograph"},"AllegroGraph"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://franz.com/agraph/"},"AllegroGraph\xae")," is a modern, high-performance, persistent graph database. It supports  SPARQL, RDFS++, and Prolog reasoning from numerous client applications. "),(0,o.kt)("p",null,"AllegroGraph has not been tested on DSRI yet, but it can be deployed on Kubernetes using Helm, cf. ",(0,o.kt)("a",{parentName:"p",href:"https://www.github.com/franzinc/agraph-examples/tree/master/clustering%2Fkubernetes%2Fmmr%2Fkubernetes-mmr.md"},"https://www.github.com/franzinc/agraph-examples/tree/master/clustering%2Fkubernetes%2Fmmr%2Fkubernetes-mmr.md")))}h.isMDXComponent=!0}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3836],{5680:(e,r,t)=>{t.d(r,{xA:()=>g,yg:()=>y});var o=t(6540);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var l=o.createContext({}),s=function(e){var r=o.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},g=function(e){var r=s(e.components);return o.createElement(l.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},u=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,g=c(e,["components","mdxType","originalType","parentName"]),u=s(t),y=n,m=u["".concat(l,".").concat(y)]||u[y]||p[y]||a;return t?o.createElement(m,i(i({ref:r},g),{},{components:t})):o.createElement(m,i({ref:r},g))}));function y(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,i=new Array(a);i[0]=u;var c={};for(var l in r)hasOwnProperty.call(r,l)&&(c[l]=r[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=t[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8550:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>g,contentTitle:()=>l,default:()=>y,frontMatter:()=>c,metadata:()=>s,toc:()=>p});var o=t(9668),n=t(1367),a=(t(6540),t(5680)),i=["components"],c={id:"login-docker-registry",title:"Login to Docker registries"},l=void 0,s={unversionedId:"login-docker-registry",id:"login-docker-registry",title:"Login to Docker registries",description:"Login to an external container registry can be helpful to pull private images, or increase the DockerHub pull limitations.",source:"@site/docs/login-docker-registry.md",sourceDirName:".",slug:"/login-docker-registry",permalink:"/docs/login-docker-registry",draft:!1,editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/login-docker-registry.md",tags:[],version:"current",lastUpdatedBy:"Adekunle Onaopepo",lastUpdatedAt:1733328046,formattedLastUpdatedAt:"Dec 4, 2024",frontMatter:{id:"login-docker-registry",title:"Login to Docker registries"},sidebar:"docs",previous:{title:"Prepare a workshop",permalink:"/docs/guide-workshop"},next:{title:"Command Line Interface",permalink:"/docs/openshift-commands"}},g={},p=[{value:"UM Container registry",id:"um-container-registry",level:2},{value:"Logging in with Docker CLI",id:"logging-in-with-docker-cli",level:3},{value:"Using a Proxy Cache",id:"using-a-proxy-cache",level:3},{value:"Creating your own project",id:"creating-your-own-project",level:3},{value:"Using your own user",id:"using-your-own-user",level:3},{value:"Using a robot account",id:"using-a-robot-account",level:3},{value:"GitHub Container Registry",id:"github-container-registry",level:2},{value:"DockerHub",id:"dockerhub",level:2}],u={toc:p};function y(e){var r=e.components,t=(0,n.A)(e,i);return(0,a.yg)("wrapper",(0,o.A)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"Login to an external container registry can be helpful to pull private images, or increase the DockerHub pull limitations."),(0,a.yg)("p",null,"You will need to create a secret in your project, then link it to the default service account of this project."),(0,a.yg)("p",null,"We detail here the process for ",(0,a.yg)("a",{parentName:"p",href:"https://cr.icts.unimaas.nl"},"UM Container registry"),", ",(0,a.yg)("a",{parentName:"p",href:"https://docs.github.com/en/packages/guides/about-github-container-registry"},"GitHub Container Registry")," and ",(0,a.yg)("a",{parentName:"p",href:"https://hub.docker.com/"},"Docker Hub"),", but the process is similar for any other container registry (e.g. ",(0,a.yg)("a",{parentName:"p",href:"https://quay.io/"},"quay.io"),")"),(0,a.yg)("h2",{id:"um-container-registry"},"UM Container registry"),(0,a.yg)("admonition",{title:"Access",type:"info"},(0,a.yg)("p",{parentName:"admonition"},"You need to be connected to the UM network to access this container registry.")),(0,a.yg)("p",null,"This container registry is available at ",(0,a.yg)("a",{parentName:"p",href:"https://cr.icts.unimaas.nl"},"UM Container registry"),". Here you can login using your ",(0,a.yg)("strong",{parentName:"p"},"UM credentials"),' by clicking on the "Login via OIDC provider"'),(0,a.yg)("img",{class:"screenshot",src:"/img/screenshot_harbor_login_page.png",alt:"Harbor_login_page",style:{zoom:"100%",maxHeight:"500px",maxWidth:"500px"}}),(0,a.yg)("admonition",{title:"Public Projects",type:"info"},(0,a.yg)("p",{parentName:"admonition"},"You don't need to follow the steps below if you are using one of the Public projects. These are available without credentials.")),(0,a.yg)("h3",{id:"logging-in-with-docker-cli"},"Logging in with Docker CLI"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},"Go to ",(0,a.yg)("a",{parentName:"li",href:"https://cr.icts.unimaas.nl"},"UM Container registry"),", click on your username in the top right corner followed by clicking on ",(0,a.yg)("strong",{parentName:"li"},"User Profile"),". Click on the ",(0,a.yg)("strong",{parentName:"li"},"Copy")," icon."),(0,a.yg)("li",{parentName:"ol"},"Login with your credentials:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"docker login cr.icts.unimaas.nl\n\n(Username)\n(Copied in Step 1)\n")),(0,a.yg)("h3",{id:"using-a-proxy-cache"},"Using a Proxy Cache"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},"Go to ",(0,a.yg)("a",{parentName:"li",href:"https://cr.icts.unimaas.nl"},"UM Container registry"),", look for a project of type ",(0,a.yg)("strong",{parentName:"li"},"Proxy Cache"),". For each of the mayor registries we created a ",(0,a.yg)("strong",{parentName:"li"},"Proxy Cache"),". Remember the project name, for example ",(0,a.yg)("strong",{parentName:"li"},"dockerhub"),"."),(0,a.yg)("li",{parentName:"ol"},"On the DSRI you can deploy an image like in this example:")),(0,a.yg)("img",{class:"screenshot",src:"/img/screenshot_harbor_proxy_cache.png",alt:"Harbor_proxy_cache",style:{zoom:"100%",maxHeight:"500px",maxWidth:"500px"}}),(0,a.yg)("admonition",{title:"Docker CLI",type:"info"},(0,a.yg)("p",{parentName:"admonition"},"The same concept can be applied using the docker CLI"),(0,a.yg)("pre",{parentName:"admonition"},(0,a.yg)("code",{parentName:"pre"},"docker pull cr.icts.unimaas.nl/dockerhub/ubuntu:22.04\n"))),(0,a.yg)("h3",{id:"creating-your-own-project"},"Creating your own project"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Go to ",(0,a.yg)("a",{parentName:"p",href:"https://cr.icts.unimaas.nl"},"UM Container registry"),", click on ",(0,a.yg)("strong",{parentName:"p"},"+ NEW PROJECT"),". Fill in the details of project name and Access Level (preferred method is to leave the checkbox unchecked).")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Click OK"))),(0,a.yg)("h3",{id:"using-your-own-user"},"Using your own user"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Go to ",(0,a.yg)("a",{parentName:"p",href:"https://cr.icts.unimaas.nl"},"UM Container registry"),", click on your username in the top right corner followed by clicking on ",(0,a.yg)("strong",{parentName:"p"},"User Profile"),". Click on the ",(0,a.yg)("strong",{parentName:"p"},"Copy")," icon.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create a secret to login to UM Harbor Container Registry in your project:"))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"oc create secret docker-registry um-harbor-secret --docker-server=cr.icts.unimaas.nl --docker-username=<UM username> --docker-password=<copied in step 1>\n")),(0,a.yg)("ol",{start:3},(0,a.yg)("li",{parentName:"ol"},"Link the login secret to the default service account:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"oc secrets link default um-harbor-secret --for=pull\n")),(0,a.yg)("h3",{id:"using-a-robot-account"},"Using a robot account"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Go to ",(0,a.yg)("a",{parentName:"p",href:"https://cr.icts.unimaas.nl"},"UM Container registry"),", click on your project if you already created one.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Click on the tab ",(0,a.yg)("strong",{parentName:"p"},"Robot Accounts"))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Click on ",(0,a.yg)("strong",{parentName:"p"},"New Robot Account"))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create the Robot account to your liking")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Copy the secret or export it")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create a secret to login to UM Harbor Container Registry in your project:"))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"oc create secret docker-registry um-harbor-secret --docker-server=cr.icts.unimaas.nl --docker-username=<robot account name> --docker-password=<copied or exported in step 5>\n")),(0,a.yg)("ol",{start:7},(0,a.yg)("li",{parentName:"ol"},"Link the login secret to the default service account:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"oc secrets link default um-harbor-secret --for=pull\n")),(0,a.yg)("h2",{id:"github-container-registry"},"GitHub Container Registry"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Go to ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/settings/tokens"},"GitHub Settings"),", and create a Personal Access Token (PAT) which will be used as password to connect to the GitHub Container Registry")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create a secret to login to GitHub Container Registry in your project:"))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"oc create secret docker-registry github-ghcr-secret --docker-server=ghcr.io --docker-username=<github-username> --docker-password=<github-personal-access-token> --docker-email=<email-address>\n")),(0,a.yg)("ol",{start:3},(0,a.yg)("li",{parentName:"ol"},"Link the login secret to the default service account:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"oc secrets link default github-ghcr-secret --for=pull\n")),(0,a.yg)("h2",{id:"dockerhub"},"DockerHub"),(0,a.yg)("admonition",{title:"Increase DockerHub limitations",type:"tip"},(0,a.yg)("p",{parentName:"admonition"},"Login with DockerHub also increase the DockerHub limitations to pull images in your project")),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},"Create a secret to login to DockerHub in your project:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"oc create secret docker-registry dockerhub-secret --docker-server=docker.io --docker-username=<dockerhub-username> --docker-password=<dockerhub-password> --docker-email=<email-address>\n")),(0,a.yg)("ol",{start:2},(0,a.yg)("li",{parentName:"ol"},"Link the login secret to the default service account:")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"oc secrets link default dockerhub-secret --for=pull\n")))}y.isMDXComponent=!0}}]);
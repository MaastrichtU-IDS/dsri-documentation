"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4324],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=o.createContext({}),l=function(e){var t=o.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=l(e.components);return o.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=l(n),u=a,h=m["".concat(d,".").concat(u)]||m[u]||c[u]||i;return n?o.createElement(h,r(r({ref:t},p),{},{components:n})):o.createElement(h,r({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=m;var s={};for(var d in t)hasOwnProperty.call(t,d)&&(s[d]=t[d]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var l=2;l<i;l++)r[l]=n[l];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},96:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var o=n(7462),a=n(3366),i=(n(7294),n(3905)),r=["components"],s={id:"deploy-vscode",title:"VisualStudio Code"},d=void 0,l={unversionedId:"deploy-vscode",id:"deploy-vscode",title:"VisualStudio Code",description:"Start VisualStudio Code server",source:"@site/docs/deploy-vscode.md",sourceDirName:".",slug:"/deploy-vscode",permalink:"/docs/deploy-vscode",editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/deploy-vscode.md",tags:[],version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1649176884,formattedLastUpdatedAt:"4/5/2022",frontMatter:{id:"deploy-vscode",title:"VisualStudio Code"},sidebar:"docs",previous:{title:"RStudio",permalink:"/docs/deploy-rstudio"},next:{title:"Databases",permalink:"/docs/deploy-database"}},p={},c=[{value:"Start VisualStudio Code server",id:"start-visualstudio-code-server",level:2},{value:"Use Git in VSCode",id:"use-git-in-vscode",level:2},{value:"VSCode for GPU",id:"vscode-for-gpu",level:2}],m={toc:c};function u(e){var t=e.components,n=(0,a.Z)(e,r);return(0,i.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"start-visualstudio-code-server"},"Start VisualStudio Code server"),(0,i.kt)("p",null,"Start a VisualStudio Code server with the ",(0,i.kt)("inlineCode",{parentName:"p"},"coder")," user, which has ",(0,i.kt)("inlineCode",{parentName:"p"},"sudo")," privileges."),(0,i.kt)("p",null,"You can deploy it using the ",(0,i.kt)("strong",{parentName:"p"},"VisualStudio Code server")," solution in the ",(0,i.kt)("a",{parentName:"p",href:"https://console-openshift-console.apps.dsri2.unimaas.nl/catalog"},"Catalog web UI")," (make sure the ",(0,i.kt)("strong",{parentName:"p"},"Templates")," checkbox is checked)"),(0,i.kt)("p",null,"Provide a few parameters, and instantiate the template. The DSRI will automatically create a persistent volume to store data you will put in the ",(0,i.kt)("inlineCode",{parentName:"p"},"/home/coder/project")," folder. You can find the persistent volumes in the DSRI web UI, go to the ",(0,i.kt)("strong",{parentName:"p"},"Administrator")," view > ",(0,i.kt)("strong",{parentName:"p"},"Storage")," > ",(0,i.kt)("strong",{parentName:"p"},"Persistent Volume Claims"),"."),(0,i.kt)("img",{src:"/img/screenshot-deploy-vscode.png",alt:"Deploy VSCode",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Use Chrome")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Unfortunately, we recommend to ",(0,i.kt)("strong",{parentName:"p"},"use Google Chrome")," web browser as pasting in the terminal (",(0,i.kt)("inlineCode",{parentName:"p"},"ctrl + shift + v"),") might not work on Firefox"))),(0,i.kt)("h2",{id:"use-git-in-vscode"},"Use Git in VSCode"),(0,i.kt)("p",null,"The easiest way to login and clone a repository from GitHub is to use the built-in authentication system of VisualStudio Code, to do so click on ",(0,i.kt)("strong",{parentName:"p"},"clone repository...")," in the ",(0,i.kt)("strong",{parentName:"p"},"Welcome")," page, and follow the instructions in the top of the VisualStudio window."),(0,i.kt)("p",null,"If this solution does not work for you, you can use ",(0,i.kt)("inlineCode",{parentName:"p"},"git")," from the terminal to clone the git repository with ",(0,i.kt)("inlineCode",{parentName:"p"},"git clone"),". VisualStudio might ask you to login in the dialog box at the top of the page, enter your username and password when requested. For GitHub you might need to generate a token at ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/settings/tokens"},"https://github.com/settings/tokens")," to use as password."),(0,i.kt)("p",null,"Once the repository cloned, you can use git from the VSCode web UI to manage your ",(0,i.kt)("inlineCode",{parentName:"p"},"git")," repositories (add, commit, push changes), or in the terminal."),(0,i.kt)("p",null,"Before committing to GitHub or GitLab, you might need to configure you username and email in VSCode terminal:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'git config --global user.name "Jean Dupont"\ngit config --global user.email jeandupont@gmail.com\n')),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Save your git password")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"You can run this command to ask git to save your password for 15min:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"git config credential.helper cache\n")),(0,i.kt)("p",{parentName:"div"},"Or store the password in a plain text file:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"git config --global credential.helper 'store --file ~/.git-credentials'\n")))),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Git tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"We recommend to use SSH instead of HTTPS connection when possible, checkout ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent"},"here")," how to generate SSH keys and use them with your GitHub account."))),(0,i.kt)("h2",{id:"vscode-for-gpu"},"VSCode for GPU"),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"/docs/deploy-on-gpu"},"Deploy on GPU")," page to deploy a VisualStudio Code server on GPU."))}u.isMDXComponent=!0}}]);
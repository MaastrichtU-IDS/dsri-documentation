"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4152],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=i,y=m["".concat(s,".").concat(d)]||m[d]||u[d]||r;return n?a.createElement(y,o(o({ref:t},p),{},{components:n})):a.createElement(y,o({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},165:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>u});var a=n(3117),i=n(102),r=(n(7294),n(3905)),o=["components"],l={id:"guide-vpn",title:"Install UM VPN"},s=void 0,c={unversionedId:"guide-vpn",id:"guide-vpn",title:"Install UM VPN",description:"Request an account",source:"@site/docs/guide-vpn.md",sourceDirName:".",slug:"/guide-vpn",permalink:"/docs/guide-vpn",draft:!1,editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/guide-vpn.md",tags:[],version:"current",lastUpdatedBy:"Brouwers, Marcel (ICTS)",lastUpdatedAt:1721026613,formattedLastUpdatedAt:"Jul 15, 2024",frontMatter:{id:"guide-vpn",title:"Install UM VPN"},sidebar:"docs",previous:{title:"Utilities",permalink:"/docs/catalog-utilities"},next:{title:"Access UM servers",permalink:"/docs/access-um-servers"}},p={},u=[{value:"Request an account",id:"request-an-account",level:2},{value:"Connect to the UM network",id:"connect-to-the-um-network",level:2},{value:"Install the VPN (AnyConnect Secure Mobility Client) on Windows",id:"install-the-vpn-anyconnect-secure-mobility-client-on-windows",level:4},{value:"Log in to the VPN (AnyConnect Secure Mobility Client)",id:"log-in-to-the-vpn-anyconnect-secure-mobility-client",level:4},{value:"Install the VPN (AnyConnect Secure Mobility Client) on Linux",id:"install-the-vpn-anyconnect-secure-mobility-client-on-linux",level:4}],m={toc:u};function d(e){var t=e.components,n=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"request-an-account"},"Request an account"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"You will need to have an account at Maastricht University with an email ending with ",(0,r.kt)("inlineCode",{parentName:"p"},"@maastrichtuniversity.nl")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"@student.maastrichtuniversity.nl"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Request access to the DSRI for your account Please fill this ",(0,r.kt)("a",{parentName:"p",href:"/register"},"form \ud83d\udcec"),". to provide us some information on what you plan to do with the DSRI."))),(0,r.kt)("h2",{id:"connect-to-the-um-network"},"Connect to the UM network"),(0,r.kt)("p",null,"You need to be connected to the UM network to access the DSRI."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Connect to ",(0,r.kt)("strong",{parentName:"p"},"UMnet")," or ",(0,r.kt)("strong",{parentName:"p"},"eduroam")," WiFi at Maastricht University")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Use the ",(0,r.kt)("strong",{parentName:"p"},"Maastricht University VPN")," at ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("a",{parentName:"strong",href:"https://vpn.maastrichtuniversity.nl/"},"vpn.maastrichtuniversity.nl"))),(0,r.kt)("p",{parentName:"li"},"Log in to that using your UM username and password."))),(0,r.kt)("admonition",{title:"Students",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"By default the UM VPN is only available to employees. As a student you can access UM resources from any location via ",(0,r.kt)("a",{parentName:"p",href:"https://athenadesktop.maastrichtuniversity.nl"},"Student Desktop Anywhere"),".\u202fHowever, if VPN access is absolutely necessary you can request access via your course coordinator. ")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"The ",(0,r.kt)("strong",{parentName:"p"},"prefix of your UM email address")," with the first letter capitalized, e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"Firstname.Lastname")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"F.Lastname"),"Or your ",(0,r.kt)("strong",{parentName:"p"},"employee number")," at Maastricht University (a.k.a. P number), e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"P7000000")),(0,r.kt)("img",{src:"/img/vpn-login.png",alt:"VPN Log in View",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("p",{parentName:"li"},"Then You will see below page to download the ",(0,r.kt)("strong",{parentName:"p"},"AnyConnect Secure Mobility Client")),(0,r.kt)("img",{src:"/img/VPN-anyconnect.png",alt:"Download AnyConnect Secure Mobility Client",style:{maxWidth:"100%",maxHeight:"100%"}}))),(0,r.kt)("h4",{id:"install-the-vpn-anyconnect-secure-mobility-client-on-windows"},"Install the VPN (AnyConnect Secure Mobility Client) on Windows"),(0,r.kt)("p",null,"Double click on the ",(0,r.kt)("inlineCode",{parentName:"p"},".exe")," file to install the VPN."),(0,r.kt)("p",null,"You can follow below steps as in pictures."),(0,r.kt)("img",{src:"/img/vpnsetup1.png",alt:"Install VPN",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("img",{src:"/img/vpnsetup2.png",alt:"Install VPN",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("img",{src:"/img/vpnsetup3.png",alt:"Install VPN",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("img",{src:"/img/vpnsetup4.png",alt:"Install VPN",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("h4",{id:"log-in-to-the-vpn-anyconnect-secure-mobility-client"},"Log in to the VPN (AnyConnect Secure Mobility Client)"),(0,r.kt)("p",null,"Once you finish installing you can run the Cisco AnyConnect Secure Mobility Client. "),(0,r.kt)("img",{src:"/img/vpnsetup7.png",alt:"Log in to the VPN",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("p",null,"Then after you will get the bellow wizard and click connect"),(0,r.kt)("img",{src:"/img/vpnsetup5.png",alt:"Log in to the VPN",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("p",null,"Provide your UM username and password. (",(0,r.kt)("strong",{parentName:"p"},"employee number")," at Maastricht University (a.k.a. P number), e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"P7000000"),")"),(0,r.kt)("img",{src:"/img/vpnsetup6.png",alt:"Log in to the VPN",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,r.kt)("h4",{id:"install-the-vpn-anyconnect-secure-mobility-client-on-linux"},"Install the VPN (AnyConnect Secure Mobility Client) on Linux"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Connect to ",(0,r.kt)("strong",{parentName:"p"},"UMnet")," or ",(0,r.kt)("strong",{parentName:"p"},"eduroam")," WiFi at Maastricht University")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"For ",(0,r.kt)("strong",{parentName:"p"},"Linux"),", use ",(0,r.kt)("inlineCode",{parentName:"p"},"openconnect")," to connect to the UM VPN. You can easily install it on Ubuntu and Debian distributions with ",(0,r.kt)("inlineCode",{parentName:"p"},"apt"),":"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install openconnect\nsudo openconnect -u YOUR.USER --authgroup 01-Employees --useragent=AnyConnect vpn.maastrichtuniversity.nl\n")),(0,r.kt)("blockquote",{parentName:"li"},(0,r.kt)("p",{parentName:"blockquote"},"Provide your UM password when prompted."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"For ",(0,r.kt)("strong",{parentName:"p"},"students"),":"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"By default the UM VPN is only available to employees. As a student you can access UM resources from any location via ",(0,r.kt)("a",{parentName:"li",href:"https://athenadesktop.maastrichtuniversity.nl"},"Student Desktop Anywhere"),".\u202fHowever, if VPN access is absolutely necessary you can request access via your course coordinator.")))))}d.isMDXComponent=!0}}]);
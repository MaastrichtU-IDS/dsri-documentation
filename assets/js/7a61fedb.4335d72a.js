"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4137],{3905:(e,t,o)=>{o.d(t,{Zo:()=>u,kt:()=>m});var r=o(7294);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function n(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,r,a=function(e,t){if(null==e)return{};var o,r,a={},n=Object.keys(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var i=r.createContext({}),p=function(e){var t=r.useContext(i),o=t;return e&&(o="function"==typeof e?e(t):l(l({},t),e)),o},u=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var o=e.components,a=e.mdxType,n=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(o),m=a,g=d["".concat(i,".").concat(m)]||d[m]||c[m]||n;return o?r.createElement(g,l(l({ref:t},u),{},{components:o})):r.createElement(g,l({ref:t},u))}));function m(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=o.length,l=new Array(n);l[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,l[1]=s;for(var p=2;p<n;p++)l[p]=o[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,o)}d.displayName="MDXCreateElement"},4636:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>c});var r=o(3117),a=o(102),n=(o(7294),o(3905)),l=["components"],s={id:"workflows-argo",title:"Run Argo workflows"},i=void 0,p={unversionedId:"workflows-argo",id:"workflows-argo",title:"Run Argo workflows",description:"Argo needs to be installed in your project, contact the DSRI team to request it.",source:"@site/docs/workflows-argo.md",sourceDirName:".",slug:"/workflows-argo",permalink:"/docs/workflows-argo",draft:!1,editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/workflows-argo.md",tags:[],version:"current",lastUpdatedBy:"Brouwers, Marcel (ICTS)",lastUpdatedAt:1721026613,formattedLastUpdatedAt:"Jul 15, 2024",frontMatter:{id:"workflows-argo",title:"Run Argo workflows"},sidebar:"docs",previous:{title:"Deploy Airflow",permalink:"/docs/workflows-airflow"},next:{title:"Run Nextflow workflows",permalink:"/docs/workflows-nextflow"}},u={},c=[{value:"Install the <code>argo</code> client",id:"install-the-argo-client",level:2},{value:"On Ubuntu",id:"on-ubuntu",level:3},{value:"On MacOS",id:"on-macos",level:3},{value:"On Windows",id:"on-windows",level:3},{value:"Test Argo",id:"test-argo",level:3},{value:"Install Argo in your project",id:"install-argo-in-your-project",level:2},{value:"Argo workflows with Helm",id:"argo-workflows-with-helm",level:3},{value:"ArgoCD Operator",id:"argocd-operator",level:3},{value:"Uninstall <code>argo</code>",id:"uninstall-argo",level:3},{value:"On Ubuntu",id:"on-ubuntu-1",level:4},{value:"Run workflows to convert structured data to RDF",id:"run-workflows-to-convert-structured-data-to-rdf",level:2},{value:"Clone the repository",id:"clone-the-repository",level:3},{value:"Workflow to convert XML files to RDF",id:"workflow-to-convert-xml-files-to-rdf",level:3},{value:"Workflow to convert CSV files to RDF",id:"workflow-to-convert-csv-files-to-rdf",level:3},{value:"Argo commands",id:"argo-commands",level:2},{value:"List running Argo workflows",id:"list-running-argo-workflows",level:3},{value:"Stop a workflow",id:"stop-a-workflow",level:3},{value:"Delete a workflow",id:"delete-a-workflow",level:3},{value:"Debug a workflow",id:"debug-a-workflow",level:2}],d={toc:c};function m(e){var t=e.components,o=(0,a.Z)(e,l);return(0,n.kt)("wrapper",(0,r.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("admonition",{title:"Install in your project",type:"warning"},(0,n.kt)("p",{parentName:"admonition"},"Argo needs to be installed in your project, ",(0,n.kt)("a",{parentName:"p",href:"mailto:dsri-support-l@maastrichtuniversity.nl"},"contact the DSRI team")," to request it.")),(0,n.kt)("h2",{id:"install-the-argo-client"},"Install the ",(0,n.kt)("inlineCode",{parentName:"h2"},"argo")," client"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://argoproj.github.io/argo/"},"Argo \ud83e\udd91")," is a container native workflow engine for ",(0,n.kt)("a",{parentName:"p",href:"https://kubernetes.io/"},"Kubernetes")," supporting both ",(0,n.kt)("a",{parentName:"p",href:"https://argoproj.github.io/docs/argo/examples/readme.html#dag"},"DAG")," and ",(0,n.kt)("a",{parentName:"p",href:"https://argoproj.github.io/docs/argo/examples/readme.html#steps"},"step based")," workflows."),(0,n.kt)("p",null,"Download and install the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo"},"Argo client")," on your computer to ",(0,n.kt)("a",{parentName:"p",href:"https://argoproj.github.io/docs/argo/examples/readme.html"},"start workflows")," on the DSRI."),(0,n.kt)("h3",{id:"on-ubuntu"},"On Ubuntu"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"sudo curl -L -o /usr/local/bin/argo https://github.com/argoproj/argo/releases/download/v2.4.2/argo-linux-amd64\nsudo chmod +x /usr/local/bin/argo\n")),(0,n.kt)("h3",{id:"on-macos"},"On MacOS"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"brew install argoproj/tap/argo\n")),(0,n.kt)("h3",{id:"on-windows"},"On Windows"),(0,n.kt)("p",null,"Get ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/argoproj/argo/releases/download/v2.4.2/argo-windows-amd64"},"Argo executable version 2.4.2")," from ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/argoproj/argo/releases"},"Argo Releases")," on GitHub."),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"See ",(0,n.kt)("a",{parentName:"p",href:"https://argoproj.github.io/docs/argo/demo.html#1-download-argo"},"official Argo documentation"),".")),(0,n.kt)("h3",{id:"test-argo"},"Test Argo"),(0,n.kt)("p",null,"Run Hello world workflow to test if Argo has been properly installed. And take a look at the ",(0,n.kt)("a",{parentName:"p",href:"https://argoproj.github.io/docs/argo/examples/readme.html"},"examples provided in Argo documentation")," to discover how to use the different features available."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo submit --watch https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml\n")),(0,n.kt)("admonition",{title:"Logged in",type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"You will need to have the ",(0,n.kt)("inlineCode",{parentName:"p"},"oc")," client installed and be logged in with ",(0,n.kt)("inlineCode",{parentName:"p"},"oc login"),", see the ",(0,n.kt)("a",{parentName:"p",href:"/docs/openshift-install"},"install documentation page"),".")),(0,n.kt)("h2",{id:"install-argo-in-your-project"},"Install Argo in your project"),(0,n.kt)("h3",{id:"argo-workflows-with-helm"},"Argo workflows with Helm"),(0,n.kt)("p",null,"Deploy the ",(0,n.kt)("a",{parentName:"p",href:"https://artifacthub.io/packages/helm/argo/argo"},"Argo Helm chart"),"."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Install and use ",(0,n.kt)("a",{parentName:"li",href:"/docs/helm"},(0,n.kt)("inlineCode",{parentName:"a"},"helm"))),(0,n.kt)("li",{parentName:"ol"},"Add the Helm charts repository:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"helm repo add argo https://argoproj.github.io/argo-helm\n")),(0,n.kt)("ol",{start:3},(0,n.kt)("li",{parentName:"ol"},"Install chart:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"helm install my-argo argo/argo --version 0.15.2\n")),(0,n.kt)("h3",{id:"argocd-operator"},"ArgoCD Operator"),(0,n.kt)("p",null,"Ask on the DSRI Slack ",(0,n.kt)("strong",{parentName:"p"},"#helpdesk")," channel to have the ",(0,n.kt)("a",{parentName:"p",href:"https://artifacthub.io/packages/olm/community-operators/argocd-operator"},"ArgoCD Operator")," installed in your project."),(0,n.kt)("h3",{id:"uninstall-argo"},"Uninstall ",(0,n.kt)("inlineCode",{parentName:"h3"},"argo")),(0,n.kt)("h4",{id:"on-ubuntu-1"},"On Ubuntu"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"sudo rm /usr/local/bin/argo\n")),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"You can now reinstall a newer version of Argo.")),(0,n.kt)("hr",null),(0,n.kt)("h2",{id:"run-workflows-to-convert-structured-data-to-rdf"},"Run workflows to convert structured data to RDF"),(0,n.kt)("p",null,"We will use examples from the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/d2s-core"},"MaastrichtU-IDS/d2s-core")," project."),(0,n.kt)("h3",{id:"clone-the-repository"},"Clone the repository"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git clone --recursive https://github.com/MaastrichtU-IDS/d2s-project-template.git\ncd d2s-project-template\n")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/openshift-install"},"Authenticate to the OpenShift cluster")," using ",(0,n.kt)("inlineCode",{parentName:"p"},"oc login")," ."),(0,n.kt)("h3",{id:"workflow-to-convert-xml-files-to-rdf"},"Workflow to convert XML files to RDF"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Steps-based workflow for XML files, see the example workflow ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/d2s-workflow-xml.yaml"},"YAML file on GitHub"),".")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo submit d2s-core/argo/workflows/d2s-workflow-transform-xml.yaml \\\n  -f support/config/config-transform-xml-drugbank.yml\n")),(0,n.kt)("admonition",{title:"Provide config files",type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Config files can be provided using the ",(0,n.kt)("inlineCode",{parentName:"p"},"-f")," arguments, but are not necessary.")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"DAG workflow for XML files, see the ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/d2s-workflow-xml-dag.yaml"},"YAML file on GitHub"),".")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo submit d2s-core/argo/workflows/d2s-workflow-transform-xml-dag.yaml \\\n  -f support/config/config-transform-xml-drugbank.yml\n")),(0,n.kt)("h3",{id:"workflow-to-convert-csv-files-to-rdf"},"Workflow to convert CSV files to RDF"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Steps-based workflow for CSV files")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo submit d2s-core/argo/workflows/d2s-workflow-transform-csv.yaml \\\n  -f support/config/config-transform-csv-stitch.yml\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"DAG workflow for CSV files")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo submit d2s-core/argo/workflows/d2s-workflow-transform-csv-dag.yaml \\\n  -f support/config/config-transform-csv-stitch.yml\n")),(0,n.kt)("admonition",{title:"Solve issue",type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"Try this to solve issue related to steps services IP: ",(0,n.kt)("inlineCode",{parentName:"p"},"{{steps.nginx-server.pod-ip}}"))),(0,n.kt)("hr",null),(0,n.kt)("h2",{id:"argo-commands"},"Argo commands"),(0,n.kt)("h3",{id:"list-running-argo-workflows"},"List running Argo workflows"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo list\n")),(0,n.kt)("h3",{id:"stop-a-workflow"},"Stop a workflow"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo terminate my-workflow\n")),(0,n.kt)("admonition",{title:"Workflow",type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"This might not stop the workflow, in this case use:"),(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"argo delete my-workflow\n"))),(0,n.kt)("h3",{id:"delete-a-workflow"},"Delete a workflow"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo delete my-workflow\n")),(0,n.kt)("hr",null),(0,n.kt)("h2",{id:"debug-a-workflow"},"Debug a workflow"),(0,n.kt)("p",null,"Get into a container, to understand why it bugs, by creating a YAML with the command ",(0,n.kt)("inlineCode",{parentName:"p"},"tail -f /dev/null")," to keep it hanging."),(0,n.kt)("p",null,"See the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-argo.yaml"},"example in the d2s-argo-workflow repository"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: argoproj.io/v1alpha1\nkind: Workflow\nmetadata:\n  generateName: test-devnull-argo-\nspec:\n  entrypoint: execute-workflow\n\n  # Use existing volume\n  volumes:\n  - name: workdir\n    persistentVolumeClaim:\n      claimName: pvc-mapr-projects-test-vincent \n\n  templates:\n  - name: execute-workflow\n    steps:\n    - - name: run-rdfunit\n        template: rdfunit\n   \n  - name: rdfunit\n    container:\n      image: umids/rdfunit:latest\n      command: [tail]\n      args: ["-f", "/dev/null"]\n      volumeMounts:\n      - name: workdir\n        mountPath: /data\n        subPath: dqa-workspace\n')),(0,n.kt)("p",null,"Then start the workflow:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"argo submit --serviceaccount argo tests/test-devnull-argo.yaml\n")),(0,n.kt)("p",null,"And connect with the Shell (change the pod ID to your pod ID):"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"oc rsh test-devnull-argo-pod\n")))}m.isMDXComponent=!0}}]);
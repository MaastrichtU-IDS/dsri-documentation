"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7182],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>d});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),s=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=s(e.components);return o.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),u=s(n),d=r,h=u["".concat(l,".").concat(d)]||u[d]||c[d]||a;return n?o.createElement(h,i(i({ref:t},m),{},{components:n})):o.createElement(h,i({ref:t},m))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},689:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>d,frontMatter:()=>p,metadata:()=>s,toc:()=>c});var o=n(7462),r=n(3366),a=(n(7294),n(3905)),i=["components"],p={id:"mpi-jobs",title:"Run MPI jobs"},l=void 0,s={unversionedId:"mpi-jobs",id:"mpi-jobs",title:"Run MPI jobs",description:"We deployed the MPI Operator from Kubeflow to run MPI jobs on the DSRI.",source:"@site/docs/mpi-jobs.md",sourceDirName:".",slug:"/mpi-jobs",permalink:"/docs/mpi-jobs",editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/mpi-jobs.md",tags:[],version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1655368313,formattedLastUpdatedAt:"6/16/2022",frontMatter:{id:"mpi-jobs",title:"Run MPI jobs"},sidebar:"docs",previous:{title:"Spark cluster",permalink:"/docs/deploy-spark"},next:{title:"Neuroscience research",permalink:"/docs/neuroscience"}},m={},c=[{value:"Run MPI jobs on CPU",id:"run-mpi-jobs-on-cpu",level:2}],u={toc:c};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"We deployed the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubeflow/mpi-operator"},"MPI Operator")," from Kubeflow to run MPI jobs on the DSRI."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"The MPI Operator makes it easy to run allreduce-style distributed training on Kubernetes. Please check out ",(0,a.kt)("a",{parentName:"p",href:"https://medium.com/kubeflow/introduction-to-kubeflow-mpi-operator-and-industry-adoption-296d5f2e6edc"},"this blog post")," for an introduction to MPI Operator and its industry adoption.")),(0,a.kt)("h2",{id:"run-mpi-jobs-on-cpu"},"Run MPI jobs on CPU"),(0,a.kt)("p",null,"Checkout the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubeflow/mpi-operator/tree/master/examples/horovod"},"repository of the CPU benchmark")," for a complete example of an MPI job: python script, ",(0,a.kt)("inlineCode",{parentName:"p"},"Dockerfile"),", and the job deployment YAML."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Clone the repository, and go to the example folder:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/kubeflow/mpi-operator.git\ncd mpi-operator/examples/horovod\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Open the ",(0,a.kt)("inlineCode",{parentName:"li"},"tensorflow-mnist.yaml")," file, and fix the ",(0,a.kt)("inlineCode",{parentName:"li"},"apiVersion")," on the first line:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"# From\napiVersion: kubeflow.org/v1\n# To\napiVersion: kubeflow.org/v1alpha2\n")),(0,a.kt)("p",null,"You will also need to specify those containers can run with the ",(0,a.kt)("inlineCode",{parentName:"p"},"root")," user by adding the ",(0,a.kt)("inlineCode",{parentName:"p"},"serviceAccountName")," between ",(0,a.kt)("inlineCode",{parentName:"p"},"spec:")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"container:")," for the launcher and the worker templates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"      template:\n        spec:\n          serviceAccountName: anyuid\n          containers:\n          - image: docker.io/kubeflow/mpi-horovod-mnist\n")),(0,a.kt)("p",null,"Your ",(0,a.kt)("inlineCode",{parentName:"p"},"tensorflow-mnist.yaml")," file should look like this: "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: kubeflow.org/v1alpha2\nkind: MPIJob\nmetadata:\n  name: tensorflow-mnist\nspec:\n  slotsPerWorker: 1\n  cleanPodPolicy: Running\n  mpiReplicaSpecs:\n    Launcher:\n      replicas: 1\n      template:\n        spec:\n          serviceAccountName: anyuid\n          containers:\n          - image: docker.io/kubeflow/mpi-horovod-mnist\n            name: mpi-launcher\n            command:\n            - mpirun\n            args:\n            - -np\n            - "2"\n            - --allow-run-as-root\n            - -bind-to\n            - none\n            - -map-by\n            - slot\n            - -x\n            - LD_LIBRARY_PATH\n            - -x\n            - PATH\n            - -mca\n            - pml\n            - ob1\n            - -mca\n            - btl\n            - ^openib\n            - python\n            - /examples/tensorflow_mnist.py\n            resources:\n              limits:\n                cpu: 1\n                memory: 2Gi\n    Worker:\n      replicas: 2\n      template:\n        spec:\n          serviceAccountName: anyuid\n          containers:\n          - image: docker.io/kubeflow/mpi-horovod-mnist\n            name: mpi-worker\n            resources:\n              limits:\n                cpu: 2\n                memory: 4Gi\n\n')),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"Once this has been set, create the job in your current project on the DSRI (change with ",(0,a.kt)("inlineCode",{parentName:"li"},"oc project my-project"),"):")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"oc create -f tensorflow-mnist.yaml\n")),(0,a.kt)("p",null,"You should see the 2 workers and the main job running in your project ",(0,a.kt)("strong",{parentName:"p"},"Topology")," page in the DSRI web UI. You can then easily check the logs of the launcher and workers."),(0,a.kt)("p",null,"To run your own MPI job on the DSRI, you can take a look at, and edit, the different files provided by the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubeflow/mpi-operator/tree/master/examples/horovod"},"MPI Operator example"),":"),(0,a.kt)("p",null,"\ud83d\udc0d ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubeflow/mpi-operator/blob/master/examples/horovod/tensorflow_mnist.py"},(0,a.kt)("inlineCode",{parentName:"a"},"tensorflow_mnist.py")),": the python script with the actual job to run"),(0,a.kt)("p",null,"\ud83d\udc33 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubeflow/mpi-operator/blob/master/examples/horovod/Dockerfile.cpu"},(0,a.kt)("inlineCode",{parentName:"a"},"Dockerfile.cpu")),": the Dockerfile to define the image of the containers in which your job will run (install dependencies)"),(0,a.kt)("p",null,"\u26f5\ufe0f ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubeflow/mpi-operator/blob/master/examples/horovod/tensorflow-mnist.yaml"},(0,a.kt)("inlineCode",{parentName:"a"},"tensorflow-mnist.yaml")),": the YAML file to define the MPI deployment on Kubernetes (number and limits of workers, ",(0,a.kt)("inlineCode",{parentName:"p"},"mpirun")," command, etc)"),(0,a.kt)("p",null,"Visit the ",(0,a.kt)("a",{parentName:"p",href:"https://www.kubeflow.org/docs/components/training/mpi/#creating-an-mpi-job"},"Kubeflow documentation to create a MPI job")," for more details."),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Contact us")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Feel free to contact us on  the DSRI Slack ",(0,a.kt)("strong",{parentName:"p"},"#helpdesk")," channel to discuss the use of MPI on the DSRI."))))}d.isMDXComponent=!0}}]);
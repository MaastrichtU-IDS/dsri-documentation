"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5210],{5680:(e,t,a)=>{a.d(t,{xA:()=>u,yg:()=>m});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),g=s(a),m=r,c=g["".concat(p,".").concat(m)]||g[m]||y[m]||i;return a?n.createElement(c,o(o({ref:t},u),{},{components:a})):n.createElement(c,o({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=g;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=a[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}g.displayName="MDXCreateElement"},9271:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>p,default:()=>m,frontMatter:()=>l,metadata:()=>s,toc:()=>y});var n=a(9668),r=a(1367),i=(a(6540),a(5680)),o=["components"],l={id:"deploy-jupyter",title:"Jupyter Notebooks"},p=void 0,s={unversionedId:"deploy-jupyter",id:"deploy-jupyter",title:"Jupyter Notebooks",description:"\ud83e\ude90 Start JupyterLab",source:"@site/docs/deploy-jupyter.md",sourceDirName:".",slug:"/deploy-jupyter",permalink:"/docs/deploy-jupyter",draft:!1,editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/deploy-jupyter.md",tags:[],version:"current",lastUpdatedBy:"Adekunle Onaopepo",lastUpdatedAt:1733328046,formattedLastUpdatedAt:"Dec 4, 2024",frontMatter:{id:"deploy-jupyter",title:"Jupyter Notebooks"},sidebar:"docs",previous:{title:"Install from Operators",permalink:"/docs/operators"},next:{title:"RStudio",permalink:"/docs/deploy-rstudio"}},u={},y=[{value:"\ud83e\ude90 Start JupyterLab",id:"-start-jupyterlab",level:2},{value:"\ud83d\udce6\ufe0f Manage dependencies with Conda",id:"\ufe0f-manage-dependencies-with-conda",level:2},{value:"\ud83d\udc19 Use git in JupyterLab",id:"-use-git-in-jupyterlab",level:2},{value:"\ud83d\udc36 Example",id:"-example",level:3}],g={toc:y};function m(e){var t=e.components,a=(0,r.A)(e,o);return(0,i.yg)("wrapper",(0,n.A)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"-start-jupyterlab"},"\ud83e\ude90 Start JupyterLab"),(0,i.yg)("p",null,"Start a JupyterLab container based on the ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/jupyter/docker-stacks"},"official Jupyter docker stacks")," (debian), with ",(0,i.yg)("inlineCode",{parentName:"p"},"sudo")," privileges to install anything you need (e.g. pip or apt packages)"),(0,i.yg)("p",null,"You can start a container using the ",(0,i.yg)("strong",{parentName:"p"},"JupyterLab")," template in the ",(0,i.yg)("a",{parentName:"p",href:"https://console-openshift-console.apps.dsri2.unimaas.nl/catalog"},"Catalog web UI")," (make sure the ",(0,i.yg)("strong",{parentName:"p"},"Templates")," checkbox is checked)"),(0,i.yg)("p",null,"When instantiating the template you can provide a few parameters, such as:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Password")," to access the notebook"),(0,i.yg)("li",{parentName:"ul"},"Optionally you can provide a ",(0,i.yg)("strong",{parentName:"li"},"git repository")," to be automatically cloned in the JupyterLab (if there is a ",(0,i.yg)("inlineCode",{parentName:"li"},"requirements.txt")," packages will be automatically installed with ",(0,i.yg)("inlineCode",{parentName:"li"},"pip"),")"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Docker image")," to use for the notebook (see below for more details on customizing the docker image) "),(0,i.yg)("li",{parentName:"ul"},"Your ",(0,i.yg)("strong",{parentName:"li"},"git username and email")," to automatically configure git")),(0,i.yg)("p",null,"The DSRI will automatically create a persistent volume to store data you will put in the ",(0,i.yg)("inlineCode",{parentName:"p"},"/home/jovyan/work")," folder (the folder used by the notebook interface). You can find the persistent volumes in the DSRI web UI, go to the ",(0,i.yg)("strong",{parentName:"p"},"Administrator")," view > ",(0,i.yg)("strong",{parentName:"p"},"Storage")," > ",(0,i.yg)("strong",{parentName:"p"},"Persistent Volume Claims"),"."),(0,i.yg)("img",{src:"/img/screenshot-deploy-jupyter.png",alt:"Deploy Jupyter",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,i.yg)("p",null,"With this template you can use any image based on the official Jupyter docker stack: ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/jupyter/docker-stacks"},"https://github.com/jupyter/docker-stacks")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"ghcr.io/maastrichtu-ids/jupyterlab:latest"),": custom image for data science on the DSRI, with additional kernels (Java), conda integration, VisualStudio Code, and autocomplete for Python"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"ghcr.io/maastrichtu-ids/jupyterlab:knowledge-graph"),": custom image for working with knowledge graph on the DSRI, with SPARQL kernel and OpenRefine"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"jupyter/scipy-notebook"),": some packages for science are preinstalled "),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"jupyter/datascience-notebook"),": with Julia kernel"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"jupyter/tensorflow-notebook"),": with tensorflow package pre-installed"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"jupyter/r-notebook"),": to work with R"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"jupyter/pyspark-notebook"),": if you want to connect to a Spark cluster"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"jupyter/all-spark-notebook"),": if you want to run Spark locally in the notebook")),(0,i.yg)("p",null,"You can also build your own image, we recommend to use this repository as example to extend a JupyterLab image: ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/jupyterlab"},"https://github.com/MaastrichtU-IDS/jupyterlab")),(0,i.yg)("h2",{id:"\ufe0f-manage-dependencies-with-conda"},"\ud83d\udce6\ufe0f Manage dependencies with Conda"),(0,i.yg)("p",null,"With the ",(0,i.yg)("inlineCode",{parentName:"p"},"ghcr.io/maastrichtu-ids/jupyterlab:latest")," image, you can easily start notebooks from the JupyterLab Launcher page using installed conda environments, at the condition ",(0,i.yg)("inlineCode",{parentName:"p"},"nb_conda_kernels")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"ipykernel")," are installed in those environments."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"You can pass a Git repository URL which contains an ",(0,i.yg)("inlineCode",{parentName:"p"},"environment.yml")," file in the root folder when starting JupyterLab, the conda environment will automatically be installed at the start of your container, and available in the JupyterLab Launcher page. You can use this repository as example: ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/dsri-demo"},"https://github.com/MaastrichtU-IDS/dsri-demo"))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Or you can install it directly in a running JupyterLab (we use ",(0,i.yg)("inlineCode",{parentName:"p"},"mamba")," which is like ",(0,i.yg)("inlineCode",{parentName:"p"},"conda")," but faster):"),(0,i.yg)("pre",{parentName:"li"},(0,i.yg)("code",{parentName:"pre",className:"language-bash"},"mamba env create -f environment.yml\n")),(0,i.yg)("p",{parentName:"li"},"You'll need to wait for 1 or 2 minutes before the new conda environment becomes available on the JupyterLab Launcher page."))),(0,i.yg)("p",null,"You can easily install an environment with a different version of Python if you need it. Here is an example of an ",(0,i.yg)("inlineCode",{parentName:"p"},"environment.yml")," file to create an environment with Python 3.9, install the minimal dependencies required to easily starts notebooks in this environment with ",(0,i.yg)("inlineCode",{parentName:"p"},"conda"),", and install a ",(0,i.yg)("inlineCode",{parentName:"p"},"pip")," package:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"name: custom-env\nchannels:\n  - defaults\n  - conda-forge\n  - anaconda\ndependencies:\n  - python=3.9\n  - ipykernel \n  - nb_conda_kernels\n  - pip\n  - pip:\n    - matplotlib\n")),(0,i.yg)("p",null,"\u26a0\ufe0f You cannot use ",(0,i.yg)("inlineCode",{parentName:"p"},"conda activate")," in a Docker container, so you will need to either open a notebook using the kernel for your conda env, or use ",(0,i.yg)("inlineCode",{parentName:"p"},"conda run")," to run scripts in the new environment:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-bash"},"conda run -n custom-env python --version\n")),(0,i.yg)("h2",{id:"-use-git-in-jupyterlab"},"\ud83d\udc19 Use git in JupyterLab"),(0,i.yg)("p",null,"You can always use ",(0,i.yg)("inlineCode",{parentName:"p"},"git")," from the terminal."),(0,i.yg)("admonition",{title:"Configure username",type:"caution"},(0,i.yg)("p",{parentName:"admonition"},"Before pushing back to GitHub or GitLab, you will need to ",(0,i.yg)("strong",{parentName:"p"},"configure you username and email")," in VSCode terminal:"),(0,i.yg)("pre",{parentName:"admonition"},(0,i.yg)("code",{parentName:"pre",className:"language-bash"},'git config --global user.name "Jean Dupont"\ngit config --global user.email jeandupont@gmail.com\n'))),(0,i.yg)("admonition",{title:"Save your password",type:"info"},(0,i.yg)("p",{parentName:"admonition"},"You can run this command to ask git to save your password for 15min:"),(0,i.yg)("pre",{parentName:"admonition"},(0,i.yg)("code",{parentName:"pre",className:"language-bash"},"git config credential.helper cache\n")),(0,i.yg)("p",{parentName:"admonition"},"Or store the password in a plain text file:"),(0,i.yg)("pre",{parentName:"admonition"},(0,i.yg)("code",{parentName:"pre",className:"language-bash"},"git config --global credential.helper 'store --file ~/.git-credentials'\n"))),(0,i.yg)("admonition",{title:"Git tip",type:"tip"},(0,i.yg)("p",{parentName:"admonition"},"We recommend to use SSH instead of HTTPS connection when possible, checkout ",(0,i.yg)("a",{parentName:"p",href:"https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent"},"here")," how to generate SSH keys and use them with your GitHub account.")),(0,i.yg)("p",null,"You can also enable and use the ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/jupyterlab/jupyterlab-git"},"JupyterLab Git extension")," to clone and manage your ",(0,i.yg)("inlineCode",{parentName:"p"},"git")," repositories."),(0,i.yg)("p",null,"It will prompt you for a username and password if the repository is private."),(0,i.yg)("img",{src:"https://raw.githubusercontent.com/jupyterlab/jupyterlab-git/master/docs/figs/preview.gif",alt:"JupyterLab Git extension",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,i.yg)("h3",{id:"-example"},"\ud83d\udc36 Example"),(0,i.yg)("p",null,"Initialize repository"),(0,i.yg)("img",{src:"/img/sample_git_page.png",alt:"Initialize repo",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,i.yg)("p",null,"Include git details in DSRI project setup"),(0,i.yg)("img",{src:"/img/sample_git_details_jupyter.png",alt:"git details",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,i.yg)("p",null,"Verify automatic deployment"),(0,i.yg)("img",{src:"/img/sample_workspace.png",alt:"workspace",style:{maxWidth:"100%",maxHeight:"100%"}}),(0,i.yg)("img",{src:"/img/sample_requirements.png",alt:"requirements",style:{maxWidth:"100%",maxHeight:"100%"}}))}m.isMDXComponent=!0}}]);
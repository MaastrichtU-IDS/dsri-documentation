"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5167],{5680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>d});var o=t(6540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,i=function(e,n){if(null==e)return{};var t,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=o.createContext({}),s=function(e){var n=o.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},p=function(e){var n=s(e.components);return o.createElement(c.Provider,{value:n},e.children)},h={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(t),d=i,u=m["".concat(c,".").concat(d)]||m[d]||h[d]||a;return t?o.createElement(u,r(r({ref:n},p),{},{components:t})):o.createElement(u,r({ref:n},p))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,r=new Array(a);r[0]=m;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var s=2;s<a;s++)r[s]=t[s];return o.createElement.apply(null,r)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9342:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>c,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>h});var o=t(9668),i=t(1367),a=(t(6540),t(5680)),r=["components"],l={id:"checkpointing-ml-training",title:"Checkpointing Machine Learning Training"},c=void 0,s={unversionedId:"checkpointing-ml-training",id:"checkpointing-ml-training",title:"Checkpointing Machine Learning Training",description:"What is Checkpointing?",source:"@site/docs/checkpointing-ml-training-models.md",sourceDirName:".",slug:"/checkpointing-ml-training",permalink:"/docs/checkpointing-ml-training",draft:!1,editUrl:"https://github.com/MaastrichtU-IDS/dsri-documentation/edit/master/website/docs/checkpointing-ml-training-models.md",tags:[],version:"current",lastUpdatedBy:"Adekunle Onaopepo",lastUpdatedAt:1734614102,formattedLastUpdatedAt:"Dec 19, 2024",frontMatter:{id:"checkpointing-ml-training",title:"Checkpointing Machine Learning Training"},sidebar:"docs",previous:{title:"Access UM servers",permalink:"/docs/access-um-servers"},next:{title:"Parallelization using Dask",permalink:"/docs/dask-tutorial"}},p={},h=[{value:"What is Checkpointing?",id:"what-is-checkpointing",level:2},{value:"Checkpointing fequency?",id:"checkpointing-fequency",level:2},{value:"Support for Checkpointing in Tensorflow/Keras and PyTorch ?",id:"support-for-checkpointing-in-tensorflowkeras-and-pytorch-",level:2},{value:"Example of Tensorflow/Keras based checkpointing:",id:"example-of-tensorflowkeras-based-checkpointing",level:2},{value:"Example of PyTorch based checkpointing:",id:"example-of-pytorch-based-checkpointing",level:2},{value:"External Resources",id:"external-resources",level:2}],m={toc:h};function d(e){var n=e.components,t=(0,i.A)(e,r);return(0,a.yg)("wrapper",(0,o.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"what-is-checkpointing"},"What is Checkpointing?"),(0,a.yg)("p",null,"Checkpointing is periodically saving the learned model parameters and current hyperparameter values during training. It helps to resume training of a model where you left off, instead of restarting the training from the beginning."),(0,a.yg)("p",null,"On shared DSRI cluster, you might have access to a GPU node for a limited number of time in one stretch, for example, maybe for 24 hours.\nTherefore, whenever the training job fails (due to timelimit expiry or otherwise), many hours of training can be lost. This problem is mitigated by a frequent checkpoint saving. When the training is resumed it'll continue from the last checkpoint saved. If the failure occurred 12 hours after the last checkpoint has been saved, 12 hours of training is lost and needs to be re-done. This can be very expensive."),(0,a.yg)("h2",{id:"checkpointing-fequency"},"Checkpointing fequency?"),(0,a.yg)("p",null,"In theory one could save a checkpoint every 10 minutes and only ever lose 10 minutes of training time, but this too would dramatically delay the reaching of the finish line because large models can't be saved quickly and if the saving time starts to create a bottleneck for the training this approach becomes counterproductive."),(0,a.yg)("p",null,"Depending on your checkpointing methodology and the speed of your IO storage partition the saving of a large model can take from dozens of seconds to several minutes. Therefore, the optimal approach to saving frequency lies somewhere in the middle."),(0,a.yg)("p",null,"The math is quite simple - measure the amount of time it takes to save the checkpoint, multiply it by how many times you'd want to save it and see how much of an additional delay the checkpoint saving will contribute to the total training time."),(0,a.yg)("p",null,"For instance, Let suppose, "),(0,a.yg)("p",null,"1) Training Time (TT), i.e. allocated time on cluster : x days\n2) Time needed to save every checkpoint: y seconds\n3) Checkpoint fequencty: every z hours"),(0,a.yg)("p",null,"=> Then, Total Number of Checkpoints during the complete training time (NCP) = (x *24)/ z"),(0,a.yg)("p",null,"=> Total Time Spent on Checkpointing (TTSC) ","[in hours]"," = NCP * y/3600 "),(0,a.yg)("p",null,"=> % of Training time spent on checkpointing = (TTSC/TT",(0,a.yg)("em",{parentName:"p"},"24) ")," 100"),(0,a.yg)("p",null,"------------------Example calculations------------------------------------"),(0,a.yg)("p",null,"Training Time (TT or x): 7 days"),(0,a.yg)("p",null,"Time needed to save every checkpoint (y): 20 secs"),(0,a.yg)("p",null,"Checkpoint fequency (z): every 30 minutes, i.e., 0.5 hours"),(0,a.yg)("p",null,"Then, "),(0,a.yg)("p",null,"NCP = 7*24/0.5 = 336"),(0,a.yg)("p",null,"TTSC = 336* 20/3600 = 1.87 hours"),(0,a.yg)("p",null,"% of Training time spent on checkpointing = (1.87/7",(0,a.yg)("em",{parentName:"p"},"24)"),"100 ~ 1.2 %     "),(0,a.yg)("h2",{id:"support-for-checkpointing-in-tensorflowkeras-and-pytorch-"},"Support for Checkpointing in Tensorflow/Keras and PyTorch ?"),(0,a.yg)("p",null,"Both PyTorch and TensorFlow/Keras support checkpointing. The follwoing sections provide an example of how Checkpointing can be done in these libraries."),(0,a.yg)("h2",{id:"example-of-tensorflowkeras-based-checkpointing"},"Example of Tensorflow/Keras based checkpointing:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-python"},"import tensorflow as tf\n\n#Imports the ModelCheckpoint class\nfrom tensorflow.keras.callbacks import ModelCheckpoint\n\n# Create your model as you normally would and compile it:\nmodel = tf.keras.models.Sequential([\n    tf.keras.layers.Dense(64, activation='relu', input_shape=(32,)),\n    tf.keras.layers.Dense(10, activation='softmax')\n])\nmodel.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])\n\n# Create a Checkpoint Callback\ncheckpoint_callback = ModelCheckpoint(\n#filepath should be a path to your persistent volume. Example, /home/jovyan path in your JupyterLab pod.\n    filepath='model_checkpoint.h5',  # You can use formats like .hdf5 or .ckpt. \n    save_best_only=True,\n    monitor='val_loss',\n    mode='min',\n    verbose=1\n)\n\n# Train the Model with the Checkpoint Callback\nhistory = model.fit(\n    x_train, y_train,\n    validation_data=(x_val, y_val),\n    epochs=10,\n    callbacks=[checkpoint_callback]\n)\n\n# Loading a Saved Checkpoint\n# Load the model architecture + weights if you saved the full model\nmodel = tf.keras.models.load_model('model_checkpoint.h5')\n\n# If you saved only the weights, you would need to create the model architecture first, then load weights:\nmodel.load_weights('model_checkpoint.h5')\n\n# Optional Parameters for Checkpointing, Example with Custom Save Intervals\ncheckpoint_callback = ModelCheckpoint(\n    filepath='model_checkpoint_epoch_{epoch:02d}.h5',\n    save_freq='epoch',\n    save_weights_only=True,\n    verbose=1\n)\n\n\n")),(0,a.yg)("h2",{id:"example-of-pytorch-based-checkpointing"},"Example of PyTorch based checkpointing:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-python"},"import torch\n\n# Example model\nmodel = torch.nn.Linear(10, 2)\n\n# Save the entire model\ntorch.save(model, 'model.pth')\n\n# Loading the Entire Model\nmodel = torch.load('model.pth')\n\n# Saving and Loading Optimizer State, i.e., To continue training exactly as before, you may want to save the optimizer state as well.\n\noptimizer = torch.optim.SGD(model.parameters(), lr=0.01)\n\n# Save model and optimizer state_dicts\ncheckpoint = {\n    'epoch': 5,\n    'model_state_dict': model.state_dict(),\n    'optimizer_state_dict': optimizer.state_dict(),\n    'loss': 0.5,\n}\ntorch.save(checkpoint, 'checkpoint.pth')\n\n# Load checkpoint\ncheckpoint = torch.load('checkpoint.pth')\nmodel.load_state_dict(checkpoint['model_state_dict'])\noptimizer.load_state_dict(checkpoint['optimizer_state_dict'])\nepoch = checkpoint['epoch']\nloss = checkpoint['loss']\nmodel.train()  # Ensure model is in training mode if needed\n\n\n\n\n\n")),(0,a.yg)("h2",{id:"external-resources"},"External Resources"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"PyTorch Documentation: ",(0,a.yg)("a",{parentName:"p",href:"https://pytorch.org/tutorials/beginner/saving_loading_models.html#save-on-gpu-load-on-cpu"},"https://pytorch.org/tutorials/beginner/saving_loading_models.html#save-on-gpu-load-on-cpu"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Tensorflow/Keras Documentation:"),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://www.digitalocean.com/community/tutorials/checkpointing-in-tensorflow"},"https://www.digitalocean.com/community/tutorials/checkpointing-in-tensorflow")),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://keras.io/api/callbacks/model_checkpoint/"},"https://keras.io/api/callbacks/model_checkpoint/"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Machine Learning Engineering by stas bekman:\n",(0,a.yg)("a",{parentName:"p",href:"https://stasosphere.com/machine-learning/"},"https://stasosphere.com/machine-learning/")))))}d.isMDXComponent=!0}}]);
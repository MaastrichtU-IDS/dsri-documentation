"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2887],{4177:(e,t,r)=>{r.r(t),r.d(t,{default:()=>w});var a=r(7294),n=r(6010),l=r(7722),o=r(2263),s=r(9578),i=r(9669),c=r.n(i),u=r(8082),d=r(6108),p=r(913),g=r(6886),m=r(8271),h=r(7357),y=r(8456),f=r(5113),b=r(7349),E=r(2912),v=r(286),x="https://api.dsri.maastrichtuniversity.nl";const w=function(){var e=(0,o.Z)().siteConfig,t=void 0===e?{}:e,r=a.useState({errorMessages:{},formObj:{email:"",project_id:""},errorMessage:"",openSuccess:"none",openError:"none",loading:!1,reservations:{},bookedDays:{},selection1:{startDate:null,endDate:null,key:"selection1"},windowSize:1e3}),i=r[0],w=r[1],D=a.useRef(i),k=a.useCallback((function(e){D.current=Object.assign({},D.current,e),w(D.current)}),[w]);a.useEffect((function(){Z();var e={startDate:new Date,endDate:(0,b.default)(new Date,7),key:"selection1"};k({selection1:e,windowSize:window.innerWidth})}),[]);var S=function(e){return!!(e in i.errorMessages&&i.errorMessages[e]&&i.errorMessages[e].length>0)},M=function(e){return e in i.errorMessages&&i.errorMessages[e]&&i.errorMessages[e].length>0?i.errorMessages[e]:null},j=function(e){if("email"===e.target.id){var t=i.errorMessages;e.target.value.match(/^[a-zA-Z0-9\._-]+@(?:student.)?maastrichtuniversity.nl$/)?(t.email=null,k({errorMessages:t})):(t.email="Provide your email, must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl",k({errorMessages:t}))}if("project_id"===e.target.id){var r=i.errorMessages;e.target.value.match(/^[a-zA-Z0-9-]*$/)?(r.project_id=null,k({errorMessages:r})):(r.project_id="The project ID should only contains alphanumeric characters and -",k({errorMessages:r}))}if("app_id"===e.target.id){var a=i.errorMessages;e.target.value.match(/^[a-zA-Z0-9-]*$/)?(a.app_id=null,k({errorMessages:a})):(a.app_id="The app ID should only contains alphanumeric characters and -",k({errorMessages:a}))}if(!i.errorMessages[e.target.id]){var n=i.formObj;n[e.target.id]=e.target.value,k({formObj:n})}},Z=function(){c().get(x+"/gpu/booked-days",{headers:{"Content-Type":"application/json"}}).then((function(e){k({bookedDays:e.data})})).catch((function(e){console.log(e)}))},_=function(e){var t="success";return e>5&&(t="warning"),e>7&&(t="error"),t};return a.createElement(l.Z,{title:""+t.title,description:"Data Science Research Infrastructure at Maastricht University"},a.createElement(p.Z,{fullWidth:!0,style:{textAlign:"center",marginTop:"30px"}},a.createElement("h1",null,"Book a GPU"),a.createElement("p",{style:{marginTop:"10px"}},"Once you booked a GPU, you will receive an email with more information, and the GPU will be enabled in your DSRI project for the period requested. You can book a GPU for a maximum of 7 days."),a.createElement("p",{style:{marginBottom:"40px"}},"The DSRI has 8 GPUs, the number in the badge on a date indicates the number of GPUs already booked this day, and greyed out days are already fully booked."),a.createElement("form",{onSubmit:function(e){e.preventDefault();k({loading:!0,openError:"none",openSuccess:"none",errorMessage:""});var t={user_email:i.formObj.email,project_id:i.formObj.project_id,app_id:i.formObj.app_id,starting_date:i.selection1.startDate,ending_date:i.selection1.endDate};c().post(x+"/gpu/request",t,{headers:{"Content-Type":"application/json"}}).then((function(e){e.data.errorMessage?k({openError:"inline",openSuccess:"none",errorMessage:e.data.errorMessage,loading:!1}):k({openSuccess:"inline",openError:"none",loading:!1}),Z()})).catch((function(e){if(k({openSuccess:"none",openError:"inline",loading:!1}),e.response)if(e.response.data.detail){var t=JSON.stringify(e.response.data.detail).replace(/"/g,"").replace(/{/g,"").replace(/}/g,"").replace(/\[/g,"").replace(/\]/g,"").replace(/:/g,"").replace(/,/g,"").replace(/loc/g,"").replace(/body/g,"").replace(/msg/g,": ").replace(/type/g,"").replace(/value_error.missing/g," - ");k({errorMessage:"Error: "+t})}else k({errorMessage:JSON.stringify(e.response.data)});else e.request?(console.log("request err"),console.log(e.request)):(console.log("Error",e.message),k({errorMessage:e.message}))}))}},a.createElement(g.ZP,{container:!0,spacing:2},a.createElement(g.ZP,{item:!0,xs:5,style:{textAlign:"right"}},a.createElement("p",{className:s.Z.required},"Your UM email:")),a.createElement(g.ZP,{item:!0,xs:7,style:{textAlign:"left"}},a.createElement(m.Z,{id:"email",multiline:!0,label:"Email",placeholder:"Email",variant:"outlined",onBlur:j,size:"small",required:!0,error:S("email"),helperText:M("email")?M("email"):"Must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl"})),a.createElement(g.ZP,{item:!0,xs:5,style:{textAlign:"right"}},a.createElement("p",{className:s.Z.required},"The DSRI project ID where to enable GPU:")),a.createElement(g.ZP,{item:!0,xs:7,style:{textAlign:"left"}},a.createElement(m.Z,{id:"project_id",multiline:!0,label:"DSRI project ID",placeholder:"e.g. machine-learning-analysis",variant:"outlined",onChange:j,size:"small",required:!0,error:S("project_id"),helperText:M("project_id")?M("project_id"):"The project ID should only contains alphanumeric characters and -"})),a.createElement(g.ZP,{item:!0,xs:5,style:{textAlign:"right"}},a.createElement("p",{className:s.Z.required},"The ID of the app deployed on the DSRI where we will enable GPU:")),a.createElement(g.ZP,{item:!0,xs:7,style:{textAlign:"left"}},a.createElement(m.Z,{id:"app_id",multiline:!0,label:"DSRI app ID",placeholder:"e.g. jupyterlab-gpu",variant:"outlined",onChange:j,size:"small",required:!0,error:S("app_id"),helperText:M("app_id")?M("app_id"):"Make sure this value is right as it will be used to automatically enable the GPU in this app. The app ID should only contains alphanumeric characters and -"})),i.windowSize>760&&a.createElement(g.ZP,{item:!0,xs:1,style:{textAlign:"center",margin:"20px 0px"}}),a.createElement(g.ZP,{item:!0,xs:i.windowSize<=760?12:10,style:{textAlign:"center",margin:"20px 0px"}},a.createElement(v.C0,{editableDateInputs:!0,ranges:[i.selection1],onChange:function(e){return k(Object.assign({},i,e))},dayContentRenderer:function(e){var t=function(e){var t=(e.getMonth()+1).toString();1==t.length&&(t="0"+t);var r=e.getDate()+"";1==r.length&&(r="0"+r);var a=e.getFullYear()+"-"+t+"-"+r,n={fullyBooked:!1},l=[];return Object.keys(i.bookedDays).indexOf(a)>-1&&(Object.keys(i.bookedDays[a]).length>1&&Object.keys(i.bookedDays[a]).map((function(e,t){"fullyBooked"!=e&&l.push(e)})),1==i.bookedDays[a].fullyBooked&&(n.fullyBooked=!0)),n.gpus=l,n}(e),r=t.fullyBooked;return a.createElement(a.Fragment,null,r&&a.createElement(u.Z,{badgeContent:t.gpus.length,color:_(t.gpus.length),style:{right:-3,top:0,padding:"0 4px"}},a.createElement("div",{style:{cursor:"not-allowed"}},a.createElement("span",{style:{color:"#b0bec5",pointerEvents:"none",cursor:"not-allowed"}},(0,E.default)(e,"d")))),!r&&t.gpus.length>0&&a.createElement(d.Z,{title:"GPUs booked: "+t.gpus.join(", ")},a.createElement(u.Z,{badgeContent:t.gpus.length,color:_(t.gpus.length),style:{right:-3,top:0,padding:"0 4px"}},a.createElement("div",null,a.createElement("span",{style:{fontWeight:"300"}},(0,E.default)(e,"d"))))),!r&&0==t.gpus.length&&a.createElement("div",null,a.createElement("span",{style:{fontWeight:"300"}},(0,E.default)(e,"d"))))},minDate:new Date,showSelectionPreview:!0,moveRangeOnFirstSelection:!1,months:2,weekStartsOn:1,direction:i.windowSize<=760?"vertical":"horizontal",preventSnapRefocus:!0}))),a.createElement(h.Z,{style:{textAlign:"center",marginTop:"10px"}},i.loading&&a.createElement(y.Z,{style:{marginTop:"20px"}}),a.createElement(f.Z,{elevation:4,style:{backgroundColor:"#e57373",padding:"15px"},sx:{display:i.openError}},"\u26a0\ufe0f\xa0\xa0",i.errorMessage),a.createElement(f.Z,{elevation:4,style:{backgroundColor:"#81c784",padding:"15px"},sx:{display:i.openSuccess}},"\u2714\ufe0f\xa0\xa0GPU requested successfully, you will receive emails with more information to use the GPU on the DSRI once your booking starts.")),a.createElement("p",{style:{marginTop:"10px"}},"\u26a0\ufe0f If you don't see any colored number on the calendar please reload the page, sometimes ReactJS fails to initialize the page"),a.createElement("button",{type:"submit",style:{margin:"30px 0px"},className:(0,n.Z)("button button--outline button--primary button--lg")},"Request a GPU for the selected period")),a.createElement("p",{style:{marginTop:"8px"}},"\ud83d\udd0e You can see a more detailed view of the GPU schedule ",a.createElement("a",{href:"https://calendar.dsri.maastrichtuniversity.nl",target:"_blank"},"here")),a.createElement("p",null,"\u274c If you want to cancel your reservation, please send an email to ",a.createElement("a",{href:"mailto:DSRI-SUPPORT-L@maastrichtuniversity.nl",target:"_blank"},"DSRI-SUPPORT-L@maastrichtuniversity.nl"))))}},9578:(e,t,r)=>{r.d(t,{Z:()=>a});const a={heroBanner:"heroBanner_UJJx",buttons:"buttons_pzbO",features:"features_keug",required:"required_T5nJ"}}}]);
(function(t){function e(e){for(var r,i,s=e[0],c=e[1],l=e[2],u=0,p=[];u<s.length;u++)i=s[u],o[i]&&p.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);f&&f(e);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={app:0},a=[];function i(t){return s.p+"js/"+({}[t]||t)+"-legacy."+{"chunk-76c838f8":"6ab5d747"}[t]+".js"}function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,r){n=o[t]=[e,r]});e.push(n[2]=r);var a,c=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=i(t),a=function(e){l.onerror=l.onload=null,clearTimeout(u);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}o[t]=void 0}};var u=setTimeout(function(){a({type:"timeout",target:l})},12e4);l.onerror=l.onload=a,c.appendChild(l)}return Promise.all(e)},s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/sub/home/dist/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var f=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},2856:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);var r=n("c93e"),o=(n("cadf"),n("551c"),n("097d"),n("d1e7"),n("da64"),n("2b0e")),a=n("d437"),i=n.n(a),s=n("d421"),c=n.n(s),l=n("12d0"),u=n.n(l),f=n("db3b"),p=n.n(f),d=n("5d92"),h=n.n(d),v=n("3702"),b=n.n(v),m=n("25b1"),g=n.n(m),w=n("c713"),x=n("d553"),y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-toolbar",{staticClass:"blue",attrs:{app:"",light:"",fixed:!0}},[n("v-toolbar-side-icon",{attrs:{light:""}}),n("v-toolbar-title",{staticClass:"white--text"},[t._v("www.namie.cc")]),n("v-spacer"),n("v-toolbar-items"),n("GhIcon",{attrs:{light:""}})],1),n("v-content",[n("v-container",{attrs:{fluid:""}},[n("router-view",{on:{showAlert:t.showAlert}})],1)],1),n("v-snackbar",{model:{value:t.showSnackbar,callback:function(e){t.showSnackbar=e},expression:"showSnackbar"}},[t._v("\n        "+t._s(t.snackbarText)+"\n        "),n("v-btn",{attrs:{color:"pink",flat:""},on:{click:function(e){t.showSnackbar=!1}}},[t._v("Close")])],1)],1)},k=[],_={name:"App",data:function(){return{showSnackbar:!1,snackbarText:""}},components:{GhIcon:function(){return n.e("chunk-76c838f8").then(n.bind(null,"c9d8"))}},methods:{showAlert:function(t){this.snackbarText=t,this.showSnackbar=!0}}},T=_,U=(n("5c0b"),n("2877")),C=Object(U["a"])(T,y,k,!1,null,null,null);C.options.__file="App.vue";var j=C.exports,S=n("8c4f"),O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-home"},[n("div",{staticClass:"text-xs-center"},[t._v("\n        Please enter your url and click the submit button.\n    ")]),n("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("v-text-field",{attrs:{autofocus:"",required:"",type:"url",placeholder:"Url here."},on:{invalid:function(e){return e.preventDefault(),t.onUrlInvalid(e)}},model:{value:t.longUrl,callback:function(e){t.longUrl=e},expression:"longUrl"}}),n("div",{staticClass:"text-xs-center"},[n("v-btn",{attrs:{round:"",large:"",color:"info",type:"submit",loading:t.isRequesting}},[t._v("Submit to shorten")])],1)],1),t.shortUrl?n("v-card",{attrs:{flat:""}},[n("v-card-text",{staticClass:"text-xs-center"},[t._v("\n            Short url is here:\n        ")]),n("v-card-text",{staticClass:"text-xs-center"},[n("a",{staticClass:"blue--text",attrs:{target:"_blank",href:t.shortUrl},domProps:{textContent:t._s(t.shortUrl)}})]),n("v-layout",{attrs:{"align-center":"","justify-center":"",row:""}},[n("v-flex",{attrs:{xs12:"","text-xs-center":""}},[n("v-btn",{attrs:{small:"",color:"info"},on:{click:t.onCopyClick}},[t._v("Click to copy")])],1)],1)],1):t._e()],1)},A=[],P=(n("96cf"),n("3040")),R=n("d3ec"),q=n.n(R),E=n("bc3a"),V=n.n(E),I=V.a.create({baseURL:"/",timeout:3e5});function L(t,e){return I.post(t,e).catch(function(t){return{}})}function M(t){return L("/api/shorten/",{url:t})}I.interceptors.request.use(function(t){return t}),I.interceptors.response.use(function(t){return t});var $={name:"home",data:function(){return{longUrl:"",isRequesting:!1,shortUrl:""}},components:{},methods:{onSubmit:function(){var t=Object(P["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.longUrl&&q.a.url(this.longUrl)){t.next=3;break}return this.emitToast("Please enter a URL."),t.abrupt("return");case 3:return this.isRequesting=!0,t.next=6,M(this.longUrl);case 6:if(e=t.sent,this.isRequesting=!1,n=e.data||{},0!==n.code){t.next=11;break}return t.abrupt("return",this.shortUrl=n.data.url);case 11:this.emitToast("There is something wrong, please try again later.");case 12:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),onUrlInvalid:function(t){this.emitToast("Please enter a URL.")},emitToast:function(t){this.$emit("showAlert",t)},onCopyClick:function(){var t=this;this.shortUrl&&(window.navigator.clipboard?window.navigator.clipboard.writeText(this.shortUrl).then(function(){t.emitToast("Copied.")}).catch(function(e){t.emitToast("There is something wrong, please copy the url manually.")}):this.emitToast("Your browser does not support clipboard api, please copy the url manually."))}}},B=$,F=Object(U["a"])(B,O,A,!1,null,null,null);F.options.__file="Home.vue";var N=F.exports;o["default"].use(S["a"]);var D=new S["a"]({mode:"history",base:"/sub/home/dist/",routes:[{path:"/",name:"home",component:N}]}),G=n("2f62");o["default"].use(G["a"]);var J=new G["a"].Store({state:{},mutations:{},actions:{}}),H=n("9483");Object(H["a"])("".concat("/sub/home/dist/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),o["default"].config.productionTip=!1,o["default"].use(i.a,{components:Object(r["a"])({VApp:c.a,VToolbar:u.a,VTextField:p.a,VBtn:h.a,VAlert:b.a,VSnackbar:g.a},w,x)}),new o["default"]({router:D,store:J,render:function(t){return t(j)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("2856"),o=n.n(r);o.a}});
//# sourceMappingURL=app-legacy.25f468bb.js.map
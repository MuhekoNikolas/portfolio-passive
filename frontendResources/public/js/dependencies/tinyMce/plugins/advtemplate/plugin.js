/*!
 * Tiny Advanced Template plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 1.2.0-31
 */

!function(){"use strict";const e=e=>parseInt(e,10),t=(e,t)=>{const a=e-t;return 0===a?0:a>0?1:-1},a=(e,t,a)=>({major:e,minor:t,patch:a}),n=t=>{const n=/([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);return n?a(e(n[1]),e(n[2]),e(n[3])):a(0,0,0)},r=e=>t=>(e=>{const t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&(a=n=e,(r=String).prototype.isPrototypeOf(a)||(null===(o=n.constructor)||void 0===o?void 0:o.name)===r.name)?"string":t;var a,n,r,o})(t)===e,o=e=>t=>typeof t===e,i=r("string"),l=r("object"),s=r("array"),c=o("boolean"),m=e=>null==e,d=e=>!m(e),p=o("function"),u=o("number"),g=()=>{},y=e=>()=>e,v=e=>e,h=e=>e(),_=y(!1),f=y(!0);class b{constructor(e,t){this.tag=e,this.value=t}static some(e){return new b(!0,e)}static none(){return b.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?b.some(e(this.value)):b.none()}bind(e){return this.tag?e(this.value):b.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:b.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw new Error(null!=e?e:"Called getOrDie on None")}static from(e){return d(e)?b.some(e):b.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}b.singletonNone=new b(!1);const w=Array.prototype.slice,x=Array.prototype.indexOf,C=Array.prototype.push,S=(e,t)=>{return a=e,n=t,x.call(a,n)>-1;var a,n},A=(e,t)=>{const a=e.length,n=new Array(a);for(let r=0;r<a;r++){const a=e[r];n[r]=t(a,r)}return n},E=(e,t)=>{for(let a=0,n=e.length;a<n;a++)if(t(e[a],a))return b.some(a);return b.none()},D=(e,t)=>(e=>{const t=[];for(let a=0,n=e.length;a<n;++a){if(!s(e[a]))throw new Error("Arr.flatten item "+a+" was not an array, input: "+e);C.apply(t,e[a])}return t})(A(e,t)),T=(e,t)=>{for(let a=0,n=e.length;a<n;++a)if(!0!==t(e[a],a))return!1;return!0},O=e=>((e,t)=>0<e.length?b.some(e[0]):b.none())(e);class P extends Error{constructor(e){super(e),this.name="AdvTemplateError"}}const M=e=>{const t=t=>t(e),a=y(e),n=()=>r,r={tag:!0,inner:e,fold:(t,a)=>a(e),isValue:f,isError:_,map:t=>I.value(t(e)),mapError:n,bind:t,exists:t,forall:t,getOr:a,or:n,getOrThunk:a,orThunk:n,getOrDie:a,each:t=>{t(e)},toOptional:()=>b.some(e)};return r},j=e=>{const t=()=>a,a={tag:!1,inner:e,fold:(t,a)=>t(e),isValue:_,isError:f,map:t,mapError:t=>I.error(t(e)),bind:t,exists:_,forall:f,getOr:v,or:v,getOrThunk:h,orThunk:h,getOrDie:(n=String(e),()=>{throw new Error(n)}),each:g,toOptional:b.none};var n;return a},I={value:M,error:j,fromOption:(e,t)=>e.fold((()=>j(t)),M)},N=Object.keys,k=Object.hasOwnProperty,$=(e,t)=>k.call(e,t),R=e=>$(e,"id")&&i(e.id)&&e.id.length>0,L=e=>$(e,"title")&&i(e.title)&&e.title.length>0,B=e=>$(e,"content")&&i(e.content)&&e.content.length>0,U=e=>l(e)&&R(e)&&L(e)&&$(e,"items")&&K(e.items),z=e=>l(e)&&R(e)&&L(e)&&(e=>!$(e,"items")||K(e.items))(e),K=e=>s(e)&&T(e,z),V=e=>$(e,"items")&&q(e.items),H=e=>l(e)&&L(e)&&((e=>B(e))(e)||V(e)),q=e=>s(e)&&T(e,H),F=(e,t)=>a=>e(a)?I.value(a):I.error(t),G=F((e=>l(e)&&(e=>{for(const t in e)if(k.call(e,t))return!1;return!0})(e)),"response should contain empty object"),W=F((e=>l(e)&&R(e)),"response should contain id"),Y=F((e=>l(e)&&R(e)&&L(e)&&B(e)),"response contains invalid template data"),J=e=>K(e)?(e=>{const t=e=>D(e,(e=>U(e)?[e.id,...t(e.items)]:[e.id])),a=t(e);return a.length===[...new Set(a)].length})(e)?I.value(e):I.error("response contains duplicated ids"):I.error("response contains invalid data"),Q=e=>t=>t.options.get(e),X=e=>{const t=(t,a)=>{var n,r;n=t,r=(e,t)=>(...n)=>((e,t,a)=>{return l(n=a)&&p(n.then)&&p(n.catch)?a.then((a=>t(a).fold((t=>Promise.reject(new P(`${e} ${t}`))),(e=>Promise.resolve(e))))):Promise.reject(new P(`${e} should return a Promise`));var n})(e,a,t(...n)),e.options.register(n,{processor:e=>p(e)?{valid:!0,value:r(n,e)}:{valid:!1,message:"Must be a function returning promise"},default:()=>Promise.reject(new P(`${n} option is not configured`))})};t("advtemplate_create_category",W),t("advtemplate_rename_category",G),t("advtemplate_move_category_items",G),t("advtemplate_delete_category",G),t("advtemplate_create_template",W),t("advtemplate_rename_template",G),t("advtemplate_update_template",G),t("advtemplate_move_template",G),t("advtemplate_get_template",Y),t("advtemplate_delete_template",G),t("advtemplate_delete_all",G),t("advtemplate_list",J),e.options.register("advtemplate_templates",{processor:q})},Z=Q("advtemplate_create_category"),ee=Q("advtemplate_rename_category"),te=Q("advtemplate_move_category_items"),ae=Q("advtemplate_delete_category"),ne=Q("advtemplate_create_template"),re=Q("advtemplate_rename_template"),oe=Q("advtemplate_move_template"),ie=Q("advtemplate_get_template"),le=Q("advtemplate_delete_template"),se=Q("advtemplate_list"),ce=Q("advtemplate_templates"),me=Q("content_style"),de=Q("body_class"),pe=Q("content_css_cors"),ue=(e,t)=>e?b.some(t):b.none(),ge={text:"Uncategorized",value:""},ye=(e,t)=>{const a=((e,a)=>{const n=[];for(let a=0,o=e.length;a<o;a++){const o=e[a];U(r=o)&&(!d(t)||r.id!==t)&&n.push(o)}var r;return n})(e);return[...t===ge.value?[]:[ge],...A(a,(({id:e,title:t})=>({text:t,value:e})))]},ve=(e,t)=>{return(a=t,n=t=>U(t)&&S(A(t.items,(({id:e})=>e)),e),((e,t,a)=>{for(let n=0,r=e.length;n<r;n++){const r=e[n];if(t(r,n))return b.some(r);if(a(r,n))break}return b.none()})(a,n,_)).map((e=>e.id)).getOr(ge.value);var a,n},he=e=>ue(e!==ge.value,e).getOrUndefined(),_e=(e,t,a)=>e.options.isSet(t)?[a]:[],fe=(e,t,a)=>{const n=e=>{const n=[..._e(a,"advtemplate_rename_category",{type:"menuitem",text:"Rename...",onAction:t.renameCategory(e)}),..._e(a,"advtemplate_move_category_items",{type:"menuitem",text:"Move all items...",enabled:e.items.length>0,onAction:t.moveCategoryItems(e.id)}),..._e(a,"advtemplate_delete_category",{type:"separator"}),..._e(a,"advtemplate_delete_category",{type:"menuitem",icon:"remove",text:"Delete all",onAction:t.deleteCategory(e.id)})];return n.length>0?{menu:{type:"menubutton",icon:"image-options",fetch:e=>e(n)}}:{}},r=e=>{const n=[..._e(a,"advtemplate_rename_template",{type:"menuitem",text:"Rename...",onAction:t.renameTemplate(e)}),..._e(a,"advtemplate_move_template",{type:"menuitem",text:"Move to...",onAction:t.moveTemplate(e.id)}),..._e(a,"advtemplate_delete_template",{type:"separator"}),..._e(a,"advtemplate_delete_template",{type:"menuitem",icon:"remove",text:"Delete",onAction:t.deleteTemplate(e.id)})];return n.length>0?{menu:{type:"menubutton",icon:"image-options",fetch:e=>e(n)}}:{}};return A(e,(e=>U(e)?(e=>({type:"directory",id:e.id,title:e.title,children:fe(e.items,t,a),...n(e)}))(e):(e=>({type:"leaf",id:e.id,title:e.title,...r(e)}))(e)))},be=e=>t=>{b.from(t.message).bind((e=>(console.error(e),ue(!(e=>e instanceof P)(t),e)))).or(b.some("Operation failed")).each(e.windowManager.alert)};"undefined"!=typeof window?window:Function("return this;")();const we=(e,t)=>((e,t,a)=>{const n=((e,t)=>{const a=((e,t)=>{const a=e.dom.getAttribute(t);return null===a?void 0:a})(e,t);return void 0===a||""===a?[]:a.split(" ")})(e,t);return((e,t,a)=>{((e,t,a)=>{if(!(i(a)||c(a)||u(a)))throw console.error("Invalid call to Attribute.set. Key ",t,":: Value ",a,":: Element ",e),new Error("Attribute value was not simple");e.setAttribute(t,a+"")})(e.dom,t,a)})(e,t,n.concat([a]).join(" ")),!0})(e,"class",t),xe=e=>{if(null==e)throw new Error("Node cannot be null or undefined");return{dom:e}},Ce=(e,t)=>{const a=(t||document).createElement(e);return xe(a)},Se=xe,Ae=(e=>{let t,a=!1;return(...n)=>(a||(a=!0,t=e.apply(null,n)),t)})((()=>{const e=tinymce.Env.os.isMacOS()||tinymce.Env.os.isiOS()?e=>e.metaKey:e=>e.ctrlKey&&!e.altKey;return`<script>(${(e=>{document.addEventListener("click",(t=>{for(let a=t.target;a;a=a.parentNode)"A"!==a.nodeName||e(t)||t.preventDefault()}),!1)}).toString()})(${e.toString()})<\/script>`})),Ee=(e,t)=>tinymce.html.Serializer({validate:!0},e.schema).serialize(e.parser.parse(t,{insert:!0})),De=e=>`<style type="text/css">${e}</style>`,Te=(e,t)=>b.from(e).filter((e=>e.length>0)).map(t).getOr(""),Oe=De(".mce-advtemplate-preview-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #b1aeae; font-family: sans-serif; }"),Pe=(e,t)=>{if(-1===t.indexOf("<html>")){const a=Te(me(e),De),n=pe(e)?' crossorigin="anonymous"':"",r=A(e.contentCSS,(t=>`<link type="text/css" rel="stylesheet" href="${e.documentBaseURI.toAbsolute(t)}"${n}>`)),o=e.dom.encode,i=`<base href="${o(e.documentBaseURI.getURI())}">`,l=Te(de(e),(e=>` class="${o(e)}"`)),s=Te(e.getBody().dir,(e=>` dir="${o(e)}"`));return["<!DOCTYPE html><html><head>",i,r.join(""),Oe,a,Ae(),`</head><body${l}${s}>`,Ee(e,t),"</body></html>"].join("")}return t},Me=e=>{const t=Ce("div");var a,n;return n="mce-advtemplate-preview-placeholder",(e=>void 0!==e.dom.classList)(a=t)?a.dom.classList.add(n):we(a,n),((e,t)=>{e.dom.textContent=t})(t,e.translate("Select template to preview")),Pe(e,(e=>{const t=Ce("div");return((e,t)=>{e.dom.appendChild(t.dom)})(t,Se(e.dom.cloneNode(!0))),(e=>e.dom.innerHTML)(t)})(t))},je=async e=>{let t=!1;const a=(()=>{const e=(e=>{const t=(e=>{let t=e;return{get:()=>t,set:e=>{t=e}}})(b.none()),a=()=>t.get().each(e);return{clear:()=>{a(),t.set(b.none())},isSet:()=>t.get().isSome(),get:()=>t.get(),set:e=>{a(),t.set(b.some(e))}}})(g);return{...e,on:t=>e.get().each(t)}})();let n=[];const r=n=>{ie(e)(n).then((r=>{m.setData({preview:Pe(e,r.content)}),a.set(n),t||(t=!0,m.setEnabled("submit",!0))}))},o=(e,t)=>{if(0===t.length)return e;{const a=t.toLowerCase(),n=((e,t)=>{const a=w.call(e,0);return a.sort(((e,t)=>e.index-t.index)),a})(D((e=>{const t=(e,a)=>((e,a,n)=>(((e,t)=>{for(let a=0,n=e.length;a<n;a++)t(e[a],a)})(e,((e,a)=>{var r,o;r=n,n="directory"===(o=e).type?[o,...t(o.children,r)]:[...r,o]})),n))(e,0,a);return t(e,[])})(e),(e=>{const t=e.title.toLowerCase().indexOf(a);return t>=0?[{item:e,index:t}]:[]})));return A(n,(({item:e})=>e))}},i=(l,c)=>({title:"Templates",size:"large",onChange:()=>{const e=m.getData();m.redial(i(l,e))},onAction:(t,a)=>{"addcategory"===a.name&&((e,t)=>{e.windowManager.open({title:"New category",body:{type:"panel",items:[{type:"input",name:"title",label:"Category name"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0,enabled:!1}],onChange:e=>{const t=e.getData();e.setEnabled("save",t.title.length>0)},onSubmit:a=>{const{title:n}=a.getData();Z(e)(n).then((async()=>{await t(),a.close()})).catch(be(e))}})})(e,s)},initialData:c,body:{type:"panel",classes:["tox-advtemplate"],items:[{type:"grid",columns:2,items:[{type:"panel",items:[{type:"input",name:"search",placeholder:"Search"},{type:"tree",items:o(l,c.search),onLeafAction:r,onToggleExpand:e=>{n=e},defaultExpandedIds:c.search.length>0?[]:n,...a.get().fold((()=>({})),(e=>({defaultSelectedId:e})))}]},{type:"iframe",name:"preview",sandboxed:!1,transparent:!1}]}]},buttons:[..._e(e,"advtemplate_create_category",{type:"custom",name:"addcategory",text:"New category",align:"start"}),{type:"cancel",name:"cancel",text:"Cancel"},{enabled:t,type:"submit",name:"submit",text:"Insert",primary:!0}],onSubmit:t=>{if(!a.isSet())return;const n=t.getData();e.insertContent(n.preview),t.close()}}),l=async t=>{const a=await se(e)();return fe(a,t,e)},s=async(t=!1)=>{const a=await l(c),n=m.getData();t&&(n.preview=Me(e)),m.redial(i(a,n))},c=((e,t,a)=>({renameCategory:t=>()=>((e,t,a)=>{e.windowManager.open({title:"Rename category",initialData:{title:a.title},body:{type:"panel",items:[{type:"input",name:"title",label:"Category name"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onChange:e=>{const t=e.getData();e.setEnabled("save",t.title.length>0)},onSubmit:n=>{const{title:r}=n.getData();ee(e)(a.id,r).then((async()=>{await t(),n.close()})).catch(be(e))}})})(e,a,t),renameTemplate:t=>()=>((e,t,a)=>{e.windowManager.open({title:"Rename template",initialData:{title:a.title},body:{type:"panel",items:[{type:"input",name:"title",label:"Template name"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onChange:e=>{const t=e.getData();e.setEnabled("save",t.title.length>0)},onSubmit:n=>{const{title:r}=n.getData();re(e)(a.id,r).then((async()=>{await t(),n.close()})).catch(be(e))}})})(e,a,t),moveTemplate:t=>()=>{(async(e,t,a)=>{const n=await se(e)();e.windowManager.open({title:"Move to",body:{type:"panel",items:[{type:"listbox",name:"category",label:"Category",items:ye(n,ve(a,n))}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:n=>{const{category:r}=n.getData();oe(e)(a,he(r)).then((async()=>{await t(),n.close()})).catch(be(e))}})})(e,a,t)},moveCategoryItems:t=>()=>{(async(e,t,a)=>{const n=await se(e)();e.windowManager.open({title:"Move all items",body:{type:"panel",items:[{type:"listbox",name:"category",label:"Category",items:ye(n,a)}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:n=>{const{category:r}=n.getData();te(e)(a,he(r)).then((async()=>{await t(),n.close()})).catch(be(e))}})})(e,a,t)},deleteTemplate:n=>()=>{e.windowManager.confirm("Are you sure you want to permanently delete the template?",(r=>{r&&le(e)(n).then((async()=>{t.get().exists((e=>e===n))?(t.clear(),await a(!0)):await a(!1)})).catch(be(e))}))},deleteCategory:t=>()=>{e.windowManager.confirm("Are you sure you want to permanently delete the category and all its content?",(n=>{n&&ae(e)(t).then((async()=>{await a()})).catch(be(e))}))}}))(e,a,s),m=e.windowManager.open(i(await l(c),{preview:Me(e),search:""}))},Ie=(e,t)=>e.execCommand(t),Ne=(ke=/^\s+|\s+$/g,e=>e.replace(ke,""));var ke;tinymce.PluginManager.requireLangPack("advtemplate","ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),tinymce.PluginManager.add("advtemplate",(e=>{((e,a)=>!!e&&-1===((e,a)=>{const n=t(e.major,a.major);if(0!==n)return n;const r=t(e.minor,a.minor);if(0!==r)return r;const o=t(e.patch,a.patch);return 0!==o?o:0})((e=>n((e=>[e.majorVersion,e.minorVersion].join(".").split(".").slice(0,3).join("."))(e)))(e),n(a)))(tinymce,"6.5.0")?console.error("The advtemplate plugin requires at least version 6.5.0 of TinyMCE."):(X(e),(e=>{b.from(ce(e)).each((t=>{const a=((e=[])=>{let t=[],a={},n={},r=0;const o=()=>(++r).toString(),l=e=>b.from(n[e]).getOrDie("Category not found"),s=e=>m(e)?t:l(e).items,c=(e,t)=>{if(!(i(t)&&(a=Ne(t),a.length>0)))throw new Error("Invalid title");var a;if(((e,a)=>{for(let a=0,n=e.length;a<n;a++)if(e[a].title===t)return!0;return!1})(e))throw new Error("The name already exists")},d=e=>b.from(a[e]).getOrDie("Template not found"),p=e=>{c(t,e);const a=o(),r={id:a,title:e,items:[]};return t.push(r),n[a]=r,{...r}},u=(e,t,n)=>{const r=s(n);c(r,e);const i=o(),l={id:i,title:e,content:t};return r.push(l),a[i]=[l,n],{...l}},g=(e,t)=>{const a=s(t);E(a,(t=>t.id===e)).each((e=>a.splice(e,1)))},y=async(e,t)=>{const[n,r]=d(e);return s(t).push(n),g(e,r),a[e]=[n,t],Promise.resolve({})},v=(e,t)=>{for(const a of e)if(V(a)){const e=p(a.title);v(a.items,e.id)}else u(a.title,a.content,t)};return v(e),{advtemplate_create_category:async e=>{const{id:t}=p(e);return Promise.resolve({id:t})},advtemplate_rename_category:async(e,a)=>{const n=l(e);return n.title===a||(c(t,a),n.title=a),Promise.resolve({})},advtemplate_delete_category:async e=>(((t,a)=>{for(let a=t.length-1;a>=0;a--)n=t[a],g(n.id,e);var n})(l(e).items),E(t,(t=>t.id===e)).each((e=>t.splice(e,1))),delete n[e],Promise.resolve({})),advtemplate_create_template:async(e,t,a)=>{const{id:n}=u(e,t,a);return Promise.resolve({id:n})},advtemplate_rename_template:async(e,t)=>{const[a,n]=d(e);if(a.title===t)return Promise.resolve({});const r=s(n);return c(r,t),a.title=t,Promise.resolve({})},advtemplate_update_template:async(e,t)=>{const[a]=d(e);return a.content=t,Promise.resolve({})},advtemplate_move_template:y,advtemplate_get_template:async e=>{const[t]=d(e);return Promise.resolve({...t})},advtemplate_delete_template:async e=>{const[,t]=d(e);return g(e,t),delete a[e],Promise.resolve({})},advtemplate_list:async(e=!1)=>{if(e)return Promise.resolve([...t]);{const e=A(t,(e=>U(e)?{id:e.id,title:e.title,items:A(e.items,(({id:e,title:t})=>({id:e,title:t})))}:{id:e.id,title:e.title}));return Promise.resolve(e)}},advtemplate_delete_all:async()=>(t=[],a={},n={},Promise.resolve({})),advtemplate_move_category_items:async(e,t)=>{const a=s(e);for(let e=O(a);e.isSome();e=O(a))await y(e.getOrDie().id,t);return Promise.resolve({})}}})(t);((t,a)=>{const n=N(t);for(let a=0,i=n.length;a<i;a++){const i=n[a];r=t[i],S(["advtemplate_list","advtemplate_get_template"],o=i)?e.options.set(o,r):e.options.unset(o)}var r,o})(a)}))})(e),(e=>{const t=(t,a)=>{e.addCommand(t,a)};t("AdvTemplateInsertDialog",(()=>{je(e)})),e.options.isSet("advtemplate_create_template")&&t("AdvTemplateAddDialog",(()=>{(async e=>{const t=await se(e)();e.windowManager.open({title:"New template",body:{type:"panel",items:[{type:"input",name:"title",label:"Template name"},{type:"listbox",name:"category",label:"Category",items:ye(t)}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0,enabled:!1}],onChange:e=>{const t=e.getData();e.setEnabled("save",t.title.length>0)},onSubmit:t=>{const{title:a,category:n}=t.getData();ne(e)(a,e.selection.getContent(),he(n)).then((()=>{t.close(),e.notificationManager.open({text:"Template successfully saved",type:"success",timeout:2e3})})).catch(be(e))}})})(e)}))})(e),(e=>{e.options.isSet("advtemplate_create_template")&&e.ui.registry.addButton("addtemplate",{tooltip:"Save as template",icon:"template-add",onAction:()=>{Ie(e,"AdvTemplateAddDialog")},onSetup:t=>{t.setEnabled(!1);const a=()=>{t.setEnabled(!e.selection.isCollapsed())};return e.on("NodeChange SelectionChange",a),()=>{e.off("NodeChange SelectionChange",a)}}}),e.ui.registry.addButton("inserttemplate",{tooltip:"Insert template",icon:"template",onSetup:t=>{const a=()=>{t.setEnabled(e.selection.isEditable())};return e.on("NodeChange",a),a(),()=>{e.off("NodeChange",a)}},onAction:()=>{Ie(e,"AdvTemplateInsertDialog")}})})(e),(e=>{e.ui.registry.addMenuItem("inserttemplate",{text:"Template...",icon:"template",onSetup:t=>(t.setEnabled(e.selection.isEditable()),g),onAction:()=>Ie(e,"AdvTemplateInsertDialog")}),e.options.isSet("advtemplate_create_template")&&e.ui.registry.addMenuItem("addtemplate",{text:"Save as template...",icon:"template-add",onAction:()=>e.execCommand("AdvTemplateAddDialog"),onSetup:t=>(t.setEnabled(!e.selection.isCollapsed()),g)}),e.ui.registry.addContextMenu("advtemplate",{update:y("addtemplate")})})(e))}))}();
/*!
 * Tiny Advanced Code Editor plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 3.3.0-95
 */

!function(){"use strict";const e=e=>parseInt(e,10),t=(e,t)=>{const o=e-t;return 0===o?0:o>0?1:-1},o=(e,t,o)=>({major:e,minor:t,patch:o}),n=t=>{const n=/([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);return n?o(e(n[1]),e(n[2]),e(n[3])):o(0,0,0)},r=e=>t=>typeof t===e,s=e=>"string"===(e=>{const t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&(o=n=e,(r=String).prototype.isPrototypeOf(o)||(null===(s=n.constructor)||void 0===s?void 0:s.name)===r.name)?"string":t;var o,n,r,s})(e),i=r("boolean"),c=e=>!(e=>null==e)(e),a=r("function"),d=r("number");class l{constructor(e,t){this.tag=e,this.value=t}static some(e){return new l(!0,e)}static none(){return l.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?l.some(e(this.value)):l.none()}bind(e){return this.tag?e(this.value):l.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:l.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw new Error(null!=e?e:"Called getOrDie on None")}static from(e){return c(e)?l.some(e):l.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}l.singletonNone=new l(!1);let u=0;const m=e=>{const t=(new Date).getTime(),o=Math.floor(1e9*Math.random());return u++,e+"_"+o+u+String(t)},g=e=>t=>t.options.get(e),p=g("codemirror_script"),h=g("codemirror_css"),v=g("codemirror_linewrapping"),f=g("codemirror_linenumbers"),y=g("codemirror_foldgutter"),b=g("codemirror_gutter"),w=g("codemirror_theme"),C=e=>"rtl"===e.getBody().dir?"rtl":"ltr",S=g("advcode_headless"),_=g("advcode_inline"),k=(e,t,o)=>({customEditorScriptUrl:t+"/customeditor.min.js",codeMirrorScriptUrl:p(e),codeMirrorCssUrl:h(e),lineWrapping:v(e),lineNumbers:f(e),foldGutter:y(e),theme:w(e),direction:C(e),gutter:b(e),editorId:e.id,advcodeInstanceId:m("advcode_instance"),currentAdvStatus:o}),x=()=>{},z=()=>!1,I=(e,t)=>{for(let o=0,n=e.length;o<n;o++)if(t(e[o],o))return!0;return!1},T=Object.hasOwnProperty,A=(e,t)=>T.call(e,t);"undefined"!=typeof window?window:Function("return this;")();const E=e=>t=>(e=>e.dom.nodeType)(t)===e,M=E(1),N=E(3),O=E(9),L=E(11),D=e=>{if(null==e)throw new Error("Node cannot be null or undefined");return{dom:e}},P=(e,t)=>{const o=(t||document).createElement("div");if(o.innerHTML=e,!o.hasChildNodes()||o.childNodes.length>1){const t="HTML does not have a single root node";throw console.error(t,e),new Error(t)}return D(o.childNodes[0])},V=(e,t)=>{const o=(t||document).createElement(e);return D(o)},F=D,j=e=>O(e)?e:F(e.dom.ownerDocument),B=(e,t)=>{e.dom.appendChild(t.dom)},R=e=>L(e)&&c(e.dom.host),$=a(Element.prototype.attachShadow)&&a(Node.prototype.getRootNode)?e=>F(e.dom.getRootNode()):j,W=e=>F(e.dom.host),U=e=>{const t=N(e)?e.dom.parentNode:e.dom;if(null==t||null===t.ownerDocument)return!1;const o=t.ownerDocument;return(e=>{const t=$(e);return R(t)?l.some(t):l.none()})(F(t)).fold((()=>o.body.contains(t)),(n=U,r=W,e=>n(r(e))));var n,r},G=()=>H(F(document)),H=e=>{const t=e.dom.body;if(null==t)throw new Error("Body is not available yet");return F(t)},q=(e,t,o)=>{let n=e.dom;const r=a(o)?o:z;for(;n.parentNode;){n=n.parentNode;const e=F(n);if(t(e))return l.some(e);if(r(e))break}return l.none()},K=e=>{const t=e.dom;null!==t.parentNode&&t.parentNode.removeChild(t)},Q="\x3c!--mce_cursor--\x3e",J=(e,t)=>{const o=e.dom,n=e.selection,r=n.getBookmark(),s=(e=>A(e,"name"))(r)?o.select(r.name)[r.index]:o.select(`#${r.id}_start`)[0],i=l.from(s).map((t=>{const o=F(e.getBody());return((e,t)=>{const n=P(Q),r=F(e),s=((e,t,o)=>((e,t,o,n,r)=>n(o)?l.some(o):a(r)&&r(o)?l.none():t(o,n,r))(0,q,e,t,o))(r,(e=>((e,t)=>{const o=e.dom;return!(!o||!o.hasAttribute)&&o.hasAttribute("data-mce-bogus")})(e)),(e=>{return t=o,e.dom===t.dom;var t})).getOr(r);return((e,t)=>{const o=(e=>l.from(e.dom.parentNode).map(F))(e);o.each((o=>{o.dom.insertBefore(t.dom,e.dom)}))})(s,n),n})(t)})),c=t();return i.each(K),n.moveToBookmark(r),c},X=e=>{const t=(e=>{const t=e.split(/\r?\n/);return((e,t)=>{for(let o=0;o<e.length;o++){const n=t(e[o],o);if(n.isSome())return n}return l.none()})(t,((e,o)=>{const n=e.indexOf(Q);return(r=-1!==n,s=n,r?l.some(s):l.none()).map((n=>e===Q?0===o?{line:o,ch:0}:{line:o-1,ch:t[o-1].length}:{line:o,ch:n}));var r,s})).getOr({line:0,ch:0})})(J(e,(()=>e.getContent({source_view:!0}))));return{content:e.getContent({source_view:!0}),cursor:t}},Y=e=>{let t=e;return{get:()=>t,set:e=>{t=e}}},Z=()=>{const e=(e=>{const t=Y(l.none()),o=()=>t.get().each(e);return{clear:()=>{o(),t.set(l.none())},isSet:()=>t.get().isSome(),get:()=>t.get(),set:e=>{o(),t.set(l.some(e))}}})(x);return{...e,on:t=>e.get().each(t)}},ee=(e,t)=>{e.focus(),e.undoManager.transact((()=>{e.setContent(t)})),e.selection.setCursorLocation(),e.nodeChanged()},te=e=>{return(t=tinymce,"get",A(t,"get")?l.from(t.get):l.none()).bind((t=>l.from(t.call(tinymce,e))));var t},oe=(e,t)=>te(e).bind((e=>l.from(e.plugins.advcode))).map((e=>(e[t]||(e[t]=Z()),e[t]))),ne=(e,t)=>{te(e).bind((e=>l.from(e.plugins.advcode))).each((e=>{e[t]&&delete e[t]}))},re=(e,t)=>((e,t,o)=>{const n=((e,t)=>{const o=((e,t)=>{const o=e.dom.getAttribute(t);return null===o?void 0:o})(e,t);return void 0===o||""===o?[]:o.split(" ")})(e,t);return((e,t,o)=>{((e,t,o)=>{if(!(s(o)||i(o)||d(o)))throw console.error("Invalid call to Attribute.set. Key ",t,":: Value ",o,":: Element ",e),new Error("Attribute value was not simple");e.setAttribute(t,o+"")})(e.dom,t,o)})(e,t,n.concat([o]).join(" ")),!0})(e,"class",t),se={unsupportedLength:["em","ex","cap","ch","ic","rem","lh","rlh","vw","vh","vi","vb","vmin","vmax","cm","mm","Q","in","pc","pt","px"],fixed:["px","pt"],relative:["%"],empty:[""]},ie=(()=>{const e="[0-9]+",t="[eE][+-]?"+e,o=e=>`(?:${e})?`,n=["Infinity",e+"\\."+o(e)+o(t),"\\."+e+o(t),e+o(t)].join("|");return new RegExp(`^([+-]?(?:${n}))(.*)$`)})(),ce=(e,t,o,n="",r)=>{const s=(e=>{const t=te(e).map((e=>{const t=$(F(e.getElement()));return R(o=t)?o:F(j(o).dom.body);var o})).getOrThunk(G);if(M(t))return{element:t,destroy:x};{const e=V("div");return B(t,e),{element:e,destroy:()=>K(e)}}})(o.editorId),i=((e,t)=>{const o=(o,n)=>(n&&!n()||setTimeout((()=>{o.state.completionActive||o.showHint({completeSingle:!1,container:t})}),100),e.Pass);return{completeAfter:o,completeIfAfterLt:t=>o(t,(()=>{const o=t.getCursor();return"<"===t.getRange(e.Pos(o.line,o.ch-1),o)})),completeIfInTag:t=>o(t,(()=>{const o=t.getTokenAt(t.getCursor());return!!("string"!==o.type||/['"]/.test(o.string.charAt(o.string.length-1))&&1!==o.string.length)&&e.innerMode(t.getMode(),o.state).state.tagName}))}})(e,s.element.dom),c="dracula",d={lineWrapping:o.lineWrapping,lineNumbers:o.lineNumbers,foldGutter:o.foldGutter,theme:r.dark?c:o.theme,direction:o.direction,matchTags:{bothTags:!0},keyMap:"sublime",gutters:o.gutter?["CodeMirror-linenumbers","CodeMirror-foldgutter"]:[],extraKeys:{"Alt-F":"findPersistent","Ctrl-J":"toMatchingTag","Ctrl-B":"selectNextOccurrence","'<'":i.completeAfter,"'/'":i.completeIfAfterLt,"' '":i.completeIfInTag,"'='":i.completeIfInTag,"Ctrl-Q":e=>{e.foldCode(e.getCursor())}},mode:"text/html",value:n},u=e(t,d),m=e=>{27!==e.keyCode&&e.stopPropagation()};t.addEventListener("keyup",m),t.addEventListener("keydown",m),t.addEventListener("keypress",m),setTimeout((()=>{u.focus(),o.cursor&&u.doc.setCursor(o.cursor)}),0),setTimeout((()=>u.refresh()),200);const g=e=>{const t=u.getWrapperElement();e.fold((()=>{var e,o;t.classList.remove("inherit-font-size"),null===(o=null===(e=t.parentElement)||void 0===e?void 0:e.style)||void 0===o||o.removeProperty("font-size")}),(e=>{var o,n;t.classList.add("inherit-font-size"),null===(n=null===(o=t.parentElement)||void 0===o?void 0:o.style)||void 0===n||n.setProperty("font-size",e)})),u.refresh()},p={getValue:()=>u.doc.getValue(),setValue:e=>u.doc.setValue(e),setDarkMode:e=>{e?u.setOption("theme",c):u.setOption("theme",o.theme)},copyCode:()=>new Promise(((e,t)=>window.isSecureContext?e(navigator.clipboard.writeText(u.getValue())):t("context is not secure"))),setFontSize:g,changeFontSize:e=>{const t=u.getWrapperElement(),o=(d=F(t),m=".CodeMirror-scroll",((e,t)=>{const o=void 0===t?document:t.dom;return 1!==(n=o).nodeType&&9!==n.nodeType&&11!==n.nodeType||0===n.childElementCount?l.none():l.from(o.querySelector(e)).map(F);var n})(m,d)).map((e=>((e,t)=>{const o=e.dom,n=window.getComputedStyle(o).getPropertyValue(t);return""!==n||U(e)?n:((e,t)=>(e=>void 0!==e.style&&a(e.style.getPropertyValue))(e)?e.style.getPropertyValue(t):"")(o,t)})(e,"font-size"))).getOr("0px"),n=(i=o,c=["unsupportedLength"],l.from(ie.exec(i)).bind((e=>{const t=Number(e[1]),o=e[2];return((e,t)=>I(t,(t=>I(se[t],(t=>e===t)))))(o,c)?l.some({value:t,unit:o}):l.none()}))),r=n.map((e=>e.value)).getOr(0),s=n.map((e=>e.unit)).getOr("");var i,c,d,m;let p=l.none();return"increase"===e&&(p=l.some(`${r+1}${s}`)),"decrease"===e&&(p=l.some(`${r>5?r-1:r}${s}`)),g(p),p},destroy:()=>{t.removeEventListener("keyup",m),t.removeEventListener("keydown",m),t.removeEventListener("keypress",m),ne(o.editorId,o.advcodeInstanceId),s.destroy()}};return p},ae={},de=(e,t)=>{if(ae[t])return Promise.resolve();{const r=te(t),s=r.bind((e=>{var t;return l.from(null===(t=e.ui)||void 0===t?void 0:t.styleSheetLoader)})).getOr(tinymce.DOM.styleSheetLoader);return r.each((o=>{o.on("remove",(()=>{s.unload(e),delete ae[t]}))})),ae[t]=!0,o=e,(null!=(n=s)?n:tinymce.DOM.styleSheetLoader).load(o)}var o,n},le=e=>({name:"codeview",type:"customeditor",tag:"div",scriptId:"tinymce.plugins.advcode.customeditor",scriptUrl:e.customEditorScriptUrl,settings:e}),ue=(e,t)=>{const o={dark:!1,fullscreen:!1,fontSize:l.none()};e.addCommand("mceCodeEditor",(()=>{_(e)&&!e.inline?"code"===e.mode.get()?e.mode.set("design"):e.mode.set("code"):(()=>{const n=k(e,t,o);((e,t)=>{const o=X(e),n={...t,cursor:o.cursor},r=t.currentAdvStatus,s=oe(t.editorId,t.advcodeInstanceId),i=()=>{let e=[{type:"togglebutton",name:"dark_theme_toggle",text:"Dark/light mode",tooltip:"Dark/light mode",active:r.dark,align:"start"},{type:"custom",name:"increase_font_size",text:"Increase font size",icon:"text-size-increase",align:"start"},{type:"custom",name:"decrease_font_size",text:"Decrease font size",icon:"text-size-decrease",align:"start"},{type:"cancel",name:"cancel",text:"Cancel",align:"end"},{type:"submit",name:"save",text:"Save",primary:!0,align:"end"}];return window.isSecureContext?e=[{type:"custom",name:"copy_code",text:"Copy code",align:"start"}].concat(e):console.warn("Copy code is not allowed since window.isSecureContext is false"),e},c=()=>({title:"Source Code",size:"large",body:{type:"panel",items:[le(n)]},buttons:i(),initialData:{codeview:o.content},onSubmit:o=>{ee(e,o.getData().codeview),ne(t.editorId,t.advcodeInstanceId),o.close()},onClose:()=>{ne(t.editorId,t.advcodeInstanceId)},onAction:(e,t)=>{"copy_code"===t.name&&s.each((t=>t.get().each((t=>{(async()=>{const o=setTimeout((()=>{e.block("copying")}),150);await t.copyCode(),clearTimeout(o),e.unblock()})()})))),"increase_font_size"===t.name&&s.each((e=>e.get().each((e=>{r.fontSize=e.changeFontSize("increase")})))),"decrease_font_size"===t.name&&s.each((e=>e.get().each((e=>{r.fontSize=e.changeFontSize("decrease")})))),"dark_theme_toggle"===t.name&&s.each((t=>t.get().each((t=>{t.setDarkMode(!r.dark),r.dark=!r.dark,e.redial(c())}))))}});e.windowManager.open(c())})(e,n)})()}))},me=e=>e.plugins.fullscreen&&e.plugins.fullscreen.isFullscreen(),ge=(e,t,o)=>{const n=Y({dark:!1,fullscreen:!1,fontSize:l.none()}),r=Y(me(e)),s=Z(),i=Y(l.none()),c={dark:!1,fullscreen:!1,fontSize:l.none()},a=()=>i.get().bind((t=>oe(e.id,t))),d=()=>{s.get().each((({destroy:t})=>{t(),n.get().fullscreen!==r.get()&&e.execCommand("mceFullScreen")})),s.clear()};e.ui.registry.addView("code",{buttons:1===o?[{type:"group",buttons:[...e.hasPlugin("fullscreen")?[{type:"togglebutton",icon:"fullscreen",tooltip:"Fullsceen",onAction:t=>{e.execCommand("mceFullScreen",void 0,void 0,{skip_focus:!0});const o=!t.isActive();n.set({...n.get(),fullscreen:o}),t.setActive(o)}}]:[],{type:"togglebutton",icon:"copy",text:"Copy code",onAction:e=>a().each((e=>e.get().each((e=>{(async()=>{await e.copyCode()})()}))))}]},{type:"group",buttons:[{type:"togglebutton",text:"Dark/light mode",tooltip:"Dark/light mode",onAction:e=>{a().each((t=>t.get().each((t=>{n.set({...n.get(),dark:!e.isActive()}),e.setActive(n.get().dark),t.setDarkMode(n.get().dark)}))))}},{type:"togglebutton",icon:"text-size-increase",tooltip:"Increase font size",onAction:e=>a().each((e=>e.get().each((e=>n.set({...n.get(),fontSize:e.changeFontSize("increase")})))))},{type:"togglebutton",icon:"text-size-decrease",tooltip:"Decrease font size",onAction:e=>a().each((e=>e.get().each((e=>n.set({...n.get(),fontSize:e.changeFontSize("decrease")})))))}]},{type:"group",buttons:[{type:"button",text:"Cancel",onAction:()=>{s.get().each((()=>{d(),e.mode.set("design")}))}},{type:"button",text:"Save code",buttonType:"primary",onAction:()=>{s.get().each((({syncWithEditor:t})=>{t(),d(),e.mode.set("design")}))}}]}]:[],onShow:a=>{const d=a.getContainer(),u=k(e,t,c);i.set(l.some(u.advcodeInstanceId)),r.set(me(e)),e.setProgressState(!0),n.get().fullscreen!==me(e)&&e.execCommand("mceFullScreen"),((e,t,o,n)=>{return Promise.all([de(t,o),("tinymce.plugins.advcode.CodeMirror",r=e,tinymce.Resource.load("tinymce.plugins.advcode.CodeMirror",r))]).then((([e,t])=>(e,o,r)=>ce(t(),e,o,r,n)));var r})(p(e),h(e),e.id,n.get()).then((t=>{e.setProgressState(!1),s.set(((e,t,o,n,r,s)=>{const i=X(o),c={...r,cursor:i.cursor},a=V("div");var d;d=a,((e,t)=>{for(let t=0,n=e.length;t<n;t++)o=e[t],((e,t)=>{(e=>void 0!==e.dom.classList)(e)?e.dom.classList.add(t):re(e,t)})(d,o);var o})(0===t?["tox-inline-headless-codemirror","mce-codemirror"]:["tox-custom-editor","tox-inline-codemirror","mce-codemirror"]),B(F(e),a);const{getValue:l,destroy:u,copyCode:m,changeFontSize:g,setDarkMode:p,setFontSize:h}=n(a.dom,c,i.content,s);oe(r.editorId,r.advcodeInstanceId).each((e=>e.set({copyCode:m,changeFontSize:g,setDarkMode:p,setFontSize:h}))),h(s.fontSize);const v=()=>ee(o,l());return 0===t&&o.on("BeforeGetContent",v),{syncWithEditor:v,destroy:()=>{0===t&&(o.off("BeforeGetContent",v),v()),K(a),u()}}})(d,o,e,t,u,n.get()))}))},onHide:d})};tinymce.PluginManager.requireLangPack("advcode","ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),tinymce.PluginManager.add("advcode",((e,o)=>{((e,o)=>!!e&&-1===((e,o)=>{const n=t(e.major,o.major);if(0!==n)return n;const r=t(e.minor,o.minor);if(0!==r)return r;const s=t(e.patch,o.patch);return 0!==s?s:0})((e=>n((e=>[e.majorVersion,e.minorVersion].join(".").split(".").slice(0,3).join("."))(e)))(e),n(o)))(tinymce,"6.3.0")?console.error("The advcode plugin requires at least version 6.3.0 of TinyMCE."):((e,t)=>{((e,t)=>{const o=e.options.register;o("codemirror_script",{processor:"string",default:t+"/codemirror.min.js"}),o("codemirror_css",{processor:"string",default:t+"/codemirror.min.css"}),o("codemirror_linewrapping",{processor:"boolean",default:!0}),o("codemirror_linenumbers",{processor:"boolean",default:!0}),o("codemirror_foldgutter",{processor:"boolean",default:!0}),o("codemirror_gutter",{processor:"boolean",default:!0}),o("codemirror_theme",{processor:"string",default:"default"}),o("advcode_headless",{processor:"boolean",default:!1}),o("advcode_inline",{processor:"boolean",default:!1})})(e,t),ue(e,t),(e=>{const t="sourcecode",o=()=>e.execCommand("mceCodeEditor");e.ui.registry.addButton("code",{icon:t,tooltip:"Source code",onAction:o}),e.ui.registry.addMenuItem("code",{icon:t,text:"Source code",onAction:o})})(e),((e,t)=>{ge(e,t,S(e)?0:1)})(e,t),(e=>{e.mode.register("code",{activate:()=>{"code"!==e.queryCommandValue("ToggleView")&&e.execCommand("ToggleView",!1,"code")},deactivate:()=>{"code"===e.queryCommandValue("ToggleView")&&e.execCommand("ToggleView",!1,"code")},editorReadOnly:!1})})(e)})(e,o)}))}();
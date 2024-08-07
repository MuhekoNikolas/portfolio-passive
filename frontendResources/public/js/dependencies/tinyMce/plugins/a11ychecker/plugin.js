/* !
 * Tiny Accessibility Checker Plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 3.2.0-67
 */

!function() {
    "use strict";
    const e = e=>{
            let t = e;
            return {
                    get: ()=>t,
                    set: e=>{
                            t = e
                    }
            }
    }
      , t = e=>t=>(e=>{
            const t = typeof e;
            return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (r = o = e,
            (a = String).prototype.isPrototypeOf(r) || (null === (n = o.constructor) || void 0 === n ? void 0 : n.name) === a.name) ? "string" : t;
            var r, o, a, n
    }
    )(t) === e
      , r = e=>t=>typeof t === e
      , o = t("string")
      , a = t("object")
      , n = t("array")
      , i = r("boolean")
      , s = (void 0,
    e=>undefined === e);
    const l = e=>!(e=>null == e)(e)
      , c = r("function")
      , u = r("number")
      , d = ()=>{}
      , p = e=>()=>e
      , h = e=>e
      , m = (e,t)=>e === t
      , y = e=>e()
      , g = p(!1)
      , v = p(!0);
    class w {
            constructor(e, t) {
                    this.tag = e,
                    this.value = t
            }
            static some(e) {
                    return new w(!0,e)
            }
            static none() {
                    return w.singletonNone
            }
            fold(e, t) {
                    return this.tag ? t(this.value) : e()
            }
            isSome() {
                    return this.tag
            }
            isNone() {
                    return !this.tag
            }
            map(e) {
                    return this.tag ? w.some(e(this.value)) : w.none()
            }
            bind(e) {
                    return this.tag ? e(this.value) : w.none()
            }
            exists(e) {
                    return this.tag && e(this.value)
            }
            forall(e) {
                    return !this.tag || e(this.value)
            }
            filter(e) {
                    return !this.tag || e(this.value) ? this : w.none()
            }
            getOr(e) {
                    return this.tag ? this.value : e
            }
            or(e) {
                    return this.tag ? this : e
            }
            getOrThunk(e) {
                    return this.tag ? this.value : e()
            }
            orThunk(e) {
                    return this.tag ? this : e()
            }
            getOrDie(e) {
                    if (this.tag)
                            return this.value;
                    throw new Error(null != e ? e : "Called getOrDie on None")
            }
            static from(e) {
                    return l(e) ? w.some(e) : w.none()
            }
            getOrNull() {
                    return this.tag ? this.value : null
            }
            getOrUndefined() {
                    return this.value
            }
            each(e) {
                    this.tag && e(this.value)
            }
            toArray() {
                    return this.tag ? [this.value] : []
            }
            toString() {
                    return this.tag ? `some(${this.value})` : "none()"
            }
    }
    w.singletonNone = new w(!1);
    const b = e=>parseInt(e, 10)
      , f = (e,t)=>{
            const r = e - t;
            return 0 === r ? 0 : r > 0 ? 1 : -1
    }
      , k = (e,t,r)=>({
            major: e,
            minor: t,
            patch: r
    })
      , x = e=>{
            const t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
            return t ? k(b(t[1]), b(t[2]), b(t[3])) : k(0, 0, 0)
    }
      , A = Array.prototype.slice
      , C = Array.prototype.indexOf
      , T = Array.prototype.push
      , D = (e,t)=>((e,t)=>C.call(e, t))(e, t) > -1
      , I = (e,t)=>{
            for (let r = 0, o = e.length; r < o; r++)
                    if (t(e[r], r))
                            return !0;
            return !1
    }
      , _ = (e,t)=>{
            const r = e.length
              , o = new Array(r);
            for (let a = 0; a < r; a++) {
                    const r = e[a];
                    o[a] = t(r, a)
            }
            return o
    }
      , N = (e,t)=>{
            for (let r = 0, o = e.length; r < o; r++)
                    t(e[r], r)
    }
      , S = (e,t)=>{
            const r = [];
            for (let o = 0, a = e.length; o < a; o++) {
                    const a = e[o];
                    t(a, o) && r.push(a)
            }
            return r
    }
      , M = (e,t,r)=>(N(e, ((e,o)=>{
            r = t(r, e, o)
    }
    )),
    r)
      , O = (e,t,r)=>{
            for (let o = 0, a = e.length; o < a; o++) {
                    const a = e[o];
                    if (t(a, o))
                            return w.some(a);
                    if (r(a, o))
                            break
            }
            return w.none()
    }
      , E = (e,t)=>O(e, t, g)
      , R = (e,t)=>(e=>{
            const t = [];
            for (let r = 0, o = e.length; r < o; ++r) {
                    if (!n(e[r]))
                            throw new Error("Arr.flatten item " + r + " was not an array, input: " + e);
                    T.apply(t, e[r])
            }
            return t
    }
    )(_(e, t))
      , W = e=>{
            const t = A.call(e, 0);
            return t.reverse(),
            t
    }
      , H = p("html4")
      , q = p("html5")
      , $ = p("a")
      , G = p("aa")
      , P = p("aaa")
      , L = e=>t=>t.options.get(e)
      , j = L("a11ychecker_css_url")
      , B = L("a11ychecker_level")
      , V = L("a11ychecker_html_version")
      , F = L("a11ychecker_issue_url_callback")
      , z = L("a11ychecker_filter_issue")
      , U = e=>{
            var t;
            return null !== (t = e.options.get("a11ychecker_allow_decorative_images")) && void 0 !== t ? t : e.options.get("a11y_advanced_options")
    }
      , K = tinymce.util.I18n
      , J = {
            "a11y.d1.description": "This paragraph looks like a heading. If it is a heading, please select a heading level.",
            "a11y.d1.repair.block.h1": "Heading 1",
            "a11y.d1.repair.block.h2": "Heading 2",
            "a11y.d1.repair.block.h3": "Heading 3",
            "a11y.d1.repair.block.h4": "Heading 4",
            "a11y.d1.repair.block.h5": "Heading 5",
            "a11y.d1.repair.block.h6": "Heading 6",
            "a11y.d1.repair.info": "Select a heading level:",
            "a11y.d2.description": "Headings must be applied in sequential order. For example: Heading 1 should be followed by Heading 2, not Heading 3.",
            "a11y.d3.description": "Adjacent links with the same URL should be merged into one link",
            "a11y.d4.description": "The selected text appears to be a list. Lists should be formatted using a list tag.",
            "a11y.d5a.description": "Large text must have a contrast ratio of at least 3:1",
            "a11y.d5b.description": "Text must have a contrast ratio of at least 4.5:1",
            "a11y.d5c.description": "Text must have a contrast ratio of at least 7:1",
            "a11y.h93.description": "ID attribute must be unique",
            "a11y.h93.repair.info": "Make ID unique",
            "a11y.h93.repair.deduplicate.others": "Keep this ID and remove all others",
            "a11y.h93.repair.deduplicate.this": "Remove this ID",
            "a11y.h93.repair.deduplicate.all": "Remove all IDs",
            "a11y.i1.description.decorativeAllowed": "Images must be marked as decorative or have an alternative text description",
            "a11y.i1.description.decorativeNotAllowed": "Images must have an alternative text description. Decorative images are not allowed.",
            "a11y.i1.repair.errors.duplicate": "Alternative text cannot be the same as the filename",
            "a11y.i1.repair.errors.empty": "Alternative text cannot be empty",
            "a11y.i1.repair.info.decorativeAllowed": "Or provide alternative text:",
            "a11y.i1.repair.info.decorativeNotAllowed": "Provide alternative text:",
            "a11y.i1.repair.checkboxlabel": "Make image decorative:",
            "a11y.i1.repair.checkboxtext": "Image is decorative",
            "a11y.i2.description": "Alternative text must not be the same as the image filename",
            "a11y.i2.repair.info": "Provide alternative text:",
            "a11y.i3.description": "Image alternative text should be less than 100 characters",
            "a11y.i3.repair.error": "Alternative text is {0} characters",
            "a11y.t1.description": "Tables must have captions",
            "a11y.t1.repair.errors.duplicate": "Table caption cannot be the same as the table summary",
            "a11y.t1.repair.errors.empty": "Caption cannot be empty",
            "a11y.t1.repair.info": "Provide caption:",
            "a11y.t2.description": "Complex tables should have summaries",
            "a11y.t2.repair.errors.duplicate": "Table summary cannot be the same as the table caption",
            "a11y.t2.repair.errors.empty": "Summary cannot be empty",
            "a11y.t2.repair.info": "Provide table summary:",
            "a11y.t3.description": "Table caption and summary cannot have the same value",
            "a11y.t4a.description": "Table elements must contain TR and TD tags",
            "a11y.t4b.description": "Tables must have at least one header cell",
            "a11y.t4b.repair.info": "Choose table header:",
            "a11y.t4c.description": "Table headers must be applied to a row or a column",
            "a11y.t4c.repair.header.col": "Header column",
            "a11y.t4c.repair.header.row": "Header row",
            "a11y.t4c.repair.info": "Select header scope:",
            "a11y.t4c.repair.scope.col": "Column",
            "a11y.t4c.repair.scope.colgroup": "Column group",
            "a11y.t4c.repair.scope.row": "Row",
            "a11y.t4c.repair.scope.rowgroup": "Row group",
            "a11y.widget.counter": "Issue {0} of {1}",
            "a11y.widget.ignore": "Ignore",
            "a11y.widget.issue.none": "No accessibility issues detected",
            "a11y.widget.next": "Next issue",
            "a11y.widget.previous": "Previous issue",
            "a11y.widget.legacyrepair": "Repair issue",
            "a11y.widget.repair": "Repair",
            "a11y.widget.title": "Accessibility Checker",
            "a11y.widget.help.title": "Click for more info",
            "a11y.control.tooltip": "Accessibility checker",
            "a11y.control.menutext": "Accessibility checker...",
            error: "Error",
            warning: "Warning",
            info: "Info",
            success: "Success"
    }
      , Q = e=>J[e]
      , X = e=>Array.isArray(e) ? K.translate([Q(e[0]), ...e.slice(1)]) : K.translate(Q(e))
      , Y = Object.keys
      , Z = Object.hasOwnProperty
      , ee = (e,t)=>{
            const r = Y(e);
            for (let o = 0, a = r.length; o < a; o++) {
                    const a = r[o];
                    t(e[a], a)
            }
    }
      , te = e=>(t,r)=>{
            e[r] = t
    }
      , re = (e,t)=>Z.call(e, t)
      , oe = "undefined" != typeof window ? window : Function("return this;")()
      , ae = (e,t)=>((e,t)=>{
            let r = null != t ? t : oe;
            for (let t = 0; t < e.length && null != r; ++t)
                    r = r[e[t]];
            return r
    }
    )(e.split("."), t)
      , ne = Object.getPrototypeOf
      , ie = e=>{
            const t = ae("ownerDocument.defaultView", e);
            return a(e) && ((e=>((e,t)=>{
                    const r = ((e,t)=>ae(e, t))(e, t);
                    if (null == r)
                            throw new Error(e + " not available on this browser");
                    return r
            }
            )("HTMLElement", e))(t).prototype.isPrototypeOf(e) || /^HTML\w*Element$/.test(ne(e).constructor.name))
    }
      , se = e=>t=>(e=>e.dom.nodeType)(t) === e
      , le = e=>ce(e) && ie(e.dom)
      , ce = se(1)
      , ue = se(3)
      , de = se(9)
      , pe = se(11)
      , he = e=>t=>ce(t) && t.dom.nodeName.toLowerCase() === e
      , me = (e,t,r)=>{
            ((e,t,r)=>{
                    if (!(o(r) || i(r) || u(r)))
                            throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", r, ":: Element ", e),
                            new Error("Attribute value was not simple");
                    e.setAttribute(t, r + "")
            }
            )(e.dom, t, r)
    }
      , ye = (e,t)=>{
            const r = e.dom.getAttribute(t);
            return null === r ? void 0 : r
    }
      , ge = (e,t)=>w.from(ye(e, t))
      , ve = (e,t)=>{
            e.dom.removeAttribute(t)
    }
      , we = (e=>{
            const t = "ephox-foam".replace(/\./g, "-");
            return {
                    resolve: e=>t + "-" + e
            }
    }
    )().resolve
      , be = e=>{
            if (null == e)
                    throw new Error("Node cannot be null or undefined");
            return {
                    dom: e
            }
    }
      , fe = (e,t)=>{
            const r = (t || document).createElement(e);
            return be(r)
    }
      , ke = be
      , xe = (e,t)=>{
            const r = e.dom;
            if (1 !== r.nodeType)
                    return !1;
            {
                    const e = r;
                    if (void 0 !== e.matches)
                            return e.matches(t);
                    if (void 0 !== e.msMatchesSelector)
                            return e.msMatchesSelector(t);
                    if (void 0 !== e.webkitMatchesSelector)
                            return e.webkitMatchesSelector(t);
                    if (void 0 !== e.mozMatchesSelector)
                            return e.mozMatchesSelector(t);
                    throw new Error("Browser lacks native selectors")
            }
    }
      , Ae = e=>1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount
      , Ce = (e,t)=>e.dom === t.dom
      , Te = e=>ke(e.dom.ownerDocument)
      , De = e=>w.from(e.dom.parentNode).map(ke)
      , Ie = e=>w.from(e.dom.previousSibling).map(ke)
      , _e = e=>W(((e,t)=>{
            const r = []
              , o = e=>(r.push(e),
            t(e));
            let a = t(e);
            do {
                    a = a.bind(o)
            } while (a.isSome());
            return r
    }
    )(e, Ie))
      , Ne = e=>_(e.dom.childNodes, ke)
      , Se = c(Element.prototype.attachShadow) && c(Node.prototype.getRootNode) ? e=>ke(e.dom.getRootNode()) : e=>de(e) ? e : Te(e)
      , Me = e=>ke(e.dom.host)
      , Oe = e=>{
            const t = ue(e) ? e.dom.parentNode : e.dom;
            if (null == t || null === t.ownerDocument)
                    return !1;
            const r = t.ownerDocument;
            return (e=>{
                    const t = Se(e);
                    return pe(r = t) && l(r.dom.host) ? w.some(t) : w.none();
                    var r
            }
            )(ke(t)).fold((()=>r.body.contains(t)), (o = Oe,
            a = Me,
            e=>o(a(e))));
            var o, a
    }
      , Ee = e=>{
            const t = e.dom.body;
            if (null == t)
                    throw new Error("Body is not available yet");
            return ke(t)
    }
      , Re = (e,t)=>((e,r)=>S(Ne(e), (e=>xe(e, t))))(e)
      , We = (e,t)=>((e,t)=>{
            const r = void 0 === t ? document : t.dom;
            return Ae(r) ? [] : _(r.querySelectorAll(e), ke)
    }
    )(t, e)
      , He = (e,t,r)=>{
            me(e, t, r)
    }
      , qe = (e,t,r)=>{
            ve(e, t),
            ve(e, r)
    }
      , $e = e=>{
            const t = e.editor;
            return {
                    start: t=>{
                            ((e,t,r,o,a,n)=>{
                                    N(e, (e=>{
                                            const r = ((e,t,r,o)=>{
                                                    switch (e) {
                                                    case "info":
                                                            return w.some(t);
                                                    case "warning":
                                                            return w.some(r);
                                                    case "error":
                                                            return w.some(o);
                                                    default:
                                                            return w.none()
                                                    }
                                            }
                                            )(e.severity, o, a, n).toArray().concat([t]);
                                            N(r, (t=>{
                                                    me(e.element, t, 1)
                                            }
                                            ))
                                    }
                                    )),
                                    w.from(e[0]).each((e=>{
                                            He(e.element, r, e.severity)
                                    }
                                    ))
                            }
                            )(t, e.violation, e.current, e.info, e.warn, e.error)
                    }
                    ,
                    moveTo: (r,o)=>{
                            ((e,t,r,o)=>{
                                    const a = We(e, "[" + t + "]");
                                    N(a, (e=>{
                                            ve(e, t)
                                    }
                                    )),
                                    He(r, t, o)
                            }
                            )(ke(t.getBody()), e.current, r, o)
                    }
                    ,
                    stop: ()=>{
                            ((e,t,r,o,a,n)=>{
                                    const i = We(e, "[" + t + "]");
                                    N(i, (e=>{
                                            N([t, r, o, a, n], (t=>{
                                                    ve(e, t)
                                            }
                                            )),
                                            qe(e, t, r)
                                    }
                                    ))
                            }
                            )(ke(t.getBody()), e.violation, e.current, e.info, e.warn, e.error)
                    }
                    ,
                    exclude: t=>{
                            qe(t, e.violation, e.current)
                    }
            }
    }
      , Ge = "data-" + we("a11y-current-violation")
      , Pe = "data-" + we("a11y-violation")
      , Le = "data-" + we("a11y-severity-info")
      , je = "data-" + we("a11y-severity-warn")
      , Be = "data-" + we("a11y-severity-error")
      , Ve = "data-" + we("accessibility-ignore")
      , Fe = p(Ve)
      , ze = (e,t,r)=>{
            let o = e.dom;
            const a = c(r) ? r : g;
            for (; o.parentNode; ) {
                    o = o.parentNode;
                    const e = ke(o);
                    if (t(e))
                            return w.some(e);
                    if (a(e))
                            break
            }
            return w.none()
    }
      , Ue = (e,t)=>E(e.dom.childNodes, (e=>t(ke(e)))).map(ke)
      , Ke = (e,t,r)=>ze(e, (e=>xe(e, t)), r)
      , Je = (e,t)=>Ue(e, (e=>xe(e, t)))
      , Qe = (e,t)=>((e,t)=>{
            const r = void 0 === t ? document : t.dom;
            return Ae(r) ? w.none() : w.from(r.querySelector(e)).map(ke)
    }
    )(t, e)
      , Xe = (e,t,r)=>((e,t,r,o,a)=>((e,t)=>xe(e, t))(r, o) ? w.some(r) : c(a) && a(r) ? w.none() : t(r, o, a))(0, Ke, e, t, r)
      , Ye = (e,t=!1)=>{
            return Oe(e) ? e.dom.isContentEditable : (r = e,
            Xe(r, "[contenteditable]")).fold(p(t), (e=>"true" === Ze(e)));
            var r
    }
      , Ze = e=>e.dom.contentEditable
      , et = e=>{
            const t = (e=>ze(e, le).exists(Ye))(e);
            return t && le(e) && Ye(e)
    }
      , tt = (e,t)=>S(e.querySelectorAll(t), (e=>et(ke(e))))
      , rt = (e,t,r)=>R(t, (t=>"I1" === t.id ? t.check(e, r) ? [{
            rule: t,
            element: e
    }] : [] : t.check(e) ? [{
            rule: t,
            element: e
    }] : []))
      , ot = (e,t)=>{
            let r = [];
            const o = ((e,t)=>{
                    const r = []
                      , o = [];
                    for (let t = 0, n = e.length; t < n; t++) {
                            const n = e[t];
                            (a = n,
                            a.walkable ? r : o).push(n)
                    }
                    var a;
                    return {
                            pass: r,
                            fail: o
                    }
            }
            )(e.rules)
              , a = s(e.ignoreSelectors) ? [] : e.ignoreSelectors
              , n = o.pass
              , i = o.fail
              , l = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, null);
            for (; l.nextNode(); ) {
                    const t = ke(l.currentNode);
                    if (!I(a, (e=>xe(t, e))) && le(t) && et(t)) {
                            const o = rt(t.dom, n, e.allowDecorativeImages);
                            r = r.concat(o)
                    }
            }
            const c = ((e,t)=>R(t, (t=>_(t.check(e), (e=>({
                    rule: t,
                    element: e
            }))))))(t, i);
            return r = r.concat(c),
            r.sort(((e,t)=>((e,t)=>e === t ? 0 : ((e,t)=>((e,t,r)=>0 != (e.compareDocumentPosition(t) & r))(e, t, Node.DOCUMENT_POSITION_PRECEDING))(e, t) ? 1 : -1)(e.element, t.element))),
            r
    }
      , at = (e,t)=>Qe(e, t).isSome()
      , nt = p("error")
      , it = p("warning")
      , st = (e,t)=>{
            const r = e;
            return r.matches ? r.matches(t) : r.webkitMatchesSelector ? r.webkitMatchesSelector(t) : r.mozMatchesSelector ? r.mozMatchesSelector(t) : !!r.msMatchesSelector && r.msMatchesSelector(t)
    }
      , lt = e=>e.length > 0
      , ct = ((e,t)=>{
            const r = t=>e(t) ? w.from(t.dom.nodeValue) : w.none();
            return {
                    get: t=>{
                            if (!e(t))
                                    throw new Error("Can only get text value of a text node");
                            return r(t).getOr("")
                    }
                    ,
                    getOption: r,
                    set: (t,r)=>{
                            if (!e(t))
                                    throw new Error("Can only set raw text value of a text node");
                            t.dom.nodeValue = r
                    }
            }
    }
    )(ue)
      , ut = e=>ct.get(e)
      , dt = e=>pt(e).isSome()
      , pt = e=>Ue(e, (e=>ue(e) && lt(ut(e).trim())))
      , ht = "strong,b"
      , mt = (e,t)=>pt(e).fold((()=>((e,t)=>{
            for (let r = 0, o = e.length; r < o; ++r)
                    if (!0 !== t(e[r]))
                            return !1;
            return !0
    }
    )(Ne(e), (e=>mt(e, t)))), (e=>((e,t)=>Ke(e, ht, (e=>Ce(e, t))).isSome())(e, t)))
      , yt = {
            id: "D1",
            wcag: "1.3.1",
            severity: it(),
            desckey: "a11y.d1.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H42.html",
            walkable: !0,
            check: e=>{
                    const t = ke(e);
                    return !(!st(e, "p") || !at(t, ht)) && mt(t, t)
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , gt = {
            id: "D2",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.d2.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/general/G141.html",
            walkable: !1,
            check: e=>{
                    const t = tt(e, "h1,h2,h3,h4,h5,h6");
                    let r;
                    const o = [];
                    return N(t, (e=>{
                            const t = parseInt(e.tagName.slice(1), 10);
                            r && t - r > 1 && o.push(e),
                            r = t
                    }
                    )),
                    o
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , vt = {
            id: "D3",
            wcag: "2.4.4",
            severity: nt(),
            desckey: "a11y.d3.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H2.html",
            walkable: !1,
            check: e=>{
                    const t = ke(e)
                      , r = We(t, "a + a")
                      , o = S(r, (e=>{
                            const t = W(_e(e));
                            return O(t, he("a"), (e=>{
                                    return !(ue(t = e) && (r = ut(t).replace(/[\u200B-\u200D\uFEFF]/g, ""),
                                    !lt(r)));
                                    var t, r
                            }
                            )).exists((t=>t.dom.href === e.dom.href)) && et(e)
                    }
                    ));
                    return _(o, (e=>e.dom))
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , wt = (e,t)=>{
            const r = e.nodeName
              , o = ((e,t)=>{
                    let r = e.nextSibling;
                    for (; null !== r && (t && "#text" === r.nodeName || "BR" === r.nodeName); )
                            r = r.nextSibling;
                    return r
            }
            )(e, t);
            return null !== o && o.nodeName === r && o
    }
      , bt = (e,t,r)=>{
            const o = [];
            if (t(e)) {
                    o.push(e);
                    let a = wt(e, r);
                    for (; !1 !== a && t(a); )
                            o.push(a),
                            a = wt(a, r)
            }
            return o
    }
      , ft = (e,t)=>{
            let r = -1;
            for (let o = 0; o < e.length; o++)
                    if (e[o] === t) {
                            r = o;
                            break
                    }
            return r
    }
      , kt = (e,t)=>{
            const r = tt(e, "p,h1,h2,h3,h4,h5,h6")
              , o = [];
            let a = 0;
            for (; a < r.length; ) {
                    const e = r[a]
                      , n = bt(e, t, !0);
                    if (n.length > 1) {
                            o.push(e);
                            const t = n[n.length - 1]
                              , i = ft(r, t);
                            a = -1 === i ? a + 1 : i
                    } else
                            l(e.firstChild) ? (bt(e.firstChild, t, !1).length > 1 && o.push(e),
                            a++) : a++
            }
            return o
    }
      , xt = e=>{
            var t;
            return l(null === (t = e.textContent) || void 0 === t ? void 0 : t.match(/^\s{0,}([a-z1-9]|i+)\s{0,}[.)-]/gim))
    }
      , At = {
            id: "D4o",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.d4.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H48.html",
            walkable: !1,
            check: e=>kt(e, xt),
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Ct = e=>{
            var t;
            return l(null === (t = e.textContent) || void 0 === t ? void 0 : t.match(/^\s{0,}(\*|-)\s{0,}/gim))
    }
      , Tt = {
            id: "D4u",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.d4.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H48.html",
            walkable: !1,
            check: e=>kt(e, Ct),
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Dt = (e,t)=>{
            const r = e.dom
              , o = window.getComputedStyle(r).getPropertyValue(t);
            return "" !== o || Oe(e) ? o : It(r, t)
    }
      , It = (e,t)=>(e=>void 0 !== e.style && c(e.style.getPropertyValue))(e) ? e.style.getPropertyValue(t) : ""
      , _t = (e,t,r,o)=>({
            red: e,
            green: t,
            blue: r,
            alpha: o
    })
      , Nt = e=>{
            const t = e=>e <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
              , r = e.red / 255
              , o = e.green / 255
              , a = e.blue / 255;
            return .2126 * t(r) + .7152 * t(o) + .0722 * t(a)
    }
      , St = (e,t)=>{
            const r = e.alpha + t.alpha * (1 - e.alpha)
              , o = (e.red * e.alpha + t.red * t.alpha * (1 - e.alpha)) / r
              , a = (e.green * e.alpha + t.green * t.alpha * (1 - e.alpha)) / r
              , n = (e.blue * e.alpha + t.blue * t.alpha * (1 - e.alpha)) / r;
            return _t(Math.ceil(o), Math.ceil(a), Math.ceil(n), r)
    }
      , Mt = e=>{
            const t = (e,t,r,o)=>{
                    const a = parseInt(e, 10)
                      , n = parseInt(t, 10)
                      , i = parseInt(r, 10)
                      , s = parseFloat(o);
                    return w.some(_t(a, n, i, s))
            }
            ;
            if ("transparent" === e)
                    return t("0", "0", "0", "0");
            const r = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(e);
            if (null !== r)
                    return t(r[1], r[2], r[3], "1");
            const o = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?(?:\.\d+)?)\)/.exec(e);
            return null !== o ? t(o[1], o[2], o[3], o[4]) : w.none()
    }
      , Ot = (e,t)=>{
            const r = parseFloat(Dt(e, "opacity"));
            return r < 1 ? _t(t.red, t.green, t.blue, t.alpha * r) : t
    }
      , Et = (e,t)=>Rt(e).filter((e=>e < t)).isSome()
      , Rt = e=>{
            const t = (e=>{
                    const t = Te(e)
                      , r = Ee(t)
                      , o = [e].concat(((e,t)=>{
                            const r = c(t) ? t : g;
                            let o = e.dom;
                            const a = [];
                            for (; null !== o.parentNode && void 0 !== o.parentNode; ) {
                                    const e = o.parentNode
                                      , t = ke(e);
                                    if (a.push(t),
                                    !0 === r(t))
                                            break;
                                    o = e
                            }
                            return a
                    }
                    )(e, (e=>Ce(e, r))))
                      , a = M(o, ((e,t)=>{
                            if (1 === e.alpha)
                                    return e;
                            const r = Dt(t, "background-color");
                            return Mt(r).bind((r=>{
                                    const o = Ot(t, r);
                                    return o.alpha > 0 ? w.some(St(e, o)) : w.none()
                            }
                            )).getOr(e)
                    }
                    ), _t(0, 0, 0, 0));
                    return a.alpha < 1 ? St(a, _t(255, 255, 255, 1)) : a
            }
            )(e);
            return ((e,t)=>{
                    const r = Dt(e, "color");
                    return Mt(r).bind((r=>{
                            const o = Ot(e, r)
                              , a = o.alpha < 1 ? St(o, t) : o;
                            return w.some(a)
                    }
                    ))
            }
            )(e, t).map((e=>{
                    const r = Nt(t);
                    return ((e,t)=>(Math.max(e, t) + .05) / (Math.min(e, t) + .05))(Nt(e), r)
            }
            ))
    }
      , Wt = {
            id: "D5c",
            wcag: "1.4.3",
            severity: nt(),
            desckey: "a11y.d5c.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/general/G17.html",
            walkable: !0,
            check: e=>{
                    const t = ke(e);
                    return dt(t) && Et(t, 7)
            }
            ,
            levels: [P()],
            htmlversions: [H(), q()]
    }
      , Ht = e=>{
            const t = Dt(e, "font-size")
              , r = new RegExp(".*px").test(t)
              , o = /(\d*\.?\d*)(.*)/.exec(t);
            return r && null !== o ? w.some(Number(o[1])) : w.none()
    }
      , qt = e=>{
            const t = (e=>{
                    const t = Dt(e, "font-weight");
                    return !("bold" !== t && "bolder" !== t) || !!/^[0-9]*$/.test(r = t) && parseInt(r, 10) >= 700;
                    var r
            }
            )(e)
              , r = Te(e)
              , o = Ee(r)
              , a = Ht(o);
            return Ht(e).fold(g, (e=>a.fold((()=>e >= 24 || t && e >= 19), (r=>e >= 1.5 * r || t && e >= 1.2 * r))))
    }
      , $t = {
            id: "D5a",
            wcag: "1.4.3",
            severity: nt(),
            desckey: "a11y.d5a.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/general/G145.html",
            walkable: !0,
            check: e=>{
                    const t = ke(e);
                    return dt(t) && qt(t) && Et(t, 3)
            }
            ,
            levels: [G()],
            htmlversions: [H(), q()]
    }
      , Gt = {
            id: "D5b",
            wcag: "1.4.3",
            severity: nt(),
            desckey: "a11y.d5b.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/general/G18.html",
            walkable: !0,
            check: e=>{
                    const t = ke(e);
                    return dt(t) && !qt(t) && Et(t, 4.5)
            }
            ,
            levels: [G()],
            htmlversions: [H(), q()]
    }
      , Pt = {
            id: "H93",
            wcag: "4.1.1",
            severity: nt(),
            desckey: "a11y.h93.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H93.html",
            walkable: !1,
            check: e=>{
                    const t = ke(e)
                      , r = We(t, "*[id]")
                      , o = M(r, ((e,t)=>{
                            const r = ye(t, "id");
                            if (void 0 !== r && et(t)) {
                                    if (re(e.problems, r))
                                            return e;
                                    if (re(e.ids, r)) {
                                            const t = e.ids[r];
                                            return {
                                                    ...e,
                                                    problems: {
                                                            ...e.problems,
                                                            [r]: t
                                                    }
                                            }
                                    }
                                    return {
                                            ...e,
                                            ids: {
                                                    ...e.ids,
                                                    [r]: t.dom
                                            }
                                    }
                            }
                            return e
                    }
                    ), {
                            ids: {},
                            problems: {}
                    });
                    return ((e,t)=>{
                            const r = [];
                            return ee(e, ((e,o)=>{
                                    r.push(t(e, o))
                            }
                            )),
                            r
                    }
                    )(o.problems, h)
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Lt = he("img")
      , jt = {
            id: "I1",
            wcag: "1.1.1",
            severity: nt(),
            desckey: "a11y.i1.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/general/G95.html",
            walkable: !0,
            check: (e,t)=>{
                    const r = ke(e);
                    if (!Lt(r))
                            return !1;
                    const o = ge(r, "alt")
                      , a = o.isSome()
                      , n = o.exists((e=>"" === e.trim()))
                      , i = ((e,t,r=m)=>e.exists((e=>r(e, t))))(ge(r, "role"), "presentation");
                    return !a || (t ? a && n && !i || a && !n && i : n || i)
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Bt = {
            id: "I2",
            wcag: "1.1.1",
            severity: nt(),
            desckey: "a11y.i2.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/general/G95.html",
            walkable: !0,
            check: e=>(e=>st(e, "img[alt][src]"))(e) && e.src.split("/").pop() === e.alt.split("/").pop(),
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Vt = {
            id: "I3",
            wcag: "N/A",
            severity: it(),
            desckey: "a11y.i3.description",
            url: "",
            walkable: !0,
            check: e=>{
                    const t = ke(e);
                    return !!Lt(t) && ge(t, "alt").exists((e=>e.length > 100))
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Ft = {
            id: "T1",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.t1.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H39.html",
            walkable: !0,
            check: e=>{
                    if (st(e, "table")) {
                            const t = e.querySelector("caption");
                            return !t || st(t, ":empty")
                    }
                    return !1
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , zt = {
            id: "T2",
            wcag: "1.3.1",
            severity: it(),
            desckey: "a11y.t2.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H73.html",
            walkable: !0,
            check: e=>st(e, "table") && l(e.querySelector("[rowspan]") || e.querySelector("[colspan]")) && !e.hasAttribute("summary"),
            levels: [$(), G(), P()],
            htmlversions: [H()]
    }
      , Ut = {
            id: "T3",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.t3.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H73.html",
            walkable: !0,
            check: e=>{
                    if (st(e, "table") && e.hasAttribute("summary")) {
                            const t = e.querySelectorAll("caption");
                            return t.length > 0 && e.getAttribute("summary") === t[0].innerHTML
                    }
                    return !1
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Kt = {
            id: "T4b",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.t4b.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H51.html",
            walkable: !0,
            check: e=>"table" === e.nodeName.toLowerCase() && 0 === e.querySelectorAll("th").length,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Jt = {
            id: "T4c",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.t4c.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H63.html",
            walkable: !0,
            check: e=>{
                    return !("th" !== e.nodeName.toLowerCase() || (t = e).hasAttribute("scope") && /row|col|rowgroup|colgroup/i.test(t.getAttribute("scope")));
                    var t
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Qt = (e,t)=>0 === e.querySelectorAll(t).length
      , Xt = {
            id: "T4a",
            wcag: "1.3.1",
            severity: nt(),
            desckey: "a11y.t4a.description",
            url: "https://www.w3.org/WAI/WCAG21/Techniques/html/H51.html",
            walkable: !0,
            check: e=>{
                    return "table" === e.nodeName.toLowerCase() && (Qt(t = e, "tr") || Qt(t, "td"));
                    var t
            }
            ,
            levels: [$(), G(), P()],
            htmlversions: [H(), q()]
    }
      , Yt = e=>({
            id: e.id.toUpperCase(),
            severity: e.severity,
            url: e.url,
            description: X(e.description),
            element: e.element.dom
    })
      , Zt = t=>{
            const r = (e=>{
                    const t = (e=>{
                            const t = e.options.get("a11ychecker_ignored_rules");
                            return R(tinymce.explode(t), (e=>e.length > 0 ? [e.toUpperCase()] : []))
                    }
                    )(e)
                      , r = B(e)
                      , o = V(e);
                    return {
                            rules: S([yt, gt, vt, At, Tt, $t, Gt, Wt, Pt, jt, Bt, Vt, Ft, zt, Ut, Jt, Xt, Kt], (e=>!D(t, e.id.toUpperCase()) && D(e.levels, r) && D(e.htmlversions, o))),
                            allowDecorativeImages: U(e),
                            ignoreSelectors: ["img[data-mce-placeholder]", "[data-mce-bogus=all] *", "[data-mce-bogus]", "[data-mce-mergetag-affix]"]
                    }
            }
            )(t);
            (e=>{
                    e.on("init", (()=>{
                            N([Ve, Pe, Le, je, Be, Ge], (t=>{
                                    e.serializer.addTempAttr(t)
                            }
                            ))
                    }
                    ))
            }
            )(t);
            const o = e(!1)
              , a = (e=>$e({
                    editor: e,
                    violation: Pe,
                    current: Ge,
                    info: Le,
                    warn: je,
                    error: Be
            }))(t)
              , n = Fe();
            let i = []
              , s = 0;
            const l = ()=>{
                    const e = ot(r, t.getBody())
                      , o = ((e,t)=>_(t, (t=>{
                            const r = t.rule;
                            return {
                                    id: r.id.toUpperCase(),
                                    description: "I1" !== r.id ? r.desckey : U(e) ? `${r.desckey}.decorativeAllowed` : `${r.desckey}.decorativeNotAllowed`,
                                    element: ke(t.element),
                                    url: r.url,
                                    severity: r.severity
                            }
                    }
                    )))(t, e);
                    return S(o, (e=>{
                            const r = (a = e.element,
                            ge(a, n).map((e=>e.split(" "))).getOr([]))
                              , o = z(t);
                            var a;
                            return !D(r, e.id) && o(Yt(e))
                    }
                    ))
            }
              , c = e=>(s += e,
            s = s < 0 ? s + i.length : s % i.length,
            a.moveTo(i[s].element, i[s].severity),
            t.selection.scrollIntoView(i[s].element.dom),
            {
                    summaryLabel: X(["a11y.widget.counter", s + 1, i.length]),
                    issue: i[s],
                    index: s + 1
            })
              , u = ()=>i.length > 0 ? w.some(c(0)) : w.none()
              , d = ()=>{
                    o.set(!0),
                    i = l(),
                    s = 0
            }
              , p = ()=>{
                    a.stop(),
                    o.set(!1),
                    s = 0,
                    i = []
            }
            ;
            return {
                    scan: ()=>(d(),
                    a.start(i),
                    u()),
                    stepIssue: c,
                    getIssues: ()=>i.slice(0),
                    getCurrent: u,
                    getReport: ()=>{
                            const e = o.get();
                            try {
                                    return e || d(),
                                    _(i, Yt)
                            } finally {
                                    e || p()
                            }
                    }
                    ,
                    resolveCurrent: e=>(e && ((e,t,r)=>{
                            const o = ge(e, t).map((e=>e.concat(" ", r))).getOr(r);
                            me(e, t, o)
                    }
                    )(i[s].element, n, i[s].id),
                    i = l(),
                    u()),
                    clear: p,
                    isAuditing: ()=>o.get()
            }
    }
      , er = (e,t)=>{
            const r = t.ui.registry.getAll().icons;
            return w.from(r[e]).orThunk((()=>w.from(r["temporary-placeholder"]))).getOr("!not found!")
    }
      , tr = {
            success: "checkmark",
            info: "info",
            warning: "notice",
            error: "warning"
    }
      , rr = (e,t,r,o,a)=>{
            const n = X(r)
              , i = X(t);
            return `<div class="accessibility-issue__description"><div><div><div class="tox-icon">${er(tr[r], e)}</div><h2>${n}</h2></div><p>${i}</p></div><div>` + ((e,t,r)=>{
                    const o = `<a href="${r}" title="${X("a11y.widget.help.title")}" class="tox-button tox-button--naked tox-button--icon" target="_blank" data-alloy-tabstop="true" tabindex="-1"><div class="tox-icon">${er(e, t)}</div></a>`;
                    return "help" === e ? o : `<div class="tox-icon">${er(e, t)}</div>`
            }
            )(o, e, a) + "</div></div>"
    }
      , or = (e,t,r,o)=>({
            type: "listbox",
            label: t,
            name: e,
            items: _(r, (e=>({
                    text: o(e.text),
                    value: e.value
            })))
    })
      , ar = (e,t)=>({
            type: "input",
            name: e,
            label: t
    })
      , nr = (e,t,r)=>({
            type: "label",
            label: t,
            items: [{
                    type: "checkbox",
                    name: e,
                    label: r
            }]
    })
      , ir = (e,t)=>({
            title: X("a11y.widget.title"),
            body: {
                    type: "panel",
                    items: [{
                            type: "panel",
                            classes: ["tox-accessibility-issue", "accessibility-issue--success"],
                            items: [{
                                    type: "htmlpanel",
                                    html: rr(e, "a11y.widget.issue.none", "success", "checkmark"),
                                    presets: "presentation"
                            }]
                    }]
            },
            buttons: [{
                    type: "submit",
                    name: "ok",
                    text: "OK",
                    primary: !0
            }],
            onSubmit: e=>e.close(),
            onClose: t
    })
      , sr = (e,t,r)=>{
            e.redial(t),
            e.focus(r)
    }
    ;
    var lr;
    !function(e) {
            e.Next = "next",
            e.Prev = "prev",
            e.Ignore = "ignore",
            e.Ok = "ok",
            e.Repair = "repair"
    }(lr || (lr = {}));
    const cr = ({issue: e, summaryLabel: t},r,o,a,n,i)=>{
            const s = F(n)
              , l = e=>cr(e, r, o, w.none(), n, i)
              , c = a=>(s,{name: c})=>{
                    if (c === lr.Next || c === lr.Prev) {
                            const e = r.stepIssue(c === lr.Next ? 1 : -1);
                            sr(s, l(e), c)
                    } else
                            c === lr.Ignore ? r.resolveCurrent(!0).fold((()=>sr(s, ir(n, i), lr.Ok)), (e=>sr(s, l(e), lr.Ignore))) : c === lr.Repair && ((a,s)=>{
                                    const c = s=>{
                                            sr(a, cr({
                                                    issue: e,
                                                    summaryLabel: t
                                            }, r, o, w.some(s), n, i), lr.Repair)
                                    }
                                      , u = ()=>r.resolveCurrent(!1).fold((()=>r.scan().fold((()=>sr(a, ir(n, i), lr.Ok)), (e=>sr(a, l(e), lr.Ignore)))), (e=>sr(a, l(e), lr.Ignore)));
                                    s.each((t=>{
                                            t.repair(e.element, e.id, ((e,t)=>{
                                                    const r = {}
                                                      , o = {};
                                                    return ((e,t,r,o)=>{
                                                            ee(e, ((e,a)=>{
                                                                    (t(e, a) ? r : o)(e, a)
                                                            }
                                                            ))
                                                    }
                                                    )(e, t, te(r), te(o)),
                                                    {
                                                            t: r,
                                                            f: o
                                                    }
                                            }
                                            )(a.getData(), ((t,r)=>{
                                                    return o = r,
                                                    "" === (a = e.id) || o.length >= a.length && o.substr(0, 0 + a.length) === a;
                                                    var o, a
                                            }
                                            )).t, (e=>e.fold(c, u)))
                                    }
                                    ))
                            }
                            )(s, a)
            }
              , u = t=>r=>t.each((t=>{
                    t.onChange.each((t=>t(r, r.getData(), e))),
                    t.shouldDisableRepair.each((t=>{
                            const o = t(r.getData(), e);
                            r.setEnabled(lr.Repair, !o)
                    }
                    ))
            }
            ))
              , d = (r,o,a)=>{
                    const l = "warning" === (d = e.severity) ? "warn" : d;
                    var d;
                    const p = o.map((()=>({
                            type: "panel",
                            classes: ["accessibility-issue__repair"],
                            items: o.map((e=>e.items)).getOr([])
                    }))).toArray();
                    return {
                            title: X("a11y.widget.title"),
                            body: {
                                    type: "panel",
                                    classes: ["tox-accessibility-issue", `accessibility-issue--${l}`],
                                    items: [{
                                            type: "panel",
                                            classes: ["accessibility-issue__header"],
                                            items: [{
                                                    type: "htmlpanel",
                                                    html: `<h1>${t}</h1>`,
                                                    presets: "presentation"
                                            }, {
                                                    type: "button",
                                                    name: lr.Prev,
                                                    text: X("a11y.widget.previous"),
                                                    icon: "action-prev",
                                                    borderless: !0
                                            }, {
                                                    type: "button",
                                                    name: lr.Next,
                                                    text: X("a11y.widget.next"),
                                                    icon: "action-next",
                                                    borderless: !0
                                            }]
                                    }, {
                                            type: "htmlpanel",
                                            html: rr(n, e.description, e.severity, "help", s(e.id)),
                                            presets: "presentation"
                                    }, ...p]
                            },
                            buttons: [{
                                    type: "custom",
                                    name: lr.Ignore,
                                    text: X("a11y.widget.ignore")
                            }, {
                                    type: "custom",
                                    name: lr.Repair,
                                    text: X("a11y.widget.repair"),
                                    enabled: !a,
                                    primary: !0
                            }],
                            initialData: {
                                    ...o.map((e=>e.initialData)).getOr({})
                            },
                            onAction: c(r),
                            onChange: u(r),
                            onClose: i
                    }
            }
            ;
            return o(e.id).fold((()=>d(w.none(), w.none(), !0)), (t=>{
                    const r = ((e,t,r)=>{
                            const o = t.element;
                            return r.fold((()=>e.ui.map((e=>e(t.id, o)))), (r=>e.ui.map((e=>{
                                    const a = e(t.id, o);
                                    return {
                                            items: a.items.concat([(n = r.errorMessage,
                                            {
                                                    type: "htmlpanel",
                                                    html: `<div class="tox-form__group--error">${n}</div>`
                                            })]),
                                            initialData: {
                                                    ...a.initialData,
                                                    ...r.repairErrorData
                                            }
                                    };
                                    var n
                            }
                            ))))
                    }
                    )(t, e, a)
                      , o = t.shouldDisableRepair.bind((t=>r.map((r=>t(r.initialData, e))))).getOr(!1);
                    return d(w.some(t), r, o)
            }
            ))
    }
      , ur = (e,t)=>{
            De(e).each((r=>{
                    r.dom.insertBefore(t.dom, e.dom)
            }
            ))
    }
      , dr = (e,t)=>{
            const r = (e=>w.from(e.dom.nextSibling).map(ke))(e);
            r.fold((()=>{
                    De(e).each((e=>{
                            pr(e, t)
                    }
                    ))
            }
            ), (e=>{
                    ur(e, t)
            }
            ))
    }
      , pr = (e,t)=>{
            e.dom.appendChild(t.dom)
    }
      , hr = (e,t)=>{
            N(t, (t=>{
                    pr(e, t)
            }
            ))
    }
      , mr = e=>{
            const t = e.dom;
            null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , yr = e=>{
            const t = Ne(e);
            var r, o;
            t.length > 0 && (r = e,
            N(o = t, ((e,t)=>{
                    const a = 0 === t ? r : o[t - 1];
                    dr(a, e)
            }
            ))),
            mr(e)
    }
      , gr = e=>e.dom.innerHTML
      , vr = e=>{
            const t = t=>t(e)
              , r = p(e)
              , o = ()=>a
              , a = {
                    tag: !0,
                    inner: e,
                    fold: (t,r)=>r(e),
                    isValue: v,
                    isError: g,
                    map: t=>br.value(t(e)),
                    mapError: o,
                    bind: t,
                    exists: t,
                    forall: t,
                    getOr: r,
                    or: o,
                    getOrThunk: r,
                    orThunk: o,
                    getOrDie: r,
                    each: t=>{
                            t(e)
                    }
                    ,
                    toOptional: ()=>w.some(e)
            };
            return a
    }
      , wr = e=>{
            const t = ()=>r
              , r = {
                    tag: !1,
                    inner: e,
                    fold: (t,r)=>t(e),
                    isValue: g,
                    isError: v,
                    map: t,
                    mapError: t=>br.error(t(e)),
                    bind: t,
                    exists: g,
                    forall: v,
                    getOr: h,
                    or: h,
                    getOrThunk: y,
                    orThunk: y,
                    getOrDie: (o = String(e),
                    ()=>{
                            throw new Error(o)
                    }
                    ),
                    each: d,
                    toOptional: w.none
            };
            var o;
            return r
    }
      , br = {
            value: vr,
            error: wr,
            fromOption: (e,t)=>e.fold((()=>wr(t)), vr)
    }
      , fr = e=>((e,t)=>ke(e.dom.cloneNode(!0)))(e)
      , kr = (e,t,r)=>br.error({
            errorMessage: t(e),
            repairErrorData: r
    })
      , xr = (e,t,r,o,a,n)=>0 === t.length ? kr(o, n, {}) : Ar(e, t, r, a, n)
      , Ar = (e,t,r,o,a)=>t === r ? kr(o, a, {}) : br.value(e)
      , Cr = e=>{
            const t = e.split("/");
            return w.from(t.pop())
    }
      , Tr = (e,t,r,o,a,n)=>{
            const i = ge(e, "src").bind(Cr).getOr("")
              , s = r[`${t}_textinput`];
            return r[`${t}_checkbox`] ? (e=>(me(e, "alt", ""),
            me(e, "role", "presentation"),
            br.value(e)))(e) : xr(e, s, i, o, a, n).map((e=>(me(e, "alt", s),
            "presentation" === ye(e, "role") && ve(e, "role"),
            e)))
    }
      , Dr = e=>e.dom.textContent
      , Ir = (e,t,r,o,a,n)=>{
            const i = ye(e, "summary");
            return xr(e, r[t], i, o, a, n).map((o=>{
                    const a = Je(e, "caption").fold((()=>fe("caption")), (e=>{
                            var t;
                            return (t = e).dom.textContent = "",
                            N(Ne(t), (e=>{
                                    mr(e)
                            }
                            )),
                            e
                    }
                    ));
                    return ((e,t)=>{
                            e.dom.textContent = t
                    }
                    )(a, r[t]),
                    ((e,t)=>{
                            (e=>((e,t)=>{
                                    const r = e.dom.childNodes;
                                    return w.from(r[0]).map(ke)
                            }
                            )(e))(e).fold((()=>{
                                    pr(e, t)
                            }
                            ), (r=>{
                                    e.dom.insertBefore(t.dom, r.dom)
                            }
                            ))
                    }
                    )(o, a),
                    o
            }
            ))
    }
      , _r = e=>`${e}_checkbox`
      , Nr = e=>`${e}_textinput`
      , Sr = (e,t)=>{
            const r = t.id
              , o = !0 === e[_r(r)]
              , a = e[Nr(r)].length > 0;
            return !o && !a
    }
      , Mr = (e,t,r)=>{
            const o = r.id
              , a = _r(o)
              , n = Nr(o);
            !0 === t[a] ? (e.setEnabled(n, !1),
            e.setEnabled(lr.Repair, !0)) : (e.setEnabled(n, !0),
            t[n].length > 0 ? (e.setEnabled(lr.Repair, !0),
            e.setEnabled(a, !0)) : (e.setEnabled(a, !0),
            e.setEnabled(lr.Repair, !1)))
    }
      , Or = (e,t)=>{
            const r = ar(Nr(t), X((o = "a11y.i1.repair.info",
            e ? `${o}.decorativeAllowed` : `${o}.decorativeNotAllowed`)));
            var o;
            return e ? [nr(_r(t), X("a11y.i1.repair.checkboxlabel"), X("a11y.i1.repair.checkboxtext")), r] : [r]
    }
      , Er = (e,t,r)=>{
            const o = ye(e, "alt")
              , a = t ? {
                    [_r(r)]: !1
            } : {};
            return {
                    [Nr(r)]: o || "",
                    ...a
            }
    }
      , Rr = e=>{
            const t = U(e)
              , r = {
                    H93: w.some({
                            ui: w.some(((e,t)=>({
                                    items: [or(e, X("a11y.h93.repair.info"), [{
                                            text: "a11y.h93.repair.deduplicate.others",
                                            value: "others"
                                    }, {
                                            text: "a11y.h93.repair.deduplicate.this",
                                            value: "this"
                                    }, {
                                            text: "a11y.h93.repair.deduplicate.all",
                                            value: "all"
                                    }], X)],
                                    initialData: {
                                            [e]: ""
                                    }
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(((e,t,r,o)=>{
                                                    const a = r[t]
                                                      , n = "all" === a || "this" === a;
                                                    if ("all" === a || "others" === a) {
                                                            const t = ye(e, "id")
                                                              , r = o.getBody()
                                                              , a = ke(r)
                                                              , n = We(a, `*[id="${t}"]`)
                                                              , i = S(n, (t=>!Ce(t, e)));
                                                            N(i, (e=>{
                                                                    ve(e, "id")
                                                            }
                                                            ))
                                                    }
                                                    return n && ve(e, "id"),
                                                    br.value(e)
                                            }
                                            )(t, r, o, e))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    }),
                    I1: w.some({
                            ui: w.some(((e,r)=>({
                                    items: Or(t, e),
                                    initialData: Er(r, t, e)
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(Tr(t, r, o, "a11y.i1.repair.errors.empty", "a11y.i1.repair.errors.duplicate", X))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: t ? w.some(Sr) : w.none(),
                            onChange: t ? w.some(Mr) : w.none()
                    }),
                    I2: w.some({
                            ui: w.some(((e,r)=>({
                                    items: Or(t, e),
                                    initialData: Er(r, t, e)
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(Tr(t, r, o, "a11y.i1.repair.errors.empty", "a11y.i1.repair.errors.duplicate", X))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: t ? w.some(Sr) : w.none(),
                            onChange: t ? w.some(Mr) : w.none()
                    }),
                    I3: w.some({
                            ui: w.some(((e,t)=>({
                                    items: Or(!1, e),
                                    initialData: Er(t, !1, e)
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(((e,t,r,o,a)=>{
                                                    const n = r[`${t}_textinput`];
                                                    return ((e,t,r,o,a,n=100)=>{
                                                            const i = `${t}_textinput`;
                                                            return r.length > n ? kr([o, r.length], a, {
                                                                    [i]: r
                                                            }) : br.value(e)
                                                    }
                                                    )(e, t, n, o, a, 100).map((e=>(me(e, "alt", n),
                                                    e)))
                                            }
                                            )(t, r, o, "a11y.i3.repair.error", X))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    }),
                    T1: w.some({
                            ui: w.some(((e,t)=>({
                                    items: [ar(e, X("a11y.t1.repair.info"))],
                                    initialData: {
                                            [e]: ""
                                    }
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(Ir(t, r, o, "a11y.t1.repair.errors.empty", "a11y.t1.repair.errors.duplicate", X))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    }),
                    T2: w.some({
                            ui: w.some(((e,t)=>({
                                    items: [ar(e, X("a11y.t2.repair.info"))],
                                    initialData: {
                                            [e]: ""
                                    }
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(((e,t,r,o,a,n)=>{
                                                    const i = Qe(e, "caption").filter(le).map(Dr).getOr("");
                                                    return xr(e, r[t], i, "a11y.t2.repair.errors.empty", "a11y.t2.repair.errors.duplicate", n).map((o=>(me(e, "summary", r[t]),
                                                    o)))
                                            }
                                            )(t, r, o, 0, 0, X))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    }),
                    T3: w.some({
                            ui: w.some(((e,t)=>{
                                    const r = Je(t, "caption").fold(p(""), gr);
                                    return {
                                            items: [ar(e, X("a11y.t1.repair.info"))],
                                            initialData: {
                                                    [e]: r
                                            }
                                    }
                            }
                            )),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(Ir(t, r, o, "a11y.t1.repair.errors.empty", "a11y.t1.repair.errors.duplicate", X))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    }),
                    T4A: w.none(),
                    T4B: w.some({
                            ui: w.some(((e,t)=>({
                                    items: [or(e, X("a11y.t4b.repair.info"), [{
                                            text: "a11y.t4c.repair.header.row",
                                            value: "row"
                                    }, {
                                            text: "a11y.t4c.repair.header.col",
                                            value: "col"
                                    }], X)],
                                    initialData: {
                                            [e]: ""
                                    }
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(((e,t,r)=>{
                                                    let o = [];
                                                    if ("row" === r[t]) {
                                                            const t = ke(e.dom.rows[0]);
                                                            o = Re(t, "td")
                                                    } else
                                                            "col" === r[t] && N(e.dom.rows, (e=>{
                                                                    Je(ke(e), "td").each((e=>{
                                                                            o.push(e)
                                                                    }
                                                                    ))
                                                            }
                                                            ));
                                                    return N(o, (e=>{
                                                            const t = fe("th");
                                                            N(e.dom.attributes, (r=>{
                                                                    ge(e, r.name).each((e=>me(t, r.name, e)))
                                                            }
                                                            )),
                                                            t.dom.innerHTML = e.dom.innerHTML,
                                                            dr(e, t),
                                                            mr(e)
                                                    }
                                                    )),
                                                    br.value(e)
                                            }
                                            )(t, r, o))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.some(((e,t)=>!at(t.element, "td"))),
                            onChange: w.none()
                    }),
                    T4C: w.some({
                            ui: w.some(((e,t)=>({
                                    items: [or(e, X("a11y.t4c.repair.info"), [{
                                            text: "a11y.t4c.repair.scope.row",
                                            value: "row"
                                    }, {
                                            text: "a11y.t4c.repair.scope.col",
                                            value: "col"
                                    }, {
                                            text: "a11y.t4c.repair.scope.rowgroup",
                                            value: "rowgroup"
                                    }, {
                                            text: "a11y.t4c.repair.scope.colgroup",
                                            value: "colgroup"
                                    }], X)],
                                    initialData: {
                                            [e]: ""
                                    }
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(((e,t,r)=>(me(e, "scope", r[t]),
                                            br.value(e)))(t, r, o))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    }),
                    D1: w.some({
                            ui: w.some(((e,t)=>({
                                    items: [or(e, X("a11y.d1.repair.info"), [{
                                            text: "a11y.d1.repair.block.h1",
                                            value: "h1"
                                    }, {
                                            text: "a11y.d1.repair.block.h2",
                                            value: "h2"
                                    }, {
                                            text: "a11y.d1.repair.block.h3",
                                            value: "h3"
                                    }, {
                                            text: "a11y.d1.repair.block.h4",
                                            value: "h4"
                                    }, {
                                            text: "a11y.d1.repair.block.h5",
                                            value: "h5"
                                    }, {
                                            text: "a11y.d1.repair.block.h6",
                                            value: "h6"
                                    }], X)],
                                    initialData: {
                                            [e]: ""
                                    }
                            }))),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a(((e,t,r)=>{
                                                    const o = Te(e)
                                                      , a = fe(r[t], o.dom)
                                                      , n = Ne(e)
                                                      , i = _(n, fr);
                                                    hr(a, i);
                                                    const s = We(a, "b,strong");
                                                    return N(s, yr),
                                                    ur(e, a),
                                                    mr(e),
                                                    br.value(a)
                                            }
                                            )(t, r, o))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    }),
                    D2: w.none(),
                    D3: w.some({
                            ui: w.none(),
                            repair: (t,r,o,a)=>{
                                    e.undoManager.transact((()=>{
                                            a((e=>{
                                                    const t = W(_e(e));
                                                    return E(t, he("a")).fold((()=>br.error({
                                                            errorMessage: "Failed to find previous link",
                                                            repairErrorData: {}
                                                    })), (r=>{
                                                            for (const e of t) {
                                                                    if (Ce(e, r))
                                                                            break;
                                                                    ue(e) && mr(e)
                                                            }
                                                            const o = Ne(e);
                                                            return hr(r, o),
                                                            mr(e),
                                                            br.value(r)
                                                    }
                                                    ))
                                            }
                                            )(t))
                                    }
                                    ))
                            }
                            ,
                            shouldDisableRepair: w.none(),
                            onChange: w.none()
                    })
            };
            return e=>r.hasOwnProperty(e) ? r[e] : w.none()
    }
      , Wr = (t,r)=>{
            const o = (()=>{
                    const t = (t=>{
                            const r = e(w.none())
                              , o = ()=>r.get().each(t);
                            return {
                                    clear: ()=>{
                                            o(),
                                            r.set(w.none())
                                    }
                                    ,
                                    isSet: ()=>r.get().isSome(),
                                    get: ()=>r.get(),
                                    set: e=>{
                                            o(),
                                            r.set(w.some(e))
                                    }
                            }
                    }
                    )(d);
                    return {
                            ...t,
                            on: e=>t.get().each(e)
                    }
            }
            )()
              , a = ()=>{
                    o.clear(),
                    r.clear()
            }
              , n = ()=>{
                    const e = ((e,t,r,o,a)=>t.scan().fold((()=>e(ir(o, a))), (n=>e(cr(n, t, r, w.none(), o, a)))))((e=>t.windowManager.open(e, {
                            inline: "toolbar",
                            ariaAttrs: !0
                    })), r, Rr(t), t, a);
                    o.set(e)
            }
              , i = e=>e.close();
            return t.ui.registry.addButton("a11ycheck", {
                    tooltip: X("a11y.control.tooltip"),
                    icon: "accessibility-check",
                    onAction: n
            }),
            t.ui.registry.addMenuItem("a11ycheck", {
                    icon: "accessibility-check",
                    text: X("a11y.control.menutext"),
                    onAction: n
            }),
            ()=>o.get().fold(n, i)
    }
    ;
    tinymce.PluginManager.requireLangPack("a11ychecker", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_PT,pt_BR,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_TW,zh_CN"),
    tinymce.PluginManager.add("a11ychecker", ((e,t)=>{
            if (((e,t)=>!!e && -1 === ((e,t)=>{
                    const r = f(e.major, t.major);
                    if (0 !== r)
                            return r;
                    const o = f(e.minor, t.minor);
                    if (0 !== o)
                            return o;
                    const a = f(e.patch, t.patch);
                    return 0 !== a ? a : 0
            }
            )((e=>x((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), x(t)))(tinymce, "6.3.0"))
                    return console.error('The "a11ychecker" plugin requires at least version 6.3.0 of TinyMCE.'),
                    {};
            ((e,t)=>{
                    const r = e.options.register;
                    r("a11ychecker_css_url", {
                            processor: "string",
                            default: t + "/css/annotations.css"
                    }),
                    r("a11ychecker_allow_decorative_images", {
                            processor: "boolean"
                    });
                    const a = [$(), G(), P()];
                    r("a11ychecker_level", {
                            processor: e=>o(e) && D(a, e),
                            default: G()
                    });
                    const n = [H(), q()];
                    r("a11ychecker_html_version", {
                            processor: e=>o(e) && D(n, e),
                            default: q()
                    }),
                    r("a11ychecker_issue_url_callback", {
                            processor: "function",
                            default: e=>`https://www.tiny.cloud/docs/tinymce/${tinymce.majorVersion}/a11ychecker/#${e}`
                    }),
                    r("a11ychecker_ignored_rules", {
                            processor: "string",
                            default: ""
                    }),
                    r("a11ychecker_filter_issue", {
                            processor: "function",
                            default: v
                    })
            }
            )(e, t);
            const r = Zt(e)
              , a = j(e)
              , n = Wr(e, r);
            return e.on("init", (()=>{
                    e.dom.loadCSS(a)
            }
            )),
            {
                    getReport: r.getReport,
                    toggleaudit: n
            }
    }
    ))
}();

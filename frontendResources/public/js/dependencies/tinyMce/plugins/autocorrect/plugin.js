/*!
 * Tiny Spelling Autocorrect plugin
 *
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 1.0.1-54
 */

!function() {
        "use strict";
        const t = t=>parseInt(t, 10)
          , e = (t,e)=>{
                const r = t - e;
                return 0 === r ? 0 : r > 0 ? 1 : -1
        }
          , r = (t,e,r)=>({
                major: t,
                minor: e,
                patch: r
        })
          , o = e=>{
                const o = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
                return o ? r(t(o[1]), t(o[2]), t(o[3])) : r(0, 0, 0)
        }
          , n = t=>e=>e.options.get(t)
          , a = n("autocorrect_capitalize")
          , s = n("autocorrect_autocorrect")
          , c = ("array",
        t=>"array" === (t=>{
                const e = typeof t;
                return null === t ? "null" : "object" === e && Array.isArray(t) ? "array" : "object" === e && (r = o = t,
                (n = String).prototype.isPrototypeOf(r) || (null === (a = o.constructor) || void 0 === a ? void 0 : a.name) === n.name) ? "string" : e;
                var r, o, n, a
        }
        )(t));
        const i = (void 0,
        t=>undefined === t);
        const u = t=>"function" == typeof t;
        class l {
                constructor(t, e) {
                        this.tag = t,
                        this.value = e
                }
                static some(t) {
                        return new l(!0,t)
                }
                static none() {
                        return l.singletonNone
                }
                fold(t, e) {
                        return this.tag ? e(this.value) : t()
                }
                isSome() {
                        return this.tag
                }
                isNone() {
                        return !this.tag
                }
                map(t) {
                        return this.tag ? l.some(t(this.value)) : l.none()
                }
                bind(t) {
                        return this.tag ? t(this.value) : l.none()
                }
                exists(t) {
                        return this.tag && t(this.value)
                }
                forall(t) {
                        return !this.tag || t(this.value)
                }
                filter(t) {
                        return !this.tag || t(this.value) ? this : l.none()
                }
                getOr(t) {
                        return this.tag ? this.value : t
                }
                or(t) {
                        return this.tag ? this : t
                }
                getOrThunk(t) {
                        return this.tag ? this.value : t()
                }
                orThunk(t) {
                        return this.tag ? this : t()
                }
                getOrDie(t) {
                        if (this.tag)
                                return this.value;
                        throw new Error(null != t ? t : "Called getOrDie on None")
                }
                static from(t) {
                        return null == t ? l.none() : l.some(t)
                }
                getOrNull() {
                        return this.tag ? this.value : null
                }
                getOrUndefined() {
                        return this.value
                }
                each(t) {
                        this.tag && t(this.value)
                }
                toArray() {
                        return this.tag ? [this.value] : []
                }
                toString() {
                        return this.tag ? `some(${this.value})` : "none()"
                }
        }
        l.singletonNone = new l(!1);
        const p = (t,e,r)=>"" === e || t.length >= e.length && t.substr(r, r + e.length) === e
          , g = t=>"" === t ? "" : t.charAt(0).toUpperCase() + t.substring(1)
          , h = (t,e)=>p(t, e, 0)
          , d = (t,e)=>p(t, e, t.length - e.length)
          , m = "AutocorrectStart AutocorrectEnd"
          , f = "CapitalizeStart CapitalizeEnd"
          , y = t=>{
                t.dispatch("AutocorrectStart")
        }
          , v = t=>{
                t.dispatch("AutocorrectEnd")
        }
          , T = t=>t.dispatch("CapitalizeStart")
          , _ = t=>t.dispatch("CapitalizeEnd")
          , w = (t,e,r)=>{
                (r.cache ? e.autocorrect().setAndCache : e.autocorrect().set)(r.on),
                (r.on ? y : v)(t)
        }
          , x = (t,e,r)=>{
                (r.cache ? e.capitalize().setAndCache : e.capitalize().set)(r.on),
                (r.on ? T : _)(t)
        }
          , O = t=>{
                let e = t;
                return {
                        get: ()=>e,
                        set: t=>{
                                e = t
                        }
                }
        }
          , b = ()=>{}
          , S = t=>()=>t
          , k = t=>t
          , z = t=>t()
          , A = S(!1)
          , C = S(!0)
          , E = Object.keys
          , j = (t,e)=>{
                const r = E(t);
                for (let o = 0, n = r.length; o < n; o++) {
                        const n = r[o];
                        e(t[n], n)
                }
        }
          , N = Array.prototype.push
          , R = {
                normalisation: [new RegExp(["([A-Z][A-Z]+)", "([a-z]+)", "(\\s*)", "$"].join(""))],
                capitalisation: [new RegExp(["([.?!]\\s+)", "([a-z][^\\s]+)", "(\\s*)", "$"].join("")), new RegExp(["^()", "([a-z][^\\s]*)", "(\\s*)", "$"].join(""))],
                autocorrect: [new RegExp(["(^|\\W)", "(\\w+)", "(\\W*)", "(\\s*)", "$"].join(""))]
        }
          , I = t=>{
                const e = ["all", "start", "word", "endOfWord", "space"];
                return {
                        regexes: R.autocorrect,
                        identify: r=>{
                                if (r && r.length >= e.length) {
                                        const e = r[2]
                                          , o = r[3] + r[4]
                                          , n = e + o;
                                        return t.lookup(e).map((t=>({
                                                start: n,
                                                replacement: t + o
                                        })))
                                }
                                return l.none()
                        }
                }
        }
          , J = (t,e)=>(t=>{
                const e = [];
                for (let r = 0, o = t.length; r < o; ++r) {
                        if (!c(t[r]))
                                throw new Error("Arr.flatten item " + r + " was not an array, input: " + t);
                        N.apply(e, t[r])
                }
                return e
        }
        )(((t,e)=>{
                const r = t.length
                  , o = new Array(r);
                for (let n = 0; n < r; n++) {
                        const r = t[n];
                        o[n] = e(r, n)
                }
                return o
        }
        )(e, (e=>((t,e)=>{
                for (let r = 0; r < t.length; r++) {
                        const o = e(t[r]);
                        if (o.isSome())
                                return o
                }
                return l.none()
        }
        )(e.regexes, (r=>{
                const o = t.match(r);
                return null !== o ? e.identify(o) : l.none()
        }
        )).toArray())));
        var P;
        !function(t) {
                t.JSON = "json",
                t.Blob = "blob",
                t.Text = "text",
                t.FormData = "formdata",
                t.MultipartFormData = "multipart/form-data"
        }(P || (P = {}));
        const F = t=>{
                let e = l.none()
                  , r = [];
                const o = t=>{
                        n() ? a(t) : r.push(t)
                }
                  , n = ()=>e.isSome()
                  , a = t=>{
                        e.each((e=>{
                                setTimeout((()=>{
                                        t(e)
                                }
                                ), 0)
                        }
                        ))
                }
                ;
                return t((t=>{
                        n() || (e = l.some(t),
                        ((t,e)=>{
                                for (let r = 0, o = t.length; r < o; r++)
                                        e(t[r], r)
                        }
                        )(r, a),
                        r = [])
                }
                )),
                {
                        get: o,
                        map: t=>F((e=>{
                                o((r=>{
                                        e(t(r))
                                }
                                ))
                        }
                        )),
                        isReady: n
                }
        }
          , D = {
                nu: F,
                pure: t=>F((e=>{
                        e(t)
                }
                ))
        }
          , q = t=>{
                setTimeout((()=>{
                        throw t
                }
                ), 0)
        }
          , M = t=>{
                const e = e=>{
                        t().then(e, q)
                }
                ;
                return {
                        map: e=>M((()=>t().then(e))),
                        bind: e=>M((()=>t().then((t=>e(t).toPromise())))),
                        anonBind: e=>M((()=>t().then((()=>e.toPromise())))),
                        toLazy: ()=>D.nu(e),
                        toCached: ()=>{
                                let e = null;
                                return M((()=>(null === e && (e = t()),
                                e)))
                        }
                        ,
                        toPromise: t,
                        get: e
                }
        }
          , $ = t=>M((()=>new Promise(t)))
          , B = t=>M((()=>Promise.resolve(t)))
          , H = t=>{
                const e = e=>e(t)
                  , r = S(t)
                  , o = ()=>n
                  , n = {
                        tag: !0,
                        inner: t,
                        fold: (e,r)=>r(t),
                        isValue: C,
                        isError: A,
                        map: e=>U.value(e(t)),
                        mapError: o,
                        bind: e,
                        exists: e,
                        forall: e,
                        getOr: r,
                        or: o,
                        getOrThunk: r,
                        orThunk: o,
                        getOrDie: r,
                        each: e=>{
                                e(t)
                        }
                        ,
                        toOptional: ()=>l.some(t)
                };
                return n
        }
          , L = t=>{
                const e = ()=>r
                  , r = {
                        tag: !1,
                        inner: t,
                        fold: (e,r)=>e(t),
                        isValue: A,
                        isError: C,
                        map: e,
                        mapError: e=>U.error(e(t)),
                        bind: e,
                        exists: A,
                        forall: C,
                        getOr: k,
                        or: k,
                        getOrThunk: z,
                        orThunk: z,
                        getOrDie: (o = String(t),
                        ()=>{
                                throw new Error(o)
                        }
                        ),
                        each: b,
                        toOptional: l.none
                };
                var o;
                return r
        }
          , U = {
                value: H,
                error: L,
                fromOption: (t,e)=>t.fold((()=>L(e)), H)
        }
          , V = t=>({
                ...t,
                toCached: ()=>V(t.toCached()),
                bindFuture: e=>V(t.bind((t=>t.fold((t=>B(U.error(t))), (t=>e(t)))))),
                bindResult: e=>V(t.map((t=>t.bind(e)))),
                mapResult: e=>V(t.map((t=>t.map(e)))),
                mapError: e=>V(t.map((t=>t.mapError(e)))),
                foldResult: (e,r)=>t.map((t=>t.fold(e, r))),
                withTimeout: (e,r)=>V($((o=>{
                        let n = !1;
                        const a = setTimeout((()=>{
                                n = !0,
                                o(U.error(r()))
                        }
                        ), e);
                        t.get((t=>{
                                n || (clearTimeout(a),
                                o(t))
                        }
                        ))
                }
                )))
        })
          , W = t=>V($(t))
          , K = t=>V(B(U.value(t)))
          , Z = "undefined" != typeof window ? window : Function("return this;")()
          , G = t=>$((e=>{
                const r = new FileReader;
                r.onload = t=>{
                        const r = t.target ? t.target.result : "";
                        e(r)
                }
                ,
                r.readAsText(t)
        }
        ))
          , X = t=>{
                try {
                        const e = JSON.parse(t);
                        return U.value(e)
                } catch (t) {
                        return U.error("Response was not JSON.")
                }
        }
          , Q = t=>B(t.response)
          , Y = (t,e)=>e.map((e=>{
                const r = ((t,e)=>{
                        const r = [];
                        return j(t, ((t,e)=>{
                                var o;
                                r.push((o = t,
                                encodeURIComponent(e) + "=" + encodeURIComponent(o)))
                        }
                        )),
                        r
                }
                )(e)
                  , o = ((t,e,r=0,o)=>{
                        const n = t.indexOf(e, r);
                        return -1 !== n && (!!i(o) || n + e.length <= o)
                }
                )(t, "?") ? "&" : "?";
                return r.length > 0 ? t + o + r.join("&") : t
        }
        )).getOr(t)
          , tt = t=>W((e=>{
                const r = new XMLHttpRequest;
                r.open(t.method, Y(t.url, l.from(t.query)), !0);
                const o = (t=>{
                        const e = (r = t.body,
                        l.from(r).bind((t=>{
                                switch (t.type) {
                                case P.JSON:
                                        return l.some("application/json");
                                case P.FormData:
                                        return l.some("application/x-www-form-urlencoded; charset=UTF-8");
                                case P.MultipartFormData:
                                        return l.none();
                                case P.Text:
                                default:
                                        return l.some("text/plain")
                                }
                        }
                        )));
                        var r;
                        const o = !0 === t.credentials ? l.some(!0) : l.none()
                          , n = (t=>{
                                switch (t) {
                                case P.Blob:
                                        return "application/octet-stream";
                                case P.JSON:
                                        return "application/json, text/javascript";
                                case P.Text:
                                        return "text/plain";
                                default:
                                        return ""
                                }
                        }
                        )(t.responseType) + ", */*; q=0.01"
                          , a = void 0 !== t.headers ? t.headers : {};
                        return {
                                contentType: e,
                                responseType: (t=>{
                                        switch (t) {
                                        case P.JSON:
                                                return l.none();
                                        case P.Blob:
                                                return l.some("blob");
                                        case P.Text:
                                                return l.some("text");
                                        default:
                                                return l.none()
                                        }
                                }
                                )(t.responseType),
                                credentials: o,
                                accept: n,
                                headers: a,
                                progress: u(t.progress) ? l.some(t.progress) : l.none()
                        }
                }
                )(t);
                ((t,e)=>{
                        e.contentType.each((e=>t.setRequestHeader("Content-Type", e))),
                        t.setRequestHeader("Accept", e.accept),
                        e.credentials.each((e=>t.withCredentials = e)),
                        e.responseType.each((e=>t.responseType = e)),
                        e.progress.each((e=>t.upload.addEventListener("progress", (t=>e(t.loaded, t.total))))),
                        j(e.headers, ((e,r)=>t.setRequestHeader(r, e)))
                }
                )(r, o);
                const n = ()=>{
                        ((t,e,r)=>((t,e)=>{
                                switch (t) {
                                case P.JSON:
                                        return X(e.response).fold((()=>Q(e)), B);
                                case P.Blob:
                                        return (t=>l.from(t.response).map(G).getOr(B("no response content")))(e);
                                case P.Text:
                                default:
                                        return Q(e)
                                }
                        }
                        )(e, r).map((e=>({
                                message: 0 === r.status ? "Unknown HTTP error (possible cross-domain request)" : `Could not load url ${t}: ${r.statusText}`,
                                status: r.status,
                                responseText: e
                        }))))(t.url, t.responseType, r).get((t=>e(U.error(t))))
                }
                ;
                var a;
                r.onerror = n,
                r.onload = ()=>{
                        0 !== r.status || h(t.url, "file:") ? r.status < 100 || r.status >= 400 ? n() : ((t,e)=>{
                                const r = t=>(t=>V(B(U.error(t))))({
                                        message: t,
                                        status: e.status,
                                        responseText: e.responseText
                                });
                                switch (t) {
                                case P.JSON:
                                        return X(e.response).fold(r, K);
                                case P.Blob:
                                case P.Text:
                                        return K(e.response);
                                default:
                                        return r("unknown data type")
                                }
                        }
                        )(t.responseType, r).get(e) : n()
                }
                ,
                (a = t.body,
                l.from(a).map((t=>t.type === P.JSON ? JSON.stringify(t.data) : t.type === P.FormData || t.type === P.MultipartFormData ? (t=>{
                        const e = new FormData;
                        return j(t, ((t,r)=>{
                                e.append(r, t)
                        }
                        )),
                        e
                }
                )(t.data) : t.data))).fold((()=>r.send()), (t=>{
                        r.send(t)
                }
                ))
        }
        ))
          , et = "2"
          , rt = (()=>{
                try {
                        const t = Z.localStorage
                          , e = "__storage_test__";
                        return t.setItem(e, e),
                        t.removeItem(e),
                        l.some(t)
                } catch (t) {
                        return l.none()
                }
        }
        )().fold((()=>{
                const t = {};
                return {
                        getItem: e=>t[e],
                        setItem: (e,r)=>{
                                t[e] = r
                        }
                }
        }
        ), (t=>({
                getItem: e=>t.getItem("mce." + e),
                setItem: (e,r)=>{
                        t.setItem("mce." + e, r)
                }
        })))
          , ot = (t,e)=>{
                const r = ((t,e)=>{
                        const r = (t=>l.from(rt.getItem(t)))(t).map(JSON.parse);
                        return r.getOr(e)
                }
                )(t, e)
                  , o = O(r)
                  , n = t=>{
                        o.set(t)
                }
                ;
                return {
                        get: ()=>o.get(),
                        set: n,
                        setAndCache: e=>{
                                n(e),
                                ((t,e)=>{
                                        const r = JSON.stringify(e);
                                        rt.setItem(t, r)
                                }
                                )(t, e)
                        }
                }
        }
        ;
        (()=>{
                tinymce.PluginManager.requireLangPack("autocorrect", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW");
                const t = t=>(t=>{
                        const e = O({});
                        return t.autocorrect().get((t=>{
                                t.fold((t=>{
                                        console.error("Error loading autocorrect list")
                                }
                                ), (t=>{
                                        const r = ((t,e)=>{
                                                const r = {};
                                                var o;
                                                return ((t,e,r,o)=>{
                                                        j(t, ((t,n)=>{
                                                                (e(t, n) ? r : o)(t, n)
                                                        }
                                                        ))
                                                }
                                                )(t, e, (o = r,
                                                (t,e)=>{
                                                        o[e] = t
                                                }
                                                ), b),
                                                r
                                        }
                                        )(t.corrections, ((t,e)=>!(1 === t.length && e.length > 1)));
                                        e.set(r)
                                }
                                ))
                        }
                        )),
                        {
                                lookup: t=>l.from(e.get()[t])
                        }
                }
                )((t=>{
                        const e = (t=>t.options.isSet("autocorrect_service_url") ? t.options.get("autocorrect_service_url") : t.options.get("autocorrect_rpc_url"))(t)
                          , r = (t=>t.options.isSet("autocorrect_api_key") ? t.options.get("autocorrect_api_key") : t.options.get("api_key"))(t);
                        var o;
                        const n = (a = {
                                url: `${[(o = e,
                                d(o, "/") ? ((t,e)=>t.substring(0, t.length - e))(o, "/".length) : o), et].join("/")}/autocorrect?apiKey=${r}`,
                                responseType: P.JSON,
                                credentials: !0
                        },
                        tt({
                                ...a,
                                method: "get",
                                body: {
                                        type: P.Text,
                                        data: ""
                                }
                        }));
                        var a;
                        return {
                                autocorrect: S(n)
                        }
                }
                )(t));
                tinymce.PluginManager.add("autocorrect", (r=>{
                        if (((t,r)=>!!t && -1 === ((t,r)=>{
                                const o = e(t.major, r.major);
                                if (0 !== o)
                                        return o;
                                const n = e(t.minor, r.minor);
                                if (0 !== n)
                                        return n;
                                const a = e(t.patch, r.patch);
                                return 0 !== a ? a : 0
                        }
                        )((t=>o((t=>[t.majorVersion, t.minorVersion].join(".").split(".").slice(0, 3).join("."))(t)))(t), o(r)))(tinymce, "6.2.0"))
                                return void console.error("The autocorrect plugin requires at least version 6.2.0 of TinyMCE.");
                        (t=>{
                                const e = t.options.register;
                                e("autocorrect_api_key", {
                                        processor: "string"
                                }),
                                e("autocorrect_rpc_url", {
                                        processor: "string",
                                        default: ""
                                }),
                                e("autocorrect_service_url", {
                                        processor: "string",
                                        default: ""
                                }),
                                e("autocorrect_capitalize", {
                                        processor: "boolean",
                                        default: !1
                                }),
                                e("autocorrect_autocorrect", {
                                        processor: "boolean",
                                        default: !0
                                })
                        }
                        )(r);
                        const n = (t=>{
                                const e = ot("autocorrect", t.autocorrect)
                                  , r = ot("capitalize", t.capitalize);
                                return {
                                        autocorrect: S(e),
                                        capitalize: S(r)
                                }
                        }
                        )({
                                autocorrect: s(r),
                                capitalize: a(r)
                        });
                        ((t,e)=>{
                                t.on("SpellcheckerLanguageChanged", (r=>{
                                        return o = r.language,
                                        void (h(o, "en") || (e.autocorrect().get() && w(t, e, {
                                                on: !1,
                                                cache: !1
                                        }),
                                        e.capitalize().get() && x(t, e, {
                                                on: !1,
                                                cache: !1
                                        })));
                                        var o
                                }
                                ))
                        }
                        )(r, n),
                        ((t,e)=>{
                                t.ui.registry.addToggleMenuItem("autocorrect", {
                                        text: "Autocorrect",
                                        onAction: ()=>{
                                                ((t,e)=>{
                                                        const r = e.autocorrect().get();
                                                        w(t, e, {
                                                                on: !r,
                                                                cache: !0
                                                        })
                                                }
                                                )(t, e)
                                        }
                                        ,
                                        onSetup: r=>{
                                                const o = ()=>r.setActive(e.autocorrect().get());
                                                return o(),
                                                t.on(m, o),
                                                ()=>t.off(m, o)
                                        }
                                }),
                                t.ui.registry.addToggleMenuItem("capitalization", {
                                        text: "Capitalization",
                                        onAction: ()=>{
                                                ((t,e)=>{
                                                        const r = e.capitalize().get();
                                                        x(t, e, {
                                                                on: !r,
                                                                cache: !0
                                                        })
                                                }
                                                )(t, e)
                                        }
                                        ,
                                        onSetup: r=>{
                                                const o = ()=>r.setActive(e.capitalize().get());
                                                return o(),
                                                t.on(f, o),
                                                ()=>t.off(f, o)
                                        }
                                })
                        }
                        )(r, n);
                        const c = ((t,e)=>({
                                lookupPatterns: r=>{
                                        const o = [...e.autocorrect().get() ? [I(t)] : [], ...e.capitalize().get() ? [{
                                                regexes: R.capitalisation,
                                                identify: t=>{
                                                        var e, r;
                                                        if (t.length >= 4) {
                                                                const o = (r = t[1],
                                                                d(r, "\ufeff") ? "\ufeff" : d(r, " ") ? " " : "")
                                                                  , n = o + t[2] + t[3]
                                                                  , a = o + g(t[2]) + (null !== (e = t[3]) && void 0 !== e ? e : "");
                                                                return l.some({
                                                                        start: n,
                                                                        replacement: a
                                                                })
                                                        }
                                                        return l.none()
                                                }
                                        }, {
                                                regexes: R.normalisation,
                                                identify: t=>{
                                                        var e;
                                                        if (t.length >= 4) {
                                                                const r = t[1] + t[2] + (null !== (e = t[3]) && void 0 !== e ? e : "")
                                                                  , o = g(r.toLowerCase());
                                                                return l.some({
                                                                        start: r,
                                                                        replacement: o
                                                                })
                                                        }
                                                        return l.none()
                                                }
                                        }] : []];
                                        return J(r, o)
                                }
                        }))(t(r), n)
                          , i = (t=>t.options.get("text_patterns_lookup"))(r);
                        r.options.set("text_patterns_lookup", (t=>{
                                const e = c.lookupPatterns(t.text);
                                return [...i(t), ...e]
                        }
                        ))
                }
                ))
        }
        )()
}();

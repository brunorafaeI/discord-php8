function e(e) {
  return Object.keys(e).reduce(((t,n)=>{
      const o = e[n];
      var a;
      return t[n] = Object.assign({}, o),
      r(o.value) && (a = o.value,
      "[object Function]" !== Object.prototype.toString.call(a)) && !Array.isArray(o.value) && (t[n].value = Object.assign({}, o.value)),
      Array.isArray(o.value) && (t[n].value = o.value.slice(0)),
      t
  }
  ), {})
}
function t(e) {
  if (e)
      try {
          return JSON.parse(e)
      } catch (t) {
          return e
      }
}
function n(e, t, n) {
  if (null == n || !1 === n)
      return e.removeAttribute(t);
  let r = JSON.stringify(n);
  e.__updating[t] = !0,
  "true" === r && (r = ""),
  e.setAttribute(t, r),
  Promise.resolve().then((()=>delete e.__updating[t]))
}
function r(e) {
  return null != e && ("object" == typeof e || "function" == typeof e)
}
let o;
function a(r, a) {
  const i = Object.keys(a);
  return class extends r {
      static get observedAttributes() {
          return i.map((e=>a[e].attribute))
      }
      constructor() {
          super(),
          this.__initialized = !1,
          this.__released = !1,
          this.__releaseCallbacks = [],
          this.__propertyChangedCallbacks = [],
          this.__updating = {},
          this.props = {}
      }
      connectedCallback() {
          if (this.__initialized)
              return;
          this.__releaseCallbacks = [],
          this.__propertyChangedCallbacks = [],
          this.__updating = {},
          this.props = function(r, o) {
              const a = e(o);
              return Object.keys(o).forEach((e=>{
                  const o = a[e]
                    , i = r.getAttribute(o.attribute)
                    , s = r[e];
                  i && (o.value = o.parse ? t(i) : i),
                  null != s && (o.value = Array.isArray(s) ? s.slice(0) : s),
                  o.reflect && n(r, o.attribute, o.value),
                  Object.defineProperty(r, e, {
                      get: ()=>o.value,
                      set(t) {
                          const r = o.value;
                          o.value = t,
                          o.reflect && n(this, o.attribute, o.value);
                          for (let n = 0, o = this.__propertyChangedCallbacks.length; n < o; n++)
                              this.__propertyChangedCallbacks[n](e, t, r)
                      },
                      enumerable: !0,
                      configurable: !0
                  })
              }
              )),
              a
          }(this, a);
          const r = function(e) {
              return Object.keys(e).reduce(((t,n)=>(t[n] = e[n].value,
              t)), {})
          }(this.props)
            , i = this.Component
            , s = o;
          try {
              o = this,
              this.__initialized = !0,
              "function" == typeof (l = i) && 0 === l.toString().indexOf("class") ? new i(r,{
                  element: this
              }) : i(r, {
                  element: this
              })
          } finally {
              o = s
          }
          var l
      }
      async disconnectedCallback() {
          if (await Promise.resolve(),
          this.isConnected)
              return;
          this.__propertyChangedCallbacks.length = 0;
          let e = null;
          for (; e = this.__releaseCallbacks.pop(); )
              e(this);
          delete this.__initialized,
          this.__released = !0
      }
      attributeChangedCallback(e, n, r) {
          if (this.__initialized && !this.__updating[e] && (e = this.lookupProp(e))in a) {
              if (null == r && !this[e])
                  return;
              this[e] = a[e].parse ? t(r) : r
          }
      }
      lookupProp(e) {
          if (a)
              return i.find((t=>e === t || e === a[t].attribute))
      }
      get renderRoot() {
          return this.shadowRoot || this.attachShadow({
              mode: "open"
          })
      }
      addReleaseCallback(e) {
          this.__releaseCallbacks.push(e)
      }
      addPropertyChangedCallback(e) {
          this.__propertyChangedCallbacks.push(e)
      }
  }
}
function i(e, t={}, n={}) {
  const {BaseElement: o=HTMLElement, extension: i} = n;
  return n=>{
      if (!e)
          throw new Error("tag is required to register a Component");
      let s = customElements.get(e);
      return s ? (s.prototype.Component = n,
      s) : (s = a(o, function(e) {
          return e ? Object.keys(e).reduce(((t,n)=>{
              const o = e[n];
              return t[n] = r(o) && "value"in o ? o : {
                  value: o
              },
              t[n].attribute || (t[n].attribute = n.replace(/\.?([A-Z]+)/g, ((e,t)=>"-" + t.toLowerCase())).replace("_", "-").replace(/^-/, "")),
              t[n].parse = "parse"in t[n] ? t[n].parse : "string" != typeof t[n].value,
              t
          }
          ), {}) : {}
      }(t)),
      s.prototype.Component = n,
      s.prototype.registeredTag = e,
      customElements.define(e, s, i),
      s)
  }
}
const s = Symbol("solid-proxy")
, l = Symbol("solid-track")
, c = {
  equals: (e,t)=>e === t
};
let d = M;
const u = 1
, p = 2
, h = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var f = null;
let g = null
, m = null
, b = null
, y = null
, v = 0;
function w(e, t) {
  const n = m
    , r = f
    , o = 0 === e.length
    , a = o ? h : {
      owned: null,
      cleanups: null,
      context: null,
      owner: void 0 === t ? r : t
  }
    , i = o ? e : ()=>e((()=>S((()=>B(a)))));
  f = a,
  m = null;
  try {
      return j(i, !0)
  } finally {
      m = n,
      f = r
  }
}
function _(e, t) {
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: (t = t ? Object.assign({}, c, t) : c).equals || void 0
  };
  return [E.bind(n), e=>("function" == typeof e && (e = e(n.value)),
  P(n, e))]
}
function x(e, t, n) {
  A(O(e, t, !1, u))
}
function k(e, t, n) {
  d = L;
  const r = O(e, t, !1, u);
  n && n.render || (r.user = !0),
  y ? y.push(r) : A(r)
}
function C(e, t, n) {
  n = n ? Object.assign({}, c, n) : c;
  const r = O(e, t, !0, 0);
  return r.observers = null,
  r.observerSlots = null,
  r.comparator = n.equals || void 0,
  A(r),
  E.bind(r)
}
function S(e) {
  if (null === m)
      return e();
  const t = m;
  m = null;
  try {
      return e()
  } finally {
      m = t
  }
}
function T(e) {
  k((()=>S(e)))
}
function $(e) {
  return null === f || (null === f.cleanups ? f.cleanups = [e] : f.cleanups.push(e)),
  e
}
function I(e) {
  const t = C(e)
    , n = C((()=>D(t())));
  return n.toArray = ()=>{
      const e = n();
      return Array.isArray(e) ? e : null != e ? [e] : []
  }
  ,
  n
}
function E() {
  if (this.sources && this.state)
      if (this.state === u)
          A(this);
      else {
          const e = b;
          b = null,
          j((()=>R(this)), !1),
          b = e
      }
  if (m) {
      const e = this.observers ? this.observers.length : 0;
      m.sources ? (m.sources.push(this),
      m.sourceSlots.push(e)) : (m.sources = [this],
      m.sourceSlots = [e]),
      this.observers ? (this.observers.push(m),
      this.observerSlots.push(m.sources.length - 1)) : (this.observers = [m],
      this.observerSlots = [m.sources.length - 1])
  }
  return this.value
}
function P(e, t, n) {
  let r = e.value;
  return e.comparator && e.comparator(r, t) || (e.value = t,
  e.observers && e.observers.length && j((()=>{
      for (let t = 0; t < e.observers.length; t += 1) {
          const n = e.observers[t]
            , r = g && g.running;
          r && g.disposed.has(n),
          (r ? n.tState : n.state) || (n.pure ? b.push(n) : y.push(n),
          n.observers && Z(n)),
          r || (n.state = u)
      }
      if (b.length > 1e6)
          throw b = [],
          new Error
  }
  ), !1)),
  t
}
function A(e) {
  if (!e.fn)
      return;
  B(e);
  const t = f
    , n = m
    , r = v;
  m = f = e,
  function(e, t, n) {
      let r;
      try {
          r = e.fn(t)
      } catch (t) {
          return e.pure && (e.state = u,
          e.owned && e.owned.forEach(B),
          e.owned = null),
          e.updatedAt = n + 1,
          z(t)
      }
      (!e.updatedAt || e.updatedAt <= n) && (null != e.updatedAt && "observers"in e ? P(e, r) : e.value = r,
      e.updatedAt = n)
  }(e, e.value, r),
  m = n,
  f = t
}
function O(e, t, n, r=u, o) {
  const a = {
      fn: e,
      state: r,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: t,
      owner: f,
      context: null,
      pure: n
  };
  return null === f || f !== h && (f.owned ? f.owned.push(a) : f.owned = [a]),
  a
}
function N(e) {
  if (0 === e.state)
      return;
  if (e.state === p)
      return R(e);
  if (e.suspense && S(e.suspense.inFallback))
      return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < v); )
      e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
      if ((e = t[n]).state === u)
          A(e);
      else if (e.state === p) {
          const n = b;
          b = null,
          j((()=>R(e, t[0])), !1),
          b = n
      }
}
function j(e, t) {
  if (b)
      return e();
  let n = !1;
  t || (b = []),
  y ? n = !0 : y = [],
  v++;
  try {
      const t = e();
      return function(e) {
          b && (M(b),
          b = null);
          if (e)
              return;
          const t = y;
          y = null,
          t.length && j((()=>d(t)), !1)
      }(n),
      t
  } catch (e) {
      n || (y = null),
      b = null,
      z(e)
  }
}
function M(e) {
  for (let t = 0; t < e.length; t++)
      N(e[t])
}
function L(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
      const r = e[t];
      r.user ? e[n++] = r : N(r)
  }
  for (t = 0; t < n; t++)
      N(e[t])
}
function R(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
      const r = e.sources[n];
      if (r.sources) {
          const e = r.state;
          e === u ? r !== t && (!r.updatedAt || r.updatedAt < v) && N(r) : e === p && R(r, t)
      }
  }
}
function Z(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
      const n = e.observers[t];
      n.state || (n.state = p,
      n.pure ? b.push(n) : y.push(n),
      n.observers && Z(n))
  }
}
function B(e) {
  let t;
  if (e.sources)
      for (; e.sources.length; ) {
          const t = e.sources.pop()
            , n = e.sourceSlots.pop()
            , r = t.observers;
          if (r && r.length) {
              const e = r.pop()
                , o = t.observerSlots.pop();
              n < r.length && (e.sourceSlots[o] = n,
              r[n] = e,
              t.observerSlots[n] = o)
          }
      }
  if (e.owned) {
      for (t = e.owned.length - 1; t >= 0; t--)
          B(e.owned[t]);
      e.owned = null
  }
  if (e.cleanups) {
      for (t = e.cleanups.length - 1; t >= 0; t--)
          e.cleanups[t]();
      e.cleanups = null
  }
  e.state = 0,
  e.context = null
}
function z(e) {
  throw e
}
function D(e) {
  if ("function" == typeof e && !e.length)
      return D(e());
  if (Array.isArray(e)) {
      const t = [];
      for (let n = 0; n < e.length; n++) {
          const r = D(e[n]);
          Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
      }
      return t
  }
  return e
}
const U = Symbol("fallback");
function V(e) {
  for (let t = 0; t < e.length; t++)
      e[t]()
}
function F(e, t) {
  return S((()=>e(t || {})))
}
function H() {
  return !0
}
const G = {
  get: (e,t,n)=>t === s ? n : e.get(t),
  has: (e,t)=>t === s || e.has(t),
  set: H,
  deleteProperty: H,
  getOwnPropertyDescriptor: (e,t)=>({
      configurable: !0,
      enumerable: !0,
      get: ()=>e.get(t),
      set: H,
      deleteProperty: H
  }),
  ownKeys: e=>e.keys()
};
function K(e) {
  return (e = "function" == typeof e ? e() : e) ? e : {}
}
function q(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
      const r = e[n];
      t = t || !!r && s in r,
      e[n] = "function" == typeof r ? (t = !0,
      C(r)) : r
  }
  if (t)
      return new Proxy({
          get(t) {
              for (let n = e.length - 1; n >= 0; n--) {
                  const r = K(e[n])[t];
                  if (void 0 !== r)
                      return r
              }
          },
          has(t) {
              for (let n = e.length - 1; n >= 0; n--)
                  if (t in K(e[n]))
                      return !0;
              return !1
          },
          keys() {
              const t = [];
              for (let n = 0; n < e.length; n++)
                  t.push(...Object.keys(K(e[n])));
              return [...new Set(t)]
          }
      },G);
  const n = {};
  for (let t = e.length - 1; t >= 0; t--)
      if (e[t]) {
          const r = Object.getOwnPropertyDescriptors(e[t]);
          for (const t in r)
              t in n || Object.defineProperty(n, t, {
                  enumerable: !0,
                  get() {
                      for (let n = e.length - 1; n >= 0; n--) {
                          const r = (e[n] || {})[t];
                          if (void 0 !== r)
                              return r
                      }
                  }
              })
      }
  return n
}
function W(e, ...t) {
  const n = new Set(t.length > 1 ? t.flat() : t[0]);
  if (s in e) {
      const r = t.map((t=>new Proxy({
          get: n=>t.includes(n) ? e[n] : void 0,
          has: n=>t.includes(n) && n in e,
          keys: ()=>t.filter((t=>t in e))
      },G)));
      return r.push(new Proxy({
          get: t=>n.has(t) ? void 0 : e[t],
          has: t=>!n.has(t) && t in e,
          keys: ()=>Object.keys(e).filter((e=>!n.has(e)))
      },G)),
      r
  }
  const r = Object.getOwnPropertyDescriptors(e);
  return t.push(Object.keys(r).filter((e=>!n.has(e)))),
  t.map((t=>{
      const n = {};
      for (let o = 0; o < t.length; o++) {
          const a = t[o];
          a in e && Object.defineProperty(n, a, r[a] ? r[a] : {
              get: ()=>e[a],
              set: ()=>!0,
              enumerable: !0
          })
      }
      return n
  }
  ))
}
const Y = e=>`Stale read from <${e}>.`;
function J(e) {
  const t = "fallback"in e && {
      fallback: ()=>e.fallback
  };
  return C(function(e, t, n={}) {
      let r = []
        , o = []
        , a = []
        , i = 0
        , s = t.length > 1 ? [] : null;
      return $((()=>V(a))),
      ()=>{
          let c, d, u = e() || [];
          return u[l],
          S((()=>{
              let e, t, l, h, f, g, m, b, y, v = u.length;
              if (0 === v)
                  0 !== i && (V(a),
                  a = [],
                  r = [],
                  o = [],
                  i = 0,
                  s && (s = [])),
                  n.fallback && (r = [U],
                  o[0] = w((e=>(a[0] = e,
                  n.fallback()))),
                  i = 1);
              else if (0 === i) {
                  for (o = new Array(v),
                  d = 0; d < v; d++)
                      r[d] = u[d],
                      o[d] = w(p);
                  i = v
              } else {
                  for (l = new Array(v),
                  h = new Array(v),
                  s && (f = new Array(v)),
                  g = 0,
                  m = Math.min(i, v); g < m && r[g] === u[g]; g++)
                      ;
                  for (m = i - 1,
                  b = v - 1; m >= g && b >= g && r[m] === u[b]; m--,
                  b--)
                      l[b] = o[m],
                      h[b] = a[m],
                      s && (f[b] = s[m]);
                  for (e = new Map,
                  t = new Array(b + 1),
                  d = b; d >= g; d--)
                      y = u[d],
                      c = e.get(y),
                      t[d] = void 0 === c ? -1 : c,
                      e.set(y, d);
                  for (c = g; c <= m; c++)
                      y = r[c],
                      d = e.get(y),
                      void 0 !== d && -1 !== d ? (l[d] = o[c],
                      h[d] = a[c],
                      s && (f[d] = s[c]),
                      d = t[d],
                      e.set(y, d)) : a[c]();
                  for (d = g; d < v; d++)
                      d in l ? (o[d] = l[d],
                      a[d] = h[d],
                      s && (s[d] = f[d],
                      s[d](d))) : o[d] = w(p);
                  o = o.slice(0, i = v),
                  r = u.slice(0)
              }
              return o
          }
          ));
          function p(e) {
              if (a[d] = e,
              s) {
                  const [e,n] = _(d);
                  return s[d] = n,
                  t(u[d], e)
              }
              return t(u[d])
          }
      }
  }((()=>e.each), e.children, t || void 0))
}
function X(e) {
  const t = e.keyed
    , n = C((()=>e.when), void 0, {
      equals: (e,n)=>t ? e === n : !e == !n
  });
  return C((()=>{
      const r = n();
      if (r) {
          const o = e.children;
          return "function" == typeof o && o.length > 0 ? S((()=>o(t ? r : ()=>{
              if (!S(n))
                  throw Y("Show");
              return e.when
          }
          ))) : o
      }
      return e.fallback
  }
  ), void 0, void 0)
}
function Q(e) {
  let t = !1;
  const n = I((()=>e.children))
    , r = C((()=>{
      let e = n();
      Array.isArray(e) || (e = [e]);
      for (let n = 0; n < e.length; n++) {
          const r = e[n].when;
          if (r)
              return t = !!e[n].keyed,
              [n, r, e[n]]
      }
      return [-1]
  }
  ), void 0, {
      equals: (e,n)=>e[0] === n[0] && (t ? e[1] === n[1] : !e[1] == !n[1]) && e[2] === n[2]
  });
  return C((()=>{
      const [n,o,a] = r();
      if (n < 0)
          return e.fallback;
      const i = a.children;
      return "function" == typeof i && i.length > 0 ? S((()=>i(t ? o : ()=>{
          if (S(r)[0] !== n)
              throw Y("Match");
          return a.when
      }
      ))) : i
  }
  ), void 0, void 0)
}
function ee(e) {
  return e
}
const te = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"])
, ne = new Set(["innerHTML", "textContent", "innerText", "children"])
, re = Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
})
, oe = Object.assign(Object.create(null), {
  class: "className",
  formnovalidate: {
      $: "formNoValidate",
      BUTTON: 1,
      INPUT: 1
  },
  ismap: {
      $: "isMap",
      IMG: 1
  },
  nomodule: {
      $: "noModule",
      SCRIPT: 1
  },
  playsinline: {
      $: "playsInline",
      VIDEO: 1
  },
  readonly: {
      $: "readOnly",
      INPUT: 1,
      TEXTAREA: 1
  }
});
const ae = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"])
, ie = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
const se = "_$DX_DELEGATE";
function le(e, t, n) {
  let r;
  const o = ()=>{
      const t = document.createElement("template");
      return t.innerHTML = e,
      n ? t.content.firstChild.firstChild : t.content.firstChild
  }
    , a = t ? ()=>(r || (r = o())).cloneNode(!0) : ()=>S((()=>document.importNode(r || (r = o()), !0)));
  return a.cloneNode = a,
  a
}
function ce(e, t=window.document) {
  const n = t[se] || (t[se] = new Set);
  for (let r = 0, o = e.length; r < o; r++) {
      const o = e[r];
      n.has(o) || (n.add(o),
      t.addEventListener(o, be))
  }
}
function de(e, t, n) {
  null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
}
function ue(e, t) {
  null == t ? e.removeAttribute("class") : e.className = t
}
function pe(e, t={}, n, r) {
  const o = {};
  return r || x((()=>o.children = ye(e, t.children, o.children))),
  x((()=>t.ref && t.ref(e))),
  x((()=>function(e, t, n, r, o={}, a=!1) {
      t || (t = {});
      for (const r in o)
          if (!(r in t)) {
              if ("children" === r)
                  continue;
              o[r] = me(e, r, null, o[r], n, a)
          }
      for (const i in t) {
          if ("children" === i) {
              r || ye(e, t.children);
              continue
          }
          const s = t[i];
          o[i] = me(e, i, s, o[i], n, a)
      }
  }(e, t, n, !0, o, !0))),
  o
}
function he(e, t, n) {
  return S((()=>e(t, n)))
}
function fe(e, t, n, r) {
  if (void 0 === n || r || (r = []),
  "function" != typeof t)
      return ye(e, t, r, n);
  x((r=>ye(e, t(), r, n)), r)
}
function ge(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let t = 0, o = r.length; t < o; t++)
      e.classList.toggle(r[t], n)
}
function me(e, t, n, r, o, a) {
  let i, s, l, c, d;
  if ("style" === t)
      return function(e, t, n) {
          if (!t)
              return n ? de(e, "style") : t;
          const r = e.style;
          if ("string" == typeof t)
              return r.cssText = t;
          let o, a;
          for (a in "string" == typeof n && (r.cssText = n = void 0),
          n || (n = {}),
          t || (t = {}),
          n)
              null == t[a] && r.removeProperty(a),
              delete n[a];
          for (a in t)
              o = t[a],
              o !== n[a] && (r.setProperty(a, o),
              n[a] = o);
          return n
      }(e, n, r);
  if ("classList" === t)
      return function(e, t, n={}) {
          const r = Object.keys(t || {})
            , o = Object.keys(n);
          let a, i;
          for (a = 0,
          i = o.length; a < i; a++) {
              const r = o[a];
              r && "undefined" !== r && !t[r] && (ge(e, r, !1),
              delete n[r])
          }
          for (a = 0,
          i = r.length; a < i; a++) {
              const o = r[a]
                , i = !!t[o];
              o && "undefined" !== o && n[o] !== i && i && (ge(e, o, !0),
              n[o] = i)
          }
          return n
      }(e, n, r);
  if (n === r)
      return r;
  if ("ref" === t)
      a || n(e);
  else if ("on:" === t.slice(0, 3)) {
      const o = t.slice(3);
      r && e.removeEventListener(o, r),
      n && e.addEventListener(o, n)
  } else if ("oncapture:" === t.slice(0, 10)) {
      const o = t.slice(10);
      r && e.removeEventListener(o, r, !0),
      n && e.addEventListener(o, n, !0)
  } else if ("on" === t.slice(0, 2)) {
      const o = t.slice(2).toLowerCase()
        , a = ae.has(o);
      if (!a && r) {
          const t = Array.isArray(r) ? r[0] : r;
          e.removeEventListener(o, t)
      }
      (a || n) && (!function(e, t, n, r) {
          if (r)
              Array.isArray(n) ? (e[`$$ ${t}`] = n[0],
              e[`$$ ${t}Data`] = n[1]) : e[`$$ ${t}`] = n;
          else if (Array.isArray(n)) {
              const r = n[0];
              e.addEventListener(t, n[0] = t=>r.call(e, n[1], t))
          } else
              e.addEventListener(t, n)
      }(e, o, n, a),
      a && ce([o]))
  } else if ("attr:" === t.slice(0, 5))
      de(e, t.slice(5), n);
  else if ((d = "prop:" === t.slice(0, 5)) || (l = ne.has(t)) || !o && ((c = function(e, t) {
      const n = oe[e];
      return "object" == typeof n ? n[t] ? n.$ : void 0 : n
  }(t, e.tagName)) || (s = te.has(t))) || (i = e.nodeName.includes("-")))
      d && (t = t.slice(5),
      s = !0),
      "class" === t || "className" === t ? ue(e, n) : !i || s || l ? e[c || t] = n : e[(u = t,
      u.toLowerCase().replace(/-([a-z])/g, ((e,t)=>t.toUpperCase())))] = n;
  else {
      const r = o && t.indexOf(":") > -1 && ie[t.split(":")[0]];
      r ? function(e, t, n, r) {
          null == r ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r)
      }(e, r, t, n) : de(e, re[t] || t, n)
  }
  var u;
  return n
}
function be(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
      configurable: !0,
      value: n
  }),
  Object.defineProperty(e, "currentTarget", {
      configurable: !0,
      get: ()=>n || document
  }); n; ) {
      const r = n[t];
      if (r && !n.disabled) {
          const o = n[`${t}Data`];
          if (void 0 !== o ? r.call(n, o, e) : r.call(n, e),
          e.cancelBubble)
              return
      }
      n = n._$host || n.parentNode || n.host
  }
}
function ye(e, t, n, r, o) {
  for (; "function" == typeof n; )
      n = n();
  if (t === n)
      return n;
  const a = typeof t
    , i = void 0 !== r;
  if (e = i && n[0] && n[0].parentNode || e,
  "string" === a || "number" === a)
      if ("number" === a && (t = t.toString()),
      i) {
          let o = n[0];
          o && 3 === o.nodeType ? o.data = t : o = document.createTextNode(t),
          n = _e(e, n, r, o)
      } else
          n = "" !== n && "string" == typeof n ? e.firstChild.data = t : e.textContent = t;
  else if (null == t || "boolean" === a)
      n = _e(e, n, r);
  else {
      if ("function" === a)
          return x((()=>{
              let o = t();
              for (; "function" == typeof o; )
                  o = o();
              n = ye(e, o, n, r)
          }
          )),
          ()=>n;
      if (Array.isArray(t)) {
          const a = []
            , s = n && Array.isArray(n);
          if (ve(a, t, n, o))
              return x((()=>n = ye(e, a, n, r, !0))),
              ()=>n;
          if (0 === a.length) {
              if (n = _e(e, n, r),
              i)
                  return n
          } else
              s ? 0 === n.length ? we(e, a, r) : function(e, t, n) {
                  let r = n.length
                    , o = t.length
                    , a = r
                    , i = 0
                    , s = 0
                    , l = t[o - 1].nextSibling
                    , c = null;
                  for (; i < o || s < a; )
                      if (t[i] !== n[s]) {
                          for (; t[o - 1] === n[a - 1]; )
                              o--,
                              a--;
                          if (o === i) {
                              const t = a < r ? s ? n[s - 1].nextSibling : n[a - s] : l;
                              for (; s < a; )
                                  e.insertBefore(n[s++], t)
                          } else if (a === s)
                              for (; i < o; )
                                  c && c.has(t[i]) || t[i].remove(),
                                  i++;
                          else if (t[i] === n[a - 1] && n[s] === t[o - 1]) {
                              const r = t[--o].nextSibling;
                              e.insertBefore(n[s++], t[i++].nextSibling),
                              e.insertBefore(n[--a], r),
                              t[o] = n[a]
                          } else {
                              if (!c) {
                                  c = new Map;
                                  let e = s;
                                  for (; e < a; )
                                      c.set(n[e], e++)
                              }
                              const r = c.get(t[i]);
                              if (null != r)
                                  if (s < r && r < a) {
                                      let l, d = i, u = 1;
                                      for (; ++d < o && d < a && null != (l = c.get(t[d])) && l === r + u; )
                                          u++;
                                      if (u > r - s) {
                                          const o = t[i];
                                          for (; s < r; )
                                              e.insertBefore(n[s++], o)
                                      } else
                                          e.replaceChild(n[s++], t[i++])
                                  } else
                                      i++;
                              else
                                  t[i++].remove()
                          }
                      } else
                          i++,
                          s++
              }(e, n, a) : (n && _e(e),
              we(e, a));
          n = a
      } else if (t.nodeType) {
          if (Array.isArray(n)) {
              if (i)
                  return n = _e(e, n, r, t);
              _e(e, n, null, t)
          } else
              null != n && "" !== n && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
          n = t
      } else
          console.warn("Unrecognized value. Skipped inserting", t)
  }
  return n
}
function ve(e, t, n, r) {
  let o = !1;
  for (let a = 0, i = t.length; a < i; a++) {
      let i, s = t[a], l = n && n[a];
      if (null == s || !0 === s || !1 === s)
          ;
      else if ("object" == (i = typeof s) && s.nodeType)
          e.push(s);
      else if (Array.isArray(s))
          o = ve(e, s, l) || o;
      else if ("function" === i)
          if (r) {
              for (; "function" == typeof s; )
                  s = s();
              o = ve(e, Array.isArray(s) ? s : [s], Array.isArray(l) ? l : [l]) || o
          } else
              e.push(s),
              o = !0;
      else {
          const t = String(s);
          l && 3 === l.nodeType && l.data === t ? e.push(l) : e.push(document.createTextNode(t))
      }
  }
  return o
}
function we(e, t, n=null) {
  for (let r = 0, o = t.length; r < o; r++)
      e.insertBefore(t[r], n)
}
function _e(e, t, n, r) {
  if (void 0 === n)
      return e.textContent = "";
  const o = r || document.createTextNode("");
  if (t.length) {
      let r = !1;
      for (let a = t.length - 1; a >= 0; a--) {
          const i = t[a];
          if (o !== i) {
              const t = i.parentNode === e;
              r || a ? t && i.remove() : t ? e.replaceChild(o, i) : e.insertBefore(o, n)
          } else
              r = !0
      }
  } else
      e.insertBefore(o, n);
  return [o]
}
function xe(e) {
  return (t,n)=>{
      const {element: r} = n;
      return w((o=>{
          const a = function(e) {
              const t = Object.keys(e)
                , n = {};
              for (let r = 0; r < t.length; r++) {
                  const [o,a] = _(e[t[r]]);
                  Object.defineProperty(n, t[r], {
                      get: o,
                      set(e) {
                          a((()=>e))
                      }
                  })
              }
              return n
          }(t);
          r.addPropertyChangedCallback(((e,t)=>a[e] = t)),
          r.addReleaseCallback((()=>{
              r.renderRoot.textContent = "",
              o()
          }
          ));
          const i = e(a, n);
          return fe(r.renderRoot, i)
      }
      ), function(e) {
          if (e.assignedSlot && e.assignedSlot._$owner)
              return e.assignedSlot._$owner;
          let t = e.parentNode;
          for (; t && !t._$owner && (!t.assignedSlot || !t.assignedSlot._$owner); )
              t = t.parentNode;
          return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner
      }(r))
  }
}
function ke(e, t, n) {
  return 2 === arguments.length && (n = t,
  t = {}),
  i(e, t)(xe(n))
}
const Ce = {
  typebot: "",
  onNewInputBlock: void 0,
  onAnswer: void 0,
  onEnd: void 0,
  onInit: void 0,
  onNewLogs: void 0,
  isPreview: void 0,
  startGroupId: void 0,
  prefilledVariables: void 0,
  apiHost: void 0,
  resultId: void 0
}
, Se = {
  ...Ce,
  onClose: void 0,
  onOpen: void 0,
  theme: void 0,
  autoShowDelay: void 0,
  isOpen: void 0,
  defaultOpen: void 0
}
, Te = {
  ...Ce,
  onClose: void 0,
  onOpen: void 0,
  theme: void 0,
  previewMessage: void 0,
  onPreviewMessageClick: void 0,
  autoShowDelay: void 0
};
var $e = '/*! tailwindcss v3.3.2 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.-right-1{right:-4px}.-right-2{right:-8px}.-top-2{top:-8px}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.bottom-5{bottom:20px}.left-0{left:0}.left-5{left:20px}.right-0{right:0}.right-5{right:20px}.top-0{top:0}.z-10{z-index:10}.z-20{z-index:20}.m-2{margin:8px}.m-auto{margin:auto}.mx-4{margin-left:16px;margin-right:16px}.my-2{margin-bottom:8px;margin-top:8px}.-mr-1{margin-right:-4px}.-mt-1{margin-top:-4px}.mb-3{margin-bottom:12px}.ml-2{margin-left:8px}.mt-1{margin-top:4px}.mt-4{margin-top:16px}.\\!block{display:block!important}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.h-10{height:40px}.h-12{height:48px}.h-16{height:64px}.h-2{height:8px}.h-2\\.5{height:10px}.h-3{height:12px}.h-32{height:128px}.h-4{height:16px}.h-5{height:20px}.h-6{height:24px}.h-7{height:28px}.h-8{height:32px}.h-9{height:36px}.h-\\[80vh\\]{height:80vh}.h-\\[90\\%\\]{height:90%}.h-full{height:100%}.max-h-80{max-height:320px}.max-h-\\[464px\\]{max-height:464px}.max-h-\\[704px\\]{max-height:704px}.min-h-full{min-height:100%}.w-10{width:40px}.w-12{width:48px}.w-16{width:64px}.w-2{width:8px}.w-3{width:12px}.w-4{width:16px}.w-5{width:20px}.w-6{width:24px}.w-7{width:28px}.w-8{width:32px}.w-9{width:36px}.w-\\[90\\%\\]{width:90%}.w-full{width:100%}.min-w-0{min-width:0}.max-w-\\[256px\\]{max-width:256px}.max-w-full{max-width:100%}.max-w-lg{max-width:512px}.max-w-xs{max-width:320px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.text-ellipsis{text-overflow:ellipsis}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.rounded-md{border-radius:6px}.border{border-width:1px}.border-2{border-width:2px}.border-dashed{border-style:dashed}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-1{padding:4px}.p-4{padding:16px}.px-1{padding-left:4px;padding-right:4px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.px-8{padding-left:32px;padding-right:32px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.py-6{padding-bottom:24px;padding-top:24px}.pb-0{padding-bottom:0}.pl-2{padding-left:8px}.pl-4{padding-left:16px}.pr-1{padding-right:4px}.pr-2{padding-right:8px}.pr-4{padding-right:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:24px;line-height:32px}.text-4xl{font-size:36px;line-height:40px}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.brightness-150{--tw-brightness:brightness(1.5)}.brightness-150,.brightness-200{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.brightness-200{--tw-brightness:brightness(2)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--typebot-container-bg-image:none;--typebot-container-bg-color:transparent;--typebot-container-font-family:"Open Sans";--typebot-container-color:#303235;--typebot-button-bg-color:#0042da;--typebot-button-bg-color-rgb:0,66,218;--typebot-button-color:#fff;--typebot-checkbox-bg-color:#fff;--typebot-host-bubble-bg-color:#f7f8ff;--typebot-host-bubble-color:#303235;--typebot-guest-bubble-bg-color:#ff8e21;--typebot-guest-bubble-color:#fff;--typebot-input-bg-color:#fff;--typebot-input-color:#303235;--typebot-input-placeholder-color:#9095a0;--typebot-header-bg-color:#fff;--typebot-header-color:#303235;--typebot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--typebot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(0)}50%{transform:translateY(-5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}.slate-a{text-decoration:underline}.slate-html-container>div{min-height:24px}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.text-input::placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.typebot-container{background-color:var(--typebot-container-bg-color);background-image:var(--typebot-container-bg-image);font-family:var(--typebot-container-font-family),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"}.typebot-button{background-color:var(--typebot-button-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease}.typebot-button.selectable{background-color:var(--typebot-host-bubble-bg-color);border:1px solid var(--typebot-button-bg-color);color:var(--typebot-host-bubble-color)}.typebot-selectable{background-color:rgba(var(--typebot-button-bg-color-rgb),.08);border:1px solid rgba(var(--typebot-button-bg-color-rgb),.25);border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease}.typebot-selectable:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),.12);border-color:rgba(var(--typebot-button-bg-color-rgb),.3)}.typebot-selectable.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),.18);border-color:rgba(var(--typebot-button-bg-color-rgb),.35)}.typebot-checkbox{background-color:var(--typebot-checkbox-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);border-radius:2px;color:var(--typebot-button-color);padding:1px;transition:all .3s ease}.typebot-checkbox.checked{background-color:var(--typebot-button-bg-color)}.typebot-host-bubble{color:var(--typebot-host-bubble-color)}.typebot-host-bubble>.bubble-typing{background-color:var(--typebot-host-bubble-bg-color);border:var(--typebot-host-bubble-border);border-radius:6px}.typebot-host-bubble iframe,.typebot-host-bubble img,.typebot-host-bubble video{border-radius:var(--typebot-border-radius)}.typebot-guest-bubble{background-color:var(--typebot-guest-bubble-bg-color);border-radius:6px;color:var(--typebot-guest-bubble-color)}.typebot-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1)}.typebot-input,.typebot-input-error-message{color:var(--typebot-input-color)}.typebot-button>.send-icon{fill:var(--typebot-button-color)}.typebot-chat-view{max-width:800px}.ping span{background-color:var(--typebot-button-bg-color)}.rating-icon-container svg{stroke:var(--typebot-button-bg-color);fill:var(--typebot-host-bubble-bg-color);height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:var(--typebot-button-bg-color)}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{border-radius:var(--typebot-border-radius)}.total-files-indicator,.upload-progress-bar{background-color:var(--typebot-button-bg-color)}.total-files-indicator{color:var(--typebot-button-color);font-size:10px}.typebot-upload-input{border-radius:var(--typebot-border-radius);transition:border-color .1s ease-out}.typebot-upload-input.dragging-over{border-color:var(--typebot-button-bg-color)}.secondary-button{background-color:var(--typebot-host-bubble-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-host-bubble-color)}.typebot-country-select{color:var(--typebot-input-color)}.typebot-country-select,.typebot-date-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius)}.typebot-date-input{color:var(--typebot-input-color);color-scheme:light}.typebot-popup-blocked-toast{border-radius:var(--typebot-border-radius)}.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.typebot-picture-button{background-color:var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease;width:236px}.typebot-picture-button>img,.typebot-selectable-picture>img{border-radius:var(--typebot-border-radius) var(--typebot-border-radius) 0 0;height:100%;max-height:200px;min-width:200px;-o-object-fit:cover;object-fit:cover;width:100%}.typebot-picture-button.has-svg>img,.typebot-selectable-picture.has-svg>img{max-height:128px;-o-object-fit:contain;object-fit:contain;padding:1rem}.typebot-selectable-picture{background-color:rgba(var(--typebot-button-bg-color-rgb),.08);border:1px solid rgba(var(--typebot-button-bg-color-rgb),.25);border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease;width:236px}.typebot-selectable-picture:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),.12);border-color:rgba(var(--typebot-button-bg-color-rgb),.3)}.typebot-selectable-picture.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),.18);border-color:rgba(var(--typebot-button-bg-color-rgb),.35)}select option{background-color:var(--typebot-input-bg-color);color:var(--typebot-input-color)}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9)}.hover\\:brightness-90:hover,.hover\\:brightness-95:hover{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.hover\\:brightness-95:hover{--tw-brightness:brightness(.95)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75)}.active\\:brightness-75:active,.active\\:brightness-90:active{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.active\\:brightness-90:active{--tw-brightness:brightness(.9)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:left-5{left:20px}.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:w-\\[400px\\]{width:400px}.sm\\:w-full{width:100%}.sm\\:max-w-lg{max-width:512px}.sm\\:p-0{padding:0}}';
let Ie = function(e) {
  return e.TEXT = "text input",
  e.NUMBER = "number input",
  e.EMAIL = "email input",
  e.URL = "url input",
  e.DATE = "date input",
  e.PHONE = "phone number input",
  e.CHOICE = "choice input",
  e.PICTURE_CHOICE = "picture choice input",
  e.PAYMENT = "payment input",
  e.RATING = "rating input",
  e.FILE = "file input",
  e
}({})
, Ee = function(e) {
  return e.TEXT = "text",
  e.IMAGE = "image",
  e.VIDEO = "video",
  e.EMBED = "embed",
  e.AUDIO = "audio",
  e
}({})
, Pe = function(e) {
  return e.SET_VARIABLE = "Set variable",
  e.CONDITION = "Condition",
  e.REDIRECT = "Redirect",
  e.SCRIPT = "Code",
  e.TYPEBOT_LINK = "Typebot link",
  e.WAIT = "Wait",
  e.JUMP = "Jump",
  e.AB_TEST = "AB test",
  e
}({});
const Ae = async e=>{
  try {
      const t = "string" == typeof e ? e : e.url
        , n = await fetch(t, {
          method: "string" == typeof e ? "GET" : e.method,
          mode: "cors",
          headers: "string" != typeof e && Oe(e.body) ? {
              "Content-Type": "application/json"
          } : void 0,
          body: "string" != typeof e && Oe(e.body) ? JSON.stringify(e.body) : void 0
      })
        , r = await n.json();
      if (!n.ok)
          throw "error"in r ? r.error : r;
      return {
          data: r
      }
  } catch (e) {
      return console.error(e),
      {
          error: e
      }
  }
}
, Oe = e=>null != e
, Ne = e=>null == e
, je = e=>null == e || "" === e
, Me = e=>null != e && "" !== e
, Le = async({basePath: e="/api", files: t, onUploadProgress: n})=>{
  const r = [];
  let o = 0;
  for (const {file: a, path: i} of t) {
      n && n(o / t.length * 100),
      o += 1;
      const {data: s} = await Ae(`${e}/storage/upload-url?filePath=${encodeURIComponent(i)}&fileType=${a.type}`);
      if (!s?.presignedUrl)
          continue;
      const {url: l, fields: c} = s.presignedUrl;
      if (s.hasReachedStorageLimit)
          r.push(null);
      else {
          const e = new FormData;
          Object.entries({
              ...c,
              file: a
          }).forEach((([t,n])=>{
              e.append(t, n)
          }
          ));
          if (!(await fetch(l, {
              method: "POST",
              body: e
          })).ok)
              continue;
          r.push(`${l.split("?")[0]}/${i}`)
      }
  }
  return r
}
, Re = (e="")=>"undefined" == typeof window ? je(process.env["NEXT_PUBLIC_" + e]) ? void 0 : process.env["NEXT_PUBLIC_" + e] : "undefined" != typeof window && window.__env ? je(window.__env[e]) ? void 0 : window.__env[e] : void 0
, Ze = e=>e?.startsWith("data:image/svg") || e?.endsWith(".svg")
, Be = e=>{
  e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, ((e,t,n,r)=>t + t + n + n + r + r));
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
}
, ze = e=>(([e,t,n])=>(299 * e + 587 * t + 114 * n) / 1e3 > 155)(Be(e))
, De = le('<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">')
, Ue = le('<img part="button-icon" alt="Bubble button icon" elementtiming="Bubble button icon" fetchpriority="high">')
, Ve = le("<span>")
, Fe = le('<button part="button"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">')
, He = "#0042DA"
, Ge = "#27272A"
, Ke = "#fff"
, qe = e=>e.startsWith("http") || e.startsWith("data:image/svg+xml")
, We = e=>(()=>{
  const t = Fe()
    , n = t.firstChild;
  return t.$$click = ()=>e.toggleBot(),
  t.style.setProperty("z-index", "42424242"),
  fe(t, F(X, {
      get when() {
          return Ne(e.customIconSrc)
      },
      keyed: !0,
      get children() {
          const t = De();
          return x((n=>{
              const r = e.iconColor ?? (ze(e.backgroundColor ?? He) ? Ge : Ke)
                , o = "stroke-2 fill-transparent absolute duration-200 transition " + (e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === e.size ? " w-9" : " w-7");
              return r !== n._v$ && (null != (n._v$ = r) ? t.style.setProperty("stroke", r) : t.style.removeProperty("stroke")),
              o !== n._v$2 && de(t, "class", n._v$2 = o),
              n
          }
          ), {
              _v$: void 0,
              _v$2: void 0
          }),
          t
      }
  }), n),
  fe(t, F(X, {
      get when() {
          return C((()=>!!e.customIconSrc))() && qe(e.customIconSrc)
      },
      get children() {
          const t = Ue();
          return x((n=>{
              const r = e.customIconSrc
                , o = "duration-200 transition" + (e.isBotOpened ? " scale-0 opacity-0" : " scale-100 opacity-100") + (Ze(e.customIconSrc) ? "large" === e.size ? " w-9 h-9" : " w-7 h-7" : " w-[90%] h-[90%]") + (Ze(e.customIconSrc) ? "" : " object-cover rounded-full");
              return r !== n._v$3 && de(t, "src", n._v$3 = r),
              o !== n._v$4 && ue(t, n._v$4 = o),
              n
          }
          ), {
              _v$3: void 0,
              _v$4: void 0
          }),
          t
      }
  }), n),
  fe(t, F(X, {
      get when() {
          return C((()=>!!e.customIconSrc))() && !qe(e.customIconSrc)
      },
      get children() {
          const t = Ve();
          return t.style.setProperty("font-family", "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"),
          fe(t, (()=>e.customIconSrc)),
          x((()=>ue(t, "text-4xl duration-200 transition" + (e.isBotOpened ? " scale-0 opacity-0" : " scale-100 opacity-100")))),
          t
      }
  }), n),
  x((r=>{
      const o = "fixed bottom-5 shadow-md  rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in" + ("large" === e.size ? " w-16 h-16" : " w-12 h-12") + ("left" === e.placement ? " left-5" : " right-5")
        , a = e.backgroundColor ?? He
        , i = e.iconColor ?? (ze(e.backgroundColor ?? He) ? Ge : Ke)
        , s = "absolute duration-200 transition " + (e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0") + ("large" === e.size ? " w-9" : " w-7");
      return o !== r._v$5 && ue(t, r._v$5 = o),
      a !== r._v$6 && (null != (r._v$6 = a) ? t.style.setProperty("background-color", a) : t.style.removeProperty("background-color")),
      i !== r._v$7 && (null != (r._v$7 = i) ? n.style.setProperty("fill", i) : n.style.removeProperty("fill")),
      s !== r._v$8 && de(n, "class", r._v$8 = s),
      r
  }
  ), {
      _v$5: void 0,
      _v$6: void 0,
      _v$7: void 0,
      _v$8: void 0
  }),
  t
}
)();
ce(["click"]);
const Ye = le('<div part="preview-message"><p>')
, Je = le('<img class="rounded-full w-8 h-8 object-cover" alt="Bot avatar" elementtiming="Bot avatar" fetchpriority="high">')
, Xe = le('<button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">')
, Qe = "#F7F8FF"
, et = "#303235"
, tt = e=>{
  const [t,n] = _(!1);
  return (()=>{
      const r = Ye()
        , o = r.firstChild;
      return r.addEventListener("mouseleave", (()=>n(!1))),
      r.addEventListener("mouseenter", (()=>n(!0))),
      r.$$click = ()=>e.onClick(),
      r.style.setProperty("z-index", "42424242"),
      fe(r, F(nt, {
          get isHovered() {
              return t()
          },
          get previewMessageTheme() {
              return e.previewMessageTheme
          },
          get onClick() {
              return e.onCloseClick
          }
      }), o),
      fe(r, F(X, {
          get when() {
              return e.avatarUrl
          },
          keyed: !0,
          children: e=>(()=>{
              const t = Je();
              return de(t, "src", e),
              t
          }
          )()
      }), o),
      fe(o, (()=>e.message)),
      x((t=>{
          const n = "fixed max-w-[256px] rounded-md duration-200 flex items-center gap-4 shadow-md animate-fade-in cursor-pointer hover:shadow-lg p-4" + ("large" === e.buttonSize ? " bottom-24" : " bottom-20") + ("left" === e.placement ? " left-5" : " right-5")
            , o = e.previewMessageTheme?.backgroundColor ?? Qe
            , a = e.previewMessageTheme?.textColor ?? et;
          return n !== t._v$ && ue(r, t._v$ = n),
          o !== t._v$2 && (null != (t._v$2 = o) ? r.style.setProperty("background-color", o) : r.style.removeProperty("background-color")),
          a !== t._v$3 && (null != (t._v$3 = a) ? r.style.setProperty("color", a) : r.style.removeProperty("color")),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
      }),
      r
  }
  )()
}
, nt = e=>(()=>{
  const t = Xe();
  return t.$$click = t=>(t.stopPropagation(),
  e.onClick()),
  x((n=>{
      const r = "absolute -top-2 -right-2 rounded-full w-6 h-6 p-1 hover:brightness-95 active:brightness-90 transition-all border " + (e.isHovered ? "opacity-100" : "opacity-0")
        , o = e.previewMessageTheme?.closeButtonBackgroundColor ?? Qe
        , a = e.previewMessageTheme?.closeButtonIconColor ?? et;
      return r !== n._v$4 && ue(t, n._v$4 = r),
      o !== n._v$5 && (null != (n._v$5 = o) ? t.style.setProperty("background-color", o) : t.style.removeProperty("background-color")),
      a !== n._v$6 && (null != (n._v$6 = a) ? t.style.setProperty("color", a) : t.style.removeProperty("color")),
      n
  }
  ), {
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0
  }),
  t
}
)();
ce(["click"]);
const rt = le('<svg viewBox="0 0 800 800" width="16"><rect width="800" height="800" rx="80" fill="#0042DA"></rect><rect x="650" y="293" width="85.4704" height="384.617" rx="20" transform="rotate(90 650 293)" fill="#FF8E20"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M192.735 378.47C216.337 378.47 235.47 359.337 235.47 335.735C235.47 312.133 216.337 293 192.735 293C169.133 293 150 312.133 150 335.735C150 359.337 169.133 378.47 192.735 378.47Z" fill="#FF8E20"></path><rect x="150" y="506.677" width="85.4704" height="384.617" rx="20" transform="rotate(-90 150 506.677)" fill="white"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M607.265 421.206C583.663 421.206 564.53 440.34 564.53 463.942C564.53 487.544 583.663 506.677 607.265 506.677C630.867 506.677 650 487.544 650 463.942C650 440.34 630.867 421.206 607.265 421.206Z" fill="white">')
, ot = ()=>rt()
, at = le('<a href="javasscript:void(0)" class="lite-badge" id="lite-badge"><span>Spiker Bot')
, it = e=>{
  let t, n;
  const r = n=>{
      n.forEach((n=>{
          n.removedNodes.forEach((n=>{
              "id"in n && t && "lite-badge" == n.id && (console.log("Sorry, you can't remove the brand 😅"),
              e.botContainer?.append(t))
          }
          ))
      }
      ))
  }
  ;
  return T((()=>{
      document && e.botContainer && (n = new MutationObserver(r),
      n.observe(e.botContainer, {
          subtree: !1,
          childList: !0
      }))
  }
  )),
  $((()=>{
      n && n.disconnect()
  }
  )),
  (()=>{
      const e = at()
        , n = e.firstChild;
      return "function" == typeof t ? he(t, e) : t = e,
      fe(e, F(ot, {}), n),
      e
  }
  )()
}
, st = ()=>Re("VIEWER_INTERNAL_URL") ?? Re("VIEWER_URL")?.split(",")[0] ?? "https://viewer.typebot.io";
const [lt,ct] = _()
, dt = le('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px" color="white"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">')
, ut = e=>(()=>{
  const t = dt();
  return pe(t, e, !0, !0),
  t
}
)()
, pt = le('<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">')
, ht = e=>(()=>{
  const t = pt();
  return pe(t, q(e, {
      get class() {
          return "animate-spin h-6 w-6 " + e.class
      },
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "data-testid": "loading-spinner"
  }), !0, !0),
  t
}
)()
, ft = le("<button>")
, gt = e=>{
  const t = I((()=>e.children))
    , [n,r] = W(e, ["disabled", "class"]);
  return (()=>{
      const o = ft();
      return pe(o, q(r, {
          get disabled() {
              return e.isDisabled || e.isLoading
          },
          get class() {
              return "py-2 px-4 font-semibold focus:outline-none filter hover:brightness-90 active:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 flex justify-center" + ("secondary" === e.variant ? " secondary-button" : " typebot-button") + " " + n.class
          }
      }), !1, !0),
      fe(o, F(X, {
          get when() {
              return !e.isLoading
          },
          get fallback() {
              return F(ht, {})
          },
          get children() {
              return t()
          }
      })),
      o
  }
  )()
}
, mt = e=>{
  const [t,n] = W(e, ["disableIcon"]);
  return F(gt, q({
      type: "submit"
  }, n, {
      get children() {
          return C((()=>!(!lt() || t.disableIcon)))() ? F(ut, {
              get class() {
                  return "send-icon flex " + (t.disableIcon ? "hidden" : "")
              }
          }) : e.children
      }
  }))
}
, bt = le('<div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bubble1"></div><div class="w-2 h-2 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">')
, yt = ()=>bt()
, vt = le('<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">')
, wt = e=>{
  const [t,n] = W(e, ["ref", "onInput"]);
  return (()=>{
      const r = vt();
      r.$$input = e=>t.onInput(e.currentTarget.value);
      const o = e.ref;
      return "function" == typeof o ? he(o, r) : e.ref = r,
      r.style.setProperty("font-size", "16px"),
      pe(r, n, !1, !1),
      r
  }
  )()
}
;
ce(["input"]);
const _t = le('<textarea class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" rows="6" data-testid="textarea" required>')
, xt = e=>{
  const [t,n] = W(e, ["ref", "onInput"]);
  return (()=>{
      const e = _t();
      e.$$input = e=>t.onInput(e.currentTarget.value);
      const r = t.ref;
      return "function" == typeof r ? he(r, e) : t.ref = e,
      e.style.setProperty("font-size", "16px"),
      pe(e, q({
          get autofocus() {
              return !lt()
          }
      }, n), !1, !1),
      e
  }
  )()
}
;
ce(["input"]);
const kt = le('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><audio controls>');
let Ct;
const St = e=>{
  let t, n, r = !1;
  const [o,a] = _(!0)
    , i = ()=>{
      r || (r = !0,
      a(!1),
      setTimeout((()=>e.onTransitionEnd(t?.offsetTop)), 400))
  }
  ;
  return T((()=>{
      Ct = setTimeout(i, 500),
      n?.addEventListener("canplay", (()=>{
          clearTimeout(Ct),
          n?.play().catch((e=>console.warn("Couldn't autoplay audio", e))),
          i()
      }
      ), {
          once: !0
      })
  }
  )),
  $((()=>{
      Ct && clearTimeout(Ct)
  }
  )),
  (()=>{
      const r = kt()
        , a = r.firstChild.firstChild.firstChild
        , i = a.nextSibling;
      "function" == typeof t ? he(t, r) : t = r,
      fe(a, (()=>{
          const e = C((()=>!!o()));
          return ()=>e() && F(yt, {})
      }
      )());
      return "function" == typeof n ? he(n, i) : n = i,
      x((t=>{
          const n = o() ? "64px" : "100%"
            , r = o() ? "32px" : "100%"
            , s = e.url
            , l = "z-10 text-fade-in m-2 " + (o() ? "opacity-0" : "opacity-100")
            , c = o() ? "32px" : "revert";
          return n !== t._v$ && (null != (t._v$ = n) ? a.style.setProperty("width", n) : a.style.removeProperty("width")),
          r !== t._v$2 && (null != (t._v$2 = r) ? a.style.setProperty("height", r) : a.style.removeProperty("height")),
          s !== t._v$3 && de(i, "src", t._v$3 = s),
          l !== t._v$4 && ue(i, t._v$4 = l),
          c !== t._v$5 && (null != (t._v$5 = c) ? i.style.setProperty("height", c) : i.style.removeProperty("height")),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
      }),
      r
  }
  )()
}
, Tt = le('<div class="flex flex-col w-full animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><iframe id="embed-bubble-content">');
let $t;
const It = e=>{
  let t;
  const [n,r] = _(!0);
  return T((()=>{
      $t = setTimeout((()=>{
          r(!1),
          setTimeout((()=>{
              e.onTransitionEnd(t?.offsetTop)
          }
          ), 400)
      }
      ), 2e3)
  }
  )),
  $((()=>{
      $t && clearTimeout($t)
  }
  )),
  (()=>{
      const r = Tt()
        , o = r.firstChild.firstChild.firstChild
        , a = o.nextSibling;
      return "function" == typeof t ? he(t, r) : t = r,
      fe(o, (()=>{
          const e = C((()=>!!n()));
          return ()=>e() && F(yt, {})
      }
      )()),
      x((t=>{
          const r = n() ? "64px" : "100%"
            , i = n() ? "32px" : "100%"
            , s = e.content.url
            , l = "w-full z-20 p-4 text-fade-in " + (n() ? "opacity-0" : "opacity-100")
            , c = n() ? "32px" : `${e.content.height}px`;
          return r !== t._v$ && (null != (t._v$ = r) ? o.style.setProperty("width", r) : o.style.removeProperty("width")),
          i !== t._v$2 && (null != (t._v$2 = i) ? o.style.setProperty("height", i) : o.style.removeProperty("height")),
          s !== t._v$3 && de(a, "src", t._v$3 = s),
          l !== t._v$4 && ue(a, t._v$4 = l),
          c !== t._v$5 && (null != (t._v$5 = c) ? a.style.setProperty("height", c) : a.style.removeProperty("height")),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
      }),
      r
  }
  )()
}
, Et = le('<img elementtiming="Bubble image" fetchpriority="high">')
, Pt = le('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">')
, At = le('<a target="_blank" class="p-4 z-10">')
, Ot = le('<figure class="p-4 z-10">');
let Nt;
const jt = e=>{
  let t, n;
  const [r,o] = _(!0)
    , a = ()=>{
      r() && (o(!1),
      setTimeout((()=>{
          e.onTransitionEnd(t?.offsetTop)
      }
      ), 400))
  }
  ;
  T((()=>{
      n && (Nt = setTimeout(a, 5e3),
      n.onload = ()=>{
          clearTimeout(Nt),
          a()
      }
      )
  }
  )),
  $((()=>{
      Nt && clearTimeout(Nt)
  }
  ));
  const i = (()=>{
      const t = Et();
      return "function" == typeof n ? he(n, t) : n = t,
      t.style.setProperty("max-height", "512px"),
      x((n=>{
          const o = e.content.url
            , a = e.content.clickLink?.alt ?? "Bubble image"
            , i = "text-fade-in w-full " + (r() ? "opacity-0" : "opacity-100")
            , s = r() ? "32px" : "auto";
          return o !== n._v$ && de(t, "src", n._v$ = o),
          a !== n._v$2 && de(t, "alt", n._v$2 = a),
          i !== n._v$3 && ue(t, n._v$3 = i),
          s !== n._v$4 && (null != (n._v$4 = s) ? t.style.setProperty("height", s) : t.style.removeProperty("height")),
          n
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0
      }),
      t
  }
  )();
  return (()=>{
      const n = Pt()
        , o = n.firstChild.firstChild
        , a = o.firstChild;
      return "function" == typeof t ? he(t, n) : t = n,
      fe(a, (()=>{
          const e = C((()=>!!r()));
          return ()=>e() ? F(yt, {}) : null
      }
      )()),
      fe(o, (()=>{
          const t = C((()=>!!e.content.clickLink));
          return ()=>t() ? (()=>{
              const t = At();
              return fe(t, i),
              x((()=>de(t, "href", e.content.clickLink.url))),
              t
          }
          )() : (()=>{
              const e = Ot();
              return fe(e, i),
              e
          }
          )()
      }
      )(), null),
      x((e=>{
          const t = r() ? "64px" : "100%"
            , n = r() ? "32px" : "100%";
          return t !== e._v$5 && (null != (e._v$5 = t) ? a.style.setProperty("width", t) : a.style.removeProperty("width")),
          n !== e._v$6 && (null != (e._v$6 = n) ? a.style.setProperty("height", n) : a.style.removeProperty("height")),
          e
      }
      ), {
          _v$5: void 0,
          _v$6: void 0
      }),
      n
  }
  )()
}
, Mt = le("<span>")
, Lt = e=>F(X, {
  get when() {
      return ((e,t,n)=>{
          let r = "";
          return e && (r += "slate-bold"),
          t && (r += " slate-italic"),
          n && (r += " slate-underline"),
          r
      }
      )(e.bold, e.italic, e.underline)
  },
  keyed: !0,
  get fallback() {
      return C((()=>e.text))
  },
  children: t=>(()=>{
      const n = Mt();
      return ue(n, t),
      fe(n, (()=>e.text)),
      n
  }
  )()
})
, Rt = le('<a target="_blank" class="slate-a">')
, Zt = le("<div>")
, Bt = e=>F(X, {
  get when() {
      return !e.element.text
  },
  get fallback() {
      return F(Lt, q((()=>e.element)))
  },
  get children() {
      return F(Q, {
          get fallback() {
              return (()=>{
                  const t = Zt();
                  return fe(t, F(J, {
                      get each() {
                          return e.element.children
                      },
                      children: e=>F(Bt, {
                          element: e
                      })
                  })),
                  t
              }
              )()
          },
          get children() {
              return F(ee, {
                  get when() {
                      return "a" === e.element.type
                  },
                  get children() {
                      const t = Rt();
                      return fe(t, F(J, {
                          get each() {
                              return e.element.children
                          },
                          children: e=>F(Bt, {
                              element: e
                          })
                      })),
                      x((()=>de(t, "href", e.element.url))),
                      t
                  }
              })
          }
      })
  }
})
, zt = e=>e.map((e=>e.text ?? zt(e.children))).join("")
, Dt = le('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div>')
, Ut = {
  enabled: !0,
  speed: 300,
  maxDelay: 1.5
};
let Vt;
const Ft = e=>{
  let t;
  const [n,r] = _(!0)
    , o = ()=>{
      n() && (r(!1),
      setTimeout((()=>{
          e.onTransitionEnd(t?.offsetTop)
      }
      ), 400))
  }
  ;
  return T((()=>{
      if (!n)
          return;
      const t = zt(e.content.richText)
        , r = !1 === e.typingEmulation?.enabled ? 0 : ((e,t)=>{
          let n = e.match(/(\w+)/g)?.length ?? 0;
          0 === n && (n = e.length);
          const r = t.speed;
          let o = t.enabled ? n / r * 6e4 : 0;
          return o > 1e3 * t.maxDelay && (o = 1e3 * t.maxDelay),
          o
      }
      )(t, e.typingEmulation ?? Ut);
      Vt = setTimeout(o, r)
  }
  )),
  $((()=>{
      Vt && clearTimeout(Vt)
  }
  )),
  (()=>{
      const r = Dt()
        , o = r.firstChild.firstChild.firstChild
        , a = o.nextSibling;
      return "function" == typeof t ? he(t, r) : t = r,
      fe(o, (()=>{
          const e = C((()=>!!n()));
          return ()=>e() && F(yt, {})
      }
      )()),
      fe(a, F(J, {
          get each() {
              return e.content.richText
          },
          children: e=>F(Bt, {
              element: e
          })
      })),
      x((e=>{
          const t = n() ? "64px" : "100%"
            , r = n() ? "32px" : "100%"
            , i = "overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis " + (n() ? "opacity-0 h-6" : "opacity-100 h-full");
          return t !== e._v$ && (null != (e._v$ = t) ? o.style.setProperty("width", t) : o.style.removeProperty("width")),
          r !== e._v$2 && (null != (e._v$2 = r) ? o.style.setProperty("height", r) : o.style.removeProperty("height")),
          i !== e._v$3 && ue(a, e._v$3 = i),
          e
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
      }),
      r
  }
  )()
}
;
let Ht = function(e) {
  return e.URL = "url",
  e.YOUTUBE = "youtube",
  e.VIMEO = "vimeo",
  e
}({});
const Gt = le("<video controls>")
, Kt = le('<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>')
, qt = le('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">');
let Wt;
const Yt = e=>{
  let t, n;
  const [r,o] = _(!0)
    , a = ()=>{
      const n = t?.querySelector("video");
      n && n.play().catch((e=>console.warn("Could not autoplay the video:", e))),
      r() && (o(!1),
      setTimeout((()=>{
          e.onTransitionEnd(t?.offsetTop)
      }
      ), 400))
  }
  ;
  return T((()=>{
      Wt = setTimeout(a, 2e3)
  }
  )),
  $((()=>{
      Wt && clearTimeout(Wt)
  }
  )),
  (()=>{
      const o = qt()
        , a = o.firstChild.firstChild
        , i = a.firstChild;
      return "function" == typeof t ? he(t, o) : t = o,
      fe(i, (()=>{
          const e = C((()=>!!r()));
          return ()=>e() && F(yt, {})
      }
      )()),
      fe(a, F(Q, {
          get children() {
              return [F(ee, {
                  get when() {
                      return e.content?.type && e.content.type === Ht.URL
                  },
                  get children() {
                      const t = Gt();
                      return "function" == typeof n ? he(n, t) : n = t,
                      x((n=>{
                          const o = e.content.url
                            , a = "p-4 focus:outline-none w-full z-10 text-fade-in rounded-md " + (r() ? "opacity-0" : "opacity-100")
                            , i = r() ? "32px" : "auto";
                          return o !== n._v$ && de(t, "src", n._v$ = o),
                          a !== n._v$2 && ue(t, n._v$2 = a),
                          i !== n._v$3 && (null != (n._v$3 = i) ? t.style.setProperty("height", i) : t.style.removeProperty("height")),
                          n
                      }
                      ), {
                          _v$: void 0,
                          _v$2: void 0,
                          _v$3: void 0
                      }),
                      t
                  }
              }), F(ee, {
                  get when() {
                      return C((()=>!!e.content?.type))() && [Ht.VIMEO, Ht.YOUTUBE].includes(e.content.type)
                  },
                  get children() {
                      const t = Kt();
                      return x((n=>{
                          const o = `${e.content.type === Ht.VIMEO ? "https://player.vimeo.com/video" : "https://www.youtube.com/embed"}/${e.content.id}`
                            , a = "w-full p-4 text-fade-in z-10 " + (r() ? "opacity-0" : "opacity-100")
                            , i = r() ? "32px" : "200px";
                          return o !== n._v$4 && de(t, "src", n._v$4 = o),
                          a !== n._v$5 && ue(t, n._v$5 = a),
                          i !== n._v$6 && de(t, "height", n._v$6 = i),
                          n
                      }
                      ), {
                          _v$4: void 0,
                          _v$5: void 0,
                          _v$6: void 0
                      }),
                      t
                  }
              })]
          }
      }), null),
      x((e=>{
          const t = r() ? "64px" : "100%"
            , n = r() ? "32px" : "100%";
          return t !== e._v$7 && (null != (e._v$7 = t) ? i.style.setProperty("width", t) : i.style.removeProperty("width")),
          n !== e._v$8 && (null != (e._v$8 = n) ? i.style.setProperty("height", n) : i.style.removeProperty("height")),
          e
      }
      ), {
          _v$7: void 0,
          _v$8: void 0
      }),
      o
  }
  )()
}
, Jt = e=>{
  const t = t=>{
      e.onTransitionEnd(t)
  }
  ;
  return F(Q, {
      get children() {
          return [F(ee, {
              get when() {
                  return e.message.type === Ee.TEXT
              },
              get children() {
                  return F(Ft, {
                      get content() {
                          return e.message.content
                      },
                      get typingEmulation() {
                          return e.typingEmulation
                      },
                      onTransitionEnd: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.message.type === Ee.IMAGE
              },
              get children() {
                  return F(jt, {
                      get content() {
                          return e.message.content
                      },
                      onTransitionEnd: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.message.type === Ee.VIDEO
              },
              get children() {
                  return F(Yt, {
                      get content() {
                          return e.message.content
                      },
                      onTransitionEnd: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.message.type === Ee.EMBED
              },
              get children() {
                  return F(It, {
                      get content() {
                          return e.message.content
                      },
                      onTransitionEnd: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.message.type === Ee.AUDIO
              },
              get children() {
                  return F(St, {
                      get url() {
                          return e.message.content.url
                      },
                      onTransitionEnd: t
                  })
              }
          })]
      }
  })
}
, Xt = le('<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">')
, Qt = ()=>(()=>{
  const e = Xt()
    , t = e.firstChild;
  return x((n=>{
      const r = "flex justify-center items-center rounded-full text-white relative " + (lt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl")
        , o = "absolute top-0 left-0 " + (lt() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
      return r !== n._v$ && ue(e, n._v$ = r),
      o !== n._v$2 && de(t, "class", n._v$2 = o),
      n
  }
  ), {
      _v$: void 0,
      _v$2: void 0
  }),
  e
}
)()
, en = le('<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full" elementtiming="Bot avatar" fetchpriority="high">')
, tn = e=>{
  const [t,n] = _(e.initialAvatarSrc);
  return k((()=>{
      t()?.startsWith("{{") && e.initialAvatarSrc?.startsWith("http") && n(e.initialAvatarSrc)
  }
  )),
  F(X, {
      get when() {
          return Me(t())
      },
      keyed: !0,
      get fallback() {
          return F(Qt, {})
      },
      get children() {
          const e = en()
            , n = e.firstChild;
          return x((r=>{
              const o = "flex justify-center items-center rounded-full text-white relative animate-fade-in flex-shrink-0 " + (lt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl")
                , a = t();
              return o !== r._v$ && ue(e, r._v$ = o),
              a !== r._v$2 && de(n, "src", r._v$2 = a),
              r
          }
          ), {
              _v$: void 0,
              _v$2: void 0
          }),
          e
      }
  })
}
, nn = le('<div class="flex justify-end items-end animate-fade-in gap-2 guest-container"><span class="px-4 py-2 whitespace-pre-wrap max-w-full typebot-guest-bubble" data-testid="guest-bubble">')
, rn = e=>(()=>{
  const t = nn()
    , n = t.firstChild;
  return t.style.setProperty("margin-left", "50px"),
  fe(n, (()=>e.message)),
  fe(t, F(X, {
      get when() {
          return e.showAvatar
      },
      get children() {
          return F(tn, {
              get initialAvatarSrc() {
                  return e.avatarSrc
              }
          })
      }
  }), null),
  t
}
)()
, on = le('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, an = e=>{
  const [t,n] = _(e.defaultValue ?? "");
  let r;
  const o = e=>n(e)
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = t=>{
      e.block.options.isLong || "Enter" === t.key && a()
  }
    , s = t=>{
      e.block.options.isLong && "Enter" === t.key && (t.metaKey || t.ctrlKey) && a()
  }
  ;
  return T((()=>{
      !lt() && r && r.focus()
  }
  )),
  (()=>{
      const n = on();
      return n.$$keydown = i,
      fe(n, (()=>{
          const n = C((()=>!!e.block.options.isLong));
          return ()=>n() ? F(xt, {
              ref(e) {
                  "function" == typeof r ? r(e) : r = e
              },
              onInput: o,
              onKeyDown: s,
              get value() {
                  return t()
              },
              get placeholder() {
                  return e.block.options?.labels?.placeholder ?? "Type your answer..."
              }
          }) : F(wt, {
              ref(e) {
                  "function" == typeof r ? r(e) : r = e
              },
              onInput: o,
              get value() {
                  return t()
              },
              get placeholder() {
                  return e.block.options?.labels?.placeholder ?? "Type your answer..."
              }
          })
      }
      )(), null),
      fe(n, F(mt, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      x((()=>null != (e.block.options.isLong ? void 0 : "350px") ? n.style.setProperty("max-width", e.block.options.isLong ? void 0 : "350px") : n.style.removeProperty("max-width"))),
      n
  }
  )()
}
;
ce(["keydown"]);
const sn = le('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, ln = e=>{
  const [t,n] = _(e.defaultValue ?? "");
  let r;
  const o = e=>n(e)
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = e=>{
      "Enter" === e.key && a()
  }
  ;
  return T((()=>{
      !lt() && r && r.focus()
  }
  )),
  (()=>{
      const n = sn();
      return n.$$keydown = i,
      n.style.setProperty("max-width", "350px"),
      fe(n, F(wt, {
          ref(e) {
              "function" == typeof r ? r(e) : r = e
          },
          get value() {
              return t()
          },
          get placeholder() {
              return e.block.options?.labels?.placeholder ?? "Type your answer..."
          },
          onInput: o,
          type: "number",
          style: {
              appearance: "auto"
          },
          get min() {
              return e.block.options?.min
          },
          get max() {
              return e.block.options?.max
          },
          get step() {
              return e.block.options?.step ?? "any"
          }
      }), null),
      fe(n, F(mt, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
ce(["keydown"]);
const cn = le('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, dn = e=>{
  const [t,n] = _(e.defaultValue ?? "");
  let r;
  const o = e=>n(e)
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = e=>{
      "Enter" === e.key && a()
  }
  ;
  return T((()=>{
      !lt() && r && r.focus()
  }
  )),
  (()=>{
      const n = cn();
      return n.$$keydown = i,
      n.style.setProperty("max-width", "350px"),
      fe(n, F(wt, {
          ref(e) {
              "function" == typeof r ? r(e) : r = e
          },
          get value() {
              return t()
          },
          get placeholder() {
              return e.block.options?.labels?.placeholder ?? "Type your email..."
          },
          onInput: o,
          type: "email",
          autocomplete: "email"
      }), null),
      fe(n, F(mt, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
ce(["keydown"]);
const un = le('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">')
, pn = e=>{
  const [t,n] = _(e.defaultValue ?? "");
  let r;
  const o = e=>{
      if (!e.startsWith("https://"))
          return "https:/" === e ? void 0 : n(`https://${e}`);
      n(e)
  }
    , a = ()=>{
      "" !== t() && r?.reportValidity() && e.onSubmit({
          value: t()
      })
  }
    , i = e=>{
      "Enter" === e.key && a()
  }
  ;
  return T((()=>{
      !lt() && r && r.focus()
  }
  )),
  (()=>{
      const n = un();
      return n.$$keydown = i,
      n.style.setProperty("max-width", "350px"),
      fe(n, F(wt, {
          ref(e) {
              "function" == typeof r ? r(e) : r = e
          },
          get value() {
              return t()
          },
          get placeholder() {
              return e.block.options?.labels?.placeholder ?? "Type your URL..."
          },
          onInput: o,
          type: "url",
          autocomplete: "url"
      }), null),
      fe(n, F(mt, {
          type: "button",
          get isDisabled() {
              return "" === t()
          },
          class: "my-2 ml-2",
          "on:click": a,
          get children() {
              return e.block.options?.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
ce(["keydown"]);
const hn = le('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9">')
, fn = e=>(()=>{
  const t = hn();
  return pe(t, e, !0, !0),
  t
}
)()
, gn = [{
  name: "International",
  flag: "🌐",
  code: "INT",
  dial_code: null
}, {
  name: "Afghanistan",
  flag: "🇦🇫",
  code: "AF",
  dial_code: "+93"
}, {
  name: "Åland Islands",
  flag: "🇦🇽",
  code: "AX",
  dial_code: "+358"
}, {
  name: "Albania",
  flag: "🇦🇱",
  code: "AL",
  dial_code: "+355"
}, {
  name: "Algeria",
  flag: "🇩🇿",
  code: "DZ",
  dial_code: "+213"
}, {
  name: "American Samoa",
  flag: "🇦🇸",
  code: "AS",
  dial_code: "+1684"
}, {
  name: "Andorra",
  flag: "🇦🇩",
  code: "AD",
  dial_code: "+376"
}, {
  name: "Angola",
  flag: "🇦🇴",
  code: "AO",
  dial_code: "+244"
}, {
  name: "Anguilla",
  flag: "🇦🇮",
  code: "AI",
  dial_code: "+1264"
}, {
  name: "Antarctica",
  flag: "🇦🇶",
  code: "AQ",
  dial_code: "+672"
}, {
  name: "Antigua and Barbuda",
  flag: "🇦🇬",
  code: "AG",
  dial_code: "+1268"
}, {
  name: "Argentina",
  flag: "🇦🇷",
  code: "AR",
  dial_code: "+54"
}, {
  name: "Armenia",
  flag: "🇦🇲",
  code: "AM",
  dial_code: "+374"
}, {
  name: "Aruba",
  flag: "🇦🇼",
  code: "AW",
  dial_code: "+297"
}, {
  name: "Australia",
  flag: "🇦🇺",
  code: "AU",
  dial_code: "+61"
}, {
  name: "Austria",
  flag: "🇦🇹",
  code: "AT",
  dial_code: "+43"
}, {
  name: "Azerbaijan",
  flag: "🇦🇿",
  code: "AZ",
  dial_code: "+994"
}, {
  name: "Bahamas",
  flag: "🇧🇸",
  code: "BS",
  dial_code: "+1242"
}, {
  name: "Bahrain",
  flag: "🇧🇭",
  code: "BH",
  dial_code: "+973"
}, {
  name: "Bangladesh",
  flag: "🇧🇩",
  code: "BD",
  dial_code: "+880"
}, {
  name: "Barbados",
  flag: "🇧🇧",
  code: "BB",
  dial_code: "+1246"
}, {
  name: "Belarus",
  flag: "🇧🇾",
  code: "BY",
  dial_code: "+375"
}, {
  name: "Belgium",
  flag: "🇧🇪",
  code: "BE",
  dial_code: "+32"
}, {
  name: "Belize",
  flag: "🇧🇿",
  code: "BZ",
  dial_code: "+501"
}, {
  name: "Benin",
  flag: "🇧🇯",
  code: "BJ",
  dial_code: "+229"
}, {
  name: "Bermuda",
  flag: "🇧🇲",
  code: "BM",
  dial_code: "+1441"
}, {
  name: "Bhutan",
  flag: "🇧🇹",
  code: "BT",
  dial_code: "+975"
}, {
  name: "Bolivia, Plurinational State of bolivia",
  flag: "🇧🇴",
  code: "BO",
  dial_code: "+591"
}, {
  name: "Bosnia and Herzegovina",
  flag: "🇧🇦",
  code: "BA",
  dial_code: "+387"
}, {
  name: "Botswana",
  flag: "🇧🇼",
  code: "BW",
  dial_code: "+267"
}, {
  name: "Bouvet Island",
  flag: "🇧🇻",
  code: "BV",
  dial_code: "+47"
}, {
  name: "Brazil",
  flag: "🇧🇷",
  code: "BR",
  dial_code: "+55"
}, {
  name: "British Indian Ocean Territory",
  flag: "🇮🇴",
  code: "IO",
  dial_code: "+246"
}, {
  name: "Brunei Darussalam",
  flag: "🇧🇳",
  code: "BN",
  dial_code: "+673"
}, {
  name: "Bulgaria",
  flag: "🇧🇬",
  code: "BG",
  dial_code: "+359"
}, {
  name: "Burkina Faso",
  flag: "🇧🇫",
  code: "BF",
  dial_code: "+226"
}, {
  name: "Burundi",
  flag: "🇧🇮",
  code: "BI",
  dial_code: "+257"
}, {
  name: "Cambodia",
  flag: "🇰🇭",
  code: "KH",
  dial_code: "+855"
}, {
  name: "Cameroon",
  flag: "🇨🇲",
  code: "CM",
  dial_code: "+237"
}, {
  name: "Canada",
  flag: "🇨🇦",
  code: "CA",
  dial_code: "+1"
}, {
  name: "Cape Verde",
  flag: "🇨🇻",
  code: "CV",
  dial_code: "+238"
}, {
  name: "Cayman Islands",
  flag: "🇰🇾",
  code: "KY",
  dial_code: "+345"
}, {
  name: "Central African Republic",
  flag: "🇨🇫",
  code: "CF",
  dial_code: "+236"
}, {
  name: "Chad",
  flag: "🇹🇩",
  code: "TD",
  dial_code: "+235"
}, {
  name: "Chile",
  flag: "🇨🇱",
  code: "CL",
  dial_code: "+56"
}, {
  name: "China",
  flag: "🇨🇳",
  code: "CN",
  dial_code: "+86"
}, {
  name: "Christmas Island",
  flag: "🇨🇽",
  code: "CX",
  dial_code: "+61"
}, {
  name: "Cocos (Keeling) Islands",
  flag: "🇨🇨",
  code: "CC",
  dial_code: "+61"
}, {
  name: "Colombia",
  flag: "🇨🇴",
  code: "CO",
  dial_code: "+57"
}, {
  name: "Comoros",
  flag: "🇰🇲",
  code: "KM",
  dial_code: "+269"
}, {
  name: "Congo",
  flag: "🇨🇬",
  code: "CG",
  dial_code: "+242"
}, {
  name: "Congo, The Democratic Republic of the Congo",
  flag: "🇨🇩",
  code: "CD",
  dial_code: "+243"
}, {
  name: "Cook Islands",
  flag: "🇨🇰",
  code: "CK",
  dial_code: "+682"
}, {
  name: "Costa Rica",
  flag: "🇨🇷",
  code: "CR",
  dial_code: "+506"
}, {
  name: "Cote d'Ivoire",
  flag: "🇨🇮",
  code: "CI",
  dial_code: "+225"
}, {
  name: "Croatia",
  flag: "🇭🇷",
  code: "HR",
  dial_code: "+385"
}, {
  name: "Cuba",
  flag: "🇨🇺",
  code: "CU",
  dial_code: "+53"
}, {
  name: "Cyprus",
  flag: "🇨🇾",
  code: "CY",
  dial_code: "+357"
}, {
  name: "Czech Republic",
  flag: "🇨🇿",
  code: "CZ",
  dial_code: "+420"
}, {
  name: "Denmark",
  flag: "🇩🇰",
  code: "DK",
  dial_code: "+45"
}, {
  name: "Djibouti",
  flag: "🇩🇯",
  code: "DJ",
  dial_code: "+253"
}, {
  name: "Dominica",
  flag: "🇩🇲",
  code: "DM",
  dial_code: "+1767"
}, {
  name: "Dominican Republic",
  flag: "🇩🇴",
  code: "DO",
  dial_code: "+1849"
}, {
  name: "Ecuador",
  flag: "🇪🇨",
  code: "EC",
  dial_code: "+593"
}, {
  name: "Egypt",
  flag: "🇪🇬",
  code: "EG",
  dial_code: "+20"
}, {
  name: "El Salvador",
  flag: "🇸🇻",
  code: "SV",
  dial_code: "+503"
}, {
  name: "Equatorial Guinea",
  flag: "🇬🇶",
  code: "GQ",
  dial_code: "+240"
}, {
  name: "Eritrea",
  flag: "🇪🇷",
  code: "ER",
  dial_code: "+291"
}, {
  name: "Estonia",
  flag: "🇪🇪",
  code: "EE",
  dial_code: "+372"
}, {
  name: "Ethiopia",
  flag: "🇪🇹",
  code: "ET",
  dial_code: "+251"
}, {
  name: "Falkland Islands (Malvinas)",
  flag: "🇫🇰",
  code: "FK",
  dial_code: "+500"
}, {
  name: "Faroe Islands",
  flag: "🇫🇴",
  code: "FO",
  dial_code: "+298"
}, {
  name: "Fiji",
  flag: "🇫🇯",
  code: "FJ",
  dial_code: "+679"
}, {
  name: "Finland",
  flag: "🇫🇮",
  code: "FI",
  dial_code: "+358"
}, {
  name: "France",
  flag: "🇫🇷",
  code: "FR",
  dial_code: "+33"
}, {
  name: "French Guiana",
  flag: "🇬🇫",
  code: "GF",
  dial_code: "+594"
}, {
  name: "French Polynesia",
  flag: "🇵🇫",
  code: "PF",
  dial_code: "+689"
}, {
  name: "French Southern Territories",
  flag: "🇹🇫",
  code: "TF",
  dial_code: "+262"
}, {
  name: "Gabon",
  flag: "🇬🇦",
  code: "GA",
  dial_code: "+241"
}, {
  name: "Gambia",
  flag: "🇬🇲",
  code: "GM",
  dial_code: "+220"
}, {
  name: "Georgia",
  flag: "🇬🇪",
  code: "GE",
  dial_code: "+995"
}, {
  name: "Germany",
  flag: "🇩🇪",
  code: "DE",
  dial_code: "+49"
}, {
  name: "Ghana",
  flag: "🇬🇭",
  code: "GH",
  dial_code: "+233"
}, {
  name: "Gibraltar",
  flag: "🇬🇮",
  code: "GI",
  dial_code: "+350"
}, {
  name: "Greece",
  flag: "🇬🇷",
  code: "GR",
  dial_code: "+30"
}, {
  name: "Greenland",
  flag: "🇬🇱",
  code: "GL",
  dial_code: "+299"
}, {
  name: "Grenada",
  flag: "🇬🇩",
  code: "GD",
  dial_code: "+1473"
}, {
  name: "Guadeloupe",
  flag: "🇬🇵",
  code: "GP",
  dial_code: "+590"
}, {
  name: "Guam",
  flag: "🇬🇺",
  code: "GU",
  dial_code: "+1671"
}, {
  name: "Guatemala",
  flag: "🇬🇹",
  code: "GT",
  dial_code: "+502"
}, {
  name: "Guernsey",
  flag: "🇬🇬",
  code: "GG",
  dial_code: "+44"
}, {
  name: "Guinea",
  flag: "🇬🇳",
  code: "GN",
  dial_code: "+224"
}, {
  name: "Guinea-Bissau",
  flag: "🇬🇼",
  code: "GW",
  dial_code: "+245"
}, {
  name: "Guyana",
  flag: "🇬🇾",
  code: "GY",
  dial_code: "+592"
}, {
  name: "Haiti",
  flag: "🇭🇹",
  code: "HT",
  dial_code: "+509"
}, {
  name: "Heard Island and Mcdonald Islands",
  flag: "🇭🇲",
  code: "HM",
  dial_code: "+672"
}, {
  name: "Holy See (Vatican City State)",
  flag: "🇻🇦",
  code: "VA",
  dial_code: "+379"
}, {
  name: "Honduras",
  flag: "🇭🇳",
  code: "HN",
  dial_code: "+504"
}, {
  name: "Hong Kong",
  flag: "🇭🇰",
  code: "HK",
  dial_code: "+852"
}, {
  name: "Hungary",
  flag: "🇭🇺",
  code: "HU",
  dial_code: "+36"
}, {
  name: "Iceland",
  flag: "🇮🇸",
  code: "IS",
  dial_code: "+354"
}, {
  name: "India",
  flag: "🇮🇳",
  code: "IN",
  dial_code: "+91"
}, {
  name: "Indonesia",
  flag: "🇮🇩",
  code: "ID",
  dial_code: "+62"
}, {
  name: "Iran, Islamic Republic of Persian Gulf",
  flag: "🇮🇷",
  code: "IR",
  dial_code: "+98"
}, {
  name: "Iraq",
  flag: "🇮🇶",
  code: "IQ",
  dial_code: "+964"
}, {
  name: "Ireland",
  flag: "🇮🇪",
  code: "IE",
  dial_code: "+353"
}, {
  name: "Isle of Man",
  flag: "🇮🇲",
  code: "IM",
  dial_code: "+44"
}, {
  name: "Israel",
  flag: "🇮🇱",
  code: "IL",
  dial_code: "+972"
}, {
  name: "Italy",
  flag: "🇮🇹",
  code: "IT",
  dial_code: "+39"
}, {
  name: "Jamaica",
  flag: "🇯🇲",
  code: "JM",
  dial_code: "+1876"
}, {
  name: "Japan",
  flag: "🇯🇵",
  code: "JP",
  dial_code: "+81"
}, {
  name: "Jersey",
  flag: "🇯🇪",
  code: "JE",
  dial_code: "+44"
}, {
  name: "Jordan",
  flag: "🇯🇴",
  code: "JO",
  dial_code: "+962"
}, {
  name: "Kazakhstan",
  flag: "🇰🇿",
  code: "KZ",
  dial_code: "+7"
}, {
  name: "Kenya",
  flag: "🇰🇪",
  code: "KE",
  dial_code: "+254"
}, {
  name: "Kiribati",
  flag: "🇰🇮",
  code: "KI",
  dial_code: "+686"
}, {
  name: "Korea, Democratic People's Republic of Korea",
  flag: "🇰🇵",
  code: "KP",
  dial_code: "+850"
}, {
  name: "Korea, Republic of South Korea",
  flag: "🇰🇷",
  code: "KR",
  dial_code: "+82"
}, {
  name: "Kosovo",
  flag: "🇽🇰",
  code: "XK",
  dial_code: "+383"
}, {
  name: "Kuwait",
  flag: "🇰🇼",
  code: "KW",
  dial_code: "+965"
}, {
  name: "Kyrgyzstan",
  flag: "🇰🇬",
  code: "KG",
  dial_code: "+996"
}, {
  name: "Laos",
  flag: "🇱🇦",
  code: "LA",
  dial_code: "+856"
}, {
  name: "Latvia",
  flag: "🇱🇻",
  code: "LV",
  dial_code: "+371"
}, {
  name: "Lebanon",
  flag: "🇱🇧",
  code: "LB",
  dial_code: "+961"
}, {
  name: "Lesotho",
  flag: "🇱🇸",
  code: "LS",
  dial_code: "+266"
}, {
  name: "Liberia",
  flag: "🇱🇷",
  code: "LR",
  dial_code: "+231"
}, {
  name: "Libyan Arab Jamahiriya",
  flag: "🇱🇾",
  code: "LY",
  dial_code: "+218"
}, {
  name: "Liechtenstein",
  flag: "🇱🇮",
  code: "LI",
  dial_code: "+423"
}, {
  name: "Lithuania",
  flag: "🇱🇹",
  code: "LT",
  dial_code: "+370"
}, {
  name: "Luxembourg",
  flag: "🇱🇺",
  code: "LU",
  dial_code: "+352"
}, {
  name: "Macao",
  flag: "🇲🇴",
  code: "MO",
  dial_code: "+853"
}, {
  name: "Macedonia",
  flag: "🇲🇰",
  code: "MK",
  dial_code: "+389"
}, {
  name: "Madagascar",
  flag: "🇲🇬",
  code: "MG",
  dial_code: "+261"
}, {
  name: "Malawi",
  flag: "🇲🇼",
  code: "MW",
  dial_code: "+265"
}, {
  name: "Malaysia",
  flag: "🇲🇾",
  code: "MY",
  dial_code: "+60"
}, {
  name: "Maldives",
  flag: "🇲🇻",
  code: "MV",
  dial_code: "+960"
}, {
  name: "Mali",
  flag: "🇲🇱",
  code: "ML",
  dial_code: "+223"
}, {
  name: "Malta",
  flag: "🇲🇹",
  code: "MT",
  dial_code: "+356"
}, {
  name: "Marshall Islands",
  flag: "🇲🇭",
  code: "MH",
  dial_code: "+692"
}, {
  name: "Martinique",
  flag: "🇲🇶",
  code: "MQ",
  dial_code: "+596"
}, {
  name: "Mauritania",
  flag: "🇲🇷",
  code: "MR",
  dial_code: "+222"
}, {
  name: "Mauritius",
  flag: "🇲🇺",
  code: "MU",
  dial_code: "+230"
}, {
  name: "Mayotte",
  flag: "🇾🇹",
  code: "YT",
  dial_code: "+262"
}, {
  name: "Mexico",
  flag: "🇲🇽",
  code: "MX",
  dial_code: "+52"
}, {
  name: "Micronesia, Federated States of Micronesia",
  flag: "🇫🇲",
  code: "FM",
  dial_code: "+691"
}, {
  name: "Moldova",
  flag: "🇲🇩",
  code: "MD",
  dial_code: "+373"
}, {
  name: "Monaco",
  flag: "🇲🇨",
  code: "MC",
  dial_code: "+377"
}, {
  name: "Mongolia",
  flag: "🇲🇳",
  code: "MN",
  dial_code: "+976"
}, {
  name: "Montenegro",
  flag: "🇲🇪",
  code: "ME",
  dial_code: "+382"
}, {
  name: "Montserrat",
  flag: "🇲🇸",
  code: "MS",
  dial_code: "+1664"
}, {
  name: "Morocco",
  flag: "🇲🇦",
  code: "MA",
  dial_code: "+212"
}, {
  name: "Mozambique",
  flag: "🇲🇿",
  code: "MZ",
  dial_code: "+258"
}, {
  name: "Myanmar",
  flag: "🇲🇲",
  code: "MM",
  dial_code: "+95"
}, {
  name: "Namibia",
  flag: "🇳🇦",
  code: "NA",
  dial_code: "+264"
}, {
  name: "Nauru",
  flag: "🇳🇷",
  code: "NR",
  dial_code: "+674"
}, {
  name: "Nepal",
  flag: "🇳🇵",
  code: "NP",
  dial_code: "+977"
}, {
  name: "Netherlands",
  flag: "🇳🇱",
  code: "NL",
  dial_code: "+31"
}, {
  name: "Netherlands Antilles",
  flag: "",
  code: "AN",
  dial_code: "+599"
}, {
  name: "New Caledonia",
  flag: "🇳🇨",
  code: "NC",
  dial_code: "+687"
}, {
  name: "New Zealand",
  flag: "🇳🇿",
  code: "NZ",
  dial_code: "+64"
}, {
  name: "Nicaragua",
  flag: "🇳🇮",
  code: "NI",
  dial_code: "+505"
}, {
  name: "Niger",
  flag: "🇳🇪",
  code: "NE",
  dial_code: "+227"
}, {
  name: "Nigeria",
  flag: "🇳🇬",
  code: "NG",
  dial_code: "+234"
}, {
  name: "Niue",
  flag: "🇳🇺",
  code: "NU",
  dial_code: "+683"
}, {
  name: "Norfolk Island",
  flag: "🇳🇫",
  code: "NF",
  dial_code: "+672"
}, {
  name: "Northern Mariana Islands",
  flag: "🇲🇵",
  code: "MP",
  dial_code: "+1670"
}, {
  name: "Norway",
  flag: "🇳🇴",
  code: "NO",
  dial_code: "+47"
}, {
  name: "Oman",
  flag: "🇴🇲",
  code: "OM",
  dial_code: "+968"
}, {
  name: "Pakistan",
  flag: "🇵🇰",
  code: "PK",
  dial_code: "+92"
}, {
  name: "Palau",
  flag: "🇵🇼",
  code: "PW",
  dial_code: "+680"
}, {
  name: "Palestinian Territory, Occupied",
  flag: "🇵🇸",
  code: "PS",
  dial_code: "+970"
}, {
  name: "Panama",
  flag: "🇵🇦",
  code: "PA",
  dial_code: "+507"
}, {
  name: "Papua New Guinea",
  flag: "🇵🇬",
  code: "PG",
  dial_code: "+675"
}, {
  name: "Paraguay",
  flag: "🇵🇾",
  code: "PY",
  dial_code: "+595"
}, {
  name: "Peru",
  flag: "🇵🇪",
  code: "PE",
  dial_code: "+51"
}, {
  name: "Philippines",
  flag: "🇵🇭",
  code: "PH",
  dial_code: "+63"
}, {
  name: "Pitcairn",
  flag: "🇵🇳",
  code: "PN",
  dial_code: "+64"
}, {
  name: "Poland",
  flag: "🇵🇱",
  code: "PL",
  dial_code: "+48"
}, {
  name: "Portugal",
  flag: "🇵🇹",
  code: "PT",
  dial_code: "+351"
}, {
  name: "Puerto Rico",
  flag: "🇵🇷",
  code: "PR",
  dial_code: "+1939"
}, {
  name: "Qatar",
  flag: "🇶🇦",
  code: "QA",
  dial_code: "+974"
}, {
  name: "Romania",
  flag: "🇷🇴",
  code: "RO",
  dial_code: "+40"
}, {
  name: "Russia",
  flag: "🇷🇺",
  code: "RU",
  dial_code: "+7"
}, {
  name: "Rwanda",
  flag: "🇷🇼",
  code: "RW",
  dial_code: "+250"
}, {
  name: "Reunion",
  flag: "🇷🇪",
  code: "RE",
  dial_code: "+262"
}, {
  name: "Saint Barthelemy",
  flag: "🇧🇱",
  code: "BL",
  dial_code: "+590"
}, {
  name: "Saint Helena, Ascension and Tristan Da Cunha",
  flag: "🇸🇭",
  code: "SH",
  dial_code: "+290"
}, {
  name: "Saint Kitts and Nevis",
  flag: "🇰🇳",
  code: "KN",
  dial_code: "+1869"
}, {
  name: "Saint Lucia",
  flag: "🇱🇨",
  code: "LC",
  dial_code: "+1758"
}, {
  name: "Saint Martin",
  flag: "🇲🇫",
  code: "MF",
  dial_code: "+590"
}, {
  name: "Saint Pierre and Miquelon",
  flag: "🇵🇲",
  code: "PM",
  dial_code: "+508"
}, {
  name: "Saint Vincent and the Grenadines",
  flag: "🇻🇨",
  code: "VC",
  dial_code: "+1784"
}, {
  name: "Samoa",
  flag: "🇼🇸",
  code: "WS",
  dial_code: "+685"
}, {
  name: "San Marino",
  flag: "🇸🇲",
  code: "SM",
  dial_code: "+378"
}, {
  name: "Sao Tome and Principe",
  flag: "🇸🇹",
  code: "ST",
  dial_code: "+239"
}, {
  name: "Saudi Arabia",
  flag: "🇸🇦",
  code: "SA",
  dial_code: "+966"
}, {
  name: "Senegal",
  flag: "🇸🇳",
  code: "SN",
  dial_code: "+221"
}, {
  name: "Serbia",
  flag: "🇷🇸",
  code: "RS",
  dial_code: "+381"
}, {
  name: "Seychelles",
  flag: "🇸🇨",
  code: "SC",
  dial_code: "+248"
}, {
  name: "Sierra Leone",
  flag: "🇸🇱",
  code: "SL",
  dial_code: "+232"
}, {
  name: "Singapore",
  flag: "🇸🇬",
  code: "SG",
  dial_code: "+65"
}, {
  name: "Slovakia",
  flag: "🇸🇰",
  code: "SK",
  dial_code: "+421"
}, {
  name: "Slovenia",
  flag: "🇸🇮",
  code: "SI",
  dial_code: "+386"
}, {
  name: "Solomon Islands",
  flag: "🇸🇧",
  code: "SB",
  dial_code: "+677"
}, {
  name: "Somalia",
  flag: "🇸🇴",
  code: "SO",
  dial_code: "+252"
}, {
  name: "South Africa",
  flag: "🇿🇦",
  code: "ZA",
  dial_code: "+27"
}, {
  name: "South Sudan",
  flag: "🇸🇸",
  code: "SS",
  dial_code: "+211"
}, {
  name: "South Georgia and the South Sandwich Islands",
  flag: "🇬🇸",
  code: "GS",
  dial_code: "+500"
}, {
  name: "Spain",
  flag: "🇪🇸",
  code: "ES",
  dial_code: "+34"
}, {
  name: "Sri Lanka",
  flag: "🇱🇰",
  code: "LK",
  dial_code: "+94"
}, {
  name: "Sudan",
  flag: "🇸🇩",
  code: "SD",
  dial_code: "+249"
}, {
  name: "Suriname",
  flag: "🇸🇷",
  code: "SR",
  dial_code: "+597"
}, {
  name: "Svalbard and Jan Mayen",
  flag: "🇸🇯",
  code: "SJ",
  dial_code: "+47"
}, {
  name: "Swaziland",
  flag: "🇸🇿",
  code: "SZ",
  dial_code: "+268"
}, {
  name: "Sweden",
  flag: "🇸🇪",
  code: "SE",
  dial_code: "+46"
}, {
  name: "Switzerland",
  flag: "🇨🇭",
  code: "CH",
  dial_code: "+41"
}, {
  name: "Syrian Arab Republic",
  flag: "🇸🇾",
  code: "SY",
  dial_code: "+963"
}, {
  name: "Taiwan",
  flag: "🇹🇼",
  code: "TW",
  dial_code: "+886"
}, {
  name: "Tajikistan",
  flag: "🇹🇯",
  code: "TJ",
  dial_code: "+992"
}, {
  name: "Tanzania, United Republic of Tanzania",
  flag: "🇹🇿",
  code: "TZ",
  dial_code: "+255"
}, {
  name: "Thailand",
  flag: "🇹🇭",
  code: "TH",
  dial_code: "+66"
}, {
  name: "Timor-Leste",
  flag: "🇹🇱",
  code: "TL",
  dial_code: "+670"
}, {
  name: "Togo",
  flag: "🇹🇬",
  code: "TG",
  dial_code: "+228"
}, {
  name: "Tokelau",
  flag: "🇹🇰",
  code: "TK",
  dial_code: "+690"
}, {
  name: "Tonga",
  flag: "🇹🇴",
  code: "TO",
  dial_code: "+676"
}, {
  name: "Trinidad and Tobago",
  flag: "🇹🇹",
  code: "TT",
  dial_code: "+1868"
}, {
  name: "Tunisia",
  flag: "🇹🇳",
  code: "TN",
  dial_code: "+216"
}, {
  name: "Turkey",
  flag: "🇹🇷",
  code: "TR",
  dial_code: "+90"
}, {
  name: "Turkmenistan",
  flag: "🇹🇲",
  code: "TM",
  dial_code: "+993"
}, {
  name: "Turks and Caicos Islands",
  flag: "🇹🇨",
  code: "TC",
  dial_code: "+1649"
}, {
  name: "Tuvalu",
  flag: "🇹🇻",
  code: "TV",
  dial_code: "+688"
}, {
  name: "Uganda",
  flag: "🇺🇬",
  code: "UG",
  dial_code: "+256"
}, {
  name: "Ukraine",
  flag: "🇺🇦",
  code: "UA",
  dial_code: "+380"
}, {
  name: "United Arab Emirates",
  flag: "🇦🇪",
  code: "AE",
  dial_code: "+971"
}, {
  name: "United Kingdom",
  flag: "🇬🇧",
  code: "GB",
  dial_code: "+44"
}, {
  name: "United States",
  flag: "🇺🇸",
  code: "US",
  dial_code: "+1"
}, {
  name: "Uruguay",
  flag: "🇺🇾",
  code: "UY",
  dial_code: "+598"
}, {
  name: "Uzbekistan",
  flag: "🇺🇿",
  code: "UZ",
  dial_code: "+998"
}, {
  name: "Vanuatu",
  flag: "🇻🇺",
  code: "VU",
  dial_code: "+678"
}, {
  name: "Venezuela, Bolivarian Republic of Venezuela",
  flag: "🇻🇪",
  code: "VE",
  dial_code: "+58"
}, {
  name: "Vietnam",
  flag: "🇻🇳",
  code: "VN",
  dial_code: "+84"
}, {
  name: "Virgin Islands, British",
  flag: "🇻🇬",
  code: "VG",
  dial_code: "+1284"
}, {
  name: "Virgin Islands, U.S.",
  flag: "🇻🇮",
  code: "VI",
  dial_code: "+1340"
}, {
  name: "Wallis and Futuna",
  flag: "🇼🇫",
  code: "WF",
  dial_code: "+681"
}, {
  name: "Yemen",
  flag: "🇾🇪",
  code: "YE",
  dial_code: "+967"
}, {
  name: "Zambia",
  flag: "🇿🇲",
  code: "ZM",
  dial_code: "+260"
}, {
  name: "Zimbabwe",
  flag: "🇿🇼",
  code: "ZW",
  dial_code: "+263"
}]
, mn = le('<div class="flex items-end justify-between pr-2 typebot-input" data-testid="input"><div class="flex"><div class="relative typebot-country-select flex justify-center items-center"><div class="pl-2 pr-1 flex items-center gap-2"><span></span></div><select class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0">')
, bn = le("<option> ")
, yn = e=>{
  const [t,n] = _(je(e.defaultCountryCode) ? "INT" : e.defaultCountryCode)
    , [r,o] = _(e.defaultValue ?? "");
  let a;
  const i = e=>{
      o(e),
      "" !== e && "+" !== e || "INT" === t() || n("INT");
      const r = e?.startsWith("+") && e.length > 2 && gn.reduce(((t,n)=>!n?.dial_code || null !== t && !t.dial_code ? t : e?.startsWith(n.dial_code) && n.dial_code.length > (t?.dial_code.length ?? 0) ? n : t), null);
      r && n(r.code)
  }
    , s = ()=>{
      const n = gn.find((e=>e.code === t()))?.dial_code;
      "" !== r() && a?.reportValidity() && e.onSubmit({
          value: r().startsWith("+") ? r() : `${n ?? ""}${r()}`
      })
  }
    , l = e=>{
      "Enter" === e.key && s()
  }
    , c = e=>{
      const t = e.currentTarget.value;
      n(t);
      const i = gn.find((e=>e.code === t))?.dial_code;
      "" === r() && i && o(i),
      a?.focus()
  }
  ;
  return T((()=>{
      !lt() && a && a.focus()
  }
  )),
  (()=>{
      const n = mn()
        , o = n.firstChild
        , d = o.firstChild.firstChild
        , u = d.firstChild
        , p = d.nextSibling;
      return n.$$keydown = l,
      n.style.setProperty("max-width", "400px"),
      fe(u, (()=>gn.find((e=>t() === e.code))?.flag)),
      fe(d, F(fn, {
          class: "w-3"
      }), null),
      p.addEventListener("change", c),
      fe(p, F(J, {
          each: gn,
          children: e=>(()=>{
              const n = bn()
                , r = n.firstChild;
              return fe(n, (()=>e.name), r),
              fe(n, (()=>e.dial_code ? `(${e.dial_code})` : ""), null),
              x((()=>n.selected = e.code === t())),
              x((()=>n.value = e.code)),
              n
          }
          )()
      })),
      fe(o, F(wt, {
          type: "tel",
          ref(e) {
              "function" == typeof a ? a(e) : a = e
          },
          get value() {
              return r()
          },
          onInput: i,
          get placeholder() {
              return e.labels.placeholder ?? "Your phone number..."
          },
          get autofocus() {
              return !lt()
          }
      }), null),
      fe(n, F(mt, {
          type: "button",
          get isDisabled() {
              return "" === r()
          },
          class: "my-2 ml-2",
          "on:click": s,
          get children() {
              return e.labels?.button ?? "Send"
          }
      }), null),
      n
  }
  )()
}
;
ce(["keydown"]);
const vn = ({from: e, to: t, hasTime: n, isRange: r})=>{
  const o = window.navigator.language
    , a = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: n ? "2-digit" : void 0,
      minute: n ? "2-digit" : void 0
  }
    , i = new Date(n ? e : e.replace(/-/g, "/")).toLocaleString(o, a)
    , s = new Date(n ? t : t.replace(/-/g, "/")).toLocaleString(o, a);
  return `${i}${r ? ` to ${s}` : ""}`
}
, wn = le('<div class="flex flex-col"><div class="flex items-center"><form class="flex justify-between typebot-input pr-2 items-end"><div class="flex flex-col"><div><input class="focus:outline-none flex-1 w-full text-input typebot-date-input" data-testid="from-date">')
, _n = le('<p class="font-semibold">')
, xn = le('<div class="flex items-center p-4"><input class="focus:outline-none flex-1 w-full text-input ml-2 typebot-date-input" data-testid="to-date">')
, kn = e=>{
  const [t,n] = _(Cn(e.defaultValue ?? ""));
  return (()=>{
      const r = wn()
        , o = r.firstChild.firstChild
        , a = o.firstChild
        , i = a.firstChild
        , s = i.firstChild;
      return o.addEventListener("submit", (n=>{
          "" === t().from && "" === t().to || (n.preventDefault(),
          e.onSubmit({
              value: vn({
                  ...t(),
                  hasTime: e.options?.hasTime,
                  isRange: e.options?.isRange
              })
          }))
      }
      )),
      fe(i, (()=>{
          const t = C((()=>!!e.options?.isRange));
          return ()=>t() && (()=>{
              const t = _n();
              return fe(t, (()=>e.options.labels?.from ?? "From:")),
              t
          }
          )()
      }
      )(), s),
      s.addEventListener("change", (e=>n({
          ...t(),
          from: e.currentTarget.value
      }))),
      s.style.setProperty("min-height", "32px"),
      s.style.setProperty("min-width", "100px"),
      s.style.setProperty("font-size", "16px"),
      fe(a, (()=>{
          const r = C((()=>!!e.options?.isRange));
          return ()=>r() && (()=>{
              const r = xn()
                , o = r.firstChild;
              return fe(r, (()=>{
                  const t = C((()=>!!e.options.isRange));
                  return ()=>t() && (()=>{
                      const t = _n();
                      return fe(t, (()=>e.options.labels?.to ?? "To:")),
                      t
                  }
                  )()
              }
              )(), o),
              o.addEventListener("change", (e=>n({
                  ...t(),
                  to: e.currentTarget.value
              }))),
              o.style.setProperty("min-height", "32px"),
              o.style.setProperty("min-width", "100px"),
              o.style.setProperty("font-size", "16px"),
              x((()=>de(o, "type", e.options.hasTime ? "datetime-local" : "date"))),
              x((()=>o.value = t().to)),
              r
          }
          )()
      }
      )(), null),
      fe(o, F(mt, {
          get isDisabled() {
              return C((()=>"" === t().to))() && "" === t().from
          },
          class: "my-2 ml-2",
          get children() {
              return e.options?.labels?.button ?? "Send"
          }
      }), null),
      x((t=>{
          const n = "flex items-center p-4 " + (e.options?.isRange ? "pb-0 gap-2" : "")
            , r = e.options?.hasTime ? "datetime-local" : "date";
          return n !== t._v$ && ue(i, t._v$ = n),
          r !== t._v$2 && de(s, "type", t._v$2 = r),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0
      }),
      x((()=>s.value = t().from)),
      r
  }
  )()
}
, Cn = e=>{
  if (!e.includes("to"))
      return {
          from: e,
          to: ""
      };
  const [t,n] = e.split(" to ");
  return {
      from: t,
      to: n
  }
}
, Sn = le('<form class="flex flex-col gap-2"><div class="flex flex-wrap justify-center gap-2"></div><div class="flex justify-end">')
, Tn = le('<span class="text-sm w-full rating-label">')
, $n = le('<span class="text-sm w-full text-right pr-2 rating-label">')
, In = le("<div>")
, En = e=>{
  const [t,n] = _(e.defaultValue ? Number(e.defaultValue) : void 0)
    , r = n=>{
      n.preventDefault();
      const r = t();
      Ne(r) || e.onSubmit({
          value: r.toString()
      })
  }
    , o = t=>{
      e.block.options.isOneClickSubmitEnabled && e.onSubmit({
          value: t.toString()
      }),
      n(t)
  }
  ;
  return (()=>{
      const n = Sn()
        , a = n.firstChild
        , i = a.nextSibling;
      return n.addEventListener("submit", r),
      fe(n, (()=>{
          const t = C((()=>!!e.block.options.labels.left));
          return ()=>t() && (()=>{
              const t = Tn();
              return fe(t, (()=>e.block.options.labels.left)),
              t
          }
          )()
      }
      )(), a),
      fe(a, F(J, {
          get each() {
              return Array.from(Array(e.block.options.length + ("Numbers" === e.block.options.buttonType ? 1 : 0)))
          },
          children: (n,r)=>F(Pn, q((()=>e.block.options), {
              get rating() {
                  return t()
              },
              get idx() {
                  return r() + ("Numbers" === e.block.options.buttonType ? 0 : 1)
              },
              onClick: o
          }))
      })),
      fe(n, (()=>{
          const t = C((()=>!!e.block.options.labels.right));
          return ()=>t() && (()=>{
              const t = $n();
              return fe(t, (()=>e.block.options.labels.right)),
              t
          }
          )()
      }
      )(), i),
      fe(i, (()=>{
          const n = C((()=>!!Oe(t())));
          return ()=>n() && F(mt, {
              disableIcon: !0,
              get children() {
                  return e.block.options?.labels?.button ?? "Send"
              }
          })
      }
      )()),
      n
  }
  )()
}
, Pn = e=>{
  const t = t=>{
      t.preventDefault(),
      e.onClick(e.idx)
  }
  ;
  return F(Q, {
      get children() {
          return [F(ee, {
              get when() {
                  return "Numbers" === e.buttonType
              },
              get children() {
                  return F(gt, {
                      "on:click": t,
                      get class() {
                          return e.isOneClickSubmitEnabled || Oe(e.rating) && e.idx <= e.rating ? "" : "selectable"
                      },
                      get children() {
                          return e.idx
                      }
                  })
              }
          }), F(ee, {
              get when() {
                  return "Numbers" !== e.buttonType
              },
              get children() {
                  const t = In();
                  return t.addEventListener("click", (()=>e.onClick(e.idx))),
                  x((n=>{
                      const r = "flex justify-center items-center rating-icon-container cursor-pointer " + (Oe(e.rating) && e.idx <= e.rating ? "selected" : "")
                        , o = e.customIcon.isEnabled && !je(e.customIcon.svg) ? e.customIcon.svg : An;
                      return r !== n._v$ && ue(t, n._v$ = r),
                      o !== n._v$2 && (t.innerHTML = n._v$2 = o),
                      n
                  }
                  ), {
                      _v$: void 0,
                      _v$2: void 0
                  }),
                  t
              }
          })]
      }
  })
}
, An = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
var On, Nn;
!function(e) {
  e.assertEqual = e=>e,
  e.assertIs = function(e) {}
  ,
  e.assertNever = function(e) {
      throw new Error
  }
  ,
  e.arrayToEnum = e=>{
      const t = {};
      for (const n of e)
          t[n] = n;
      return t
  }
  ,
  e.getValidEnumValues = t=>{
      const n = e.objectKeys(t).filter((e=>"number" != typeof t[t[e]]))
        , r = {};
      for (const e of n)
          r[e] = t[e];
      return e.objectValues(r)
  }
  ,
  e.objectValues = t=>e.objectKeys(t).map((function(e) {
      return t[e]
  }
  )),
  e.objectKeys = "function" == typeof Object.keys ? e=>Object.keys(e) : e=>{
      const t = [];
      for (const n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
      return t
  }
  ,
  e.find = (e,t)=>{
      for (const n of e)
          if (t(n))
              return n
  }
  ,
  e.isInteger = "function" == typeof Number.isInteger ? e=>Number.isInteger(e) : e=>"number" == typeof e && isFinite(e) && Math.floor(e) === e,
  e.joinValues = function(e, t=" | ") {
      return e.map((e=>"string" == typeof e ? `'${e}'` : e)).join(t)
  }
  ,
  e.jsonStringifyReplacer = (e,t)=>"bigint" == typeof t ? t.toString() : t
}(On || (On = {})),
function(e) {
  e.mergeShapes = (e,t)=>({
      ...e,
      ...t
  })
}(Nn || (Nn = {}));
const jn = On.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"])
, Mn = e=>{
  switch (typeof e) {
  case "undefined":
      return jn.undefined;
  case "string":
      return jn.string;
  case "number":
      return isNaN(e) ? jn.nan : jn.number;
  case "boolean":
      return jn.boolean;
  case "function":
      return jn.function;
  case "bigint":
      return jn.bigint;
  case "symbol":
      return jn.symbol;
  case "object":
      return Array.isArray(e) ? jn.array : null === e ? jn.null : e.then && "function" == typeof e.then && e.catch && "function" == typeof e.catch ? jn.promise : "undefined" != typeof Map && e instanceof Map ? jn.map : "undefined" != typeof Set && e instanceof Set ? jn.set : "undefined" != typeof Date && e instanceof Date ? jn.date : jn.object;
  default:
      return jn.unknown
  }
}
, Ln = On.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
class Rn extends Error {
  constructor(e) {
      super(),
      this.issues = [],
      this.addIssue = e=>{
          this.issues = [...this.issues, e]
      }
      ,
      this.addIssues = (e=[])=>{
          this.issues = [...this.issues, ...e]
      }
      ;
      const t = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t,
      this.name = "ZodError",
      this.issues = e
  }
  get errors() {
      return this.issues
  }
  format(e) {
      const t = e || function(e) {
          return e.message
      }
        , n = {
          _errors: []
      }
        , r = e=>{
          for (const o of e.issues)
              if ("invalid_union" === o.code)
                  o.unionErrors.map(r);
              else if ("invalid_return_type" === o.code)
                  r(o.returnTypeError);
              else if ("invalid_arguments" === o.code)
                  r(o.argumentsError);
              else if (0 === o.path.length)
                  n._errors.push(t(o));
              else {
                  let e = n
                    , r = 0;
                  for (; r < o.path.length; ) {
                      const n = o.path[r];
                      r === o.path.length - 1 ? (e[n] = e[n] || {
                          _errors: []
                      },
                      e[n]._errors.push(t(o))) : e[n] = e[n] || {
                          _errors: []
                      },
                      e = e[n],
                      r++
                  }
              }
      }
      ;
      return r(this),
      n
  }
  toString() {
      return this.message
  }
  get message() {
      return JSON.stringify(this.issues, On.jsonStringifyReplacer, 2)
  }
  get isEmpty() {
      return 0 === this.issues.length
  }
  flatten(e=(e=>e.message)) {
      const t = {}
        , n = [];
      for (const r of this.issues)
          r.path.length > 0 ? (t[r.path[0]] = t[r.path[0]] || [],
          t[r.path[0]].push(e(r))) : n.push(e(r));
      return {
          formErrors: n,
          fieldErrors: t
      }
  }
  get formErrors() {
      return this.flatten()
  }
}
Rn.create = e=>new Rn(e);
const Zn = (e,t)=>{
  let n;
  switch (e.code) {
  case Ln.invalid_type:
      n = e.received === jn.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
      break;
  case Ln.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, On.jsonStringifyReplacer)}`;
      break;
  case Ln.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${On.joinValues(e.keys, ", ")}`;
      break;
  case Ln.invalid_union:
      n = "Invalid input";
      break;
  case Ln.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${On.joinValues(e.options)}`;
      break;
  case Ln.invalid_enum_value:
      n = `Invalid enum value. Expected ${On.joinValues(e.options)}, received '${e.received}'`;
      break;
  case Ln.invalid_arguments:
      n = "Invalid function arguments";
      break;
  case Ln.invalid_return_type:
      n = "Invalid function return type";
      break;
  case Ln.invalid_date:
      n = "Invalid date";
      break;
  case Ln.invalid_string:
      "object" == typeof e.validation ? "includes"in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`,
      "number" == typeof e.validation.position && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith"in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith"in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : On.assertNever(e.validation) : n = "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid";
      break;
  case Ln.too_small:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
      break;
  case Ln.too_big:
      n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "bigint" === e.type ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
      break;
  case Ln.custom:
      n = "Invalid input";
      break;
  case Ln.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
  case Ln.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
  case Ln.not_finite:
      n = "Number must be finite";
      break;
  default:
      n = t.defaultError,
      On.assertNever(e)
  }
  return {
      message: n
  }
}
;
let Bn = Zn;
function zn() {
  return Bn
}
const Dn = e=>{
  const {data: t, path: n, errorMaps: r, issueData: o} = e
    , a = [...n, ...o.path || []]
    , i = {
      ...o,
      path: a
  };
  let s = "";
  const l = r.filter((e=>!!e)).slice().reverse();
  for (const e of l)
      s = e(i, {
          data: t,
          defaultError: s
      }).message;
  return {
      ...o,
      path: a,
      message: o.message || s
  }
}
;
function Un(e, t) {
  const n = Dn({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, zn(), Zn].filter((e=>!!e))
  });
  e.common.issues.push(n)
}
class Vn {
  constructor() {
      this.value = "valid"
  }
  dirty() {
      "valid" === this.value && (this.value = "dirty")
  }
  abort() {
      "aborted" !== this.value && (this.value = "aborted")
  }
  static mergeArray(e, t) {
      const n = [];
      for (const r of t) {
          if ("aborted" === r.status)
              return Fn;
          "dirty" === r.status && e.dirty(),
          n.push(r.value)
      }
      return {
          status: e.value,
          value: n
      }
  }
  static async mergeObjectAsync(e, t) {
      const n = [];
      for (const e of t)
          n.push({
              key: await e.key,
              value: await e.value
          });
      return Vn.mergeObjectSync(e, n)
  }
  static mergeObjectSync(e, t) {
      const n = {};
      for (const r of t) {
          const {key: t, value: o} = r;
          if ("aborted" === t.status)
              return Fn;
          if ("aborted" === o.status)
              return Fn;
          "dirty" === t.status && e.dirty(),
          "dirty" === o.status && e.dirty(),
          (void 0 !== o.value || r.alwaysSet) && (n[t.value] = o.value)
      }
      return {
          status: e.value,
          value: n
      }
  }
}
const Fn = Object.freeze({
  status: "aborted"
})
, Hn = e=>({
  status: "dirty",
  value: e
})
, Gn = e=>({
  status: "valid",
  value: e
})
, Kn = e=>"aborted" === e.status
, qn = e=>"dirty" === e.status
, Wn = e=>"valid" === e.status
, Yn = e=>"undefined" != typeof Promise && e instanceof Promise;
var Jn;
!function(e) {
  e.errToObj = e=>"string" == typeof e ? {
      message: e
  } : e || {},
  e.toString = e=>"string" == typeof e ? e : null == e ? void 0 : e.message
}(Jn || (Jn = {}));
class Xn {
  constructor(e, t, n, r) {
      this._cachedPath = [],
      this.parent = e,
      this.data = t,
      this._path = n,
      this._key = r
  }
  get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
  }
}
const Qn = (e,t)=>{
  if (Wn(t))
      return {
          success: !0,
          data: t.value
      };
  if (!e.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
  return {
      success: !1,
      get error() {
          if (this._error)
              return this._error;
          const t = new Rn(e.common.issues);
          return this._error = t,
          this._error
      }
  }
}
;
function er(e) {
  if (!e)
      return {};
  const {errorMap: t, invalid_type_error: n, required_error: r, description: o} = e;
  if (t && (n || r))
      throw new Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');
  if (t)
      return {
          errorMap: t,
          description: o
      };
  return {
      errorMap: (e,t)=>"invalid_type" !== e.code ? {
          message: t.defaultError
      } : void 0 === t.data ? {
          message: null != r ? r : t.defaultError
      } : {
          message: null != n ? n : t.defaultError
      },
      description: o
  }
}
class tr {
  constructor(e) {
      this.spa = this.safeParseAsync,
      this._def = e,
      this.parse = this.parse.bind(this),
      this.safeParse = this.safeParse.bind(this),
      this.parseAsync = this.parseAsync.bind(this),
      this.safeParseAsync = this.safeParseAsync.bind(this),
      this.spa = this.spa.bind(this),
      this.refine = this.refine.bind(this),
      this.refinement = this.refinement.bind(this),
      this.superRefine = this.superRefine.bind(this),
      this.optional = this.optional.bind(this),
      this.nullable = this.nullable.bind(this),
      this.nullish = this.nullish.bind(this),
      this.array = this.array.bind(this),
      this.promise = this.promise.bind(this),
      this.or = this.or.bind(this),
      this.and = this.and.bind(this),
      this.transform = this.transform.bind(this),
      this.brand = this.brand.bind(this),
      this.default = this.default.bind(this),
      this.catch = this.catch.bind(this),
      this.describe = this.describe.bind(this),
      this.pipe = this.pipe.bind(this),
      this.isNullable = this.isNullable.bind(this),
      this.isOptional = this.isOptional.bind(this)
  }
  get description() {
      return this._def.description
  }
  _getType(e) {
      return Mn(e.data)
  }
  _getOrReturnCtx(e, t) {
      return t || {
          common: e.parent.common,
          data: e.data,
          parsedType: Mn(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent
      }
  }
  _processInputParams(e) {
      return {
          status: new Vn,
          ctx: {
              common: e.parent.common,
              data: e.data,
              parsedType: Mn(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent
          }
      }
  }
  _parseSync(e) {
      const t = this._parse(e);
      if (Yn(t))
          throw new Error("Synchronous parse encountered promise.");
      return t
  }
  _parseAsync(e) {
      const t = this._parse(e);
      return Promise.resolve(t)
  }
  parse(e, t) {
      const n = this.safeParse(e, t);
      if (n.success)
          return n.data;
      throw n.error
  }
  safeParse(e, t) {
      var n;
      const r = {
          common: {
              issues: [],
              async: null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
              contextualErrorMap: null == t ? void 0 : t.errorMap
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: Mn(e)
      }
        , o = this._parseSync({
          data: e,
          path: r.path,
          parent: r
      });
      return Qn(r, o)
  }
  async parseAsync(e, t) {
      const n = await this.safeParseAsync(e, t);
      if (n.success)
          return n.data;
      throw n.error
  }
  async safeParseAsync(e, t) {
      const n = {
          common: {
              issues: [],
              contextualErrorMap: null == t ? void 0 : t.errorMap,
              async: !0
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: Mn(e)
      }
        , r = this._parse({
          data: e,
          path: n.path,
          parent: n
      })
        , o = await (Yn(r) ? r : Promise.resolve(r));
      return Qn(n, o)
  }
  refine(e, t) {
      const n = e=>"string" == typeof t || void 0 === t ? {
          message: t
      } : "function" == typeof t ? t(e) : t;
      return this._refinement(((t,r)=>{
          const o = e(t)
            , a = ()=>r.addIssue({
              code: Ln.custom,
              ...n(t)
          });
          return "undefined" != typeof Promise && o instanceof Promise ? o.then((e=>!!e || (a(),
          !1))) : !!o || (a(),
          !1)
      }
      ))
  }
  refinement(e, t) {
      return this._refinement(((n,r)=>!!e(n) || (r.addIssue("function" == typeof t ? t(n, r) : t),
      !1)))
  }
  _refinement(e) {
      return new Ur({
          schema: this,
          typeName: Qr.ZodEffects,
          effect: {
              type: "refinement",
              refinement: e
          }
      })
  }
  superRefine(e) {
      return this._refinement(e)
  }
  optional() {
      return Vr.create(this, this._def)
  }
  nullable() {
      return Fr.create(this, this._def)
  }
  nullish() {
      return this.nullable().optional()
  }
  array() {
      return kr.create(this, this._def)
  }
  promise() {
      return Dr.create(this, this._def)
  }
  or(e) {
      return Tr.create([this, e], this._def)
  }
  and(e) {
      return Pr.create(this, e, this._def)
  }
  transform(e) {
      return new Ur({
          ...er(this._def),
          schema: this,
          typeName: Qr.ZodEffects,
          effect: {
              type: "transform",
              transform: e
          }
      })
  }
  default(e) {
      const t = "function" == typeof e ? e : ()=>e;
      return new Hr({
          ...er(this._def),
          innerType: this,
          defaultValue: t,
          typeName: Qr.ZodDefault
      })
  }
  brand() {
      return new Wr({
          typeName: Qr.ZodBranded,
          type: this,
          ...er(this._def)
      })
  }
  catch(e) {
      const t = "function" == typeof e ? e : ()=>e;
      return new Gr({
          ...er(this._def),
          innerType: this,
          catchValue: t,
          typeName: Qr.ZodCatch
      })
  }
  describe(e) {
      return new (0,
      this.constructor)({
          ...this._def,
          description: e
      })
  }
  pipe(e) {
      return Yr.create(this, e)
  }
  isOptional() {
      return this.safeParse(void 0).success
  }
  isNullable() {
      return this.safeParse(null).success
  }
}
const nr = /^c[^\s-]{8,}$/i
, rr = /^[a-z][a-z0-9]*$/
, or = /[0-9A-HJKMNP-TV-Z]{26}/
, ar = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i
, ir = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/
, sr = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u
, lr = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/
, cr = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
class dr extends tr {
  constructor() {
      super(...arguments),
      this._regex = (e,t,n)=>this.refinement((t=>e.test(t)), {
          validation: t,
          code: Ln.invalid_string,
          ...Jn.errToObj(n)
      }),
      this.nonempty = e=>this.min(1, Jn.errToObj(e)),
      this.trim = ()=>new dr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: "trim"
          }]
      }),
      this.toLowerCase = ()=>new dr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: "toLowerCase"
          }]
      }),
      this.toUpperCase = ()=>new dr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: "toUpperCase"
          }]
      })
  }
  _parse(e) {
      this._def.coerce && (e.data = String(e.data));
      if (this._getType(e) !== jn.string) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.string,
              received: t.parsedType
          }),
          Fn
      }
      const t = new Vn;
      let n;
      for (const i of this._def.checks)
          if ("min" === i.kind)
              e.data.length < i.value && (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  code: Ln.too_small,
                  minimum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: i.message
              }),
              t.dirty());
          else if ("max" === i.kind)
              e.data.length > i.value && (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  code: Ln.too_big,
                  maximum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: i.message
              }),
              t.dirty());
          else if ("length" === i.kind) {
              const r = e.data.length > i.value
                , o = e.data.length < i.value;
              (r || o) && (n = this._getOrReturnCtx(e, n),
              r ? Un(n, {
                  code: Ln.too_big,
                  maximum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: i.message
              }) : o && Un(n, {
                  code: Ln.too_small,
                  minimum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: i.message
              }),
              t.dirty())
          } else if ("email" === i.kind)
              ir.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "email",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("emoji" === i.kind)
              sr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "emoji",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("uuid" === i.kind)
              ar.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "uuid",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("cuid" === i.kind)
              nr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "cuid",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("cuid2" === i.kind)
              rr.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "cuid2",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("ulid" === i.kind)
              or.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "ulid",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty());
          else if ("url" === i.kind)
              try {
                  new URL(e.data)
              } catch (r) {
                  n = this._getOrReturnCtx(e, n),
                  Un(n, {
                      validation: "url",
                      code: Ln.invalid_string,
                      message: i.message
                  }),
                  t.dirty()
              }
          else if ("regex" === i.kind) {
              i.regex.lastIndex = 0;
              i.regex.test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "regex",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty())
          } else if ("trim" === i.kind)
              e.data = e.data.trim();
          else if ("includes" === i.kind)
              e.data.includes(i.value, i.position) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  code: Ln.invalid_string,
                  validation: {
                      includes: i.value,
                      position: i.position
                  },
                  message: i.message
              }),
              t.dirty());
          else if ("toLowerCase" === i.kind)
              e.data = e.data.toLowerCase();
          else if ("toUpperCase" === i.kind)
              e.data = e.data.toUpperCase();
          else if ("startsWith" === i.kind)
              e.data.startsWith(i.value) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  code: Ln.invalid_string,
                  validation: {
                      startsWith: i.value
                  },
                  message: i.message
              }),
              t.dirty());
          else if ("endsWith" === i.kind)
              e.data.endsWith(i.value) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  code: Ln.invalid_string,
                  validation: {
                      endsWith: i.value
                  },
                  message: i.message
              }),
              t.dirty());
          else if ("datetime" === i.kind) {
              ((a = i).precision ? a.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${a.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${a.precision}}Z$`) : 0 === a.precision ? a.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : a.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$")).test(e.data) || (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  code: Ln.invalid_string,
                  validation: "datetime",
                  message: i.message
              }),
              t.dirty())
          } else
              "ip" === i.kind ? (r = e.data,
              ("v4" !== (o = i.version) && o || !lr.test(r)) && ("v6" !== o && o || !cr.test(r)) && (n = this._getOrReturnCtx(e, n),
              Un(n, {
                  validation: "ip",
                  code: Ln.invalid_string,
                  message: i.message
              }),
              t.dirty())) : On.assertNever(i);
      var r, o, a;
      return {
          status: t.value,
          value: e.data
      }
  }
  _addCheck(e) {
      return new dr({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  email(e) {
      return this._addCheck({
          kind: "email",
          ...Jn.errToObj(e)
      })
  }
  url(e) {
      return this._addCheck({
          kind: "url",
          ...Jn.errToObj(e)
      })
  }
  emoji(e) {
      return this._addCheck({
          kind: "emoji",
          ...Jn.errToObj(e)
      })
  }
  uuid(e) {
      return this._addCheck({
          kind: "uuid",
          ...Jn.errToObj(e)
      })
  }
  cuid(e) {
      return this._addCheck({
          kind: "cuid",
          ...Jn.errToObj(e)
      })
  }
  cuid2(e) {
      return this._addCheck({
          kind: "cuid2",
          ...Jn.errToObj(e)
      })
  }
  ulid(e) {
      return this._addCheck({
          kind: "ulid",
          ...Jn.errToObj(e)
      })
  }
  ip(e) {
      return this._addCheck({
          kind: "ip",
          ...Jn.errToObj(e)
      })
  }
  datetime(e) {
      var t;
      return "string" == typeof e ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          message: e
      }) : this._addCheck({
          kind: "datetime",
          precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
          offset: null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
          ...Jn.errToObj(null == e ? void 0 : e.message)
      })
  }
  regex(e, t) {
      return this._addCheck({
          kind: "regex",
          regex: e,
          ...Jn.errToObj(t)
      })
  }
  includes(e, t) {
      return this._addCheck({
          kind: "includes",
          value: e,
          position: null == t ? void 0 : t.position,
          ...Jn.errToObj(null == t ? void 0 : t.message)
      })
  }
  startsWith(e, t) {
      return this._addCheck({
          kind: "startsWith",
          value: e,
          ...Jn.errToObj(t)
      })
  }
  endsWith(e, t) {
      return this._addCheck({
          kind: "endsWith",
          value: e,
          ...Jn.errToObj(t)
      })
  }
  min(e, t) {
      return this._addCheck({
          kind: "min",
          value: e,
          ...Jn.errToObj(t)
      })
  }
  max(e, t) {
      return this._addCheck({
          kind: "max",
          value: e,
          ...Jn.errToObj(t)
      })
  }
  length(e, t) {
      return this._addCheck({
          kind: "length",
          value: e,
          ...Jn.errToObj(t)
      })
  }
  get isDatetime() {
      return !!this._def.checks.find((e=>"datetime" === e.kind))
  }
  get isEmail() {
      return !!this._def.checks.find((e=>"email" === e.kind))
  }
  get isURL() {
      return !!this._def.checks.find((e=>"url" === e.kind))
  }
  get isEmoji() {
      return !!this._def.checks.find((e=>"emoji" === e.kind))
  }
  get isUUID() {
      return !!this._def.checks.find((e=>"uuid" === e.kind))
  }
  get isCUID() {
      return !!this._def.checks.find((e=>"cuid" === e.kind))
  }
  get isCUID2() {
      return !!this._def.checks.find((e=>"cuid2" === e.kind))
  }
  get isULID() {
      return !!this._def.checks.find((e=>"ulid" === e.kind))
  }
  get isIP() {
      return !!this._def.checks.find((e=>"ip" === e.kind))
  }
  get minLength() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e
  }
  get maxLength() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e
  }
}
function ur(e, t) {
  const n = (e.toString().split(".")[1] || "").length
    , r = (t.toString().split(".")[1] || "").length
    , o = n > r ? n : r;
  return parseInt(e.toFixed(o).replace(".", "")) % parseInt(t.toFixed(o).replace(".", "")) / Math.pow(10, o)
}
dr.create = e=>{
  var t;
  return new dr({
      checks: [],
      typeName: Qr.ZodString,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...er(e)
  })
}
;
class pr extends tr {
  constructor() {
      super(...arguments),
      this.min = this.gte,
      this.max = this.lte,
      this.step = this.multipleOf
  }
  _parse(e) {
      this._def.coerce && (e.data = Number(e.data));
      if (this._getType(e) !== jn.number) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.number,
              received: t.parsedType
          }),
          Fn
      }
      let t;
      const n = new Vn;
      for (const r of this._def.checks)
          if ("int" === r.kind)
              On.isInteger(e.data) || (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.invalid_type,
                  expected: "integer",
                  received: "float",
                  message: r.message
              }),
              n.dirty());
          else if ("min" === r.kind) {
              (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.too_small,
                  minimum: r.value,
                  type: "number",
                  inclusive: r.inclusive,
                  exact: !1,
                  message: r.message
              }),
              n.dirty())
          } else if ("max" === r.kind) {
              (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.too_big,
                  maximum: r.value,
                  type: "number",
                  inclusive: r.inclusive,
                  exact: !1,
                  message: r.message
              }),
              n.dirty())
          } else
              "multipleOf" === r.kind ? 0 !== ur(e.data, r.value) && (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.not_multiple_of,
                  multipleOf: r.value,
                  message: r.message
              }),
              n.dirty()) : "finite" === r.kind ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.not_finite,
                  message: r.message
              }),
              n.dirty()) : On.assertNever(r);
      return {
          status: n.value,
          value: e.data
      }
  }
  gte(e, t) {
      return this.setLimit("min", e, !0, Jn.toString(t))
  }
  gt(e, t) {
      return this.setLimit("min", e, !1, Jn.toString(t))
  }
  lte(e, t) {
      return this.setLimit("max", e, !0, Jn.toString(t))
  }
  lt(e, t) {
      return this.setLimit("max", e, !1, Jn.toString(t))
  }
  setLimit(e, t, n, r) {
      return new pr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: e,
              value: t,
              inclusive: n,
              message: Jn.toString(r)
          }]
      })
  }
  _addCheck(e) {
      return new pr({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  int(e) {
      return this._addCheck({
          kind: "int",
          message: Jn.toString(e)
      })
  }
  positive(e) {
      return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: !1,
          message: Jn.toString(e)
      })
  }
  negative(e) {
      return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: !1,
          message: Jn.toString(e)
      })
  }
  nonpositive(e) {
      return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: !0,
          message: Jn.toString(e)
      })
  }
  nonnegative(e) {
      return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: !0,
          message: Jn.toString(e)
      })
  }
  multipleOf(e, t) {
      return this._addCheck({
          kind: "multipleOf",
          value: e,
          message: Jn.toString(t)
      })
  }
  finite(e) {
      return this._addCheck({
          kind: "finite",
          message: Jn.toString(e)
      })
  }
  safe(e) {
      return this._addCheck({
          kind: "min",
          inclusive: !0,
          value: Number.MIN_SAFE_INTEGER,
          message: Jn.toString(e)
      })._addCheck({
          kind: "max",
          inclusive: !0,
          value: Number.MAX_SAFE_INTEGER,
          message: Jn.toString(e)
      })
  }
  get minValue() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e
  }
  get maxValue() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e
  }
  get isInt() {
      return !!this._def.checks.find((e=>"int" === e.kind || "multipleOf" === e.kind && On.isInteger(e.value)))
  }
  get isFinite() {
      let e = null
        , t = null;
      for (const n of this._def.checks) {
          if ("finite" === n.kind || "int" === n.kind || "multipleOf" === n.kind)
              return !0;
          "min" === n.kind ? (null === t || n.value > t) && (t = n.value) : "max" === n.kind && (null === e || n.value < e) && (e = n.value)
      }
      return Number.isFinite(t) && Number.isFinite(e)
  }
}
pr.create = e=>new pr({
  checks: [],
  typeName: Qr.ZodNumber,
  coerce: (null == e ? void 0 : e.coerce) || !1,
  ...er(e)
});
class hr extends tr {
  constructor() {
      super(...arguments),
      this.min = this.gte,
      this.max = this.lte
  }
  _parse(e) {
      this._def.coerce && (e.data = BigInt(e.data));
      if (this._getType(e) !== jn.bigint) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.bigint,
              received: t.parsedType
          }),
          Fn
      }
      let t;
      const n = new Vn;
      for (const r of this._def.checks)
          if ("min" === r.kind) {
              (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.too_small,
                  type: "bigint",
                  minimum: r.value,
                  inclusive: r.inclusive,
                  message: r.message
              }),
              n.dirty())
          } else if ("max" === r.kind) {
              (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.too_big,
                  type: "bigint",
                  maximum: r.value,
                  inclusive: r.inclusive,
                  message: r.message
              }),
              n.dirty())
          } else
              "multipleOf" === r.kind ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t),
              Un(t, {
                  code: Ln.not_multiple_of,
                  multipleOf: r.value,
                  message: r.message
              }),
              n.dirty()) : On.assertNever(r);
      return {
          status: n.value,
          value: e.data
      }
  }
  gte(e, t) {
      return this.setLimit("min", e, !0, Jn.toString(t))
  }
  gt(e, t) {
      return this.setLimit("min", e, !1, Jn.toString(t))
  }
  lte(e, t) {
      return this.setLimit("max", e, !0, Jn.toString(t))
  }
  lt(e, t) {
      return this.setLimit("max", e, !1, Jn.toString(t))
  }
  setLimit(e, t, n, r) {
      return new hr({
          ...this._def,
          checks: [...this._def.checks, {
              kind: e,
              value: t,
              inclusive: n,
              message: Jn.toString(r)
          }]
      })
  }
  _addCheck(e) {
      return new hr({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  positive(e) {
      return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: !1,
          message: Jn.toString(e)
      })
  }
  negative(e) {
      return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: !1,
          message: Jn.toString(e)
      })
  }
  nonpositive(e) {
      return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: !0,
          message: Jn.toString(e)
      })
  }
  nonnegative(e) {
      return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: !0,
          message: Jn.toString(e)
      })
  }
  multipleOf(e, t) {
      return this._addCheck({
          kind: "multipleOf",
          value: e,
          message: Jn.toString(t)
      })
  }
  get minValue() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e
  }
  get maxValue() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e
  }
}
hr.create = e=>{
  var t;
  return new hr({
      checks: [],
      typeName: Qr.ZodBigInt,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...er(e)
  })
}
;
class fr extends tr {
  _parse(e) {
      this._def.coerce && (e.data = Boolean(e.data));
      if (this._getType(e) !== jn.boolean) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.boolean,
              received: t.parsedType
          }),
          Fn
      }
      return Gn(e.data)
  }
}
fr.create = e=>new fr({
  typeName: Qr.ZodBoolean,
  coerce: (null == e ? void 0 : e.coerce) || !1,
  ...er(e)
});
class gr extends tr {
  _parse(e) {
      this._def.coerce && (e.data = new Date(e.data));
      if (this._getType(e) !== jn.date) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.date,
              received: t.parsedType
          }),
          Fn
      }
      if (isNaN(e.data.getTime())) {
          return Un(this._getOrReturnCtx(e), {
              code: Ln.invalid_date
          }),
          Fn
      }
      const t = new Vn;
      let n;
      for (const r of this._def.checks)
          "min" === r.kind ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n),
          Un(n, {
              code: Ln.too_small,
              message: r.message,
              inclusive: !0,
              exact: !1,
              minimum: r.value,
              type: "date"
          }),
          t.dirty()) : "max" === r.kind ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n),
          Un(n, {
              code: Ln.too_big,
              message: r.message,
              inclusive: !0,
              exact: !1,
              maximum: r.value,
              type: "date"
          }),
          t.dirty()) : On.assertNever(r);
      return {
          status: t.value,
          value: new Date(e.data.getTime())
      }
  }
  _addCheck(e) {
      return new gr({
          ...this._def,
          checks: [...this._def.checks, e]
      })
  }
  min(e, t) {
      return this._addCheck({
          kind: "min",
          value: e.getTime(),
          message: Jn.toString(t)
      })
  }
  max(e, t) {
      return this._addCheck({
          kind: "max",
          value: e.getTime(),
          message: Jn.toString(t)
      })
  }
  get minDate() {
      let e = null;
      for (const t of this._def.checks)
          "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return null != e ? new Date(e) : null
  }
  get maxDate() {
      let e = null;
      for (const t of this._def.checks)
          "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return null != e ? new Date(e) : null
  }
}
gr.create = e=>new gr({
  checks: [],
  coerce: (null == e ? void 0 : e.coerce) || !1,
  typeName: Qr.ZodDate,
  ...er(e)
});
class mr extends tr {
  _parse(e) {
      if (this._getType(e) !== jn.symbol) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.symbol,
              received: t.parsedType
          }),
          Fn
      }
      return Gn(e.data)
  }
}
mr.create = e=>new mr({
  typeName: Qr.ZodSymbol,
  ...er(e)
});
class br extends tr {
  _parse(e) {
      if (this._getType(e) !== jn.undefined) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.undefined,
              received: t.parsedType
          }),
          Fn
      }
      return Gn(e.data)
  }
}
br.create = e=>new br({
  typeName: Qr.ZodUndefined,
  ...er(e)
});
class yr extends tr {
  _parse(e) {
      if (this._getType(e) !== jn.null) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.null,
              received: t.parsedType
          }),
          Fn
      }
      return Gn(e.data)
  }
}
yr.create = e=>new yr({
  typeName: Qr.ZodNull,
  ...er(e)
});
class vr extends tr {
  constructor() {
      super(...arguments),
      this._any = !0
  }
  _parse(e) {
      return Gn(e.data)
  }
}
vr.create = e=>new vr({
  typeName: Qr.ZodAny,
  ...er(e)
});
class wr extends tr {
  constructor() {
      super(...arguments),
      this._unknown = !0
  }
  _parse(e) {
      return Gn(e.data)
  }
}
wr.create = e=>new wr({
  typeName: Qr.ZodUnknown,
  ...er(e)
});
class _r extends tr {
  _parse(e) {
      const t = this._getOrReturnCtx(e);
      return Un(t, {
          code: Ln.invalid_type,
          expected: jn.never,
          received: t.parsedType
      }),
      Fn
  }
}
_r.create = e=>new _r({
  typeName: Qr.ZodNever,
  ...er(e)
});
class xr extends tr {
  _parse(e) {
      if (this._getType(e) !== jn.undefined) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.void,
              received: t.parsedType
          }),
          Fn
      }
      return Gn(e.data)
  }
}
xr.create = e=>new xr({
  typeName: Qr.ZodVoid,
  ...er(e)
});
class kr extends tr {
  _parse(e) {
      const {ctx: t, status: n} = this._processInputParams(e)
        , r = this._def;
      if (t.parsedType !== jn.array)
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.array,
              received: t.parsedType
          }),
          Fn;
      if (null !== r.exactLength) {
          const e = t.data.length > r.exactLength.value
            , o = t.data.length < r.exactLength.value;
          (e || o) && (Un(t, {
              code: e ? Ln.too_big : Ln.too_small,
              minimum: o ? r.exactLength.value : void 0,
              maximum: e ? r.exactLength.value : void 0,
              type: "array",
              inclusive: !0,
              exact: !0,
              message: r.exactLength.message
          }),
          n.dirty())
      }
      if (null !== r.minLength && t.data.length < r.minLength.value && (Un(t, {
          code: Ln.too_small,
          minimum: r.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: r.minLength.message
      }),
      n.dirty()),
      null !== r.maxLength && t.data.length > r.maxLength.value && (Un(t, {
          code: Ln.too_big,
          maximum: r.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: r.maxLength.message
      }),
      n.dirty()),
      t.common.async)
          return Promise.all([...t.data].map(((e,n)=>r.type._parseAsync(new Xn(t,e,t.path,n))))).then((e=>Vn.mergeArray(n, e)));
      const o = [...t.data].map(((e,n)=>r.type._parseSync(new Xn(t,e,t.path,n))));
      return Vn.mergeArray(n, o)
  }
  get element() {
      return this._def.type
  }
  min(e, t) {
      return new kr({
          ...this._def,
          minLength: {
              value: e,
              message: Jn.toString(t)
          }
      })
  }
  max(e, t) {
      return new kr({
          ...this._def,
          maxLength: {
              value: e,
              message: Jn.toString(t)
          }
      })
  }
  length(e, t) {
      return new kr({
          ...this._def,
          exactLength: {
              value: e,
              message: Jn.toString(t)
          }
      })
  }
  nonempty(e) {
      return this.min(1, e)
  }
}
function Cr(e) {
  if (e instanceof Sr) {
      const t = {};
      for (const n in e.shape) {
          const r = e.shape[n];
          t[n] = Vr.create(Cr(r))
      }
      return new Sr({
          ...e._def,
          shape: ()=>t
      })
  }
  return e instanceof kr ? new kr({
      ...e._def,
      type: Cr(e.element)
  }) : e instanceof Vr ? Vr.create(Cr(e.unwrap())) : e instanceof Fr ? Fr.create(Cr(e.unwrap())) : e instanceof Ar ? Ar.create(e.items.map((e=>Cr(e)))) : e
}
kr.create = (e,t)=>new kr({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: Qr.ZodArray,
  ...er(t)
});
class Sr extends tr {
  constructor() {
      super(...arguments),
      this._cached = null,
      this.nonstrict = this.passthrough,
      this.augment = this.extend
  }
  _getCached() {
      if (null !== this._cached)
          return this._cached;
      const e = this._def.shape()
        , t = On.objectKeys(e);
      return this._cached = {
          shape: e,
          keys: t
      }
  }
  _parse(e) {
      if (this._getType(e) !== jn.object) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.object,
              received: t.parsedType
          }),
          Fn
      }
      const {status: t, ctx: n} = this._processInputParams(e)
        , {shape: r, keys: o} = this._getCached()
        , a = [];
      if (!(this._def.catchall instanceof _r && "strip" === this._def.unknownKeys))
          for (const e in n.data)
              o.includes(e) || a.push(e);
      const i = [];
      for (const e of o) {
          const t = r[e]
            , o = n.data[e];
          i.push({
              key: {
                  status: "valid",
                  value: e
              },
              value: t._parse(new Xn(n,o,n.path,e)),
              alwaysSet: e in n.data
          })
      }
      if (this._def.catchall instanceof _r) {
          const e = this._def.unknownKeys;
          if ("passthrough" === e)
              for (const e of a)
                  i.push({
                      key: {
                          status: "valid",
                          value: e
                      },
                      value: {
                          status: "valid",
                          value: n.data[e]
                      }
                  });
          else if ("strict" === e)
              a.length > 0 && (Un(n, {
                  code: Ln.unrecognized_keys,
                  keys: a
              }),
              t.dirty());
          else if ("strip" !== e)
              throw new Error("Internal ZodObject error: invalid unknownKeys value.")
      } else {
          const e = this._def.catchall;
          for (const t of a) {
              const r = n.data[t];
              i.push({
                  key: {
                      status: "valid",
                      value: t
                  },
                  value: e._parse(new Xn(n,r,n.path,t)),
                  alwaysSet: t in n.data
              })
          }
      }
      return n.common.async ? Promise.resolve().then((async()=>{
          const e = [];
          for (const t of i) {
              const n = await t.key;
              e.push({
                  key: n,
                  value: await t.value,
                  alwaysSet: t.alwaysSet
              })
          }
          return e
      }
      )).then((e=>Vn.mergeObjectSync(t, e))) : Vn.mergeObjectSync(t, i)
  }
  get shape() {
      return this._def.shape()
  }
  strict(e) {
      return Jn.errToObj,
      new Sr({
          ...this._def,
          unknownKeys: "strict",
          ...void 0 !== e ? {
              errorMap: (t,n)=>{
                  var r, o, a, i;
                  const s = null !== (a = null === (o = (r = this._def).errorMap) || void 0 === o ? void 0 : o.call(r, t, n).message) && void 0 !== a ? a : n.defaultError;
                  return "unrecognized_keys" === t.code ? {
                      message: null !== (i = Jn.errToObj(e).message) && void 0 !== i ? i : s
                  } : {
                      message: s
                  }
              }
          } : {}
      })
  }
  strip() {
      return new Sr({
          ...this._def,
          unknownKeys: "strip"
      })
  }
  passthrough() {
      return new Sr({
          ...this._def,
          unknownKeys: "passthrough"
      })
  }
  extend(e) {
      return new Sr({
          ...this._def,
          shape: ()=>({
              ...this._def.shape(),
              ...e
          })
      })
  }
  merge(e) {
      return new Sr({
          unknownKeys: e._def.unknownKeys,
          catchall: e._def.catchall,
          shape: ()=>({
              ...this._def.shape(),
              ...e._def.shape()
          }),
          typeName: Qr.ZodObject
      })
  }
  setKey(e, t) {
      return this.augment({
          [e]: t
      })
  }
  catchall(e) {
      return new Sr({
          ...this._def,
          catchall: e
      })
  }
  pick(e) {
      const t = {};
      return On.objectKeys(e).forEach((n=>{
          e[n] && this.shape[n] && (t[n] = this.shape[n])
      }
      )),
      new Sr({
          ...this._def,
          shape: ()=>t
      })
  }
  omit(e) {
      const t = {};
      return On.objectKeys(this.shape).forEach((n=>{
          e[n] || (t[n] = this.shape[n])
      }
      )),
      new Sr({
          ...this._def,
          shape: ()=>t
      })
  }
  deepPartial() {
      return Cr(this)
  }
  partial(e) {
      const t = {};
      return On.objectKeys(this.shape).forEach((n=>{
          const r = this.shape[n];
          e && !e[n] ? t[n] = r : t[n] = r.optional()
      }
      )),
      new Sr({
          ...this._def,
          shape: ()=>t
      })
  }
  required(e) {
      const t = {};
      return On.objectKeys(this.shape).forEach((n=>{
          if (e && !e[n])
              t[n] = this.shape[n];
          else {
              let e = this.shape[n];
              for (; e instanceof Vr; )
                  e = e._def.innerType;
              t[n] = e
          }
      }
      )),
      new Sr({
          ...this._def,
          shape: ()=>t
      })
  }
  keyof() {
      return Zr(On.objectKeys(this.shape))
  }
}
Sr.create = (e,t)=>new Sr({
  shape: ()=>e,
  unknownKeys: "strip",
  catchall: _r.create(),
  typeName: Qr.ZodObject,
  ...er(t)
}),
Sr.strictCreate = (e,t)=>new Sr({
  shape: ()=>e,
  unknownKeys: "strict",
  catchall: _r.create(),
  typeName: Qr.ZodObject,
  ...er(t)
}),
Sr.lazycreate = (e,t)=>new Sr({
  shape: e,
  unknownKeys: "strip",
  catchall: _r.create(),
  typeName: Qr.ZodObject,
  ...er(t)
});
class Tr extends tr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e)
        , n = this._def.options;
      if (t.common.async)
          return Promise.all(n.map((async e=>{
              const n = {
                  ...t,
                  common: {
                      ...t.common,
                      issues: []
                  },
                  parent: null
              };
              return {
                  result: await e._parseAsync({
                      data: t.data,
                      path: t.path,
                      parent: n
                  }),
                  ctx: n
              }
          }
          ))).then((function(e) {
              for (const t of e)
                  if ("valid" === t.result.status)
                      return t.result;
              for (const n of e)
                  if ("dirty" === n.result.status)
                      return t.common.issues.push(...n.ctx.common.issues),
                      n.result;
              const n = e.map((e=>new Rn(e.ctx.common.issues)));
              return Un(t, {
                  code: Ln.invalid_union,
                  unionErrors: n
              }),
              Fn
          }
          ));
      {
          let e;
          const r = [];
          for (const o of n) {
              const n = {
                  ...t,
                  common: {
                      ...t.common,
                      issues: []
                  },
                  parent: null
              }
                , a = o._parseSync({
                  data: t.data,
                  path: t.path,
                  parent: n
              });
              if ("valid" === a.status)
                  return a;
              "dirty" !== a.status || e || (e = {
                  result: a,
                  ctx: n
              }),
              n.common.issues.length && r.push(n.common.issues)
          }
          if (e)
              return t.common.issues.push(...e.ctx.common.issues),
              e.result;
          const o = r.map((e=>new Rn(e)));
          return Un(t, {
              code: Ln.invalid_union,
              unionErrors: o
          }),
          Fn
      }
  }
  get options() {
      return this._def.options
  }
}
Tr.create = (e,t)=>new Tr({
  options: e,
  typeName: Qr.ZodUnion,
  ...er(t)
});
const $r = e=>e instanceof Lr ? $r(e.schema) : e instanceof Ur ? $r(e.innerType()) : e instanceof Rr ? [e.value] : e instanceof Br ? e.options : e instanceof zr ? Object.keys(e.enum) : e instanceof Hr ? $r(e._def.innerType) : e instanceof br ? [void 0] : e instanceof yr ? [null] : null;
class Ir extends tr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== jn.object)
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.object,
              received: t.parsedType
          }),
          Fn;
      const n = this.discriminator
        , r = t.data[n]
        , o = this.optionsMap.get(r);
      return o ? t.common.async ? o._parseAsync({
          data: t.data,
          path: t.path,
          parent: t
      }) : o._parseSync({
          data: t.data,
          path: t.path,
          parent: t
      }) : (Un(t, {
          code: Ln.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [n]
      }),
      Fn)
  }
  get discriminator() {
      return this._def.discriminator
  }
  get options() {
      return this._def.options
  }
  get optionsMap() {
      return this._def.optionsMap
  }
  static create(e, t, n) {
      const r = new Map;
      for (const n of t) {
          const t = $r(n.shape[e]);
          if (!t)
              throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
          for (const o of t) {
              if (r.has(o))
                  throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
              r.set(o, n)
          }
      }
      return new Ir({
          typeName: Qr.ZodDiscriminatedUnion,
          discriminator: e,
          options: t,
          optionsMap: r,
          ...er(n)
      })
  }
}
function Er(e, t) {
  const n = Mn(e)
    , r = Mn(t);
  if (e === t)
      return {
          valid: !0,
          data: e
      };
  if (n === jn.object && r === jn.object) {
      const n = On.objectKeys(t)
        , r = On.objectKeys(e).filter((e=>-1 !== n.indexOf(e)))
        , o = {
          ...e,
          ...t
      };
      for (const n of r) {
          const r = Er(e[n], t[n]);
          if (!r.valid)
              return {
                  valid: !1
              };
          o[n] = r.data
      }
      return {
          valid: !0,
          data: o
      }
  }
  if (n === jn.array && r === jn.array) {
      if (e.length !== t.length)
          return {
              valid: !1
          };
      const n = [];
      for (let r = 0; r < e.length; r++) {
          const o = Er(e[r], t[r]);
          if (!o.valid)
              return {
                  valid: !1
              };
          n.push(o.data)
      }
      return {
          valid: !0,
          data: n
      }
  }
  return n === jn.date && r === jn.date && +e == +t ? {
      valid: !0,
      data: e
  } : {
      valid: !1
  }
}
class Pr extends tr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e)
        , r = (e,r)=>{
          if (Kn(e) || Kn(r))
              return Fn;
          const o = Er(e.value, r.value);
          return o.valid ? ((qn(e) || qn(r)) && t.dirty(),
          {
              status: t.value,
              value: o.data
          }) : (Un(n, {
              code: Ln.invalid_intersection_types
          }),
          Fn)
      }
      ;
      return n.common.async ? Promise.all([this._def.left._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
      }), this._def.right._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
      })]).then((([e,t])=>r(e, t))) : r(this._def.left._parseSync({
          data: n.data,
          path: n.path,
          parent: n
      }), this._def.right._parseSync({
          data: n.data,
          path: n.path,
          parent: n
      }))
  }
}
Pr.create = (e,t,n)=>new Pr({
  left: e,
  right: t,
  typeName: Qr.ZodIntersection,
  ...er(n)
});
class Ar extends tr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== jn.array)
          return Un(n, {
              code: Ln.invalid_type,
              expected: jn.array,
              received: n.parsedType
          }),
          Fn;
      if (n.data.length < this._def.items.length)
          return Un(n, {
              code: Ln.too_small,
              minimum: this._def.items.length,
              inclusive: !0,
              exact: !1,
              type: "array"
          }),
          Fn;
      !this._def.rest && n.data.length > this._def.items.length && (Un(n, {
          code: Ln.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array"
      }),
      t.dirty());
      const r = [...n.data].map(((e,t)=>{
          const r = this._def.items[t] || this._def.rest;
          return r ? r._parse(new Xn(n,e,n.path,t)) : null
      }
      )).filter((e=>!!e));
      return n.common.async ? Promise.all(r).then((e=>Vn.mergeArray(t, e))) : Vn.mergeArray(t, r)
  }
  get items() {
      return this._def.items
  }
  rest(e) {
      return new Ar({
          ...this._def,
          rest: e
      })
  }
}
Ar.create = (e,t)=>{
  if (!Array.isArray(e))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Ar({
      items: e,
      typeName: Qr.ZodTuple,
      rest: null,
      ...er(t)
  })
}
;
class Or extends tr {
  get keySchema() {
      return this._def.keyType
  }
  get valueSchema() {
      return this._def.valueType
  }
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== jn.object)
          return Un(n, {
              code: Ln.invalid_type,
              expected: jn.object,
              received: n.parsedType
          }),
          Fn;
      const r = []
        , o = this._def.keyType
        , a = this._def.valueType;
      for (const e in n.data)
          r.push({
              key: o._parse(new Xn(n,e,n.path,e)),
              value: a._parse(new Xn(n,n.data[e],n.path,e))
          });
      return n.common.async ? Vn.mergeObjectAsync(t, r) : Vn.mergeObjectSync(t, r)
  }
  get element() {
      return this._def.valueType
  }
  static create(e, t, n) {
      return new Or(t instanceof tr ? {
          keyType: e,
          valueType: t,
          typeName: Qr.ZodRecord,
          ...er(n)
      } : {
          keyType: dr.create(),
          valueType: e,
          typeName: Qr.ZodRecord,
          ...er(t)
      })
  }
}
class Nr extends tr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== jn.map)
          return Un(n, {
              code: Ln.invalid_type,
              expected: jn.map,
              received: n.parsedType
          }),
          Fn;
      const r = this._def.keyType
        , o = this._def.valueType
        , a = [...n.data.entries()].map((([e,t],a)=>({
          key: r._parse(new Xn(n,e,n.path,[a, "key"])),
          value: o._parse(new Xn(n,t,n.path,[a, "value"]))
      })));
      if (n.common.async) {
          const e = new Map;
          return Promise.resolve().then((async()=>{
              for (const n of a) {
                  const r = await n.key
                    , o = await n.value;
                  if ("aborted" === r.status || "aborted" === o.status)
                      return Fn;
                  "dirty" !== r.status && "dirty" !== o.status || t.dirty(),
                  e.set(r.value, o.value)
              }
              return {
                  status: t.value,
                  value: e
              }
          }
          ))
      }
      {
          const e = new Map;
          for (const n of a) {
              const r = n.key
                , o = n.value;
              if ("aborted" === r.status || "aborted" === o.status)
                  return Fn;
              "dirty" !== r.status && "dirty" !== o.status || t.dirty(),
              e.set(r.value, o.value)
          }
          return {
              status: t.value,
              value: e
          }
      }
  }
}
Nr.create = (e,t,n)=>new Nr({
  valueType: t,
  keyType: e,
  typeName: Qr.ZodMap,
  ...er(n)
});
class jr extends tr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.parsedType !== jn.set)
          return Un(n, {
              code: Ln.invalid_type,
              expected: jn.set,
              received: n.parsedType
          }),
          Fn;
      const r = this._def;
      null !== r.minSize && n.data.size < r.minSize.value && (Un(n, {
          code: Ln.too_small,
          minimum: r.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: r.minSize.message
      }),
      t.dirty()),
      null !== r.maxSize && n.data.size > r.maxSize.value && (Un(n, {
          code: Ln.too_big,
          maximum: r.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: r.maxSize.message
      }),
      t.dirty());
      const o = this._def.valueType;
      function a(e) {
          const n = new Set;
          for (const r of e) {
              if ("aborted" === r.status)
                  return Fn;
              "dirty" === r.status && t.dirty(),
              n.add(r.value)
          }
          return {
              status: t.value,
              value: n
          }
      }
      const i = [...n.data.values()].map(((e,t)=>o._parse(new Xn(n,e,n.path,t))));
      return n.common.async ? Promise.all(i).then((e=>a(e))) : a(i)
  }
  min(e, t) {
      return new jr({
          ...this._def,
          minSize: {
              value: e,
              message: Jn.toString(t)
          }
      })
  }
  max(e, t) {
      return new jr({
          ...this._def,
          maxSize: {
              value: e,
              message: Jn.toString(t)
          }
      })
  }
  size(e, t) {
      return this.min(e, t).max(e, t)
  }
  nonempty(e) {
      return this.min(1, e)
  }
}
jr.create = (e,t)=>new jr({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: Qr.ZodSet,
  ...er(t)
});
class Mr extends tr {
  constructor() {
      super(...arguments),
      this.validate = this.implement
  }
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== jn.function)
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.function,
              received: t.parsedType
          }),
          Fn;
      function n(e, n) {
          return Dn({
              data: e,
              path: t.path,
              errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, zn(), Zn].filter((e=>!!e)),
              issueData: {
                  code: Ln.invalid_arguments,
                  argumentsError: n
              }
          })
      }
      function r(e, n) {
          return Dn({
              data: e,
              path: t.path,
              errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, zn(), Zn].filter((e=>!!e)),
              issueData: {
                  code: Ln.invalid_return_type,
                  returnTypeError: n
              }
          })
      }
      const o = {
          errorMap: t.common.contextualErrorMap
      }
        , a = t.data;
      return this._def.returns instanceof Dr ? Gn((async(...e)=>{
          const t = new Rn([])
            , i = await this._def.args.parseAsync(e, o).catch((r=>{
              throw t.addIssue(n(e, r)),
              t
          }
          ))
            , s = await a(...i);
          return await this._def.returns._def.type.parseAsync(s, o).catch((e=>{
              throw t.addIssue(r(s, e)),
              t
          }
          ))
      }
      )) : Gn(((...e)=>{
          const t = this._def.args.safeParse(e, o);
          if (!t.success)
              throw new Rn([n(e, t.error)]);
          const i = a(...t.data)
            , s = this._def.returns.safeParse(i, o);
          if (!s.success)
              throw new Rn([r(i, s.error)]);
          return s.data
      }
      ))
  }
  parameters() {
      return this._def.args
  }
  returnType() {
      return this._def.returns
  }
  args(...e) {
      return new Mr({
          ...this._def,
          args: Ar.create(e).rest(wr.create())
      })
  }
  returns(e) {
      return new Mr({
          ...this._def,
          returns: e
      })
  }
  implement(e) {
      return this.parse(e)
  }
  strictImplement(e) {
      return this.parse(e)
  }
  static create(e, t, n) {
      return new Mr({
          args: e || Ar.create([]).rest(wr.create()),
          returns: t || wr.create(),
          typeName: Qr.ZodFunction,
          ...er(n)
      })
  }
}
class Lr extends tr {
  get schema() {
      return this._def.getter()
  }
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      return this._def.getter()._parse({
          data: t.data,
          path: t.path,
          parent: t
      })
  }
}
Lr.create = (e,t)=>new Lr({
  getter: e,
  typeName: Qr.ZodLazy,
  ...er(t)
});
class Rr extends tr {
  _parse(e) {
      if (e.data !== this._def.value) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              received: t.data,
              code: Ln.invalid_literal,
              expected: this._def.value
          }),
          Fn
      }
      return {
          status: "valid",
          value: e.data
      }
  }
  get value() {
      return this._def.value
  }
}
function Zr(e, t) {
  return new Br({
      values: e,
      typeName: Qr.ZodEnum,
      ...er(t)
  })
}
Rr.create = (e,t)=>new Rr({
  value: e,
  typeName: Qr.ZodLiteral,
  ...er(t)
});
class Br extends tr {
  _parse(e) {
      if ("string" != typeof e.data) {
          const t = this._getOrReturnCtx(e)
            , n = this._def.values;
          return Un(t, {
              expected: On.joinValues(n),
              received: t.parsedType,
              code: Ln.invalid_type
          }),
          Fn
      }
      if (-1 === this._def.values.indexOf(e.data)) {
          const t = this._getOrReturnCtx(e)
            , n = this._def.values;
          return Un(t, {
              received: t.data,
              code: Ln.invalid_enum_value,
              options: n
          }),
          Fn
      }
      return Gn(e.data)
  }
  get options() {
      return this._def.values
  }
  get enum() {
      const e = {};
      for (const t of this._def.values)
          e[t] = t;
      return e
  }
  get Values() {
      const e = {};
      for (const t of this._def.values)
          e[t] = t;
      return e
  }
  get Enum() {
      const e = {};
      for (const t of this._def.values)
          e[t] = t;
      return e
  }
  extract(e) {
      return Br.create(e)
  }
  exclude(e) {
      return Br.create(this.options.filter((t=>!e.includes(t))))
  }
}
Br.create = Zr;
class zr extends tr {
  _parse(e) {
      const t = On.getValidEnumValues(this._def.values)
        , n = this._getOrReturnCtx(e);
      if (n.parsedType !== jn.string && n.parsedType !== jn.number) {
          const e = On.objectValues(t);
          return Un(n, {
              expected: On.joinValues(e),
              received: n.parsedType,
              code: Ln.invalid_type
          }),
          Fn
      }
      if (-1 === t.indexOf(e.data)) {
          const e = On.objectValues(t);
          return Un(n, {
              received: n.data,
              code: Ln.invalid_enum_value,
              options: e
          }),
          Fn
      }
      return Gn(e.data)
  }
  get enum() {
      return this._def.values
  }
}
zr.create = (e,t)=>new zr({
  values: e,
  typeName: Qr.ZodNativeEnum,
  ...er(t)
});
class Dr extends tr {
  unwrap() {
      return this._def.type
  }
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      if (t.parsedType !== jn.promise && !1 === t.common.async)
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.promise,
              received: t.parsedType
          }),
          Fn;
      const n = t.parsedType === jn.promise ? t.data : Promise.resolve(t.data);
      return Gn(n.then((e=>this._def.type.parseAsync(e, {
          path: t.path,
          errorMap: t.common.contextualErrorMap
      }))))
  }
}
Dr.create = (e,t)=>new Dr({
  type: e,
  typeName: Qr.ZodPromise,
  ...er(t)
});
class Ur extends tr {
  innerType() {
      return this._def.schema
  }
  sourceType() {
      return this._def.schema._def.typeName === Qr.ZodEffects ? this._def.schema.sourceType() : this._def.schema
  }
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e)
        , r = this._def.effect || null;
      if ("preprocess" === r.type) {
          const e = r.transform(n.data);
          return n.common.async ? Promise.resolve(e).then((e=>this._def.schema._parseAsync({
              data: e,
              path: n.path,
              parent: n
          }))) : this._def.schema._parseSync({
              data: e,
              path: n.path,
              parent: n
          })
      }
      const o = {
          addIssue: e=>{
              Un(n, e),
              e.fatal ? t.abort() : t.dirty()
          }
          ,
          get path() {
              return n.path
          }
      };
      if (o.addIssue = o.addIssue.bind(o),
      "refinement" === r.type) {
          const e = e=>{
              const t = r.refinement(e, o);
              if (n.common.async)
                  return Promise.resolve(t);
              if (t instanceof Promise)
                  throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
              return e
          }
          ;
          if (!1 === n.common.async) {
              const r = this._def.schema._parseSync({
                  data: n.data,
                  path: n.path,
                  parent: n
              });
              return "aborted" === r.status ? Fn : ("dirty" === r.status && t.dirty(),
              e(r.value),
              {
                  status: t.value,
                  value: r.value
              })
          }
          return this._def.schema._parseAsync({
              data: n.data,
              path: n.path,
              parent: n
          }).then((n=>"aborted" === n.status ? Fn : ("dirty" === n.status && t.dirty(),
          e(n.value).then((()=>({
              status: t.value,
              value: n.value
          }))))))
      }
      if ("transform" === r.type) {
          if (!1 === n.common.async) {
              const e = this._def.schema._parseSync({
                  data: n.data,
                  path: n.path,
                  parent: n
              });
              if (!Wn(e))
                  return e;
              const a = r.transform(e.value, o);
              if (a instanceof Promise)
                  throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
              return {
                  status: t.value,
                  value: a
              }
          }
          return this._def.schema._parseAsync({
              data: n.data,
              path: n.path,
              parent: n
          }).then((e=>Wn(e) ? Promise.resolve(r.transform(e.value, o)).then((e=>({
              status: t.value,
              value: e
          }))) : e))
      }
      On.assertNever(r)
  }
}
Ur.create = (e,t,n)=>new Ur({
  schema: e,
  typeName: Qr.ZodEffects,
  effect: t,
  ...er(n)
}),
Ur.createWithPreprocess = (e,t,n)=>new Ur({
  schema: t,
  effect: {
      type: "preprocess",
      transform: e
  },
  typeName: Qr.ZodEffects,
  ...er(n)
});
class Vr extends tr {
  _parse(e) {
      return this._getType(e) === jn.undefined ? Gn(void 0) : this._def.innerType._parse(e)
  }
  unwrap() {
      return this._def.innerType
  }
}
Vr.create = (e,t)=>new Vr({
  innerType: e,
  typeName: Qr.ZodOptional,
  ...er(t)
});
class Fr extends tr {
  _parse(e) {
      return this._getType(e) === jn.null ? Gn(null) : this._def.innerType._parse(e)
  }
  unwrap() {
      return this._def.innerType
  }
}
Fr.create = (e,t)=>new Fr({
  innerType: e,
  typeName: Qr.ZodNullable,
  ...er(t)
});
class Hr extends tr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e);
      let n = t.data;
      return t.parsedType === jn.undefined && (n = this._def.defaultValue()),
      this._def.innerType._parse({
          data: n,
          path: t.path,
          parent: t
      })
  }
  removeDefault() {
      return this._def.innerType
  }
}
Hr.create = (e,t)=>new Hr({
  innerType: e,
  typeName: Qr.ZodDefault,
  defaultValue: "function" == typeof t.default ? t.default : ()=>t.default,
  ...er(t)
});
class Gr extends tr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e)
        , n = {
          ...t,
          common: {
              ...t.common,
              issues: []
          }
      }
        , r = this._def.innerType._parse({
          data: n.data,
          path: n.path,
          parent: {
              ...n
          }
      });
      return Yn(r) ? r.then((e=>({
          status: "valid",
          value: "valid" === e.status ? e.value : this._def.catchValue({
              get error() {
                  return new Rn(n.common.issues)
              },
              input: n.data
          })
      }))) : {
          status: "valid",
          value: "valid" === r.status ? r.value : this._def.catchValue({
              get error() {
                  return new Rn(n.common.issues)
              },
              input: n.data
          })
      }
  }
  removeCatch() {
      return this._def.innerType
  }
}
Gr.create = (e,t)=>new Gr({
  innerType: e,
  typeName: Qr.ZodCatch,
  catchValue: "function" == typeof t.catch ? t.catch : ()=>t.catch,
  ...er(t)
});
class Kr extends tr {
  _parse(e) {
      if (this._getType(e) !== jn.nan) {
          const t = this._getOrReturnCtx(e);
          return Un(t, {
              code: Ln.invalid_type,
              expected: jn.nan,
              received: t.parsedType
          }),
          Fn
      }
      return {
          status: "valid",
          value: e.data
      }
  }
}
Kr.create = e=>new Kr({
  typeName: Qr.ZodNaN,
  ...er(e)
});
const qr = Symbol("zod_brand");
class Wr extends tr {
  _parse(e) {
      const {ctx: t} = this._processInputParams(e)
        , n = t.data;
      return this._def.type._parse({
          data: n,
          path: t.path,
          parent: t
      })
  }
  unwrap() {
      return this._def.type
  }
}
class Yr extends tr {
  _parse(e) {
      const {status: t, ctx: n} = this._processInputParams(e);
      if (n.common.async) {
          return (async()=>{
              const e = await this._def.in._parseAsync({
                  data: n.data,
                  path: n.path,
                  parent: n
              });
              return "aborted" === e.status ? Fn : "dirty" === e.status ? (t.dirty(),
              Hn(e.value)) : this._def.out._parseAsync({
                  data: e.value,
                  path: n.path,
                  parent: n
              })
          }
          )()
      }
      {
          const e = this._def.in._parseSync({
              data: n.data,
              path: n.path,
              parent: n
          });
          return "aborted" === e.status ? Fn : "dirty" === e.status ? (t.dirty(),
          {
              status: "dirty",
              value: e.value
          }) : this._def.out._parseSync({
              data: e.value,
              path: n.path,
              parent: n
          })
      }
  }
  static create(e, t) {
      return new Yr({
          in: e,
          out: t,
          typeName: Qr.ZodPipeline
      })
  }
}
const Jr = (e,t={},n)=>e ? vr.create().superRefine(((r,o)=>{
  var a, i;
  if (!e(r)) {
      const e = "function" == typeof t ? t(r) : "string" == typeof t ? {
          message: t
      } : t
        , s = null === (i = null !== (a = e.fatal) && void 0 !== a ? a : n) || void 0 === i || i
        , l = "string" == typeof e ? {
          message: e
      } : e;
      o.addIssue({
          code: "custom",
          ...l,
          fatal: s
      })
  }
}
)) : vr.create()
, Xr = {
  object: Sr.lazycreate
};
var Qr;
!function(e) {
  e.ZodString = "ZodString",
  e.ZodNumber = "ZodNumber",
  e.ZodNaN = "ZodNaN",
  e.ZodBigInt = "ZodBigInt",
  e.ZodBoolean = "ZodBoolean",
  e.ZodDate = "ZodDate",
  e.ZodSymbol = "ZodSymbol",
  e.ZodUndefined = "ZodUndefined",
  e.ZodNull = "ZodNull",
  e.ZodAny = "ZodAny",
  e.ZodUnknown = "ZodUnknown",
  e.ZodNever = "ZodNever",
  e.ZodVoid = "ZodVoid",
  e.ZodArray = "ZodArray",
  e.ZodObject = "ZodObject",
  e.ZodUnion = "ZodUnion",
  e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
  e.ZodIntersection = "ZodIntersection",
  e.ZodTuple = "ZodTuple",
  e.ZodRecord = "ZodRecord",
  e.ZodMap = "ZodMap",
  e.ZodSet = "ZodSet",
  e.ZodFunction = "ZodFunction",
  e.ZodLazy = "ZodLazy",
  e.ZodLiteral = "ZodLiteral",
  e.ZodEnum = "ZodEnum",
  e.ZodEffects = "ZodEffects",
  e.ZodNativeEnum = "ZodNativeEnum",
  e.ZodOptional = "ZodOptional",
  e.ZodNullable = "ZodNullable",
  e.ZodDefault = "ZodDefault",
  e.ZodCatch = "ZodCatch",
  e.ZodPromise = "ZodPromise",
  e.ZodBranded = "ZodBranded",
  e.ZodPipeline = "ZodPipeline"
}(Qr || (Qr = {}));
const eo = dr.create
, to = pr.create
, no = Kr.create
, ro = hr.create
, oo = fr.create
, ao = gr.create
, io = mr.create
, so = br.create
, lo = yr.create
, co = vr.create
, uo = wr.create
, po = _r.create
, ho = xr.create
, fo = kr.create
, go = Sr.create
, mo = Sr.strictCreate
, bo = Tr.create
, yo = Ir.create
, vo = Pr.create
, wo = Ar.create
, _o = Or.create
, xo = Nr.create
, ko = jr.create
, Co = Mr.create
, So = Lr.create
, To = Rr.create
, $o = Br.create
, Io = zr.create
, Eo = Dr.create
, Po = Ur.create
, Ao = Vr.create
, Oo = Fr.create
, No = Ur.createWithPreprocess
, jo = Yr.create
, Mo = {
  string: e=>dr.create({
      ...e,
      coerce: !0
  }),
  number: e=>pr.create({
      ...e,
      coerce: !0
  }),
  boolean: e=>fr.create({
      ...e,
      coerce: !0
  }),
  bigint: e=>hr.create({
      ...e,
      coerce: !0
  }),
  date: e=>gr.create({
      ...e,
      coerce: !0
  })
}
, Lo = Fn;
var Ro = Object.freeze({
  __proto__: null,
  defaultErrorMap: Zn,
  setErrorMap: function(e) {
      Bn = e
  },
  getErrorMap: zn,
  makeIssue: Dn,
  EMPTY_PATH: [],
  addIssueToContext: Un,
  ParseStatus: Vn,
  INVALID: Fn,
  DIRTY: Hn,
  OK: Gn,
  isAborted: Kn,
  isDirty: qn,
  isValid: Wn,
  isAsync: Yn,
  get util() {
      return On
  },
  get objectUtil() {
      return Nn
  },
  ZodParsedType: jn,
  getParsedType: Mn,
  ZodType: tr,
  ZodString: dr,
  ZodNumber: pr,
  ZodBigInt: hr,
  ZodBoolean: fr,
  ZodDate: gr,
  ZodSymbol: mr,
  ZodUndefined: br,
  ZodNull: yr,
  ZodAny: vr,
  ZodUnknown: wr,
  ZodNever: _r,
  ZodVoid: xr,
  ZodArray: kr,
  ZodObject: Sr,
  ZodUnion: Tr,
  ZodDiscriminatedUnion: Ir,
  ZodIntersection: Pr,
  ZodTuple: Ar,
  ZodRecord: Or,
  ZodMap: Nr,
  ZodSet: jr,
  ZodFunction: Mr,
  ZodLazy: Lr,
  ZodLiteral: Rr,
  ZodEnum: Br,
  ZodNativeEnum: zr,
  ZodPromise: Dr,
  ZodEffects: Ur,
  ZodTransformer: Ur,
  ZodOptional: Vr,
  ZodNullable: Fr,
  ZodDefault: Hr,
  ZodCatch: Gr,
  ZodNaN: Kr,
  BRAND: qr,
  ZodBranded: Wr,
  ZodPipeline: Yr,
  custom: Jr,
  Schema: tr,
  ZodSchema: tr,
  late: Xr,
  get ZodFirstPartyTypeKind() {
      return Qr
  },
  coerce: Mo,
  any: co,
  array: fo,
  bigint: ro,
  boolean: oo,
  date: ao,
  discriminatedUnion: yo,
  effect: Po,
  enum: $o,
  function: Co,
  instanceof: (e,t={
      message: `Input not instance of ${e.name}`
  })=>Jr((t=>t instanceof e), t),
  intersection: vo,
  lazy: So,
  literal: To,
  map: xo,
  nan: no,
  nativeEnum: Io,
  never: po,
  null: lo,
  nullable: Oo,
  number: to,
  object: go,
  oboolean: ()=>oo().optional(),
  onumber: ()=>to().optional(),
  optional: Ao,
  ostring: ()=>eo().optional(),
  pipeline: jo,
  preprocess: No,
  promise: Eo,
  record: _o,
  set: ko,
  strictObject: mo,
  string: eo,
  symbol: io,
  transformer: Po,
  tuple: wo,
  undefined: so,
  union: bo,
  unknown: uo,
  void: ho,
  NEVER: Lo,
  ZodIssueCode: Ln,
  quotelessJson: e=>JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
  ZodError: Rn
});
const Zo = Ro.object({
  id: Ro.string(),
  groupId: Ro.string(),
  outgoingEdgeId: Ro.string().optional()
})
, Bo = Ro.object({
  variableId: Ro.string().optional()
});
Ro.object({
  id: Ro.string(),
  createdAt: Ro.date(),
  workspaceId: Ro.string(),
  name: Ro.string(),
  iv: Ro.string()
});
const zo = Bo.merge(Ro.object({
  isRequired: Ro.boolean().optional(),
  isMultipleAllowed: Ro.boolean(),
  labels: Ro.object({
      placeholder: Ro.string(),
      button: Ro.string(),
      clear: Ro.string().optional(),
      skip: Ro.string().optional()
  }),
  sizeLimit: Ro.number().optional()
}));
Zo.merge(Ro.object({
  type: Ro.literal(Ie.FILE),
  options: zo
}));
const Do = {
  placeholder: "<strong>\n      Click to upload\n    </strong> or drag and drop<br>\n    (size limit: 10MB)",
  button: "Upload",
  clear: "Clear",
  skip: "Skip"
}
, Uo = le('<div class="w-full bg-gray-200 rounded-full h-2.5"><div class="upload-progress-bar h-2.5 rounded-full">')
, Vo = le('<span class="relative"><div class="total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 w-4 h-4">')
, Fo = le('<div class="flex flex-col justify-center items-center"><p class="text-sm text-gray-500 text-center">')
, Ho = le('<input id="dropzone-file" type="file" class="hidden">')
, Go = le('<div class="flex justify-end">')
, Ko = le('<div class="flex justify-end"><div class="flex gap-2">')
, qo = le('<p class="text-red-500 text-sm">')
, Wo = le('<form class="flex flex-col w-full gap-2"><label for="dropzone-file">')
, Yo = le('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16">')
, Jo = le('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9">')
, Xo = e=>{
  const [t,n] = _([])
    , [r,o] = _(!1)
    , [a,i] = _(0)
    , [s,l] = _(!1)
    , [c,d] = _()
    , u = r=>{
      d(void 0);
      const o = Array.from(r);
      return o.some((t=>t.size > 1024 * (e.block.options.sizeLimit ?? 10) * 1024)) ? d(`A file is larger than ${e.block.options.sizeLimit ?? 10}MB`) : !e.block.options.isMultipleAllowed && r ? h(o[0]) : void n([...t(), ...o])
  }
    , p = async e=>{
      e.preventDefault(),
      0 !== t().length && f(t())
  }
    , h = async t=>{
      if (e.context.isPreview)
          return e.onSubmit({
              label: "File uploaded",
              value: "http://fake-upload-url.com"
          });
      o(!0);
      const n = await Le({
          basePath: `${e.context.apiHost ?? st()}/api/typebots/${e.context.typebotId}/blocks/${e.block.id}`,
          files: [{
              file: t,
              path: `public/results/${e.context.resultId}/${e.block.id}/${t.name}`
          }]
      });
      if (o(!1),
      n.length)
          return e.onSubmit({
              label: "File uploaded",
              value: n[0] ?? ""
          });
      d("An error occured while uploading the file")
  }
    , f = async t=>{
      if (e.context.isPreview)
          return e.onSubmit({
              label: `${t.length} file ${t.length > 1 ? "s" : ""} uploaded`,
              value: t.map(((e,t)=>`http://fake-upload-url.com/${t}`)).join(", ")
          });
      o(!0);
      const n = await Le({
          basePath: `${e.context.apiHost ?? st()}/api/typebots/${e.context.typebotId}/blocks/${e.block.id}`,
          files: t.map((t=>({
              file: t,
              path: `public/results/${e.context.resultId}/${e.block.id}/${t.name}`
          }))),
          onUploadProgress: i
      });
      if (o(!1),
      i(0),
      n.length !== t.length)
          return d("An error occured while uploading the files");
      e.onSubmit({
          label: `${n.length} file ${n.length > 1 ? "s" : ""} uploaded`,
          value: n.join(", ")
      })
  }
    , g = e=>{
      e.preventDefault(),
      l(!0)
  }
    , m = ()=>l(!1)
    , b = e=>{
      e.preventDefault(),
      e.stopPropagation(),
      e.dataTransfer?.files && u(e.dataTransfer.files)
  }
    , y = ()=>n([])
    , v = ()=>e.onSkip(e.block.options.labels.skip ?? Do.skip);
  return (()=>{
      const n = Wo()
        , o = n.firstChild;
      return n.addEventListener("submit", p),
      o.addEventListener("drop", b),
      o.addEventListener("dragleave", m),
      o.addEventListener("dragover", g),
      fe(o, F(Q, {
          get children() {
              return [F(ee, {
                  get when() {
                      return r()
                  },
                  get children() {
                      return F(X, {
                          get when() {
                              return t().length > 1
                          },
                          get fallback() {
                              return F(ht, {})
                          },
                          get children() {
                              const e = Uo()
                                , t = e.firstChild;
                              return t.style.setProperty("transition", "width 150ms cubic-bezier(0.4, 0, 0.2, 1)"),
                              x((()=>null != `${a() > 0 ? a : 10}%` ? t.style.setProperty("width", `${a() > 0 ? a : 10}%`) : t.style.removeProperty("width"))),
                              e
                          }
                      })
                  }
              }), F(ee, {
                  get when() {
                      return !r()
                  },
                  get children() {
                      return [(()=>{
                          const n = Fo()
                            , r = n.firstChild;
                          return fe(n, F(X, {
                              get when() {
                                  return t().length
                              },
                              get fallback() {
                                  return F(Qo, {})
                              },
                              get children() {
                                  const e = Vo()
                                    , n = e.firstChild;
                                  return fe(e, F(ea, {}), n),
                                  n.style.setProperty("bottom", "5px"),
                                  fe(n, (()=>t().length)),
                                  e
                              }
                          }), r),
                          x((()=>r.innerHTML = e.block.options.labels.placeholder)),
                          n
                      }
                      )(), (()=>{
                          const t = Ho();
                          return t.addEventListener("change", (e=>{
                              e.currentTarget.files && u(e.currentTarget.files)
                          }
                          )),
                          x((()=>t.multiple = e.block.options.isMultipleAllowed)),
                          t
                      }
                      )()]
                  }
              })]
          }
      })),
      fe(n, F(X, {
          get when() {
              return 0 === t().length && !1 === e.block.options.isRequired
          },
          get children() {
              const t = Go();
              return fe(t, F(gt, {
                  "on:click": v,
                  get children() {
                      return e.block.options.labels.skip ?? Do.skip
                  }
              })),
              t
          }
      }), null),
      fe(n, F(X, {
          get when() {
              return C((()=>!!(e.block.options.isMultipleAllowed && t().length > 0)))() && !r()
          },
          get children() {
              const n = Ko()
                , r = n.firstChild;
              return fe(r, F(X, {
                  get when() {
                      return t().length
                  },
                  get children() {
                      return F(gt, {
                          variant: "secondary",
                          "on:click": y,
                          get children() {
                              return e.block.options.labels.clear ?? Do.clear
                          }
                      })
                  }
              }), null),
              fe(r, F(mt, {
                  type: "submit",
                  disableIcon: !0,
                  get children() {
                      return C((()=>e.block.options.labels.button === Do.button))() ? `Upload ${t().length} file ${t().length > 1 ? "s" : ""}` : e.block.options.labels.button
                  }
              }), null),
              n
          }
      }), null),
      fe(n, F(X, {
          get when() {
              return c()
          },
          get children() {
              const e = qo();
              return fe(e, c),
              e
          }
      }), null),
      x((()=>ue(o, "typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 " + (s() ? "dragging-over" : "")))),
      n
  }
  )()
}
, Qo = ()=>Yo()
, ea = ()=>Jo();
let ta = function(e) {
  return e.STRIPE = "Stripe",
  e
}({});
const na = le('<div class="typebot-input-error-message mt-4 text-center animate-fade-in">')
, ra = le('<form id="payment-form" class="flex flex-col p-4 typebot-input w-full items-center"><slot name="stripe-payment-form">');
let oa, aa = null, ia = null;
const sa = e=>{
  const [t,n] = _()
    , [r,o] = _(!1)
    , [a,i] = _(!1);
  T((async()=>{
      var t;
      if (la(oa),
      aa = await (t = e.options.publicKey,
      new Promise((e=>{
          if (window.Stripe)
              return e(window.Stripe(t));
          const n = document.createElement("script");
          n.src = "https://js.stripe.com/v3",
          document.body.appendChild(n),
          n.onload = ()=>{
              if (!window.Stripe)
                  throw new Error("Stripe.js failed to load.");
              e(window.Stripe(t))
          }
      }
      ))),
      !aa)
          return;
      ia = aa.elements({
          appearance: {
              theme: "stripe",
              variables: {
                  colorPrimary: getComputedStyle(oa).getPropertyValue("--typebot-button-bg-color")
              }
          },
          clientSecret: e.options.paymentIntentSecret
      });
      ia.create("payment", {
          layout: "tabs"
      }).mount("#payment-element"),
      setTimeout((()=>o(!0)), 1e3)
  }
  ));
  const s = async t=>{
      if (t.preventDefault(),
      !aa || !ia)
          return;
      i(!0);
      const {error: r, paymentIntent: o} = await aa.confirmPayment({
          elements: ia,
          confirmParams: {
              return_url: e.context.apiHost,
              payment_method_data: {
                  billing_details: {
                      name: e.options.additionalInformation?.name,
                      email: e.options.additionalInformation?.email,
                      phone: e.options.additionalInformation?.phoneNumber,
                      address: {
                          ...e.options.additionalInformation?.address,
                          postal_code: e.options.additionalInformation?.address?.postalCode
                      }
                  }
              }
          },
          redirect: "if_required"
      });
      return i(!1),
      "validation_error" !== r?.type ? "card_error" === r?.type ? n(r.message) : r || "succeeded" !== o.status ? void 0 : e.onSuccess() : void 0
  }
  ;
  return (()=>{
      const n = ra()
        , o = n.firstChild;
      n.addEventListener("submit", s);
      return "function" == typeof oa ? he(oa, o) : oa = o,
      o._$owner = f,
      fe(n, F(X, {
          get when() {
              return r()
          },
          get children() {
              return F(mt, {
                  get isLoading() {
                      return a()
                  },
                  class: "mt-4 w-full max-w-lg animate-fade-in",
                  disableIcon: !0,
                  get children() {
                      return [C((()=>e.options.labels.button)), " ", C((()=>e.options.amountLabel))]
                  }
              })
          }
      }), null),
      fe(n, F(X, {
          get when() {
              return t()
          },
          get children() {
              const e = na();
              return fe(e, t),
              e
          }
      }), null),
      n
  }
  )()
}
, la = e=>{
  const t = e.getRootNode().host
    , n = document.createElement("div");
  n.style.width = "100%",
  n.slot = "stripe-payment-form",
  t.appendChild(n);
  const r = document.createElement("div");
  r.id = "payment-element",
  n.appendChild(r)
}
, ca = e=>F(Q, {
  get children() {
      return F(ee, {
          get when() {
              return e.options.provider === ta.STRIPE
          },
          get children() {
              return F(sa, {
                  get onSuccess() {
                      return e.onSuccess
                  },
                  get options() {
                      return e.options
                  },
                  get context() {
                      return e.context
                  }
              })
          }
      })
  }
})
, da = le('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12">')
, ua = e=>(()=>{
  const t = da();
  return pe(t, e, !0, !0),
  t
}
)()
, pa = le("<div>")
, ha = e=>(()=>{
  const t = pa();
  return fe(t, F(X, {
      get when() {
          return e.isChecked
      },
      get children() {
          return F(ua, {})
      }
  })),
  x((()=>ue(t, "w-4 h-4 typebot-checkbox" + (e.isChecked ? " checked" : "") + (e.class ? ` ${e.class}` : "")))),
  t
}
)()
, fa = le('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">')
, ga = e=>(()=>{
  const t = fa();
  return pe(t, e, !0, !0),
  t
}
)()
, ma = le('<button class="w-5 h-5">')
, ba = le('<div class="flex justify-between items-center gap-2 w-full pr-4"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">')
, ya = e=>{
  const [t,n] = _("")
    , [r,o] = W(e, ["onInput", "ref"])
    , a = ()=>{
      n(""),
      e.onClear()
  }
  ;
  return (()=>{
      const i = ba()
        , s = i.firstChild;
      s.$$input = e=>(e=>{
          n(e),
          r.onInput(e)
      }
      )(e.currentTarget.value);
      const l = e.ref;
      return "function" == typeof l ? he(l, s) : e.ref = s,
      s.style.setProperty("font-size", "16px"),
      pe(s, q({
          get value() {
              return t()
          }
      }, o), !1, !1),
      fe(i, F(X, {
          get when() {
              return t().length > 0
          },
          get children() {
              const e = ma();
              return e.addEventListener("click", a),
              fe(e, F(ga, {})),
              e
          }
      }), null),
      i
  }
  )()
}
;
ce(["input"]);
let va = function(e) {
  return e[e.BUTTON = 0] = "BUTTON",
  e[e.CONDITION = 1] = "CONDITION",
  e[e.AB_TEST = 2] = "AB_TEST",
  e[e.PICTURE_CHOICE = 3] = "PICTURE_CHOICE",
  e
}({});
const wa = Ro.object({
  id: Ro.string(),
  blockId: Ro.string(),
  outgoingEdgeId: Ro.string().optional()
})
, _a = "Send";
let xa = function(e) {
  return e.OR = "OR",
  e.AND = "AND",
  e
}({})
, ka = function(e) {
  return e.EQUAL = "Equal to",
  e.NOT_EQUAL = "Not equal",
  e.CONTAINS = "Contains",
  e.NOT_CONTAINS = "Does not contain",
  e.GREATER = "Greater than",
  e.LESS = "Less than",
  e.IS_SET = "Is set",
  e.IS_EMPTY = "Is empty",
  e.STARTS_WITH = "Starts with",
  e.ENDS_WITH = "Ends with",
  e
}({});
const Ca = Ro.object({
  id: Ro.string(),
  variableId: Ro.string().optional(),
  comparisonOperator: Ro.nativeEnum(ka).optional(),
  value: Ro.string().optional()
})
, Sa = Ro.object({
  logicalOperator: Ro.nativeEnum(xa),
  comparisons: Ro.array(Ca)
})
, Ta = wa.merge(Ro.object({
  type: Ro.literal(va.CONDITION),
  content: Sa
}));
Zo.merge(Ro.object({
  type: Ro.enum([Pe.CONDITION]),
  items: Ro.array(Ta)
})),
xa.AND;
const $a = Bo.merge(Ro.object({
  isMultipleChoice: Ro.boolean(),
  buttonLabel: Ro.string(),
  dynamicVariableId: Ro.string().optional(),
  isSearchable: Ro.boolean().optional(),
  searchInputPlaceholder: Ro.string().optional()
}))
, Ia = "Filter the options..."
, Ea = wa.merge(Ro.object({
  type: Ro.literal(va.BUTTON),
  content: Ro.string().optional(),
  displayCondition: Ro.object({
      isEnabled: Ro.boolean().optional(),
      condition: Sa.optional()
  }).optional()
}));
Zo.merge(Ro.object({
  type: Ro.enum([Ie.CHOICE]),
  items: Ro.array(Ea),
  options: $a
}));
const Pa = le('<div class="flex items-end typebot-input w-full">')
, Aa = le('<form class="flex flex-col items-end gap-2 w-full"><div>')
, Oa = le('<span><div role="checkbox"><div class="flex items-center gap-2"><span>')
, Na = le('<span><div role="checkbox" aria-checked class="w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable selected"><div class="flex items-center gap-2"><span>')
, ja = e=>{
  let t;
  const [n,r] = _(e.defaultItems)
    , [o,a] = _([]);
  T((()=>{
      !lt() && t && t.focus()
  }
  ));
  const i = e=>{
      s(e)
  }
    , s = e=>{
      const t = o().indexOf(e);
      a(-1 !== t ? t=>t.filter((t=>t !== e)) : t=>[...t, e])
  }
    , l = ()=>e.onSubmit({
      value: o().map((t=>e.defaultItems.find((e=>e.id === t))?.content)).join(", ")
  })
    , c = t=>{
      r(e.defaultItems.filter((e=>e.content?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = Aa()
        , s = a.firstChild;
      return a.addEventListener("submit", l),
      fe(a, F(X, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = Pa();
              return fe(n, F(ya, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: c,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? Ia
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), s),
      fe(s, F(J, {
          get each() {
              return n()
          },
          children: e=>(()=>{
              const t = Oa()
                , n = t.firstChild
                , r = n.firstChild
                , a = r.firstChild;
              return n.addEventListener("click", (()=>i(e.id))),
              fe(r, F(ha, {
                  get isChecked() {
                      return o().some((t=>t === e.id))
                  }
              }), a),
              fe(a, (()=>e.content)),
              x((r=>{
                  const a = "relative" + (lt() ? " w-full" : "")
                    , i = o().some((t=>t === e.id))
                    , s = "w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable" + (o().some((t=>t === e.id)) ? " selected" : "")
                    , l = e.id;
                  return a !== r._v$ && ue(t, r._v$ = a),
                  i !== r._v$2 && de(n, "aria-checked", r._v$2 = i),
                  s !== r._v$3 && ue(n, r._v$3 = s),
                  l !== r._v$4 && de(n, "data-itemid", r._v$4 = l),
                  r
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0
              }),
              t
          }
          )()
      }), null),
      fe(s, F(J, {
          get each() {
              return o().filter((e=>n().every((t=>t.id !== e))))
          },
          children: t=>(()=>{
              const n = Na()
                , r = n.firstChild
                , o = r.firstChild
                , a = o.firstChild;
              return r.addEventListener("click", (()=>i(t))),
              de(r, "data-itemid", t),
              fe(o, F(ha, {
                  isChecked: !0
              }), a),
              fe(a, (()=>e.defaultItems.find((e=>e.id === t))?.content)),
              x((()=>ue(n, "relative" + (lt() ? " w-full" : "")))),
              n
          }
          )()
      }), null),
      fe(a, (()=>{
          const t = C((()=>o().length > 0));
          return ()=>t() && F(mt, {
              disableIcon: !0,
              get children() {
                  return e.options?.buttonLabel ?? "Send"
              }
          })
      }
      )(), null),
      x((()=>ue(s, "flex flex-wrap justify-end gap-2" + (e.options.isSearchable ? " overflow-y-scroll max-h-80 rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, Ma = le('<div class="flex items-end typebot-input w-full">')
, La = le('<div class="flex flex-col gap-2 w-full"><div>')
, Ra = le("<span>")
, Za = le('<span class="flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping"><span class="animate-ping absolute inline-flex h-full w-full rounded-full brightness-200 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 brightness-150">')
, Ba = e=>{
  let t;
  const [n,r] = _(e.defaultItems);
  T((()=>{
      !lt() && t && t.focus()
  }
  ));
  const o = t=>{
      r(e.defaultItems.filter((e=>e.content?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = La()
        , i = a.firstChild;
      return fe(a, F(X, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = Ma();
              return fe(n, F(ya, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: o,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? Ia
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), i),
      fe(i, F(J, {
          get each() {
              return n()
          },
          children: (t,r)=>(()=>{
              const o = Ra();
              return fe(o, F(gt, {
                  get "on:click"() {
                      return t = r(),
                      ()=>e.onSubmit({
                          value: n()[t].content ?? ""
                      });
                      var t
                  },
                  get "data-itemid"() {
                      return t.id
                  },
                  class: "w-full",
                  get children() {
                      return t.content
                  }
              }), null),
              fe(o, (()=>{
                  const t = C((()=>!(0 !== e.inputIndex || 1 !== e.defaultItems.length)));
                  return ()=>t() && Za()
              }
              )(), null),
              x((()=>ue(o, "relative" + (lt() ? " w-full" : "")))),
              o
          }
          )()
      })),
      x((()=>ue(i, "flex flex-wrap justify-end gap-2" + (e.options.isSearchable ? " overflow-y-scroll max-h-80 rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, za = le('<div class="flex items-end typebot-input w-full">')
, Da = le('<div class="flex flex-col gap-2 w-full"><div>')
, Ua = le('<button><img fetchpriority="high" class="m-auto"><div><span class="font-semibold"></span><span class="text-sm whitespace-pre-wrap text-left">')
, Va = e=>{
  let t;
  const [n,r] = _(e.defaultItems);
  T((()=>{
      !lt() && t && t.focus()
  }
  ));
  const o = t=>{
      r(e.defaultItems.filter((e=>e.title?.toLowerCase().includes((t ?? "").toLowerCase()) || e.description?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = Da()
        , i = a.firstChild;
      return fe(a, F(X, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = za();
              return fe(n, F(ya, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: o,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? ""
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), i),
      fe(i, F(J, {
          get each() {
              return n()
          },
          children: (t,r)=>(()=>{
              const o = Ua()
                , a = o.firstChild
                , i = a.nextSibling
                , s = i.firstChild
                , l = s.nextSibling;
              var c;
              return o.addEventListener("click", (c = r(),
              ()=>{
                  const t = n()[c].pictureSrc;
                  if (t)
                      return e.onSubmit({
                          value: n()[c].title ?? t
                      })
              }
              )),
              fe(s, (()=>t.title)),
              fe(l, (()=>t.description)),
              x((e=>{
                  const n = t.id
                    , s = "flex flex-col typebot-picture-button focus:outline-none filter hover:brightness-90 active:brightness-75 justify-between  " + (Ze(t.pictureSrc) ? "has-svg" : "")
                    , l = t.pictureSrc
                    , c = t.title ?? `Picture ${r() + 1}`
                    , d = `Picture choice ${r() + 1}`
                    , u = "flex flex-col gap-1 py-2 flex-shrink-0 px-4 w-full" + (t.description ? " items-start" : "");
                  return n !== e._v$ && de(o, "data-itemid", e._v$ = n),
                  s !== e._v$2 && ue(o, e._v$2 = s),
                  l !== e._v$3 && de(a, "src", e._v$3 = l),
                  c !== e._v$4 && de(a, "alt", e._v$4 = c),
                  d !== e._v$5 && de(a, "elementtiming", e._v$5 = d),
                  u !== e._v$6 && ue(i, e._v$6 = u),
                  e
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0
              }),
              o
          }
          )()
      })),
      x((()=>ue(i, "gap-2 flex flex-wrap justify-end" + (e.options.isSearchable ? " overflow-y-scroll max-h-[464px] rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, Fa = Bo.merge(Ro.object({
  isMultipleChoice: Ro.boolean().optional(),
  isSearchable: Ro.boolean().optional(),
  buttonLabel: Ro.string(),
  searchInputPlaceholder: Ro.string(),
  dynamicItems: Ro.object({
      isEnabled: Ro.boolean().optional(),
      titlesVariableId: Ro.string().optional(),
      descriptionsVariableId: Ro.string().optional(),
      pictureSrcsVariableId: Ro.string().optional()
  }).optional()
}))
, Ha = wa.merge(Ro.object({
  type: Ro.literal(va.PICTURE_CHOICE),
  pictureSrc: Ro.string().optional(),
  title: Ro.string().optional(),
  description: Ro.string().optional(),
  displayCondition: Ro.object({
      isEnabled: Ro.boolean().optional(),
      condition: Sa.optional()
  }).optional()
}));
Zo.merge(Ro.object({
  type: Ro.enum([Ie.PICTURE_CHOICE]),
  items: Ro.array(Ha),
  options: Fa
}));
const Ga = _a
, Ka = "Filter the options..."
, qa = le('<div class="flex items-end typebot-input w-full">')
, Wa = le('<form class="flex flex-col gap-2 w-full items-end"><div>')
, Ya = le('<span class="font-semibold">')
, Ja = le('<span class="text-sm whitespace-pre-wrap text-left">')
, Xa = le('<div class="flex flex-col gap-1 ">')
, Qa = le('<div role="checkbox"><img fetchpriority="high" class="m-auto"><div>')
, ei = le('<div role="checkbox" aria-checked class="flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture selected"><img fetchpriority="high"><div>')
, ti = e=>{
  let t;
  const [n,r] = _(e.defaultItems)
    , [o,a] = _([]);
  T((()=>{
      !lt() && t && t.focus()
  }
  ));
  const i = e=>{
      s(e)
  }
    , s = e=>{
      const t = o().indexOf(e);
      a(-1 !== t ? t=>t.filter((t=>t !== e)) : t=>[...t, e])
  }
    , l = ()=>e.onSubmit({
      value: o().map((t=>{
          const n = e.defaultItems.find((e=>e.id === t));
          return n?.title ?? n?.pictureSrc
      }
      )).join(", ")
  })
    , c = t=>{
      r(e.defaultItems.filter((e=>e.title?.toLowerCase().includes((t ?? "").toLowerCase()) || e.description?.toLowerCase().includes((t ?? "").toLowerCase()))))
  }
  ;
  return (()=>{
      const a = Wa()
        , s = a.firstChild;
      return a.addEventListener("submit", l),
      fe(a, F(X, {
          get when() {
              return e.options.isSearchable
          },
          get children() {
              const n = qa();
              return fe(n, F(ya, {
                  ref(e) {
                      "function" == typeof t ? t(e) : t = e
                  },
                  onInput: c,
                  get placeholder() {
                      return e.options.searchInputPlaceholder ?? Ka
                  },
                  onClear: ()=>r(e.defaultItems)
              })),
              n
          }
      }), s),
      fe(s, F(J, {
          get each() {
              return n()
          },
          children: (e,t)=>(()=>{
              const n = Qa()
                , r = n.firstChild
                , a = r.nextSibling;
              return n.addEventListener("click", (()=>i(e.id))),
              fe(a, F(ha, {
                  get isChecked() {
                      return o().some((t=>t === e.id))
                  },
                  get class() {
                      return "flex-shrink-0" + (e.title || e.description ? " mt-1" : void 0)
                  }
              }), null),
              fe(a, F(X, {
                  get when() {
                      return e.title || e.description
                  },
                  get children() {
                      const t = Xa();
                      return fe(t, F(X, {
                          get when() {
                              return e.title
                          },
                          get children() {
                              const t = Ya();
                              return fe(t, (()=>e.title)),
                              t
                          }
                      }), null),
                      fe(t, F(X, {
                          get when() {
                              return e.description
                          },
                          get children() {
                              const t = Ja();
                              return fe(t, (()=>e.description)),
                              t
                          }
                      }), null),
                      t
                  }
              }), null),
              x((i=>{
                  const s = o().some((t=>t === e.id))
                    , l = "flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture" + (o().some((t=>t === e.id)) ? " selected" : "") + (Ze(e.pictureSrc) ? " has-svg" : "")
                    , c = e.id
                    , d = e.pictureSrc
                    , u = e.title ?? `Picture ${t() + 1}`
                    , p = `Picture choice ${t() + 1}`
                    , h = "flex gap-3 py-2 flex-shrink-0" + (je(e.title) && je(e.description) ? " justify-center" : " px-3");
                  return s !== i._v$ && de(n, "aria-checked", i._v$ = s),
                  l !== i._v$2 && ue(n, i._v$2 = l),
                  c !== i._v$3 && de(n, "data-itemid", i._v$3 = c),
                  d !== i._v$4 && de(r, "src", i._v$4 = d),
                  u !== i._v$5 && de(r, "alt", i._v$5 = u),
                  p !== i._v$6 && de(r, "elementtiming", i._v$6 = p),
                  h !== i._v$7 && ue(a, i._v$7 = h),
                  i
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0
              }),
              n
          }
          )()
      }), null),
      fe(s, F(J, {
          get each() {
              return o().filter((e=>n().every((t=>t.id !== e)))).map((t=>e.defaultItems.find((e=>e.id === t)))).filter(Oe)
          },
          children: (t,n)=>(()=>{
              const r = ei()
                , a = r.firstChild
                , s = a.nextSibling;
              return r.addEventListener("click", (()=>i(t.id))),
              fe(s, F(ha, {
                  get isChecked() {
                      return o().some((e=>e === t.id))
                  },
                  get class() {
                      return "flex-shrink-0" + (t.title || t.description ? " mt-1" : void 0)
                  }
              }), null),
              fe(s, F(X, {
                  get when() {
                      return t.title || t.description
                  },
                  get children() {
                      const e = Xa();
                      return fe(e, F(X, {
                          get when() {
                              return t.title
                          },
                          get children() {
                              const e = Ya();
                              return fe(e, (()=>t.title)),
                              e
                          }
                      }), null),
                      fe(e, F(X, {
                          get when() {
                              return t.description
                          },
                          get children() {
                              const e = Ja();
                              return fe(e, (()=>t.description)),
                              e
                          }
                      }), null),
                      e
                  }
              }), null),
              x((o=>{
                  const i = t.id
                    , l = e.defaultItems.find((e=>e.id === t.id))?.pictureSrc
                    , c = t.title ?? `Selected picture ${n() + 1}`
                    , d = `Selected picture choice ${n() + 1}`
                    , u = "flex gap-3 py-2 flex-shrink-0" + (je(t.title) && je(t.description) ? " justify-center" : " pl-4");
                  return i !== o._v$8 && de(r, "data-itemid", o._v$8 = i),
                  l !== o._v$9 && de(a, "src", o._v$9 = l),
                  c !== o._v$10 && de(a, "alt", o._v$10 = c),
                  d !== o._v$11 && de(a, "elementtiming", o._v$11 = d),
                  u !== o._v$12 && ue(s, o._v$12 = u),
                  o
              }
              ), {
                  _v$8: void 0,
                  _v$9: void 0,
                  _v$10: void 0,
                  _v$11: void 0,
                  _v$12: void 0
              }),
              r
          }
          )()
      }), null),
      fe(a, (()=>{
          const t = C((()=>o().length > 0));
          return ()=>t() && F(mt, {
              disableIcon: !0,
              get children() {
                  return e.options?.buttonLabel ?? Ga
              }
          })
      }
      )(), null),
      x((()=>ue(s, "flex flex-wrap justify-end gap-2" + (e.options.isSearchable ? " overflow-y-scroll max-h-[464px] rounded-md hide-scrollbar" : "")))),
      a
  }
  )()
}
, ni = le('<div class="flex justify-end animate-fade-in gap-2">')
, ri = le("<div>")
, oi = e=>{
  const [t,n] = _()
    , r = async({label: t, value: r})=>{
      n(t ?? r),
      e.onSubmit(r ?? t)
  }
    , o = t=>{
      n(t),
      e.onSkip()
  }
  ;
  return F(Q, {
      get children() {
          return [F(ee, {
              get when() {
                  return t() && !e.hasError
              },
              get children() {
                  return F(rn, {
                      get message() {
                          return t()
                      },
                      get showAvatar() {
                          return e.guestAvatar?.isEnabled ?? !1
                      },
                      get avatarSrc() {
                          return e.guestAvatar?.url && e.guestAvatar.url
                      }
                  })
              }
          }), F(ee, {
              get when() {
                  return Ne(t()) || e.hasError
              },
              get children() {
                  const t = ni()
                    , n = e.ref;
                  return "function" == typeof n ? he(n, t) : e.ref = t,
                  fe(t, (()=>{
                      const t = C((()=>!!e.hasHostAvatar));
                      return ()=>t() && (()=>{
                          const e = ri();
                          return x((()=>ue(e, "flex flex-shrink-0 items-center " + (lt() ? "w-6 h-6" : "w-10 h-10")))),
                          e
                      }
                      )()
                  }
                  )(), null),
                  fe(t, F(ai, {
                      get context() {
                          return e.context
                      },
                      get block() {
                          return e.block
                      },
                      get inputIndex() {
                          return e.inputIndex
                      },
                      get isInputPrefillEnabled() {
                          return e.isInputPrefillEnabled
                      },
                      onSubmit: r,
                      onSkip: o
                  }), null),
                  x((()=>de(t, "data-blockid", e.block.id))),
                  t
              }
          })]
      }
  })
}
, ai = e=>{
  const t = t=>e.onSubmit(t)
    , n = ()=>e.isInputPrefillEnabled ? e.block.prefilledValue : void 0
    , r = ()=>e.onSubmit({
      value: e.block.options.labels.success ?? "Success"
  });
  return F(Q, {
      get children() {
          return [F(ee, {
              get when() {
                  return e.block.type === Ie.TEXT
              },
              get children() {
                  return F(an, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.NUMBER
              },
              get children() {
                  return F(ln, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.EMAIL
              },
              get children() {
                  return F(dn, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.URL
              },
              get children() {
                  return F(pn, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.PHONE
              },
              get children() {
                  return F(yn, {
                      get labels() {
                          return e.block.options.labels
                      },
                      get defaultCountryCode() {
                          return e.block.options.defaultCountryCode
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.DATE
              },
              get children() {
                  return F(kn, {
                      get options() {
                          return e.block.options
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), F(ee, {
              get when() {
                  return ii(e.block)
              },
              keyed: !0,
              children: n=>F(Q, {
                  get children() {
                      return [F(ee, {
                          get when() {
                              return !n.options.isMultipleChoice
                          },
                          get children() {
                              return F(Ba, {
                                  get inputIndex() {
                                      return e.inputIndex
                                  },
                                  get defaultItems() {
                                      return n.items
                                  },
                                  get options() {
                                      return n.options
                                  },
                                  onSubmit: t
                              })
                          }
                      }), F(ee, {
                          get when() {
                              return n.options.isMultipleChoice
                          },
                          get children() {
                              return F(ja, {
                                  get inputIndex() {
                                      return e.inputIndex
                                  },
                                  get defaultItems() {
                                      return n.items
                                  },
                                  get options() {
                                      return n.options
                                  },
                                  onSubmit: t
                              })
                          }
                      })]
                  }
              })
          }), F(ee, {
              get when() {
                  return si(e.block)
              },
              keyed: !0,
              children: e=>F(Q, {
                  get children() {
                      return [F(ee, {
                          get when() {
                              return !e.options.isMultipleChoice
                          },
                          get children() {
                              return F(Va, {
                                  get defaultItems() {
                                      return e.items
                                  },
                                  get options() {
                                      return e.options
                                  },
                                  onSubmit: t
                              })
                          }
                      }), F(ee, {
                          get when() {
                              return e.options.isMultipleChoice
                          },
                          get children() {
                              return F(ti, {
                                  get defaultItems() {
                                      return e.items
                                  },
                                  get options() {
                                      return e.options
                                  },
                                  onSubmit: t
                              })
                          }
                      })]
                  }
              })
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.RATING
              },
              get children() {
                  return F(En, {
                      get block() {
                          return e.block
                      },
                      get defaultValue() {
                          return n()
                      },
                      onSubmit: t
                  })
              }
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.FILE
              },
              get children() {
                  return F(Xo, {
                      get context() {
                          return e.context
                      },
                      get block() {
                          return e.block
                      },
                      onSubmit: t,
                      get onSkip() {
                          return e.onSkip
                      }
                  })
              }
          }), F(ee, {
              get when() {
                  return e.block.type === Ie.PAYMENT
              },
              get children() {
                  return F(ca, {
                      get context() {
                          return e.context
                      },
                      get options() {
                          return {
                              ...e.block.options,
                              ...e.block.runtimeOptions
                          }
                      },
                      onSuccess: r
                  })
              }
          })]
      }
  })
}
, ii = e=>e?.type === Ie.CHOICE ? e : void 0
, si = e=>e?.type === Ie.PICTURE_CHOICE ? e : void 0
, li = le("<div><div>")
, ci = e=>{
  let t;
  const [n,r] = _(0)
    , o = new ResizeObserver((e=>r(e[0].target.clientHeight - (lt() ? 24 : 40))));
  return T((()=>{
      t && o.observe(t)
  }
  )),
  $((()=>{
      t && o.unobserve(t)
  }
  )),
  (()=>{
      const r = li()
        , o = r.firstChild;
      return "function" == typeof t ? he(t, r) : t = r,
      o.style.setProperty("transition", "top 350ms ease-out, opacity 250ms ease-out"),
      fe(o, F(tn, {
          get initialAvatarSrc() {
              return e.hostAvatarSrc
          }
      })),
      x((t=>{
          const a = "flex flex-shrink-0 items-center relative typebot-avatar-container " + (lt() ? "w-6" : "w-10")
            , i = "absolute flex items-center top-0" + (lt() ? " w-6 h-6" : " w-10 h-10") + (e.hideAvatar ? " opacity-0" : " opacity-100")
            , s = `${n()}px`;
          return a !== t._v$ && ue(r, t._v$ = a),
          i !== t._v$2 && ue(o, t._v$2 = i),
          s !== t._v$3 && (null != (t._v$3 = s) ? o.style.setProperty("top", s) : o.style.removeProperty("top")),
          t
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0
      }),
      r
  }
  )()
}
, di = le('<div><div class="flex flex-col flex-1 gap-2">')
, ui = le('<div class="flex flex-col w-full min-w-0 gap-2">')
, pi = e=>{
  let t;
  const [n,r] = _(0);
  T((()=>{
      0 === e.messages.length && e.onAllBubblesDisplayed(),
      e.onScrollToBottom(t?.offsetTop ? t?.offsetTop - 50 : void 0)
  }
  ));
  const o = async t=>{
      const o = e.messages[n()].id;
      await e.onNewBubbleDisplayed(o),
      r(n() === e.messages.length ? n() : n() + 1),
      e.onScrollToBottom(t),
      n() === e.messages.length && e.onAllBubblesDisplayed()
  }
  ;
  return (()=>{
      const r = ui();
      return fe(r, F(X, {
          get when() {
              return e.messages.length > 0
          },
          get children() {
              const t = di()
                , r = t.firstChild;
              return fe(t, F(X, {
                  get when() {
                      return e.theme.chat.hostAvatar?.isEnabled && e.messages.length > 0
                  },
                  get children() {
                      return F(ci, {
                          get hostAvatarSrc() {
                              return e.theme.chat.hostAvatar?.url
                          },
                          get hideAvatar() {
                              return e.hideAvatar
                          }
                      })
                  }
              }), r),
              fe(r, F(J, {
                  get each() {
                      return e.messages.slice(0, n() + 1)
                  },
                  children: t=>F(Jt, {
                      message: t,
                      get typingEmulation() {
                          return e.settings.typingEmulation
                      },
                      onTransitionEnd: o
                  })
              })),
              x((n=>{
                  const o = "flex" + (lt() ? " gap-1" : " gap-2")
                    , a = e.theme.chat.guestAvatar?.isEnabled ? lt() ? "32px" : "48px" : void 0;
                  return o !== n._v$ && ue(t, n._v$ = o),
                  a !== n._v$2 && (null != (n._v$2 = a) ? r.style.setProperty("margin-right", a) : r.style.removeProperty("margin-right")),
                  n
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0
              }),
              t
          }
      }), null),
      fe(r, (()=>{
          const r = C((()=>!(!e.input || n() !== e.messages.length)));
          return ()=>r() && F(oi, {
              ref(e) {
                  "function" == typeof t ? t(e) : t = e
              },
              get block() {
                  return e.input
              },
              get inputIndex() {
                  return e.inputIndex
              },
              get onSubmit() {
                  return e.onSubmit
              },
              get onSkip() {
                  return e.onSkip
              },
              get hasHostAvatar() {
                  return e.theme.chat.hostAvatar?.isEnabled ?? !1
              },
              get guestAvatar() {
                  return e.theme.chat.guestAvatar
              },
              get context() {
                  return e.context
              },
              get isInputPrefillEnabled() {
                  return e.settings.general.isInputPrefillEnabled ?? !0
              },
              get hasError() {
                  return e.hasError
              }
          })
      }
      )(), null),
      r
  }
  )()
}
, hi = Object.getPrototypeOf((async function() {}
)).constructor
, fi = async({content: e, args: t})=>{
  const n = hi(...t.map((e=>e.id)), gi(e));
  try {
      await n(...t.map((e=>e.value)))
  } catch (e) {
      console.error(e)
  }
}
, gi = e=>e.replace(/<script>/g, "").replace(/<\/script>/g, "")
, mi = async e=>{
  e?.trackingId && (e=>{
      e && (window.gtag ? window.gtag("event", e.action, {
          event_category: je(e.category) ? void 0 : e.category,
          event_label: je(e.label) ? void 0 : e.label,
          value: e.value,
          send_to: je(e.sendTo) ? void 0 : e.sendTo
      }) : console.error("Google Analytics was not properly initialized"))
  }
  )(e)
}
;
let bi = null;
const yi = Object.getPrototypeOf((async function() {}
)).constructor
, vi = e=>{
  if (!Ne(e)) {
      if ("string" == typeof e)
          return e;
      try {
          return JSON.stringify(e)
      } catch {
          return void console.warn("Failed to safely stringify variable value", e)
      }
  }
}
, wi = async e=>{
  je(e?.pixelId) || (e=>{
      if (!e.eventType || !e.pixelId)
          return;
      if (!window.fbq)
          return void console.error("Facebook Pixel was not properly initialized");
      const t = e.params?.length ? e.params.reduce(((e,t)=>t.key && t.value ? {
          ...e,
          [t.key]: t.value
      } : e), {}) : void 0;
      if ("Custom" === e.eventType) {
          if (!e.name)
              return;
          window.fbq("trackCustom", e.pixelId, e.name, t)
      }
      window.fbq("track", e.pixelId, e.eventType, t)
  }
  )(e)
}
, _i = async e=>{
  const t = e.customHeadCode;
  Me(t) && (e=>{
      e.split("</noscript>").forEach((e=>{
          const [t,n] = e.split("<noscript>")
            , r = document.createRange().createContextualFragment(t);
          if (document.head.append(r),
          Ne(n))
              return;
          const o = document.createElement("noscript")
            , a = document.createRange().createContextualFragment(n);
          o.append(a),
          document.head.append(o)
      }
      ))
  }
  )(t);
  const n = e.gtmId;
  Me(n) && document.body.prepend((e=>{
      if (document.getElementById("gtm-noscript"))
          return "";
      const t = document.createElement("noscript");
      t.id = "gtm-noscript";
      const n = document.createElement("iframe");
      return n.src = `https://www.googletagmanager.com/ns.html?id=${e}`,
      n.height = "0",
      n.width = "0",
      n.style.display = "none",
      n.style.visibility = "hidden",
      t.appendChild(n),
      t
  }
  )(n));
  const r = e.googleAnalyticsId;
  var o;
  Me(r) && await (o = r,
  Oe(window.gtag) ? Promise.resolve() : new Promise((e=>{
      const t = document.getElementById("gtag");
      if (!t) {
          const t = document.createElement("script");
          t.src = `https://www.googletagmanager.com/gtag/js?id=${o}`,
          t.id = "gtag";
          const n = document.createElement("script");
          n.innerHTML = `window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n    \n      gtag('config', '${o}');\n      `,
          document.body.appendChild(t),
          document.body.appendChild(n),
          t.onload = ()=>{
              e()
          }
      }
      t && e()
  }
  )));
  const a = e.pixelId;
  Me(a) && (e=>{
      const t = document.createElement("script");
      t.innerHTML = `!function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  fbq('init', '${e}');\n  fbq('track', 'PageView');`,
      document.head.appendChild(t);
      const n = document.createElement("noscript");
      n.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${e}&ev=PageView&noscript=1"/>`,
      document.head.appendChild(n)
  }
  )(a)
}
, xi = async(e,t,n)=>{
  if ("chatwoot"in e)
      return r = e.chatwoot,
      void fi(r.scriptToExecute);
  var r;
  if ("googleAnalytics"in e)
      return mi(e.googleAnalytics);
  if ("scriptToExecute"in e)
      return fi(e.scriptToExecute);
  if ("redirect"in e)
      return (({url: e, isNewTab: t})=>{
          if (!e)
              return;
          return window.open(e, t ? "_blank" : "_self") ? void 0 : {
              blockedPopupUrl: e
          }
      }
      )(e.redirect);
  if ("wait"in e)
      return (async({secondsToWaitFor: e})=>{
          await new Promise((t=>setTimeout(t, 1e3 * e)))
      }
      )(e.wait);
  if ("setVariable"in e)
      return (async({content: e, args: t})=>{
          try {
              const n = yi(...t.map((e=>e.id)), e.includes("return ") ? e : `return ${e}`)
                , r = await n(...t.map((e=>e.value)));
              return {
                  replyToSend: vi(r)
              }
          } catch (t) {
              return console.error(t),
              {
                  replyToSend: vi(e)
              }
          }
      }
      )(e.setVariable.scriptToExecute);
  if ("streamOpenAiChatCompletion"in e) {
      const {error: r, message: o} = await (e=>async(t,{onStreamedMessage: n})=>{
          try {
              bi = new AbortController;
              const r = e.apiHost
                , o = await fetch(`${Me(r) ? r : st()}/api/integrations/openai/streamer`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      sessionId: e.sessionId,
                      messages: t
                  }),
                  signal: bi.signal
              });
              if (!o.ok)
                  return {
                      error: {
                          message: await o.text() || "Failed to fetch the chat response."
                      }
                  };
              if (!o.body)
                  throw new Error("The response body is empty.");
              let a = "";
              const i = o.body.getReader()
                , s = new TextDecoder;
              for (; ; ) {
                  const {done: e, value: t} = await i.read();
                  if (e)
                      break;
                  const r = s.decode(t);
                  if (n && n(r),
                  a += r,
                  null === bi) {
                      i.cancel();
                      break
                  }
              }
              return bi = null,
              {
                  message: a
              }
          } catch (e) {
              return console.error(e),
              "AbortError" === e.name ? (bi = null,
              {
                  error: {
                      message: "Request aborted"
                  }
              }) : e instanceof Error ? {
                  error: {
                      message: e.message
                  }
              } : {
                  error: {
                      message: "Failed to fetch the chat response."
                  }
              }
          }
      }
      )(t)(e.streamOpenAiChatCompletion.messages, {
          onStreamedMessage: n
      });
      return r ? {
          replyToSend: void 0,
          logs: [{
              status: "error",
              description: "Failed to stream OpenAI completion",
              details: JSON.stringify(r, null, 2)
          }]
      } : {
          replyToSend: o
      }
  }
  if ("webhookToExecute"in e) {
      return {
          replyToSend: await (async e=>{
              const {url: t, method: n, body: r, headers: o} = e;
              try {
                  const e = await fetch(t, {
                      method: n,
                      body: "GET" !== n && r ? JSON.stringify(r) : void 0,
                      headers: o
                  })
                    , a = e.status
                    , i = await e.json();
                  return JSON.stringify({
                      statusCode: a,
                      data: i
                  })
              } catch (e) {
                  return console.error(e),
                  JSON.stringify({
                      statusCode: 500,
                      data: "An error occured while executing the webhook on the client"
                  })
              }
          }
          )(e.webhookToExecute)
      }
  }
  return "startPropsToInject"in e ? _i(e.startPropsToInject) : "pixel"in e ? wi(e.pixel) : void 0
}
, ki = le('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><p class="overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative opacity-0 h-6 text-ellipsis">')
, Ci = ()=>(()=>{
  const e = ki()
    , t = e.firstChild.firstChild.firstChild;
  return t.style.setProperty("width", "64px"),
  t.style.setProperty("height", "32px"),
  fe(t, F(yt, {})),
  e
}
)()
, Si = le('<div class="flex w-full"><div class="flex flex-col w-full min-w-0"><div class="flex gap-2">')
, Ti = e=>(()=>{
  const t = Si()
    , n = t.firstChild.firstChild;
  return fe(n, F(X, {
      get when() {
          return e.theme.chat.hostAvatar?.isEnabled
      },
      get children() {
          return F(ci, {
              get hostAvatarSrc() {
                  return e.theme.chat.hostAvatar?.url
              }
          })
      }
  }), null),
  fe(n, F(Ci, {}), null),
  t
}
)()
, $i = le('<div class="w-full max-w-xs p-4 text-gray-500 bg-white shadow flex flex-col gap-2 typebot-popup-blocked-toast" role="alert"><div class="flex flex-col gap-1"><span class=" text-sm font-semibold text-gray-900">Popup blocked</span><div class="text-sm font-normal">The bot wants to open a new tab but it was blocked by your broswer. It needs a manual approval.</div></div><a target="_blank" class="py-1 px-4 justify-center text-sm font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 filter hover:brightness-90 active:brightness-75 typebot-button" rel="noreferrer">Continue in new tab')
, Ii = e=>(()=>{
  const t = $i()
    , n = t.firstChild.nextSibling;
  return n.$$click = ()=>e.onLinkClick(),
  x((()=>de(n, "href", e.url))),
  t
}
)();
ce(["click"]);
const Ei = le('<div class="flex flex-col overflow-y-scroll w-full min-h-full px-3 pt-10 relative scrollable-container typebot-chat-view scroll-smooth gap-2">')
, Pi = le('<div class="flex justify-end">')
, Ai = le('<div class="w-full h-32 flex-shrink-0">')
, Oi = e=>{
  let t;
  const [n,r] = _([{
      input: e.initialChatReply.input,
      messages: e.initialChatReply.messages,
      clientSideActions: e.initialChatReply.clientSideActions
  }])
    , [o,a] = _(e.initialChatReply.dynamicTheme)
    , [i,s] = _(e.initialChatReply.typebot.theme)
    , [l,c] = _(!1)
    , [d,u] = _()
    , [p,h] = _(!1);
  T((()=>{
      (async()=>{
          const t = n()[0];
          if (t.clientSideActions) {
              const n = t.clientSideActions.filter((e=>Ne(e.lastBubbleBlockId)));
              for (const t of n) {
                  ("streamOpenAiChatCompletion"in t || "webhookToExecute"in t) && c(!0);
                  const n = await xi(t, {
                      apiHost: e.context.apiHost,
                      sessionId: e.initialChatReply.sessionId
                  });
                  if (n && "replyToSend"in n)
                      return void f(n.replyToSend, n.logs);
                  n && "blockedPopupUrl"in n && u(n.blockedPopupUrl)
              }
          }
      }
      )()
  }
  )),
  k((()=>{
      s(((e,t)=>({
          ...e,
          chat: {
              ...e.chat,
              hostAvatar: e.chat.hostAvatar && t?.hostAvatarUrl ? {
                  ...e.chat.hostAvatar,
                  url: t.hostAvatarUrl
              } : e.chat.hostAvatar,
              guestAvatar: e.chat.guestAvatar && t?.guestAvatarUrl ? {
                  ...e.chat.guestAvatar,
                  url: t?.guestAvatarUrl
              } : e.chat.guestAvatar
          }
      }))(e.initialChatReply.typebot.theme, o()))
  }
  ));
  const f = async(t,o)=>{
      o && e.onNewLogs?.(o),
      h(!1);
      const i = [...n()].pop()?.input;
      i?.id && e.onAnswer && t && e.onAnswer({
          message: t,
          blockId: i.id
      }),
      i?.type === Ie.FILE && e.onNewLogs?.([{
          description: "Files are not uploaded in preview mode",
          status: "info"
      }]);
      const s = setTimeout((()=>{
          c(!0)
      }
      ), 1e3)
        , {data: l, error: d} = await (({apiHost: e, ...t})=>Ae({
          method: "POST",
          url: `${Me(e) ? e : st()}/api/v1/sendMessage`,
          body: t
      }))({
          apiHost: e.context.apiHost,
          sessionId: e.initialChatReply.sessionId,
          message: t,
          clientLogs: o
      });
      if (clearTimeout(s),
      c(!1),
      d && (h(!0),
      e.onNewLogs?.([{
          description: "Failed to send the reply",
          details: d,
          status: "error"
      }])),
      l) {
          if (l.logs && e.onNewLogs?.(l.logs),
          l.dynamicTheme && a(l.dynamicTheme),
          l.input?.id && e.onNewInputBlock && e.onNewInputBlock({
              id: l.input.id,
              groupId: l.input.groupId
          }),
          l.clientSideActions) {
              const t = l.clientSideActions.filter((e=>Ne(e.lastBubbleBlockId)));
              for (const n of t) {
                  ("streamOpenAiChatCompletion"in n || "webhookToExecute"in n) && c(!0);
                  const t = await xi(n, {
                      apiHost: e.context.apiHost,
                      sessionId: e.initialChatReply.sessionId
                  });
                  if (t && "replyToSend"in t)
                      return void f(t.replyToSend, t.logs);
                  t && "blockedPopupUrl"in t && u(t.blockedPopupUrl)
              }
          }
          r((e=>[...e, {
              input: l.input,
              messages: l.messages,
              clientSideActions: l.clientSideActions
          }]))
      }
  }
    , g = e=>{
      setTimeout((()=>{
          t?.scrollTo(0, e ?? t.scrollHeight)
      }
      ), 50)
  }
    , m = async()=>{
      const t = [...n()].pop();
      t && Ne(t.input) && e.onEnd?.()
  }
    , b = async t=>{
      const r = [...n()].pop();
      if (r && r.clientSideActions) {
          const n = r.clientSideActions.filter((e=>e.lastBubbleBlockId === t));
          for (const t of n) {
              ("streamOpenAiChatCompletion"in t || "webhookToExecute"in t) && c(!0);
              const n = await xi(t, {
                  apiHost: e.context.apiHost,
                  sessionId: e.initialChatReply.sessionId
              });
              if (n && "replyToSend"in n)
                  return void f(n.replyToSend, n.logs);
              n && "blockedPopupUrl"in n && u(n.blockedPopupUrl)
          }
      }
  }
    , y = ()=>f(void 0);
  return (()=>{
      const r = Ei();
      return "function" == typeof t ? he(t, r) : t = r,
      fe(r, F(J, {
          get each() {
              return n()
          },
          children: (t,r)=>F(pi, {
              get inputIndex() {
                  return r()
              },
              get messages() {
                  return t.messages
              },
              get input() {
                  return t.input
              },
              get theme() {
                  return i()
              },
              get settings() {
                  return e.initialChatReply.typebot.settings
              },
              onNewBubbleDisplayed: b,
              onAllBubblesDisplayed: m,
              onSubmit: f,
              onScrollToBottom: g,
              onSkip: y,
              get context() {
                  return e.context
              },
              get hasError() {
                  return C((()=>!!p()))() && r() === n().length - 1
              },
              get hideAvatar() {
                  return C((()=>!t.input))() && r() < n().length - 1
              }
          })
      }), null),
      fe(r, F(X, {
          get when() {
              return l()
          },
          get children() {
              return F(Ti, {
                  get theme() {
                      return i()
                  }
              })
          }
      }), null),
      fe(r, F(X, {
          get when() {
              return d()
          },
          keyed: !0,
          children: e=>(()=>{
              const t = Pi();
              return fe(t, F(Ii, {
                  url: e,
                  onLinkClick: ()=>u(void 0)
              })),
              t
          }
          )()
      }), null),
      fe(r, F(Ni, {}), null),
      r
  }
  )()
}
, Ni = ()=>Ai()
, ji = le('<div class="h-full flex justify-center items-center flex-col"><p class="text-2xl text-center"></p><p class="text-center">')
, Mi = e=>(()=>{
  const t = ji()
    , n = t.firstChild
    , r = n.nextSibling;
  return fe(n, (()=>e.error.message)),
  fe(r, (()=>e.error.cause)),
  t
}
)()
, Li = "resultId"
, Ri = e=>{
  if (e)
      try {
          return sessionStorage.getItem(`${Li}-${e}`) ?? localStorage.getItem(`${Li}-${e}`) ?? void 0
      } catch {}
}
;
let Zi = function(e) {
  return e.COLOR = "Color",
  e.IMAGE = "Image",
  e.NONE = "None",
  e
}({});
const Bi = {
  bgImage: "--typebot-container-bg-image",
  bgColor: "--typebot-container-bg-color",
  fontFamily: "--typebot-container-font-family",
  color: "--typebot-container-color"
}
, zi = {
  hostBubbles: {
      bgColor: "--typebot-host-bubble-bg-color",
      color: "--typebot-host-bubble-color"
  },
  guestBubbles: {
      bgColor: "--typebot-guest-bubble-bg-color",
      color: "--typebot-guest-bubble-color"
  },
  inputs: {
      bgColor: "--typebot-input-bg-color",
      color: "--typebot-input-color",
      placeholderColor: "--typebot-input-placeholder-color"
  },
  buttons: {
      bgColor: "--typebot-button-bg-color",
      bgColorRgb: "--typebot-button-bg-color-rgb",
      color: "--typebot-button-color"
  },
  checkbox: {
      bgColor: "--typebot-checkbox-bg-color",
      color: "--typebot-checkbox-color"
  }
}
, Di = (e,t)=>{
  const {background: n, font: r} = e;
  n && Ki(n, t),
  r && t.setProperty(Bi.fontFamily, r)
}
, Ui = (e,t)=>{
  const {hostBubbles: n, guestBubbles: r, buttons: o, inputs: a, roundness: i} = e;
  n && Vi(n, t),
  r && Fi(r, t),
  o && Hi(o, t),
  a && Gi(a, t),
  i && Wi(i, t)
}
, Vi = (e,t)=>{
  e.backgroundColor && t.setProperty(zi.hostBubbles.bgColor, e.backgroundColor),
  e.color && t.setProperty(zi.hostBubbles.color, e.color)
}
, Fi = (e,t)=>{
  e.backgroundColor && t.setProperty(zi.guestBubbles.bgColor, e.backgroundColor),
  e.color && t.setProperty(zi.guestBubbles.color, e.color)
}
, Hi = (e,t)=>{
  e.backgroundColor && (t.setProperty(zi.buttons.bgColor, e.backgroundColor),
  t.setProperty(zi.buttons.bgColorRgb, Be(e.backgroundColor).join(", "))),
  e.color && t.setProperty(zi.buttons.color, e.color)
}
, Gi = (e,t)=>{
  e.backgroundColor && t.setProperty(zi.inputs.bgColor, e.backgroundColor),
  e.color && t.setProperty(zi.inputs.color, e.color),
  e.placeholderColor && t.setProperty(zi.inputs.placeholderColor, e.placeholderColor)
}
, Ki = (e,t)=>{
  t.setProperty(Bi.bgImage, null),
  t.setProperty(Bi.bgColor, null),
  t.setProperty(e?.type === Zi.IMAGE ? Bi.bgImage : Bi.bgColor, qi(e));
  const n = (Zi.COLOR && Me(e.content) ? e.content : "#ffffff") ?? "#ffffff";
  t.setProperty(zi.checkbox.bgColor, (Zi.COLOR ? e.content : "#ffffff") ?? "#ffffff"),
  t.setProperty(Bi.color, ze(n) ? "#303235" : "#ffffff")
}
, qi = ({type: e, content: t})=>{
  switch (e) {
  case Zi.NONE:
      return "transparent";
  case Zi.COLOR:
      return t ?? "#ffffff";
  case Zi.IMAGE:
      return `url(${t})`
  }
}
, Wi = (e,t)=>{
  switch (e) {
  case "none":
      t.setProperty("--typebot-border-radius", "0");
      break;
  case "medium":
      t.setProperty("--typebot-border-radius", "6px");
      break;
  case "large":
      t.setProperty("--typebot-border-radius", "20px")
  }
}
;
const Yi = le("<style>")
, Ji = le('<div><div class="flex w-full h-full justify-center">')
, Xi = e=>{
  const [t,n] = _()
    , [r,o] = _("")
    , [a,i] = _(!1)
    , [s,l] = _()
    , c = async()=>{
      i(!0);
      const t = new URLSearchParams(location.search);
      e.onInit?.();
      const r = {};
      t.forEach(((e,t)=>{
          r[t] = e
      }
      ));
      const a = "string" == typeof e.typebot ? e.typebot : void 0
        , {data: s, error: c} = await async function({typebot: e, isPreview: t, apiHost: n, prefilledVariables: r, startGroupId: o, resultId: a}) {
          if (Ne(e))
              throw new Error("Typebot ID is required to get initial messages");
          return Ae({
              method: "POST",
              url: `${Me(n) ? n : st()}/api/v1/sendMessage`,
              body: {
                  startParams: {
                      isPreview: t,
                      typebot: e,
                      prefilledVariables: r,
                      startGroupId: o,
                      resultId: a,
                      isStreamEnabled: !0
                  }
              }
          })
      }({
          typebot: e.typebot,
          apiHost: e.apiHost,
          isPreview: e.isPreview ?? !1,
          resultId: Me(e.resultId) ? e.resultId : Ri(a),
          startGroupId: e.startGroupId,
          prefilledVariables: {
              ...r,
              ...e.prefilledVariables
          }
      });
      if (c && "code"in c && "string" == typeof c.code) {
          if ("string" != typeof e.typebot || e.isPreview)
              return l(new Error("An error occurred while loading the bot.",{
                  cause: c.message
              }));
          if (["BAD_REQUEST", "FORBIDDEN"].includes(c.code))
              return l(new Error("This bot is now closed."));
          if ("NOT_FOUND" === c.code)
              return l(new Error("The bot you're looking for doesn't exist."))
      }
      if (!s)
          return l(new Error("Error! Couldn't initiate the chat."));
      s.resultId && a && ((e="session")=>(t,n)=>{
          try {
              return ("session" === e ? localStorage : sessionStorage).removeItem(`${Li}-${t}`),
              ("session" === e ? sessionStorage : localStorage).setItem(`${Li}-${t}`, n)
          } catch {}
      }
      )(s.typebot.settings.general.rememberUser?.storage)(a, s.resultId),
      n(s),
      o(s.typebot.theme.customCss ?? ""),
      s.input?.id && e.onNewInputBlock && e.onNewInputBlock({
          id: s.input.id,
          groupId: s.input.groupId
      }),
      s.logs && e.onNewLogs?.(s.logs)
  }
  ;
  return k((()=>{
      Ne(e.typebot) || a() || c().then()
  }
  )),
  k((()=>{
      "string" != typeof e.typebot && o(e.typebot.theme.customCss ?? "")
  }
  )),
  $((()=>{
      i(!1)
  }
  )),
  [(()=>{
      const e = Yi();
      return fe(e, r),
      e
  }
  )(), (()=>{
      const e = Yi();
      return fe(e, "#lite-badge{background-color:#fff!important;border-radius:4px!important;border-width:1px!important;bottom:20px!important;color:#111827!important;display:flex!important;font-size:14px!important;font-weight:600!important;gap:8px!important;left:auto!important;line-height:20px!important;opacity:1!important;padding:4px 8px!important;position:absolute!important;right:auto!important;top:auto!important;transition:background-color .2s ease-in-out!important;visibility:visible!important;z-index:50!important}#lite-badge:hover{background-color:#f7f8ff!important}"),
      e
  }
  )(), F(X, {
      get when() {
          return s()
      },
      keyed: !0,
      children: e=>F(Mi, {
          error: e
      })
  }), F(X, {
      get when() {
          return t()
      },
      keyed: !0,
      children: t=>F(Qi, {
          get class() {
              return e.class
          },
          get initialChatReply() {
              return {
                  ...t,
                  typebot: {
                      ...t.typebot,
                      settings: "string" == typeof e.typebot ? t.typebot?.settings : e.typebot?.settings,
                      theme: "string" == typeof e.typebot ? t.typebot?.theme : e.typebot?.theme
                  }
              }
          },
          get context() {
              return {
                  apiHost: e.apiHost,
                  isPreview: "string" != typeof e.typebot || (e.isPreview ?? !1),
                  typebotId: t.typebot.id,
                  resultId: t.resultId
              }
          },
          get onNewInputBlock() {
              return e.onNewInputBlock
          },
          get onNewLogs() {
              return e.onNewLogs
          },
          get onAnswer() {
              return e.onAnswer
          },
          get onEnd() {
              return e.onEnd
          }
      })
  })]
}
, Qi = e=>{
  let t;
  const n = new ResizeObserver((e=>ct(e[0].target.clientWidth < 400)));
  return T((()=>{
      t && n.observe(t)
  }
  )),
  k((()=>{
      (()=>{
          const t = document.getElementById("bot-font");
          if (t?.getAttribute("href")?.includes(e.initialChatReply.typebot?.theme?.general?.font ?? "Open Sans"))
              return;
          const n = document.createElement("link");
          n.href = `https://fonts.googleapis.com/css2?family=${e.initialChatReply.typebot?.theme?.general?.font ?? "Open Sans"}:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');')`,
          n.rel = "stylesheet",
          n.id = "bot-font",
          document.head.appendChild(n)
      }
      )(),
      t && ((e,t)=>{
          if (!e)
              return;
          const n = t?.style;
          n && (e.general && Di(e.general, n),
          e.chat && Ui(e.chat, n))
      }
      )(e.initialChatReply.typebot.theme, t)
  }
  )),
  $((()=>{
      t && n.unobserve(t)
  }
  )),
  (()=>{
      const n = Ji()
        , r = n.firstChild;
      return "function" == typeof t ? he(t, n) : t = n,
      fe(r, F(Oi, {
          get context() {
              return e.context
          },
          get initialChatReply() {
              return e.initialChatReply
          },
          get onNewInputBlock() {
              return e.onNewInputBlock
          },
          get onAnswer() {
              return e.onAnswer
          },
          get onEnd() {
              return e.onEnd
          },
          get onNewLogs() {
              return e.onNewLogs
          }
      })),
      fe(n, F(X, {
          get when() {
              return e.initialChatReply.typebot.settings.general.isBrandingEnabled
          },
          get children() {
              return F(it, {
                  botContainer: t
              })
          }
      }), null),
      x((()=>ue(n, "relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center typebot-container " + e.class))),
      n
  }
  )()
}
, es = le("<style>")
, ts = le('<div part="bot">')
, ns = e=>{
  const [t,n] = W(e, ["onOpen", "onClose", "previewMessage", "onPreviewMessageClick", "theme", "autoShowDelay"])
    , [r,o] = _(n.prefilledVariables)
    , [a,i] = _(!1)
    , [s,l] = _({
      message: t.previewMessage?.message ?? "",
      avatarUrl: t.previewMessage?.avatarUrl
  })
    , [c,d] = _(!1)
    , [u,p] = _(!1);
  T((()=>{
      window.addEventListener("message", h);
      const e = t.autoShowDelay
        , n = t.previewMessage?.autoShowDelay;
      Oe(e) && setTimeout((()=>{
          f()
      }
      ), e),
      Oe(n) && setTimeout((()=>{
          y()
      }
      ), n)
  }
  )),
  $((()=>{
      window.removeEventListener("message", h)
  }
  )),
  k((()=>{
      e.prefilledVariables && o((t=>({
          ...t,
          ...e.prefilledVariables
      })))
  }
  ));
  const h = e=>{
      const {data: t} = e;
      t.isFromTypebot && ("open" === t.command && f(),
      "close" === t.command && g(),
      "toggle" === t.command && m(),
      "showPreviewMessage" === t.command && y(t.message),
      "hidePreviewMessage" === t.command && v(),
      "setPrefilledVariables" === t.command && o((e=>({
          ...e,
          ...t.variables
      }))))
  }
    , f = ()=>{
      u() || p(!0),
      v(),
      d(!0),
      c() && t.onOpen?.()
  }
    , g = ()=>{
      d(!1),
      c() && t.onClose?.()
  }
    , m = ()=>{
      c() ? g() : f()
  }
    , b = ()=>{
      t.onPreviewMessageClick?.(),
      f()
  }
    , y = e=>{
      e && l(e),
      c() || i(!0)
  }
    , v = ()=>{
      i(!1)
  }
  ;
  return [(()=>{
      const e = es();
      return fe(e, $e),
      e
  }
  )(), F(X, {
      get when() {
          return a()
      },
      get children() {
          return F(tt, q(s, {
              get placement() {
                  return t.theme?.placement
              },
              get previewMessageTheme() {
                  return t.theme?.previewMessage
              },
              get buttonSize() {
                  return t.theme?.button?.size
              },
              onClick: b,
              onCloseClick: v
          }))
      }
  }), F(We, q((()=>t.theme?.button), {
      get placement() {
          return t.theme?.placement
      },
      toggleBot: m,
      get isBotOpened() {
          return c()
      }
  })), (()=>{
      const o = ts();
      return o.style.setProperty("height", "calc(100% - 80px)"),
      o.style.setProperty("transition", "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"),
      o.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"),
      o.style.setProperty("z-index", "42424242"),
      fe(o, F(X, {
          get when() {
              return u()
          },
          get children() {
              return F(Xi, q(n, {
                  get prefilledVariables() {
                      return r()
                  },
                  class: "rounded-lg"
              }))
          }
      })),
      x((n=>{
          const r = "left" === e.theme?.placement ? "bottom left" : "bottom right"
            , a = c() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)"
            , i = t.theme?.chatWindow?.backgroundColor
            , s = "fixed rounded-lg w-full sm:w-[400px] max-h-[704px]" + (c() ? " opacity-1" : " opacity-0 pointer-events-none") + ("large" === e.theme?.button?.size ? " bottom-24" : " bottom-20") + ("left" === e.theme?.placement ? " sm:left-5" : " sm:right-5");
          return r !== n._v$ && (null != (n._v$ = r) ? o.style.setProperty("transform-origin", r) : o.style.removeProperty("transform-origin")),
          a !== n._v$2 && (null != (n._v$2 = a) ? o.style.setProperty("transform", a) : o.style.removeProperty("transform")),
          i !== n._v$3 && (null != (n._v$3 = i) ? o.style.setProperty("background-color", i) : o.style.removeProperty("background-color")),
          s !== n._v$4 && ue(o, n._v$4 = s),
          n
      }
      ), {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0
      }),
      o
  }
  )()]
}
, rs = le("<style>")
, os = le('<div class="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in" part="overlay"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div>')
, as = e=>{
  const [t,n] = W(e, ["onOpen", "onClose", "autoShowDelay", "theme", "isOpen", "defaultOpen"])
    , [r,o] = _(n.prefilledVariables)
    , [a,i] = _(t.isOpen ?? !1);
  T((()=>{
      t.defaultOpen && c(),
      window.addEventListener("message", l);
      const e = t.autoShowDelay;
      Oe(e) && setTimeout((()=>{
          c()
      }
      ), e)
  }
  )),
  $((()=>{
      window.removeEventListener("message", l)
  }
  )),
  k((()=>{
      Ne(e.isOpen) || e.isOpen === a() || u()
  }
  )),
  k((()=>{
      e.prefilledVariables && o((t=>({
          ...t,
          ...e.prefilledVariables
      })))
  }
  ));
  const s = e=>{
      e.stopPropagation()
  }
    , l = e=>{
      const {data: t} = e;
      t.isFromTypebot && ("open" === t.command && c(),
      "close" === t.command && d(),
      "toggle" === t.command && u(),
      "setPrefilledVariables" === t.command && o((e=>({
          ...e,
          ...t.variables
      }))))
  }
    , c = ()=>{
      i(!0),
      t.onOpen?.(),
      document.body.style.overflow = "hidden",
      document.addEventListener("pointerdown", d)
  }
    , d = ()=>{
      i(!1),
      t.onClose?.(),
      document.body.style.overflow = "auto",
      document.removeEventListener("pointerdown", d)
  }
    , u = ()=>{
      a() ? d() : c()
  }
  ;
  return F(X, {
      get when() {
          return a()
      },
      get children() {
          return [(()=>{
              const e = rs();
              return fe(e, $e),
              e
          }
          )(), (()=>{
              const t = os()
                , o = t.firstChild
                , a = o.nextSibling.nextSibling.firstChild.firstChild;
              return t.style.setProperty("z-index", "42424242"),
              fe(o, $e),
              a.addEventListener("pointerdown", s),
              fe(a, F(Xi, q(n, {
                  get prefilledVariables() {
                      return r()
                  }
              }))),
              x((t=>{
                  const n = "relative h-[80vh] transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg" + (e.theme?.backgroundColor ? " shadow-xl" : "")
                    , r = e.theme?.backgroundColor ?? "transparent";
                  return n !== t._v$ && ue(a, t._v$ = n),
                  r !== t._v$2 && (null != (t._v$2 = r) ? a.style.setProperty("background-color", r) : a.style.removeProperty("background-color")),
                  t
              }
              ), {
                  _v$: void 0,
                  _v$2: void 0
              }),
              t
          }
          )()]
      }
  })
}
, is = le("<style>\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: hidden;\n}\n")
, ss = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "close"
  })
}
, ls = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "hidePreviewMessage"
  })
}
, cs = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "open"
  })
}
, ds = e=>{
  const t = {
      isFromTypebot: !0,
      command: "setPrefilledVariables",
      variables: e
  };
  window.postMessage(t)
}
, us = e=>{
  const t = {
      isFromTypebot: !0,
      command: "showPreviewMessage",
      message: e
  };
  window.postMessage(t)
}
, ps = ()=>{
  window.postMessage({
      isFromTypebot: !0,
      command: "toggle"
  })
}
, hs = e=>{
  const t = e.id ? document.getElementById(e.id) : document.querySelector("typebot-standard");
  if (!t)
      throw new Error("<typebot-standard> element not found.");
  Object.assign(t, e)
}
, fs = e=>{
  const t = document.createElement("typebot-popup");
  Object.assign(t, e),
  document.body.appendChild(t)
}
, gs = e=>{
  const t = document.createElement("typebot-bubble");
  Object.assign(t, e),
  document.body.appendChild(t)
}
;
"undefined" != typeof window && (ke("typebot-standard", Ce, ((e,{element: t})=>{
  const [n,r] = _(!1)
    , o = new IntersectionObserver((e=>{
      e.some((e=>e.isIntersecting)) && r(!0)
  }
  ));
  return T((()=>{
      o.observe(t)
  }
  )),
  $((()=>{
      o.disconnect()
  }
  )),
  [(()=>{
      const e = is()
        , t = e.firstChild;
      return fe(e, $e, t),
      e
  }
  )(), F(X, {
      get when() {
          return n()
      },
      get children() {
          return F(Xi, e)
      }
  })]
}
)),
ke("typebot-bubble", Te, ns),
ke("typebot-popup", Se, as));
const ms = {
  initStandard: hs,
  initPopup: fs,
  initBubble: gs,
  close: ss,
  hidePreviewMessage: ls,
  open: cs,
  setPrefilledVariables: ds,
  showPreviewMessage: us,
  toggle: ps
};
(e=>{
  "undefined" != typeof window && (window.Typebot = {
      ...e
  })
}
)(ms);
export {ms as default};
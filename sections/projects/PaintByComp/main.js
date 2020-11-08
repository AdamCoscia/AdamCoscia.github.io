(() => {
  "use strict";
  function n(n, e) {
    let t, r;
    if (void 0 === e)
      for (const e of n)
        null != e &&
          (void 0 === t
            ? e >= e && (t = r = e)
            : (t > e && (t = e), r < e && (r = e)));
    else {
      let o = -1;
      for (let a of n)
        null != (a = e(a, ++o, n)) &&
          (void 0 === t
            ? a >= a && (t = r = a)
            : (t > a && (t = a), r < a && (r = a)));
    }
    return [t, r];
  }
  function e(n) {
    return n;
  }
  var t = Array.prototype,
    r = t.slice;
  function o(n, e) {
    return n < e ? -1 : n > e ? 1 : n >= e ? 0 : NaN;
  }
  function a(n) {
    let e = n,
      t = n;
    function r(n, e, r, o) {
      for (null == r && (r = 0), null == o && (o = n.length); r < o; ) {
        const a = (r + o) >>> 1;
        t(n[a], e) < 0 ? (r = a + 1) : (o = a);
      }
      return r;
    }
    return (
      1 === n.length &&
        ((e = (e, t) => n(e) - t),
        (t = (function (n) {
          return (e, t) => o(n(e), t);
        })(n))),
      {
        left: r,
        center: function (n, t, o, a) {
          null == o && (o = 0), null == a && (a = n.length);
          const i = r(n, t, o, a - 1);
          return i > o && e(n[i - 1], t) > -e(n[i], t) ? i - 1 : i;
        },
        right: function (n, e, r, o) {
          for (null == r && (r = 0), null == o && (o = n.length); r < o; ) {
            const a = (r + o) >>> 1;
            t(n[a], e) > 0 ? (o = a) : (r = a + 1);
          }
          return r;
        },
      }
    );
  }
  t.map;
  const i = a(o),
    l = i.right,
    u =
      (i.left,
      a(function (n) {
        return null === n ? NaN : +n;
      }).center,
      l);
  function s(n) {
    return function () {
      return n;
    };
  }
  var c = Math.sqrt(50),
    p = Math.sqrt(10),
    f = Math.sqrt(2);
  function _(n, e, t) {
    var r,
      o,
      a,
      i,
      l = -1;
    if (((t = +t), (n = +n) == (e = +e) && t > 0)) return [n];
    if (
      ((r = e < n) && ((o = n), (n = e), (e = o)),
      0 === (i = d(n, e, t)) || !isFinite(i))
    )
      return [];
    if (i > 0)
      for (
        n = Math.ceil(n / i),
          e = Math.floor(e / i),
          a = new Array((o = Math.ceil(e - n + 1)));
        ++l < o;

      )
        a[l] = (n + l) * i;
    else
      for (
        i = -i,
          n = Math.ceil(n * i),
          e = Math.floor(e * i),
          a = new Array((o = Math.ceil(e - n + 1)));
        ++l < o;

      )
        a[l] = (n + l) / i;
    return r && a.reverse(), a;
  }
  function d(n, e, t) {
    var r = (e - n) / Math.max(0, t),
      o = Math.floor(Math.log(r) / Math.LN10),
      a = r / Math.pow(10, o);
    return o >= 0
      ? (a >= c ? 10 : a >= p ? 5 : a >= f ? 2 : 1) * Math.pow(10, o)
      : -Math.pow(10, -o) / (a >= c ? 10 : a >= p ? 5 : a >= f ? 2 : 1);
  }
  function h(n) {
    return (
      Math.ceil(
        Math.log(
          (function (n, e) {
            let t = 0;
            for (let e of n) null != e && (e = +e) >= e && ++t;
            return t;
          })(n)
        ) / Math.LN2
      ) + 1
    );
  }
  function m() {
    var t = e,
      o = n,
      a = h;
    function i(e) {
      Array.isArray(e) || (e = Array.from(e));
      var r,
        i,
        l = e.length,
        s = new Array(l);
      for (r = 0; r < l; ++r) s[r] = t(e[r], r, e);
      var c = o(s),
        p = c[0],
        f = c[1],
        h = a(s, p, f);
      Array.isArray(h) ||
        ((h = +h),
        o === n &&
          ([p, f] = (function (n, e, t) {
            let r;
            for (;;) {
              const o = d(n, e, t);
              if (o === r || 0 === o || !isFinite(o)) return [n, e];
              o > 0
                ? ((n = Math.floor(n / o) * o), (e = Math.ceil(e / o) * o))
                : o < 0 &&
                  ((n = Math.ceil(n * o) / o), (e = Math.floor(e * o) / o)),
                (r = o);
            }
          })(p, f, h)),
        (h = _(p, f, h))[h.length - 1] === f && h.pop());
      for (var m = h.length; h[0] <= p; ) h.shift(), --m;
      for (; h[m - 1] > f; ) h.pop(), --m;
      var g,
        y = new Array(m + 1);
      for (r = 0; r <= m; ++r)
        ((g = y[r] = []).x0 = r > 0 ? h[r - 1] : p), (g.x1 = r < m ? h[r] : f);
      for (r = 0; r < l; ++r)
        p <= (i = s[r]) && i <= f && y[u(h, i, 0, m)].push(e[r]);
      return y;
    }
    return (
      (i.value = function (n) {
        return arguments.length
          ? ((t = "function" == typeof n ? n : s(n)), i)
          : t;
      }),
      (i.domain = function (n) {
        return arguments.length
          ? ((o = "function" == typeof n ? n : s([n[0], n[1]])), i)
          : o;
      }),
      (i.thresholds = function (n) {
        return arguments.length
          ? ((a =
              "function" == typeof n
                ? n
                : Array.isArray(n)
                ? s(r.call(n))
                : s(n)),
            i)
          : a;
      }),
      i
    );
  }
  function g(n, e) {
    let t;
    if (void 0 === e)
      for (const e of n)
        null != e && (t < e || (void 0 === t && e >= e)) && (t = e);
    else {
      let r = -1;
      for (let o of n)
        null != (o = e(o, ++r, n)) &&
          (t < o || (void 0 === t && o >= o)) &&
          (t = o);
    }
    return t;
  }
  var y = { value: () => {} };
  function v() {
    for (var n, e = 0, t = arguments.length, r = {}; e < t; ++e) {
      if (!(n = arguments[e] + "") || n in r || /[\s.]/.test(n))
        throw new Error("illegal type: " + n);
      r[n] = [];
    }
    return new b(r);
  }
  function b(n) {
    this._ = n;
  }
  function w(n, e) {
    return n
      .trim()
      .split(/^|\s+/)
      .map(function (n) {
        var t = "",
          r = n.indexOf(".");
        if (
          (r >= 0 && ((t = n.slice(r + 1)), (n = n.slice(0, r))),
          n && !e.hasOwnProperty(n))
        )
          throw new Error("unknown type: " + n);
        return { type: n, name: t };
      });
  }
  function k(n, e) {
    for (var t, r = 0, o = n.length; r < o; ++r)
      if ((t = n[r]).name === e) return t.value;
  }
  function E(n, e, t) {
    for (var r = 0, o = n.length; r < o; ++r)
      if (n[r].name === e) {
        (n[r] = y), (n = n.slice(0, r).concat(n.slice(r + 1)));
        break;
      }
    return null != t && n.push({ name: e, value: t }), n;
  }
  b.prototype = v.prototype = {
    constructor: b,
    on: function (n, e) {
      var t,
        r = this._,
        o = w(n + "", r),
        a = -1,
        i = o.length;
      if (!(arguments.length < 2)) {
        if (null != e && "function" != typeof e)
          throw new Error("invalid callback: " + e);
        for (; ++a < i; )
          if ((t = (n = o[a]).type)) r[t] = E(r[t], n.name, e);
          else if (null == e) for (t in r) r[t] = E(r[t], n.name, null);
        return this;
      }
      for (; ++a < i; )
        if ((t = (n = o[a]).type) && (t = k(r[t], n.name))) return t;
    },
    copy: function () {
      var n = {},
        e = this._;
      for (var t in e) n[t] = e[t].slice();
      return new b(n);
    },
    call: function (n, e) {
      if ((t = arguments.length - 2) > 0)
        for (var t, r, o = new Array(t), a = 0; a < t; ++a)
          o[a] = arguments[a + 2];
      if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
      for (a = 0, t = (r = this._[n]).length; a < t; ++a)
        r[a].value.apply(e, o);
    },
    apply: function (n, e, t) {
      if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
      for (var r = this._[n], o = 0, a = r.length; o < a; ++o)
        r[o].value.apply(e, t);
    },
  };
  const x = v;
  function S() {}
  function A(n) {
    return null == n
      ? S
      : function () {
          return this.querySelector(n);
        };
  }
  function M(n) {
    return "object" == typeof n && "length" in n ? n : Array.from(n);
  }
  function R() {
    return [];
  }
  function N(n) {
    return null == n
      ? R
      : function () {
          return this.querySelectorAll(n);
        };
  }
  function C(n) {
    return function () {
      return this.matches(n);
    };
  }
  function L(n) {
    return function (e) {
      return e.matches(n);
    };
  }
  var B = Array.prototype.find;
  function D() {
    return this.firstElementChild;
  }
  var P = Array.prototype.filter;
  function U() {
    return this.children;
  }
  function G(n) {
    return new Array(n.length);
  }
  function T(n, e) {
    (this.ownerDocument = n.ownerDocument),
      (this.namespaceURI = n.namespaceURI),
      (this._next = null),
      (this._parent = n),
      (this.__data__ = e);
  }
  function I(n) {
    return function () {
      return n;
    };
  }
  function H(n, e, t, r, o, a) {
    for (var i, l = 0, u = e.length, s = a.length; l < s; ++l)
      (i = e[l]) ? ((i.__data__ = a[l]), (r[l] = i)) : (t[l] = new T(n, a[l]));
    for (; l < u; ++l) (i = e[l]) && (o[l] = i);
  }
  function F(n, e, t, r, o, a, i) {
    var l,
      u,
      s,
      c = new Map(),
      p = e.length,
      f = a.length,
      _ = new Array(p);
    for (l = 0; l < p; ++l)
      (u = e[l]) &&
        ((_[l] = s = i.call(u, u.__data__, l, e) + ""),
        c.has(s) ? (o[l] = u) : c.set(s, u));
    for (l = 0; l < f; ++l)
      (s = i.call(n, a[l], l, a) + ""),
        (u = c.get(s))
          ? ((r[l] = u), (u.__data__ = a[l]), c.delete(s))
          : (t[l] = new T(n, a[l]));
    for (l = 0; l < p; ++l) (u = e[l]) && c.get(_[l]) === u && (o[l] = u);
  }
  function O(n) {
    return n.__data__;
  }
  function j(n, e) {
    return n < e ? -1 : n > e ? 1 : n >= e ? 0 : NaN;
  }
  T.prototype = {
    constructor: T,
    appendChild: function (n) {
      return this._parent.insertBefore(n, this._next);
    },
    insertBefore: function (n, e) {
      return this._parent.insertBefore(n, e);
    },
    querySelector: function (n) {
      return this._parent.querySelector(n);
    },
    querySelectorAll: function (n) {
      return this._parent.querySelectorAll(n);
    },
  };
  var K = "http://www.w3.org/1999/xhtml";
  const z = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: K,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
  };
  function V(n) {
    var e = (n += ""),
      t = e.indexOf(":");
    return (
      t >= 0 && "xmlns" !== (e = n.slice(0, t)) && (n = n.slice(t + 1)),
      z.hasOwnProperty(e) ? { space: z[e], local: n } : n
    );
  }
  function $(n) {
    return function () {
      this.removeAttribute(n);
    };
  }
  function W(n) {
    return function () {
      this.removeAttributeNS(n.space, n.local);
    };
  }
  function X(n, e) {
    return function () {
      this.setAttribute(n, e);
    };
  }
  function q(n, e) {
    return function () {
      this.setAttributeNS(n.space, n.local, e);
    };
  }
  function Y(n, e) {
    return function () {
      var t = e.apply(this, arguments);
      null == t ? this.removeAttribute(n) : this.setAttribute(n, t);
    };
  }
  function Z(n, e) {
    return function () {
      var t = e.apply(this, arguments);
      null == t
        ? this.removeAttributeNS(n.space, n.local)
        : this.setAttributeNS(n.space, n.local, t);
    };
  }
  function J(n) {
    return (
      (n.ownerDocument && n.ownerDocument.defaultView) ||
      (n.document && n) ||
      n.defaultView
    );
  }
  function Q(n) {
    return function () {
      this.style.removeProperty(n);
    };
  }
  function nn(n, e, t) {
    return function () {
      this.style.setProperty(n, e, t);
    };
  }
  function en(n, e, t) {
    return function () {
      var r = e.apply(this, arguments);
      null == r
        ? this.style.removeProperty(n)
        : this.style.setProperty(n, r, t);
    };
  }
  function tn(n, e) {
    return (
      n.style.getPropertyValue(e) ||
      J(n).getComputedStyle(n, null).getPropertyValue(e)
    );
  }
  function rn(n) {
    return function () {
      delete this[n];
    };
  }
  function on(n, e) {
    return function () {
      this[n] = e;
    };
  }
  function an(n, e) {
    return function () {
      var t = e.apply(this, arguments);
      null == t ? delete this[n] : (this[n] = t);
    };
  }
  function ln(n) {
    return n.trim().split(/^|\s+/);
  }
  function un(n) {
    return n.classList || new sn(n);
  }
  function sn(n) {
    (this._node = n), (this._names = ln(n.getAttribute("class") || ""));
  }
  function cn(n, e) {
    for (var t = un(n), r = -1, o = e.length; ++r < o; ) t.add(e[r]);
  }
  function pn(n, e) {
    for (var t = un(n), r = -1, o = e.length; ++r < o; ) t.remove(e[r]);
  }
  function fn(n) {
    return function () {
      cn(this, n);
    };
  }
  function _n(n) {
    return function () {
      pn(this, n);
    };
  }
  function dn(n, e) {
    return function () {
      (e.apply(this, arguments) ? cn : pn)(this, n);
    };
  }
  function hn() {
    this.textContent = "";
  }
  function mn(n) {
    return function () {
      this.textContent = n;
    };
  }
  function gn(n) {
    return function () {
      var e = n.apply(this, arguments);
      this.textContent = null == e ? "" : e;
    };
  }
  function yn() {
    this.innerHTML = "";
  }
  function vn(n) {
    return function () {
      this.innerHTML = n;
    };
  }
  function bn(n) {
    return function () {
      var e = n.apply(this, arguments);
      this.innerHTML = null == e ? "" : e;
    };
  }
  function wn() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function kn() {
    this.previousSibling &&
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function En(n) {
    return function () {
      var e = this.ownerDocument,
        t = this.namespaceURI;
      return t === K && e.documentElement.namespaceURI === K
        ? e.createElement(n)
        : e.createElementNS(t, n);
    };
  }
  function xn(n) {
    return function () {
      return this.ownerDocument.createElementNS(n.space, n.local);
    };
  }
  function Sn(n) {
    var e = V(n);
    return (e.local ? xn : En)(e);
  }
  function An() {
    return null;
  }
  function Mn() {
    var n = this.parentNode;
    n && n.removeChild(this);
  }
  function Rn() {
    var n = this.cloneNode(!1),
      e = this.parentNode;
    return e ? e.insertBefore(n, this.nextSibling) : n;
  }
  function Nn() {
    var n = this.cloneNode(!0),
      e = this.parentNode;
    return e ? e.insertBefore(n, this.nextSibling) : n;
  }
  function Cn(n) {
    return n
      .trim()
      .split(/^|\s+/)
      .map(function (n) {
        var e = "",
          t = n.indexOf(".");
        return (
          t >= 0 && ((e = n.slice(t + 1)), (n = n.slice(0, t))),
          { type: n, name: e }
        );
      });
  }
  function Ln(n) {
    return function () {
      var e = this.__on;
      if (e) {
        for (var t, r = 0, o = -1, a = e.length; r < a; ++r)
          (t = e[r]),
            (n.type && t.type !== n.type) || t.name !== n.name
              ? (e[++o] = t)
              : this.removeEventListener(t.type, t.listener, t.options);
        ++o ? (e.length = o) : delete this.__on;
      }
    };
  }
  function Bn(n, e, t) {
    return function () {
      var r,
        o = this.__on,
        a = (function (n) {
          return function (e) {
            n.call(this, e, this.__data__);
          };
        })(e);
      if (o)
        for (var i = 0, l = o.length; i < l; ++i)
          if ((r = o[i]).type === n.type && r.name === n.name)
            return (
              this.removeEventListener(r.type, r.listener, r.options),
              this.addEventListener(r.type, (r.listener = a), (r.options = t)),
              void (r.value = e)
            );
      this.addEventListener(n.type, a, t),
        (r = { type: n.type, name: n.name, value: e, listener: a, options: t }),
        o ? o.push(r) : (this.__on = [r]);
    };
  }
  function Dn(n, e, t) {
    var r = J(n),
      o = r.CustomEvent;
    "function" == typeof o
      ? (o = new o(e, t))
      : ((o = r.document.createEvent("Event")),
        t
          ? (o.initEvent(e, t.bubbles, t.cancelable), (o.detail = t.detail))
          : o.initEvent(e, !1, !1)),
      n.dispatchEvent(o);
  }
  function Pn(n, e) {
    return function () {
      return Dn(this, n, e);
    };
  }
  function Un(n, e) {
    return function () {
      return Dn(this, n, e.apply(this, arguments));
    };
  }
  sn.prototype = {
    add: function (n) {
      this._names.indexOf(n) < 0 &&
        (this._names.push(n),
        this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function (n) {
      var e = this._names.indexOf(n);
      e >= 0 &&
        (this._names.splice(e, 1),
        this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function (n) {
      return this._names.indexOf(n) >= 0;
    },
  };
  var Gn = [null];
  function Tn(n, e) {
    (this._groups = n), (this._parents = e);
  }
  function In() {
    return new Tn([[document.documentElement]], Gn);
  }
  Tn.prototype = In.prototype = {
    constructor: Tn,
    select: function (n) {
      "function" != typeof n && (n = A(n));
      for (
        var e = this._groups, t = e.length, r = new Array(t), o = 0;
        o < t;
        ++o
      )
        for (
          var a, i, l = e[o], u = l.length, s = (r[o] = new Array(u)), c = 0;
          c < u;
          ++c
        )
          (a = l[c]) &&
            (i = n.call(a, a.__data__, c, l)) &&
            ("__data__" in a && (i.__data__ = a.__data__), (s[c] = i));
      return new Tn(r, this._parents);
    },
    selectAll: function (n) {
      n =
        "function" == typeof n
          ? (function (n) {
              return function () {
                var e = n.apply(this, arguments);
                return null == e ? [] : M(e);
              };
            })(n)
          : N(n);
      for (
        var e = this._groups, t = e.length, r = [], o = [], a = 0;
        a < t;
        ++a
      )
        for (var i, l = e[a], u = l.length, s = 0; s < u; ++s)
          (i = l[s]) && (r.push(n.call(i, i.__data__, s, l)), o.push(i));
      return new Tn(r, o);
    },
    selectChild: function (n) {
      return this.select(
        null == n
          ? D
          : (function (n) {
              return function () {
                return B.call(this.children, n);
              };
            })("function" == typeof n ? n : L(n))
      );
    },
    selectChildren: function (n) {
      return this.selectAll(
        null == n
          ? U
          : (function (n) {
              return function () {
                return P.call(this.children, n);
              };
            })("function" == typeof n ? n : L(n))
      );
    },
    filter: function (n) {
      "function" != typeof n && (n = C(n));
      for (
        var e = this._groups, t = e.length, r = new Array(t), o = 0;
        o < t;
        ++o
      )
        for (var a, i = e[o], l = i.length, u = (r[o] = []), s = 0; s < l; ++s)
          (a = i[s]) && n.call(a, a.__data__, s, i) && u.push(a);
      return new Tn(r, this._parents);
    },
    data: function (n, e) {
      if (!arguments.length) return Array.from(this, O);
      var t = e ? F : H,
        r = this._parents,
        o = this._groups;
      "function" != typeof n && (n = I(n));
      for (
        var a = o.length,
          i = new Array(a),
          l = new Array(a),
          u = new Array(a),
          s = 0;
        s < a;
        ++s
      ) {
        var c = r[s],
          p = o[s],
          f = p.length,
          _ = M(n.call(c, c && c.__data__, s, r)),
          d = _.length,
          h = (l[s] = new Array(d)),
          m = (i[s] = new Array(d)),
          g = (u[s] = new Array(f));
        t(c, p, h, m, g, _, e);
        for (var y, v, b = 0, w = 0; b < d; ++b)
          if ((y = h[b])) {
            for (b >= w && (w = b + 1); !(v = m[w]) && ++w < d; );
            y._next = v || null;
          }
      }
      return ((i = new Tn(i, r))._enter = l), (i._exit = u), i;
    },
    enter: function () {
      return new Tn(this._enter || this._groups.map(G), this._parents);
    },
    exit: function () {
      return new Tn(this._exit || this._groups.map(G), this._parents);
    },
    join: function (n, e, t) {
      var r = this.enter(),
        o = this,
        a = this.exit();
      return (
        (r = "function" == typeof n ? n(r) : r.append(n + "")),
        null != e && (o = e(o)),
        null == t ? a.remove() : t(a),
        r && o ? r.merge(o).order() : o
      );
    },
    merge: function (n) {
      if (!(n instanceof Tn)) throw new Error("invalid merge");
      for (
        var e = this._groups,
          t = n._groups,
          r = e.length,
          o = t.length,
          a = Math.min(r, o),
          i = new Array(r),
          l = 0;
        l < a;
        ++l
      )
        for (
          var u,
            s = e[l],
            c = t[l],
            p = s.length,
            f = (i[l] = new Array(p)),
            _ = 0;
          _ < p;
          ++_
        )
          (u = s[_] || c[_]) && (f[_] = u);
      for (; l < r; ++l) i[l] = e[l];
      return new Tn(i, this._parents);
    },
    selection: function () {
      return this;
    },
    order: function () {
      for (var n = this._groups, e = -1, t = n.length; ++e < t; )
        for (var r, o = n[e], a = o.length - 1, i = o[a]; --a >= 0; )
          (r = o[a]) &&
            (i &&
              4 ^ r.compareDocumentPosition(i) &&
              i.parentNode.insertBefore(r, i),
            (i = r));
      return this;
    },
    sort: function (n) {
      function e(e, t) {
        return e && t ? n(e.__data__, t.__data__) : !e - !t;
      }
      n || (n = j);
      for (
        var t = this._groups, r = t.length, o = new Array(r), a = 0;
        a < r;
        ++a
      ) {
        for (
          var i, l = t[a], u = l.length, s = (o[a] = new Array(u)), c = 0;
          c < u;
          ++c
        )
          (i = l[c]) && (s[c] = i);
        s.sort(e);
      }
      return new Tn(o, this._parents).order();
    },
    call: function () {
      var n = arguments[0];
      return (arguments[0] = this), n.apply(null, arguments), this;
    },
    nodes: function () {
      return Array.from(this);
    },
    node: function () {
      for (var n = this._groups, e = 0, t = n.length; e < t; ++e)
        for (var r = n[e], o = 0, a = r.length; o < a; ++o) {
          var i = r[o];
          if (i) return i;
        }
      return null;
    },
    size: function () {
      let n = 0;
      for (const e of this) ++n;
      return n;
    },
    empty: function () {
      return !this.node();
    },
    each: function (n) {
      for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
        for (var o, a = e[t], i = 0, l = a.length; i < l; ++i)
          (o = a[i]) && n.call(o, o.__data__, i, a);
      return this;
    },
    attr: function (n, e) {
      var t = V(n);
      if (arguments.length < 2) {
        var r = this.node();
        return t.local ? r.getAttributeNS(t.space, t.local) : r.getAttribute(t);
      }
      return this.each(
        (null == e
          ? t.local
            ? W
            : $
          : "function" == typeof e
          ? t.local
            ? Z
            : Y
          : t.local
          ? q
          : X)(t, e)
      );
    },
    style: function (n, e, t) {
      return arguments.length > 1
        ? this.each(
            (null == e ? Q : "function" == typeof e ? en : nn)(
              n,
              e,
              null == t ? "" : t
            )
          )
        : tn(this.node(), n);
    },
    property: function (n, e) {
      return arguments.length > 1
        ? this.each((null == e ? rn : "function" == typeof e ? an : on)(n, e))
        : this.node()[n];
    },
    classed: function (n, e) {
      var t = ln(n + "");
      if (arguments.length < 2) {
        for (var r = un(this.node()), o = -1, a = t.length; ++o < a; )
          if (!r.contains(t[o])) return !1;
        return !0;
      }
      return this.each(("function" == typeof e ? dn : e ? fn : _n)(t, e));
    },
    text: function (n) {
      return arguments.length
        ? this.each(null == n ? hn : ("function" == typeof n ? gn : mn)(n))
        : this.node().textContent;
    },
    html: function (n) {
      return arguments.length
        ? this.each(null == n ? yn : ("function" == typeof n ? bn : vn)(n))
        : this.node().innerHTML;
    },
    raise: function () {
      return this.each(wn);
    },
    lower: function () {
      return this.each(kn);
    },
    append: function (n) {
      var e = "function" == typeof n ? n : Sn(n);
      return this.select(function () {
        return this.appendChild(e.apply(this, arguments));
      });
    },
    insert: function (n, e) {
      var t = "function" == typeof n ? n : Sn(n),
        r = null == e ? An : "function" == typeof e ? e : A(e);
      return this.select(function () {
        return this.insertBefore(
          t.apply(this, arguments),
          r.apply(this, arguments) || null
        );
      });
    },
    remove: function () {
      return this.each(Mn);
    },
    clone: function (n) {
      return this.select(n ? Nn : Rn);
    },
    datum: function (n) {
      return arguments.length
        ? this.property("__data__", n)
        : this.node().__data__;
    },
    on: function (n, e, t) {
      var r,
        o,
        a = Cn(n + ""),
        i = a.length;
      if (!(arguments.length < 2)) {
        for (l = e ? Bn : Ln, r = 0; r < i; ++r) this.each(l(a[r], e, t));
        return this;
      }
      var l = this.node().__on;
      if (l)
        for (var u, s = 0, c = l.length; s < c; ++s)
          for (r = 0, u = l[s]; r < i; ++r)
            if ((o = a[r]).type === u.type && o.name === u.name) return u.value;
    },
    dispatch: function (n, e) {
      return this.each(("function" == typeof e ? Un : Pn)(n, e));
    },
    [Symbol.iterator]: function* () {
      for (var n = this._groups, e = 0, t = n.length; e < t; ++e)
        for (var r, o = n[e], a = 0, i = o.length; a < i; ++a)
          (r = o[a]) && (yield r);
    },
  };
  const Hn = In;
  function Fn(n) {
    return "string" == typeof n
      ? new Tn([[document.querySelector(n)]], [document.documentElement])
      : new Tn([[n]], Gn);
  }
  function On(n) {
    n.preventDefault(), n.stopImmediatePropagation();
  }
  function jn(n) {
    var e = n.document.documentElement,
      t = Fn(n).on("dragstart.drag", On, !0);
    "onselectstart" in e
      ? t.on("selectstart.drag", On, !0)
      : ((e.__noselect = e.style.MozUserSelect),
        (e.style.MozUserSelect = "none"));
  }
  function Kn(n, e) {
    var t = n.document.documentElement,
      r = Fn(n).on("dragstart.drag", null);
    e &&
      (r.on("click.drag", On, !0),
      setTimeout(function () {
        r.on("click.drag", null);
      }, 0)),
      "onselectstart" in t
        ? r.on("selectstart.drag", null)
        : ((t.style.MozUserSelect = t.__noselect), delete t.__noselect);
  }
  function zn(n, e, t) {
    (n.prototype = e.prototype = t), (t.constructor = n);
  }
  function Vn(n, e) {
    var t = Object.create(n.prototype);
    for (var r in e) t[r] = e[r];
    return t;
  }
  function $n() {}
  var Wn = 0.7,
    Xn = 1 / Wn,
    qn = "\\s*([+-]?\\d+)\\s*",
    Yn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    Zn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    Jn = /^#([0-9a-f]{3,8})$/,
    Qn = new RegExp("^rgb\\(" + [qn, qn, qn] + "\\)$"),
    ne = new RegExp("^rgb\\(" + [Zn, Zn, Zn] + "\\)$"),
    ee = new RegExp("^rgba\\(" + [qn, qn, qn, Yn] + "\\)$"),
    te = new RegExp("^rgba\\(" + [Zn, Zn, Zn, Yn] + "\\)$"),
    re = new RegExp("^hsl\\(" + [Yn, Zn, Zn] + "\\)$"),
    oe = new RegExp("^hsla\\(" + [Yn, Zn, Zn, Yn] + "\\)$"),
    ae = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    };
  function ie() {
    return this.rgb().formatHex();
  }
  function le() {
    return this.rgb().formatRgb();
  }
  function ue(n) {
    var e, t;
    return (
      (n = (n + "").trim().toLowerCase()),
      (e = Jn.exec(n))
        ? ((t = e[1].length),
          (e = parseInt(e[1], 16)),
          6 === t
            ? se(e)
            : 3 === t
            ? new _e(
                ((e >> 8) & 15) | ((e >> 4) & 240),
                ((e >> 4) & 15) | (240 & e),
                ((15 & e) << 4) | (15 & e),
                1
              )
            : 8 === t
            ? ce(
                (e >> 24) & 255,
                (e >> 16) & 255,
                (e >> 8) & 255,
                (255 & e) / 255
              )
            : 4 === t
            ? ce(
                ((e >> 12) & 15) | ((e >> 8) & 240),
                ((e >> 8) & 15) | ((e >> 4) & 240),
                ((e >> 4) & 15) | (240 & e),
                (((15 & e) << 4) | (15 & e)) / 255
              )
            : null)
        : (e = Qn.exec(n))
        ? new _e(e[1], e[2], e[3], 1)
        : (e = ne.exec(n))
        ? new _e((255 * e[1]) / 100, (255 * e[2]) / 100, (255 * e[3]) / 100, 1)
        : (e = ee.exec(n))
        ? ce(e[1], e[2], e[3], e[4])
        : (e = te.exec(n))
        ? ce((255 * e[1]) / 100, (255 * e[2]) / 100, (255 * e[3]) / 100, e[4])
        : (e = re.exec(n))
        ? ge(e[1], e[2] / 100, e[3] / 100, 1)
        : (e = oe.exec(n))
        ? ge(e[1], e[2] / 100, e[3] / 100, e[4])
        : ae.hasOwnProperty(n)
        ? se(ae[n])
        : "transparent" === n
        ? new _e(NaN, NaN, NaN, 0)
        : null
    );
  }
  function se(n) {
    return new _e((n >> 16) & 255, (n >> 8) & 255, 255 & n, 1);
  }
  function ce(n, e, t, r) {
    return r <= 0 && (n = e = t = NaN), new _e(n, e, t, r);
  }
  function pe(n) {
    return (
      n instanceof $n || (n = ue(n)),
      n ? new _e((n = n.rgb()).r, n.g, n.b, n.opacity) : new _e()
    );
  }
  function fe(n, e, t, r) {
    return 1 === arguments.length ? pe(n) : new _e(n, e, t, null == r ? 1 : r);
  }
  function _e(n, e, t, r) {
    (this.r = +n), (this.g = +e), (this.b = +t), (this.opacity = +r);
  }
  function de() {
    return "#" + me(this.r) + me(this.g) + me(this.b);
  }
  function he() {
    var n = this.opacity;
    return (
      (1 === (n = isNaN(n) ? 1 : Math.max(0, Math.min(1, n)))
        ? "rgb("
        : "rgba(") +
      Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
      ", " +
      Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
      (1 === n ? ")" : ", " + n + ")")
    );
  }
  function me(n) {
    return (
      ((n = Math.max(0, Math.min(255, Math.round(n) || 0))) < 16 ? "0" : "") +
      n.toString(16)
    );
  }
  function ge(n, e, t, r) {
    return (
      r <= 0
        ? (n = e = t = NaN)
        : t <= 0 || t >= 1
        ? (n = e = NaN)
        : e <= 0 && (n = NaN),
      new ve(n, e, t, r)
    );
  }
  function ye(n) {
    if (n instanceof ve) return new ve(n.h, n.s, n.l, n.opacity);
    if ((n instanceof $n || (n = ue(n)), !n)) return new ve();
    if (n instanceof ve) return n;
    var e = (n = n.rgb()).r / 255,
      t = n.g / 255,
      r = n.b / 255,
      o = Math.min(e, t, r),
      a = Math.max(e, t, r),
      i = NaN,
      l = a - o,
      u = (a + o) / 2;
    return (
      l
        ? ((i =
            e === a
              ? (t - r) / l + 6 * (t < r)
              : t === a
              ? (r - e) / l + 2
              : (e - t) / l + 4),
          (l /= u < 0.5 ? a + o : 2 - a - o),
          (i *= 60))
        : (l = u > 0 && u < 1 ? 0 : i),
      new ve(i, l, u, n.opacity)
    );
  }
  function ve(n, e, t, r) {
    (this.h = +n), (this.s = +e), (this.l = +t), (this.opacity = +r);
  }
  function be(n, e, t) {
    return (
      255 *
      (n < 60
        ? e + ((t - e) * n) / 60
        : n < 180
        ? t
        : n < 240
        ? e + ((t - e) * (240 - n)) / 60
        : e)
    );
  }
  function we(n, e, t, r, o) {
    var a = n * n,
      i = a * n;
    return (
      ((1 - 3 * n + 3 * a - i) * e +
        (4 - 6 * a + 3 * i) * t +
        (1 + 3 * n + 3 * a - 3 * i) * r +
        i * o) /
      6
    );
  }
  zn($n, ue, {
    copy: function (n) {
      return Object.assign(new this.constructor(), this, n);
    },
    displayable: function () {
      return this.rgb().displayable();
    },
    hex: ie,
    formatHex: ie,
    formatHsl: function () {
      return ye(this).formatHsl();
    },
    formatRgb: le,
    toString: le,
  }),
    zn(
      _e,
      fe,
      Vn($n, {
        brighter: function (n) {
          return (
            (n = null == n ? Xn : Math.pow(Xn, n)),
            new _e(this.r * n, this.g * n, this.b * n, this.opacity)
          );
        },
        darker: function (n) {
          return (
            (n = null == n ? Wn : Math.pow(Wn, n)),
            new _e(this.r * n, this.g * n, this.b * n, this.opacity)
          );
        },
        rgb: function () {
          return this;
        },
        displayable: function () {
          return (
            -0.5 <= this.r &&
            this.r < 255.5 &&
            -0.5 <= this.g &&
            this.g < 255.5 &&
            -0.5 <= this.b &&
            this.b < 255.5 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        hex: de,
        formatHex: de,
        formatRgb: he,
        toString: he,
      })
    ),
    zn(
      ve,
      function (n, e, t, r) {
        return 1 === arguments.length
          ? ye(n)
          : new ve(n, e, t, null == r ? 1 : r);
      },
      Vn($n, {
        brighter: function (n) {
          return (
            (n = null == n ? Xn : Math.pow(Xn, n)),
            new ve(this.h, this.s, this.l * n, this.opacity)
          );
        },
        darker: function (n) {
          return (
            (n = null == n ? Wn : Math.pow(Wn, n)),
            new ve(this.h, this.s, this.l * n, this.opacity)
          );
        },
        rgb: function () {
          var n = (this.h % 360) + 360 * (this.h < 0),
            e = isNaN(n) || isNaN(this.s) ? 0 : this.s,
            t = this.l,
            r = t + (t < 0.5 ? t : 1 - t) * e,
            o = 2 * t - r;
          return new _e(
            be(n >= 240 ? n - 240 : n + 120, o, r),
            be(n, o, r),
            be(n < 120 ? n + 240 : n - 120, o, r),
            this.opacity
          );
        },
        displayable: function () {
          return (
            ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
            0 <= this.l &&
            this.l <= 1 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        formatHsl: function () {
          var n = this.opacity;
          return (
            (1 === (n = isNaN(n) ? 1 : Math.max(0, Math.min(1, n)))
              ? "hsl("
              : "hsla(") +
            (this.h || 0) +
            ", " +
            100 * (this.s || 0) +
            "%, " +
            100 * (this.l || 0) +
            "%" +
            (1 === n ? ")" : ", " + n + ")")
          );
        },
      })
    );
  const ke = (n) => () => n;
  function Ee(n, e) {
    return function (t) {
      return n + t * e;
    };
  }
  function xe(n, e) {
    var t = e - n;
    return t ? Ee(n, t) : ke(isNaN(n) ? e : n);
  }
  const Se = (function n(e) {
    var t = (function (n) {
      return 1 == (n = +n)
        ? xe
        : function (e, t) {
            return t - e
              ? (function (n, e, t) {
                  return (
                    (n = Math.pow(n, t)),
                    (e = Math.pow(e, t) - n),
                    (t = 1 / t),
                    function (r) {
                      return Math.pow(n + r * e, t);
                    }
                  );
                })(e, t, n)
              : ke(isNaN(e) ? t : e);
          };
    })(e);
    function r(n, e) {
      var r = t((n = fe(n)).r, (e = fe(e)).r),
        o = t(n.g, e.g),
        a = t(n.b, e.b),
        i = xe(n.opacity, e.opacity);
      return function (e) {
        return (
          (n.r = r(e)), (n.g = o(e)), (n.b = a(e)), (n.opacity = i(e)), n + ""
        );
      };
    }
    return (r.gamma = n), r;
  })(1);
  function Ae(n) {
    return function (e) {
      var t,
        r,
        o = e.length,
        a = new Array(o),
        i = new Array(o),
        l = new Array(o);
      for (t = 0; t < o; ++t)
        (r = fe(e[t])), (a[t] = r.r || 0), (i[t] = r.g || 0), (l[t] = r.b || 0);
      return (
        (a = n(a)),
        (i = n(i)),
        (l = n(l)),
        (r.opacity = 1),
        function (n) {
          return (r.r = a(n)), (r.g = i(n)), (r.b = l(n)), r + "";
        }
      );
    };
  }
  var Me = Ae(function (n) {
    var e = n.length - 1;
    return function (t) {
      var r = t <= 0 ? (t = 0) : t >= 1 ? ((t = 1), e - 1) : Math.floor(t * e),
        o = n[r],
        a = n[r + 1],
        i = r > 0 ? n[r - 1] : 2 * o - a,
        l = r < e - 1 ? n[r + 2] : 2 * a - o;
      return we((t - r / e) * e, i, o, a, l);
    };
  });
  function Re(n, e) {
    var t,
      r = e ? e.length : 0,
      o = n ? Math.min(r, n.length) : 0,
      a = new Array(o),
      i = new Array(r);
    for (t = 0; t < o; ++t) a[t] = Ge(n[t], e[t]);
    for (; t < r; ++t) i[t] = e[t];
    return function (n) {
      for (t = 0; t < o; ++t) i[t] = a[t](n);
      return i;
    };
  }
  function Ne(n, e) {
    var t = new Date();
    return (
      (n = +n),
      (e = +e),
      function (r) {
        return t.setTime(n * (1 - r) + e * r), t;
      }
    );
  }
  function Ce(n, e) {
    return (
      (n = +n),
      (e = +e),
      function (t) {
        return n * (1 - t) + e * t;
      }
    );
  }
  function Le(n, e) {
    var t,
      r = {},
      o = {};
    for (t in ((null !== n && "object" == typeof n) || (n = {}),
    (null !== e && "object" == typeof e) || (e = {}),
    e))
      t in n ? (r[t] = Ge(n[t], e[t])) : (o[t] = e[t]);
    return function (n) {
      for (t in r) o[t] = r[t](n);
      return o;
    };
  }
  Ae(function (n) {
    var e = n.length;
    return function (t) {
      var r = Math.floor(((t %= 1) < 0 ? ++t : t) * e),
        o = n[(r + e - 1) % e],
        a = n[r % e],
        i = n[(r + 1) % e],
        l = n[(r + 2) % e];
      return we((t - r / e) * e, o, a, i, l);
    };
  });
  var Be = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    De = new RegExp(Be.source, "g");
  function Pe(n, e) {
    var t,
      r,
      o,
      a = (Be.lastIndex = De.lastIndex = 0),
      i = -1,
      l = [],
      u = [];
    for (n += "", e += ""; (t = Be.exec(n)) && (r = De.exec(e)); )
      (o = r.index) > a &&
        ((o = e.slice(a, o)), l[i] ? (l[i] += o) : (l[++i] = o)),
        (t = t[0]) === (r = r[0])
          ? l[i]
            ? (l[i] += r)
            : (l[++i] = r)
          : ((l[++i] = null), u.push({ i, x: Ce(t, r) })),
        (a = De.lastIndex);
    return (
      a < e.length && ((o = e.slice(a)), l[i] ? (l[i] += o) : (l[++i] = o)),
      l.length < 2
        ? u[0]
          ? (function (n) {
              return function (e) {
                return n(e) + "";
              };
            })(u[0].x)
          : (function (n) {
              return function () {
                return n;
              };
            })(e)
        : ((e = u.length),
          function (n) {
            for (var t, r = 0; r < e; ++r) l[(t = u[r]).i] = t.x(n);
            return l.join("");
          })
    );
  }
  function Ue(n, e) {
    e || (e = []);
    var t,
      r = n ? Math.min(e.length, n.length) : 0,
      o = e.slice();
    return function (a) {
      for (t = 0; t < r; ++t) o[t] = n[t] * (1 - a) + e[t] * a;
      return o;
    };
  }
  function Ge(n, e) {
    var t,
      r,
      o = typeof e;
    return null == e || "boolean" === o
      ? ke(e)
      : ("number" === o
          ? Ce
          : "string" === o
          ? (t = ue(e))
            ? ((e = t), Se)
            : Pe
          : e instanceof ue
          ? Se
          : e instanceof Date
          ? Ne
          : ((r = e),
            !ArrayBuffer.isView(r) || r instanceof DataView
              ? Array.isArray(e)
                ? Re
                : ("function" != typeof e.valueOf &&
                    "function" != typeof e.toString) ||
                  isNaN(e)
                ? Le
                : Ce
              : Ue))(n, e);
  }
  function Te(n, e) {
    if (
      ((n = (function (n) {
        let e;
        for (; (e = n.sourceEvent); ) n = e;
        return n;
      })(n)),
      void 0 === e && (e = n.currentTarget),
      e)
    ) {
      var t = e.ownerSVGElement || e;
      if (t.createSVGPoint) {
        var r = t.createSVGPoint();
        return (
          (r.x = n.clientX),
          (r.y = n.clientY),
          [(r = r.matrixTransform(e.getScreenCTM().inverse())).x, r.y]
        );
      }
      if (e.getBoundingClientRect) {
        var o = e.getBoundingClientRect();
        return [
          n.clientX - o.left - e.clientLeft,
          n.clientY - o.top - e.clientTop,
        ];
      }
    }
    return [n.pageX, n.pageY];
  }
  var Ie,
    He,
    Fe = 0,
    Oe = 0,
    je = 0,
    Ke = 0,
    ze = 0,
    Ve = 0,
    $e = "object" == typeof performance && performance.now ? performance : Date,
    We =
      "object" == typeof window && window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : function (n) {
            setTimeout(n, 17);
          };
  function Xe() {
    return ze || (We(qe), (ze = $e.now() + Ve));
  }
  function qe() {
    ze = 0;
  }
  function Ye() {
    this._call = this._time = this._next = null;
  }
  function Ze(n, e, t) {
    var r = new Ye();
    return r.restart(n, e, t), r;
  }
  function Je() {
    (ze = (Ke = $e.now()) + Ve), (Fe = Oe = 0);
    try {
      !(function () {
        Xe(), ++Fe;
        for (var n, e = Ie; e; )
          (n = ze - e._time) >= 0 && e._call.call(null, n), (e = e._next);
        --Fe;
      })();
    } finally {
      (Fe = 0),
        (function () {
          for (var n, e, t = Ie, r = 1 / 0; t; )
            t._call
              ? (r > t._time && (r = t._time), (n = t), (t = t._next))
              : ((e = t._next),
                (t._next = null),
                (t = n ? (n._next = e) : (Ie = e)));
          (He = n), nt(r);
        })(),
        (ze = 0);
    }
  }
  function Qe() {
    var n = $e.now(),
      e = n - Ke;
    e > 1e3 && ((Ve -= e), (Ke = n));
  }
  function nt(n) {
    Fe ||
      (Oe && (Oe = clearTimeout(Oe)),
      n - ze > 24
        ? (n < 1 / 0 && (Oe = setTimeout(Je, n - $e.now() - Ve)),
          je && (je = clearInterval(je)))
        : (je || ((Ke = $e.now()), (je = setInterval(Qe, 1e3))),
          (Fe = 1),
          We(Je)));
  }
  function et(n, e, t) {
    var r = new Ye();
    return (
      (e = null == e ? 0 : +e),
      r.restart(
        (t) => {
          r.stop(), n(t + e);
        },
        e,
        t
      ),
      r
    );
  }
  Ye.prototype = Ze.prototype = {
    constructor: Ye,
    restart: function (n, e, t) {
      if ("function" != typeof n)
        throw new TypeError("callback is not a function");
      (t = (null == t ? Xe() : +t) + (null == e ? 0 : +e)),
        this._next ||
          He === this ||
          (He ? (He._next = this) : (Ie = this), (He = this)),
        (this._call = n),
        (this._time = t),
        nt();
    },
    stop: function () {
      this._call && ((this._call = null), (this._time = 1 / 0), nt());
    },
  };
  var tt = x("start", "end", "cancel", "interrupt"),
    rt = [];
  function ot(n, e, t, r, o, a) {
    var i = n.__transition;
    if (i) {
      if (t in i) return;
    } else n.__transition = {};
    !(function (n, e, t) {
      var r,
        o = n.__transition;
      function a(u) {
        var s, c, p, f;
        if (1 !== t.state) return l();
        for (s in o)
          if ((f = o[s]).name === t.name) {
            if (3 === f.state) return et(a);
            4 === f.state
              ? ((f.state = 6),
                f.timer.stop(),
                f.on.call("interrupt", n, n.__data__, f.index, f.group),
                delete o[s])
              : +s < e &&
                ((f.state = 6),
                f.timer.stop(),
                f.on.call("cancel", n, n.__data__, f.index, f.group),
                delete o[s]);
          }
        if (
          (et(function () {
            3 === t.state &&
              ((t.state = 4), t.timer.restart(i, t.delay, t.time), i(u));
          }),
          (t.state = 2),
          t.on.call("start", n, n.__data__, t.index, t.group),
          2 === t.state)
        ) {
          for (
            t.state = 3, r = new Array((p = t.tween.length)), s = 0, c = -1;
            s < p;
            ++s
          )
            (f = t.tween[s].value.call(n, n.__data__, t.index, t.group)) &&
              (r[++c] = f);
          r.length = c + 1;
        }
      }
      function i(e) {
        for (
          var o =
              e < t.duration
                ? t.ease.call(null, e / t.duration)
                : (t.timer.restart(l), (t.state = 5), 1),
            a = -1,
            i = r.length;
          ++a < i;

        )
          r[a].call(n, o);
        5 === t.state &&
          (t.on.call("end", n, n.__data__, t.index, t.group), l());
      }
      function l() {
        for (var r in ((t.state = 6), t.timer.stop(), delete o[e], o)) return;
        delete n.__transition;
      }
      (o[e] = t),
        (t.timer = Ze(
          function (n) {
            (t.state = 1),
              t.timer.restart(a, t.delay, t.time),
              t.delay <= n && a(n - t.delay);
          },
          0,
          t.time
        ));
    })(n, t, {
      name: e,
      index: r,
      group: o,
      on: tt,
      tween: rt,
      time: a.time,
      delay: a.delay,
      duration: a.duration,
      ease: a.ease,
      timer: null,
      state: 0,
    });
  }
  function at(n, e) {
    var t = lt(n, e);
    if (t.state > 0) throw new Error("too late; already scheduled");
    return t;
  }
  function it(n, e) {
    var t = lt(n, e);
    if (t.state > 3) throw new Error("too late; already running");
    return t;
  }
  function lt(n, e) {
    var t = n.__transition;
    if (!t || !(t = t[e])) throw new Error("transition not found");
    return t;
  }
  function ut(n, e) {
    var t,
      r,
      o,
      a = n.__transition,
      i = !0;
    if (a) {
      for (o in ((e = null == e ? null : e + ""), a))
        (t = a[o]).name === e
          ? ((r = t.state > 2 && t.state < 5),
            (t.state = 6),
            t.timer.stop(),
            t.on.call(
              r ? "interrupt" : "cancel",
              n,
              n.__data__,
              t.index,
              t.group
            ),
            delete a[o])
          : (i = !1);
      i && delete n.__transition;
    }
  }
  var st,
    ct = 180 / Math.PI,
    pt = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1,
    };
  function ft(n, e, t, r, o, a) {
    var i, l, u;
    return (
      (i = Math.sqrt(n * n + e * e)) && ((n /= i), (e /= i)),
      (u = n * t + e * r) && ((t -= n * u), (r -= e * u)),
      (l = Math.sqrt(t * t + r * r)) && ((t /= l), (r /= l), (u /= l)),
      n * r < e * t && ((n = -n), (e = -e), (u = -u), (i = -i)),
      {
        translateX: o,
        translateY: a,
        rotate: Math.atan2(e, n) * ct,
        skewX: Math.atan(u) * ct,
        scaleX: i,
        scaleY: l,
      }
    );
  }
  function _t(n, e, t, r) {
    function o(n) {
      return n.length ? n.pop() + " " : "";
    }
    return function (a, i) {
      var l = [],
        u = [];
      return (
        (a = n(a)),
        (i = n(i)),
        (function (n, r, o, a, i, l) {
          if (n !== o || r !== a) {
            var u = i.push("translate(", null, e, null, t);
            l.push({ i: u - 4, x: Ce(n, o) }, { i: u - 2, x: Ce(r, a) });
          } else (o || a) && i.push("translate(" + o + e + a + t);
        })(a.translateX, a.translateY, i.translateX, i.translateY, l, u),
        (function (n, e, t, a) {
          n !== e
            ? (n - e > 180 ? (e += 360) : e - n > 180 && (n += 360),
              a.push({ i: t.push(o(t) + "rotate(", null, r) - 2, x: Ce(n, e) }))
            : e && t.push(o(t) + "rotate(" + e + r);
        })(a.rotate, i.rotate, l, u),
        (function (n, e, t, a) {
          n !== e
            ? a.push({ i: t.push(o(t) + "skewX(", null, r) - 2, x: Ce(n, e) })
            : e && t.push(o(t) + "skewX(" + e + r);
        })(a.skewX, i.skewX, l, u),
        (function (n, e, t, r, a, i) {
          if (n !== t || e !== r) {
            var l = a.push(o(a) + "scale(", null, ",", null, ")");
            i.push({ i: l - 4, x: Ce(n, t) }, { i: l - 2, x: Ce(e, r) });
          } else
            (1 === t && 1 === r) || a.push(o(a) + "scale(" + t + "," + r + ")");
        })(a.scaleX, a.scaleY, i.scaleX, i.scaleY, l, u),
        (a = i = null),
        function (n) {
          for (var e, t = -1, r = u.length; ++t < r; ) l[(e = u[t]).i] = e.x(n);
          return l.join("");
        }
      );
    };
  }
  var dt = _t(
      function (n) {
        const e = new ("function" == typeof DOMMatrix
          ? DOMMatrix
          : WebKitCSSMatrix)(n + "");
        return e.isIdentity ? pt : ft(e.a, e.b, e.c, e.d, e.e, e.f);
      },
      "px, ",
      "px)",
      "deg)"
    ),
    ht = _t(
      function (n) {
        return null == n
          ? pt
          : (st ||
              (st = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
              )),
            st.setAttribute("transform", n),
            (n = st.transform.baseVal.consolidate())
              ? ft((n = n.matrix).a, n.b, n.c, n.d, n.e, n.f)
              : pt);
      },
      ", ",
      ")",
      ")"
    );
  function mt(n, e) {
    var t, r;
    return function () {
      var o = it(this, n),
        a = o.tween;
      if (a !== t)
        for (var i = 0, l = (r = t = a).length; i < l; ++i)
          if (r[i].name === e) {
            (r = r.slice()).splice(i, 1);
            break;
          }
      o.tween = r;
    };
  }
  function gt(n, e, t) {
    var r, o;
    if ("function" != typeof t) throw new Error();
    return function () {
      var a = it(this, n),
        i = a.tween;
      if (i !== r) {
        o = (r = i).slice();
        for (var l = { name: e, value: t }, u = 0, s = o.length; u < s; ++u)
          if (o[u].name === e) {
            o[u] = l;
            break;
          }
        u === s && o.push(l);
      }
      a.tween = o;
    };
  }
  function yt(n, e, t) {
    var r = n._id;
    return (
      n.each(function () {
        var n = it(this, r);
        (n.value || (n.value = {}))[e] = t.apply(this, arguments);
      }),
      function (n) {
        return lt(n, r).value[e];
      }
    );
  }
  function vt(n, e) {
    var t;
    return ("number" == typeof e
      ? Ce
      : e instanceof ue
      ? Se
      : (t = ue(e))
      ? ((e = t), Se)
      : Pe)(n, e);
  }
  function bt(n) {
    return function () {
      this.removeAttribute(n);
    };
  }
  function wt(n) {
    return function () {
      this.removeAttributeNS(n.space, n.local);
    };
  }
  function kt(n, e, t) {
    var r,
      o,
      a = t + "";
    return function () {
      var i = this.getAttribute(n);
      return i === a ? null : i === r ? o : (o = e((r = i), t));
    };
  }
  function Et(n, e, t) {
    var r,
      o,
      a = t + "";
    return function () {
      var i = this.getAttributeNS(n.space, n.local);
      return i === a ? null : i === r ? o : (o = e((r = i), t));
    };
  }
  function xt(n, e, t) {
    var r, o, a;
    return function () {
      var i,
        l,
        u = t(this);
      if (null != u)
        return (i = this.getAttribute(n)) === (l = u + "")
          ? null
          : i === r && l === o
          ? a
          : ((o = l), (a = e((r = i), u)));
      this.removeAttribute(n);
    };
  }
  function St(n, e, t) {
    var r, o, a;
    return function () {
      var i,
        l,
        u = t(this);
      if (null != u)
        return (i = this.getAttributeNS(n.space, n.local)) === (l = u + "")
          ? null
          : i === r && l === o
          ? a
          : ((o = l), (a = e((r = i), u)));
      this.removeAttributeNS(n.space, n.local);
    };
  }
  function At(n, e) {
    return function (t) {
      this.setAttribute(n, e.call(this, t));
    };
  }
  function Mt(n, e) {
    return function (t) {
      this.setAttributeNS(n.space, n.local, e.call(this, t));
    };
  }
  function Rt(n, e) {
    var t, r;
    function o() {
      var o = e.apply(this, arguments);
      return o !== r && (t = (r = o) && Mt(n, o)), t;
    }
    return (o._value = e), o;
  }
  function Nt(n, e) {
    var t, r;
    function o() {
      var o = e.apply(this, arguments);
      return o !== r && (t = (r = o) && At(n, o)), t;
    }
    return (o._value = e), o;
  }
  function Ct(n, e) {
    return function () {
      at(this, n).delay = +e.apply(this, arguments);
    };
  }
  function Lt(n, e) {
    return (
      (e = +e),
      function () {
        at(this, n).delay = e;
      }
    );
  }
  function Bt(n, e) {
    return function () {
      it(this, n).duration = +e.apply(this, arguments);
    };
  }
  function Dt(n, e) {
    return (
      (e = +e),
      function () {
        it(this, n).duration = e;
      }
    );
  }
  function Pt(n, e) {
    if ("function" != typeof e) throw new Error();
    return function () {
      it(this, n).ease = e;
    };
  }
  function Ut(n, e, t) {
    var r,
      o,
      a = (function (n) {
        return (n + "")
          .trim()
          .split(/^|\s+/)
          .every(function (n) {
            var e = n.indexOf(".");
            return e >= 0 && (n = n.slice(0, e)), !n || "start" === n;
          });
      })(e)
        ? at
        : it;
    return function () {
      var i = a(this, n),
        l = i.on;
      l !== r && (o = (r = l).copy()).on(e, t), (i.on = o);
    };
  }
  var Gt = Hn.prototype.constructor;
  function Tt(n) {
    return function () {
      this.style.removeProperty(n);
    };
  }
  function It(n, e, t) {
    return function (r) {
      this.style.setProperty(n, e.call(this, r), t);
    };
  }
  function Ht(n, e, t) {
    var r, o;
    function a() {
      var a = e.apply(this, arguments);
      return a !== o && (r = (o = a) && It(n, a, t)), r;
    }
    return (a._value = e), a;
  }
  function Ft(n) {
    return function (e) {
      this.textContent = n.call(this, e);
    };
  }
  function Ot(n) {
    var e, t;
    function r() {
      var r = n.apply(this, arguments);
      return r !== t && (e = (t = r) && Ft(r)), e;
    }
    return (r._value = n), r;
  }
  var jt = 0;
  function Kt(n, e, t, r) {
    (this._groups = n), (this._parents = e), (this._name = t), (this._id = r);
  }
  function zt() {
    return ++jt;
  }
  var Vt = Hn.prototype;
  Kt.prototype = function (n) {
    return Hn().transition(n);
  }.prototype = {
    constructor: Kt,
    select: function (n) {
      var e = this._name,
        t = this._id;
      "function" != typeof n && (n = A(n));
      for (
        var r = this._groups, o = r.length, a = new Array(o), i = 0;
        i < o;
        ++i
      )
        for (
          var l, u, s = r[i], c = s.length, p = (a[i] = new Array(c)), f = 0;
          f < c;
          ++f
        )
          (l = s[f]) &&
            (u = n.call(l, l.__data__, f, s)) &&
            ("__data__" in l && (u.__data__ = l.__data__),
            (p[f] = u),
            ot(p[f], e, t, f, p, lt(l, t)));
      return new Kt(a, this._parents, e, t);
    },
    selectAll: function (n) {
      var e = this._name,
        t = this._id;
      "function" != typeof n && (n = N(n));
      for (
        var r = this._groups, o = r.length, a = [], i = [], l = 0;
        l < o;
        ++l
      )
        for (var u, s = r[l], c = s.length, p = 0; p < c; ++p)
          if ((u = s[p])) {
            for (
              var f,
                _ = n.call(u, u.__data__, p, s),
                d = lt(u, t),
                h = 0,
                m = _.length;
              h < m;
              ++h
            )
              (f = _[h]) && ot(f, e, t, h, _, d);
            a.push(_), i.push(u);
          }
      return new Kt(a, i, e, t);
    },
    filter: function (n) {
      "function" != typeof n && (n = C(n));
      for (
        var e = this._groups, t = e.length, r = new Array(t), o = 0;
        o < t;
        ++o
      )
        for (var a, i = e[o], l = i.length, u = (r[o] = []), s = 0; s < l; ++s)
          (a = i[s]) && n.call(a, a.__data__, s, i) && u.push(a);
      return new Kt(r, this._parents, this._name, this._id);
    },
    merge: function (n) {
      if (n._id !== this._id) throw new Error();
      for (
        var e = this._groups,
          t = n._groups,
          r = e.length,
          o = t.length,
          a = Math.min(r, o),
          i = new Array(r),
          l = 0;
        l < a;
        ++l
      )
        for (
          var u,
            s = e[l],
            c = t[l],
            p = s.length,
            f = (i[l] = new Array(p)),
            _ = 0;
          _ < p;
          ++_
        )
          (u = s[_] || c[_]) && (f[_] = u);
      for (; l < r; ++l) i[l] = e[l];
      return new Kt(i, this._parents, this._name, this._id);
    },
    selection: function () {
      return new Gt(this._groups, this._parents);
    },
    transition: function () {
      for (
        var n = this._name,
          e = this._id,
          t = zt(),
          r = this._groups,
          o = r.length,
          a = 0;
        a < o;
        ++a
      )
        for (var i, l = r[a], u = l.length, s = 0; s < u; ++s)
          if ((i = l[s])) {
            var c = lt(i, e);
            ot(i, n, t, s, l, {
              time: c.time + c.delay + c.duration,
              delay: 0,
              duration: c.duration,
              ease: c.ease,
            });
          }
      return new Kt(r, this._parents, n, t);
    },
    call: Vt.call,
    nodes: Vt.nodes,
    node: Vt.node,
    size: Vt.size,
    empty: Vt.empty,
    each: Vt.each,
    on: function (n, e) {
      var t = this._id;
      return arguments.length < 2
        ? lt(this.node(), t).on.on(n)
        : this.each(Ut(t, n, e));
    },
    attr: function (n, e) {
      var t = V(n),
        r = "transform" === t ? ht : vt;
      return this.attrTween(
        n,
        "function" == typeof e
          ? (t.local ? St : xt)(t, r, yt(this, "attr." + n, e))
          : null == e
          ? (t.local ? wt : bt)(t)
          : (t.local ? Et : kt)(t, r, e)
      );
    },
    attrTween: function (n, e) {
      var t = "attr." + n;
      if (arguments.length < 2) return (t = this.tween(t)) && t._value;
      if (null == e) return this.tween(t, null);
      if ("function" != typeof e) throw new Error();
      var r = V(n);
      return this.tween(t, (r.local ? Rt : Nt)(r, e));
    },
    style: function (n, e, t) {
      var r = "transform" == (n += "") ? dt : vt;
      return null == e
        ? this.styleTween(
            n,
            (function (n, e) {
              var t, r, o;
              return function () {
                var a = tn(this, n),
                  i = (this.style.removeProperty(n), tn(this, n));
                return a === i
                  ? null
                  : a === t && i === r
                  ? o
                  : (o = e((t = a), (r = i)));
              };
            })(n, r)
          ).on("end.style." + n, Tt(n))
        : "function" == typeof e
        ? this.styleTween(
            n,
            (function (n, e, t) {
              var r, o, a;
              return function () {
                var i = tn(this, n),
                  l = t(this),
                  u = l + "";
                return (
                  null == l &&
                    (this.style.removeProperty(n), (u = l = tn(this, n))),
                  i === u
                    ? null
                    : i === r && u === o
                    ? a
                    : ((o = u), (a = e((r = i), l)))
                );
              };
            })(n, r, yt(this, "style." + n, e))
          ).each(
            (function (n, e) {
              var t,
                r,
                o,
                a,
                i = "style." + e,
                l = "end." + i;
              return function () {
                var u = it(this, n),
                  s = u.on,
                  c = null == u.value[i] ? a || (a = Tt(e)) : void 0;
                (s === t && o === c) || (r = (t = s).copy()).on(l, (o = c)),
                  (u.on = r);
              };
            })(this._id, n)
          )
        : this.styleTween(
            n,
            (function (n, e, t) {
              var r,
                o,
                a = t + "";
              return function () {
                var i = tn(this, n);
                return i === a ? null : i === r ? o : (o = e((r = i), t));
              };
            })(n, r, e),
            t
          ).on("end.style." + n, null);
    },
    styleTween: function (n, e, t) {
      var r = "style." + (n += "");
      if (arguments.length < 2) return (r = this.tween(r)) && r._value;
      if (null == e) return this.tween(r, null);
      if ("function" != typeof e) throw new Error();
      return this.tween(r, Ht(n, e, null == t ? "" : t));
    },
    text: function (n) {
      return this.tween(
        "text",
        "function" == typeof n
          ? (function (n) {
              return function () {
                var e = n(this);
                this.textContent = null == e ? "" : e;
              };
            })(yt(this, "text", n))
          : (function (n) {
              return function () {
                this.textContent = n;
              };
            })(null == n ? "" : n + "")
      );
    },
    textTween: function (n) {
      var e = "text";
      if (arguments.length < 1) return (e = this.tween(e)) && e._value;
      if (null == n) return this.tween(e, null);
      if ("function" != typeof n) throw new Error();
      return this.tween(e, Ot(n));
    },
    remove: function () {
      return this.on(
        "end.remove",
        (function (n) {
          return function () {
            var e = this.parentNode;
            for (var t in this.__transition) if (+t !== n) return;
            e && e.removeChild(this);
          };
        })(this._id)
      );
    },
    tween: function (n, e) {
      var t = this._id;
      if (((n += ""), arguments.length < 2)) {
        for (
          var r, o = lt(this.node(), t).tween, a = 0, i = o.length;
          a < i;
          ++a
        )
          if ((r = o[a]).name === n) return r.value;
        return null;
      }
      return this.each((null == e ? mt : gt)(t, n, e));
    },
    delay: function (n) {
      var e = this._id;
      return arguments.length
        ? this.each(("function" == typeof n ? Ct : Lt)(e, n))
        : lt(this.node(), e).delay;
    },
    duration: function (n) {
      var e = this._id;
      return arguments.length
        ? this.each(("function" == typeof n ? Bt : Dt)(e, n))
        : lt(this.node(), e).duration;
    },
    ease: function (n) {
      var e = this._id;
      return arguments.length ? this.each(Pt(e, n)) : lt(this.node(), e).ease;
    },
    easeVarying: function (n) {
      if ("function" != typeof n) throw new Error();
      return this.each(
        (function (n, e) {
          return function () {
            var t = e.apply(this, arguments);
            if ("function" != typeof t) throw new Error();
            it(this, n).ease = t;
          };
        })(this._id, n)
      );
    },
    end: function () {
      var n,
        e,
        t = this,
        r = t._id,
        o = t.size();
      return new Promise(function (a, i) {
        var l = { value: i },
          u = {
            value: function () {
              0 == --o && a();
            },
          };
        t.each(function () {
          var t = it(this, r),
            o = t.on;
          o !== n &&
            ((e = (n = o).copy())._.cancel.push(l),
            e._.interrupt.push(l),
            e._.end.push(u)),
            (t.on = e);
        }),
          0 === o && a();
      });
    },
    [Symbol.iterator]: Vt[Symbol.iterator],
  };
  var $t = {
    time: null,
    delay: 0,
    duration: 250,
    ease: function (n) {
      return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
    },
  };
  function Wt(n, e) {
    for (var t; !(t = n.__transition) || !(t = t[e]); )
      if (!(n = n.parentNode)) throw new Error(`transition ${e} not found`);
    return t;
  }
  (Hn.prototype.interrupt = function (n) {
    return this.each(function () {
      ut(this, n);
    });
  }),
    (Hn.prototype.transition = function (n) {
      var e, t;
      n instanceof Kt
        ? ((e = n._id), (n = n._name))
        : ((e = zt()), ((t = $t).time = Xe()), (n = null == n ? null : n + ""));
      for (var r = this._groups, o = r.length, a = 0; a < o; ++a)
        for (var i, l = r[a], u = l.length, s = 0; s < u; ++s)
          (i = l[s]) && ot(i, n, e, s, l, t || Wt(i, e));
      return new Kt(r, this._parents, n, e);
    });
  const Xt = (n) => () => n;
  function qt(
    n,
    { sourceEvent: e, target: t, selection: r, mode: o, dispatch: a }
  ) {
    Object.defineProperties(this, {
      type: { value: n, enumerable: !0, configurable: !0 },
      sourceEvent: { value: e, enumerable: !0, configurable: !0 },
      target: { value: t, enumerable: !0, configurable: !0 },
      selection: { value: r, enumerable: !0, configurable: !0 },
      mode: { value: o, enumerable: !0, configurable: !0 },
      _: { value: a },
    });
  }
  function Yt(n) {
    n.stopImmediatePropagation();
  }
  function Zt(n) {
    n.preventDefault(), n.stopImmediatePropagation();
  }
  var Jt = { name: "drag" },
    Qt = { name: "space" },
    nr = { name: "handle" },
    er = { name: "center" };
  const { abs: tr, max: rr, min: or } = Math;
  function ar(n) {
    return [+n[0], +n[1]];
  }
  function ir(n) {
    return [ar(n[0]), ar(n[1])];
  }
  var lr = {
      name: "x",
      handles: ["w", "e"].map(dr),
      input: function (n, e) {
        return null == n
          ? null
          : [
              [+n[0], e[0][1]],
              [+n[1], e[1][1]],
            ];
      },
      output: function (n) {
        return n && [n[0][0], n[1][0]];
      },
    },
    ur = {
      name: "y",
      handles: ["n", "s"].map(dr),
      input: function (n, e) {
        return null == n
          ? null
          : [
              [e[0][0], +n[0]],
              [e[1][0], +n[1]],
            ];
      },
      output: function (n) {
        return n && [n[0][1], n[1][1]];
      },
    },
    sr =
      (["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(dr),
      {
        overlay: "crosshair",
        selection: "move",
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize",
      }),
    cr = { e: "w", w: "e", nw: "ne", ne: "nw", se: "sw", sw: "se" },
    pr = { n: "s", s: "n", nw: "sw", ne: "se", se: "ne", sw: "nw" },
    fr = {
      overlay: 1,
      selection: 1,
      n: null,
      e: 1,
      s: null,
      w: -1,
      nw: -1,
      ne: 1,
      se: 1,
      sw: -1,
    },
    _r = {
      overlay: 1,
      selection: 1,
      n: -1,
      e: null,
      s: 1,
      w: null,
      nw: -1,
      ne: -1,
      se: 1,
      sw: 1,
    };
  function dr(n) {
    return { type: n };
  }
  function hr(n) {
    return !n.ctrlKey && !n.button;
  }
  function mr() {
    var n = this.ownerSVGElement || this;
    return n.hasAttribute("viewBox")
      ? [
          [(n = n.viewBox.baseVal).x, n.y],
          [n.x + n.width, n.y + n.height],
        ]
      : [
          [0, 0],
          [n.width.baseVal.value, n.height.baseVal.value],
        ];
  }
  function gr() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function yr(n) {
    for (; !n.__brush; ) if (!(n = n.parentNode)) return;
    return n.__brush;
  }
  function vr(n) {
    return n[0][0] === n[1][0] || n[0][1] === n[1][1];
  }
  var br = {},
    wr = {};
  function kr(n) {
    return new Function(
      "d",
      "return {" +
        n
          .map(function (n, e) {
            return JSON.stringify(n) + ": d[" + e + '] || ""';
          })
          .join(",") +
        "}"
    );
  }
  function Er(n) {
    var e = Object.create(null),
      t = [];
    return (
      n.forEach(function (n) {
        for (var r in n) r in e || t.push((e[r] = r));
      }),
      t
    );
  }
  function xr(n, e) {
    var t = n + "",
      r = t.length;
    return r < e ? new Array(e - r + 1).join(0) + t : t;
  }
  function Sr(n) {
    var e = new RegExp('["' + n + "\n\r]"),
      t = n.charCodeAt(0);
    function r(n, e) {
      var r,
        o = [],
        a = n.length,
        i = 0,
        l = 0,
        u = a <= 0,
        s = !1;
      function c() {
        if (u) return wr;
        if (s) return (s = !1), br;
        var e,
          r,
          o = i;
        if (34 === n.charCodeAt(o)) {
          for (
            ;
            (i++ < a && 34 !== n.charCodeAt(i)) || 34 === n.charCodeAt(++i);

          );
          return (
            (e = i) >= a
              ? (u = !0)
              : 10 === (r = n.charCodeAt(i++))
              ? (s = !0)
              : 13 === r && ((s = !0), 10 === n.charCodeAt(i) && ++i),
            n.slice(o + 1, e - 1).replace(/""/g, '"')
          );
        }
        for (; i < a; ) {
          if (10 === (r = n.charCodeAt((e = i++)))) s = !0;
          else if (13 === r) (s = !0), 10 === n.charCodeAt(i) && ++i;
          else if (r !== t) continue;
          return n.slice(o, e);
        }
        return (u = !0), n.slice(o, a);
      }
      for (
        10 === n.charCodeAt(a - 1) && --a, 13 === n.charCodeAt(a - 1) && --a;
        (r = c()) !== wr;

      ) {
        for (var p = []; r !== br && r !== wr; ) p.push(r), (r = c());
        (e && null == (p = e(p, l++))) || o.push(p);
      }
      return o;
    }
    function o(e, t) {
      return e.map(function (e) {
        return t
          .map(function (n) {
            return i(e[n]);
          })
          .join(n);
      });
    }
    function a(e) {
      return e.map(i).join(n);
    }
    function i(n) {
      return null == n
        ? ""
        : n instanceof Date
        ? (function (n) {
            var e,
              t = n.getUTCHours(),
              r = n.getUTCMinutes(),
              o = n.getUTCSeconds(),
              a = n.getUTCMilliseconds();
            return isNaN(n)
              ? "Invalid Date"
              : ((e = n.getUTCFullYear()) < 0
                  ? "-" + xr(-e, 6)
                  : e > 9999
                  ? "+" + xr(e, 6)
                  : xr(e, 4)) +
                  "-" +
                  xr(n.getUTCMonth() + 1, 2) +
                  "-" +
                  xr(n.getUTCDate(), 2) +
                  (a
                    ? "T" +
                      xr(t, 2) +
                      ":" +
                      xr(r, 2) +
                      ":" +
                      xr(o, 2) +
                      "." +
                      xr(a, 3) +
                      "Z"
                    : o
                    ? "T" + xr(t, 2) + ":" + xr(r, 2) + ":" + xr(o, 2) + "Z"
                    : r || t
                    ? "T" + xr(t, 2) + ":" + xr(r, 2) + "Z"
                    : "");
          })(n)
        : e.test((n += ""))
        ? '"' + n.replace(/"/g, '""') + '"'
        : n;
    }
    return {
      parse: function (n, e) {
        var t,
          o,
          a = r(n, function (n, r) {
            if (t) return t(n, r - 1);
            (o = n),
              (t = e
                ? (function (n, e) {
                    var t = kr(n);
                    return function (r, o) {
                      return e(t(r), o, n);
                    };
                  })(n, e)
                : kr(n));
          });
        return (a.columns = o || []), a;
      },
      parseRows: r,
      format: function (e, t) {
        return (
          null == t && (t = Er(e)),
          [t.map(i).join(n)].concat(o(e, t)).join("\n")
        );
      },
      formatBody: function (n, e) {
        return null == e && (e = Er(n)), o(n, e).join("\n");
      },
      formatRows: function (n) {
        return n.map(a).join("\n");
      },
      formatRow: a,
      formatValue: i,
    };
  }
  var Ar = Sr(","),
    Mr = Ar.parse,
    Rr =
      (Ar.parseRows,
      Ar.format,
      Ar.formatBody,
      Ar.formatRows,
      Ar.formatRow,
      Ar.formatValue,
      Sr("\t")),
    Nr = Rr.parse;
  function Cr(n) {
    if (!n.ok) throw new Error(n.status + " " + n.statusText);
    return n.text();
  }
  function Lr(n, e) {
    return fetch(n, e).then(Cr);
  }
  function Br(n) {
    return function (e, t, r) {
      return (
        2 === arguments.length &&
          "function" == typeof t &&
          ((r = t), (t = void 0)),
        Lr(e, t).then(function (e) {
          return n(e, r);
        })
      );
    };
  }
  Rr.parseRows,
    Rr.format,
    Rr.formatBody,
    Rr.formatRows,
    Rr.formatRow,
    Rr.formatValue;
  var Dr = Br(Mr);
  Br(Nr);
  const Pr = (n) => n;
  function Ur(n, e) {
    n && Tr.hasOwnProperty(n.type) && Tr[n.type](n, e);
  }
  var Gr = {
      Feature: function (n, e) {
        Ur(n.geometry, e);
      },
      FeatureCollection: function (n, e) {
        for (var t = n.features, r = -1, o = t.length; ++r < o; )
          Ur(t[r].geometry, e);
      },
    },
    Tr = {
      Sphere: function (n, e) {
        e.sphere();
      },
      Point: function (n, e) {
        (n = n.coordinates), e.point(n[0], n[1], n[2]);
      },
      MultiPoint: function (n, e) {
        for (var t = n.coordinates, r = -1, o = t.length; ++r < o; )
          (n = t[r]), e.point(n[0], n[1], n[2]);
      },
      LineString: function (n, e) {
        Ir(n.coordinates, e, 0);
      },
      MultiLineString: function (n, e) {
        for (var t = n.coordinates, r = -1, o = t.length; ++r < o; )
          Ir(t[r], e, 0);
      },
      Polygon: function (n, e) {
        Hr(n.coordinates, e);
      },
      MultiPolygon: function (n, e) {
        for (var t = n.coordinates, r = -1, o = t.length; ++r < o; )
          Hr(t[r], e);
      },
      GeometryCollection: function (n, e) {
        for (var t = n.geometries, r = -1, o = t.length; ++r < o; ) Ur(t[r], e);
      },
    };
  function Ir(n, e, t) {
    var r,
      o = -1,
      a = n.length - t;
    for (e.lineStart(); ++o < a; ) (r = n[o]), e.point(r[0], r[1], r[2]);
    e.lineEnd();
  }
  function Hr(n, e) {
    var t = -1,
      r = n.length;
    for (e.polygonStart(); ++t < r; ) Ir(n[t], e, 1);
    e.polygonEnd();
  }
  function Fr(n, e) {
    n && Gr.hasOwnProperty(n.type) ? Gr[n.type](n, e) : Ur(n, e);
  }
  class Or {
    constructor() {
      (this._partials = new Float64Array(32)), (this._n = 0);
    }
    add(n) {
      const e = this._partials;
      let t = 0;
      for (let r = 0; r < this._n && r < 32; r++) {
        const o = e[r],
          a = n + o,
          i = Math.abs(n) < Math.abs(o) ? n - (a - o) : o - (a - n);
        i && (e[t++] = i), (n = a);
      }
      return (e[t] = n), (this._n = t + 1), this;
    }
    valueOf() {
      const n = this._partials;
      let e,
        t,
        r,
        o = this._n,
        a = 0;
      if (o > 0) {
        for (
          a = n[--o];
          o > 0 && ((e = a), (t = n[--o]), (a = e + t), (r = t - (a - e)), !r);

        );
        o > 0 &&
          ((r < 0 && n[o - 1] < 0) || (r > 0 && n[o - 1] > 0)) &&
          ((t = 2 * r), (e = a + t), t == e - a && (a = e));
      }
      return a;
    }
  }
  var jr = 1e-6,
    Kr = Math.PI,
    zr = Kr / 2,
    Vr = Kr / 4,
    $r = 2 * Kr,
    Wr = 180 / Kr,
    Xr = Kr / 180,
    qr = Math.abs,
    Yr = Math.atan,
    Zr = Math.atan2,
    Jr = Math.cos,
    Qr = (Math.ceil, Math.exp),
    no = (Math.floor, Math.hypot, Math.log),
    eo = (Math.pow, Math.sin),
    to =
      Math.sign ||
      function (n) {
        return n > 0 ? 1 : n < 0 ? -1 : 0;
      },
    ro = Math.sqrt,
    oo = Math.tan;
  function ao(n) {
    return n > 1 ? zr : n < -1 ? -zr : Math.asin(n);
  }
  function io() {}
  var lo,
    uo,
    so,
    co,
    po = new Or(),
    fo = new Or(),
    _o = {
      point: io,
      lineStart: io,
      lineEnd: io,
      polygonStart: function () {
        (_o.lineStart = ho), (_o.lineEnd = yo);
      },
      polygonEnd: function () {
        (_o.lineStart = _o.lineEnd = _o.point = io),
          po.add(qr(fo)),
          (fo = new Or());
      },
      result: function () {
        var n = po / 2;
        return (po = new Or()), n;
      },
    };
  function ho() {
    _o.point = mo;
  }
  function mo(n, e) {
    (_o.point = go), (lo = so = n), (uo = co = e);
  }
  function go(n, e) {
    fo.add(co * n - so * e), (so = n), (co = e);
  }
  function yo() {
    go(lo, uo);
  }
  const vo = _o;
  var bo = 1 / 0,
    wo = bo,
    ko = -bo,
    Eo = ko;
  const xo = {
    point: function (n, e) {
      n < bo && (bo = n),
        n > ko && (ko = n),
        e < wo && (wo = e),
        e > Eo && (Eo = e);
    },
    lineStart: io,
    lineEnd: io,
    polygonStart: io,
    polygonEnd: io,
    result: function () {
      var n = [
        [bo, wo],
        [ko, Eo],
      ];
      return (ko = Eo = -(wo = bo = 1 / 0)), n;
    },
  };
  var So,
    Ao,
    Mo,
    Ro,
    No = 0,
    Co = 0,
    Lo = 0,
    Bo = 0,
    Do = 0,
    Po = 0,
    Uo = 0,
    Go = 0,
    To = 0,
    Io = {
      point: Ho,
      lineStart: Fo,
      lineEnd: Ko,
      polygonStart: function () {
        (Io.lineStart = zo), (Io.lineEnd = Vo);
      },
      polygonEnd: function () {
        (Io.point = Ho), (Io.lineStart = Fo), (Io.lineEnd = Ko);
      },
      result: function () {
        var n = To
          ? [Uo / To, Go / To]
          : Po
          ? [Bo / Po, Do / Po]
          : Lo
          ? [No / Lo, Co / Lo]
          : [NaN, NaN];
        return (No = Co = Lo = Bo = Do = Po = Uo = Go = To = 0), n;
      },
    };
  function Ho(n, e) {
    (No += n), (Co += e), ++Lo;
  }
  function Fo() {
    Io.point = Oo;
  }
  function Oo(n, e) {
    (Io.point = jo), Ho((Mo = n), (Ro = e));
  }
  function jo(n, e) {
    var t = n - Mo,
      r = e - Ro,
      o = ro(t * t + r * r);
    (Bo += (o * (Mo + n)) / 2),
      (Do += (o * (Ro + e)) / 2),
      (Po += o),
      Ho((Mo = n), (Ro = e));
  }
  function Ko() {
    Io.point = Ho;
  }
  function zo() {
    Io.point = $o;
  }
  function Vo() {
    Wo(So, Ao);
  }
  function $o(n, e) {
    (Io.point = Wo), Ho((So = Mo = n), (Ao = Ro = e));
  }
  function Wo(n, e) {
    var t = n - Mo,
      r = e - Ro,
      o = ro(t * t + r * r);
    (Bo += (o * (Mo + n)) / 2),
      (Do += (o * (Ro + e)) / 2),
      (Po += o),
      (Uo += (o = Ro * n - Mo * e) * (Mo + n)),
      (Go += o * (Ro + e)),
      (To += 3 * o),
      Ho((Mo = n), (Ro = e));
  }
  const Xo = Io;
  function qo(n) {
    this._context = n;
  }
  qo.prototype = {
    _radius: 4.5,
    pointRadius: function (n) {
      return (this._radius = n), this;
    },
    polygonStart: function () {
      this._line = 0;
    },
    polygonEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      0 === this._line && this._context.closePath(), (this._point = NaN);
    },
    point: function (n, e) {
      switch (this._point) {
        case 0:
          this._context.moveTo(n, e), (this._point = 1);
          break;
        case 1:
          this._context.lineTo(n, e);
          break;
        default:
          this._context.moveTo(n + this._radius, e),
            this._context.arc(n, e, this._radius, 0, $r);
      }
    },
    result: io,
  };
  var Yo,
    Zo,
    Jo,
    Qo,
    na,
    ea = new Or(),
    ta = {
      point: io,
      lineStart: function () {
        ta.point = ra;
      },
      lineEnd: function () {
        Yo && oa(Zo, Jo), (ta.point = io);
      },
      polygonStart: function () {
        Yo = !0;
      },
      polygonEnd: function () {
        Yo = null;
      },
      result: function () {
        var n = +ea;
        return (ea = new Or()), n;
      },
    };
  function ra(n, e) {
    (ta.point = oa), (Zo = Qo = n), (Jo = na = e);
  }
  function oa(n, e) {
    (Qo -= n), (na -= e), ea.add(ro(Qo * Qo + na * na)), (Qo = n), (na = e);
  }
  const aa = ta;
  function ia() {
    this._string = [];
  }
  function la(n) {
    return (
      "m0," +
      n +
      "a" +
      n +
      "," +
      n +
      " 0 1,1 0," +
      -2 * n +
      "a" +
      n +
      "," +
      n +
      " 0 1,1 0," +
      2 * n +
      "z"
    );
  }
  function ua(n, e) {
    function t(t, r) {
      return (t = n(t, r)), e(t[0], t[1]);
    }
    return (
      n.invert &&
        e.invert &&
        (t.invert = function (t, r) {
          return (t = e.invert(t, r)) && n.invert(t[0], t[1]);
        }),
      t
    );
  }
  function sa(n, e) {
    return [qr(n) > Kr ? n + Math.round(-n / $r) * $r : n, e];
  }
  function ca(n, e, t) {
    return (n %= $r)
      ? e || t
        ? ua(fa(n), _a(e, t))
        : fa(n)
      : e || t
      ? _a(e, t)
      : sa;
  }
  function pa(n) {
    return function (e, t) {
      return [(e += n) > Kr ? e - $r : e < -Kr ? e + $r : e, t];
    };
  }
  function fa(n) {
    var e = pa(n);
    return (e.invert = pa(-n)), e;
  }
  function _a(n, e) {
    var t = Jr(n),
      r = eo(n),
      o = Jr(e),
      a = eo(e);
    function i(n, e) {
      var i = Jr(e),
        l = Jr(n) * i,
        u = eo(n) * i,
        s = eo(e),
        c = s * t + l * r;
      return [Zr(u * o - c * a, l * t - s * r), ao(c * o + u * a)];
    }
    return (
      (i.invert = function (n, e) {
        var i = Jr(e),
          l = Jr(n) * i,
          u = eo(n) * i,
          s = eo(e),
          c = s * o - u * a;
        return [Zr(u * o + s * a, l * t + c * r), ao(c * t - l * r)];
      }),
      i
    );
  }
  function da() {
    var n,
      e = [];
    return {
      point: function (e, t, r) {
        n.push([e, t, r]);
      },
      lineStart: function () {
        e.push((n = []));
      },
      lineEnd: io,
      rejoin: function () {
        e.length > 1 && e.push(e.pop().concat(e.shift()));
      },
      result: function () {
        var t = e;
        return (e = []), (n = null), t;
      },
    };
  }
  function ha(n, e) {
    return qr(n[0] - e[0]) < jr && qr(n[1] - e[1]) < jr;
  }
  function ma(n, e, t, r) {
    (this.x = n),
      (this.z = e),
      (this.o = t),
      (this.e = r),
      (this.v = !1),
      (this.n = this.p = null);
  }
  function ga(n, e, t, r, o) {
    var a,
      i,
      l = [],
      u = [];
    if (
      (n.forEach(function (n) {
        if (!((e = n.length - 1) <= 0)) {
          var e,
            t,
            r = n[0],
            i = n[e];
          if (ha(r, i)) {
            if (!r[2] && !i[2]) {
              for (o.lineStart(), a = 0; a < e; ++a)
                o.point((r = n[a])[0], r[1]);
              return void o.lineEnd();
            }
            i[0] += 2e-6;
          }
          l.push((t = new ma(r, n, null, !0))),
            u.push((t.o = new ma(r, null, t, !1))),
            l.push((t = new ma(i, n, null, !1))),
            u.push((t.o = new ma(i, null, t, !0)));
        }
      }),
      l.length)
    ) {
      for (u.sort(e), ya(l), ya(u), a = 0, i = u.length; a < i; ++a)
        u[a].e = t = !t;
      for (var s, c, p = l[0]; ; ) {
        for (var f = p, _ = !0; f.v; ) if ((f = f.n) === p) return;
        (s = f.z), o.lineStart();
        do {
          if (((f.v = f.o.v = !0), f.e)) {
            if (_)
              for (a = 0, i = s.length; a < i; ++a)
                o.point((c = s[a])[0], c[1]);
            else r(f.x, f.n.x, 1, o);
            f = f.n;
          } else {
            if (_)
              for (s = f.p.z, a = s.length - 1; a >= 0; --a)
                o.point((c = s[a])[0], c[1]);
            else r(f.x, f.p.x, -1, o);
            f = f.p;
          }
          (s = (f = f.o).z), (_ = !_);
        } while (!f.v);
        o.lineEnd();
      }
    }
  }
  function ya(n) {
    if ((e = n.length)) {
      for (var e, t, r = 0, o = n[0]; ++r < e; )
        (o.n = t = n[r]), (t.p = o), (o = t);
      (o.n = t = n[0]), (t.p = o);
    }
  }
  function va(n) {
    return [Zr(n[1], n[0]), ao(n[2])];
  }
  function ba(n) {
    var e = n[0],
      t = n[1],
      r = Jr(t);
    return [r * Jr(e), r * eo(e), eo(t)];
  }
  function wa(n, e) {
    return n[0] * e[0] + n[1] * e[1] + n[2] * e[2];
  }
  function ka(n, e) {
    return [
      n[1] * e[2] - n[2] * e[1],
      n[2] * e[0] - n[0] * e[2],
      n[0] * e[1] - n[1] * e[0],
    ];
  }
  function Ea(n, e) {
    (n[0] += e[0]), (n[1] += e[1]), (n[2] += e[2]);
  }
  function xa(n, e) {
    return [n[0] * e, n[1] * e, n[2] * e];
  }
  function Sa(n) {
    var e = ro(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    (n[0] /= e), (n[1] /= e), (n[2] /= e);
  }
  function Aa(n) {
    return qr(n[0]) <= Kr ? n[0] : to(n[0]) * (((qr(n[0]) + Kr) % $r) - Kr);
  }
  function Ma(n) {
    return Array.from(
      (function* (n) {
        for (const e of n) yield* e;
      })(n)
    );
  }
  function Ra(n, e, t, r) {
    return function (o) {
      var a,
        i,
        l,
        u = e(o),
        s = da(),
        c = e(s),
        p = !1,
        f = {
          point: _,
          lineStart: h,
          lineEnd: m,
          polygonStart: function () {
            (f.point = g),
              (f.lineStart = y),
              (f.lineEnd = v),
              (i = []),
              (a = []);
          },
          polygonEnd: function () {
            (f.point = _), (f.lineStart = h), (f.lineEnd = m), (i = Ma(i));
            var n = (function (n, e) {
              var t = Aa(e),
                r = e[1],
                o = eo(r),
                a = [eo(t), -Jr(t), 0],
                i = 0,
                l = 0,
                u = new Or();
              1 === o ? (r = zr + jr) : -1 === o && (r = -zr - jr);
              for (var s = 0, c = n.length; s < c; ++s)
                if ((f = (p = n[s]).length))
                  for (
                    var p,
                      f,
                      _ = p[f - 1],
                      d = Aa(_),
                      h = _[1] / 2 + Vr,
                      m = eo(h),
                      g = Jr(h),
                      y = 0;
                    y < f;
                    ++y, d = b, m = k, g = E, _ = v
                  ) {
                    var v = p[y],
                      b = Aa(v),
                      w = v[1] / 2 + Vr,
                      k = eo(w),
                      E = Jr(w),
                      x = b - d,
                      S = x >= 0 ? 1 : -1,
                      A = S * x,
                      M = A > Kr,
                      R = m * k;
                    if (
                      (u.add(Zr(R * S * eo(A), g * E + R * Jr(A))),
                      (i += M ? x + S * $r : x),
                      M ^ (d >= t) ^ (b >= t))
                    ) {
                      var N = ka(ba(_), ba(v));
                      Sa(N);
                      var C = ka(a, N);
                      Sa(C);
                      var L = (M ^ (x >= 0) ? -1 : 1) * ao(C[2]);
                      (r > L || (r === L && (N[0] || N[1]))) &&
                        (l += M ^ (x >= 0) ? 1 : -1);
                    }
                  }
              return (i < -jr || (i < jr && u < -1e-12)) ^ (1 & l);
            })(a, r);
            i.length
              ? (p || (o.polygonStart(), (p = !0)), ga(i, Ca, n, t, o))
              : n &&
                (p || (o.polygonStart(), (p = !0)),
                o.lineStart(),
                t(null, null, 1, o),
                o.lineEnd()),
              p && (o.polygonEnd(), (p = !1)),
              (i = a = null);
          },
          sphere: function () {
            o.polygonStart(),
              o.lineStart(),
              t(null, null, 1, o),
              o.lineEnd(),
              o.polygonEnd();
          },
        };
      function _(e, t) {
        n(e, t) && o.point(e, t);
      }
      function d(n, e) {
        u.point(n, e);
      }
      function h() {
        (f.point = d), u.lineStart();
      }
      function m() {
        (f.point = _), u.lineEnd();
      }
      function g(n, e) {
        l.push([n, e]), c.point(n, e);
      }
      function y() {
        c.lineStart(), (l = []);
      }
      function v() {
        g(l[0][0], l[0][1]), c.lineEnd();
        var n,
          e,
          t,
          r,
          u = c.clean(),
          f = s.result(),
          _ = f.length;
        if ((l.pop(), a.push(l), (l = null), _))
          if (1 & u) {
            if ((e = (t = f[0]).length - 1) > 0) {
              for (
                p || (o.polygonStart(), (p = !0)), o.lineStart(), n = 0;
                n < e;
                ++n
              )
                o.point((r = t[n])[0], r[1]);
              o.lineEnd();
            }
          } else
            _ > 1 && 2 & u && f.push(f.pop().concat(f.shift())),
              i.push(f.filter(Na));
      }
      return f;
    };
  }
  function Na(n) {
    return n.length > 1;
  }
  function Ca(n, e) {
    return (
      ((n = n.x)[0] < 0 ? n[1] - zr - jr : zr - n[1]) -
      ((e = e.x)[0] < 0 ? e[1] - zr - jr : zr - e[1])
    );
  }
  (ia.prototype = {
    _radius: 4.5,
    _circle: la(4.5),
    pointRadius: function (n) {
      return (
        (n = +n) !== this._radius &&
          ((this._radius = n), (this._circle = null)),
        this
      );
    },
    polygonStart: function () {
      this._line = 0;
    },
    polygonEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      0 === this._line && this._string.push("Z"), (this._point = NaN);
    },
    point: function (n, e) {
      switch (this._point) {
        case 0:
          this._string.push("M", n, ",", e), (this._point = 1);
          break;
        case 1:
          this._string.push("L", n, ",", e);
          break;
        default:
          null == this._circle && (this._circle = la(this._radius)),
            this._string.push("M", n, ",", e, this._circle);
      }
    },
    result: function () {
      if (this._string.length) {
        var n = this._string.join("");
        return (this._string = []), n;
      }
      return null;
    },
  }),
    (sa.invert = sa);
  const La = Ra(
    function () {
      return !0;
    },
    function (n) {
      var e,
        t = NaN,
        r = NaN,
        o = NaN;
      return {
        lineStart: function () {
          n.lineStart(), (e = 1);
        },
        point: function (a, i) {
          var l = a > 0 ? Kr : -Kr,
            u = qr(a - t);
          qr(u - Kr) < jr
            ? (n.point(t, (r = (r + i) / 2 > 0 ? zr : -zr)),
              n.point(o, r),
              n.lineEnd(),
              n.lineStart(),
              n.point(l, r),
              n.point(a, r),
              (e = 0))
            : o !== l &&
              u >= Kr &&
              (qr(t - o) < jr && (t -= o * jr),
              qr(a - l) < jr && (a -= l * jr),
              (r = (function (n, e, t, r) {
                var o,
                  a,
                  i = eo(n - t);
                return qr(i) > jr
                  ? Yr(
                      (eo(e) * (a = Jr(r)) * eo(t) -
                        eo(r) * (o = Jr(e)) * eo(n)) /
                        (o * a * i)
                    )
                  : (e + r) / 2;
              })(t, r, a, i)),
              n.point(o, r),
              n.lineEnd(),
              n.lineStart(),
              n.point(l, r),
              (e = 0)),
            n.point((t = a), (r = i)),
            (o = l);
        },
        lineEnd: function () {
          n.lineEnd(), (t = r = NaN);
        },
        clean: function () {
          return 2 - e;
        },
      };
    },
    function (n, e, t, r) {
      var o;
      if (null == n)
        (o = t * zr),
          r.point(-Kr, o),
          r.point(0, o),
          r.point(Kr, o),
          r.point(Kr, 0),
          r.point(Kr, -o),
          r.point(0, -o),
          r.point(-Kr, -o),
          r.point(-Kr, 0),
          r.point(-Kr, o);
      else if (qr(n[0] - e[0]) > jr) {
        var a = n[0] < e[0] ? Kr : -Kr;
        (o = (t * a) / 2), r.point(-a, o), r.point(0, o), r.point(a, o);
      } else r.point(e[0], e[1]);
    },
    [-Kr, -zr]
  );
  function Ba(n, e) {
    ((e = ba(e))[0] -= n), Sa(e);
    var t,
      r = (t = -e[1]) > 1 ? 0 : t < -1 ? Kr : Math.acos(t);
    return ((-e[2] < 0 ? -r : r) + $r - jr) % $r;
  }
  function Da(n) {
    var e = Jr(n),
      t = 6 * Xr,
      r = e > 0,
      o = qr(e) > jr;
    function a(n, t) {
      return Jr(n) * Jr(t) > e;
    }
    function i(n, t, r) {
      var o = [1, 0, 0],
        a = ka(ba(n), ba(t)),
        i = wa(a, a),
        l = a[0],
        u = i - l * l;
      if (!u) return !r && n;
      var s = (e * i) / u,
        c = (-e * l) / u,
        p = ka(o, a),
        f = xa(o, s);
      Ea(f, xa(a, c));
      var _ = p,
        d = wa(f, _),
        h = wa(_, _),
        m = d * d - h * (wa(f, f) - 1);
      if (!(m < 0)) {
        var g = ro(m),
          y = xa(_, (-d - g) / h);
        if ((Ea(y, f), (y = va(y)), !r)) return y;
        var v,
          b = n[0],
          w = t[0],
          k = n[1],
          E = t[1];
        w < b && ((v = b), (b = w), (w = v));
        var x = w - b,
          S = qr(x - Kr) < jr;
        if (
          (!S && E < k && ((v = k), (k = E), (E = v)),
          S || x < jr
            ? S
              ? (k + E > 0) ^ (y[1] < (qr(y[0] - b) < jr ? k : E))
              : k <= y[1] && y[1] <= E
            : (x > Kr) ^ (b <= y[0] && y[0] <= w))
        ) {
          var A = xa(_, (-d + g) / h);
          return Ea(A, f), [y, va(A)];
        }
      }
    }
    function l(e, t) {
      var o = r ? n : Kr - n,
        a = 0;
      return (
        e < -o ? (a |= 1) : e > o && (a |= 2),
        t < -o ? (a |= 4) : t > o && (a |= 8),
        a
      );
    }
    return Ra(
      a,
      function (n) {
        var e, t, u, s, c;
        return {
          lineStart: function () {
            (s = u = !1), (c = 1);
          },
          point: function (p, f) {
            var _,
              d = [p, f],
              h = a(p, f),
              m = r ? (h ? 0 : l(p, f)) : h ? l(p + (p < 0 ? Kr : -Kr), f) : 0;
            if (
              (!e && (s = u = h) && n.lineStart(),
              h !== u && (!(_ = i(e, d)) || ha(e, _) || ha(d, _)) && (d[2] = 1),
              h !== u)
            )
              (c = 0),
                h
                  ? (n.lineStart(), (_ = i(d, e)), n.point(_[0], _[1]))
                  : ((_ = i(e, d)), n.point(_[0], _[1], 2), n.lineEnd()),
                (e = _);
            else if (o && e && r ^ h) {
              var g;
              m & t ||
                !(g = i(d, e, !0)) ||
                ((c = 0),
                r
                  ? (n.lineStart(),
                    n.point(g[0][0], g[0][1]),
                    n.point(g[1][0], g[1][1]),
                    n.lineEnd())
                  : (n.point(g[1][0], g[1][1]),
                    n.lineEnd(),
                    n.lineStart(),
                    n.point(g[0][0], g[0][1], 3)));
            }
            !h || (e && ha(e, d)) || n.point(d[0], d[1]),
              (e = d),
              (u = h),
              (t = m);
          },
          lineEnd: function () {
            u && n.lineEnd(), (e = null);
          },
          clean: function () {
            return c | ((s && u) << 1);
          },
        };
      },
      function (e, r, o, a) {
        !(function (n, e, t, r, o, a) {
          if (t) {
            var i = Jr(e),
              l = eo(e),
              u = r * t;
            null == o
              ? ((o = e + r * $r), (a = e - u / 2))
              : ((o = Ba(i, o)),
                (a = Ba(i, a)),
                (r > 0 ? o < a : o > a) && (o += r * $r));
            for (var s, c = o; r > 0 ? c > a : c < a; c -= u)
              (s = va([i, -l * Jr(c), -l * eo(c)])), n.point(s[0], s[1]);
          }
        })(a, n, t, o, e, r);
      },
      r ? [0, -n] : [-Kr, n - Kr]
    );
  }
  var Pa = 1e9,
    Ua = -Pa;
  function Ga(n, e, t, r) {
    function o(o, a) {
      return n <= o && o <= t && e <= a && a <= r;
    }
    function a(o, a, l, s) {
      var c = 0,
        p = 0;
      if (
        null == o ||
        (c = i(o, l)) !== (p = i(a, l)) ||
        (u(o, a) < 0) ^ (l > 0)
      )
        do {
          s.point(0 === c || 3 === c ? n : t, c > 1 ? r : e);
        } while ((c = (c + l + 4) % 4) !== p);
      else s.point(a[0], a[1]);
    }
    function i(r, o) {
      return qr(r[0] - n) < jr
        ? o > 0
          ? 0
          : 3
        : qr(r[0] - t) < jr
        ? o > 0
          ? 2
          : 1
        : qr(r[1] - e) < jr
        ? o > 0
          ? 1
          : 0
        : o > 0
        ? 3
        : 2;
    }
    function l(n, e) {
      return u(n.x, e.x);
    }
    function u(n, e) {
      var t = i(n, 1),
        r = i(e, 1);
      return t !== r
        ? t - r
        : 0 === t
        ? e[1] - n[1]
        : 1 === t
        ? n[0] - e[0]
        : 2 === t
        ? n[1] - e[1]
        : e[0] - n[0];
    }
    return function (i) {
      var u,
        s,
        c,
        p,
        f,
        _,
        d,
        h,
        m,
        g,
        y,
        v = i,
        b = da(),
        w = {
          point: k,
          lineStart: function () {
            (w.point = E),
              s && s.push((c = [])),
              (g = !0),
              (m = !1),
              (d = h = NaN);
          },
          lineEnd: function () {
            u && (E(p, f), _ && m && b.rejoin(), u.push(b.result())),
              (w.point = k),
              m && v.lineEnd();
          },
          polygonStart: function () {
            (v = b), (u = []), (s = []), (y = !0);
          },
          polygonEnd: function () {
            var e = (function () {
                for (var e = 0, t = 0, o = s.length; t < o; ++t)
                  for (
                    var a,
                      i,
                      l = s[t],
                      u = 1,
                      c = l.length,
                      p = l[0],
                      f = p[0],
                      _ = p[1];
                    u < c;
                    ++u
                  )
                    (a = f),
                      (i = _),
                      (f = (p = l[u])[0]),
                      (_ = p[1]),
                      i <= r
                        ? _ > r && (f - a) * (r - i) > (_ - i) * (n - a) && ++e
                        : _ <= r &&
                          (f - a) * (r - i) < (_ - i) * (n - a) &&
                          --e;
                return e;
              })(),
              t = y && e,
              o = (u = Ma(u)).length;
            (t || o) &&
              (i.polygonStart(),
              t && (i.lineStart(), a(null, null, 1, i), i.lineEnd()),
              o && ga(u, l, e, a, i),
              i.polygonEnd()),
              (v = i),
              (u = s = c = null);
          },
        };
      function k(n, e) {
        o(n, e) && v.point(n, e);
      }
      function E(a, i) {
        var l = o(a, i);
        if ((s && c.push([a, i]), g))
          (p = a),
            (f = i),
            (_ = l),
            (g = !1),
            l && (v.lineStart(), v.point(a, i));
        else if (l && m) v.point(a, i);
        else {
          var u = [
              (d = Math.max(Ua, Math.min(Pa, d))),
              (h = Math.max(Ua, Math.min(Pa, h))),
            ],
            b = [
              (a = Math.max(Ua, Math.min(Pa, a))),
              (i = Math.max(Ua, Math.min(Pa, i))),
            ];
          !(function (n, e, t, r, o, a) {
            var i,
              l = n[0],
              u = n[1],
              s = 0,
              c = 1,
              p = e[0] - l,
              f = e[1] - u;
            if (((i = t - l), p || !(i > 0))) {
              if (((i /= p), p < 0)) {
                if (i < s) return;
                i < c && (c = i);
              } else if (p > 0) {
                if (i > c) return;
                i > s && (s = i);
              }
              if (((i = o - l), p || !(i < 0))) {
                if (((i /= p), p < 0)) {
                  if (i > c) return;
                  i > s && (s = i);
                } else if (p > 0) {
                  if (i < s) return;
                  i < c && (c = i);
                }
                if (((i = r - u), f || !(i > 0))) {
                  if (((i /= f), f < 0)) {
                    if (i < s) return;
                    i < c && (c = i);
                  } else if (f > 0) {
                    if (i > c) return;
                    i > s && (s = i);
                  }
                  if (((i = a - u), f || !(i < 0))) {
                    if (((i /= f), f < 0)) {
                      if (i > c) return;
                      i > s && (s = i);
                    } else if (f > 0) {
                      if (i < s) return;
                      i < c && (c = i);
                    }
                    return (
                      s > 0 && ((n[0] = l + s * p), (n[1] = u + s * f)),
                      c < 1 && ((e[0] = l + c * p), (e[1] = u + c * f)),
                      !0
                    );
                  }
                }
              }
            }
          })(u, b, n, e, t, r)
            ? l && (v.lineStart(), v.point(a, i), (y = !1))
            : (m || (v.lineStart(), v.point(u[0], u[1])),
              v.point(b[0], b[1]),
              l || v.lineEnd(),
              (y = !1));
        }
        (d = a), (h = i), (m = l);
      }
      return w;
    };
  }
  function Ta(n) {
    return function (e) {
      var t = new Ia();
      for (var r in n) t[r] = n[r];
      return (t.stream = e), t;
    };
  }
  function Ia() {}
  function Ha(n, e, t) {
    var r = n.clipExtent && n.clipExtent();
    return (
      n.scale(150).translate([0, 0]),
      null != r && n.clipExtent(null),
      Fr(t, n.stream(xo)),
      e(xo.result()),
      null != r && n.clipExtent(r),
      n
    );
  }
  function Fa(n, e, t) {
    return Ha(
      n,
      function (t) {
        var r = e[1][0] - e[0][0],
          o = e[1][1] - e[0][1],
          a = Math.min(r / (t[1][0] - t[0][0]), o / (t[1][1] - t[0][1])),
          i = +e[0][0] + (r - a * (t[1][0] + t[0][0])) / 2,
          l = +e[0][1] + (o - a * (t[1][1] + t[0][1])) / 2;
        n.scale(150 * a).translate([i, l]);
      },
      t
    );
  }
  Ia.prototype = {
    constructor: Ia,
    point: function (n, e) {
      this.stream.point(n, e);
    },
    sphere: function () {
      this.stream.sphere();
    },
    lineStart: function () {
      this.stream.lineStart();
    },
    lineEnd: function () {
      this.stream.lineEnd();
    },
    polygonStart: function () {
      this.stream.polygonStart();
    },
    polygonEnd: function () {
      this.stream.polygonEnd();
    },
  };
  var Oa = Jr(30 * Xr);
  function ja(n, e) {
    return +e
      ? (function (n, e) {
          function t(r, o, a, i, l, u, s, c, p, f, _, d, h, m) {
            var g = s - r,
              y = c - o,
              v = g * g + y * y;
            if (v > 4 * e && h--) {
              var b = i + f,
                w = l + _,
                k = u + d,
                E = ro(b * b + w * w + k * k),
                x = ao((k /= E)),
                S =
                  qr(qr(k) - 1) < jr || qr(a - p) < jr ? (a + p) / 2 : Zr(w, b),
                A = n(S, x),
                M = A[0],
                R = A[1],
                N = M - r,
                C = R - o,
                L = y * N - g * C;
              ((L * L) / v > e ||
                qr((g * N + y * C) / v - 0.5) > 0.3 ||
                i * f + l * _ + u * d < Oa) &&
                (t(r, o, a, i, l, u, M, R, S, (b /= E), (w /= E), k, h, m),
                m.point(M, R),
                t(M, R, S, b, w, k, s, c, p, f, _, d, h, m));
            }
          }
          return function (e) {
            var r,
              o,
              a,
              i,
              l,
              u,
              s,
              c,
              p,
              f,
              _,
              d,
              h = {
                point: m,
                lineStart: g,
                lineEnd: v,
                polygonStart: function () {
                  e.polygonStart(), (h.lineStart = b);
                },
                polygonEnd: function () {
                  e.polygonEnd(), (h.lineStart = g);
                },
              };
            function m(t, r) {
              (t = n(t, r)), e.point(t[0], t[1]);
            }
            function g() {
              (c = NaN), (h.point = y), e.lineStart();
            }
            function y(r, o) {
              var a = ba([r, o]),
                i = n(r, o);
              t(
                c,
                p,
                s,
                f,
                _,
                d,
                (c = i[0]),
                (p = i[1]),
                (s = r),
                (f = a[0]),
                (_ = a[1]),
                (d = a[2]),
                16,
                e
              ),
                e.point(c, p);
            }
            function v() {
              (h.point = m), e.lineEnd();
            }
            function b() {
              g(), (h.point = w), (h.lineEnd = k);
            }
            function w(n, e) {
              y((r = n), e),
                (o = c),
                (a = p),
                (i = f),
                (l = _),
                (u = d),
                (h.point = y);
            }
            function k() {
              t(c, p, s, f, _, d, o, a, r, i, l, u, 16, e),
                (h.lineEnd = v),
                v();
            }
            return h;
          };
        })(n, e)
      : (function (n) {
          return Ta({
            point: function (e, t) {
              (e = n(e, t)), this.stream.point(e[0], e[1]);
            },
          });
        })(n);
  }
  var Ka = Ta({
    point: function (n, e) {
      this.stream.point(n * Xr, e * Xr);
    },
  });
  function za(n, e, t, r, o, a) {
    if (!a)
      return (function (n, e, t, r, o) {
        function a(a, i) {
          return [e + n * (a *= r), t - n * (i *= o)];
        }
        return (
          (a.invert = function (a, i) {
            return [((a - e) / n) * r, ((t - i) / n) * o];
          }),
          a
        );
      })(n, e, t, r, o);
    var i = Jr(a),
      l = eo(a),
      u = i * n,
      s = l * n,
      c = i / n,
      p = l / n,
      f = (l * t - i * e) / n,
      _ = (l * e + i * t) / n;
    function d(n, a) {
      return [u * (n *= r) - s * (a *= o) + e, t - s * n - u * a];
    }
    return (
      (d.invert = function (n, e) {
        return [r * (c * n - p * e + f), o * (_ - p * n - c * e)];
      }),
      d
    );
  }
  function Va(n, e) {
    return [n, no(oo((zr + e) / 2))];
  }
  function $a() {
    return (function (n) {
      var e,
        t,
        r,
        o = (function (n) {
          return (function (n) {
            var e,
              t,
              r,
              o,
              a,
              i,
              l,
              u,
              s,
              c,
              p = 150,
              f = 480,
              _ = 250,
              d = 0,
              h = 0,
              m = 0,
              g = 0,
              y = 0,
              v = 0,
              b = 1,
              w = 1,
              k = null,
              E = La,
              x = null,
              S = Pr,
              A = 0.5;
            function M(n) {
              return u(n[0] * Xr, n[1] * Xr);
            }
            function R(n) {
              return (n = u.invert(n[0], n[1])) && [n[0] * Wr, n[1] * Wr];
            }
            function N() {
              var n = za(p, 0, 0, b, w, v).apply(null, e(d, h)),
                r = za(p, f - n[0], _ - n[1], b, w, v);
              return (
                (t = ca(m, g, y)),
                (l = ua(e, r)),
                (u = ua(t, l)),
                (i = ja(l, A)),
                C()
              );
            }
            function C() {
              return (s = c = null), M;
            }
            return (
              (M.stream = function (n) {
                return s && c === n
                  ? s
                  : (s = Ka(
                      (function (n) {
                        return Ta({
                          point: function (e, t) {
                            var r = n(e, t);
                            return this.stream.point(r[0], r[1]);
                          },
                        });
                      })(t)(E(i(S((c = n)))))
                    ));
              }),
              (M.preclip = function (n) {
                return arguments.length ? ((E = n), (k = void 0), C()) : E;
              }),
              (M.postclip = function (n) {
                return arguments.length
                  ? ((S = n), (x = r = o = a = null), C())
                  : S;
              }),
              (M.clipAngle = function (n) {
                return arguments.length
                  ? ((E = +n ? Da((k = n * Xr)) : ((k = null), La)), C())
                  : k * Wr;
              }),
              (M.clipExtent = function (n) {
                return arguments.length
                  ? ((S =
                      null == n
                        ? ((x = r = o = a = null), Pr)
                        : Ga(
                            (x = +n[0][0]),
                            (r = +n[0][1]),
                            (o = +n[1][0]),
                            (a = +n[1][1])
                          )),
                    C())
                  : null == x
                  ? null
                  : [
                      [x, r],
                      [o, a],
                    ];
              }),
              (M.scale = function (n) {
                return arguments.length ? ((p = +n), N()) : p;
              }),
              (M.translate = function (n) {
                return arguments.length
                  ? ((f = +n[0]), (_ = +n[1]), N())
                  : [f, _];
              }),
              (M.center = function (n) {
                return arguments.length
                  ? ((d = (n[0] % 360) * Xr), (h = (n[1] % 360) * Xr), N())
                  : [d * Wr, h * Wr];
              }),
              (M.rotate = function (n) {
                return arguments.length
                  ? ((m = (n[0] % 360) * Xr),
                    (g = (n[1] % 360) * Xr),
                    (y = n.length > 2 ? (n[2] % 360) * Xr : 0),
                    N())
                  : [m * Wr, g * Wr, y * Wr];
              }),
              (M.angle = function (n) {
                return arguments.length ? ((v = (n % 360) * Xr), N()) : v * Wr;
              }),
              (M.reflectX = function (n) {
                return arguments.length ? ((b = n ? -1 : 1), N()) : b < 0;
              }),
              (M.reflectY = function (n) {
                return arguments.length ? ((w = n ? -1 : 1), N()) : w < 0;
              }),
              (M.precision = function (n) {
                return arguments.length
                  ? ((i = ja(l, (A = n * n))), C())
                  : ro(A);
              }),
              (M.fitExtent = function (n, e) {
                return Fa(M, n, e);
              }),
              (M.fitSize = function (n, e) {
                return (function (n, e, t) {
                  return Fa(n, [[0, 0], e], t);
                })(M, n, e);
              }),
              (M.fitWidth = function (n, e) {
                return (function (n, e, t) {
                  return Ha(
                    n,
                    function (t) {
                      var r = +e,
                        o = r / (t[1][0] - t[0][0]),
                        a = (r - o * (t[1][0] + t[0][0])) / 2,
                        i = -o * t[0][1];
                      n.scale(150 * o).translate([a, i]);
                    },
                    t
                  );
                })(M, n, e);
              }),
              (M.fitHeight = function (n, e) {
                return (function (n, e, t) {
                  return Ha(
                    n,
                    function (t) {
                      var r = +e,
                        o = r / (t[1][1] - t[0][1]),
                        a = -o * t[0][0],
                        i = (r - o * (t[1][1] + t[0][1])) / 2;
                      n.scale(150 * o).translate([a, i]);
                    },
                    t
                  );
                })(M, n, e);
              }),
              function () {
                return (
                  (e = n.apply(this, arguments)),
                  (M.invert = e.invert && R),
                  N()
                );
              }
            );
          })(function () {
            return n;
          })();
        })(n),
        a = o.center,
        i = o.scale,
        l = o.translate,
        u = o.clipExtent,
        s = null;
      function c() {
        var a = Kr * i(),
          l = o(
            (function (n) {
              function e(e) {
                return (
                  ((e = n(e[0] * Xr, e[1] * Xr))[0] *= Wr), (e[1] *= Wr), e
                );
              }
              return (
                (n = ca(n[0] * Xr, n[1] * Xr, n.length > 2 ? n[2] * Xr : 0)),
                (e.invert = function (e) {
                  return (
                    ((e = n.invert(e[0] * Xr, e[1] * Xr))[0] *= Wr),
                    (e[1] *= Wr),
                    e
                  );
                }),
                e
              );
            })(o.rotate()).invert([0, 0])
          );
        return u(
          null == s
            ? [
                [l[0] - a, l[1] - a],
                [l[0] + a, l[1] + a],
              ]
            : n === Va
            ? [
                [Math.max(l[0] - a, s), e],
                [Math.min(l[0] + a, t), r],
              ]
            : [
                [s, Math.max(l[1] - a, e)],
                [t, Math.min(l[1] + a, r)],
              ]
        );
      }
      return (
        (o.scale = function (n) {
          return arguments.length ? (i(n), c()) : i();
        }),
        (o.translate = function (n) {
          return arguments.length ? (l(n), c()) : l();
        }),
        (o.center = function (n) {
          return arguments.length ? (a(n), c()) : a();
        }),
        (o.clipExtent = function (n) {
          return arguments.length
            ? (null == n
                ? (s = e = t = r = null)
                : ((s = +n[0][0]),
                  (e = +n[0][1]),
                  (t = +n[1][0]),
                  (r = +n[1][1])),
              c())
            : null == s
            ? null
            : [
                [s, e],
                [t, r],
              ];
        }),
        c()
      );
    })(Va).scale(961 / $r);
  }
  function Wa(n) {
    var e = 0,
      t = n.children,
      r = t && t.length;
    if (r) for (; --r >= 0; ) e += t[r].value;
    else e = 1;
    n.value = e;
  }
  function Xa(n, e) {
    n instanceof Map
      ? ((n = [void 0, n]), void 0 === e && (e = Ya))
      : void 0 === e && (e = qa);
    for (var t, r, o, a, i, l = new Qa(n), u = [l]; (t = u.pop()); )
      if ((o = e(t.data)) && (i = (o = Array.from(o)).length))
        for (t.children = o, a = i - 1; a >= 0; --a)
          u.push((r = o[a] = new Qa(o[a]))),
            (r.parent = t),
            (r.depth = t.depth + 1);
    return l.eachBefore(Ja);
  }
  function qa(n) {
    return n.children;
  }
  function Ya(n) {
    return Array.isArray(n) ? n[1] : null;
  }
  function Za(n) {
    void 0 !== n.data.value && (n.value = n.data.value), (n.data = n.data.data);
  }
  function Ja(n) {
    var e = 0;
    do {
      n.height = e;
    } while ((n = n.parent) && n.height < ++e);
  }
  function Qa(n) {
    (this.data = n), (this.depth = this.height = 0), (this.parent = null);
  }
  function ni(n, e) {
    var t, r;
    if (ri(e, n)) return [e];
    for (t = 0; t < n.length; ++t)
      if (ei(e, n[t]) && ri(ai(n[t], e), n)) return [n[t], e];
    for (t = 0; t < n.length - 1; ++t)
      for (r = t + 1; r < n.length; ++r)
        if (
          ei(ai(n[t], n[r]), e) &&
          ei(ai(n[t], e), n[r]) &&
          ei(ai(n[r], e), n[t]) &&
          ri(ii(n[t], n[r], e), n)
        )
          return [n[t], n[r], e];
    throw new Error();
  }
  function ei(n, e) {
    var t = n.r - e.r,
      r = e.x - n.x,
      o = e.y - n.y;
    return t < 0 || t * t < r * r + o * o;
  }
  function ti(n, e) {
    var t = n.r - e.r + 1e-9 * Math.max(n.r, e.r, 1),
      r = e.x - n.x,
      o = e.y - n.y;
    return t > 0 && t * t > r * r + o * o;
  }
  function ri(n, e) {
    for (var t = 0; t < e.length; ++t) if (!ti(n, e[t])) return !1;
    return !0;
  }
  function oi(n) {
    switch (n.length) {
      case 1:
        return { x: (e = n[0]).x, y: e.y, r: e.r };
      case 2:
        return ai(n[0], n[1]);
      case 3:
        return ii(n[0], n[1], n[2]);
    }
    var e;
  }
  function ai(n, e) {
    var t = n.x,
      r = n.y,
      o = n.r,
      a = e.x,
      i = e.y,
      l = e.r,
      u = a - t,
      s = i - r,
      c = l - o,
      p = Math.sqrt(u * u + s * s);
    return {
      x: (t + a + (u / p) * c) / 2,
      y: (r + i + (s / p) * c) / 2,
      r: (p + o + l) / 2,
    };
  }
  function ii(n, e, t) {
    var r = n.x,
      o = n.y,
      a = n.r,
      i = e.x,
      l = e.y,
      u = e.r,
      s = t.x,
      c = t.y,
      p = t.r,
      f = r - i,
      _ = r - s,
      d = o - l,
      h = o - c,
      m = u - a,
      g = p - a,
      y = r * r + o * o - a * a,
      v = y - i * i - l * l + u * u,
      b = y - s * s - c * c + p * p,
      w = _ * d - f * h,
      k = (d * b - h * v) / (2 * w) - r,
      E = (h * m - d * g) / w,
      x = (_ * v - f * b) / (2 * w) - o,
      S = (f * g - _ * m) / w,
      A = E * E + S * S - 1,
      M = 2 * (a + k * E + x * S),
      R = k * k + x * x - a * a,
      N = -(A ? (M + Math.sqrt(M * M - 4 * A * R)) / (2 * A) : R / M);
    return { x: r + k + E * N, y: o + x + S * N, r: N };
  }
  function li(n, e, t) {
    var r,
      o,
      a,
      i,
      l = n.x - e.x,
      u = n.y - e.y,
      s = l * l + u * u;
    s
      ? ((o = e.r + t.r),
        (o *= o),
        (i = n.r + t.r),
        o > (i *= i)
          ? ((r = (s + i - o) / (2 * s)),
            (a = Math.sqrt(Math.max(0, i / s - r * r))),
            (t.x = n.x - r * l - a * u),
            (t.y = n.y - r * u + a * l))
          : ((r = (s + o - i) / (2 * s)),
            (a = Math.sqrt(Math.max(0, o / s - r * r))),
            (t.x = e.x + r * l - a * u),
            (t.y = e.y + r * u + a * l)))
      : ((t.x = e.x + t.r), (t.y = e.y));
  }
  function ui(n, e) {
    var t = n.r + e.r - 1e-6,
      r = e.x - n.x,
      o = e.y - n.y;
    return t > 0 && t * t > r * r + o * o;
  }
  function si(n) {
    var e = n._,
      t = n.next._,
      r = e.r + t.r,
      o = (e.x * t.r + t.x * e.r) / r,
      a = (e.y * t.r + t.y * e.r) / r;
    return o * o + a * a;
  }
  function ci(n) {
    (this._ = n), (this.next = null), (this.previous = null);
  }
  function pi(n) {
    if (
      !(a = ((e = n),
      (n = "object" == typeof e && "length" in e ? e : Array.from(e))).length)
    )
      return 0;
    var e, t, r, o, a, i, l, u, s, c, p, f;
    if ((((t = n[0]).x = 0), (t.y = 0), !(a > 1))) return t.r;
    if (((r = n[1]), (t.x = -r.r), (r.x = t.r), (r.y = 0), !(a > 2)))
      return t.r + r.r;
    li(r, t, (o = n[2])),
      (t = new ci(t)),
      (r = new ci(r)),
      (o = new ci(o)),
      (t.next = o.previous = r),
      (r.next = t.previous = o),
      (o.next = r.previous = t);
    n: for (u = 3; u < a; ++u) {
      li(t._, r._, (o = n[u])),
        (o = new ci(o)),
        (s = r.next),
        (c = t.previous),
        (p = r._.r),
        (f = t._.r);
      do {
        if (p <= f) {
          if (ui(s._, o._)) {
            (r = s), (t.next = r), (r.previous = t), --u;
            continue n;
          }
          (p += s._.r), (s = s.next);
        } else {
          if (ui(c._, o._)) {
            ((t = c).next = r), (r.previous = t), --u;
            continue n;
          }
          (f += c._.r), (c = c.previous);
        }
      } while (s !== c.next);
      for (
        o.previous = t, o.next = r, t.next = r.previous = r = o, i = si(t);
        (o = o.next) !== r;

      )
        (l = si(o)) < i && ((t = o), (i = l));
      r = t.next;
    }
    for (t = [r._], o = r; (o = o.next) !== r; ) t.push(o._);
    for (
      o = (function (n) {
        for (
          var e,
            t,
            r = 0,
            o = (n = (function (n) {
              for (var e, t, r = n.length; r; )
                (t = (Math.random() * r--) | 0),
                  (e = n[r]),
                  (n[r] = n[t]),
                  (n[t] = e);
              return n;
            })(Array.from(n))).length,
            a = [];
          r < o;

        )
          (e = n[r]), t && ti(t, e) ? ++r : ((t = oi((a = ni(a, e)))), (r = 0));
        return t;
      })(t),
        u = 0;
      u < a;
      ++u
    )
      ((t = n[u]).x -= o.x), (t.y -= o.y);
    return o.r;
  }
  function fi(n) {
    return null == n ? null : _i(n);
  }
  function _i(n) {
    if ("function" != typeof n) throw new Error();
    return n;
  }
  function di() {
    return 0;
  }
  function hi(n) {
    return function () {
      return n;
    };
  }
  function mi(n) {
    return Math.sqrt(n.value);
  }
  function gi(n) {
    return function (e) {
      e.children || (e.r = Math.max(0, +n(e) || 0));
    };
  }
  function yi(n, e) {
    return function (t) {
      if ((r = t.children)) {
        var r,
          o,
          a,
          i = r.length,
          l = n(t) * e || 0;
        if (l) for (o = 0; o < i; ++o) r[o].r += l;
        if (((a = pi(r)), l)) for (o = 0; o < i; ++o) r[o].r -= l;
        t.r = a + l;
      }
    };
  }
  function vi(n) {
    return function (e) {
      var t = e.parent;
      (e.r *= n), t && ((e.x = t.x + n * e.x), (e.y = t.y + n * e.y));
    };
  }
  (Va.invert = function (n, e) {
    return [n, 2 * Yr(Qr(e)) - zr];
  }),
    (Qa.prototype = Xa.prototype = {
      constructor: Qa,
      count: function () {
        return this.eachAfter(Wa);
      },
      each: function (n, e) {
        let t = -1;
        for (const r of this) n.call(e, r, ++t, this);
        return this;
      },
      eachAfter: function (n, e) {
        for (var t, r, o, a = this, i = [a], l = [], u = -1; (a = i.pop()); )
          if ((l.push(a), (t = a.children)))
            for (r = 0, o = t.length; r < o; ++r) i.push(t[r]);
        for (; (a = l.pop()); ) n.call(e, a, ++u, this);
        return this;
      },
      eachBefore: function (n, e) {
        for (var t, r, o = this, a = [o], i = -1; (o = a.pop()); )
          if ((n.call(e, o, ++i, this), (t = o.children)))
            for (r = t.length - 1; r >= 0; --r) a.push(t[r]);
        return this;
      },
      find: function (n, e) {
        let t = -1;
        for (const r of this) if (n.call(e, r, ++t, this)) return r;
      },
      sum: function (n) {
        return this.eachAfter(function (e) {
          for (
            var t = +n(e.data) || 0, r = e.children, o = r && r.length;
            --o >= 0;

          )
            t += r[o].value;
          e.value = t;
        });
      },
      sort: function (n) {
        return this.eachBefore(function (e) {
          e.children && e.children.sort(n);
        });
      },
      path: function (n) {
        for (
          var e = this,
            t = (function (n, e) {
              if (n === e) return n;
              var t = n.ancestors(),
                r = e.ancestors(),
                o = null;
              for (n = t.pop(), e = r.pop(); n === e; )
                (o = n), (n = t.pop()), (e = r.pop());
              return o;
            })(e, n),
            r = [e];
          e !== t;

        )
          (e = e.parent), r.push(e);
        for (var o = r.length; n !== t; ) r.splice(o, 0, n), (n = n.parent);
        return r;
      },
      ancestors: function () {
        for (var n = this, e = [n]; (n = n.parent); ) e.push(n);
        return e;
      },
      descendants: function () {
        return Array.from(this);
      },
      leaves: function () {
        var n = [];
        return (
          this.eachBefore(function (e) {
            e.children || n.push(e);
          }),
          n
        );
      },
      links: function () {
        var n = this,
          e = [];
        return (
          n.each(function (t) {
            t !== n && e.push({ source: t.parent, target: t });
          }),
          e
        );
      },
      copy: function () {
        return Xa(this).eachBefore(Za);
      },
      [Symbol.iterator]: function* () {
        var n,
          e,
          t,
          r,
          o = this,
          a = [o];
        do {
          for (n = a.reverse(), a = []; (o = n.pop()); )
            if ((yield o, (e = o.children)))
              for (t = 0, r = e.length; t < r; ++t) a.push(e[t]);
        } while (a.length);
      },
    });
  var bi = { depth: -1 },
    wi = {};
  function ki(n) {
    return n.id;
  }
  function Ei(n) {
    return n.parentId;
  }
  function xi(n) {
    (n.x0 = Math.round(n.x0)),
      (n.y0 = Math.round(n.y0)),
      (n.x1 = Math.round(n.x1)),
      (n.y1 = Math.round(n.y1));
  }
  function Si(n, e, t, r, o) {
    for (
      var a,
        i = n.children,
        l = -1,
        u = i.length,
        s = n.value && (r - e) / n.value;
      ++l < u;

    )
      ((a = i[l]).y0 = t), (a.y1 = o), (a.x0 = e), (a.x1 = e += a.value * s);
  }
  function Ai(n, e, t, r, o) {
    for (
      var a,
        i = n.children,
        l = -1,
        u = i.length,
        s = n.value && (o - t) / n.value;
      ++l < u;

    )
      ((a = i[l]).x0 = e), (a.x1 = r), (a.y0 = t), (a.y1 = t += a.value * s);
  }
  const Mi = (function n(e) {
    function t(n, t, r, o, a) {
      !(function (n, e, t, r, o, a) {
        for (
          var i,
            l,
            u,
            s,
            c,
            p,
            f,
            _,
            d,
            h,
            m,
            g = [],
            y = e.children,
            v = 0,
            b = 0,
            w = y.length,
            k = e.value;
          v < w;

        ) {
          (u = o - t), (s = a - r);
          do {
            c = y[b++].value;
          } while (!c && b < w);
          for (
            p = f = c,
              m = c * c * (h = Math.max(s / u, u / s) / (k * n)),
              d = Math.max(f / m, m / p);
            b < w;
            ++b
          ) {
            if (
              ((c += l = y[b].value),
              l < p && (p = l),
              l > f && (f = l),
              (m = c * c * h),
              (_ = Math.max(f / m, m / p)) > d)
            ) {
              c -= l;
              break;
            }
            d = _;
          }
          g.push((i = { value: c, dice: u < s, children: y.slice(v, b) })),
            i.dice
              ? Si(i, t, r, o, k ? (r += (s * c) / k) : a)
              : Ai(i, t, r, k ? (t += (u * c) / k) : o, a),
            (k -= c),
            (v = b);
        }
      })(e, n, t, r, o, a);
    }
    return (
      (t.ratio = function (e) {
        return n((e = +e) > 1 ? e : 1);
      }),
      t
    );
  })((1 + Math.sqrt(5)) / 2);
  function Ri(n, e) {
    return (
      (n = +n),
      (e = +e),
      function (t) {
        return Math.round(n * (1 - t) + e * t);
      }
    );
  }
  function Ni(n) {
    return +n;
  }
  var Ci = [0, 1];
  function Li(n) {
    return n;
  }
  function Bi(n, e) {
    return (e -= n = +n)
      ? function (t) {
          return (t - n) / e;
        }
      : ((t = isNaN(e) ? NaN : 0.5),
        function () {
          return t;
        });
    var t;
  }
  function Di(n, e, t) {
    var r = n[0],
      o = n[1],
      a = e[0],
      i = e[1];
    return (
      o < r ? ((r = Bi(o, r)), (a = t(i, a))) : ((r = Bi(r, o)), (a = t(a, i))),
      function (n) {
        return a(r(n));
      }
    );
  }
  function Pi(n, e, t) {
    var r = Math.min(n.length, e.length) - 1,
      o = new Array(r),
      a = new Array(r),
      i = -1;
    for (
      n[r] < n[0] && ((n = n.slice().reverse()), (e = e.slice().reverse()));
      ++i < r;

    )
      (o[i] = Bi(n[i], n[i + 1])), (a[i] = t(e[i], e[i + 1]));
    return function (e) {
      var t = u(n, e, 1, r) - 1;
      return a[t](o[t](e));
    };
  }
  function Ui(n, e) {
    return e
      .domain(n.domain())
      .range(n.range())
      .interpolate(n.interpolate())
      .clamp(n.clamp())
      .unknown(n.unknown());
  }
  function Gi() {
    return (function () {
      var n,
        e,
        t,
        r,
        o,
        a,
        i = Ci,
        l = Ci,
        u = Ge,
        s = Li;
      function c() {
        var n,
          e,
          t,
          u = Math.min(i.length, l.length);
        return (
          s !== Li &&
            ((n = i[0]),
            (e = i[u - 1]),
            n > e && ((t = n), (n = e), (e = t)),
            (s = function (t) {
              return Math.max(n, Math.min(e, t));
            })),
          (r = u > 2 ? Pi : Di),
          (o = a = null),
          p
        );
      }
      function p(e) {
        return isNaN((e = +e)) ? t : (o || (o = r(i.map(n), l, u)))(n(s(e)));
      }
      return (
        (p.invert = function (t) {
          return s(e((a || (a = r(l, i.map(n), Ce)))(t)));
        }),
        (p.domain = function (n) {
          return arguments.length ? ((i = Array.from(n, Ni)), c()) : i.slice();
        }),
        (p.range = function (n) {
          return arguments.length ? ((l = Array.from(n)), c()) : l.slice();
        }),
        (p.rangeRound = function (n) {
          return (l = Array.from(n)), (u = Ri), c();
        }),
        (p.clamp = function (n) {
          return arguments.length ? ((s = !!n || Li), c()) : s !== Li;
        }),
        (p.interpolate = function (n) {
          return arguments.length ? ((u = n), c()) : u;
        }),
        (p.unknown = function (n) {
          return arguments.length ? ((t = n), p) : t;
        }),
        function (t, r) {
          return (n = t), (e = r), c();
        }
      );
    })()(Li, Li);
  }
  function Ti(n, e) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(n);
        break;
      default:
        this.range(e).domain(n);
    }
    return this;
  }
  function Ii(n, e) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        "function" == typeof n ? this.interpolator(n) : this.range(n);
        break;
      default:
        this.domain(n),
          "function" == typeof e ? this.interpolator(e) : this.range(e);
    }
    return this;
  }
  var Hi,
    Fi = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function Oi(n) {
    if (!(e = Fi.exec(n))) throw new Error("invalid format: " + n);
    var e;
    return new ji({
      fill: e[1],
      align: e[2],
      sign: e[3],
      symbol: e[4],
      zero: e[5],
      width: e[6],
      comma: e[7],
      precision: e[8] && e[8].slice(1),
      trim: e[9],
      type: e[10],
    });
  }
  function ji(n) {
    (this.fill = void 0 === n.fill ? " " : n.fill + ""),
      (this.align = void 0 === n.align ? ">" : n.align + ""),
      (this.sign = void 0 === n.sign ? "-" : n.sign + ""),
      (this.symbol = void 0 === n.symbol ? "" : n.symbol + ""),
      (this.zero = !!n.zero),
      (this.width = void 0 === n.width ? void 0 : +n.width),
      (this.comma = !!n.comma),
      (this.precision = void 0 === n.precision ? void 0 : +n.precision),
      (this.trim = !!n.trim),
      (this.type = void 0 === n.type ? "" : n.type + "");
  }
  function Ki(n, e) {
    if (
      (t = (n = e ? n.toExponential(e - 1) : n.toExponential()).indexOf("e")) <
      0
    )
      return null;
    var t,
      r = n.slice(0, t);
    return [r.length > 1 ? r[0] + r.slice(2) : r, +n.slice(t + 1)];
  }
  function zi(n) {
    return (n = Ki(Math.abs(n))) ? n[1] : NaN;
  }
  function Vi(n, e) {
    var t = Ki(n, e);
    if (!t) return n + "";
    var r = t[0],
      o = t[1];
    return o < 0
      ? "0." + new Array(-o).join("0") + r
      : r.length > o + 1
      ? r.slice(0, o + 1) + "." + r.slice(o + 1)
      : r + new Array(o - r.length + 2).join("0");
  }
  (Oi.prototype = ji.prototype),
    (ji.prototype.toString = function () {
      return (
        this.fill +
        this.align +
        this.sign +
        this.symbol +
        (this.zero ? "0" : "") +
        (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) +
        (this.comma ? "," : "") +
        (void 0 === this.precision
          ? ""
          : "." + Math.max(0, 0 | this.precision)) +
        (this.trim ? "~" : "") +
        this.type
      );
    });
  const $i = {
    "%": (n, e) => (100 * n).toFixed(e),
    b: (n) => Math.round(n).toString(2),
    c: (n) => n + "",
    d: function (n) {
      return Math.abs((n = Math.round(n))) >= 1e21
        ? n.toLocaleString("en").replace(/,/g, "")
        : n.toString(10);
    },
    e: (n, e) => n.toExponential(e),
    f: (n, e) => n.toFixed(e),
    g: (n, e) => n.toPrecision(e),
    o: (n) => Math.round(n).toString(8),
    p: (n, e) => Vi(100 * n, e),
    r: Vi,
    s: function (n, e) {
      var t = Ki(n, e);
      if (!t) return n + "";
      var r = t[0],
        o = t[1],
        a = o - (Hi = 3 * Math.max(-8, Math.min(8, Math.floor(o / 3)))) + 1,
        i = r.length;
      return a === i
        ? r
        : a > i
        ? r + new Array(a - i + 1).join("0")
        : a > 0
        ? r.slice(0, a) + "." + r.slice(a)
        : "0." + new Array(1 - a).join("0") + Ki(n, Math.max(0, e + a - 1))[0];
    },
    X: (n) => Math.round(n).toString(16).toUpperCase(),
    x: (n) => Math.round(n).toString(16),
  };
  function Wi(n) {
    return n;
  }
  var Xi,
    qi,
    Yi,
    Zi = Array.prototype.map,
    Ji = [
      "y",
      "z",
      "a",
      "f",
      "p",
      "n",
      "µ",
      "m",
      "",
      "k",
      "M",
      "G",
      "T",
      "P",
      "E",
      "Z",
      "Y",
    ];
  function Qi(n) {
    var e = n.domain;
    return (
      (n.ticks = function (n) {
        var t = e();
        return _(t[0], t[t.length - 1], null == n ? 10 : n);
      }),
      (n.tickFormat = function (n, t) {
        var r = e();
        return (function (n, e, t, r) {
          var o,
            a = (function (n, e, t) {
              var r = Math.abs(e - n) / Math.max(0, t),
                o = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                a = r / o;
              return (
                a >= c ? (o *= 10) : a >= p ? (o *= 5) : a >= f && (o *= 2),
                e < n ? -o : o
              );
            })(n, e, t);
          switch ((r = Oi(null == r ? ",f" : r)).type) {
            case "s":
              var i = Math.max(Math.abs(n), Math.abs(e));
              return (
                null != r.precision ||
                  isNaN(
                    (o = (function (n, e) {
                      return Math.max(
                        0,
                        3 * Math.max(-8, Math.min(8, Math.floor(zi(e) / 3))) -
                          zi(Math.abs(n))
                      );
                    })(a, i))
                  ) ||
                  (r.precision = o),
                Yi(r, i)
              );
            case "":
            case "e":
            case "g":
            case "p":
            case "r":
              null != r.precision ||
                isNaN(
                  (o = (function (n, e) {
                    return (
                      (n = Math.abs(n)),
                      (e = Math.abs(e) - n),
                      Math.max(0, zi(e) - zi(n)) + 1
                    );
                  })(a, Math.max(Math.abs(n), Math.abs(e))))
                ) ||
                (r.precision = o - ("e" === r.type));
              break;
            case "f":
            case "%":
              null != r.precision ||
                isNaN(
                  (o = (function (n) {
                    return Math.max(0, -zi(Math.abs(n)));
                  })(a))
                ) ||
                (r.precision = o - 2 * ("%" === r.type));
          }
          return qi(r);
        })(r[0], r[r.length - 1], null == n ? 10 : n, t);
      }),
      (n.nice = function (t) {
        null == t && (t = 10);
        var r,
          o,
          a = e(),
          i = 0,
          l = a.length - 1,
          u = a[i],
          s = a[l],
          c = 10;
        for (
          s < u && ((o = u), (u = s), (s = o), (o = i), (i = l), (l = o));
          c-- > 0;

        ) {
          if ((o = d(u, s, t)) === r) return (a[i] = u), (a[l] = s), e(a);
          if (o > 0) (u = Math.floor(u / o) * o), (s = Math.ceil(s / o) * o);
          else {
            if (!(o < 0)) break;
            (u = Math.ceil(u * o) / o), (s = Math.floor(s * o) / o);
          }
          r = o;
        }
        return n;
      }),
      n
    );
  }
  function nl() {
    var n = Gi();
    return (
      (n.copy = function () {
        return Ui(n, nl());
      }),
      Ti.apply(n, arguments),
      Qi(n)
    );
  }
  (Xi = (function (n) {
    var e,
      t,
      r =
        void 0 === n.grouping || void 0 === n.thousands
          ? Wi
          : ((e = Zi.call(n.grouping, Number)),
            (t = n.thousands + ""),
            function (n, r) {
              for (
                var o = n.length, a = [], i = 0, l = e[0], u = 0;
                o > 0 &&
                l > 0 &&
                (u + l + 1 > r && (l = Math.max(1, r - u)),
                a.push(n.substring((o -= l), o + l)),
                !((u += l + 1) > r));

              )
                l = e[(i = (i + 1) % e.length)];
              return a.reverse().join(t);
            }),
      o = void 0 === n.currency ? "" : n.currency[0] + "",
      a = void 0 === n.currency ? "" : n.currency[1] + "",
      i = void 0 === n.decimal ? "." : n.decimal + "",
      l =
        void 0 === n.numerals
          ? Wi
          : (function (n) {
              return function (e) {
                return e.replace(/[0-9]/g, function (e) {
                  return n[+e];
                });
              };
            })(Zi.call(n.numerals, String)),
      u = void 0 === n.percent ? "%" : n.percent + "",
      s = void 0 === n.minus ? "−" : n.minus + "",
      c = void 0 === n.nan ? "NaN" : n.nan + "";
    function p(n) {
      var e = (n = Oi(n)).fill,
        t = n.align,
        p = n.sign,
        f = n.symbol,
        _ = n.zero,
        d = n.width,
        h = n.comma,
        m = n.precision,
        g = n.trim,
        y = n.type;
      "n" === y
        ? ((h = !0), (y = "g"))
        : $i[y] || (void 0 === m && (m = 12), (g = !0), (y = "g")),
        (_ || ("0" === e && "=" === t)) && ((_ = !0), (e = "0"), (t = "="));
      var v =
          "$" === f
            ? o
            : "#" === f && /[boxX]/.test(y)
            ? "0" + y.toLowerCase()
            : "",
        b = "$" === f ? a : /[%p]/.test(y) ? u : "",
        w = $i[y],
        k = /[defgprs%]/.test(y);
      function E(n) {
        var o,
          a,
          u,
          f = v,
          E = b;
        if ("c" === y) (E = w(n) + E), (n = "");
        else {
          var x = (n = +n) < 0 || 1 / n < 0;
          if (
            ((n = isNaN(n) ? c : w(Math.abs(n), m)),
            g &&
              (n = (function (n) {
                n: for (var e, t = n.length, r = 1, o = -1; r < t; ++r)
                  switch (n[r]) {
                    case ".":
                      o = e = r;
                      break;
                    case "0":
                      0 === o && (o = r), (e = r);
                      break;
                    default:
                      if (!+n[r]) break n;
                      o > 0 && (o = 0);
                  }
                return o > 0 ? n.slice(0, o) + n.slice(e + 1) : n;
              })(n)),
            x && 0 == +n && "+" !== p && (x = !1),
            (f =
              (x ? ("(" === p ? p : s) : "-" === p || "(" === p ? "" : p) + f),
            (E =
              ("s" === y ? Ji[8 + Hi / 3] : "") +
              E +
              (x && "(" === p ? ")" : "")),
            k)
          )
            for (o = -1, a = n.length; ++o < a; )
              if (48 > (u = n.charCodeAt(o)) || u > 57) {
                (E = (46 === u ? i + n.slice(o + 1) : n.slice(o)) + E),
                  (n = n.slice(0, o));
                break;
              }
        }
        h && !_ && (n = r(n, 1 / 0));
        var S = f.length + n.length + E.length,
          A = S < d ? new Array(d - S + 1).join(e) : "";
        switch (
          (h &&
            _ &&
            ((n = r(A + n, A.length ? d - E.length : 1 / 0)), (A = "")),
          t)
        ) {
          case "<":
            n = f + n + E + A;
            break;
          case "=":
            n = f + A + n + E;
            break;
          case "^":
            n = A.slice(0, (S = A.length >> 1)) + f + n + E + A.slice(S);
            break;
          default:
            n = A + f + n + E;
        }
        return l(n);
      }
      return (
        (m =
          void 0 === m
            ? 6
            : /[gprs]/.test(y)
            ? Math.max(1, Math.min(21, m))
            : Math.max(0, Math.min(20, m))),
        (E.toString = function () {
          return n + "";
        }),
        E
      );
    }
    return {
      format: p,
      formatPrefix: function (n, e) {
        var t = p((((n = Oi(n)).type = "f"), n)),
          r = 3 * Math.max(-8, Math.min(8, Math.floor(zi(e) / 3))),
          o = Math.pow(10, -r),
          a = Ji[8 + r / 3];
        return function (n) {
          return t(o * n) + a;
        };
      },
    };
  })({ thousands: ",", grouping: [3], currency: ["$", ""] })),
    (qi = Xi.format),
    (Yi = Xi.formatPrefix);
  const el = Symbol("implicit");
  function tl() {
    var n = new Map(),
      e = [],
      t = [],
      r = el;
    function o(o) {
      var a = o + "",
        i = n.get(a);
      if (!i) {
        if (r !== el) return r;
        n.set(a, (i = e.push(o)));
      }
      return t[(i - 1) % t.length];
    }
    return (
      (o.domain = function (t) {
        if (!arguments.length) return e.slice();
        (e = []), (n = new Map());
        for (const r of t) {
          const t = r + "";
          n.has(t) || n.set(t, e.push(r));
        }
        return o;
      }),
      (o.range = function (n) {
        return arguments.length ? ((t = Array.from(n)), o) : t.slice();
      }),
      (o.unknown = function (n) {
        return arguments.length ? ((r = n), o) : r;
      }),
      (o.copy = function () {
        return tl(e, t).unknown(r);
      }),
      Ti.apply(o, arguments),
      o
    );
  }
  function rl() {
    var n,
      e,
      t,
      r,
      o,
      a = 0,
      i = 1,
      l = Li,
      u = !1;
    function s(e) {
      return isNaN((e = +e))
        ? o
        : l(
            0 === t
              ? 0.5
              : ((e = (r(e) - n) * t), u ? Math.max(0, Math.min(1, e)) : e)
          );
    }
    function c(n) {
      return function (e) {
        var t, r;
        return arguments.length
          ? (([t, r] = e), (l = n(t, r)), s)
          : [l(0), l(1)];
      };
    }
    return (
      (s.domain = function (o) {
        return arguments.length
          ? (([a, i] = o),
            (n = r((a = +a))),
            (e = r((i = +i))),
            (t = n === e ? 0 : 1 / (e - n)),
            s)
          : [a, i];
      }),
      (s.clamp = function (n) {
        return arguments.length ? ((u = !!n), s) : u;
      }),
      (s.interpolator = function (n) {
        return arguments.length ? ((l = n), s) : l;
      }),
      (s.range = c(Ge)),
      (s.rangeRound = c(Ri)),
      (s.unknown = function (n) {
        return arguments.length ? ((o = n), s) : o;
      }),
      function (o) {
        return (
          (r = o), (n = o(a)), (e = o(i)), (t = n === e ? 0 : 1 / (e - n)), s
        );
      }
    );
  }
  function ol(n, e) {
    return e
      .domain(n.domain())
      .interpolator(n.interpolator())
      .clamp(n.clamp())
      .unknown(n.unknown());
  }
  function al() {
    var n = Qi(rl()(Li));
    return (
      (n.copy = function () {
        return ol(n, al());
      }),
      Ii.apply(n, arguments)
    );
  }
  function il(n) {
    for (var e = (n.length / 6) | 0, t = new Array(e), r = 0; r < e; )
      t[r] = "#" + n.slice(6 * r, 6 * ++r);
    return t;
  }
  const ll = il("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
    ul = (n) => Me(n[n.length - 1]),
    sl = ul(
      new Array(3)
        .concat(
          "deebf79ecae13182bd",
          "eff3ffbdd7e76baed62171b5",
          "eff3ffbdd7e76baed63182bd08519c",
          "eff3ffc6dbef9ecae16baed63182bd08519c",
          "eff3ffc6dbef9ecae16baed64292c62171b5084594",
          "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
          "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
        )
        .map(il)
    ),
    cl = ul(
      new Array(3)
        .concat(
          "e5f5e0a1d99b31a354",
          "edf8e9bae4b374c476238b45",
          "edf8e9bae4b374c47631a354006d2c",
          "edf8e9c7e9c0a1d99b74c47631a354006d2c",
          "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
          "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
          "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
        )
        .map(il)
    ),
    pl = Math.PI / 180,
    fl = 180 / Math.PI;
  var _l = -0.14861,
    dl = 1.78277,
    hl = -0.29227,
    ml = -0.90649,
    gl = 1.97294,
    yl = gl * ml,
    vl = gl * dl,
    bl = dl * hl - ml * _l;
  function wl(n) {
    if (n instanceof El) return new El(n.h, n.s, n.l, n.opacity);
    n instanceof _e || (n = pe(n));
    var e = n.r / 255,
      t = n.g / 255,
      r = n.b / 255,
      o = (bl * r + yl * e - vl * t) / (bl + yl - vl),
      a = r - o,
      i = (gl * (t - o) - hl * a) / ml,
      l = Math.sqrt(i * i + a * a) / (gl * o * (1 - o)),
      u = l ? Math.atan2(i, a) * fl - 120 : NaN;
    return new El(u < 0 ? u + 360 : u, l, o, n.opacity);
  }
  function kl(n, e, t, r) {
    return 1 === arguments.length ? wl(n) : new El(n, e, t, null == r ? 1 : r);
  }
  function El(n, e, t, r) {
    (this.h = +n), (this.s = +e), (this.l = +t), (this.opacity = +r);
  }
  function xl(n) {
    return (function e(t) {
      function r(e, r) {
        var o = n((e = kl(e)).h, (r = kl(r)).h),
          a = xe(e.s, r.s),
          i = xe(e.l, r.l),
          l = xe(e.opacity, r.opacity);
        return function (n) {
          return (
            (e.h = o(n)),
            (e.s = a(n)),
            (e.l = i(Math.pow(n, t))),
            (e.opacity = l(n)),
            e + ""
          );
        };
      }
      return (t = +t), (r.gamma = e), r;
    })(1);
  }
  zn(
    El,
    kl,
    Vn($n, {
      brighter: function (n) {
        return (
          (n = null == n ? Xn : Math.pow(Xn, n)),
          new El(this.h, this.s, this.l * n, this.opacity)
        );
      },
      darker: function (n) {
        return (
          (n = null == n ? Wn : Math.pow(Wn, n)),
          new El(this.h, this.s, this.l * n, this.opacity)
        );
      },
      rgb: function () {
        var n = isNaN(this.h) ? 0 : (this.h + 120) * pl,
          e = +this.l,
          t = isNaN(this.s) ? 0 : this.s * e * (1 - e),
          r = Math.cos(n),
          o = Math.sin(n);
        return new _e(
          255 * (e + t * (_l * r + dl * o)),
          255 * (e + t * (hl * r + ml * o)),
          255 * (e + t * (gl * r)),
          this.opacity
        );
      },
    })
  ),
    xl(function (n, e) {
      var t = e - n;
      return t
        ? Ee(n, t > 180 || t < -180 ? t - 360 * Math.round(t / 360) : t)
        : ke(isNaN(n) ? e : n);
    });
  var Sl = xl(xe),
    Al =
      (Sl(kl(-100, 0.75, 0.35), kl(80, 1.5, 0.8)),
      Sl(kl(260, 0.75, 0.35), kl(80, 1.5, 0.8)),
      kl());
  function Ml(n) {
    (n < 0 || n > 1) && (n -= Math.floor(n));
    var e = Math.abs(n - 0.5);
    return (
      (Al.h = 360 * n - 100),
      (Al.s = 1.5 - 1.5 * e),
      (Al.l = 0.8 - 0.9 * e),
      Al + ""
    );
  }
  function Rl(n, e, t) {
    (this.k = n), (this.x = e), (this.y = t);
  }
  (Rl.prototype = {
    constructor: Rl,
    scale: function (n) {
      return 1 === n ? this : new Rl(this.k * n, this.x, this.y);
    },
    translate: function (n, e) {
      return (0 === n) & (0 === e)
        ? this
        : new Rl(this.k, this.x + this.k * n, this.y + this.k * e);
    },
    apply: function (n) {
      return [n[0] * this.k + this.x, n[1] * this.k + this.y];
    },
    applyX: function (n) {
      return n * this.k + this.x;
    },
    applyY: function (n) {
      return n * this.k + this.y;
    },
    invert: function (n) {
      return [(n[0] - this.x) / this.k, (n[1] - this.y) / this.k];
    },
    invertX: function (n) {
      return (n - this.x) / this.k;
    },
    invertY: function (n) {
      return (n - this.y) / this.k;
    },
    rescaleX: function (n) {
      return n
        .copy()
        .domain(n.range().map(this.invertX, this).map(n.invert, n));
    },
    rescaleY: function (n) {
      return n
        .copy()
        .domain(n.range().map(this.invertY, this).map(n.invert, n));
    },
    toString: function () {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    },
  }),
    new Rl(1, 0, 0),
    Rl.prototype;
  const Nl = window.innerHeight,
    Cl = window.innerWidth;
  function Ll(n, e) {
    const t = {};
    return (
      n.forEach((n) => {
        n[e].forEach((n) => {
          t[n] ? (t[n] += 1) : (t[n] = 1);
        });
      }),
      Object.entries(t)
        .map(([n, e]) => ({ word: n, val: e }))
        .filter((n) => 1 != n.val)
    );
  }
  function Bl(n) {
    const e = {};
    for (const t of n)
      e[t.creatorCountry]
        ? (e[t.creatorCountry] += 1)
        : (e[t.creatorCountry] = 1);
    return e;
  }
  function Dl(n, e) {
    n.each(function () {
      for (
        var n,
          t = Fn(this),
          r = t.text().split(/\s+/).reverse(),
          o = [],
          a = t.attr("x"),
          i = t.attr("y"),
          l = t.text(null).append("tspan").attr("x", a).attr("y", i);
        (n = r.pop());

      )
        o.push(n),
          l.text(o.join(" ")),
          l.node().getComputedTextLength() > e &&
            (o.pop(),
            l.text(o.join(" ")),
            (o = [n]),
            (l = t
              .append("tspan")
              .attr("x", 0)
              .attr("y", i)
              .attr("dy", "1.1em")
              .text(n)));
    });
  }
  function Pl(n) {
    return !n || /^\s*$/.test(n);
  }
  function Ul(n, e) {
    if (n === e) return !0;
    if (null == n || null == e) return !1;
    if (n.length !== e.length) return !1;
    for (var t = 0; t < n.length; ++t) if (n[t] !== e[t]) return !1;
    return !0;
  }
  const Gl = JSON.parse(
    '{"R":[{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Albania","sov_a3":"ALB","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Albania","adm0_a3":"ALB","geou_dif":0,"geounit":"Albania","gu_a3":"ALB","su_dif":0,"subunit":"Albania","su_a3":"ALB","brk_diff":0,"name":"Albania","name_long":"Albania","brk_a3":"ALB","brk_name":"Albania","brk_group":null,"abbrev":"Alb.","postal":"AL","formal_en":"Republic of Albania","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Albania","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":1,"mapcolor13":6,"pop_est":3639453,"gdp_md_est":21810,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"AL","iso_a3":"ALB","iso_n3":"008","un_a3":"008","wb_a2":"AL","wb_a3":"ALB","woe_id":-99,"adm0_a3_is":"ALB","adm0_a3_us":"ALB","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"ALB.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.590247430104906,41.855404161133606],[20.463175083099202,41.51508901627533],[20.605181919037364,41.08622630468522],[21.0200403174764,40.84272695572588],[20.999989861747224,40.58000397395397],[20.674996779063633,40.43499990494303],[20.615000441172754,40.11000682225938],[20.15001590341052,39.62499766698397],[19.980000441170144,39.69499339452341],[19.960001661873207,39.91500580500605],[19.406081984136733,40.250773423822466],[19.319058872157143,40.72723012955356],[19.40354983895429,41.40956574153546],[19.540027296637106,41.71998607031276],[19.37176883309496,41.877547512370654],[19.304486118250793,42.19574514420782],[19.738051385179627,42.688247382165564],[19.801613396898688,42.50009349219084],[20.0707,42.58863],[20.283754510181893,42.32025950781508],[20.52295,42.21787],[20.590247430104906,41.855404161133606]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Austria","sov_a3":"AUT","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Austria","adm0_a3":"AUT","geou_dif":0,"geounit":"Austria","gu_a3":"AUT","su_dif":0,"subunit":"Austria","su_a3":"AUT","brk_diff":0,"name":"Austria","name_long":"Austria","brk_a3":"AUT","brk_name":"Austria","brk_group":null,"abbrev":"Aust.","postal":"A","formal_en":"Republic of Austria","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Austria","name_alt":null,"mapcolor7":3,"mapcolor8":1,"mapcolor9":3,"mapcolor13":4,"pop_est":8210281,"gdp_md_est":329500,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"AT","iso_a3":"AUT","iso_n3":"040","un_a3":"040","wb_a2":"AT","wb_a3":"AUT","woe_id":-99,"adm0_a3_is":"AUT","adm0_a3_us":"AUT","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"AUT.geojson"},"geometry":{"type":"Polygon","coordinates":[[[16.979666782304037,48.123497015976305],[16.90375410326726,47.71486562762833],[16.340584344150415,47.71290192320123],[16.534267612380376,47.49617096616912],[16.202298211337364,46.85238597267696],[16.011663852612656,46.6836107448117],[15.137091912504985,46.65870270444703],[14.63247155117483,46.43181732846955],[13.806475457421527,46.509306138691215],[12.376485223040817,46.76755910906985],[12.153088006243054,47.11539317482645],[11.16482791509327,46.94157949481273],[11.048555942436536,46.75135854754634],[10.44270145024663,46.89354625099743],[9.932448357796659,46.92072805438296],[9.479969516649021,47.10280996356337],[9.632931756232978,47.34760122332999],[9.59422610844635,47.52505809182027],[9.896068149463188,47.580196845075704],[10.402083774465211,47.30248769793916],[10.544504021861627,47.56639923765377],[11.426414015354737,47.523766181012974],[12.141357456112788,47.703083401065776],[12.620759718484491,47.67238760028441],[12.932626987365948,47.467645575544],[13.02585127122049,47.637583523135824],[12.884102817443903,48.28914581968792],[13.243357374737,48.416114813829054],[13.595945672264437,48.87717194273715],[14.33889773932472,48.5553052842072],[14.901447381254057,48.964401760445824],[15.253415561593982,49.039074205107575],[16.02964725105022,48.73389903420793],[16.49928266771877,48.78580801044511],[16.960288120194576,48.5969823268506],[16.879982944413,48.47001333270947],[16.979666782304037,48.123497015976305]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Belgium","sov_a3":"BEL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Belgium","adm0_a3":"BEL","geou_dif":0,"geounit":"Belgium","gu_a3":"BEL","su_dif":0,"subunit":"Belgium","su_a3":"BEL","brk_diff":0,"name":"Belgium","name_long":"Belgium","brk_a3":"BEL","brk_name":"Belgium","brk_group":null,"abbrev":"Belg.","postal":"B","formal_en":"Kingdom of Belgium","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Belgium","name_alt":null,"mapcolor7":3,"mapcolor8":2,"mapcolor9":1,"mapcolor13":8,"pop_est":10414336,"gdp_md_est":389300,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"BE","iso_a3":"BEL","iso_n3":"056","un_a3":"056","wb_a2":"BE","wb_a3":"BEL","woe_id":-99,"adm0_a3_is":"BEL","adm0_a3_us":"BEL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"BEL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[3.314971144228537,51.345780951536085],[4.047071160507527,51.26725861266857],[4.973991326526914,51.475023708698124],[5.606975945670001,51.037298488969775],[6.156658155958779,50.80372101501058],[6.043073357781111,50.128051662794235],[5.782417433300906,50.09032786722122],[5.674051954784829,49.529483547557504],[4.799221632515809,49.985373033236385],[4.286022983425084,49.907496649772554],[3.588184441755686,50.37899241800358],[3.123251580425801,50.780363267614575],[2.658422071960274,50.79684804951574],[2.513573032246143,51.14850617126183],[3.314971144228537,51.345780951536085]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Bosnia and Herzegovina","sov_a3":"BIH","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Bosnia and Herzegovina","adm0_a3":"BIH","geou_dif":0,"geounit":"Bosnia and Herzegovina","gu_a3":"BIH","su_dif":0,"subunit":"Bosnia and Herzegovina","su_a3":"BIH","brk_diff":0,"name":"Bosnia and Herz.","name_long":"Bosnia and Herzegovina","brk_a3":"BIH","brk_name":"Bosnia and Herz.","brk_group":null,"abbrev":"B.H.","postal":"BiH","formal_en":"Bosnia and Herzegovina","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Bosnia and Herzegovina","name_alt":null,"mapcolor7":1,"mapcolor8":1,"mapcolor9":1,"mapcolor13":2,"pop_est":4613414,"gdp_md_est":29700,"pop_year":-99,"lastcensus":1991,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"BA","iso_a3":"BIH","iso_n3":"070","un_a3":"070","wb_a2":"BA","wb_a3":"BIH","woe_id":-99,"adm0_a3_is":"BIH","adm0_a3_us":"BIH","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":16,"long_len":22,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"BIH.geojson"},"geometry":{"type":"Polygon","coordinates":[[[19.00548628101012,44.86023366960916],[19.36803,44.863],[19.11761,44.42307000000011],[19.59976,44.03847],[19.454,43.56810000000013],[19.21852,43.52384],[19.03165,43.43253],[18.70648,43.20011],[18.56,42.65],[17.674921502358984,43.02856252702361],[17.297373488034452,43.44634064388736],[16.91615644701733,43.66772247982567],[16.456442905348865,44.04123973243128],[16.23966027188453,44.35114329688571],[15.750026075918981,44.81871165626256],[15.959367303133376,45.233776760430935],[16.318156772535872,45.00412669532591],[16.534939406000206,45.21160757097772],[17.002146030351014,45.233776760430935],[17.861783481526402,45.067740383477144],[18.553214145591653,45.08158966733145],[19.00548628101012,44.86023366960916]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Belarus","sov_a3":"BLR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Belarus","adm0_a3":"BLR","geou_dif":0,"geounit":"Belarus","gu_a3":"BLR","su_dif":0,"subunit":"Belarus","su_a3":"BLR","brk_diff":0,"name":"Belarus","name_long":"Belarus","brk_a3":"BLR","brk_name":"Belarus","brk_group":null,"abbrev":"Bela.","postal":"BY","formal_en":"Republic of Belarus","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Belarus","name_alt":null,"mapcolor7":1,"mapcolor8":1,"mapcolor9":5,"mapcolor13":11,"pop_est":9648533,"gdp_md_est":114100,"pop_year":-99,"lastcensus":2009,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"BY","iso_a3":"BLR","iso_n3":"112","un_a3":"112","wb_a2":"BY","wb_a3":"BLR","woe_id":-99,"adm0_a3_is":"BLR","adm0_a3_us":"BLR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"BLR.geojson"},"geometry":{"type":"Polygon","coordinates":[[[23.48412763844985,53.91249766704114],[24.450683628037037,53.905702216194754],[25.536353794056993,54.28242340760253],[25.7684326514798,54.84696259217509],[26.58827924979039,55.16717560487167],[26.494331495883753,55.615106919977634],[27.10245975109453,55.783313707087686],[28.176709425577993,56.16912995057881],[29.229513380660308,55.918344224666356],[29.371571893030673,55.670090643936184],[29.896294386522356,55.78946320253041],[30.873909132620007,55.55097646750341],[30.971835971813135,55.08154775656404],[30.757533807098717,54.81177094178432],[31.38447228366374,54.157056382862436],[31.79142418796224,53.97463857687212],[31.731272820774507,53.79402944601202],[32.405598585751164,53.618045355842035],[32.69364301934604,53.35142080343212],[32.304519484188226,53.1327261419729],[31.49764367038293,53.1674268662569],[31.305200636528014,53.07399587667321],[31.54001834486226,52.74205231384636],[31.785998162571587,52.101677964885454],[30.927549269338982,52.04235342061438],[30.619454380014844,51.822806098022376],[30.555117221811457,51.31950348571566],[30.157363722460897,51.41613841410147],[29.254938185347925,51.368234361366895],[28.99283532076353,51.602044379271476],[28.61761274589225,51.42771393493484],[28.24161502453657,51.57222707783907],[27.454066196408434,51.59230337178447],[26.337958611768556,51.83228872334793],[25.327787713327005,51.91065603291855],[24.553106316839518,51.888461005249184],[24.00507775238421,51.61744395609446],[23.52707075368437,51.57845408793023],[23.508002150168693,52.02364655212473],[23.199493849386187,52.486977444053664],[23.799198846133375,52.69109935160657],[23.80493493011778,53.089731350306074],[23.527535841575002,53.470121568406555],[23.48412763844985,53.91249766704114]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Bulgaria","sov_a3":"BGR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Bulgaria","adm0_a3":"BGR","geou_dif":0,"geounit":"Bulgaria","gu_a3":"BGR","su_dif":0,"subunit":"Bulgaria","su_a3":"BGR","brk_diff":0,"name":"Bulgaria","name_long":"Bulgaria","brk_a3":"BGR","brk_name":"Bulgaria","brk_group":null,"abbrev":"Bulg.","postal":"BG","formal_en":"Republic of Bulgaria","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Bulgaria","name_alt":null,"mapcolor7":4,"mapcolor8":5,"mapcolor9":1,"mapcolor13":8,"pop_est":7204687,"gdp_md_est":93750,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"BG","iso_a3":"BGR","iso_n3":"100","un_a3":"100","wb_a2":"BG","wb_a3":"BGR","woe_id":-99,"adm0_a3_is":"BGR","adm0_a3_us":"BGR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"BGR.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.65714969248299,44.23492300066128],[22.944832391051847,43.82378530534713],[23.33230228037632,43.89701080990471],[24.100679152124172,43.74105133724785],[25.569271681426926,43.68844472917472],[26.065158725699746,43.94349376075126],[27.242399529740908,44.175986029632405],[27.970107049275075,43.81246816667521],[28.558081495891997,43.70746165625813],[28.03909508638472,43.293171698574184],[27.67389773937805,42.577892361006214],[27.99672041190539,42.00735871028779],[27.135739373490477,42.14148489030134],[26.117041863720797,41.82690460872456],[26.106138136507212,41.32889883072778],[25.197201368925445,41.23448598893053],[24.49264489105803,41.583896185872035],[23.692073601992348,41.30908091894385],[22.952377150166452,41.33799388281115],[22.88137373219743,41.99929718685026],[22.380525750424592,42.32025950781509],[22.54501183440962,42.46136200618804],[22.43659467946128,42.580321153323936],[22.60480146657133,42.898518785161144],[22.986018507588483,43.211161200526966],[22.50015669118028,43.64281443946099],[22.410446404721597,44.00806346289995],[22.65714969248299,44.23492300066128]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Switzerland","sov_a3":"CHE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Switzerland","adm0_a3":"CHE","geou_dif":0,"geounit":"Switzerland","gu_a3":"CHE","su_dif":0,"subunit":"Switzerland","su_a3":"CHE","brk_diff":0,"name":"Switzerland","name_long":"Switzerland","brk_a3":"CHE","brk_name":"Switzerland","brk_group":null,"abbrev":"Switz.","postal":"CH","formal_en":"Swiss Confederation","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Switzerland","name_alt":null,"mapcolor7":5,"mapcolor8":2,"mapcolor9":7,"mapcolor13":3,"pop_est":7604467,"gdp_md_est":316700,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"CH","iso_a3":"CHE","iso_n3":"756","un_a3":"756","wb_a2":"CH","wb_a3":"CHE","woe_id":-99,"adm0_a3_is":"CHE","adm0_a3_us":"CHE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":11,"long_len":11,"abbrev_len":6,"tiny":-99,"homepart":1,"filename":"CHE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[9.59422610844635,47.52505809182027],[9.632931756232978,47.34760122332999],[9.479969516649021,47.10280996356337],[9.932448357796659,46.92072805438296],[10.44270145024663,46.89354625099743],[10.363378126678612,46.48357127540986],[9.92283654139038,46.31489940040919],[9.182881707403055,46.44021474871698],[8.966305779667806,46.036931871111186],[8.489952426801324,46.005150865251686],[8.31662967289438,46.16364248309086],[7.755992058959833,45.82449005795931],[7.273850945676656,45.776947740250776],[6.843592970414504,45.99114655210061],[6.500099724970425,46.42967275652944],[6.022609490593537,46.27298981382047],[6.037388950229001,46.725778713561866],[6.768713820023606,47.2877082383037],[6.736571079138059,47.541801255882845],[7.192202182655507,47.44976552997102],[7.46675906742223,47.62058197691181],[8.317301466514152,47.61357982033626],[8.522611932009765,47.830827541691285],[9.59422610844635,47.52505809182027]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Czech Republic","sov_a3":"CZE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Czech Republic","adm0_a3":"CZE","geou_dif":0,"geounit":"Czech Republic","gu_a3":"CZE","su_dif":0,"subunit":"Czech Republic","su_a3":"CZE","brk_diff":0,"name":"Czech Rep.","name_long":"Czech Republic","brk_a3":"CZE","brk_name":"Czech Rep.","brk_group":null,"abbrev":"Cz. Rep.","postal":"CZ","formal_en":"Czech Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Czech Republic","name_alt":null,"mapcolor7":1,"mapcolor8":1,"mapcolor9":2,"mapcolor13":6,"pop_est":10211904,"gdp_md_est":265200,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"CZ","iso_a3":"CZE","iso_n3":"203","un_a3":"203","wb_a2":"CZ","wb_a3":"CZE","woe_id":-99,"adm0_a3_is":"CZE","adm0_a3_us":"CZE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":10,"long_len":14,"abbrev_len":8,"tiny":-99,"homepart":1,"filename":"CZE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[16.960288120194576,48.5969823268506],[16.49928266771877,48.78580801044511],[16.02964725105022,48.73389903420793],[15.253415561593982,49.039074205107575],[14.901447381254057,48.964401760445824],[14.33889773932472,48.5553052842072],[13.595945672264437,48.87717194273715],[13.031328973043431,49.30706818297324],[12.521024204161192,49.547415269562734],[12.415190870827445,49.96912079528057],[12.240111118222558,50.266337795607285],[12.966836785543194,50.484076443069085],[13.338131951560285,50.73323436136435],[14.056227654688172,50.92691762959429],[14.307013380600637,51.117267767941414],[14.570718214586066,51.002339382524276],[15.01699588385867,51.10667409932158],[15.490972120839727,50.78472992614321],[16.23862674323857,50.69773265237984],[16.176253289462267,50.42260732685791],[16.719475945714436,50.21574656839354],[16.868769158605655,50.47397370055603],[17.55456709155112,50.36214590107641],[17.64944502123899,50.049038397819956],[18.392913852622172,49.98862864847075],[18.853144158613617,49.49622976337764],[18.554971144289482,49.49501536721878],[18.399993523846177,49.31500051533004],[18.170498488037964,49.271514797556435],[18.104972771891852,49.04398346617531],[17.913511590250465,48.996492824899086],[17.88648481616181,48.90347524677371],[17.545006951577108,48.80001902932537],[17.101984897538898,48.81696889911711],[16.960288120194576,48.5969823268506]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Germany","sov_a3":"DEU","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Germany","adm0_a3":"DEU","geou_dif":0,"geounit":"Germany","gu_a3":"DEU","su_dif":0,"subunit":"Germany","su_a3":"DEU","brk_diff":0,"name":"Germany","name_long":"Germany","brk_a3":"DEU","brk_name":"Germany","brk_group":null,"abbrev":"Ger.","postal":"D","formal_en":"Federal Republic of Germany","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Germany","name_alt":null,"mapcolor7":2,"mapcolor8":5,"mapcolor9":5,"mapcolor13":1,"pop_est":82329758,"gdp_md_est":2918000,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"DE","iso_a3":"DEU","iso_n3":"276","un_a3":"276","wb_a2":"DE","wb_a3":"DEU","woe_id":-99,"adm0_a3_is":"DEU","adm0_a3_us":"DEU","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"DEU.geojson"},"geometry":{"type":"Polygon","coordinates":[[[9.921906365609232,54.983104153048025],[9.9395797054529,54.596641954153256],[10.950112338920519,54.363607082733154],[10.939466993868448,54.00869334575258],[11.956252475643282,54.19648550070116],[12.518440382546714,54.47037059184799],[13.647467075259499,54.0755109727059],[14.119686313542559,53.75702912049103],[14.353315463934168,53.248171291713106],[14.074521111719434,52.98126251892535],[14.4375997250022,52.624850165408304],[14.685026482815713,52.089947414755216],[14.607098422919648,51.745188096719964],[15.016995883858781,51.10667409932171],[14.570718214586122,51.00233938252438],[14.307013380600665,51.11726776794137],[14.056227654688314,50.92691762959435],[13.338131951560397,50.73323436136428],[12.96683678554325,50.48407644306917],[12.240111118222671,50.26633779560723],[12.415190870827473,49.96912079528062],[12.521024204161336,49.54741526956275],[13.031328973043514,49.30706818297324],[13.595945672264577,48.877171942737164],[13.243357374737116,48.41611481382903],[12.884102817443873,48.28914581968786],[13.025851271220517,47.63758352313595],[12.932626987366064,47.467645575544],[12.620759718484521,47.672387600284424],[12.141357456112871,47.70308340106578],[11.426414015354851,47.52376618101306],[10.544504021861597,47.5663992376538],[10.402083774465325,47.30248769793916],[9.896068149463188,47.580196845075704],[9.594226108446376,47.5250580918202],[8.522611932009795,47.83082754169135],[8.317301466514095,47.61357982033627],[7.466759067422288,47.62058197691192],[7.593676385131062,48.33301911070373],[8.099278598674855,49.01778351500343],[6.658229607783709,49.20195831969164],[6.186320428094177,49.463802802114515],[6.242751092156993,49.90222565367873],[6.043073357781111,50.128051662794235],[6.156658155958779,50.80372101501058],[5.988658074577813,51.851615709025054],[6.589396599970826,51.852029120483394],[6.842869500362383,52.22844025329755],[7.092053256873896,53.14404328064489],[6.905139601274129,53.48216217713064],[7.100424838905268,53.69393219666267],[7.936239454793962,53.74829580343379],[8.121706170289485,53.52779246684429],[8.800734490604668,54.020785630908904],[8.572117954145368,54.39564647075405],[8.526229282270208,54.96274363872516],[9.282048780971136,54.83086538351631],[9.921906365609232,54.983104153048025]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Denmark","sov_a3":"DN1","adm0_dif":1,"level":2,"type":"Country","admin":"Denmark","adm0_a3":"DNK","geou_dif":0,"geounit":"Denmark","gu_a3":"DNK","su_dif":0,"subunit":"Denmark","su_a3":"DNK","brk_diff":0,"name":"Denmark","name_long":"Denmark","brk_a3":"DNK","brk_name":"Denmark","brk_group":null,"abbrev":"Den.","postal":"DK","formal_en":"Kingdom of Denmark","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Denmark","name_alt":null,"mapcolor7":4,"mapcolor8":1,"mapcolor9":3,"mapcolor13":12,"pop_est":5500510,"gdp_md_est":203600,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"DK","iso_a3":"DNK","iso_n3":"208","un_a3":"208","wb_a2":"DK","wb_a3":"DNK","woe_id":-99,"adm0_a3_is":"DNK","adm0_a3_us":"DNK","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"DNK.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[12.69000613775563,55.609990953180784],[12.089991082414741,54.80001455343793],[11.043543328504228,55.364863796604254],[10.903913608451631,55.77995473898875],[12.370904168353292,56.111407375708836],[12.69000613775563,55.609990953180784]]],[[[10.912181837618363,56.458621324277914],[10.667803989309988,56.08138336854722],[10.369992710011985,56.19000722922473],[9.649984978889307,55.469999498102055],[9.921906365609175,54.98310415304806],[9.282048780971136,54.83086538351616],[8.526229282270236,54.96274363872499],[8.120310906617588,55.517722683323626],[8.08997684086225,56.540011705137594],[8.256581658571264,56.8099693874303],[8.543437534223386,57.110002753316905],[9.42446902836761,57.17206614849948],[9.775558709358563,57.447940782289656],[10.580005730846153,57.73001658795485],[10.546105991262692,57.215732733786155],[10.250000034230226,56.89001618105047],[10.369992710011985,56.609981594460834],[10.912181837618363,56.458621324277914]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Spain","sov_a3":"ESP","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Spain","adm0_a3":"ESP","geou_dif":0,"geounit":"Spain","gu_a3":"ESP","su_dif":0,"subunit":"Spain","su_a3":"ESP","brk_diff":0,"name":"Spain","name_long":"Spain","brk_a3":"ESP","brk_name":"Spain","brk_group":null,"abbrev":"Sp.","postal":"E","formal_en":"Kingdom of Spain","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Spain","name_alt":null,"mapcolor7":4,"mapcolor8":5,"mapcolor9":5,"mapcolor13":5,"pop_est":40525002,"gdp_md_est":1403000,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"ES","iso_a3":"ESP","iso_n3":"724","un_a3":"724","wb_a2":"ES","wb_a3":"ESP","woe_id":-99,"adm0_a3_is":"ESP","adm0_a3_us":"ESP","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":5,"long_len":5,"abbrev_len":3,"tiny":-99,"homepart":1,"filename":"ESP.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-9.034817674180246,41.88057058365967],[-8.984433152695672,42.59277517350627],[-9.392883673530648,43.0266246608127],[-7.978189663108309,43.748337714200986],[-6.754491746436756,43.567909450853925],[-5.411886359061596,43.574239813809676],[-4.347842779955783,43.40344920508504],[-3.51753170410609,43.4559007838613],[-1.901351284177764,43.42280202897834],[-1.502770961910528,43.03401439063043],[0.338046909190581,42.57954600683954],[0.701590610363894,42.7957343613326],[1.826793247087153,42.34338471126569],[2.985998976258458,42.47301504166986],[3.039484083680549,41.892120266276905],[2.091841668312185,41.22608856868309],[0.810524529635188,41.01473196060934],[0.721331007499401,40.678318386389236],[0.106691521819869,40.12393362076202],[-0.278711310212941,39.30997813573272],[0.111290724293838,38.73851430923303],[-0.467123582349103,38.29236583104115],[-0.683389451490598,37.642353827457825],[-1.438382127274849,37.443063666324214],[-2.146452602538119,36.67414419203728],[-3.415780808923387,36.65889964451118],[-4.368900926114719,36.677839056946155],[-4.995219285492211,36.32470815687964],[-5.377159796561457,35.946850083961465],[-5.866432257500904,36.02981659600606],[-6.236693894872175,36.367677110330334],[-6.520190802425404,36.94291331638732],[-7.453725551778092,37.09778758396607],[-7.537105475281024,37.42890432387623],[-7.166507941099865,37.803894354802225],[-7.029281175148796,38.07576406508977],[-7.374092169616318,38.37305858006492],[-7.098036668313128,39.03007274022378],[-7.498632371439725,39.62957103124181],[-7.066591559263529,39.71189158788277],[-7.026413133156595,40.184524237624245],[-6.864019944679385,40.33087189387483],[-6.851126674822552,41.11108266861753],[-6.389087693700915,41.381815497394655],[-6.668605515967656,41.883386949219584],[-7.251308966490824,41.91834605566505],[-7.422512986673795,41.79207469335983],[-8.013174607769912,41.790886135417125],[-8.263856980817792,42.28046865495034],[-8.67194576662672,42.13468943945496],[-9.034817674180246,41.88057058365967]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Estonia","sov_a3":"EST","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Estonia","adm0_a3":"EST","geou_dif":0,"geounit":"Estonia","gu_a3":"EST","su_dif":0,"subunit":"Estonia","su_a3":"EST","brk_diff":0,"name":"Estonia","name_long":"Estonia","brk_a3":"EST","brk_name":"Estonia","brk_group":null,"abbrev":"Est.","postal":"EST","formal_en":"Republic of Estonia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Estonia","name_alt":null,"mapcolor7":3,"mapcolor8":2,"mapcolor9":1,"mapcolor13":10,"pop_est":1299371,"gdp_md_est":27410,"pop_year":-99,"lastcensus":2000,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"EE","iso_a3":"EST","iso_n3":"233","un_a3":"233","wb_a2":"EE","wb_a3":"EST","woe_id":-99,"adm0_a3_is":"EST","adm0_a3_us":"EST","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"EST.geojson"},"geometry":{"type":"Polygon","coordinates":[[[24.312862583114622,57.79342357037698],[24.42892785004216,58.38341339785328],[24.061198357853186,58.25737457949341],[23.42656009287668,58.612753404364625],[23.339795363058645,59.18724030215338],[24.604214308376182,59.46585378685502],[25.86418908051664,59.61109039981134],[26.949135776484525,59.445803331125774],[27.981114129353244,59.47538808861287],[28.13169925305175,59.30082510033092],[27.42016645682494,58.72458120384424],[27.71668582531572,57.79189911562437],[27.28818484875151,57.47452830670383],[26.463532342237787,57.47638865826633],[25.602809685984365,57.84752879498657],[25.16459354014927,57.97015696881519],[24.312862583114622,57.79342357037698]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Finland","sov_a3":"FI1","adm0_dif":1,"level":2,"type":"Country","admin":"Finland","adm0_a3":"FIN","geou_dif":0,"geounit":"Finland","gu_a3":"FIN","su_dif":0,"subunit":"Finland","su_a3":"FIN","brk_diff":0,"name":"Finland","name_long":"Finland","brk_a3":"FIN","brk_name":"Finland","brk_group":null,"abbrev":"Fin.","postal":"FIN","formal_en":"Republic of Finland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Finland","name_alt":null,"mapcolor7":4,"mapcolor8":1,"mapcolor9":4,"mapcolor13":6,"pop_est":5250275,"gdp_md_est":193500,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"FI","iso_a3":"FIN","iso_n3":"246","un_a3":"246","wb_a2":"FI","wb_a3":"FIN","woe_id":-99,"adm0_a3_is":"FIN","adm0_a3_us":"FIN","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"FIN.geojson"},"geometry":{"type":"Polygon","coordinates":[[[28.591929559043194,69.06477692328666],[28.445943637818658,68.36461294216404],[29.977426385220607,67.69829702419266],[29.054588657352326,66.94428620062193],[30.21765,65.80598],[29.544429559046986,64.94867157659048],[30.44468468600371,64.20445343693909],[30.035872430142714,63.55281362573855],[31.51609215671112,62.86768748641288],[31.139991082490894,62.35769277612441],[30.211107212044446,61.78002777774969],[28.069997592895277,60.503516547275844],[26.25517296723697,60.4239606797625],[24.496623976344523,60.05731639265165],[22.869694858499457,59.846373196036225],[22.290763787533592,60.39192129174154],[21.322244093519316,60.72016998965952],[21.544866163832694,61.7053294948718],[21.05921105315369,62.60739329695874],[21.536029493910803,63.18973501245587],[22.442744174903993,63.81781037053129],[24.730511508897536,64.90234365504082],[25.398067661243942,65.11142650009373],[25.294043003040404,65.53434642197045],[23.903378533633802,66.00692739527962],[23.565879754335583,66.39605093043743],[23.53947309743444,67.93600861273525],[21.978534783626117,68.6168456081807],[20.645592889089528,69.10624726020087],[21.244936150810673,69.37044302029307],[22.356237827247412,68.84174144151491],[23.66204959483076,68.89124746365054],[24.735679152126725,68.64955678982146],[25.68921268077636,69.09211375596904],[26.17962202322624,69.82529897732614],[27.732292107867863,70.16419302029625],[29.01557295097197,69.76649119737799],[28.591929559043194,69.06477692328666]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"France","sov_a3":"FR1","adm0_dif":1,"level":2,"type":"Country","admin":"France","adm0_a3":"FRA","geou_dif":0,"geounit":"France","gu_a3":"FRA","su_dif":0,"subunit":"France","su_a3":"FRA","brk_diff":0,"name":"France","name_long":"France","brk_a3":"FRA","brk_name":"France","brk_group":null,"abbrev":"Fr.","postal":"F","formal_en":"French Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"France","name_alt":null,"mapcolor7":7,"mapcolor8":5,"mapcolor9":9,"mapcolor13":11,"pop_est":64057792,"gdp_md_est":2128000,"pop_year":-99,"lastcensus":-99,"gdp_year":-99,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"FR","iso_a3":"FRA","iso_n3":"250","un_a3":"250","wb_a2":"FR","wb_a3":"FRA","woe_id":-99,"adm0_a3_is":"FRA","adm0_a3_us":"FRA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":3,"tiny":-99,"homepart":1,"filename":"FRA.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-52.55642473001839,2.504705308437053],[-52.93965715189498,2.124857692875622],[-53.418465135295264,2.053389187016037],[-53.554839240113495,2.334896551925965],[-53.77852067728889,2.376702785650053],[-54.08806250671728,2.105556545414629],[-54.52475419779975,2.311848863123785],[-54.27122962097578,2.738747870286943],[-54.18428402364474,3.194172268075235],[-54.01150387227682,3.622569891774858],[-54.399542202356514,4.212611395683481],[-54.47863298197922,4.896755682795643],[-53.95804460307093,5.756548163267809],[-53.618452928264844,5.646529038918402],[-52.88214128275408,5.409850979021599],[-51.82334286152593,4.565768133966145],[-51.65779741067888,4.156232408053029],[-52.24933753112398,3.241094468596287],[-52.55642473001839,2.504705308437053]]],[[[9.560016310269134,42.15249197037957],[9.229752231491773,41.38000682226445],[8.77572309737536,41.58361196549444],[8.54421268070783,42.25651662858308],[8.746009148807588,42.62812185319396],[9.390000848028905,43.00998484961474],[9.560016310269134,42.15249197037957]]],[[[3.588184441755715,50.37899241800358],[4.28602298342514,49.907496649772554],[4.799221632515753,49.98537303323633],[5.674051954784885,49.52948354755745],[5.897759230176376,49.44266714130717],[6.186320428094206,49.46380280211446],[6.658229607783539,49.20195831969155],[8.099278598674772,49.01778351500337],[7.593676385131062,48.33301911070373],[7.46675906742223,47.620581976911865],[7.192202182655535,47.44976552997099],[6.736571079138088,47.54180125588289],[6.768713820023634,47.28770823830368],[6.037388950228972,46.72577871356191],[6.022609490593567,46.272989813820516],[6.500099724970454,46.42967275652944],[6.843592970414562,45.99114655210067],[6.802355177445662,45.70857982032867],[7.096652459347837,45.333098863295874],[6.749955275101711,45.02851797136759],[7.007562290076663,44.25476675066139],[7.549596388386163,44.12790110938482],[7.435184767291843,43.69384491634918],[6.529245232783068,43.12889232031836],[4.556962517931396,43.39965098731158],[3.10041059735272,43.075200507167125],[2.985998976258486,42.47301504166989],[1.826793247087181,42.34338471126566],[0.701590610363922,42.79573436133265],[0.338046909190581,42.579546006839564],[-1.502770961910471,43.03401439063049],[-1.901351284177735,43.42280202897834],[-1.384225226232957,44.02261037859017],[-1.193797573237362,46.014917710954876],[-2.225724249673789,47.06436269793821],[-2.963276129559574,47.570326646507965],[-4.491554938159481,47.95495433205642],[-4.592349819344747,48.68416046812695],[-3.295813971357745,48.901692409859635],[-1.616510789384932,48.644421291694584],[-1.933494025063254,49.776341864615766],[-0.98946895995536,49.347375800160876],[1.338761020522753,50.12717316344526],[1.6390010921385,50.946606350297515],[2.513573032246171,51.14850617126185],[2.658422071960331,50.79684804951566],[3.123251580425716,50.78036326761452],[3.588184441755715,50.37899241800358]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"United Kingdom","sov_a3":"GB1","adm0_dif":1,"level":2,"type":"Country","admin":"United Kingdom","adm0_a3":"GBR","geou_dif":0,"geounit":"United Kingdom","gu_a3":"GBR","su_dif":0,"subunit":"United Kingdom","su_a3":"GBR","brk_diff":0,"name":"United Kingdom","name_long":"United Kingdom","brk_a3":"GBR","brk_name":"United Kingdom","brk_group":null,"abbrev":"U.K.","postal":"GB","formal_en":"United Kingdom of Great Britain and Northern Ireland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"United Kingdom","name_alt":null,"mapcolor7":6,"mapcolor8":6,"mapcolor9":6,"mapcolor13":3,"pop_est":62262000,"gdp_md_est":1977704,"pop_year":0,"lastcensus":2011,"gdp_year":2009,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"GB","iso_a3":"GBR","iso_n3":"826","un_a3":"826","wb_a2":"GB","wb_a3":"GBR","woe_id":-99,"adm0_a3_is":"GBR","adm0_a3_us":"GBR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":14,"long_len":14,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"GBR.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-5.661948614921897,54.55460317648385],[-6.197884894220977,53.86756500916334],[-6.953730231137996,54.073702297575636],[-7.572167934591079,54.05995636658599],[-7.366030646178785,54.595840969452695],[-7.572167934591079,55.1316222194549],[-6.733847011736145,55.1728600124238],[-5.661948614921897,54.55460317648385]]],[[[-3.005004848635281,58.63500010846633],[-4.073828497728016,57.55302480735525],[-3.055001796877661,57.69001902936095],[-1.959280564776918,57.68479970969951],[-2.219988165689301,56.87001740175353],[-3.119003058271118,55.973793036515474],[-2.085009324543023,55.90999848085127],[-2.005675679673857,55.80490285035023],[-1.11499101399221,54.62498647726539],[-0.4304849918542,54.46437612570216],[0.184981316742039,53.32501414653103],[0.469976840831777,52.92999949809197],[1.681530795914739,52.739520168664],[1.559987827164377,52.09999848083601],[1.050561557630914,51.806760565795685],[1.449865349950301,51.28942780212196],[0.550333693045502,50.765738837275876],[-0.78751746255864,50.77498891865622],[-2.489997524414377,50.50001862243124],[-2.956273972984036,50.696879991247016],[-3.617448085942328,50.22835561787272],[-4.542507900399244,50.34183706318566],[-5.245023159191135,49.95999990498108],[-5.776566941745301,50.15967763935682],[-4.309989793301838,51.21000112568916],[-3.414850633142123,51.42600861266925],[-3.422719467108323,51.42684816740609],[-4.984367234710874,51.593466091510976],[-5.267295701508885,51.99140045837458],[-4.222346564134853,52.301355699261364],[-4.770013393564113,52.840004991255626],[-4.579999152026915,53.49500377055517],[-3.093830673788659,53.404547400669685],[-3.092079637047106,53.404440822963544],[-2.945008510744344,53.984999701546684],[-3.614700825433034,54.600936773292574],[-3.63000545898933,54.615012925833014],[-4.844169073903004,54.790971177786844],[-5.082526617849226,55.06160065369937],[-4.719112107756644,55.50847260194348],[-5.047980922862109,55.78398550070752],[-5.586397670911139,55.31114614523682],[-5.644998745130181,56.275014960344805],[-6.149980841486354,56.78500967063354],[-5.786824713555291,57.81884837506465],[-5.009998745127575,58.63001333275005],[-4.211494513353557,58.55084503847917],[-3.005004848635281,58.63500010846633]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Greece","sov_a3":"GRC","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Greece","adm0_a3":"GRC","geou_dif":0,"geounit":"Greece","gu_a3":"GRC","su_dif":0,"subunit":"Greece","su_a3":"GRC","brk_diff":0,"name":"Greece","name_long":"Greece","brk_a3":"GRC","brk_name":"Greece","brk_group":null,"abbrev":"Greece","postal":"GR","formal_en":"Hellenic Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Greece","name_alt":null,"mapcolor7":2,"mapcolor8":2,"mapcolor9":2,"mapcolor13":9,"pop_est":10737428,"gdp_md_est":343000,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"GR","iso_a3":"GRC","iso_n3":"300","un_a3":"300","wb_a2":"GR","wb_a3":"GRC","woe_id":-99,"adm0_a3_is":"GRC","adm0_a3_us":"GRC","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":6,"tiny":-99,"homepart":1,"filename":"GRC.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[23.699980096133004,35.70500438083553],[24.24666507334868,35.368022365860156],[25.02501549652888,35.42499563246198],[25.769207797964185,35.35401805270908],[25.745023227651586,35.179997666966216],[26.290002882601723,35.29999034274792],[26.16499759288766,35.004995429009796],[24.724982130642303,34.91998769788961],[24.735007358506945,35.08499054619759],[23.51497846852811,35.27999156345098],[23.699980096133004,35.70500438083553]]],[[[26.604195590936282,41.562114569661105],[26.29460208507578,40.93626129817426],[26.056942172965506,40.824123440100834],[25.447677036244187,40.85254547786147],[24.92584842296094,40.94706167252323],[23.714811232200816,40.687129218095116],[24.407998894964066,40.1249929876241],[23.899967889102584,39.96200552017558],[23.3429993018608,39.96099782974579],[22.81398766448896,40.476005153966554],[22.62629886240478,40.25656118423919],[22.849747755634805,39.65931081802577],[23.3500272966526,39.19001129816726],[22.973099399515547,38.97090322524966],[23.530016310324953,38.51000112563847],[24.025024855248944,38.21999298761645],[24.040011020613605,37.655014553369426],[23.115002882589152,37.92001129816222],[23.409971958111072,37.409990749657396],[22.774971958108633,37.30501007745656],[23.15422529469862,36.422505804992056],[22.490028110451107,36.41000010837746],[21.670026482843696,36.8449864771942],[21.295010613701574,37.644989325504696],[21.120034213961333,38.31032339126273],[20.730032179454582,38.769985256498785],[20.217712029712857,39.340234686839636],[20.15001590341052,39.62499766698403],[20.615000441172782,40.11000682225943],[20.674996779063633,40.434999904943055],[20.99998986174728,40.58000397395397],[21.02004031747643,40.84272695572588],[21.674160597426976,40.93127452245798],[22.05537763844427,41.14986583105269],[22.597308383889015,41.130487168943205],[22.76177,41.3048],[22.952377150166566,41.33799388281122],[23.692073601992462,41.30908091894386],[24.49264489105803,41.58389618587205],[25.197201368925533,41.23448598893066],[26.106138136507184,41.32889883072784],[26.117041863720914,41.82690460872473],[26.604195590936282,41.562114569661105]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Croatia","sov_a3":"HRV","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Croatia","adm0_a3":"HRV","geou_dif":0,"geounit":"Croatia","gu_a3":"HRV","su_dif":0,"subunit":"Croatia","su_a3":"HRV","brk_diff":0,"name":"Croatia","name_long":"Croatia","brk_a3":"HRV","brk_name":"Croatia","brk_group":null,"abbrev":"Cro.","postal":"HR","formal_en":"Republic of Croatia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Croatia","name_alt":null,"mapcolor7":5,"mapcolor8":4,"mapcolor9":5,"mapcolor13":1,"pop_est":4489409,"gdp_md_est":82390,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"2. High income: nonOECD","wikipedia":-99,"fips_10":null,"iso_a2":"HR","iso_a3":"HRV","iso_n3":"191","un_a3":"191","wb_a2":"HR","wb_a3":"HRV","woe_id":-99,"adm0_a3_is":"HRV","adm0_a3_us":"HRV","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"HRV.geojson"},"geometry":{"type":"Polygon","coordinates":[[[18.829838087650046,45.908877671891844],[19.072768995854176,45.52151113543209],[19.39047570158459,45.236515611342384],[19.00548628101012,44.86023366960916],[18.553214145591653,45.08158966733145],[17.861783481526402,45.067740383477144],[17.002146030351014,45.233776760430935],[16.534939406000206,45.21160757097772],[16.318156772535872,45.00412669532591],[15.959367303133376,45.233776760430935],[15.750026075918981,44.81871165626256],[16.23966027188453,44.35114329688571],[16.456442905348865,44.04123973243128],[16.91615644701733,43.66772247982567],[17.297373488034452,43.44634064388736],[17.674921502358984,43.02856252702361],[18.56,42.65],[18.450016310304818,42.47999136002932],[17.509970330483327,42.849994615239154],[16.930005730871642,43.20999848080038],[16.015384555737683,43.50721548112722],[15.174453973052096,44.243191229827914],[15.376250441151795,44.31791535092208],[14.920309279040508,44.73848399512946],[14.901602410550877,45.07606028907611],[14.258747592839995,45.233776760430935],[13.952254672917034,44.80212352149687],[13.656975538801191,45.13693512631596],[13.67940311041582,45.48414907488501],[13.715059848697251,45.500323798192426],[14.4119682145855,45.46616567644742],[14.595109490627918,45.63494090431282],[14.935243767972963,45.471695054702764],[15.327674594797427,45.452316392593325],[15.323953891672431,45.731782538427694],[15.671529575267641,45.8341535507979],[15.768732944408612,46.23810822202353],[16.564808383864943,46.50375092221981],[16.882515089595415,46.38063182228444],[17.630066359129557,45.9517691106941],[18.45606245288286,45.75948110613615],[18.829838087650046,45.908877671891844]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Hungary","sov_a3":"HUN","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Hungary","adm0_a3":"HUN","geou_dif":0,"geounit":"Hungary","gu_a3":"HUN","su_dif":0,"subunit":"Hungary","su_a3":"HUN","brk_diff":0,"name":"Hungary","name_long":"Hungary","brk_a3":"HUN","brk_name":"Hungary","brk_group":null,"abbrev":"Hun.","postal":"HU","formal_en":"Republic of Hungary","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Hungary","name_alt":null,"mapcolor7":4,"mapcolor8":6,"mapcolor9":1,"mapcolor13":5,"pop_est":9905596,"gdp_md_est":196600,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"HU","iso_a3":"HUN","iso_n3":"348","un_a3":"348","wb_a2":"HU","wb_a3":"HUN","woe_id":-99,"adm0_a3_is":"HUN","adm0_a3_us":"HUN","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"HUN.geojson"},"geometry":{"type":"Polygon","coordinates":[[[16.202298211337364,46.85238597267696],[16.534267612380376,47.49617096616912],[16.340584344150415,47.71290192320123],[16.90375410326726,47.71486562762833],[16.979666782304037,48.123497015976305],[17.48847293464982,47.86746613218621],[17.857132602620027,47.758428860050365],[18.696512892336926,47.880953681014404],[18.77702477384767,48.081768296900634],[19.17436486173989,48.11137889260387],[19.661363559658497,48.26661489520866],[19.769470656013112,48.202691148463614],[20.239054396249347,48.32756724709692],[20.473562045989866,48.56285004332181],[20.801293979584926,48.623854071642384],[21.872236362401736,48.31997081155002],[22.08560835133485,48.42226430927179],[22.640819939878753,48.15023956968735],[22.710531447040495,47.88219391538941],[22.099767693782834,47.6724392767167],[21.62651492685387,46.99423777931816],[21.02195234547125,46.3160879583519],[20.220192498462836,46.127468980486555],[19.596044549241583,46.17172984474454],[18.82983808764996,45.90887767189193],[18.45606245288286,45.759481106136136],[17.630066359129557,45.95176911069419],[16.8825150895953,46.38063182228444],[16.564808383864857,46.50375092221983],[16.370504998447416,46.8413272161665],[16.202298211337364,46.85238597267696]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Iceland","sov_a3":"ISL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Iceland","adm0_a3":"ISL","geou_dif":0,"geounit":"Iceland","gu_a3":"ISL","su_dif":0,"subunit":"Iceland","su_a3":"ISL","brk_diff":0,"name":"Iceland","name_long":"Iceland","brk_a3":"ISL","brk_name":"Iceland","brk_group":null,"abbrev":"Iceland","postal":"IS","formal_en":"Republic of Iceland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Iceland","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":4,"mapcolor13":9,"pop_est":306694,"gdp_md_est":12710,"pop_year":-99,"lastcensus":-99,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"IS","iso_a3":"ISL","iso_n3":"352","un_a3":"352","wb_a2":"IS","wb_a3":"ISL","woe_id":-99,"adm0_a3_is":"ISL","adm0_a3_us":"ISL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":7,"tiny":-99,"homepart":1,"filename":"ISL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-14.508695441129236,66.45589223903141],[-14.739637417041605,65.8087482774403],[-13.60973222497981,65.12667104761987],[-14.909833746794902,64.36408193628868],[-17.794438035543422,63.67874909123385],[-18.656245896874992,63.49638296167582],[-19.97275468594276,63.64363495549153],[-22.762971971110158,63.960178941495386],[-21.778484259517683,64.40211579045551],[-23.95504391121911,64.89112986923348],[-22.184402635170358,65.0849681667603],[-22.227423265053332,65.37859365504272],[-24.326184047939336,65.61118927678847],[-23.65051469572309,66.26251902939522],[-22.134922451250883,66.41046865504687],[-20.57628373867955,65.73211212835143],[-19.05684160000159,66.27660085719477],[-17.79862382655905,65.99385325790978],[-16.167818976292125,66.52679230413587],[-14.508695441129236,66.45589223903141]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Italy","sov_a3":"ITA","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Italy","adm0_a3":"ITA","geou_dif":0,"geounit":"Italy","gu_a3":"ITA","su_dif":0,"subunit":"Italy","su_a3":"ITA","brk_diff":0,"name":"Italy","name_long":"Italy","brk_a3":"ITA","brk_name":"Italy","brk_group":null,"abbrev":"Italy","postal":"I","formal_en":"Italian Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Italy","name_alt":null,"mapcolor7":6,"mapcolor8":7,"mapcolor9":8,"mapcolor13":7,"pop_est":58126212,"gdp_md_est":1823000,"pop_year":-99,"lastcensus":2012,"gdp_year":-99,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"IT","iso_a3":"ITA","iso_n3":"380","un_a3":"380","wb_a2":"IT","wb_a3":"ITA","woe_id":-99,"adm0_a3_is":"ITA","adm0_a3_us":"ITA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":5,"long_len":5,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"ITA.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[15.520376010813834,38.23115509699147],[15.160242954171736,37.44404551853782],[15.309897902089006,37.1342194687318],[15.099988234119449,36.6199872909954],[14.335228712632016,36.996630967754754],[13.826732618879928,37.10453135838019],[12.431003859108813,37.61294993748381],[12.570943637755136,38.12638113051968],[13.741156447004585,38.03496552179536],[14.76124922044616,38.143873602850505],[15.520376010813834,38.23115509699147]]],[[[9.210011834356266,41.20999136002422],[9.809975213264977,40.5000088567661],[9.669518670295673,39.177376410471794],[9.21481774255949,39.240473334300134],[8.80693566247973,38.90661774347847],[8.428302443077115,39.17184703221662],[8.38825320805094,40.378310858718805],[8.15999840661766,40.95000722916379],[8.709990675500109,40.89998444270523],[9.210011834356266,41.20999136002422]]],[[[12.376485223040843,46.76755910906987],[13.806475457421556,46.50930613869119],[13.698109978905478,46.016778062517375],[13.937630242578335,45.591015936864665],[13.141606479554298,45.73669179949541],[12.328581170306306,45.38177806251485],[12.383874952858605,44.88537425391908],[12.261453484759159,44.600482082694015],[12.589237094786483,44.091365871754476],[13.526905958722494,43.5877273626379],[14.029820997787027,42.76100779883248],[15.142569614327956,41.955139675456905],[15.926191033601896,41.96131500911574],[16.169897088290412,41.74029490820342],[15.889345737377797,41.5410822617182],[16.785001661860576,41.179605617836586],[17.519168735431208,40.87714345963224],[18.376687452882575,40.35562490494266],[18.4802470231954,40.168866278639825],[18.293385044028096,39.81077444107325],[17.738380161213286,40.2776710068303],[16.869595981522338,40.44223460546385],[16.448743116937322,39.79540070246648],[17.1714896989715,39.42469981542072],[17.05284061042934,38.9028712021373],[16.635088331781844,38.8435724960824],[16.100960727613057,37.98589874933418],[15.684086948314501,37.90884918878703],[15.687962680736321,38.214592800441864],[15.891981235424707,38.750942491199226],[16.109332309644312,38.96454702407769],[15.718813510814641,39.544072374014945],[15.413612501698822,40.04835683853517],[14.998495721098237,40.17294871679093],[14.70326826341477,40.604550279292624],[14.060671827865264,40.78634796809544],[13.627985060285397,41.188287258461656],[12.88808190273042,41.25308950455562],[12.10668257004491,41.70453481705741],[11.191906365614187,42.35542531998967],[10.511947869517797,42.931462510747224],[10.200028924204048,43.920006822274615],[9.702488234097814,44.03627879493132],[8.88894616052687,44.36633616797954],[8.428560825238577,44.23122813575242],[7.850766635783201,43.76714793555524],[7.435184767291843,43.69384491634918],[7.549596388386163,44.12790110938482],[7.007562290076663,44.25476675066139],[6.749955275101711,45.02851797136759],[7.096652459347837,45.333098863295874],[6.802355177445662,45.70857982032867],[6.843592970414562,45.99114655210067],[7.273850945676685,45.77694774025076],[7.755992058959833,45.82449005795928],[8.31662967289438,46.163642483090854],[8.489952426801295,46.00515086525175],[8.966305779667834,46.036931871111165],[9.182881707403112,46.44021474871698],[9.922836541390353,46.31489940040919],[10.363378126678668,46.483571275409844],[10.442701450246602,46.893546250997446],[11.048555942436508,46.7513585475464],[11.164827915093326,46.94157949481274],[12.153088006243081,47.11539317482644],[12.376485223040843,46.76755910906987]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Kosovo","sov_a3":"KOS","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Kosovo","adm0_a3":"KOS","geou_dif":0,"geounit":"Kosovo","gu_a3":"KOS","su_dif":0,"subunit":"Kosovo","su_a3":"KOS","brk_diff":1,"name":"Kosovo","name_long":"Kosovo","brk_a3":"B57","brk_name":"Kosovo","brk_group":null,"abbrev":"Kos.","postal":"KO","formal_en":"Republic of Kosovo","formal_fr":null,"note_adm0":null,"note_brk":"Self admin.; Claimed by Serbia","name_sort":"Kosovo","name_alt":null,"mapcolor7":2,"mapcolor8":2,"mapcolor9":3,"mapcolor13":11,"pop_est":1804838,"gdp_md_est":5352,"pop_year":-99,"lastcensus":1981,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"-99","iso_a3":"-99","iso_n3":"-99","un_a3":"-099","wb_a2":"KV","wb_a3":"KSV","woe_id":-99,"adm0_a3_is":"SRB","adm0_a3_us":"KOS","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"KOS.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.76216,42.05186],[20.71731000000011,41.84711],[20.59023,41.85541],[20.52295,42.21787],[20.28374,42.3202500000001],[20.0707,42.58863],[20.25758,42.81275000000011],[20.49679,42.88469],[20.63508,43.21671],[20.81448,43.27205],[20.95651,43.13094],[21.143395,43.06868500000012],[21.27421,42.90959],[21.43866,42.86255],[21.63302,42.67717],[21.77505,42.6827],[21.66292,42.43922],[21.54332,42.3202500000001],[21.57663598940212,42.24522439706186],[21.35270000000014,42.2068],[20.76216,42.05186]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Lithuania","sov_a3":"LTU","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Lithuania","adm0_a3":"LTU","geou_dif":0,"geounit":"Lithuania","gu_a3":"LTU","su_dif":0,"subunit":"Lithuania","su_a3":"LTU","brk_diff":0,"name":"Lithuania","name_long":"Lithuania","brk_a3":"LTU","brk_name":"Lithuania","brk_group":null,"abbrev":"Lith.","postal":"LT","formal_en":"Republic of Lithuania","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Lithuania","name_alt":null,"mapcolor7":6,"mapcolor8":3,"mapcolor9":3,"mapcolor13":9,"pop_est":3555179,"gdp_md_est":63330,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"LT","iso_a3":"LTU","iso_n3":"440","un_a3":"440","wb_a2":"LT","wb_a3":"LTU","woe_id":-99,"adm0_a3_is":"LTU","adm0_a3_us":"LTU","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":9,"long_len":9,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"LTU.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.731098667092652,54.327536932993326],[22.65105187347254,54.582740993866736],[22.75776370615526,54.85657440858138],[22.315723504330577,55.015298570365864],[21.268448927503467,55.190481675835315],[21.055800408622414,56.03107636171106],[22.201156853939494,56.33780182557948],[23.878263787539964,56.273671373105266],[24.860684441840757,56.37252838807963],[25.000934279080894,56.16453074810484],[25.533046502390334,56.10029694276603],[26.494331495883753,55.615106919977634],[26.58827924979039,55.16717560487167],[25.7684326514798,54.84696259217509],[25.536353794056993,54.28242340760253],[24.450683628037037,53.905702216194754],[23.48412763844985,53.91249766704114],[23.24398725758951,54.22056671814914],[22.731098667092652,54.327536932993326]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Moldova","sov_a3":"MDA","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Moldova","adm0_a3":"MDA","geou_dif":0,"geounit":"Moldova","gu_a3":"MDA","su_dif":0,"subunit":"Moldova","su_a3":"MDA","brk_diff":0,"name":"Moldova","name_long":"Moldova","brk_a3":"MDA","brk_name":"Moldova","brk_group":null,"abbrev":"Mda.","postal":"MD","formal_en":"Republic of Moldova","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Moldova","name_alt":null,"mapcolor7":3,"mapcolor8":5,"mapcolor9":4,"mapcolor13":12,"pop_est":4320748,"gdp_md_est":10670,"pop_year":-99,"lastcensus":2004,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"MD","iso_a3":"MDA","iso_n3":"498","un_a3":"498","wb_a2":"MD","wb_a3":"MDA","woe_id":-99,"adm0_a3_is":"MDA","adm0_a3_us":"MDA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"MDA.geojson"},"geometry":{"type":"Polygon","coordinates":[[[26.619336785597795,48.22072622333347],[26.857823520624805,48.368210761094495],[27.522537469195154,48.467119452501116],[28.259546746541844,48.15556224221342],[28.670891147585163,48.1181485052341],[29.12269819511303,47.84909516050646],[29.05086795422733,47.51022695575249],[29.41513512545274,47.34664520933257],[29.559674106573112,46.928582872091326],[29.908851759569302,46.67436066343146],[29.838210076626297,46.52532583270169],[30.02465864433537,46.42393667254503],[29.75997195813639,46.34998769793536],[29.170653924279886,46.3792623968287],[29.072106967899295,46.517677720722496],[28.862972446414062,46.43788930926383],[28.93371748222162,46.2588304713725],[28.659987420371575,45.93998688413164],[28.485269402792767,45.5969070501459],[28.233553501099042,45.48828318946837],[28.0544429867754,45.944586086605625],[28.160017937947714,46.37156260841722],[28.128030226359044,46.810476386088254],[27.551166212684848,47.40511709247083],[27.233872918412743,47.82677094175638],[26.924176059687568,48.123264472030996],[26.619336785597795,48.22072622333347]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Ireland","sov_a3":"IRL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Ireland","adm0_a3":"IRL","geou_dif":0,"geounit":"Ireland","gu_a3":"IRL","su_dif":0,"subunit":"Ireland","su_a3":"IRL","brk_diff":0,"name":"Ireland","name_long":"Ireland","brk_a3":"IRL","brk_name":"Ireland","brk_group":null,"abbrev":"Ire.","postal":"IRL","formal_en":"Ireland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Ireland","name_alt":null,"mapcolor7":2,"mapcolor8":3,"mapcolor9":2,"mapcolor13":2,"pop_est":4203200,"gdp_md_est":188400,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"IE","iso_a3":"IRL","iso_n3":"372","un_a3":"372","wb_a2":"IE","wb_a3":"IRL","woe_id":-99,"adm0_a3_is":"IRL","adm0_a3_us":"IRL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"IRL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-6.197884894220991,53.86756500916336],[-6.03298539877761,53.15316417094435],[-6.788856573910849,52.260117906292336],[-8.56161658368356,51.669301255899356],[-9.977085740590269,51.82045482035307],[-9.16628251793078,52.86462881124268],[-9.688524542672454,53.8813626165853],[-8.327987433292009,54.66451894796863],[-7.572167934591064,55.13162221945487],[-7.366030646178785,54.59584096945272],[-7.572167934591064,54.059956366586],[-6.953730231138067,54.073702297575636],[-6.197884894220991,53.86756500916336]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Luxembourg","sov_a3":"LUX","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Luxembourg","adm0_a3":"LUX","geou_dif":0,"geounit":"Luxembourg","gu_a3":"LUX","su_dif":0,"subunit":"Luxembourg","su_a3":"LUX","brk_diff":0,"name":"Luxembourg","name_long":"Luxembourg","brk_a3":"LUX","brk_name":"Luxembourg","brk_group":null,"abbrev":"Lux.","postal":"L","formal_en":"Grand Duchy of Luxembourg","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Luxembourg","name_alt":null,"mapcolor7":1,"mapcolor8":7,"mapcolor9":3,"mapcolor13":7,"pop_est":491775,"gdp_md_est":39370,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"LU","iso_a3":"LUX","iso_n3":"442","un_a3":"442","wb_a2":"LU","wb_a3":"LUX","woe_id":-99,"adm0_a3_is":"LUX","adm0_a3_us":"LUX","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":10,"long_len":10,"abbrev_len":4,"tiny":5,"homepart":1,"filename":"LUX.geojson"},"geometry":{"type":"Polygon","coordinates":[[[6.043073357781111,50.128051662794235],[6.242751092156993,49.90222565367873],[6.186320428094177,49.463802802114515],[5.897759230176405,49.44266714130703],[5.674051954784829,49.529483547557504],[5.782417433300906,50.09032786722122],[6.043073357781111,50.128051662794235]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Latvia","sov_a3":"LVA","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Latvia","adm0_a3":"LVA","geou_dif":0,"geounit":"Latvia","gu_a3":"LVA","su_dif":0,"subunit":"Latvia","su_a3":"LVA","brk_diff":0,"name":"Latvia","name_long":"Latvia","brk_a3":"LVA","brk_name":"Latvia","brk_group":null,"abbrev":"Lat.","postal":"LV","formal_en":"Republic of Latvia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Latvia","name_alt":null,"mapcolor7":4,"mapcolor8":7,"mapcolor9":6,"mapcolor13":13,"pop_est":2231503,"gdp_md_est":38860,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"LV","iso_a3":"LVA","iso_n3":"428","un_a3":"428","wb_a2":"LV","wb_a3":"LVA","woe_id":-99,"adm0_a3_is":"LVA","adm0_a3_us":"LVA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"LVA.geojson"},"geometry":{"type":"Polygon","coordinates":[[[21.055800408622414,56.03107636171106],[21.09042361825797,56.78387278912293],[21.581866489353672,57.41187063254993],[22.524341261492875,57.75337433535076],[23.318452996522097,57.00623647727487],[24.12072960785343,57.02569265403277],[24.312862583114622,57.79342357037698],[25.16459354014927,57.97015696881519],[25.602809685984365,57.84752879498657],[26.463532342237787,57.47638865826633],[27.28818484875151,57.47452830670383],[27.77001590344093,57.24425812441123],[27.855282016722526,56.75932648378429],[28.176709425577993,56.16912995057881],[27.10245975109453,55.783313707087686],[26.494331495883753,55.615106919977634],[25.533046502390334,56.10029694276603],[25.000934279080894,56.16453074810484],[24.860684441840757,56.37252838807963],[23.878263787539964,56.273671373105266],[22.201156853939494,56.33780182557948],[21.055800408622414,56.03107636171106]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Netherlands","sov_a3":"NL1","adm0_dif":1,"level":2,"type":"Country","admin":"Netherlands","adm0_a3":"NLD","geou_dif":0,"geounit":"Netherlands","gu_a3":"NLD","su_dif":0,"subunit":"Netherlands","su_a3":"NLD","brk_diff":0,"name":"Netherlands","name_long":"Netherlands","brk_a3":"NLD","brk_name":"Netherlands","brk_group":null,"abbrev":"Neth.","postal":"NL","formal_en":"Kingdom of the Netherlands","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Netherlands","name_alt":null,"mapcolor7":4,"mapcolor8":2,"mapcolor9":2,"mapcolor13":9,"pop_est":16715999,"gdp_md_est":672000,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"NL","iso_a3":"NLD","iso_n3":"528","un_a3":"528","wb_a2":"NL","wb_a3":"NLD","woe_id":-99,"adm0_a3_is":"NLD","adm0_a3_us":"NLD","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":11,"long_len":11,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"NLD.geojson"},"geometry":{"type":"Polygon","coordinates":[[[6.074182570020923,53.510403347378144],[6.905139601274129,53.48216217713064],[7.092053256873896,53.14404328064489],[6.842869500362383,52.22844025329755],[6.589396599970826,51.852029120483394],[5.988658074577813,51.851615709025054],[6.156658155958779,50.80372101501058],[5.606975945670001,51.037298488969775],[4.973991326526914,51.475023708698124],[4.047071160507527,51.26725861266857],[3.314971144228537,51.34575511331991],[3.830288527043137,51.62054454203195],[4.705997348661185,53.09179840759776],[6.074182570020923,53.510403347378144]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Macedonia","sov_a3":"MKD","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Macedonia","adm0_a3":"MKD","geou_dif":0,"geounit":"Macedonia","gu_a3":"MKD","su_dif":0,"subunit":"Macedonia","su_a3":"MKD","brk_diff":0,"name":"Macedonia","name_long":"Macedonia","brk_a3":"MKD","brk_name":"Macedonia","brk_group":null,"abbrev":"Mkd.","postal":"MK","formal_en":"Former Yugoslav Republic of Macedonia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Macedonia, FYR","name_alt":null,"mapcolor7":5,"mapcolor8":3,"mapcolor9":7,"mapcolor13":3,"pop_est":2066718,"gdp_md_est":18780,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"MK","iso_a3":"MKD","iso_n3":"807","un_a3":"807","wb_a2":"MK","wb_a3":"MKD","woe_id":-99,"adm0_a3_is":"MKD","adm0_a3_us":"MKD","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":9,"long_len":9,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"MKD.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.59023,41.85541],[20.71731000000011,41.84711],[20.76216,42.05186],[21.35270000000014,42.2068],[21.57663598940212,42.24522439706186],[21.917080000000112,42.30364],[22.38052575042468,42.32025950781508],[22.881373732197346,41.999297186850356],[22.952377150166512,41.33799388281119],[22.76177,41.3048],[22.597308383889015,41.130487168943205],[22.05537763844427,41.14986583105269],[21.674160597426976,40.93127452245795],[21.0200403174764,40.84272695572588],[20.60518,41.08622],[20.46315,41.5150900000001],[20.59023,41.85541]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Portugal","sov_a3":"PRT","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Portugal","adm0_a3":"PRT","geou_dif":0,"geounit":"Portugal","gu_a3":"PRT","su_dif":1,"subunit":"Portugal","su_a3":"PR1","brk_diff":0,"name":"Portugal","name_long":"Portugal","brk_a3":"PR1","brk_name":"Portugal","brk_group":null,"abbrev":"Port.","postal":"P","formal_en":"Portuguese Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Portugal","name_alt":null,"mapcolor7":1,"mapcolor8":7,"mapcolor9":1,"mapcolor13":4,"pop_est":10707924,"gdp_md_est":208627,"pop_year":-99,"lastcensus":2011,"gdp_year":0,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"PT","iso_a3":"PRT","iso_n3":"620","un_a3":"620","wb_a2":"PT","wb_a3":"PRT","woe_id":-99,"adm0_a3_is":"PRT","adm0_a3_us":"PRT","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"PRT.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-9.034817674180246,41.88057058365967],[-8.67194576662672,42.13468943945496],[-8.263856980817792,42.28046865495034],[-8.013174607769912,41.790886135417125],[-7.422512986673795,41.79207469335983],[-7.251308966490824,41.91834605566505],[-6.668605515967656,41.883386949219584],[-6.389087693700915,41.381815497394655],[-6.851126674822552,41.11108266861753],[-6.864019944679385,40.33087189387483],[-7.026413133156595,40.184524237624245],[-7.066591559263529,39.71189158788277],[-7.498632371439725,39.62957103124181],[-7.098036668313128,39.03007274022378],[-7.374092169616318,38.37305858006492],[-7.029281175148796,38.07576406508977],[-7.166507941099865,37.803894354802225],[-7.537105475281024,37.42890432387623],[-7.453725551778092,37.09778758396607],[-7.855613165711985,36.83826854099627],[-8.382816127953689,36.97888011326246],[-8.898856980820327,36.86880931248078],[-8.746101446965554,37.65134552667661],[-8.839997524439879,38.26624339451761],[-9.287463751655224,38.3584858261586],[-9.526570603869715,38.73742910415491],[-9.446988898140232,39.39206614842837],[-9.048305223008427,39.75509308527877],[-8.977353481471681,40.15930613866581],[-8.768684047877102,40.76063894303019],[-8.79085323733031,41.18433401139126],[-8.99078935386757,41.54345937760364],[-9.034817674180246,41.88057058365967]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Romania","sov_a3":"ROU","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Romania","adm0_a3":"ROU","geou_dif":0,"geounit":"Romania","gu_a3":"ROU","su_dif":0,"subunit":"Romania","su_a3":"ROU","brk_diff":0,"name":"Romania","name_long":"Romania","brk_a3":"ROU","brk_name":"Romania","brk_group":null,"abbrev":"Rom.","postal":"RO","formal_en":"Romania","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Romania","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":3,"mapcolor13":13,"pop_est":22215421,"gdp_md_est":271400,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"RO","iso_a3":"ROU","iso_n3":"642","un_a3":"642","wb_a2":"RO","wb_a3":"ROM","woe_id":-99,"adm0_a3_is":"ROU","adm0_a3_us":"ROU","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"ROU.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.710531447040495,47.88219391538941],[23.142236362406802,48.09634105080695],[23.76095828623741,47.985598456405455],[24.40205610525038,47.98187775328042],[24.866317172960578,47.73752574318831],[25.20774336111299,47.89105642352747],[25.9459411964024,47.987148749374214],[26.19745039236693,48.22088125263035],[26.619336785597795,48.22072622333347],[26.924176059687568,48.123264472030996],[27.233872918412743,47.82677094175638],[27.551166212684848,47.40511709247083],[28.128030226359044,46.810476386088254],[28.160017937947714,46.37156260841722],[28.0544429867754,45.944586086605625],[28.233553501099042,45.48828318946837],[28.679779493939378,45.304030870131704],[29.149724969201653,45.46492544207245],[29.603289015427432,45.293308010431126],[29.626543409958767,45.03539093686239],[29.141611769331835,44.82021027279904],[28.837857700320203,44.913873806328056],[28.558081495891997,43.70746165625813],[27.970107049275075,43.81246816667521],[27.242399529740908,44.175986029632405],[26.065158725699746,43.94349376075126],[25.569271681426926,43.68844472917472],[24.100679152124172,43.74105133724785],[23.33230228037632,43.89701080990471],[22.944832391051847,43.82378530534713],[22.65714969248299,44.23492300066128],[22.4740084164406,44.40922760678177],[22.705725538837356,44.57800283464702],[22.459022251075936,44.7025171982543],[22.14508792490281,44.47842234962059],[21.562022739353605,44.7689472519655],[21.483526238702233,45.18117015235778],[20.874312778413355,45.416375433934235],[20.762174920339987,45.734573065771436],[20.220192498462836,46.127468980486555],[21.02195234547125,46.3160879583519],[21.62651492685387,46.99423777931816],[22.099767693782834,47.6724392767167],[22.710531447040495,47.88219391538941]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Montenegro","sov_a3":"MNE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Montenegro","adm0_a3":"MNE","geou_dif":0,"geounit":"Montenegro","gu_a3":"MNE","su_dif":0,"subunit":"Montenegro","su_a3":"MNE","brk_diff":0,"name":"Montenegro","name_long":"Montenegro","brk_a3":"MNE","brk_name":"Montenegro","brk_group":null,"abbrev":"Mont.","postal":"ME","formal_en":"Montenegro","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Montenegro","name_alt":null,"mapcolor7":4,"mapcolor8":1,"mapcolor9":4,"mapcolor13":5,"pop_est":672180,"gdp_md_est":6816,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"ME","iso_a3":"MNE","iso_n3":"499","un_a3":"499","wb_a2":"ME","wb_a3":"MNE","woe_id":-99,"adm0_a3_is":"MNE","adm0_a3_us":"MNE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":10,"long_len":10,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"MNE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[19.801613396898688,42.50009349219084],[19.738051385179627,42.688247382165564],[19.3044900000001,42.19574],[19.37177000000014,41.87755],[19.16246,41.95502],[18.88214,42.28151],[18.45,42.48],[18.56,42.65],[18.70648,43.20011],[19.03165,43.43253],[19.21852,43.52384],[19.48389,43.35229],[19.63,43.21377997027054],[19.95857,43.10604],[20.3398,42.89852],[20.25758,42.81275000000011],[20.0707,42.58863],[19.801613396898688,42.50009349219084]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Norway","sov_a3":"NOR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Norway","adm0_a3":"NOR","geou_dif":0,"geounit":"Norway","gu_a3":"NOR","su_dif":0,"subunit":"Norway","su_a3":"NOR","brk_diff":0,"name":"Norway","name_long":"Norway","brk_a3":"NOR","brk_name":"Norway","brk_group":null,"abbrev":"Nor.","postal":"N","formal_en":"Kingdom of Norway","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Norway","name_alt":null,"mapcolor7":5,"mapcolor8":3,"mapcolor9":8,"mapcolor13":12,"pop_est":4676305,"gdp_md_est":276400,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"NO","iso_a3":"NOR","iso_n3":"578","un_a3":"578","wb_a2":"NO","wb_a3":"NOR","woe_id":-99,"adm0_a3_is":"NOR","adm0_a3_us":"NOR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"NOR.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[28.165547316202915,71.18547435168051],[31.29341840996548,70.45378774685992],[30.005435011522792,70.1862588568849],[31.10107872897512,69.55808014594486],[29.399580519332886,69.15691600206307],[28.591929559043194,69.0647769232867],[29.01557295097197,69.76649119737797],[27.73229210786789,70.16419302029628],[26.1796220232263,69.82529897732616],[25.68921268077639,69.09211375596902],[24.73567915212672,68.64955678982145],[23.662049594830762,68.89124746365053],[22.356237827247412,68.84174144151494],[21.24493615081073,69.37044302029312],[20.64559288908958,69.10624726020085],[20.025268995857914,69.06513865831272],[19.878559604581255,68.40719432237262],[17.99386844246439,68.56739126247734],[17.729181756265348,68.01055186631623],[16.76887861498554,68.01393667263139],[16.108712192456835,67.3024555528369],[15.108411492583059,66.19386688909543],[13.55568973150909,64.78702769638147],[13.919905226302205,64.44542064071611],[13.57191613124877,64.04911408146967],[12.57993533697393,64.06621898055835],[11.93056928879423,63.128317572676984],[11.992064243221535,61.800362453856565],[12.631146681375242,61.29357168237009],[12.3003658382749,60.11793284773006],[11.468271925511175,59.432393296946],[11.027368605196926,58.856149400459394],[10.356556837616097,59.46980703392538],[8.382000359743643,58.31328847923328],[7.048748406613299,58.07888418235728],[5.665835402050419,58.58815542259367],[5.308234490590735,59.66323191999382],[4.992078077829007,61.970998033284275],[5.912900424837885,62.614472968182696],[8.553411085655766,63.45400828719647],[10.527709181366788,64.48603831649748],[12.358346795306375,65.87972585719316],[14.761145867581604,67.81064158799515],[16.43592736172897,68.56320547146169],[19.184028354578516,69.81744415961782],[21.378416375420613,70.25516937934606],[23.023742303161583,70.20207184516626],[24.546543409938522,71.03049673123724],[26.370049676221807,70.98626170519537],[28.165547316202915,71.18547435168051]]],[[[24.72412,77.85385],[22.49032,77.44493],[20.72601,77.67704],[21.41611,77.93504],[20.8119,78.25463],[22.88426,78.45494],[23.28134,78.07954],[24.72412,77.85385]]],[[[18.25183,79.70175],[21.54383,78.95611],[19.02737,78.5626],[18.47172,77.82669],[17.59441,77.63796],[17.1182,76.80941],[15.91315,76.77045],[13.76259,77.38035],[14.66956,77.73565],[13.1706,78.02493],[11.22231,78.8693],[10.44453,79.65239],[13.17077,80.01046],[13.71852,79.66039],[15.14282,79.67431],[15.52255,80.01608],[16.99085,80.05086],[18.25183,79.70175]]],[[[25.447625359811894,80.40734039989451],[27.4075057309135,80.05640574820046],[25.92465050629818,79.51783397085455],[23.02446577321362,79.4000117052291],[20.075188429451885,79.56682322866726],[19.897266473070914,79.84236196564751],[18.462263624757924,79.85988027619442],[17.368015170977458,80.31889618602702],[20.455992059010697,80.59815562613224],[21.9079447771154,80.35767934846209],[22.919252557067438,80.65714427359349],[25.447625359811894,80.40734039989451]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Poland","sov_a3":"POL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Poland","adm0_a3":"POL","geou_dif":0,"geounit":"Poland","gu_a3":"POL","su_dif":0,"subunit":"Poland","su_a3":"POL","brk_diff":0,"name":"Poland","name_long":"Poland","brk_a3":"POL","brk_name":"Poland","brk_group":null,"abbrev":"Pol.","postal":"PL","formal_en":"Republic of Poland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Poland","name_alt":null,"mapcolor7":3,"mapcolor8":7,"mapcolor9":1,"mapcolor13":2,"pop_est":38482919,"gdp_md_est":667900,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"PL","iso_a3":"POL","iso_n3":"616","un_a3":"616","wb_a2":"PL","wb_a3":"POL","woe_id":-99,"adm0_a3_is":"POL","adm0_a3_us":"POL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"POL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[15.01699588385867,51.10667409932158],[14.607098422919535,51.745188096719964],[14.685026482815688,52.0899474147552],[14.4375997250022,52.62485016540838],[14.074521111719491,52.98126251892543],[14.353315463934138,53.24817129171297],[14.119686313542587,53.75702912049103],[14.802900424873458,54.05070628520575],[16.36347700365573,54.513158677785725],[17.622831658608675,54.85153595643291],[18.62085859546164,54.68260569927078],[18.696254510175464,54.43871877706929],[19.660640089606403,54.42608388937393],[20.892244500418624,54.31252492941253],[22.731098667092652,54.327536932993326],[23.24398725758951,54.22056671814914],[23.48412763844985,53.91249766704114],[23.527535841575002,53.470121568406555],[23.80493493011778,53.089731350306074],[23.799198846133375,52.69109935160657],[23.199493849386187,52.486977444053664],[23.508002150168693,52.02364655212473],[23.52707075368437,51.57845408793023],[24.029985792748903,50.70540660257518],[23.922757195743262,50.42488108987875],[23.426508416444392,50.30850576435745],[22.518450148211603,49.47677358661974],[22.776418898212626,49.02739533140962],[22.558137648211755,49.085738023467144],[21.607808058364213,49.47010732685409],[20.887955356538413,49.32877228453583],[20.41583947111985,49.43145335549977],[19.825022820726872,49.21712535256923],[19.320712517990472,49.571574001659194],[18.909574822676316,49.435845852244576],[18.853144158613617,49.49622976337764],[18.392913852622172,49.98862864847075],[17.64944502123899,50.049038397819956],[17.55456709155112,50.36214590107641],[16.868769158605655,50.47397370055603],[16.719475945714436,50.21574656839354],[16.176253289462267,50.42260732685791],[16.23862674323857,50.69773265237984],[15.490972120839727,50.78472992614321],[15.01699588385867,51.10667409932158]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Russia","sov_a3":"RUS","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Russia","adm0_a3":"RUS","geou_dif":0,"geounit":"Russia","gu_a3":"RUS","su_dif":0,"subunit":"Russia","su_a3":"RUS","brk_diff":0,"name":"Russia","name_long":"Russian Federation","brk_a3":"RUS","brk_name":"Russia","brk_group":null,"abbrev":"Rus.","postal":"RUS","formal_en":"Russian Federation","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Russian Federation","name_alt":null,"mapcolor7":2,"mapcolor8":5,"mapcolor9":7,"mapcolor13":7,"pop_est":140041247,"gdp_md_est":2266000,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"3. Emerging region: BRIC","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"RU","iso_a3":"RUS","iso_n3":"643","un_a3":"643","wb_a2":"RU","wb_a3":"RUS","woe_id":-99,"adm0_a3_is":"RUS","adm0_a3_us":"RUS","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":18,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"RUS.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[143.64800744036287,50.74760040954151],[144.65414757708564,48.976390692737596],[143.17392785051723,49.30655141865037],[142.5586682476501,47.861575018904915],[143.53349246640406,46.83672801369249],[143.5052771343726,46.13790761980948],[142.74770063697392,46.74076487892657],[142.0920300640545,45.96675527605879],[141.90692508358504,46.80592886004655],[142.0184428244709,47.780132961612935],[141.90444461483506,48.85918854429956],[142.13580000220568,49.61516307229746],[142.1799833518153,50.95234243428192],[141.59407596249002,51.93543488220254],[141.68254601457366,53.30196645772878],[142.60693403541075,53.762145087287905],[142.2097489768154,54.22547597921687],[142.654786411713,54.36588084575388],[142.91461551327657,53.704577541714734],[143.26084760963207,52.74076040303905],[143.23526777564766,51.75666026468875],[143.64800744036287,50.74760040954151]]],[[[22.731098667092652,54.327536932993326],[20.892244500418652,54.312524929412575],[19.660640089606403,54.426083889373984],[19.888481479581344,54.8661603867715],[21.2684489275035,55.19048167583528],[22.315723504330606,55.0152985703659],[22.757763706155288,54.85657440858142],[22.651051873472568,54.58274099386671],[22.731098667092652,54.327536932993326]]],[[[-175.01425,66.58435],[-174.33983,66.33556],[-174.57182,67.06219],[-171.85731,66.91308],[-169.89958,65.97724],[-170.89107,65.54139],[-172.53025,65.43791],[-172.555,64.46079],[-172.95533,64.25269],[-173.89184,64.2826],[-174.65392,64.63125],[-175.98353,64.92288],[-176.20716,65.35667],[-177.22266,65.52024],[-178.35993,65.39052],[-178.90332,65.74044],[-178.68611,66.11211],[-179.88377,65.87456],[-179.43268,65.40411],[-180,64.97970870219837],[-180,68.96363636363635],[-177.55,68.2],[-174.92825,67.20589],[-175.01425,66.58435]]],[[[180.00000000000014,70.83219920854668],[178.9034250000001,70.78114],[178.7253,71.0988],[180.00000000000014,71.51571433642826],[180.00000000000014,70.83219920854668]]],[[[-178.69378,70.89302],[-180,70.83219920854668],[-180,71.51571433642826],[-179.871875,71.55762],[-179.02433,71.55553],[-177.577945,71.26948],[-177.663575,71.13277],[-178.69378,70.89302]]],[[[143.60385,73.21244],[142.08763,73.20544],[140.038155,73.31692],[139.86312,73.36983],[140.81171,73.76506],[142.06207,73.85758],[143.48283,73.47525],[143.60385,73.21244]]],[[[150.73167,75.08406],[149.575925,74.68892],[147.977465,74.778355],[146.11919,75.17298],[146.358485,75.49682],[148.22223,75.345845],[150.73167,75.08406]]],[[[145.086285,75.562625],[144.3,74.82],[140.61381,74.84768],[138.95544,74.61148],[136.97439,75.26167],[137.51176,75.94917],[138.831075,76.13676],[141.471615,76.09289],[145.086285,75.562625]]],[[[57.5356925799924,70.72046397570216],[56.94497928246395,70.63274323188668],[53.6773751157842,70.76265778266847],[53.41201663596539,71.2066616889202],[51.60189456564572,71.47475901965049],[51.45575361512422,72.01488108996514],[52.47827518088357,72.22944163684096],[52.444168735570855,72.77473135038485],[54.42761355979766,73.62754751249759],[53.50828982932515,73.74981395130015],[55.90245893740766,74.62748647734533],[55.631932814359715,75.08141225859717],[57.86864383324885,75.60939036732321],[61.170044386647504,76.25188345000814],[64.49836836127022,76.43905548776928],[66.2109770038551,76.80978221303124],[68.15705976753483,76.93969676381292],[68.85221113472512,76.54481130645462],[68.18057254422766,76.23364166940911],[64.637326287703,75.73775462513623],[61.58350752141476,75.2608845079468],[58.47708214705338,74.30905630156283],[56.98678551618801,73.33304352486624],[55.419335971910954,72.37126760526598],[55.622837762276305,71.54059479439033],[57.5356925799924,70.72046397570216]]],[[[106.97013000000013,76.97419],[107.24000000000015,76.48],[108.1538,76.72335000000015],[111.07726000000017,76.71],[113.33151,76.22224],[114.13417,75.84764],[113.88539,75.32779000000014],[112.77918,75.03186],[110.1512500000002,74.47673],[109.4,74.18],[110.64,74.04],[112.11919,73.78774000000011],[113.01954000000026,73.97693000000015],[113.52958000000032,73.33505000000011],[113.96881,73.59488],[115.56782,73.75285],[118.77633000000023,73.58772],[119.02,73.12],[123.20066000000011,72.97122],[123.25777000000018,73.73503000000011],[125.38000000000018,73.56],[126.97644,73.56549],[128.59126,73.03871],[129.05157,72.39872],[128.46000000000012,71.98],[129.7159900000002,71.19304],[131.28858000000028,70.78699000000012],[132.25350000000017,71.83630000000011],[133.85766000000032,71.38642000000016],[135.56193,71.65525000000014],[137.49755,71.34763],[138.23409000000018,71.62803],[139.86983000000012,71.48783000000014],[139.14791,72.4161900000001],[140.46817,72.84941000000013],[149.5,72.2],[150.3511800000002,71.60643],[152.96890000000022,70.84222],[157.00688,71.03141],[158.99779,70.86672],[159.83031000000025,70.45324],[159.70866,69.72198],[160.94053000000034,69.4372800000001],[162.27907000000013,69.64204],[164.05248000000014,69.66823],[165.94037000000023,69.47199],[167.83567,69.58269],[169.5776300000002,68.6938],[170.81688000000028,69.01363],[170.0082000000002,69.65276],[170.4534500000003,70.09703],[173.64391000000026,69.81743],[175.72403000000023,69.87725000000023],[178.6,69.4],[180.00000000000014,68.96363636363657],[180.00000000000014,64.97970870219848],[179.99281,64.97433],[178.70720000000026,64.53493],[177.41128000000018,64.60821],[178.31300000000024,64.07593],[178.9082500000002,63.251970000000135],[179.37034,62.982620000000104],[179.48636,62.56894],[179.22825000000014,62.30410000000015],[177.3643,62.5219],[174.56929000000022,61.76915],[173.68013,61.65261],[172.15,60.95],[170.6985000000001,60.33618],[170.3308500000003,59.88177],[168.90046,60.57355],[166.29498000000032,59.788550000000214],[165.84000000000023,60.16],[164.87674,59.7316],[163.53929000000014,59.86871],[163.21711000000025,59.21101],[162.0173300000001,58.24328],[162.05297,57.83912],[163.19191,57.61503000000011],[163.05794000000017,56.159240000000125],[162.12958000000023,56.12219],[161.70146,55.285680000000156],[162.11749000000017,54.85514],[160.36877000000032,54.34433],[160.02173000000022,53.20257],[158.5309400000002,52.958680000000236],[158.23118,51.94269],[156.7897900000003,51.01105],[156.42000000000016,51.7],[155.99182,53.15895],[155.43366000000012,55.38103000000012],[155.91442000000032,56.767920000000146],[156.75815,57.3647],[156.8103500000001,57.83204],[158.3643300000002,58.05575],[160.15064000000012,59.31477000000012],[161.87204,60.34300000000013],[163.66969,61.1409],[164.47355000000013,62.55061],[163.2584200000002,62.46627],[162.65791,61.6425],[160.1214800000001,60.54423],[159.30232,61.77396],[156.7206800000001,61.43442],[154.21806000000035,59.75818000000013],[155.04375,59.14495],[152.81185,58.88385],[151.26573000000025,58.78089],[151.33815000000013,59.50396],[149.78371,59.65573000000014],[148.54481,59.16448],[145.48722,59.33637],[142.19782000000018,59.03998],[138.95848000000032,57.08805],[135.12619,54.72959],[136.70171,54.603550000000126],[137.19342,53.97732],[138.1647,53.755010000000254],[138.80463,54.25455000000011],[139.90151,54.18968000000018],[141.34531,53.08957000000012],[141.37923,52.23877],[140.5974200000002,51.2396700000001],[140.51308,50.04553000000013],[140.06193000000022,48.44671000000017],[138.5547200000002,46.99965],[138.21971,46.30795],[136.86232,45.14350000000019],[135.5153500000002,43.989],[134.86939000000027,43.39821],[133.53687000000028,42.81147],[132.90627000000015,42.79849],[132.27807000000027,43.28456000000011],[130.93587000000014,42.55274],[130.78,42.22000000000019],[130.64000000000019,42.395],[130.6338664084098,42.90301463477056],[131.144687941615,42.92998973242695],[131.28855512911562,44.111519680348266],[131.02519000000026,44.96796],[131.8834542176596,45.32116160743652],[133.09712000000022,45.14409],[133.7696439963132,46.116926988299156],[134.1123500000002,47.21248000000014],[134.50081,47.578450000000146],[135.0263114767868,48.47822988544391],[133.37359581922803,48.18344167743484],[132.50669000000013,47.78896],[130.98726000000013,47.79013],[130.58229332898267,48.729687404976204],[129.3978178244205,49.440600084015614],[127.65740000000038,49.76027],[127.28745568248493,50.73979726826545],[126.93915652883786,51.3538941514059],[126.56439904185699,51.7842554795327],[125.94634891164647,52.79279857035695],[125.06821129771045,53.161044826868924],[123.57147,53.4588],[122.24574791879307,53.43172597921369],[121.00308475147037,53.25140106873124],[120.1770886577169,52.75388621684121],[120.725789015792,52.51622630473091],[120.7382,51.96411],[120.18208000000018,51.64355],[119.27939,50.58292],[119.28846072802585,50.14288279886196],[117.8792444194265,49.51098338479704],[116.67880089728621,49.888531399121405],[115.48569542853144,49.80517731383475],[114.96210981655038,50.14024730081513],[114.36245649623534,50.248302720737485],[112.89773969935439,49.54356537535699],[111.58123091028668,49.37796824807767],[110.66201053267886,49.13012807880585],[109.40244917199672,49.29296051695769],[108.47516727095127,49.28254771585071],[107.86817589725112,49.79370514586588],[106.88880415245532,50.27429596618029],[105.8865914245869,50.406019192092174],[104.62158,50.275320000000164],[103.67654544476036,50.089966132195144],[102.25589000000011,50.51056000000011],[102.06521,51.25991],[100.88948042196265,51.51685578063842],[99.98173221232356,51.63400625264395],[98.8614905131005,52.04736603454671],[97.82573978067452,51.01099518493325],[98.23176150919173,50.42240062112873],[97.25976000000023,49.72605],[95.81402000000017,49.977460000000114],[94.81594933469879,50.01343333597088],[94.14756635943561,50.48053660745716],[93.10421,50.49529],[92.23471154171969,50.80217072204175],[90.71366743364078,50.331811835321105],[88.80556684769559,49.47052073831247],[87.75126427607685,49.29719798440556],[87.35997033076269,49.21498078062916],[86.82935672398966,49.82667470966813],[85.5412699726825,49.69285858824816],[85.11555952346211,50.11730296487763],[84.41637739455304,50.311399644565824],[83.93511478061893,50.88924551045358],[83.38300377801247,51.069182847693895],[81.94598554883994,50.81219594990633],[80.56844689323546,51.38833649352844],[80.03555952344172,50.864750881547224],[77.80091556184433,53.40441498474754],[76.52517947785478,54.177003485727134],[76.89110029491346,54.49052440044193],[74.38482000000013,53.54685000000011],[73.42567874542053,53.489810289109755],[73.50851606638437,54.035616766976595],[72.22415001820221,54.37665538188679],[71.1801310566095,54.133285224008254],[70.86526655465516,55.169733588270105],[69.06816694527289,55.3852501491435],[68.1691003762589,54.97039175070438],[65.6668700000001,54.601250000000164],[65.17853356309595,54.35422781027208],[61.43660000000013,54.00625],[60.97806644068325,53.66499339457914],[61.699986199800634,52.97999644633427],[60.739993117114544,52.71998647725775],[60.92726850774025,52.447548326215006],[59.96753380721557,51.960420437215674],[61.58800337102414,51.272658799843185],[61.33742435084101,50.79907013610426],[59.93280724471557,50.842194118851836],[59.64228234237057,50.545442206415714],[58.36332000000013,51.06364],[56.77798,51.04355],[55.71694000000011,50.62171000000015],[54.532878452376195,51.02623973245937],[52.32872358583106,51.718652248738096],[50.76664839051219,51.69276235615987],[48.702381626181044,50.60512848571284],[48.577841424357615,49.874759629915644],[47.549480421749394,50.454698391311126],[46.75159630716277,49.35600576435374],[47.0436715024766,49.152038886097586],[46.46644575377629,48.39415233010493],[47.31524000000016,47.71585],[48.05725,47.74377],[48.694733514201886,47.0756281601779],[48.593250000000154,46.561040000000105],[49.101160000000135,46.39933],[48.64541000000011,45.80629],[47.67591,45.64149000000012],[46.68201,44.6092000000001],[47.59094,43.66016000000013],[47.49252,42.98658],[48.58437000000018,41.80888],[47.98728315612604,41.4058192001944],[47.81566572448466,41.151416124021345],[47.373315464066394,41.21973236751114],[46.686070591016716,41.827137152669906],[46.40495079934894,41.860675157227426],[45.7764,42.09244000000024],[45.470279168485916,42.50278066667005],[44.53762291848207,42.711992702803684],[43.93121000000011,42.5549600000001],[43.755990000000196,42.74083],[42.39440000000016,43.2203],[40.92219000000014,43.38215000000014],[40.07696495947985,43.553104153002494],[39.955008579271095,43.434997666999294],[38.68,44.28],[37.53912000000011,44.65721],[36.67546000000013,45.24469],[37.40317,45.4045100000001],[38.23295,46.24087],[37.67372,46.63657],[39.14767,47.04475000000013],[39.12120000000013,47.26336],[38.22353803889948,47.10218984637598],[38.25511233902981,47.54640045835697],[38.77057,47.82562000000024],[39.738277622238996,47.89893707945208],[39.89562000000015,48.23241],[39.67465,48.783820000000134],[40.08078901546949,49.30742991799937],[40.069040000000115,49.60105],[38.59498823421356,49.92646190042373],[38.010631137857075,49.91566152607473],[37.39345950699524,50.38395335550368],[36.626167840325394,50.225590928745135],[35.35611616388812,50.57719737405915],[35.37791,50.77394],[35.02218305841794,51.2075723333715],[34.2248157081544,51.255993150428935],[34.14197838719061,51.566413479206204],[34.39173058445723,51.768881740925906],[33.75269982273588,52.33507457133166],[32.71576053236716,52.23846548116216],[32.41205813978777,52.28869497334977],[32.15944000000022,52.061250000000115],[31.78597,52.10168],[31.54001834486226,52.74205231384644],[31.30520063652798,53.0739958766733],[31.49764,53.16743000000014],[32.304519484188376,53.132726141972846],[32.693643019346126,53.35142080343214],[32.405598585751164,53.618045355842014],[31.731272820774592,53.79402944601202],[31.791424187962406,53.974638576872195],[31.384472283663822,54.15705638286238],[30.75753380709878,54.811770941784395],[30.971835971813245,55.081547756564134],[30.87390913262007,55.55097646750351],[29.89629438652244,55.7894632025305],[29.37157189303079,55.67009064393628],[29.22951338066039,55.91834422466641],[28.17670942557794,56.16912995057879],[27.855282016722526,56.75932648378438],[27.770015903440992,57.244258124411196],[27.288184848751655,57.47452830670392],[27.71668582531578,57.79189911562445],[27.420150000000202,58.72457000000014],[28.131699253051863,59.300825100331],[27.98112,59.47537],[29.1177,60.02805000000012],[28.07,60.50352000000015],[30.211107212044652,61.78002777774969],[31.139991082491036,62.357692776124445],[31.51609215671127,62.867687486412905],[30.035872430142803,63.552813625738565],[30.444684686003736,64.20445343693908],[29.544429559047018,64.94867157659056],[30.21765,65.80598],[29.054588657352383,66.94428620062203],[29.977426385220696,67.69829702419275],[28.44594363781877,68.36461294216399],[28.591929559043365,69.0647769232867],[29.39955,69.15692000000018],[31.10108000000011,69.55811],[32.13272000000026,69.90595000000025],[33.77547,69.30142000000012],[36.51396,69.06342],[40.292340000000166,67.9324],[41.059870000000124,67.4571300000001],[41.12595000000019,66.79158000000012],[40.01583,66.26618000000013],[38.38295,65.9995300000001],[33.918710000000175,66.75961],[33.18444,66.63253],[34.81477,65.90015000000014],[34.87857425307877,65.4362128770482],[34.94391000000015,64.41437000000016],[36.23129,64.10945],[37.01273000000012,63.84983000000011],[37.14197000000016,64.33471],[36.539579035089815,64.76446],[37.17604000000014,65.14322000000013],[39.59345,64.52079000000018],[40.43560000000011,64.76446],[39.76260000000016,65.49682],[42.0930900000001,66.47623],[43.01604000000012,66.41858],[43.94975000000014,66.06908],[44.53226,66.75634000000014],[43.69839,67.35245],[44.18795000000014,67.95051],[43.45282,68.57079],[46.25000000000014,68.25],[46.82134000000016,67.68997],[45.55517,67.56652],[45.5620200000001,67.01005000000019],[46.34915000000015,66.6676700000001],[47.894160000000255,66.88455000000016],[48.13876,67.52238],[50.22766000000016,67.99867000000013],[53.71743000000018,68.85738000000012],[54.47171,68.80815],[53.48582000000013,68.20131],[54.72628,68.09702],[55.44268000000014,68.43866],[57.317020000000156,68.46628],[58.80200000000021,68.88082],[59.94142000000019,68.2784400000001],[61.07784000000018,68.94069],[60.03,69.52],[60.55,69.85],[63.50400000000016,69.54739],[64.888115,69.23483500000013],[68.51216000000014,68.09233000000017],[69.18068,68.61563000000012],[68.16444,69.14436],[68.13522,69.35649],[66.93008000000012,69.45461000000012],[67.25976,69.92873],[66.72492000000014,70.70889000000014],[66.69466,71.02897000000024],[68.54006000000011,71.93450000000024],[69.19636000000011,72.84336000000016],[69.94,73.04000000000013],[72.58754,72.7762900000001],[72.79603,72.22006],[71.8481100000001,71.40898],[72.47011,71.09019],[72.79188,70.39114],[72.56470000000022,69.02085],[73.66787,68.4079],[73.2387,67.7404],[71.28000000000011,66.32000000000016],[72.42301000000018,66.17267000000018],[72.82077,66.53267],[73.92099000000016,66.78946000000013],[74.1865100000002,67.28429],[75.052,67.76047000000017],[74.46926000000016,68.32899],[74.93584000000013,68.98918],[73.84236,69.07146],[73.60187000000022,69.62763],[74.3998,70.63175],[73.1011,71.44717000000026],[74.89082000000022,72.12119],[74.65926,72.83227],[75.15801000000019,72.85497000000011],[75.68351,72.30056000000013],[75.28898000000012,71.33556],[76.35911,71.15287000000015],[75.90313000000017,71.87401],[77.57665000000011,72.26717],[79.65202000000014,72.32011],[81.5,71.75],[80.61071000000013,72.58285000000012],[80.51109,73.6482],[82.25,73.85000000000011],[84.65526,73.80591000000018],[86.82230000000024,73.93688],[86.00956,74.45967000000014],[87.16682000000017,75.11643],[88.31571000000011,75.14393],[90.26,75.64],[92.90058,75.77333],[93.23421000000016,76.0472],[95.86000000000016,76.14],[96.67821,75.91548],[98.92254000000023,76.44689],[100.75967000000023,76.43028],[101.03532,76.86189],[101.99084000000013,77.2875400000002],[104.3516000000001,77.69792],[106.06664000000013,77.37389],[104.70500000000024,77.1274],[106.97013000000013,76.97419]]],[[[105.07547,78.30689],[99.43814,77.921],[101.2649,79.23399],[102.08635,79.34641],[102.837815,79.28129],[105.37243,78.71334],[105.07547,78.30689]]],[[[51.13618655783128,80.54728017854093],[49.79368452332071,80.4154277615482],[48.89441124857754,80.3395667589437],[48.754936557821765,80.17546824820084],[47.586119012244154,80.01018117951533],[46.502825962109654,80.24724681265437],[47.07245527526291,80.55942414012945],[44.846958042181114,80.58980988231718],[46.79913862487123,80.77191762971364],[48.318477410684665,80.78400991486996],[48.522806023966695,80.51456899690015],[49.09718956889091,80.75398590770843],[50.03976769389462,80.91888540315182],[51.52293297710369,80.6997256538019],[51.13618655783128,80.54728017854093]]],[[[99.93976,78.88094],[97.75794,78.7562],[94.97259,79.044745],[93.31288,79.4265],[92.5454,80.14379],[91.18107,80.34146],[93.77766,81.0246],[95.940895,81.2504],[97.88385,80.746975],[100.186655,79.780135],[99.93976,78.88094]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Republic of Serbia","sov_a3":"SRB","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Republic of Serbia","adm0_a3":"SRB","geou_dif":0,"geounit":"Republic of Serbia","gu_a3":"SRB","su_dif":0,"subunit":"Republic of Serbia","su_a3":"SRB","brk_diff":0,"name":"Serbia","name_long":"Serbia","brk_a3":"SRB","brk_name":"Serbia","brk_group":null,"abbrev":"Serb.","postal":"RS","formal_en":"Republic of Serbia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Serbia","name_alt":null,"mapcolor7":3,"mapcolor8":3,"mapcolor9":2,"mapcolor13":10,"pop_est":7379339,"gdp_md_est":80340,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"RS","iso_a3":"SRB","iso_n3":"688","un_a3":"688","wb_a2":"YF","wb_a3":"SRB","woe_id":-99,"adm0_a3_is":"SRB","adm0_a3_us":"SRB","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"SRB.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.87431277841341,45.41637543393432],[21.48352623870221,45.18117015235788],[21.562022739353722,44.76894725196564],[22.145087924902896,44.47842234962059],[22.459022251075965,44.70251719825444],[22.70572553883744,44.57800283464701],[22.474008416440654,44.40922760678177],[22.657149692483074,44.234923000661354],[22.410446404721597,44.008063462900054],[22.500156691180223,43.642814439461006],[22.986018507588483,43.2111612005271],[22.60480146657136,42.898518785161116],[22.43659467946139,42.58032115332394],[22.54501183440965,42.46136200618804],[22.38052575042468,42.32025950781508],[21.917080000000112,42.30364],[21.57663598940212,42.24522439706186],[21.54332,42.3202500000001],[21.66292,42.43922],[21.77505,42.6827],[21.63302,42.67717],[21.43866,42.86255],[21.27421,42.90959],[21.143395,43.06868500000012],[20.95651,43.13094],[20.81448,43.27205],[20.63508,43.21671],[20.49679,42.88469],[20.25758,42.81275000000011],[20.3398,42.89852],[19.95857,43.10604],[19.63,43.21377997027054],[19.48389,43.35229],[19.21852,43.52384],[19.454,43.56810000000013],[19.59976,44.03847],[19.11761,44.42307000000011],[19.36803,44.863],[19.00548,44.86023],[19.39047570158459,45.236515611342384],[19.072768995854176,45.52151113543209],[18.82982,45.90888],[19.59604454924164,46.171729844744554],[20.220192498462893,46.12746898048658],[20.762174920339987,45.734573065771485],[20.87431277841341,45.41637543393432]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Slovakia","sov_a3":"SVK","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Slovakia","adm0_a3":"SVK","geou_dif":0,"geounit":"Slovakia","gu_a3":"SVK","su_dif":0,"subunit":"Slovakia","su_a3":"SVK","brk_diff":0,"name":"Slovakia","name_long":"Slovakia","brk_a3":"SVK","brk_name":"Slovakia","brk_group":null,"abbrev":"Svk.","postal":"SK","formal_en":"Slovak Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Slovak Republic","name_alt":null,"mapcolor7":2,"mapcolor8":4,"mapcolor9":4,"mapcolor13":9,"pop_est":5463046,"gdp_md_est":119500,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"SK","iso_a3":"SVK","iso_n3":"703","un_a3":"703","wb_a2":"SK","wb_a3":"SVK","woe_id":-99,"adm0_a3_is":"SVK","adm0_a3_us":"SVK","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"SVK.geojson"},"geometry":{"type":"Polygon","coordinates":[[[18.853144158613617,49.49622976337764],[18.909574822676316,49.435845852244576],[19.320712517990472,49.571574001659194],[19.825022820726872,49.21712535256923],[20.41583947111985,49.43145335549977],[20.887955356538413,49.32877228453583],[21.607808058364213,49.47010732685409],[22.558137648211755,49.085738023467144],[22.28084191253356,48.82539215758067],[22.08560835133485,48.42226430927179],[21.872236362401736,48.31997081155002],[20.801293979584926,48.623854071642384],[20.473562045989866,48.56285004332181],[20.239054396249347,48.32756724709692],[19.769470656013112,48.202691148463614],[19.661363559658497,48.26661489520866],[19.17436486173989,48.11137889260387],[18.77702477384767,48.081768296900634],[18.696512892336926,47.880953681014404],[17.857132602620027,47.758428860050365],[17.48847293464982,47.86746613218621],[16.979666782304037,48.123497015976305],[16.879982944413,48.47001333270947],[16.960288120194576,48.5969823268506],[17.101984897538898,48.81696889911711],[17.545006951577108,48.80001902932537],[17.88648481616181,48.90347524677371],[17.913511590250465,48.996492824899086],[18.104972771891852,49.04398346617531],[18.170498488037964,49.271514797556435],[18.399993523846177,49.31500051533004],[18.554971144289482,49.49501536721878],[18.853144158613617,49.49622976337764]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Slovenia","sov_a3":"SVN","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Slovenia","adm0_a3":"SVN","geou_dif":0,"geounit":"Slovenia","gu_a3":"SVN","su_dif":0,"subunit":"Slovenia","su_a3":"SVN","brk_diff":0,"name":"Slovenia","name_long":"Slovenia","brk_a3":"SVN","brk_name":"Slovenia","brk_group":null,"abbrev":"Slo.","postal":"SLO","formal_en":"Republic of Slovenia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Slovenia","name_alt":null,"mapcolor7":2,"mapcolor8":3,"mapcolor9":2,"mapcolor13":12,"pop_est":2005692,"gdp_md_est":59340,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"SI","iso_a3":"SVN","iso_n3":"705","un_a3":"705","wb_a2":"SI","wb_a3":"SVN","woe_id":-99,"adm0_a3_is":"SVN","adm0_a3_us":"SVN","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"SVN.geojson"},"geometry":{"type":"Polygon","coordinates":[[[13.806475457421527,46.509306138691215],[14.63247155117483,46.43181732846955],[15.137091912504985,46.65870270444703],[16.011663852612656,46.6836107448117],[16.202298211337364,46.85238597267696],[16.370504998447416,46.8413272161665],[16.564808383864857,46.50375092221983],[15.768732944408551,46.23810822202345],[15.671529575267556,45.83415355079788],[15.323953891672403,45.73178253842768],[15.327674594797427,45.45231639259323],[14.935243767972935,45.471695054702685],[14.595109490627804,45.634940904312714],[14.411968214585414,45.46616567644746],[13.715059848697221,45.50032379819237],[13.937630242578306,45.59101593686462],[13.698109978905478,46.01677806251735],[13.806475457421527,46.509306138691215]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Sweden","sov_a3":"SWE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Sweden","adm0_a3":"SWE","geou_dif":0,"geounit":"Sweden","gu_a3":"SWE","su_dif":0,"subunit":"Sweden","su_a3":"SWE","brk_diff":0,"name":"Sweden","name_long":"Sweden","brk_a3":"SWE","brk_name":"Sweden","brk_group":null,"abbrev":"Swe.","postal":"S","formal_en":"Kingdom of Sweden","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Sweden","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":2,"mapcolor13":4,"pop_est":9059651,"gdp_md_est":344300,"pop_year":-99,"lastcensus":-99,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"SE","iso_a3":"SWE","iso_n3":"752","un_a3":"752","wb_a2":"SE","wb_a3":"SWE","woe_id":-99,"adm0_a3_is":"SWE","adm0_a3_us":"SWE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"SWE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.183173455501926,65.72374054632017],[21.21351687997722,65.02600535751527],[21.369631381930958,64.41358795842429],[19.77887576669022,63.60955434839504],[17.84777916837521,62.74940013289681],[17.119554884518124,61.34116567651097],[17.83134606290639,60.63658336042741],[18.78772179533209,60.081914374422595],[17.86922488777634,58.9537661810587],[16.829185011470088,58.71982697207339],[16.447709588291474,57.041118069071885],[15.879785597403783,56.10430186626866],[14.666681349352075,56.200885118222175],[14.100721062891465,55.40778107362265],[12.942910597392057,55.36173737245058],[12.625100538797028,56.30708018658197],[11.787942335668674,57.44181712506307],[11.027368605196866,58.85614940045936],[11.468271925511146,59.43239329694604],[12.3003658382749,60.11793284773003],[12.631146681375183,61.293571682370136],[11.992064243221563,61.80036245385656],[11.93056928879423,63.12831757267698],[12.579935336973932,64.06621898055833],[13.571916131248711,64.04911408146971],[13.919905226302204,64.44542064071608],[13.55568973150909,64.78702769638151],[15.108411492583002,66.19386688909547],[16.108712192456778,67.30245555283689],[16.768878614985482,68.01393667263139],[17.729181756265348,68.01055186631628],[17.993868442464333,68.56739126247736],[19.878559604581255,68.40719432237258],[20.025268995857886,69.0651386583127],[20.645592889089528,69.10624726020087],[21.978534783626117,68.6168456081807],[23.53947309743444,67.93600861273525],[23.565879754335583,66.39605093043743],[23.903378533633802,66.00692739527962],[22.183173455501926,65.72374054632017]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Ukraine","sov_a3":"UKR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Ukraine","adm0_a3":"UKR","geou_dif":0,"geounit":"Ukraine","gu_a3":"UKR","su_dif":0,"subunit":"Ukraine","su_a3":"UKR","brk_diff":0,"name":"Ukraine","name_long":"Ukraine","brk_a3":"UKR","brk_name":"Ukraine","brk_group":null,"abbrev":"Ukr.","postal":"UA","formal_en":"Ukraine","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Ukraine","name_alt":null,"mapcolor7":5,"mapcolor8":1,"mapcolor9":6,"mapcolor13":3,"pop_est":45700395,"gdp_md_est":339800,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"UA","iso_a3":"UKR","iso_n3":"804","un_a3":"804","wb_a2":"UA","wb_a3":"UKR","woe_id":-99,"adm0_a3_is":"UKR","adm0_a3_us":"UKR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"UKR.geojson"},"geometry":{"type":"Polygon","coordinates":[[[31.785998162571587,52.101677964885454],[32.15941206231267,52.06126699483322],[32.41205813978763,52.28869497334975],[32.71576053236697,52.23846548116205],[33.7526998227357,52.335074571331695],[34.39173058445701,51.76888174092579],[34.14197838719039,51.56641347920623],[34.22481570815427,51.25599315042895],[35.02218305841788,51.20757233337145],[35.37792361831512,50.77395539001034],[35.35611616388795,50.577197374059054],[36.62616784032534,50.225590928745135],[37.39345950699507,50.38395335550359],[38.010631137856905,49.91566152607463],[38.59498823421342,49.92646190042363],[40.06905846533911,49.6010554062817],[40.08078901546935,49.307429917999286],[39.67466393408753,48.78381846780187],[39.89563235856758,48.23240509703143],[39.738277622238826,47.89893707945198],[38.7705847511412,47.825608222029814],[38.25511233902975,47.546400458356814],[38.22353803889942,47.10218984637588],[37.42513715998999,47.022220567404204],[36.75985477066439,46.698700263040934],[35.82368452326483,46.64596446388707],[34.96234174982388,46.27319651954964],[35.020787794745985,45.65121898048466],[35.51000857925317,45.40999339454619],[36.52999799983016,45.46998973243706],[36.33471276219916,45.113215643893966],[35.23999922052812,44.939996242851606],[33.882511020652885,44.36147858334407],[33.326420932760044,44.56487702084489],[33.54692426934946,45.03477081967489],[32.4541744321055,45.32746613217608],[32.630804477679135,45.519185695978905],[33.58816206231839,45.85156850848024],[33.29856733575471,46.080598456397844],[31.74414025241518,46.333347886737386],[31.675307244602408,46.70624502215554],[30.748748813609097,46.583100084004],[30.377608676888883,46.03241018328567],[29.603289015427432,45.293308010431126],[29.149724969201653,45.46492544207245],[28.679779493939378,45.304030870131704],[28.233553501099042,45.48828318946837],[28.485269402792767,45.5969070501459],[28.659987420371575,45.93998688413164],[28.93371748222162,46.2588304713725],[28.862972446414062,46.43788930926383],[29.072106967899295,46.517677720722496],[29.170653924279886,46.3792623968287],[29.75997195813639,46.34998769793536],[30.02465864433537,46.42393667254503],[29.838210076626297,46.52532583270169],[29.908851759569302,46.67436066343146],[29.559674106573112,46.928582872091326],[29.41513512545274,47.34664520933257],[29.05086795422733,47.51022695575249],[29.12269819511303,47.84909516050646],[28.670891147585163,48.1181485052341],[28.259546746541844,48.15556224221342],[27.522537469195154,48.467119452501116],[26.857823520624805,48.368210761094495],[26.619336785597795,48.22072622333347],[26.19745039236693,48.22088125263035],[25.9459411964024,47.987148749374214],[25.20774336111299,47.89105642352747],[24.866317172960578,47.73752574318831],[24.40205610525038,47.98187775328042],[23.76095828623741,47.985598456405455],[23.142236362406802,48.09634105080695],[22.710531447040495,47.88219391538941],[22.640819939878753,48.15023956968735],[22.08560835133485,48.42226430927179],[22.28084191253356,48.82539215758067],[22.558137648211755,49.085738023467144],[22.776418898212626,49.02739533140962],[22.518450148211603,49.47677358661974],[23.426508416444392,50.30850576435745],[23.922757195743262,50.42488108987875],[24.029985792748903,50.70540660257518],[23.52707075368437,51.57845408793023],[24.00507775238421,51.61744395609446],[24.553106316839518,51.888461005249184],[25.327787713327005,51.91065603291855],[26.337958611768556,51.83228872334793],[27.454066196408434,51.59230337178447],[28.24161502453657,51.57222707783907],[28.61761274589225,51.42771393493484],[28.99283532076353,51.602044379271476],[29.254938185347925,51.368234361366895],[30.157363722460897,51.41613841410147],[30.555117221811457,51.31950348571566],[30.619454380014844,51.822806098022376],[30.927549269338982,52.04235342061438],[31.785998162571587,52.101677964885454]]]}}]}'
  );
  class Tl {
    constructor(e, t) {
      (this.allData = t),
        (this.viewWidth = Cl / 4),
        (this.viewHeight = Nl / 3),
        (this.countriesToFilter = []),
        (this.hoverCountry = null),
        (this.mapG = e.append("g").classed("map", !0)),
        (this.mapTooltip = Fn("body").append("div")),
        (this.pathSelection = this.mapG
          .selectAll(".countryPath")
          .data(Gl.R)
          .join("g")
          .classed("countryPath", !0)
          .append("path"));
      const r = Bl(t);
      (this.colorScale = al(sl)
        .domain(n(Object.entries(r), (n) => n[1]))
        .range([sl(0.3), sl(1)])),
        (this.selectedColorScale = al(cl)
          .domain(n(Object.entries(r), (n) => n[1]))
          .range([cl(0.3), cl(1)]));
      const o = $a()
        .center([2.6, 46])
        .scale(0.1 * Cl + 90)
        .translate([0.1 * Cl, 0.24 * Nl]);
      this.pathGenerator = (function (n, e) {
        var t,
          r,
          o = 4.5;
        function a(n) {
          return (
            n &&
              ("function" == typeof o &&
                r.pointRadius(+o.apply(this, arguments)),
              Fr(n, t(r))),
            r.result()
          );
        }
        return (
          (a.area = function (n) {
            return Fr(n, t(vo)), vo.result();
          }),
          (a.measure = function (n) {
            return Fr(n, t(aa)), aa.result();
          }),
          (a.bounds = function (n) {
            return Fr(n, t(xo)), xo.result();
          }),
          (a.centroid = function (n) {
            return Fr(n, t(Xo)), Xo.result();
          }),
          (a.projection = function (e) {
            return arguments.length
              ? ((t = null == e ? ((n = null), Pr) : (n = e).stream), a)
              : n;
          }),
          (a.context = function (n) {
            return arguments.length
              ? ((r = null == n ? ((e = null), new ia()) : new qo((e = n))),
                "function" != typeof o && r.pointRadius(o),
                a)
              : e;
          }),
          (a.pointRadius = function (n) {
            return arguments.length
              ? ((o = "function" == typeof n ? n : (r.pointRadius(+n), +n)), a)
              : o;
          }),
          a.projection(n).context(e)
        );
      })(o);
    }
    updateFilters(n) {
      0 != this.countriesToFilter.length || this.hoverCountry
        ? n((n) => {
            let e = this.countriesToFilter;
            return (
              this.hoverCountry && (e = [this.hoverCountry, ...e]),
              e.includes(n.creatorCountry)
            );
          })
        : n(null);
    }
    toggle(n) {
      this.countriesToFilter.includes(n)
        ? (this.countriesToFilter = this.countriesToFilter.filter(
            (e) => e != n
          ))
        : this.countriesToFilter.push(n);
    }
    color(n) {
      let e = "#eee";
      const t = n.properties.name;
      return (
        this.countriesToFilter.includes(t) || this.hoverCountry == t
          ? (e = this.selectedColorScale(this.grouped[t] || 0))
          : this.grouped[t] && (e = this.colorScale(this.grouped[t])),
        e
      );
    }
    initialize(n, e) {
      const t = this;
      (this.grouped = Bl(n)),
        this.mapG
          .append("clipPath")
          .attr("id", "rect-clip")
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", this.viewWidth)
          .attr("height", this.viewHeight),
        this.mapG
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", this.viewWidth)
          .attr("height", this.viewHeight)
          .attr("fill", "none")
          .attr("stroke", "black"),
        this.pathSelection
          .attr("clip-path", "url(#rect-clip)")
          .attr("pointer-events", "visibleFill")
          .attr("cursor", "pointer")
          .attr("d", t.pathGenerator)
          .attr("stroke", "black")
          .on("mouseenter", function (n, r) {
            Fn(this).attr("fill", "yellow");
            let o = r.properties.name;
            t.grouped[r.properties.name] &&
              (o += ": " + t.grouped[r.properties.name].toString()),
              t.mapTooltip.text(o),
              (t.hoverCountry = r.properties.name),
              t.updateFilters(e);
          })
          .on("mousemove", function (n, r) {
            Fn(this).attr("fill", "yellow"),
              t.mapTooltip.attr(
                "style",
                `position: absolute; top: ${n.clientY + 10}px; left: ${
                  n.clientX
                }px; background-color: #fff;`
              ),
              (t.hoverCountry = r.properties.name),
              t.updateFilters(e);
          })
          .on("mouseleave", function (n, r) {
            Fn(this).attr("fill", t.color(r)),
              t.mapTooltip.attr("style", "visibility: hidden;"),
              t.hoverCountry === r.properties.name && (t.hoverCountry = null),
              t.updateFilters(e);
          })
          .on("click", (n, r) => {
            t.toggle(r.properties.name), t.updateFilters(e);
          }),
        this.update(n);
    }
    update(n) {
      (this.grouped = Bl(n)),
        this.pathSelection.attr("fill", this.color.bind(this));
    }
  }
  class Il {
    constructor(e, t) {
      (this.svg = e),
        (this.allData = t),
        (this.viewWidth = Cl / 4),
        (this.viewHeight = Nl / 3),
        (this.timeG = e
          .append("g")
          .classed("time", !0)
          .attr("transform", `translate(0, ${this.viewHeight})`)),
        (this.xScale = nl()
          .domain(n(t, (n) => n.year))
          .range([0, this.viewWidth]));
      const r = m()
        .value((n) => n.year)
        .domain(this.xScale.domain())
        .thresholds(this.xScale.ticks(20))(t);
      this.yScale = nl()
        .domain([0, g(r.map((n) => n.length))])
        .range([0, this.viewHeight]);
    }
    initialize(n, e) {
      const t = this;
      t.filterBounds = null;
      const r = (function (n) {
        var e,
          t = mr,
          r = hr,
          o = gr,
          a = !0,
          i = x("start", "brush", "end"),
          l = 6;
        function u(e) {
          var t = e
            .property("__brush", h)
            .selectAll(".overlay")
            .data([dr("overlay")]);
          t
            .enter()
            .append("rect")
            .attr("class", "overlay")
            .attr("pointer-events", "all")
            .attr("cursor", sr.overlay)
            .merge(t)
            .each(function () {
              var n = yr(this).extent;
              Fn(this)
                .attr("x", n[0][0])
                .attr("y", n[0][1])
                .attr("width", n[1][0] - n[0][0])
                .attr("height", n[1][1] - n[0][1]);
            }),
            e
              .selectAll(".selection")
              .data([dr("selection")])
              .enter()
              .append("rect")
              .attr("class", "selection")
              .attr("cursor", sr.selection)
              .attr("fill", "#777")
              .attr("fill-opacity", 0.3)
              .attr("stroke", "#fff")
              .attr("shape-rendering", "crispEdges");
          var r = e.selectAll(".handle").data(n.handles, function (n) {
            return n.type;
          });
          r.exit().remove(),
            r
              .enter()
              .append("rect")
              .attr("class", function (n) {
                return "handle handle--" + n.type;
              })
              .attr("cursor", function (n) {
                return sr[n.type];
              }),
            e
              .each(s)
              .attr("fill", "none")
              .attr("pointer-events", "all")
              .on("mousedown.brush", f)
              .filter(o)
              .on("touchstart.brush", f)
              .on("touchmove.brush", _)
              .on("touchend.brush touchcancel.brush", d)
              .style("touch-action", "none")
              .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        function s() {
          var n = Fn(this),
            e = yr(this).selection;
          e
            ? (n
                .selectAll(".selection")
                .style("display", null)
                .attr("x", e[0][0])
                .attr("y", e[0][1])
                .attr("width", e[1][0] - e[0][0])
                .attr("height", e[1][1] - e[0][1]),
              n
                .selectAll(".handle")
                .style("display", null)
                .attr("x", function (n) {
                  return "e" === n.type[n.type.length - 1]
                    ? e[1][0] - l / 2
                    : e[0][0] - l / 2;
                })
                .attr("y", function (n) {
                  return "s" === n.type[0] ? e[1][1] - l / 2 : e[0][1] - l / 2;
                })
                .attr("width", function (n) {
                  return "n" === n.type || "s" === n.type
                    ? e[1][0] - e[0][0] + l
                    : l;
                })
                .attr("height", function (n) {
                  return "e" === n.type || "w" === n.type
                    ? e[1][1] - e[0][1] + l
                    : l;
                }))
            : n
                .selectAll(".selection,.handle")
                .style("display", "none")
                .attr("x", null)
                .attr("y", null)
                .attr("width", null)
                .attr("height", null);
        }
        function c(n, e, t) {
          var r = n.__brush.emitter;
          return !r || (t && r.clean) ? new p(n, e, t) : r;
        }
        function p(n, e, t) {
          (this.that = n),
            (this.args = e),
            (this.state = n.__brush),
            (this.active = 0),
            (this.clean = t);
        }
        function f(t) {
          if ((!e || t.touches) && r.apply(this, arguments)) {
            var o,
              i,
              l,
              u,
              p,
              f,
              _,
              d,
              h,
              m,
              g,
              y = this,
              v = t.target.__data__.type,
              b =
                "selection" === (a && t.metaKey ? (v = "overlay") : v)
                  ? Jt
                  : a && t.altKey
                  ? er
                  : nr,
              w = n === ur ? null : fr[v],
              k = n === lr ? null : _r[v],
              E = yr(y),
              x = E.extent,
              S = E.selection,
              A = x[0][0],
              M = x[0][1],
              R = x[1][0],
              N = x[1][1],
              C = 0,
              L = 0,
              B = w && k && a && t.shiftKey,
              D = Array.from(t.touches || [t], (n) => {
                const e = n.identifier;
                return (
                  ((n = Te(n, y)).point0 = n.slice()), (n.identifier = e), n
                );
              });
            if ("overlay" === v) {
              S && (h = !0);
              const e = [D[0], D[1] || D[0]];
              (E.selection = S = [
                [
                  (o = n === ur ? A : or(e[0][0], e[1][0])),
                  (l = n === lr ? M : or(e[0][1], e[1][1])),
                ],
                [
                  (p = n === ur ? R : rr(e[0][0], e[1][0])),
                  (_ = n === lr ? N : rr(e[0][1], e[1][1])),
                ],
              ]),
                D.length > 1 && H();
            } else (o = S[0][0]), (l = S[0][1]), (p = S[1][0]), (_ = S[1][1]);
            (i = o), (u = l), (f = p), (d = _);
            var P = Fn(y).attr("pointer-events", "none"),
              U = P.selectAll(".overlay").attr("cursor", sr[v]);
            ut(y);
            var G = c(y, arguments, !0).beforestart();
            if (t.touches) (G.moved = I), (G.ended = F);
            else {
              var T = Fn(t.view)
                .on("mousemove.brush", I, !0)
                .on("mouseup.brush", F, !0);
              a && T.on("keydown.brush", O, !0).on("keyup.brush", j, !0),
                jn(t.view);
            }
            s.call(y), G.start(t, b.name);
          }
          function I(n) {
            for (const e of n.changedTouches || [n])
              for (const n of D)
                n.identifier === e.identifier && (n.cur = Te(e, y));
            if (B && !m && !g && 1 === D.length) {
              const n = D[0];
              tr(n.cur[0] - n[0]) > tr(n.cur[1] - n[1]) ? (g = !0) : (m = !0);
            }
            for (const n of D) n.cur && ((n[0] = n.cur[0]), (n[1] = n.cur[1]));
            (h = !0), Zt(n), H(n);
          }
          function H(n) {
            const e = D[0],
              t = e.point0;
            var r;
            switch (((C = e[0] - t[0]), (L = e[1] - t[1]), b)) {
              case Qt:
              case Jt:
                w && ((C = rr(A - o, or(R - p, C))), (i = o + C), (f = p + C)),
                  k &&
                    ((L = rr(M - l, or(N - _, L))), (u = l + L), (d = _ + L));
                break;
              case nr:
                D[1]
                  ? (w &&
                      ((i = rr(A, or(R, D[0][0]))),
                      (f = rr(A, or(R, D[1][0]))),
                      (w = 1)),
                    k &&
                      ((u = rr(M, or(N, D[0][1]))),
                      (d = rr(M, or(N, D[1][1]))),
                      (k = 1)))
                  : (w < 0
                      ? ((C = rr(A - o, or(R - o, C))), (i = o + C), (f = p))
                      : w > 0 &&
                        ((C = rr(A - p, or(R - p, C))), (i = o), (f = p + C)),
                    k < 0
                      ? ((L = rr(M - l, or(N - l, L))), (u = l + L), (d = _))
                      : k > 0 &&
                        ((L = rr(M - _, or(N - _, L))), (u = l), (d = _ + L)));
                break;
              case er:
                w &&
                  ((i = rr(A, or(R, o - C * w))),
                  (f = rr(A, or(R, p + C * w)))),
                  k &&
                    ((u = rr(M, or(N, l - L * k))),
                    (d = rr(M, or(N, _ + L * k))));
            }
            f < i &&
              ((w *= -1),
              (r = o),
              (o = p),
              (p = r),
              (r = i),
              (i = f),
              (f = r),
              v in cr && U.attr("cursor", sr[(v = cr[v])])),
              d < u &&
                ((k *= -1),
                (r = l),
                (l = _),
                (_ = r),
                (r = u),
                (u = d),
                (d = r),
                v in pr && U.attr("cursor", sr[(v = pr[v])])),
              E.selection && (S = E.selection),
              m && ((i = S[0][0]), (f = S[1][0])),
              g && ((u = S[0][1]), (d = S[1][1])),
              (S[0][0] === i &&
                S[0][1] === u &&
                S[1][0] === f &&
                S[1][1] === d) ||
                ((E.selection = [
                  [i, u],
                  [f, d],
                ]),
                s.call(y),
                G.brush(n, b.name));
          }
          function F(n) {
            if ((Yt(n), n.touches)) {
              if (n.touches.length) return;
              e && clearTimeout(e),
                (e = setTimeout(function () {
                  e = null;
                }, 500));
            } else
              Kn(n.view, h),
                T.on(
                  "keydown.brush keyup.brush mousemove.brush mouseup.brush",
                  null
                );
            P.attr("pointer-events", "all"),
              U.attr("cursor", sr.overlay),
              E.selection && (S = E.selection),
              vr(S) && ((E.selection = null), s.call(y)),
              G.end(n, b.name);
          }
          function O(n) {
            switch (n.keyCode) {
              case 16:
                B = w && k;
                break;
              case 18:
                b === nr &&
                  (w && ((p = f - C * w), (o = i + C * w)),
                  k && ((_ = d - L * k), (l = u + L * k)),
                  (b = er),
                  H());
                break;
              case 32:
                (b !== nr && b !== er) ||
                  (w < 0 ? (p = f - C) : w > 0 && (o = i - C),
                  k < 0 ? (_ = d - L) : k > 0 && (l = u - L),
                  (b = Qt),
                  U.attr("cursor", sr.selection),
                  H());
                break;
              default:
                return;
            }
            Zt(n);
          }
          function j(n) {
            switch (n.keyCode) {
              case 16:
                B && ((m = g = B = !1), H());
                break;
              case 18:
                b === er &&
                  (w < 0 ? (p = f) : w > 0 && (o = i),
                  k < 0 ? (_ = d) : k > 0 && (l = u),
                  (b = nr),
                  H());
                break;
              case 32:
                b === Qt &&
                  (n.altKey
                    ? (w && ((p = f - C * w), (o = i + C * w)),
                      k && ((_ = d - L * k), (l = u + L * k)),
                      (b = er))
                    : (w < 0 ? (p = f) : w > 0 && (o = i),
                      k < 0 ? (_ = d) : k > 0 && (l = u),
                      (b = nr)),
                  U.attr("cursor", sr[v]),
                  H());
                break;
              default:
                return;
            }
            Zt(n);
          }
        }
        function _(n) {
          c(this, arguments).moved(n);
        }
        function d(n) {
          c(this, arguments).ended(n);
        }
        function h() {
          var e = this.__brush || { selection: null };
          return (e.extent = ir(t.apply(this, arguments))), (e.dim = n), e;
        }
        return (
          (u.move = function (e, t) {
            e.tween
              ? e
                  .on("start.brush", function (n) {
                    c(this, arguments).beforestart().start(n);
                  })
                  .on("interrupt.brush end.brush", function (n) {
                    c(this, arguments).end(n);
                  })
                  .tween("brush", function () {
                    var e = this,
                      r = e.__brush,
                      o = c(e, arguments),
                      a = r.selection,
                      i = n.input(
                        "function" == typeof t ? t.apply(this, arguments) : t,
                        r.extent
                      ),
                      l = Ge(a, i);
                    function u(n) {
                      (r.selection = 1 === n && null === i ? null : l(n)),
                        s.call(e),
                        o.brush();
                    }
                    return null !== a && null !== i ? u : u(1);
                  })
              : e.each(function () {
                  var e = this,
                    r = arguments,
                    o = e.__brush,
                    a = n.input(
                      "function" == typeof t ? t.apply(e, r) : t,
                      o.extent
                    ),
                    i = c(e, r).beforestart();
                  ut(e),
                    (o.selection = null === a ? null : a),
                    s.call(e),
                    i.start().brush().end();
                });
          }),
          (u.clear = function (n) {
            u.move(n, null);
          }),
          (p.prototype = {
            beforestart: function () {
              return (
                1 == ++this.active &&
                  ((this.state.emitter = this), (this.starting = !0)),
                this
              );
            },
            start: function (n, e) {
              return (
                this.starting
                  ? ((this.starting = !1), this.emit("start", n, e))
                  : this.emit("brush", n),
                this
              );
            },
            brush: function (n, e) {
              return this.emit("brush", n, e), this;
            },
            end: function (n, e) {
              return (
                0 == --this.active &&
                  (delete this.state.emitter, this.emit("end", n, e)),
                this
              );
            },
            emit: function (e, t, r) {
              var o = Fn(this.that).datum();
              i.call(
                e,
                this.that,
                new qt(e, {
                  sourceEvent: t,
                  target: u,
                  selection: n.output(this.state.selection),
                  mode: r,
                  dispatch: i,
                }),
                o
              );
            },
          }),
          (u.extent = function (n) {
            return arguments.length
              ? ((t = "function" == typeof n ? n : Xt(ir(n))), u)
              : t;
          }),
          (u.filter = function (n) {
            return arguments.length
              ? ((r = "function" == typeof n ? n : Xt(!!n)), u)
              : r;
          }),
          (u.touchable = function (n) {
            return arguments.length
              ? ((o = "function" == typeof n ? n : Xt(!!n)), u)
              : o;
          }),
          (u.handleSize = function (n) {
            return arguments.length ? ((l = +n), u) : l;
          }),
          (u.keyModifiers = function (n) {
            return arguments.length ? ((a = !!n), u) : a;
          }),
          (u.on = function () {
            var n = i.on.apply(i, arguments);
            return n === i ? u : n;
          }),
          u
        );
      })(lr)
        .extent([
          [0, 0],
          [this.viewWidth, this.viewHeight],
        ])
        .on("start brush end", function (n) {
          switch (n.type) {
            case "start":
            case "brush":
              const [r, o] = n.selection,
                a = [t.xScale.invert(r), t.xScale.invert(o)];
              (t.filterBounds = a),
                e(
                  (n) =>
                    n.year >= t.filterBounds[0] && n.year <= t.filterBounds[1]
                );
              break;
            case "end":
              null == n.selection && ((t.filterBounds = null), e(null));
          }
        });
      this.svg
        .append("g")
        .classed("brush", !0)
        .call(r)
        .attr("transform", `translate(0, ${this.viewHeight})`),
        t.update(n);
    }
    update(n) {
      const e = this.yScale.range()[1],
        t = (n) => this.yScale(n.length),
        r = m()
          .value((n) => n.year)
          .domain(this.xScale.domain())
          .thresholds(this.xScale.ticks(20))(n);
      this.timeG
        .selectAll("rect")
        .data(r)
        .join("rect")
        .attr("x", (n) => this.xScale(n.x0))
        .attr("y", (n) => e - t(n))
        .attr("height", t)
        .attr("width", (n) => this.xScale(n.x1) - this.xScale(n.x0))
        .attr("fill", sl(0.5))
        .attr("stroke", "black");
    }
  }
  class Hl {
    constructor(n, e) {
      (this.allData = e),
        (this.viewWidth = Cl / 4),
        (this.viewHeight = Nl / 3),
        (this.wordColors = {}),
        (this.depictsTooltip = Fn("body").append("div")),
        (this.depictsG = n
          .append("g")
          .classed("depicts", !0)
          .attr("transform", `translate(0, ${(2 * Nl) / 3})`));
    }
    initialize(n) {
      let e = Ll(n, "depicts").map((n) => n.word);
      e.push("SPECIAL_ROOT_STRING");
      for (const n of e)
        this.wordColors[n] || (this.wordColors[n] = Ml(Math.random()));
      this.update(n);
    }
    update(n) {
      let e = Ll(n, "depicts");
      e.push({ word: "SPECIAL_ROOT_STRING", val: 0 });
      const t = (function () {
        var n = ki,
          e = Ei;
        function t(t) {
          var r,
            o,
            a,
            i,
            l,
            u,
            s,
            c = Array.from(t),
            p = c.length,
            f = new Map();
          for (o = 0; o < p; ++o)
            (r = c[o]),
              (l = c[o] = new Qa(r)),
              null != (u = n(r, o, t)) &&
                (u += "") &&
                ((s = l.id = u), f.set(s, f.has(s) ? wi : l)),
              null != (u = e(r, o, t)) && (u += "") && (l.parent = u);
          for (o = 0; o < p; ++o)
            if ((u = (l = c[o]).parent)) {
              if (!(i = f.get(u))) throw new Error("missing: " + u);
              if (i === wi) throw new Error("ambiguous: " + u);
              i.children ? i.children.push(l) : (i.children = [l]),
                (l.parent = i);
            } else {
              if (a) throw new Error("multiple roots");
              a = l;
            }
          if (!a) throw new Error("no root");
          if (
            ((a.parent = bi),
            a
              .eachBefore(function (n) {
                (n.depth = n.parent.depth + 1), --p;
              })
              .eachBefore(Ja),
            (a.parent = null),
            p > 0)
          )
            throw new Error("cycle");
          return a;
        }
        return (
          (t.id = function (e) {
            return arguments.length ? ((n = _i(e)), t) : n;
          }),
          (t.parentId = function (n) {
            return arguments.length ? ((e = _i(n)), t) : e;
          }),
          t
        );
      })()
        .id((n) => n.word)
        .parentId((n) =>
          "SPECIAL_ROOT_STRING" == n.word ? null : "SPECIAL_ROOT_STRING"
        )(e);
      t.sum((n) => n.val).sort((n, e) => e.value - n.value);
      const r = (function () {
          var n = Mi,
            e = !1,
            t = 1,
            r = 1,
            o = [0],
            a = di,
            i = di,
            l = di,
            u = di,
            s = di;
          function c(n) {
            return (
              (n.x0 = n.y0 = 0),
              (n.x1 = t),
              (n.y1 = r),
              n.eachBefore(p),
              (o = [0]),
              e && n.eachBefore(xi),
              n
            );
          }
          function p(e) {
            var t = o[e.depth],
              r = e.x0 + t,
              c = e.y0 + t,
              p = e.x1 - t,
              f = e.y1 - t;
            p < r && (r = p = (r + p) / 2),
              f < c && (c = f = (c + f) / 2),
              (e.x0 = r),
              (e.y0 = c),
              (e.x1 = p),
              (e.y1 = f),
              e.children &&
                ((t = o[e.depth + 1] = a(e) / 2),
                (r += s(e) - t),
                (c += i(e) - t),
                (p -= l(e) - t) < r && (r = p = (r + p) / 2),
                (f -= u(e) - t) < c && (c = f = (c + f) / 2),
                n(e, r, c, p, f));
          }
          return (
            (c.round = function (n) {
              return arguments.length ? ((e = !!n), c) : e;
            }),
            (c.size = function (n) {
              return arguments.length ? ((t = +n[0]), (r = +n[1]), c) : [t, r];
            }),
            (c.tile = function (e) {
              return arguments.length ? ((n = _i(e)), c) : n;
            }),
            (c.padding = function (n) {
              return arguments.length
                ? c.paddingInner(n).paddingOuter(n)
                : c.paddingInner();
            }),
            (c.paddingInner = function (n) {
              return arguments.length
                ? ((a = "function" == typeof n ? n : hi(+n)), c)
                : a;
            }),
            (c.paddingOuter = function (n) {
              return arguments.length
                ? c
                    .paddingTop(n)
                    .paddingRight(n)
                    .paddingBottom(n)
                    .paddingLeft(n)
                : c.paddingTop();
            }),
            (c.paddingTop = function (n) {
              return arguments.length
                ? ((i = "function" == typeof n ? n : hi(+n)), c)
                : i;
            }),
            (c.paddingRight = function (n) {
              return arguments.length
                ? ((l = "function" == typeof n ? n : hi(+n)), c)
                : l;
            }),
            (c.paddingBottom = function (n) {
              return arguments.length
                ? ((u = "function" == typeof n ? n : hi(+n)), c)
                : u;
            }),
            (c.paddingLeft = function (n) {
              return arguments.length
                ? ((s = "function" == typeof n ? n : hi(+n)), c)
                : s;
            }),
            c
          );
        })().size([this.viewWidth, this.viewHeight])(t),
        o = this,
        a = this.depictsG
          .selectAll(".depictsIndG")
          .data(r)
          .join("g")
          .classed("depictsIndG", !0)
          .attr("transform", (n) => `translate(${n.x0}, ${n.y0})`);
      a
        .on("mouseenter", function (n, e) {
          o.depictsTooltip.text(e.data.word);
        })
        .on("mousemove", function (n) {
          o.depictsTooltip.attr(
            "style",
            `position: absolute; top: ${n.clientY + 10}px; left: ${
              n.clientX
            }px; background-color: #fff;`
          );
        })
        .on("mouseleave", function () {
          o.depictsTooltip.attr("style", "visibility: hidden;");
        }),
        a
          .selectAll("rect")
          .data((n) => n)
          .join("rect")
          .attr("width", (n) => n.x1 - n.x0)
          .attr("height", (n) => n.y1 - n.y0)
          .attr("stroke", "black")
          .attr("fill", (n) => o.wordColors[n.data.word]),
        a
          .selectAll("text")
          .data((n) => n)
          .join("text")
          .attr("text-anchor", "middle")
          .text((n) =>
            n.x1 - n.x0 > 20 ? n.data.word.slice(0, (n.x1 - n.x0) / 5) : null
          )
          .attr("x", (n) => (n.x1 - n.x0) / 2)
          .attr("y", (n) => (n.y1 - n.y0) / 2)
          .attr("font-size", 8)
          .attr("font-weight", "bold")
          .attr("fill", "#FFF");
    }
  }
  class Fl {
    constructor(n, e) {
      (this.currentData = e),
        (this.npaintings = e.length),
        (this.viewWidth = Cl / 2),
        (this.viewHeight = Nl),
        (this.clusterG = n
          .append("g")
          .classed("cluster", !0)
          .attr("display", "block")
          .attr("transform", `translate(${Cl / 4}, 0)`));
    }
    drawClusters(n) {
      const t = (function (n, ...t) {
          return (function (n, e, t, r) {
            return (function n(o, a) {
              if (a >= r.length) return t(o);
              const i = new Map(),
                l = r[a++];
              let u = -1;
              for (const n of o) {
                const e = l(n, ++u, o),
                  t = i.get(e);
                t ? t.push(n) : i.set(e, [n]);
              }
              for (const [e, t] of i) i.set(e, n(t, a));
              return e(i);
            })(n, 0);
          })(n, e, e, t);
        })(
          Array.from({ length: n.length }, (e, t) => ({
            group: n[t].locLabel,
            value: -Math.log(Math.random()),
          })),
          (n) => n.group
        ),
        r = tl(Array.from(t.keys()), ll),
        o = Xa({ children: Array.from(t, ([, n]) => ({ children: n })) }),
        a = (() =>
          (function () {
            var n = null,
              e = 1,
              t = 1,
              r = di;
            function o(o) {
              return (
                (o.x = e / 2),
                (o.y = t / 2),
                n
                  ? o.eachBefore(gi(n)).eachAfter(yi(r, 0.5)).eachBefore(vi(1))
                  : o
                      .eachBefore(gi(mi))
                      .eachAfter(yi(di, 1))
                      .eachAfter(yi(r, o.r / Math.min(e, t)))
                      .eachBefore(vi(Math.min(e, t) / (2 * o.r))),
                o
              );
            }
            return (
              (o.radius = function (e) {
                return arguments.length ? ((n = fi(e)), o) : n;
              }),
              (o.size = function (n) {
                return arguments.length
                  ? ((e = +n[0]), (t = +n[1]), o)
                  : [e, t];
              }),
              (o.padding = function (n) {
                return arguments.length
                  ? ((r = "function" == typeof n ? n : hi(+n)), o)
                  : r;
              }),
              o
            );
          })()
            .size([this.viewWidth, this.viewHeight])
            .padding(1)(o.sum((n) => n.value)))();
      this.clusterG.selectAll("*").remove(),
        this.clusterG
          .append("g")
          .attr("fill", "none")
          .attr("stroke", "#ccc")
          .selectAll("circle")
          .data(a.descendants().filter((n) => 1 === n.height))
          .join("circle")
          .attr("id", "cluster")
          .attr("cx", (n) => n.x)
          .attr("cy", (n) => n.y)
          .attr("r", (n) => n.r),
        this.clusterG
          .append("g")
          .selectAll("circle")
          .data(a.leaves())
          .join("circle")
          .attr("cx", (n) => n.x)
          .attr("cy", (n) => n.y)
          .attr("r", (n) => n.r)
          .attr("fill", (n) => r(n.data.group));
    }
    initialize(n, e) {
      this.drawClusters(n);
    }
    update(n) {
      n.length <= 0
        ? this.clusterG.attr("display", "none")
        : (Ul(n, this.currentData) ||
            ((this.currentData = n),
            (this.npaintings = n.length),
            this.drawClusters(n)),
          this.clusterG.attr("display", "block"));
    }
  }
  class Ol {
    constructor(n, e) {
      (this.svg = n),
        (this.currentData = e),
        (this.npaintings = e.length),
        (this.paintingNumber = 0),
        (this.viewWidth = Cl / 4),
        (this.viewHeight = Nl),
        (this.paintingG = n
          .append("g")
          .classed("painting", !0)
          .attr("transform", `translate(${(3 * Cl) / 4}, 0)`)),
        (this.arrowG = this.paintingG.append("g").classed("arrows", !0)),
        (this.displayG = this.paintingG
          .append("g")
          .classed("display-info", !0)
          .attr("display", "block")
          .attr("transform", `translate(0, ${this.viewHeight / 8})`));
    }
    addText(n, e, t, r) {
      return this.displayG
        .append("text")
        .attr("class", n)
        .attr("transform", `translate(${e}, ${t})`)
        .text(r)
        .call(Dl, (3 * this.viewWidth) / 4);
    }
    async loadPainting() {
      this.arrowG
        .select("text")
        .text(`${this.paintingNumber + 1} / ${this.npaintings}`),
        this.displayG.selectAll("*").remove(),
        this.addText(
          "loading",
          this.viewWidth / 2,
          0,
          "Loading painting..."
        ).attr("text-anchor", "middle");
      const n = this.currentData[this.paintingNumber],
        e = n.artworkLabel.trim(),
        t = n.year,
        r = n.locLabel.trim(),
        o = n.collectionLabel,
        a = n.movement,
        i = n.genreLabel,
        l = n.materialLabel,
        u = n.creatorLabel.trim(),
        s = n.creatorBirthPlaceLabel.trim(),
        c = n.creatorCountry.trim(),
        p = n.wikidataUrl.trim(),
        f = n.image.trim(),
        _ = await ((d = f),
        new Promise((n, e) => {
          let t = new Image();
          (t.onload = () => n(t)), (t.onerror = () => e()), (t.src = d);
        }));
      var d;
      this.displayG.selectAll("*").remove();
      const h = `${Pl(e) || /Q[0-9]+$/.test(e) ? "Unknown Title" : e} (${
        Pl(t) ? "Unknown" : t
      })`;
      let m = this.addText("title", this.viewWidth / 2, 0, h);
      m.attr("text-anchor", "middle").on("click", function () {
        window.open(p, "_blank");
      });
      const g = m.node().getBBox();
      let y = this.viewWidth / 2,
        v = (y / _.width) * _.height;
      v <= 0
        ? (v = 50)
        : v >= 250 && ((v = 250), (y = (v / _.height) * _.width));
      const b = (this.viewWidth - y) / 2,
        w = g.height - 5;
      let k = Fn("#paintingModal");
      k
        .select("img")
        .attr("src", f)
        .attr("width", "100%")
        .attr("height", "100%")
        .on("click", function () {
          window.open(f, "_blank");
        }),
        k.select("a").attr("href", p).text(h),
        k.select("span").on("click", function () {
          k.style("display", "none");
        });
      let E = this.displayG
        .append("rect")
        .attr("transform", `translate(${b - 5}, ${w - 5})`)
        .attr("width", y + 10)
        .attr("height", v + 10)
        .attr("fill", sl(0.5))
        .attr("opacity", "0");
      this.displayG
        .append("svg:image")
        .attr("id", "preview")
        .attr("href", f)
        .attr("transform", `translate(${b}, ${w})`)
        .attr("width", y)
        .attr("height", v)
        .on("click", function () {
          k.style("display", "block");
        })
        .on("mouseover", function () {
          E.transition().duration(100).style("opacity", 0.9);
        })
        .on("mouseout", function () {
          E.transition().duration(100).style("opacity", 0);
        });
      let x = this.viewWidth / 8,
        S = w + v + 30;
      S += this.addText("artist-title", x, S, "Artist").node().getBBox().height;
      const A = [Pl(u) ? "Unknown Artist" : u, Pl(s) ? "" : s, Pl(c) ? "" : c]
        .filter(Boolean)
        .join("; ");
      let M =
        S + this.addText("artist-info", x, S, A).node().getBBox().height + 5;
      M += this.addText("coll-title", x, M, "Collection").node().getBBox()
        .height;
      const R = Pl(r) ? "Unknown" : r;
      o.filter((n) => n !== R).push(R);
      const N = o.join("; ");
      let C =
        M + this.addText("coll-info", x, M, N).node().getBBox().height + 5;
      C += this.addText("movement-title", x, C, "Movement").node().getBBox()
        .height;
      const L = Pl(a[0]) ? "Unknown" : a.join("; ");
      let B =
        C + this.addText("movement-info", x, C, L).node().getBBox().height + 5;
      B += this.addText("genre-title", x, B, "Genre").node().getBBox().height;
      const D = Pl(i[0]) ? "Unknown" : i.join("; ");
      let P =
        B + this.addText("genre-info", x, B, D).node().getBBox().height + 5;
      P += this.addText("material-title", x, P, "Material").node().getBBox()
        .height;
      const U = Pl(l[0]) ? "Unknown" : l.join("; ");
      this.addText("material-info", x, P, U);
    }
    initialize() {
      const n = this,
        e = n.viewHeight / 16,
        t = n.viewHeight / 16,
        r = [n.viewWidth / 2, n.viewHeight / 16];
      this.arrowG
        .append("text")
        .attr("class", "counter")
        .attr("transform", `translate(${r[0]}, ${r[1]})`)
        .attr("text-anchor", "middle")
        .text(`${n.paintingNumber + 1} / ${n.npaintings}`);
      const o = [n.viewWidth / 3 - e / 2, t / 4];
      let a = this.arrowG
        .append("rect")
        .attr("transform", `translate(${o[0] + e / 4}, ${o[1]})`)
        .attr("width", e / 2)
        .attr("height", t)
        .attr("fill", sl(0.5))
        .attr("opacity", "0");
      this.arrowG
        .append("svg:image")
        .attr("id", "left-arrow")
        .attr("xlink:href", "src/assets/left-arrow.svg")
        .attr("transform", `translate(${o[0]}, ${o[1]})`)
        .attr("width", e)
        .attr("height", t)
        .on("click", function () {
          n.paintingNumber > 0 &&
            "block" == n.displayG.style("display") &&
            (--n.paintingNumber, n.loadPainting());
        })
        .on("mouseover", function () {
          a.transition().duration(100).style("opacity", 0.9);
        })
        .on("mouseout", function () {
          a.transition().duration(100).style("opacity", 0);
        });
      const i = [(2 * n.viewWidth) / 3 - e / 2, t / 4];
      let l = this.arrowG
        .append("rect")
        .attr("transform", `translate(${i[0] + e / 4}, ${i[1]})`)
        .attr("width", e / 2)
        .attr("height", t)
        .attr("fill", sl(0.5))
        .attr("opacity", "0");
      this.arrowG
        .append("svg:image")
        .attr("id", "right-arrow")
        .attr("xlink:href", "src/assets/right-arrow.svg")
        .attr("transform", `translate(${i[0]}, ${i[1]})`)
        .attr("width", e)
        .attr("height", t)
        .on("click", function () {
          n.paintingNumber < n.npaintings - 1 &&
            "block" == n.displayG.style("display") &&
            (++n.paintingNumber, n.loadPainting());
        })
        .on("mouseover", function () {
          l.transition().duration(100).style("opacity", 0.9);
        })
        .on("mouseout", function () {
          l.transition().duration(100).style("opacity", 0);
        }),
        n.loadPainting();
    }
    update(n) {
      n.length <= 0
        ? (this.arrowG.select("text").text("0 / 0"),
          this.displayG.style("display", "none"))
        : (Ul(n, this.currentData)
            ? this.arrowG
                .select("text")
                .text(`${this.paintingNumber + 1} / ${this.npaintings}`)
            : ((this.currentData = n),
              (this.npaintings = n.length),
              (this.paintingNumber = 0),
              this.loadPainting()),
          this.displayG.style("display", "block"));
    }
  }
  (window.onresize = function () {
    location.reload();
  }),
    (async function () {
      let n = await Dr("src/data/data-to-visualize.csv");
      n.forEach((n) => {
        (n.year = parseInt(n.year)),
          (n.depicts = n.depicts.split(";").map((n) => n.trim())),
          (n.collectionLabel = n.collectionLabel
            .split(";")
            .map((n) => n.trim())),
          (n.movement = n.movement.split(";").map((n) => n.trim())),
          (n.genreLabel = n.genreLabel.split(";").map((n) => n.trim())),
          (n.materialLabel = n.materialLabel.split(";").map((n) => n.trim()));
      }),
        Fn("body").attr("style", "margin: 0px;");
      let e = Fn("body").append("svg").attr("height", Nl).attr("width", Cl);
      const t = new Tl(e, n),
        r = new Il(e, n),
        o = new Hl(e, n),
        a = new Ol(e, n),
        i = new Fl(e, n),
        l = { map: t, time: r, depicts: o, painting: a, cluster: i },
        u = {};
      function s(e) {
        let t = n;
        for (const [n, r] of Object.entries(u))
          r && n != e && (t = t.filter(r));
        return t;
      }
      function c(n) {
        return function (e) {
          (u[n] = e),
            (function () {
              for (const n of Object.keys(l)) l[n].update(s(n));
            })();
        };
      }
      t.initialize(n, c("map")),
        r.initialize(n, c("time")),
        o.initialize(n),
        i.initialize(n, c("cluster")),
        a.initialize();
    })();
})();

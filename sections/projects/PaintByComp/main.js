(() => {
  "use strict";
  function n(n, t) {
    let e, r;
    if (void 0 === t)
      for (const t of n)
        null != t &&
          (void 0 === e
            ? t >= t && (e = r = t)
            : (e > t && (e = t), r < t && (r = t)));
    else {
      let o = -1;
      for (let a of n)
        null != (a = t(a, ++o, n)) &&
          (void 0 === e
            ? a >= a && (e = r = a)
            : (e > a && (e = a), r < a && (r = a)));
    }
    return [e, r];
  }
  function t(n) {
    return n;
  }
  var e = Array.prototype,
    r = e.slice;
  function o(n, t) {
    return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
  }
  function a(n) {
    let t = n,
      e = n;
    function r(n, t, r, o) {
      for (null == r && (r = 0), null == o && (o = n.length); r < o; ) {
        const a = (r + o) >>> 1;
        e(n[a], t) < 0 ? (r = a + 1) : (o = a);
      }
      return r;
    }
    return (
      1 === n.length &&
        ((t = (t, e) => n(t) - e),
        (e = (function (n) {
          return (t, e) => o(n(t), e);
        })(n))),
      {
        left: r,
        center: function (n, e, o, a) {
          null == o && (o = 0), null == a && (a = n.length);
          const i = r(n, e, o, a - 1);
          return i > o && t(n[i - 1], e) > -t(n[i], e) ? i - 1 : i;
        },
        right: function (n, t, r, o) {
          for (null == r && (r = 0), null == o && (o = n.length); r < o; ) {
            const a = (r + o) >>> 1;
            e(n[a], t) > 0 ? (o = a) : (r = a + 1);
          }
          return r;
        },
      }
    );
  }
  e.map;
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
  function _(n, t, e) {
    var r,
      o,
      a,
      i,
      l = -1;
    if (((e = +e), (n = +n) == (t = +t) && e > 0)) return [n];
    if (
      ((r = t < n) && ((o = n), (n = t), (t = o)),
      0 === (i = d(n, t, e)) || !isFinite(i))
    )
      return [];
    if (i > 0)
      for (
        n = Math.ceil(n / i),
          t = Math.floor(t / i),
          a = new Array((o = Math.ceil(t - n + 1)));
        ++l < o;

      )
        a[l] = (n + l) * i;
    else
      for (
        i = -i,
          n = Math.ceil(n * i),
          t = Math.floor(t * i),
          a = new Array((o = Math.ceil(t - n + 1)));
        ++l < o;

      )
        a[l] = (n + l) / i;
    return r && a.reverse(), a;
  }
  function d(n, t, e) {
    var r = (t - n) / Math.max(0, e),
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
          (function (n, t) {
            let e = 0;
            for (let t of n) null != t && (t = +t) >= t && ++e;
            return e;
          })(n)
        ) / Math.LN2
      ) + 1
    );
  }
  function m() {
    var e = t,
      o = n,
      a = h;
    function i(t) {
      Array.isArray(t) || (t = Array.from(t));
      var r,
        i,
        l = t.length,
        s = new Array(l);
      for (r = 0; r < l; ++r) s[r] = e(t[r], r, t);
      var c = o(s),
        p = c[0],
        f = c[1],
        h = a(s, p, f);
      Array.isArray(h) ||
        ((h = +h),
        o === n &&
          ([p, f] = (function (n, t, e) {
            let r;
            for (;;) {
              const o = d(n, t, e);
              if (o === r || 0 === o || !isFinite(o)) return [n, t];
              o > 0
                ? ((n = Math.floor(n / o) * o), (t = Math.ceil(t / o) * o))
                : o < 0 &&
                  ((n = Math.ceil(n * o) / o), (t = Math.floor(t * o) / o)),
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
        p <= (i = s[r]) && i <= f && y[u(h, i, 0, m)].push(t[r]);
      return y;
    }
    return (
      (i.value = function (n) {
        return arguments.length
          ? ((e = "function" == typeof n ? n : s(n)), i)
          : e;
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
  function g(n, t) {
    let e;
    if (void 0 === t)
      for (const t of n)
        null != t && (e < t || (void 0 === e && t >= t)) && (e = t);
    else {
      let r = -1;
      for (let o of n)
        null != (o = t(o, ++r, n)) &&
          (e < o || (void 0 === e && o >= o)) &&
          (e = o);
    }
    return e;
  }
  var y = Array.prototype.slice;
  function b(n) {
    return n;
  }
  var v = 1e-6;
  function w(n) {
    return "translate(" + (n + 0.5) + ",0)";
  }
  function k(n) {
    return "translate(0," + (n + 0.5) + ")";
  }
  function E(n) {
    return (t) => +n(t);
  }
  function x(n) {
    var t = Math.max(0, n.bandwidth() - 1) / 2;
    return (
      n.round() && (t = Math.round(t)),
      function (e) {
        return +n(e) + t;
      }
    );
  }
  function S() {
    return !this.__axis;
  }
  function A(n, t) {
    var e = [],
      r = null,
      o = null,
      a = 6,
      i = 6,
      l = 3,
      u = 1 === n || 4 === n ? -1 : 1,
      s = 4 === n || 2 === n ? "x" : "y",
      c = 1 === n || 3 === n ? w : k;
    function p(p) {
      var f = null == r ? (t.ticks ? t.ticks.apply(t, e) : t.domain()) : r,
        _ = null == o ? (t.tickFormat ? t.tickFormat.apply(t, e) : b) : o,
        d = Math.max(a, 0) + l,
        h = t.range(),
        m = +h[0] + 0.5,
        g = +h[h.length - 1] + 0.5,
        y = (t.bandwidth ? x : E)(t.copy()),
        w = p.selection ? p.selection() : p,
        k = w.selectAll(".domain").data([null]),
        A = w.selectAll(".tick").data(f, t).order(),
        M = A.exit(),
        R = A.enter().append("g").attr("class", "tick"),
        N = A.select("line"),
        C = A.select("text");
      (k = k.merge(
        k
          .enter()
          .insert("path", ".tick")
          .attr("class", "domain")
          .attr("stroke", "currentColor")
      )),
        (A = A.merge(R)),
        (N = N.merge(
          R.append("line")
            .attr("stroke", "currentColor")
            .attr(s + "2", u * a)
        )),
        (C = C.merge(
          R.append("text")
            .attr("fill", "currentColor")
            .attr(s, u * d)
            .attr("dy", 1 === n ? "0em" : 3 === n ? "0.71em" : "0.32em")
        )),
        p !== w &&
          ((k = k.transition(p)),
          (A = A.transition(p)),
          (N = N.transition(p)),
          (C = C.transition(p)),
          (M = M.transition(p)
            .attr("opacity", v)
            .attr("transform", function (n) {
              return isFinite((n = y(n)))
                ? c(n)
                : this.getAttribute("transform");
            })),
          R.attr("opacity", v).attr("transform", function (n) {
            var t = this.parentNode.__axis;
            return c(t && isFinite((t = t(n))) ? t : y(n));
          })),
        M.remove(),
        k.attr(
          "d",
          4 === n || 2 == n
            ? i
              ? "M" + u * i + "," + m + "H0.5V" + g + "H" + u * i
              : "M0.5," + m + "V" + g
            : i
            ? "M" + m + "," + u * i + "V0.5H" + g + "V" + u * i
            : "M" + m + ",0.5H" + g
        ),
        A.attr("opacity", 1).attr("transform", function (n) {
          return c(y(n));
        }),
        N.attr(s + "2", u * a),
        C.attr(s, u * d).text(_),
        w
          .filter(S)
          .attr("fill", "none")
          .attr("font-size", 10)
          .attr("font-family", "sans-serif")
          .attr("text-anchor", 2 === n ? "start" : 4 === n ? "end" : "middle"),
        w.each(function () {
          this.__axis = y;
        });
    }
    return (
      (p.scale = function (n) {
        return arguments.length ? ((t = n), p) : t;
      }),
      (p.ticks = function () {
        return (e = y.call(arguments)), p;
      }),
      (p.tickArguments = function (n) {
        return arguments.length
          ? ((e = null == n ? [] : y.call(n)), p)
          : e.slice();
      }),
      (p.tickValues = function (n) {
        return arguments.length
          ? ((r = null == n ? null : y.call(n)), p)
          : r && r.slice();
      }),
      (p.tickFormat = function (n) {
        return arguments.length ? ((o = n), p) : o;
      }),
      (p.tickSize = function (n) {
        return arguments.length ? ((a = i = +n), p) : a;
      }),
      (p.tickSizeInner = function (n) {
        return arguments.length ? ((a = +n), p) : a;
      }),
      (p.tickSizeOuter = function (n) {
        return arguments.length ? ((i = +n), p) : i;
      }),
      (p.tickPadding = function (n) {
        return arguments.length ? ((l = +n), p) : l;
      }),
      p
    );
  }
  var M = { value: () => {} };
  function R() {
    for (var n, t = 0, e = arguments.length, r = {}; t < e; ++t) {
      if (!(n = arguments[t] + "") || n in r || /[\s.]/.test(n))
        throw new Error("illegal type: " + n);
      r[n] = [];
    }
    return new N(r);
  }
  function N(n) {
    this._ = n;
  }
  function C(n, t) {
    return n
      .trim()
      .split(/^|\s+/)
      .map(function (n) {
        var e = "",
          r = n.indexOf(".");
        if (
          (r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
          n && !t.hasOwnProperty(n))
        )
          throw new Error("unknown type: " + n);
        return { type: n, name: e };
      });
  }
  function B(n, t) {
    for (var e, r = 0, o = n.length; r < o; ++r)
      if ((e = n[r]).name === t) return e.value;
  }
  function L(n, t, e) {
    for (var r = 0, o = n.length; r < o; ++r)
      if (n[r].name === t) {
        (n[r] = M), (n = n.slice(0, r).concat(n.slice(r + 1)));
        break;
      }
    return null != e && n.push({ name: t, value: e }), n;
  }
  N.prototype = R.prototype = {
    constructor: N,
    on: function (n, t) {
      var e,
        r = this._,
        o = C(n + "", r),
        a = -1,
        i = o.length;
      if (!(arguments.length < 2)) {
        if (null != t && "function" != typeof t)
          throw new Error("invalid callback: " + t);
        for (; ++a < i; )
          if ((e = (n = o[a]).type)) r[e] = L(r[e], n.name, t);
          else if (null == t) for (e in r) r[e] = L(r[e], n.name, null);
        return this;
      }
      for (; ++a < i; )
        if ((e = (n = o[a]).type) && (e = B(r[e], n.name))) return e;
    },
    copy: function () {
      var n = {},
        t = this._;
      for (var e in t) n[e] = t[e].slice();
      return new N(n);
    },
    call: function (n, t) {
      if ((e = arguments.length - 2) > 0)
        for (var e, r, o = new Array(e), a = 0; a < e; ++a)
          o[a] = arguments[a + 2];
      if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
      for (a = 0, e = (r = this._[n]).length; a < e; ++a)
        r[a].value.apply(t, o);
    },
    apply: function (n, t, e) {
      if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
      for (var r = this._[n], o = 0, a = r.length; o < a; ++o)
        r[o].value.apply(t, e);
    },
  };
  const D = R;
  function G() {}
  function F(n) {
    return null == n
      ? G
      : function () {
          return this.querySelector(n);
        };
  }
  function T(n) {
    return "object" == typeof n && "length" in n ? n : Array.from(n);
  }
  function P() {
    return [];
  }
  function U(n) {
    return null == n
      ? P
      : function () {
          return this.querySelectorAll(n);
        };
  }
  function H(n) {
    return function () {
      return this.matches(n);
    };
  }
  function I(n) {
    return function (t) {
      return t.matches(n);
    };
  }
  var O = Array.prototype.find;
  function j() {
    return this.firstElementChild;
  }
  var K = Array.prototype.filter;
  function z() {
    return this.children;
  }
  function V(n) {
    return new Array(n.length);
  }
  function $(n, t) {
    (this.ownerDocument = n.ownerDocument),
      (this.namespaceURI = n.namespaceURI),
      (this._next = null),
      (this._parent = n),
      (this.__data__ = t);
  }
  function W(n) {
    return function () {
      return n;
    };
  }
  function X(n, t, e, r, o, a) {
    for (var i, l = 0, u = t.length, s = a.length; l < s; ++l)
      (i = t[l]) ? ((i.__data__ = a[l]), (r[l] = i)) : (e[l] = new $(n, a[l]));
    for (; l < u; ++l) (i = t[l]) && (o[l] = i);
  }
  function q(n, t, e, r, o, a, i) {
    var l,
      u,
      s,
      c = new Map(),
      p = t.length,
      f = a.length,
      _ = new Array(p);
    for (l = 0; l < p; ++l)
      (u = t[l]) &&
        ((_[l] = s = i.call(u, u.__data__, l, t) + ""),
        c.has(s) ? (o[l] = u) : c.set(s, u));
    for (l = 0; l < f; ++l)
      (s = i.call(n, a[l], l, a) + ""),
        (u = c.get(s))
          ? ((r[l] = u), (u.__data__ = a[l]), c.delete(s))
          : (e[l] = new $(n, a[l]));
    for (l = 0; l < p; ++l) (u = t[l]) && c.get(_[l]) === u && (o[l] = u);
  }
  function Y(n) {
    return n.__data__;
  }
  function Z(n, t) {
    return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
  }
  $.prototype = {
    constructor: $,
    appendChild: function (n) {
      return this._parent.insertBefore(n, this._next);
    },
    insertBefore: function (n, t) {
      return this._parent.insertBefore(n, t);
    },
    querySelector: function (n) {
      return this._parent.querySelector(n);
    },
    querySelectorAll: function (n) {
      return this._parent.querySelectorAll(n);
    },
  };
  var J = "http://www.w3.org/1999/xhtml";
  const Q = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: J,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
  };
  function nn(n) {
    var t = (n += ""),
      e = t.indexOf(":");
    return (
      e >= 0 && "xmlns" !== (t = n.slice(0, e)) && (n = n.slice(e + 1)),
      Q.hasOwnProperty(t) ? { space: Q[t], local: n } : n
    );
  }
  function tn(n) {
    return function () {
      this.removeAttribute(n);
    };
  }
  function en(n) {
    return function () {
      this.removeAttributeNS(n.space, n.local);
    };
  }
  function rn(n, t) {
    return function () {
      this.setAttribute(n, t);
    };
  }
  function on(n, t) {
    return function () {
      this.setAttributeNS(n.space, n.local, t);
    };
  }
  function an(n, t) {
    return function () {
      var e = t.apply(this, arguments);
      null == e ? this.removeAttribute(n) : this.setAttribute(n, e);
    };
  }
  function ln(n, t) {
    return function () {
      var e = t.apply(this, arguments);
      null == e
        ? this.removeAttributeNS(n.space, n.local)
        : this.setAttributeNS(n.space, n.local, e);
    };
  }
  function un(n) {
    return (
      (n.ownerDocument && n.ownerDocument.defaultView) ||
      (n.document && n) ||
      n.defaultView
    );
  }
  function sn(n) {
    return function () {
      this.style.removeProperty(n);
    };
  }
  function cn(n, t, e) {
    return function () {
      this.style.setProperty(n, t, e);
    };
  }
  function pn(n, t, e) {
    return function () {
      var r = t.apply(this, arguments);
      null == r
        ? this.style.removeProperty(n)
        : this.style.setProperty(n, r, e);
    };
  }
  function fn(n, t) {
    return (
      n.style.getPropertyValue(t) ||
      un(n).getComputedStyle(n, null).getPropertyValue(t)
    );
  }
  function _n(n) {
    return function () {
      delete this[n];
    };
  }
  function dn(n, t) {
    return function () {
      this[n] = t;
    };
  }
  function hn(n, t) {
    return function () {
      var e = t.apply(this, arguments);
      null == e ? delete this[n] : (this[n] = e);
    };
  }
  function mn(n) {
    return n.trim().split(/^|\s+/);
  }
  function gn(n) {
    return n.classList || new yn(n);
  }
  function yn(n) {
    (this._node = n), (this._names = mn(n.getAttribute("class") || ""));
  }
  function bn(n, t) {
    for (var e = gn(n), r = -1, o = t.length; ++r < o; ) e.add(t[r]);
  }
  function vn(n, t) {
    for (var e = gn(n), r = -1, o = t.length; ++r < o; ) e.remove(t[r]);
  }
  function wn(n) {
    return function () {
      bn(this, n);
    };
  }
  function kn(n) {
    return function () {
      vn(this, n);
    };
  }
  function En(n, t) {
    return function () {
      (t.apply(this, arguments) ? bn : vn)(this, n);
    };
  }
  function xn() {
    this.textContent = "";
  }
  function Sn(n) {
    return function () {
      this.textContent = n;
    };
  }
  function An(n) {
    return function () {
      var t = n.apply(this, arguments);
      this.textContent = null == t ? "" : t;
    };
  }
  function Mn() {
    this.innerHTML = "";
  }
  function Rn(n) {
    return function () {
      this.innerHTML = n;
    };
  }
  function Nn(n) {
    return function () {
      var t = n.apply(this, arguments);
      this.innerHTML = null == t ? "" : t;
    };
  }
  function Cn() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function Bn() {
    this.previousSibling &&
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function Ln(n) {
    return function () {
      var t = this.ownerDocument,
        e = this.namespaceURI;
      return e === J && t.documentElement.namespaceURI === J
        ? t.createElement(n)
        : t.createElementNS(e, n);
    };
  }
  function Dn(n) {
    return function () {
      return this.ownerDocument.createElementNS(n.space, n.local);
    };
  }
  function Gn(n) {
    var t = nn(n);
    return (t.local ? Dn : Ln)(t);
  }
  function Fn() {
    return null;
  }
  function Tn() {
    var n = this.parentNode;
    n && n.removeChild(this);
  }
  function Pn() {
    var n = this.cloneNode(!1),
      t = this.parentNode;
    return t ? t.insertBefore(n, this.nextSibling) : n;
  }
  function Un() {
    var n = this.cloneNode(!0),
      t = this.parentNode;
    return t ? t.insertBefore(n, this.nextSibling) : n;
  }
  function Hn(n) {
    return n
      .trim()
      .split(/^|\s+/)
      .map(function (n) {
        var t = "",
          e = n.indexOf(".");
        return (
          e >= 0 && ((t = n.slice(e + 1)), (n = n.slice(0, e))),
          { type: n, name: t }
        );
      });
  }
  function In(n) {
    return function () {
      var t = this.__on;
      if (t) {
        for (var e, r = 0, o = -1, a = t.length; r < a; ++r)
          (e = t[r]),
            (n.type && e.type !== n.type) || e.name !== n.name
              ? (t[++o] = e)
              : this.removeEventListener(e.type, e.listener, e.options);
        ++o ? (t.length = o) : delete this.__on;
      }
    };
  }
  function On(n, t, e) {
    return function () {
      var r,
        o = this.__on,
        a = (function (n) {
          return function (t) {
            n.call(this, t, this.__data__);
          };
        })(t);
      if (o)
        for (var i = 0, l = o.length; i < l; ++i)
          if ((r = o[i]).type === n.type && r.name === n.name)
            return (
              this.removeEventListener(r.type, r.listener, r.options),
              this.addEventListener(r.type, (r.listener = a), (r.options = e)),
              void (r.value = t)
            );
      this.addEventListener(n.type, a, e),
        (r = { type: n.type, name: n.name, value: t, listener: a, options: e }),
        o ? o.push(r) : (this.__on = [r]);
    };
  }
  function jn(n, t, e) {
    var r = un(n),
      o = r.CustomEvent;
    "function" == typeof o
      ? (o = new o(t, e))
      : ((o = r.document.createEvent("Event")),
        e
          ? (o.initEvent(t, e.bubbles, e.cancelable), (o.detail = e.detail))
          : o.initEvent(t, !1, !1)),
      n.dispatchEvent(o);
  }
  function Kn(n, t) {
    return function () {
      return jn(this, n, t);
    };
  }
  function zn(n, t) {
    return function () {
      return jn(this, n, t.apply(this, arguments));
    };
  }
  yn.prototype = {
    add: function (n) {
      this._names.indexOf(n) < 0 &&
        (this._names.push(n),
        this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function (n) {
      var t = this._names.indexOf(n);
      t >= 0 &&
        (this._names.splice(t, 1),
        this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function (n) {
      return this._names.indexOf(n) >= 0;
    },
  };
  var Vn = [null];
  function $n(n, t) {
    (this._groups = n), (this._parents = t);
  }
  function Wn() {
    return new $n([[document.documentElement]], Vn);
  }
  $n.prototype = Wn.prototype = {
    constructor: $n,
    select: function (n) {
      "function" != typeof n && (n = F(n));
      for (
        var t = this._groups, e = t.length, r = new Array(e), o = 0;
        o < e;
        ++o
      )
        for (
          var a, i, l = t[o], u = l.length, s = (r[o] = new Array(u)), c = 0;
          c < u;
          ++c
        )
          (a = l[c]) &&
            (i = n.call(a, a.__data__, c, l)) &&
            ("__data__" in a && (i.__data__ = a.__data__), (s[c] = i));
      return new $n(r, this._parents);
    },
    selectAll: function (n) {
      n =
        "function" == typeof n
          ? (function (n) {
              return function () {
                var t = n.apply(this, arguments);
                return null == t ? [] : T(t);
              };
            })(n)
          : U(n);
      for (
        var t = this._groups, e = t.length, r = [], o = [], a = 0;
        a < e;
        ++a
      )
        for (var i, l = t[a], u = l.length, s = 0; s < u; ++s)
          (i = l[s]) && (r.push(n.call(i, i.__data__, s, l)), o.push(i));
      return new $n(r, o);
    },
    selectChild: function (n) {
      return this.select(
        null == n
          ? j
          : (function (n) {
              return function () {
                return O.call(this.children, n);
              };
            })("function" == typeof n ? n : I(n))
      );
    },
    selectChildren: function (n) {
      return this.selectAll(
        null == n
          ? z
          : (function (n) {
              return function () {
                return K.call(this.children, n);
              };
            })("function" == typeof n ? n : I(n))
      );
    },
    filter: function (n) {
      "function" != typeof n && (n = H(n));
      for (
        var t = this._groups, e = t.length, r = new Array(e), o = 0;
        o < e;
        ++o
      )
        for (var a, i = t[o], l = i.length, u = (r[o] = []), s = 0; s < l; ++s)
          (a = i[s]) && n.call(a, a.__data__, s, i) && u.push(a);
      return new $n(r, this._parents);
    },
    data: function (n, t) {
      if (!arguments.length) return Array.from(this, Y);
      var e = t ? q : X,
        r = this._parents,
        o = this._groups;
      "function" != typeof n && (n = W(n));
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
          _ = T(n.call(c, c && c.__data__, s, r)),
          d = _.length,
          h = (l[s] = new Array(d)),
          m = (i[s] = new Array(d)),
          g = (u[s] = new Array(f));
        e(c, p, h, m, g, _, t);
        for (var y, b, v = 0, w = 0; v < d; ++v)
          if ((y = h[v])) {
            for (v >= w && (w = v + 1); !(b = m[w]) && ++w < d; );
            y._next = b || null;
          }
      }
      return ((i = new $n(i, r))._enter = l), (i._exit = u), i;
    },
    enter: function () {
      return new $n(this._enter || this._groups.map(V), this._parents);
    },
    exit: function () {
      return new $n(this._exit || this._groups.map(V), this._parents);
    },
    join: function (n, t, e) {
      var r = this.enter(),
        o = this,
        a = this.exit();
      return (
        (r = "function" == typeof n ? n(r) : r.append(n + "")),
        null != t && (o = t(o)),
        null == e ? a.remove() : e(a),
        r && o ? r.merge(o).order() : o
      );
    },
    merge: function (n) {
      if (!(n instanceof $n)) throw new Error("invalid merge");
      for (
        var t = this._groups,
          e = n._groups,
          r = t.length,
          o = e.length,
          a = Math.min(r, o),
          i = new Array(r),
          l = 0;
        l < a;
        ++l
      )
        for (
          var u,
            s = t[l],
            c = e[l],
            p = s.length,
            f = (i[l] = new Array(p)),
            _ = 0;
          _ < p;
          ++_
        )
          (u = s[_] || c[_]) && (f[_] = u);
      for (; l < r; ++l) i[l] = t[l];
      return new $n(i, this._parents);
    },
    selection: function () {
      return this;
    },
    order: function () {
      for (var n = this._groups, t = -1, e = n.length; ++t < e; )
        for (var r, o = n[t], a = o.length - 1, i = o[a]; --a >= 0; )
          (r = o[a]) &&
            (i &&
              4 ^ r.compareDocumentPosition(i) &&
              i.parentNode.insertBefore(r, i),
            (i = r));
      return this;
    },
    sort: function (n) {
      function t(t, e) {
        return t && e ? n(t.__data__, e.__data__) : !t - !e;
      }
      n || (n = Z);
      for (
        var e = this._groups, r = e.length, o = new Array(r), a = 0;
        a < r;
        ++a
      ) {
        for (
          var i, l = e[a], u = l.length, s = (o[a] = new Array(u)), c = 0;
          c < u;
          ++c
        )
          (i = l[c]) && (s[c] = i);
        s.sort(t);
      }
      return new $n(o, this._parents).order();
    },
    call: function () {
      var n = arguments[0];
      return (arguments[0] = this), n.apply(null, arguments), this;
    },
    nodes: function () {
      return Array.from(this);
    },
    node: function () {
      for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
        for (var r = n[t], o = 0, a = r.length; o < a; ++o) {
          var i = r[o];
          if (i) return i;
        }
      return null;
    },
    size: function () {
      let n = 0;
      for (const t of this) ++n;
      return n;
    },
    empty: function () {
      return !this.node();
    },
    each: function (n) {
      for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
        for (var o, a = t[e], i = 0, l = a.length; i < l; ++i)
          (o = a[i]) && n.call(o, o.__data__, i, a);
      return this;
    },
    attr: function (n, t) {
      var e = nn(n);
      if (arguments.length < 2) {
        var r = this.node();
        return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
      }
      return this.each(
        (null == t
          ? e.local
            ? en
            : tn
          : "function" == typeof t
          ? e.local
            ? ln
            : an
          : e.local
          ? on
          : rn)(e, t)
      );
    },
    style: function (n, t, e) {
      return arguments.length > 1
        ? this.each(
            (null == t ? sn : "function" == typeof t ? pn : cn)(
              n,
              t,
              null == e ? "" : e
            )
          )
        : fn(this.node(), n);
    },
    property: function (n, t) {
      return arguments.length > 1
        ? this.each((null == t ? _n : "function" == typeof t ? hn : dn)(n, t))
        : this.node()[n];
    },
    classed: function (n, t) {
      var e = mn(n + "");
      if (arguments.length < 2) {
        for (var r = gn(this.node()), o = -1, a = e.length; ++o < a; )
          if (!r.contains(e[o])) return !1;
        return !0;
      }
      return this.each(("function" == typeof t ? En : t ? wn : kn)(e, t));
    },
    text: function (n) {
      return arguments.length
        ? this.each(null == n ? xn : ("function" == typeof n ? An : Sn)(n))
        : this.node().textContent;
    },
    html: function (n) {
      return arguments.length
        ? this.each(null == n ? Mn : ("function" == typeof n ? Nn : Rn)(n))
        : this.node().innerHTML;
    },
    raise: function () {
      return this.each(Cn);
    },
    lower: function () {
      return this.each(Bn);
    },
    append: function (n) {
      var t = "function" == typeof n ? n : Gn(n);
      return this.select(function () {
        return this.appendChild(t.apply(this, arguments));
      });
    },
    insert: function (n, t) {
      var e = "function" == typeof n ? n : Gn(n),
        r = null == t ? Fn : "function" == typeof t ? t : F(t);
      return this.select(function () {
        return this.insertBefore(
          e.apply(this, arguments),
          r.apply(this, arguments) || null
        );
      });
    },
    remove: function () {
      return this.each(Tn);
    },
    clone: function (n) {
      return this.select(n ? Un : Pn);
    },
    datum: function (n) {
      return arguments.length
        ? this.property("__data__", n)
        : this.node().__data__;
    },
    on: function (n, t, e) {
      var r,
        o,
        a = Hn(n + ""),
        i = a.length;
      if (!(arguments.length < 2)) {
        for (l = t ? On : In, r = 0; r < i; ++r) this.each(l(a[r], t, e));
        return this;
      }
      var l = this.node().__on;
      if (l)
        for (var u, s = 0, c = l.length; s < c; ++s)
          for (r = 0, u = l[s]; r < i; ++r)
            if ((o = a[r]).type === u.type && o.name === u.name) return u.value;
    },
    dispatch: function (n, t) {
      return this.each(("function" == typeof t ? zn : Kn)(n, t));
    },
    [Symbol.iterator]: function* () {
      for (var n = this._groups, t = 0, e = n.length; t < e; ++t)
        for (var r, o = n[t], a = 0, i = o.length; a < i; ++a)
          (r = o[a]) && (yield r);
    },
  };
  const Xn = Wn;
  function qn(n) {
    return "string" == typeof n
      ? new $n([[document.querySelector(n)]], [document.documentElement])
      : new $n([[n]], Vn);
  }
  function Yn(n) {
    n.preventDefault(), n.stopImmediatePropagation();
  }
  function Zn(n) {
    var t = n.document.documentElement,
      e = qn(n).on("dragstart.drag", Yn, !0);
    "onselectstart" in t
      ? e.on("selectstart.drag", Yn, !0)
      : ((t.__noselect = t.style.MozUserSelect),
        (t.style.MozUserSelect = "none"));
  }
  function Jn(n, t) {
    var e = n.document.documentElement,
      r = qn(n).on("dragstart.drag", null);
    t &&
      (r.on("click.drag", Yn, !0),
      setTimeout(function () {
        r.on("click.drag", null);
      }, 0)),
      "onselectstart" in e
        ? r.on("selectstart.drag", null)
        : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
  }
  function Qn(n, t, e) {
    (n.prototype = t.prototype = e), (e.constructor = n);
  }
  function nt(n, t) {
    var e = Object.create(n.prototype);
    for (var r in t) e[r] = t[r];
    return e;
  }
  function tt() {}
  var et = 0.7,
    rt = 1 / et,
    ot = "\\s*([+-]?\\d+)\\s*",
    at = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    it = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    lt = /^#([0-9a-f]{3,8})$/,
    ut = new RegExp("^rgb\\(" + [ot, ot, ot] + "\\)$"),
    st = new RegExp("^rgb\\(" + [it, it, it] + "\\)$"),
    ct = new RegExp("^rgba\\(" + [ot, ot, ot, at] + "\\)$"),
    pt = new RegExp("^rgba\\(" + [it, it, it, at] + "\\)$"),
    ft = new RegExp("^hsl\\(" + [at, it, it] + "\\)$"),
    _t = new RegExp("^hsla\\(" + [at, it, it, at] + "\\)$"),
    dt = {
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
  function ht() {
    return this.rgb().formatHex();
  }
  function mt() {
    return this.rgb().formatRgb();
  }
  function gt(n) {
    var t, e;
    return (
      (n = (n + "").trim().toLowerCase()),
      (t = lt.exec(n))
        ? ((e = t[1].length),
          (t = parseInt(t[1], 16)),
          6 === e
            ? yt(t)
            : 3 === e
            ? new kt(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (240 & t),
                ((15 & t) << 4) | (15 & t),
                1
              )
            : 8 === e
            ? bt(
                (t >> 24) & 255,
                (t >> 16) & 255,
                (t >> 8) & 255,
                (255 & t) / 255
              )
            : 4 === e
            ? bt(
                ((t >> 12) & 15) | ((t >> 8) & 240),
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (240 & t),
                (((15 & t) << 4) | (15 & t)) / 255
              )
            : null)
        : (t = ut.exec(n))
        ? new kt(t[1], t[2], t[3], 1)
        : (t = st.exec(n))
        ? new kt((255 * t[1]) / 100, (255 * t[2]) / 100, (255 * t[3]) / 100, 1)
        : (t = ct.exec(n))
        ? bt(t[1], t[2], t[3], t[4])
        : (t = pt.exec(n))
        ? bt((255 * t[1]) / 100, (255 * t[2]) / 100, (255 * t[3]) / 100, t[4])
        : (t = ft.exec(n))
        ? At(t[1], t[2] / 100, t[3] / 100, 1)
        : (t = _t.exec(n))
        ? At(t[1], t[2] / 100, t[3] / 100, t[4])
        : dt.hasOwnProperty(n)
        ? yt(dt[n])
        : "transparent" === n
        ? new kt(NaN, NaN, NaN, 0)
        : null
    );
  }
  function yt(n) {
    return new kt((n >> 16) & 255, (n >> 8) & 255, 255 & n, 1);
  }
  function bt(n, t, e, r) {
    return r <= 0 && (n = t = e = NaN), new kt(n, t, e, r);
  }
  function vt(n) {
    return (
      n instanceof tt || (n = gt(n)),
      n ? new kt((n = n.rgb()).r, n.g, n.b, n.opacity) : new kt()
    );
  }
  function wt(n, t, e, r) {
    return 1 === arguments.length ? vt(n) : new kt(n, t, e, null == r ? 1 : r);
  }
  function kt(n, t, e, r) {
    (this.r = +n), (this.g = +t), (this.b = +e), (this.opacity = +r);
  }
  function Et() {
    return "#" + St(this.r) + St(this.g) + St(this.b);
  }
  function xt() {
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
  function St(n) {
    return (
      ((n = Math.max(0, Math.min(255, Math.round(n) || 0))) < 16 ? "0" : "") +
      n.toString(16)
    );
  }
  function At(n, t, e, r) {
    return (
      r <= 0
        ? (n = t = e = NaN)
        : e <= 0 || e >= 1
        ? (n = t = NaN)
        : t <= 0 && (n = NaN),
      new Rt(n, t, e, r)
    );
  }
  function Mt(n) {
    if (n instanceof Rt) return new Rt(n.h, n.s, n.l, n.opacity);
    if ((n instanceof tt || (n = gt(n)), !n)) return new Rt();
    if (n instanceof Rt) return n;
    var t = (n = n.rgb()).r / 255,
      e = n.g / 255,
      r = n.b / 255,
      o = Math.min(t, e, r),
      a = Math.max(t, e, r),
      i = NaN,
      l = a - o,
      u = (a + o) / 2;
    return (
      l
        ? ((i =
            t === a
              ? (e - r) / l + 6 * (e < r)
              : e === a
              ? (r - t) / l + 2
              : (t - e) / l + 4),
          (l /= u < 0.5 ? a + o : 2 - a - o),
          (i *= 60))
        : (l = u > 0 && u < 1 ? 0 : i),
      new Rt(i, l, u, n.opacity)
    );
  }
  function Rt(n, t, e, r) {
    (this.h = +n), (this.s = +t), (this.l = +e), (this.opacity = +r);
  }
  function Nt(n, t, e) {
    return (
      255 *
      (n < 60
        ? t + ((e - t) * n) / 60
        : n < 180
        ? e
        : n < 240
        ? t + ((e - t) * (240 - n)) / 60
        : t)
    );
  }
  function Ct(n, t, e, r, o) {
    var a = n * n,
      i = a * n;
    return (
      ((1 - 3 * n + 3 * a - i) * t +
        (4 - 6 * a + 3 * i) * e +
        (1 + 3 * n + 3 * a - 3 * i) * r +
        i * o) /
      6
    );
  }
  Qn(tt, gt, {
    copy: function (n) {
      return Object.assign(new this.constructor(), this, n);
    },
    displayable: function () {
      return this.rgb().displayable();
    },
    hex: ht,
    formatHex: ht,
    formatHsl: function () {
      return Mt(this).formatHsl();
    },
    formatRgb: mt,
    toString: mt,
  }),
    Qn(
      kt,
      wt,
      nt(tt, {
        brighter: function (n) {
          return (
            (n = null == n ? rt : Math.pow(rt, n)),
            new kt(this.r * n, this.g * n, this.b * n, this.opacity)
          );
        },
        darker: function (n) {
          return (
            (n = null == n ? et : Math.pow(et, n)),
            new kt(this.r * n, this.g * n, this.b * n, this.opacity)
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
        hex: Et,
        formatHex: Et,
        formatRgb: xt,
        toString: xt,
      })
    ),
    Qn(
      Rt,
      function (n, t, e, r) {
        return 1 === arguments.length
          ? Mt(n)
          : new Rt(n, t, e, null == r ? 1 : r);
      },
      nt(tt, {
        brighter: function (n) {
          return (
            (n = null == n ? rt : Math.pow(rt, n)),
            new Rt(this.h, this.s, this.l * n, this.opacity)
          );
        },
        darker: function (n) {
          return (
            (n = null == n ? et : Math.pow(et, n)),
            new Rt(this.h, this.s, this.l * n, this.opacity)
          );
        },
        rgb: function () {
          var n = (this.h % 360) + 360 * (this.h < 0),
            t = isNaN(n) || isNaN(this.s) ? 0 : this.s,
            e = this.l,
            r = e + (e < 0.5 ? e : 1 - e) * t,
            o = 2 * e - r;
          return new kt(
            Nt(n >= 240 ? n - 240 : n + 120, o, r),
            Nt(n, o, r),
            Nt(n < 120 ? n + 240 : n - 120, o, r),
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
  const Bt = (n) => () => n;
  function Lt(n, t) {
    return function (e) {
      return n + e * t;
    };
  }
  function Dt(n, t) {
    var e = t - n;
    return e ? Lt(n, e) : Bt(isNaN(n) ? t : n);
  }
  const Gt = (function n(t) {
    var e = (function (n) {
      return 1 == (n = +n)
        ? Dt
        : function (t, e) {
            return e - t
              ? (function (n, t, e) {
                  return (
                    (n = Math.pow(n, e)),
                    (t = Math.pow(t, e) - n),
                    (e = 1 / e),
                    function (r) {
                      return Math.pow(n + r * t, e);
                    }
                  );
                })(t, e, n)
              : Bt(isNaN(t) ? e : t);
          };
    })(t);
    function r(n, t) {
      var r = e((n = wt(n)).r, (t = wt(t)).r),
        o = e(n.g, t.g),
        a = e(n.b, t.b),
        i = Dt(n.opacity, t.opacity);
      return function (t) {
        return (
          (n.r = r(t)), (n.g = o(t)), (n.b = a(t)), (n.opacity = i(t)), n + ""
        );
      };
    }
    return (r.gamma = n), r;
  })(1);
  function Ft(n) {
    return function (t) {
      var e,
        r,
        o = t.length,
        a = new Array(o),
        i = new Array(o),
        l = new Array(o);
      for (e = 0; e < o; ++e)
        (r = wt(t[e])), (a[e] = r.r || 0), (i[e] = r.g || 0), (l[e] = r.b || 0);
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
  var Tt = Ft(function (n) {
    var t = n.length - 1;
    return function (e) {
      var r = e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), t - 1) : Math.floor(e * t),
        o = n[r],
        a = n[r + 1],
        i = r > 0 ? n[r - 1] : 2 * o - a,
        l = r < t - 1 ? n[r + 2] : 2 * a - o;
      return Ct((e - r / t) * t, i, o, a, l);
    };
  });
  function Pt(n, t) {
    var e,
      r = t ? t.length : 0,
      o = n ? Math.min(r, n.length) : 0,
      a = new Array(o),
      i = new Array(r);
    for (e = 0; e < o; ++e) a[e] = Vt(n[e], t[e]);
    for (; e < r; ++e) i[e] = t[e];
    return function (n) {
      for (e = 0; e < o; ++e) i[e] = a[e](n);
      return i;
    };
  }
  function Ut(n, t) {
    var e = new Date();
    return (
      (n = +n),
      (t = +t),
      function (r) {
        return e.setTime(n * (1 - r) + t * r), e;
      }
    );
  }
  function Ht(n, t) {
    return (
      (n = +n),
      (t = +t),
      function (e) {
        return n * (1 - e) + t * e;
      }
    );
  }
  function It(n, t) {
    var e,
      r = {},
      o = {};
    for (e in ((null !== n && "object" == typeof n) || (n = {}),
    (null !== t && "object" == typeof t) || (t = {}),
    t))
      e in n ? (r[e] = Vt(n[e], t[e])) : (o[e] = t[e]);
    return function (n) {
      for (e in r) o[e] = r[e](n);
      return o;
    };
  }
  Ft(function (n) {
    var t = n.length;
    return function (e) {
      var r = Math.floor(((e %= 1) < 0 ? ++e : e) * t),
        o = n[(r + t - 1) % t],
        a = n[r % t],
        i = n[(r + 1) % t],
        l = n[(r + 2) % t];
      return Ct((e - r / t) * t, o, a, i, l);
    };
  });
  var Ot = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    jt = new RegExp(Ot.source, "g");
  function Kt(n, t) {
    var e,
      r,
      o,
      a = (Ot.lastIndex = jt.lastIndex = 0),
      i = -1,
      l = [],
      u = [];
    for (n += "", t += ""; (e = Ot.exec(n)) && (r = jt.exec(t)); )
      (o = r.index) > a &&
        ((o = t.slice(a, o)), l[i] ? (l[i] += o) : (l[++i] = o)),
        (e = e[0]) === (r = r[0])
          ? l[i]
            ? (l[i] += r)
            : (l[++i] = r)
          : ((l[++i] = null), u.push({ i, x: Ht(e, r) })),
        (a = jt.lastIndex);
    return (
      a < t.length && ((o = t.slice(a)), l[i] ? (l[i] += o) : (l[++i] = o)),
      l.length < 2
        ? u[0]
          ? (function (n) {
              return function (t) {
                return n(t) + "";
              };
            })(u[0].x)
          : (function (n) {
              return function () {
                return n;
              };
            })(t)
        : ((t = u.length),
          function (n) {
            for (var e, r = 0; r < t; ++r) l[(e = u[r]).i] = e.x(n);
            return l.join("");
          })
    );
  }
  function zt(n, t) {
    t || (t = []);
    var e,
      r = n ? Math.min(t.length, n.length) : 0,
      o = t.slice();
    return function (a) {
      for (e = 0; e < r; ++e) o[e] = n[e] * (1 - a) + t[e] * a;
      return o;
    };
  }
  function Vt(n, t) {
    var e,
      r,
      o = typeof t;
    return null == t || "boolean" === o
      ? Bt(t)
      : ("number" === o
          ? Ht
          : "string" === o
          ? (e = gt(t))
            ? ((t = e), Gt)
            : Kt
          : t instanceof gt
          ? Gt
          : t instanceof Date
          ? Ut
          : ((r = t),
            !ArrayBuffer.isView(r) || r instanceof DataView
              ? Array.isArray(t)
                ? Pt
                : ("function" != typeof t.valueOf &&
                    "function" != typeof t.toString) ||
                  isNaN(t)
                ? It
                : Ht
              : zt))(n, t);
  }
  function $t(n, t) {
    if (
      ((n = (function (n) {
        let t;
        for (; (t = n.sourceEvent); ) n = t;
        return n;
      })(n)),
      void 0 === t && (t = n.currentTarget),
      t)
    ) {
      var e = t.ownerSVGElement || t;
      if (e.createSVGPoint) {
        var r = e.createSVGPoint();
        return (
          (r.x = n.clientX),
          (r.y = n.clientY),
          [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
        );
      }
      if (t.getBoundingClientRect) {
        var o = t.getBoundingClientRect();
        return [
          n.clientX - o.left - t.clientLeft,
          n.clientY - o.top - t.clientTop,
        ];
      }
    }
    return [n.pageX, n.pageY];
  }
  var Wt,
    Xt,
    qt = 0,
    Yt = 0,
    Zt = 0,
    Jt = 0,
    Qt = 0,
    ne = 0,
    te = "object" == typeof performance && performance.now ? performance : Date,
    ee =
      "object" == typeof window && window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : function (n) {
            setTimeout(n, 17);
          };
  function re() {
    return Qt || (ee(oe), (Qt = te.now() + ne));
  }
  function oe() {
    Qt = 0;
  }
  function ae() {
    this._call = this._time = this._next = null;
  }
  function ie(n, t, e) {
    var r = new ae();
    return r.restart(n, t, e), r;
  }
  function le() {
    (Qt = (Jt = te.now()) + ne), (qt = Yt = 0);
    try {
      !(function () {
        re(), ++qt;
        for (var n, t = Wt; t; )
          (n = Qt - t._time) >= 0 && t._call.call(null, n), (t = t._next);
        --qt;
      })();
    } finally {
      (qt = 0),
        (function () {
          for (var n, t, e = Wt, r = 1 / 0; e; )
            e._call
              ? (r > e._time && (r = e._time), (n = e), (e = e._next))
              : ((t = e._next),
                (e._next = null),
                (e = n ? (n._next = t) : (Wt = t)));
          (Xt = n), se(r);
        })(),
        (Qt = 0);
    }
  }
  function ue() {
    var n = te.now(),
      t = n - Jt;
    t > 1e3 && ((ne -= t), (Jt = n));
  }
  function se(n) {
    qt ||
      (Yt && (Yt = clearTimeout(Yt)),
      n - Qt > 24
        ? (n < 1 / 0 && (Yt = setTimeout(le, n - te.now() - ne)),
          Zt && (Zt = clearInterval(Zt)))
        : (Zt || ((Jt = te.now()), (Zt = setInterval(ue, 1e3))),
          (qt = 1),
          ee(le)));
  }
  function ce(n, t, e) {
    var r = new ae();
    return (
      (t = null == t ? 0 : +t),
      r.restart(
        (e) => {
          r.stop(), n(e + t);
        },
        t,
        e
      ),
      r
    );
  }
  ae.prototype = ie.prototype = {
    constructor: ae,
    restart: function (n, t, e) {
      if ("function" != typeof n)
        throw new TypeError("callback is not a function");
      (e = (null == e ? re() : +e) + (null == t ? 0 : +t)),
        this._next ||
          Xt === this ||
          (Xt ? (Xt._next = this) : (Wt = this), (Xt = this)),
        (this._call = n),
        (this._time = e),
        se();
    },
    stop: function () {
      this._call && ((this._call = null), (this._time = 1 / 0), se());
    },
  };
  var pe = D("start", "end", "cancel", "interrupt"),
    fe = [];
  function _e(n, t, e, r, o, a) {
    var i = n.__transition;
    if (i) {
      if (e in i) return;
    } else n.__transition = {};
    !(function (n, t, e) {
      var r,
        o = n.__transition;
      function a(u) {
        var s, c, p, f;
        if (1 !== e.state) return l();
        for (s in o)
          if ((f = o[s]).name === e.name) {
            if (3 === f.state) return ce(a);
            4 === f.state
              ? ((f.state = 6),
                f.timer.stop(),
                f.on.call("interrupt", n, n.__data__, f.index, f.group),
                delete o[s])
              : +s < t &&
                ((f.state = 6),
                f.timer.stop(),
                f.on.call("cancel", n, n.__data__, f.index, f.group),
                delete o[s]);
          }
        if (
          (ce(function () {
            3 === e.state &&
              ((e.state = 4), e.timer.restart(i, e.delay, e.time), i(u));
          }),
          (e.state = 2),
          e.on.call("start", n, n.__data__, e.index, e.group),
          2 === e.state)
        ) {
          for (
            e.state = 3, r = new Array((p = e.tween.length)), s = 0, c = -1;
            s < p;
            ++s
          )
            (f = e.tween[s].value.call(n, n.__data__, e.index, e.group)) &&
              (r[++c] = f);
          r.length = c + 1;
        }
      }
      function i(t) {
        for (
          var o =
              t < e.duration
                ? e.ease.call(null, t / e.duration)
                : (e.timer.restart(l), (e.state = 5), 1),
            a = -1,
            i = r.length;
          ++a < i;

        )
          r[a].call(n, o);
        5 === e.state &&
          (e.on.call("end", n, n.__data__, e.index, e.group), l());
      }
      function l() {
        for (var r in ((e.state = 6), e.timer.stop(), delete o[t], o)) return;
        delete n.__transition;
      }
      (o[t] = e),
        (e.timer = ie(
          function (n) {
            (e.state = 1),
              e.timer.restart(a, e.delay, e.time),
              e.delay <= n && a(n - e.delay);
          },
          0,
          e.time
        ));
    })(n, e, {
      name: t,
      index: r,
      group: o,
      on: pe,
      tween: fe,
      time: a.time,
      delay: a.delay,
      duration: a.duration,
      ease: a.ease,
      timer: null,
      state: 0,
    });
  }
  function de(n, t) {
    var e = me(n, t);
    if (e.state > 0) throw new Error("too late; already scheduled");
    return e;
  }
  function he(n, t) {
    var e = me(n, t);
    if (e.state > 3) throw new Error("too late; already running");
    return e;
  }
  function me(n, t) {
    var e = n.__transition;
    if (!e || !(e = e[t])) throw new Error("transition not found");
    return e;
  }
  function ge(n, t) {
    var e,
      r,
      o,
      a = n.__transition,
      i = !0;
    if (a) {
      for (o in ((t = null == t ? null : t + ""), a))
        (e = a[o]).name === t
          ? ((r = e.state > 2 && e.state < 5),
            (e.state = 6),
            e.timer.stop(),
            e.on.call(
              r ? "interrupt" : "cancel",
              n,
              n.__data__,
              e.index,
              e.group
            ),
            delete a[o])
          : (i = !1);
      i && delete n.__transition;
    }
  }
  var ye,
    be = 180 / Math.PI,
    ve = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1,
    };
  function we(n, t, e, r, o, a) {
    var i, l, u;
    return (
      (i = Math.sqrt(n * n + t * t)) && ((n /= i), (t /= i)),
      (u = n * e + t * r) && ((e -= n * u), (r -= t * u)),
      (l = Math.sqrt(e * e + r * r)) && ((e /= l), (r /= l), (u /= l)),
      n * r < t * e && ((n = -n), (t = -t), (u = -u), (i = -i)),
      {
        translateX: o,
        translateY: a,
        rotate: Math.atan2(t, n) * be,
        skewX: Math.atan(u) * be,
        scaleX: i,
        scaleY: l,
      }
    );
  }
  function ke(n, t, e, r) {
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
            var u = i.push("translate(", null, t, null, e);
            l.push({ i: u - 4, x: Ht(n, o) }, { i: u - 2, x: Ht(r, a) });
          } else (o || a) && i.push("translate(" + o + t + a + e);
        })(a.translateX, a.translateY, i.translateX, i.translateY, l, u),
        (function (n, t, e, a) {
          n !== t
            ? (n - t > 180 ? (t += 360) : t - n > 180 && (n += 360),
              a.push({ i: e.push(o(e) + "rotate(", null, r) - 2, x: Ht(n, t) }))
            : t && e.push(o(e) + "rotate(" + t + r);
        })(a.rotate, i.rotate, l, u),
        (function (n, t, e, a) {
          n !== t
            ? a.push({ i: e.push(o(e) + "skewX(", null, r) - 2, x: Ht(n, t) })
            : t && e.push(o(e) + "skewX(" + t + r);
        })(a.skewX, i.skewX, l, u),
        (function (n, t, e, r, a, i) {
          if (n !== e || t !== r) {
            var l = a.push(o(a) + "scale(", null, ",", null, ")");
            i.push({ i: l - 4, x: Ht(n, e) }, { i: l - 2, x: Ht(t, r) });
          } else
            (1 === e && 1 === r) || a.push(o(a) + "scale(" + e + "," + r + ")");
        })(a.scaleX, a.scaleY, i.scaleX, i.scaleY, l, u),
        (a = i = null),
        function (n) {
          for (var t, e = -1, r = u.length; ++e < r; ) l[(t = u[e]).i] = t.x(n);
          return l.join("");
        }
      );
    };
  }
  var Ee = ke(
      function (n) {
        const t = new ("function" == typeof DOMMatrix
          ? DOMMatrix
          : WebKitCSSMatrix)(n + "");
        return t.isIdentity ? ve : we(t.a, t.b, t.c, t.d, t.e, t.f);
      },
      "px, ",
      "px)",
      "deg)"
    ),
    xe = ke(
      function (n) {
        return null == n
          ? ve
          : (ye ||
              (ye = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
              )),
            ye.setAttribute("transform", n),
            (n = ye.transform.baseVal.consolidate())
              ? we((n = n.matrix).a, n.b, n.c, n.d, n.e, n.f)
              : ve);
      },
      ", ",
      ")",
      ")"
    );
  function Se(n, t) {
    var e, r;
    return function () {
      var o = he(this, n),
        a = o.tween;
      if (a !== e)
        for (var i = 0, l = (r = e = a).length; i < l; ++i)
          if (r[i].name === t) {
            (r = r.slice()).splice(i, 1);
            break;
          }
      o.tween = r;
    };
  }
  function Ae(n, t, e) {
    var r, o;
    if ("function" != typeof e) throw new Error();
    return function () {
      var a = he(this, n),
        i = a.tween;
      if (i !== r) {
        o = (r = i).slice();
        for (var l = { name: t, value: e }, u = 0, s = o.length; u < s; ++u)
          if (o[u].name === t) {
            o[u] = l;
            break;
          }
        u === s && o.push(l);
      }
      a.tween = o;
    };
  }
  function Me(n, t, e) {
    var r = n._id;
    return (
      n.each(function () {
        var n = he(this, r);
        (n.value || (n.value = {}))[t] = e.apply(this, arguments);
      }),
      function (n) {
        return me(n, r).value[t];
      }
    );
  }
  function Re(n, t) {
    var e;
    return ("number" == typeof t
      ? Ht
      : t instanceof gt
      ? Gt
      : (e = gt(t))
      ? ((t = e), Gt)
      : Kt)(n, t);
  }
  function Ne(n) {
    return function () {
      this.removeAttribute(n);
    };
  }
  function Ce(n) {
    return function () {
      this.removeAttributeNS(n.space, n.local);
    };
  }
  function Be(n, t, e) {
    var r,
      o,
      a = e + "";
    return function () {
      var i = this.getAttribute(n);
      return i === a ? null : i === r ? o : (o = t((r = i), e));
    };
  }
  function Le(n, t, e) {
    var r,
      o,
      a = e + "";
    return function () {
      var i = this.getAttributeNS(n.space, n.local);
      return i === a ? null : i === r ? o : (o = t((r = i), e));
    };
  }
  function De(n, t, e) {
    var r, o, a;
    return function () {
      var i,
        l,
        u = e(this);
      if (null != u)
        return (i = this.getAttribute(n)) === (l = u + "")
          ? null
          : i === r && l === o
          ? a
          : ((o = l), (a = t((r = i), u)));
      this.removeAttribute(n);
    };
  }
  function Ge(n, t, e) {
    var r, o, a;
    return function () {
      var i,
        l,
        u = e(this);
      if (null != u)
        return (i = this.getAttributeNS(n.space, n.local)) === (l = u + "")
          ? null
          : i === r && l === o
          ? a
          : ((o = l), (a = t((r = i), u)));
      this.removeAttributeNS(n.space, n.local);
    };
  }
  function Fe(n, t) {
    return function (e) {
      this.setAttribute(n, t.call(this, e));
    };
  }
  function Te(n, t) {
    return function (e) {
      this.setAttributeNS(n.space, n.local, t.call(this, e));
    };
  }
  function Pe(n, t) {
    var e, r;
    function o() {
      var o = t.apply(this, arguments);
      return o !== r && (e = (r = o) && Te(n, o)), e;
    }
    return (o._value = t), o;
  }
  function Ue(n, t) {
    var e, r;
    function o() {
      var o = t.apply(this, arguments);
      return o !== r && (e = (r = o) && Fe(n, o)), e;
    }
    return (o._value = t), o;
  }
  function He(n, t) {
    return function () {
      de(this, n).delay = +t.apply(this, arguments);
    };
  }
  function Ie(n, t) {
    return (
      (t = +t),
      function () {
        de(this, n).delay = t;
      }
    );
  }
  function Oe(n, t) {
    return function () {
      he(this, n).duration = +t.apply(this, arguments);
    };
  }
  function je(n, t) {
    return (
      (t = +t),
      function () {
        he(this, n).duration = t;
      }
    );
  }
  function Ke(n, t) {
    if ("function" != typeof t) throw new Error();
    return function () {
      he(this, n).ease = t;
    };
  }
  function ze(n, t, e) {
    var r,
      o,
      a = (function (n) {
        return (n + "")
          .trim()
          .split(/^|\s+/)
          .every(function (n) {
            var t = n.indexOf(".");
            return t >= 0 && (n = n.slice(0, t)), !n || "start" === n;
          });
      })(t)
        ? de
        : he;
    return function () {
      var i = a(this, n),
        l = i.on;
      l !== r && (o = (r = l).copy()).on(t, e), (i.on = o);
    };
  }
  var Ve = Xn.prototype.constructor;
  function $e(n) {
    return function () {
      this.style.removeProperty(n);
    };
  }
  function We(n, t, e) {
    return function (r) {
      this.style.setProperty(n, t.call(this, r), e);
    };
  }
  function Xe(n, t, e) {
    var r, o;
    function a() {
      var a = t.apply(this, arguments);
      return a !== o && (r = (o = a) && We(n, a, e)), r;
    }
    return (a._value = t), a;
  }
  function qe(n) {
    return function (t) {
      this.textContent = n.call(this, t);
    };
  }
  function Ye(n) {
    var t, e;
    function r() {
      var r = n.apply(this, arguments);
      return r !== e && (t = (e = r) && qe(r)), t;
    }
    return (r._value = n), r;
  }
  var Ze = 0;
  function Je(n, t, e, r) {
    (this._groups = n), (this._parents = t), (this._name = e), (this._id = r);
  }
  function Qe() {
    return ++Ze;
  }
  var nr = Xn.prototype;
  Je.prototype = function (n) {
    return Xn().transition(n);
  }.prototype = {
    constructor: Je,
    select: function (n) {
      var t = this._name,
        e = this._id;
      "function" != typeof n && (n = F(n));
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
            _e(p[f], t, e, f, p, me(l, e)));
      return new Je(a, this._parents, t, e);
    },
    selectAll: function (n) {
      var t = this._name,
        e = this._id;
      "function" != typeof n && (n = U(n));
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
                d = me(u, e),
                h = 0,
                m = _.length;
              h < m;
              ++h
            )
              (f = _[h]) && _e(f, t, e, h, _, d);
            a.push(_), i.push(u);
          }
      return new Je(a, i, t, e);
    },
    filter: function (n) {
      "function" != typeof n && (n = H(n));
      for (
        var t = this._groups, e = t.length, r = new Array(e), o = 0;
        o < e;
        ++o
      )
        for (var a, i = t[o], l = i.length, u = (r[o] = []), s = 0; s < l; ++s)
          (a = i[s]) && n.call(a, a.__data__, s, i) && u.push(a);
      return new Je(r, this._parents, this._name, this._id);
    },
    merge: function (n) {
      if (n._id !== this._id) throw new Error();
      for (
        var t = this._groups,
          e = n._groups,
          r = t.length,
          o = e.length,
          a = Math.min(r, o),
          i = new Array(r),
          l = 0;
        l < a;
        ++l
      )
        for (
          var u,
            s = t[l],
            c = e[l],
            p = s.length,
            f = (i[l] = new Array(p)),
            _ = 0;
          _ < p;
          ++_
        )
          (u = s[_] || c[_]) && (f[_] = u);
      for (; l < r; ++l) i[l] = t[l];
      return new Je(i, this._parents, this._name, this._id);
    },
    selection: function () {
      return new Ve(this._groups, this._parents);
    },
    transition: function () {
      for (
        var n = this._name,
          t = this._id,
          e = Qe(),
          r = this._groups,
          o = r.length,
          a = 0;
        a < o;
        ++a
      )
        for (var i, l = r[a], u = l.length, s = 0; s < u; ++s)
          if ((i = l[s])) {
            var c = me(i, t);
            _e(i, n, e, s, l, {
              time: c.time + c.delay + c.duration,
              delay: 0,
              duration: c.duration,
              ease: c.ease,
            });
          }
      return new Je(r, this._parents, n, e);
    },
    call: nr.call,
    nodes: nr.nodes,
    node: nr.node,
    size: nr.size,
    empty: nr.empty,
    each: nr.each,
    on: function (n, t) {
      var e = this._id;
      return arguments.length < 2
        ? me(this.node(), e).on.on(n)
        : this.each(ze(e, n, t));
    },
    attr: function (n, t) {
      var e = nn(n),
        r = "transform" === e ? xe : Re;
      return this.attrTween(
        n,
        "function" == typeof t
          ? (e.local ? Ge : De)(e, r, Me(this, "attr." + n, t))
          : null == t
          ? (e.local ? Ce : Ne)(e)
          : (e.local ? Le : Be)(e, r, t)
      );
    },
    attrTween: function (n, t) {
      var e = "attr." + n;
      if (arguments.length < 2) return (e = this.tween(e)) && e._value;
      if (null == t) return this.tween(e, null);
      if ("function" != typeof t) throw new Error();
      var r = nn(n);
      return this.tween(e, (r.local ? Pe : Ue)(r, t));
    },
    style: function (n, t, e) {
      var r = "transform" == (n += "") ? Ee : Re;
      return null == t
        ? this.styleTween(
            n,
            (function (n, t) {
              var e, r, o;
              return function () {
                var a = fn(this, n),
                  i = (this.style.removeProperty(n), fn(this, n));
                return a === i
                  ? null
                  : a === e && i === r
                  ? o
                  : (o = t((e = a), (r = i)));
              };
            })(n, r)
          ).on("end.style." + n, $e(n))
        : "function" == typeof t
        ? this.styleTween(
            n,
            (function (n, t, e) {
              var r, o, a;
              return function () {
                var i = fn(this, n),
                  l = e(this),
                  u = l + "";
                return (
                  null == l &&
                    (this.style.removeProperty(n), (u = l = fn(this, n))),
                  i === u
                    ? null
                    : i === r && u === o
                    ? a
                    : ((o = u), (a = t((r = i), l)))
                );
              };
            })(n, r, Me(this, "style." + n, t))
          ).each(
            (function (n, t) {
              var e,
                r,
                o,
                a,
                i = "style." + t,
                l = "end." + i;
              return function () {
                var u = he(this, n),
                  s = u.on,
                  c = null == u.value[i] ? a || (a = $e(t)) : void 0;
                (s === e && o === c) || (r = (e = s).copy()).on(l, (o = c)),
                  (u.on = r);
              };
            })(this._id, n)
          )
        : this.styleTween(
            n,
            (function (n, t, e) {
              var r,
                o,
                a = e + "";
              return function () {
                var i = fn(this, n);
                return i === a ? null : i === r ? o : (o = t((r = i), e));
              };
            })(n, r, t),
            e
          ).on("end.style." + n, null);
    },
    styleTween: function (n, t, e) {
      var r = "style." + (n += "");
      if (arguments.length < 2) return (r = this.tween(r)) && r._value;
      if (null == t) return this.tween(r, null);
      if ("function" != typeof t) throw new Error();
      return this.tween(r, Xe(n, t, null == e ? "" : e));
    },
    text: function (n) {
      return this.tween(
        "text",
        "function" == typeof n
          ? (function (n) {
              return function () {
                var t = n(this);
                this.textContent = null == t ? "" : t;
              };
            })(Me(this, "text", n))
          : (function (n) {
              return function () {
                this.textContent = n;
              };
            })(null == n ? "" : n + "")
      );
    },
    textTween: function (n) {
      var t = "text";
      if (arguments.length < 1) return (t = this.tween(t)) && t._value;
      if (null == n) return this.tween(t, null);
      if ("function" != typeof n) throw new Error();
      return this.tween(t, Ye(n));
    },
    remove: function () {
      return this.on(
        "end.remove",
        (function (n) {
          return function () {
            var t = this.parentNode;
            for (var e in this.__transition) if (+e !== n) return;
            t && t.removeChild(this);
          };
        })(this._id)
      );
    },
    tween: function (n, t) {
      var e = this._id;
      if (((n += ""), arguments.length < 2)) {
        for (
          var r, o = me(this.node(), e).tween, a = 0, i = o.length;
          a < i;
          ++a
        )
          if ((r = o[a]).name === n) return r.value;
        return null;
      }
      return this.each((null == t ? Se : Ae)(e, n, t));
    },
    delay: function (n) {
      var t = this._id;
      return arguments.length
        ? this.each(("function" == typeof n ? He : Ie)(t, n))
        : me(this.node(), t).delay;
    },
    duration: function (n) {
      var t = this._id;
      return arguments.length
        ? this.each(("function" == typeof n ? Oe : je)(t, n))
        : me(this.node(), t).duration;
    },
    ease: function (n) {
      var t = this._id;
      return arguments.length ? this.each(Ke(t, n)) : me(this.node(), t).ease;
    },
    easeVarying: function (n) {
      if ("function" != typeof n) throw new Error();
      return this.each(
        (function (n, t) {
          return function () {
            var e = t.apply(this, arguments);
            if ("function" != typeof e) throw new Error();
            he(this, n).ease = e;
          };
        })(this._id, n)
      );
    },
    end: function () {
      var n,
        t,
        e = this,
        r = e._id,
        o = e.size();
      return new Promise(function (a, i) {
        var l = { value: i },
          u = {
            value: function () {
              0 == --o && a();
            },
          };
        e.each(function () {
          var e = he(this, r),
            o = e.on;
          o !== n &&
            ((t = (n = o).copy())._.cancel.push(l),
            t._.interrupt.push(l),
            t._.end.push(u)),
            (e.on = t);
        }),
          0 === o && a();
      });
    },
    [Symbol.iterator]: nr[Symbol.iterator],
  };
  var tr = {
    time: null,
    delay: 0,
    duration: 250,
    ease: function (n) {
      return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
    },
  };
  function er(n, t) {
    for (var e; !(e = n.__transition) || !(e = e[t]); )
      if (!(n = n.parentNode)) throw new Error(`transition ${t} not found`);
    return e;
  }
  (Xn.prototype.interrupt = function (n) {
    return this.each(function () {
      ge(this, n);
    });
  }),
    (Xn.prototype.transition = function (n) {
      var t, e;
      n instanceof Je
        ? ((t = n._id), (n = n._name))
        : ((t = Qe()), ((e = tr).time = re()), (n = null == n ? null : n + ""));
      for (var r = this._groups, o = r.length, a = 0; a < o; ++a)
        for (var i, l = r[a], u = l.length, s = 0; s < u; ++s)
          (i = l[s]) && _e(i, n, t, s, l, e || er(i, t));
      return new Je(r, this._parents, n, t);
    });
  const rr = (n) => () => n;
  function or(
    n,
    { sourceEvent: t, target: e, selection: r, mode: o, dispatch: a }
  ) {
    Object.defineProperties(this, {
      type: { value: n, enumerable: !0, configurable: !0 },
      sourceEvent: { value: t, enumerable: !0, configurable: !0 },
      target: { value: e, enumerable: !0, configurable: !0 },
      selection: { value: r, enumerable: !0, configurable: !0 },
      mode: { value: o, enumerable: !0, configurable: !0 },
      _: { value: a },
    });
  }
  function ar(n) {
    n.stopImmediatePropagation();
  }
  function ir(n) {
    n.preventDefault(), n.stopImmediatePropagation();
  }
  var lr = { name: "drag" },
    ur = { name: "space" },
    sr = { name: "handle" },
    cr = { name: "center" };
  const { abs: pr, max: fr, min: _r } = Math;
  function dr(n) {
    return [+n[0], +n[1]];
  }
  function hr(n) {
    return [dr(n[0]), dr(n[1])];
  }
  var mr = {
      name: "x",
      handles: ["w", "e"].map(Er),
      input: function (n, t) {
        return null == n
          ? null
          : [
              [+n[0], t[0][1]],
              [+n[1], t[1][1]],
            ];
      },
      output: function (n) {
        return n && [n[0][0], n[1][0]];
      },
    },
    gr = {
      name: "y",
      handles: ["n", "s"].map(Er),
      input: function (n, t) {
        return null == n
          ? null
          : [
              [t[0][0], +n[0]],
              [t[1][0], +n[1]],
            ];
      },
      output: function (n) {
        return n && [n[0][1], n[1][1]];
      },
    },
    yr =
      (["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Er),
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
    br = { e: "w", w: "e", nw: "ne", ne: "nw", se: "sw", sw: "se" },
    vr = { n: "s", s: "n", nw: "sw", ne: "se", se: "ne", sw: "nw" },
    wr = {
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
    kr = {
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
  function Er(n) {
    return { type: n };
  }
  function xr(n) {
    return !n.ctrlKey && !n.button;
  }
  function Sr() {
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
  function Ar() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function Mr(n) {
    for (; !n.__brush; ) if (!(n = n.parentNode)) return;
    return n.__brush;
  }
  function Rr(n) {
    return n[0][0] === n[1][0] || n[0][1] === n[1][1];
  }
  var Nr = {},
    Cr = {};
  function Br(n) {
    return new Function(
      "d",
      "return {" +
        n
          .map(function (n, t) {
            return JSON.stringify(n) + ": d[" + t + '] || ""';
          })
          .join(",") +
        "}"
    );
  }
  function Lr(n) {
    var t = Object.create(null),
      e = [];
    return (
      n.forEach(function (n) {
        for (var r in n) r in t || e.push((t[r] = r));
      }),
      e
    );
  }
  function Dr(n, t) {
    var e = n + "",
      r = e.length;
    return r < t ? new Array(t - r + 1).join(0) + e : e;
  }
  function Gr(n) {
    var t = new RegExp('["' + n + "\n\r]"),
      e = n.charCodeAt(0);
    function r(n, t) {
      var r,
        o = [],
        a = n.length,
        i = 0,
        l = 0,
        u = a <= 0,
        s = !1;
      function c() {
        if (u) return Cr;
        if (s) return (s = !1), Nr;
        var t,
          r,
          o = i;
        if (34 === n.charCodeAt(o)) {
          for (
            ;
            (i++ < a && 34 !== n.charCodeAt(i)) || 34 === n.charCodeAt(++i);

          );
          return (
            (t = i) >= a
              ? (u = !0)
              : 10 === (r = n.charCodeAt(i++))
              ? (s = !0)
              : 13 === r && ((s = !0), 10 === n.charCodeAt(i) && ++i),
            n.slice(o + 1, t - 1).replace(/""/g, '"')
          );
        }
        for (; i < a; ) {
          if (10 === (r = n.charCodeAt((t = i++)))) s = !0;
          else if (13 === r) (s = !0), 10 === n.charCodeAt(i) && ++i;
          else if (r !== e) continue;
          return n.slice(o, t);
        }
        return (u = !0), n.slice(o, a);
      }
      for (
        10 === n.charCodeAt(a - 1) && --a, 13 === n.charCodeAt(a - 1) && --a;
        (r = c()) !== Cr;

      ) {
        for (var p = []; r !== Nr && r !== Cr; ) p.push(r), (r = c());
        (t && null == (p = t(p, l++))) || o.push(p);
      }
      return o;
    }
    function o(t, e) {
      return t.map(function (t) {
        return e
          .map(function (n) {
            return i(t[n]);
          })
          .join(n);
      });
    }
    function a(t) {
      return t.map(i).join(n);
    }
    function i(n) {
      return null == n
        ? ""
        : n instanceof Date
        ? (function (n) {
            var t,
              e = n.getUTCHours(),
              r = n.getUTCMinutes(),
              o = n.getUTCSeconds(),
              a = n.getUTCMilliseconds();
            return isNaN(n)
              ? "Invalid Date"
              : ((t = n.getUTCFullYear()) < 0
                  ? "-" + Dr(-t, 6)
                  : t > 9999
                  ? "+" + Dr(t, 6)
                  : Dr(t, 4)) +
                  "-" +
                  Dr(n.getUTCMonth() + 1, 2) +
                  "-" +
                  Dr(n.getUTCDate(), 2) +
                  (a
                    ? "T" +
                      Dr(e, 2) +
                      ":" +
                      Dr(r, 2) +
                      ":" +
                      Dr(o, 2) +
                      "." +
                      Dr(a, 3) +
                      "Z"
                    : o
                    ? "T" + Dr(e, 2) + ":" + Dr(r, 2) + ":" + Dr(o, 2) + "Z"
                    : r || e
                    ? "T" + Dr(e, 2) + ":" + Dr(r, 2) + "Z"
                    : "");
          })(n)
        : t.test((n += ""))
        ? '"' + n.replace(/"/g, '""') + '"'
        : n;
    }
    return {
      parse: function (n, t) {
        var e,
          o,
          a = r(n, function (n, r) {
            if (e) return e(n, r - 1);
            (o = n),
              (e = t
                ? (function (n, t) {
                    var e = Br(n);
                    return function (r, o) {
                      return t(e(r), o, n);
                    };
                  })(n, t)
                : Br(n));
          });
        return (a.columns = o || []), a;
      },
      parseRows: r,
      format: function (t, e) {
        return (
          null == e && (e = Lr(t)),
          [e.map(i).join(n)].concat(o(t, e)).join("\n")
        );
      },
      formatBody: function (n, t) {
        return null == t && (t = Lr(n)), o(n, t).join("\n");
      },
      formatRows: function (n) {
        return n.map(a).join("\n");
      },
      formatRow: a,
      formatValue: i,
    };
  }
  var Fr = Gr(","),
    Tr = Fr.parse,
    Pr =
      (Fr.parseRows,
      Fr.format,
      Fr.formatBody,
      Fr.formatRows,
      Fr.formatRow,
      Fr.formatValue,
      Gr("\t")),
    Ur = Pr.parse;
  function Hr(n) {
    if (!n.ok) throw new Error(n.status + " " + n.statusText);
    return n.text();
  }
  function Ir(n, t) {
    return fetch(n, t).then(Hr);
  }
  function Or(n) {
    return function (t, e, r) {
      return (
        2 === arguments.length &&
          "function" == typeof e &&
          ((r = e), (e = void 0)),
        Ir(t, e).then(function (t) {
          return n(t, r);
        })
      );
    };
  }
  Pr.parseRows,
    Pr.format,
    Pr.formatBody,
    Pr.formatRows,
    Pr.formatRow,
    Pr.formatValue;
  var jr = Or(Tr);
  function Kr(n, t) {
    if (
      (e = (n = t ? n.toExponential(t - 1) : n.toExponential()).indexOf("e")) <
      0
    )
      return null;
    var e,
      r = n.slice(0, e);
    return [r.length > 1 ? r[0] + r.slice(2) : r, +n.slice(e + 1)];
  }
  function zr(n) {
    return (n = Kr(Math.abs(n))) ? n[1] : NaN;
  }
  Or(Ur);
  var Vr,
    $r = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function Wr(n) {
    if (!(t = $r.exec(n))) throw new Error("invalid format: " + n);
    var t;
    return new Xr({
      fill: t[1],
      align: t[2],
      sign: t[3],
      symbol: t[4],
      zero: t[5],
      width: t[6],
      comma: t[7],
      precision: t[8] && t[8].slice(1),
      trim: t[9],
      type: t[10],
    });
  }
  function Xr(n) {
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
  function qr(n, t) {
    var e = Kr(n, t);
    if (!e) return n + "";
    var r = e[0],
      o = e[1];
    return o < 0
      ? "0." + new Array(-o).join("0") + r
      : r.length > o + 1
      ? r.slice(0, o + 1) + "." + r.slice(o + 1)
      : r + new Array(o - r.length + 2).join("0");
  }
  (Wr.prototype = Xr.prototype),
    (Xr.prototype.toString = function () {
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
  const Yr = {
    "%": (n, t) => (100 * n).toFixed(t),
    b: (n) => Math.round(n).toString(2),
    c: (n) => n + "",
    d: function (n) {
      return Math.abs((n = Math.round(n))) >= 1e21
        ? n.toLocaleString("en").replace(/,/g, "")
        : n.toString(10);
    },
    e: (n, t) => n.toExponential(t),
    f: (n, t) => n.toFixed(t),
    g: (n, t) => n.toPrecision(t),
    o: (n) => Math.round(n).toString(8),
    p: (n, t) => qr(100 * n, t),
    r: qr,
    s: function (n, t) {
      var e = Kr(n, t);
      if (!e) return n + "";
      var r = e[0],
        o = e[1],
        a = o - (Vr = 3 * Math.max(-8, Math.min(8, Math.floor(o / 3)))) + 1,
        i = r.length;
      return a === i
        ? r
        : a > i
        ? r + new Array(a - i + 1).join("0")
        : a > 0
        ? r.slice(0, a) + "." + r.slice(a)
        : "0." + new Array(1 - a).join("0") + Kr(n, Math.max(0, t + a - 1))[0];
    },
    X: (n) => Math.round(n).toString(16).toUpperCase(),
    x: (n) => Math.round(n).toString(16),
  };
  function Zr(n) {
    return n;
  }
  var Jr,
    Qr,
    no,
    to = Array.prototype.map,
    eo = [
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
  (Jr = (function (n) {
    var t,
      e,
      r =
        void 0 === n.grouping || void 0 === n.thousands
          ? Zr
          : ((t = to.call(n.grouping, Number)),
            (e = n.thousands + ""),
            function (n, r) {
              for (
                var o = n.length, a = [], i = 0, l = t[0], u = 0;
                o > 0 &&
                l > 0 &&
                (u + l + 1 > r && (l = Math.max(1, r - u)),
                a.push(n.substring((o -= l), o + l)),
                !((u += l + 1) > r));

              )
                l = t[(i = (i + 1) % t.length)];
              return a.reverse().join(e);
            }),
      o = void 0 === n.currency ? "" : n.currency[0] + "",
      a = void 0 === n.currency ? "" : n.currency[1] + "",
      i = void 0 === n.decimal ? "." : n.decimal + "",
      l =
        void 0 === n.numerals
          ? Zr
          : (function (n) {
              return function (t) {
                return t.replace(/[0-9]/g, function (t) {
                  return n[+t];
                });
              };
            })(to.call(n.numerals, String)),
      u = void 0 === n.percent ? "%" : n.percent + "",
      s = void 0 === n.minus ? "−" : n.minus + "",
      c = void 0 === n.nan ? "NaN" : n.nan + "";
    function p(n) {
      var t = (n = Wr(n)).fill,
        e = n.align,
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
        : Yr[y] || (void 0 === m && (m = 12), (g = !0), (y = "g")),
        (_ || ("0" === t && "=" === e)) && ((_ = !0), (t = "0"), (e = "="));
      var b =
          "$" === f
            ? o
            : "#" === f && /[boxX]/.test(y)
            ? "0" + y.toLowerCase()
            : "",
        v = "$" === f ? a : /[%p]/.test(y) ? u : "",
        w = Yr[y],
        k = /[defgprs%]/.test(y);
      function E(n) {
        var o,
          a,
          u,
          f = b,
          E = v;
        if ("c" === y) (E = w(n) + E), (n = "");
        else {
          var x = (n = +n) < 0 || 1 / n < 0;
          if (
            ((n = isNaN(n) ? c : w(Math.abs(n), m)),
            g &&
              (n = (function (n) {
                n: for (var t, e = n.length, r = 1, o = -1; r < e; ++r)
                  switch (n[r]) {
                    case ".":
                      o = t = r;
                      break;
                    case "0":
                      0 === o && (o = r), (t = r);
                      break;
                    default:
                      if (!+n[r]) break n;
                      o > 0 && (o = 0);
                  }
                return o > 0 ? n.slice(0, o) + n.slice(t + 1) : n;
              })(n)),
            x && 0 == +n && "+" !== p && (x = !1),
            (f =
              (x ? ("(" === p ? p : s) : "-" === p || "(" === p ? "" : p) + f),
            (E =
              ("s" === y ? eo[8 + Vr / 3] : "") +
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
          A = S < d ? new Array(d - S + 1).join(t) : "";
        switch (
          (h &&
            _ &&
            ((n = r(A + n, A.length ? d - E.length : 1 / 0)), (A = "")),
          e)
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
      formatPrefix: function (n, t) {
        var e = p((((n = Wr(n)).type = "f"), n)),
          r = 3 * Math.max(-8, Math.min(8, Math.floor(zr(t) / 3))),
          o = Math.pow(10, -r),
          a = eo[8 + r / 3];
        return function (n) {
          return e(o * n) + a;
        };
      },
    };
  })({ thousands: ",", grouping: [3], currency: ["$", ""] })),
    (Qr = Jr.format),
    (no = Jr.formatPrefix);
  const ro = (n) => n;
  function oo(n, t) {
    n && io.hasOwnProperty(n.type) && io[n.type](n, t);
  }
  var ao = {
      Feature: function (n, t) {
        oo(n.geometry, t);
      },
      FeatureCollection: function (n, t) {
        for (var e = n.features, r = -1, o = e.length; ++r < o; )
          oo(e[r].geometry, t);
      },
    },
    io = {
      Sphere: function (n, t) {
        t.sphere();
      },
      Point: function (n, t) {
        (n = n.coordinates), t.point(n[0], n[1], n[2]);
      },
      MultiPoint: function (n, t) {
        for (var e = n.coordinates, r = -1, o = e.length; ++r < o; )
          (n = e[r]), t.point(n[0], n[1], n[2]);
      },
      LineString: function (n, t) {
        lo(n.coordinates, t, 0);
      },
      MultiLineString: function (n, t) {
        for (var e = n.coordinates, r = -1, o = e.length; ++r < o; )
          lo(e[r], t, 0);
      },
      Polygon: function (n, t) {
        uo(n.coordinates, t);
      },
      MultiPolygon: function (n, t) {
        for (var e = n.coordinates, r = -1, o = e.length; ++r < o; )
          uo(e[r], t);
      },
      GeometryCollection: function (n, t) {
        for (var e = n.geometries, r = -1, o = e.length; ++r < o; ) oo(e[r], t);
      },
    };
  function lo(n, t, e) {
    var r,
      o = -1,
      a = n.length - e;
    for (t.lineStart(); ++o < a; ) (r = n[o]), t.point(r[0], r[1], r[2]);
    t.lineEnd();
  }
  function uo(n, t) {
    var e = -1,
      r = n.length;
    for (t.polygonStart(); ++e < r; ) lo(n[e], t, 1);
    t.polygonEnd();
  }
  function so(n, t) {
    n && ao.hasOwnProperty(n.type) ? ao[n.type](n, t) : oo(n, t);
  }
  class co {
    constructor() {
      (this._partials = new Float64Array(32)), (this._n = 0);
    }
    add(n) {
      const t = this._partials;
      let e = 0;
      for (let r = 0; r < this._n && r < 32; r++) {
        const o = t[r],
          a = n + o,
          i = Math.abs(n) < Math.abs(o) ? n - (a - o) : o - (a - n);
        i && (t[e++] = i), (n = a);
      }
      return (t[e] = n), (this._n = e + 1), this;
    }
    valueOf() {
      const n = this._partials;
      let t,
        e,
        r,
        o = this._n,
        a = 0;
      if (o > 0) {
        for (
          a = n[--o];
          o > 0 && ((t = a), (e = n[--o]), (a = t + e), (r = e - (a - t)), !r);

        );
        o > 0 &&
          ((r < 0 && n[o - 1] < 0) || (r > 0 && n[o - 1] > 0)) &&
          ((e = 2 * r), (t = a + e), e == t - a && (a = t));
      }
      return a;
    }
  }
  var po = 1e-6,
    fo = Math.PI,
    _o = fo / 2,
    ho = fo / 4,
    mo = 2 * fo,
    go = 180 / fo,
    yo = fo / 180,
    bo = Math.abs,
    vo = Math.atan,
    wo = Math.atan2,
    ko = Math.cos,
    Eo = (Math.ceil, Math.exp),
    xo = (Math.floor, Math.hypot, Math.log),
    So = (Math.pow, Math.sin),
    Ao =
      Math.sign ||
      function (n) {
        return n > 0 ? 1 : n < 0 ? -1 : 0;
      },
    Mo = Math.sqrt,
    Ro = Math.tan;
  function No(n) {
    return n > 1 ? _o : n < -1 ? -_o : Math.asin(n);
  }
  function Co() {}
  var Bo,
    Lo,
    Do,
    Go,
    Fo = new co(),
    To = new co(),
    Po = {
      point: Co,
      lineStart: Co,
      lineEnd: Co,
      polygonStart: function () {
        (Po.lineStart = Uo), (Po.lineEnd = Oo);
      },
      polygonEnd: function () {
        (Po.lineStart = Po.lineEnd = Po.point = Co),
          Fo.add(bo(To)),
          (To = new co());
      },
      result: function () {
        var n = Fo / 2;
        return (Fo = new co()), n;
      },
    };
  function Uo() {
    Po.point = Ho;
  }
  function Ho(n, t) {
    (Po.point = Io), (Bo = Do = n), (Lo = Go = t);
  }
  function Io(n, t) {
    To.add(Go * n - Do * t), (Do = n), (Go = t);
  }
  function Oo() {
    Io(Bo, Lo);
  }
  const jo = Po;
  var Ko = 1 / 0,
    zo = Ko,
    Vo = -Ko,
    $o = Vo;
  const Wo = {
    point: function (n, t) {
      n < Ko && (Ko = n),
        n > Vo && (Vo = n),
        t < zo && (zo = t),
        t > $o && ($o = t);
    },
    lineStart: Co,
    lineEnd: Co,
    polygonStart: Co,
    polygonEnd: Co,
    result: function () {
      var n = [
        [Ko, zo],
        [Vo, $o],
      ];
      return (Vo = $o = -(zo = Ko = 1 / 0)), n;
    },
  };
  var Xo,
    qo,
    Yo,
    Zo,
    Jo = 0,
    Qo = 0,
    na = 0,
    ta = 0,
    ea = 0,
    ra = 0,
    oa = 0,
    aa = 0,
    ia = 0,
    la = {
      point: ua,
      lineStart: sa,
      lineEnd: fa,
      polygonStart: function () {
        (la.lineStart = _a), (la.lineEnd = da);
      },
      polygonEnd: function () {
        (la.point = ua), (la.lineStart = sa), (la.lineEnd = fa);
      },
      result: function () {
        var n = ia
          ? [oa / ia, aa / ia]
          : ra
          ? [ta / ra, ea / ra]
          : na
          ? [Jo / na, Qo / na]
          : [NaN, NaN];
        return (Jo = Qo = na = ta = ea = ra = oa = aa = ia = 0), n;
      },
    };
  function ua(n, t) {
    (Jo += n), (Qo += t), ++na;
  }
  function sa() {
    la.point = ca;
  }
  function ca(n, t) {
    (la.point = pa), ua((Yo = n), (Zo = t));
  }
  function pa(n, t) {
    var e = n - Yo,
      r = t - Zo,
      o = Mo(e * e + r * r);
    (ta += (o * (Yo + n)) / 2),
      (ea += (o * (Zo + t)) / 2),
      (ra += o),
      ua((Yo = n), (Zo = t));
  }
  function fa() {
    la.point = ua;
  }
  function _a() {
    la.point = ha;
  }
  function da() {
    ma(Xo, qo);
  }
  function ha(n, t) {
    (la.point = ma), ua((Xo = Yo = n), (qo = Zo = t));
  }
  function ma(n, t) {
    var e = n - Yo,
      r = t - Zo,
      o = Mo(e * e + r * r);
    (ta += (o * (Yo + n)) / 2),
      (ea += (o * (Zo + t)) / 2),
      (ra += o),
      (oa += (o = Zo * n - Yo * t) * (Yo + n)),
      (aa += o * (Zo + t)),
      (ia += 3 * o),
      ua((Yo = n), (Zo = t));
  }
  const ga = la;
  function ya(n) {
    this._context = n;
  }
  ya.prototype = {
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
    point: function (n, t) {
      switch (this._point) {
        case 0:
          this._context.moveTo(n, t), (this._point = 1);
          break;
        case 1:
          this._context.lineTo(n, t);
          break;
        default:
          this._context.moveTo(n + this._radius, t),
            this._context.arc(n, t, this._radius, 0, mo);
      }
    },
    result: Co,
  };
  var ba,
    va,
    wa,
    ka,
    Ea,
    xa = new co(),
    Sa = {
      point: Co,
      lineStart: function () {
        Sa.point = Aa;
      },
      lineEnd: function () {
        ba && Ma(va, wa), (Sa.point = Co);
      },
      polygonStart: function () {
        ba = !0;
      },
      polygonEnd: function () {
        ba = null;
      },
      result: function () {
        var n = +xa;
        return (xa = new co()), n;
      },
    };
  function Aa(n, t) {
    (Sa.point = Ma), (va = ka = n), (wa = Ea = t);
  }
  function Ma(n, t) {
    (ka -= n), (Ea -= t), xa.add(Mo(ka * ka + Ea * Ea)), (ka = n), (Ea = t);
  }
  const Ra = Sa;
  function Na() {
    this._string = [];
  }
  function Ca(n) {
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
  function Ba(n, t) {
    function e(e, r) {
      return (e = n(e, r)), t(e[0], e[1]);
    }
    return (
      n.invert &&
        t.invert &&
        (e.invert = function (e, r) {
          return (e = t.invert(e, r)) && n.invert(e[0], e[1]);
        }),
      e
    );
  }
  function La(n, t) {
    return [bo(n) > fo ? n + Math.round(-n / mo) * mo : n, t];
  }
  function Da(n, t, e) {
    return (n %= mo)
      ? t || e
        ? Ba(Fa(n), Ta(t, e))
        : Fa(n)
      : t || e
      ? Ta(t, e)
      : La;
  }
  function Ga(n) {
    return function (t, e) {
      return [(t += n) > fo ? t - mo : t < -fo ? t + mo : t, e];
    };
  }
  function Fa(n) {
    var t = Ga(n);
    return (t.invert = Ga(-n)), t;
  }
  function Ta(n, t) {
    var e = ko(n),
      r = So(n),
      o = ko(t),
      a = So(t);
    function i(n, t) {
      var i = ko(t),
        l = ko(n) * i,
        u = So(n) * i,
        s = So(t),
        c = s * e + l * r;
      return [wo(u * o - c * a, l * e - s * r), No(c * o + u * a)];
    }
    return (
      (i.invert = function (n, t) {
        var i = ko(t),
          l = ko(n) * i,
          u = So(n) * i,
          s = So(t),
          c = s * o - u * a;
        return [wo(u * o + s * a, l * e + c * r), No(c * e - l * r)];
      }),
      i
    );
  }
  function Pa() {
    var n,
      t = [];
    return {
      point: function (t, e, r) {
        n.push([t, e, r]);
      },
      lineStart: function () {
        t.push((n = []));
      },
      lineEnd: Co,
      rejoin: function () {
        t.length > 1 && t.push(t.pop().concat(t.shift()));
      },
      result: function () {
        var e = t;
        return (t = []), (n = null), e;
      },
    };
  }
  function Ua(n, t) {
    return bo(n[0] - t[0]) < po && bo(n[1] - t[1]) < po;
  }
  function Ha(n, t, e, r) {
    (this.x = n),
      (this.z = t),
      (this.o = e),
      (this.e = r),
      (this.v = !1),
      (this.n = this.p = null);
  }
  function Ia(n, t, e, r, o) {
    var a,
      i,
      l = [],
      u = [];
    if (
      (n.forEach(function (n) {
        if (!((t = n.length - 1) <= 0)) {
          var t,
            e,
            r = n[0],
            i = n[t];
          if (Ua(r, i)) {
            if (!r[2] && !i[2]) {
              for (o.lineStart(), a = 0; a < t; ++a)
                o.point((r = n[a])[0], r[1]);
              return void o.lineEnd();
            }
            i[0] += 2e-6;
          }
          l.push((e = new Ha(r, n, null, !0))),
            u.push((e.o = new Ha(r, null, e, !1))),
            l.push((e = new Ha(i, n, null, !1))),
            u.push((e.o = new Ha(i, null, e, !0)));
        }
      }),
      l.length)
    ) {
      for (u.sort(t), Oa(l), Oa(u), a = 0, i = u.length; a < i; ++a)
        u[a].e = e = !e;
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
  function Oa(n) {
    if ((t = n.length)) {
      for (var t, e, r = 0, o = n[0]; ++r < t; )
        (o.n = e = n[r]), (e.p = o), (o = e);
      (o.n = e = n[0]), (e.p = o);
    }
  }
  function ja(n) {
    return [wo(n[1], n[0]), No(n[2])];
  }
  function Ka(n) {
    var t = n[0],
      e = n[1],
      r = ko(e);
    return [r * ko(t), r * So(t), So(e)];
  }
  function za(n, t) {
    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
  }
  function Va(n, t) {
    return [
      n[1] * t[2] - n[2] * t[1],
      n[2] * t[0] - n[0] * t[2],
      n[0] * t[1] - n[1] * t[0],
    ];
  }
  function $a(n, t) {
    (n[0] += t[0]), (n[1] += t[1]), (n[2] += t[2]);
  }
  function Wa(n, t) {
    return [n[0] * t, n[1] * t, n[2] * t];
  }
  function Xa(n) {
    var t = Mo(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    (n[0] /= t), (n[1] /= t), (n[2] /= t);
  }
  function qa(n) {
    return bo(n[0]) <= fo ? n[0] : Ao(n[0]) * (((bo(n[0]) + fo) % mo) - fo);
  }
  function Ya(n) {
    return Array.from(
      (function* (n) {
        for (const t of n) yield* t;
      })(n)
    );
  }
  function Za(n, t, e, r) {
    return function (o) {
      var a,
        i,
        l,
        u = t(o),
        s = Pa(),
        c = t(s),
        p = !1,
        f = {
          point: _,
          lineStart: h,
          lineEnd: m,
          polygonStart: function () {
            (f.point = g),
              (f.lineStart = y),
              (f.lineEnd = b),
              (i = []),
              (a = []);
          },
          polygonEnd: function () {
            (f.point = _), (f.lineStart = h), (f.lineEnd = m), (i = Ya(i));
            var n = (function (n, t) {
              var e = qa(t),
                r = t[1],
                o = So(r),
                a = [So(e), -ko(e), 0],
                i = 0,
                l = 0,
                u = new co();
              1 === o ? (r = _o + po) : -1 === o && (r = -_o - po);
              for (var s = 0, c = n.length; s < c; ++s)
                if ((f = (p = n[s]).length))
                  for (
                    var p,
                      f,
                      _ = p[f - 1],
                      d = qa(_),
                      h = _[1] / 2 + ho,
                      m = So(h),
                      g = ko(h),
                      y = 0;
                    y < f;
                    ++y, d = v, m = k, g = E, _ = b
                  ) {
                    var b = p[y],
                      v = qa(b),
                      w = b[1] / 2 + ho,
                      k = So(w),
                      E = ko(w),
                      x = v - d,
                      S = x >= 0 ? 1 : -1,
                      A = S * x,
                      M = A > fo,
                      R = m * k;
                    if (
                      (u.add(wo(R * S * So(A), g * E + R * ko(A))),
                      (i += M ? x + S * mo : x),
                      M ^ (d >= e) ^ (v >= e))
                    ) {
                      var N = Va(Ka(_), Ka(b));
                      Xa(N);
                      var C = Va(a, N);
                      Xa(C);
                      var B = (M ^ (x >= 0) ? -1 : 1) * No(C[2]);
                      (r > B || (r === B && (N[0] || N[1]))) &&
                        (l += M ^ (x >= 0) ? 1 : -1);
                    }
                  }
              return (i < -1e-6 || (i < po && u < -1e-12)) ^ (1 & l);
            })(a, r);
            i.length
              ? (p || (o.polygonStart(), (p = !0)), Ia(i, Qa, n, e, o))
              : n &&
                (p || (o.polygonStart(), (p = !0)),
                o.lineStart(),
                e(null, null, 1, o),
                o.lineEnd()),
              p && (o.polygonEnd(), (p = !1)),
              (i = a = null);
          },
          sphere: function () {
            o.polygonStart(),
              o.lineStart(),
              e(null, null, 1, o),
              o.lineEnd(),
              o.polygonEnd();
          },
        };
      function _(t, e) {
        n(t, e) && o.point(t, e);
      }
      function d(n, t) {
        u.point(n, t);
      }
      function h() {
        (f.point = d), u.lineStart();
      }
      function m() {
        (f.point = _), u.lineEnd();
      }
      function g(n, t) {
        l.push([n, t]), c.point(n, t);
      }
      function y() {
        c.lineStart(), (l = []);
      }
      function b() {
        g(l[0][0], l[0][1]), c.lineEnd();
        var n,
          t,
          e,
          r,
          u = c.clean(),
          f = s.result(),
          _ = f.length;
        if ((l.pop(), a.push(l), (l = null), _))
          if (1 & u) {
            if ((t = (e = f[0]).length - 1) > 0) {
              for (
                p || (o.polygonStart(), (p = !0)), o.lineStart(), n = 0;
                n < t;
                ++n
              )
                o.point((r = e[n])[0], r[1]);
              o.lineEnd();
            }
          } else
            _ > 1 && 2 & u && f.push(f.pop().concat(f.shift())),
              i.push(f.filter(Ja));
      }
      return f;
    };
  }
  function Ja(n) {
    return n.length > 1;
  }
  function Qa(n, t) {
    return (
      ((n = n.x)[0] < 0 ? n[1] - _o - po : _o - n[1]) -
      ((t = t.x)[0] < 0 ? t[1] - _o - po : _o - t[1])
    );
  }
  (Na.prototype = {
    _radius: 4.5,
    _circle: Ca(4.5),
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
    point: function (n, t) {
      switch (this._point) {
        case 0:
          this._string.push("M", n, ",", t), (this._point = 1);
          break;
        case 1:
          this._string.push("L", n, ",", t);
          break;
        default:
          null == this._circle && (this._circle = Ca(this._radius)),
            this._string.push("M", n, ",", t, this._circle);
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
    (La.invert = La);
  const ni = Za(
    function () {
      return !0;
    },
    function (n) {
      var t,
        e = NaN,
        r = NaN,
        o = NaN;
      return {
        lineStart: function () {
          n.lineStart(), (t = 1);
        },
        point: function (a, i) {
          var l = a > 0 ? fo : -fo,
            u = bo(a - e);
          bo(u - fo) < po
            ? (n.point(e, (r = (r + i) / 2 > 0 ? _o : -_o)),
              n.point(o, r),
              n.lineEnd(),
              n.lineStart(),
              n.point(l, r),
              n.point(a, r),
              (t = 0))
            : o !== l &&
              u >= fo &&
              (bo(e - o) < po && (e -= o * po),
              bo(a - l) < po && (a -= l * po),
              (r = (function (n, t, e, r) {
                var o,
                  a,
                  i = So(n - e);
                return bo(i) > po
                  ? vo(
                      (So(t) * (a = ko(r)) * So(e) -
                        So(r) * (o = ko(t)) * So(n)) /
                        (o * a * i)
                    )
                  : (t + r) / 2;
              })(e, r, a, i)),
              n.point(o, r),
              n.lineEnd(),
              n.lineStart(),
              n.point(l, r),
              (t = 0)),
            n.point((e = a), (r = i)),
            (o = l);
        },
        lineEnd: function () {
          n.lineEnd(), (e = r = NaN);
        },
        clean: function () {
          return 2 - t;
        },
      };
    },
    function (n, t, e, r) {
      var o;
      if (null == n)
        (o = e * _o),
          r.point(-fo, o),
          r.point(0, o),
          r.point(fo, o),
          r.point(fo, 0),
          r.point(fo, -o),
          r.point(0, -o),
          r.point(-fo, -o),
          r.point(-fo, 0),
          r.point(-fo, o);
      else if (bo(n[0] - t[0]) > po) {
        var a = n[0] < t[0] ? fo : -fo;
        (o = (e * a) / 2), r.point(-a, o), r.point(0, o), r.point(a, o);
      } else r.point(t[0], t[1]);
    },
    [-fo, -_o]
  );
  function ti(n, t) {
    ((t = Ka(t))[0] -= n), Xa(t);
    var e,
      r = (e = -t[1]) > 1 ? 0 : e < -1 ? fo : Math.acos(e);
    return ((-t[2] < 0 ? -r : r) + mo - po) % mo;
  }
  function ei(n) {
    var t = ko(n),
      e = 6 * yo,
      r = t > 0,
      o = bo(t) > po;
    function a(n, e) {
      return ko(n) * ko(e) > t;
    }
    function i(n, e, r) {
      var o = [1, 0, 0],
        a = Va(Ka(n), Ka(e)),
        i = za(a, a),
        l = a[0],
        u = i - l * l;
      if (!u) return !r && n;
      var s = (t * i) / u,
        c = (-t * l) / u,
        p = Va(o, a),
        f = Wa(o, s);
      $a(f, Wa(a, c));
      var _ = p,
        d = za(f, _),
        h = za(_, _),
        m = d * d - h * (za(f, f) - 1);
      if (!(m < 0)) {
        var g = Mo(m),
          y = Wa(_, (-d - g) / h);
        if (($a(y, f), (y = ja(y)), !r)) return y;
        var b,
          v = n[0],
          w = e[0],
          k = n[1],
          E = e[1];
        w < v && ((b = v), (v = w), (w = b));
        var x = w - v,
          S = bo(x - fo) < po;
        if (
          (!S && E < k && ((b = k), (k = E), (E = b)),
          S || x < po
            ? S
              ? (k + E > 0) ^ (y[1] < (bo(y[0] - v) < po ? k : E))
              : k <= y[1] && y[1] <= E
            : (x > fo) ^ (v <= y[0] && y[0] <= w))
        ) {
          var A = Wa(_, (-d + g) / h);
          return $a(A, f), [y, ja(A)];
        }
      }
    }
    function l(t, e) {
      var o = r ? n : fo - n,
        a = 0;
      return (
        t < -o ? (a |= 1) : t > o && (a |= 2),
        e < -o ? (a |= 4) : e > o && (a |= 8),
        a
      );
    }
    return Za(
      a,
      function (n) {
        var t, e, u, s, c;
        return {
          lineStart: function () {
            (s = u = !1), (c = 1);
          },
          point: function (p, f) {
            var _,
              d = [p, f],
              h = a(p, f),
              m = r ? (h ? 0 : l(p, f)) : h ? l(p + (p < 0 ? fo : -fo), f) : 0;
            if (
              (!t && (s = u = h) && n.lineStart(),
              h !== u && (!(_ = i(t, d)) || Ua(t, _) || Ua(d, _)) && (d[2] = 1),
              h !== u)
            )
              (c = 0),
                h
                  ? (n.lineStart(), (_ = i(d, t)), n.point(_[0], _[1]))
                  : ((_ = i(t, d)), n.point(_[0], _[1], 2), n.lineEnd()),
                (t = _);
            else if (o && t && r ^ h) {
              var g;
              m & e ||
                !(g = i(d, t, !0)) ||
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
            !h || (t && Ua(t, d)) || n.point(d[0], d[1]),
              (t = d),
              (u = h),
              (e = m);
          },
          lineEnd: function () {
            u && n.lineEnd(), (t = null);
          },
          clean: function () {
            return c | ((s && u) << 1);
          },
        };
      },
      function (t, r, o, a) {
        !(function (n, t, e, r, o, a) {
          if (e) {
            var i = ko(t),
              l = So(t),
              u = r * e;
            null == o
              ? ((o = t + r * mo), (a = t - u / 2))
              : ((o = ti(i, o)),
                (a = ti(i, a)),
                (r > 0 ? o < a : o > a) && (o += r * mo));
            for (var s, c = o; r > 0 ? c > a : c < a; c -= u)
              (s = ja([i, -l * ko(c), -l * So(c)])), n.point(s[0], s[1]);
          }
        })(a, n, e, o, t, r);
      },
      r ? [0, -n] : [-fo, n - fo]
    );
  }
  var ri = 1e9,
    oi = -ri;
  function ai(n, t, e, r) {
    function o(o, a) {
      return n <= o && o <= e && t <= a && a <= r;
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
          s.point(0 === c || 3 === c ? n : e, c > 1 ? r : t);
        } while ((c = (c + l + 4) % 4) !== p);
      else s.point(a[0], a[1]);
    }
    function i(r, o) {
      return bo(r[0] - n) < po
        ? o > 0
          ? 0
          : 3
        : bo(r[0] - e) < po
        ? o > 0
          ? 2
          : 1
        : bo(r[1] - t) < po
        ? o > 0
          ? 1
          : 0
        : o > 0
        ? 3
        : 2;
    }
    function l(n, t) {
      return u(n.x, t.x);
    }
    function u(n, t) {
      var e = i(n, 1),
        r = i(t, 1);
      return e !== r
        ? e - r
        : 0 === e
        ? t[1] - n[1]
        : 1 === e
        ? n[0] - t[0]
        : 2 === e
        ? n[1] - t[1]
        : t[0] - n[0];
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
        b = i,
        v = Pa(),
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
            u && (E(p, f), _ && m && v.rejoin(), u.push(v.result())),
              (w.point = k),
              m && b.lineEnd();
          },
          polygonStart: function () {
            (b = v), (u = []), (s = []), (y = !0);
          },
          polygonEnd: function () {
            var t = (function () {
                for (var t = 0, e = 0, o = s.length; e < o; ++e)
                  for (
                    var a,
                      i,
                      l = s[e],
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
                        ? _ > r && (f - a) * (r - i) > (_ - i) * (n - a) && ++t
                        : _ <= r &&
                          (f - a) * (r - i) < (_ - i) * (n - a) &&
                          --t;
                return t;
              })(),
              e = y && t,
              o = (u = Ya(u)).length;
            (e || o) &&
              (i.polygonStart(),
              e && (i.lineStart(), a(null, null, 1, i), i.lineEnd()),
              o && Ia(u, l, t, a, i),
              i.polygonEnd()),
              (b = i),
              (u = s = c = null);
          },
        };
      function k(n, t) {
        o(n, t) && b.point(n, t);
      }
      function E(a, i) {
        var l = o(a, i);
        if ((s && c.push([a, i]), g))
          (p = a),
            (f = i),
            (_ = l),
            (g = !1),
            l && (b.lineStart(), b.point(a, i));
        else if (l && m) b.point(a, i);
        else {
          var u = [
              (d = Math.max(oi, Math.min(ri, d))),
              (h = Math.max(oi, Math.min(ri, h))),
            ],
            v = [
              (a = Math.max(oi, Math.min(ri, a))),
              (i = Math.max(oi, Math.min(ri, i))),
            ];
          !(function (n, t, e, r, o, a) {
            var i,
              l = n[0],
              u = n[1],
              s = 0,
              c = 1,
              p = t[0] - l,
              f = t[1] - u;
            if (((i = e - l), p || !(i > 0))) {
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
                      c < 1 && ((t[0] = l + c * p), (t[1] = u + c * f)),
                      !0
                    );
                  }
                }
              }
            }
          })(u, v, n, t, e, r)
            ? l && (b.lineStart(), b.point(a, i), (y = !1))
            : (m || (b.lineStart(), b.point(u[0], u[1])),
              b.point(v[0], v[1]),
              l || b.lineEnd(),
              (y = !1));
        }
        (d = a), (h = i), (m = l);
      }
      return w;
    };
  }
  function ii(n) {
    return function (t) {
      var e = new li();
      for (var r in n) e[r] = n[r];
      return (e.stream = t), e;
    };
  }
  function li() {}
  function ui(n, t, e) {
    var r = n.clipExtent && n.clipExtent();
    return (
      n.scale(150).translate([0, 0]),
      null != r && n.clipExtent(null),
      so(e, n.stream(Wo)),
      t(Wo.result()),
      null != r && n.clipExtent(r),
      n
    );
  }
  function si(n, t, e) {
    return ui(
      n,
      function (e) {
        var r = t[1][0] - t[0][0],
          o = t[1][1] - t[0][1],
          a = Math.min(r / (e[1][0] - e[0][0]), o / (e[1][1] - e[0][1])),
          i = +t[0][0] + (r - a * (e[1][0] + e[0][0])) / 2,
          l = +t[0][1] + (o - a * (e[1][1] + e[0][1])) / 2;
        n.scale(150 * a).translate([i, l]);
      },
      e
    );
  }
  li.prototype = {
    constructor: li,
    point: function (n, t) {
      this.stream.point(n, t);
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
  var ci = ko(30 * yo);
  function pi(n, t) {
    return +t
      ? (function (n, t) {
          function e(r, o, a, i, l, u, s, c, p, f, _, d, h, m) {
            var g = s - r,
              y = c - o,
              b = g * g + y * y;
            if (b > 4 * t && h--) {
              var v = i + f,
                w = l + _,
                k = u + d,
                E = Mo(v * v + w * w + k * k),
                x = No((k /= E)),
                S =
                  bo(bo(k) - 1) < po || bo(a - p) < po ? (a + p) / 2 : wo(w, v),
                A = n(S, x),
                M = A[0],
                R = A[1],
                N = M - r,
                C = R - o,
                B = y * N - g * C;
              ((B * B) / b > t ||
                bo((g * N + y * C) / b - 0.5) > 0.3 ||
                i * f + l * _ + u * d < ci) &&
                (e(r, o, a, i, l, u, M, R, S, (v /= E), (w /= E), k, h, m),
                m.point(M, R),
                e(M, R, S, v, w, k, s, c, p, f, _, d, h, m));
            }
          }
          return function (t) {
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
                lineEnd: b,
                polygonStart: function () {
                  t.polygonStart(), (h.lineStart = v);
                },
                polygonEnd: function () {
                  t.polygonEnd(), (h.lineStart = g);
                },
              };
            function m(e, r) {
              (e = n(e, r)), t.point(e[0], e[1]);
            }
            function g() {
              (c = NaN), (h.point = y), t.lineStart();
            }
            function y(r, o) {
              var a = Ka([r, o]),
                i = n(r, o);
              e(
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
                t
              ),
                t.point(c, p);
            }
            function b() {
              (h.point = m), t.lineEnd();
            }
            function v() {
              g(), (h.point = w), (h.lineEnd = k);
            }
            function w(n, t) {
              y((r = n), t),
                (o = c),
                (a = p),
                (i = f),
                (l = _),
                (u = d),
                (h.point = y);
            }
            function k() {
              e(c, p, s, f, _, d, o, a, r, i, l, u, 16, t),
                (h.lineEnd = b),
                b();
            }
            return h;
          };
        })(n, t)
      : (function (n) {
          return ii({
            point: function (t, e) {
              (t = n(t, e)), this.stream.point(t[0], t[1]);
            },
          });
        })(n);
  }
  var fi = ii({
    point: function (n, t) {
      this.stream.point(n * yo, t * yo);
    },
  });
  function _i(n, t, e, r, o, a) {
    if (!a)
      return (function (n, t, e, r, o) {
        function a(a, i) {
          return [t + n * (a *= r), e - n * (i *= o)];
        }
        return (
          (a.invert = function (a, i) {
            return [((a - t) / n) * r, ((e - i) / n) * o];
          }),
          a
        );
      })(n, t, e, r, o);
    var i = ko(a),
      l = So(a),
      u = i * n,
      s = l * n,
      c = i / n,
      p = l / n,
      f = (l * e - i * t) / n,
      _ = (l * t + i * e) / n;
    function d(n, a) {
      return [u * (n *= r) - s * (a *= o) + t, e - s * n - u * a];
    }
    return (
      (d.invert = function (n, t) {
        return [r * (c * n - p * t + f), o * (_ - p * n - c * t)];
      }),
      d
    );
  }
  function di(n, t) {
    return [n, xo(Ro((_o + t) / 2))];
  }
  function hi() {
    return (function (n) {
      var t,
        e,
        r,
        o = (function (n) {
          return (function (n) {
            var t,
              e,
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
              b = 0,
              v = 1,
              w = 1,
              k = null,
              E = ni,
              x = null,
              S = ro,
              A = 0.5;
            function M(n) {
              return u(n[0] * yo, n[1] * yo);
            }
            function R(n) {
              return (n = u.invert(n[0], n[1])) && [n[0] * go, n[1] * go];
            }
            function N() {
              var n = _i(p, 0, 0, v, w, b).apply(null, t(d, h)),
                r = _i(p, f - n[0], _ - n[1], v, w, b);
              return (
                (e = Da(m, g, y)),
                (l = Ba(t, r)),
                (u = Ba(e, l)),
                (i = pi(l, A)),
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
                  : (s = fi(
                      (function (n) {
                        return ii({
                          point: function (t, e) {
                            var r = n(t, e);
                            return this.stream.point(r[0], r[1]);
                          },
                        });
                      })(e)(E(i(S((c = n)))))
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
                  ? ((E = +n ? ei((k = n * yo)) : ((k = null), ni)), C())
                  : k * go;
              }),
              (M.clipExtent = function (n) {
                return arguments.length
                  ? ((S =
                      null == n
                        ? ((x = r = o = a = null), ro)
                        : ai(
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
                  ? ((d = (n[0] % 360) * yo), (h = (n[1] % 360) * yo), N())
                  : [d * go, h * go];
              }),
              (M.rotate = function (n) {
                return arguments.length
                  ? ((m = (n[0] % 360) * yo),
                    (g = (n[1] % 360) * yo),
                    (y = n.length > 2 ? (n[2] % 360) * yo : 0),
                    N())
                  : [m * go, g * go, y * go];
              }),
              (M.angle = function (n) {
                return arguments.length ? ((b = (n % 360) * yo), N()) : b * go;
              }),
              (M.reflectX = function (n) {
                return arguments.length ? ((v = n ? -1 : 1), N()) : v < 0;
              }),
              (M.reflectY = function (n) {
                return arguments.length ? ((w = n ? -1 : 1), N()) : w < 0;
              }),
              (M.precision = function (n) {
                return arguments.length
                  ? ((i = pi(l, (A = n * n))), C())
                  : Mo(A);
              }),
              (M.fitExtent = function (n, t) {
                return si(M, n, t);
              }),
              (M.fitSize = function (n, t) {
                return (function (n, t, e) {
                  return si(n, [[0, 0], t], e);
                })(M, n, t);
              }),
              (M.fitWidth = function (n, t) {
                return (function (n, t, e) {
                  return ui(
                    n,
                    function (e) {
                      var r = +t,
                        o = r / (e[1][0] - e[0][0]),
                        a = (r - o * (e[1][0] + e[0][0])) / 2,
                        i = -o * e[0][1];
                      n.scale(150 * o).translate([a, i]);
                    },
                    e
                  );
                })(M, n, t);
              }),
              (M.fitHeight = function (n, t) {
                return (function (n, t, e) {
                  return ui(
                    n,
                    function (e) {
                      var r = +t,
                        o = r / (e[1][1] - e[0][1]),
                        a = -o * e[0][0],
                        i = (r - o * (e[1][1] + e[0][1])) / 2;
                      n.scale(150 * o).translate([a, i]);
                    },
                    e
                  );
                })(M, n, t);
              }),
              function () {
                return (
                  (t = n.apply(this, arguments)),
                  (M.invert = t.invert && R),
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
        var a = fo * i(),
          l = o(
            (function (n) {
              function t(t) {
                return (
                  ((t = n(t[0] * yo, t[1] * yo))[0] *= go), (t[1] *= go), t
                );
              }
              return (
                (n = Da(n[0] * yo, n[1] * yo, n.length > 2 ? n[2] * yo : 0)),
                (t.invert = function (t) {
                  return (
                    ((t = n.invert(t[0] * yo, t[1] * yo))[0] *= go),
                    (t[1] *= go),
                    t
                  );
                }),
                t
              );
            })(o.rotate()).invert([0, 0])
          );
        return u(
          null == s
            ? [
                [l[0] - a, l[1] - a],
                [l[0] + a, l[1] + a],
              ]
            : n === di
            ? [
                [Math.max(l[0] - a, s), t],
                [Math.min(l[0] + a, e), r],
              ]
            : [
                [s, Math.max(l[1] - a, t)],
                [e, Math.min(l[1] + a, r)],
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
                ? (s = t = e = r = null)
                : ((s = +n[0][0]),
                  (t = +n[0][1]),
                  (e = +n[1][0]),
                  (r = +n[1][1])),
              c())
            : null == s
            ? null
            : [
                [s, t],
                [e, r],
              ];
        }),
        c()
      );
    })(di).scale(961 / mo);
  }
  function mi(n) {
    var t = 0,
      e = n.children,
      r = e && e.length;
    if (r) for (; --r >= 0; ) t += e[r].value;
    else t = 1;
    n.value = t;
  }
  function gi(n, t) {
    n instanceof Map
      ? ((n = [void 0, n]), void 0 === t && (t = bi))
      : void 0 === t && (t = yi);
    for (var e, r, o, a, i, l = new ki(n), u = [l]; (e = u.pop()); )
      if ((o = t(e.data)) && (i = (o = Array.from(o)).length))
        for (e.children = o, a = i - 1; a >= 0; --a)
          u.push((r = o[a] = new ki(o[a]))),
            (r.parent = e),
            (r.depth = e.depth + 1);
    return l.eachBefore(wi);
  }
  function yi(n) {
    return n.children;
  }
  function bi(n) {
    return Array.isArray(n) ? n[1] : null;
  }
  function vi(n) {
    void 0 !== n.data.value && (n.value = n.data.value), (n.data = n.data.data);
  }
  function wi(n) {
    var t = 0;
    do {
      n.height = t;
    } while ((n = n.parent) && n.height < ++t);
  }
  function ki(n) {
    (this.data = n), (this.depth = this.height = 0), (this.parent = null);
  }
  function Ei(n, t) {
    var e, r;
    if (Ai(t, n)) return [t];
    for (e = 0; e < n.length; ++e)
      if (xi(t, n[e]) && Ai(Ri(n[e], t), n)) return [n[e], t];
    for (e = 0; e < n.length - 1; ++e)
      for (r = e + 1; r < n.length; ++r)
        if (
          xi(Ri(n[e], n[r]), t) &&
          xi(Ri(n[e], t), n[r]) &&
          xi(Ri(n[r], t), n[e]) &&
          Ai(Ni(n[e], n[r], t), n)
        )
          return [n[e], n[r], t];
    throw new Error();
  }
  function xi(n, t) {
    var e = n.r - t.r,
      r = t.x - n.x,
      o = t.y - n.y;
    return e < 0 || e * e < r * r + o * o;
  }
  function Si(n, t) {
    var e = n.r - t.r + 1e-9 * Math.max(n.r, t.r, 1),
      r = t.x - n.x,
      o = t.y - n.y;
    return e > 0 && e * e > r * r + o * o;
  }
  function Ai(n, t) {
    for (var e = 0; e < t.length; ++e) if (!Si(n, t[e])) return !1;
    return !0;
  }
  function Mi(n) {
    switch (n.length) {
      case 1:
        return { x: (t = n[0]).x, y: t.y, r: t.r };
      case 2:
        return Ri(n[0], n[1]);
      case 3:
        return Ni(n[0], n[1], n[2]);
    }
    var t;
  }
  function Ri(n, t) {
    var e = n.x,
      r = n.y,
      o = n.r,
      a = t.x,
      i = t.y,
      l = t.r,
      u = a - e,
      s = i - r,
      c = l - o,
      p = Math.sqrt(u * u + s * s);
    return {
      x: (e + a + (u / p) * c) / 2,
      y: (r + i + (s / p) * c) / 2,
      r: (p + o + l) / 2,
    };
  }
  function Ni(n, t, e) {
    var r = n.x,
      o = n.y,
      a = n.r,
      i = t.x,
      l = t.y,
      u = t.r,
      s = e.x,
      c = e.y,
      p = e.r,
      f = r - i,
      _ = r - s,
      d = o - l,
      h = o - c,
      m = u - a,
      g = p - a,
      y = r * r + o * o - a * a,
      b = y - i * i - l * l + u * u,
      v = y - s * s - c * c + p * p,
      w = _ * d - f * h,
      k = (d * v - h * b) / (2 * w) - r,
      E = (h * m - d * g) / w,
      x = (_ * b - f * v) / (2 * w) - o,
      S = (f * g - _ * m) / w,
      A = E * E + S * S - 1,
      M = 2 * (a + k * E + x * S),
      R = k * k + x * x - a * a,
      N = -(A ? (M + Math.sqrt(M * M - 4 * A * R)) / (2 * A) : R / M);
    return { x: r + k + E * N, y: o + x + S * N, r: N };
  }
  function Ci(n, t, e) {
    var r,
      o,
      a,
      i,
      l = n.x - t.x,
      u = n.y - t.y,
      s = l * l + u * u;
    s
      ? ((o = t.r + e.r),
        (o *= o),
        (i = n.r + e.r),
        o > (i *= i)
          ? ((r = (s + i - o) / (2 * s)),
            (a = Math.sqrt(Math.max(0, i / s - r * r))),
            (e.x = n.x - r * l - a * u),
            (e.y = n.y - r * u + a * l))
          : ((r = (s + o - i) / (2 * s)),
            (a = Math.sqrt(Math.max(0, o / s - r * r))),
            (e.x = t.x + r * l - a * u),
            (e.y = t.y + r * u + a * l)))
      : ((e.x = t.x + e.r), (e.y = t.y));
  }
  function Bi(n, t) {
    var e = n.r + t.r - 1e-6,
      r = t.x - n.x,
      o = t.y - n.y;
    return e > 0 && e * e > r * r + o * o;
  }
  function Li(n) {
    var t = n._,
      e = n.next._,
      r = t.r + e.r,
      o = (t.x * e.r + e.x * t.r) / r,
      a = (t.y * e.r + e.y * t.r) / r;
    return o * o + a * a;
  }
  function Di(n) {
    (this._ = n), (this.next = null), (this.previous = null);
  }
  function Gi(n) {
    if (
      !(a = ((t = n),
      (n = "object" == typeof t && "length" in t ? t : Array.from(t))).length)
    )
      return 0;
    var t, e, r, o, a, i, l, u, s, c, p, f;
    if ((((e = n[0]).x = 0), (e.y = 0), !(a > 1))) return e.r;
    if (((r = n[1]), (e.x = -r.r), (r.x = e.r), (r.y = 0), !(a > 2)))
      return e.r + r.r;
    Ci(r, e, (o = n[2])),
      (e = new Di(e)),
      (r = new Di(r)),
      (o = new Di(o)),
      (e.next = o.previous = r),
      (r.next = e.previous = o),
      (o.next = r.previous = e);
    n: for (u = 3; u < a; ++u) {
      Ci(e._, r._, (o = n[u])),
        (o = new Di(o)),
        (s = r.next),
        (c = e.previous),
        (p = r._.r),
        (f = e._.r);
      do {
        if (p <= f) {
          if (Bi(s._, o._)) {
            (r = s), (e.next = r), (r.previous = e), --u;
            continue n;
          }
          (p += s._.r), (s = s.next);
        } else {
          if (Bi(c._, o._)) {
            ((e = c).next = r), (r.previous = e), --u;
            continue n;
          }
          (f += c._.r), (c = c.previous);
        }
      } while (s !== c.next);
      for (
        o.previous = e, o.next = r, e.next = r.previous = r = o, i = Li(e);
        (o = o.next) !== r;

      )
        (l = Li(o)) < i && ((e = o), (i = l));
      r = e.next;
    }
    for (e = [r._], o = r; (o = o.next) !== r; ) e.push(o._);
    for (
      o = (function (n) {
        for (
          var t,
            e,
            r = 0,
            o = (n = (function (n) {
              for (var t, e, r = n.length; r; )
                (e = (Math.random() * r--) | 0),
                  (t = n[r]),
                  (n[r] = n[e]),
                  (n[e] = t);
              return n;
            })(Array.from(n))).length,
            a = [];
          r < o;

        )
          (t = n[r]), e && Si(e, t) ? ++r : ((e = Mi((a = Ei(a, t)))), (r = 0));
        return e;
      })(e),
        u = 0;
      u < a;
      ++u
    )
      ((e = n[u]).x -= o.x), (e.y -= o.y);
    return o.r;
  }
  function Fi(n) {
    return null == n ? null : Ti(n);
  }
  function Ti(n) {
    if ("function" != typeof n) throw new Error();
    return n;
  }
  function Pi() {
    return 0;
  }
  function Ui(n) {
    return function () {
      return n;
    };
  }
  function Hi(n) {
    return Math.sqrt(n.value);
  }
  function Ii(n) {
    return function (t) {
      t.children || (t.r = Math.max(0, +n(t) || 0));
    };
  }
  function Oi(n, t) {
    return function (e) {
      if ((r = e.children)) {
        var r,
          o,
          a,
          i = r.length,
          l = n(e) * t || 0;
        if (l) for (o = 0; o < i; ++o) r[o].r += l;
        if (((a = Gi(r)), l)) for (o = 0; o < i; ++o) r[o].r -= l;
        e.r = a + l;
      }
    };
  }
  function ji(n) {
    return function (t) {
      var e = t.parent;
      (t.r *= n), e && ((t.x = e.x + n * t.x), (t.y = e.y + n * t.y));
    };
  }
  (di.invert = function (n, t) {
    return [n, 2 * vo(Eo(t)) - _o];
  }),
    (ki.prototype = gi.prototype = {
      constructor: ki,
      count: function () {
        return this.eachAfter(mi);
      },
      each: function (n, t) {
        let e = -1;
        for (const r of this) n.call(t, r, ++e, this);
        return this;
      },
      eachAfter: function (n, t) {
        for (var e, r, o, a = this, i = [a], l = [], u = -1; (a = i.pop()); )
          if ((l.push(a), (e = a.children)))
            for (r = 0, o = e.length; r < o; ++r) i.push(e[r]);
        for (; (a = l.pop()); ) n.call(t, a, ++u, this);
        return this;
      },
      eachBefore: function (n, t) {
        for (var e, r, o = this, a = [o], i = -1; (o = a.pop()); )
          if ((n.call(t, o, ++i, this), (e = o.children)))
            for (r = e.length - 1; r >= 0; --r) a.push(e[r]);
        return this;
      },
      find: function (n, t) {
        let e = -1;
        for (const r of this) if (n.call(t, r, ++e, this)) return r;
      },
      sum: function (n) {
        return this.eachAfter(function (t) {
          for (
            var e = +n(t.data) || 0, r = t.children, o = r && r.length;
            --o >= 0;

          )
            e += r[o].value;
          t.value = e;
        });
      },
      sort: function (n) {
        return this.eachBefore(function (t) {
          t.children && t.children.sort(n);
        });
      },
      path: function (n) {
        for (
          var t = this,
            e = (function (n, t) {
              if (n === t) return n;
              var e = n.ancestors(),
                r = t.ancestors(),
                o = null;
              for (n = e.pop(), t = r.pop(); n === t; )
                (o = n), (n = e.pop()), (t = r.pop());
              return o;
            })(t, n),
            r = [t];
          t !== e;

        )
          (t = t.parent), r.push(t);
        for (var o = r.length; n !== e; ) r.splice(o, 0, n), (n = n.parent);
        return r;
      },
      ancestors: function () {
        for (var n = this, t = [n]; (n = n.parent); ) t.push(n);
        return t;
      },
      descendants: function () {
        return Array.from(this);
      },
      leaves: function () {
        var n = [];
        return (
          this.eachBefore(function (t) {
            t.children || n.push(t);
          }),
          n
        );
      },
      links: function () {
        var n = this,
          t = [];
        return (
          n.each(function (e) {
            e !== n && t.push({ source: e.parent, target: e });
          }),
          t
        );
      },
      copy: function () {
        return gi(this).eachBefore(vi);
      },
      [Symbol.iterator]: function* () {
        var n,
          t,
          e,
          r,
          o = this,
          a = [o];
        do {
          for (n = a.reverse(), a = []; (o = n.pop()); )
            if ((yield o, (t = o.children)))
              for (e = 0, r = t.length; e < r; ++e) a.push(t[e]);
        } while (a.length);
      },
    });
  var Ki = { depth: -1 },
    zi = {};
  function Vi(n) {
    return n.id;
  }
  function $i(n) {
    return n.parentId;
  }
  function Wi(n) {
    (n.x0 = Math.round(n.x0)),
      (n.y0 = Math.round(n.y0)),
      (n.x1 = Math.round(n.x1)),
      (n.y1 = Math.round(n.y1));
  }
  function Xi(n, t, e, r, o) {
    for (
      var a,
        i = n.children,
        l = -1,
        u = i.length,
        s = n.value && (r - t) / n.value;
      ++l < u;

    )
      ((a = i[l]).y0 = e), (a.y1 = o), (a.x0 = t), (a.x1 = t += a.value * s);
  }
  function qi(n, t, e, r, o) {
    for (
      var a,
        i = n.children,
        l = -1,
        u = i.length,
        s = n.value && (o - e) / n.value;
      ++l < u;

    )
      ((a = i[l]).x0 = t), (a.x1 = r), (a.y0 = e), (a.y1 = e += a.value * s);
  }
  const Yi = (function n(t) {
    function e(n, e, r, o, a) {
      !(function (n, t, e, r, o, a) {
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
            y = t.children,
            b = 0,
            v = 0,
            w = y.length,
            k = t.value;
          b < w;

        ) {
          (u = o - e), (s = a - r);
          do {
            c = y[v++].value;
          } while (!c && v < w);
          for (
            p = f = c,
              m = c * c * (h = Math.max(s / u, u / s) / (k * n)),
              d = Math.max(f / m, m / p);
            v < w;
            ++v
          ) {
            if (
              ((c += l = y[v].value),
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
          g.push((i = { value: c, dice: u < s, children: y.slice(b, v) })),
            i.dice
              ? Xi(i, e, r, o, k ? (r += (s * c) / k) : a)
              : qi(i, e, r, k ? (e += (u * c) / k) : o, a),
            (k -= c),
            (b = v);
        }
      })(t, n, e, r, o, a);
    }
    return (
      (e.ratio = function (t) {
        return n((t = +t) > 1 ? t : 1);
      }),
      e
    );
  })((1 + Math.sqrt(5)) / 2);
  function Zi(n, t) {
    return (
      (n = +n),
      (t = +t),
      function (e) {
        return Math.round(n * (1 - e) + t * e);
      }
    );
  }
  function Ji(n) {
    return +n;
  }
  var Qi = [0, 1];
  function nl(n) {
    return n;
  }
  function tl(n, t) {
    return (t -= n = +n)
      ? function (e) {
          return (e - n) / t;
        }
      : ((e = isNaN(t) ? NaN : 0.5),
        function () {
          return e;
        });
    var e;
  }
  function el(n, t, e) {
    var r = n[0],
      o = n[1],
      a = t[0],
      i = t[1];
    return (
      o < r ? ((r = tl(o, r)), (a = e(i, a))) : ((r = tl(r, o)), (a = e(a, i))),
      function (n) {
        return a(r(n));
      }
    );
  }
  function rl(n, t, e) {
    var r = Math.min(n.length, t.length) - 1,
      o = new Array(r),
      a = new Array(r),
      i = -1;
    for (
      n[r] < n[0] && ((n = n.slice().reverse()), (t = t.slice().reverse()));
      ++i < r;

    )
      (o[i] = tl(n[i], n[i + 1])), (a[i] = e(t[i], t[i + 1]));
    return function (t) {
      var e = u(n, t, 1, r) - 1;
      return a[e](o[e](t));
    };
  }
  function ol(n, t) {
    return t
      .domain(n.domain())
      .range(n.range())
      .interpolate(n.interpolate())
      .clamp(n.clamp())
      .unknown(n.unknown());
  }
  function al() {
    return (function () {
      var n,
        t,
        e,
        r,
        o,
        a,
        i = Qi,
        l = Qi,
        u = Vt,
        s = nl;
      function c() {
        var n,
          t,
          e,
          u = Math.min(i.length, l.length);
        return (
          s !== nl &&
            ((n = i[0]),
            (t = i[u - 1]),
            n > t && ((e = n), (n = t), (t = e)),
            (s = function (e) {
              return Math.max(n, Math.min(t, e));
            })),
          (r = u > 2 ? rl : el),
          (o = a = null),
          p
        );
      }
      function p(t) {
        return isNaN((t = +t)) ? e : (o || (o = r(i.map(n), l, u)))(n(s(t)));
      }
      return (
        (p.invert = function (e) {
          return s(t((a || (a = r(l, i.map(n), Ht)))(e)));
        }),
        (p.domain = function (n) {
          return arguments.length ? ((i = Array.from(n, Ji)), c()) : i.slice();
        }),
        (p.range = function (n) {
          return arguments.length ? ((l = Array.from(n)), c()) : l.slice();
        }),
        (p.rangeRound = function (n) {
          return (l = Array.from(n)), (u = Zi), c();
        }),
        (p.clamp = function (n) {
          return arguments.length ? ((s = !!n || nl), c()) : s !== nl;
        }),
        (p.interpolate = function (n) {
          return arguments.length ? ((u = n), c()) : u;
        }),
        (p.unknown = function (n) {
          return arguments.length ? ((e = n), p) : e;
        }),
        function (e, r) {
          return (n = e), (t = r), c();
        }
      );
    })()(nl, nl);
  }
  function il(n, t) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(n);
        break;
      default:
        this.range(t).domain(n);
    }
    return this;
  }
  function ll(n, t) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        "function" == typeof n ? this.interpolator(n) : this.range(n);
        break;
      default:
        this.domain(n),
          "function" == typeof t ? this.interpolator(t) : this.range(t);
    }
    return this;
  }
  function ul(n) {
    var t = n.domain;
    return (
      (n.ticks = function (n) {
        var e = t();
        return _(e[0], e[e.length - 1], null == n ? 10 : n);
      }),
      (n.tickFormat = function (n, e) {
        var r = t();
        return (function (n, t, e, r) {
          var o,
            a = (function (n, t, e) {
              var r = Math.abs(t - n) / Math.max(0, e),
                o = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                a = r / o;
              return (
                a >= c ? (o *= 10) : a >= p ? (o *= 5) : a >= f && (o *= 2),
                t < n ? -o : o
              );
            })(n, t, e);
          switch ((r = Wr(null == r ? ",f" : r)).type) {
            case "s":
              var i = Math.max(Math.abs(n), Math.abs(t));
              return (
                null != r.precision ||
                  isNaN(
                    (o = (function (n, t) {
                      return Math.max(
                        0,
                        3 * Math.max(-8, Math.min(8, Math.floor(zr(t) / 3))) -
                          zr(Math.abs(n))
                      );
                    })(a, i))
                  ) ||
                  (r.precision = o),
                no(r, i)
              );
            case "":
            case "e":
            case "g":
            case "p":
            case "r":
              null != r.precision ||
                isNaN(
                  (o = (function (n, t) {
                    return (
                      (n = Math.abs(n)),
                      (t = Math.abs(t) - n),
                      Math.max(0, zr(t) - zr(n)) + 1
                    );
                  })(a, Math.max(Math.abs(n), Math.abs(t))))
                ) ||
                (r.precision = o - ("e" === r.type));
              break;
            case "f":
            case "%":
              null != r.precision ||
                isNaN(
                  (o = (function (n) {
                    return Math.max(0, -zr(Math.abs(n)));
                  })(a))
                ) ||
                (r.precision = o - 2 * ("%" === r.type));
          }
          return Qr(r);
        })(r[0], r[r.length - 1], null == n ? 10 : n, e);
      }),
      (n.nice = function (e) {
        null == e && (e = 10);
        var r,
          o,
          a = t(),
          i = 0,
          l = a.length - 1,
          u = a[i],
          s = a[l],
          c = 10;
        for (
          s < u && ((o = u), (u = s), (s = o), (o = i), (i = l), (l = o));
          c-- > 0;

        ) {
          if ((o = d(u, s, e)) === r) return (a[i] = u), (a[l] = s), t(a);
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
  function sl() {
    var n = al();
    return (
      (n.copy = function () {
        return ol(n, sl());
      }),
      il.apply(n, arguments),
      ul(n)
    );
  }
  const cl = Symbol("implicit");
  function pl() {
    var n = new Map(),
      t = [],
      e = [],
      r = cl;
    function o(o) {
      var a = o + "",
        i = n.get(a);
      if (!i) {
        if (r !== cl) return r;
        n.set(a, (i = t.push(o)));
      }
      return e[(i - 1) % e.length];
    }
    return (
      (o.domain = function (e) {
        if (!arguments.length) return t.slice();
        (t = []), (n = new Map());
        for (const r of e) {
          const e = r + "";
          n.has(e) || n.set(e, t.push(r));
        }
        return o;
      }),
      (o.range = function (n) {
        return arguments.length ? ((e = Array.from(n)), o) : e.slice();
      }),
      (o.unknown = function (n) {
        return arguments.length ? ((r = n), o) : r;
      }),
      (o.copy = function () {
        return pl(t, e).unknown(r);
      }),
      il.apply(o, arguments),
      o
    );
  }
  function fl() {
    var n,
      t,
      e,
      r,
      o,
      a = 0,
      i = 1,
      l = nl,
      u = !1;
    function s(t) {
      return isNaN((t = +t))
        ? o
        : l(
            0 === e
              ? 0.5
              : ((t = (r(t) - n) * e), u ? Math.max(0, Math.min(1, t)) : t)
          );
    }
    function c(n) {
      return function (t) {
        var e, r;
        return arguments.length
          ? (([e, r] = t), (l = n(e, r)), s)
          : [l(0), l(1)];
      };
    }
    return (
      (s.domain = function (o) {
        return arguments.length
          ? (([a, i] = o),
            (n = r((a = +a))),
            (t = r((i = +i))),
            (e = n === t ? 0 : 1 / (t - n)),
            s)
          : [a, i];
      }),
      (s.clamp = function (n) {
        return arguments.length ? ((u = !!n), s) : u;
      }),
      (s.interpolator = function (n) {
        return arguments.length ? ((l = n), s) : l;
      }),
      (s.range = c(Vt)),
      (s.rangeRound = c(Zi)),
      (s.unknown = function (n) {
        return arguments.length ? ((o = n), s) : o;
      }),
      function (o) {
        return (
          (r = o), (n = o(a)), (t = o(i)), (e = n === t ? 0 : 1 / (t - n)), s
        );
      }
    );
  }
  function _l(n, t) {
    return t
      .domain(n.domain())
      .interpolator(n.interpolator())
      .clamp(n.clamp())
      .unknown(n.unknown());
  }
  function dl() {
    var n = ul(fl()(nl));
    return (
      (n.copy = function () {
        return _l(n, dl());
      }),
      ll.apply(n, arguments)
    );
  }
  function hl(n) {
    for (var t = (n.length / 6) | 0, e = new Array(t), r = 0; r < t; )
      e[r] = "#" + n.slice(6 * r, 6 * ++r);
    return e;
  }
  const ml = (n) => Tt(n[n.length - 1]),
    gl = ml(
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
        .map(hl)
    ),
    yl = ml(
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
        .map(hl)
    ),
    bl = ml(
      new Array(3)
        .concat(
          "fee6cefdae6be6550d",
          "feeddefdbe85fd8d3cd94701",
          "feeddefdbe85fd8d3ce6550da63603",
          "feeddefdd0a2fdae6bfd8d3ce6550da63603",
          "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
          "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
          "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
        )
        .map(hl)
    ),
    vl = Math.PI / 180,
    wl = 180 / Math.PI;
  var kl = -0.14861,
    El = 1.78277,
    xl = -0.29227,
    Sl = -0.90649,
    Al = 1.97294,
    Ml = Al * Sl,
    Rl = Al * El,
    Nl = El * xl - Sl * kl;
  function Cl(n) {
    if (n instanceof Ll) return new Ll(n.h, n.s, n.l, n.opacity);
    n instanceof kt || (n = vt(n));
    var t = n.r / 255,
      e = n.g / 255,
      r = n.b / 255,
      o = (Nl * r + Ml * t - Rl * e) / (Nl + Ml - Rl),
      a = r - o,
      i = (Al * (e - o) - xl * a) / Sl,
      l = Math.sqrt(i * i + a * a) / (Al * o * (1 - o)),
      u = l ? Math.atan2(i, a) * wl - 120 : NaN;
    return new Ll(u < 0 ? u + 360 : u, l, o, n.opacity);
  }
  function Bl(n, t, e, r) {
    return 1 === arguments.length ? Cl(n) : new Ll(n, t, e, null == r ? 1 : r);
  }
  function Ll(n, t, e, r) {
    (this.h = +n), (this.s = +t), (this.l = +e), (this.opacity = +r);
  }
  function Dl(n) {
    return (function t(e) {
      function r(t, r) {
        var o = n((t = Bl(t)).h, (r = Bl(r)).h),
          a = Dt(t.s, r.s),
          i = Dt(t.l, r.l),
          l = Dt(t.opacity, r.opacity);
        return function (n) {
          return (
            (t.h = o(n)),
            (t.s = a(n)),
            (t.l = i(Math.pow(n, e))),
            (t.opacity = l(n)),
            t + ""
          );
        };
      }
      return (e = +e), (r.gamma = t), r;
    })(1);
  }
  Qn(
    Ll,
    Bl,
    nt(tt, {
      brighter: function (n) {
        return (
          (n = null == n ? rt : Math.pow(rt, n)),
          new Ll(this.h, this.s, this.l * n, this.opacity)
        );
      },
      darker: function (n) {
        return (
          (n = null == n ? et : Math.pow(et, n)),
          new Ll(this.h, this.s, this.l * n, this.opacity)
        );
      },
      rgb: function () {
        var n = isNaN(this.h) ? 0 : (this.h + 120) * vl,
          t = +this.l,
          e = isNaN(this.s) ? 0 : this.s * t * (1 - t),
          r = Math.cos(n),
          o = Math.sin(n);
        return new kt(
          255 * (t + e * (kl * r + El * o)),
          255 * (t + e * (xl * r + Sl * o)),
          255 * (t + e * (Al * r)),
          this.opacity
        );
      },
    })
  ),
    Dl(function (n, t) {
      var e = t - n;
      return e
        ? Lt(n, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e)
        : Bt(isNaN(n) ? t : n);
    });
  var Gl = Dl(Dt),
    Fl =
      (Gl(Bl(-100, 0.75, 0.35), Bl(80, 1.5, 0.8)),
      Gl(Bl(260, 0.75, 0.35), Bl(80, 1.5, 0.8)),
      Bl());
  function Tl(n) {
    (n < 0 || n > 1) && (n -= Math.floor(n));
    var t = Math.abs(n - 0.5);
    return (
      (Fl.h = 360 * n - 100),
      (Fl.s = 1.5 - 1.5 * t),
      (Fl.l = 0.8 - 0.9 * t),
      Fl + ""
    );
  }
  function Pl(n, t, e) {
    (this.k = n), (this.x = t), (this.y = e);
  }
  (Pl.prototype = {
    constructor: Pl,
    scale: function (n) {
      return 1 === n ? this : new Pl(this.k * n, this.x, this.y);
    },
    translate: function (n, t) {
      return (0 === n) & (0 === t)
        ? this
        : new Pl(this.k, this.x + this.k * n, this.y + this.k * t);
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
    new Pl(1, 0, 0),
    Pl.prototype;
  const Ul = window.innerHeight - 10,
    Hl = window.innerWidth - 10,
    Il = [
      "rgb(240,163,255)",
      "rgb(0,117,220)",
      "rgb(153,63,0)",
      "rgb(76,0,92)",
      "rgb(25,25,25)",
      "rgb(0,92,49)",
      "rgb(43,206,72)",
      "rgb(255,204,153)",
      "rgb(128,128,128)",
      "rgb(148,255,181)",
      "rgb(143,124,0)",
      "rgb(157,204,0)",
      "rgb(194,0,136)",
      "rgb(0,51,128)",
      "rgb(255,164,5)",
      "rgb(255,168,187)",
      "rgb(66,102,0)",
      "rgb(255,0,16)",
      "rgb(94,241,242)",
      "rgb(0,153,143)",
      "rgb(224,255,102)",
      "rgb(116,10,255)",
      "rgb(153,0,0)",
      "rgb(255,255,128)",
      "rgb(255,255,0)",
      "rgb(255,80,5)",
    ],
    Ol = JSON.parse(
      '{"R":[{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Albania","sov_a3":"ALB","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Albania","adm0_a3":"ALB","geou_dif":0,"geounit":"Albania","gu_a3":"ALB","su_dif":0,"subunit":"Albania","su_a3":"ALB","brk_diff":0,"name":"Albania","name_long":"Albania","brk_a3":"ALB","brk_name":"Albania","brk_group":null,"abbrev":"Alb.","postal":"AL","formal_en":"Republic of Albania","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Albania","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":1,"mapcolor13":6,"pop_est":3639453,"gdp_md_est":21810,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"AL","iso_a3":"ALB","iso_n3":"008","un_a3":"008","wb_a2":"AL","wb_a3":"ALB","woe_id":-99,"adm0_a3_is":"ALB","adm0_a3_us":"ALB","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"ALB.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.590247430104906,41.855404161133606],[20.463175083099202,41.51508901627533],[20.605181919037364,41.08622630468522],[21.0200403174764,40.84272695572588],[20.999989861747224,40.58000397395397],[20.674996779063633,40.43499990494303],[20.615000441172754,40.11000682225938],[20.15001590341052,39.62499766698397],[19.980000441170144,39.69499339452341],[19.960001661873207,39.91500580500605],[19.406081984136733,40.250773423822466],[19.319058872157143,40.72723012955356],[19.40354983895429,41.40956574153546],[19.540027296637106,41.71998607031276],[19.37176883309496,41.877547512370654],[19.304486118250793,42.19574514420782],[19.738051385179627,42.688247382165564],[19.801613396898688,42.50009349219084],[20.0707,42.58863],[20.283754510181893,42.32025950781508],[20.52295,42.21787],[20.590247430104906,41.855404161133606]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Austria","sov_a3":"AUT","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Austria","adm0_a3":"AUT","geou_dif":0,"geounit":"Austria","gu_a3":"AUT","su_dif":0,"subunit":"Austria","su_a3":"AUT","brk_diff":0,"name":"Austria","name_long":"Austria","brk_a3":"AUT","brk_name":"Austria","brk_group":null,"abbrev":"Aust.","postal":"A","formal_en":"Republic of Austria","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Austria","name_alt":null,"mapcolor7":3,"mapcolor8":1,"mapcolor9":3,"mapcolor13":4,"pop_est":8210281,"gdp_md_est":329500,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"AT","iso_a3":"AUT","iso_n3":"040","un_a3":"040","wb_a2":"AT","wb_a3":"AUT","woe_id":-99,"adm0_a3_is":"AUT","adm0_a3_us":"AUT","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"AUT.geojson"},"geometry":{"type":"Polygon","coordinates":[[[16.979666782304037,48.123497015976305],[16.90375410326726,47.71486562762833],[16.340584344150415,47.71290192320123],[16.534267612380376,47.49617096616912],[16.202298211337364,46.85238597267696],[16.011663852612656,46.6836107448117],[15.137091912504985,46.65870270444703],[14.63247155117483,46.43181732846955],[13.806475457421527,46.509306138691215],[12.376485223040817,46.76755910906985],[12.153088006243054,47.11539317482645],[11.16482791509327,46.94157949481273],[11.048555942436536,46.75135854754634],[10.44270145024663,46.89354625099743],[9.932448357796659,46.92072805438296],[9.479969516649021,47.10280996356337],[9.632931756232978,47.34760122332999],[9.59422610844635,47.52505809182027],[9.896068149463188,47.580196845075704],[10.402083774465211,47.30248769793916],[10.544504021861627,47.56639923765377],[11.426414015354737,47.523766181012974],[12.141357456112788,47.703083401065776],[12.620759718484491,47.67238760028441],[12.932626987365948,47.467645575544],[13.02585127122049,47.637583523135824],[12.884102817443903,48.28914581968792],[13.243357374737,48.416114813829054],[13.595945672264437,48.87717194273715],[14.33889773932472,48.5553052842072],[14.901447381254057,48.964401760445824],[15.253415561593982,49.039074205107575],[16.02964725105022,48.73389903420793],[16.49928266771877,48.78580801044511],[16.960288120194576,48.5969823268506],[16.879982944413,48.47001333270947],[16.979666782304037,48.123497015976305]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Belgium","sov_a3":"BEL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Belgium","adm0_a3":"BEL","geou_dif":0,"geounit":"Belgium","gu_a3":"BEL","su_dif":0,"subunit":"Belgium","su_a3":"BEL","brk_diff":0,"name":"Belgium","name_long":"Belgium","brk_a3":"BEL","brk_name":"Belgium","brk_group":null,"abbrev":"Belg.","postal":"B","formal_en":"Kingdom of Belgium","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Belgium","name_alt":null,"mapcolor7":3,"mapcolor8":2,"mapcolor9":1,"mapcolor13":8,"pop_est":10414336,"gdp_md_est":389300,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"BE","iso_a3":"BEL","iso_n3":"056","un_a3":"056","wb_a2":"BE","wb_a3":"BEL","woe_id":-99,"adm0_a3_is":"BEL","adm0_a3_us":"BEL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"BEL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[3.314971144228537,51.345780951536085],[4.047071160507527,51.26725861266857],[4.973991326526914,51.475023708698124],[5.606975945670001,51.037298488969775],[6.156658155958779,50.80372101501058],[6.043073357781111,50.128051662794235],[5.782417433300906,50.09032786722122],[5.674051954784829,49.529483547557504],[4.799221632515809,49.985373033236385],[4.286022983425084,49.907496649772554],[3.588184441755686,50.37899241800358],[3.123251580425801,50.780363267614575],[2.658422071960274,50.79684804951574],[2.513573032246143,51.14850617126183],[3.314971144228537,51.345780951536085]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Bosnia and Herzegovina","sov_a3":"BIH","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Bosnia and Herzegovina","adm0_a3":"BIH","geou_dif":0,"geounit":"Bosnia and Herzegovina","gu_a3":"BIH","su_dif":0,"subunit":"Bosnia and Herzegovina","su_a3":"BIH","brk_diff":0,"name":"Bosnia and Herz.","name_long":"Bosnia and Herzegovina","brk_a3":"BIH","brk_name":"Bosnia and Herz.","brk_group":null,"abbrev":"B.H.","postal":"BiH","formal_en":"Bosnia and Herzegovina","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Bosnia and Herzegovina","name_alt":null,"mapcolor7":1,"mapcolor8":1,"mapcolor9":1,"mapcolor13":2,"pop_est":4613414,"gdp_md_est":29700,"pop_year":-99,"lastcensus":1991,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"BA","iso_a3":"BIH","iso_n3":"070","un_a3":"070","wb_a2":"BA","wb_a3":"BIH","woe_id":-99,"adm0_a3_is":"BIH","adm0_a3_us":"BIH","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":16,"long_len":22,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"BIH.geojson"},"geometry":{"type":"Polygon","coordinates":[[[19.00548628101012,44.86023366960916],[19.36803,44.863],[19.11761,44.42307000000011],[19.59976,44.03847],[19.454,43.56810000000013],[19.21852,43.52384],[19.03165,43.43253],[18.70648,43.20011],[18.56,42.65],[17.674921502358984,43.02856252702361],[17.297373488034452,43.44634064388736],[16.91615644701733,43.66772247982567],[16.456442905348865,44.04123973243128],[16.23966027188453,44.35114329688571],[15.750026075918981,44.81871165626256],[15.959367303133376,45.233776760430935],[16.318156772535872,45.00412669532591],[16.534939406000206,45.21160757097772],[17.002146030351014,45.233776760430935],[17.861783481526402,45.067740383477144],[18.553214145591653,45.08158966733145],[19.00548628101012,44.86023366960916]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Belarus","sov_a3":"BLR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Belarus","adm0_a3":"BLR","geou_dif":0,"geounit":"Belarus","gu_a3":"BLR","su_dif":0,"subunit":"Belarus","su_a3":"BLR","brk_diff":0,"name":"Belarus","name_long":"Belarus","brk_a3":"BLR","brk_name":"Belarus","brk_group":null,"abbrev":"Bela.","postal":"BY","formal_en":"Republic of Belarus","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Belarus","name_alt":null,"mapcolor7":1,"mapcolor8":1,"mapcolor9":5,"mapcolor13":11,"pop_est":9648533,"gdp_md_est":114100,"pop_year":-99,"lastcensus":2009,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"BY","iso_a3":"BLR","iso_n3":"112","un_a3":"112","wb_a2":"BY","wb_a3":"BLR","woe_id":-99,"adm0_a3_is":"BLR","adm0_a3_us":"BLR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"BLR.geojson"},"geometry":{"type":"Polygon","coordinates":[[[23.48412763844985,53.91249766704114],[24.450683628037037,53.905702216194754],[25.536353794056993,54.28242340760253],[25.7684326514798,54.84696259217509],[26.58827924979039,55.16717560487167],[26.494331495883753,55.615106919977634],[27.10245975109453,55.783313707087686],[28.176709425577993,56.16912995057881],[29.229513380660308,55.918344224666356],[29.371571893030673,55.670090643936184],[29.896294386522356,55.78946320253041],[30.873909132620007,55.55097646750341],[30.971835971813135,55.08154775656404],[30.757533807098717,54.81177094178432],[31.38447228366374,54.157056382862436],[31.79142418796224,53.97463857687212],[31.731272820774507,53.79402944601202],[32.405598585751164,53.618045355842035],[32.69364301934604,53.35142080343212],[32.304519484188226,53.1327261419729],[31.49764367038293,53.1674268662569],[31.305200636528014,53.07399587667321],[31.54001834486226,52.74205231384636],[31.785998162571587,52.101677964885454],[30.927549269338982,52.04235342061438],[30.619454380014844,51.822806098022376],[30.555117221811457,51.31950348571566],[30.157363722460897,51.41613841410147],[29.254938185347925,51.368234361366895],[28.99283532076353,51.602044379271476],[28.61761274589225,51.42771393493484],[28.24161502453657,51.57222707783907],[27.454066196408434,51.59230337178447],[26.337958611768556,51.83228872334793],[25.327787713327005,51.91065603291855],[24.553106316839518,51.888461005249184],[24.00507775238421,51.61744395609446],[23.52707075368437,51.57845408793023],[23.508002150168693,52.02364655212473],[23.199493849386187,52.486977444053664],[23.799198846133375,52.69109935160657],[23.80493493011778,53.089731350306074],[23.527535841575002,53.470121568406555],[23.48412763844985,53.91249766704114]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Bulgaria","sov_a3":"BGR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Bulgaria","adm0_a3":"BGR","geou_dif":0,"geounit":"Bulgaria","gu_a3":"BGR","su_dif":0,"subunit":"Bulgaria","su_a3":"BGR","brk_diff":0,"name":"Bulgaria","name_long":"Bulgaria","brk_a3":"BGR","brk_name":"Bulgaria","brk_group":null,"abbrev":"Bulg.","postal":"BG","formal_en":"Republic of Bulgaria","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Bulgaria","name_alt":null,"mapcolor7":4,"mapcolor8":5,"mapcolor9":1,"mapcolor13":8,"pop_est":7204687,"gdp_md_est":93750,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"BG","iso_a3":"BGR","iso_n3":"100","un_a3":"100","wb_a2":"BG","wb_a3":"BGR","woe_id":-99,"adm0_a3_is":"BGR","adm0_a3_us":"BGR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"BGR.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.65714969248299,44.23492300066128],[22.944832391051847,43.82378530534713],[23.33230228037632,43.89701080990471],[24.100679152124172,43.74105133724785],[25.569271681426926,43.68844472917472],[26.065158725699746,43.94349376075126],[27.242399529740908,44.175986029632405],[27.970107049275075,43.81246816667521],[28.558081495891997,43.70746165625813],[28.03909508638472,43.293171698574184],[27.67389773937805,42.577892361006214],[27.99672041190539,42.00735871028779],[27.135739373490477,42.14148489030134],[26.117041863720797,41.82690460872456],[26.106138136507212,41.32889883072778],[25.197201368925445,41.23448598893053],[24.49264489105803,41.583896185872035],[23.692073601992348,41.30908091894385],[22.952377150166452,41.33799388281115],[22.88137373219743,41.99929718685026],[22.380525750424592,42.32025950781509],[22.54501183440962,42.46136200618804],[22.43659467946128,42.580321153323936],[22.60480146657133,42.898518785161144],[22.986018507588483,43.211161200526966],[22.50015669118028,43.64281443946099],[22.410446404721597,44.00806346289995],[22.65714969248299,44.23492300066128]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Switzerland","sov_a3":"CHE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Switzerland","adm0_a3":"CHE","geou_dif":0,"geounit":"Switzerland","gu_a3":"CHE","su_dif":0,"subunit":"Switzerland","su_a3":"CHE","brk_diff":0,"name":"Switzerland","name_long":"Switzerland","brk_a3":"CHE","brk_name":"Switzerland","brk_group":null,"abbrev":"Switz.","postal":"CH","formal_en":"Swiss Confederation","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Switzerland","name_alt":null,"mapcolor7":5,"mapcolor8":2,"mapcolor9":7,"mapcolor13":3,"pop_est":7604467,"gdp_md_est":316700,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"CH","iso_a3":"CHE","iso_n3":"756","un_a3":"756","wb_a2":"CH","wb_a3":"CHE","woe_id":-99,"adm0_a3_is":"CHE","adm0_a3_us":"CHE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":11,"long_len":11,"abbrev_len":6,"tiny":-99,"homepart":1,"filename":"CHE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[9.59422610844635,47.52505809182027],[9.632931756232978,47.34760122332999],[9.479969516649021,47.10280996356337],[9.932448357796659,46.92072805438296],[10.44270145024663,46.89354625099743],[10.363378126678612,46.48357127540986],[9.92283654139038,46.31489940040919],[9.182881707403055,46.44021474871698],[8.966305779667806,46.036931871111186],[8.489952426801324,46.005150865251686],[8.31662967289438,46.16364248309086],[7.755992058959833,45.82449005795931],[7.273850945676656,45.776947740250776],[6.843592970414504,45.99114655210061],[6.500099724970425,46.42967275652944],[6.022609490593537,46.27298981382047],[6.037388950229001,46.725778713561866],[6.768713820023606,47.2877082383037],[6.736571079138059,47.541801255882845],[7.192202182655507,47.44976552997102],[7.46675906742223,47.62058197691181],[8.317301466514152,47.61357982033626],[8.522611932009765,47.830827541691285],[9.59422610844635,47.52505809182027]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Czech Republic","sov_a3":"CZE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Czech Republic","adm0_a3":"CZE","geou_dif":0,"geounit":"Czech Republic","gu_a3":"CZE","su_dif":0,"subunit":"Czech Republic","su_a3":"CZE","brk_diff":0,"name":"Czech Rep.","name_long":"Czech Republic","brk_a3":"CZE","brk_name":"Czech Rep.","brk_group":null,"abbrev":"Cz. Rep.","postal":"CZ","formal_en":"Czech Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Czech Republic","name_alt":null,"mapcolor7":1,"mapcolor8":1,"mapcolor9":2,"mapcolor13":6,"pop_est":10211904,"gdp_md_est":265200,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"CZ","iso_a3":"CZE","iso_n3":"203","un_a3":"203","wb_a2":"CZ","wb_a3":"CZE","woe_id":-99,"adm0_a3_is":"CZE","adm0_a3_us":"CZE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":10,"long_len":14,"abbrev_len":8,"tiny":-99,"homepart":1,"filename":"CZE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[16.960288120194576,48.5969823268506],[16.49928266771877,48.78580801044511],[16.02964725105022,48.73389903420793],[15.253415561593982,49.039074205107575],[14.901447381254057,48.964401760445824],[14.33889773932472,48.5553052842072],[13.595945672264437,48.87717194273715],[13.031328973043431,49.30706818297324],[12.521024204161192,49.547415269562734],[12.415190870827445,49.96912079528057],[12.240111118222558,50.266337795607285],[12.966836785543194,50.484076443069085],[13.338131951560285,50.73323436136435],[14.056227654688172,50.92691762959429],[14.307013380600637,51.117267767941414],[14.570718214586066,51.002339382524276],[15.01699588385867,51.10667409932158],[15.490972120839727,50.78472992614321],[16.23862674323857,50.69773265237984],[16.176253289462267,50.42260732685791],[16.719475945714436,50.21574656839354],[16.868769158605655,50.47397370055603],[17.55456709155112,50.36214590107641],[17.64944502123899,50.049038397819956],[18.392913852622172,49.98862864847075],[18.853144158613617,49.49622976337764],[18.554971144289482,49.49501536721878],[18.399993523846177,49.31500051533004],[18.170498488037964,49.271514797556435],[18.104972771891852,49.04398346617531],[17.913511590250465,48.996492824899086],[17.88648481616181,48.90347524677371],[17.545006951577108,48.80001902932537],[17.101984897538898,48.81696889911711],[16.960288120194576,48.5969823268506]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Germany","sov_a3":"DEU","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Germany","adm0_a3":"DEU","geou_dif":0,"geounit":"Germany","gu_a3":"DEU","su_dif":0,"subunit":"Germany","su_a3":"DEU","brk_diff":0,"name":"Germany","name_long":"Germany","brk_a3":"DEU","brk_name":"Germany","brk_group":null,"abbrev":"Ger.","postal":"D","formal_en":"Federal Republic of Germany","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Germany","name_alt":null,"mapcolor7":2,"mapcolor8":5,"mapcolor9":5,"mapcolor13":1,"pop_est":82329758,"gdp_md_est":2918000,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"DE","iso_a3":"DEU","iso_n3":"276","un_a3":"276","wb_a2":"DE","wb_a3":"DEU","woe_id":-99,"adm0_a3_is":"DEU","adm0_a3_us":"DEU","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"DEU.geojson"},"geometry":{"type":"Polygon","coordinates":[[[9.921906365609232,54.983104153048025],[9.9395797054529,54.596641954153256],[10.950112338920519,54.363607082733154],[10.939466993868448,54.00869334575258],[11.956252475643282,54.19648550070116],[12.518440382546714,54.47037059184799],[13.647467075259499,54.0755109727059],[14.119686313542559,53.75702912049103],[14.353315463934168,53.248171291713106],[14.074521111719434,52.98126251892535],[14.4375997250022,52.624850165408304],[14.685026482815713,52.089947414755216],[14.607098422919648,51.745188096719964],[15.016995883858781,51.10667409932171],[14.570718214586122,51.00233938252438],[14.307013380600665,51.11726776794137],[14.056227654688314,50.92691762959435],[13.338131951560397,50.73323436136428],[12.96683678554325,50.48407644306917],[12.240111118222671,50.26633779560723],[12.415190870827473,49.96912079528062],[12.521024204161336,49.54741526956275],[13.031328973043514,49.30706818297324],[13.595945672264577,48.877171942737164],[13.243357374737116,48.41611481382903],[12.884102817443873,48.28914581968786],[13.025851271220517,47.63758352313595],[12.932626987366064,47.467645575544],[12.620759718484521,47.672387600284424],[12.141357456112871,47.70308340106578],[11.426414015354851,47.52376618101306],[10.544504021861597,47.5663992376538],[10.402083774465325,47.30248769793916],[9.896068149463188,47.580196845075704],[9.594226108446376,47.5250580918202],[8.522611932009795,47.83082754169135],[8.317301466514095,47.61357982033627],[7.466759067422288,47.62058197691192],[7.593676385131062,48.33301911070373],[8.099278598674855,49.01778351500343],[6.658229607783709,49.20195831969164],[6.186320428094177,49.463802802114515],[6.242751092156993,49.90222565367873],[6.043073357781111,50.128051662794235],[6.156658155958779,50.80372101501058],[5.988658074577813,51.851615709025054],[6.589396599970826,51.852029120483394],[6.842869500362383,52.22844025329755],[7.092053256873896,53.14404328064489],[6.905139601274129,53.48216217713064],[7.100424838905268,53.69393219666267],[7.936239454793962,53.74829580343379],[8.121706170289485,53.52779246684429],[8.800734490604668,54.020785630908904],[8.572117954145368,54.39564647075405],[8.526229282270208,54.96274363872516],[9.282048780971136,54.83086538351631],[9.921906365609232,54.983104153048025]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":4,"sovereignt":"Denmark","sov_a3":"DN1","adm0_dif":1,"level":2,"type":"Country","admin":"Denmark","adm0_a3":"DNK","geou_dif":0,"geounit":"Denmark","gu_a3":"DNK","su_dif":0,"subunit":"Denmark","su_a3":"DNK","brk_diff":0,"name":"Denmark","name_long":"Denmark","brk_a3":"DNK","brk_name":"Denmark","brk_group":null,"abbrev":"Den.","postal":"DK","formal_en":"Kingdom of Denmark","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Denmark","name_alt":null,"mapcolor7":4,"mapcolor8":1,"mapcolor9":3,"mapcolor13":12,"pop_est":5500510,"gdp_md_est":203600,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"DK","iso_a3":"DNK","iso_n3":"208","un_a3":"208","wb_a2":"DK","wb_a3":"DNK","woe_id":-99,"adm0_a3_is":"DNK","adm0_a3_us":"DNK","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"DNK.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[12.69000613775563,55.609990953180784],[12.089991082414741,54.80001455343793],[11.043543328504228,55.364863796604254],[10.903913608451631,55.77995473898875],[12.370904168353292,56.111407375708836],[12.69000613775563,55.609990953180784]]],[[[10.912181837618363,56.458621324277914],[10.667803989309988,56.08138336854722],[10.369992710011985,56.19000722922473],[9.649984978889307,55.469999498102055],[9.921906365609175,54.98310415304806],[9.282048780971136,54.83086538351616],[8.526229282270236,54.96274363872499],[8.120310906617588,55.517722683323626],[8.08997684086225,56.540011705137594],[8.256581658571264,56.8099693874303],[8.543437534223386,57.110002753316905],[9.42446902836761,57.17206614849948],[9.775558709358563,57.447940782289656],[10.580005730846153,57.73001658795485],[10.546105991262692,57.215732733786155],[10.250000034230226,56.89001618105047],[10.369992710011985,56.609981594460834],[10.912181837618363,56.458621324277914]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Spain","sov_a3":"ESP","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Spain","adm0_a3":"ESP","geou_dif":0,"geounit":"Spain","gu_a3":"ESP","su_dif":0,"subunit":"Spain","su_a3":"ESP","brk_diff":0,"name":"Spain","name_long":"Spain","brk_a3":"ESP","brk_name":"Spain","brk_group":null,"abbrev":"Sp.","postal":"E","formal_en":"Kingdom of Spain","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Spain","name_alt":null,"mapcolor7":4,"mapcolor8":5,"mapcolor9":5,"mapcolor13":5,"pop_est":40525002,"gdp_md_est":1403000,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"ES","iso_a3":"ESP","iso_n3":"724","un_a3":"724","wb_a2":"ES","wb_a3":"ESP","woe_id":-99,"adm0_a3_is":"ESP","adm0_a3_us":"ESP","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":5,"long_len":5,"abbrev_len":3,"tiny":-99,"homepart":1,"filename":"ESP.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-9.034817674180246,41.88057058365967],[-8.984433152695672,42.59277517350627],[-9.392883673530648,43.0266246608127],[-7.978189663108309,43.748337714200986],[-6.754491746436756,43.567909450853925],[-5.411886359061596,43.574239813809676],[-4.347842779955783,43.40344920508504],[-3.51753170410609,43.4559007838613],[-1.901351284177764,43.42280202897834],[-1.502770961910528,43.03401439063043],[0.338046909190581,42.57954600683954],[0.701590610363894,42.7957343613326],[1.826793247087153,42.34338471126569],[2.985998976258458,42.47301504166986],[3.039484083680549,41.892120266276905],[2.091841668312185,41.22608856868309],[0.810524529635188,41.01473196060934],[0.721331007499401,40.678318386389236],[0.106691521819869,40.12393362076202],[-0.278711310212941,39.30997813573272],[0.111290724293838,38.73851430923303],[-0.467123582349103,38.29236583104115],[-0.683389451490598,37.642353827457825],[-1.438382127274849,37.443063666324214],[-2.146452602538119,36.67414419203728],[-3.415780808923387,36.65889964451118],[-4.368900926114719,36.677839056946155],[-4.995219285492211,36.32470815687964],[-5.377159796561457,35.946850083961465],[-5.866432257500904,36.02981659600606],[-6.236693894872175,36.367677110330334],[-6.520190802425404,36.94291331638732],[-7.453725551778092,37.09778758396607],[-7.537105475281024,37.42890432387623],[-7.166507941099865,37.803894354802225],[-7.029281175148796,38.07576406508977],[-7.374092169616318,38.37305858006492],[-7.098036668313128,39.03007274022378],[-7.498632371439725,39.62957103124181],[-7.066591559263529,39.71189158788277],[-7.026413133156595,40.184524237624245],[-6.864019944679385,40.33087189387483],[-6.851126674822552,41.11108266861753],[-6.389087693700915,41.381815497394655],[-6.668605515967656,41.883386949219584],[-7.251308966490824,41.91834605566505],[-7.422512986673795,41.79207469335983],[-8.013174607769912,41.790886135417125],[-8.263856980817792,42.28046865495034],[-8.67194576662672,42.13468943945496],[-9.034817674180246,41.88057058365967]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Estonia","sov_a3":"EST","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Estonia","adm0_a3":"EST","geou_dif":0,"geounit":"Estonia","gu_a3":"EST","su_dif":0,"subunit":"Estonia","su_a3":"EST","brk_diff":0,"name":"Estonia","name_long":"Estonia","brk_a3":"EST","brk_name":"Estonia","brk_group":null,"abbrev":"Est.","postal":"EST","formal_en":"Republic of Estonia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Estonia","name_alt":null,"mapcolor7":3,"mapcolor8":2,"mapcolor9":1,"mapcolor13":10,"pop_est":1299371,"gdp_md_est":27410,"pop_year":-99,"lastcensus":2000,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"EE","iso_a3":"EST","iso_n3":"233","un_a3":"233","wb_a2":"EE","wb_a3":"EST","woe_id":-99,"adm0_a3_is":"EST","adm0_a3_us":"EST","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"EST.geojson"},"geometry":{"type":"Polygon","coordinates":[[[24.312862583114622,57.79342357037698],[24.42892785004216,58.38341339785328],[24.061198357853186,58.25737457949341],[23.42656009287668,58.612753404364625],[23.339795363058645,59.18724030215338],[24.604214308376182,59.46585378685502],[25.86418908051664,59.61109039981134],[26.949135776484525,59.445803331125774],[27.981114129353244,59.47538808861287],[28.13169925305175,59.30082510033092],[27.42016645682494,58.72458120384424],[27.71668582531572,57.79189911562437],[27.28818484875151,57.47452830670383],[26.463532342237787,57.47638865826633],[25.602809685984365,57.84752879498657],[25.16459354014927,57.97015696881519],[24.312862583114622,57.79342357037698]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Finland","sov_a3":"FI1","adm0_dif":1,"level":2,"type":"Country","admin":"Finland","adm0_a3":"FIN","geou_dif":0,"geounit":"Finland","gu_a3":"FIN","su_dif":0,"subunit":"Finland","su_a3":"FIN","brk_diff":0,"name":"Finland","name_long":"Finland","brk_a3":"FIN","brk_name":"Finland","brk_group":null,"abbrev":"Fin.","postal":"FIN","formal_en":"Republic of Finland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Finland","name_alt":null,"mapcolor7":4,"mapcolor8":1,"mapcolor9":4,"mapcolor13":6,"pop_est":5250275,"gdp_md_est":193500,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"FI","iso_a3":"FIN","iso_n3":"246","un_a3":"246","wb_a2":"FI","wb_a3":"FIN","woe_id":-99,"adm0_a3_is":"FIN","adm0_a3_us":"FIN","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"FIN.geojson"},"geometry":{"type":"Polygon","coordinates":[[[28.591929559043194,69.06477692328666],[28.445943637818658,68.36461294216404],[29.977426385220607,67.69829702419266],[29.054588657352326,66.94428620062193],[30.21765,65.80598],[29.544429559046986,64.94867157659048],[30.44468468600371,64.20445343693909],[30.035872430142714,63.55281362573855],[31.51609215671112,62.86768748641288],[31.139991082490894,62.35769277612441],[30.211107212044446,61.78002777774969],[28.069997592895277,60.503516547275844],[26.25517296723697,60.4239606797625],[24.496623976344523,60.05731639265165],[22.869694858499457,59.846373196036225],[22.290763787533592,60.39192129174154],[21.322244093519316,60.72016998965952],[21.544866163832694,61.7053294948718],[21.05921105315369,62.60739329695874],[21.536029493910803,63.18973501245587],[22.442744174903993,63.81781037053129],[24.730511508897536,64.90234365504082],[25.398067661243942,65.11142650009373],[25.294043003040404,65.53434642197045],[23.903378533633802,66.00692739527962],[23.565879754335583,66.39605093043743],[23.53947309743444,67.93600861273525],[21.978534783626117,68.6168456081807],[20.645592889089528,69.10624726020087],[21.244936150810673,69.37044302029307],[22.356237827247412,68.84174144151491],[23.66204959483076,68.89124746365054],[24.735679152126725,68.64955678982146],[25.68921268077636,69.09211375596904],[26.17962202322624,69.82529897732614],[27.732292107867863,70.16419302029625],[29.01557295097197,69.76649119737799],[28.591929559043194,69.06477692328666]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"France","sov_a3":"FR1","adm0_dif":1,"level":2,"type":"Country","admin":"France","adm0_a3":"FRA","geou_dif":0,"geounit":"France","gu_a3":"FRA","su_dif":0,"subunit":"France","su_a3":"FRA","brk_diff":0,"name":"France","name_long":"France","brk_a3":"FRA","brk_name":"France","brk_group":null,"abbrev":"Fr.","postal":"F","formal_en":"French Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"France","name_alt":null,"mapcolor7":7,"mapcolor8":5,"mapcolor9":9,"mapcolor13":11,"pop_est":64057792,"gdp_md_est":2128000,"pop_year":-99,"lastcensus":-99,"gdp_year":-99,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"FR","iso_a3":"FRA","iso_n3":"250","un_a3":"250","wb_a2":"FR","wb_a3":"FRA","woe_id":-99,"adm0_a3_is":"FRA","adm0_a3_us":"FRA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":3,"tiny":-99,"homepart":1,"filename":"FRA.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-52.55642473001839,2.504705308437053],[-52.93965715189498,2.124857692875622],[-53.418465135295264,2.053389187016037],[-53.554839240113495,2.334896551925965],[-53.77852067728889,2.376702785650053],[-54.08806250671728,2.105556545414629],[-54.52475419779975,2.311848863123785],[-54.27122962097578,2.738747870286943],[-54.18428402364474,3.194172268075235],[-54.01150387227682,3.622569891774858],[-54.399542202356514,4.212611395683481],[-54.47863298197922,4.896755682795643],[-53.95804460307093,5.756548163267809],[-53.618452928264844,5.646529038918402],[-52.88214128275408,5.409850979021599],[-51.82334286152593,4.565768133966145],[-51.65779741067888,4.156232408053029],[-52.24933753112398,3.241094468596287],[-52.55642473001839,2.504705308437053]]],[[[9.560016310269134,42.15249197037957],[9.229752231491773,41.38000682226445],[8.77572309737536,41.58361196549444],[8.54421268070783,42.25651662858308],[8.746009148807588,42.62812185319396],[9.390000848028905,43.00998484961474],[9.560016310269134,42.15249197037957]]],[[[3.588184441755715,50.37899241800358],[4.28602298342514,49.907496649772554],[4.799221632515753,49.98537303323633],[5.674051954784885,49.52948354755745],[5.897759230176376,49.44266714130717],[6.186320428094206,49.46380280211446],[6.658229607783539,49.20195831969155],[8.099278598674772,49.01778351500337],[7.593676385131062,48.33301911070373],[7.46675906742223,47.620581976911865],[7.192202182655535,47.44976552997099],[6.736571079138088,47.54180125588289],[6.768713820023634,47.28770823830368],[6.037388950228972,46.72577871356191],[6.022609490593567,46.272989813820516],[6.500099724970454,46.42967275652944],[6.843592970414562,45.99114655210067],[6.802355177445662,45.70857982032867],[7.096652459347837,45.333098863295874],[6.749955275101711,45.02851797136759],[7.007562290076663,44.25476675066139],[7.549596388386163,44.12790110938482],[7.435184767291843,43.69384491634918],[6.529245232783068,43.12889232031836],[4.556962517931396,43.39965098731158],[3.10041059735272,43.075200507167125],[2.985998976258486,42.47301504166989],[1.826793247087181,42.34338471126566],[0.701590610363922,42.79573436133265],[0.338046909190581,42.579546006839564],[-1.502770961910471,43.03401439063049],[-1.901351284177735,43.42280202897834],[-1.384225226232957,44.02261037859017],[-1.193797573237362,46.014917710954876],[-2.225724249673789,47.06436269793821],[-2.963276129559574,47.570326646507965],[-4.491554938159481,47.95495433205642],[-4.592349819344747,48.68416046812695],[-3.295813971357745,48.901692409859635],[-1.616510789384932,48.644421291694584],[-1.933494025063254,49.776341864615766],[-0.98946895995536,49.347375800160876],[1.338761020522753,50.12717316344526],[1.6390010921385,50.946606350297515],[2.513573032246171,51.14850617126185],[2.658422071960331,50.79684804951566],[3.123251580425716,50.78036326761452],[3.588184441755715,50.37899241800358]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"United Kingdom","sov_a3":"GB1","adm0_dif":1,"level":2,"type":"Country","admin":"United Kingdom","adm0_a3":"GBR","geou_dif":0,"geounit":"United Kingdom","gu_a3":"GBR","su_dif":0,"subunit":"United Kingdom","su_a3":"GBR","brk_diff":0,"name":"United Kingdom","name_long":"United Kingdom","brk_a3":"GBR","brk_name":"United Kingdom","brk_group":null,"abbrev":"U.K.","postal":"GB","formal_en":"United Kingdom of Great Britain and Northern Ireland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"United Kingdom","name_alt":null,"mapcolor7":6,"mapcolor8":6,"mapcolor9":6,"mapcolor13":3,"pop_est":62262000,"gdp_md_est":1977704,"pop_year":0,"lastcensus":2011,"gdp_year":2009,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"GB","iso_a3":"GBR","iso_n3":"826","un_a3":"826","wb_a2":"GB","wb_a3":"GBR","woe_id":-99,"adm0_a3_is":"GBR","adm0_a3_us":"GBR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":14,"long_len":14,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"GBR.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-5.661948614921897,54.55460317648385],[-6.197884894220977,53.86756500916334],[-6.953730231137996,54.073702297575636],[-7.572167934591079,54.05995636658599],[-7.366030646178785,54.595840969452695],[-7.572167934591079,55.1316222194549],[-6.733847011736145,55.1728600124238],[-5.661948614921897,54.55460317648385]]],[[[-3.005004848635281,58.63500010846633],[-4.073828497728016,57.55302480735525],[-3.055001796877661,57.69001902936095],[-1.959280564776918,57.68479970969951],[-2.219988165689301,56.87001740175353],[-3.119003058271118,55.973793036515474],[-2.085009324543023,55.90999848085127],[-2.005675679673857,55.80490285035023],[-1.11499101399221,54.62498647726539],[-0.4304849918542,54.46437612570216],[0.184981316742039,53.32501414653103],[0.469976840831777,52.92999949809197],[1.681530795914739,52.739520168664],[1.559987827164377,52.09999848083601],[1.050561557630914,51.806760565795685],[1.449865349950301,51.28942780212196],[0.550333693045502,50.765738837275876],[-0.78751746255864,50.77498891865622],[-2.489997524414377,50.50001862243124],[-2.956273972984036,50.696879991247016],[-3.617448085942328,50.22835561787272],[-4.542507900399244,50.34183706318566],[-5.245023159191135,49.95999990498108],[-5.776566941745301,50.15967763935682],[-4.309989793301838,51.21000112568916],[-3.414850633142123,51.42600861266925],[-3.422719467108323,51.42684816740609],[-4.984367234710874,51.593466091510976],[-5.267295701508885,51.99140045837458],[-4.222346564134853,52.301355699261364],[-4.770013393564113,52.840004991255626],[-4.579999152026915,53.49500377055517],[-3.093830673788659,53.404547400669685],[-3.092079637047106,53.404440822963544],[-2.945008510744344,53.984999701546684],[-3.614700825433034,54.600936773292574],[-3.63000545898933,54.615012925833014],[-4.844169073903004,54.790971177786844],[-5.082526617849226,55.06160065369937],[-4.719112107756644,55.50847260194348],[-5.047980922862109,55.78398550070752],[-5.586397670911139,55.31114614523682],[-5.644998745130181,56.275014960344805],[-6.149980841486354,56.78500967063354],[-5.786824713555291,57.81884837506465],[-5.009998745127575,58.63001333275005],[-4.211494513353557,58.55084503847917],[-3.005004848635281,58.63500010846633]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Greece","sov_a3":"GRC","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Greece","adm0_a3":"GRC","geou_dif":0,"geounit":"Greece","gu_a3":"GRC","su_dif":0,"subunit":"Greece","su_a3":"GRC","brk_diff":0,"name":"Greece","name_long":"Greece","brk_a3":"GRC","brk_name":"Greece","brk_group":null,"abbrev":"Greece","postal":"GR","formal_en":"Hellenic Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Greece","name_alt":null,"mapcolor7":2,"mapcolor8":2,"mapcolor9":2,"mapcolor13":9,"pop_est":10737428,"gdp_md_est":343000,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"GR","iso_a3":"GRC","iso_n3":"300","un_a3":"300","wb_a2":"GR","wb_a3":"GRC","woe_id":-99,"adm0_a3_is":"GRC","adm0_a3_us":"GRC","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":6,"tiny":-99,"homepart":1,"filename":"GRC.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[23.699980096133004,35.70500438083553],[24.24666507334868,35.368022365860156],[25.02501549652888,35.42499563246198],[25.769207797964185,35.35401805270908],[25.745023227651586,35.179997666966216],[26.290002882601723,35.29999034274792],[26.16499759288766,35.004995429009796],[24.724982130642303,34.91998769788961],[24.735007358506945,35.08499054619759],[23.51497846852811,35.27999156345098],[23.699980096133004,35.70500438083553]]],[[[26.604195590936282,41.562114569661105],[26.29460208507578,40.93626129817426],[26.056942172965506,40.824123440100834],[25.447677036244187,40.85254547786147],[24.92584842296094,40.94706167252323],[23.714811232200816,40.687129218095116],[24.407998894964066,40.1249929876241],[23.899967889102584,39.96200552017558],[23.3429993018608,39.96099782974579],[22.81398766448896,40.476005153966554],[22.62629886240478,40.25656118423919],[22.849747755634805,39.65931081802577],[23.3500272966526,39.19001129816726],[22.973099399515547,38.97090322524966],[23.530016310324953,38.51000112563847],[24.025024855248944,38.21999298761645],[24.040011020613605,37.655014553369426],[23.115002882589152,37.92001129816222],[23.409971958111072,37.409990749657396],[22.774971958108633,37.30501007745656],[23.15422529469862,36.422505804992056],[22.490028110451107,36.41000010837746],[21.670026482843696,36.8449864771942],[21.295010613701574,37.644989325504696],[21.120034213961333,38.31032339126273],[20.730032179454582,38.769985256498785],[20.217712029712857,39.340234686839636],[20.15001590341052,39.62499766698403],[20.615000441172782,40.11000682225943],[20.674996779063633,40.434999904943055],[20.99998986174728,40.58000397395397],[21.02004031747643,40.84272695572588],[21.674160597426976,40.93127452245798],[22.05537763844427,41.14986583105269],[22.597308383889015,41.130487168943205],[22.76177,41.3048],[22.952377150166566,41.33799388281122],[23.692073601992462,41.30908091894386],[24.49264489105803,41.58389618587205],[25.197201368925533,41.23448598893066],[26.106138136507184,41.32889883072784],[26.117041863720914,41.82690460872473],[26.604195590936282,41.562114569661105]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Croatia","sov_a3":"HRV","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Croatia","adm0_a3":"HRV","geou_dif":0,"geounit":"Croatia","gu_a3":"HRV","su_dif":0,"subunit":"Croatia","su_a3":"HRV","brk_diff":0,"name":"Croatia","name_long":"Croatia","brk_a3":"HRV","brk_name":"Croatia","brk_group":null,"abbrev":"Cro.","postal":"HR","formal_en":"Republic of Croatia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Croatia","name_alt":null,"mapcolor7":5,"mapcolor8":4,"mapcolor9":5,"mapcolor13":1,"pop_est":4489409,"gdp_md_est":82390,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"2. High income: nonOECD","wikipedia":-99,"fips_10":null,"iso_a2":"HR","iso_a3":"HRV","iso_n3":"191","un_a3":"191","wb_a2":"HR","wb_a3":"HRV","woe_id":-99,"adm0_a3_is":"HRV","adm0_a3_us":"HRV","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"HRV.geojson"},"geometry":{"type":"Polygon","coordinates":[[[18.829838087650046,45.908877671891844],[19.072768995854176,45.52151113543209],[19.39047570158459,45.236515611342384],[19.00548628101012,44.86023366960916],[18.553214145591653,45.08158966733145],[17.861783481526402,45.067740383477144],[17.002146030351014,45.233776760430935],[16.534939406000206,45.21160757097772],[16.318156772535872,45.00412669532591],[15.959367303133376,45.233776760430935],[15.750026075918981,44.81871165626256],[16.23966027188453,44.35114329688571],[16.456442905348865,44.04123973243128],[16.91615644701733,43.66772247982567],[17.297373488034452,43.44634064388736],[17.674921502358984,43.02856252702361],[18.56,42.65],[18.450016310304818,42.47999136002932],[17.509970330483327,42.849994615239154],[16.930005730871642,43.20999848080038],[16.015384555737683,43.50721548112722],[15.174453973052096,44.243191229827914],[15.376250441151795,44.31791535092208],[14.920309279040508,44.73848399512946],[14.901602410550877,45.07606028907611],[14.258747592839995,45.233776760430935],[13.952254672917034,44.80212352149687],[13.656975538801191,45.13693512631596],[13.67940311041582,45.48414907488501],[13.715059848697251,45.500323798192426],[14.4119682145855,45.46616567644742],[14.595109490627918,45.63494090431282],[14.935243767972963,45.471695054702764],[15.327674594797427,45.452316392593325],[15.323953891672431,45.731782538427694],[15.671529575267641,45.8341535507979],[15.768732944408612,46.23810822202353],[16.564808383864943,46.50375092221981],[16.882515089595415,46.38063182228444],[17.630066359129557,45.9517691106941],[18.45606245288286,45.75948110613615],[18.829838087650046,45.908877671891844]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Hungary","sov_a3":"HUN","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Hungary","adm0_a3":"HUN","geou_dif":0,"geounit":"Hungary","gu_a3":"HUN","su_dif":0,"subunit":"Hungary","su_a3":"HUN","brk_diff":0,"name":"Hungary","name_long":"Hungary","brk_a3":"HUN","brk_name":"Hungary","brk_group":null,"abbrev":"Hun.","postal":"HU","formal_en":"Republic of Hungary","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Hungary","name_alt":null,"mapcolor7":4,"mapcolor8":6,"mapcolor9":1,"mapcolor13":5,"pop_est":9905596,"gdp_md_est":196600,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"HU","iso_a3":"HUN","iso_n3":"348","un_a3":"348","wb_a2":"HU","wb_a3":"HUN","woe_id":-99,"adm0_a3_is":"HUN","adm0_a3_us":"HUN","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"HUN.geojson"},"geometry":{"type":"Polygon","coordinates":[[[16.202298211337364,46.85238597267696],[16.534267612380376,47.49617096616912],[16.340584344150415,47.71290192320123],[16.90375410326726,47.71486562762833],[16.979666782304037,48.123497015976305],[17.48847293464982,47.86746613218621],[17.857132602620027,47.758428860050365],[18.696512892336926,47.880953681014404],[18.77702477384767,48.081768296900634],[19.17436486173989,48.11137889260387],[19.661363559658497,48.26661489520866],[19.769470656013112,48.202691148463614],[20.239054396249347,48.32756724709692],[20.473562045989866,48.56285004332181],[20.801293979584926,48.623854071642384],[21.872236362401736,48.31997081155002],[22.08560835133485,48.42226430927179],[22.640819939878753,48.15023956968735],[22.710531447040495,47.88219391538941],[22.099767693782834,47.6724392767167],[21.62651492685387,46.99423777931816],[21.02195234547125,46.3160879583519],[20.220192498462836,46.127468980486555],[19.596044549241583,46.17172984474454],[18.82983808764996,45.90887767189193],[18.45606245288286,45.759481106136136],[17.630066359129557,45.95176911069419],[16.8825150895953,46.38063182228444],[16.564808383864857,46.50375092221983],[16.370504998447416,46.8413272161665],[16.202298211337364,46.85238597267696]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Iceland","sov_a3":"ISL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Iceland","adm0_a3":"ISL","geou_dif":0,"geounit":"Iceland","gu_a3":"ISL","su_dif":0,"subunit":"Iceland","su_a3":"ISL","brk_diff":0,"name":"Iceland","name_long":"Iceland","brk_a3":"ISL","brk_name":"Iceland","brk_group":null,"abbrev":"Iceland","postal":"IS","formal_en":"Republic of Iceland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Iceland","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":4,"mapcolor13":9,"pop_est":306694,"gdp_md_est":12710,"pop_year":-99,"lastcensus":-99,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"IS","iso_a3":"ISL","iso_n3":"352","un_a3":"352","wb_a2":"IS","wb_a3":"ISL","woe_id":-99,"adm0_a3_is":"ISL","adm0_a3_us":"ISL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":7,"tiny":-99,"homepart":1,"filename":"ISL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-14.508695441129236,66.45589223903141],[-14.739637417041605,65.8087482774403],[-13.60973222497981,65.12667104761987],[-14.909833746794902,64.36408193628868],[-17.794438035543422,63.67874909123385],[-18.656245896874992,63.49638296167582],[-19.97275468594276,63.64363495549153],[-22.762971971110158,63.960178941495386],[-21.778484259517683,64.40211579045551],[-23.95504391121911,64.89112986923348],[-22.184402635170358,65.0849681667603],[-22.227423265053332,65.37859365504272],[-24.326184047939336,65.61118927678847],[-23.65051469572309,66.26251902939522],[-22.134922451250883,66.41046865504687],[-20.57628373867955,65.73211212835143],[-19.05684160000159,66.27660085719477],[-17.79862382655905,65.99385325790978],[-16.167818976292125,66.52679230413587],[-14.508695441129236,66.45589223903141]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Italy","sov_a3":"ITA","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Italy","adm0_a3":"ITA","geou_dif":0,"geounit":"Italy","gu_a3":"ITA","su_dif":0,"subunit":"Italy","su_a3":"ITA","brk_diff":0,"name":"Italy","name_long":"Italy","brk_a3":"ITA","brk_name":"Italy","brk_group":null,"abbrev":"Italy","postal":"I","formal_en":"Italian Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Italy","name_alt":null,"mapcolor7":6,"mapcolor8":7,"mapcolor9":8,"mapcolor13":7,"pop_est":58126212,"gdp_md_est":1823000,"pop_year":-99,"lastcensus":2012,"gdp_year":-99,"economy":"1. Developed region: G7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"IT","iso_a3":"ITA","iso_n3":"380","un_a3":"380","wb_a2":"IT","wb_a3":"ITA","woe_id":-99,"adm0_a3_is":"ITA","adm0_a3_us":"ITA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":5,"long_len":5,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"ITA.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[15.520376010813834,38.23115509699147],[15.160242954171736,37.44404551853782],[15.309897902089006,37.1342194687318],[15.099988234119449,36.6199872909954],[14.335228712632016,36.996630967754754],[13.826732618879928,37.10453135838019],[12.431003859108813,37.61294993748381],[12.570943637755136,38.12638113051968],[13.741156447004585,38.03496552179536],[14.76124922044616,38.143873602850505],[15.520376010813834,38.23115509699147]]],[[[9.210011834356266,41.20999136002422],[9.809975213264977,40.5000088567661],[9.669518670295673,39.177376410471794],[9.21481774255949,39.240473334300134],[8.80693566247973,38.90661774347847],[8.428302443077115,39.17184703221662],[8.38825320805094,40.378310858718805],[8.15999840661766,40.95000722916379],[8.709990675500109,40.89998444270523],[9.210011834356266,41.20999136002422]]],[[[12.376485223040843,46.76755910906987],[13.806475457421556,46.50930613869119],[13.698109978905478,46.016778062517375],[13.937630242578335,45.591015936864665],[13.141606479554298,45.73669179949541],[12.328581170306306,45.38177806251485],[12.383874952858605,44.88537425391908],[12.261453484759159,44.600482082694015],[12.589237094786483,44.091365871754476],[13.526905958722494,43.5877273626379],[14.029820997787027,42.76100779883248],[15.142569614327956,41.955139675456905],[15.926191033601896,41.96131500911574],[16.169897088290412,41.74029490820342],[15.889345737377797,41.5410822617182],[16.785001661860576,41.179605617836586],[17.519168735431208,40.87714345963224],[18.376687452882575,40.35562490494266],[18.4802470231954,40.168866278639825],[18.293385044028096,39.81077444107325],[17.738380161213286,40.2776710068303],[16.869595981522338,40.44223460546385],[16.448743116937322,39.79540070246648],[17.1714896989715,39.42469981542072],[17.05284061042934,38.9028712021373],[16.635088331781844,38.8435724960824],[16.100960727613057,37.98589874933418],[15.684086948314501,37.90884918878703],[15.687962680736321,38.214592800441864],[15.891981235424707,38.750942491199226],[16.109332309644312,38.96454702407769],[15.718813510814641,39.544072374014945],[15.413612501698822,40.04835683853517],[14.998495721098237,40.17294871679093],[14.70326826341477,40.604550279292624],[14.060671827865264,40.78634796809544],[13.627985060285397,41.188287258461656],[12.88808190273042,41.25308950455562],[12.10668257004491,41.70453481705741],[11.191906365614187,42.35542531998967],[10.511947869517797,42.931462510747224],[10.200028924204048,43.920006822274615],[9.702488234097814,44.03627879493132],[8.88894616052687,44.36633616797954],[8.428560825238577,44.23122813575242],[7.850766635783201,43.76714793555524],[7.435184767291843,43.69384491634918],[7.549596388386163,44.12790110938482],[7.007562290076663,44.25476675066139],[6.749955275101711,45.02851797136759],[7.096652459347837,45.333098863295874],[6.802355177445662,45.70857982032867],[6.843592970414562,45.99114655210067],[7.273850945676685,45.77694774025076],[7.755992058959833,45.82449005795928],[8.31662967289438,46.163642483090854],[8.489952426801295,46.00515086525175],[8.966305779667834,46.036931871111165],[9.182881707403112,46.44021474871698],[9.922836541390353,46.31489940040919],[10.363378126678668,46.483571275409844],[10.442701450246602,46.893546250997446],[11.048555942436508,46.7513585475464],[11.164827915093326,46.94157949481274],[12.153088006243081,47.11539317482644],[12.376485223040843,46.76755910906987]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Kosovo","sov_a3":"KOS","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Kosovo","adm0_a3":"KOS","geou_dif":0,"geounit":"Kosovo","gu_a3":"KOS","su_dif":0,"subunit":"Kosovo","su_a3":"KOS","brk_diff":1,"name":"Kosovo","name_long":"Kosovo","brk_a3":"B57","brk_name":"Kosovo","brk_group":null,"abbrev":"Kos.","postal":"KO","formal_en":"Republic of Kosovo","formal_fr":null,"note_adm0":null,"note_brk":"Self admin.; Claimed by Serbia","name_sort":"Kosovo","name_alt":null,"mapcolor7":2,"mapcolor8":2,"mapcolor9":3,"mapcolor13":11,"pop_est":1804838,"gdp_md_est":5352,"pop_year":-99,"lastcensus":1981,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"-99","iso_a3":"-99","iso_n3":"-99","un_a3":"-099","wb_a2":"KV","wb_a3":"KSV","woe_id":-99,"adm0_a3_is":"SRB","adm0_a3_us":"KOS","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"KOS.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.76216,42.05186],[20.71731000000011,41.84711],[20.59023,41.85541],[20.52295,42.21787],[20.28374,42.3202500000001],[20.0707,42.58863],[20.25758,42.81275000000011],[20.49679,42.88469],[20.63508,43.21671],[20.81448,43.27205],[20.95651,43.13094],[21.143395,43.06868500000012],[21.27421,42.90959],[21.43866,42.86255],[21.63302,42.67717],[21.77505,42.6827],[21.66292,42.43922],[21.54332,42.3202500000001],[21.57663598940212,42.24522439706186],[21.35270000000014,42.2068],[20.76216,42.05186]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Lithuania","sov_a3":"LTU","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Lithuania","adm0_a3":"LTU","geou_dif":0,"geounit":"Lithuania","gu_a3":"LTU","su_dif":0,"subunit":"Lithuania","su_a3":"LTU","brk_diff":0,"name":"Lithuania","name_long":"Lithuania","brk_a3":"LTU","brk_name":"Lithuania","brk_group":null,"abbrev":"Lith.","postal":"LT","formal_en":"Republic of Lithuania","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Lithuania","name_alt":null,"mapcolor7":6,"mapcolor8":3,"mapcolor9":3,"mapcolor13":9,"pop_est":3555179,"gdp_md_est":63330,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"LT","iso_a3":"LTU","iso_n3":"440","un_a3":"440","wb_a2":"LT","wb_a3":"LTU","woe_id":-99,"adm0_a3_is":"LTU","adm0_a3_us":"LTU","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":9,"long_len":9,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"LTU.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.731098667092652,54.327536932993326],[22.65105187347254,54.582740993866736],[22.75776370615526,54.85657440858138],[22.315723504330577,55.015298570365864],[21.268448927503467,55.190481675835315],[21.055800408622414,56.03107636171106],[22.201156853939494,56.33780182557948],[23.878263787539964,56.273671373105266],[24.860684441840757,56.37252838807963],[25.000934279080894,56.16453074810484],[25.533046502390334,56.10029694276603],[26.494331495883753,55.615106919977634],[26.58827924979039,55.16717560487167],[25.7684326514798,54.84696259217509],[25.536353794056993,54.28242340760253],[24.450683628037037,53.905702216194754],[23.48412763844985,53.91249766704114],[23.24398725758951,54.22056671814914],[22.731098667092652,54.327536932993326]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Moldova","sov_a3":"MDA","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Moldova","adm0_a3":"MDA","geou_dif":0,"geounit":"Moldova","gu_a3":"MDA","su_dif":0,"subunit":"Moldova","su_a3":"MDA","brk_diff":0,"name":"Moldova","name_long":"Moldova","brk_a3":"MDA","brk_name":"Moldova","brk_group":null,"abbrev":"Mda.","postal":"MD","formal_en":"Republic of Moldova","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Moldova","name_alt":null,"mapcolor7":3,"mapcolor8":5,"mapcolor9":4,"mapcolor13":12,"pop_est":4320748,"gdp_md_est":10670,"pop_year":-99,"lastcensus":2004,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"MD","iso_a3":"MDA","iso_n3":"498","un_a3":"498","wb_a2":"MD","wb_a3":"MDA","woe_id":-99,"adm0_a3_is":"MDA","adm0_a3_us":"MDA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"MDA.geojson"},"geometry":{"type":"Polygon","coordinates":[[[26.619336785597795,48.22072622333347],[26.857823520624805,48.368210761094495],[27.522537469195154,48.467119452501116],[28.259546746541844,48.15556224221342],[28.670891147585163,48.1181485052341],[29.12269819511303,47.84909516050646],[29.05086795422733,47.51022695575249],[29.41513512545274,47.34664520933257],[29.559674106573112,46.928582872091326],[29.908851759569302,46.67436066343146],[29.838210076626297,46.52532583270169],[30.02465864433537,46.42393667254503],[29.75997195813639,46.34998769793536],[29.170653924279886,46.3792623968287],[29.072106967899295,46.517677720722496],[28.862972446414062,46.43788930926383],[28.93371748222162,46.2588304713725],[28.659987420371575,45.93998688413164],[28.485269402792767,45.5969070501459],[28.233553501099042,45.48828318946837],[28.0544429867754,45.944586086605625],[28.160017937947714,46.37156260841722],[28.128030226359044,46.810476386088254],[27.551166212684848,47.40511709247083],[27.233872918412743,47.82677094175638],[26.924176059687568,48.123264472030996],[26.619336785597795,48.22072622333347]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Ireland","sov_a3":"IRL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Ireland","adm0_a3":"IRL","geou_dif":0,"geounit":"Ireland","gu_a3":"IRL","su_dif":0,"subunit":"Ireland","su_a3":"IRL","brk_diff":0,"name":"Ireland","name_long":"Ireland","brk_a3":"IRL","brk_name":"Ireland","brk_group":null,"abbrev":"Ire.","postal":"IRL","formal_en":"Ireland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Ireland","name_alt":null,"mapcolor7":2,"mapcolor8":3,"mapcolor9":2,"mapcolor13":2,"pop_est":4203200,"gdp_md_est":188400,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"IE","iso_a3":"IRL","iso_n3":"372","un_a3":"372","wb_a2":"IE","wb_a3":"IRL","woe_id":-99,"adm0_a3_is":"IRL","adm0_a3_us":"IRL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"IRL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-6.197884894220991,53.86756500916336],[-6.03298539877761,53.15316417094435],[-6.788856573910849,52.260117906292336],[-8.56161658368356,51.669301255899356],[-9.977085740590269,51.82045482035307],[-9.16628251793078,52.86462881124268],[-9.688524542672454,53.8813626165853],[-8.327987433292009,54.66451894796863],[-7.572167934591064,55.13162221945487],[-7.366030646178785,54.59584096945272],[-7.572167934591064,54.059956366586],[-6.953730231138067,54.073702297575636],[-6.197884894220991,53.86756500916336]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Luxembourg","sov_a3":"LUX","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Luxembourg","adm0_a3":"LUX","geou_dif":0,"geounit":"Luxembourg","gu_a3":"LUX","su_dif":0,"subunit":"Luxembourg","su_a3":"LUX","brk_diff":0,"name":"Luxembourg","name_long":"Luxembourg","brk_a3":"LUX","brk_name":"Luxembourg","brk_group":null,"abbrev":"Lux.","postal":"L","formal_en":"Grand Duchy of Luxembourg","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Luxembourg","name_alt":null,"mapcolor7":1,"mapcolor8":7,"mapcolor9":3,"mapcolor13":7,"pop_est":491775,"gdp_md_est":39370,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"LU","iso_a3":"LUX","iso_n3":"442","un_a3":"442","wb_a2":"LU","wb_a3":"LUX","woe_id":-99,"adm0_a3_is":"LUX","adm0_a3_us":"LUX","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":10,"long_len":10,"abbrev_len":4,"tiny":5,"homepart":1,"filename":"LUX.geojson"},"geometry":{"type":"Polygon","coordinates":[[[6.043073357781111,50.128051662794235],[6.242751092156993,49.90222565367873],[6.186320428094177,49.463802802114515],[5.897759230176405,49.44266714130703],[5.674051954784829,49.529483547557504],[5.782417433300906,50.09032786722122],[6.043073357781111,50.128051662794235]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Latvia","sov_a3":"LVA","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Latvia","adm0_a3":"LVA","geou_dif":0,"geounit":"Latvia","gu_a3":"LVA","su_dif":0,"subunit":"Latvia","su_a3":"LVA","brk_diff":0,"name":"Latvia","name_long":"Latvia","brk_a3":"LVA","brk_name":"Latvia","brk_group":null,"abbrev":"Lat.","postal":"LV","formal_en":"Republic of Latvia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Latvia","name_alt":null,"mapcolor7":4,"mapcolor8":7,"mapcolor9":6,"mapcolor13":13,"pop_est":2231503,"gdp_md_est":38860,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"LV","iso_a3":"LVA","iso_n3":"428","un_a3":"428","wb_a2":"LV","wb_a3":"LVA","woe_id":-99,"adm0_a3_is":"LVA","adm0_a3_us":"LVA","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"LVA.geojson"},"geometry":{"type":"Polygon","coordinates":[[[21.055800408622414,56.03107636171106],[21.09042361825797,56.78387278912293],[21.581866489353672,57.41187063254993],[22.524341261492875,57.75337433535076],[23.318452996522097,57.00623647727487],[24.12072960785343,57.02569265403277],[24.312862583114622,57.79342357037698],[25.16459354014927,57.97015696881519],[25.602809685984365,57.84752879498657],[26.463532342237787,57.47638865826633],[27.28818484875151,57.47452830670383],[27.77001590344093,57.24425812441123],[27.855282016722526,56.75932648378429],[28.176709425577993,56.16912995057881],[27.10245975109453,55.783313707087686],[26.494331495883753,55.615106919977634],[25.533046502390334,56.10029694276603],[25.000934279080894,56.16453074810484],[24.860684441840757,56.37252838807963],[23.878263787539964,56.273671373105266],[22.201156853939494,56.33780182557948],[21.055800408622414,56.03107636171106]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Netherlands","sov_a3":"NL1","adm0_dif":1,"level":2,"type":"Country","admin":"Netherlands","adm0_a3":"NLD","geou_dif":0,"geounit":"Netherlands","gu_a3":"NLD","su_dif":0,"subunit":"Netherlands","su_a3":"NLD","brk_diff":0,"name":"Netherlands","name_long":"Netherlands","brk_a3":"NLD","brk_name":"Netherlands","brk_group":null,"abbrev":"Neth.","postal":"NL","formal_en":"Kingdom of the Netherlands","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Netherlands","name_alt":null,"mapcolor7":4,"mapcolor8":2,"mapcolor9":2,"mapcolor13":9,"pop_est":16715999,"gdp_md_est":672000,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"NL","iso_a3":"NLD","iso_n3":"528","un_a3":"528","wb_a2":"NL","wb_a3":"NLD","woe_id":-99,"adm0_a3_is":"NLD","adm0_a3_us":"NLD","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Western Europe","region_wb":"Europe & Central Asia","name_len":11,"long_len":11,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"NLD.geojson"},"geometry":{"type":"Polygon","coordinates":[[[6.074182570020923,53.510403347378144],[6.905139601274129,53.48216217713064],[7.092053256873896,53.14404328064489],[6.842869500362383,52.22844025329755],[6.589396599970826,51.852029120483394],[5.988658074577813,51.851615709025054],[6.156658155958779,50.80372101501058],[5.606975945670001,51.037298488969775],[4.973991326526914,51.475023708698124],[4.047071160507527,51.26725861266857],[3.314971144228537,51.34575511331991],[3.830288527043137,51.62054454203195],[4.705997348661185,53.09179840759776],[6.074182570020923,53.510403347378144]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Macedonia","sov_a3":"MKD","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Macedonia","adm0_a3":"MKD","geou_dif":0,"geounit":"Macedonia","gu_a3":"MKD","su_dif":0,"subunit":"Macedonia","su_a3":"MKD","brk_diff":0,"name":"Macedonia","name_long":"Macedonia","brk_a3":"MKD","brk_name":"Macedonia","brk_group":null,"abbrev":"Mkd.","postal":"MK","formal_en":"Former Yugoslav Republic of Macedonia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Macedonia, FYR","name_alt":null,"mapcolor7":5,"mapcolor8":3,"mapcolor9":7,"mapcolor13":3,"pop_est":2066718,"gdp_md_est":18780,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"MK","iso_a3":"MKD","iso_n3":"807","un_a3":"807","wb_a2":"MK","wb_a3":"MKD","woe_id":-99,"adm0_a3_is":"MKD","adm0_a3_us":"MKD","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":9,"long_len":9,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"MKD.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.59023,41.85541],[20.71731000000011,41.84711],[20.76216,42.05186],[21.35270000000014,42.2068],[21.57663598940212,42.24522439706186],[21.917080000000112,42.30364],[22.38052575042468,42.32025950781508],[22.881373732197346,41.999297186850356],[22.952377150166512,41.33799388281119],[22.76177,41.3048],[22.597308383889015,41.130487168943205],[22.05537763844427,41.14986583105269],[21.674160597426976,40.93127452245795],[21.0200403174764,40.84272695572588],[20.60518,41.08622],[20.46315,41.5150900000001],[20.59023,41.85541]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Portugal","sov_a3":"PRT","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Portugal","adm0_a3":"PRT","geou_dif":0,"geounit":"Portugal","gu_a3":"PRT","su_dif":1,"subunit":"Portugal","su_a3":"PR1","brk_diff":0,"name":"Portugal","name_long":"Portugal","brk_a3":"PR1","brk_name":"Portugal","brk_group":null,"abbrev":"Port.","postal":"P","formal_en":"Portuguese Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Portugal","name_alt":null,"mapcolor7":1,"mapcolor8":7,"mapcolor9":1,"mapcolor13":4,"pop_est":10707924,"gdp_md_est":208627,"pop_year":-99,"lastcensus":2011,"gdp_year":0,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"PT","iso_a3":"PRT","iso_n3":"620","un_a3":"620","wb_a2":"PT","wb_a3":"PRT","woe_id":-99,"adm0_a3_is":"PRT","adm0_a3_us":"PRT","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"PRT.geojson"},"geometry":{"type":"Polygon","coordinates":[[[-9.034817674180246,41.88057058365967],[-8.67194576662672,42.13468943945496],[-8.263856980817792,42.28046865495034],[-8.013174607769912,41.790886135417125],[-7.422512986673795,41.79207469335983],[-7.251308966490824,41.91834605566505],[-6.668605515967656,41.883386949219584],[-6.389087693700915,41.381815497394655],[-6.851126674822552,41.11108266861753],[-6.864019944679385,40.33087189387483],[-7.026413133156595,40.184524237624245],[-7.066591559263529,39.71189158788277],[-7.498632371439725,39.62957103124181],[-7.098036668313128,39.03007274022378],[-7.374092169616318,38.37305858006492],[-7.029281175148796,38.07576406508977],[-7.166507941099865,37.803894354802225],[-7.537105475281024,37.42890432387623],[-7.453725551778092,37.09778758396607],[-7.855613165711985,36.83826854099627],[-8.382816127953689,36.97888011326246],[-8.898856980820327,36.86880931248078],[-8.746101446965554,37.65134552667661],[-8.839997524439879,38.26624339451761],[-9.287463751655224,38.3584858261586],[-9.526570603869715,38.73742910415491],[-9.446988898140232,39.39206614842837],[-9.048305223008427,39.75509308527877],[-8.977353481471681,40.15930613866581],[-8.768684047877102,40.76063894303019],[-8.79085323733031,41.18433401139126],[-8.99078935386757,41.54345937760364],[-9.034817674180246,41.88057058365967]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Romania","sov_a3":"ROU","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Romania","adm0_a3":"ROU","geou_dif":0,"geounit":"Romania","gu_a3":"ROU","su_dif":0,"subunit":"Romania","su_a3":"ROU","brk_diff":0,"name":"Romania","name_long":"Romania","brk_a3":"ROU","brk_name":"Romania","brk_group":null,"abbrev":"Rom.","postal":"RO","formal_en":"Romania","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Romania","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":3,"mapcolor13":13,"pop_est":22215421,"gdp_md_est":271400,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"RO","iso_a3":"ROU","iso_n3":"642","un_a3":"642","wb_a2":"RO","wb_a3":"ROM","woe_id":-99,"adm0_a3_is":"ROU","adm0_a3_us":"ROU","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"ROU.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.710531447040495,47.88219391538941],[23.142236362406802,48.09634105080695],[23.76095828623741,47.985598456405455],[24.40205610525038,47.98187775328042],[24.866317172960578,47.73752574318831],[25.20774336111299,47.89105642352747],[25.9459411964024,47.987148749374214],[26.19745039236693,48.22088125263035],[26.619336785597795,48.22072622333347],[26.924176059687568,48.123264472030996],[27.233872918412743,47.82677094175638],[27.551166212684848,47.40511709247083],[28.128030226359044,46.810476386088254],[28.160017937947714,46.37156260841722],[28.0544429867754,45.944586086605625],[28.233553501099042,45.48828318946837],[28.679779493939378,45.304030870131704],[29.149724969201653,45.46492544207245],[29.603289015427432,45.293308010431126],[29.626543409958767,45.03539093686239],[29.141611769331835,44.82021027279904],[28.837857700320203,44.913873806328056],[28.558081495891997,43.70746165625813],[27.970107049275075,43.81246816667521],[27.242399529740908,44.175986029632405],[26.065158725699746,43.94349376075126],[25.569271681426926,43.68844472917472],[24.100679152124172,43.74105133724785],[23.33230228037632,43.89701080990471],[22.944832391051847,43.82378530534713],[22.65714969248299,44.23492300066128],[22.4740084164406,44.40922760678177],[22.705725538837356,44.57800283464702],[22.459022251075936,44.7025171982543],[22.14508792490281,44.47842234962059],[21.562022739353605,44.7689472519655],[21.483526238702233,45.18117015235778],[20.874312778413355,45.416375433934235],[20.762174920339987,45.734573065771436],[20.220192498462836,46.127468980486555],[21.02195234547125,46.3160879583519],[21.62651492685387,46.99423777931816],[22.099767693782834,47.6724392767167],[22.710531447040495,47.88219391538941]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Montenegro","sov_a3":"MNE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Montenegro","adm0_a3":"MNE","geou_dif":0,"geounit":"Montenegro","gu_a3":"MNE","su_dif":0,"subunit":"Montenegro","su_a3":"MNE","brk_diff":0,"name":"Montenegro","name_long":"Montenegro","brk_a3":"MNE","brk_name":"Montenegro","brk_group":null,"abbrev":"Mont.","postal":"ME","formal_en":"Montenegro","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Montenegro","name_alt":null,"mapcolor7":4,"mapcolor8":1,"mapcolor9":4,"mapcolor13":5,"pop_est":672180,"gdp_md_est":6816,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"ME","iso_a3":"MNE","iso_n3":"499","un_a3":"499","wb_a2":"ME","wb_a3":"MNE","woe_id":-99,"adm0_a3_is":"MNE","adm0_a3_us":"MNE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":10,"long_len":10,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"MNE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[19.801613396898688,42.50009349219084],[19.738051385179627,42.688247382165564],[19.3044900000001,42.19574],[19.37177000000014,41.87755],[19.16246,41.95502],[18.88214,42.28151],[18.45,42.48],[18.56,42.65],[18.70648,43.20011],[19.03165,43.43253],[19.21852,43.52384],[19.48389,43.35229],[19.63,43.21377997027054],[19.95857,43.10604],[20.3398,42.89852],[20.25758,42.81275000000011],[20.0707,42.58863],[19.801613396898688,42.50009349219084]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Norway","sov_a3":"NOR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Norway","adm0_a3":"NOR","geou_dif":0,"geounit":"Norway","gu_a3":"NOR","su_dif":0,"subunit":"Norway","su_a3":"NOR","brk_diff":0,"name":"Norway","name_long":"Norway","brk_a3":"NOR","brk_name":"Norway","brk_group":null,"abbrev":"Nor.","postal":"N","formal_en":"Kingdom of Norway","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Norway","name_alt":null,"mapcolor7":5,"mapcolor8":3,"mapcolor9":8,"mapcolor13":12,"pop_est":4676305,"gdp_md_est":276400,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"NO","iso_a3":"NOR","iso_n3":"578","un_a3":"578","wb_a2":"NO","wb_a3":"NOR","woe_id":-99,"adm0_a3_is":"NOR","adm0_a3_us":"NOR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"NOR.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[28.165547316202915,71.18547435168051],[31.29341840996548,70.45378774685992],[30.005435011522792,70.1862588568849],[31.10107872897512,69.55808014594486],[29.399580519332886,69.15691600206307],[28.591929559043194,69.0647769232867],[29.01557295097197,69.76649119737797],[27.73229210786789,70.16419302029628],[26.1796220232263,69.82529897732616],[25.68921268077639,69.09211375596902],[24.73567915212672,68.64955678982145],[23.662049594830762,68.89124746365053],[22.356237827247412,68.84174144151494],[21.24493615081073,69.37044302029312],[20.64559288908958,69.10624726020085],[20.025268995857914,69.06513865831272],[19.878559604581255,68.40719432237262],[17.99386844246439,68.56739126247734],[17.729181756265348,68.01055186631623],[16.76887861498554,68.01393667263139],[16.108712192456835,67.3024555528369],[15.108411492583059,66.19386688909543],[13.55568973150909,64.78702769638147],[13.919905226302205,64.44542064071611],[13.57191613124877,64.04911408146967],[12.57993533697393,64.06621898055835],[11.93056928879423,63.128317572676984],[11.992064243221535,61.800362453856565],[12.631146681375242,61.29357168237009],[12.3003658382749,60.11793284773006],[11.468271925511175,59.432393296946],[11.027368605196926,58.856149400459394],[10.356556837616097,59.46980703392538],[8.382000359743643,58.31328847923328],[7.048748406613299,58.07888418235728],[5.665835402050419,58.58815542259367],[5.308234490590735,59.66323191999382],[4.992078077829007,61.970998033284275],[5.912900424837885,62.614472968182696],[8.553411085655766,63.45400828719647],[10.527709181366788,64.48603831649748],[12.358346795306375,65.87972585719316],[14.761145867581604,67.81064158799515],[16.43592736172897,68.56320547146169],[19.184028354578516,69.81744415961782],[21.378416375420613,70.25516937934606],[23.023742303161583,70.20207184516626],[24.546543409938522,71.03049673123724],[26.370049676221807,70.98626170519537],[28.165547316202915,71.18547435168051]]],[[[24.72412,77.85385],[22.49032,77.44493],[20.72601,77.67704],[21.41611,77.93504],[20.8119,78.25463],[22.88426,78.45494],[23.28134,78.07954],[24.72412,77.85385]]],[[[18.25183,79.70175],[21.54383,78.95611],[19.02737,78.5626],[18.47172,77.82669],[17.59441,77.63796],[17.1182,76.80941],[15.91315,76.77045],[13.76259,77.38035],[14.66956,77.73565],[13.1706,78.02493],[11.22231,78.8693],[10.44453,79.65239],[13.17077,80.01046],[13.71852,79.66039],[15.14282,79.67431],[15.52255,80.01608],[16.99085,80.05086],[18.25183,79.70175]]],[[[25.447625359811894,80.40734039989451],[27.4075057309135,80.05640574820046],[25.92465050629818,79.51783397085455],[23.02446577321362,79.4000117052291],[20.075188429451885,79.56682322866726],[19.897266473070914,79.84236196564751],[18.462263624757924,79.85988027619442],[17.368015170977458,80.31889618602702],[20.455992059010697,80.59815562613224],[21.9079447771154,80.35767934846209],[22.919252557067438,80.65714427359349],[25.447625359811894,80.40734039989451]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Poland","sov_a3":"POL","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Poland","adm0_a3":"POL","geou_dif":0,"geounit":"Poland","gu_a3":"POL","su_dif":0,"subunit":"Poland","su_a3":"POL","brk_diff":0,"name":"Poland","name_long":"Poland","brk_a3":"POL","brk_name":"Poland","brk_group":null,"abbrev":"Pol.","postal":"PL","formal_en":"Republic of Poland","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Poland","name_alt":null,"mapcolor7":3,"mapcolor8":7,"mapcolor9":1,"mapcolor13":2,"pop_est":38482919,"gdp_md_est":667900,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"PL","iso_a3":"POL","iso_n3":"616","un_a3":"616","wb_a2":"PL","wb_a3":"POL","woe_id":-99,"adm0_a3_is":"POL","adm0_a3_us":"POL","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"POL.geojson"},"geometry":{"type":"Polygon","coordinates":[[[15.01699588385867,51.10667409932158],[14.607098422919535,51.745188096719964],[14.685026482815688,52.0899474147552],[14.4375997250022,52.62485016540838],[14.074521111719491,52.98126251892543],[14.353315463934138,53.24817129171297],[14.119686313542587,53.75702912049103],[14.802900424873458,54.05070628520575],[16.36347700365573,54.513158677785725],[17.622831658608675,54.85153595643291],[18.62085859546164,54.68260569927078],[18.696254510175464,54.43871877706929],[19.660640089606403,54.42608388937393],[20.892244500418624,54.31252492941253],[22.731098667092652,54.327536932993326],[23.24398725758951,54.22056671814914],[23.48412763844985,53.91249766704114],[23.527535841575002,53.470121568406555],[23.80493493011778,53.089731350306074],[23.799198846133375,52.69109935160657],[23.199493849386187,52.486977444053664],[23.508002150168693,52.02364655212473],[23.52707075368437,51.57845408793023],[24.029985792748903,50.70540660257518],[23.922757195743262,50.42488108987875],[23.426508416444392,50.30850576435745],[22.518450148211603,49.47677358661974],[22.776418898212626,49.02739533140962],[22.558137648211755,49.085738023467144],[21.607808058364213,49.47010732685409],[20.887955356538413,49.32877228453583],[20.41583947111985,49.43145335549977],[19.825022820726872,49.21712535256923],[19.320712517990472,49.571574001659194],[18.909574822676316,49.435845852244576],[18.853144158613617,49.49622976337764],[18.392913852622172,49.98862864847075],[17.64944502123899,50.049038397819956],[17.55456709155112,50.36214590107641],[16.868769158605655,50.47397370055603],[16.719475945714436,50.21574656839354],[16.176253289462267,50.42260732685791],[16.23862674323857,50.69773265237984],[15.490972120839727,50.78472992614321],[15.01699588385867,51.10667409932158]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":2,"sovereignt":"Russia","sov_a3":"RUS","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Russia","adm0_a3":"RUS","geou_dif":0,"geounit":"Russia","gu_a3":"RUS","su_dif":0,"subunit":"Russia","su_a3":"RUS","brk_diff":0,"name":"Russia","name_long":"Russian Federation","brk_a3":"RUS","brk_name":"Russia","brk_group":null,"abbrev":"Rus.","postal":"RUS","formal_en":"Russian Federation","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Russian Federation","name_alt":null,"mapcolor7":2,"mapcolor8":5,"mapcolor9":7,"mapcolor13":7,"pop_est":140041247,"gdp_md_est":2266000,"pop_year":-99,"lastcensus":2010,"gdp_year":-99,"economy":"3. Emerging region: BRIC","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"RU","iso_a3":"RUS","iso_n3":"643","un_a3":"643","wb_a2":"RU","wb_a3":"RUS","woe_id":-99,"adm0_a3_is":"RUS","adm0_a3_us":"RUS","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":18,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"RUS.geojson"},"geometry":{"type":"MultiPolygon","coordinates":[[[[143.64800744036287,50.74760040954151],[144.65414757708564,48.976390692737596],[143.17392785051723,49.30655141865037],[142.5586682476501,47.861575018904915],[143.53349246640406,46.83672801369249],[143.5052771343726,46.13790761980948],[142.74770063697392,46.74076487892657],[142.0920300640545,45.96675527605879],[141.90692508358504,46.80592886004655],[142.0184428244709,47.780132961612935],[141.90444461483506,48.85918854429956],[142.13580000220568,49.61516307229746],[142.1799833518153,50.95234243428192],[141.59407596249002,51.93543488220254],[141.68254601457366,53.30196645772878],[142.60693403541075,53.762145087287905],[142.2097489768154,54.22547597921687],[142.654786411713,54.36588084575388],[142.91461551327657,53.704577541714734],[143.26084760963207,52.74076040303905],[143.23526777564766,51.75666026468875],[143.64800744036287,50.74760040954151]]],[[[22.731098667092652,54.327536932993326],[20.892244500418652,54.312524929412575],[19.660640089606403,54.426083889373984],[19.888481479581344,54.8661603867715],[21.2684489275035,55.19048167583528],[22.315723504330606,55.0152985703659],[22.757763706155288,54.85657440858142],[22.651051873472568,54.58274099386671],[22.731098667092652,54.327536932993326]]],[[[-175.01425,66.58435],[-174.33983,66.33556],[-174.57182,67.06219],[-171.85731,66.91308],[-169.89958,65.97724],[-170.89107,65.54139],[-172.53025,65.43791],[-172.555,64.46079],[-172.95533,64.25269],[-173.89184,64.2826],[-174.65392,64.63125],[-175.98353,64.92288],[-176.20716,65.35667],[-177.22266,65.52024],[-178.35993,65.39052],[-178.90332,65.74044],[-178.68611,66.11211],[-179.88377,65.87456],[-179.43268,65.40411],[-180,64.97970870219837],[-180,68.96363636363635],[-177.55,68.2],[-174.92825,67.20589],[-175.01425,66.58435]]],[[[180.00000000000014,70.83219920854668],[178.9034250000001,70.78114],[178.7253,71.0988],[180.00000000000014,71.51571433642826],[180.00000000000014,70.83219920854668]]],[[[-178.69378,70.89302],[-180,70.83219920854668],[-180,71.51571433642826],[-179.871875,71.55762],[-179.02433,71.55553],[-177.577945,71.26948],[-177.663575,71.13277],[-178.69378,70.89302]]],[[[143.60385,73.21244],[142.08763,73.20544],[140.038155,73.31692],[139.86312,73.36983],[140.81171,73.76506],[142.06207,73.85758],[143.48283,73.47525],[143.60385,73.21244]]],[[[150.73167,75.08406],[149.575925,74.68892],[147.977465,74.778355],[146.11919,75.17298],[146.358485,75.49682],[148.22223,75.345845],[150.73167,75.08406]]],[[[145.086285,75.562625],[144.3,74.82],[140.61381,74.84768],[138.95544,74.61148],[136.97439,75.26167],[137.51176,75.94917],[138.831075,76.13676],[141.471615,76.09289],[145.086285,75.562625]]],[[[57.5356925799924,70.72046397570216],[56.94497928246395,70.63274323188668],[53.6773751157842,70.76265778266847],[53.41201663596539,71.2066616889202],[51.60189456564572,71.47475901965049],[51.45575361512422,72.01488108996514],[52.47827518088357,72.22944163684096],[52.444168735570855,72.77473135038485],[54.42761355979766,73.62754751249759],[53.50828982932515,73.74981395130015],[55.90245893740766,74.62748647734533],[55.631932814359715,75.08141225859717],[57.86864383324885,75.60939036732321],[61.170044386647504,76.25188345000814],[64.49836836127022,76.43905548776928],[66.2109770038551,76.80978221303124],[68.15705976753483,76.93969676381292],[68.85221113472512,76.54481130645462],[68.18057254422766,76.23364166940911],[64.637326287703,75.73775462513623],[61.58350752141476,75.2608845079468],[58.47708214705338,74.30905630156283],[56.98678551618801,73.33304352486624],[55.419335971910954,72.37126760526598],[55.622837762276305,71.54059479439033],[57.5356925799924,70.72046397570216]]],[[[106.97013000000013,76.97419],[107.24000000000015,76.48],[108.1538,76.72335000000015],[111.07726000000017,76.71],[113.33151,76.22224],[114.13417,75.84764],[113.88539,75.32779000000014],[112.77918,75.03186],[110.1512500000002,74.47673],[109.4,74.18],[110.64,74.04],[112.11919,73.78774000000011],[113.01954000000026,73.97693000000015],[113.52958000000032,73.33505000000011],[113.96881,73.59488],[115.56782,73.75285],[118.77633000000023,73.58772],[119.02,73.12],[123.20066000000011,72.97122],[123.25777000000018,73.73503000000011],[125.38000000000018,73.56],[126.97644,73.56549],[128.59126,73.03871],[129.05157,72.39872],[128.46000000000012,71.98],[129.7159900000002,71.19304],[131.28858000000028,70.78699000000012],[132.25350000000017,71.83630000000011],[133.85766000000032,71.38642000000016],[135.56193,71.65525000000014],[137.49755,71.34763],[138.23409000000018,71.62803],[139.86983000000012,71.48783000000014],[139.14791,72.4161900000001],[140.46817,72.84941000000013],[149.5,72.2],[150.3511800000002,71.60643],[152.96890000000022,70.84222],[157.00688,71.03141],[158.99779,70.86672],[159.83031000000025,70.45324],[159.70866,69.72198],[160.94053000000034,69.4372800000001],[162.27907000000013,69.64204],[164.05248000000014,69.66823],[165.94037000000023,69.47199],[167.83567,69.58269],[169.5776300000002,68.6938],[170.81688000000028,69.01363],[170.0082000000002,69.65276],[170.4534500000003,70.09703],[173.64391000000026,69.81743],[175.72403000000023,69.87725000000023],[178.6,69.4],[180.00000000000014,68.96363636363657],[180.00000000000014,64.97970870219848],[179.99281,64.97433],[178.70720000000026,64.53493],[177.41128000000018,64.60821],[178.31300000000024,64.07593],[178.9082500000002,63.251970000000135],[179.37034,62.982620000000104],[179.48636,62.56894],[179.22825000000014,62.30410000000015],[177.3643,62.5219],[174.56929000000022,61.76915],[173.68013,61.65261],[172.15,60.95],[170.6985000000001,60.33618],[170.3308500000003,59.88177],[168.90046,60.57355],[166.29498000000032,59.788550000000214],[165.84000000000023,60.16],[164.87674,59.7316],[163.53929000000014,59.86871],[163.21711000000025,59.21101],[162.0173300000001,58.24328],[162.05297,57.83912],[163.19191,57.61503000000011],[163.05794000000017,56.159240000000125],[162.12958000000023,56.12219],[161.70146,55.285680000000156],[162.11749000000017,54.85514],[160.36877000000032,54.34433],[160.02173000000022,53.20257],[158.5309400000002,52.958680000000236],[158.23118,51.94269],[156.7897900000003,51.01105],[156.42000000000016,51.7],[155.99182,53.15895],[155.43366000000012,55.38103000000012],[155.91442000000032,56.767920000000146],[156.75815,57.3647],[156.8103500000001,57.83204],[158.3643300000002,58.05575],[160.15064000000012,59.31477000000012],[161.87204,60.34300000000013],[163.66969,61.1409],[164.47355000000013,62.55061],[163.2584200000002,62.46627],[162.65791,61.6425],[160.1214800000001,60.54423],[159.30232,61.77396],[156.7206800000001,61.43442],[154.21806000000035,59.75818000000013],[155.04375,59.14495],[152.81185,58.88385],[151.26573000000025,58.78089],[151.33815000000013,59.50396],[149.78371,59.65573000000014],[148.54481,59.16448],[145.48722,59.33637],[142.19782000000018,59.03998],[138.95848000000032,57.08805],[135.12619,54.72959],[136.70171,54.603550000000126],[137.19342,53.97732],[138.1647,53.755010000000254],[138.80463,54.25455000000011],[139.90151,54.18968000000018],[141.34531,53.08957000000012],[141.37923,52.23877],[140.5974200000002,51.2396700000001],[140.51308,50.04553000000013],[140.06193000000022,48.44671000000017],[138.5547200000002,46.99965],[138.21971,46.30795],[136.86232,45.14350000000019],[135.5153500000002,43.989],[134.86939000000027,43.39821],[133.53687000000028,42.81147],[132.90627000000015,42.79849],[132.27807000000027,43.28456000000011],[130.93587000000014,42.55274],[130.78,42.22000000000019],[130.64000000000019,42.395],[130.6338664084098,42.90301463477056],[131.144687941615,42.92998973242695],[131.28855512911562,44.111519680348266],[131.02519000000026,44.96796],[131.8834542176596,45.32116160743652],[133.09712000000022,45.14409],[133.7696439963132,46.116926988299156],[134.1123500000002,47.21248000000014],[134.50081,47.578450000000146],[135.0263114767868,48.47822988544391],[133.37359581922803,48.18344167743484],[132.50669000000013,47.78896],[130.98726000000013,47.79013],[130.58229332898267,48.729687404976204],[129.3978178244205,49.440600084015614],[127.65740000000038,49.76027],[127.28745568248493,50.73979726826545],[126.93915652883786,51.3538941514059],[126.56439904185699,51.7842554795327],[125.94634891164647,52.79279857035695],[125.06821129771045,53.161044826868924],[123.57147,53.4588],[122.24574791879307,53.43172597921369],[121.00308475147037,53.25140106873124],[120.1770886577169,52.75388621684121],[120.725789015792,52.51622630473091],[120.7382,51.96411],[120.18208000000018,51.64355],[119.27939,50.58292],[119.28846072802585,50.14288279886196],[117.8792444194265,49.51098338479704],[116.67880089728621,49.888531399121405],[115.48569542853144,49.80517731383475],[114.96210981655038,50.14024730081513],[114.36245649623534,50.248302720737485],[112.89773969935439,49.54356537535699],[111.58123091028668,49.37796824807767],[110.66201053267886,49.13012807880585],[109.40244917199672,49.29296051695769],[108.47516727095127,49.28254771585071],[107.86817589725112,49.79370514586588],[106.88880415245532,50.27429596618029],[105.8865914245869,50.406019192092174],[104.62158,50.275320000000164],[103.67654544476036,50.089966132195144],[102.25589000000011,50.51056000000011],[102.06521,51.25991],[100.88948042196265,51.51685578063842],[99.98173221232356,51.63400625264395],[98.8614905131005,52.04736603454671],[97.82573978067452,51.01099518493325],[98.23176150919173,50.42240062112873],[97.25976000000023,49.72605],[95.81402000000017,49.977460000000114],[94.81594933469879,50.01343333597088],[94.14756635943561,50.48053660745716],[93.10421,50.49529],[92.23471154171969,50.80217072204175],[90.71366743364078,50.331811835321105],[88.80556684769559,49.47052073831247],[87.75126427607685,49.29719798440556],[87.35997033076269,49.21498078062916],[86.82935672398966,49.82667470966813],[85.5412699726825,49.69285858824816],[85.11555952346211,50.11730296487763],[84.41637739455304,50.311399644565824],[83.93511478061893,50.88924551045358],[83.38300377801247,51.069182847693895],[81.94598554883994,50.81219594990633],[80.56844689323546,51.38833649352844],[80.03555952344172,50.864750881547224],[77.80091556184433,53.40441498474754],[76.52517947785478,54.177003485727134],[76.89110029491346,54.49052440044193],[74.38482000000013,53.54685000000011],[73.42567874542053,53.489810289109755],[73.50851606638437,54.035616766976595],[72.22415001820221,54.37665538188679],[71.1801310566095,54.133285224008254],[70.86526655465516,55.169733588270105],[69.06816694527289,55.3852501491435],[68.1691003762589,54.97039175070438],[65.6668700000001,54.601250000000164],[65.17853356309595,54.35422781027208],[61.43660000000013,54.00625],[60.97806644068325,53.66499339457914],[61.699986199800634,52.97999644633427],[60.739993117114544,52.71998647725775],[60.92726850774025,52.447548326215006],[59.96753380721557,51.960420437215674],[61.58800337102414,51.272658799843185],[61.33742435084101,50.79907013610426],[59.93280724471557,50.842194118851836],[59.64228234237057,50.545442206415714],[58.36332000000013,51.06364],[56.77798,51.04355],[55.71694000000011,50.62171000000015],[54.532878452376195,51.02623973245937],[52.32872358583106,51.718652248738096],[50.76664839051219,51.69276235615987],[48.702381626181044,50.60512848571284],[48.577841424357615,49.874759629915644],[47.549480421749394,50.454698391311126],[46.75159630716277,49.35600576435374],[47.0436715024766,49.152038886097586],[46.46644575377629,48.39415233010493],[47.31524000000016,47.71585],[48.05725,47.74377],[48.694733514201886,47.0756281601779],[48.593250000000154,46.561040000000105],[49.101160000000135,46.39933],[48.64541000000011,45.80629],[47.67591,45.64149000000012],[46.68201,44.6092000000001],[47.59094,43.66016000000013],[47.49252,42.98658],[48.58437000000018,41.80888],[47.98728315612604,41.4058192001944],[47.81566572448466,41.151416124021345],[47.373315464066394,41.21973236751114],[46.686070591016716,41.827137152669906],[46.40495079934894,41.860675157227426],[45.7764,42.09244000000024],[45.470279168485916,42.50278066667005],[44.53762291848207,42.711992702803684],[43.93121000000011,42.5549600000001],[43.755990000000196,42.74083],[42.39440000000016,43.2203],[40.92219000000014,43.38215000000014],[40.07696495947985,43.553104153002494],[39.955008579271095,43.434997666999294],[38.68,44.28],[37.53912000000011,44.65721],[36.67546000000013,45.24469],[37.40317,45.4045100000001],[38.23295,46.24087],[37.67372,46.63657],[39.14767,47.04475000000013],[39.12120000000013,47.26336],[38.22353803889948,47.10218984637598],[38.25511233902981,47.54640045835697],[38.77057,47.82562000000024],[39.738277622238996,47.89893707945208],[39.89562000000015,48.23241],[39.67465,48.783820000000134],[40.08078901546949,49.30742991799937],[40.069040000000115,49.60105],[38.59498823421356,49.92646190042373],[38.010631137857075,49.91566152607473],[37.39345950699524,50.38395335550368],[36.626167840325394,50.225590928745135],[35.35611616388812,50.57719737405915],[35.37791,50.77394],[35.02218305841794,51.2075723333715],[34.2248157081544,51.255993150428935],[34.14197838719061,51.566413479206204],[34.39173058445723,51.768881740925906],[33.75269982273588,52.33507457133166],[32.71576053236716,52.23846548116216],[32.41205813978777,52.28869497334977],[32.15944000000022,52.061250000000115],[31.78597,52.10168],[31.54001834486226,52.74205231384644],[31.30520063652798,53.0739958766733],[31.49764,53.16743000000014],[32.304519484188376,53.132726141972846],[32.693643019346126,53.35142080343214],[32.405598585751164,53.618045355842014],[31.731272820774592,53.79402944601202],[31.791424187962406,53.974638576872195],[31.384472283663822,54.15705638286238],[30.75753380709878,54.811770941784395],[30.971835971813245,55.081547756564134],[30.87390913262007,55.55097646750351],[29.89629438652244,55.7894632025305],[29.37157189303079,55.67009064393628],[29.22951338066039,55.91834422466641],[28.17670942557794,56.16912995057879],[27.855282016722526,56.75932648378438],[27.770015903440992,57.244258124411196],[27.288184848751655,57.47452830670392],[27.71668582531578,57.79189911562445],[27.420150000000202,58.72457000000014],[28.131699253051863,59.300825100331],[27.98112,59.47537],[29.1177,60.02805000000012],[28.07,60.50352000000015],[30.211107212044652,61.78002777774969],[31.139991082491036,62.357692776124445],[31.51609215671127,62.867687486412905],[30.035872430142803,63.552813625738565],[30.444684686003736,64.20445343693908],[29.544429559047018,64.94867157659056],[30.21765,65.80598],[29.054588657352383,66.94428620062203],[29.977426385220696,67.69829702419275],[28.44594363781877,68.36461294216399],[28.591929559043365,69.0647769232867],[29.39955,69.15692000000018],[31.10108000000011,69.55811],[32.13272000000026,69.90595000000025],[33.77547,69.30142000000012],[36.51396,69.06342],[40.292340000000166,67.9324],[41.059870000000124,67.4571300000001],[41.12595000000019,66.79158000000012],[40.01583,66.26618000000013],[38.38295,65.9995300000001],[33.918710000000175,66.75961],[33.18444,66.63253],[34.81477,65.90015000000014],[34.87857425307877,65.4362128770482],[34.94391000000015,64.41437000000016],[36.23129,64.10945],[37.01273000000012,63.84983000000011],[37.14197000000016,64.33471],[36.539579035089815,64.76446],[37.17604000000014,65.14322000000013],[39.59345,64.52079000000018],[40.43560000000011,64.76446],[39.76260000000016,65.49682],[42.0930900000001,66.47623],[43.01604000000012,66.41858],[43.94975000000014,66.06908],[44.53226,66.75634000000014],[43.69839,67.35245],[44.18795000000014,67.95051],[43.45282,68.57079],[46.25000000000014,68.25],[46.82134000000016,67.68997],[45.55517,67.56652],[45.5620200000001,67.01005000000019],[46.34915000000015,66.6676700000001],[47.894160000000255,66.88455000000016],[48.13876,67.52238],[50.22766000000016,67.99867000000013],[53.71743000000018,68.85738000000012],[54.47171,68.80815],[53.48582000000013,68.20131],[54.72628,68.09702],[55.44268000000014,68.43866],[57.317020000000156,68.46628],[58.80200000000021,68.88082],[59.94142000000019,68.2784400000001],[61.07784000000018,68.94069],[60.03,69.52],[60.55,69.85],[63.50400000000016,69.54739],[64.888115,69.23483500000013],[68.51216000000014,68.09233000000017],[69.18068,68.61563000000012],[68.16444,69.14436],[68.13522,69.35649],[66.93008000000012,69.45461000000012],[67.25976,69.92873],[66.72492000000014,70.70889000000014],[66.69466,71.02897000000024],[68.54006000000011,71.93450000000024],[69.19636000000011,72.84336000000016],[69.94,73.04000000000013],[72.58754,72.7762900000001],[72.79603,72.22006],[71.8481100000001,71.40898],[72.47011,71.09019],[72.79188,70.39114],[72.56470000000022,69.02085],[73.66787,68.4079],[73.2387,67.7404],[71.28000000000011,66.32000000000016],[72.42301000000018,66.17267000000018],[72.82077,66.53267],[73.92099000000016,66.78946000000013],[74.1865100000002,67.28429],[75.052,67.76047000000017],[74.46926000000016,68.32899],[74.93584000000013,68.98918],[73.84236,69.07146],[73.60187000000022,69.62763],[74.3998,70.63175],[73.1011,71.44717000000026],[74.89082000000022,72.12119],[74.65926,72.83227],[75.15801000000019,72.85497000000011],[75.68351,72.30056000000013],[75.28898000000012,71.33556],[76.35911,71.15287000000015],[75.90313000000017,71.87401],[77.57665000000011,72.26717],[79.65202000000014,72.32011],[81.5,71.75],[80.61071000000013,72.58285000000012],[80.51109,73.6482],[82.25,73.85000000000011],[84.65526,73.80591000000018],[86.82230000000024,73.93688],[86.00956,74.45967000000014],[87.16682000000017,75.11643],[88.31571000000011,75.14393],[90.26,75.64],[92.90058,75.77333],[93.23421000000016,76.0472],[95.86000000000016,76.14],[96.67821,75.91548],[98.92254000000023,76.44689],[100.75967000000023,76.43028],[101.03532,76.86189],[101.99084000000013,77.2875400000002],[104.3516000000001,77.69792],[106.06664000000013,77.37389],[104.70500000000024,77.1274],[106.97013000000013,76.97419]]],[[[105.07547,78.30689],[99.43814,77.921],[101.2649,79.23399],[102.08635,79.34641],[102.837815,79.28129],[105.37243,78.71334],[105.07547,78.30689]]],[[[51.13618655783128,80.54728017854093],[49.79368452332071,80.4154277615482],[48.89441124857754,80.3395667589437],[48.754936557821765,80.17546824820084],[47.586119012244154,80.01018117951533],[46.502825962109654,80.24724681265437],[47.07245527526291,80.55942414012945],[44.846958042181114,80.58980988231718],[46.79913862487123,80.77191762971364],[48.318477410684665,80.78400991486996],[48.522806023966695,80.51456899690015],[49.09718956889091,80.75398590770843],[50.03976769389462,80.91888540315182],[51.52293297710369,80.6997256538019],[51.13618655783128,80.54728017854093]]],[[[99.93976,78.88094],[97.75794,78.7562],[94.97259,79.044745],[93.31288,79.4265],[92.5454,80.14379],[91.18107,80.34146],[93.77766,81.0246],[95.940895,81.2504],[97.88385,80.746975],[100.186655,79.780135],[99.93976,78.88094]]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":5,"sovereignt":"Republic of Serbia","sov_a3":"SRB","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Republic of Serbia","adm0_a3":"SRB","geou_dif":0,"geounit":"Republic of Serbia","gu_a3":"SRB","su_dif":0,"subunit":"Republic of Serbia","su_a3":"SRB","brk_diff":0,"name":"Serbia","name_long":"Serbia","brk_a3":"SRB","brk_name":"Serbia","brk_group":null,"abbrev":"Serb.","postal":"RS","formal_en":"Republic of Serbia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Serbia","name_alt":null,"mapcolor7":3,"mapcolor8":3,"mapcolor9":2,"mapcolor13":10,"pop_est":7379339,"gdp_md_est":80340,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"6. Developing region","income_grp":"3. Upper middle income","wikipedia":-99,"fips_10":null,"iso_a2":"RS","iso_a3":"SRB","iso_n3":"688","un_a3":"688","wb_a2":"YF","wb_a3":"SRB","woe_id":-99,"adm0_a3_is":"SRB","adm0_a3_us":"SRB","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":5,"tiny":-99,"homepart":1,"filename":"SRB.geojson"},"geometry":{"type":"Polygon","coordinates":[[[20.87431277841341,45.41637543393432],[21.48352623870221,45.18117015235788],[21.562022739353722,44.76894725196564],[22.145087924902896,44.47842234962059],[22.459022251075965,44.70251719825444],[22.70572553883744,44.57800283464701],[22.474008416440654,44.40922760678177],[22.657149692483074,44.234923000661354],[22.410446404721597,44.008063462900054],[22.500156691180223,43.642814439461006],[22.986018507588483,43.2111612005271],[22.60480146657136,42.898518785161116],[22.43659467946139,42.58032115332394],[22.54501183440965,42.46136200618804],[22.38052575042468,42.32025950781508],[21.917080000000112,42.30364],[21.57663598940212,42.24522439706186],[21.54332,42.3202500000001],[21.66292,42.43922],[21.77505,42.6827],[21.63302,42.67717],[21.43866,42.86255],[21.27421,42.90959],[21.143395,43.06868500000012],[20.95651,43.13094],[20.81448,43.27205],[20.63508,43.21671],[20.49679,42.88469],[20.25758,42.81275000000011],[20.3398,42.89852],[19.95857,43.10604],[19.63,43.21377997027054],[19.48389,43.35229],[19.21852,43.52384],[19.454,43.56810000000013],[19.59976,44.03847],[19.11761,44.42307000000011],[19.36803,44.863],[19.00548,44.86023],[19.39047570158459,45.236515611342384],[19.072768995854176,45.52151113543209],[18.82982,45.90888],[19.59604454924164,46.171729844744554],[20.220192498462893,46.12746898048658],[20.762174920339987,45.734573065771485],[20.87431277841341,45.41637543393432]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Slovakia","sov_a3":"SVK","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Slovakia","adm0_a3":"SVK","geou_dif":0,"geounit":"Slovakia","gu_a3":"SVK","su_dif":0,"subunit":"Slovakia","su_a3":"SVK","brk_diff":0,"name":"Slovakia","name_long":"Slovakia","brk_a3":"SVK","brk_name":"Slovakia","brk_group":null,"abbrev":"Svk.","postal":"SK","formal_en":"Slovak Republic","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Slovak Republic","name_alt":null,"mapcolor7":2,"mapcolor8":4,"mapcolor9":4,"mapcolor13":9,"pop_est":5463046,"gdp_md_est":119500,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"SK","iso_a3":"SVK","iso_n3":"703","un_a3":"703","wb_a2":"SK","wb_a3":"SVK","woe_id":-99,"adm0_a3_is":"SVK","adm0_a3_us":"SVK","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"SVK.geojson"},"geometry":{"type":"Polygon","coordinates":[[[18.853144158613617,49.49622976337764],[18.909574822676316,49.435845852244576],[19.320712517990472,49.571574001659194],[19.825022820726872,49.21712535256923],[20.41583947111985,49.43145335549977],[20.887955356538413,49.32877228453583],[21.607808058364213,49.47010732685409],[22.558137648211755,49.085738023467144],[22.28084191253356,48.82539215758067],[22.08560835133485,48.42226430927179],[21.872236362401736,48.31997081155002],[20.801293979584926,48.623854071642384],[20.473562045989866,48.56285004332181],[20.239054396249347,48.32756724709692],[19.769470656013112,48.202691148463614],[19.661363559658497,48.26661489520866],[19.17436486173989,48.11137889260387],[18.77702477384767,48.081768296900634],[18.696512892336926,47.880953681014404],[17.857132602620027,47.758428860050365],[17.48847293464982,47.86746613218621],[16.979666782304037,48.123497015976305],[16.879982944413,48.47001333270947],[16.960288120194576,48.5969823268506],[17.101984897538898,48.81696889911711],[17.545006951577108,48.80001902932537],[17.88648481616181,48.90347524677371],[17.913511590250465,48.996492824899086],[18.104972771891852,49.04398346617531],[18.170498488037964,49.271514797556435],[18.399993523846177,49.31500051533004],[18.554971144289482,49.49501536721878],[18.853144158613617,49.49622976337764]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":6,"sovereignt":"Slovenia","sov_a3":"SVN","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Slovenia","adm0_a3":"SVN","geou_dif":0,"geounit":"Slovenia","gu_a3":"SVN","su_dif":0,"subunit":"Slovenia","su_a3":"SVN","brk_diff":0,"name":"Slovenia","name_long":"Slovenia","brk_a3":"SVN","brk_name":"Slovenia","brk_group":null,"abbrev":"Slo.","postal":"SLO","formal_en":"Republic of Slovenia","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Slovenia","name_alt":null,"mapcolor7":2,"mapcolor8":3,"mapcolor9":2,"mapcolor13":12,"pop_est":2005692,"gdp_md_est":59340,"pop_year":-99,"lastcensus":2011,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"SI","iso_a3":"SVN","iso_n3":"705","un_a3":"705","wb_a2":"SI","wb_a3":"SVN","woe_id":-99,"adm0_a3_is":"SVN","adm0_a3_us":"SVN","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Southern Europe","region_wb":"Europe & Central Asia","name_len":8,"long_len":8,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"SVN.geojson"},"geometry":{"type":"Polygon","coordinates":[[[13.806475457421527,46.509306138691215],[14.63247155117483,46.43181732846955],[15.137091912504985,46.65870270444703],[16.011663852612656,46.6836107448117],[16.202298211337364,46.85238597267696],[16.370504998447416,46.8413272161665],[16.564808383864857,46.50375092221983],[15.768732944408551,46.23810822202345],[15.671529575267556,45.83415355079788],[15.323953891672403,45.73178253842768],[15.327674594797427,45.45231639259323],[14.935243767972935,45.471695054702685],[14.595109490627804,45.634940904312714],[14.411968214585414,45.46616567644746],[13.715059848697221,45.50032379819237],[13.937630242578306,45.59101593686462],[13.698109978905478,46.01677806251735],[13.806475457421527,46.509306138691215]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Sweden","sov_a3":"SWE","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Sweden","adm0_a3":"SWE","geou_dif":0,"geounit":"Sweden","gu_a3":"SWE","su_dif":0,"subunit":"Sweden","su_a3":"SWE","brk_diff":0,"name":"Sweden","name_long":"Sweden","brk_a3":"SWE","brk_name":"Sweden","brk_group":null,"abbrev":"Swe.","postal":"S","formal_en":"Kingdom of Sweden","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Sweden","name_alt":null,"mapcolor7":1,"mapcolor8":4,"mapcolor9":2,"mapcolor13":4,"pop_est":9059651,"gdp_md_est":344300,"pop_year":-99,"lastcensus":-99,"gdp_year":-99,"economy":"2. Developed region: nonG7","income_grp":"1. High income: OECD","wikipedia":-99,"fips_10":null,"iso_a2":"SE","iso_a3":"SWE","iso_n3":"752","un_a3":"752","wb_a2":"SE","wb_a3":"SWE","woe_id":-99,"adm0_a3_is":"SWE","adm0_a3_us":"SWE","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Northern Europe","region_wb":"Europe & Central Asia","name_len":6,"long_len":6,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"SWE.geojson"},"geometry":{"type":"Polygon","coordinates":[[[22.183173455501926,65.72374054632017],[21.21351687997722,65.02600535751527],[21.369631381930958,64.41358795842429],[19.77887576669022,63.60955434839504],[17.84777916837521,62.74940013289681],[17.119554884518124,61.34116567651097],[17.83134606290639,60.63658336042741],[18.78772179533209,60.081914374422595],[17.86922488777634,58.9537661810587],[16.829185011470088,58.71982697207339],[16.447709588291474,57.041118069071885],[15.879785597403783,56.10430186626866],[14.666681349352075,56.200885118222175],[14.100721062891465,55.40778107362265],[12.942910597392057,55.36173737245058],[12.625100538797028,56.30708018658197],[11.787942335668674,57.44181712506307],[11.027368605196866,58.85614940045936],[11.468271925511146,59.43239329694604],[12.3003658382749,60.11793284773003],[12.631146681375183,61.293571682370136],[11.992064243221563,61.80036245385656],[11.93056928879423,63.12831757267698],[12.579935336973932,64.06621898055833],[13.571916131248711,64.04911408146971],[13.919905226302204,64.44542064071608],[13.55568973150909,64.78702769638151],[15.108411492583002,66.19386688909547],[16.108712192456778,67.30245555283689],[16.768878614985482,68.01393667263139],[17.729181756265348,68.01055186631628],[17.993868442464333,68.56739126247736],[19.878559604581255,68.40719432237258],[20.025268995857886,69.0651386583127],[20.645592889089528,69.10624726020087],[21.978534783626117,68.6168456081807],[23.53947309743444,67.93600861273525],[23.565879754335583,66.39605093043743],[23.903378533633802,66.00692739527962],[22.183173455501926,65.72374054632017]]]}},{"type":"Feature","properties":{"scalerank":1,"featurecla":"Admin-0 country","labelrank":3,"sovereignt":"Ukraine","sov_a3":"UKR","adm0_dif":0,"level":2,"type":"Sovereign country","admin":"Ukraine","adm0_a3":"UKR","geou_dif":0,"geounit":"Ukraine","gu_a3":"UKR","su_dif":0,"subunit":"Ukraine","su_a3":"UKR","brk_diff":0,"name":"Ukraine","name_long":"Ukraine","brk_a3":"UKR","brk_name":"Ukraine","brk_group":null,"abbrev":"Ukr.","postal":"UA","formal_en":"Ukraine","formal_fr":null,"note_adm0":null,"note_brk":null,"name_sort":"Ukraine","name_alt":null,"mapcolor7":5,"mapcolor8":1,"mapcolor9":6,"mapcolor13":3,"pop_est":45700395,"gdp_md_est":339800,"pop_year":-99,"lastcensus":2001,"gdp_year":-99,"economy":"6. Developing region","income_grp":"4. Lower middle income","wikipedia":-99,"fips_10":null,"iso_a2":"UA","iso_a3":"UKR","iso_n3":"804","un_a3":"804","wb_a2":"UA","wb_a3":"UKR","woe_id":-99,"adm0_a3_is":"UKR","adm0_a3_us":"UKR","adm0_a3_un":-99,"adm0_a3_wb":-99,"continent":"Europe","region_un":"Europe","subregion":"Eastern Europe","region_wb":"Europe & Central Asia","name_len":7,"long_len":7,"abbrev_len":4,"tiny":-99,"homepart":1,"filename":"UKR.geojson"},"geometry":{"type":"Polygon","coordinates":[[[31.785998162571587,52.101677964885454],[32.15941206231267,52.06126699483322],[32.41205813978763,52.28869497334975],[32.71576053236697,52.23846548116205],[33.7526998227357,52.335074571331695],[34.39173058445701,51.76888174092579],[34.14197838719039,51.56641347920623],[34.22481570815427,51.25599315042895],[35.02218305841788,51.20757233337145],[35.37792361831512,50.77395539001034],[35.35611616388795,50.577197374059054],[36.62616784032534,50.225590928745135],[37.39345950699507,50.38395335550359],[38.010631137856905,49.91566152607463],[38.59498823421342,49.92646190042363],[40.06905846533911,49.6010554062817],[40.08078901546935,49.307429917999286],[39.67466393408753,48.78381846780187],[39.89563235856758,48.23240509703143],[39.738277622238826,47.89893707945198],[38.7705847511412,47.825608222029814],[38.25511233902975,47.546400458356814],[38.22353803889942,47.10218984637588],[37.42513715998999,47.022220567404204],[36.75985477066439,46.698700263040934],[35.82368452326483,46.64596446388707],[34.96234174982388,46.27319651954964],[35.020787794745985,45.65121898048466],[35.51000857925317,45.40999339454619],[36.52999799983016,45.46998973243706],[36.33471276219916,45.113215643893966],[35.23999922052812,44.939996242851606],[33.882511020652885,44.36147858334407],[33.326420932760044,44.56487702084489],[33.54692426934946,45.03477081967489],[32.4541744321055,45.32746613217608],[32.630804477679135,45.519185695978905],[33.58816206231839,45.85156850848024],[33.29856733575471,46.080598456397844],[31.74414025241518,46.333347886737386],[31.675307244602408,46.70624502215554],[30.748748813609097,46.583100084004],[30.377608676888883,46.03241018328567],[29.603289015427432,45.293308010431126],[29.149724969201653,45.46492544207245],[28.679779493939378,45.304030870131704],[28.233553501099042,45.48828318946837],[28.485269402792767,45.5969070501459],[28.659987420371575,45.93998688413164],[28.93371748222162,46.2588304713725],[28.862972446414062,46.43788930926383],[29.072106967899295,46.517677720722496],[29.170653924279886,46.3792623968287],[29.75997195813639,46.34998769793536],[30.02465864433537,46.42393667254503],[29.838210076626297,46.52532583270169],[29.908851759569302,46.67436066343146],[29.559674106573112,46.928582872091326],[29.41513512545274,47.34664520933257],[29.05086795422733,47.51022695575249],[29.12269819511303,47.84909516050646],[28.670891147585163,48.1181485052341],[28.259546746541844,48.15556224221342],[27.522537469195154,48.467119452501116],[26.857823520624805,48.368210761094495],[26.619336785597795,48.22072622333347],[26.19745039236693,48.22088125263035],[25.9459411964024,47.987148749374214],[25.20774336111299,47.89105642352747],[24.866317172960578,47.73752574318831],[24.40205610525038,47.98187775328042],[23.76095828623741,47.985598456405455],[23.142236362406802,48.09634105080695],[22.710531447040495,47.88219391538941],[22.640819939878753,48.15023956968735],[22.08560835133485,48.42226430927179],[22.28084191253356,48.82539215758067],[22.558137648211755,49.085738023467144],[22.776418898212626,49.02739533140962],[22.518450148211603,49.47677358661974],[23.426508416444392,50.30850576435745],[23.922757195743262,50.42488108987875],[24.029985792748903,50.70540660257518],[23.52707075368437,51.57845408793023],[24.00507775238421,51.61744395609446],[24.553106316839518,51.888461005249184],[25.327787713327005,51.91065603291855],[26.337958611768556,51.83228872334793],[27.454066196408434,51.59230337178447],[28.24161502453657,51.57222707783907],[28.61761274589225,51.42771393493484],[28.99283532076353,51.602044379271476],[29.254938185347925,51.368234361366895],[30.157363722460897,51.41613841410147],[30.555117221811457,51.31950348571566],[30.619454380014844,51.822806098022376],[30.927549269338982,52.04235342061438],[31.785998162571587,52.101677964885454]]]}}]}'
    );
  class jl {
    constructor(t, e) {
      (this.allData = e),
        (this.viewWidth = Hl / 4),
        (this.viewHeight = Ul / 3),
        (this.countriesToFilter = []),
        (this.hoverCountry = null),
        (this.mapG = t.append("g").classed("map", !0)),
        (this.mapTooltip = qn("body").append("div").classed("map-tooltip", !0));
      const r = Kl(e);
      (this.colorScale = dl(yl)
        .domain(n(Object.entries(r), (n) => n[1]))
        .range([yl(0.3), yl(1)])),
        (this.selectedColorScale = dl(bl)
          .domain(n(Object.entries(r), (n) => n[1]))
          .range([bl(0.3), bl(1)]));
      const o = hi()
        .center([2.6, 46])
        .scale(0.17 * Hl)
        .translate([0.1 * Hl, 0.24 * Ul]);
      this.pathGenerator = (function (n, t) {
        var e,
          r,
          o = 4.5;
        function a(n) {
          return (
            n &&
              ("function" == typeof o &&
                r.pointRadius(+o.apply(this, arguments)),
              so(n, e(r))),
            r.result()
          );
        }
        return (
          (a.area = function (n) {
            return so(n, e(jo)), jo.result();
          }),
          (a.measure = function (n) {
            return so(n, e(Ra)), Ra.result();
          }),
          (a.bounds = function (n) {
            return so(n, e(Wo)), Wo.result();
          }),
          (a.centroid = function (n) {
            return so(n, e(ga)), ga.result();
          }),
          (a.projection = function (t) {
            return arguments.length
              ? ((e = null == t ? ((n = null), ro) : (n = t).stream), a)
              : n;
          }),
          (a.context = function (n) {
            return arguments.length
              ? ((r = null == n ? ((t = null), new Na()) : new ya((t = n))),
                "function" != typeof o && r.pointRadius(o),
                a)
              : t;
          }),
          (a.pointRadius = function (n) {
            return arguments.length
              ? ((o = "function" == typeof n ? n : (r.pointRadius(+n), +n)), a)
              : o;
          }),
          a.projection(n).context(t)
        );
      })(o);
    }
    updateFilters(n) {
      0 != this.countriesToFilter.length || this.hoverCountry
        ? n((n) => {
            let t = this.countriesToFilter;
            return (
              this.hoverCountry && (t = [this.hoverCountry, ...t]),
              t.includes(n.creatorCountry)
            );
          })
        : n(null);
    }
    toggle(n) {
      this.countriesToFilter.includes(n)
        ? (this.countriesToFilter = this.countriesToFilter.filter(
            (t) => t != n
          ))
        : this.countriesToFilter.push(n);
    }
    color(n) {
      let t = "#FFF2AF";
      const e = n.properties.name;
      return (
        this.countriesToFilter.includes(e) || this.hoverCountry == e
          ? (t = this.selectedColorScale(this.grouped[e] || 0))
          : this.grouped[e] && (t = this.colorScale(this.grouped[e])),
        t
      );
    }
    initialize(n, t) {
      const e = this;
      (this.grouped = Kl(n)),
        this.mapG
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", this.viewWidth)
          .attr("height", this.viewHeight)
          .attr("fill", "#AADAFF")
          .attr("rx", 10)
          .attr("style", "pointer-events: visibleFill;")
          .on("click", () => {
            (this.countriesToFilter = []), e.updateFilters(t);
          }),
        this.mapG
          .append("clipPath")
          .attr("id", "rect-clip")
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", this.viewWidth)
          .attr("height", this.viewHeight)
          .attr("rx", 10),
        (this.pathSelection = this.mapG
          .selectAll(".countryPath")
          .data(Ol.R)
          .join("g")
          .classed("countryPath", !0)
          .append("path")),
        this.pathSelection
          .attr("clip-path", "url(#rect-clip)")
          .attr("pointer-events", "visibleFill")
          .attr("cursor", "pointer")
          .attr("d", e.pathGenerator)
          .attr("stroke", "black")
          .on("mouseenter", function (n, r) {
            qn(this).attr("fill", e.color(r));
            let o = r.properties.name;
            e.grouped[r.properties.name] &&
              (o += ": " + e.grouped[r.properties.name].toString()),
              e.mapTooltip.text(o),
              (e.hoverCountry = r.properties.name),
              e.updateFilters(t);
          })
          .on("mousemove", function (n, r) {
            qn(this).attr("fill", e.color(r)),
              e.mapTooltip.attr(
                "style",
                `position: absolute; \n           top: ${
                  n.clientY
                }px; \n           left: ${
                  n.clientX + 12
                }px; \n           background-color: #fff;`
              ),
              r.properties.name !== e.hoverCountry &&
                ((e.hoverCountry = r.properties.name), e.updateFilters(t));
          })
          .on("mouseleave", function (n, r) {
            qn(this).attr("fill", e.color(r)),
              e.mapTooltip.attr("style", "visibility: hidden;"),
              e.hoverCountry === r.properties.name && (e.hoverCountry = null),
              e.updateFilters(t);
          })
          .on("click", (n, r) => {
            e.toggle(r.properties.name), e.updateFilters(t);
          }),
        this.update(n);
    }
    update(n) {
      (this.grouped = Kl(n)),
        this.pathSelection.attr("fill", this.color.bind(this));
    }
  }
  function Kl(n) {
    const t = {};
    for (const e of n)
      t[e.creatorCountry]
        ? (t[e.creatorCountry] += 1)
        : (t[e.creatorCountry] = 1);
    return t;
  }
  class zl {
    constructor(t, e) {
      (this.svg = t),
        (this.allData = e),
        (this.viewWidth = Hl / 4),
        (this.viewHeight = Ul / 3),
        (this.padding = {
          bottom: this.viewHeight / 10 + 10,
          top: this.viewHeight / 10 + 10,
          left: this.viewWidth / 10 + 10,
        }),
        (this.mainViewWidth = this.viewWidth - this.padding.left),
        (this.mainViewHeight =
          this.viewHeight - this.padding.bottom - this.padding.top),
        (this.timeG = t
          .append("g")
          .classed("time", !0)
          .attr("transform", `translate(0, ${this.viewHeight})`)),
        (this.xScale = sl()
          .domain(n(e, (n) => n.year))
          .range([0, this.mainViewWidth])),
        (this.bins = m()
          .value((n) => n.year)
          .domain(this.xScale.domain())
          .thresholds(this.xScale.ticks(20))(e)),
        (this.yScale = sl()
          .domain([0, g(this.bins.map((n) => n.length))])
          .range([0, this.mainViewHeight]));
    }
    initialize(n, t) {
      const e = this;
      var r;
      (e.filterBounds = null),
        this.timeG
          .append("g")
          .attr("class", "x-axis")
          .attr(
            "transform",
            `translate(\n          ${e.padding.left}, ${
              e.mainViewHeight + e.padding.top + 10
            }\n         )`
          )
          .call(((r = this.xScale), A(3, r)).tickFormat(Qr("d")).tickSize(5)),
        this.timeG
          .append("text")
          .attr("class", "axis-label")
          .attr("text-anchor", "end")
          .attr("x", e.padding.left - 5)
          .attr("y", this.mainViewHeight + 1.7 * e.padding.top)
          .text("Year"),
        qn(".x-axis")
          .selectAll(".tick text")
          .each(function (n, t) {
            t % 2 != 0 && qn(this).remove();
          });
      const o = sl()
        .domain([0, g(this.bins.map((n) => n.length))])
        .range([this.mainViewHeight, 0]);
      this.timeG
        .append("g")
        .attr("class", "y-axis")
        .attr(
          "transform",
          `translate(${e.padding.left - 10}, ${e.padding.top})`
        )
        .call(
          (function (n) {
            return A(4, n);
          })(o).tickSize(5)
        ),
        this.timeG
          .append("text")
          .attr("class", "axis-label")
          .attr("text-anchor", "end")
          .attr("x", e.padding.left - 10)
          .attr("y", e.padding.top - 8)
          .text("Total");
      const a = (function (n) {
        var t,
          e = Sr,
          r = xr,
          o = Ar,
          a = !0,
          i = D("start", "brush", "end"),
          l = 6;
        function u(t) {
          var e = t
            .property("__brush", h)
            .selectAll(".overlay")
            .data([Er("overlay")]);
          e
            .enter()
            .append("rect")
            .attr("class", "overlay")
            .attr("pointer-events", "all")
            .attr("cursor", yr.overlay)
            .merge(e)
            .each(function () {
              var n = Mr(this).extent;
              qn(this)
                .attr("x", n[0][0])
                .attr("y", n[0][1])
                .attr("width", n[1][0] - n[0][0])
                .attr("height", n[1][1] - n[0][1]);
            }),
            t
              .selectAll(".selection")
              .data([Er("selection")])
              .enter()
              .append("rect")
              .attr("class", "selection")
              .attr("cursor", yr.selection)
              .attr("fill", "#777")
              .attr("fill-opacity", 0.3)
              .attr("stroke", "#fff")
              .attr("shape-rendering", "crispEdges");
          var r = t.selectAll(".handle").data(n.handles, function (n) {
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
                return yr[n.type];
              }),
            t
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
          var n = qn(this),
            t = Mr(this).selection;
          t
            ? (n
                .selectAll(".selection")
                .style("display", null)
                .attr("x", t[0][0])
                .attr("y", t[0][1])
                .attr("width", t[1][0] - t[0][0])
                .attr("height", t[1][1] - t[0][1]),
              n
                .selectAll(".handle")
                .style("display", null)
                .attr("x", function (n) {
                  return "e" === n.type[n.type.length - 1]
                    ? t[1][0] - l / 2
                    : t[0][0] - l / 2;
                })
                .attr("y", function (n) {
                  return "s" === n.type[0] ? t[1][1] - l / 2 : t[0][1] - l / 2;
                })
                .attr("width", function (n) {
                  return "n" === n.type || "s" === n.type
                    ? t[1][0] - t[0][0] + l
                    : l;
                })
                .attr("height", function (n) {
                  return "e" === n.type || "w" === n.type
                    ? t[1][1] - t[0][1] + l
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
        function c(n, t, e) {
          var r = n.__brush.emitter;
          return !r || (e && r.clean) ? new p(n, t, e) : r;
        }
        function p(n, t, e) {
          (this.that = n),
            (this.args = t),
            (this.state = n.__brush),
            (this.active = 0),
            (this.clean = e);
        }
        function f(e) {
          if ((!t || e.touches) && r.apply(this, arguments)) {
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
              b = e.target.__data__.type,
              v =
                "selection" === (a && e.metaKey ? (b = "overlay") : b)
                  ? lr
                  : a && e.altKey
                  ? cr
                  : sr,
              w = n === gr ? null : wr[b],
              k = n === mr ? null : kr[b],
              E = Mr(y),
              x = E.extent,
              S = E.selection,
              A = x[0][0],
              M = x[0][1],
              R = x[1][0],
              N = x[1][1],
              C = 0,
              B = 0,
              L = w && k && a && e.shiftKey,
              D = Array.from(e.touches || [e], (n) => {
                const t = n.identifier;
                return (
                  ((n = $t(n, y)).point0 = n.slice()), (n.identifier = t), n
                );
              });
            if ("overlay" === b) {
              S && (h = !0);
              const t = [D[0], D[1] || D[0]];
              (E.selection = S = [
                [
                  (o = n === gr ? A : _r(t[0][0], t[1][0])),
                  (l = n === mr ? M : _r(t[0][1], t[1][1])),
                ],
                [
                  (p = n === gr ? R : fr(t[0][0], t[1][0])),
                  (_ = n === mr ? N : fr(t[0][1], t[1][1])),
                ],
              ]),
                D.length > 1 && H();
            } else (o = S[0][0]), (l = S[0][1]), (p = S[1][0]), (_ = S[1][1]);
            (i = o), (u = l), (f = p), (d = _);
            var G = qn(y).attr("pointer-events", "none"),
              F = G.selectAll(".overlay").attr("cursor", yr[b]);
            ge(y);
            var T = c(y, arguments, !0).beforestart();
            if (e.touches) (T.moved = U), (T.ended = I);
            else {
              var P = qn(e.view)
                .on("mousemove.brush", U, !0)
                .on("mouseup.brush", I, !0);
              a && P.on("keydown.brush", O, !0).on("keyup.brush", j, !0),
                Zn(e.view);
            }
            s.call(y), T.start(e, v.name);
          }
          function U(n) {
            for (const t of n.changedTouches || [n])
              for (const n of D)
                n.identifier === t.identifier && (n.cur = $t(t, y));
            if (L && !m && !g && 1 === D.length) {
              const n = D[0];
              pr(n.cur[0] - n[0]) > pr(n.cur[1] - n[1]) ? (g = !0) : (m = !0);
            }
            for (const n of D) n.cur && ((n[0] = n.cur[0]), (n[1] = n.cur[1]));
            (h = !0), ir(n), H(n);
          }
          function H(n) {
            const t = D[0],
              e = t.point0;
            var r;
            switch (((C = t[0] - e[0]), (B = t[1] - e[1]), v)) {
              case ur:
              case lr:
                w && ((C = fr(A - o, _r(R - p, C))), (i = o + C), (f = p + C)),
                  k &&
                    ((B = fr(M - l, _r(N - _, B))), (u = l + B), (d = _ + B));
                break;
              case sr:
                D[1]
                  ? (w &&
                      ((i = fr(A, _r(R, D[0][0]))),
                      (f = fr(A, _r(R, D[1][0]))),
                      (w = 1)),
                    k &&
                      ((u = fr(M, _r(N, D[0][1]))),
                      (d = fr(M, _r(N, D[1][1]))),
                      (k = 1)))
                  : (w < 0
                      ? ((C = fr(A - o, _r(R - o, C))), (i = o + C), (f = p))
                      : w > 0 &&
                        ((C = fr(A - p, _r(R - p, C))), (i = o), (f = p + C)),
                    k < 0
                      ? ((B = fr(M - l, _r(N - l, B))), (u = l + B), (d = _))
                      : k > 0 &&
                        ((B = fr(M - _, _r(N - _, B))), (u = l), (d = _ + B)));
                break;
              case cr:
                w &&
                  ((i = fr(A, _r(R, o - C * w))),
                  (f = fr(A, _r(R, p + C * w)))),
                  k &&
                    ((u = fr(M, _r(N, l - B * k))),
                    (d = fr(M, _r(N, _ + B * k))));
            }
            f < i &&
              ((w *= -1),
              (r = o),
              (o = p),
              (p = r),
              (r = i),
              (i = f),
              (f = r),
              b in br && F.attr("cursor", yr[(b = br[b])])),
              d < u &&
                ((k *= -1),
                (r = l),
                (l = _),
                (_ = r),
                (r = u),
                (u = d),
                (d = r),
                b in vr && F.attr("cursor", yr[(b = vr[b])])),
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
                T.brush(n, v.name));
          }
          function I(n) {
            if ((ar(n), n.touches)) {
              if (n.touches.length) return;
              t && clearTimeout(t),
                (t = setTimeout(function () {
                  t = null;
                }, 500));
            } else
              Jn(n.view, h),
                P.on(
                  "keydown.brush keyup.brush mousemove.brush mouseup.brush",
                  null
                );
            G.attr("pointer-events", "all"),
              F.attr("cursor", yr.overlay),
              E.selection && (S = E.selection),
              Rr(S) && ((E.selection = null), s.call(y)),
              T.end(n, v.name);
          }
          function O(n) {
            switch (n.keyCode) {
              case 16:
                L = w && k;
                break;
              case 18:
                v === sr &&
                  (w && ((p = f - C * w), (o = i + C * w)),
                  k && ((_ = d - B * k), (l = u + B * k)),
                  (v = cr),
                  H());
                break;
              case 32:
                (v !== sr && v !== cr) ||
                  (w < 0 ? (p = f - C) : w > 0 && (o = i - C),
                  k < 0 ? (_ = d - B) : k > 0 && (l = u - B),
                  (v = ur),
                  F.attr("cursor", yr.selection),
                  H());
                break;
              default:
                return;
            }
            ir(n);
          }
          function j(n) {
            switch (n.keyCode) {
              case 16:
                L && ((m = g = L = !1), H());
                break;
              case 18:
                v === cr &&
                  (w < 0 ? (p = f) : w > 0 && (o = i),
                  k < 0 ? (_ = d) : k > 0 && (l = u),
                  (v = sr),
                  H());
                break;
              case 32:
                v === ur &&
                  (n.altKey
                    ? (w && ((p = f - C * w), (o = i + C * w)),
                      k && ((_ = d - B * k), (l = u + B * k)),
                      (v = cr))
                    : (w < 0 ? (p = f) : w > 0 && (o = i),
                      k < 0 ? (_ = d) : k > 0 && (l = u),
                      (v = sr)),
                  F.attr("cursor", yr[b]),
                  H());
                break;
              default:
                return;
            }
            ir(n);
          }
        }
        function _(n) {
          c(this, arguments).moved(n);
        }
        function d(n) {
          c(this, arguments).ended(n);
        }
        function h() {
          var t = this.__brush || { selection: null };
          return (t.extent = hr(e.apply(this, arguments))), (t.dim = n), t;
        }
        return (
          (u.move = function (t, e) {
            t.tween
              ? t
                  .on("start.brush", function (n) {
                    c(this, arguments).beforestart().start(n);
                  })
                  .on("interrupt.brush end.brush", function (n) {
                    c(this, arguments).end(n);
                  })
                  .tween("brush", function () {
                    var t = this,
                      r = t.__brush,
                      o = c(t, arguments),
                      a = r.selection,
                      i = n.input(
                        "function" == typeof e ? e.apply(this, arguments) : e,
                        r.extent
                      ),
                      l = Vt(a, i);
                    function u(n) {
                      (r.selection = 1 === n && null === i ? null : l(n)),
                        s.call(t),
                        o.brush();
                    }
                    return null !== a && null !== i ? u : u(1);
                  })
              : t.each(function () {
                  var t = this,
                    r = arguments,
                    o = t.__brush,
                    a = n.input(
                      "function" == typeof e ? e.apply(t, r) : e,
                      o.extent
                    ),
                    i = c(t, r).beforestart();
                  ge(t),
                    (o.selection = null === a ? null : a),
                    s.call(t),
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
            start: function (n, t) {
              return (
                this.starting
                  ? ((this.starting = !1), this.emit("start", n, t))
                  : this.emit("brush", n),
                this
              );
            },
            brush: function (n, t) {
              return this.emit("brush", n, t), this;
            },
            end: function (n, t) {
              return (
                0 == --this.active &&
                  (delete this.state.emitter, this.emit("end", n, t)),
                this
              );
            },
            emit: function (t, e, r) {
              var o = qn(this.that).datum();
              i.call(
                t,
                this.that,
                new or(t, {
                  sourceEvent: e,
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
              ? ((e = "function" == typeof n ? n : rr(hr(n))), u)
              : e;
          }),
          (u.filter = function (n) {
            return arguments.length
              ? ((r = "function" == typeof n ? n : rr(!!n)), u)
              : r;
          }),
          (u.touchable = function (n) {
            return arguments.length
              ? ((o = "function" == typeof n ? n : rr(!!n)), u)
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
      })(mr)
        .extent([
          [0, 0],
          [this.mainViewWidth, this.mainViewHeight],
        ])
        .on("start brush end", function (n) {
          switch (n.type) {
            case "start":
            case "brush":
              const [r, o] = n.selection,
                a = [e.xScale.invert(r), e.xScale.invert(o)];
              (e.filterBounds = a),
                t(
                  (n) =>
                    n.year >= e.filterBounds[0] && n.year <= e.filterBounds[1]
                );
              break;
            case "end":
              null == n.selection && ((e.filterBounds = null), t(null));
          }
        });
      this.svg
        .append("g")
        .classed("brush", !0)
        .call(a)
        .attr(
          "transform",
          `translate(${e.padding.left}, ${this.viewHeight + e.padding.top})`
        ),
        (this.histG = this.timeG
          .append("g")
          .classed("histogram", !0)
          .attr("transform", `translate(${e.padding.left}, ${e.padding.top})`)),
        e.update(n);
    }
    update(n) {
      const t = (n) => this.xScale(n.x0),
        e = this.yScale.range()[1],
        r = (n) => this.yScale(n.length),
        o = (n) => e - r(n),
        a = (n) => this.xScale(n.x1) - this.xScale(n.x0),
        i = m()
          .value((n) => n.year)
          .domain(this.xScale.domain())
          .thresholds(this.xScale.ticks(20))(n);
      this.histG
        .selectAll("rect")
        .data(i)
        .join("rect")
        .transition()
        .attr("x", t)
        .attr("y", o)
        .attr("height", r)
        .attr("width", a)
        .duration(600)
        .attr("fill", gl(0.5))
        .attr("stroke", "black"),
        this.histG
          .selectAll("text")
          .data(i)
          .join("text")
          .attr("class", "bar-label")
          .attr("text-anchor", "middle")
          .transition()
          .attr("x", (n) => t(n) + a(n) / 2)
          .attr("y", (n) => o(n) - 5)
          .duration(600)
          .text((n) => (0 == n.length ? "" : n.length.toString()));
    }
  }
  function Vl(n, t) {
    const e = {};
    return (
      n.forEach((n) => {
        n[t].forEach((n) => {
          e[n] ? (e[n] += 1) : (e[n] = 1);
        });
      }),
      Object.entries(e).map(([n, t]) => ({ word: n, val: t }))
    );
  }
  function $l(n, t) {
    n.each(function () {
      for (
        var n,
          e = qn(this),
          r = e.text().split(/\s+/).reverse(),
          o = [],
          a = e.attr("x"),
          i = e.attr("y"),
          l = e.text(null).append("tspan").attr("x", a).attr("y", i);
        (n = r.pop());

      )
        o.push(n),
          l.text(o.join(" ")),
          l.node().getComputedTextLength() > t &&
            (o.pop(),
            l.text(o.join(" ")),
            (o = [n]),
            (l = e
              .append("tspan")
              .attr("x", 0)
              .attr("y", i)
              .attr("dy", "1.1em")
              .text(n)));
    });
  }
  function Wl(n) {
    return !n || /^\s*$/.test(n);
  }
  function Xl(n, t) {
    if (n === t) return !0;
    if (null == n || null == t) return !1;
    if (n.length !== t.length) return !1;
    for (var e = 0; e < n.length; ++e) if (n[e] !== t[e]) return !1;
    return !0;
  }
  const ql = "No common depicted words!";
  class Yl {
    constructor(n, t) {
      (this.allData = t),
        (this.viewWidth = Hl / 4),
        (this.viewHeight = Ul / 3),
        (this.wordColors = {}),
        (this.depictsTooltip = qn("body")
          .append("div")
          .classed("depicts-tooltip", !0)),
        (this.depictsG = n
          .append("g")
          .classed("depicts", !0)
          .attr("transform", `translate(0, ${(2 * Ul) / 3})`));
    }
    initialize(n) {
      let t = Vl(n, "depicts")
        .filter((n) => 1 != n.val)
        .map((n) => n.word);
      t.push(ql);
      for (const n of t)
        this.wordColors[n] || (this.wordColors[n] = Tl(Math.random()));
      this.update(n);
    }
    update(n) {
      let t = Vl(n, "depicts").filter((n) => 1 != n.val);
      t.push({ word: ql, val: 0 });
      const e = (function () {
        var n = Vi,
          t = $i;
        function e(e) {
          var r,
            o,
            a,
            i,
            l,
            u,
            s,
            c = Array.from(e),
            p = c.length,
            f = new Map();
          for (o = 0; o < p; ++o)
            (r = c[o]),
              (l = c[o] = new ki(r)),
              null != (u = n(r, o, e)) &&
                (u += "") &&
                ((s = l.id = u), f.set(s, f.has(s) ? zi : l)),
              null != (u = t(r, o, e)) && (u += "") && (l.parent = u);
          for (o = 0; o < p; ++o)
            if ((u = (l = c[o]).parent)) {
              if (!(i = f.get(u))) throw new Error("missing: " + u);
              if (i === zi) throw new Error("ambiguous: " + u);
              i.children ? i.children.push(l) : (i.children = [l]),
                (l.parent = i);
            } else {
              if (a) throw new Error("multiple roots");
              a = l;
            }
          if (!a) throw new Error("no root");
          if (
            ((a.parent = Ki),
            a
              .eachBefore(function (n) {
                (n.depth = n.parent.depth + 1), --p;
              })
              .eachBefore(wi),
            (a.parent = null),
            p > 0)
          )
            throw new Error("cycle");
          return a;
        }
        return (
          (e.id = function (t) {
            return arguments.length ? ((n = Ti(t)), e) : n;
          }),
          (e.parentId = function (n) {
            return arguments.length ? ((t = Ti(n)), e) : t;
          }),
          e
        );
      })()
        .id((n) => n.word)
        .parentId((n) => (n.word == ql ? null : ql))(t);
      e.sum((n) => n.val).sort((n, t) => t.value - n.value);
      const r = (function () {
          var n = Yi,
            t = !1,
            e = 1,
            r = 1,
            o = [0],
            a = Pi,
            i = Pi,
            l = Pi,
            u = Pi,
            s = Pi;
          function c(n) {
            return (
              (n.x0 = n.y0 = 0),
              (n.x1 = e),
              (n.y1 = r),
              n.eachBefore(p),
              (o = [0]),
              t && n.eachBefore(Wi),
              n
            );
          }
          function p(t) {
            var e = o[t.depth],
              r = t.x0 + e,
              c = t.y0 + e,
              p = t.x1 - e,
              f = t.y1 - e;
            p < r && (r = p = (r + p) / 2),
              f < c && (c = f = (c + f) / 2),
              (t.x0 = r),
              (t.y0 = c),
              (t.x1 = p),
              (t.y1 = f),
              t.children &&
                ((e = o[t.depth + 1] = a(t) / 2),
                (r += s(t) - e),
                (c += i(t) - e),
                (p -= l(t) - e) < r && (r = p = (r + p) / 2),
                (f -= u(t) - e) < c && (c = f = (c + f) / 2),
                n(t, r, c, p, f));
          }
          return (
            (c.round = function (n) {
              return arguments.length ? ((t = !!n), c) : t;
            }),
            (c.size = function (n) {
              return arguments.length ? ((e = +n[0]), (r = +n[1]), c) : [e, r];
            }),
            (c.tile = function (t) {
              return arguments.length ? ((n = Ti(t)), c) : n;
            }),
            (c.padding = function (n) {
              return arguments.length
                ? c.paddingInner(n).paddingOuter(n)
                : c.paddingInner();
            }),
            (c.paddingInner = function (n) {
              return arguments.length
                ? ((a = "function" == typeof n ? n : Ui(+n)), c)
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
                ? ((i = "function" == typeof n ? n : Ui(+n)), c)
                : i;
            }),
            (c.paddingRight = function (n) {
              return arguments.length
                ? ((l = "function" == typeof n ? n : Ui(+n)), c)
                : l;
            }),
            (c.paddingBottom = function (n) {
              return arguments.length
                ? ((u = "function" == typeof n ? n : Ui(+n)), c)
                : u;
            }),
            (c.paddingLeft = function (n) {
              return arguments.length
                ? ((s = "function" == typeof n ? n : Ui(+n)), c)
                : s;
            }),
            c
          );
        })().size([this.viewWidth, this.viewHeight])(e),
        o = this,
        a = this.depictsG
          .selectAll("g")
          .data(r)
          .join("g")
          .attr("transform", (n) => `translate(${n.x0}, ${n.y0})`)
          .on("mouseenter", function (n, t) {
            o.depictsTooltip.text(t.data.word);
          })
          .on("mousemove", function (n) {
            o.depictsTooltip.attr(
              "style",
              `position: absolute; \n           top: ${
                n.clientY - 10
              }px; \n           left: ${
                n.clientX + 10
              }px; \n           background-color: #fff;`
            );
          })
          .on("mouseleave", function () {
            o.depictsTooltip.attr("style", "visibility: hidden;");
          });
      a
        .selectAll("rect")
        .data((n) => n)
        .join("rect")
        .attr("cursor", "help")
        .attr("width", (n) => n.x1 - n.x0)
        .attr("height", (n) => n.y1 - n.y0)
        .attr("stroke", "black")
        .attr("fill", (n) => o.wordColors[n.data.word]),
        a
          .selectAll("text")
          .data((n) => n)
          .join("text")
          .attr("class", "depicts-words")
          .attr("text-anchor", "middle")
          .attr("style", "text-shadow: 0 0 2px black;")
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
  class Zl {
    constructor(n, t, e) {
      (this.clusterView = n),
        (this.activeAttr = t),
        (this.attrMap = e),
        (this.toggleButtonG = n.navG
          .append("g")
          .classed("cluster-nav-buttons", !0));
    }
    setActiveAttr(n) {
      (this.activeAttr = n), this.refresh();
    }
    refresh() {
      (this.clusterView.attrToFilter = this.activeAttr),
        this.clusterView.reInitialize();
    }
    render() {
      const n = this,
        t = n.clusterView.viewWidth / 8 - 10,
        e = n.clusterView.viewHeight / 16 - 10,
        r = this.toggleButtonG
          .selectAll(".toggle-buttons")
          .data(Object.keys(this.attrMap))
          .join("g")
          .classed("toggle-buttons", !0)
          .attr("id", (t) => n.attrMap[t] + "_button")
          .attr(
            "transform",
            (n, e) => `translate(${((n, e) => e * t + 10 * (e + 1))(0, e)}, 0)`
          )
          .on("click", function (t, e) {
            n.activeAttr !== e &&
              (qn(this).select("rect").attr("fill", "steelblue"),
              qn(`#${n.attrMap[n.activeAttr]}_button`)
                .select("rect")
                .attr("fill", "#ccc"),
              n.setActiveAttr(e));
          });
      r
        .append("rect")
        .attr("width", t)
        .attr("height", e)
        .attr("fill", (t) => (n.activeAttr === t ? "steelblue" : "#ccc"))
        .attr("rx", 10),
        r
          .append("text")
          .attr("class", "button-text")
          .attr("y", (e / 2) * 1.25)
          .attr("x", t / 2)
          .attr("text-anchor", "middle")
          .attr("font-weight", "bold")
          .attr("fill", "white")
          .text((t) => n.attrMap[t]);
    }
  }
  class Jl {
    constructor(n, t) {
      (this.currentData = t),
        (this.npaintings = t.length),
        (this.viewWidth = Hl / 2),
        (this.viewHeight = Ul),
        (this.filter = null),
        (this.attrToFilter = "locLabel"),
        (this.groupsToFilter = new Map()),
        (this.colorGroup = {}),
        (this.otherKeys = []),
        (this.clusterG = n
          .append("g")
          .classed("cluster", !0)
          .attr("display", "block")
          .attr("transform", `translate(${Hl / 4}, 0)`)),
        (this.navG = this.clusterG.append("g").classed("cluster-nav", !0)),
        (this.filterByG = this.navG
          .append("g")
          .classed("cluster-filterBy", !0)
          .attr("transform", `translate(0, ${(1.4 * this.viewHeight) / 16})`)),
        (this.bubblesG = this.clusterG
          .append("g")
          .classed("bubbles", !0)
          .attr("transform", `translate(0, ${Ul / 4})`));
    }
    toggle(n, t) {
      t
        ? void 0 === this.groupsToFilter.get("others")
          ? (this.groupsToFilter.set("others", this.otherKeys),
            qn("#others").style("font-weight", "bold"),
            this.otherKeys.forEach((n) => {
              qn("#" + n.replace(/ /g, "")).style("font-weight", "bold"),
                this.groupsToFilter.set(n, n);
            }))
          : (this.groupsToFilter.delete("others"),
            qn("#others").style("font-weight", "normal"),
            this.otherKeys.forEach((n) => {
              qn("#" + n.replace(/ /g, "")).style("font-weight", "normal"),
                this.groupsToFilter.delete(n);
            }))
        : this.groupsToFilter.has(n)
        ? (qn("#" + n.replace(/ /g, "")).style("font-weight", "normal"),
          this.groupsToFilter.delete(n))
        : (qn("#" + n.replace(/ /g, "")).style("font-weight", "bold"),
          this.groupsToFilter.set(n, n));
    }
    updateFilters() {
      if (0 == this.groupsToFilter.size)
        qn(".filterBy-title").text("Currently filtering by (0):"),
          qn(".filterBy-text").text("No filters applied."),
          this.filter(null);
      else {
        let n = Array.from(this.groupsToFilter.keys());
        const t = n.length,
          e = t > 25 ? n.slice(0, 25).join(" | ") + " ..." : n.join(" | ");
        qn(".filterBy-title").text(`Currently filtering by (${t}):`),
          qn(".filterBy-text")
            .text(e)
            .call($l, this.viewWidth / 2),
          this.filter(
            (t) => n.filter((n) => t[this.attrToFilter].includes(n)).length > 0
          );
      }
    }
    groupByAttr(n) {
      let e = [];
      n.forEach((n, t) =>
        n[this.attrToFilter].forEach((n) =>
          e.push({
            id: t,
            group: n,
            other: !1,
            value: Math.floor(2 * Math.random()) + 1,
          })
        )
      );
      let r = (function (n, ...e) {
          return (function (n, t, e, r) {
            return (function n(o, a) {
              if (a >= r.length) return e(o);
              const i = new Map(),
                l = r[a++];
              let u = -1;
              for (const n of o) {
                const t = l(n, ++u, o),
                  e = i.get(t);
                e ? e.push(n) : i.set(t, [n]);
              }
              for (const [t, e] of i) i.set(t, n(e, a));
              return t(i);
            })(n, 0);
          })(n, t, t, e);
        })(e, (n) => n.group),
        o = [],
        a = [];
      return (
        r.forEach((t, e) => {
          if (t.length <= n.length / 20) {
            const n = t.map((n) => ((n.other = !0), n));
            o.push(...n), a.push(e);
          }
        }),
        (this.otherKeys = a),
        o.length > 0 && (r.set("others", o), a.forEach((n) => r.delete(n))),
        r
      );
    }
    drawClusters(n, t) {
      const e = this,
        r = this.viewHeight / 4 / t.length,
        o = gi({ children: Array.from(n, ([, n]) => ({ children: n })) }),
        a = (() =>
          (function () {
            var n = null,
              t = 1,
              e = 1,
              r = Pi;
            function o(o) {
              return (
                (o.x = t / 2),
                (o.y = e / 2),
                n
                  ? o.eachBefore(Ii(n)).eachAfter(Oi(r, 0.5)).eachBefore(ji(1))
                  : o
                      .eachBefore(Ii(Hi))
                      .eachAfter(Oi(Pi, 1))
                      .eachAfter(Oi(r, o.r / Math.min(t, e)))
                      .eachBefore(ji(Math.min(t, e) / (2 * o.r))),
                o
              );
            }
            return (
              (o.radius = function (t) {
                return arguments.length ? ((n = Fi(t)), o) : n;
              }),
              (o.size = function (n) {
                return arguments.length
                  ? ((t = +n[0]), (e = +n[1]), o)
                  : [t, e];
              }),
              (o.padding = function (n) {
                return arguments.length
                  ? ((r = "function" == typeof n ? n : Ui(+n)), o)
                  : r;
              }),
              o
            );
          })()
            .size([this.viewWidth, (3 * this.viewHeight) / 4])
            .padding(1)(o.sum((n) => n.value)))();
      this.navG
        .selectAll(".cluster-legend")
        .transition()
        .style("opacity", 0)
        .duration(50)
        .remove(),
        this.navG
          .append("g")
          .classed("cluster-legend", !0)
          .call((o) => {
            const a = o
              .attr("transform", `translate(${this.viewWidth},0)`)
              .attr("text-anchor", "end")
              .selectAll("g")
              .data(
                t.sort(function (t, e) {
                  return n.get(e).length - n.get(t).length;
                })
              )
              .join("g")
              .attr("id", (n) => n.replace(/ /g, ""))
              .attr("transform", (n, t) => `translate(0,${t * r + 2})`)
              .style("font-weight", (n) =>
                void 0 !== e.groupsToFilter.get(n) ? "bold" : "normal"
              );
            a
              .append("rect")
              .attr("x", -15)
              .attr("width", 15)
              .attr("height", r - 4)
              .attr("fill", (n) => e.colorGroup[n]),
              a
                .append("text")
                .attr("class", "legend-text")
                .attr("x", -20)
                .attr("y", r / 2)
                .attr("dy", "0.15em")
                .text((t) => `${t} (${n.get(t).length})`);
          })
          .transition()
          .style("opacity", 1)
          .duration(50),
        this.bubblesG.selectAll("*").remove();
      const i = this.bubblesG
        .selectAll("g")
        .data(a.descendants().filter((n) => 1 === n.height))
        .join("g")
        .attr("class", "bubble-group")
        .attr("fill", function (n) {
          const t = n.leaves()[0].data,
            r = t.other;
          let o = t.group;
          return (
            r && (o = "others"),
            void 0 !== e.groupsToFilter.get(o) ? "#ccc" : "white"
          );
        })
        .on("click", function (n, t) {
          const r = t.leaves()[0].data,
            o = r.other;
          let a = r.group;
          e.toggle(a, o),
            o && (a = "others"),
            qn(this).attr("fill", () =>
              void 0 !== e.groupsToFilter.get(a) ? "#ccc" : "white"
            ),
            e.updateFilters();
        });
      i
        .append("circle")
        .attr("class", "group-outline")
        .attr("cx", (n) => n.x)
        .attr("cy", (n) => n.y)
        .attr("r", (n) => n.r),
        i
          .selectAll(null)
          .data((n) => n.leaves())
          .enter()
          .append("circle")
          .attr("class", "bubble")
          .attr("cx", (n) => n.x)
          .attr("cy", (n) => n.y)
          .attr("r", (n) => n.r)
          .attr("fill", (n) => e.colorGroup[n.data.group])
          .attr("opacity", 0.8);
    }
    reInitialize() {
      (this.groupsToFilter = new Map()), this.updateFilters();
      const n = Vl(this.currentData, this.attrToFilter),
        t = pl(Il);
      n.forEach((n) => (this.colorGroup[n.word] = t(n.word))),
        (this.colorGroup.others = "#ccc");
      const e = this.groupByAttr(this.currentData),
        r = Array.from(e.keys());
      this.drawClusters(e, r);
    }
    initialize(n, t) {
      const e = this;
      (this.currentData = n), (this.filter = t);
      const r = new Zl(this, "locLabel", {
          locLabel: "Location",
          materialLabel: "Material",
          movement: "Movement",
          genreLabel: "Genre",
        }),
        o = this.filterByG
          .append("text")
          .attr("class", "filterBy-title")
          .attr("transform", "translate(10, 0)")
          .text("Currently filtering by (0):");
      this.filterByG
        .append("text")
        .attr("class", "filterBy-reset")
        .attr("transform", `translate(${this.viewWidth / 2}, 0)`)
        .attr("text-anchor", "end")
        .text("Reset")
        .on("click", () => e.reInitialize()),
        this.filterByG
          .append("text")
          .attr("class", "filterBy-text")
          .attr("transform", `translate(10, ${o.node().getBBox().height})`),
        r.render(),
        r.refresh();
    }
    update(n) {
      if (n.length <= 0) this.clusterG.attr("display", "none");
      else {
        if (!Xl(n, this.currentData)) {
          (this.currentData = n), (this.npaintings = n.length);
          const t = this.groupByAttr(n),
            e = Array.from(t.keys());
          this.drawClusters(t, e);
        }
        this.clusterG.attr("display", "block");
      }
    }
  }
  class Ql {
    constructor(n, t) {
      (this.svg = n),
        (this.currentData = t),
        (this.npaintings = t.length),
        (this.paintingNumber = 0),
        (this.viewWidth = Hl / 4),
        (this.viewHeight = Ul),
        (this.paintingG = n
          .append("g")
          .classed("painting", !0)
          .attr("transform", `translate(${(3 * Hl) / 4}, 0)`)),
        (this.arrowG = this.paintingG.append("g").classed("arrows", !0)),
        (this.displayG = this.paintingG
          .append("g")
          .classed("display-info", !0)
          .attr("display", "block")
          .attr("transform", `translate(0, ${this.viewHeight / 8})`));
    }
    addText(n, t, e, r) {
      return this.displayG
        .append("text")
        .attr("class", n)
        .attr("transform", `translate(${t}, ${e})`)
        .text(r)
        .call($l, (3 * this.viewWidth) / 4);
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
        t = n.artworkLabel.trim(),
        e = n.year,
        r = n.locLabel,
        o = n.collectionLabel,
        a = n.movement,
        i = n.genreLabel,
        l = n.materialLabel,
        u = n.creatorLabel.trim(),
        s = n.creatorBirthPlaceLabel.trim(),
        c = n.creatorCountry.trim(),
        p = n.wikidataUrl.trim();
      let f = n.image.trim(),
        _ = { width: 1500, height: 1500 };
      try {
        _ = await ((d = f),
        new Promise((n, t) => {
          let e = new Image();
          (e.onload = () => n(e)), (e.onerror = () => t()), (e.src = d);
        }));
      } catch (n) {
        (f = "src/assets/default-placeholder.png"), console.log(n);
      }
      var d;
      this.displayG.selectAll("*").remove();
      const h = `${Wl(t) || /Q[0-9]+$/.test(t) ? "Unknown Title" : t} (${
        Wl(e) ? "Unknown" : e
      })`;
      let m = this.addText("title", this.viewWidth / 2, 0, h);
      m.attr("text-anchor", "middle").on("click", function () {
        window.open(p, "_blank");
      });
      const g = m.node().getBBox();
      let y = this.viewWidth / 2,
        b = (y / _.width) * _.height;
      b <= 0
        ? (b = 50)
        : b >= 250 && ((b = 250), (y = (b / _.height) * _.width));
      const v = (this.viewWidth - y) / 2,
        w = g.height - 5;
      let k = qn("#paintingModal");
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
        .attr("transform", `translate(${v - 5}, ${w - 5})`)
        .attr("width", y + 10)
        .attr("height", b + 10)
        .attr("fill", gl(0.5))
        .attr("opacity", "0");
      this.displayG
        .append("svg:image")
        .attr("id", "preview")
        .attr("href", () => f)
        .attr("transform", `translate(${v}, ${w})`)
        .attr("width", y)
        .attr("height", b)
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
        S = w + b + 30;
      S += this.addText("artist-title", x, S, "Artist").node().getBBox().height;
      const A = [Wl(u) ? "Unknown Artist" : u, Wl(s) ? "" : s, Wl(c) ? "" : c]
        .filter(Boolean)
        .join("; ");
      let M =
        S + this.addText("artist-info", x, S, A).node().getBBox().height + 5;
      M += this.addText("coll-title", x, M, "Collection").node().getBBox()
        .height;
      const R = Wl(r) ? "Unknown" : r;
      o.filter((n) => n !== R).push(R);
      const N = o.join("; ");
      let C =
        M + this.addText("coll-info", x, M, N).node().getBBox().height + 5;
      C += this.addText("movement-title", x, C, "Movement").node().getBBox()
        .height;
      const B = Wl(a[0]) ? "Unknown" : a.join("; ");
      let L =
        C + this.addText("movement-info", x, C, B).node().getBBox().height + 5;
      L += this.addText("genre-title", x, L, "Genre").node().getBBox().height;
      const D = Wl(i[0]) ? "Unknown" : i.join("; ");
      let G =
        L + this.addText("genre-info", x, L, D).node().getBBox().height + 5;
      G += this.addText("material-title", x, G, "Material").node().getBBox()
        .height;
      const F = Wl(l[0]) ? "Unknown" : l.join("; ");
      this.addText("material-info", x, G, F);
    }
    initialize() {
      const n = this,
        t = n.viewHeight / 16,
        e = n.viewHeight / 16;
      let r = [n.viewWidth / 2, n.viewHeight / 32];
      this.arrowG
        .append("text")
        .attr("class", "counter")
        .attr("transform", `translate(${r[0]}, ${r[1]})`)
        .attr("text-anchor", "middle")
        .text(`${n.paintingNumber + 1} / ${n.npaintings}`),
        (r = [n.viewWidth / 2, 1.25 * e]),
        this.arrowG
          .append("text")
          .attr("class", "random")
          .attr("transform", `translate(${r[0]}, ${r[1]})`)
          .attr("text-anchor", "middle")
          .text("Random")
          .on("click", () => {
            "none" !== n.displayG.style("display") &&
              ((n.paintingNumber = Math.floor(
                Math.random() * Math.floor(n.npaintings)
              )),
              n.loadPainting());
          });
      const o = [n.viewWidth / 3 - t / 2, e / 4];
      let a = this.arrowG
        .append("rect")
        .attr("transform", `translate(${o[0] + t / 4}, ${o[1]})`)
        .attr("width", t / 2)
        .attr("height", e)
        .attr("fill", gl(0.5))
        .attr("opacity", "0");
      this.arrowG
        .append("svg:image")
        .attr("id", "left-arrow")
        .attr("xlink:href", "src/assets/left-arrow.svg")
        .attr("transform", `translate(${o[0]}, ${o[1]})`)
        .attr("width", t)
        .attr("height", e)
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
      const i = [(2 * n.viewWidth) / 3 - t / 2, e / 4];
      let l = this.arrowG
        .append("rect")
        .attr("transform", `translate(${i[0] + t / 4}, ${i[1]})`)
        .attr("width", t / 2)
        .attr("height", e)
        .attr("fill", gl(0.5))
        .attr("opacity", "0");
      this.arrowG
        .append("svg:image")
        .attr("id", "right-arrow")
        .attr("xlink:href", "src/assets/right-arrow.svg")
        .attr("transform", `translate(${i[0]}, ${i[1]})`)
        .attr("width", t)
        .attr("height", e)
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
        this.loadPainting();
    }
    update(n) {
      n.length <= 0
        ? (this.arrowG.select("text").text("0 / 0"),
          this.displayG.style("display", "none"))
        : (Xl(n, this.currentData)
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
  (window.onresize = (function (n, t, e) {
    var r;
    return function () {
      var o = this,
        a = arguments,
        i = function () {
          (r = null), e || n.apply(o, a);
        },
        l = e && !r;
      clearTimeout(r), (r = setTimeout(i, t)), l && n.apply(o, a);
    };
  })(function () {
    location.reload();
  }, 250)),
    (async function () {
      let n = await jr("src/data/data-to-visualize.csv");
      n.forEach((n) => {
        (n.year = parseInt(n.year)),
          (n.depicts = n.depicts.split(";").map((n) => n.trim())),
          (n.locLabel = n.locLabel.split(";").map((n) => n.trim())),
          (n.collectionLabel = n.collectionLabel
            .split(";")
            .map((n) => n.trim())),
          (n.movement = n.movement.split(";").map((n) => n.trim())),
          (n.genreLabel = n.genreLabel.split(";").map((n) => n.trim())),
          (n.materialLabel = n.materialLabel.split(";").map((n) => n.trim()));
      }),
        qn("body").attr("style", "margin: 0px;");
      let t = qn("body")
        .append("svg")
        .attr("height", Ul)
        .attr("width", Hl)
        .attr("transform", "translate(5,5)");
      const e = new jl(t, n),
        r = new zl(t, n),
        o = new Yl(t, n),
        a = new Ql(t, n),
        i = new Jl(t, n),
        l = { map: e, time: r, depicts: o, painting: a, cluster: i },
        u = {};
      function s(t) {
        let e = n;
        for (const [n, r] of Object.entries(u))
          r && n != t && (e = e.filter(r));
        return e;
      }
      function c(n) {
        return function (t) {
          (u[n] = t),
            (function () {
              for (const n of Object.keys(l)) l[n].update(s(n));
            })();
        };
      }
      e.initialize(n, c("map")),
        r.initialize(n, c("time")),
        o.initialize(n),
        i.initialize(n, c("cluster")),
        a.initialize();
    })();
})();

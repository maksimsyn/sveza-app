/* eslint-disable */
import picturefill from 'picturefill';
!function (a) {
  'use strict';
  var b, c = 0, d = function () {
    window.picturefill && a(window.picturefill), (window.picturefill || c > 9999) && clearInterval(b), c++;
  };
  b = setInterval(d, 8), d();
}(function (a) {
  'use strict';
  var b = window.document, c = window.Element, d = window.MutationObserver, e = function () {
    }, f = {disconnect: e, take: e, observe: e, start: e, stop: e, connected: !1},
    g = /^loade|^c|^i/.test(b.readyState || ''), h = a._;
  if (h.mutationSupport = !1, h.observer = f, Object.keys && window.HTMLSourceElement && b.addEventListener) {
    var i, j, k, l, m = {src: 1, srcset: 1, sizes: 1, media: 1}, n = Object.keys(m),
      o = {attributes: !0, childList: !0, subtree: !0, attributeFilter: n}, p = c && c.prototype, q = {},
      r = function (a, b) {
        q[a] = h[a], h[a] = b;
      };
    p && !p.matches && (p.matches = p.matchesSelector || p.mozMatchesSelector || p.webkitMatchesSelector || p.msMatchesSelector), p && p.matches && (i = function (a, b) {
      return a.matches(b);
    }, h.mutationSupport = !(!Object.create || !Object.defineProperties)), h.mutationSupport && (f.observe = function () {
      k && (f.connected = !0, j && j.observe(b.documentElement, o));
    }, f.disconnect = function () {
      f.connected = !1, j && j.disconnect();
    }, f.take = function () {
      j ? h.onMutations(j.takeRecords()) : l && l.take();
    }, f.start = function () {
      k = !0, f.observe();
    }, f.stop = function () {
      k = !1, f.disconnect();
    }, r('setupRun', function () {
      return f.disconnect(), q.setupRun.apply(this, arguments);
    }), r('teardownRun', function () {
      var a = q.setupRun.apply(this, arguments);
      return f.observe(), a;
    }), r('setSrc', function () {
      var a, b = f.connected;
      return f.disconnect(), a = q.setSrc.apply(this, arguments), b && f.observe(), a;
    }), h.onMutations = function (a) {
      var b, c, d = [];
      for (b = 0, c = a.length; c > b; b++) g && 'childList' === a[b].type ? h.onSubtreeChange(a[b], d) : 'attributes' === a[b].type && h.onAttrChange(a[b], d);
      d.length && h.fillImgs({elements: d, reevaluate: !0});
    }, h.onSubtreeChange = function (a, b) {
      h.findAddedMutations(a.addedNodes, b), h.findRemovedMutations(a.removedNodes, a.target, b);
    }, h.findAddedMutations = function (a, b) {
      var c, d, e, f;
      for (c = 0, d = a.length; d > c; c++) e = a[c], 1 === e.nodeType && (f = e.nodeName.toUpperCase(), 'PICTURE' === f ? h.addToElements(e.getElementsByTagName('img')[0], b) : 'IMG' === f && i(e, h.selShort) ? h.addToElements(e, b) : 'SOURCE' === f ? h.addImgForSource(e, e.parentNode, b) : h.addToElements(h.qsa(e, h.selShort), b));
    }, h.findRemovedMutations = function (a, b, c) {
      var d, e, f;
      for (d = 0, e = a.length; e > d; d++) f = a[d], 1 === f.nodeType && 'SOURCE' === f.nodeName.toUpperCase() && h.addImgForSource(f, b, c);
    }, h.addImgForSource = function (a, b, c) {
      b && 'PICTURE' !== (b.nodeName || '').toUpperCase() && (b = b.parentNode, b && 'PICTURE' === (b.nodeName || '').toUpperCase() || (b = null)), b && h.addToElements(b.getElementsByTagName('img')[0], c);
    }, h.addToElements = function (a, b) {
      var c, d;
      if (a) if ('length' in a && !a.nodeType) for (c = 0, d = a.length; d > c; c++) h.addToElements(a[c], b); else a.parentNode && -1 === b.indexOf(a) && b.push(a);
    }, h.onAttrChange = function (a, b) {
      var c, d = a.target[h.ns];
      d || 'srcset' !== a.attributeName || 'IMG' !== (c = a.target.nodeName.toUpperCase()) ? d && (c || (c = a.target.nodeName.toUpperCase()), 'IMG' === c ? (a.attributeName in d && (d[a.attributeName] = void 0), h.addToElements(a.target, b)) : 'SOURCE' === c && h.addImgForSource(a.target, a.target.parentNode, b)) : h.addToElements(a.target, b);
    }, h.supPicture || (d && !h.testMutationEvents ? j = new d(h.onMutations) : (l = function () {
      var a = !1, b = [], c = window.setImmediate || window.setTimeout;
      return function (d) {
        a || (a = !0, l.take || (l.take = function () {
          b.length && (h.onMutations(b), b = []), a = !1;
        }), c(l.take)), b.push(d);
      };
    }(), b.documentElement.addEventListener('DOMNodeInserted', function (a) {
      f.connected && g && l({type: 'childList', addedNodes: [a.target], removedNodes: []});
    }, !0), b.documentElement.addEventListener('DOMNodeRemoved', function (a) {
      f.connected && g && 'SOURCE' === (a.target || {}).nodeName && l({
        type: 'childList',
        addedNodes: [],
        removedNodes: [a.target],
        target: a.target.parentNode
      });
    }, !0), b.documentElement.addEventListener('DOMAttrModified', function (a) {
      f.connected && m[a.attrName] && l({type: 'attributes', target: a.target, attributeName: a.attrName});
    }, !0)), window.HTMLImageElement && Object.defineProperties && !function () {
      var a = b.createElement('img'), c = [], d = a.getAttribute, e = a.setAttribute, f = {src: 1};
      h.supSrcset && !h.supSizes && (f.srcset = 1), Object.defineProperties(HTMLImageElement.prototype, {
        getAttribute: {
          value: function (a) {
            var b;
            return f[a] && (b = this[h.ns]) && void 0 !== b[a] ? b[a] : d.apply(this, arguments);
          }, writeable: !0, enumerable: !0, configurable: !0
        }
      }), h.supSrcset || c.push('srcset'), h.supSizes || c.push('sizes'), c.forEach(function (a) {
        Object.defineProperty(HTMLImageElement.prototype, a, {
          set: function (b) {
            e.call(this, a, b);
          }, get: function () {
            return d.call(this, a) || '';
          }, enumerable: !0, configurable: !0
        });
      }), 'currentSrc' in a || !function () {
        var a, c = function (a, b) {
          null == b && (b = a.src || ''), Object.defineProperty(a, 'pfCurrentSrc', {value: b, writable: !0});
        }, d = c;
        h.supSrcset && window.devicePixelRatio && (a = function (a, b) {
          var c = a.d || a.w || a.res, d = b.d || b.w || b.res;
          return c - d;
        }, c = function (b) {
          var c, e, f, g, i = b[h.ns];
          if (i && i.supported && i.srcset && i.sets && (e = h.parseSet(i.sets[0])) && e.sort) {
            for (e.sort(a), f = e.length, g = e[f - 1], c = 0; f > c; c++) if (e[c].d >= window.devicePixelRatio) {
              g = e[c];
              break;
            }
            g && (g = h.makeUrl(g.url));
          }
          d(b, g);
        }), b.addEventListener('load', function (a) {
          'IMG' === a.target.nodeName.toUpperCase() && c(a.target);
        }, !0), Object.defineProperty(HTMLImageElement.prototype, 'currentSrc', {
          set: function () {
            window.console && console.warn && console.warn('currentSrc can\'t be set on img element');
          }, get: function () {
            return this.complete && c(this), this.src || this.srcset ? this.pfCurrentSrc || '' : '';
          }, enumerable: !0, configurable: !0
        });
      }(), !window.HTMLSourceElement || 'srcset' in b.createElement('source') || ['srcset', 'sizes'].forEach(function (a) {
        Object.defineProperty(window.HTMLSourceElement.prototype, a, {
          set: function (b) {
            this.setAttribute(a, b);
          }, get: function () {
            return this.getAttribute(a) || '';
          }, enumerable: !0, configurable: !0
        });
      });
    }(), f.start()), g || b.addEventListener('DOMContentLoaded', function () {
      g = !0;
    }));
  }
});

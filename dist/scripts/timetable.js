!(function(e, t) {
  'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t('undefined' != typeof exports ? exports : (e.syncscroll = {}));
})(this, function(e) {
  var t = 'Width',
    n = 'Height',
    o = 'Top',
    r = 'Left',
    i = 'scroll',
    a = 'client',
    c = [],
    s = function() {
      var e,
        s,
        l,
        d,
        u,
        f = document.getElementsByClassName('syncscroll');
      for (u in c)
        if (c.hasOwnProperty(u))
          for (e = 0; e < c[u].length; e++)
            c[u][e].removeEventListener('scroll', c[u][e].syn, 0);
      for (e = 0; e < f.length; e++)
        if (((d = 0), (l = f[e]), (u = l.getAttribute('name')))) {
          for (
            l = l.scroller || l, c[u] || (c[u] = []), s = 0;
            s < c[u].length;
            s++
          )
            c[u][s] == l && (d = 1);
          d || c[u].push(l),
            (l.eX = l.eY = 0),
            (function(e, s) {
              e.addEventListener(
                'scroll',
                (e.syn = function() {
                  var l,
                    d,
                    u = c[s],
                    f = e[i + r],
                    h = e[i + o],
                    p = f / (e[i + t] - e[a + t]),
                    m = h / (e[i + n] - e[a + n]),
                    v = 0,
                    E = 0;
                  for (
                    f != e.eX && ((v = 1), (e.eX = f)),
                      h != e.eY && ((E = 1), (e.eY = h)),
                      d = 0;
                    d < u.length;
                    d++
                  )
                    (l = u[d]),
                      l != e &&
                        (v &&
                          ((f = Math.round(p * (l[i + t] - l[a + t]))),
                          (l.eX = l[i + r] = f)),
                        E &&
                          ((h = Math.round(m * (l[i + n] - l[a + n]))),
                          (l.eY = l[i + o] = h)));
                }),
                0
              );
            })(l, u);
        }
    };
  'complete' == document.readyState
    ? s()
    : window.addEventListener('load', s, 0),
    (e.reset = s);
});
var Timetable = function() {
  (this.scope = { hourStart: 9, hourEnd: 17 }),
    (this.locations = []),
    (this.events = []);
};
(Timetable.Renderer = function(e) {
  if (!(e instanceof Timetable))
    throw new Error('Initialize renderer using a Timetable');
  this.timetable = e;
}),
  (function() {
    function e(e, n) {
      return t(e) && t(n);
    }
    function t(e) {
      return n(e) && o(e);
    }
    function n(e) {
      return e === parseInt(e, 10);
    }
    function o(e) {
      return e >= 0 && e < 24;
    }
    function r(e, t) {
      return t.indexOf(e) !== -1;
    }
    function i(e, t) {
      var n = e instanceof Date && t instanceof Date,
        o = e < t;
      return n && o;
    }
    function a(e, t) {
      return t >= e ? t - e : 24 + t - e;
    }
    function c(e) {
      for (; e.firstChild; ) e.removeChild(e.firstChild);
    }
    function s(e) {
      var t = e < 10 ? '0' : '';
      return t + e + ':00';
    }
    (Timetable.prototype = {
      setScope: function(t, n) {
        if (!e(t, n))
          throw new RangeError(
            'Timetable scope should consist of (start, end) in whole hours from 0 to 23'
          );
        return (this.scope.hourStart = t), (this.scope.hourEnd = n), this;
      },
      addLocations: function(e) {
        function t() {
          return e instanceof Array;
        }
        var n = this.locations;
        if (!t()) throw new Error('Tried to add locations in wrong format');
        return (
          e.forEach(function(e) {
            if (r(e, n)) throw new Error('Location already exists');
            n.push(e);
          }),
          this
        );
      },
      addEvent: function(e, t, n, o, a) {
        if (!r(t, this.locations)) throw new Error('Unknown location');
        if (!i(n, o))
          throw new Error('Invalid time range: ' + JSON.stringify([n, o]));
        var c = '[object Object]' === Object.prototype.toString.call(a);
        return (
          this.events.push({
            name: e,
            location: t,
            startDate: n,
            endDate: o,
            options: c ? a : void 0
          }),
          this
        );
      }
    }),
      (Timetable.Renderer.prototype = {
        draw: function(e) {
          function t(e) {
            if (null === e) throw new Error('Timetable container not found');
          }
          function n(e) {
            var t = e.appendChild(document.createElement('aside')),
              n = t.appendChild(document.createElement('ul'));
            o(n);
          }
          function o(e) {
            for (var t = 0; t < m.locations.length; t++) {
              var n = e.appendChild(document.createElement('li')),
                o = n.appendChild(document.createElement('span'));
              (o.className = 'row-heading'), (o.textContent = m.locations[t]);
            }
          }
          function r(e) {
            var t = e.appendChild(document.createElement('section')),
              n = i(t),
              o = t.appendChild(document.createElement('time'));
            (o.className = 'syncscroll'),
              o.setAttribute('name', 'scrollheader');
            var r = n.scrollWidth + 'px';
            l(o, r);
          }
          function i(e) {
            var t = e.appendChild(document.createElement('header'));
            (t.className = 'syncscroll'),
              t.setAttribute('name', 'scrollheader');
            for (
              var n = t.appendChild(document.createElement('ul')),
                o = !1,
                r = !1,
                i = m.scope.hourStart;
              !o;

            ) {
              var a = n.appendChild(document.createElement('li')),
                c = a.appendChild(document.createElement('span'));
              (c.className = 'time-label'),
                (c.textContent = s(i)),
                i !== m.scope.hourEnd ||
                  (m.scope.hourStart === m.scope.hourEnd && !r) ||
                  (o = !0),
                24 === ++i && ((i = 0), (r = !0));
            }
            return t;
          }
          function l(e, t) {
            var n = e.appendChild(document.createElement('ul'));
            (n.style.width = t), (n.className = 'room-timeline');
            for (var o = 0; o < m.locations.length; o++) {
              var r = n.appendChild(document.createElement('li'));
              d(m.locations[o], r);
            }
          }
          function d(e, t) {
            for (var n = 0; n < m.events.length; n++) {
              var o = m.events[n];
              o.location === e && u(o, t);
            }
          }
          function u(e, t) {
            var n,
              o,
              r,
              i = void 0 !== e.options,
              a = !1;
            i &&
              ((n = void 0 !== e.options.url),
              (o = void 0 !== e.options['class']),
              (r = void 0 !== e.options.data),
              (a = void 0 !== e.options.onClick));
            var c = n ? 'a' : 'span',
              s = t.appendChild(document.createElement(c)),
              l = s.appendChild(document.createElement('small'));
            if (((s.title = e.name), n && (s.href = e.options.url), r))
              for (var d in e.options.data)
                s.setAttribute('data-' + d, e.options.data[d]);
            a &&
              s.addEventListener('click', function(t) {
                e.options.onClick(e, m, t);
              }),
              (s.className = o
                ? 'time-entry ' + e.options['class']
                : 'time-entry'),
              (s.style.width = f(e)),
              (s.style.left = p(e)),
              (l.textContent = e.name);
          }
          function f(e) {
            var t = e.startDate,
              n = e.endDate,
              o = h(t, n);
            return (o / v) * 100 + '%';
          }
          function h(e, t) {
            return (t.getTime() - e.getTime()) / 1e3 / 60 / 60;
          }
          function p(e) {
            var t = m.scope.hourStart,
              n = e.startDate.getHours() + e.startDate.getMinutes() / 60,
              o = a(t, n);
            return (o / v) * 100 + '%';
          }
          var m = this.timetable,
            v = a(m.scope.hourStart, m.scope.hourEnd),
            E = document.querySelector(e);
          t(E), c(E), n(E), r(E), syncscroll.reset();
        }
      });
  })();

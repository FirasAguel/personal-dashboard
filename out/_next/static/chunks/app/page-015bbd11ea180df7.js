(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    8808: (e, t, i) => {
      Promise.resolve().then(i.bind(i, 7492));
    },
    7492: (e, t, i) => {
      'use strict';
      i.r(t), i.d(t, { default: () => m });
      var a = i(4565),
        l = i(897),
        d = i(5794),
        n = i.n(d);
      let s = {
          Gabes: { latitude: 33.8833, longitude: 10.1167 },
          Tokyo: { latitude: 35.6895, longitude: 139.6917 },
          Hino: { latitude: 35.6713, longitude: 139.3951 },
          Paris: { latitude: 48.8567, longitude: 2.3522 },
          Porto: { latitude: 41.1621, longitude: -8.622 },
          London: { latitude: 51.5072, longitude: -0.1275 },
          'Le Mans': { latitude: 48.0077, longitude: 0.1984 },
          Essen: { latitude: 51.4508, longitude: 7.0131 },
          Gaza: { latitude: 31.5069, longitude: 34.456 },
          'New York': { latitude: 40.7128, longitude: -74.006 },
          Oita: { latitude: 33.2333, longitude: 131.6067 },
          'Cape Town': { latitude: -33.9253, longitude: 18.4239 },
          Oulu: { latitude: 65.0142, longitude: 25.4719 },
          'Los Angeles': { latitude: 34.1141, longitude: -118.4068 },
          Toulouse: { latitude: 43.6045, longitude: 1.444 },
          Osaka: { latitude: 34.6939, longitude: 135.5022 },
          Kanazawa: { latitude: 36.5611, longitude: 136.6564 },
          Okinawa: { latitude: 26.3342, longitude: 127.8056 },
          Tsuruoka: { latitude: 38.7272, longitude: 139.8267 },
        },
        r = (e) => s[e] || { latitude: 0, longitude: 0 },
        o = (e) => {
          let t = parseInt(('GMT' === e ? 'GMT+0' : e).replace('GMT', ''), 10),
            i = new Date(),
            a = new Date(i.getTime() + 6e4 * i.getTimezoneOffset() + 36e5 * t),
            l = a.getHours().toString().padStart(2, '0'),
            d = a.getMinutes().toString().padStart(2, '0');
          return ''.concat(l, ':').concat(d);
        },
        u = (e) => {
          var t, i, d;
          let { city: s } = e,
            [u, c] = (0, l.useState)(null),
            [h, _] = (0, l.useState)(!0),
            [g, m] = (0, l.useState)(null),
            { latitude: p, longitude: v } = r(s);
          return ((0, l.useEffect)(() => {
            (async () => {
              try {
                if ((_(!0), 0 === p && 0 === v))
                  throw Error(''.concat(s, ' is not supported'));
                let e = 'https://api.open-meteo.com/v1/forecast?latitude='
                    .concat(p, '&longitude=')
                    .concat(
                      v,
                      '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation&hourly=temperature_2m&&daily=sunrise,sunset&timezone=auto'
                    ),
                  t = await fetch(e),
                  i = await t.json();
                c(i);
              } catch (e) {
                m(
                  e instanceof Error
                    ? e.message
                    : 'Failed to fetch weather data'
                );
              } finally {
                _(!1);
              }
            })();
          }, [s]),
          h)
            ? (0, a.jsxs)('div', {
                className: ''.concat(n()['weather-widget'], ' widget'),
                children: ['Loading weather for ', s, '...'],
              })
            : g
              ? (0, a.jsxs)('div', {
                  className: ''.concat(n()['weather-widget'], ' widget'),
                  children: ['Error: ', g],
                })
              : (0, a.jsxs)('div', {
                  className: ''
                    .concat(n()['weather-widget'], ' widget ')
                    .concat(
                      (null == u ? void 0 : u.current.is_day) === 1
                        ? n().day
                        : n().night
                    ),
                  children: [
                    (0, a.jsxs)('div', {
                      className: n().minimal,
                      children: [
                        (0, a.jsx)('h2', { children: s }),
                        (0, a.jsx)('h3', {
                          children: o(
                            null !==
                              (t =
                                null == u ? void 0 : u.timezone_abbreviation) &&
                              void 0 !== t
                              ? t
                              : 'GMT'
                          ),
                        }),
                        (0, a.jsxs)('p', {
                          className: n().hideOnHover,
                          children: [
                            Math.round(
                              null !==
                                (i =
                                  null == u
                                    ? void 0
                                    : u.current.apparent_temperature) &&
                                void 0 !== i
                                ? i
                                : 0
                            ),
                            '\xb0',
                            ' ',
                            null !==
                              (d =
                                null == u
                                  ? void 0
                                  : u.current.relative_humidity_2m) &&
                            void 0 !== d
                              ? d
                              : '--',
                            '%',
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsxs)('div', {
                      className: n().details,
                      children: [
                        (0, a.jsxs)('p', {
                          children: [
                            'Temperature: ',
                            null == u ? void 0 : u.current.temperature_2m,
                            '\xb0C',
                          ],
                        }),
                        (0, a.jsxs)('p', {
                          children: [
                            'Apparent Temperature: ',
                            null == u ? void 0 : u.current.apparent_temperature,
                            '\xb0C',
                          ],
                        }),
                        (0, a.jsxs)('p', {
                          children: [
                            'Humidity: ',
                            null == u ? void 0 : u.current.relative_humidity_2m,
                            '%',
                          ],
                        }),
                        (0, a.jsxs)('p', {
                          children: [
                            'Sunrise: ',
                            null == u
                              ? void 0
                              : u.daily.sunrise[0].split('T')[1],
                          ],
                        }),
                        (0, a.jsxs)('p', {
                          children: [
                            'Sunset: ',
                            null == u
                              ? void 0
                              : u.daily.sunset[0].split('T')[1],
                          ],
                        }),
                      ],
                    }),
                  ],
                });
        };
      var c = i(9831),
        h = i.n(c);
      let _ = (e) => {
          let { onClose: t, children: i, visible: l } = e;
          return (0, a.jsx)('div', {
            className: ''
              .concat(h().modalOverlay, ' ')
              .concat(l ? h().show : h().hide),
            onClick: t,
            children: (0, a.jsxs)('div', {
              className: h().modalContent,
              onClick: (e) => e.stopPropagation(),
              children: [
                (0, a.jsx)('button', {
                  className: h().closeButton,
                  onClick: t,
                  children: '\xd7',
                }),
                i,
              ],
            }),
          });
        },
        g = Object.keys(s).sort();
      function m() {
        let [e, t] = (0, l.useState)(!1),
          [i, d] = (0, l.useState)(['Gabes', 'Tokyo', 'Paris', 'Atlantis']),
          [n, s] = (0, l.useState)('');
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsxs)(_, {
              onClose: () => t(!1),
              visible: e,
              children: [
                (0, a.jsx)('h2', { children: 'Select a City' }),
                (0, a.jsxs)('div', {
                  style: { display: 'flex' },
                  children: [
                    (0, a.jsxs)('select', {
                      onChange: (e) => {
                        s(e.target.value);
                      },
                      children: [
                        g.map((e, t) =>
                          (0, a.jsx)('option', { value: e, children: e }, t)
                        ),
                        (0, a.jsx)('option', {
                          value: 'Add new city',
                          children: 'Add new city',
                        }),
                      ],
                    }),
                    (0, a.jsx)('button', {
                      onClick: () => {
                        'Add new city' === n
                          ? console.log('Handle add new city')
                          : i.includes(n)
                            ? console.log('City widget already displayed')
                            : (d((e) => [...e, n]), t(!1));
                      },
                      children: 'Add',
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsxs)('div', {
              className: 'dashboard',
              children: [
                i.map((e) => (0, a.jsx)(u, { city: e }, e)),
                (0, a.jsx)('div', {
                  className: 'add-widget widget',
                  onClick: () => t(!0),
                  children: '+ Add city',
                }),
              ],
            }),
          ],
        });
      }
    },
    9831: (e) => {
      e.exports = {
        modalOverlay: 'Modal_modalOverlay__2EqPc',
        modalContent: 'Modal_modalContent__cPdxT',
        closeButton: 'Modal_closeButton__YjHCd',
        show: 'Modal_show__W9hUS',
        hide: 'Modal_hide__gq_r7',
      };
    },
    5794: (e) => {
      e.exports = {
        'weather-widget': 'WeatherWidget_weather-widget__fiWsq',
        day: 'WeatherWidget_day__DxjHP',
        night: 'WeatherWidget_night__U46Mr',
        minimal: 'WeatherWidget_minimal__j3kNV',
        details: 'WeatherWidget_details__q0ok8',
        slideIn: 'WeatherWidget_slideIn__NU__n',
        hideOnHover: 'WeatherWidget_hideOnHover__AgCrT',
      };
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [188, 476, 577, 358], () => t(8808)), (_N_E = e.O());
  },
]);

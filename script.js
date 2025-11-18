(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
        i(s);
    new MutationObserver(s => {
        for (const n of s)
            if (n.type === "childList")
                for (const a of n.addedNodes)
                    a.tagName === "LINK" && a.rel === "modulepreload" && i(a)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function o(s) {
        const n = {};
        return s.integrity && (n.integrity = s.integrity),
        s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy),
        s.crossOrigin === "use-credentials" ? n.credentials = "include" : s.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin",
        n
    }
    function i(s) {
        if (s.ep)
            return;
        s.ep = !0;
        const n = o(s);
        fetch(s.href, n)
    }
}
)();
let r = [], c = [], g, $, k, C;
const E = {
    "00": "mazowieckie",
    "01": "mazowieckie",
    "02": "mazowieckie",
    "03": "mazowieckie",
    "04": "mazowieckie",
    "05": "mazowieckie",
    "06": "mazowieckie",
    "07": "mazowieckie",
    "08": "mazowieckie",
    "09": "mazowieckie",
    10: "mazowieckie",
    11: "mazowieckie",
    12: "mazowieckie",
    13: "mazowieckie",
    14: "mazowieckie",
    15: "mazowieckie",
    16: "mazowieckie",
    17: "mazowieckie",
    18: "mazowieckie",
    19: "mazowieckie",
    20: "lubelskie",
    21: "lubelskie",
    22: "lubelskie",
    23: "lubelskie",
    24: "lubelskie",
    25: "świętokrzyskie",
    26: "świętokrzyskie",
    27: "świętokrzyskie",
    28: "świętokrzyskie",
    29: "świętokrzyskie",
    30: "małopolskie",
    31: "małopolskie",
    32: "małopolskie",
    33: "małopolskie",
    34: "małopolskie",
    35: "podkarpackie",
    36: "podkarpackie",
    37: "podkarpackie",
    38: "podkarpackie",
    39: "podkarpackie",
    40: "śląskie",
    41: "śląskie",
    42: "śląskie",
    43: "śląskie",
    44: "śląskie",
    45: "śląskie",
    46: "śląskie",
    47: "śląskie",
    48: "opolskie",
    49: "opolskie",
    50: "dolnośląskie",
    51: "dolnośląskie",
    52: "dolnośląskie",
    53: "dolnośląskie",
    54: "dolnośląskie",
    55: "dolnośląskie",
    56: "dolnośląskie",
    57: "dolnośląskie",
    58: "dolnośląskie",
    59: "dolnośląskie",
    60: "wielkopolskie",
    61: "wielkopolskie",
    62: "wielkopolskie",
    63: "wielkopolskie",
    64: "wielkopolskie",
    65: "wielkopolskie",
    66: "wielkopolskie",
    67: "lubuskie",
    68: "lubuskie",
    69: "lubuskie",
    70: "zachodniopomorskie",
    71: "zachodniopomorskie",
    72: "zachodniopomorskie",
    73: "zachodniopomorskie",
    74: "zachodniopomorskie",
    75: "zachodniopomorskie",
    76: "zachodniopomorskie",
    77: "zachodniopomorskie",
    78: "zachodniopomorskie",
    80: "pomorskie",
    81: "pomorskie",
    82: "pomorskie",
    83: "pomorskie",
    84: "pomorskie",
    85: "kujawsko-pomorskie",
    86: "kujawsko-pomorskie",
    87: "kujawsko-pomorskie",
    88: "kujawsko-pomorskie",
    89: "kujawsko-pomorskie",
    90: "łódzkie",
    91: "łódzkie",
    92: "łódzkie",
    93: "łódzkie",
    94: "łódzkie",
    95: "łódzkie",
    96: "łódzkie",
    97: "łódzkie",
    98: "łódzkie",
    99: "łódzkie"
};
document.addEventListener("DOMContentLoaded", function() {
    O(),
    V()
});
function O() {
    document.getElementById("meetingForm").addEventListener("submit", S),
    document.getElementById("optimizeBtn").addEventListener("click", P),
    document.getElementById("clearBtn").addEventListener("click", j),
    w(),
    f()
}
function N() {
    const t = {
        lat: 52.0693,
        lng: 19.4803
    };
    g = new google.maps.Map(document.getElementById("map"),{
        zoom: 6,
        center: t,
        styles: [{
            featureType: "poi",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }]
    }),
    $ = new google.maps.DirectionsService,
    k = new google.maps.DirectionsRenderer({
        suppressMarkers: !1,
        polylineOptions: {
            strokeColor: "#3498db",
            strokeWeight: 4
        }
    }),
    k.setMap(g),
    C = new google.maps.Geocoder,
    console.log("Google Maps initialized successfully")
}
function S(t) {
    t.preventDefault();
    const e = new FormData(t.target)
      , o = {
        id: Date.now().toString(),
        firstName: e.get("firstName"),
        lastName: e.get("lastName"),
        phone: e.get("phone"),
        postalCode: e.get("postalCode"),
        address: e.get("address"),
        date: e.get("meetingDate"),
        time: e.get("meetingTime"),
        voivodeship: B(e.get("postalCode")),
        coordinates: null
    };
    if (!x(o.postalCode)) {
        p("Niepoprawny format kodu pocztowego. Użyj formatu: 00-000", "error");
        return
    }
    r.push(o),
    z(),
    w(),
    f(),
    t.target.reset(),
    p("Spotkanie zostało dodane pomyślnie!", "success")
}
function x(t) {
    return /^\d{2}-?\d{3}$/.test(t)
}
function B(t) {
    const e = t.substring(0, 2);
    return E[e] || "nieznane"
}
function w() {
    const t = document.getElementById("meetingsList")
      , e = document.getElementById("meetingCount");
    if (e.textContent = r.length,
    r.length === 0) {
        t.innerHTML = '<p class="empty-state">Brak dodanych spotkań</p>';
        return
    }
    const o = [...r].sort( (i, s) => {
        const n = new Date(`${i.date}T${i.time}`)
          , a = new Date(`${s.date}T${s.time}`);
        return n - a
    }
    );
    t.innerHTML = o.map(i => `
        <div class="meeting-item">
            <div class="meeting-info">
                <h4>${i.firstName} ${i.lastName}</h4>
                <div class="meeting-details">
                    📞 ${i.phone} | 📍 ${i.postalCode} ${i.address}<br>
                    📅 ${v(i.date)} ${i.time} | 🏛️ ${i.voivodeship}
                </div>
            </div>
            <div class="meeting-actions">
                <button class="btn btn-danger btn-small" onclick="deleteMeeting('${i.id}')">
                    🗑️ Usuń
                </button>
            </div>
        </div>
    `).join("")
}
function R(t) {
    r = r.filter(e => e.id !== t),
    z(),
    w(),
    f(),
    p("Spotkanie zostało usunięte", "info")
}
function j() {
    if (r.length === 0) {
        p("Lista spotkań jest już pusta", "info");
        return
    }
    confirm("Czy na pewno chcesz usunąć wszystkie spotkania?") && (r = [],
    c = [],
    z(),
    w(),
    L(),
    f(),
    D(),
    p("Wszystkie spotkania zostały usunięte", "info"))
}
async function P() {
    if (r.length === 0) {
        p("Dodaj przynajmniej jedno spotkanie przed optymalizacją", "error");
        return
    }
    M(!0);
    try {
        await T();
        const t = F();
        c = [];
        let e = 1;
        for (const [o,i] of Object.entries(t))
            for (const [s,n] of Object.entries(i)) {
                const a = await W(n, e, o, s);
                c.push(...a),
                e += a.length
            }
        L(),
        f(),
        H(),
        p(`Optymalizacja zakończona! Utworzono ${c.length} tras.`, "success")
    } catch (t) {
        console.error("Optimization error:", t),
        p("Wystąpił błąd podczas optymalizacji tras", "error")
    } finally {
        M(!1)
    }
}
async function T() {
    const t = r.map(async e => {
        if (!e.coordinates)
            try {
                const o = `${e.postalCode} ${e.address}, Polska`
                  , i = await A(o);
                e.coordinates = i
            } catch (o) {
                console.warn(`Failed to geocode: ${e.address}`, o),
                e.coordinates = G(e.postalCode)
            }
    }
    );
    await Promise.all(t)
}
function A(t) {
    return new Promise( (e, o) => {
        C.geocode({
            address: t
        }, (i, s) => {
            if (s === "OK" && i[0]) {
                const n = i[0].geometry.location;
                e({
                    lat: n.lat(),
                    lng: n.lng()
                })
            } else
                o(new Error(`Geocoding failed: ${s}`))
        }
        )
    }
    )
}
function G(t) {
    const e = t.substring(0, 2);
    return {
        "00": {
            lat: 52.2297,
            lng: 21.0122
        },
        "01": {
            lat: 52.2297,
            lng: 21.0122
        },
        "02": {
            lat: 52.2297,
            lng: 21.0122
        },
        30: {
            lat: 50.0647,
            lng: 19.945
        },
        31: {
            lat: 50.0647,
            lng: 19.945
        },
        40: {
            lat: 50.2649,
            lng: 19.0238
        },
        50: {
            lat: 51.1079,
            lng: 17.0385
        },
        60: {
            lat: 52.4064,
            lng: 16.9252
        },
        70: {
            lat: 53.4285,
            lng: 14.5528
        },
        80: {
            lat: 54.352,
            lng: 18.6466
        },
        90: {
            lat: 51.7592,
            lng: 19.456
        }
    }[e] || {
        lat: 52.0693,
        lng: 19.4803
    }
}
function F() {
    const t = {};
    return r.forEach(e => {
        const o = e.date;
        t[o] || (t[o] = {}),
        t[o][e.voivodeship] || (t[o][e.voivodeship] = []),
        t[o][e.voivodeship].push(e)
    }
    ),
    t
}
async function W(t, e, o, i) {
    const s = parseInt(document.getElementById("maxDistance").value) || 150
      , n = [];
    let a = []
      , l = 0
      , d = e;
    t.sort( (u, m) => {
        const y = u.time || "00:00"
          , h = m.time || "00:00";
        return y.localeCompare(h)
    }
    );
    const b = await q(t);
    for (let u = 0; u < b.length; u++) {
        const m = b[u];
        if (a.length === 0)
            a.push(m);
        else {
            const y = a[a.length - 1]
              , h = await I(y.coordinates, m.coordinates);
            l + h <= s ? (a.push(m),
            l += h) : (n.push({
                id: d,
                date: o,
                voivodeship: i,
                meetings: [...a],
                totalDistance: l,
                meetingCount: a.length
            }),
            d++,
            a = [m],
            l = 0)
        }
    }
    return a.length > 0 && n.push({
        id: d,
        date: o,
        voivodeship: i,
        meetings: [...a],
        totalDistance: l,
        meetingCount: a.length
    }),
    n
}
async function q(t) {
    if (t.length <= 2)
        return t;
    const e = [...t]
      , o = [];
    let i = e.shift();
    for (o.push(i); e.length > 0; ) {
        let s = null
          , n = 1 / 0
          , a = -1;
        for (let l = 0; l < e.length; l++) {
            const d = await I(i.coordinates, e[l].coordinates);
            d < n && (n = d,
            s = e[l],
            a = l)
        }
        if (s)
            o.push(s),
            e.splice(a, 1),
            i = s;
        else
            break
    }
    return o
}
async function I(t, e) {
    return new Promise(o => {
        new google.maps.DistanceMatrixService().getDistanceMatrix({
            origins: [new google.maps.LatLng(t.lat,t.lng)],
            destinations: [new google.maps.LatLng(e.lat,e.lng)],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: !1,
            avoidTolls: !1
        }, (s, n) => {
            if (n === "OK" && s.rows[0].elements[0].status === "OK") {
                const a = s.rows[0].elements[0].distance.value / 1e3;
                o(a)
            } else {
                const a = K(t.lat, t.lng, e.lat, e.lng);
                o(a * 1.3)
            }
        }
        )
    }
    )
}
function K(t, e, o, i) {
    const n = (o - t) * Math.PI / 180
      , a = (i - e) * Math.PI / 180
      , l = Math.sin(n / 2) * Math.sin(n / 2) + Math.cos(t * Math.PI / 180) * Math.cos(o * Math.PI / 180) * Math.sin(a / 2) * Math.sin(a / 2);
    return 6371 * (2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l)))
}
function L() {
    const t = document.getElementById("routesList")
      , e = document.getElementById("routesCard");
    if (c.length === 0) {
        e.style.display = "none";
        return
    }
    e.style.display = "block",
    t.innerHTML = c.map(o => `
        <div class="route-card">
            <div class="route-header">
                <div class="route-title">🗺️ Trasa #${o.id}</div>
                <div class="route-stats">
                    <div class="route-stat">📅 ${v(o.date)}</div>
                    <div class="route-stat">🏛️ ${o.voivodeship}</div>
                    <div class="route-stat">👥 ${o.meetingCount} spotkań</div>
                    <div class="route-stat">📏 ${o.totalDistance.toFixed(1)} km</div>
                </div>
            </div>
            <div class="route-meetings">
                ${o.meetings.map( (i, s) => `
                    <div class="route-meeting">
                        ${s + 1}. ${i.time} | ${i.firstName} ${i.lastName} | 
                        📍 ${i.postalCode} ${i.address} | 📞 ${i.phone}
                    </div>
                `).join("")}
            </div>
            <div class="route-actions">
                <button class="btn btn-primary btn-small" onclick="showRouteOnMap(${o.id})">
                    🗺️ Pokaż na mapie
                </button>
                <button class="btn btn-success btn-small" onclick="openInGoogleMaps(${o.id})">
                    🌍 Otwórz w Google Maps
                </button>
            </div>
        </div>
    `).join("")
}
function U(t) {
    const e = c.find(s => s.id === t);
    if (!e || e.meetings.length < 2)
        return;
    const o = e.meetings.slice(1, -1).map(s => ({
        location: new google.maps.LatLng(s.coordinates.lat,s.coordinates.lng),
        stopover: !0
    }))
      , i = {
        origin: new google.maps.LatLng(e.meetings[0].coordinates.lat,e.meetings[0].coordinates.lng),
        destination: new google.maps.LatLng(e.meetings[e.meetings.length - 1].coordinates.lat,e.meetings[e.meetings.length - 1].coordinates.lng),
        waypoints: o,
        optimizeWaypoints: !1,
        travelMode: google.maps.TravelMode.DRIVING
    };
    $.route(i, (s, n) => {
        n === "OK" && k.setDirections(s)
    }
    ),
    document.getElementById("map").scrollIntoView({
        behavior: "smooth"
    })
}
function _(t) {
    const e = c.find(i => i.id === t);
    if (!e)
        return;
    let o = "https://www.google.com/maps/dir/";
    e.meetings.forEach(i => {
        const s = encodeURIComponent(`${i.postalCode} ${i.address}`);
        o += s + "/"
    }
    ),
    window.open(o, "_blank")
}
function H() {
    if (c.length === 0)
        return;
    D();
    const t = new google.maps.LatLngBounds
      , e = ["#e74c3c", "#3498db", "#27ae60", "#f39c12", "#9b59b6", "#1abc9c"];
    c.forEach( (o, i) => {
        const s = e[i % e.length];
        o.meetings.forEach( (n, a) => {
            const l = new google.maps.Marker({
                position: {
                    lat: n.coordinates.lat,
                    lng: n.coordinates.lng
                },
                map: g,
                title: `Trasa ${o.id}: ${n.firstName} ${n.lastName}`,
                label: {
                    text: `${o.id}.${a + 1}`,
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: s,
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                    scale: 8
                }
            })
              , d = new google.maps.InfoWindow({
                content: `
                    <div style="font-size: 14px;">
                        <strong>Trasa #${o.id}</strong><br>
                        ${n.firstName} ${n.lastName}<br>
                        📞 ${n.phone}<br>
                        📍 ${n.postalCode} ${n.address}<br>
                        📅 ${v(o.date)} ${n.time}
                    </div>
                `
            });
            l.addListener("click", () => {
                d.open(g, l)
            }
            ),
            t.extend(l.getPosition())
        }
        )
    }
    ),
    t.isEmpty() || g.fitBounds(t)
}
function D() {
    k && k.setDirections({
        routes: []
    })
}
function f() {
    document.getElementById("statMeetings").textContent = r.length,
    document.getElementById("statRoutes").textContent = c.length;
    const t = c.reduce( (o, i) => o + i.totalDistance, 0);
    document.getElementById("statDistance").textContent = `${t.toFixed(1)} km`;
    const e = new Set(r.map(o => o.voivodeship));
    document.getElementById("statRegions").textContent = e.size
}
function v(t) {
    return new Date(t).toLocaleDateString("pl-PL")
}
function p(t, e="info") {
    document.querySelectorAll(".message").forEach(n => n.remove());
    const i = document.createElement("div");
    i.className = `message message-${e}`,
    i.textContent = t;
    const s = document.querySelector(".container");
    s.insertBefore(i, s.firstChild),
    setTimeout( () => {
        i.remove()
    }
    , 5e3)
}
function M(t) {
    const e = document.getElementById("loadingOverlay");
    e.style.display = t ? "flex" : "none"
}
function z() {
    localStorage.setItem("routeOptimizer_meetings", JSON.stringify(r))
}
function V() {
    const t = localStorage.getItem("routeOptimizer_meetings");
    if (t)
        try {
            r = JSON.parse(t)
        } catch (e) {
            console.error("Error loading meetings from storage:", e),
            r = []
        }
}
window.deleteMeeting = R;
window.showRouteOnMap = U;
window.openInGoogleMaps = _;
window.initMap = N;
console.log("Route Optimizer initialized successfully");

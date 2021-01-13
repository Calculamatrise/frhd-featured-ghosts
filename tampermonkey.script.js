// ==UserScript==
// @name         Feat. Ghost System
// @version      0.0.6
// @author       Calculus
// @match        *://www.freeriderhd.com/*
// @match        *://frhd.kanoapps.com/*
// ==/UserScript==
fetch("https://raw.githubusercontent.com/calculus-dev/Official_Featured_Ghosts/master/alias.json").then(r => r.json()).then(a => fetch("https://raw.githubusercontent.com/calculus-dev/Official_Featured_Ghosts/master/ghosts.json").then(r => r.json()).then((g, n) => {
    for (const t in g) for (const e of g[t]) if (parseInt(location.pathname.split("/t/")[1]) == parseInt(e.url.slice(10))) for (const i of document.getElementsByClassName('track-leaderboard-race')) if (i.innerText && i.innerText.toLowerCase() == ((n = a[t] && Object.entries(a[t]).filter(([,b]) => b == e.url.slice(-b.length))?.[0]?.[1] || t) && n?.length > 15 && n.slice(0, 12) + "..." || n)) i.style.color = "#e8a923";
}));

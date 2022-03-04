// ==UserScript==
// @name         Featured Ghost Display
// @version      0.1
// @author       Calculamatrise
// @match        *://www.freeriderhd.com/*
// @match        *://frhd.kanoapps.com/*
// ==/UserScript==

fetch("https://raw.githubusercontent.com/calculamatrise/frhd_featured_ghosts/master/alias.json").then(r => r.json()).then(function(alias) {
    fetch("https://raw.githubusercontent.com/calculamatrise/frhd_featured_ghosts/master/ghosts.json").then(r => r.json()).then(function(players) {
        for (let player in players) {
            for (const ghost in players[player]) {
                if (parseInt(location.pathname.split("/t/")[1]) !== parseInt(ghost.split("/t/")[1])) {
                    continue;
                }

                for (const element of document.getElementsByClassName("track-leaderboard-race")) {
                    if (element.innerText && element.innerText.toLowerCase() == ((player = alias[player] && Object.entries(alias[player]).filter(([,b]) => b == ghost.slice(-b.length))?.[0]?.[1] || player) && player.length > 15 && player.slice(0, 12) + "..." || player)) {
                        element.style.color = "#e8a923";
                    }
                }
            }
        }
    });
});
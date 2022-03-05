// ==UserScript==
// @name         Featured Ghost Display
// @version      0.1
// @author       Calculamatrise
// @match        *://www.freeriderhd.com/*
// @match        *://frhd.kanoapps.com/*
// ==/UserScript==

fetch("https://raw.githubusercontent.com/calculamatrise/frhd_featured_ghosts/master/alias.json").then(r => r.json()).then(function(alias) {
    fetch("https://raw.githubusercontent.com/calculamatrise/frhd_featured_ghosts/master/data.json").then(r => r.json()).then(function(players) {
        for (let player in players) {
            for (const ghost in players[player]) {
                if (parseInt(location.pathname.split("/t/")[1]) !== parseInt(ghost.split("/t/")[1])) {
                    continue;
                }

                for (const element of document.getElementsByClassName("track-leaderboard-race")) {
                    if (element.innerText === void 0) {
                        continue;
                    }

                    let name = alias[player] && Object.entries(alias[player]).filter(([,b]) => b == ghost.slice(-b.length))?.[0]?.[1] || player;
                    if (name.length > 15) {
                        name = name.slice(0, 12) + "...";
                    }

                    if (element.innerText.toLowerCase() !== name) {
                        return;
                    }

                    let color = "rgba(232, 169, 35, 0.4)";
                    switch(players[player][ghost]) {
                        case "fast": color = "rgba(120, 200, 200, 0.4)"; break;
                        case "vehicle": color = "rgba(240, 200, 80, 0.4)"; break;
                        case "trick": color = "rgba(160, 240, 40, 0.4)"; break;
                    }

                    element.parentElement.parentElement.style.setProperty("background-color", color);
                }
            }
        }
    });
});
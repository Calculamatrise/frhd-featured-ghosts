// ==UserScript==
// @name         Featured Ghost Display
// @version      0.2
// @author       Calculamatrise
// @match        *://www.freeriderhd.com/*
// @match        *://frhd.kanoapps.com/*
// ==/UserScript==

let data;
const render_leaderboards = Application.Views.TrackView.prototype._render_leaderboards;
Application.Views.TrackView.prototype._render_leaderboards = async function(n) {
    render_leaderboards.apply(this, arguments);
    data = data ?? await fetch("https://raw.githubusercontent.com/calculamatrise/frhd-featured-ghosts/master/data.json").then(r => r.json());
    const matches = Object.fromEntries(Object.entries(data).filter(e => Object.keys(e[1] = Object.fromEntries(Object.entries(e[1]).filter(([t]) => parseInt(t.split('/t/')[1]) == Application.router.current_view._get_track_id()))).length));
    for (const player in matches) {
        for (const ghost in matches[player]) {
            let name = ghost.split('/r/')[1];
            if (name.length > 15) {
                name = name.slice(0, 12) + "...";
            }

            const races = Array.from(document.getElementsByClassName("track-leaderboard-race"));
            for (const element of races.filter(({ innerText }) => name == innerText.toLowerCase())) {
                let color = [0, 0, 0];
                switch(matches[player][ghost]) {
                    case 'fast': color = [120, 200, 200]; break;
                    case 'vehicle': color = [240, 200, 80]; break;
                    case 'trick': color = [160, 240, 40]; break;
                    case 'auto': color = [232, 169, 35]; break; 
                    case 'other': color = [50, 50, 50]; break;  
                }

                const container = element.parentElement.parentElement;
                container.style.setProperty('background-color', `rgba(${color.join(',')},0.4)`);
                const actions = container.querySelector(".track-leaderboard-action");
                if (actions) {
                    actions.setAttribute('class', 'core_icons core_icons-icon_featured_badge featured');
                    actions.style.setProperty('width', '24px');
                    for (const action of actions.children) {
                        action.style.setProperty('opacity', 0);
                    }
                }
            }
        }
    }
}

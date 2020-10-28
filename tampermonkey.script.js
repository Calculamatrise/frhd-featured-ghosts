// ==UserScript==
// @name         Feat. Ghost System
// @version      0.0.5
// @author       Calculus
// @match        *://www.freeriderhd.com/*
// @match        *://frhd.kanoapps.com/*
// ==/UserScript==
!function(){
    fetch(`https://raw.githubusercontent.com/Calculus0972/Official_Featured_Ghosts/master/alias.json`).then((response) => response.json()).then(alias => {
        fetch(`https://raw.githubusercontent.com/Calculus0972/Official_Featured_Ghosts/master/ghosts.json`).then((response) => response.json()).then(ghosts => {
            for(var a in ghosts){
                var b = [];
                for(var c in ghosts[a]) for(var d in ghosts[a][c]) b.push(ghosts[a][c][d]);
                for(c in b)
                    if(parseInt(location.pathname.split("/t/")[1]) == parseInt(b[c].substring(10))) {
                        var n = a;
                        alias[a].forEach(e => {
                            if(b[c].slice(-e.length) == e) n = e;
                        });
                        if(n.length > 15) n = n.substring(0, 12) + "...";
                        d = document.getElementsByClassName('track-leaderboard-race');
                        for(var e in d) if(d[e].innerText) if(d[e].innerText.toLowerCase() == n) d[e].style.color = "#e8a923";
                    }
            }
        });
    });
}();

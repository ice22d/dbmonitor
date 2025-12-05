// ==UserScript==
// @name         DamnBruhServerMonitorV2 Loader
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Loader for external DamnBruh monitor (main.obf.js)
// @match        *://damnbruh.com/*
// @match        *://www.damnbruh.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    "use strict";

    const CDN_URL = "https://cdn.jsdelivr.net/gh/ice22d/dbmonitor@main/main.obf.js";
    const RAW_URL = "https://raw.githubusercontent.com/ice22d/dbmonitor/main/main.obf.js";

    // Load external script
    function load(url) {
        return fetch(url).then(r => {
            if (!r.ok) throw new Error("Failed " + url);
            return r.text();
        });
    }

    async function start() {
        try {
            let code = await load(CDN_URL);
            if (code.startsWith("<")) throw new Error("CDN returned HTML");
            eval(code);
        } catch (e) {
            console.warn("CDN failed, loading RAW...", e);
            try {
                let code = await load(RAW_URL);
                if (code.startsWith("<")) throw new Error("RAW returned HTML");
                eval(code);
            } catch (err) {
                console.error("DamnBruh Monitor Loader FAILED:", err);
            }
        }
    }

    start();
})();

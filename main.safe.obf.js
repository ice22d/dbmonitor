// @namespace http://tampermonkey.net/
// @match *://damnbruh.com
 max-height: 86vh;
 overflow-y: auto;
 background: linear-gradient(180deg, rgba(26,26,28,0.8), rgba(20,20,22,0.75));
 border: 1px solid rgba(150,150,150,0.35);
 border-radius: 10px;
 padding: 8px;
 font-family: Inter, Arial, sans-serif;
 color: #e6e6e6;
 z-index: 2147483647;
 box-shadow: 0 6px 20px rgba(50,50,50,0.45), 0 0 18px rgba(200,200,200,0.06) inset;
 backdrop-filter: blur(6px) saturate(120%);
 -webkit-backdrop-filter: blur(6px) saturate(120%);
 font-size: 12px;
}
#dbmon-root.hidden { display: none; }
header { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; cursor:move; }
h2 { margin:0; color:#dcdcdc; font-size:14px; font-weight:800; letter-spacing:0.6px; text-shadow:0 0 6px rgba(255,255,255,0.03); }
.dbmon-btn {
 background: linear-gradient(#cfcfcf,#9a9a9a);
 border:none; padding:4px 7px; border-radius:6px; color:#111; font-weight:800;
 cursor:pointer; font-size:11px; box-shadow:0 2px 6px rgba(0,0,0,0.45);
}
.dbmon-btn:active { transform: translateY(1px); }
.server-box {
 background: linear-gradient(180deg, rgba(18,18,20,0.6), rgba(14,14,16,0.6));
 border: 1px solid rgba(90,90,90,0.25);
 padding:6px;
 border-radius:6px;
 margin-bottom:6px;
}
.server-title {
 display:flex; justify-content:space-between;
 color:#d6d6d6; font-weight:700; font-size:12px;
 margin-bottom:4px;
}
.player-list { display:flex; flex-direction:column; gap:4px; }
.player-row {
 background: rgba(24,24,28,0.85);
 padding:4px 6px;
 border-radius:4px;
 display:flex; justify-content:space-between; align-items:center;
 font-size:11px;
 border: 1px solid rgba(60,60,60,0.18);
 position: relative;
}
.player-row small { opacity:0.85; font-size:10px; color:#bdbdbd; }
.player-copied {
 position: absolute;
 right: 6px;
 top: -3px;
 font-size: 10px;
 color: #9fdf9f;
 opacity: 0;
 transition: opacity 0.2s ease-out;
}
.eightms {
 background: linear-gradient(90deg, #ffc63f, #ff823f, #ff3f3f);
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 font-weight: 900;
 text-shadow: 0 0 8px rgba(255,215,0,0.45);
}
.spectator { opacity:0.5; font-style:italic; background: rgba(36,36,40,0.9); }
.spectator span:first-child::before { content:"👁 "; }
.config-section {
 margin-top:8px;
 padding-top:6px;
 border-top:1px solid rgba(80,80,80,0.18);
 display:flex;
 flex-direction:column;
 gap:6px;
}
.server-group {
 display:flex; gap:6px; flex-wrap:nowrap; overflow-x:auto; padding-bottom:4px;
}
.srv-toggle { display:flex; align-items:center; gap:5px; white-space:nowrap; font-size:11px; color:#d0d0d0; }
.srv-toggle input[type="checkbox"] {
 appearance:none;
 width:12px; height:12px;
 border:2px solid rgba(191,191,191,0.9);
 border-radius:3px;
 background: rgba(12,12,12,0.7);
 cursor:pointer; position:relative;
}
.srv-toggle input:checked { background: rgba(210,210,210,0.95); border-color: rgba(210,210,210,0.95); }
.srv-toggle input:checked::after { content:"✔"; color:#000; font-size:10px; font-weight:900; position:relative; left:1px; top:-1px; }
input[type=range]{
 -webkit-appearance:none; width:100%; height:6px;
 background: linear-gradient(90deg, rgba(210,210,210,0.95) 0%, rgba(210,210,210,0.95) var(--val,50%), rgba(58,58,58,0.9) var(--val,50%), rgba(58,58,58,0.9) 100%);
 border-radius:6px; outline:none;
}
input[type=range]::-webkit-slider-thumb{
 -webkit-appearance:none; width:14px; height:14px; background:#e8e8e8; border-radius:50%; margin-top:-4px; cursor:pointer;
 box-shadow: 0 2px 6px rgba(0,0,0,0.45);
}
.dbmon-brand {
 margin-top:6px; text-align:center; font-size:10px;
 padding-top:6px; border-top:1px solid rgba(120,120,120,0.12);
 opacity:0.85; letter-spacing:1px;
}
.dbmon-brand b { color:#fff; font-weight:900; text-shadow: 0 0 8px rgba(200,200,200,0.08); }
`;
 const style = document.createElement("style");
 style.textContent = CSS;
 document.head.appendChild(style);
 const rt = document.createElement("div");
 root.id = "dbmon-root";
 if (!cfg.visible) root.classList.add("hidden");
 document.body.appendChild(root);
 const hd = document.createElement("header");
 const tt = document.createElement("h2"); title.textContent = "DamnBruh Monitor";
 const rb = document.createElement("button");
 refreshBtn.className = "dbmon-btn"; refreshBtn.textContent = "Refresh";
 header.appendChild(title); header.appendChild(refreshBtn); root.appendChild(header);
 const sd = document.createElement("div");
 statusDiv.style.opacity = "0.75";
 statusDiv.style.fontSize = "11px";
 statusDiv.textContent = "Status: Loading...";
 root.appendChild(statusDiv);
 const lw = document.createElement("div");
 root.appendChild(listWrap);
 const cd = document.createElement("div");
 cfgDiv.className = "config-section";
 const srvTitle = document.createElement("div");
 srvTitle.style.color = "#d0d0d0";
 srvTitle.style.fontWeight = "700";
 srvTitle.style.fontSize = "12px";
 srvTitle.textContent = "Monitored Servers:";
 cfgDiv.appendChild(srvTitle);
 function mSR(ids) {
 const row = document.createElement("div");
 row.className = "server-group";
 ids.forEach(id => {
 const s = S.find(x => x.id === id);
 const lab = document.createElement("label"); lab.className = "srv-toggle";
 const chk = document.createElement("input"); chk.type = "checkbox"; chk.checked = cfg.enabledServers.includes(s.id);
 chk.onchange = () => {
 if (chk.checked) {
 if (!cfg.enabledServers.includes(s.id)) cfg.enabledServers.push(s.id);
 } else {
 cfg.enabledServers = cfg.enabledServers.filter(x => x !== s.id);
 }
 sC(); rS();
 };
 lab.appendChild(chk);
 const textNode = document.createTextNode(" " + s.label);
 lab.appendChild(textNode);
 row.appendChild(lab);
 });
 return row;
 }
 cfgDiv.appendChild(mSR(["eu1", "eu5", "eu20"]));
 cfgDiv.appendChild(mSR(["us1", "us5", "us20"]));
 const volLabel = document.createElement("div");
 volLabel.textContent = "Ping Volume:";
 cfgDiv.appendChild(volLabel);
 const vs = document.createElement("input");
 volSlider.type = "range";
 volSlider.min = 0; volSlider.max = 1; volSlider.step = 0.01;
 volSlider.value = cfg.pingVolume;
 cfgDiv.appendChild(volSlider);
 root.appendChild(cfgDiv);
 function updateSliderColor() {
 volSlider.style.setProperty("--val", (volSlider.value * 100) + "%");
 }
 volSlider.addEventListener("input", () => {
 cfg.pingVolume = Number(volSlider.value);
 sC();
 updateSliderColor();
 });
 updateSliderColor();
 document.addEventListener("keydown", e => {
 if (e.key && e.key.toLowerCase() === "h") {
 cfg.visible = !cfg.visible;
 sC();
 root.classList.toggle("hidden");
 }
 });
 (function enableDragging(el, handle) {
 let down = false, sx = 0, sy = 0, st = 0, sr = 0;
 handle.addEventListener("mousedown", e => {
 if (["INPUT", "BUTTON", "SELECT", "LABEL"].includes(e.target.tagName)) return;
 down = true; sx = e.clientX; sy = e.clientY;
 st = parseFloat(getComputedStyle(el).top) || el.offsetTop;
 sr = parseFloat(getComputedStyle(el).right) || parseFloat(window.getComputedStyle(document.body).width) - (el.offsetLeft + el.offsetWidth);
 document.body.style.userSelect = "none";
 e.preventDefault();
 });
 document.addEventListener("mousemove", e => {
 if (!down) return;
 el.style.top = (st + (e.clientY - sy)) + "px";
 el.style.right = (sr - (e.clientX - sx)) + "px";
 });
 document.addEventListener("mouseup", () => { down = false; document.body.style.userSelect = ""; });
 })(root, header);
 const nodes = new Map();
 function eN(s) {
 if (nodes.has(s.id)) return nodes.get(s.id);
 const box = document.createElement("div"); box.className = "server-box";
 const head = document.createElement("div"); head.className = "server-title";
 const lbl = document.createElement("span"); lbl.textContent = s.label;
 const cnt = document.createElement("span"); cnt.textContent = "-- / --";
 head.appendChild(lbl); head.appendChild(cnt); box.appendChild(head);
 const list = document.createElement("div"); list.className = "player-list";
 box.appendChild(list);
 listWrap.appendChild(box);
 nodes.set(s.id, { box, cnt, list });
 return nodes.get(s.id);
 }
 function rS() {
 listWrap.innerHTML = "";
 nodes.clear();
 S.forEach(s => {
 if (cfg.enabledServers.includes(s.id)) eN(s);
 });
 }
 async function fP(url) {
 try {
 const r = await fetch(url, { cache: "no-store" });
 if (!r.ok) return null;
 return await r.json();
 } catch {
 return null;
 }
 }
 let solPriceUSD = 0;
 async function uSP() {
 try {
 const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
 if (!r.ok) { solPriceUSD = 0; return; }
 const d = await r.json();
 solPriceUSD = (d && d.solana && Number(d.solana.usd)) || 0;
 } catch {
 solPriceUSD = 0;
 }
 }
 uSP();
 setInterval(uSP, 10000);
 function cP() {
 let ctx;
 try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return () => {}; }
 return () => {
 const osc = ctx.createOscillator();
 const g = ctx.createGain();
 g.gain.value = cfg.pingVolume;
 osc.type = "sine"; osc.frequency.value = 880;
 osc.connect(g); g.connect(ctx.destination);
 osc.start();
 g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
 osc.stop(ctx.currentTime + 0.25);
 };
 }
 const playPing = cP();
 async function cTC(text) {
 if (!text) return false;
 try {
 if (navigator.clipboard && navigator.clipboard.writeText) {
 await navigator.clipboard.writeText(text);
 return true;
 }
 } catch (e) {
 }
 try {
 const ta = document.createElement("textarea");
 ta.value = text;
 ta.style.position = "fixed";
 ta.style.left = "-9999px";
 document.body.appendChild(ta);
 ta.focus();
 ta.select();
 const ok = document.execCommand("copy");
 document.body.removeChild(ta);
 return ok;
 } catch (e) {
 return false;
 }
 }
 async function uP() {
 statusDiv.textContent = "Status: updating...";
 const active = S.filter(s => cfg.enabledServers.includes(s.id));
 const res = await Promise.all(active.map(s => fP(s.url).then(d => ({ s, data: d }))));
 for (const { s, data } of res) {
 const n = eN(s);
 if (!data || !Array.isArray(data.players)) {
 n.cnt.textContent = "ERR";
 n.list.innerHTML = `<div style="color:#c0c0c0;font-size:11px;padding:4px 6px;border-radius:4px;background:rgba(10,10,10,0.2)">Unable to fetch</div>`;
 continue;
 }
 const players = data.players;
 n.cnt.textContent = `${players.length} / ${data.maxPlayers ?? "--"}`;
 const last = lS.get(s.id) || new Set();
 const next = new Set(players.map(x => x.privyId || x.id || x.name));
 const joins = [...next].filter(x => !last.has(x));
 if (cfg.pingOnJoin && last.size > 0 && joins.length > 0 && playPing) {
 try { playPing(); } catch (e) { }
 }
 lS.set(s.id, next);
 n.list.innerHTML = "";
 players.forEach((pl, i) => {
 const row = document.createElement("div");
 row.className = "player-row";
 if (Number(pl.size) === 1) row.classList.add("spectator");
 const usdValue = (solPriceUSD && pl.monetaryValue) ? (Number(pl.monetaryValue) * solPriceUSD).toFixed(2) : "--";
 const left = document.createElement("span");
 left.style.display = "inline-block";
 left.style.maxWidth = "55%";
 left.style.overflow = "hidden";
 left.style.textOverflow = "ellipsis";
 left.style.whiteSpace = "nowrap";
 left.style.cursor = "pointer";
 left.textContent = `${i + 1}. ${pl.name || "Player"}`;
 const right = document.createElement("small");
 right.innerHTML = `size: <strong style="color:#cfcfcf">${Number(pl.size ?? 0).toFixed(0)}</strong> &nbsp;|&nbsp; $: <strong style="color:#cfcfcf">${usdValue}</strong>`;
 const copiedMsg = document.createElement("span");
 copiedMsg.className = "player-copied";
 copiedMsg.textContent = "copied";
 left.addEventListener("click", async () => {
 const nameToCopy = pl.name || "";
 const ok = await cTC(nameToCopy);
 if (ok) {
 copiedMsg.style.opacity = "1";
 setTimeout(() => { copiedMsg.style.opacity = "0"; }, 700);
 } else {
 try { alert("Copy failed"); } catch (e) {}
 }
 });
 row.appendChild(left);
 row.appendChild(right);
 row.appendChild(copiedMsg);
 n.list.appendChild(row);
 });
 }
 statusDiv.textContent = "Last uP: " + new Date().toLocaleTimeString();
 }
 refreshBtn.onclick = uP;
 const brand = document.createElement("div");
 brand.className = "dbmon-brand";
 brand.innerHTML = `made by <b><span class="eightms">8ms iceless</span></b>`;
 root.appendChild(brand);
 rS();
 uP();
 setInterval(uP, rMS);
 }
})();

const fs = require('fs');
let html = fs.readFileSync('public/overlay.html', 'utf8');

const brokenShipHtml = `<img class="ship-img" src="https://cdn3.iconfinder.com/data/icons/transport-222/512/Battleship-512.png">`;
const newShipHtml = `
    <svg class="ship-img" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
        <!-- Wake -->
        <path d="M 10,55 Q 0,55 0,50 Q 0,45 15,45 Z" fill="white" opacity="0.6" />
        <!-- Hull base -->
        <path d="M 15,50 L 95,50 C 105,50 115,40 120,30 L 10,30 C 5,30 5,40 10,50 Z" fill="#334155" />
        <!-- Hull top stripe -->
        <path d="M 10,30 L 120,30 C 118,25 110,20 95,20 L 10,20 Z" fill="#cbd5e1" />
        <!-- Cabin -->
        <path d="M 30,20 L 45,5 L 75,5 L 75,20 Z" fill="#64748b" />
        <path d="M 47,8 L 73,8 L 73,20 L 47,20 Z" fill="#94a3b8" />
        <!-- Details -->
        <rect x="55" y="2" width="4" height="10" fill="#1e293b" />
    </svg>`;
html = html.replace(brokenShipHtml, newShipHtml);

const shipCssOld = `        .ship-img {
            height: 8vh; object-fit: contain; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.5));
        }`;
const shipCssNew = `        .ship-img {
            height: 7vh; width: 14vh; object-fit: contain; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.5));
        }`;
html = html.replace(shipCssOld, shipCssNew);

const logoCssOld = `        .ship-logo-wrap {
            position: absolute; top: -1vh; left: 50%; transform: translateX(-50%);
            width: 4vh; height: 4vh; background: white; border-radius: 50%; padding: 2px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.8); border: 2px solid #ccc;
            display: flex; align-items: center; justify-content: center;
        }`;
const logoCssNew = `        .ship-logo-wrap {
            position: absolute; top: -2.5vh; left: 50%; transform: translateX(-50%);
            width: 4.5vh; height: 4.5vh; background: white; border-radius: 50%; padding: 2px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.8); border: 2.5px solid #ccc;
            display: flex; align-items: center; justify-content: center;
            z-index: 10;
        }`;
html = html.replace(logoCssOld, logoCssNew);

const applyBgOld = `applyBackground('https://img.freepik.com/premium-photo/blue-sea-surface-with-waves-top-view-ocean-water-texture_402096-7240.jpg');`;
const applyBgNew = `applyBackground('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1080');`;
html = html.replace(applyBgOld, applyBgNew);

// Make the #app container full width so the race spans across the screen
const appCssOld = `#app { max-width: 620px; width: 94vw; margin: 2vh auto 0 auto; position: relative; }`;
const appCssNew = `#app { width: 100vw; height: 100vh; margin: 0; position: relative; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }`;
html = html.replace(appCssOld, appCssNew);

// Adjust teams container inside full screen
const teamsContainerOld = `#teams-container { position: relative; width: 100%; height: 60vh; margin-top: 5vh; }`;
const teamsContainerNew = `#teams-container { position: relative; width: 100%; height: 60vh; margin-top: 2vh; flex-grow: 1; max-height: 70vh; }`;
html = html.replace(teamsContainerOld, teamsContainerNew);

// Make timer look better in full width
const timerContainerOld = `#timer-container { 
            display: flex; 
            justify-content: center; 
            align-items: center;
            margin-top: 2.5vh; 
            position: relative;
        }`;
const timerContainerNew = `#timer-container { 
            display: flex; 
            justify-content: center; 
            align-items: center;
            margin-top: 2vh;
            margin-bottom: 2vh;
            position: relative;
            z-index: 50;
        }`;
html = html.replace(timerContainerOld, timerContainerNew);

fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('Fixed overlay.html');

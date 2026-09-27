const fs = require('fs');
let html = fs.readFileSync('public/overlay.html', 'utf8');

// Fix 1: Ship container starting position - use percentage of parent width, not vw
const oldShipCss = `.ship-container {
            position: absolute; left: 12vh;
            height: 100%; display: flex; align-items: flex-end; padding-bottom: 2vh;
            transition: left 1s ease-out;
            z-index: 5;
        }`;
const newShipCss = `.ship-container {
            position: absolute; left: 15%;
            height: 100%; display: flex; align-items: center;
            transition: left 1s ease-out;
            z-index: 5;
        }`;
html = html.replace(oldShipCss, newShipCss);

// Fix 2: Score box - smaller and positioned better
const oldScoreCss = `.score-box { 
            position: absolute; left: 2vw; z-index: 10;
            width: 8vh; height: 4.5vh; 
            background: rgba(10,30,50, 0.95);
            border: 2px solid #3b82f6; border-radius: 8px;
            display: flex; align-items: center; justify-content: center; 
            font-size: 2.5vh; font-weight: 900; color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.8);
        }`;
const newScoreCss = `.score-box { 
            position: absolute; left: 1%; z-index: 10;
            width: 12%; height: 55%;
            background: rgba(10,30,50, 0.92);
            border: 2px solid #3b82f6; border-radius: 10px;
            display: flex; align-items: center; justify-content: center; 
            font-size: 3.5vw; font-weight: 900; color: white;
            box-shadow: 0 0 12px rgba(0,0,0,0.7);
        }`;
html = html.replace(oldScoreCss, newScoreCss);

// Fix 3: Ship image size - use width percentage
const oldShipImg = `.ship-img {
            height: 7vh; width: 14vh; object-fit: contain; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.5));
        }`;
const newShipImg = `.ship-img {
            width: 18vw; height: auto; max-height: 90%; object-fit: contain; 
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.6));
        }`;
html = html.replace(oldShipImg, newShipImg);

// Fix 4: Logo wrap - position relative to ship
const oldLogoWrap = `.ship-logo-wrap {
            position: absolute; top: -2.5vh; left: 50%; transform: translateX(-50%);
            width: 4.5vh; height: 4.5vh; background: white; border-radius: 50%; padding: 2px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.8); border: 2.5px solid #ccc;
            display: flex; align-items: center; justify-content: center;
            z-index: 10;
        }`;
const newLogoWrap = `.ship-logo-wrap {
            position: absolute; top: -35%; left: 50%; transform: translateX(-50%);
            width: 7vw; height: 7vw; max-width: 50px; max-height: 50px;
            background: white; border-radius: 50%; padding: 2px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.7); border: 2px solid #e0e0e0;
            display: flex; align-items: center; justify-content: center;
            z-index: 10;
        }`;
html = html.replace(oldLogoWrap, newLogoWrap);

// Fix 5: Update the JS left position calculation to use % instead of vw
const oldLeftCalc = "const leftPos = 12 + (progressPct * 0.70); // Max 70vw to leave space";
const newLeftCalc = "const leftPos = 16 + (progressPct * 0.65); // Start at 16%, max ~81%";
html = html.replace(oldLeftCalc, newLeftCalc);

const oldLeftStyle = "shipContainer.style.left = `${leftPos}vw`;";
const newLeftStyle = "shipContainer.style.left = `${leftPos}%`;";
html = html.replace(oldLeftStyle, newLeftStyle);

// Fix 6: Ship bobbing animation - use smaller values
const oldBob = `@keyframes shipBob {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-3px) rotate(1deg); }
        }`;
const newBob = `@keyframes shipBob {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-2px) rotate(0.5deg); }
        }`;
html = html.replace(oldBob, newBob);

// Fix 7: Wake effect sizing
const oldWake = `.wake-effect {
            position: absolute; bottom: 0; left: -4vh; width: 6vh; height: 2vh;
            background: radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, transparent 70%);
            border-radius: 50%; opacity: 0; animation: none;
        }`;
const newWake = `.wake-effect {
            position: absolute; bottom: 15%; left: -3vw; width: 5vw; height: 30%;
            background: radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, transparent 70%);
            border-radius: 50%; opacity: 0; animation: none;
        }`;
html = html.replace(oldWake, newWake);

// Fix 8: Hit effect sizing
const oldHit = `.hit-effect {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 10vh; height: 10vh; background: radial-gradient(circle, rgba(255,200,0,1) 0%, rgba(255,50,0,0.8) 50%, transparent 100%);
            border-radius: 50%; opacity: 0; pointer-events: none; z-index: 20;
        }`;
const newHit = `.hit-effect {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 12vw; height: 12vw; background: radial-gradient(circle, rgba(255,200,0,1) 0%, rgba(255,50,0,0.8) 50%, transparent 100%);
            border-radius: 50%; opacity: 0; pointer-events: none; z-index: 20;
        }`;
html = html.replace(oldHit, newHit);

fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('Ship layout fully fixed for portrait mode!');

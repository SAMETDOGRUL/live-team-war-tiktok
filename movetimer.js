const fs = require('fs');
let html = fs.readFileSync('public/overlay.html', 'utf8');

// Move #timer-container right after #now-playing in HTML
// Currently the order is: now-playing -> teams-container -> supporters -> timer
// We want: now-playing -> timer -> teams-container -> supporters

const timerHtml = `        <!-- Bottom Timer - Büyük ve etkileyici -->
        <div id="timer-container">
            <div id="timer-wrapper">
                <div id="timer-label">⏱ KALAN SÜRE</div>
                <div id="timer-value">00:00:00</div>
                <div id="timer-bar-container">
                    <div id="timer-bar" style="width:100%;"></div>
                </div>
            </div>
        </div>`;

// Remove timer from its old position
html = html.replace(timerHtml, '');

// Insert timer right after #now-playing closing div, before teams-container
const insertPoint = `        <!-- Teams Container -->
        <div id="teams-container"></div>`;

html = html.replace(insertPoint, timerHtml + '\n\n        <!-- Teams Container -->\n        <div id="teams-container"></div>');

// Update timer CSS to be at top center
const oldTimerCss = `/* Bottom Timer - BÜYÜK ve etkileyici */
        #timer-container { 
            display: flex; 
            justify-content: center; 
            align-items: center;
            margin-top: 2.5vh; 
            position: relative;
        }`;
const newTimerCss = `/* Timer - Üst Orta */
        #timer-container { 
            display: flex; 
            justify-content: center; 
            align-items: center;
            margin: 1vh auto; 
            position: relative;
            z-index: 30;
        }`;
html = html.replace(oldTimerCss, newTimerCss);

fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('Timer moved to top center!');

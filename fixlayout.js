const fs = require('fs');
let html = fs.readFileSync('public/overlay.html', 'utf8');

// Fix 1: Teams container should auto-size and not overlap
const oldTeamsContainer = `#teams-container { position: relative; width: 100%; height: 60vh; margin-top: 2vh; flex-grow: 1; max-height: 70vh; }`;
const newTeamsContainer = `#teams-container { position: relative; width: 100%; margin-top: 1vh; overflow: visible; }`;
html = html.replace(oldTeamsContainer, newTeamsContainer);

// Fix 2: Make the renderTeams function set height dynamically based on team count
const oldHeightLine = "DOM.teamsContainer.style.height = `${teams.length * laneHeight}vh`;";
const newHeightLine = "const totalH = teams.length * laneHeight; DOM.teamsContainer.style.height = totalH + 'vh'; DOM.teamsContainer.style.minHeight = totalH + 'vh';";
html = html.replace(oldHeightLine, newHeightLine);

// Fix 3: Supporters panel should have relative positioning and z-index
const oldSupporters = `#supporters-panel { margin-top: 2vh;`;
const newSupporters = `#supporters-panel { margin-top: 2vh; position: relative; z-index: 30; clear: both;`;
html = html.replace(oldSupporters, newSupporters);

// Fix 4: Timer container z-index
const oldTimer = `#timer-container { 
            display: flex; 
            justify-content: center; 
            align-items: center;
            margin-top: 2vh;
            margin-bottom: 2vh;
            position: relative;
            z-index: 50;
        }`;
const newTimer = `#timer-container { 
            display: flex; 
            justify-content: center; 
            align-items: center;
            margin-top: 1vh;
            margin-bottom: 2vh;
            position: relative;
            z-index: 30;
        }`;
html = html.replace(oldTimer, newTimer);

// Fix 5: #app should be a normal vertical flow, not flex centered
const oldApp = `#app { width: 100vw; height: 100vh; margin: 0; position: relative; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }`;
const newApp = `#app { width: 100vw; margin: 0; padding: 1vh 0; position: relative; display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden; }`;
html = html.replace(oldApp, newApp);

// Fix 6: Reduce lane height so more teams fit
const oldLane = `const laneHeight = 11; // vh`;
const newLane = `const laneHeight = 9; // vh`;
html = html.replace(oldLane, newLane);

fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('Layout overflow fixed!');

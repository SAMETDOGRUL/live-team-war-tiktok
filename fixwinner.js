const fs = require('fs');
let html = fs.readFileSync('public/overlay.html', 'utf8');

// Fix: Change #winner-logo to .winner-logo so the class applies
html = html.replace('#winner-logo { width: 100%; height: 100%; object-fit: contain; }', '.winner-logo { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }');
html = html.replace('#winner-logo { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }', '.winner-logo { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }');

// Fix: Add flex and overflow to .winner-logo-ring
const ringOld = `            animation: logoPulse 2.5s ease-in-out infinite;
            flex-shrink: 0;
        }`;
const ringNew = `            animation: logoPulse 2.5s ease-in-out infinite;
            flex-shrink: 0;
            display: flex; align-items: center; justify-content: center; overflow: hidden;
        }`;
html = html.replace(ringOld, ringNew);

// Fix: Missing image placeholder for teamLogoMarkup
const oldReturnImg = "return `<img class=\"${className}\" data-team=\"${team.id}\" src=\"${src}\" alt=\"${team.ad}\">`;";
const newReturnImg = "return `<img class=\"${className}\" data-team=\"${team.id}\" src=\"${src}\" alt=\"${team.ad}\" onerror=\"this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23333\\'/><text x=\\'50\\' y=\\'55\\' font-size=\\'30\\' fill=\\'white\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\'>'+(team.kisa||team.id).slice(0,3)+'</text></svg>'\">`;";
html = html.replace(oldReturnImg, newReturnImg);

fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('Fixed winner screen issues');

const fs = require('fs');
let html = fs.readFileSync('public/overlay.html', 'utf8');

// Fix 1: The CSS uses #winner-logo (ID) but the JS generates class="winner-logo"
// Change #winner-logo to .winner-logo
html = html.replace(
    '#winner-logo { width: 100%; height: 100%; object-fit: contain; }',
    '.winner-logo { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }'
);

// Fix 2: Add overflow:hidden to winner-logo-ring so image stays inside circle
html = html.replace(
    'animation: logoPulse 2.5s ease-in-out infinite;\n            flex-shrink: 0;\n        }',
    'animation: logoPulse 2.5s ease-in-out infinite;\n            flex-shrink: 0;\n            overflow: hidden;\n        }'
);

// Fix 3: The .winner-logo.team-logo-placeholder also needs fixing
html = html.replace(
    '.winner-logo.team-logo-placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #1f2937; font-size: clamp(22px, 5vh, 48px); font-weight: 900; }',
    '.winner-logo.team-logo-placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #1f2937; font-size: clamp(22px, 5vh, 48px); font-weight: 900; border-radius: 50%; }'
);

fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('Winner logo fixed!');

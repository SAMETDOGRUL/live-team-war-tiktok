const fs = require('fs');
let html = fs.readFileSync('public/overlay.html', 'utf8');

// 1. Add viewport meta tag if not exists
if (!html.includes('viewport')) {
    html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">');
}

// 2. Add responsive CSS media queries
const responsiveCss = `
        /* ═══════════════════════════════════════
           FULL RESPONSIVE - HER CİHAZA UYUM
           ═══════════════════════════════════════ */
        
        /* Base: use rem for text, % for layout */
        html { font-size: clamp(10px, 1.5vmin, 18px); }
        
        /* Now Playing bar */
        #now-playing {
            margin: 0.5rem 1rem; padding: 0.6rem 1rem; border-radius: 0.8rem;
        }
        .np-logo { width: clamp(25px, 5vmin, 50px); height: clamp(25px, 5vmin, 50px); }
        .np-badge { font-size: clamp(8px, 1.2vmin, 14px); }
        .np-team { font-size: clamp(10px, 1.8vmin, 20px); }
        .np-song { font-size: clamp(9px, 1.4vmin, 16px); max-width: 40vw; }
        .equalizer { height: clamp(15px, 3vmin, 35px); }
        .eq-bar { width: clamp(2px, 0.4vmin, 4px); }

        /* Score box responsive */
        .score-box { font-size: clamp(14px, 3vmin, 32px) !important; border-radius: clamp(5px, 1vmin, 12px); }
        
        /* Timer responsive */
        #timer-value { 
            font-size: clamp(20px, 5vmin, 60px) !important; 
            padding: clamp(5px, 1vmin, 15px) clamp(10px, 3vmin, 40px);
            border-radius: clamp(8px, 1.5vmin, 20px);
            letter-spacing: clamp(1px, 0.3vmin, 5px);
        }
        #timer-label { font-size: clamp(7px, 1vmin, 13px); }
        
        /* Supporters panel responsive */
        #supporters-panel { 
            margin: 1rem 2%; padding: 0.5rem 1rem; border-radius: 0.6rem;
            font-size: clamp(9px, 1.3vmin, 15px);
        }
        #supporters-panel h3 { font-size: clamp(10px, 1.5vmin, 17px); }
        
        /* Settings button */
        #settings-btn { 
            width: clamp(25px, 4vmin, 45px); height: clamp(25px, 4vmin, 45px); 
            font-size: clamp(12px, 2vmin, 22px);
            right: clamp(8px, 1.5vmin, 20px); top: clamp(8px, 1.5vmin, 20px);
        }

        /* Gift toasts */
        .gift-toast { 
            padding: clamp(3px, 0.5vmin, 8px) clamp(5px, 1vmin, 12px); 
            border-radius: clamp(10px, 2vmin, 25px);
            font-size: clamp(9px, 1.2vmin, 14px);
        }
        .gift-img-toast { height: clamp(20px, 3.5vmin, 45px); }
        
        /* Winner overlay responsive */
        #winner-inner {
            height: min(85vh, 85vw * 16/9);
            width: calc(min(85vh, 85vw * 16/9) * 9/16);
            border-radius: clamp(12px, 2.5vmin, 30px);
        }
        #winner-header { font-size: clamp(10px, 1.8vmin, 18px); }
        #winner-name { font-size: clamp(16px, 4vmin, 40px); }
        #winner-score { font-size: clamp(9px, 1.4vmin, 15px); }
        #winner-tour-badge { font-size: clamp(10px, 1.6vmin, 18px); }
        .winner-logo-ring { 
            width: clamp(60px, 15vmin, 140px); height: clamp(60px, 15vmin, 140px); 
        }
        .wl-row { padding: clamp(3px, 0.5vmin, 8px) clamp(5px, 0.8vmin, 12px); }
        .wl-logo { width: clamp(14px, 2.5vmin, 24px); height: clamp(14px, 2.5vmin, 24px); }
        .wl-name, .wl-wins, .wl-rank { font-size: clamp(8px, 1.2vmin, 14px); }
        
        /* Landscape (PC, laptop, wide tablet) */
        @media (orientation: landscape) {
            #app { padding: 0.5vh 0; }
            #now-playing { margin: 0.3rem 2rem; }
        }
        
        /* Very small screens (phones) */
        @media (max-height: 500px) {
            #now-playing { padding: 0.3rem 0.5rem; margin: 0.2rem 0.5rem; }
            #timer-container { margin-top: 0.5vh; margin-bottom: 0.5vh; }
        }
        
        /* Very large screens (TV, big monitor) */
        @media (min-width: 1920px) {
            html { font-size: 18px; }
        }
`;

// Insert before closing </style>
if (!html.includes('FULL RESPONSIVE')) {
    html = html.replace('</style>', responsiveCss + '\n    </style>');
}

// 3. Add window resize handler to re-render teams
const resizeHandler = `
        // Auto re-render on resize for responsive
        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (gameState.teams && gameState.teams.length > 0) {
                    renderTeams(gameState.teams, gameState.leader);
                }
            }, 150);
        });
`;

// Insert after init() call
if (!html.includes('Auto re-render on resize')) {
    html = html.replace('init();', 'init();\n' + resizeHandler);
}

fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('Full responsive + resize handling added!');

// ═══════════════════════════════════════════════════════════════
// TikTok Team War - Ship Race Theme - TEK SEFERDE TEMİZ UYGULA
// ═══════════════════════════════════════════════════════════════
const fs = require('fs');
let html = fs.readFileSync('public/overlay.html.backup', 'utf8');

// ───────────────────────────────────────────
// 1) CSS DEĞİŞİKLİKLERİ
// ───────────────────────────────────────────

// Body: full screen
html = html.replace(
    'body { margin: 0; overflow: hidden; background: transparent; font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; color: white; }',
    'body { margin: 0; overflow-x: hidden; overflow-y: auto; background: #0a2a4a; font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; color: white; }'
);

// App container: full width
html = html.replace(
    "#app { max-width: 620px; width: 94vw; margin: 2vh auto 0 auto; position: relative; }",
    "#app { width: 100%; max-width: 100%; margin: 0; padding: 1vmin 0; position: relative; }"
);

// Teams container: relative height
html = html.replace(
    '#teams-container { position: relative; width: 100%; height: 50vh; }',
    '#teams-container { position: relative; width: 100%; }'
);

// Team card: ship lane style
html = html.replace(
    `.team-card {
            position: absolute; left: 0; right: 0; height: 7vh;
            background: linear-gradient(90deg, rgba(20,20,20,0.95) 0%, rgba(30,30,30,0.95) 100%);
            border: 1px solid rgba(255,255,255,0.05); border-radius: 10px;
            display: flex; align-items: center; padding: 0 1.5vw 0 0;
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s;
        }
        .team-card.leader { border: 1.5px solid #e11d48; box-shadow: 0 0 15px rgba(225, 29, 72, 0.4); }`,
    `.team-card {
            position: absolute; left: 0; right: 0;
            background: transparent; border: none;
            display: flex; align-items: center;
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .team-card.leader { border: none; box-shadow: none; }`
);

// Replace rank boxes, logo, name, gift, score CSS with ship-specific CSS
html = html.replace(
    `.rank-box { width: 5vh; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2.2vh; font-weight: 900; border-top-left-radius: 9px; border-bottom-left-radius: 9px; margin-right: 1.5vw; }
        .rank-1 .rank-box { background: #e11d48; }
        .rank-2 .rank-box { background: #9333ea; }
        .rank-3 .rank-box { background: #2563eb; }
        .rank-4 .rank-box { background: #10b981; }
        .rank-5 .rank-box { background: #f97316; }
        
        .team-logo { width: 4.5vh; height: 4.5vh; border-radius: 50%; object-fit: contain; margin-right: 1vw; background: white; padding: 2px; }
        .team-logo-placeholder { display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 1.2vh; font-weight: 900; padding: 0; text-transform: uppercase; }
        .team-note { font-size: 2vh; margin-right: 1vw; }
        .team-name { font-size: 2.2vh; font-weight: 800; flex-grow: 1; text-transform: uppercase; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); }
        
        .team-gift-img { height: 4vh; object-fit: contain; margin-right: 1.5vw; filter: drop-shadow(0 0 4px rgba(255,255,255,0.3)); }
        .grayscale-gifts .team-gift-img { filter: grayscale(100%) brightness(1.3) contrast(1.1) drop-shadow(0 0 4px rgba(255,255,255,0.3)); }
        
        .team-score { font-size: 2.8vh; font-weight: 900; font-variant-numeric: tabular-nums; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); }

        /* Tur Wins Badge on team card */
        .team-tour-wins { 
            font-size: 1.4vh; font-weight: 800; color: gold; 
            background: rgba(0,0,0,0.5); border: 1px solid gold;
            border-radius: 10px; padding: 0.2vh 0.6vw; margin-right: 1vw;
            display: flex; align-items: center; gap: 3px;
            white-space: nowrap;
        }`,
    `.rank-box { display: none; }
        
        /* SHIP SCORE BOX */
        .ship-score {
            position: absolute; left: 1%; top: 50%; transform: translateY(-50%);
            z-index: 10;
            min-width: 13%; padding: 0 1%;
            height: 55%; 
            background: rgba(5,20,45,0.92);
            border: 2px solid #3b82f6; border-radius: clamp(6px,1.2vmin,12px);
            display: flex; align-items: center; justify-content: center;
            font-size: clamp(14px, 3vmin, 30px); font-weight: 900; color: white;
            box-shadow: 0 0 12px rgba(0,0,0,0.7);
        }
        .team-card.leader .ship-score { border-color: #e11d48; box-shadow: 0 0 18px rgba(225,29,72,0.5); }

        /* SHIP BODY */
        .ship-body {
            position: absolute; left: 16%;
            height: 80%; display: flex; align-items: center;
            transition: left 1.2s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 5;
        }
        .ship-svg { height: 100%; width: auto; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5)); }
        
        /* SHIP LOGO ON TOP */
        .ship-logo-circle {
            position: absolute; top: -30%; left: 50%; transform: translateX(-50%);
            width: clamp(28px, 6vmin, 55px); height: clamp(28px, 6vmin, 55px);
            background: white; border-radius: 50%; padding: 2px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.7); border: 2px solid #ddd;
            display: flex; align-items: center; justify-content: center;
            z-index: 15; overflow: hidden;
        }
        .team-card.leader .ship-logo-circle { border-color: #e11d48; box-shadow: 0 0 15px rgba(225,29,72,0.6); }
        .team-logo { width: 100%; height: 100%; border-radius: 50%; object-fit: contain; }
        .team-logo-placeholder { display: flex; align-items: center; justify-content: center; color: white; font-size: clamp(8px,1.5vmin,14px); font-weight: 900; text-transform: uppercase; width: 100%; height: 100%; border-radius: 50%; }
        
        /* WAKE SPRAY */
        .ship-wake {
            position: absolute; left: -15%; bottom: 10%; width: 20%; height: 40%;
            background: radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%; opacity: 0;
        }
        .team-card.moving .ship-wake { opacity: 1; animation: wakeAnim 0.8s ease-in-out infinite alternate; }
        @keyframes wakeAnim { 0%{ transform:scaleX(1); opacity:0.4; } 100%{ transform:scaleX(1.6); opacity:0.8; } }
        
        /* SHIP BOB */
        .ship-svg { animation: shipBob 3s ease-in-out infinite; }
        @keyframes shipBob { 0%,100%{ transform:translateY(0) rotate(0deg); } 50%{ transform:translateY(-2px) rotate(0.8deg); } }

        /* EXPLOSION EFFECT */
        .ship-hit {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
            width: 130%; height: 130%;
            background: radial-gradient(circle, rgba(255,200,0,1) 0%, rgba(255,80,0,0.7) 40%, transparent 70%);
            border-radius: 50%; opacity: 0; pointer-events: none; z-index: 20;
        }
        .ship-hit.boom { animation: boom 0.5s ease-out; }
        @keyframes boom { 0%{ transform:translate(-50%,-50%) scale(0.2); opacity:1; } 100%{ transform:translate(-50%,-50%) scale(2); opacity:0; } }

        .team-name, .team-note, .team-gift-img, .team-score, .team-tour-wins { display: none; }`
);

// ───────────────────────────────────────────
// 2) OCEAN BACKGROUND CSS + HTML
// ───────────────────────────────────────────
const oceanCss = `
        /* ═══ ANIMATED OCEAN ═══ */
        #ocean-canvas { position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:-10; }
        #bg-canvas { display:none !important; }
        #custom-background { display:none !important; }
`;
html = html.replace('</style>', oceanCss + '\n    </style>');

// Add ocean canvas element after body
html = html.replace(
    '<body class="grayscale-gifts">',
    '<body class="grayscale-gifts">\n    <canvas id="ocean-canvas"></canvas>'
);

// ───────────────────────────────────────────
// 3) JS: renderTeams → Ship Race
// ───────────────────────────────────────────
const oldRenderTeams = `        function renderTeams(teams, leaderId) {
            // Sıralama: puan > eşit puanda tourWins > 0 puanda config sırası (index)
            const sortedTeams = [...teams].sort((a, b) => {
                if (b.puan !== a.puan) return b.puan - a.puan;
                return (b.tourWins || 0) - (a.tourWins || 0);
            });
            const cardHeight = 7.5; // vh
            
            // Silinen takımların DOM kartlarını kaldır
            const teamIds = new Set(teams.map(t => t.id));
            Array.from(DOM.teamsContainer.children).forEach(child => {
                const cid = child.id.replace('team-card-', '');
                if (!teamIds.has(cid)) child.remove();
            });

            // Yeni eklenen takımların kartlarını oluştur
            teams.forEach((t) => {
                let card = document.getElementById(\`team-card-\${t.id}\`);
                if (!card) {
                    card = document.createElement('div');
                    card.className = 'team-card';
                    card.id = \`team-card-\${t.id}\`;
                    DOM.teamsContainer.appendChild(card);
                }
            });

            DOM.teamsContainer.style.height = \`\${teams.length * cardHeight}vh\`;
            
            sortedTeams.forEach((t, index) => {
                const card = document.getElementById(\`team-card-\${t.id}\`);
                if (!card) return;

                const rankClass = \`rank-\${index + 1}\`;
                card.className = \`team-card \${rankClass} \${t.id === leaderId && t.puan > 0 ? 'leader' : ''}\`;
                card.style.transform = \`translateY(\${index * cardHeight}vh)\`;
                card.style.zIndex = 10 - index;
                
                const giftImg = (t.gift && t.gift.image) ? \`<img class="team-gift-img" src="\${t.gift.image}" alt="gift">\` : '';
                const tourWinsHtml = (t.tourWins && t.tourWins > 0) ? \`<div class="team-tour-wins">🏅 \${t.tourWins}</div>\` : '';

                // Fallback custom color for rank > 5
                let boxStyle = '';
                if (index >= 5) boxStyle = \`style="background: \${t.renk};"\`;
                const logoMarkup = teamLogoMarkup(t, 'team-logo');

                card.innerHTML = \`
                    <div class="rank-box" \${boxStyle}>\${index + 1}</div>
                    \${logoMarkup}
                    <div class="team-note" style="color:\${t.accent}">♪</div>
                    <div class="team-name">\${t.ad}</div>
                    \${giftImg}
                    \${tourWinsHtml}
                    <div class="team-score">\${t.puan.toLocaleString()}</div>
                \`;
            });
        }`;

const newRenderTeams = `        function renderTeams(teams, leaderId) {
            const sortedTeams = [...teams].sort((a, b) => {
                if (b.puan !== a.puan) return b.puan - a.puan;
                return (b.tourWins || 0) - (a.tourWins || 0);
            });

            // Responsive lane height: fill 70% of screen
            const screenH = window.innerHeight;
            const laneH = Math.max(40, Math.floor((screenH * 0.70) / Math.max(teams.length, 1)));
            const maxScore = Math.max(...teams.map(t => t.puan), 10);

            const teamIds = new Set(teams.map(t => t.id));
            Array.from(DOM.teamsContainer.children).forEach(child => {
                const cid = child.id.replace('team-card-', '');
                if (!teamIds.has(cid)) child.remove();
            });

            teams.forEach((t) => {
                let card = document.getElementById(\`team-card-\${t.id}\`);
                if (!card) {
                    card = document.createElement('div');
                    card.className = 'team-card';
                    card.id = \`team-card-\${t.id}\`;
                    card.innerHTML = \`
                        <div class="ship-score">0</div>
                        <div class="ship-body">
                            <div class="ship-wake"></div>
                            <div class="ship-hit"></div>
                            <svg class="ship-svg" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="hull-\${t.id}" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#64748b"/>
                                        <stop offset="100%" stop-color="#334155"/>
                                    </linearGradient>
                                </defs>
                                <!-- Wake splash -->
                                <ellipse cx="8" cy="65" rx="12" ry="6" fill="rgba(255,255,255,0.4)"/>
                                <!-- Hull -->
                                <path d="M 20,70 L 160,70 C 175,70 190,55 198,40 L 15,40 C 8,40 5,50 10,60 Z" fill="url(#hull-\${t.id})" stroke="#475569" stroke-width="1"/>
                                <!-- Deck -->
                                <path d="M 15,40 L 198,40 C 195,35 185,28 165,28 L 20,28 C 12,28 10,33 15,40 Z" fill="#94a3b8" stroke="#64748b" stroke-width="0.5"/>
                                <!-- Cabin -->
                                <rect x="50" y="10" width="60" height="18" rx="3" fill="#64748b" stroke="#475569" stroke-width="0.5"/>
                                <!-- Windows -->
                                <rect x="55" y="13" width="10" height="6" rx="1" fill="#38bdf8" opacity="0.7"/>
                                <rect x="68" y="13" width="10" height="6" rx="1" fill="#38bdf8" opacity="0.7"/>
                                <rect x="81" y="13" width="10" height="6" rx="1" fill="#38bdf8" opacity="0.7"/>
                                <rect x="94" y="13" width="10" height="6" rx="1" fill="#38bdf8" opacity="0.5"/>
                                <!-- Mast -->
                                <rect x="75" y="1" width="3" height="12" fill="#475569"/>
                                <!-- Flag -->
                                <rect x="78" y="1" width="14" height="7" rx="1" fill="\${t.renk || '#e11d48'}"/>
                                <!-- Cannon/turret -->
                                <circle cx="140" cy="28" r="6" fill="#475569"/>
                                <rect x="140" y="25" width="25" height="5" rx="2" fill="#64748b"/>
                                <!-- Bow detail -->
                                <path d="M 170,35 L 198,40 L 170,45 Z" fill="#94a3b8" opacity="0.5"/>
                            </svg>
                            <div class="ship-logo-circle"></div>
                        </div>
                    \`;
                    DOM.teamsContainer.appendChild(card);
                }
            });

            DOM.teamsContainer.style.height = (teams.length * laneH) + 'px';

            sortedTeams.forEach((t, index) => {
                const card = document.getElementById(\`team-card-\${t.id}\`);
                if (!card) return;

                card.style.height = laneH + 'px';
                card.style.transform = \`translateY(\${index * laneH}px)\`;
                card.style.zIndex = 10 - index;
                card.className = \`team-card \${t.id === leaderId && t.puan > 0 ? 'leader' : ''} \${t.puan > 0 ? 'moving' : ''}\`;

                // Score
                const scoreEl = card.querySelector('.ship-score');
                if (scoreEl) scoreEl.innerText = t.puan.toLocaleString();

                // Ship position: 16% (start) to 80% (max)
                const shipBody = card.querySelector('.ship-body');
                if (shipBody) {
                    const pct = Math.min(100, (t.puan / maxScore) * 100);
                    shipBody.style.left = (16 + pct * 0.64) + '%';
                    shipBody.style.height = Math.min(laneH * 0.85, 100) + 'px';
                    shipBody.style.width = Math.min(laneH * 2.5, 250) + 'px';
                }

                // Logo
                const logoCircle = card.querySelector('.ship-logo-circle');
                if (logoCircle) {
                    const logoMarkup = teamLogoMarkup(t, 'team-logo');
                    if (logoCircle.innerHTML !== logoMarkup) {
                        logoCircle.innerHTML = logoMarkup;
                        logoCircle.style.borderColor = t.renk || '#ccc';
                    }
                }

                // Update flag color
                const flag = card.querySelector('rect[rx="1"][fill]');
                if (flag && flag.getAttribute('height') === '7') flag.setAttribute('fill', t.renk || '#e11d48');
            });
        }

        // Re-render on resize
        window.addEventListener('resize', () => {
            if (gameState.teams && gameState.teams.length > 0) renderTeams(gameState.teams, gameState.leader);
        });`;

html = html.replace(oldRenderTeams, newRenderTeams);

// ───────────────────────────────────────────
// 4) JS: triggerGiftEffect → ship explosion
// ───────────────────────────────────────────
const oldEffect = `        function triggerGiftEffect(gift) {
            const layer = document.getElementById('effect-layer');
            if (!layer) return;
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement('span');
                spark.className = 'effect-spark';
                spark.style.left = '50%';
                spark.style.top = '45%';
                spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 45}vw\`);
                spark.style.setProperty('--dy', \`\${(Math.random() - 0.5) * 45}vh\`);
                layer.appendChild(spark);
                setTimeout(() => spark.remove(), 1100);
            }
        }`;
const newEffect = `        function triggerGiftEffect(gift) {
            if (gift.targetId) {
                const card = document.getElementById(\`team-card-\${gift.targetId}\`);
                if (card) {
                    const hit = card.querySelector('.ship-hit');
                    if (hit) { hit.classList.remove('boom'); void hit.offsetWidth; hit.classList.add('boom'); }
                }
            }
        }`;
html = html.replace(oldEffect, newEffect);

// ───────────────────────────────────────────
// 5) JS: Ocean canvas animation (before </body>)
// ───────────────────────────────────────────
const oceanScript = `
    <script>
    (function(){
        const c=document.getElementById('ocean-canvas');if(!c)return;
        const g=c.getContext('2d');let W,H,t=0;
        function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
        window.addEventListener('resize',resize);resize();

        function draw(){
            t+=0.012;
            // Sky-to-deep gradient
            const bg=g.createLinearGradient(0,0,0,H);
            bg.addColorStop(0,'#061a30');bg.addColorStop(0.15,'#0c3560');
            bg.addColorStop(0.35,'#0e5585');bg.addColorStop(0.55,'#1478a8');
            bg.addColorStop(0.75,'#1a95c5');bg.addColorStop(1,'#22aad5');
            g.fillStyle=bg;g.fillRect(0,0,W,H);

            // Caustic lights
            for(let i=0;i<6;i++){
                const cx=W*(0.15+i*0.15)+Math.sin(t*0.7+i*1.3)*60;
                const cy=H*(0.2+i*0.12)+Math.cos(t*0.5+i*0.9)*40;
                const r=80+40*Math.sin(t*0.3+i);
                const a=0.03+0.03*Math.sin(t*0.6+i*2);
                const gr=g.createRadialGradient(cx,cy,0,cx,cy,r);
                gr.addColorStop(0,'rgba(100,210,255,'+a+')');gr.addColorStop(1,'transparent');
                g.fillStyle=gr;g.fillRect(cx-r,cy-r,r*2,r*2);
            }

            // 6 wave layers
            const waves=[
                {y:0.12,a:14,f:0.004,s:1.2,c:'rgba(180,230,255,'},
                {y:0.28,a:10,f:0.006,s:-0.9,c:'rgba(140,210,245,'},
                {y:0.42,a:16,f:0.003,s:0.7,c:'rgba(100,190,235,'},
                {y:0.56,a:8,f:0.007,s:-1.4,c:'rgba(70,160,220,'},
                {y:0.70,a:12,f:0.005,s:0.8,c:'rgba(40,130,200,'},
                {y:0.84,a:6,f:0.008,s:-1.1,c:'rgba(20,100,180,'}
            ];

            for(const w of waves){
                const baseY=w.y*H;
                g.beginPath();g.moveTo(0,H);
                for(let x=0;x<=W;x+=2){
                    const y=baseY
                        +Math.sin(x*w.f+t*w.s+w.y*5)*w.a
                        +Math.sin(x*w.f*2.1+t*w.s*0.7+2)*w.a*0.35
                        +Math.sin(x*w.f*0.6+t*w.s*1.3+4)*w.a*0.5;
                    g.lineTo(x,y);
                }
                g.lineTo(W,H);g.closePath();
                g.fillStyle=w.c+'0.12)';g.fill();
                // Foam crest line
                g.beginPath();
                for(let x=0;x<=W;x+=2){
                    const y=baseY
                        +Math.sin(x*w.f+t*w.s+w.y*5)*w.a
                        +Math.sin(x*w.f*2.1+t*w.s*0.7+2)*w.a*0.35
                        +Math.sin(x*w.f*0.6+t*w.s*1.3+4)*w.a*0.5;
                    x===0?g.moveTo(x,y):g.lineTo(x,y);
                }
                g.strokeStyle=w.c+'0.25)';g.lineWidth=1.5;g.stroke();
            }

            // Foam particles
            for(let i=0;i<40;i++){
                const px=((i*73.7+t*30)%(W+100))-50;
                const py=H*(0.1+(i*0.023)%0.85)+Math.sin(t+i)*3;
                const a=0.15+0.15*Math.sin(t*2+i*0.7);
                g.beginPath();g.arc(px,py,1.5+Math.sin(i)*0.8,0,Math.PI*2);
                g.fillStyle='rgba(200,235,255,'+a+')';g.fill();
            }

            // Top/bottom vignette
            const v=g.createLinearGradient(0,0,0,H);
            v.addColorStop(0,'rgba(0,8,20,0.4)');v.addColorStop(0.12,'transparent');
            v.addColorStop(0.88,'transparent');v.addColorStop(1,'rgba(0,8,20,0.3)');
            g.fillStyle=v;g.fillRect(0,0,W,H);

            requestAnimationFrame(draw);
        }
        draw();
    })();
    </script>`;

html = html.replace('</body>', oceanScript + '\n</body>');

// ───────────────────────────────────────────
// SAVE
// ───────────────────────────────────────────
fs.writeFileSync('public/overlay.html', html, 'utf8');
console.log('✅ Ship Race + Ocean theme applied cleanly from backup!');

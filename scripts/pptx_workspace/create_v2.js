const { chromium } = require('playwright');
const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const DATA = require('/Users/namzhil/Files/Coding/Propria/scripts/slides_data_es.json');
const OUT_PPTX = '/Users/namzhil/Files/Coding/Propria/PropriaAI_Presentacion_ES.pptx';
const TMP = '/Users/namzhil/Files/Coding/Propria/scripts/pptx_workspace/tmp';
fs.mkdirSync(TMP, { recursive: true });

const DARK = '#0c1754', DARK2 = '#0f1a4a', CARD = '#1a2570';
const BLUE = '#2545ff', BLUEL = '#4a66ff';
const AMBER = '#ffc13a', ORANGE = '#ff5b22', ORANGEL = '#ff7a4d';
const WHITE = '#ffffff', LGRAY = 'rgba(255,255,255,0.65)';
const MGRAY = 'rgba(255,255,255,0.4)', DGRAY = 'rgba(255,255,255,0.08)';
const BORDER = 'rgba(255,255,255,0.08)';

const COMMON_HEAD = `<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">`;

const COMMON_STYLE = `
*{margin:0;padding:0;box-sizing:border-box;}
body{width:720pt;height:405pt;font-family:'DM Sans',sans-serif;overflow:hidden;display:flex;}
h1,h2,h3,h4{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;letter-spacing:-0.02em;line-height:1.1;}
`;

function header(eyebrow, title, subtitle, bg, accent=AMBER) {
  const e = eyebrow ? `<div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:6.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${accent};display:flex;align-items:center;gap:6pt;margin-bottom:8pt;"><div style="width:14pt;height:1pt;background:${accent};flex-shrink:0;"></div>${eyebrow}</div>` : '';
  const t = title ? `<h1 style="font-size:20pt;color:#fff;margin-bottom:${subtitle?'5pt':'20pt'};">${title}</h1>` : '';
  const s = subtitle ? `<p style="font-size:8.5pt;color:${LGRAY};line-height:1.55;max-width:420pt;">${subtitle}</p>` : '';
  return e + t + s;
}

function slideHtml(content, bgColor) {
  return `<!DOCTYPE html><html><head>${COMMON_HEAD}<style>${COMMON_STYLE}
body{background:${bgColor};}
body::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,${BLUE}22,transparent 60%);pointer-events:none;}
</style></head><body><div style="position:absolute;inset:0;">${content}</div></body></html>`;
}

function cardHtml(num, title, desc, tag, accent, extra='') {
  return `
  <div style="flex:1;min-width:0;background:${CARD};border-radius:9pt;border:1pt solid ${BORDER};position:relative;overflow:hidden;transition:0.3s;">
    <div style="position:absolute;top:0;left:0;right:0;height:2.5pt;background:${accent};"></div>
    <div style="padding:11pt 10pt 14pt;">
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:9pt;font-weight:700;color:${accent};letter-spacing:0.06em;text-transform:uppercase;margin-bottom:5pt;">${num}</div>
      <h3 style="font-size:10pt;color:#fff;margin-bottom:4pt;">${title}</h3>
      <p style="font-size:7pt;color:${LGRAY};line-height:1.5;margin-bottom:${tag?'8pt':'0'};">${desc}</p>
      ${tag ? `<div style="display:inline-block;padding:2pt 7pt;border-radius:100px;border:1pt solid ${accent}22;background:${accent}11;"><p style="margin:0;font-size:5.5pt;font-weight:600;color:${accent};text-transform:uppercase;letter-spacing:0.08em;">${tag}</p></div>` : ''}
      ${extra}
    </div>
  </div>`;
}

// Build all 10 HTML slides
const slides = [];

// 1. TITLE
slides.push(`<!DOCTYPE html><html><head>${COMMON_HEAD}<style>${COMMON_STYLE}
body{background:${DARK};}
body::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 30%,${BLUE}11,transparent 55%);pointer-events:none;z-index:0;}
</style></head><body>
<div style="position:absolute;inset:0;z-index:1;">
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:100pt;left:40pt;right:40pt;">
  <h1 style="color:#fff;font-size:31pt;line-height:1.1;letter-spacing:-0.03em;">Departamento de<br>Ventas Llave en Mano<br>para Desarrolladores<br>Off-Plan</h1>
  <p style="font-size:10pt;color:${LGRAY};margin-top:14pt;">Equipo &middot; Playbook &middot; Stack de Ventas &middot; IA &mdash; en 8 semanas</p>
</div>
<div style="position:absolute;bottom:44pt;left:40pt;">
  <p style="font-family:'Plus Jakarta Sans',sans-serif;font-size:42pt;font-weight:800;color:${BLUE};letter-spacing:-0.03em;line-height:1;">PropriaAI</p>
</div>
</div></body></html>`);

// 2. HERO
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:85pt;left:40pt;right:280pt;">
  <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:6.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${AMBER};display:flex;align-items:center;gap:6pt;margin-bottom:8pt;"><div style="width:14pt;height:1pt;background:${AMBER};flex-shrink:0;"></div>${DATA.hero.tags}</div>
  <h1 style="font-size:22pt;color:#fff;line-height:1.12;margin-bottom:6pt;">Impulsa tus ventas con <span style="color:${BLUE};display:inline-block;position:relative;">IA</span> en 1 mes</h1>
  <p style="font-size:8.5pt;color:${LGRAY};line-height:1.55;">${DATA.hero.subtitle}</p>
</div>
<div style="position:absolute;top:90pt;right:40pt;width:230pt;display:flex;flex-direction:column;gap:7pt;">
  ${DATA.metrics.map((m,i) => {
    const ml = [0,16,32][i];
    return `<div style="background:#fff;border-radius:11pt;border:1pt solid rgba(23,20,23,0.06);padding:11pt 13pt;display:flex;align-items:center;gap:11pt;box-shadow:0 4px 20px rgba(12,23,84,0.04);margin-left:${ml}pt;width:${230-ml}pt;">
      <div style="width:34pt;height:34pt;border-radius:9pt;background:linear-gradient(135deg,${[BLUE+','+BLUEL,ORANGE+','+ORANGEL,AMBER+','+AMBER][i]});display:flex;align-items:center;justify-content:center;flex-shrink:0;"></div>
      <div>
        <div style="font-size:5.5pt;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;font-weight:500;margin-bottom:1pt;">${m.label}</div>
        <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:13pt;color:#171417;font-weight:700;">${m.value}</div>
      </div>
    </div>`;
  }).join('')}
</div>`, DARK));

// 3. AI TRANSFORM
const t = DATA.transform;
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(t.eyebrow, t.title, t.subtitle, DARK2)}
</div>
<div style="position:absolute;bottom:24pt;left:40pt;right:40pt;display:flex;gap:10pt;">
  ${t.cards.map(c => cardHtml(c.num, c.title, c.desc, c.tag, c.color)).join('')}
</div>`, DARK2));

// 4. AGENTS
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(DATA.agents.eyebrow, DATA.agents.title, '', DARK, AMBER)}
</div>
<div style="position:absolute;bottom:16pt;left:40pt;right:40pt;display:grid;grid-template-columns:1fr 1fr;gap:6pt;grid-template-rows:1fr 1fr;">
  ${DATA.agents.cards.map(c => `
  <div style="background:${CARD};border-radius:9pt;border:1pt solid ${BORDER};position:relative;overflow:hidden;padding:0;">
    <div style="position:absolute;top:0;left:0;right:0;height:2pt;background:${c.color};"></div>
    <div style="padding:9pt 10pt 8pt;">
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:10pt;font-weight:700;color:#fff;margin-bottom:1pt;">${c.name}</div>
      <div style="font-size:6pt;font-weight:600;color:${c.color};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:5pt;">${c.role}</div>
      <p style="font-size:7pt;color:${LGRAY};line-height:1.45;margin-bottom:6pt;">${c.desc}</p>
      <p style="font-size:5.5pt;color:${MGRAY};">${c.tags}</p>
    </div>
  </div>`).join('')}
</div>`, DARK));

// 5. FUNNEL
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(DATA.funnel.eyebrow, DATA.funnel.title, DATA.funnel.subtitle, DARK2)}
</div>
<div style="position:absolute;bottom:28pt;left:40pt;right:40pt;display:flex;gap:10pt;">
  ${DATA.funnel.cards.map(c => cardHtml(c.num, c.title, c.desc, '', c.color)).join('')}
</div>`, DARK2));

// 6. FLOW
const fc = [BLUE,ORANGE,AMBER,ORANGE,BLUE];
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(DATA.flow.eyebrow, DATA.flow.title, DATA.flow.subtitle, DARK, AMBER)}
</div>
<div style="position:absolute;top:160pt;left:40pt;right:40pt;display:flex;align-items:center;gap:0;">
  ${DATA.flow.steps.map((s,i) => `
  <div style="flex:1;background:${CARD};border-radius:9pt;border:1pt solid ${BORDER};padding:10pt;min-height:110pt;">
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:24pt;font-weight:800;color:${fc[i]};opacity:0.7;line-height:1;margin-bottom:5pt;">${s.num}</div>
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:9pt;font-weight:700;color:#fff;margin-bottom:3pt;">${s.title}</div>
    <p style="font-size:7pt;color:${LGRAY};line-height:1.4;">${s.desc}</p>
  </div>
  ${i<4?`<div style="width:3pt;height:1pt;background:rgba(255,255,255,0.08);margin:0 3pt;flex-shrink:0;"></div>`:''}
  `).join('')}
</div>`, DARK));

// 7. DASHBOARD
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(DATA.dashboard.eyebrow, DATA.dashboard.title, '', DARK2, AMBER)}
</div>
<div style="position:absolute;top:150pt;left:40pt;right:40pt;">
  <div style="background:${CARD};border-radius:8pt;border:1pt solid ${BORDER};padding:7pt 11pt;display:flex;justify-content:space-between;align-items:center;margin-bottom:6pt;">
    <p style="font-size:6.5pt;color:${MGRAY};">${DATA.dashboard.dashTitle}</p>
    <div style="display:flex;gap:8pt;">
      ${DATA.dashboard.stats.map(s => `
      <div style="display:flex;align-items:center;gap:4pt;padding:3pt 9pt;border-radius:100px;background:${CARD};">
        <div style="width:5pt;height:5pt;border-radius:50%;background:${s.color};"></div>
        <p style="font-size:9pt;font-weight:700;color:#fff;margin:0;">${s.value}</p>
        <p style="font-size:5.5pt;color:${MGRAY};text-transform:uppercase;margin:0;">${s.label}</p>
      </div>`).join('')}
    </div>
  </div>
  <div style="display:flex;padding:3pt 8pt;border-bottom:1.5pt solid rgba(255,255,255,0.05);margin-bottom:2pt;">
    ${DATA.dashboard.cols.map((col, i) => {
      const w = {0:'33%',1:'17%',2:'14%',3:'8%',4:'28%'}[i];
      return `<p style="width:${w};font-size:5pt;font-weight:600;color:${MGRAY};text-transform:uppercase;letter-spacing:0.06em;margin:0;">${col}</p>`;
    }).join('')}
  </div>
  ${DATA.dashboard.rows.map((r,i) => {
    const bc = {risk:BLUE,hot:ORANGE,stalled:AMBER,ok:MGRAY,won:ORANGE}[r.badgeType];
    return `<div style="display:flex;padding:3pt 8pt;align-items:center;${i%2?'':'background:'+CARD+';border-radius:3pt;'}">
      <div style="width:33%;"><p style="font-size:7pt;font-weight:600;color:#fff;margin:0;">${r.name}</p><p style="font-size:5.5pt;color:${MGRAY};margin:1pt 0 0;">${r.meta}</p></div>
      <p style="width:17%;font-size:6.5pt;font-weight:600;color:rgba(255,255,255,0.85);margin:0;">${r.stage}</p>
      <p style="width:14%;font-size:6.5pt;color:${MGRAY};margin:0;">${r.touch}</p>
      <p style="width:8%;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:700;color:#fff;margin:0;">${r.score}</p>
      <p style="width:28%;font-size:6pt;font-weight:600;color:${bc};margin:0;">${r.badge}</p>
    </div>`;
  }).join('')}
</div>`, DARK2));

// 8. KIT
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(DATA.kit.eyebrow, DATA.kit.title, DATA.kit.subtitle, DARK, AMBER)}
</div>
<div style="position:absolute;bottom:24pt;left:40pt;right:40pt;display:flex;gap:8pt;">
  ${DATA.kit.cards.map(c => `
  <div style="flex:1;min-width:0;background:${CARD};border-radius:9pt;border:1pt solid ${BORDER};padding:11pt 10pt 14pt;">
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:18pt;font-weight:800;color:${AMBER};opacity:0.4;line-height:1;margin-bottom:5pt;">${c.num}</div>
    <h3 style="font-size:9pt;color:#fff;margin-bottom:4pt;">${c.title}</h3>
    <p style="font-size:7pt;color:${LGRAY};line-height:1.5;">${c.desc}</p>
  </div>`).join('')}
</div>`, DARK));

// 9. TEAM
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(DATA.team.eyebrow, DATA.team.title, '', DARK2, AMBER)}
</div>
<div style="position:absolute;top:170pt;left:40pt;right:40pt;display:flex;gap:16pt;">
  ${DATA.team.cards.map(c => `
  <div style="flex:1;background:${CARD};border-radius:12pt;border:1pt solid ${BORDER};padding:0;overflow:hidden;">
    <div style="height:3pt;background:${c.color};"></div>
    <div style="padding:13pt 15pt 15pt;">
      <div style="font-size:6.5pt;font-weight:600;color:${c.color};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:3pt;">${c.role}</div>
      <h3 style="font-size:14pt;color:#fff;margin-bottom:12pt;">${c.name}</h3>
      <ul style="list-style:none;padding:0;margin:0;">
        ${c.items.map(item => `
        <li style="display:flex;align-items:flex-start;gap:7pt;padding:5pt 0;border-bottom:1pt solid rgba(255,255,255,0.04);">
          <p style="color:${c.color};font-weight:700;font-size:8pt;margin:0;flex-shrink:0;line-height:1.5;">-</p>
          <p style="font-size:7.5pt;color:${LGRAY};line-height:1.55;margin:0;">${item}</p>
        </li>`).join('')}
      </ul>
    </div>
  </div>`).join('')}
</div>`, DARK2));

// 10. TIMELINE
slides.push(slideHtml(`
<div style="position:absolute;top:24pt;left:40pt;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:800;color:#fff;letter-spacing:0.12em;">PROPRIAIA</div>
<div style="position:absolute;top:34pt;left:40pt;width:40pt;height:1.5pt;background:${BLUE};"></div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  ${header(DATA.timeline.eyebrow, DATA.timeline.title, '', DARK, AMBER)}
</div>
<div style="position:absolute;top:195pt;left:55pt;right:55pt;">
  <div style="position:absolute;top:7pt;left:8%;right:8%;height:1pt;background:linear-gradient(90deg,${BLUE},${AMBER},${ORANGE},rgba(255,255,255,0.1));"></div>
  <div style="display:flex;align-items:flex-start;justify-content:space-between;position:relative;z-index:1;">
    ${DATA.timeline.items.map((item,i) => `
    <div style="text-align:center;flex:1;max-width:24%;">
      <div style="width:14pt;height:14pt;border-radius:50%;background:${item.color};border:3pt solid ${DARK};margin:0 auto 12pt;"></div>
      <h4 style="font-size:10pt;color:#fff;margin-bottom:4pt;">${item.title}</h4>
      <p style="font-size:7pt;color:${LGRAY};line-height:1.45;">${item.desc}</p>
    </div>
    ${i<3?`<div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:9pt;color:${AMBER};margin:3pt 3pt 0;flex-shrink:0;font-weight:700;">></div>`:''}
    `).join('')}
  </div>
</div>`, DARK));

// Write slides to files and take screenshots
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'PropriaAI';
  pptx.title = 'PropriaAI — Departamento de Ventas con IA';

  for (let i = 0; i < slides.length; i++) {
    const htmlPath = path.join(TMP, `slide_${String(i+1).padStart(2,'0')}.html`);
    const pngPath = path.join(TMP, `slide_${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(htmlPath, slides[i]);

    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 720, height: 405 } });

    const slide = pptx.addSlide();
    slide.background = { path: pngPath };
    console.log(`  Slide ${i+1} rendered`);
  }

  await browser.close();
  await pptx.writeFile({ fileName: OUT_PPTX });
  console.log(`PPTX saved: ${OUT_PPTX}`);
}

main().catch(err => { console.error(err); process.exit(1); });

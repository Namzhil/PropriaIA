const pptxgen = require('pptxgenjs');
const html2pptx = require('./html2pptx');
const path = require('path');
const fs = require('fs');

const DATA = require('/Users/namzhil/Files/Coding/Propria/scripts/slides_data_es.json');
const OUT = '/Users/namzhil/Desktop/PropriaAI_Presentacion_ES.pptx';
const SLD = '/Users/namzhil/Files/Coding/Propria/scripts/pptx_workspace/slides';

const DARK = '0c1754', DARK2 = '0f1a4a', CARD = '1a2570';
const BLUE = '2545ff', AMBER = 'ffc13a', ORANGE = 'ff5b22';
const LIGHT = 'f9f8f6', TEXT = '171417', MUTED = '9ca3af';
const TFL = 'FFFFFF', TFF = 'ffffff', TGF = 'B0B8D0', TGS = 'd1d5ee';
const BRAND = '<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>';

function makeStyle(bgHex, textColor='FFFFFF', mutedColor='99A0C0', accent=AMBER) {
  return `
*{margin:0;padding:0;box-sizing:border-box;}
body{width:720pt;height:405pt;background:#${bgHex};font-family:Helvetica,Arial,sans-serif;display:flex;overflow:hidden;color:#${textColor};}
h1,h2,h3,h4{font-family:Helvetica,Arial,sans-serif;font-weight:700;letter-spacing:-0.02em;line-height:1.1;}
p{line-height:1.5;}
.card{background:#${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);}
.eyebrow{font-size:6.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#${accent};margin:0 0 8pt 0;}
.accent-line{background:#${accent};}
.brand{position:absolute;top:22pt;left:40pt;font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#${textColor};margin:0;}
.brand-line{position:absolute;top:33pt;left:40pt;width:36pt;height:1.5pt;background:#${BLUE};}
.content-area{position:absolute;top:82pt;left:40pt;right:40pt;}
.bottom-cards{position:absolute;left:40pt;right:40pt;bottom:36pt;display:flex;gap:10pt;}
`;
}

function wrap(body, bg, style) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${style}</style></head><body>${body}</body></html>`;
}

const slides = [];

// 1. TITLE
const s1style = makeStyle(DARK);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div style="position:absolute;top:100pt;left:40pt;right:40pt;">
  <h1 style="font-size:32pt;color:#${TFL};line-height:1.12;margin:0;">Departamento de<br>Ventas Llave en Mano<br>para Desarrolladores<br>Off-Plan</h1>
  <p style="font-size:10pt;color:#${TGF};margin:14pt 0 0;">Equipo - Playbook - Stack de Ventas - IA - en 8 semanas</p>
</div>
<div style="position:absolute;bottom:48pt;left:40pt;">
  <p style="font-size:42pt;font-weight:700;color:#${BLUE};letter-spacing:-0.03em;margin:0;">PropriaAI</p>
</div>
`, DARK, s1style)});

// 2. HERO
const m = DATA.metrics;
const s2style = makeStyle(DARK);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div style="position:absolute;top:88pt;left:40pt;right:290pt;">
  <p class="eyebrow" style="margin-bottom:6pt;">${DATA.hero.tags}</p>
  <h1 style="font-size:22pt;color:#${TFL};line-height:1.12;margin:0 0 5pt;">Impulsa tus ventas con <span style="color:#${BLUE};">IA</span> en 1 mes</h1>
  <p style="font-size:8.5pt;color:#${TGF};line-height:1.55;margin:0;">${DATA.hero.subtitle}</p>
</div>
<div style="position:absolute;top:92pt;right:40pt;width:235pt;display:flex;flex-direction:column;gap:6pt;">
  ${m.map((m,i) => {
    const ml = {0:'0',1:'14pt',2:'28pt'}[i];
    const ic = {0:BLUE,1:ORANGE,2:AMBER}[i];
    return `<div class="card" style="margin-left:${ml};padding:10pt 12pt;display:flex;align-items:center;gap:10pt;">
      <div style="width:32pt;height:32pt;border-radius:8pt;background:#${ic};flex-shrink:0;display:flex;align-items:center;justify-content:center;">
        <p style="color:#fff;font-size:14pt;font-weight:700;margin:0;">${String(i+1)}</p>
      </div>
      <div>
        <p style="font-size:5.5pt;color:#${MUTED};text-transform:uppercase;letter-spacing:0.08em;margin:0 0 1pt;" id="mlabel">${m.label}</p>
        <p style="font-size:13pt;font-weight:700;color:#${TFL};margin:0;">${m.value}</p>
      </div>
    </div>`;
  }).join('')}
</div>
`, DARK, s2style)});

// 3. AI TRANSFORM
const t = DATA.transform;
const s3style = makeStyle(DARK2);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div class="content-area">
  <p class="eyebrow">${t.eyebrow}</p>
  <h1 style="font-size:20pt;color:#${TFL};margin:0 0 5pt;">${t.title}</h1>
  <p style="font-size:8.5pt;color:#${TGF};line-height:1.55;max-width:440pt;margin:0;">${t.subtitle}</p>
</div>
<div class="bottom-cards">
  ${t.cards.map(c => `
  <div class="card" style="flex:1;padding:0;overflow:hidden;">
    <div style="height:3pt;background:#${c.color};"></div>
    <div style="padding:10pt 10pt 12pt;">
      <p style="font-size:9pt;font-weight:700;color:#${c.color};text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4pt;">${c.num}</p>
      <h3 style="font-size:10pt;color:#${TFL};margin:0 0 4pt;">${c.title}</h3>
      <p style="font-size:7pt;color:#${TGF};line-height:1.5;margin:0 0 8pt;">${c.desc}</p>
      <div style="display:inline-block;padding:2pt 7pt;border-radius:100px;border:1pt solid #${c.color}22;background:#${c.color}11;">
        <p style="font-size:5.5pt;font-weight:600;color:#${c.color};text-transform:uppercase;letter-spacing:0.08em;margin:0;">${c.tag}</p>
      </div>
    </div>
  </div>`).join('')}
</div>
`, DARK2, s3style)});

// 4. AGENTS
const a = DATA.agents;
const s4style = makeStyle(DARK);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div class="content-area">
  <p class="eyebrow">${a.eyebrow}</p>
  <h1 style="font-size:20pt;color:#${TFL};margin:0;">${a.title}</h1>
</div>
<div style="position:absolute;left:40pt;right:40pt;bottom:24pt;display:grid;grid-template-columns:1fr 1fr;gap:5pt;">
  ${a.cards.map(c => `
  <div class="card" style="padding:0;overflow:hidden;">
    <div style="height:2pt;background:#${c.color};"></div>
    <div style="padding:8pt 9pt 8pt;">
      <p style="font-size:10pt;font-weight:700;color:#${TFL};margin:0 0 1pt;">${c.name}</p>
      <p style="font-size:6pt;font-weight:600;color:#${c.color};text-transform:uppercase;letter-spacing:0.1em;margin:0 0 5pt;">${c.role}</p>
      <p style="font-size:7pt;color:#${TGF};line-height:1.45;margin:0 0 5pt;">${c.desc}</p>
      <p style="font-size:5.5pt;color:#${TGS};margin:0;">${c.tags}</p>
    </div>
  </div>`).join('')}
</div>
`, DARK, s4style)});

// 5. FUNNEL
const fn = DATA.funnel;
const s5style = makeStyle(DARK2);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div class="content-area">
  <p class="eyebrow">${fn.eyebrow}</p>
  <h1 style="font-size:20pt;color:#${TFL};margin:0 0 5pt;">${fn.title}</h1>
  <p style="font-size:8.5pt;color:#${TGF};line-height:1.55;max-width:440pt;margin:0;">${fn.subtitle}</p>
</div>
<div class="bottom-cards" style="bottom:40pt;">
  ${fn.cards.map(c => `
  <div class="card" style="flex:1;padding:0;overflow:hidden;">
    <div style="height:3pt;background:#${c.color};"></div>
    <div style="padding:11pt 10pt 14pt;">
      <p style="font-size:11pt;font-weight:700;color:#${c.color};margin:0 0 5pt;">${c.num}</p>
      <h3 style="font-size:11pt;color:#${TFL};margin:0 0 5pt;">${c.title}</h3>
      <p style="font-size:7.5pt;color:#${TGF};line-height:1.5;margin:0;">${c.desc}</p>
    </div>
  </div>`).join('')}
</div>
`, DARK2, s5style)});

// 6. FLOW
const fl = DATA.flow;
const fc = [BLUE,ORANGE,AMBER,ORANGE,BLUE];
const s6style = makeStyle(DARK);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div class="content-area">
  <p class="eyebrow">${fl.eyebrow}</p>
  <h1 style="font-size:20pt;color:#${TFL};margin:0 0 5pt;">${fl.title}</h1>
  <p style="font-size:8.5pt;color:#${TGF};margin:0;">${fl.subtitle}</p>
</div>
<div style="position:absolute;left:40pt;right:40pt;top:162pt;display:flex;align-items:center;gap:3pt;">
  ${fl.steps.map((s,i) => `
  <div class="card" style="flex:1;padding:10pt;min-height:108pt;">
    <p style="font-size:22pt;font-weight:700;color:#${fc[i]};margin:0 0 4pt;opacity:0.7;">${s.num}</p>
    <p style="font-size:9pt;font-weight:700;color:#${TFL};margin:0 0 3pt;">${s.title}</p>
    <p style="font-size:7pt;color:#${TGF};line-height:1.4;margin:0;">${s.desc}</p>
  </div>
  ${i<4 ? '<div style="flex-shrink:0;width:2pt;height:1pt;background:rgba(255,255,255,0.06);margin:0 2pt;"></div>' : ''}
  `).join('')}
</div>
`, DARK, s6style)});

// 7. DASHBOARD
const db = DATA.dashboard;
const s7style = makeStyle(DARK2);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div style="position:absolute;top:82pt;left:40pt;right:40pt;">
  <p class="eyebrow" style="color:#${AMBER};">${db.eyebrow}</p>
  <h1 style="font-size:16pt;color:#${TFL};line-height:1.2;margin:0 0 10pt;">${db.title}</h1>
</div>
<div style="position:absolute;top:148pt;left:40pt;right:40pt;">
  <div class="card" style="padding:6pt 10pt;display:flex;justify-content:space-between;align-items:center;margin-bottom:5pt;">
    <p style="font-size:6pt;color:#${TGS};margin:0;">${db.dashTitle}</p>
    <div style="display:flex;gap:8pt;">
      ${db.stats.map(s => `
      <div style="display:flex;align-items:center;gap:4pt;">
        <div style="width:5pt;height:5pt;border-radius:50%;background:#${s.color};"></div>
        <p style="font-size:9pt;font-weight:700;color:#${TFL};margin:0;">${s.value}</p>
        <p style="font-size:5pt;color:#${TGS};text-transform:uppercase;margin:0;">${s.label}</p>
      </div>`).join('')}
    </div>
  </div>
  <div style="display:flex;padding:3pt 6pt;border-bottom:1.5pt solid rgba(255,255,255,0.05);margin-bottom:2pt;">
    ${db.cols.map((col,i) => {
      const w = {0:'32%',1:'17%',2:'14%',3:'9%',4:'28%'}[i];
      return `<p style="width:${w};font-size:4.5pt;font-weight:600;color:#${TGS};text-transform:uppercase;letter-spacing:0.06em;margin:0;">${col}</p>`;
    }).join('')}
  </div>
  ${db.rows.map((r,i) => {
    const bc = {risk:BLUE,hot:ORANGE,stalled:AMBER,ok:TGS,won:ORANGE}[r.badgeType];
    return `<div style="display:flex;padding:3pt 6pt;align-items:center;${i%2?'':'background:#'+CARD+';border-radius:3pt;'}">
      <div style="width:32%;"><p style="font-size:6.5pt;font-weight:600;color:#${TFL};margin:0;">${r.name}</p><p style="font-size:5pt;color:#${TGS};margin:1pt 0 0;">${r.meta}</p></div>
      <p style="width:17%;font-size:6pt;font-weight:600;color:#${TFF};margin:0;">${r.stage}</p>
      <p style="width:14%;font-size:6pt;color:#${TGS};margin:0;">${r.touch}</p>
      <p style="width:9%;font-size:8pt;font-weight:700;color:#${TFL};margin:0;">${r.score}</p>
      <p style="width:28%;font-size:5.5pt;font-weight:600;color:#${bc};margin:0;">${r.badge}</p>
    </div>`;
  }).join('')}
</div>
`, DARK2, s7style)});

// 8. KIT
const k = DATA.kit;
const s8style = makeStyle(DARK);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div class="content-area">
  <p class="eyebrow">${k.eyebrow}</p>
  <h1 style="font-size:20pt;color:#${TFL};margin:0 0 5pt;">${k.title}</h1>
  <p style="font-size:8.5pt;color:#${TGF};line-height:1.55;max-width:440pt;margin:0;">${k.subtitle}</p>
</div>
<div class="bottom-cards" style="bottom:32pt;">
  ${k.cards.map(c => `
  <div class="card" style="flex:1;padding:12pt 10pt 14pt;">
    <p style="font-size:18pt;font-weight:700;color:#${AMBER};margin:0 0 5pt;opacity:0.4;">${c.num}</p>
    <h3 style="font-size:9pt;color:#${TFL};margin:0 0 4pt;">${c.title}</h3>
    <p style="font-size:7pt;color:#${TGF};line-height:1.5;margin:0;">${c.desc}</p>
  </div>`).join('')}
</div>
`, DARK, s8style)});

// 9. TEAM
const tm = DATA.team;
const s9style = makeStyle(DARK2);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div class="content-area">
  <p class="eyebrow">${tm.eyebrow}</p>
  <h1 style="font-size:20pt;color:#${TFL};margin:0;">${tm.title}</h1>
</div>
<div style="position:absolute;left:40pt;right:40pt;top:165pt;display:flex;gap:16pt;">
  ${tm.cards.map(c => `
  <div class="card" style="flex:1;padding:0;overflow:hidden;">
    <div style="height:3pt;background:#${c.color};"></div>
    <div style="padding:13pt 15pt 15pt;">
      <p style="font-size:6.5pt;font-weight:600;color:#${c.color};text-transform:uppercase;letter-spacing:0.1em;margin:0 0 3pt;">${c.role}</p>
      <h3 style="font-size:14pt;color:#${TFL};margin:0 0 11pt;">${c.name}</h3>
      <ul style="margin:0;padding:0;list-style:none;">
        ${c.items.map(item => `
        <li style="display:flex;align-items:flex-start;gap:6pt;padding:4pt 0;border-bottom:1pt solid rgba(255,255,255,0.04);">
          <p style="color:#${c.color};font-weight:700;font-size:8pt;margin:0;flex-shrink:0;">-</p>
          <p style="font-size:7.5pt;color:#${TGF};line-height:1.55;margin:0;">${item}</p>
        </li>`).join('')}
      </ul>
    </div>
  </div>`).join('')}
</div>
`, DARK2, s9style)});

// 10. TIMELINE
const tl = DATA.timeline;
const s10style = makeStyle(DARK);
slides.push({html: wrap(`
<div class="brand"><p style="font-size:8pt;font-weight:700;letter-spacing:0.12em;color:#FFFFFF;margin:0;">PROPRIAIA</p></div>
<div class="brand-line"></div>
<div class="content-area">
  <p class="eyebrow">${tl.eyebrow}</p>
  <h1 style="font-size:20pt;color:#${TFL};margin:0;">${tl.title}</h1>
</div>
<div style="position:absolute;left:55pt;right:55pt;top:190pt;">
  <div style="position:relative;display:flex;align-items:flex-start;justify-content:space-between;">
    ${tl.items.map((item,i) => `
    <div style="text-align:center;flex:1;max-width:24%;">
      <div style="width:14pt;height:14pt;border-radius:50%;background:#${item.color};margin:0 auto 12pt;"></div>
      <h4 style="font-size:10pt;color:#${TFL};margin:0 0 3pt;">${item.title}</h4>
      <p style="font-size:7pt;color:#${TGF};line-height:1.45;margin:0;">${item.desc}</p>
    </div>
    ${i<3 ? '<p style="font-size:9pt;font-weight:700;color:#'+AMBER+';margin:3pt 3pt 0;flex-shrink:0;">></p>' : ''}
    `).join('')}
  </div>
</div>
`, DARK, s10style)});

// Write HTML files and convert
async function main() {
  for (let i = 0; i < slides.length; i++) {
    const f = path.join(SLD, `s${String(i+1).padStart(2,'0')}.html`);
    fs.writeFileSync(f, slides[i].html);
  }

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'PropriaAI';
  pptx.title = 'PropriaAI';

  for (let i = 0; i < slides.length; i++) {
    const f = path.join(SLD, `s${String(i+1).padStart(2,'0')}.html`);
    try {
      await html2pptx(f, pptx);
      console.log(`  Slide ${i+1} OK`);
    } catch (e) {
      console.error(`  Slide ${i+1} ERROR:`, e.message);
      throw e;
    }
  }

  await pptx.writeFile({ fileName: OUT });
  console.log(`Saved: ${OUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });

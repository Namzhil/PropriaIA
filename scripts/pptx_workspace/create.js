const sharp = require('sharp');
const pptxgen = require('pptxgenjs');
const html2pptx = require('./html2pptx');
const path = require('path');
const fs = require('fs');

const DATA = require('/Users/namzhil/Files/Coding/Propria/scripts/slides_data_es.json');
const OUT = '/Users/namzhil/Files/Coding/Propria/PropriaAI_Presentacion_ES.pptx';
const IMG = '/Users/namzhil/Files/Coding/Propria/scripts/pptx_workspace/images';
const SLD = '/Users/namzhil/Files/Coding/Propria/scripts/pptx_workspace/slides';

const DARK = '#0c1754', DARK2 = '#0f1a4a', CARD = '#1a2570';
const BLUE = '#2545ff', AMBER = '#ffc13a', ORANGE = '#ff5b22';

function wrap(bodyHtml, bgColor) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:720pt;height:405pt;background:${bgColor};font-family:Arial,sans-serif;display:flex;overflow:hidden;}
h1,h2,h3{font-family:Arial,sans-serif;font-weight:700;}
p{line-height:1.5;}
</style></head><body>${bodyHtml}</body></html>`;
}

async function genBg(name, color1, color2) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="810">
    <defs><radialGradient id="g" cx="50%" cy="0%" r="90%">
      <stop offset="0%" style="stop-color:${color2};stop-opacity:0.12"/>
      <stop offset="100%" style="stop-color:${color1};stop-opacity:1"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="${color1}"/>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(IMG, `bg-${name}.png`));
  return `bg-${name}.png`;
}

async function main() {
  await genBg('dark', DARK, BLUE);

  // SLIDE 1: TITLE
  fs.writeFileSync(path.join(SLD, '01_title.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
    <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
  </div>
</div>
<div style="position:absolute;top:90pt;left:40pt;right:40pt;">
  <h1 style="font-size:32pt;color:#ffffff;line-height:1.12;margin:0;">Departamento de<br>Ventas Llave en Mano<br>para Desarrolladores<br>Off-Plan</h1>
  <p style="font-size:11pt;color:rgba(255,255,255,0.45);margin:16pt 0 0;">Equipo - Playbook - Stack de Ventas - IA &mdash; en 8 semanas</p>
</div>
<div style="position:absolute;bottom:40pt;left:40pt;">
  <p style="font-size:42pt;font-weight:700;color:${BLUE};margin:0;letter-spacing:-0.03em;">PropriaAI</p>
</div>
</div>`, DARK));

  // SLIDE 2: HERO
  const h = DATA.hero;
  fs.writeFileSync(path.join(SLD, '02_hero.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${h.tags}</p>
  <h1 style="font-size:22pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${h.title.replace(/<em>/g,`<span style="color:${BLUE};">`).replace(/<\/em>/g,'</span>')}</h1>
  <p style="font-size:9pt;color:rgba(255,255,255,0.5);margin:0;max-width:420pt;">${h.subtitle}</p>
</div>
<div style="position:absolute;bottom:28pt;left:40pt;right:40pt;display:flex;gap:12pt;">
  ${DATA.metrics.map(m => `
  <div style="flex:1;background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:10pt 12pt;">
    <p style="font-size:6pt;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 3pt;">${m.label}</p>
    <p style="font-size:18pt;font-weight:700;color:#ffffff;margin:0;">${m.value}</p>
  </div>`).join('')}
</div>
</div>`, DARK));

  // SLIDE 3: AI TRANSFORM
  const t = DATA.transform;
  fs.writeFileSync(path.join(SLD, '03_transform.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${t.eyebrow}</p>
  <h1 style="font-size:20pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${t.title}</h1>
  <p style="font-size:9pt;color:rgba(255,255,255,0.5);margin:0;max-width:420pt;">${t.subtitle}</p>
</div>
<div style="position:absolute;bottom:24pt;left:40pt;right:40pt;display:flex;gap:10pt;">
  ${t.cards.map(c => `
  <div style="flex:1;background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:0;position:relative;overflow:hidden;">
    <div style="background:${c.color};height:3pt;"></div>
    <div style="padding:10pt 10pt 12pt;">
      <p style="font-size:10pt;font-weight:700;color:${c.color};text-transform:uppercase;letter-spacing:0.06em;margin:0 0 4pt;">${c.num}</p>
      <h3 style="font-size:10pt;color:#ffffff;font-weight:700;margin:0 0 4pt;">${c.title}</h3>
      <p style="font-size:7pt;color:rgba(255,255,255,0.55);line-height:1.5;margin:0 0 8pt;">${c.desc}</p>
      <div style="display:inline-block;font-size:6pt;font-weight:600;color:${c.color};text-transform:uppercase;letter-spacing:0.08em;background:${c.color}18;padding:2pt 6pt;border-radius:100px;"><p style="margin:0;font-size:6pt;font-weight:600;color:${c.color};text-transform:uppercase;letter-spacing:0.08em;">${c.tag}</p></div>
    </div>
  </div>`).join('')}
</div>
</div>`, DARK2));

  // SLIDE 4: AGENTS
  const a = DATA.agents;
  fs.writeFileSync(path.join(SLD, '04_agents.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${a.eyebrow}</p>
  <h1 style="font-size:20pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${a.title}</h1>
</div>
<div style="position:absolute;bottom:12pt;left:40pt;right:40pt;display:grid;grid-template-columns:1fr 1fr;gap:6pt;grid-template-rows:1fr 1fr;">
  ${a.cards.map(c => `
  <div style="background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:0;position:relative;overflow:hidden;">
    <div style="background:${c.color};height:2pt;"></div>
    <div style="padding:8pt 9pt 7pt;">
      <p style="font-size:10pt;font-weight:700;color:#ffffff;margin:0 0 1pt;">${c.name}</p>
      <p style="font-size:6pt;font-weight:600;color:${c.color};text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5pt;">${c.role}</p>
      <p style="font-size:7pt;color:rgba(255,255,255,0.55);line-height:1.45;margin:0 0 6pt;">${c.desc}</p>
      <p style="font-size:5.5pt;color:rgba(255,255,255,0.25);margin:0;">${c.tags}</p>
    </div>
  </div>`).join('')}
</div>
</div>`, DARK));

  // SLIDE 5: FUNNEL
  const fn = DATA.funnel;
  fs.writeFileSync(path.join(SLD, '05_funnel.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${fn.eyebrow}</p>
  <h1 style="font-size:20pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${fn.title}</h1>
  <p style="font-size:9pt;color:rgba(255,255,255,0.5);margin:0;max-width:400pt;">${fn.subtitle}</p>
</div>
<div style="position:absolute;bottom:28pt;left:40pt;right:40pt;display:flex;gap:10pt;">
  ${fn.cards.map(c => `
  <div style="flex:1;background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:0;overflow:hidden;">
    <div style="background:${c.color};height:3pt;"></div>
    <div style="padding:10pt 10pt 14pt;">
      <p style="font-size:11pt;font-weight:700;color:${c.color};margin:0 0 4pt;">${c.num}</p>
      <h3 style="font-size:11pt;color:#ffffff;font-weight:700;margin:0 0 5pt;">${c.title}</h3>
      <p style="font-size:7.5pt;color:rgba(255,255,255,0.55);line-height:1.5;margin:0;">${c.desc}</p>
    </div>
  </div>`).join('')}
</div>
</div>`, DARK2));

  // SLIDE 6: FLOW
  const fl = DATA.flow;
  const flowColors = [BLUE, ORANGE, AMBER, ORANGE, BLUE];
  fs.writeFileSync(path.join(SLD, '06_flow.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${fl.eyebrow}</p>
  <h1 style="font-size:20pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${fl.title}</h1>
  <p style="font-size:9pt;color:rgba(255,255,255,0.5);margin:0;">${fl.subtitle}</p>
</div>
<div style="position:absolute;top:150pt;left:40pt;right:40pt;display:flex;align-items:center;gap:4pt;">
  ${fl.steps.map((s,i) => `
  <div style="flex:1;background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:9pt;min-height:120pt;">
    <p style="font-size:24pt;font-weight:700;color:${flowColors[i]};margin:0 0 4pt;">${s.num}</p>
    <p style="font-size:9pt;font-weight:700;color:#ffffff;margin:0 0 3pt;">${s.title}</p>
    <p style="font-size:7pt;color:rgba(255,255,255,0.5);line-height:1.4;margin:0;">${s.desc}</p>
  </div>
  ${i < 4 ? '<p style="font-size:12pt;color:' + AMBER + ';margin:0 2pt;flex-shrink:0;">></p>' : ''}
  `).join('')}
</div>
</div>`, DARK));

  // SLIDE 7: DASHBOARD
  const db = DATA.dashboard;
  fs.writeFileSync(path.join(SLD, '07_dashboard.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${db.eyebrow}</p>
  <h1 style="font-size:16pt;color:#ffffff;line-height:1.2;margin:6pt 0 8pt;">${db.title}</h1>
</div>
<div style="position:absolute;top:160pt;left:40pt;right:40pt;">
  <div style="background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:7pt 10pt;display:flex;justify-content:space-between;align-items:center;margin-bottom:5pt;">
    <p style="font-size:6pt;color:rgba(255,255,255,0.3);margin:0;">${db.dashTitle}</p>
    <div style="display:flex;gap:8pt;">
      ${db.stats.map(s => `
      <div style="display:flex;align-items:center;gap:4pt;background:${CARD};padding:3pt 8pt;border-radius:100px;">
        <div style="width:5pt;height:5pt;border-radius:50%;background:${s.color};"></div>
        <p style="font-size:9pt;font-weight:700;color:#ffffff;margin:0;">${s.value}</p>
        <p style="font-size:5pt;color:rgba(255,255,255,0.3);text-transform:uppercase;margin:0;">${s.label}</p>
      </div>`).join('')}
    </div>
  </div>
  ${(() => {
    const cols = db.cols.map((col,i) => {
      const w = {0:'32%',1:'17%',2:'14%',3:'9%',4:'28%'}[i];
      return `<p style="width:${w};font-size:4.5pt;font-weight:600;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.06em;margin:0;">${col}</p>`;
    }).join('');
    return `<div style="display:flex;padding:3pt 6pt;border-bottom:1.5pt solid rgba(255,255,255,0.05);margin-bottom:2pt;">${cols}</div>`;
  })()}
  ${db.rows.map((r,i) => {
    const bc = {risk:BLUE,hot:ORANGE,stalled:AMBER,ok:'rgba(255,255,255,0.2)',won:ORANGE}[r.badgeType];
    return `
    <div style="display:flex;padding:3pt 6pt;${i%2===0?'background:'+CARD+';border-radius:3pt;':''}align-items:center;">
      <div style="width:32%;">
        <p style="font-size:6.5pt;font-weight:600;color:#ffffff;margin:0;">${r.name}</p>
        <p style="font-size:5pt;color:rgba(255,255,255,0.25);margin:1pt 0 0;">${r.meta}</p>
      </div>
      <p style="width:17%;font-size:6pt;font-weight:600;color:rgba(255,255,255,0.8);margin:0;">${r.stage}</p>
      <p style="width:14%;font-size:6pt;color:rgba(255,255,255,0.4);margin:0;">${r.touch}</p>
      <p style="width:9%;font-size:8pt;font-weight:700;color:#ffffff;margin:0;">${r.score}</p>
      <p style="width:28%;font-size:5.5pt;font-weight:600;color:${bc};margin:0;">${r.badge}</p>
    </div>`;
  }).join('')}
</div>
</div>`, DARK2));

  // SLIDE 8: KIT
  const k = DATA.kit;
  fs.writeFileSync(path.join(SLD, '08_kit.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${k.eyebrow}</p>
  <h1 style="font-size:20pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${k.title}</h1>
  <p style="font-size:9pt;color:rgba(255,255,255,0.5);margin:0;max-width:420pt;">${k.subtitle}</p>
</div>
<div style="position:absolute;bottom:22pt;left:40pt;right:40pt;display:flex;gap:8pt;">
  ${k.cards.map(c => `
  <div style="flex:1;background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:10pt 10pt 12pt;">
    <p style="font-size:16pt;font-weight:700;color:${AMBER};opacity:0.5;margin:0 0 4pt;">${c.num}</p>
    <h3 style="font-size:9pt;color:#ffffff;font-weight:700;margin:0 0 4pt;">${c.title}</h3>
    <p style="font-size:7pt;color:rgba(255,255,255,0.55);line-height:1.5;margin:0;">${c.desc}</p>
  </div>`).join('')}
</div>
</div>`, DARK));

  // SLIDE 9: TEAM
  const tm = DATA.team;
  fs.writeFileSync(path.join(SLD, '09_team.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${tm.eyebrow}</p>
  <h1 style="font-size:20pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${tm.title}</h1>
</div>
<div style="position:absolute;top:175pt;left:40pt;right:40pt;display:flex;gap:14pt;">
  ${tm.cards.map(c => `
  <div style="flex:1;background:${CARD};border-radius:8pt;border:1pt solid rgba(255,255,255,0.06);padding:0;overflow:hidden;">
    <div style="background:${c.color};height:3pt;"></div>
    <div style="padding:12pt 14pt 14pt;">
      <p style="font-size:6.5pt;font-weight:600;color:${c.color};text-transform:uppercase;letter-spacing:0.1em;margin:0 0 3pt;">${c.role}</p>
      <h3 style="font-size:14pt;color:#ffffff;font-weight:700;margin:0 0 10pt;">${c.name}</h3>
      <ul style="margin:0;padding:0;list-style:none;">
        ${c.items.map(item => `
        <li style="font-size:7.5pt;color:rgba(255,255,255,0.55);line-height:1.6;padding:3pt 0;border-bottom:1pt solid rgba(255,255,255,0.04);display:flex;align-items:flex-start;gap:5pt;">
          <p style="color:${c.color};font-weight:700;margin:0;flex-shrink:0;">-</p><p style="margin:0;">${item}</p>
        </li>`).join('')}
      </ul>
    </div>
  </div>`).join('')}
</div>
</div>`, DARK2));

  // SLIDE 10: TIMELINE
  const tl = DATA.timeline;
  fs.writeFileSync(path.join(SLD, '10_timeline.html'), wrap(`
<div style="position:absolute;top:0;left:0;right:0;bottom:0;">
<div style="position:absolute;top:20pt;left:40pt;right:40pt;border-bottom:1pt solid ${BLUE};padding-bottom:8pt;">
  <p style="font-weight:700;font-size:9pt;color:#ffffff;letter-spacing:0.1em;margin:0;">PROPRIAIA</p>
</div>
<div style="position:absolute;top:80pt;left:40pt;right:40pt;">
  <p style="font-size:7pt;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:0.12em;margin:0;">${tl.eyebrow}</p>
  <h1 style="font-size:20pt;color:#ffffff;line-height:1.15;margin:6pt 0 4pt;">${tl.title}</h1>
</div>
<div style="position:absolute;top:185pt;left:50pt;right:50pt;">
  <div style="position:absolute;top:7pt;left:10%;right:10%;height:1pt;background:rgba(255,255,255,0.12);"></div>
  <div style="display:flex;align-items:flex-start;justify-content:space-between;position:relative;z-index:1;">
    ${tl.items.map((item,i) => `
    <div style="text-align:center;flex:1;max-width:24%;">
      <div style="width:13pt;height:13pt;border-radius:50%;background:${item.color};margin:0 auto 10pt;"></div>
      <p style="font-size:10pt;font-weight:700;color:#ffffff;margin:0 0 3pt;">${item.title}</p>
      <p style="font-size:7pt;color:rgba(255,255,255,0.45);line-height:1.4;margin:0;">${item.desc}</p>
    </div>
    ${i < 3 ? '<p style="font-size:8pt;color:' + AMBER + ';margin:4pt 2pt 0;flex-shrink:0;">></p>' : ''}
    `).join('')}
  </div>
</div>
</div>`, DARK));

  // Build PPTX
  console.log('Converting HTML slides to PPTX...');
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'PropriaAI';
  pptx.title = 'PropriaAI -- Departamento de Ventas con IA';

  const slides = [
    '01_title', '02_hero', '03_transform', '04_agents',
    '05_funnel', '06_flow', '07_dashboard', '08_kit',
    '09_team', '10_timeline'
  ];

  for (const s of slides) {
    const htmlPath = path.join(SLD, s + '.html');
    try {
      const { slide, placeholders } = await html2pptx(htmlPath, pptx);

      // Add gradient background image to slide
      slide.background = { path: path.join(IMG, 'bg-dark.png') };

      console.log(`  ${s} -> OK`);
    } catch (err) {
      console.error(`  ${s} -> ERROR:`, err.message);
      throw err;
    }
  }

  await pptx.writeFile({ fileName: OUT });
  console.log(`PPTX saved: ${OUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SLD = '/Users/namzhil/Files/Coding/Propria/scripts/pptx_workspace/slides';
const OUT = '/Users/namzhil/Files/Coding/Propria/scripts/pptx_workspace';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 960, height: 540 });

  const slides = ['01_title','02_hero','03_transform','04_agents','05_funnel','06_flow','07_dashboard','08_kit','09_team','10_timeline'];

  const w = 3; // 3 per row
  const thumbW = 320, thumbH = 180;
  const gap = 4;
  const rows = Math.ceil(slides.length / w);
  const totalW = w * (thumbW + gap) - gap;
  const totalH = rows * (thumbH + gap) - gap;

  const canvas = `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#1a1a2e;display:flex;justify-content:center;align-items:center;min-height:100vh;}
.grid{display:flex;flex-wrap:wrap;gap:${gap}px;width:${totalW}px;padding:20px;}
.cell{width:${thumbW}px;height:${thumbH}px;border-radius:6px;overflow:hidden;position:relative;border:2px solid rgba(255,255,255,0.1);}
.cell img{width:100%;height:100%;object-fit:cover;}
.label{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.7);padding:2px 6px;font-family:Arial;font-size:11px;color:#ccc;text-align:center;}
</style></head><body><div class="grid">`;

  let cellHtml = '';
  for (let i = 0; i < slides.length; i++) {
    const htmlPath = path.join(SLD, slides[i] + '.html');
    const ssPath = path.join(OUT, `thumb_${slides[i]}.png`);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: ssPath, clip: { x: 0, y: 0, width: 720, height: 405 } });
    cellHtml += `<div class="cell"><img src="thumb_${slides[i]}.png"><div class="label">Slide ${i+1}: ${slides[i].replace('0','').replace('_',' ')}</div></div>`;
    console.log(`  Screenshot: ${slides[i]}`);
  }

  fs.writeFileSync(path.join(OUT, 'preview.html'), canvas + cellHtml + `</div></body></html>`);

  await page.goto(`file://${path.join(OUT, 'preview.html')}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT, 'preview_grid.png'), fullPage: true });
  console.log('Preview grid saved: preview_grid.png');

  await browser.close();
})().catch(console.error);

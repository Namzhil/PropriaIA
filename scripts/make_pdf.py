import json, re
from playwright.sync_api import sync_playwright

with open("/Users/namzhil/Files/Coding/Propria/scripts/slides_data_es.json") as f:
    d = json.load(f)

HL = lambda s: s
BG = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body { font-family: 'DM Sans', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

h1, h2, h3, h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

.slide {
  width: 297mm; height: 210mm;
  position: relative; overflow: hidden;
  page-break-after: always;
}

/* HEADER BAR */
.hdr {
  position: absolute; top: 0; left: 0; right: 0; height: 22mm;
  display: flex; align-items: flex-end; padding: 0 16mm 4mm;
}
.hdr-brand {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 8pt; font-weight: 800; letter-spacing: 0.12em;
}
.hdr-line {
  position: absolute; bottom: 0; left: 16mm; width: 22mm; height: 1.5pt;
}

/* EYEBROW */
.eyebrow {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 6.5pt; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  margin-bottom: 3mm;
  display: flex; align-items: center; gap: 2mm;
}
.eyebrow::before { content: ''; width: 8mm; height: 1pt; flex-shrink: 0; }

/* TITLE */
.slide-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 19pt; font-weight: 800; line-height: 1.15; letter-spacing: -0.03em;
  margin-bottom: 3mm; max-width: 85%;
}
.slide-subtitle {
  font-size: 8.5pt; line-height: 1.55; max-width: 65%; opacity: 0.65;
}

/* CONTENT AREA */
.content { position: absolute; left: 16mm; right: 16mm; }

/* DARK THEME */
.slide-dark { background: #0c1754; }
.slide-dark .hdr-brand { color: #fff; }
.slide-dark .hdr-line { background: #2545ff; }
.slide-dark .slide-title { color: #fff; }
.slide-dark .slide-subtitle { color: rgba(255,255,255,0.65); }
.slide-dark .eyebrow { color: #ffc13a; }
.slide-dark .eyebrow::before { background: #ffc13a; }

/* DARK BG2 */
.slide-dark2 { background: #0f1a4a; }
.slide-dark2 .hdr-brand { color: #fff; }
.slide-dark2 .hdr-line { background: #2545ff; }
.slide-dark2 .slide-title { color: #fff; }
.slide-dark2 .slide-subtitle { color: rgba(255,255,255,0.65); }
.slide-dark2 .eyebrow { color: #ffc13a; }
.slide-dark2 .eyebrow::before { background: #ffc13a; }

/* WHITE THEME */
.slide-light { background: #fff; }
.slide-light .hdr-brand { color: #0c1754; }
.slide-light .hdr-line { background: #2545ff; }
.slide-light .slide-title { color: #0c1754; }
.slide-light .slide-subtitle { color: rgba(12,23,84,0.55); }
.slide-light .eyebrow { color: #2545ff; }
.slide-light .eyebrow::before { background: #2545ff; }

/* CARD STYLE */
.card {
  background: #1a2570; border-radius: 9pt;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 10pt 9pt; position: relative;
  transition: transform .2s;
}
.card-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 9pt; font-weight: 700; letter-spacing: 0.06em;
  text-transform: uppercase; margin-bottom: 2mm;
}
.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 2mm;
}
.card-desc { font-size: 7pt; color: rgba(255,255,255,0.65); line-height: 1.5; margin-bottom: 3mm; }
.card-tag {
  display: inline-block; padding: 1.5pt 6pt; border-radius: 100px;
  font-size: 5.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
}

/* CARD ACCENT TOP LINE */
.card-accent { position: absolute; top: 0; left: 0; right: 0; height: 2pt; border-radius: 9pt 9pt 0 0; }

/* AGENT CARD */
.agent-card {
  background: #1a2570; border-radius: 9pt;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 8pt 8pt 7pt; position: relative; overflow: hidden;
  display: flex; flex-direction: column;
}
.agent-accent { position: absolute; top: 0; left: 0; right: 0; height: 2pt; }
.agent-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff; margin-bottom: 1mm; }
.agent-role { font-size: 5.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3mm; }
.agent-desc { font-size: 6.5pt; color: rgba(255,255,255,0.65); line-height: 1.5; flex: 1; margin-bottom: 3mm; }
.agent-tags { font-size: 5.5pt; color: rgba(255,255,255,0.35); }
</style>
</head>
<body>
"""

def slide(bg_class, eyebrow, title, subtitle=""):
    sub_html = f'<div class="slide-subtitle">{subtitle}</div>' if subtitle else ""
    e_html = f'<div class="eyebrow">{eyebrow}</div>' if eyebrow else ""
    return f"""<section class="slide {bg_class}">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top: 28mm;">
    {e_html}
    <div class="slide-title">{title}</div>
    {sub_html}
  </div>
</section>
"""

# ---- SLIDE 1: TITLE ----
slides = []
slides.append(f"""<section class="slide slide-dark">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div style="position:absolute;left:16mm;top:9mm;width:50mm;height:1.5pt;background:#2545ff;"></div>
  <div style="position:absolute;left:16mm;top:36mm;font-family:'Plus Jakarta Sans',sans-serif;font-size:30pt;font-weight:800;color:#fff;line-height:1.12;letter-spacing:-0.03em;">
    Departamento de<br>Ventas Llave en Mano<br>para Desarrolladores<br>Off-Plan
  </div>
  <div style="position:absolute;left:16mm;top:115mm;font-size:10pt;color:rgba(255,255,255,0.5);">
    Equipo &middot; Playbook &middot; Stack de Ventas &middot; IA &mdash; en 8 semanas
  </div>
  <div style="position:absolute;left:16mm;bottom:10mm;display:flex;gap:6mm;align-items:flex-end;">
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:40pt;font-weight:800;color:#2545ff;line-height:1;">PropriaAI</div>
  </div>
</section>""")

# ---- SLIDE 2: HERO ----
m = d["metrics"]
metrics_html = "".join(f"""
    <div style="background:#1a2570;border-radius:9pt;border:1px solid rgba(255,255,255,0.08);padding:8pt 9pt;width:72mm;">
      <div style="font-size:6pt;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1mm;">{m["label"].upper()}</div>
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:16pt;font-weight:700;color:#fff;">{m["value"]}</div>
    </div>""" for m in d["metrics"])
slides.append(f"""<section class="slide slide-dark">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{d["hero"]["tags"]}</div>
    <div class="slide-title">{d["hero"]["title"].replace("<em>", '<span style="color:#2545ff;display:inline-block;position:relative;">').replace("</em>", "</span>")}</div>
    <div class="slide-subtitle" style="max-width:75%;">{d["hero"]["subtitle"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;bottom:16mm;display:flex;gap:5mm;justify-content:space-between;">
    {metrics_html}
  </div>
</section>""")

# ---- SLIDE 3: AI TRANSFORM ----
t = d["transform"]
cards_html = "".join(f"""
    <div class="card" style="flex:1;min-width:0;">
      <div class="card-accent" style="background:{c['color']};"></div>
      <div class="card-num" style="color:{c['color']};">{c['num']}</div>
      <div class="card-title">{c['title']}</div>
      <div class="card-desc">{c['desc']}</div>
      <div class="card-tag" style="background:rgba({','.join(str(int(c['color'][i:i+2],16)) for i in (1,3,5))},0.1);color:{c['color']};border:1px solid {c['color']}22;">{c['tag']}</div>
    </div>""" for c in t["cards"])
slides.append(f"""<section class="slide slide-dark2">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{t["eyebrow"]}</div>
    <div class="slide-title">{t["title"]}</div>
    <div class="slide-subtitle">{t["subtitle"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;bottom:18mm;display:flex;gap:5mm;">
    {cards_html}
  </div>
</section>""")

# ---- SLIDE 4: AGENTS ----
a = d["agents"]
agents_html = "".join(f"""
    <div class="agent-card" style="width:122mm;">
      <div class="agent-accent" style="background:{c['color']};"></div>
      <div class="agent-name">{c['name']}</div>
      <div class="agent-role" style="color:{c['color']};">{c['role']}</div>
      <div class="agent-desc">{c['desc']}</div>
      <div class="agent-tags">{c['tags']}</div>
    </div>""" for c in a["cards"])
slides.append(f"""<section class="slide slide-dark">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{a["eyebrow"]}</div>
    <div class="slide-title">{a["title"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;bottom:8mm;display:grid;grid-template-columns:1fr 1fr;gap:4mm;">
    {agents_html}
  </div>
</section>""")

# ---- SLIDE 5: FUNNEL ----
fn = d["funnel"]
funnel_html = "".join(f"""
    <div class="card" style="flex:1;min-width:0;">
      <div class="card-accent" style="background:{c['color']};"></div>
      <div class="card-num" style="color:{c['color']};">{c['num']}</div>
      <div class="card-title">{c['title']}</div>
      <div class="card-desc">{c['desc']}</div>
    </div>""" for c in fn["cards"])
slides.append(f"""<section class="slide slide-dark2">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{fn["eyebrow"]}</div>
    <div class="slide-title">{fn["title"]}</div>
    <div class="slide-subtitle">{fn["subtitle"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;bottom:20mm;display:flex;gap:5mm;">
    {funnel_html}
  </div>
</section>""")

# ---- SLIDE 6: FLOW ----
fl = d["flow"]
flow_steps = []
for i, s in enumerate(fl["steps"]):
    colors = ["#2545ff","#ff5b22","#ffc13a","#ff5b22","#2545ff"]
    arrow = '<div style="font-size:10pt;color:#ffc13a;display:flex;align-items:center;">→</div>' if i < 4 else ""
    flow_steps.append(f"""
    <div style="background:#1a2570;border-radius:9pt;border:1px solid rgba(255,255,255,0.08);padding:8pt;width:44mm;height:44mm;display:flex;flex-direction:column;">
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22pt;font-weight:800;color:{colors[i]};margin-bottom:2mm;">{s['num']}</div>
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:700;color:#fff;margin-bottom:1mm;">{s['title']}</div>
      <div style="font-size:6.5pt;color:rgba(255,255,255,0.6);line-height:1.4;">{s['desc']}</div>
    </div>""")
    if arrow:
        flow_steps.append(arrow)
flow_html = f"""<div style="display:flex;align-items:center;gap:3mm;justify-content:space-between;">{''.join(flow_steps)}</div>"""
slides.append(f"""<section class="slide slide-dark">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{fl["eyebrow"]}</div>
    <div class="slide-title">{fl["title"]}</div>
    <div class="slide-subtitle">{fl["subtitle"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;top:100mm;">
    {flow_html}
  </div>
</section>""")

# ---- SLIDE 7: DASHBOARD ----
db = d["dashboard"]
stats_html = "".join(f"""
    <div style="background:#1a2570;border-radius:100px;padding:3pt 9pt;display:flex;align-items:center;gap:3mm;">
      <div style="width:5pt;height:5pt;border-radius:50%;background:{s['color']};"></div>
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:9pt;font-weight:700;color:#fff;">{s['value']}</div>
      <div style="font-size:5.5pt;color:rgba(255,255,255,0.35);text-transform:uppercase;">{s['label']}</div>
    </div>""" for s in db["stats"])
cols_html = "".join(f"""<div style="font-size:5pt;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.35);flex:{w};">{col}</div>""" for col, w in zip(db["cols"], [2.5,1.4,1.2,0.8,2.6]))
rows_html = ""
for i, r in enumerate(db["rows"]):
    bg = "background:#1a2570;" if i % 2 == 0 else ""
    badge_colors = {"risk":"#2545ff","hot":"#ff5b22","stalled":"#ffc13a","ok":"rgba(255,255,255,0.35)","won":"#ff5b22"}
    bc = badge_colors.get(r["badgeType"], "rgba(255,255,255,0.35)")
    rows_html += f"""<div style="display:flex;padding:3pt 0;{bg}align-items:center;">
      <div style="flex:2.5;padding:0 4pt;">
        <div style="font-weight:600;font-size:6.5pt;color:#fff;">{r['name']}</div>
        <div style="font-size:5pt;color:rgba(255,255,255,0.3);">{r['meta']}</div>
      </div>
      <div style="flex:1.4;font-size:6.5pt;color:#fff;font-weight:600;">{r['stage']}</div>
      <div style="flex:1.2;font-size:6pt;color:rgba(255,255,255,0.5);">{r['touch']}</div>
      <div style="flex:0.8;font-family:'Plus Jakarta Sans',sans-serif;font-size:8pt;font-weight:700;color:#fff;">{r['score']}</div>
      <div style="flex:2.6;font-size:5.5pt;color:{bc};font-weight:600;padding:2pt 0;">&bull; {r['badge']}</div>
    </div>"""
slides.append(f"""<section class="slide slide-dark2">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{db["eyebrow"]}</div>
    <div class="slide-title" style="font-size:15pt;max-width:95%;">{db["title"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;top:80mm;">
    <div style="background:#1a2570;border-radius:9pt;border:1px solid rgba(255,255,255,0.08);padding:6pt 8pt;display:flex;justify-content:space-between;align-items:center;margin-bottom:4mm;">
      <div style="font-size:6pt;color:rgba(255,255,255,0.35);">{db["dashTitle"]}</div>
      <div style="display:flex;gap:3mm;">{stats_html}</div>
    </div>
    <div style="display:flex;padding:3pt 4pt;border-bottom:2px solid rgba(255,255,255,0.06);margin-bottom:1mm;">{cols_html}</div>
    {rows_html}
  </div>
</section>""")

# ---- SLIDE 8: KIT ----
k = d["kit"]
kit_html = "".join(f"""
    <div class="card" style="flex:1;min-width:0;">
      <div class="card-num" style="color:#ffc13a;opacity:0.5;font-size:14pt;">{c['num']}</div>
      <div class="card-title">{c['title']}</div>
      <div class="card-desc">{c['desc']}</div>
    </div>""" for c in k["cards"])
slides.append(f"""<section class="slide slide-dark">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{k["eyebrow"]}</div>
    <div class="slide-title">{k["title"]}</div>
    <div class="slide-subtitle">{k["subtitle"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;bottom:18mm;display:flex;gap:4mm;">
    {kit_html}
  </div>
</section>""")

# ---- SLIDE 9: TEAM ----
tm = d["team"]
team_html = "".join(f"""
    <div class="card" style="flex:1;min-width:0;">
      <div class="card-accent" style="background:{c['color']};height:2.5pt;"></div>
      <div class="agent-role" style="font-size:6pt;color:{c['color']};margin-bottom:1mm;">{c['role']}</div>
      <div class="card-title" style="font-size:13pt;margin-bottom:4mm;">{c['name']}</div>
      {"".join(f'<div style="font-size:7pt;color:rgba(255,255,255,0.65);line-height:1.7;padding:2mm 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:{c["color"]};font-weight:700;">→</span> {item}</div>' for item in c["items"])}
    </div>""" for c in tm["cards"])
slides.append(f"""<section class="slide slide-dark2">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{tm["eyebrow"]}</div>
    <div class="slide-title">{tm["title"]}</div>
  </div>
  <div style="position:absolute;left:16mm;right:16mm;top:85mm;display:flex;gap:6mm;">
    {team_html}
  </div>
</section>""")

# ---- SLIDE 10: TIMELINE ----
tl = d["timeline"]
timeline_items = []
for i, item in enumerate(tl["items"]):
    timeline_items.append(f"""
    <div style="text-align:center;flex:1;">
      <div style="margin:0 auto 4mm;width:9pt;height:9pt;border-radius:50%;background:{item['color']};border:3px solid #0c1754;"></div>
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:9pt;font-weight:700;color:#fff;margin-bottom:1.5mm;">{item['title']}</div>
      <div style="font-size:6.5pt;color:rgba(255,255,255,0.55);line-height:1.4;">{item['desc']}</div>
    </div>""")
    if i < 3:
        timeline_items.append('<div style="font-size:8pt;color:#ffc13a;">→</div>')
timeline_html = f"""<div style="display:flex;align-items:flex-start;justify-content:space-between;">{''.join(timeline_items)}</div>"""
slides.append(f"""<section class="slide slide-dark">
  <div class="hdr"><span class="hdr-brand">PROPRIAIA</span><div class="hdr-line"></div></div>
  <div class="content" style="top:28mm;">
    <div class="eyebrow">{tl["eyebrow"]}</div>
    <div class="slide-title">{tl["title"]}</div>
  </div>
  <div style="position:absolute;left:20mm;right:20mm;top:95mm;">
    <div style="position:absolute;top:4.5pt;left:10%;right:10%;height:1pt;background:linear-gradient(90deg,#2545ff,#ffc13a,#ff5b22,rgba(255,255,255,0.1));"></div>
    {timeline_html}
  </div>
</section>""")

END = "</body></html>"
html = BG + "\n".join(slides) + END

HTML_PATH = "/Users/namzhil/Files/Coding/Propria/scripts/slides.html"
with open(HTML_PATH, "w") as f:
    f.write(html)

PDF_PATH = "/Users/namzhil/Files/Coding/Propria/PropriaAI_Presentacion_ES.pdf"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{HTML_PATH}", wait_until="networkidle")
    page.pdf(path=PDF_PATH, format="A4", landscape=True, print_background=True)
    browser.close()

print(f"PDF saved: {PDF_PATH}")

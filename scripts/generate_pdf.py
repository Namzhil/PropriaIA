import json
from fpdf import FPDF

DICT_PATH = "/Users/namzhil/Files/Coding/Propria/dictionaries/es.json"
OUTPUT = "/Users/namzhil/Files/Coding/Propria/PropriaAI_Presentacion_ES.pdf"

def clean(s):
    return s.replace('\u2014', '--').replace('\u2013', '-').replace('\u2019', "'").replace('\u2018', "'").replace('\u201c', '"').replace('\u201d', '"').replace('\u2192', '->').replace('\u00b7', '-').replace('\u2026', '...').replace('\u00a0', ' ')

def clean_dict(obj):
    if isinstance(obj, str):
        return clean(obj)
    if isinstance(obj, list):
        return [clean_dict(v) for v in obj]
    if isinstance(obj, dict):
        return {k: clean_dict(v) for k, v in obj.items()}
    return obj

with open(DICT_PATH) as f:
    d = clean_dict(json.load(f))

DARK = (12, 23, 84)
DARK_CARD = (26, 37, 112)
BLUE = (37, 69, 255)
AMBER = (255, 193, 58)
SAGE = (255, 91, 34)
WHITE = (255, 255, 255)
LIGHT_GRAY = (200, 205, 220)
MUTED = (138, 138, 138)
DARK_BG2 = (15, 26, 74)

W, H = 297, 210

pdf = FPDF(orientation="L", unit="mm", format="A4")
pdf.set_auto_page_break(False)


def add_slide(bg=DARK, title=None, subtitle=None, eyebrow=None):
    pdf.add_page()
    pdf.set_fill_color(*bg)
    pdf.rect(0, 0, W, H, "F")
    pdf.set_text_color(*WHITE)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*WHITE)
    pdf.set_x(20)
    pdf.set_y(10)
    pdf.cell(0, 5, "PROPRIAIA", align="L")
    pdf.line(20, 17, 40, 17)
    pdf.set_draw_color(*BLUE)
    pdf.set_line_width(0.6)
    pdf.set_draw_color(*BLUE)
    pdf.set_line_width(0.6)
    if eyebrow:
        pdf.set_y(35)
        pdf.set_x(20)
        pdf.set_font("Helvetica", "B", 7)
        pdf.set_text_color(*AMBER)
        pdf.cell(0, 4, f"--  {eyebrow.upper()}", align="L")
    if title:
        pdf.set_y(44 if eyebrow else 40)
        pdf.set_x(20)
        pdf.set_font("Helvetica", "B", 22)
        pdf.set_text_color(*WHITE)
        pdf.multi_cell(W - 40, 10, title, align="L")
    if subtitle:
        y_after = pdf.get_y() + 3
        pdf.set_y(y_after)
        pdf.set_x(20)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*LIGHT_GRAY)
        pdf.multi_cell(W - 40, 5.5, subtitle, align="L")
    pdf.set_text_color(*WHITE)

# --- 1. TITLE ---
pdf.add_page()
pdf.set_fill_color(*DARK)
pdf.rect(0, 0, W, H, "F")
pdf.set_font("Helvetica", "B", 10)
pdf.set_text_color(*WHITE)
pdf.set_xy(20, 12)
pdf.cell(0, 5, "PROPRIAIA", align="L")
# Big title
pdf.set_font("Helvetica", "B", 36)
pdf.set_text_color(*WHITE)
pdf.set_xy(20, 55)
pdf.multi_cell(W - 40, 14, "Departamento de Ventas\nLlave en Mano para\nDesarrolladores Off-Plan")
# Subtitle
pdf.set_y(pdf.get_y() + 8)
pdf.set_x(20)
pdf.set_font("Helvetica", "", 12)
pdf.set_text_color(*LIGHT_GRAY)
pdf.cell(0, 6, clean("Equipo - Playbook - Stack de Ventas - IA -- en 8 semanas"), align="L")
# Accent line
pdf.set_draw_color(*BLUE)
pdf.set_line_width(1)
pdf.line(20, 48, 120, 48)

# --- 2. HERO ---
add_slide(bg=DARK, title="Impulsa tus ventas con IA en 1 mes",
          subtitle=d["hero"]["subtitle"],
          eyebrow=d["hero"]["tag1"] + " · " + d["hero"]["tag2"] + " · " + d["hero"]["tag3"])
y_card = 75
for i, (label, value) in enumerate([
    (d["metrics"]["transform"], d["metrics"]["transformTime"]),
    (d["metrics"]["agents"], d["metrics"]["agentsCount"]),
    (d["metrics"]["outcome"], d["metrics"]["outcomeResult"]),
]):
    x_off = 20 + i * 90
    pdf.set_fill_color(*DARK_CARD)
    pdf.rect(x_off, y_card, 80, 28, "F")
    pdf.set_font("Helvetica", "", 7)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(x_off + 6, y_card + 4)
    pdf.cell(68, 4, label.upper(), align="L")
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_off + 6, y_card + 12)
    pdf.cell(68, 8, value, align="L")

# --- 3. AI TRANSFORM ---
add_slide(bg=DARK_BG2,
          title=d["transform"]["title"],
          subtitle=d["transform"]["desc"],
          eyebrow=d["transform"]["eyebrow"])
cards = [
    ("01", d["transform"]["card1Title"], d["transform"]["card1Desc"], d["transform"]["card1Tag"], BLUE),
    ("02", d["transform"]["card2Title"], d["transform"]["card2Desc"], d["transform"]["card2Tag"], SAGE),
    ("03", d["transform"]["card3Title"], d["transform"]["card3Desc"], d["transform"]["card3Tag"], AMBER),
]
y_c = 72
for i, (num, title, desc, tag, accent) in enumerate(cards):
    x_c = 20 + i * 86
    pdf.set_fill_color(*DARK_CARD)
    pdf.set_draw_color(*accent)
    pdf.rect(x_c, y_c, 80, 55, "DF")
    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(*accent)
    pdf.set_xy(x_c + 6, y_c + 4)
    pdf.cell(70, 12, num, align="R")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_c + 6, y_c + 18)
    pdf.cell(68, 6, title, align="L")
    pdf.set_font("Helvetica", "", 7.5)
    pdf.set_text_color(*LIGHT_GRAY)
    pdf.set_xy(x_c + 6, y_c + 26)
    pdf.multi_cell(68, 4, desc, align="L")
    pdf.set_font("Helvetica", "", 6.5)
    pdf.set_text_color(*accent)
    pdf.set_xy(x_c + 6, y_c + 48)
    pdf.cell(68, 4, tag.upper(), align="L")

# --- 4. AGENTS ---
add_slide(bg=DARK,
          title=d["agents"]["title"],
          eyebrow=d["agents"]["eyebrow"])
agent_tags = [t.split(", ") for t in [
    d["agents"]["agent1Tags"], d["agents"]["agent2Tags"],
    d["agents"]["agent3Tags"], d["agents"]["agent4Tags"],
]]
agent_data = [
    (d["agents"]["agent1Name"], d["agents"]["agent1Role"], d["agents"]["agent1Desc"], BLUE),
    (d["agents"]["agent2Name"], d["agents"]["agent2Role"], d["agents"]["agent2Desc"], SAGE),
    (d["agents"]["agent3Name"], d["agents"]["agent3Role"], d["agents"]["agent3Desc"], AMBER),
    (d["agents"]["agent4Name"], d["agents"]["agent4Role"], d["agents"]["agent4Desc"], (100, 100, 100)),
]
y_a = 68
for i, (name, role, desc, accent) in enumerate(agent_data):
    x_a = 20 + (i % 2) * 134
    y_row = y_a + (i // 2) * 55
    pdf.set_fill_color(*DARK_CARD)
    pdf.rect(x_a, y_row, 124, 50, "F")
    pdf.set_draw_color(*accent)
    pdf.set_line_width(0.6)
    pdf.line(x_a, y_row, x_a + 124, y_row)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_a + 7, y_row + 5)
    pdf.cell(110, 5, name, align="L")
    pdf.set_font("Helvetica", "", 6.5)
    pdf.set_text_color(*accent)
    pdf.set_xy(x_a + 7, y_row + 12)
    pdf.cell(110, 3, role.upper(), align="L")
    pdf.set_font("Helvetica", "", 7.5)
    pdf.set_text_color(*LIGHT_GRAY)
    pdf.set_xy(x_a + 7, y_row + 20)
    pdf.multi_cell(110, 3.5, desc, align="L")
    tags_str = "  ·  ".join(agent_tags[i][:4])
    pdf.set_font("Helvetica", "", 6)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(x_a + 7, y_row + 40)
    pdf.cell(110, 3, tags_str, align="L")

# --- 5. FUNNEL ---
add_slide(bg=DARK_BG2,
          title=d["funnel"]["title"],
          subtitle=d["funnel"]["desc"],
          eyebrow=d["funnel"]["eyebrow"])
funnel_cards = [
    (d["funnel"]["card1Num"], d["funnel"]["card1Title"], d["funnel"]["card1Desc"].replace("<strong>", "").replace("</strong>", ""), BLUE),
    (d["funnel"]["card2Num"], d["funnel"]["card2Title"], d["funnel"]["card2Desc"].replace("<strong>", "").replace("</strong>", ""), SAGE),
    (d["funnel"]["card3Num"], d["funnel"]["card3Title"], d["funnel"]["card3Desc"].replace("<strong>", "").replace("</strong>", ""), AMBER),
]
y_f = 70
for i, (num, title, desc, accent) in enumerate(funnel_cards):
    x_f = 20 + i * 86
    pdf.set_fill_color(*DARK_CARD)
    pdf.rect(x_f, y_f, 80, 55, "F")
    pdf.set_draw_color(*accent)
    pdf.set_line_width(0.5)
    pdf.line(x_f, y_f + 55, x_f + 80, y_f + 55)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*accent)
    pdf.set_xy(x_f + 6, y_f + 4)
    pdf.cell(70, 6, num, align="L")
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_f + 6, y_f + 14)
    pdf.cell(70, 6, title, align="L")
    pdf.set_font("Helvetica", "", 7.5)
    pdf.set_text_color(*LIGHT_GRAY)
    pdf.set_xy(x_f + 6, y_f + 24)
    pdf.multi_cell(70, 4, desc, align="L")

# --- 6. FLOW ---
add_slide(bg=DARK,
          title=d["flow"]["title"],
          subtitle=d["flow"]["subtitle"],
          eyebrow=d["flow"]["eyebrow"])
steps = [
    ("01", d["flow"]["step1Title"], d["flow"]["step1Desc"]),
    ("02", d["flow"]["step2Title"], d["flow"]["step2Desc"]),
    ("03", d["flow"]["step3Title"], d["flow"]["step3Desc"]),
    ("04", d["flow"]["step4Title"], d["flow"]["step4Desc"]),
    ("05", d["flow"]["step5Title"], d["flow"]["step5Desc"]),
]
y_s = 75
for i, (num, title, desc) in enumerate(steps):
    x_s = 20 + i * 53
    pdf.set_fill_color(*DARK_CARD)
    pdf.rect(x_s, y_s, 48, 42, "F")
    accent = [BLUE, SAGE, AMBER, SAGE, BLUE][i]
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*accent)
    pdf.set_xy(x_s + 4, y_s + 4)
    pdf.cell(40, 10, num, align="L")
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_s + 4, y_s + 16)
    pdf.cell(40, 5, title, align="L")
    pdf.set_font("Helvetica", "", 7)
    pdf.set_text_color(*LIGHT_GRAY)
    pdf.set_xy(x_s + 4, y_s + 24)
    pdf.cell(40, 4, desc, align="L")
    if i < 4:
        pdf.set_draw_color(*LIGHT_GRAY)
        pdf.set_line_width(0.3)
        pdf.line(x_s + 48 + 1, y_s + 21, x_s + 48 + 4, y_s + 21)
        pdf.set_font("Helvetica", "", 7)
        pdf.set_text_color(*AMBER)
        pdf.set_xy(x_s + 49, y_s + 17)
        pdf.cell(4, 6, ">", align="C")

# --- 7. DASHBOARD ---
add_slide(bg=DARK_BG2,
          title=d["dashboard"]["title"],
          eyebrow=d["dashboard"]["eyebrow"])
# Dashboard header
y_d = 60
pdf.set_fill_color(*DARK_CARD)
pdf.rect(20, y_d, W - 40, 24, "F")
pdf.set_font("Helvetica", "", 7)
pdf.set_text_color(*MUTED)
pdf.set_xy(30, y_d + 4)
pdf.cell(60, 4, d["dashboard"]["dashTitle"], align="L")
for i, (label, count, accent) in enumerate([
    (d["dashboard"]["labelRisk"], "3", BLUE),
    (d["dashboard"]["labelStalled"], "2", AMBER),
    (d["dashboard"]["labelHot"], "5", SAGE),
]):
    pdf.set_text_color(*accent)
    pdf.set_xy(180 + i * 30, y_d + 2)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(28, 6, count, align="C")
    pdf.set_font("Helvetica", "", 5.5)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(180 + i * 30, y_d + 10)
    pdf.cell(28, 3, label.upper(), align="C")
# Table
cols = [d["dashboard"]["colLead"], d["dashboard"]["colStage"], d["dashboard"]["colTouch"], d["dashboard"]["colScore"], d["dashboard"]["colInspector"]]
col_w = [65, 32, 30, 22, 60]
th_y = y_d + 28
pdf.set_fill_color(*DARK)
pdf.rect(20, th_y, W - 40, 7, "F")
for j, (col, w) in enumerate(zip(cols, col_w)):
    x_pos = 26 + sum(col_w[:j])
    pdf.set_font("Helvetica", "B", 5.5)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(x_pos, th_y + 1)
    pdf.cell(w, 5, col.upper(), align="L")
for i, row in enumerate(d["dashboard"]["rows"]):
    ry = th_y + 8 + i * 13
    if i % 2 == 0:
        pdf.set_fill_color(*DARK_CARD)
        pdf.rect(20, ry, W - 40, 12, "F")
    vals = [row["name"], row["stage"], row["touch"], row["score"], row["badge"]]
    for j, (val, w) in enumerate(zip(vals, col_w)):
        x_pos = 26 + sum(col_w[:j])
        pdf.set_font("Helvetica", "B" if j == 0 else "", 7 if j == 0 else 6.5)
        if j == 4:
            badge_colors = {"risk": BLUE, "hot": SAGE, "stalled": AMBER, "ok": MUTED, "won": SAGE}
            pdf.set_text_color(*badge_colors.get(row["badgeType"], MUTED))
        else:
            pdf.set_text_color(*WHITE)
        pdf.set_xy(x_pos, ry + 2)
        pdf.cell(w, 5, val, align="L")

# --- 8. KIT ---
add_slide(bg=DARK,
          title=d["kit"]["title"],
          subtitle=d["kit"]["desc"],
          eyebrow=d["kit"]["eyebrow"])
kit_cards = [
    ("01", d["kit"]["card1Title"], d["kit"]["card1Desc"]),
    ("02", d["kit"]["card2Title"], d["kit"]["card2Desc"]),
    ("03", d["kit"]["card3Title"], d["kit"]["card3Desc"]),
    ("04", d["kit"]["card4Title"], d["kit"]["card4Desc"]),
]
y_k = 75
for i, (num, title, desc) in enumerate(kit_cards):
    x_k = 20 + i * 66
    pdf.set_fill_color(*DARK_CARD)
    pdf.rect(x_k, y_k, 61, 55, "F")
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(*AMBER)
    pdf.set_xy(x_k + 5, y_k + 3)
    pdf.cell(51, 8, num, align="L")
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_k + 5, y_k + 14)
    pdf.cell(51, 5, title, align="L")
    pdf.set_font("Helvetica", "", 7)
    pdf.set_text_color(*LIGHT_GRAY)
    pdf.set_xy(x_k + 5, y_k + 24)
    pdf.multi_cell(51, 3.5, desc, align="L")

# --- 9. TEAM ---
add_slide(bg=DARK_BG2,
          title=d["team"]["title"],
          eyebrow=d["team"]["eyebrow"])
team_data = [
    (d["team"]["team1Name"], d["team"]["team1Role"], d["team"]["team1Items"], BLUE),
    (d["team"]["team2Name"], d["team"]["team2Role"], d["team"]["team2Items"], SAGE),
]
y_t = 65
for i, (name, role, items, accent) in enumerate(team_data):
    x_t = 20 + i * 134
    pdf.set_fill_color(*DARK_CARD)
    pdf.rect(x_t, y_t, 124, 65, "F")
    pdf.set_draw_color(*accent)
    pdf.set_line_width(0.8)
    pdf.line(x_t, y_t, x_t + 124, y_t)
    pdf.set_font("Helvetica", "", 7)
    pdf.set_text_color(*accent)
    pdf.set_xy(x_t + 8, y_t + 6)
    pdf.cell(108, 4, role.upper(), align="L")
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_t + 8, y_t + 14)
    pdf.cell(108, 6, name, align="L")
    for j, item in enumerate(items):
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(*LIGHT_GRAY)
        pdf.set_xy(x_t + 12, y_t + 28 + j * 11)
        pdf.cell(5, 4, "->", align="L")
        pdf.set_xy(x_t + 18, y_t + 28 + j * 11)
        pdf.cell(100, 4, item, align="L")

# --- 10. TIMELINE ---
add_slide(bg=DARK,
          title=d["timeline"]["title"],
          eyebrow=d["timeline"]["eyebrow"])
t_items = [
    (d["timeline"]["item1Title"], d["timeline"]["item1Desc"], BLUE),
    (d["timeline"]["item2Title"], d["timeline"]["item2Desc"], AMBER),
    (d["timeline"]["item3Title"], d["timeline"]["item3Desc"], SAGE),
    (d["timeline"]["item4Title"], d["timeline"]["item4Desc"], MUTED),
]
# Line
pdf.set_draw_color(*LIGHT_GRAY)
pdf.set_line_width(0.4)
pdf.line(50, 95, W - 50, 95)
y_tl = 82
for i, (title, desc, accent) in enumerate(t_items):
    x_tl = 50 + i * (W - 100) // 3
    pdf.set_fill_color(*accent)
    pdf.circle(x_tl, 95, 4, "F")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(x_tl - 40, 102)
    pdf.cell(80, 5, title, align="C")
    pdf.set_font("Helvetica", "", 7.5)
    pdf.set_text_color(*LIGHT_GRAY)
    pdf.set_xy(x_tl - 40, 110)
    pdf.cell(80, 4, desc, align="C")
    # Arrows between
    if i < 3:
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(*AMBER)
        x_arrow = x_tl + 8
        nxt = 50 + (i + 1) * (W - 100) // 3
        pdf.set_xy(x_arrow, 91)
        pdf.cell(nxt - x_arrow, 6, "->", align="C")

pdf.output(OUTPUT)
print(f"PDF saved: {OUTPUT}")

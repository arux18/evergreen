"""Pixel-accurate specimens for the dark-mode token conversation. Not a product screen."""

from PIL import Image, ImageDraw, ImageFont

S = 2  # retina: 1 css px = 2 image px
FONT_PATH = "/Users/amanda/Library/Fonts/Heebo-VariableFont_wght.ttf"
OUT = "/Users/amanda/Evergreen-Cursor-Folder/design-specs/exports/dark-mode-token-studies"

STUDIO = (231, 228, 222, 255)
INK = (45, 41, 38, 255)
QUIET = (94, 89, 84, 255)

PAGE = (0x10, 0x17, 0x29, 255)
SURFACE = (0x13, 0x1C, 0x31, 255)
ELEVATED = (0x18, 0x22, 0x3A, 255)
NAVY_950 = (0x09, 0x0E, 0x1B, 255)
HEADER = (0xD8, 0xE1, 0xF0, 255)
BODY = (0xB3, 0xC1, 0xDB, 255)
DISABLED = (0x3A, 0x48, 0x5F, 255)
NAVY_50 = (0x33, 0x47, 0x6E, 255)
GREEN = (0x4A, 0xDE, 0x80, 255)
RED = (0xF8, 0x71, 0x71, 255)
BLUE = (0x5A, 0x82, 0xF9, 255)
BLUE_LINK = (0x70, 0x94, 0xFB, 255)
BLACK = (0, 0, 0, 255)
WHITE = (255, 255, 255, 255)

LIGHT_PAGE = (255, 255, 255, 255)
LIGHT_SURFACE = (0xF7, 0xF5, 0xF0, 255)
LIGHT_HEADER = (0x0E, 0x0E, 0x0E, 255)
LIGHT_BODY = (0x40, 0x3D, 0x3A, 255)
LIGHT_META = (0x5E, 0x59, 0x54, 255)
LIGHT_BORDER = (0xEE, 0xED, 0xEB, 255)
LIGHT_MUTED_BORDER = (0xD5, 0xD3, 0xD0, 255)
LIGHT_SECTION = (0xF7, 0xF5, 0xF0, 255)
LIGHT_BLUE = (0x3A, 0x6A, 0xF8, 255)


def font(size, weight=400):
    f = ImageFont.truetype(FONT_PATH, size * S)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def px(n):
    return int(round(n * S))


def new_canvas(w, h):
    im = Image.new("RGBA", (px(w), px(h)), STUDIO)
    return im, ImageDraw.Draw(im)


def rrect(draw, box, radius, fill):
    draw.rounded_rectangle(
        [px(v) for v in box], radius=px(radius), fill=fill
    )


def rect(draw, box, fill):
    draw.rectangle([px(v) for v in box], fill=fill)


def label(draw, xy, text, fill, size=13, weight=500, anchor="lt"):
    draw.text(
        (px(xy[0]), px(xy[1])),
        text,
        font=font(size, weight),
        fill=fill,
        anchor=anchor,
    )


def hairline(draw, x, y, w, color):
    # 1 css px, painted as a solid band so the color is exact (no antialias).
    rect(draw, (x, y, x + w, y + 1), color)


def save(im, name):
    path = f"{OUT}/{name}"
    im.convert("RGB").save(path, "PNG")
    print(path, im.size)


def borders():
    cols = [
        ("Light  ·  the readable one", "sem-borders-light", "#EEEDEB", "1.17:1 on white", LIGHT_BORDER, "light"),
        ("Current dark", "navy-700  ·  same as the card", "#131C31", "1.05:1 on the page", (0x13, 0x1C, 0x31, 255), "dark"),
        ("Quieter option", "navy-400", "#202C4E", "1.30:1 on the page", (0x20, 0x2C, 0x4E, 255), "dark"),
        ("Suggested", "navy-200", "#2A3A5C", "1.58:1 on the page", (0x2A, 0x3A, 0x5C, 255), "dark"),
        ("Stronger option", "navy-100", "#2E4066", "1.73:1 on the page", (0x2E, 0x40, 0x66, 255), "dark"),
    ]
    col_w, gap, margin = 248, 16, 28
    width = margin * 2 + len(cols) * col_w + (len(cols) - 1) * gap
    height = 820
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Row hairlines on sem-background-main", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Each rule is a real 1px stroke. The strip under each column is that same stroke magnified, so the step stays visible if this image is scaled down.",
        QUIET,
        12,
        400,
    )

    rows = [
        ("First Name", "Amanda"),
        ("Last Name", "Ribeiro"),
        ("Email", "amanda@automation.testing"),
        ("Address", "525 East 68th Street"),
        ("DOB", "09/12/1977"),
    ]

    for i, (title, token, hex_, ratio, border, mode) in enumerate(cols):
        x = margin + i * (col_w + gap)
        y = 88
        if title == "Suggested":
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))
        label(draw, (x, y), title, INK, 14, 600)
        label(draw, (x, y + 20), f"{token}   {hex_}", QUIET, 11, 400)
        label(draw, (x, y + 36), ratio, QUIET, 11, 400)

        page = LIGHT_PAGE if mode == "light" else PAGE
        section = LIGHT_SECTION if mode == "light" else ELEVATED
        ink = LIGHT_BODY if mode == "light" else BODY
        value = LIGHT_HEADER if mode == "light" else HEADER
        section_ink = LIGHT_META if mode == "light" else (0x88, 0x9C, 0xBF, 255)

        card_y = y + 62
        rrect(draw, (x, card_y, x + col_w, card_y + 248), 10, page)
        rect(draw, (x, card_y, x + col_w, card_y + 28), section)
        label(draw, (x + 14, card_y + 14), "PERSONAL INFO", section_ink, 10, 600, anchor="lm")

        row_y = card_y + 28
        row_h = 44
        first_line = row_y + row_h - 1
        for name, val in rows:
            label(draw, (x + 14, row_y + row_h / 2), name, ink, 12, 400, anchor="lm")
            label(draw, (x + col_w - 14, row_y + row_h / 2), val, value, 12, 500, anchor="rm")
            hairline(draw, x + 14, row_y + row_h - 1, col_w - 28, border)
            row_y += row_h

        # Same stroke on the card surface, where today's border is the surface.
        cap_y = card_y + 264
        label(draw, (x, cap_y), "Same 1px rule on the card surface", QUIET, 11, 500)
        surf = LIGHT_SURFACE if mode == "light" else SURFACE
        surf_note = "surface #F7F5F0" if mode == "light" else "surface #131C31"
        label(draw, (x, cap_y + 16), surf_note, QUIET, 11, 400)
        sy = cap_y + 38
        rrect(draw, (x, sy, x + col_w, sy + 88), 10, surf)
        label(draw, (x + 14, sy + 22), "Email", ink, 12, 400, anchor="lm")
        label(draw, (x + col_w - 14, sy + 22), "amanda@…", value, 12, 500, anchor="rm")
        hairline(draw, x + 14, sy + 44, col_w - 28, border)
        label(draw, (x + 14, sy + 66), "Phone", ink, 12, 400, anchor="lm")

        # Short run of the first page hairline, scaled up to the column width.
        crop = im.crop(
            (
                px(x + 80),
                px(first_line - 6),
                px(x + 112),
                px(first_line + 7),
            )
        )
        zoom_w = px(col_w)
        scale = zoom_w / crop.width
        zoom = crop.resize(
            (zoom_w, max(1, round(crop.height * scale))),
            Image.Resampling.NEAREST,
        )
        zy = px(cap_y + 140)
        im.paste(zoom, (px(x), zy))
        label(
            draw,
            (x, cap_y + 140 + zoom.height / S + 10),
            f"{scale:.0f}× crop of the rule on the page",
            QUIET,
            11,
            400,
        )

    save(im, "01-borders.png")


def text_meta():
    cols = [
        ("Light  ·  the readable one", "#5E5954", "6.92:1 on white", LIGHT_META, "light"),
        ("Current dark", "#697DA0", "4.28:1 page  ·  3.79:1 card", (0x69, 0x7D, 0xA0, 255), "dark"),
        ("Suggested  ·  navylight-400", "#889CBF", "6.42:1 page  ·  5.69:1 card", (0x88, 0x9C, 0xBF, 255), "dark"),
        ("Louder option  ·  navylight-500", "#9DAFCD", "8.03:1 page  ·  7.11:1 card", (0x9D, 0xAF, 0xCD, 255), "dark"),
    ]
    col_w, gap, margin = 300, 18, 28
    width = margin * 2 + len(cols) * col_w + (len(cols) - 1) * gap
    height = 640
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Meta labels on the accounts screen", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Only the quiet labels change. The balance, the dollar amounts, and Link Account stay put. Disabled ink is shown under each column so you can see the gap.",
        QUIET,
        12,
        400,
    )

    for i, (title, hex_, ratio, meta, mode) in enumerate(cols):
        x = margin + i * (col_w + gap)
        y = 88
        if title.startswith("Suggested"):
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))
        label(draw, (x, y), title, INK, 14, 600)
        label(draw, (x, y + 20), f"sem-text-meta   {hex_}", QUIET, 11, 400)
        label(draw, (x, y + 36), ratio, QUIET, 11, 400)

        page = LIGHT_PAGE if mode == "light" else PAGE
        card = LIGHT_SURFACE if mode == "light" else ELEVATED
        header = LIGHT_HEADER if mode == "light" else HEADER
        body = LIGHT_BODY if mode == "light" else BODY
        disabled = (0xB5, 0xB1, 0xAB, 255) if mode == "light" else DISABLED
        outline = LIGHT_MUTED_BORDER if mode == "light" else NAVY_50
        primary = LIGHT_BLUE if mode == "light" else BLUE
        primary_ink = WHITE if mode == "light" else BLACK

        panel_y = y + 64
        rrect(draw, (x, panel_y, x + col_w, panel_y + 430), 12, page)

        # Balance block sits on the page.
        label(draw, (x + 20, panel_y + 36), "$1,115,680", header, 26, 500, anchor="lm")
        label(draw, (x + 20, panel_y + 62), "Total Net Balance", meta, 12, 400, anchor="lm")

        # Legend card.
        cy = panel_y + 88
        rrect(draw, (x + 16, cy, x + col_w - 16, cy + 168), 10, card)
        legend = [
            ("Banking", "$70,000", GREEN if mode == "dark" else (0x10, 0x64, 0x2B, 255)),
            ("Investments", "$1,500,000", GREEN if mode == "dark" else (0x10, 0x64, 0x2B, 255)),
            ("Credit & Loans", "−$454,320", RED if mode == "dark" else (0xC8, 0x23, 0x20, 255)),
        ]
        for n, (name, amount, amt_color) in enumerate(legend):
            ly = cy + 22 + n * 36
            label(draw, (x + 32, ly), name, meta, 13, 400, anchor="lm")
            label(draw, (x + col_w - 32, ly), amount, amt_color, 13, 500, anchor="rm")
        label(draw, (x + 32, cy + 140), "Total", header, 13, 600, anchor="lm")
        label(draw, (x + col_w - 32, cy + 140), "$1,115,680", header, 13, 600, anchor="rm")

        # Buttons on the page. Manage Accounts uses the meta ink, matching the screenshot.
        by = cy + 188
        rrect(draw, (x + 16, by, x + 158, by + 36), 18, page)
        # stroke the pill with a 1px outline by drawing a slightly larger rounded rect behind
        rrect(draw, (x + 16, by, x + 158, by + 36), 18, outline)
        rrect(draw, (x + 17, by + 1, x + 157, by + 35), 17, page)
        label(draw, (x + 87, by + 18), "Manage Accounts", meta, 12, 500, anchor="mm")

        rrect(draw, (x + 168, by, x + col_w - 16, by + 36), 18, primary)
        label(draw, (x + 168 + (col_w - 16 - 168) / 2, by + 18), "Link Account", primary_ink, 12, 500, anchor="mm")

        label(draw, (x + 20, by + 64), "Body copy stays this color.", body, 13, 400, anchor="lm")
        label(draw, (x + 20, by + 88), "Disabled ink, for the gap.", disabled, 13, 400, anchor="lm")

    save(im, "02-text-meta.png")


def draw_page(base_color, nav_color, header, body, meta, button, button_ink, quiet_border):
    w, h = 360, 460
    page = Image.new("RGBA", (px(w), px(h)), base_color)
    d = ImageDraw.Draw(page)
    rect(d, (0, 0, 72, h), nav_color)
    label(d, (14, 28), "evergreen.ai", header, 8, 600, anchor="lm")
    items = [("Dashboard", False), ("Accounts", True), ("Activity", False), ("Investments", False), ("Security Prices", False), ("Watchlist", False)]
    for n, (name, active) in enumerate(items):
        yy = 64 + n * 28
        if active:
            rrect(d, (8, yy - 12, 64, yy + 12), 6, ELEVATED if base_color == PAGE else (0xE8, 0xE4, 0xDC, 255))
        label(d, (14, yy), name, header if active else meta, 9, 500 if active else 400, anchor="lm")
    label(d, (88, 36), "Settings  |  Passkeys", header, 14, 500, anchor="lm")
    label(
        d,
        (88, 62),
        "Passkeys let you sign in with your fingerprint,",
        body,
        11,
        400,
        anchor="lm",
    )
    label(d, (88, 80), "face, or device screen lock.", body, 11, 400, anchor="lm")
    rrect(d, (230, 24, 344, 52), 14, base_color)
    rrect(d, (230, 24, 344, 52), 14, quiet_border)
    rrect(d, (231, 25, 343, 51), 13, base_color)
    label(d, (287, 38), "Add Passkey", meta, 11, 500, anchor="mm")
    # a couple of content rows so the film has something to cover
    for n, text in enumerate(("Your devices", "This Mac  ·  added today", "iPhone  ·  added Mar 2")):
        label(d, (88, 130 + n * 28), text, body if n else header, 12, 500 if n == 0 else 400, anchor="lm")
    return page


def scrim_panel(page, scrim_rgba, modal_fill, modal_header, modal_body, button, button_ink):
    scrim = Image.new("RGBA", page.size, scrim_rgba)
    out = Image.alpha_composite(page, scrim)
    d = ImageDraw.Draw(out)
    # modal sits above the film
    mx, my, mw, mh = 78, 150, 204, 200
    rrect(d, (mx, my, mx + mw, my + mh), 12, modal_fill)
    label(d, (mx + 16, my + 28), "Add Passkey", modal_header, 14, 600, anchor="lm")
    label(d, (mx + 16, my + 58), "What are passkeys?", modal_header, 11, 600, anchor="lm")
    label(d, (mx + 16, my + 78), "Encrypted digital keys that", modal_body, 11, 400, anchor="lm")
    label(d, (mx + 16, my + 94), "use your fingerprint or face.", modal_body, 11, 400, anchor="lm")
    rrect(d, (mx + mw - 92, my + mh - 44, mx + mw - 16, my + mh - 16), 14, button)
    label(d, (mx + mw - 54, my + mh - 30), "Continue", button_ink, 11, 500, anchor="mm")
    return out


def outline_pill(draw, box, fill, border, text, text_color, radius=18):
    x0, y0, x1, y1 = box
    rrect(draw, box, radius, border)
    rrect(draw, (x0 + 1, y0 + 1, x1 - 1, y1 - 1), radius - 1, fill)
    cx = (x0 + x1) / 2
    cy = (y0 + y1) / 2
    label(draw, (cx, cy), text, text_color, 13, 500, anchor="mm")


def secondary_buttons():
    """Outline / secondary: text and border in the blue family, never meta."""
    BLUE_300 = (0xA5, 0xBC, 0xFC, 255)
    BLUE_400 = (0x70, 0x94, 0xFB, 255)
    BLUE_500 = (0x5A, 0x82, 0xF9, 255)
    BLUE_600 = (0x3A, 0x6A, 0xF8, 255)
    BLUE_700 = (0x29, 0x52, 0xCC, 255)
    META_DARK = (0x9D, 0xAF, 0xCD, 255)  # the louder meta they liked for labels

    cols = [
        (
            "Problem · meta ink on outline",
            "Not a Hemlock secondary. This is what Manage Accounts looks like when it borrows sem-text-meta.",
            "dark",
            META_DARK,
            NAVY_50,
            "text navylight-500  ·  border navy-50",
        ),
        (
            "Current Hemlock dark",
            "Already blue text, but the border stays muted navy. Text and stroke do not match.",
            "dark",
            BLUE_400,
            NAVY_50,
            "text blue-400  ·  border navy-50",
        ),
        (
            "A  ·  matched soft blue",
            "Same step for text and border. Softest paired blue that still reads as action.",
            "dark",
            BLUE_400,
            BLUE_400,
            "text + border blue-400",
        ),
        (
            "B  ·  light-mode mirror",
            "Dark analog of light secondary: stronger text, softer blue stroke.",
            "dark",
            BLUE_400,
            BLUE_500,
            "text blue-400  ·  border blue-500",
        ),
        (
            "C  ·  matched stronger blue",
            "Same step, one notch stronger. Closest to a filled action without filling.",
            "dark",
            BLUE_500,
            BLUE_500,
            "text + border blue-500",
        ),
        (
            "Light · current Hemlock",
            "Light secondary already pairs blue text with a softer blue border. Keep this unless you want them identical.",
            "light",
            BLUE_600,
            BLUE_300,
            "text blue-600  ·  border blue-300",
        ),
        (
            "Light · matched",
            "If dark goes matched, light can match too: same blue-600 on text and stroke.",
            "light",
            BLUE_600,
            BLUE_600,
            "text + border blue-600",
        ),
        (
            "Light · soft match",
            "Softer pair: both on blue-300. Quieter; still colored, still not meta.",
            "light",
            BLUE_300,
            BLUE_300,
            "text + border blue-300",
        ),
    ]

    col_w, gap, margin = 220, 14, 28
    width = margin * 2 + 4 * col_w + 3 * gap
    height = 760
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Secondary / outline buttons — colored text and stroke", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Hemlock Button/secondary and Button/outline both use sem-btnSecondaryText + sem-btnSecondaryBorder. They should never use sem-text-meta. Top row = dark. Bottom row = light.",
        QUIET,
        12,
        400,
    )

    # 4 dark on top, 4 light on bottom — but we only have 5 dark + 3 light. Layout: row1 first 4 dark, row2 last dark + 3 light.
    for i, (title, blurb, mode, text_c, border_c, recipe) in enumerate(cols):
        if i < 4:
            x = margin + i * (col_w + gap)
            y = 88
        else:
            x = margin + (i - 4) * (col_w + gap)
            y = 400

        page = LIGHT_PAGE if mode == "light" else PAGE
        primary = LIGHT_BLUE if mode == "light" else BLUE
        primary_ink = WHITE if mode == "light" else BLACK
        meta = (0x5E, 0x59, 0x54, 255) if mode == "light" else META_DARK
        header = LIGHT_HEADER if mode == "light" else HEADER

        if title.startswith("A  ·") or title.startswith("Light · current"):
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))

        label(draw, (x, y), title, INK, 13, 600)
        # wrap blurb roughly
        words = blurb.split()
        line, lines, yb = "", [], y + 20
        for w in words:
            trial = (line + " " + w).strip()
            if len(trial) > 34:
                lines.append(line)
                line = w
            else:
                line = trial
        if line:
            lines.append(line)
        for ln in lines[:3]:
            label(draw, (x, yb), ln, QUIET, 11, 400)
            yb += 14
        label(draw, (x, yb + 4), recipe, QUIET, 11, 500)

        panel_y = yb + 24
        rrect(draw, (x, panel_y, x + col_w, panel_y + 168), 12, page)
        label(draw, (x + 14, panel_y + 28), "$1,115,680", header, 18, 500, anchor="lm")
        label(draw, (x + 14, panel_y + 50), "Total Net Balance", meta, 11, 400, anchor="lm")

        by = panel_y + 78
        outline_pill(draw, (x + 14, by, x + col_w - 14, by + 36), page, border_c, "Manage Accounts", text_c)
        rrect(draw, (x + 14, by + 48, x + col_w - 14, by + 84), 18, primary)
        label(draw, (x + col_w / 2, by + 66), "Link Account", primary_ink, 13, 500, anchor="mm")

        # disabled comparison
        if mode == "dark":
            disabled_text = DISABLED
            disabled_border = (0x22, 0x31, 0x4F, 255)  # navy-300
        else:
            disabled_text = BLUE_300
            disabled_border = (0xEB, 0xF0, 0xFE, 255)  # blue-100
        label(draw, (x, panel_y + 180), "Disabled secondary, for the gap", QUIET, 11, 400)
        outline_pill(
            draw,
            (x + 14, panel_y + 198, x + col_w - 14, panel_y + 230),
            page,
            disabled_border,
            "Manage Accounts",
            disabled_text,
        )

    save(im, "04-secondary-buttons.png")


def scrims_black_ladder():
    """Black-only dark scrims around the 26% lean, a tad darker."""
    dark_page = draw_page(PAGE, NAVY_950, HEADER, BODY, (0x9D, 0xAF, 0xCD, 255), BLUE, BLACK, NAVY_50)
    panels = [
        (
            "26%  ·  the lean",
            "prim-base-black at 26%",
            "Header behind film ≈ 7.7:1",
            0x42,
        ),
        (
            "30%  ·  a tad darker",
            "prim-base-black at 30%",
            "Header behind film ≈ 7.0:1",
            0x4D,
        ),
        (
            "32%  ·  one step more",
            "prim-base-black at 32%",
            "Header behind film ≈ 6.6:1",
            0x52,
        ),
        (
            "Current  ·  too dark",
            "prim-base-black at 64%",
            "Header behind film ≈ 2.5:1",
            0xA3,
        ),
    ]

    margin, gap = 28, 18
    width = margin * 2 + 4 * 360 + 3 * gap
    height = 620
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Passkey film — black only, a tad darker than 26%", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Same black pigment as today. Only the opacity changes. Light mode stays gray-800 at 34%. Current 64% is on the right for reference.",
        QUIET,
        12,
        400,
    )

    for i, (title, value, note, alpha) in enumerate(panels):
        x = margin + i * (360 + gap)
        y = 84
        if "30%" in title:
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))
        label(draw, (x, y), title, INK, 14, 600)
        label(draw, (x, y + 20), f"sem-background-scrim   {value}", QUIET, 11, 400)
        label(draw, (x, y + 36), note, QUIET, 11, 400)
        panel = scrim_panel(
            dark_page.copy(),
            (0, 0, 0, alpha),
            ELEVATED,
            HEADER,
            BODY,
            BLUE,
            BLACK,
        )
        im.paste(panel, (px(x), px(y + 56)))

    save(im, "05-scrim-black-ladder.png")


NL300 = (0x69, 0x7D, 0xA0, 255)
NL500 = (0x9D, 0xAF, 0xCD, 255)
NAVY400 = (0x20, 0x2C, 0x4E, 255)
NAVY200 = (0x2A, 0x3A, 0x5C, 255)
NAVY700 = (0x13, 0x1C, 0x31, 255)
NAVY300 = (0x22, 0x31, 0x4F, 255)


def pencil_icon(draw, x, y, color):
    # Simple pencil, 14 css px, sitting on a baseline at y.
    rect(draw, (x + 6, y, x + 8, y + 10), color)
    rect(draw, (x + 5, y + 10, x + 9, y + 12), color)
    rect(draw, (x + 6, y + 12, x + 8, y + 15), color)


def icons_and_labels():
    cols = [
        (
            "Today",
            "Both semantics point at navylight-300. They look like one color.",
            NL300,
            NL300,
        ),
        (
            "If only the label changes",
            "sem-text-meta moves to navylight-500. sem-icons-meta stays on 300. The pencil falls behind the word.",
            NL500,
            NL300,
        ),
        (
            "If both move together",
            "Two semantics, one primitive. Label and pencil stay matched on navylight-500.",
            NL500,
            NL500,
        ),
    ]
    col_w, gap, margin = 340, 18, 28
    width = margin * 2 + 3 * col_w + 2 * gap
    height = 520
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Label and pencil are two semantics", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "sem-text-meta is the word. sem-icons-meta is the pencil. Today both point at the same primitive, so they match. A semantic has one dark value, not a different value per item.",
        QUIET,
        12,
        400,
    )
    rows = [("Address", "525 East 68th Street"), ("DOB", "09/12/1977")]
    for i, (title, blurb, word, icon) in enumerate(cols):
        x = margin + i * (col_w + gap)
        y = 100
        if i == 2:
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))
        label(draw, (x, y), title, INK, 14, 600)
        words = blurb.split()
        line, yb = "", y + 22
        for w in words:
            trial = (line + " " + w).strip()
            if len(trial) > 48:
                label(draw, (x, yb), line, QUIET, 12, 400)
                yb += 16
                line = w
            else:
                line = trial
        label(draw, (x, yb), line, QUIET, 12, 400)
        card_y = yb + 28
        rrect(draw, (x, card_y, x + col_w, card_y + 140), 12, PAGE)
        yy = card_y + 16
        for name, val in rows:
            label(draw, (x + 16, yy + 22), name, BODY, 13, 400, anchor="lm")
            label(draw, (x + col_w - 36, yy + 22), val, HEADER, 13, 500, anchor="rm")
            pencil_icon(draw, x + col_w - 28, yy + 14, icon)
            hairline(draw, x + 16, yy + 44, col_w - 32, NAVY400)
            yy += 52
        label(draw, (x, card_y + 156), f"word  {('#697DA0' if word == NL300 else '#9DAFCD')}", QUIET, 12, 500)
        label(draw, (x, card_y + 174), f"pencil  {('#697DA0' if icon == NL300 else '#9DAFCD')}", QUIET, 12, 500)
    save(im, "06-label-and-pencil.png")


def border_ladder():
    # Light already has muted stronger than the hairline. Dark after navy-400 copies that.
    # Disabled in dark shares the muted primitive. That is the only collision.
    themes = [
        (
            "Light  ·  already like this",
            LIGHT_PAGE,
            LIGHT_BODY,
            [
                ("sem-borders-light", "prim-gray-100  #EEEDEB", LIGHT_BORDER),
                ("sem-borders-muted", "prim-gray-200  #D5D3D0", LIGHT_MUTED_BORDER),
                ("sem-borders-disabled", "prim-gray-300  #B5B1AB", (0xB5, 0xB1, 0xAB, 255)),
            ],
        ),
        (
            "Dark  ·  after navy-400",
            PAGE,
            BODY,
            [
                ("sem-borders-light", "prim-navy-400  #202C4E", NAVY400),
                ("sem-borders-muted", "prim-navy-200  #2A3A5C", NAVY200),
                ("sem-borders-disabled", "prim-navy-200  #2A3A5C  ·  same paint as muted", NAVY200),
            ],
        ),
    ]
    margin = 28
    col_w = 520
    width = margin * 2 + col_w * 2 + 24
    height = 560
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Hairline, muted, and disabled", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Muted is already a stronger rule than the hairline in light. Dark will do the same. The dark-only overlap is disabled using the same primitive as muted.",
        QUIET,
        12,
        400,
    )
    for i, (title, page, ink, rules) in enumerate(themes):
        x = margin + i * (col_w + 24)
        y = 96
        label(draw, (x, y), title, INK, 14, 600)
        card_y = y + 28
        rrect(draw, (x, card_y, x + col_w, card_y + 360), 12, page)
        ry = card_y + 28
        for name, spec, color in rules:
            label(draw, (x + 20, ry), name, ink, 13, 600, anchor="lm")
            label(draw, (x + 20, ry + 18), spec, ink, 12, 400, anchor="lm")
            hairline(draw, x + 20, ry + 40, col_w - 40, color)
            ry += 110
    save(im, "07-border-ladder.png")


def chat_divider():
    margin = 28
    col_w = 360
    width = margin * 2 + col_w * 3 + 36
    height = 520
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Chat divider vs the page hairline", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Chat sits on navy-950, which is darker than the page (navy-800). The chat divider is still navy-700. Left is that line on the page. Middle is that same line on the chat panel. Right is the hairline you picked, on the page.",
        QUIET,
        12,
        400,
    )
    panels = [
        ("Page  ·  old hairline", "navy-700 on navy-800", PAGE, NAVY700, "sem-borders-light today"),
        ("Chat panel", "navy-700 on navy-950", NAVY_950, NAVY700, "sem-chatDivider"),
        ("Page  ·  your pick", "navy-400 on navy-800", PAGE, NAVY400, "sem-borders-light after"),
    ]
    lines = ["Checking balances", "The cash account is up to date", "Want the tax lot detail?"]
    for i, (title, pair, bg, rule, token) in enumerate(panels):
        x = margin + i * (col_w + 18)
        y = 108
        label(draw, (x, y), title, INK, 14, 600)
        label(draw, (x, y + 20), token, QUIET, 12, 500)
        label(draw, (x, y + 36), pair, QUIET, 12, 400)
        card_y = y + 64
        rrect(draw, (x, card_y, x + col_w, card_y + 240), 12, bg)
        yy = card_y + 20
        for text in lines:
            label(draw, (x + 20, yy + 16), text, HEADER, 14, 400, anchor="lm")
            hairline(draw, x + 20, yy + 36, col_w - 40, rule)
            yy += 64
    save(im, "08-chat-divider.png")


def scrim_tokens():
    dark_page = draw_page(PAGE, NAVY_950, HEADER, BODY, NL500, BLUE, BLACK, NAVY_50)
    panels = [
        (
            "sem-scrim today",
            "Black at 45%  ·  #00000073",
            "This is the fill on the passkey Overlay.",
            0x73,
        ),
        (
            "sem-background-scrim today",
            "Black at 64%  ·  #000000A3",
            "A second token. Not the passkey overlay.",
            0xA3,
        ),
        (
            "The 32% look, on sem-scrim",
            "Black at 32%  ·  #00000052",
            "Same look you picked, on the token the modal uses.",
            0x52,
        ),
    ]
    margin, gap = 28, 18
    width = margin * 2 + 3 * 360 + 2 * gap
    height = 640
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Two scrim semantics", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Both live in the Hemlock library variables. The open passkey modal's Overlay is sem-scrim. sem-background-scrim is a separate, heavier film.",
        QUIET,
        12,
        400,
    )
    for i, (title, value, note, alpha) in enumerate(panels):
        x = margin + i * (360 + gap)
        y = 96
        if i == 2:
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))
        label(draw, (x, y), title, INK, 14, 600)
        label(draw, (x, y + 20), value, QUIET, 12, 500)
        label(draw, (x, y + 38), note, QUIET, 12, 400)
        panel = scrim_panel(dark_page.copy(), (0, 0, 0, alpha), ELEVATED, HEADER, BODY, BLUE, BLACK)
        im.paste(panel, (px(x), px(y + 64)))
    save(im, "09-two-scrims.png")


BLUE_400 = (0x70, 0x94, 0xFB, 255)


def accounts_block(draw, x, y, w, meta, btn_text, btn_border):
    rrect(draw, (x, y, x + w, y + 300), 12, PAGE)
    label(draw, (x + 20, y + 34), "$1,115,680", HEADER, 24, 500, anchor="lm")
    label(draw, (x + 20, y + 60), "Total Net Balance", meta, 12, 400, anchor="lm")
    cy = y + 84
    rrect(draw, (x + 16, cy, x + w - 16, cy + 134), 10, ELEVATED)
    for n, (name, amount, c) in enumerate(
        [("Banking", "$70,000", GREEN), ("Investments", "$1,500,000", GREEN), ("Credit & Loans", "−$454,320", RED)]
    ):
        ly = cy + 22 + n * 32
        label(draw, (x + 32, ly), name, meta, 13, 400, anchor="lm")
        label(draw, (x + w - 32, ly), amount, c, 13, 500, anchor="rm")
    label(draw, (x + 32, cy + 112), "Total", HEADER, 13, 600, anchor="lm")
    label(draw, (x + w - 32, cy + 112), "$1,115,680", HEADER, 13, 600, anchor="rm")
    by = cy + 152
    half = (w - 44) / 2
    outline_pill(draw, (x + 16, by, x + 16 + half, by + 36), PAGE, btn_border, "Manage Accounts", btn_text)
    rrect(draw, (x + 28 + half, by, x + w - 16, by + 36), 18, BLUE)
    label(draw, (x + 28 + half + half / 2, by + 18), "Link Account", BLACK, 12, 500, anchor="mm")


def rows_block(draw, x, y, w, rule, icon):
    rrect(draw, (x, y, x + w, y + 230), 12, PAGE)
    rect(draw, (x, y, x + w, y + 28), ELEVATED)
    label(draw, (x + 16, y + 14), "PERSONAL INFO", NL500, 10, 600, anchor="lm")
    ry = y + 28
    for name, val in [("First Name", "Amanda"), ("Last Name", "Ribeiro"), ("Email", "amanda@automation.testing"), ("DOB", "09/12/1977")]:
        label(draw, (x + 16, ry + 25), name, BODY, 12, 400, anchor="lm")
        label(draw, (x + w - 40, ry + 25), val, HEADER, 12, 500, anchor="rm")
        pencil_icon(draw, x + w - 30, ry + 17, icon)
        hairline(draw, x + 16, ry + 49, w - 32, rule)
        ry += 50


def before_after():
    margin, gap, col_w = 28, 28, 420
    width = margin * 2 + col_w * 2 + gap
    height = 1560
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "Dark mode before and after  ·  agreed choices only", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Applied to Hemlock Oct 6. Light mode is unchanged. The disabled border is shown on board 12.",
        QUIET,
        12,
        400,
    )
    cols = [
        ("Before", NAVY700, NL300, NL300, NAVY_50, 0x73,
         ["sem-borders-light  navy-700", "sem-text-meta + sem-icons-meta  navylight-300", "sem-borders-disabled  navy-200",
          "sem-scrim  black 45%  ·  sem-background-scrim  black 64%", "Manage Accounts on sem-text-meta"]),
        ("After", NAVY400, NL500, BLUE_400, NAVY_50, 0x52,
         ["sem-borders-light  navy-400", "sem-text-meta + sem-icons-meta  navylight-500", "sem-borders-disabled  navylight-100",
          "sem-scrim + sem-background-scrim  black 32%", "Manage Accounts on sem-btnSecondaryText + Border"]),
    ]
    for i, (title, rule, meta, btn_text, btn_border, alpha, notes) in enumerate(cols):
        x = margin + i * (col_w + gap)
        y = 88
        if i == 1:
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))
        label(draw, (x, y), title, INK, 16, 600)
        for n, t in enumerate(notes):
            label(draw, (x, y + 24 + n * 16), t, QUIET, 12, 400)
        y += 28
        rows_block(draw, x, y + 100, col_w, rule, NL300)
        accounts_block(draw, x, y + 350, col_w, meta, btn_text, btn_border)
        page = draw_page(PAGE, NAVY_950, HEADER, BODY, meta, BLUE, BLACK, NAVY_50)
        d2 = ImageDraw.Draw(page)
        panel = scrim_panel(page, (0, 0, 0, alpha), ELEVATED, HEADER, BODY, BLUE, BLACK)
        im.paste(panel, (px(x + (col_w - 360) / 2), px(y + 676)))
    save(im, "10-before-after.png")


def hemlock_resolver():
    import json

    lib = json.load(open("/Users/amanda/Evergreen-Cursor-Folder/design-specs/pencil/design-system/in-progress/hemlock-library.lib.pen"))
    variables = lib["variables"]

    def pick(v, theme):
        val = v["value"]
        if isinstance(val, list):
            for e in val:
                if e.get("theme", {}).get("🎨 Colors") == theme:
                    return e["value"]
        return val

    def resolve(name, theme):
        x = pick(variables[name], theme)
        while isinstance(x, str) and x.startswith("$"):
            x = pick(variables[x[1:]], theme)
        h = x.lstrip("#")
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) + (255,)

    return resolve


def input_field(draw, x, y, w, title, title_color, value, value_color, fill, border):
    label(draw, (x, y), title, title_color, 12, 500)
    rrect(draw, (x, y + 20, x + w, y + 60), 8, border)
    rrect(draw, (x + 1, y + 21, x + w - 1, y + 59), 7, fill)
    label(draw, (x + 14, y + 40), value, value_color, 14, 400, anchor="lm")


def disabled_border():
    r = hemlock_resolver()
    navy = {
        "navy-200": NAVY200,
        "navy-300": (0x22, 0x31, 0x4F, 255),
        "navy-400": NAVY400,
        "navy-700": SURFACE,
        "navylight-100": DISABLED,
    }
    cols = [
        ("Light  ·  reference", "Light", None, "prim-gray-300  #B5B1AB  ·  border = disabled text", False),
        ("Dark today  ·  navy-200", "Dark", "navy-200", "#2A3A5C  ·  border differs from disabled text", False),
        ("Dark  ·  navylight-100", "Dark", "navylight-100", "#3A485F  ·  border = disabled text", True),
    ]
    margin, col_w, gap = 28, 300, 20
    width = margin * 2 + col_w * len(cols) + gap * (len(cols) - 1)
    height = 600
    im, draw = new_canvas(width, height)
    label(draw, (margin, 22), "sem-borders-disabled = sem-text-disabled", INK, 20, 600)
    label(
        draw,
        (margin, 50),
        "Enabled input, disabled input, then the row hairline and muted rule for comparison. Every color is an existing Hemlock primitive.",
        QUIET,
        12,
        400,
    )
    for i, (title, theme, key, spec, mark) in enumerate(cols):
        x = margin + i * (col_w + gap)
        y = 96
        if mark:
            rect(draw, (x, y - 10, x + 36, y - 6), (0x3A, 0x6A, 0xF8, 255))
        label(draw, (x, y), title, INK, 14, 600)
        label(draw, (x, y + 20), spec, QUIET, 11, 400)
        card_y = y + 48
        page = r("sem-background-main", theme)
        rrect(draw, (x, card_y, x + col_w, card_y + 420), 12, page)
        inner_x, inner_w = x + 20, col_w - 40
        disabled_border_color = r("sem-borders-disabled", "Light") if key is None else navy[key]
        meta = r("sem-text-meta", theme) if theme == "Light" else NL500
        input_field(draw, inner_x, card_y + 24, inner_w, "Email", meta,
                    "amanda@evergreen.ai", r("sem-text-body", theme),
                    r("sem-background-surface", theme), r("sem-borders-dark", theme))
        input_field(draw, inner_x, card_y + 112, inner_w, "Phone (locked)", r("sem-text-disabled", theme),
                    "(555) 010-2234", r("sem-text-disabled", theme),
                    r("sem-background-disabled", theme), disabled_border_color)
        hair = r("sem-borders-light", theme) if theme == "Light" else NAVY400
        muted = r("sem-borders-muted", theme)
        ry = card_y + 222
        for name, color in (("Row hairline (sem-borders-light)", hair), ("Muted rule (sem-borders-muted)", muted)):
            label(draw, (inner_x, ry), name, r("sem-text-body", theme), 12, 500)
            hairline(draw, inner_x, ry + 26, inner_w, color)
            ry += 64
        label(draw, (inner_x, card_y + 380), "Disabled border", r("sem-text-body", theme), 12, 500)
        hairline(draw, inner_x, card_y + 404, inner_w, disabled_border_color)
    save(im, "12-disabled-border-matches-text.png")


if __name__ == "__main__":
    before_after()

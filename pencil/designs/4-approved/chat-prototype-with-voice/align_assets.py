#!/usr/bin/env python3
"""Align the exported panel PNGs so the panel sits at identical pixel
coordinates in every frame (fixes 1-2px content shift when stepping
through prototype screens).

The panel border/shadow is identical across all frames, so we
cross-correlate the alpha channel of the border strips against a
reference image and translate each frame to match.
"""
import sys
from PIL import Image

NAMES = [
    "welcome", "prompt-selected", "conversation", "recording",
    "transcribing", "transcribed", "thinking", "answer",
]
DIR = "assets"
REF = "welcome"
SEARCH = 4  # max shift in 2x pixels

def alpha_strips(im):
    """Left and top border strips of the alpha channel as flat lists."""
    a = im.getchannel("A")
    # left border strip: x 60..110, y 300..1500 (panel edge ~84)
    left = a.crop((60, 300, 110, 1500))
    # top border strip: x 300..600, y 60..110
    top = a.crop((300, 60, 600, 110))
    return left, top

def strip_diff(ref_strip, img, box, dx, dy):
    x0, y0, x1, y1 = box
    moved = img.getchannel("A").crop((x0 + dx, y0 + dy, x1 + dx, y1 + dy))
    rd = ref_strip.getdata()
    md = moved.getdata()
    return sum(abs(r - m) for r, m in zip(rd, md))

def main():
    write = "--write" in sys.argv
    ref = Image.open(f"{DIR}/{REF}.png").convert("RGBA")
    ref_left = ref.getchannel("A").crop((60, 300, 110, 1500))
    ref_top = ref.getchannel("A").crop((300, 60, 600, 110))

    for name in NAMES:
        im = Image.open(f"{DIR}/{name}.png").convert("RGBA")
        best = (0, 0)
        best_score = None
        for dx in range(-SEARCH, SEARCH + 1):
            score_x = strip_diff(ref_left, im, (60, 300, 110, 1500), dx, 0)
            if best_score is None or score_x < best_score:
                best_score = score_x
                best = (dx, best[1])
        dx = best[0]
        best_score = None
        for dy in range(-SEARCH, SEARCH + 1):
            score_y = strip_diff(ref_top, im, (300, 60, 600, 110), dx, dy)
            if best_score is None or score_y < best_score:
                best_score = score_y
                best = (dx, dy)
        dx, dy = best
        print(f"{name:16s} offset vs {REF}: dx={dx} dy={dy}")
        if write and (dx or dy):
            out = Image.new("RGBA", im.size, (0, 0, 0, 0))
            out.paste(im, (-dx, -dy))
            out.save(f"{DIR}/{name}.png")
            print(f"{'':16s} -> shifted by ({-dx},{-dy}) and saved")

if __name__ == "__main__":
    main()

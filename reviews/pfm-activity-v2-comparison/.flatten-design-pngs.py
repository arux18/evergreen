from pathlib import Path
from PIL import Image
for p in Path("/Users/amanda/Evergreen Cursor Project/design-specs/reviews/pfm-activity-v2-comparison/assets/design").glob("*.png"):
    img = Image.open(p).convert("RGBA")
    white = Image.new("RGBA", img.size, (255, 255, 255, 255))
    white.paste(img, mask=img.split()[3])
    white.convert("RGB").save(p)

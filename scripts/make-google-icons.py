from pathlib import Path

from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
logo = Image.open(root / "public" / "logo.png").convert("RGBA")
w, h = logo.size
q = logo.crop((0, 0, w, int(h * 0.72)))


def on_white_square(src: Image.Image, size: int, pad_ratio: float = 0.12) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    pad = max(2, int(size * pad_ratio))
    fitted = ImageOps.contain(src, (size - 2 * pad, size - 2 * pad))
    x = (size - fitted.width) // 2
    y = (size - fitted.height) // 2
    canvas.paste(fitted, (x, y), fitted)
    return canvas


def save_png(im: Image.Image, path: Path) -> None:
    im.save(path, format="PNG", optimize=True)
    print("wrote", path, im.size)


icon48 = on_white_square(q, 48, 0.08)
icon192 = on_white_square(q, 192, 0.10)
icon180 = on_white_square(q, 180, 0.10)
icon512 = on_white_square(q, 512, 0.10)

save_png(icon48, root / "public" / "favicon-48.png")
save_png(icon192, root / "public" / "icon-192.png")
save_png(icon180, root / "public" / "apple-touch-icon.png")
save_png(icon512, root / "public" / "icon-512.png")
save_png(icon512, root / "app" / "icon.png")
save_png(icon180, root / "app" / "apple-icon.png")

ico_base = on_white_square(q, 256, 0.08)
ico_path = root / "public" / "favicon.ico"
ico_base.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("wrote", ico_path, ico_path.stat().st_size)
(root / "app" / "favicon.ico").write_bytes(ico_path.read_bytes())
print("wrote app/favicon.ico")

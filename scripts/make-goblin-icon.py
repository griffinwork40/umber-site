#!/usr/bin/env python3
"""Generate the Goblin Portal app icon + favicon set.

Design intent
-------------
A portal arch in toxic green on a void-black squircle. The mark is a
simplified doorway/arch shape — evoking "portal" without being literal.
The goblin-green accent (#3DDC84) runs through an acid ramp that glows
against the near-black (#080D0B) background from the site's palette.

The arch reads at 16x16 as a clear doorway silhouette (>= 2px stroke).
Bloom behind the mark gives it the "lit from within" feel of a portal.

Forked from the Umber app's make-icon.py — same squircle geometry,
supersample pipeline, and bloom system.

Usage:
  python3 scripts/make-goblin-icon.py                     # public/images/icon-1024.png
  python3 scripts/make-goblin-icon.py --favicons           # + full favicon set
  python3 scripts/make-goblin-icon.py --variant prompt     # >_ mark instead of arch
"""
from __future__ import annotations

import argparse
import math
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

# ---------------------------------------------------------------- parameters
S = 1024
SS = 4                    # supersample factor
TILE = 824                # squircle edge on the 1024 grid (Apple macOS metric)
SQUIRCLE_N = 5.4          # superellipse exponent; ~5.4 matches Apple's corner

VARIANT_DEFAULT = "portal"

# Goblin Portal palette — from tokens.css
BG_TOP = (0x0C, 0x14, 0x0F)      # slightly lighter than pure bg for visibility
BG_BOTTOM = (0x06, 0x0A, 0x08)   # --color-titlebar territory

# Goblin green acid ramp — toxic neon core fading to darker edges
GOBLIN_RAMP = [
    (0.0, (0x1A, 0x8B, 0x4A)),   # dark forest green at base
    (0.3, (0x2F, 0xC5, 0x73)),   # --color-ansi-green
    (0.6, (0x3D, 0xDC, 0x84)),   # --color-accent: full goblin green
    (1.0, (0x7A, 0xEE, 0xA8)),   # lighter tip: acid highlight
]

STROKE = 116              # mark stroke @1024 -> ~1.8px @16
BLOOM = 0.55              # green bloom strength behind the mark
OPTICAL_LIFT = 0.010


# ------------------------------------------------------------------ geometry
def squircle_mask(size: int, n: float) -> Image.Image:
    m = Image.new("L", (size, size), 0)
    px = m.load()
    r = size / 2.0
    for y in range(size):
        ny = abs((y + 0.5 - r) / r) ** n
        if ny > 1.0:
            continue
        half = (1.0 - ny) ** (1.0 / n) * r
        for x in range(max(0, int(r - half)), min(size, int(math.ceil(r + half)))):
            px[x, y] = 255
    return m


def gradient(size: int, stops: list) -> Image.Image:
    """Vertical multi-stop gradient."""
    g = Image.new("RGB", (1, size))
    d = ImageDraw.Draw(g)
    for y in range(size):
        t = y / max(1, size - 1)
        for i in range(len(stops) - 1):
            p0, c0 = stops[i]
            p1, c1 = stops[i + 1]
            if p0 <= t <= p1:
                k = (t - p0) / max(1e-6, p1 - p0)
                d.point((0, y), fill=tuple(
                    round(c0[j] + (c1[j] - c0[j]) * k) for j in range(3)
                ))
                break
        else:
            d.point((0, y), fill=stops[-1][1])
    return g.resize((size, size), Image.BILINEAR)


def diagonal_gradient(w: int, h: int, stops: list) -> Image.Image:
    """45-degree multi-stop ramp sized to a specific box."""
    g = Image.new("RGB", (w, h))
    px = g.load()
    for y in range(h):
        for x in range(w):
            t = (x / max(1, w - 1) * 0.42) + (y / max(1, h - 1) * 0.58)
            for i in range(len(stops) - 1):
                p0, c0 = stops[i]
                p1, c1 = stops[i + 1]
                if p0 <= t <= p1:
                    k = (t - p0) / max(1e-6, p1 - p0)
                    px[x, y] = tuple(
                        round(c0[j] + (c1[j] - c0[j]) * k) for j in range(3)
                    )
                    break
            else:
                px[x, y] = stops[-1][1]
    return g


def ember_over(tile: int, glyph: Image.Image, stops: list) -> Image.Image:
    """Ramp fitted to the glyph's ink bounds, not the tile."""
    bb = glyph.getbbox()
    layer = Image.new("RGB", (tile, tile), stops[-1][1])
    if bb:
        layer.paste(
            diagonal_gradient(bb[2] - bb[0], bb[3] - bb[1], stops),
            (bb[0], bb[1]),
        )
    return layer.convert("RGBA")


# ---------------------------------------------------------------- mark shapes
def _unit(vx: float, vy: float) -> tuple:
    m = math.hypot(vx, vy) or 1.0
    return vx / m, vy / m


def mitred_chevron(d: ImageDraw.ImageDraw, p0, p1, p2, t: float, fill) -> None:
    """Chevron as ONE filled polygon with a true mitre at the apex."""
    (x0, y0), (x1, y1), (x2, y2) = p0, p1, p2
    dax, day = _unit(x1 - x0, y1 - y0)
    dbx, dby = _unit(x2 - x1, y2 - y1)
    nax, nay = -day, dax
    nbx, nby = -dby, dbx
    mx, my = _unit(nax + nbx, nay + nby)
    denom = max(0.35, mx * nax + my * nay)
    ml = (t / 2) / denom
    h = t / 2
    outer = [
        (x0 + nax * h, y0 + nay * h),
        (x1 + mx * ml, y1 + my * ml),
        (x2 + nbx * h, y2 + nby * h),
    ]
    inner = [
        (x2 - nbx * h, y2 - nby * h),
        (x1 - mx * ml, y1 - my * ml),
        (x0 - nax * h, y0 - nay * h),
    ]
    d.polygon(outer + inner, fill=fill)


def portal_arch_mask(tile: int, scale: int) -> Image.Image:
    """Portal arch — a rounded doorway silhouette.

    The arch is a semicircular top with straight sides and an open bottom,
    evoking a portal/doorway. Sized to survive at 16x16.
    """
    m = Image.new("L", (tile, tile), 0)
    d = ImageDraw.Draw(m)
    st = STROKE * scale

    cy = tile // 2
    # Arch dimensions — wide enough to read, tall enough for presence
    arch_w = int(300 * scale)      # total width
    arch_h = int(420 * scale)      # total height (semicircle top + legs)
    leg_h = int(180 * scale)       # straight leg portion
    arch_r = arch_w // 2           # semicircle radius = half width

    x_center = tile // 2
    y_top = cy - arch_h // 2       # top of the semicircle
    y_bottom = cy + arch_h // 2    # bottom of legs

    # Draw the arch as a thick stroke (outer - inner)
    # Outer arch
    outer = Image.new("L", (tile, tile), 0)
    od = ImageDraw.Draw(outer)
    # Semicircle top (outer)
    od.pieslice(
        [x_center - arch_r, y_top, x_center + arch_r, y_top + arch_w],
        180, 0, fill=255,
    )
    # Left leg (outer)
    od.rectangle(
        [x_center - arch_r, y_top + arch_r, x_center - arch_r + st, y_bottom],
        fill=255,
    )
    # Right leg (outer)
    od.rectangle(
        [x_center + arch_r - st, y_top + arch_r, x_center + arch_r, y_bottom],
        fill=255,
    )

    # Inner cutout
    inner = Image.new("L", (tile, tile), 0)
    nd = ImageDraw.Draw(inner)
    inner_r = arch_r - st
    if inner_r > 0:
        nd.pieslice(
            [x_center - inner_r, y_top + st,
             x_center + inner_r, y_top + st + inner_r * 2],
            180, 0, fill=255,
        )
        nd.rectangle(
            [x_center - inner_r, y_top + st + inner_r, x_center + inner_r, y_bottom],
            fill=255,
        )

    # Subtract inner from outer
    from PIL import ImageChops
    m = ImageChops.subtract(outer, inner)

    # Optical lift
    bbox = m.getbbox()
    if bbox:
        ink = m.crop(bbox)
        out = Image.new("L", (tile, tile), 0)
        out.paste(ink, (
            (tile - ink.width) // 2,
            (tile - ink.height) // 2 - int(tile * OPTICAL_LIFT),
        ))
        m = out
    return m


def prompt_mask(tile: int, scale: int) -> Image.Image:
    """The classic >_ prompt mark — kept as an alternative variant."""
    m = Image.new("L", (tile, tile), 0)
    d = ImageDraw.Draw(m)
    st = STROKE * scale
    cy = tile // 2

    cw, ch = int(206 * scale), int(330 * scale)
    bw = int(224 * scale)
    gap = int(84 * scale)
    total = cw + gap + bw
    x0 = (tile - total) // 2
    mitred_chevron(
        d, (x0, cy - ch // 2), (x0 + cw, cy), (x0, cy + ch // 2), st, 255,
    )
    bx, base = x0 + cw + gap, cy + ch // 2
    d.rounded_rectangle(
        [bx, base - st, bx + bw, base], radius=int(st * 0.34), fill=255,
    )

    bbox = m.getbbox()
    if bbox:
        ink = m.crop(bbox)
        out = Image.new("L", (tile, tile), 0)
        out.paste(ink, (
            (tile - ink.width) // 2,
            (tile - ink.height) // 2 - int(tile * OPTICAL_LIFT),
        ))
        m = out
    return m


# --------------------------------------------------------------------- build
def build(scale: int = SS, variant: str = VARIANT_DEFAULT) -> Image.Image:
    n, tile = S * scale, TILE * scale
    off = (n - tile) // 2

    shape = squircle_mask(tile, SQUIRCLE_N)

    if variant == "portal":
        glyph = portal_arch_mask(tile, scale)
    else:
        glyph = prompt_mask(tile, scale)

    body = gradient(tile, [(0.0, BG_TOP), (1.0, BG_BOTTOM)]).convert("RGBA")

    # Green bloom behind the mark — the portal glows
    bloom = glyph.filter(ImageFilter.GaussianBlur(tile * 0.050)).point(
        lambda v: int(v * BLOOM)
    )
    bloom_tint = (0x3D, 0xDC, 0x84)  # goblin green
    body = Image.composite(
        Image.new("RGBA", (tile, tile), bloom_tint + (255,)), body, bloom,
    )
    # Ramp-coloured mark composited over the bloom
    body = Image.composite(ember_over(tile, glyph, GOBLIN_RAMP), body, glyph)

    # Subtle rim light along top edge
    rim = Image.new("L", (tile, tile), 0)
    ImageDraw.Draw(rim).ellipse(
        [int(-0.30 * tile), int(-0.055 * tile),
         int(1.30 * tile), int(0.030 * tile)],
        fill=40,
    )
    rim = rim.filter(ImageFilter.GaussianBlur(tile * 0.006))
    # Green-tinted rim instead of warm
    body = Image.composite(
        Image.new("RGBA", (tile, tile), (180, 240, 200, 255)), body, rim,
    )

    body.putalpha(shape)

    canvas = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    sh = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    sh.paste((0, 0, 0, 64), (off, off + int(10 * scale)), shape)
    canvas.alpha_composite(sh.filter(ImageFilter.GaussianBlur(8 * scale)))
    canvas.alpha_composite(body, (off, off))
    return canvas.resize((S, S), Image.LANCZOS)


VARIANTS = ("portal", "prompt")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--variant", default=VARIANT_DEFAULT, choices=VARIANTS)
    ap.add_argument("--all", action="store_true", help="Render all variants")
    ap.add_argument("--favicons", action="store_true",
                    help="Generate full favicon set for the site")
    ap.add_argument("--out", default=None)
    a = ap.parse_args()

    root = Path(__file__).resolve().parent.parent
    outdir = Path(a.out) if a.out else root / "public" / "images"
    outdir.mkdir(parents=True, exist_ok=True)

    if a.all:
        for v in VARIANTS:
            dest = outdir / f"variant_{v}.png"
            build(variant=v).save(dest)
            print(f"wrote {dest}")
        return 0

    img = build(variant=a.variant)
    icon_path = outdir / "icon-1024.png"
    img.save(icon_path)
    print(f"wrote {icon_path}  (variant={a.variant})")

    if a.favicons:
        pub = root / "public"

        # apple-touch-icon (180x180)
        img.resize((180, 180), Image.LANCZOS).save(pub / "apple-touch-icon.png")
        print(f"wrote {pub / 'apple-touch-icon.png'}")

        # favicon PNGs
        for sz in (32, 16):
            dest = pub / f"favicon-{sz}x{sz}.png"
            img.resize((sz, sz), Image.LANCZOS).save(dest)
            print(f"wrote {dest}")

        # Android/PWA sizes
        for sz in (192, 512):
            dest = outdir / f"icon-{sz}.png"
            img.resize((sz, sz), Image.LANCZOS).save(dest)
            print(f"wrote {dest}")

        # favicon.ico (multi-size via ImageMagick)
        ico_path = pub / "favicon.ico"
        subprocess.run([
            "magick",
            str(pub / "favicon-16x16.png"),
            str(pub / "favicon-32x32.png"),
            str(ico_path),
        ], check=True)
        print(f"wrote {ico_path}")

        # site.webmanifest
        manifest = pub / "site.webmanifest"
        manifest.write_text("""{
  "name": "Goblin Portal",
  "short_name": "GoblinPortal",
  "icons": [
    { "src": "/images/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#080D0B",
  "background_color": "#080D0B",
  "display": "standalone"
}
""")
        print(f"wrote {manifest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

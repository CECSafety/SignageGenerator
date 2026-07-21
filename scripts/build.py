#!/usr/bin/env python3
"""
CEC Safety Studio — Build Script
--------------------------------
Composes a single self-contained HTML file from the source components:
    src/head.html      — <head> content (fonts, meta)
    src/styles.css     — full stylesheet
    src/body.html      — page body markup
    src/data.js        — templates, pictograms, infographics, photo library
    src/app.js         — state, rendering, event wiring
    src/assets/*       — logo binaries (embedded as data URIs)

Output: dist/cec_safety_studio.html
"""
import base64
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC  = ROOT / "src"
DIST = ROOT / "dist"


def to_data_uri(path: pathlib.Path) -> str:
    """Convert a file to a base64 data URI. Extension picks the MIME type."""
    ext = path.suffix.lower().lstrip(".")
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
            "gif": "image/gif", "svg": "image/svg+xml"}[ext]
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def read(path: pathlib.Path) -> str:
    return path.read_text(encoding="utf-8")


def build_logos_js() -> str:
    """Generate the LOGOS const from the files in src/assets/."""
    assets = SRC / "assets"
    entries = []
    mapping = {
        "cec_mark":   ["cec_mark.jpg", "cec_mark.png"],
        "cec_full":   ["cec_full.png", "cec_full.jpg"],
        "cec_safety": ["cec_safety.png", "cec_safety.jpg"],
        "cec_corp":   ["cec_corp.png", "cec_corp.jpg"],
    }
    for key, candidates in mapping.items():
        for name in candidates:
            path = assets / name
            if path.exists():
                entries.append(f"  {key}: '{to_data_uri(path)}',")
                break
        else:
            print(f"warning: no asset found for {key}", file=sys.stderr)
    return "const LOGOS = {\n" + "\n".join(entries) + "\n};\n"


def main() -> None:
    DIST.mkdir(parents=True, exist_ok=True)

    parts = [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width,initial-scale=1">',
        "<title>CEC Safety Studio — Signage &amp; Infographic System</title>",
        '<meta name="description" content="Generate ANSI Z535-compliant safety signage and editorial-grade safety infographics for CEC field operations.">',
        read(SRC / "head.html").strip(),
        "<style>",
        read(SRC / "styles.css").strip(),
        "</style>",
        "</head>",
        "<body>",
        read(SRC / "body.html").strip(),
        "<script>",
        build_logos_js(),
        read(SRC / "data.js").strip(),
        read(SRC / "app.js").strip(),
        "</script>",
        "</body>",
        "</html>",
    ]

    out = DIST / "cec_safety_studio.html"
    out.write_text("\n".join(parts), encoding="utf-8")
    print(f"Built: {out} ({len(out.read_bytes()):,} bytes)")


if __name__ == "__main__":
    main()

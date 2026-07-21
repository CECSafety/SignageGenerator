#!/usr/bin/env python3
"""
CEC Safety Studio — Local dev server.

Rebuilds on request and serves dist/cec_safety_studio.html at
http://localhost:8080/. Simple — no file-watching, just refresh
the browser after rebuilding.

Usage:
    python3 scripts/dev.py            # start server
    python3 scripts/dev.py --port 3000
"""
import argparse
import http.server
import pathlib
import socketserver
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "dist"), **kwargs)

    def do_GET(self):
        # Rebuild on every root request so refresh always picks up changes.
        if self.path in ("/", "/index.html", "/cec_safety_studio.html"):
            subprocess.run([sys.executable, str(ROOT / "scripts" / "build.py")], check=False)
            if self.path == "/":
                self.path = "/cec_safety_studio.html"
        return super().do_GET()


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--port", type=int, default=8080)
    args = p.parse_args()

    subprocess.run([sys.executable, str(ROOT / "scripts" / "build.py")], check=True)

    with socketserver.TCPServer(("", args.port), Handler) as httpd:
        print(f"Serving at http://localhost:{args.port}/")
        print("Every root request rebuilds from src/. Ctrl-C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()

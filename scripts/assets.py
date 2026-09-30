"""Copy FinFun creatives into public/a as optimised WebP and write lib/assets.json (sizes)."""
import json, os, glob
from PIL import Image
SRC = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(SRC, 'site', 'public', 'a')
C = os.path.join(SRC, 'finfun-site-creatives')
jobs = []  # (src, dest name, max width)
for f in glob.glob(os.path.join(SRC, 'sticker', '*.png')):
    jobs.append((f, 'sticker/' + os.path.basename(f)[:-4], 560))
for f in glob.glob(os.path.join(C, '**', '*.png'), recursive=True):
    rel = os.path.relpath(f, C)
    if rel.startswith(('00-', '01-', '12-')):
        continue
    name = os.path.basename(f)[:-4]
    folder = rel.split(os.sep)[0][3:]
    mw = 1600 if any(k in name for k in ('banner', 'flow', 'kit', 'course', 'blog', 'page-', 'empty', 'cover', 'hero')) else 480
    jobs.append((f, f'{folder}/{name}', mw))
sizes = {}
for src, dest, mw in jobs:
    im = Image.open(src)
    im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
    if im.width > mw:
        im = im.resize((mw, round(im.height * mw / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, dest + '.webp')
    os.makedirs(os.path.dirname(p), exist_ok=True)
    im.save(p, 'WEBP', quality=82, method=6)
    sizes['/a/' + dest + '.webp'] = [im.width, im.height]
os.makedirs(os.path.join(SRC, 'site', 'lib'), exist_ok=True)
json.dump(dict(sorted(sizes.items())), open(os.path.join(SRC, 'site', 'lib', 'assets.json'), 'w'), indent=1)
print(len(sizes), 'assets')

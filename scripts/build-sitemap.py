#!/usr/bin/env python3
"""Regenerate sitemap.xml from every deployed index.html (lastmod = file mtime). Run by build-pages.sh."""
import os,datetime
SKIP=('work','dist','node_modules','ui-lab','lovable','functions','.git','v2')
pages=[]
for root,dirs,files in os.walk('.'):
    dirs[:]=[d for d in dirs if d not in SKIP and not d.startswith('.')]
    if 'index.html' in files and 'noindex' not in open(os.path.join(root,'index.html'),encoding='utf-8').read(4000):
        p=root[1:].rstrip('/')+'/'; pages.append((p,datetime.date.fromtimestamp(os.path.getmtime(os.path.join(root,'index.html')))))
PRI={'/':'1.0','/dama/':'0.9','/enterprise-data-platform/':'0.9','/demos/':'0.85','/perspectives/':'0.85'}
pages.sort(key=lambda x:(-float(PRI.get(x[0],'0.8')),x[0]))
xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(
    f'  <url>\n    <loc>https://www.ram-bala.com{p}</loc>\n    <lastmod>{d}</lastmod>\n    <changefreq>{"weekly" if p=="/" else "monthly"}</changefreq>\n    <priority>{PRI.get(p,"0.8")}</priority>\n  </url>\n' for p,d in pages)+'</urlset>\n'
open('sitemap.xml','w').write(xml); print('sitemap.xml:',len(pages),'urls')

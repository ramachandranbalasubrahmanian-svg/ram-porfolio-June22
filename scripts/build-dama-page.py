#!/usr/bin/env python3
"""Generate /dama/index.html (DAMA CDMP Master · Officer of Education · Bengaluru landing page)
from index.html so the credential wall is never duplicated by hand. Run before deploy
(build-pages.sh does this). Source of truth stays index.html."""
import re, os, json
SRC=open('index.html',encoding='utf-8').read()
HOST='https://www.ram-bala.com'; PATH='/dama/'
TITLE='DAMA CDMP Master &amp; Data Leader in Bengaluru (Bangalore) | Ram Balasubrahmanian'
DESC='DAMA CDMP Master (one of ~430 worldwide) and Officer of Education, DAMA India Bengaluru Chapter. Data &amp; AI governance leader in Bengaluru (Bangalore).'
assert len(DESC.replace('&amp;','&'))<=160, len(DESC)
VERIFY='https://eu.credential.net/4a794956-acbf-4e4c-bdfa-0507c563027c'
CHAPTER='https://www.linkedin.com/company/dama-india-bengaluru-chapter'

def section(name):
    i=SRC.index(f'<section id="{name}"'); j=SRC.index('</section>',i)+len('</section>'); return SRC[i:j]
def absolutize(h):
    return h.replace('"assets/','"/assets/').replace("'assets/","'/assets/").replace(', assets/',', /assets/').replace('"data/','"/data/')

head=SRC[:SRC.index('<body')]
pre=SRC[SRC.index('<body'):SRC.index('<main')]+'<main id="main">'
post=SRC[SRC.index('</main>'):]
ld=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',SRC,flags=re.S).group(1))
person=next(x for x in ld['@graph'] if x['@type']=='Person')
exec_pdf=re.search(r'assets/Ram-Bala-Executive-Summary\.pdf\?v=\d+',SRC).group(0)

# head
for pat,val in [(r'<title>.*?</title>','<title>%s</title>'%TITLE),
                (r'<meta name="description" content="[^"]*"','<meta name="description" content="%s"'%DESC),
                (r'<link rel="canonical" href="[^"]*"','<link rel="canonical" href="%s%s"'%(HOST,PATH)),
                (r'<meta property="og:url" content="[^"]*"','<meta property="og:url" content="%s%s"'%(HOST,PATH)),
                (r'<meta property="og:title" content="[^"]*"','<meta property="og:title" content="%s"'%TITLE),
                (r'<meta name="twitter:title" content="[^"]*"','<meta name="twitter:title" content="%s"'%TITLE),
                (r'<meta property="og:description" content="[^"]*"','<meta property="og:description" content="%s"'%DESC),
                (r'<meta name="twitter:description" content="[^"]*"','<meta name="twitter:description" content="%s"'%DESC)]:
    head,n=re.subn(pat,val,head,count=1,flags=re.S); assert n==1,pat

# chrome: in-page anchors become home anchors; mark no nav item current
pre=re.sub(r'href="(#[a-z0-9-]+)"',r'href="/\1"',pre); post=re.sub(r'href="(#[a-z0-9-]+)"',r'href="/\1"',post)
post=re.sub(r'<script type="application/ld\+json">.*?</script>','',post,flags=re.S)

dama=section('dama').replace(' <a href="/dama/" class="dama-page-link">DAMA profile page →</a>','')
assert '/dama/' not in dama

FAQ=[('Who is a DAMA-certified data leader in Bangalore?',
      'Ram Balasubrahmanian is a DAMA CDMP Master based in Bengaluru (Bangalore), India — one of around 430 professionals worldwide at that level — and, from October 2026, Officer of Education of the DAMA India Bengaluru Chapter. He has 16+ years in data and AI governance, most recently at Toptal and FICO.'),
     ('What is a DAMA CDMP Master?',
      'CDMP (Certified Data Management Professional) is DAMA International’s certification on the DAMA-DMBOK body of knowledge. Master is the highest exam-based level: the Data Management Fundamentals exam plus two specialist exams, all scored above 80%, and approval by DAMA. Ram’s scores are Fundamentals 88%, Data Governance 83% and Data Quality 88%.'),
     ('What does the Officer of Education at DAMA India Bengaluru Chapter do?',
      'The Officer of Education plans and delivers the chapter’s educational programmes — webinars, workshops and seminars — identifies learning topics for the data-management community, coordinates speakers and subject-matter experts, and reports to the Chapter President. Ram was appointed on 21 October 2026, effective 26 October 2026.'),
     ('Does Ram train or mentor CDMP candidates?',
      'Yes. Ram offers exam-preparation training for the Data Management Fundamentals, Data Governance and Data Quality exams, and mentors candidates working towards CDMP Practitioner and Master. This is practitioner-led preparation; it is not an official DAMA training programme.'),
     ('How can I verify the credential?',
      'Every exam and the Master certification carry a public verification link issued through DAMA International’s credential platform (eu.credential.net). The links are on this page next to each badge.')]
faq_html=''.join('<details class="faq-item"%s><summary>%s</summary><p>%s</p></details>'%(' open' if i==0 else '',q,a) for i,(q,a) in enumerate(FAQ))

cards=[('DMBOK as an operating model','Governance, quality, metadata, lineage and MDM run as one Detect → Resolve → Prevent → Govern → Scale rhythm — proven on 50+ financial-services platforms, not a framework on a slide.','/#case-studies','Read the case studies'),
       ('Evidence you can open','Three working governed-AI systems (Golden Record RAG, MediGovern RAG, Pipeline Pulse) and the Enterprise Data Platform hub are public, so a CDO can inspect the work before a first call.','/demos/','Open the working systems'),
       ('Education for the community','As Officer of Education, Ram runs the DAMA India Bengaluru Chapter’s learning calendar: DMBOK-aligned workshops, webinars and speaker sessions for Bengaluru’s data practitioners.',CHAPTER,'Chapter on LinkedIn'),
       ('CDMP training and mentoring','Exam preparation for Fundamentals, Data Governance and Data Quality, and mentoring for candidates on the Practitioner and Master tracks — from someone who sat all three recently.','/#contact','Ask about a cohort')]
cards_html='<div class="pov-grid rv rv-stagger d2">'+''.join('<div class="pov-card"><p class="pov-tag">0%d</p><h3>%s</h3><p>%s</p><a class="pov-cta" href="%s"%s>%s</a></div>'%(i+1,h,p,href,' target="_blank" rel="noopener"' if href.startswith('http') else '',cta) for i,(h,p,href,cta) in enumerate(cards))+'</div>'

body=('<section id="dama-hero" class="section"><div class="wrap"><nav class="crumbs rv" aria-label="Breadcrumb"><a href="/">Home</a> › <span>DAMA</span></nav>'
      '<p class="sl rv">DAMA · Bengaluru (Bangalore) · India</p>'
      '<h1 class="h-section rv d1">DAMA CDMP Master and Officer of Education, DAMA India Bengaluru Chapter.</h1>'
      '<p class="rv d2" style="max-width:70ch;font-size:1.08rem;line-height:1.7">Ram Balasubrahmanian is a data and AI governance leader based in Bengaluru (Bangalore), India — a <strong>DAMA CDMP Master</strong>, one of around 430 worldwide, with 16+ years across financial services and other data-intensive industries, most recently at Toptal and FICO. From October 2026 he serves as <strong>Officer of Education of the DAMA India Bengaluru Chapter</strong>, and trains and mentors CDMP candidates.</p>'
      '<div class="hero-btns rv d3"><a href="/#contact" class="btn btn-gold">Contact Ram →</a><a href="/%s" class="btn btn-outline" download="Ram-Bala-Executive-Summary.pdf">Executive summary (PDF)</a><a href="%s" class="btn btn-outline" target="_blank" rel="noopener">Verify credential ↗</a></div></div></section>'%(exec_pdf,VERIFY)
      + dama +
      '<section id="dama-value" class="section"><div class="wrap"><p class="sl rv">What it means for you</p><h2 class="h-section rv d1">What a DAMA-certified data leader brings to your organisation.</h2>'+cards_html+'</div></section>'
      '<section id="faq" class="section alt"><div class="wrap faq-section"><p class="sl rv">FAQ</p><h2 class="h-section rv d1">DAMA, CDMP and Bengaluru — common questions.</h2><div class="faq-list rv d2">'+faq_html+'</div></div></section>')

graph=[{'@type':'WebPage','@id':HOST+PATH+'#webpage','url':HOST+PATH,'name':TITLE.replace('&amp;','&'),'description':DESC.replace('&amp;','&'),'isPartOf':{'@id':HOST+'/#website'},'about':{'@id':person['@id']},'inLanguage':'en-US'},
       {'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':HOST+'/'},{'@type':'ListItem','position':2,'name':'DAMA CDMP Master · Bengaluru','item':HOST+PATH}]},
       {'@type':'FAQPage','@id':HOST+PATH+'#faq','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in FAQ]},
       person]
ldjson='<script type="application/ld+json">%s</script>'%json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False,separators=(',',':'))
page=absolutize(head)+absolutize(pre+body+ldjson+post)
assert 'href="assets/' not in page and 'src="assets/' not in page
os.makedirs('dama',exist_ok=True); open('dama/index.html','w',encoding='utf-8').write(page)
print('dama/index.html',len(page),'bytes')

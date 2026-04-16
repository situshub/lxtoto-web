// CSR Renderer v3 — 5 completely different HTML layouts per page
(function(){
  var CONFIG = {
    loginUrl: 'https://loginwap.gelapsekali.com/lx',
    daftarUrl: 'https://daftarwap.gelapsekali.com/lx',
    bannerImg: 'https://i.imgur.com/Qg2Nk3k.jpeg',
    logoImg: 'https://i.imgur.com/8MstvlV.png',
    baseUrl: 'https://situshub.github.io/lxtoto-web/'
  };

  // Set topbar links
  var lb=document.getElementById('login-btn'),db=document.getElementById('daftar-btn');
  if(lb){lb.href=CONFIG.loginUrl;lb.rel='sponsored nofollow noopener';}
  if(db){db.href=CONFIG.daftarUrl;db.rel='sponsored nofollow noopener';}

  var path=window.location.pathname;
  var match=path.match(/page(\d+)/);
  var pageId=match?'page'+match[1]:'index';
  fetch(pageId==='index'?'./data.json':'./data.json')
    .then(function(r){if(!r.ok)throw new Error('404');return r.json();})
    .then(function(d){render(d);})
    .catch(function(){document.getElementById('app').innerHTML='<div style="text-align:center;padding:100px 20px"><h1>Halaman tidak ditemukan</h1></div>';});

  function render(d){
    var pn=parseInt((pageId.match(/\d+/)||[0])[0])||0;
    var variant=pn%5; // 0-4 = 5 different layouts
    var pri=d.color||'#6366f1';

    // Update meta
    document.title=d.title;
    setMeta('description',d.description);setMeta('keywords',d.keywords);setMeta('author','LXTOTO Community');
    setLink('canonical',CONFIG.baseUrl+pageId+'/');
    setProperty('og:title',d.title);setProperty('og:description',d.description);setProperty('og:url',CONFIG.baseUrl+pageId+'/');
    setProperty('og:image',CONFIG.bannerImg);setProperty('og:image:width','1200');setProperty('og:image:height','630');
    setProperty('og:image:alt',d.title);setProperty('og:type','article');setProperty('og:locale','id_ID');setProperty('og:site_name','LXTOTO');
    setMeta('twitter:card','summary_large_image');setMeta('twitter:title',d.title);setMeta('twitter:description',d.description);setMeta('twitter:image',CONFIG.bannerImg);

    // Font
    if(d.font){var fl=document.createElement('link');fl.href='https://fonts.googleapis.com/css2?family='+d.font.replace(/ /g,'+')+':wght@400;600;700;800&display=swap';fl.rel='stylesheet';document.head.appendChild(fl);}

    // JSON-LD
    addJsonLd({"@context":"https://schema.org","@type":"Article","headline":d.title,"description":d.description,"image":CONFIG.bannerImg,"author":{"@type":"Organization","name":"LXTOTO Community"},"publisher":{"@type":"Organization","name":"LXTOTO","logo":{"@type":"ImageObject","url":CONFIG.logoImg}},"datePublished":"2026-04-16","dateModified":"2026-04-16","mainEntityOfPage":{"@type":"WebPage","@id":CONFIG.baseUrl+pageId+"/"},"inLanguage":"id-ID"});
    addJsonLd({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":CONFIG.baseUrl},{"@type":"ListItem","position":2,"name":d.title}]});
    addJsonLd({"@context":"https://schema.org","@type":"WebSite","name":"LXTOTO","url":CONFIG.baseUrl,"potentialAction":{"@type":"SearchAction","target":CONFIG.baseUrl+"?q={search_term_string}","query-input":"required name=search_term_string"}});
    addJsonLd({"@context":"https://schema.org","@type":"Organization","name":"LXTOTO","url":CONFIG.baseUrl,"logo":CONFIG.logoImg});
    if(d.faq&&d.faq.length)addJsonLd({"@context":"https://schema.org","@type":"FAQPage","mainEntity":d.faq.map(function(f){return{"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}};})});

    // Inject variant CSS + build HTML
    var css='';var html='';var fn=d.font?("'"+d.font+"',"):'';

    if(variant===0) { layoutCentered(d,pri,fn); return; }
    if(variant===1) { layoutSplit(d,pri,fn); return; }
    if(variant===2) { layoutCards(d,pri,fn); return; }
    if(variant===3) { layoutEditorial(d,pri,fn); return; }
    if(variant===4) { layoutCompact(d,pri,fn); return; }
  }

  // ============================================================
  // LAYOUT 0: CENTERED — classic centered blog layout
  // ============================================================
  function layoutCentered(d,pri,fn){
    injectCSS(pri,fn,
      '.hero-0{padding:72px 24px 48px;text-align:center;background:radial-gradient(800px 400px at 50% 0%,'+pri+'20,transparent),var(--bg);border-bottom:2px solid '+pri+'30}'+
      '.hero-0 h1{font-size:clamp(1.8rem,4.5vw,2.8rem);background:linear-gradient(135deg,#fff,'+pri+');-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;max-width:800px;margin:0 auto 20px}'+
      '.hero-0 p{max-width:650px;margin:0 auto;color:var(--text-dim);font-size:1.08rem}'+
      '.hero-0 .pills{display:flex;gap:10px;justify-content:center;margin-top:24px;flex-wrap:wrap}.hero-0 .pill{font-size:.82rem;padding:6px 14px;border-radius:999px;background:'+pri+'10;border:1px solid '+pri+'25;color:var(--text)}'
    );
    var h='<header class="hero-0"><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p>';
    h+='<div class="pills"><span>✦ Update 2026</span><span>✦ Panduan Lengkap</span><span>✦ Terpercaya</span></div></header>';
    h+=breadcrumb(d)+banner()+mainOpen()+sections(d)+cta(d,pri)+faq(d)+mainClose()+footer(0,d,pri);
    finalize(h);
  }

  // ============================================================
  // LAYOUT 1: SPLIT — hero split left text + right accent
  // ============================================================
  function layoutSplit(d,pri,fn){
    injectCSS(pri,fn,
      '.hero-1{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;padding:72px 24px 48px;max-width:1100px;margin:0 auto;min-height:360px}'+
      '.hero-1 .hero-text h1{font-size:clamp(1.6rem,3.5vw,2.4rem);color:var(--text-hi);margin:0 0 16px}'+
      '.hero-1 .hero-text p{color:var(--text-dim);font-size:1.05rem;margin:0 0 24px}'+
      '.hero-1 .hero-accent{background:linear-gradient(135deg,'+pri+'15,'+pri+'08);border:1px solid '+pri+'25;border-radius:24px;padding:40px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}'+
      '.hero-1 .hero-accent .stat{font-size:2.2rem;font-weight:800;color:'+pri+'}.hero-1 .hero-accent .stat-label{font-size:.85rem;color:var(--text-dim)}'+
      '@media(max-width:768px){.hero-1{grid-template-columns:1fr;padding:48px 20px 32px}.hero-1 .hero-accent{padding:24px}}'
    );
    var h='<div class="hero-1"><div class="hero-text"><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p>';
    h+='<a href="'+CONFIG.daftarUrl+'" rel="sponsored nofollow noopener" style="display:inline-flex;padding:12px 28px;background:'+pri+';color:#0c0d14;font-weight:700;border-radius:999px;text-decoration:none">Daftar Sekarang →</a>';
    h+='</div><div class="hero-accent"><div class="stat">100+</div><div class="stat-label">Artikel Terlengkap</div><div class="stat">24/7</div><div class="stat-label">Support Aktif</div><div class="stat">99.9%</div><div class="stat-label">Uptime</div></div></div>';
    h+=breadcrumb(d)+banner()+mainOpen()+sections(d)+cta(d,pri)+faq(d)+mainClose()+footer(1,d,pri);
    finalize(h);
  }

  // ============================================================
  // LAYOUT 2: CARDS — content in card grid layout
  // ============================================================
  function layoutCards(d,pri,fn){
    injectCSS(pri,fn,
      '.hero-2{padding:56px 24px 36px;text-align:center;background:linear-gradient(180deg,'+pri+'12 0%,transparent 100%);border-bottom:1px solid '+pri+'20}'+
      '.hero-2 h1{font-size:clamp(1.6rem,4vw,2.4rem);color:var(--text-hi);margin:0 auto 12px;max-width:750px}'+
      '.hero-2 p{color:var(--text-dim);max-width:600px;margin:0 auto}'+
      '.card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:24px;margin:24px 0}'+
      '.content-card{background:var(--card);border:1px solid '+pri+'15;border-radius:16px;padding:28px;transition:border-color .3s,transform .3s}'+
      '.content-card:hover{border-color:'+pri+';transform:translateY(-4px)}'+
      '.content-card h2{font-size:1.3rem;margin:0 0 12px;padding:0;border:none;color:'+pri+'}.content-card h3{font-size:1.1rem;color:var(--text-hi);margin:12px 0 8px}'+
      '@media(max-width:640px){.card-grid{grid-template-columns:1fr}}'
    );
    var h='<header class="hero-2"><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p></header>';
    h+=breadcrumb(d)+banner()+'<main><div class="wrap"><article><div class="card-grid">';
    if(d.sections){d.sections.forEach(function(s){
      h+='<div class="content-card anim">';
      if(s.h2)h+='<h2>'+s.h2+'</h2>';
      if(s.h3)h+='<h3>'+s.h3+'</h3>';
      if(s.paragraphs)s.paragraphs.forEach(function(p){h+='<p>'+p+'</p>';});
      if(s.list){h+='<ul>';s.list.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ul>';}
      if(s.ordered){h+='<ol>';s.ordered.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ol>';}
      if(s.table)h+='<div class="tbl" id="perbandingan">'+renderTable(s.table)+'</div>';
      h+='</div>';
    });}
    h+='</div>'+cta(d,pri)+faq(d)+'</article></div></main>'+footer(2,d,pri);
    finalize(h);
  }

  // ============================================================
  // LAYOUT 3: EDITORIAL — magazine/newspaper feel, wide text
  // ============================================================
  function layoutEditorial(d,pri,fn){
    injectCSS(pri,fn,
      '.hero-3{padding:80px 24px 48px;border-bottom:4px solid '+pri+';position:relative}'+
      '.hero-3::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(0deg,transparent,transparent 49px,'+pri+'08 49px,'+pri+'08 50px)}'+
      '.hero-3 .hero-inner{max-width:880px;margin:0 auto;position:relative}'+
      '.hero-3 .eyebrow{display:inline-block;padding:4px 14px;background:'+pri+';color:#0c0d14;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;border-radius:4px;margin-bottom:16px}'+
      '.hero-3 h1{font-size:clamp(2rem,5vw,3.2rem);color:var(--text-hi);margin:0 0 20px;line-height:1.1;font-weight:800}'+
      '.hero-3 p{font-size:1.15rem;color:var(--text-dim);max-width:700px;line-height:1.7}'+
      '.hero-3 .meta-line{margin-top:20px;font-size:.85rem;color:var(--text-dim);display:flex;gap:16px;flex-wrap:wrap}'+
      '.hero-3 .meta-line span{display:flex;align-items:center;gap:4px}'+
      '.wrap-ed{max-width:780px;margin:0 auto;padding:0 24px}'+
      'article.editorial p{font-size:1.08rem;line-height:2;margin:1.2rem 0}'+
      'article.editorial h2{font-size:1.9rem;margin:3rem 0 1.2rem;border-left:5px solid '+pri+';padding-left:18px}'+
      'article.editorial h3{font-size:1.35rem;margin:2rem 0 .8rem}'
    );
    var h='<header class="hero-3"><div class="hero-inner"><span class="eyebrow">Panduan 2026</span>';
    h+='<h1>'+d.h1+'</h1><p>'+d.subtitle+'</p>';
    h+='<div class="meta-line"><span>📅 April 2026</span><span>⏱ 8 min read</span><span>✍ LXTOTO Community</span></div>';
    h+='</div></header>';
    h+=breadcrumb(d)+banner()+'<main><div class="wrap-ed"><article class="editorial">';
    if(d.sections)d.sections.forEach(function(s){
      h+='<section class="anim">';
      if(s.h2)h+='<h2 id="'+slugify(s.h2)+'">'+s.h2+'</h2>';
      if(s.h3)h+='<h3>'+s.h3+'</h3>';
      if(s.paragraphs)s.paragraphs.forEach(function(p){h+='<p>'+p+'</p>';});
      if(s.list){h+='<ul>';s.list.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ul>';}
      if(s.ordered){h+='<ol>';s.ordered.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ol>';}
      if(s.table)h+='<div class="tbl" id="perbandingan">'+renderTable(s.table)+'</div>';
      h+='</section>';
    });
    h+=cta(d,pri)+faq(d)+'</article></div></main>'+footer(3,d,pri);
    finalize(h);
  }

  // ============================================================
  // LAYOUT 4: COMPACT — minimal, sidebar-style TOC
  // ============================================================
  function layoutCompact(d,pri,fn){
    injectCSS(pri,fn,
      '.hero-4{padding:48px 24px 28px;background:'+pri+'08;border-bottom:1px solid '+pri+'20}'+
      '.hero-4 h1{font-size:clamp(1.5rem,3.5vw,2.2rem);color:var(--text-hi);margin:0 0 8px;max-width:880px;margin:0 auto 10px}'+
      '.hero-4 p{color:var(--text-dim);max-width:880px;margin:0 auto}'+
      '.layout-4{display:grid;grid-template-columns:220px 1fr;gap:32px;max-width:1100px;margin:0 auto;padding:32px 24px;align-items:start}'+
      '.sidebar-toc{position:sticky;top:80px;background:var(--card);border-radius:12px;padding:20px;border:1px solid '+pri+'15}'+
      '.sidebar-toc h3{font-size:.85rem;text-transform:uppercase;letter-spacing:1px;color:'+pri+';margin:0 0 12px}'+
      '.sidebar-toc a{display:block;padding:6px 0;font-size:.88rem;color:var(--text-dim);border-bottom:1px solid '+pri+'08;text-decoration:none;transition:color .2s}'+
      '.sidebar-toc a:hover{color:'+pri+'}'+
      '@media(max-width:768px){.layout-4{grid-template-columns:1fr}.sidebar-toc{display:none}}'
    );
    var h='<header class="hero-4"><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p></header>';
    h+=breadcrumb(d)+banner()+'<div class="layout-4"><nav class="sidebar-toc"><h3>Daftar Isi</h3>';
    if(d.sections)d.sections.forEach(function(s){if(s.h2)h+='<a href="#'+slugify(s.h2)+'">'+s.h2+'</a>';});
    h+='<a href="#faq">FAQ</a></nav><main><article>';
    if(d.sections)d.sections.forEach(function(s){
      h+='<section class="anim">';
      if(s.h2)h+='<h2 id="'+slugify(s.h2)+'">'+s.h2+'</h2>';
      if(s.h3)h+='<h3>'+s.h3+'</h3>';
      if(s.paragraphs)s.paragraphs.forEach(function(p){h+='<p>'+p+'</p>';});
      if(s.list){h+='<ul>';s.list.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ul>';}
      if(s.ordered){h+='<ol>';s.ordered.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ol>';}
      if(s.table)h+='<div class="tbl" id="perbandingan">'+renderTable(s.table)+'</div>';
      h+='</section>';
    });
    h+=cta(d,pri)+faq(d)+'</article></main></div>'+footer(4,d,pri);
    finalize(h);
  }

  // ============================================================
  // SHARED HELPERS
  // ============================================================
  function breadcrumb(d){return '<nav class="bc" aria-label="breadcrumb"><ol><li><a href="'+CONFIG.baseUrl+'">Home</a></li><li>'+d.title+'</li></ol></nav>';}
  function banner(){return '<a class="banner" href="'+CONFIG.daftarUrl+'" rel="sponsored nofollow noopener"><img src="'+CONFIG.bannerImg+'" alt="Banner Promosi" width="1200" height="400" loading="lazy"></a>';}
  function mainOpen(){return '<main><div class="wrap"><article>';}
  function mainClose(){return '</article></div></main>';}

  function sections(d){
    var h='';
    if(d.sections)d.sections.forEach(function(s){
      h+='<section class="anim">';
      if(s.h2)h+='<h2 id="'+slugify(s.h2)+'">'+s.h2+'</h2>';
      if(s.h3)h+='<h3>'+s.h3+'</h3>';
      if(s.paragraphs)s.paragraphs.forEach(function(p){h+='<p>'+p+'</p>';});
      if(s.list){h+='<ul>';s.list.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ul>';}
      if(s.ordered){h+='<ol>';s.ordered.forEach(function(li){h+='<li>'+li+'</li>';});h+='</ol>';}
      if(s.table)h+='<div class="tbl" id="perbandingan">'+renderTable(s.table)+'</div>';
      h+='</section>';
    });
    return h;
  }

  function cta(d,pri){
    return '<aside class="cta anim" style="background:linear-gradient(135deg,var(--card),'+pri+'10);border:1px solid '+pri+'25;border-radius:16px;padding:32px;margin:2.5rem 0;position:relative;overflow:hidden">'+
      '<h3 style="color:'+pri+';margin:0 0 8px">Siap Bergabung?</h3><p style="color:var(--text-dim);margin:0 0 16px">Daftar sekarang dan nikmati semua fitur. Proses cepat dan aman.</p>'+
      '<a class="btn" href="'+CONFIG.daftarUrl+'" rel="sponsored nofollow noopener" style="display:inline-flex;padding:12px 28px;background:'+pri+';color:#0c0d14;font-weight:700;border-radius:999px;text-decoration:none;min-height:44px">Daftar Sekarang →</a></aside>';
  }

  function faq(d){
    if(!d.faq||!d.faq.length)return '';
    var h='<section class="anim"><h2 id="faq">Pertanyaan Umum</h2>';
    d.faq.forEach(function(f){h+='<details class="anim"><summary>'+f.q+'</summary><div class="faq-a">'+f.a+'</div></details>';});
    return h+'</section>';
  }

  function footer(variant,d,pri){
    if(variant===0)return '<footer style="border-top:3px solid '+pri+'"><p>&copy; 2026 LXTOTO Community</p><div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div></footer>';
    if(variant===1)return '<footer style="border-top:3px solid '+pri+';text-align:left"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;max-width:880px;margin:0 auto"><div><strong style="color:'+pri+'">LXTOTO</strong><p>Platform hiburan digital terpercaya.</p></div><div><strong>Menu</strong><p><a href="#faq" style="color:'+pri+'">FAQ</a> · <a href="#perbandingan" style="color:'+pri+'">Data</a></p></div><div><strong>Legal</strong><p>21+ only</p></div></div><div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div></footer>';
    if(variant===2)return '<footer style="border-top:4px solid '+pri+';padding:24px"><p style="font-size:1rem;color:'+pri+';font-weight:700">LXTOTO</p><p>&copy; 2026 · <a href="#faq" style="color:'+pri+'">FAQ</a> · <a href="#perbandingan" style="color:'+pri+'">Perbandingan</a></p><div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div></footer>';
    if(variant===3)return '<footer style="border-top:5px solid '+pri+';padding:48px 24px"><p style="font-size:1.2rem;font-weight:700;color:var(--text-hi)">LXTOTO Community</p><p>Platform hiburan digital terpercaya Indonesia sejak 2020.</p><div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div></footer>';
    return '<footer style="border-top:3px solid '+pri+'"><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:880px;margin:0 auto;text-align:left"><div><strong style="color:'+pri+'">Tentang</strong><p>LXTOTO — panduan hiburan digital terlengkap.</p></div><div><strong style="color:'+pri+'">Links</strong><p><a href="'+CONFIG.baseUrl+'" style="color:'+pri+'">Home</a> · <a href="#faq" style="color:'+pri+'">FAQ</a></p></div></div><div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div></footer>';
  }

  function injectCSS(pri,fn,extra){
    var s=document.createElement('style');
    s.textContent=':root{--pri:'+pri+';--bg:#0c0d14;--card:#161824;--card-hi:#1e2036;--text:#e2ddd0;--text-dim:#9a958a;--text-hi:#f5f0e4;--line:'+pri+'25}'+
    'body{font-family:'+fn+'system-ui,sans-serif}'+(extra||'');
    document.head.appendChild(s);
  }

  function finalize(html){
    document.getElementById('app').innerHTML=html;
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:.15});
    document.querySelectorAll('.anim').forEach(function(el){io.observe(el);});
  }

  function renderTable(t){var h='<table><thead><tr>';t.headers.forEach(function(th){h+='<th>'+th+'</th>';});h+='</tr></thead><tbody>';t.rows.forEach(function(r){h+='<tr>';r.forEach(function(td){h+='<td>'+td+'</td>';});h+='</tr>';});return h+'</tbody></table>';}
  function slugify(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}
  function setMeta(n,c){var m=document.querySelector('meta[name="'+n+'"]');if(!m){m=document.createElement('meta');m.name=n;document.head.appendChild(m);}m.content=c;}
  function setProperty(p,c){var m=document.querySelector('meta[property="'+p+'"]');if(!m){m=document.createElement('meta');m.setAttribute('property',p);document.head.appendChild(m);}m.content=c;}
  function setLink(r,h){var l=document.querySelector('link[rel="'+r+'"]');if(!l){l=document.createElement('link');l.rel=r;document.head.appendChild(l);}l.href=h;}
  function addJsonLd(d){var s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(d);document.head.appendChild(s);}
})();

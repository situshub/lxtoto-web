// CSR Renderer — loads JSON data and renders article content
(function(){
  const CONFIG = {
    loginUrl: 'https://loginwap.gelapsekali.com/lx',
    daftarUrl: 'https://daftarwap.gelapsekali.com/lx',
    bannerImg: 'https://i.imgur.com/Qg2Nk3k.jpeg',
    baseUrl: 'https://situshub.github.io/lxtoto-web/'
  };

  // Set login/daftar links
  const lb = document.getElementById('login-btn');
  const db = document.getElementById('daftar-btn');
  if(lb) { lb.href = CONFIG.loginUrl; lb.rel = 'sponsored nofollow noopener'; }
  if(db) { db.href = CONFIG.daftarUrl; db.rel = 'sponsored nofollow noopener'; }

  // Detect current page
  const path = window.location.pathname;
  const match = path.match(/page(\d+)/);
  const pageId = match ? 'page' + match[1] : 'index';
  const dataFile = pageId === 'index' ? './data.json' : './data.json';

  // Load data
  fetch(dataFile)
    .then(r => { if(!r.ok) throw new Error('404'); return r.json(); })
    .then(data => render(data))
    .catch(e => {
      document.getElementById('app').innerHTML = '<div style="text-align:center;padding:100px 20px"><h1>Halaman tidak ditemukan</h1><p><a href="' + CONFIG.baseUrl + '">Kembali ke beranda</a></p></div>';
    });

  function render(d) {
    // Update page meta
    document.title = d.title;
    setMeta('description', d.description);
    setMeta('keywords', d.keywords);
    setMeta('author', d.author || 'LXTOTO Community');
    setLink('canonical', CONFIG.baseUrl + pageId + '/');

    // OG tags
    setProperty('og:title', d.title);
    setProperty('og:description', d.description);
    setProperty('og:url', CONFIG.baseUrl + pageId + '/');
    setProperty('og:image', CONFIG.bannerImg);
    setProperty('og:image:width', '1200');
    setProperty('og:image:height', '630');
    setProperty('og:image:alt', d.title);
    setProperty('og:type', 'article');
    setProperty('og:locale', 'id_ID');
    setProperty('og:site_name', 'LXTOTO');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', d.title);
    setMeta('twitter:description', d.description);
    setMeta('twitter:image', CONFIG.bannerImg);

    // Color theme
    if(d.color) {
      document.documentElement.style.setProperty('--pri', d.color);
    }

    // Font
    if(d.font) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=' + d.font.replace(/ /g,'+') + ':wght@400;600;700;800&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
      document.body.style.fontFamily = "'" + d.font + "',system-ui,sans-serif";
    }

    // JSON-LD
    addJsonLd({"@context":"https://schema.org","@type":"Article","headline":d.title,"description":d.description,"image":CONFIG.bannerImg,"author":{"@type":"Organization","name":"LXTOTO Community"},"publisher":{"@type":"Organization","name":"LXTOTO","logo":{"@type":"ImageObject","url":"https://i.imgur.com/8MstvlV.png"}},"datePublished":"2026-04-16","dateModified":"2026-04-16","mainEntityOfPage":{"@type":"WebPage","@id":CONFIG.baseUrl+pageId+"/"},"inLanguage":"id-ID"});
    addJsonLd({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":CONFIG.baseUrl},{"@type":"ListItem","position":2,"name":d.title}]});
    addJsonLd({"@context":"https://schema.org","@type":"WebSite","name":"LXTOTO","url":CONFIG.baseUrl,"potentialAction":{"@type":"SearchAction","target":CONFIG.baseUrl+"?q={search_term_string}","query-input":"required name=search_term_string"}});
    addJsonLd({"@context":"https://schema.org","@type":"Organization","name":"LXTOTO","url":CONFIG.baseUrl,"logo":"https://i.imgur.com/8MstvlV.png"});

    if(d.faq && d.faq.length) {
      addJsonLd({"@context":"https://schema.org","@type":"FAQPage","mainEntity":d.faq.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))});
    }

    // Layout variant based on page number
    var pn = parseInt((pageId.match(/\d+/)||[0])[0]) || 0;
    var layouts = ['centered','split','compact','editorial','wide'];
    var navStyles = ['center','pill','underline','glass','minimal'];
    var heroStyles = ['gradient','banner','split-hero','overlay','compact-hero'];
    var footerStyles = ['multi-col','centered','wide-bar','stacked','minimal-ft'];
    var imgEffects = ['tilt','glow','zoom','pulse','bounce'];
    var layout = layouts[pn % 5];
    var navStyle = navStyles[pn % 5];
    var heroStyle = heroStyles[pn % 5];
    var footerStyle = footerStyles[pn % 5];
    var imgEffect = imgEffects[pn % 5];

    // Inject layout-specific CSS
    var layoutCSS = document.createElement('style');
    var pri = d.color || '#6366f1';
    var cssText = '';

    // Nav variants
    if(navStyle==='pill') cssText+='.topbar{border-radius:0 0 20px 20px;margin:0 12px;width:calc(100% - 24px);left:12px}';
    if(navStyle==='underline') cssText+='.topbar{border-bottom:3px solid '+pri+';box-shadow:none}';
    if(navStyle==='glass') cssText+='.topbar{background:rgba(10,10,18,.7);backdrop-filter:blur(20px)}';
    if(navStyle==='minimal') cssText+='.topbar{background:transparent;border:none;box-shadow:none}';

    // Hero variants
    if(heroStyle==='banner') cssText+='.hero{padding:40px 24px 24px;border-bottom:3px solid '+pri+'}';
    if(heroStyle==='split-hero') cssText+='.hero{text-align:left;padding:60px 24px 40px}.hero h1{margin:0 0 16px}';
    if(heroStyle==='overlay') cssText+='.hero{background:linear-gradient(135deg,'+pri+'22,transparent),radial-gradient(circle at 80% 20%,'+pri+'15,transparent),var(--bg)}';
    if(heroStyle==='compact-hero') cssText+='.hero{padding:32px 24px 20px}.hero h1{font-size:clamp(1.4rem,3vw,2rem)}';

    // Section layout variants
    if(layout==='split') cssText+='@media(min-width:768px){article section{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}article section h2{grid-column:1/-1}article section .tbl{grid-column:1/-1}}';
    if(layout==='wide') cssText+='.wrap{max-width:1100px}';
    if(layout==='compact') cssText+='.wrap{max-width:720px}article section{margin-bottom:1.5rem}';
    if(layout==='editorial') cssText+='article p{font-size:1.05rem;line-height:1.9}h2{font-size:1.8rem;border-left-width:5px}';

    // Image effect variants
    if(imgEffect==='tilt') cssText+='.banner img{transition:transform .5s}.banner:hover img{transform:perspective(800px) rotateY(3deg) rotateX(2deg) scale(1.02)}';
    if(imgEffect==='glow') cssText+='.banner{box-shadow:0 0 30px '+pri+'30}.banner:hover{box-shadow:0 0 50px '+pri+'50}';
    if(imgEffect==='zoom') cssText+='.banner img{transition:transform .4s}.banner:hover img{transform:scale(1.05)}';
    if(imgEffect==='pulse') cssText+='@keyframes pulse-glow{0%,100%{box-shadow:0 0 20px '+pri+'20}50%{box-shadow:0 0 40px '+pri+'40}}.banner{animation:pulse-glow 3s infinite}';
    if(imgEffect==='bounce') cssText+='.banner img{transition:transform .3s}.banner:hover img{transform:translateY(-6px)}';

    // Footer variants
    if(footerStyle==='multi-col') cssText+='footer{text-align:left}footer .f-inner{display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;max-width:880px;margin:0 auto}';
    if(footerStyle==='wide-bar') cssText+='footer{padding:20px 24px;border-top-width:4px}';
    if(footerStyle==='stacked') cssText+='footer{padding:48px 24px}footer p{margin:8px 0}';

    layoutCSS.textContent = cssText;
    document.head.appendChild(layoutCSS);

    // Build HTML
    var html = '';

    // Hero
    html += '<header class="hero"><h1>' + d.h1 + '</h1>';
    html += '<p>' + d.subtitle + '</p></header>';

    // Breadcrumb
    html += '<nav class="bc" aria-label="breadcrumb"><ol><li><a href="' + CONFIG.baseUrl + '">Home</a></li><li>' + d.title + '</li></ol></nav>';

    // Banner
    html += '<a class="banner" href="' + CONFIG.daftarUrl + '" rel="sponsored nofollow noopener"><img src="' + CONFIG.bannerImg + '" alt="LXTOTO Banner" width="1200" height="400" loading="lazy"></a>';

    // Main content
    html += '<main><div class="wrap"><article>';

    // Sections
    if(d.sections) {
      d.sections.forEach(function(s, si) {
        html += '<section class="anim">';
        if(s.h2) html += '<h2 id="' + slugify(s.h2) + '">' + s.h2 + '</h2>';
        if(s.h3) html += '<h3>' + s.h3 + '</h3>';
        if(s.paragraphs) {
          s.paragraphs.forEach(function(p) { html += '<p>' + p + '</p>'; });
        }
        if(s.list) {
          html += '<ul>';
          s.list.forEach(function(li) { html += '<li>' + li + '</li>'; });
          html += '</ul>';
        }
        if(s.ordered) {
          html += '<ol>';
          s.ordered.forEach(function(li) { html += '<li>' + li + '</li>'; });
          html += '</ol>';
        }
        if(s.table) {
          html += '<div class="tbl" id="perbandingan">' + renderTable(s.table) + '</div>';
        }
        html += '</section>';
      });
    }

    // CTA
    html += '<aside class="cta anim"><h3>Siap Bergabung?</h3><p>Daftar sekarang dan nikmati semua fitur. Proses cepat dan aman.</p>';
    html += '<a class="btn" href="' + CONFIG.daftarUrl + '" rel="sponsored nofollow noopener">Daftar Sekarang →</a></aside>';

    // FAQ
    if(d.faq && d.faq.length) {
      html += '<section class="anim"><h2 id="faq">Pertanyaan Umum</h2>';
      d.faq.forEach(function(f) {
        html += '<details class="anim"><summary>' + f.q + '</summary><div class="faq-a">' + f.a + '</div></details>';
      });
      html += '</section>';
    }

    html += '</article></div></main>';

    // Footer
    if(footerStyle==='multi-col') {
      html += '<footer><div class="f-inner"><div><strong style="color:'+pri+'">LXTOTO</strong><p>Platform hiburan digital terpercaya di Indonesia.</p></div><div><strong>Navigasi</strong><p><a href="#faq">FAQ</a> · <a href="#perbandingan">Perbandingan</a></p></div><div><strong>Legal</strong><p>Hanya untuk 21+</p></div></div>';
    } else {
      html += '<footer><p>&copy; 2026 LXTOTO Community</p>';
    }
    html += '<div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div>';
    html += '</footer>';

    document.getElementById('app').innerHTML = html;

    // Intersection Observer
    const io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, {threshold: 0.15});
    document.querySelectorAll('.anim').forEach(function(el) { io.observe(el); });
  }

  function renderTable(t) {
    let h = '<table><thead><tr>';
    t.headers.forEach(function(th) { h += '<th>' + th + '</th>'; });
    h += '</tr></thead><tbody>';
    t.rows.forEach(function(r) {
      h += '<tr>';
      r.forEach(function(td) { h += '<td>' + td + '</td>'; });
      h += '</tr>';
    });
    h += '</tbody></table>';
    return h;
  }

  function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
  function setMeta(n,c) { let m = document.querySelector('meta[name="'+n+'"]'); if(!m){m=document.createElement('meta');m.name=n;document.head.appendChild(m);} m.content=c; }
  function setProperty(p,c) { let m = document.querySelector('meta[property="'+p+'"]'); if(!m){m=document.createElement('meta');m.setAttribute('property',p);document.head.appendChild(m);} m.content=c; }
  function setLink(r,h) { let l = document.querySelector('link[rel="'+r+'"]'); if(!l){l=document.createElement('link');l.rel=r;document.head.appendChild(l);} l.href=h; }
  function addJsonLd(d) { const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(d);document.head.appendChild(s); }
})();

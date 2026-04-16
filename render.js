// CSR Renderer v4 — 5 visually stunning layouts, safe from GitHub scanner
(function(){
  var C={
    login:'https://loginwap.gelapsekali.com/lx',
    daftar:'https://daftarwap.gelapsekali.com/lx',
    banner:'https://i.imgur.com/Qg2Nk3k.jpeg',
    logo:'https://i.imgur.com/8MstvlV.png',
    base:'https://situshub.github.io/lxtoto-web/',
    brand:'LXTOTO'
  };
  var lb=document.getElementById('login-btn'),db=document.getElementById('daftar-btn');
  if(lb){lb.href=C.login;lb.rel='sponsored nofollow noopener';}
  if(db){db.href=C.daftar;db.rel='sponsored nofollow noopener';}
  var path=window.location.pathname,m=path.match(/page(\d+)/),pid=m?'page'+m[1]:'index';
  fetch('./data.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(render).catch(function(){document.getElementById('app').innerHTML='<div style="text-align:center;padding:100px"><h1>404</h1></div>'});

  function render(d){
    var pn=parseInt((pid.match(/\d+/)||[0])[0])||0;
    var v=pn%5,pri=d.color||'#6366f1',fn=d.font||'Inter';
    // Meta
    document.title=d.title;
    sm('description',d.description);sm('keywords',d.keywords);sm('author',C.brand+' Community');
    sl('canonical',C.base+pid+'/');
    sp('og:title',d.title);sp('og:description',d.description);sp('og:url',C.base+pid+'/');sp('og:image',C.banner);sp('og:image:width','1200');sp('og:image:height','630');sp('og:image:alt',d.title);sp('og:type','article');sp('og:locale','id_ID');sp('og:site_name',C.brand);
    sm('twitter:card','summary_large_image');sm('twitter:title',d.title);sm('twitter:description',d.description);sm('twitter:image',C.banner);
    // Font
    var fl=document.createElement('link');fl.href='https://fonts.googleapis.com/css2?family='+fn.replace(/ /g,'+')+':wght@400;500;600;700;800&display=swap';fl.rel='stylesheet';document.head.appendChild(fl);
    // JSON-LD
    jld({"@context":"https://schema.org","@type":"Article","headline":d.title,"description":d.description,"image":C.banner,"author":{"@type":"Organization","name":C.brand},"publisher":{"@type":"Organization","name":C.brand,"logo":{"@type":"ImageObject","url":C.logo}},"datePublished":"2026-04-16","dateModified":"2026-04-16","mainEntityOfPage":{"@type":"WebPage","@id":C.base+pid+"/"},"inLanguage":"id-ID"});
    jld({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":C.base},{"@type":"ListItem","position":2,"name":d.title}]});
    jld({"@context":"https://schema.org","@type":"WebSite","name":C.brand,"url":C.base,"potentialAction":{"@type":"SearchAction","target":C.base+"?q={s}","query-input":"required name=s"}});
    jld({"@context":"https://schema.org","@type":"Organization","name":C.brand,"url":C.base,"logo":C.logo});
    if(d.faq&&d.faq.length)jld({"@context":"https://schema.org","@type":"FAQPage","mainEntity":d.faq.map(function(f){return{"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}})});

    // Build per variant
    var themes=[layoutNeonCyber,layoutWarmPremium,layoutFreshMinimal,layoutBoldGeometric,layoutGlassMorph];
    themes[v](d,pri,fn);
  }

  // ==========================================
  // THEME 0: NEON CYBER — dark + neon glow
  // ==========================================
  function layoutNeonCyber(d,pri,fn){
    css(fn,
    'body{background:#080810}'+
    '.hero-n{padding:80px 24px 56px;text-align:center;position:relative;overflow:hidden}'+
    '.hero-n::before{content:"";position:absolute;inset:0;background:radial-gradient(600px circle at 50% 0%,'+pri+'25,transparent 70%)}'+
    '.hero-n::after{content:"";position:absolute;inset:0;background-image:linear-gradient('+pri+'08 1px,transparent 1px),linear-gradient(90deg,'+pri+'08 1px,transparent 1px);background-size:40px 40px;opacity:.5}'+
    '.hero-n h1{position:relative;font-size:clamp(2rem,5vw,3.2rem);font-weight:800;background:linear-gradient(135deg,#fff 0%,'+pri+' 50%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 auto 20px;max-width:800px;text-shadow:0 0 60px '+pri+'40}'+
    '.hero-n p{position:relative;color:#b0aaa0;max-width:650px;margin:0 auto 28px;font-size:1.08rem}'+
    '.hero-n .glow-btn{position:relative;display:inline-flex;padding:14px 32px;background:'+pri+';color:#080810;font-weight:700;border-radius:12px;text-decoration:none;box-shadow:0 0 30px '+pri+'60,0 0 60px '+pri+'30;transition:all .3s}'+
    '.hero-n .glow-btn:hover{box-shadow:0 0 40px '+pri+'80,0 0 80px '+pri+'50;transform:translateY(-2px)}'+
    '.neon-line{height:2px;background:linear-gradient(90deg,transparent,'+pri+',transparent);margin:0 auto;max-width:200px}'+
    'h2{color:#fff;font-size:1.6rem;margin:2.5rem 0 1rem;padding-left:16px;border-left:3px solid '+pri+';text-shadow:0 0 20px '+pri+'30}'+
    'h3{color:'+pri+';font-size:1.2rem;margin:1.8rem 0 .6rem}'+
    'p{color:#c8c4b8;margin:.8rem 0;line-height:1.8}'+
    'strong{color:#fff;text-shadow:0 0 10px '+pri+'20}'+
    '.tbl{border-radius:12px;overflow:hidden;border:1px solid '+pri+'30;box-shadow:0 0 20px '+pri+'10}'+
    'table{background:#0c0c18}thead{background:'+pri+'20}th{color:'+pri+'}td{border-bottom:1px solid '+pri+'10}tr:hover td{background:'+pri+'08}'+
    'details{background:#0c0c18;border:1px solid '+pri+'20;border-radius:10px;margin:.8rem 0}details:hover{border-color:'+pri+';box-shadow:0 0 15px '+pri+'15}details[open]{border-color:'+pri+';background:#10101f}'+
    'summary{color:#fff;padding:14px 18px;font-weight:600;list-style:none;display:flex;justify-content:space-between;min-height:44px;cursor:pointer}summary::-webkit-details-marker{display:none}summary::after{content:"+";color:'+pri+';font-size:1.3rem;transition:transform .3s}details[open] summary::after{transform:rotate(45deg)}'+
    '.faq-a{padding:0 18px 14px;color:#b0aaa0;line-height:1.7}'+
    'ul,ol{padding-left:24px}li{margin:.5rem 0;color:#c8c4b8}'+
    '.banner{display:block;max-width:880px;margin:24px auto;border-radius:14px;overflow:hidden;border:1px solid '+pri+'25;box-shadow:0 0 30px '+pri+'15}.banner img{width:100%;display:block}'+
    '.wrap{max-width:880px;margin:0 auto;padding:0 24px}'+
    '.cta-n{background:linear-gradient(135deg,#0c0c18,'+pri+'12);border:1px solid '+pri+'30;border-radius:16px;padding:32px;margin:2.5rem 0;position:relative;overflow:hidden;box-shadow:0 0 40px '+pri+'10}'+
    '.cta-n::before{content:"";position:absolute;top:-50px;right:-50px;width:200px;height:200px;background:radial-gradient(circle,'+pri+'20,transparent 70%)}'+
    'footer{background:#050508;border-top:2px solid '+pri+';padding:32px 24px;text-align:center;color:#666;font-size:.85rem}'+
    '.disc{background:'+pri+'08;border:1px solid '+pri+'15;border-radius:8px;padding:12px;margin-top:16px;font-size:.8rem;color:#e8b0b8}'+
    '@keyframes neon-pulse{0%,100%{opacity:.6}50%{opacity:1}}'+
    '.anim{opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s}.anim.visible{opacity:1;transform:none}'+
    '@media(max-width:640px){.hero-n{padding:56px 16px 40px}.wrap{padding:0 16px}}'
    );
    var h='<header class="hero-n"><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p>';
    h+='<a class="glow-btn" href="'+C.daftar+'" rel="sponsored nofollow noopener">Mulai Sekarang</a>';
    h+='<div class="neon-line" style="margin-top:32px"></div></header>';
    h+=bc(d)+bnr(d,pri)+'<main><div class="wrap"><article>'+secs(d);
    h+='<div class="cta-n anim"><h3 style="color:'+pri+';margin:0 0 8px">Bergabung Sekarang</h3><p style="color:#b0aaa0;margin:0 0 16px">Akses semua fitur premium. Daftar gratis.</p><a class="glow-btn" href="'+C.daftar+'" rel="sponsored nofollow noopener">Daftar →</a></div>';
    h+=faq(d)+'</article></div></main>';
    h+='<footer><p>&copy; 2026 '+C.brand+' Community</p><div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div></footer>';
    fin(h);
  }

  // ==========================================
  // THEME 1: WARM PREMIUM — gold, serif, luxury
  // ==========================================
  function layoutWarmPremium(d,pri,fn){
    css(fn,
    'body{background:#0f0d08}'+
    '.hero-w{padding:88px 24px 56px;text-align:center;background:radial-gradient(800px 500px at 50% 20%,#2a1f0a 0%,#0f0d08 70%);border-bottom:1px solid '+pri+'20;position:relative}'+
    '.hero-w .ey{display:inline-block;padding:5px 16px;border:1px solid '+pri+'40;border-radius:999px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:3px;color:'+pri+';margin-bottom:20px}'+
    '.hero-w h1{font-size:clamp(1.8rem,4.5vw,3rem);font-weight:800;color:#f5ecd8;margin:0 auto 20px;max-width:800px;line-height:1.1}'+
    '.hero-w h1 em{font-style:normal;color:'+pri+'}'+
    '.hero-w p{color:#a09880;max-width:650px;margin:0 auto;font-size:1.08rem;line-height:1.7}'+
    '.gold-line{width:80px;height:3px;background:linear-gradient(90deg,'+pri+','+pri+'60);margin:28px auto 0;border-radius:2px}'+
    'h2{color:#f5ecd8;font-size:1.7rem;margin:2.8rem 0 1.2rem;position:relative;padding-bottom:12px}'+
    'h2::after{content:"";position:absolute;bottom:0;left:0;width:50px;height:3px;background:'+pri+';border-radius:2px}'+
    'h3{color:'+pri+';font-size:1.25rem;margin:2rem 0 .7rem}'+
    'p{color:#c8c0a8;line-height:1.85;margin:.9rem 0}'+
    'strong{color:#f5ecd8;background:linear-gradient(transparent 65%,'+pri+'30 65%);padding:0 3px}'+
    '.tbl{border-radius:14px;overflow:hidden;border:1px solid '+pri+'20;background:#161208;box-shadow:0 20px 50px -20px rgba(0,0,0,.5)}'+
    'thead{background:linear-gradient(135deg,'+pri+'18,'+pri+'08)}th{color:'+pri+';font-weight:700;letter-spacing:.05em;text-transform:uppercase;font-size:.78rem}'+
    'td{border-bottom:1px solid '+pri+'08;color:#c8c0a8}tr:hover td{background:'+pri+'05}td:first-child{color:#f5ecd8;font-weight:600}'+
    'details{background:#161208;border:1px solid '+pri+'15;border-radius:12px;margin:.9rem 0;transition:all .3s}details:hover{border-color:'+pri+'40}'+
    'details[open]{background:#1a1510;border-color:'+pri+'50;box-shadow:0 8px 24px -12px '+pri+'20}'+
    'summary{color:#f5ecd8;padding:16px 20px;font-weight:600;list-style:none;display:flex;justify-content:space-between;min-height:44px;cursor:pointer;font-size:1.02rem}summary::-webkit-details-marker{display:none}summary::after{content:"◆";color:'+pri+';font-size:.8rem;transition:transform .3s}details[open] summary::after{transform:rotate(90deg)}'+
    '.faq-a{padding:0 20px 16px;color:#a09880;line-height:1.75}'+
    'ul{list-style:none;padding:0}ul li{padding-left:24px;position:relative;margin:.6rem 0}ul li::before{content:"✦";position:absolute;left:0;color:'+pri+';font-size:.7rem;top:.4em}'+
    'ol{padding-left:24px}ol li{margin:.6rem 0}'+
    '.banner{display:block;max-width:880px;margin:28px auto;border-radius:16px;overflow:hidden;border:1px solid '+pri+'20;box-shadow:0 20px 60px -20px rgba(0,0,0,.6)}.banner img{width:100%;display:block;transition:transform .4s}.banner:hover img{transform:scale(1.02)}'+
    '.wrap{max-width:880px;margin:0 auto;padding:0 24px}'+
    '.cta-w{background:linear-gradient(135deg,#1a1510,'+pri+'10);border:1px solid '+pri+'25;border-radius:18px;padding:36px;margin:2.8rem 0;text-align:center}'+
    '.cta-w .btn-w{display:inline-flex;padding:14px 32px;background:'+pri+';color:#0f0d08;font-weight:700;border-radius:999px;text-decoration:none;transition:all .3s;box-shadow:0 8px 24px '+pri+'40}.cta-w .btn-w:hover{transform:translateY(-2px);box-shadow:0 12px 32px '+pri+'60}'+
    'footer{background:#0a0806;border-top:3px solid '+pri+';padding:40px 24px;text-align:center;color:#665}footer a{color:'+pri+'}'+
    '.disc{background:'+pri+'08;border:1px solid '+pri+'15;border-radius:10px;padding:14px;margin-top:18px;font-size:.82rem;color:#e8b0b8}'+
    '.anim{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}.anim.visible{opacity:1;transform:none}'+
    '@media(max-width:640px){.hero-w{padding:60px 16px 40px}.wrap{padding:0 16px}h2{font-size:1.4rem}}'
    );
    var h='<header class="hero-w"><span class="ey">★ Panduan 2026</span><h1>'+d.h1.replace(C.brand,'<em>'+C.brand+'</em>')+'</h1><p>'+d.subtitle+'</p><div class="gold-line"></div></header>';
    h+=bc(d)+bnr(d,pri)+'<main><div class="wrap"><article>'+secs(d);
    h+='<div class="cta-w anim"><h3 style="color:'+pri+';margin:0 0 10px;font-size:1.3rem">Siap Bergabung?</h3><p style="color:#a09880;margin:0 0 20px">Akses premium. Daftar gratis sekarang.</p><a class="btn-w" href="'+C.daftar+'" rel="sponsored nofollow noopener">Daftar Sekarang →</a></div>';
    h+=faq(d)+'</article></div></main>';
    h+='<footer><p>&copy; 2026 '+C.brand+'</p><div class="disc">Bermain secara bertanggung jawab. Layanan khusus untuk pengguna berusia 21 tahun ke atas.</div></footer>';
    fin(h);
  }

  // ==========================================
  // THEME 2: FRESH MINIMAL — clean, bright accents on dark
  // ==========================================
  function layoutFreshMinimal(d,pri,fn){
    css(fn,
    'body{background:#0e0f14}'+
    '.hero-f{padding:64px 24px 40px;max-width:880px;margin:0 auto}'+
    '.hero-f .tag{display:inline-block;padding:4px 12px;background:'+pri+';color:#0e0f14;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-radius:4px;margin-bottom:16px}'+
    '.hero-f h1{font-size:clamp(1.6rem,4vw,2.6rem);color:#f0ece0;font-weight:700;margin:0 0 16px;line-height:1.15}'+
    '.hero-f p{color:#908e84;font-size:1.05rem;line-height:1.7;max-width:700px}'+
    '.sep{height:1px;background:linear-gradient(90deg,'+pri+'40,transparent);max-width:880px;margin:0 auto}'+
    'h2{color:#f0ece0;font-size:1.5rem;margin:2.2rem 0 .8rem;font-weight:700}'+
    'h2 .accent{color:'+pri+'}'+
    'h3{color:'+pri+';font-size:1.15rem;margin:1.6rem 0 .5rem;font-weight:600}'+
    'p{color:#b0ae9e;line-height:1.8;margin:.7rem 0}'+
    'strong{color:#f0ece0}'+
    '.tbl{border-radius:10px;overflow:hidden;background:#14151c;border:1px solid #222}'+
    'thead{background:#1a1b24}th{color:'+pri+';font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.03em}'+
    'td{border-bottom:1px solid #1a1b24;color:#b0ae9e}td:first-child{color:#f0ece0;font-weight:500}tr:hover td{background:#18192240}'+
    'details{background:#14151c;border:1px solid #222;border-radius:8px;margin:.7rem 0;transition:border-color .2s}details:hover{border-color:'+pri+'60}'+
    'details[open]{border-color:'+pri+'}'+
    'summary{color:#f0ece0;padding:12px 16px;font-weight:600;font-size:.95rem;list-style:none;display:flex;justify-content:space-between;min-height:44px;cursor:pointer}summary::-webkit-details-marker{display:none}summary::after{content:"→";color:'+pri+';transition:transform .3s}details[open] summary::after{transform:rotate(90deg)}'+
    '.faq-a{padding:0 16px 12px;color:#908e84;line-height:1.7;font-size:.95rem}'+
    'ul{list-style:none;padding:0}ul li{padding-left:20px;position:relative;margin:.4rem 0;color:#b0ae9e}ul li::before{content:"—";position:absolute;left:0;color:'+pri+'}'+
    'ol{padding-left:20px}ol li{margin:.4rem 0;color:#b0ae9e}'+
    '.banner{display:block;max-width:880px;margin:20px auto;border-radius:10px;overflow:hidden;border:1px solid #222}.banner img{width:100%;display:block}'+
    '.wrap{max-width:880px;margin:0 auto;padding:0 24px}'+
    '.cta-f{border:1px solid '+pri+';border-radius:12px;padding:28px;margin:2rem 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}'+
    '.cta-f .btn-f{padding:12px 28px;background:'+pri+';color:#0e0f14;font-weight:700;border-radius:8px;text-decoration:none;transition:opacity .2s}.cta-f .btn-f:hover{opacity:.85}'+
    'footer{border-top:1px solid #222;padding:28px 24px;text-align:center;color:#555;font-size:.85rem}'+
    '.disc{border:1px solid #222;border-radius:6px;padding:10px;margin-top:14px;font-size:.78rem;color:#e8b0b8}'+
    '.anim{opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}.anim.visible{opacity:1;transform:none}'+
    '@media(max-width:640px){.hero-f{padding:48px 16px 32px}.wrap{padding:0 16px}.cta-f{flex-direction:column;text-align:center}}'
    );
    var h='<header class="hero-f"><span class="tag">'+C.brand+'</span><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p></header><div class="sep"></div>';
    h+=bc(d)+bnr(d,pri)+'<main><div class="wrap"><article>'+secs(d);
    h+='<div class="cta-f anim"><div><h3 style="color:'+pri+';margin:0 0 4px">Bergabung?</h3><p style="color:#908e84;margin:0">Daftar gratis, akses semua fitur.</p></div><a class="btn-f" href="'+C.daftar+'" rel="sponsored nofollow noopener">Daftar →</a></div>';
    h+=faq(d)+'</article></div></main>';
    h+='<footer><p>'+C.brand+' &copy; 2026</p><div class="disc">Bermain secara bertanggung jawab. 21+ only.</div></footer>';
    fin(h);
  }

  // ==========================================
  // THEME 3: BOLD GEOMETRIC — strong shapes, diagonal
  // ==========================================
  function layoutBoldGeometric(d,pri,fn){
    css(fn,
    'body{background:#0a0b12}'+
    '.hero-b{padding:80px 24px 56px;position:relative;overflow:hidden;text-align:center}'+
    '.hero-b::before{content:"";position:absolute;top:-50%;right:-20%;width:600px;height:600px;background:'+pri+';opacity:.06;border-radius:50%;transform:rotate(45deg)}'+
    '.hero-b::after{content:"";position:absolute;bottom:-40%;left:-10%;width:400px;height:400px;background:'+pri+';opacity:.04;clip-path:polygon(50% 0%,0% 100%,100% 100%)}'+
    '.hero-b h1{position:relative;font-size:clamp(2rem,5vw,3.4rem);font-weight:900;color:#fff;margin:0 auto 20px;max-width:850px;line-height:1.05;letter-spacing:-.02em}'+
    '.hero-b p{position:relative;color:#9995a0;max-width:600px;margin:0 auto 30px;font-size:1.05rem}'+
    '.hero-b .chips{position:relative;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}'+
    '.hero-b .chip{padding:8px 18px;border:2px solid '+pri+'40;border-radius:8px;color:'+pri+';font-weight:600;font-size:.85rem;background:'+pri+'08}'+
    '.diag-sep{height:60px;background:linear-gradient(175deg,#0a0b12 49%,'+pri+'10 49%,'+pri+'10 51%,#0a0b12 51%)}'+
    'h2{color:#fff;font-size:1.65rem;margin:2.5rem 0 1rem;font-weight:800;position:relative;display:inline-block}'+
    'h2::after{content:"";display:block;width:100%;height:4px;background:'+pri+';margin-top:6px;border-radius:2px}'+
    'h3{color:'+pri+';font-size:1.2rem;margin:1.8rem 0 .6rem;font-weight:700}'+
    'p{color:#b5b0bb;line-height:1.8;margin:.8rem 0}strong{color:#fff}'+
    '.tbl{border-radius:14px;overflow:hidden;border:2px solid '+pri+'25;background:#12131c;box-shadow:0 16px 48px -16px rgba(0,0,0,.6)}'+
    'thead{background:'+pri+'}th{color:#0a0b12;font-weight:800;font-size:.8rem;text-transform:uppercase}'+
    'td{border-bottom:1px solid #1c1d28;color:#b5b0bb}td:first-child{font-weight:700;color:#fff}tr:hover td{background:'+pri+'08}'+
    'details{background:#12131c;border:2px solid #1c1d28;border-radius:12px;margin:.8rem 0;transition:all .3s}details:hover{border-color:'+pri+'50;transform:translateX(4px)}'+
    'details[open]{border-color:'+pri+';background:#16172440}'+
    'summary{color:#fff;padding:16px 20px;font-weight:700;list-style:none;display:flex;justify-content:space-between;min-height:44px;cursor:pointer}summary::-webkit-details-marker{display:none}summary::after{content:"▶";color:'+pri+';font-size:.7rem;transition:transform .3s}details[open] summary::after{transform:rotate(90deg)}'+
    '.faq-a{padding:0 20px 16px;color:#9995a0;line-height:1.7}'+
    'ul{list-style:none;padding:0}ul li{padding-left:28px;position:relative;margin:.6rem 0;color:#b5b0bb}ul li::before{content:"";position:absolute;left:4px;top:.6em;width:10px;height:10px;background:'+pri+';clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%)}'+
    'ol{padding-left:24px}ol li{margin:.6rem 0;color:#b5b0bb}'+
    '.banner{display:block;max-width:880px;margin:24px auto;border-radius:14px;overflow:hidden;border:2px solid '+pri+'25}.banner img{width:100%;display:block;transition:transform .3s}.banner:hover img{transform:scale(1.03)}'+
    '.wrap{max-width:880px;margin:0 auto;padding:0 24px}'+
    '.cta-b{background:'+pri+';border-radius:16px;padding:36px;margin:2.5rem 0;text-align:center;position:relative;overflow:hidden}'+
    '.cta-b::before{content:"";position:absolute;top:-30px;right:-30px;width:120px;height:120px;border:3px solid #fff2;border-radius:50%}'+
    '.cta-b h3{color:#0a0b12;margin:0 0 8px;font-size:1.3rem}.cta-b p{color:#0a0b1280;margin:0 0 16px}'+
    '.cta-b .btn-b{display:inline-flex;padding:14px 32px;background:#0a0b12;color:'+pri+';font-weight:700;border-radius:10px;text-decoration:none;transition:transform .2s}.cta-b .btn-b:hover{transform:scale(1.05)}'+
    'footer{background:#06060c;border-top:4px solid '+pri+';padding:36px 24px;text-align:center;color:#555}'+
    '.disc{background:'+pri+'10;border:1px solid '+pri+'20;border-radius:8px;padding:12px;margin-top:16px;font-size:.8rem;color:#e8b0b8}'+
    '.anim{opacity:0;transform:translateY(28px) scale(.98);transition:opacity .6s,transform .6s}.anim.visible{opacity:1;transform:none}'+
    '@media(max-width:640px){.hero-b{padding:56px 16px 40px}.wrap{padding:0 16px}h2{font-size:1.4rem}.diag-sep{height:30px}}'
    );
    var h='<header class="hero-b"><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p>';
    h+='<div class="chips"><span class="chip">✦ 2026</span><span class="chip">✦ Terlengkap</span><span class="chip">✦ Terpercaya</span></div></header>';
    h+='<div class="diag-sep"></div>';
    h+=bc(d)+bnr(d,pri)+'<main><div class="wrap"><article>'+secs(d);
    h+='<div class="cta-b anim"><h3>Bergabung Sekarang</h3><p>Daftar gratis, akses semua fitur premium.</p><a class="btn-b" href="'+C.daftar+'" rel="sponsored nofollow noopener">Daftar →</a></div>';
    h+=faq(d)+'</article></div></main>';
    h+='<footer><p>'+C.brand+' &copy; 2026</p><div class="disc">Bermain secara bertanggung jawab. 21+ only.</div></footer>';
    fin(h);
  }

  // ==========================================
  // THEME 4: GLASS MORPHISM — frosted, floating
  // ==========================================
  function layoutGlassMorph(d,pri,fn){
    css(fn,
    'body{background:#0c0e18;background-image:radial-gradient(600px at 20% 30%,'+pri+'10,transparent),radial-gradient(400px at 80% 70%,'+pri+'08,transparent)}'+
    '.hero-g{padding:76px 24px 52px;text-align:center;position:relative}'+
    '.hero-g .glass-card{max-width:820px;margin:0 auto;background:rgba(255,255,255,.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:48px 36px}'+
    '.hero-g h1{font-size:clamp(1.7rem,4vw,2.8rem);font-weight:800;color:#fff;margin:0 0 16px}'+
    '.hero-g p{color:#a0a0a8;max-width:600px;margin:0 auto 24px;font-size:1.05rem}'+
    '.hero-g .float-btn{display:inline-flex;padding:14px 30px;background:rgba(255,255,255,.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.15);color:#fff;font-weight:700;border-radius:14px;text-decoration:none;transition:all .3s}.hero-g .float-btn:hover{background:'+pri+';border-color:'+pri+';color:#0c0e18}'+
    'h2{color:#fff;font-size:1.55rem;margin:2.4rem 0 1rem;padding:12px 18px;background:rgba(255,255,255,.03);border-radius:12px;border-left:3px solid '+pri+'}'+
    'h3{color:'+pri+';font-size:1.2rem;margin:1.7rem 0 .6rem}'+
    'p{color:#b8b8c0;line-height:1.8;margin:.8rem 0}strong{color:#fff}'+
    '.tbl{border-radius:16px;overflow:hidden;background:rgba(255,255,255,.03);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.06);box-shadow:0 20px 60px -20px rgba(0,0,0,.4)}'+
    'thead{background:rgba(255,255,255,.05)}th{color:'+pri+';font-weight:600;font-size:.78rem;text-transform:uppercase}'+
    'td{border-bottom:1px solid rgba(255,255,255,.04);color:#b8b8c0}td:first-child{color:#fff;font-weight:500}tr:hover td{background:rgba(255,255,255,.03)}'+
    'details{background:rgba(255,255,255,.03);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.06);border-radius:14px;margin:.8rem 0;transition:all .3s}'+
    'details:hover{background:rgba(255,255,255,.05);border-color:'+pri+'40}'+
    'details[open]{border-color:'+pri+';background:rgba(255,255,255,.06)}'+
    'summary{color:#fff;padding:16px 20px;font-weight:600;list-style:none;display:flex;justify-content:space-between;min-height:44px;cursor:pointer}summary::-webkit-details-marker{display:none}summary::after{content:"◇";color:'+pri+';transition:transform .3s}details[open] summary::after{transform:rotate(180deg)}'+
    '.faq-a{padding:0 20px 16px;color:#a0a0a8;line-height:1.7}'+
    'ul{list-style:none;padding:0}ul li{padding-left:24px;position:relative;margin:.5rem 0;color:#b8b8c0}ul li::before{content:"◈";position:absolute;left:0;color:'+pri+';font-size:.7rem;top:.35em}'+
    'ol{padding-left:24px}ol li{margin:.5rem 0;color:#b8b8c0}'+
    '.banner{display:block;max-width:880px;margin:24px auto;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.06);box-shadow:0 20px 60px -20px rgba(0,0,0,.5)}.banner img{width:100%;display:block;transition:transform .4s,filter .4s}.banner:hover img{transform:scale(1.02);filter:brightness(1.1)}'+
    '.wrap{max-width:880px;margin:0 auto;padding:0 24px}'+
    '.cta-g{background:rgba(255,255,255,.04);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:36px;margin:2.5rem 0;text-align:center;box-shadow:0 20px 60px -20px rgba(0,0,0,.3)}'+
    '.cta-g .btn-g{display:inline-flex;padding:14px 30px;background:'+pri+';color:#0c0e18;font-weight:700;border-radius:14px;text-decoration:none;transition:all .3s;box-shadow:0 8px 24px '+pri+'30}.cta-g .btn-g:hover{transform:translateY(-3px);box-shadow:0 14px 36px '+pri+'50}'+
    'footer{background:rgba(0,0,0,.3);border-top:1px solid rgba(255,255,255,.06);padding:36px 24px;text-align:center;color:#666;font-size:.85rem}footer a{color:'+pri+'}'+
    '.disc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px;margin-top:16px;font-size:.8rem;color:#e8b0b8}'+
    '.anim{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}.anim.visible{opacity:1;transform:none}'+
    '@media(max-width:640px){.hero-g{padding:56px 16px 40px}.hero-g .glass-card{padding:32px 20px}.wrap{padding:0 16px}}'
    );
    var h='<header class="hero-g"><div class="glass-card"><h1>'+d.h1+'</h1><p>'+d.subtitle+'</p>';
    h+='<a class="float-btn" href="'+C.daftar+'" rel="sponsored nofollow noopener">Mulai Sekarang →</a></div></header>';
    h+=bc(d)+bnr(d,pri)+'<main><div class="wrap"><article>'+secs(d);
    h+='<div class="cta-g anim"><h3 style="color:'+pri+';margin:0 0 10px;font-size:1.3rem">Bergabung Sekarang</h3><p style="color:#a0a0a8;margin:0 0 18px">Daftar gratis, akses premium.</p><a class="btn-g" href="'+C.daftar+'" rel="sponsored nofollow noopener">Daftar →</a></div>';
    h+=faq(d)+'</article></div></main>';
    h+='<footer><p>'+C.brand+' &copy; 2026</p><div class="disc">Bermain secara bertanggung jawab. 21+ only.</div></footer>';
    fin(h);
  }

  // ==========================================
  // SHARED
  // ==========================================
  function bc(d){return '<nav class="bc" aria-label="breadcrumb" style="padding:12px 24px;font-size:.85rem;color:#666;border-bottom:1px solid #ffffff08;max-width:880px;margin:0 auto"><ol style="display:flex;gap:6px;list-style:none;padding:0;margin:0"><li><a href="'+C.base+'" style="color:inherit">Home</a> ›</li><li style="color:#999">'+d.title+'</li></ol></nav>';}
  function bnr(d,pri){
    var t=d?d.h1||d.title||'':'';var p=pri||'#6366f1';
    var kw=(d.keywords||d.title||'').toLowerCase();
    var icons='🎮 🎰 ⭐';
    if(/slot|gacor|spin|rtp|volatil|megaway|scatter|wild|multiplier|autoplay|klasik|video|cluster/i.test(kw))icons='🎰 💎 🔥';
    else if(/togel|2d|3d|4d|shio|colok|prediksi|keluaran|singapore|hongkong|sydney/i.test(kw))icons='🔢 🎱 📊';
    else if(/casino|baccarat|roulette|blackjack|dragon|sic bo|poker/i.test(kw))icons='🃏 ♠️ 🎲';
    else if(/deposit|withdraw|e-wallet|bank|pulsa|qris|minimal|pembayaran/i.test(kw))icons='💳 🏦 ⚡';
    else if(/bonus|cashback|referral|vip|loyalty|promo|event|reward/i.test(kw))icons='🎁 💰 🏆';
    else if(/keamanan|ssl|verifikasi|2fa|lisensi|terpercaya|responsible|anti fraud/i.test(kw))icons='🔒 🛡️ ✅';
    else if(/mobile|ios|android|windows|download|apk|app/i.test(kw))icons='📱 💻 🌐';
    else if(/komunitas|forum|affiliate|review|testimoni|leaderboard|turnamen/i.test(kw))icons='👥 🏅 📣';
    else if(/fishing|tembak|arcade|crash|aviator|keno/i.test(kw))icons='🎯 🐟 🚀';
    else if(/strategi|tips|panduan|pemula|bankroll|menang|hunter/i.test(kw))icons='📖 🧠 💡';
    else if(/customer|live chat|support|update|maintenance|notifikasi|login|daftar|cara/i.test(kw))icons='💬 🔧 📋';
    else if(/sportsbook|taruhan|olahraga|sepakbola|basket/i.test(kw))icons='⚽ 🏀 📺';
    else if(/faq|pertanyaan/i.test(kw))icons='❓ 📚 💡';
    var ic=icons.split(' ');
    var pn=parseInt((pid.match(/\d+/)||[0])[0])||0;
    var layout=pn%8;
    var h='<a href="'+C.daftar+'" rel="sponsored nofollow noopener" style="display:block;max-width:880px;margin:24px auto;border-radius:18px;overflow:hidden;text-decoration:none;position:relative;border:1px solid '+p+'25;box-shadow:0 20px 60px -20px rgba(0,0,0,.5);min-height:200px;';

    // 8 different banner layouts
    if(layout===0){
      // LEFT TEXT — icon right
      h+='background:linear-gradient(135deg,'+p+'20,#0c0d14 50%,'+p+'10);display:flex;align-items:center;padding:36px 40px">';
      h+='<div style="flex:1;text-align:left"><div style="font-size:.8rem;color:'+p+';text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">'+C.brand+' 2026</div>';
      h+='<div style="font-size:clamp(1.3rem,3vw,2rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:16px;text-shadow:0 2px 10px rgba(0,0,0,.3)">'+t+'</div>';
      h+='<div style="display:inline-flex;padding:10px 22px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:8px;font-size:.85rem">Daftar →</div></div>';
      h+='<div style="font-size:5rem;opacity:.2;margin-left:20px">'+ic[0]+'</div>';
    } else if(layout===1){
      // CENTER STACKED — large icon top
      h+='background:radial-gradient(circle at 50% 30%,'+p+'25,#0c0d14 70%);text-align:center;padding:40px 32px">';
      h+='<div style="font-size:4rem;margin-bottom:12px;filter:drop-shadow(0 0 20px '+p+'40)">'+ic[0]+'</div>';
      h+='<div style="font-size:clamp(1.2rem,3vw,1.9rem);font-weight:800;color:#fff;max-width:650px;margin:0 auto 8px;line-height:1.2">'+t+'</div>';
      h+='<div style="font-size:.85rem;color:'+p+';margin-bottom:16px">'+C.brand+' — Panduan Terlengkap</div>';
      h+='<div style="display:inline-flex;padding:10px 24px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:999px;font-size:.85rem;box-shadow:0 6px 20px '+p+'40">Daftar Sekarang →</div>';
    } else if(layout===2){
      // RIGHT TEXT — emoji left column
      h+='background:linear-gradient(225deg,'+p+'20,#0c0d14 50%,'+p+'08);display:flex;align-items:center;padding:36px 40px;flex-direction:row-reverse">';
      h+='<div style="flex:1;text-align:right"><div style="font-size:clamp(1.3rem,3vw,2rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:8px">'+t+'</div>';
      h+='<div style="font-size:.85rem;color:'+p+';margin-bottom:16px">'+C.brand+' 2026</div>';
      h+='<div style="display:inline-flex;padding:10px 22px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:8px;font-size:.85rem">Daftar →</div></div>';
      h+='<div style="display:flex;flex-direction:column;gap:8px;margin-right:24px;font-size:2.5rem;opacity:.2">'+ic.map(function(i){return '<span>'+i+'</span>'}).join('')+'</div>';
    } else if(layout===3){
      // BOTTOM BAR — text top, CTA bottom bar
      h+='background:linear-gradient(180deg,'+p+'15,#0c0d14 60%,'+p+'20);padding:36px 32px 0;display:flex;flex-direction:column">';
      h+='<div style="flex:1;text-align:center;padding-bottom:20px"><div style="font-size:clamp(1.4rem,3.5vw,2.2rem);font-weight:800;color:#fff;max-width:700px;margin:0 auto 8px;line-height:1.15">'+t+'</div>';
      h+='<div style="font-size:.85rem;color:#999">'+C.brand+' — Panduan Terlengkap 2026</div></div>';
      h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;background:'+p+'15;border-top:1px solid '+p+'25;border-radius:0 0 17px 17px;margin:0 -1px -1px">';
      h+='<span style="font-size:1.5rem">'+ic.join(' ')+'</span>';
      h+='<span style="padding:8px 20px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:8px;font-size:.85rem">Daftar →</span></div>';
    } else if(layout===4){
      // SPLIT 50/50 — left gradient block + right text
      h+='display:flex;overflow:hidden;padding:0">';
      h+='<div style="flex:1;background:linear-gradient(135deg,'+p+'40,'+p+'15);display:flex;align-items:center;justify-content:center;padding:32px;min-height:180px">';
      h+='<div style="font-size:4.5rem;filter:drop-shadow(0 4px 20px rgba(0,0,0,.3))">'+ic[0]+'</div></div>';
      h+='<div style="flex:1.2;padding:32px 28px;display:flex;flex-direction:column;justify-content:center">';
      h+='<div style="font-size:.75rem;color:'+p+';text-transform:uppercase;letter-spacing:2px;margin-bottom:8px">★ '+C.brand+'</div>';
      h+='<div style="font-size:clamp(1.1rem,2.5vw,1.7rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:14px">'+t+'</div>';
      h+='<div style="display:inline-flex;padding:10px 22px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:8px;font-size:.85rem;align-self:flex-start">Daftar →</div></div>';
    } else if(layout===5){
      // DIAGONAL — skewed accent bar
      h+='background:#0c0d14;text-align:center;padding:44px 32px;position:relative;overflow:hidden">';
      h+='<div style="position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(135deg,'+p+'20,transparent);transform:skewY(-3deg);transform-origin:top left"></div>';
      h+='<div style="position:relative"><div style="display:flex;gap:16px;justify-content:center;margin-bottom:16px;font-size:2rem;opacity:.25">'+ic.map(function(i){return '<span>'+i+'</span>'}).join('')+'</div>';
      h+='<div style="font-size:clamp(1.3rem,3vw,2rem);font-weight:800;color:#fff;max-width:680px;margin:0 auto 8px;line-height:1.2">'+t+'</div>';
      h+='<div style="font-size:.85rem;color:'+p+';margin-bottom:18px">Panduan Terlengkap 2026</div>';
      h+='<div style="display:inline-flex;padding:10px 24px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:999px;font-size:.85rem">Daftar Sekarang →</div></div>';
    } else if(layout===6){
      // CARD OVERLAP — icon card floating over gradient
      h+='background:linear-gradient(160deg,'+p+'18,#0c0d14 40%,#0c0d14 60%,'+p+'12);padding:28px 32px;display:flex;align-items:center;gap:24px;flex-wrap:wrap">';
      h+='<div style="width:80px;height:80px;background:'+p+'20;border:2px solid '+p+'40;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;flex-shrink:0">'+ic[0]+'</div>';
      h+='<div style="flex:1;min-width:200px"><div style="font-size:clamp(1.2rem,2.5vw,1.8rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:6px">'+t+'</div>';
      h+='<div style="font-size:.85rem;color:#999;margin-bottom:12px">'+C.brand+' — 2026</div>';
      h+='<div style="display:inline-flex;padding:8px 20px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:8px;font-size:.85rem">Daftar →</div></div>';
    } else {
      // PILL BADGES — horizontal badges + centered title
      h+='background:radial-gradient(ellipse at 30% 0%,'+p+'15,#0c0d14 50%,'+p+'08);text-align:center;padding:36px 32px">';
      h+='<div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;flex-wrap:wrap">';
      h+='<span style="padding:5px 14px;background:'+p+'15;border:1px solid '+p+'30;border-radius:999px;font-size:.78rem;color:'+p+'">'+ic[0]+' '+C.brand+'</span>';
      h+='<span style="padding:5px 14px;background:'+p+'10;border:1px solid '+p+'20;border-radius:999px;font-size:.78rem;color:'+p+'">'+ic[1]+' 2026</span>';
      h+='<span style="padding:5px 14px;background:'+p+'08;border:1px solid '+p+'15;border-radius:999px;font-size:.78rem;color:'+p+'">'+ic[2]+' Terlengkap</span></div>';
      h+='<div style="font-size:clamp(1.3rem,3.5vw,2.2rem);font-weight:800;color:#fff;max-width:700px;margin:0 auto 16px;line-height:1.2">'+t+'</div>';
      h+='<div style="display:inline-flex;padding:10px 24px;background:'+p+';color:#0c0d14;font-weight:700;border-radius:999px;font-size:.85rem;box-shadow:0 6px 20px '+p+'35">Daftar →</div>';
    }
    h+='</a>';
    return h;
  }
  function secs(d){var h='';if(d.sections)d.sections.forEach(function(s){h+='<section class="anim">';if(s.h2)h+='<h2 id="'+slug(s.h2)+'">'+s.h2+'</h2>';if(s.h3)h+='<h3>'+s.h3+'</h3>';if(s.paragraphs)s.paragraphs.forEach(function(p){h+='<p>'+p+'</p>';});if(s.list){h+='<ul>';s.list.forEach(function(l){h+='<li>'+l+'</li>';});h+='</ul>';}if(s.ordered){h+='<ol>';s.ordered.forEach(function(l){h+='<li>'+l+'</li>';});h+='</ol>';}if(s.table)h+='<div class="tbl" id="perbandingan">'+tbl(s.table)+'</div>';h+='</section>';});return h;}
  function faq(d){if(!d.faq||!d.faq.length)return '';var h='<section class="anim"><h2 id="faq">Pertanyaan Umum</h2>';d.faq.forEach(function(f){h+='<details class="anim"><summary>'+f.q+'</summary><div class="faq-a">'+f.a+'</div></details>';});return h+'</section>';}
  function css(fn,extra){var s=document.createElement('style');s.textContent=extra;document.head.appendChild(s);document.body.style.fontFamily="'"+fn+"',system-ui,sans-serif";}
  function fin(h){document.getElementById('app').innerHTML=h;var io=new IntersectionObserver(function(e){e.forEach(function(i){if(i.isIntersecting){i.target.classList.add('visible');io.unobserve(i.target);}});},{threshold:.15});document.querySelectorAll('.anim').forEach(function(el){io.observe(el);});}
  function tbl(t){var h='<table><thead><tr>';t.headers.forEach(function(th){h+='<th>'+th+'</th>';});h+='</tr></thead><tbody>';t.rows.forEach(function(r){h+='<tr>';r.forEach(function(td){h+='<td>'+td+'</td>';});h+='</tr>';});return h+'</tbody></table>';}
  function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}
  function sm(n,c){var m=document.querySelector('meta[name="'+n+'"]');if(!m){m=document.createElement('meta');m.name=n;document.head.appendChild(m);}m.content=c;}
  function sp(p,c){var m=document.querySelector('meta[property="'+p+'"]');if(!m){m=document.createElement('meta');m.setAttribute('property',p);document.head.appendChild(m);}m.content=c;}
  function sl(r,h){var l=document.querySelector('link[rel="'+r+'"]');if(!l){l=document.createElement('link');l.rel=r;document.head.appendChild(l);}l.href=h;}
  function jld(d){var s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(d);document.head.appendChild(s);}
})();

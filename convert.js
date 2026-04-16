const fs = require('fs');
const path = require('path');
const srcDir = 'C:/Users/user201/lxtoto-gh';
const outDir = 'C:/Users/user201/lxtoto-web';
const colors = ['#6366f1','#10b981','#f59e0b','#06b6d4','#f43f5e','#8b5cf6','#14b8a6','#84cc16','#0ea5e9','#ec4899','#f97316','#22c55e'];
const fonts = ['Inter','DM Sans','Space Grotesk','Outfit','Raleway','Nunito','Poppins','Sora','Manrope','Rubik','Montserrat','Quicksand'];

function stripTags(h){return h.replace(/<[^>]+>/g,'').trim();}

// Process index.html + page1-page99
const pages = ['index'];
for(let i=1;i<=99;i++) pages.push('page'+i);

let count=0;
pages.forEach((pg,idx)=>{
  const htmlFile = pg==='index'
    ? path.join(srcDir,'index.html')
    : path.join(srcDir,pg,'index.html');
  if(!fs.existsSync(htmlFile)){console.log('SKIP '+pg);return;}
  const html = fs.readFileSync(htmlFile,'utf8');

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch?titleMatch[1]:'LXTOTO Page';
  const descMatch = html.match(/name="description"\s+content="([^"]+)"/);
  const description = descMatch?descMatch[1]:'';
  const kwMatch = html.match(/name="keywords"\s+content="([^"]+)"/);
  const keywords = kwMatch?kwMatch[1]:'';
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
  const h1 = h1Match?h1Match[1].replace(/<[^>]+>/g,''):title;

  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  const articleHtml = articleMatch?articleMatch[1]:'';

  const sections=[];
  const h2Parts = articleHtml.split(/<h2[^>]*>/);
  for(let j=1;j<h2Parts.length;j++){
    const part=h2Parts[j];
    const h2End=part.indexOf('</h2>');
    const h2Text=h2End!==-1?stripTags(part.substring(0,h2End)):'';
    const rest=h2End!==-1?part.substring(h2End+5):part;
    const paragraphs=[];
    const pM=rest.match(/<p[^>]*>([\s\S]*?)<\/p>/g);
    if(pM)pM.forEach(p=>{const t=p.replace(/<\/?p[^>]*>/g,'').trim();if(t.length>20)paragraphs.push(t);});
    const listItems=[];
    const liM=rest.match(/<li[^>]*>([\s\S]*?)<\/li>/g);
    if(liM)liM.forEach(li=>{const t=li.replace(/<\/?li[^>]*>/g,'').trim();if(t.length>5)listItems.push(t);});
    let table=null;
    const tM=rest.match(/<table[\s\S]*?<\/table>/);
    if(tM){
      const headers=[];
      const thM=tM[0].match(/<th[^>]*>([\s\S]*?)<\/th>/g);
      if(thM)thM.forEach(th=>headers.push(stripTags(th)));
      const rows=[];
      const trM=tM[0].match(/<tr>([\s\S]*?)<\/tr>/g);
      if(trM)trM.forEach(tr=>{
        if(tr.includes('<th'))return;
        const cells=[];
        const tdM=tr.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
        if(tdM)tdM.forEach(td=>cells.push(stripTags(td)));
        if(cells.length)rows.push(cells);
      });
      if(headers.length&&rows.length)table={headers,rows};
    }
    const sec={h2:h2Text};
    if(paragraphs.length)sec.paragraphs=paragraphs;
    if(listItems.length>2)sec.list=listItems;
    if(table)sec.table=table;
    sections.push(sec);
  }
  // Intro
  if(h2Parts[0]){
    const ip=[];
    const iM=h2Parts[0].match(/<p[^>]*>([\s\S]*?)<\/p>/g);
    if(iM)iM.forEach(p=>{const t=p.replace(/<\/?p[^>]*>/g,'').trim();if(t.length>20)ip.push(t);});
    if(ip.length)sections.unshift({h2:'',paragraphs:ip});
  }
  // FAQ
  const faq=[];
  const detM=articleHtml.match(/<details[^>]*>[\s\S]*?<\/details>/g);
  if(detM)detM.forEach(det=>{
    const sM=det.match(/<summary>([\s\S]*?)<\/summary>/);
    const q=sM?stripTags(sM[1]):'';
    const a=stripTags(det.replace(/<summary>[\s\S]*?<\/summary>/,'').replace(/<\/?details[^>]*>/g,''));
    if(q&&a)faq.push({q,a});
  });

  const data={title,description,keywords,h1,subtitle:description,color:colors[idx%colors.length],font:fonts[idx%fonts.length],sections:sections.filter(s=>s.h2!==''||(s.paragraphs&&s.paragraphs.length)),faq};

  const pageOutDir=path.join(outDir,pg==='index'?'':pg);
  if(pg!=='index'&&!fs.existsSync(pageOutDir))fs.mkdirSync(pageOutDir,{recursive:true});
  const jsonPath=pg==='index'?path.join(outDir,'data.json'):path.join(pageOutDir,'data.json');
  fs.writeFileSync(jsonPath,JSON.stringify(data,null,0),'utf8');
  if(pg!=='index'){
    fs.copyFileSync(path.join(outDir,'template.html'),path.join(pageOutDir,'index.html'));
  }
  count++;
  console.log('✓ '+pg+': '+title.substring(0,50));
});
console.log('\nDone: '+count+' pages converted');

/* ============================================================
   Dash mensal — Por produto = tabela (res/meta + %), cor RAG.
   Por canal = gráfico de barras empilhadas por produto, com
   linha de meta (alvo H1) e % de atingimento.
   Fonte: planilhas Metas Ads / Eventos / Inbound 2026.
   ============================================================ */
(function(){
  const MONTHS=['Jan','Fev','Mar','Abr','Mai','Jun'];
  const NAMES={'MP':'RankMyAds (MP)','MI':'RankMyApp (MI)','DataRank':'DataRank','DI':'Digital Influencers (DI)'};
  const PCOL={'MP':'#7c3aed','MI':'#3b82f6','DataRank':'#e08a00','DI':'#e5567a'};
  const DATA={"produto":{"order":["MP","MI","DataRank","DI"],"calls":{"MP":{"meta":[11,14,14,16,18,20],"res":[11,4,16,12,14,0]},"MI":{"meta":[7,8,12,19,15,19],"res":[10,8,11,14,10,1]},"DataRank":{"meta":[6,7,7,7,8,8],"res":[1,2,8,5,12,1]},"DI":{"meta":[1,2,2,2,2,3],"res":[1,1,2,2,2,0]}},"vendas":{"MP":{"meta":[1,2,2,2,2,2],"res":[1,1,1,0,3,0]},"MI":{"meta":[2,1,0,2,2,1],"res":[2,0,2,1,2,0]},"DataRank":{"meta":[0,0,0,1,1,0],"res":[0,0,0,0,0,0]},"DI":{"meta":[0,1,1,0,1,1],"res":[0,0,0,0,0,0]}},"receita":{"MP":{"meta":[0,0,0,0,0,0],"res":[30000,26667,25000,0,75000,0]},"MI":{"meta":[0,0,0,0,0,0],"res":[25000,0,17950,7800,7000,17950]},"DataRank":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]},"DI":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}}},"canal":{"groups":["Ads","Eventos","Inbound"],"prods":["MP","MI","DataRank","DI"],"data":{"Ads":{"MP":{"calls":{"meta":[3,4,4,5,5,5],"res":[5,1,3,3,4,0]},"vendas":{"meta":[1,0,1,1,0,0],"res":[1,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[30000,0,0,0,0,0]}},"MI":{"calls":{"meta":[2,2,3,5,5,5],"res":[1,1,0,2,1,0]},"vendas":{"meta":[0,1,0,0,1,1],"res":[1,0,0,1,1,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[14000,0,0,7800,7000,0]}},"DataRank":{"calls":{"meta":[2,3,3,3,4,3],"res":[1,1,0,1,6,1]},"vendas":{"meta":[0,0,0,1,0,0],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}},"DI":{"calls":{"meta":[0,0,0,0,0,0],"res":[0,1,0,0,0,0]},"vendas":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}}},"Eventos":{"MP":{"calls":{"meta":[6,7,7,7,9,10],"res":[2,1,9,8,9,0]},"vendas":{"meta":[0,1,1,1,1,1],"res":[0,1,1,0,2,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,26667,25000,0,60000,0]}},"MI":{"calls":{"meta":[2,3,5,9,5,9],"res":[5,1,8,8,5,1]},"vendas":{"meta":[1,0,0,1,1,0],"res":[0,0,0,0,1,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}},"DataRank":{"calls":{"meta":[3,3,3,3,3,3],"res":[0,1,6,4,5,0]},"vendas":{"meta":[0,0,0,0,1,0],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}},"DI":{"calls":{"meta":[1,2,2,2,2,3],"res":[1,0,2,2,2,0]},"vendas":{"meta":[0,1,1,0,1,1],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}}},"Inbound":{"MP":{"calls":{"meta":[2,3,3,4,4,5],"res":[4,2,4,1,1,0]},"vendas":{"meta":[0,1,0,0,1,1],"res":[0,0,0,0,1,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,15000,0]}},"MI":{"calls":{"meta":[3,3,4,5,5,5],"res":[4,6,3,4,4,0]},"vendas":{"meta":[1,0,0,1,0,0],"res":[1,0,2,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[11000,0,17950,0,0,17950]}},"DataRank":{"calls":{"meta":[1,1,1,1,1,2],"res":[0,0,2,0,1,0]},"vendas":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}},"DI":{"calls":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]},"vendas":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}}}}}};

  let curDim='produto', curMet='calls';

  function accent(){ return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#7c3aed'; }
  function hexA(hex,a){ const n=parseInt(hex.slice(1),16); return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')'; }
  function fmtV(v){ return curMet==='receita' ? (v>=1000? 'R$'+Math.round(v/1000)+'k' : (v? 'R$'+v : '0')) : String(v); }
  function sum(a,s,e){ let t=0; for(let i=s;i<e;i++) t+=a[i]; return t; }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function ragBg(att){ const t=clamp(att,0,1); return 'hsl('+(t*125)+',72%,'+(90-t*4)+'%)'; }
  function ragBgSoft(att){ const t=clamp(att,0,1); return 'hsl('+(t*125)+',60%,96%)'; }
  function ragInk(att){ const t=clamp(att,0,1); return 'hsl('+(t*125)+',70%,28%)'; }

  /* ---------- TABELA (por produto) ---------- */
  function cell(res,meta,gmax,extra){
    extra=extra||'';
    if(curMet==='receita'){ const ac=accent(),zero=res===0,t=gmax?res/gmax:0; const bg=zero?'':'background:'+hexA(ac,0.14+t*0.60)+';'; const col=(!zero&&t>0.52)?'color:#fff;':''; return '<div class="mcell cnum '+extra+' '+(zero?'zero':'')+'" style="'+bg+col+'"><span class="cv">'+fmtV(res)+'</span></div>'; }
    if(meta===0&&res===0) return '<div class="mcell cnum zero '+extra+'"><span class="cv">0</span></div>';
    if(meta===0) return '<div class="mcell cnum '+extra+'"><span class="cv">'+res+'</span></div>';
    const att=res/meta,pct=Math.round(att*100)+'%';
    return '<div class="mcell cnum '+extra+'" style="background:'+ragBg(att)+';"><span class="cv">'+res+'<span class="cm">/'+meta+'</span></span><span class="cp" style="color:'+ragInk(att)+'">'+pct+'</span></div>';
  }
  function totCell(res,meta,cls){
    if(curMet==='receita') return '<div class="mcell cnum tot '+cls+'"><span class="cv">'+fmtV(res)+'</span></div>';
    if(meta===0) return '<div class="mcell cnum tot '+cls+'"><span class="cv">'+res+'</span></div>';
    const att=res/meta,pct=Math.round(att*100)+'%',ink=ragInk(att);
    return '<div class="mcell cnum tot '+cls+'" style="background:'+ragBgSoft(att)+';border-color:'+ink+';color:'+ink+';"><span class="cv">'+res+'<span class="cm">/'+meta+'</span></span><span class="cp" style="color:'+ink+'">'+pct+'</span></div>';
  }
  function dataRow(o,gmax,extra){
    let h=''; for(let i=0;i<6;i++) h+=cell(o.res[i],o.meta[i],gmax,extra);
    h+='<div class="msp"></div>';
    const q1r=sum(o.res,0,3),q2r=sum(o.res,3,6),q1m=sum(o.meta,0,3),q2m=sum(o.meta,3,6);
    h+=totCell(q1r,q1m,'mq '+extra)+totCell(q2r,q2m,'mq '+extra);
    h+='<div class="msp"></div>';
    h+=totCell(q1r+q2r,q1m+q2m,'mh '+extra);
    return h;
  }
  function renderTable(m){
    m.classList.remove('dense');
    m.style.gridTemplateColumns='1.55fr repeat(6,1fr) 0.32fr .92fr .92fr 0.32fr .98fr';
    let html='<div class="mcell mhead"></div>';
    MONTHS.forEach(x=>html+='<div class="mcell mhead cnum">'+x+'</div>');
    html+='<div class="msp"></div>';
    html+='<div class="mcell mhead cnum tothead">Q1</div><div class="mcell mhead cnum tothead">Q2</div>';
    html+='<div class="msp"></div>';
    html+='<div class="mcell mhead cnum tothead">H1</div>';
    const set=DATA.produto[curMet], names=DATA.produto.order;
    let gmax=0; if(curMet==='receita') names.forEach(n=>set[n].res.forEach(v=>{if(v>gmax)gmax=v;}));
    const tR=[0,0,0,0,0,0],tM=[0,0,0,0,0,0];
    names.forEach(n=>{ const o=set[n]; html+='<div class="mcell mrowlbl">'+(NAMES[n]||n)+'</div>'+dataRow(o,gmax,''); for(let i=0;i<6;i++){tR[i]+=o.res[i];tM[i]+=o.meta[i];} });
    html+='<div class="mcell mrowlbl totalrow grouptop">TOTAL</div>';
    for(let i=0;i<6;i++) html+=totCell(tR[i],tM[i],'sumcell grouptop');
    html+='<div class="msp"></div>';
    const Tq1r=sum(tR,0,3),Tq2r=sum(tR,3,6),Tq1m=sum(tM,0,3),Tq2m=sum(tM,3,6);
    html+=totCell(Tq1r,Tq1m,'mq sumcell grouptop')+totCell(Tq2r,Tq2m,'mq sumcell grouptop');
    html+='<div class="msp"></div>';
    html+=totCell(Tq1r+Tq2r,Tq1m+Tq2m,'mh sumcell grouptop');
    m.innerHTML=html;
    m.style.gridTemplateRows='auto repeat('+(names.length+1)+',1fr)';
  }

  /* ---------- GRÁFICO (por canal) ---------- */
  function renderChart(host){
    const groups=DATA.canal.groups, pr=DATA.canal.prods, data=DATA.canal.data;
    let maxVal=0;
    const cols=groups.map(g=>{
      let sR=0,sM=0; const segs=pr.map(p=>{const o=data[g][p][curMet];const r=sum(o.res,0,6),mt=sum(o.meta,0,6);sR+=r;sM+=mt;return{p,r,mt};});
      maxVal=Math.max(maxVal,sR,curMet==='receita'?0:sM);
      return {g,segs,sR,sM};
    });
    maxVal=(maxVal*1.15)||1;
    const W=1400,H=540, baseline=460, top=95, plotH=baseline-top, barW=170;
    const left=110, innerW=W-left-110, slot=innerW/groups.length;
    const FF="'Space Grotesk', sans-serif";
    let s='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;font-family:'+FF+'">';
    // baseline
    s+='<line x1="'+left+'" y1="'+baseline+'" x2="'+(W-110)+'" y2="'+baseline+'" stroke="#cdc2e6" stroke-width="2"/>';
    cols.forEach((c,gi)=>{
      const cx=left+slot*(gi+0.5);
      let y=baseline;
      c.segs.forEach(seg=>{ if(seg.r<=0) return; const h=seg.r/maxVal*plotH; y-=h;
        s+='<rect x="'+(cx-barW/2)+'" y="'+y+'" width="'+barW+'" height="'+h+'" rx="6" fill="'+PCOL[seg.p]+'" stroke="#fff" stroke-width="3"/>';
        if(h>28) s+='<text x="'+cx+'" y="'+(y+h/2+9)+'" text-anchor="middle" fill="#fff" font-size="26" font-weight="700">'+fmtV(seg.r)+'</text>';
      });
      const topY=y;
      let ym=baseline;
      if(curMet!=='receita'&&c.sM>0){ ym=baseline-Math.min(c.sM/maxVal,1)*plotH;
        s+='<line x1="'+(cx-barW/2-20)+'" y1="'+ym+'" x2="'+(cx+barW/2+20)+'" y2="'+ym+'" stroke="#141121" stroke-width="3" stroke-dasharray="8 6"/>';
      }
      const labY=Math.min(topY,ym);
      s+='<text x="'+cx+'" y="'+(labY-42)+'" text-anchor="middle" fill="#141121" font-size="46" font-weight="700" letter-spacing="-1">'+fmtV(c.sR)+'</text>';
      if(curMet!=='receita'&&c.sM>0){ const att=c.sR/c.sM, pct=Math.round(att*100)+'%';
        s+='<text x="'+cx+'" y="'+(labY-13)+'" text-anchor="middle" font-size="22" font-weight="600">'
          +'<tspan fill="#6b6385">meta '+c.sM+' · </tspan><tspan fill="'+ragInk(att)+'" font-weight="700">'+pct+'</tspan></text>';
      }
      s+='<text x="'+cx+'" y="'+(baseline+44)+'" text-anchor="middle" fill="#141121" font-size="34" font-weight="700" letter-spacing="-.5">'+c.g+'</text>';
    });
    s+='</svg>';
    host.innerHTML=s;
  }

  /* ---------- LEGENDA ---------- */
  function renderLegend(dim,lg){
    if(dim==='produto'){
      lg.innerHTML='<span class="key"><span class="ragbar"></span> atingimento: <b>baixo</b> → <b>alto</b></span>'
        +'<span class="key"><span class="box" style="background:repeating-linear-gradient(45deg,#fff,#fff 5px,#f4f0fb 5px,#f4f0fb 10px);"></span> zero / sem meta</span>'
        +'<span class="key">Cada célula: <b>resultado</b> <span style="opacity:.55">/meta</span> e <b>% da meta</b>. Q1 / Q2 / H1 = somas do período.</span>';
    } else {
      let h=''; DATA.canal.prods.forEach(p=>h+='<span class="key"><span class="box" style="background:'+PCOL[p]+';border-color:'+PCOL[p]+'"></span> '+(NAMES[p]||p)+'</span>');
      h+='<span class="key"><span class="metab"></span> meta (alvo H1)</span>';
      h+='<span class="key">Barra = <b>resultado H1</b> empilhado por produto · % = atingimento da meta.</span>';
      lg.innerHTML=h;
    }
  }

  function render(){
    const m=document.getElementById('dashMatrix'), c=document.getElementById('dashChart'), lg=document.getElementById('dashLegend');
    if(!m||!c) return;
    if(curDim==='canal'){ m.style.display='none'; c.style.display='flex'; renderChart(c); renderLegend('canal',lg); }
    else { c.style.display='none'; m.style.display='grid'; renderTable(m); renderLegend('produto',lg); }
  }

  function wire(){
    const dim=document.getElementById('dimSeg'), met=document.getElementById('metSeg');
    if(dim) dim.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ dim.querySelectorAll('button').forEach(x=>x.classList.remove('on')); b.classList.add('on'); curDim=b.dataset.dim; render(); }));
    if(met) met.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ met.querySelectorAll('button').forEach(x=>x.classList.remove('on')); b.classList.add('on'); curMet=b.dataset.met; render(); }));
    render();
  }
  if(document.readyState!=='loading') wire(); else document.addEventListener('DOMContentLoaded',wire);
  window.__renderDash=render;
})();

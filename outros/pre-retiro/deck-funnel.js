/* ============================================================
   Funil de conversão — slide 4.
   Navegação por período (H1 / mês) + seleção de produtos (checkbox).
   Etapas: Leads (a preencher) → Calls qualificadas → Vendas, + receita.
   Fonte: planilhas Metas Ads / Eventos / Inbound 2026 (soma por produto/mês).
   ============================================================ */
(function(){
  const PROD = {"MP":{"calls":{"meta":[11,14,14,16,18,20],"res":[11,4,16,12,14,0]},"vendas":{"meta":[1,2,2,2,2,2],"res":[1,1,1,0,3,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[30000,26667,25000,0,75000,0]}},"MI":{"calls":{"meta":[7,8,12,19,15,19],"res":[10,8,11,14,10,1]},"vendas":{"meta":[2,1,0,2,2,1],"res":[2,0,2,1,2,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[25000,0,17950,7800,7000,17950]}},"DataRank":{"calls":{"meta":[6,7,7,7,8,8],"res":[1,2,8,5,12,1]},"vendas":{"meta":[0,0,0,1,1,0],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}},"DI":{"calls":{"meta":[1,2,2,2,2,3],"res":[1,1,2,2,2,0]},"vendas":{"meta":[0,1,1,0,1,1],"res":[0,0,0,0,0,0]},"receita":{"meta":[0,0,0,0,0,0],"res":[0,0,0,0,0,0]}}};
  const NAMES = {'MP':'RankMyAds','MI':'RankMyApp','DataRank':'DataRank','DI':'Digital Inf.'};
  const ORDER = ['MP','MI','DataRank','DI'];
  const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun'];

  // ===== LEADS: preencher quando houver dado (por produto, 6 meses). =====
  // Ex.: LEADS = { MP:{res:[..6],meta:[..6]}, MI:{...}, DataRank:{...}, DI:{...} };
  // Enquanto for null, a etapa de Leads aparece como "a preencher".
  const LEADS = null;

  const TOTAL_REV = 232367;
  let period = 'H1';                 // 'H1' ou índice 0..5
  let sel = new Set(ORDER);          // produtos marcados

  // ===== LEVANTADAS DE MÃO: por canal (todos os produtos), granularidade =====
  // trimestral (sem quebra mensal/produto ainda). Eventos: não rastreado.
  const HANDRAISE = {
    Ads:     { q1: 173, q2: 60 },   // Jan–Mar / Abr–09jun
    Inbound: { q1: 74,  q2: 43 },
  };
  function handraise(){
    const q1 = HANDRAISE.Ads.q1 + HANDRAISE.Inbound.q1;   // 247
    const q2 = HANDRAISE.Ads.q2 + HANDRAISE.Inbound.q2;   // 103
    if(period==='H1') return { val:q1+q2, note:'Ads 233 · Inbound 117 · todos os produtos' };
    const m = Number(period);
    if(m<=2) return { val:q1, note:'Q1 (Jan–Mar) · sem quebra mensal ainda' };
    return { val:q2, note:'Q2 (Abr–09/jun) · sem quebra mensal ainda' };
  }

  function months(){ return period==='H1' ? [0,1,2,3,4,5] : [Number(period)]; }
  function sumF(metric, field){ let t=0; sel.forEach(p=>months().forEach(i=>{ t+=PROD[p][metric][field][i]; })); return t; }
  function sumLeads(field){ if(!LEADS) return null; let t=0; sel.forEach(p=>{ if(LEADS[p]) months().forEach(i=>{ t+=LEADS[p][field][i]; }); }); return t; }
  function pct(r,m){ return m? Math.round(r/m*100) : 0; }
  function fmtConv(r,base){ return base? (r/base*100).toFixed(2).replace('.',',')+'%' : '—'; }
  function k(v){ return v? 'R$ '+Math.round(v/1000)+'k' : 'R$ 0'; }
  function ticket(rev,v){ return v? 'R$ '+(rev/v/1000).toFixed(1).replace('.',',')+'k' : '—'; }

  function bar(cls,val,label,sub){ return '<div class="fnbar '+cls+'"><div class="fnval">'+val+'</div><div class="fnlabel">'+label+'</div><div class="fnsub">'+sub+'</div></div>'; }
  function conv(pctTxt,label,meta,ph){ return '<div class="fnconv"><div class="arrow">↓</div><div class="fnpct'+(ph?' ph':'')+'">'+pctTxt+'</div><div class="fnconvlbl">'+label+'</div><div class="fnmeta">'+meta+'</div></div>'; }

  function render(){
    const fb=document.getElementById('funnelBody'), rc=document.getElementById('revCard');
    if(!fb||!rc) return;
    const cR=sumF('calls','res'), cM=sumF('calls','meta');
    const vR=sumF('vendas','res'), vM=sumF('vendas','meta');
    const rev=sumF('receita','res');
    const lR=sumLeads('res');

    let html='';
    const allSel = sel.size===ORDER.length;
    const hr = handraise();
    const cleanHR = (period==='H1' && allSel);   // levantadas só fecham conta limpa no total H1 / todos os produtos
    // Leads
    if(lR==null){
      html+=bar('leads ph','—','Leads','a preencher');
      html+=conv('—','geram levantada de mão','informe os leads',true);
    } else {
      const lM=sumLeads('meta');
      html+=bar('leads',lR,'Leads','meta '+lM+' · '+pct(lR,lM)+'% atingida');
      html+=conv(fmtConv(hr.val,lR),'geram levantada de mão','',false);
    }
    // Levantadas de mão
    html+=bar('handraise',hr.val,'Levantadas de mão',hr.note);
    html+=conv(cleanHR? fmtConv(cR,hr.val) : '—','viram call qualificada', cleanHR? 'Ads + Inbound' : 'detalhe só no total H1', !cleanHR);
    // Calls
    html+=bar('calls',cR,'Calls qualificadas','meta '+cM+' · '+pct(cR,cM)+'% atingida');
    html+=conv(fmtConv(vR,cR),'convertem em venda','meta de conversão: '+fmtConv(vM,cM),false);
    // Vendas
    html+=bar('vendas',vR,'Vendas','meta '+vM+' · '+pct(vR,vM)+'% atingida');
    fb.innerHTML=html;

    // Receita em destaque
    const share = TOTAL_REV? Math.round(rev/TOTAL_REV*100):0;
    const periodLbl = period==='H1' ? 'H1 2026' : MONTHS[Number(period)];
    const prodLbl = allSel ? 'todos os produtos' : [...sel].map(p=>NAMES[p]).join(' + ') || 'nenhum produto';
    let metaLine = vR>0 ? vR+' vendas · ticket médio '+ticket(rev,vR) : (rev>0?'0 vendas fechadas · receita reconhecida':'0 vendas no período');
    rc.innerHTML='<div class="revlabel">Receita trazida · '+periodLbl+'</div>'
      +'<div class="revbig">'+k(rev)+'</div>'
      +'<div class="revmeta">'+metaLine+'</div>'
      +'<div class="revshare">'+(allSel&&period==='H1'?'Soma de todos os produtos':share+'% da receita do semestre · '+prodLbl)+'</div>';
  }

  function wire(){
    const seg=document.getElementById('funSeg');
    if(seg) seg.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ seg.querySelectorAll('button').forEach(x=>x.classList.remove('on')); b.classList.add('on'); period=b.dataset.fun; render(); }));
    const pick=document.getElementById('prodPick');
    if(pick) pick.querySelectorAll('button.pp').forEach(b=>b.addEventListener('click',()=>{ const p=b.dataset.prod; if(sel.has(p)){sel.delete(p);b.classList.remove('on');b.setAttribute('aria-pressed','false');} else {sel.add(p);b.classList.add('on');b.setAttribute('aria-pressed','true');} render(); }));
    render();
  }
  if(document.readyState!=='loading') wire(); else document.addEventListener('DOMContentLoaded',wire);
  window.__renderFunnel=render;
})();

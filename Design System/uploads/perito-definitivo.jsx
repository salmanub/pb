import { useState } from "react";

/* ════════════════════════════════════════════════════════════════
   PERITO.BARCELONA — VERSIÓN DEFINITIVA
   Base visual: Peritia v5 (Playfair Display + DM Sans + JetBrains Mono,
   teal, espacio blanco editorial)
   + Maquinaria de captación del "Expediente":
     · Caja de cualificación sticky en páginas de servicio
     · Chips de normativa en negro
     · Metadatos mono de expediente (EXP·01…) como eyebrows
   ════════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
:root{--t:#0F766E;--tl:#CCFBF1;--td:#134E4A;--a:#B45309;--i:#0F1923;--i6:rgba(15,25,35,.6);--i3:rgba(15,25,35,.3);--i1:rgba(15,25,35,.07);--p:#FAFAF8;--b:#E5E7EB;--w:#FFFFFF;}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--w);color:var(--i);-webkit-font-smoothing:antialiased;}
.fd{font-family:'Playfair Display',serif;}
.fm{font-family:'JetBrains Mono',monospace;}
@keyframes tk{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.tick{animation:tk 40s linear infinite;}
.tick:hover{animation-play-state:paused;}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.au{animation:fu .4s cubic-bezier(.16,1,.3,1) forwards;}
@keyframes sp{to{transform:rotate(360deg)}}
.spin{animation:sp .7s linear infinite;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:60;background:rgba(255,255,255,.93);backdrop-filter:blur(14px);border-bottom:1px solid var(--b);}
.ni{max-width:1280px;margin:0 auto;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:64px;}
.logo{font-family:'Playfair Display',serif;font-weight:900;font-size:1.05rem;letter-spacing:-.02em;color:var(--i);cursor:pointer;}
.logo span{color:var(--t);}
.nlinks{display:flex;align-items:center;gap:1.6rem;}
.nl{font-size:.8rem;font-weight:500;color:var(--i6);cursor:pointer;letter-spacing:.03em;background:none;border:none;transition:color .2s;padding:0;position:relative;font-family:'DM Sans',sans-serif;}
.nl:hover,.nl.on{color:var(--t);}
.nl.on::after{content:'';position:absolute;bottom:-6px;left:0;right:0;height:2px;background:var(--t);}
.dd{position:relative;}
.ddm{position:absolute;top:calc(100% + 14px);left:-1rem;background:white;border:1px solid var(--b);min-width:300px;box-shadow:0 12px 40px rgba(15,25,35,.1);z-index:80;opacity:0;visibility:hidden;transform:translateY(-4px);transition:all .2s cubic-bezier(.16,1,.3,1);}
.dd:hover .ddm{opacity:1;visibility:visible;transform:translateY(0);}
.ddi{display:flex;align-items:baseline;gap:.75rem;padding:.7rem 1rem;font-size:.8rem;color:var(--i6);transition:all .15s;border-bottom:1px solid var(--b);cursor:pointer;}
.ddi:last-child{border-bottom:none;}
.ddi:hover{background:var(--tl);color:var(--td);}
.ddi-n{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:var(--t);font-weight:600;flex-shrink:0;}
.ddi-t{font-weight:500;}

/* BUTTONS */
.btn-p{background:var(--t);color:#fff;padding:.8rem 1.75rem;border:none;cursor:pointer;font-size:.78rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn-p:hover{background:var(--td);transform:translateY(-1px);}
.btn-g{background:transparent;color:var(--i);padding:.8rem 1.6rem;border:1.5px solid var(--b);cursor:pointer;font-size:.78rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn-g:hover{border-color:var(--i);}
.btn-w{background:#fff;color:var(--t);padding:.9rem 2.4rem;border:none;cursor:pointer;font-size:.85rem;font-weight:600;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn-w:hover{background:var(--i);color:#fff;}

/* HERO */
.hero{min-height:92vh;display:flex;flex-direction:column;justify-content:center;padding:120px 1.5rem 70px;max-width:1280px;margin:0 auto;}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--t);margin-bottom:1.4rem;display:flex;align-items:center;gap:.75rem;}
.eyebrow::before{content:'';width:28px;height:1px;background:var(--t);}
.h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(2.7rem,7vw,6.4rem);line-height:.94;letter-spacing:-.03em;color:var(--i);margin-bottom:1.5rem;}
.h1 em{font-style:italic;color:var(--t);}
.hsub{font-size:1.05rem;color:var(--i6);max-width:570px;line-height:1.7;margin-bottom:2.4rem;font-weight:300;}
.hctas{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}
.htel{font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--i6);}

/* TICKER */
.ticker{border-top:1px solid var(--b);border-bottom:1px solid var(--b);overflow:hidden;background:var(--p);}
.ti{display:flex;width:max-content;}
.tit{white-space:nowrap;padding:.85rem 2.4rem;font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--i3);border-right:1px solid var(--b);display:flex;align-items:center;gap:.75rem;}
.dot{width:4px;height:4px;border-radius:50%;background:var(--t);flex-shrink:0;}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--b);max-width:1280px;margin:0 auto;}
.sc{padding:2.4rem 1.5rem;border-right:1px solid var(--b);position:relative;}
.sc:last-child{border-right:none;}
.sc-n{position:absolute;top:.9rem;right:1.1rem;font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.12em;color:var(--i3);opacity:.6;}
.sn{font-family:'Playfair Display',serif;font-weight:900;line-height:1;letter-spacing:-.03em;margin-bottom:.45rem;font-size:clamp(1.75rem,3vw,3rem);color:var(--i);}
.sn span{color:var(--t);}
.sl{font-size:.8rem;color:var(--i6);line-height:1.4;font-weight:500;}
.ss{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:var(--i3);margin-top:.25rem;}

/* SECTIONS */
.sec{max-width:1280px;margin:0 auto;padding:5rem 1.5rem;}
.sh{margin-bottom:3.2rem;display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;}
.st{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(1.875rem,3.5vw,3rem);letter-spacing:-.025em;color:var(--i);line-height:1.05;}
.st em{font-style:italic;color:var(--t);}

/* B2B */
.tgrid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--b);}
.tc{padding:2.2rem;border-right:1px solid var(--b);transition:background .3s;display:flex;flex-direction:column;}
.tc:last-child{border-right:none;}
.tc:hover{background:var(--i);}
.tc:hover .tc-t,.tc:hover .tc-cta{color:white;}
.tc:hover .tc-d{color:rgba(255,255,255,.55);}
.tc:hover .tc-n{color:rgba(204,251,241,.6);}
.tc:hover .tc-tag{color:rgba(255,255,255,.5);border-color:rgba(255,255,255,.2);}
.tc-n{font-family:'JetBrains Mono',monospace;font-size:.58rem;color:var(--t);margin-bottom:1.4rem;letter-spacing:.16em;font-weight:600;transition:color .3s;text-transform:uppercase;}
.tc-t{font-family:'Playfair Display',serif;font-weight:700;font-size:1.2rem;color:var(--i);margin-bottom:.85rem;line-height:1.2;transition:color .3s;}
.tc-d{font-size:.8rem;color:var(--i6);line-height:1.65;font-weight:300;margin-bottom:1.2rem;transition:color .3s;flex:1;}
.tc-tags{display:flex;flex-wrap:wrap;gap:.375rem;margin-bottom:1.2rem;}
.tc-tag{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:var(--i6);border:1px solid var(--b);padding:.2rem .5rem;transition:all .3s;}
.tc-cta{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:var(--t);background:none;border:none;cursor:pointer;text-align:left;padding:0;align-self:flex-start;transition:color .3s;}

/* SERVICE ROWS */
.srow{display:grid;grid-template-columns:80px 1fr 180px 36px;align-items:center;gap:1.5rem;padding:1.5rem 0;border-bottom:1px solid var(--b);cursor:pointer;transition:all .2s;}
.srow:hover .st2{color:var(--t);}
.srow:hover .sarr{transform:translateX(4px);color:var(--t);}
.snum{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--t);letter-spacing:.1em;font-weight:600;}
.stag{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--i3);margin-bottom:.35rem;}
.st2{font-family:'Playfair Display',serif;font-weight:700;font-size:1.12rem;color:var(--i);margin-bottom:.35rem;transition:color .2s;}
.sd{font-size:.78rem;color:var(--i6);line-height:1.55;font-weight:300;max-width:560px;}
.snorm{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:var(--i3);text-align:right;line-height:1.6;}
.sarr{font-size:1.1rem;color:var(--i3);transition:all .2s;}

/* PROTOCOL DARK */
.proto{background:var(--i);padding:5rem 0;}
.proto-in{max-width:1280px;margin:0 auto;padding:0 1.5rem;}
.pgrid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.1);margin-top:3rem;}
.ps{padding:2.2rem 1.6rem 2.2rem 0;border-right:1px solid rgba(255,255,255,.1);}
.ps:last-child{border-right:none;padding-right:0;}
.psn{font-family:'JetBrains Mono',monospace;font-size:.58rem;color:rgba(204,251,241,.55);letter-spacing:.2em;margin-bottom:1.2rem;font-weight:600;}
.pst{font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;color:#fff;margin-bottom:.6rem;}
.psd{font-size:.78rem;color:rgba(255,255,255,.45);line-height:1.65;font-weight:300;}

/* CASES */
.cgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--b);}
.cc{background:#fff;padding:1.9rem;transition:background .2s;position:relative;}
.cc:hover{background:var(--p);}
.ctag{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--t);margin-bottom:.8rem;display:flex;align-items:center;gap:.5rem;font-weight:600;}
.ctag::before{content:'';width:12px;height:1px;background:var(--t);}
.cimp{font-family:'Playfair Display',serif;font-weight:900;font-size:2.2rem;color:var(--i);letter-spacing:-.03em;margin-bottom:.4rem;}
.ctit{font-size:.875rem;color:var(--i);font-weight:500;margin-bottom:.55rem;}
.cdesc{font-size:.75rem;color:var(--i6);line-height:1.6;font-weight:300;}
.cpills{display:flex;gap:.5rem;margin-top:1.1rem;flex-wrap:wrap;}
.cp{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.12em;text-transform:uppercase;color:var(--i6);border:1px solid var(--b);padding:.2rem .5rem;}

/* TESTIMONIALS */
.tgr{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
.tcard{background:#fff;border:1px solid var(--b);border-top:3px solid var(--t);padding:1.7rem;}
.tq{font-family:'Playfair Display',serif;font-style:italic;font-size:.95rem;color:var(--i);line-height:1.65;margin-bottom:1.2rem;}
.ta{font-size:.8rem;font-weight:600;color:var(--i);}
.tr{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.1em;color:var(--t);text-transform:uppercase;margin-top:.25rem;}

/* FAQ */
.faq-item{border-bottom:1px solid var(--b);}
.faq-btn{width:100%;display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1.2rem 0;background:none;border:none;cursor:pointer;text-align:left;}
.faq-q{font-size:.92rem;font-weight:500;color:var(--i);font-family:'DM Sans',sans-serif;}
.faq-ic{font-family:'JetBrains Mono',monospace;font-size:1rem;color:var(--t);transition:transform .2s;flex-shrink:0;}
.faq-a{font-size:.86rem;color:var(--i6);line-height:1.7;font-weight:300;padding-bottom:1.2rem;max-width:760px;}

/* CTA BAND */
.cta-band{background:var(--t);padding:4.4rem 1.5rem;text-align:center;}
.cta-h{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(1.7rem,3.5vw,2.9rem);color:#fff;letter-spacing:-.025em;margin-bottom:.85rem;line-height:1.1;}
.cta-h em{font-style:italic;}
.cta-s{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:1.9rem;}

/* FOOTER */
footer{background:var(--i);color:#fff;padding:3.4rem 1.5rem 2rem;}
.fi2{max-width:1280px;margin:0 auto;}
.fg{display:grid;grid-template-columns:1.8fr 1fr 1fr 1.2fr;gap:2.4rem;margin-bottom:2.4rem;padding-bottom:2.4rem;border-bottom:1px solid rgba(255,255,255,.08);}
.flogo{font-family:'Playfair Display',serif;font-weight:900;font-size:1.05rem;color:#fff;letter-spacing:-.02em;margin-bottom:.85rem;}
.flogo span{color:rgba(204,251,241,.6);}
.ftext{font-size:.78rem;color:rgba(255,255,255,.38);line-height:1.65;font-weight:300;max-width:250px;margin-bottom:1.2rem;}
.fcred{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.08em;color:rgba(255,255,255,.22);line-height:1.85;}
.fctit{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.22);margin-bottom:1rem;}
.flink{display:block;font-size:.78rem;color:rgba(255,255,255,.45);margin-bottom:.5rem;cursor:pointer;transition:color .2s;background:none;border:none;text-align:left;padding:0;font-family:'DM Sans',sans-serif;}
.flink:hover{color:#fff;}
.fnap{font-family:'JetBrains Mono',monospace;font-size:.68rem;color:rgba(255,255,255,.42);line-height:1.85;}
.fbot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
.fcp{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.1em;color:rgba(255,255,255,.22);}
.fsc{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(204,251,241,.32);}

/* PAGE HERO */
.ph{padding:125px 1.5rem 0;max-width:1280px;margin:0 auto;}
.bc{display:flex;align-items:center;gap:.6rem;font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:var(--i3);margin-bottom:1rem;}
.bc b{color:var(--t);font-weight:600;}
.bc span{cursor:pointer;}
.ph-h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(2.2rem,4.6vw,4.1rem);letter-spacing:-.03em;color:var(--i);line-height:.96;margin-bottom:1rem;}
.ph-h1 em{font-style:italic;color:var(--t);}
.ph-sub{font-size:.95rem;color:var(--i6);max-width:620px;line-height:1.7;font-weight:300;padding-bottom:2.8rem;}

/* ── CAPTACIÓN: chips + qual sticky (del Expediente) ── */
.nchips{display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:2rem;}
.nchip{font-family:'JetBrains Mono',monospace;font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;background:var(--i);color:var(--p);padding:.35rem .7rem;font-weight:500;}
.sgrid{display:grid;grid-template-columns:1.55fr 1fr;gap:3rem;align-items:start;}
.qual{background:var(--p);border:1px solid var(--b);border-top:3px solid var(--t);padding:1.8rem;position:sticky;top:88px;}
.q-h{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:var(--i3);margin-bottom:.35rem;}
.q-v{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:1.7rem;color:var(--t);margin-bottom:1.2rem;}
.q-li{display:flex;gap:.75rem;align-items:flex-start;padding:.65rem 0;border-top:1px solid var(--b);font-size:.78rem;color:var(--i6);line-height:1.55;font-weight:300;}
.q-li b{font-family:'JetBrains Mono',monospace;color:var(--t);font-size:.66rem;font-weight:600;flex-shrink:0;padding-top:.1rem;}
.q-li .q-st{color:var(--i);font-weight:500;display:block;margin-bottom:.1rem;font-size:.8rem;}
.q-note{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:var(--i3);text-align:center;margin-top:.8rem;letter-spacing:.12em;text-transform:uppercase;}
.body-h3{font-family:'Playfair Display',serif;font-weight:700;font-size:1.3rem;color:var(--i);margin:2.2rem 0 .85rem;padding-bottom:.5rem;border-bottom:2px solid var(--t);display:inline-block;}
.body-p{font-size:.9rem;color:var(--i6);line-height:1.8;margin-bottom:1rem;max-width:620px;font-weight:300;}
.body-p a{color:var(--t);font-weight:500;text-decoration:none;border-bottom:1.5px solid var(--tl);transition:border-color .15s;}
.body-p a:hover{border-bottom-color:var(--t);}
.body-p b{color:var(--i);font-weight:600;}

/* TYPEFORM */
.tfo{position:fixed;inset:0;z-index:100;background:rgba(15,25,35,.65);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:1.2rem;}
.tfm{background:#fff;width:100%;max-width:650px;min-height:490px;display:flex;flex-direction:column;box-shadow:0 24px 72px rgba(0,0,0,.22);position:relative;overflow:hidden;}
.tfp{height:3px;background:var(--tl);}
.tfpf{height:100%;background:var(--t);transition:width .5s cubic-bezier(.4,0,.2,1);}
.tfb{flex:1;padding:2.7rem 2.7rem 2.2rem;display:flex;flex-direction:column;justify-content:center;}
.tfl{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--t);margin-bottom:1.2rem;font-weight:600;}
.tfq{font-family:'Playfair Display',serif;font-weight:700;font-size:1.5rem;color:var(--i);line-height:1.2;margin-bottom:.55rem;white-space:pre-line;}
.tfh{font-size:.86rem;color:var(--i6);margin-bottom:1.7rem;font-weight:300;}
.tfopt{padding:.85rem 1rem;border:1.5px solid var(--b);cursor:pointer;font-size:.86rem;color:var(--i);font-weight:500;transition:all .15s;text-align:left;background:#fff;display:flex;align-items:center;gap:.85rem;font-family:'DM Sans',sans-serif;margin-bottom:.55rem;}
.tfopt:hover{border-color:var(--t);background:var(--tl);}
.tfopt.sel{border-color:var(--t);background:var(--tl);}
.tfk{font-family:'JetBrains Mono',monospace;font-size:.62rem;width:22px;height:22px;border:1px solid var(--b);display:flex;align-items:center;justify-content:center;color:var(--i3);flex-shrink:0;}
.tft{width:100%;border:none;border-bottom:2px solid var(--b);padding:.6rem 0;font-size:1rem;color:var(--i);outline:none;resize:none;height:108px;background:transparent;font-family:'DM Sans',sans-serif;transition:border-color .2s;}
.tft:focus{border-bottom-color:var(--t);}
.tfi{width:100%;border:none;border-bottom:2px solid var(--b);padding:.6rem 0;font-size:.95rem;color:var(--i);outline:none;background:transparent;font-family:'DM Sans',sans-serif;transition:border-color .2s;}
.tfi:focus{border-bottom-color:var(--t);}
.tfi::placeholder,.tft::placeholder{color:var(--i3);}
.tfa{display:flex;align-items:center;justify-content:space-between;margin-top:1.7rem;}
.tfback{background:none;border:none;color:var(--i6);font-size:.86rem;cursor:pointer;font-family:'DM Sans',sans-serif;}
.tfx{position:absolute;top:.85rem;right:.85rem;background:none;border:none;width:34px;height:34px;cursor:pointer;color:var(--i6);font-size:1.25rem;display:flex;align-items:center;justify-content:center;transition:color .2s;}
.tfx:hover{color:var(--i);}
.tfpriv{display:flex;align-items:flex-start;gap:.6rem;font-size:.78rem;color:var(--i6);margin-top:.85rem;cursor:pointer;font-weight:300;line-height:1.5;}
.tfpriv input{accent-color:var(--t);margin-top:2px;cursor:pointer;}
.tferr{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.05em;color:#DC2626;margin-top:.6rem;}

@media(max-width:1024px){
  .stats{grid-template-columns:repeat(2,1fr);}
  .tgrid{grid-template-columns:1fr;}
  .pgrid{grid-template-columns:repeat(2,1fr);}
  .fg{grid-template-columns:1fr 1fr;}
  .cgrid{grid-template-columns:repeat(2,1fr);}
  .sgrid{grid-template-columns:1fr;}
  .qual{position:static;}
  .srow{grid-template-columns:60px 1fr 36px;}
  .snorm{display:none;}
}
@media(max-width:768px){
  .h1{font-size:2.5rem;}
  .nlinks{display:none;}
  .stats{grid-template-columns:1fr 1fr;}
  .tgr,.cgrid,.pgrid,.fg{grid-template-columns:1fr;}
}
`;

/* ── DATA ──────────────────────────────────────────────── */
const SVCS = [
  {slug:"informe-de-parte",num:"EXP·01",tag:"Litigación civil",t:"Informe Pericial de Parte",norm:"LEC art. 335",
   desc:"Dictamen encargado por una de las partes para fundamentar su postura en negociación, mediación o demanda. Plena validez probatoria.",
   lsi:["LEC art. 335","Dictamen técnico","Ratificación de parte","Procedimiento civil","Prueba pericial"],
   body:[["Su argumento técnico en una disputa","En cualquier litigio, la parte que presenta los argumentos técnicos más sólidos tiene ventaja decisiva. Un <b>informe pericial de parte</b> es un dictamen encargado por usted para investigar la realidad técnica de los hechos y defender su postura con objetividad y rigor."],
   ["Cuándo es esencial","<b>Antes de una demanda</b> — para evaluar la solidez técnica de la reclamación. <b>Durante una negociación</b> — un informe contundente fuerza acuerdos favorables sin juicio. <b>Como prueba</b> conforme a la LEC. <b>Para refutar</b> el dictamen de la parte contraria mediante un contrainforme."]],
   faqs:[["¿Tiene validez en un juicio?","Sí. Es un medio de prueba reconocido por la LEC (arts. 335 y ss.) y puede defenderse como prueba pericial ante el juez."],["¿Diferencia con el dictamen judicial?","El de parte lo encarga usted o su letrado; el judicial lo designa el juzgado. La metodología es idéntica."]]},
  {slug:"perito-judicial",num:"EXP·02",tag:"Designación judicial",t:"Actuación como Perito Judicial",norm:"LEC art. 347",
   desc:"Por designación del juzgado o de parte. Imparcialidad acreditada y defensa oral solvente ante interrogatorio cruzado.",
   lsi:["Designación judicial","Lista de peritos","LEC art. 347","Tacha de peritos","Ratificación en sala"],
   body:[["Actuación en sede judicial","La figura del perito judicial exige tres condiciones: conocimiento técnico acreditado, inscripción en la lista oficial del Ministerio de Justicia y capacidad de defender el dictamen verbalmente ante el juez y los letrados de ambas partes."],
   ["Ratificación e interrogatorio cruzado","La ratificación oral es parte integrante del servicio. La solidez de esa defensa es determinante para el peso que el juez otorga al dictamen. <b>Honorarios de ratificación incluidos sin sobrecoste.</b>"]],
   faqs:[["¿Cómo se designa al perito judicial?","Por sorteo entre los inscritos en la lista oficial del Ministerio de Justicia, o por acuerdo de las partes (LEC art. 339)."],["¿Puede impugnarse el dictamen?","Las partes pueden tachar al perito o impugnar el dictamen (LEC art. 343). La solvencia del informe es la mejor defensa."]]},
  {slug:"patologias-estructurales",num:"EXP·03",tag:"Diagnóstico estructural",t:"Patologías Estructurales",norm:"CTE DB-SE · EHE-08",
   desc:"Grietas activas, fisuras en forjados, asientos diferenciales y deformaciones críticas. Modelado FEM y ensayos in situ.",
   lsi:["CTE DB-SE","EHE-08","Grietas activas","Asiento diferencial","Cálculo estructural","Modelado FEM"],
   body:[["Diagnóstico de patologías estructurales","Una patología estructural es cualquier alteración de los elementos portantes que afecte a la capacidad resistente o a la estabilidad. El diagnóstico correcto es el punto de partida de cualquier intervención técnica o reclamación jurídica."],
   ["Metodología","Inspección visual y cartografía de fisuras · testigos de yeso y ensayos no destructivos · modelado estructural conforme al Eurocódigo 2 y CTE DB-SE · diagnóstico con origen, gravedad y cuantificación. El dictamen diferencia responsabilidades: proyecto, dirección de obra o ejecución (LOE art. 17)."]],
   faqs:[["¿Todas las grietas son estructurales?","No. Pueden ser térmicas, de retracción, de asiento o de fatiga. La determinación del origen requiere análisis de geometría, apertura, disposición y evolución."],["¿Cuándo es urgente actuar?","Cuando la grieta es activa, afecta a elementos portantes, supera 1 mm con disposición diagonal o hay deformación perceptible."]]},
  {slug:"humedades-filtraciones",num:"EXP·04",tag:"Patología hídrica",t:"Humedades y Filtraciones",norm:"CTE DB-HS",
   desc:"Detección no destructiva del origen mediante termografía infrarroja y pruebas de estanqueidad. Dictamen para reclamar a constructora, comunidad o aseguradora.",
   lsi:["Termografía infrarroja","CTE DB-HS","Capilaridad ascendente","Condensación","Prueba de estanqueidad","Perito humedades Barcelona"],
   body:[["El síntoma no es el origen","La mancha visible rara vez indica el origen exacto del agua. El diagnóstico con metodología no destructiva — termografía infrarroja, higrómetros de profundidad, pruebas de estanqueidad — localiza el origen sin abrir obra. <b>Si ha pagado reparaciones que no han funcionado</b>, lo más probable es que se haya tratado el síntoma sin haber identificado la causa."],
   ["Tipos de humedad","Capilaridad ascendente desde el terreno · filtración por cubierta o terraza (CTE DB-HS 1) · filtración por fachada o carpinterías · condensación superficial o intersticial · daños por instalaciones. El dictamen establece el origen, cuantifica los daños y delimita responsabilidades: constructora, comunidad de propietarios o cobertura de la póliza."],
   ["Reparación tras el dictamen","Una vez el dictamen delimita el origen y las responsabilidades, la ejecución de la reparación corresponde a empresas especializadas. Para esa fase puede solicitar presupuesto con diagnóstico técnico previo a la red de especialistas en <a href='https://humedades.barcelona' target='_blank' rel='noopener'>tratamiento de humedades en Barcelona</a>, que ejecutan la solución definitiva — no el parche — conforme al origen identificado en el dictamen."]],
   faqs:[["¿La termografía basta para localizar el origen?","Es la herramienta de detección no destructiva principal, complementada con higrómetros de profundidad y análisis del detalle constructivo."],["¿Sirve para reclamar al seguro?","Sí. El dictamen delimita si el origen corresponde a la constructora, a la comunidad o está cubierto por la póliza."],["¿Quién repara la humedad después del informe?","El dictamen identifica el origen y al responsable. La reparación la ejecuta una empresa especializada en tratamiento de humedades; podemos orientarle hacia especialistas verificados."]]},
  {slug:"vicios-ocultos",num:"EXP·05",tag:"Compraventa inmobiliaria",t:"Vicios Ocultos",norm:"CC art. 1484",
   desc:"Defectos graves no aparentes en la compraventa. Acreditación de preexistencia dentro del plazo de saneamiento de 6 meses.",
   lsi:["Código Civil art. 1484","Defectos no aparentes","Plazo de saneamiento","Preexistencia","Acción redhibitoria","Vicios ocultos vivienda Barcelona"],
   body:[["Qué son los vicios ocultos","Defectos graves no aparentes en la compraventa que impiden el uso adecuado del bien. Regulados en el CC arts. 1484 y ss.: derecho a rescindir (acción redhibitoria) o reducir el precio (acción estimatoria). Deben ser graves, anteriores a la venta y desconocidos por el comprador."],
   ["El plazo de 6 meses","El CC art. 1490 establece 6 meses desde la entrega para ejercitar las acciones. El informe pericial debe obtenerse dentro de ese plazo para acreditar técnicamente existencia, gravedad y preexistencia del defecto. <b>Si acaba de detectar el problema, el tiempo corre en su contra: contacte cuanto antes.</b>"],
   ["Humedades ocultas: el vicio más frecuente","Las humedades disimuladas bajo revestimientos recién pintados antes de la venta son el vicio oculto más habitual en Barcelona. El dictamen acredita la preexistencia mediante el análisis del grado de avance de la patología. Tras la reclamación, si necesita ejecutar la reparación, puede solicitar presupuesto a especialistas en <a href='https://humedades.barcelona' target='_blank' rel='noopener'>diagnóstico y tratamiento de humedades en Barcelona</a> con la garantía de actuar sobre el origen identificado en el informe."]],
   faqs:[["¿Qué plazo tengo para reclamar?","6 meses desde la entrega del inmueble (CC art. 1490). Es imprescindible actuar dentro de ese plazo."],["¿Qué defectos cuentan como vicios ocultos?","Los que hacen el inmueble impropio para su uso o lo disminuyen de tal modo que, de haberlos conocido, el comprador no habría comprado o habría pagado menos."],["¿Cómo se demuestra que el defecto es anterior a la compra?","Mediante el análisis técnico del grado de desarrollo de la patología: la antigüedad de una humedad, la evolución de una fisura o el estado de una instalación permiten acreditar técnicamente la preexistencia."]]},
  {slug:"reclamacion-mala-ejecucion",num:"EXP·06",tag:"Incumplimiento contractual",t:"Mala Ejecución de Obra",norm:"LOE art. 17",
   desc:"Contraste objetivo de la obra frente a contrato, memoria de calidades y lex artis. Cuantificación de incumplimientos.",
   lsi:["LOE art. 17","Memoria de calidades","Lex artis","Partidas no ejecutadas","Subsanación"],
   body:[["Cuando el resultado no es el pactado","Acabados deficientes, materiales inferiores a los acordados, partidas cobradas y no ejecutadas. El peritaje contrasta lo ejecutado con el contrato, el presupuesto, la memoria de calidades y la buena práctica constructiva (<b>lex artis</b>)."],
   ["El proceso de reclamación","<b>1 · Reclamación amistosa:</b> un dictamen profesional suele bastar para que la constructora subsane. <b>2 · Mediación</b> con base técnica. <b>3 · Vía judicial:</b> el informe es la prueba pericial clave. Ratificación incluida."]],
   faqs:[["¿Qué plazos establece la LOE?","1 año para defectos de acabado, 3 años para habitabilidad, 10 años para defectos estructurales, desde la recepción de la obra (LOE art. 17)."],["¿Necesito informe para reclamar?","No es obligatorio en fase extrajudicial, pero es la herramienta más efectiva para que la empresa acepte subsanar sin juicio."]]},
  {slug:"contrainforme-pericial",num:"EXP·07",tag:"Análisis crítico",t:"Contrainforme Pericial",norm:"LEC art. 348",
   desc:"Detección de carencias metodológicas y refutación técnica de dictámenes presentados por la parte contraria.",
   lsi:["Refutación técnica","Carencias metodológicas","Pericial contraria","Sana crítica","Juicio oral"],
   body:[["Desmontar el argumento contrario","El contrainforme no elabora un nuevo dictamen sobre la patología: demuestra que las conclusiones del dictamen contrario son <b>incorrectas, incompletas o metodológicamente deficientes</b>."],
   ["Qué se analiza","Rigor metodológico de la inspección · corrección de las referencias normativas (CTE, EHE-08, LOE) · coherencia entre datos y conclusiones · corrección de la cuantificación económica. Un juez que no puede fiarse del perito contrario da mayor crédito al dictamen que sí demuestra solidez."]],
   faqs:[["¿Puede el juez rechazar un informe pericial?","Valora libremente su fuerza probatoria conforme a la sana crítica (LEC art. 348). Un contrainforme sólido merma el peso del dictamen contrario."],["¿Cuánto se tarda?","Entre 10 y 20 días hábiles desde la recepción del informe a refutar. Acelerable con plazo procesal próximo."]]},
  {slug:"naves-industriales",num:"EXP·08",tag:"Industrial · B2B",t:"Naves Industriales",norm:"RSCIEI · TR-34",
   desc:"Pavimentos logísticos, estructuras metálicas, daños post-alquiler y cumplimiento RSCIEI. Para aseguradoras y operadores.",
   lsi:["RSCIEI","Pavimentos logísticos","Daños post-alquiler","Estructura metálica","TR-34","Siniestro industrial"],
   body:[["Peritaje especializado industrial","Las naves logísticas tienen normativa propia. Principales disputas: <b>daños post-alquiler, siniestros de incendio, fallos en pavimentos y cumplimiento RSCIEI</b>."],
   ["Pavimentos logísticos e incendios","Fisuras por retracción o asiento de solera · planitud insuficiente para equipos VNA · juntas mal ejecutadas. Tolerancias conforme a la norma TR-34. En incendios: causa y origen, daño a estructura metálica y verificación del cumplimiento RSCIEI en el momento del siniestro."]],
   faqs:[["¿Qué es el RSCIEI?","El Reglamento de Seguridad Contra Incendios en Establecimientos Industriales (RD 2267/2004). Su incumplimiento es causa frecuente de conflicto en arrendamientos y siniestros."],["¿Qué es un dictamen post-alquiler?","Determina qué daños son uso normal (arrendador) y cuáles imputables al arrendatario por uso indebido o modificaciones no autorizadas."]]},
];

const CASOS=[
  {tag:"Siniestro de incendio",imp:"1,2 M€",t:"Incendio estructural en nave logística",d:"Causa, origen y extensión en 8.000 m². Cuantificación para aseguradora nacional. Ratificado en juzgado.",pills:["Aseguradora","90 días","Ratificado"]},
  {tag:"Obra civil",imp:"2,8 M€",t:"Asiento diferencial en puente de vía rápida",d:"Patologías en hormigón pretensado. Contencioso-administrativo contra constructora.",pills:["AAPP","Litigio C-A","Barcelona"]},
  {tag:"Vicios ocultos",imp:"680 K€",t:"Patologías de envolvente en 120 viviendas",d:"Fachada ventilada, cubierta y carpinterías. Comunidad contra promotora. Resolución favorable.",pills:["Comunidad","2024","Barcelona"]},
  {tag:"Humedades",imp:"340 K€",t:"Filtración por cubierta en plurifamiliar",d:"Termografía. CTE DB-HS. Reparación íntegra a cargo de la constructora.",pills:["Extrajudicial","Granollers"]},
  {tag:"Mala ejecución",imp:"430 K€",t:"Incumplimientos en reforma de local",d:"Partidas no ejecutadas y materiales inferiores a memoria de calidades.",pills:["Despacho","Mediación","BCN"]},
  {tag:"Contrainforme",imp:"920 K€",t:"Refutación en colapso de forjado",d:"Carencias metodológicas en el informe de la aseguradora. Ratificación en juicio oral.",pills:["Juicio oral","Valencia"]},
];
const TESTI=[
  {q:"Su dictamen fue la base de toda nuestra estrategia de negociación. Tan claro y contundente que logramos acuerdo sin ir a juicio.",a:"Socio de Área",r:"Despacho de construcción · Madrid"},
  {q:"Valoro la disponibilidad para ratificar en sala sin demoras y el rigor metodológico del informe.",a:"Directora de Siniestros",r:"Aseguradora multinacional · Barcelona"},
  {q:"El informe de due diligence identificó contingencias que no habíamos previsto. Se amortizó muchas veces.",a:"Director de Inversiones",r:"Family Office · Barcelona"},
];
const FAQS_HOME=[
  ["¿En qué territorios operan?","Sede en Barcelona con operativa en toda España. Desplazamiento a cualquier punto en 24–48h."],
  ["¿Importe mínimo de encargo?","No existe mínimo, pero el encargo es óptimo a partir de 50.000 € en disputa."],
  ["¿La ratificación en sala está incluida?","Sí. Ratificación e interrogatorio cruzado incluidos en honorarios sin sobrecoste."],
  ["¿Plazo de entrega del dictamen?","Entre 20 y 45 días hábiles desde la inspección. Plazo por escrito, garantizado contractualmente."],
  ["¿Perito de parte y perito judicial?","Ambos, nunca en el mismo caso."],
];
const PROTO=[
  {n:"FASE 01",t:"Briefing técnico",d:"Reunión de instrucción con letrado o director de siniestros. Análisis previo de viabilidad sin coste."},
  {n:"FASE 02",t:"Propuesta cerrada",d:"Alcance definido, honorarios fijos y fecha de entrega comprometida por escrito. Sin variables."},
  {n:"FASE 03",t:"Instrucción y dictamen",d:"Inspección, análisis, redacción y revisión interna. Formato técnico-jurídico listo para aportación."},
  {n:"FASE 04",t:"Ratificación incluida",d:"Ratificación en sala e interrogatorio cruzado incluidos en honorarios. Sin sobrecoste."},
];
const TF=[
  {k:"tipo",l:"01 / 05",q:"¿Qué tipo de asunto\ndesea consultar?",h:"Seleccione la categoría de su caso",type:"sel",o:["Informe pericial de parte","Actuación como perito judicial","Patologías o daños estructurales","Humedades y filtraciones","Vicios ocultos en compraventa","Mala ejecución de obra","Contrainforme pericial","Nave industrial o logística","Obra pública","Otro"]},
  {k:"desc",l:"02 / 05",q:"Describa brevemente\nel caso.",h:"Tipo de inmueble, patología, fase del procedimiento",type:"txt",ph:"Ej: edificio residencial con fisuras en forjado, fase previa a demanda…"},
  {k:"imp",l:"03 / 05",q:"¿Importe estimado\nen disputa?",h:"Orientativo — para asignar el equipo adecuado",type:"sel",o:["Menos de 50.000 €","50.000 – 200.000 €","200.000 – 1.000.000 €","Más de 1.000.000 €","No determinado"]},
  {k:"legal",l:"04 / 05",q:"¿Existe representación\nlegal o procedimiento?",h:"",type:"sel",o:["Sí, hay letrado / despacho","Sí, procedimiento judicial abierto","No aún — fase previa","No aplicable"]},
  {k:"con",l:"05 / 05",q:"¿Con quién contactamos?",h:"Respuesta en menos de 24 horas laborables",type:"con"},
];
const TICK=["Informe de Parte","Perito Judicial","Patologías Estructurales","Humedades","Vicios Ocultos","Mala Ejecución","Contrainforme","Naves Industriales","CTE DB-SE","CTE DB-HS","LOE art. 17","LEC art. 347","RSCIEI","ECCAT nº 16448","Toda España"];

/* ── TYPEFORM ─────────────────────────────────── */
function Typeform({onClose}){
  const [s,setS]=useState(0),[a,setA]=useState({}),[c,setC]=useState({n:"",e:"",em:"",t:"",p:false});
  const [err,setErr]=useState(""),[done,setDone]=useState(false),[ld,setLd]=useState(false);
  const st=TF[s],pct=Math.round((s/TF.length)*100);
  const pick=o=>{setA({...a,[st.k]:o});setErr("");setTimeout(()=>setS(x=>x+1),300);};
  const next=()=>{
    if(st.type==="txt"&&!a[st.k]?.trim()){setErr("Describa el caso brevemente.");return;}
    if(st.type==="con"){
      if(!c.n.trim()||!c.em.trim()){setErr("Nombre e email obligatorios.");return;}
      if(!c.p){setErr("Acepte la política de privacidad.");return;}
      setLd(true);setTimeout(()=>{setLd(false);setDone(true);},1100);return;
    }
    setErr("");setS(x=>x+1);
  };
  if(done)return(
    <div className="tfo" onClick={onClose}><div className="tfm au" onClick={e=>e.stopPropagation()} style={{minHeight:340}}>
      <div style={{padding:"3.4rem 2.7rem",textAlign:"center"}}>
        <div style={{fontSize:"2.6rem",marginBottom:"1.1rem"}}>✓</div>
        <div className="fd" style={{fontSize:"1.625rem",fontWeight:700,marginBottom:".6rem"}}>Consulta recibida.</div>
        <p style={{fontSize:".875rem",color:"var(--i6)",lineHeight:1.7,fontWeight:300,marginBottom:"1.8rem"}}>Respuesta en menos de 24 horas laborables.<br/>Urgencias: <b className="fm" style={{color:"var(--t)"}}>+34 614 194 985</b></p>
        <button className="btn-p" onClick={onClose}>Cerrar</button>
      </div>
    </div></div>
  );
  return(
    <div className="tfo" onClick={onClose}><div className="tfm au" onClick={e=>e.stopPropagation()}>
      <div className="tfp"><div className="tfpf" style={{width:pct+"%"}}/></div>
      <button className="tfx" onClick={onClose}>×</button>
      <div className="tfb">
        <div className="tfl">Consulta · {st.l}</div>
        <div className="tfq">{st.q}</div>
        {st.h&&<div className="tfh">{st.h}</div>}
        {st.type==="sel"&&st.o.map((o,i)=>(
          <button key={o} className={"tfopt"+(a[st.k]===o?" sel":"")} onClick={()=>pick(o)}>
            <span className="tfk">{String.fromCharCode(65+i)}</span>{o}
          </button>
        ))}
        {st.type==="txt"&&<>
          <textarea className="tft" placeholder={st.ph} value={a[st.k]||""} onChange={e=>{setA({...a,[st.k]:e.target.value});setErr("");}} autoFocus/>
          <div className="tfa"><button className="tfback" onClick={()=>setS(x=>x-1)}>← Anterior</button><button className="btn-p" onClick={next}>Continuar →</button></div>
        </>}
        {st.type==="con"&&<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem 1.5rem"}}>
            <input className="tfi" placeholder="Nombre y apellidos" value={c.n} onChange={e=>setC({...c,n:e.target.value})}/>
            <input className="tfi" placeholder="Empresa / Despacho" value={c.e} onChange={e=>setC({...c,e:e.target.value})}/>
            <input className="tfi" type="email" placeholder="Email profesional" value={c.em} onChange={e=>setC({...c,em:e.target.value})}/>
            <input className="tfi" type="tel" placeholder="Teléfono (opcional)" value={c.t} onChange={e=>setC({...c,t:e.target.value})}/>
          </div>
          <label className="tfpriv"><input type="checkbox" checked={c.p} onChange={e=>setC({...c,p:e.target.checked})}/><span>He leído y acepto la <b style={{color:"var(--t)"}}>Política de Privacidad</b>. Datos tratados exclusivamente para esta consulta.</span></label>
          <div className="tfa"><button className="tfback" onClick={()=>setS(x=>x-1)}>← Anterior</button>
            <button className="btn-p" onClick={next} disabled={ld}>{ld?<><span className="spin" style={{width:13,height:13,border:"2px solid rgba(255,255,255,.4)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",marginRight:".5rem"}}/>Enviando…</>:"Enviar consulta →"}</button>
          </div>
        </>}
        {err&&<div className="tferr">⚠ {err}</div>}
      </div>
    </div></div>
  );
}

/* ── SHARED ────────────────────────────────────── */
const Ticker=()=>(
  <div className="ticker" aria-hidden="true"><div className="ti tick">{[...TICK,...TICK].map((t,i)=><div key={i} className="tit"><span className="dot"/>{t}</div>)}</div></div>
);
const Band=({h,em,s,btn,open})=>(
  <div className="cta-band">
    <h2 className="cta-h">{h}{em&&<><br/><em>{em}</em></>}</h2>
    {s&&<div className="cta-s">{s}</div>}
    <button className="btn-w" onClick={open}>{btn||"Consultar caso"}</button>
  </div>
);
const FaqBlock=({items})=>{
  const [o,setO]=useState(null);
  return(<div>{items.map((f,i)=>(
    <div key={i} className="faq-item">
      <button className="faq-btn" onClick={()=>setO(o===i?null:i)}>
        <span className="faq-q">{f[0]}</span>
        <span className="faq-ic" style={{transform:o===i?"rotate(45deg)":""}}>{o===i?"×":"+"}</span>
      </button>
      {o===i&&<div className="faq-a au">{f[1]}</div>}
    </div>
  ))}</div>);
};
/* Caja de cualificación sticky — mecanismo del Expediente en piel v5 */
const Qual=({label,open,cta,note,items})=>(
  <div className="qual">
    <div className="q-h">{label||"CUALIFICACIÓN DEL CASO"}</div>
    <div className="q-v">Consulta sin coste</div>
    {(items||PROTO.map((p,i)=>[String(i+1).padStart(2,"0"),p.t,p.d])).map(([n,t,d],i)=>(
      <div key={i} className="q-li"><b>{n}</b><span>{t&&d?<><span className="q-st">{t}</span>{d}</>:t}</span></div>
    ))}
    <button className="btn-p" style={{width:"100%",marginTop:"1.3rem"}} onClick={open}>{cta||"Consultar caso →"}</button>
    <div className="q-note">{note||"Ratificación incluida · Toda España"}</div>
  </div>
);

/* ── NAV / FOOTER ─────────────────────────────── */
function Nav({page,go,open}){
  return(<nav><div className="ni">
    <span className="logo" onClick={()=>go("home")}>Perito<span>.Barcelona</span></span>
    <div className="nlinks">
      <button className={"nl"+(page==="construccion"?" on":"")} onClick={()=>go("construccion")}>Perito Construcción</button>
      <div className="dd">
        <button className={"nl"+(page.startsWith("svc")||page==="informes"?" on":"")} onClick={()=>go("informes")}>Dictámenes Técnicos ▾</button>
        <div className="ddm">{SVCS.map(s=>(
          <div key={s.slug} className="ddi" onClick={()=>go("svc-"+s.slug)}>
            <span className="ddi-n">{s.num}</span><span className="ddi-t">{s.t}</span>
          </div>))}
        </div>
      </div>
      <button className={"nl"+(page==="casos"?" on":"")} onClick={()=>go("casos")}>Casos</button>
      <button className={"nl"+(page==="abogados"?" on":"")} onClick={()=>go("abogados")}>Abogados·Seguros</button>
      <button className={"nl"+(page==="honorarios"?" on":"")} onClick={()=>go("honorarios")}>Honorarios</button>
      <button className={"nl"+(page==="despacho"?" on":"")} onClick={()=>go("despacho")}>Despacho</button>
      <button className="btn-p" style={{fontSize:".72rem",padding:".6rem 1.2rem"}} onClick={open}>Consultar caso</button>
    </div>
  </div></nav>);
}
function Footer({go}){
  return(<footer><div className="fi2">
    <div className="fg">
      <div>
        <div className="flogo">Perito<span>.Barcelona</span></div>
        <div className="ftext">Ingeniería forense en dictámenes periciales para litigios de alta cuantía en edificación y obra civil. Toda España.</div>
        <div className="fcred">Albert Vilardell Serra · Ingeniero Civil<br/>ECCAT nº 16448 · Perito Judicial (MJusticia)<br/>Perito de Seguros IRD · INESE</div>
      </div>
      <div><div className="fctit">Dictámenes</div>{SVCS.map(s=><button key={s.slug} className="flink" onClick={()=>go("svc-"+s.slug)}>{s.t}</button>)}</div>
      <div><div className="fctit">Despacho</div>
        {[["Perito Construcción","construccion"],["Casos de Referencia","casos"],["Abogados y Seguros","abogados"],["Honorarios","honorarios"],["El Despacho","despacho"],["Contacto","contacto"]].map(([l,p])=>
          <button key={p} className="flink" onClick={()=>go(p)}>{l}</button>)}
      </div>
      <div><div className="fctit">Sedes</div>
        <div className="fnap">Carrer de Numància, 95, Local 5<br/>08029 Barcelona<br/><br/>Carrer Navarra, 14<br/>08401 Granollers<br/><br/>+34 614 194 985<br/>info@perito.barcelona</div>
      </div>
    </div>
    <div className="fbot">
      <span className="fcp">© 2026 perito.barcelona · Aviso legal · Privacidad · Cookies</span>
      <span className="fsc">Ingeniería Forense · Toda España</span>
    </div>
  </div></footer>);
}

/* ── HOME ─────────────────────────────────────── */
function Home({go,open}){
  return(<>
    <div className="hero">
      <div className="eyebrow">Ingeniería Forense — Toda España</div>
      <h1 className="h1">Peritaje para quien<br/>no puede permitirse<br/><em>un mal informe.</em></h1>
      <p className="hsub">Dictámenes periciales en edificación y obra civil. Para aseguradoras, despachos de abogados y administraciones que necesitan un informe que se sostenga en sala.</p>
      <div className="hctas">
        <button className="btn-p" onClick={open}>Consultar caso</button>
        <button className="btn-g" onClick={()=>go("casos")}>Casos de referencia</button>
        <span className="htel">+34 614 194 985</span>
      </div>
    </div>
    <Ticker/>
    <div className="stats">
      {[["DAT·01",">120","M€","Importe total peritado","Acumulado en dictámenes"],
        ["DAT·02","+400","","Dictámenes emitidos","Edificación y obra civil"],
        ["DAT·03","97","%","Ratificados en sede judicial","Sin impugnación de fondo"],
        ["DAT·04","24","–48h","Desplazamiento nacional","Sede Barcelona · toda España"]].map(([n,v,u,l,s])=>(
        <div key={n} className="sc"><span className="sc-n">{n}</span>
          <div className="sn">{v}<span>{u}</span></div><div className="sl">{l}</div><div className="ss">{s}</div>
        </div>
      ))}
    </div>

    <section className="sec">
      <div className="sh"><div>
        <div className="eyebrow">Clientes de referencia</div>
        <h2 className="st">Trabajamos con profesionales<br/><em>que no admiten margen de error</em></h2>
      </div></div>
      <div className="tgrid">
        {[["Dossier A — Sector jurídico","Despachos de Abogados Especializados","Perito de parte o consultor técnico en procedimientos y arbitrajes. Honorarios fijos, plazos garantizados, ratificación conforme a la LEC art. 347.",["Dº Construcción","Resp. Civil","LEC art. 347"],"abogados"],
          ["Dossier B — Sector asegurador","Aseguradoras y Reaseguradoras","Valoración independiente de siniestros complejos: causa, alcance y cuantificación. Contrapericia. Colaboración en siniestros concurrentes.",["Grandes Riesgos","Multirriesgo","IRD"],"abogados"],
          ["Dossier C — Promotor · AAPP","Promotoras, Constructoras y AAPP","Auditoría pre-litigio, due diligence en compraventa de activos y dictámenes para contencioso-administrativo. Interlocución técnica directa.",["Due Diligence","C-A","LCSP"],null]].map(([n,t,d,tags,dest],i)=>(
          <div key={i} className="tc">
            <div className="tc-n">{n}</div><div className="tc-t">{t}</div><div className="tc-d">{d}</div>
            <div className="tc-tags">{tags.map(x=><span key={x} className="tc-tag">{x}</span>)}</div>
            <button className="tc-cta" onClick={()=>dest?go(dest):open()}>{dest?"Ver protocolo B2B →":"Consultar caso →"}</button>
          </div>
        ))}
      </div>
    </section>

    <section className="sec" style={{paddingTop:0}}>
      <div className="sh"><div>
        <div className="eyebrow">Índice de dictámenes</div>
        <h2 className="st">Dictámenes técnicos<br/><em>de alta especialización</em></h2>
      </div><button className="btn-g" onClick={()=>go("informes")}>Ver catálogo →</button></div>
      <div>
        <div className="srow" onClick={()=>go("construccion")}>
          <span className="snum">SILO·1</span>
          <div><div className="stag">Intención · Persona</div><div className="st2">Perito de Construcción en Barcelona</div>
          <div className="sd">Vicios ocultos, mala ejecución, patologías y humedades. Para particulares, comunidades y empresas.</div></div>
          <span className="snorm">CTE · LOE · CC 1484</span><span className="sarr">→</span>
        </div>
        {SVCS.slice(0,6).map(s=>(
          <div key={s.slug} className="srow" onClick={()=>go("svc-"+s.slug)}>
            <span className="snum">{s.num}</span>
            <div><div className="stag">{s.tag}</div><div className="st2">{s.t}</div><div className="sd">{s.desc}</div></div>
            <span className="snorm">{s.norm}</span><span className="sarr">→</span>
          </div>
        ))}
      </div>
    </section>

    <div className="proto"><div className="proto-in">
      <div className="eyebrow" style={{color:"rgba(204,251,241,.6)"}}>Protocolo de encargo</div>
      <h2 className="st" style={{color:"#fff"}}>Cómo trabajamos</h2>
      <div className="pgrid">{PROTO.map(p=>(
        <div key={p.n} className="ps"><div className="psn">{p.n}</div><div className="pst">{p.t}</div><div className="psd">{p.d}</div></div>
      ))}</div>
    </div></div>

    <section className="sec">
      <div className="sh"><div>
        <div className="eyebrow">Casos de referencia</div>
        <h2 className="st">Dictámenes de<br/><em>alta cuantía resueltos</em></h2>
      </div><button className="btn-g" onClick={()=>go("casos")}>Ver todos →</button></div>
      <div className="cgrid">{CASOS.map((c,i)=>(
        <div key={i} className="cc">
          <div className="ctag">{c.tag}</div><div className="cimp">{c.imp}</div>
          <div className="ctit">{c.t}</div><div className="cdesc">{c.d}</div>
          <div className="cpills">{c.pills.map(p=><span key={p} className="cp">{p}</span>)}</div>
        </div>
      ))}</div>
    </section>

    <div style={{background:"var(--p)",borderTop:"1px solid var(--b)"}}>
      <section className="sec">
        <div className="sh"><div>
          <div className="eyebrow">Clientes</div>
          <h2 className="st">Lo que dicen quienes<br/><em>trabajan con nosotros</em></h2>
        </div></div>
        <div className="tgr">{TESTI.map((t,i)=>(
          <div key={i} className="tcard"><div className="tq">"{t.q}"</div><div className="ta">{t.a}</div><div className="tr">{t.r}</div></div>
        ))}</div>
      </section>
    </div>

    <section className="sec">
      <div className="sh"><div>
        <div className="eyebrow">Preguntas frecuentes</div>
        <h2 className="st">Dudas habituales</h2>
      </div></div>
      <div style={{maxWidth:760}}><FaqBlock items={FAQS_HOME}/></div>
    </section>

    <Band h="¿Necesita un dictamen" em="que se sostenga en sala?" s="Respuesta técnica en menos de 24 horas laborables" btn="Solicitar consulta técnica" open={open}/>
  </>);
}

/* ── PAGE HERO ────────────────────────────────── */
const PHero=({bc,go,h1,sub})=>(
  <div className="ph">
    <div className="bc"><span onClick={()=>go("home")}>Inicio</span> / {bc}</div>
    <h1 className="ph-h1" dangerouslySetInnerHTML={{__html:h1}}/>
    <p className="ph-sub">{sub}</p>
  </div>
);

/* ── CONSTRUCCIÓN ─────────────────────────────── */
function Construccion({go,open}){
  return(<>
    <PHero go={go} bc={<b>Construcción</b>} h1='Perito de Construcción<br/><em>en Barcelona</em>'
      sub="Dictámenes técnicos para documentar defectos constructivos, incumplimientos contractuales o patologías en edificios y obras. Barcelona y toda España."/>
    <Ticker/>
    <section className="sec">
      <div className="sgrid">
        <div>
          <h3 className="body-h3">El técnico que diferencia el defecto del argumento</h3>
          <p className="body-p">Un perito de construcción no solo describe lo que ve en una inspección. Analiza el fallo desde la raíz — proyecto, dirección facultativa o ejecución — y lo traduce en un dictamen con estructura jurídica capaz de ser ratificado ante un tribunal.</p>
          <p className="body-p">La diferencia entre ganar o perder un procedimiento civil por defectos constructivos suele reducirse a la solidez del informe pericial aportado como prueba, conforme a la Ley de Enjuiciamiento Civil, art. 335.</p>
          <p className="body-p">Atendemos tanto a <b>particulares</b> con disputas en su vivienda — vicios ocultos tras la compra, reformas mal ejecutadas, humedades sin resolver — como a <b>empresas, comunidades de propietarios y despachos</b> que necesitan un dictamen con validez judicial. La titulación de Ingeniero Civil (ECCAT nº 16448) permite analizar estructura y cimentación con una profundidad diferente a la de otros técnicos.</p>
          <h3 className="body-h3">Ámbito de actuación</h3>
          <div>{SVCS.filter(s=>["vicios-ocultos","reclamacion-mala-ejecucion","patologias-estructurales","humedades-filtraciones","contrainforme-pericial","naves-industriales"].includes(s.slug)).map(s=>(
            <div key={s.slug} className="srow" onClick={()=>go("svc-"+s.slug)} style={{gridTemplateColumns:"1fr 150px 36px"}}>
              <div><div className="st2" style={{fontSize:".95rem",marginBottom:0}}>{s.t}</div></div>
              <span className="snorm">{s.norm}</span><span className="sarr">→</span>
            </div>
          ))}</div>
        </div>
        <Qual open={open}
          items={[["✓","Análisis previo de viabilidad técnica"],["✓","Presupuesto cerrado antes del encargo"],["✓","Ratificación en sala incluida"],["✓","Desplazamiento a toda España 24–48h"]]}
          note="+34 614 194 985 · Respuesta 24h"/>
      </div>
    </section>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sh"><div><div className="eyebrow">Casos en construcción</div><h2 className="st">Referencias</h2></div></div>
      <div className="cgrid">{CASOS.slice(2,5).map((c,i)=>(
        <div key={i} className="cc"><div className="ctag">{c.tag}</div><div className="cimp">{c.imp}</div><div className="ctit">{c.t}</div><div className="cdesc">{c.d}</div></div>
      ))}</div>
    </section>
    <Band h="¿Tiene un problema constructivo" em="que necesita documentar?" s="Consulta inicial sin coste" open={open}/>
  </>);
}

/* ── INFORMES HUB ─────────────────────────────── */
function Informes({go,open}){
  return(<>
    <PHero go={go} bc={<b>Informes Periciales</b>} h1='Informes Periciales de<br/><em>Edificación y Obra Civil</em>'
      sub="Ocho especialidades técnico-legales para la resolución de disputas complejas. Metodología científica e independiente, preparada para ratificación oral conforme a la LEC."/>
    <Ticker/>
    <section className="sec">
      <div>{SVCS.map(s=>(
        <div key={s.slug} className="srow" onClick={()=>go("svc-"+s.slug)}>
          <span className="snum">{s.num}</span>
          <div><div className="stag">{s.tag}</div><div className="st2">{s.t}</div><div className="sd">{s.desc}</div></div>
          <span className="snorm">{s.norm}</span><span className="sarr">→</span>
        </div>
      ))}</div>
    </section>
    <Band h="¿No identifica su caso en el índice?" s="Descríbanoslo — le orientamos sin coste" open={open}/>
  </>);
}

/* ── SERVICE CHILD ────────────────────────────── */
function Svc({svc,go,open}){
  return(<>
    <PHero go={go} bc={<><span onClick={()=>go("informes")}>Informes</span> / <b>{svc.num}</b></>}
      h1={`${svc.t} <em style="display:block;font-size:.55em;margin-top:.3em">${svc.tag}</em>`}
      sub={svc.desc}/>
    <section className="sec" style={{paddingTop:"1.5rem"}}>
      <div className="sgrid">
        <div>
          <div className="nchips">{svc.lsi.map(l=><span key={l} className="nchip">{l}</span>)}</div>
          {svc.body.map(([h,p],i)=>(
            <div key={i}><h3 className="body-h3">{h}</h3><p className="body-p" dangerouslySetInnerHTML={{__html:p}}/></div>
          ))}
          <h3 className="body-h3">Preguntas frecuentes</h3>
          <FaqBlock items={svc.faqs}/>
        </div>
        <Qual label={`Expediente · ${svc.num}`} open={open} cta="Consultar este dictamen →"/>
      </div>
    </section>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sh"><div><div className="eyebrow">Otros dictámenes</div><h2 className="st">Relacionados</h2></div></div>
      <div>{SVCS.filter(x=>x.slug!==svc.slug).slice(0,4).map(s=>(
        <div key={s.slug} className="srow" onClick={()=>go("svc-"+s.slug)} style={{gridTemplateColumns:"80px 1fr 150px 36px"}}>
          <span className="snum">{s.num}</span>
          <div><div className="st2" style={{fontSize:".95rem",marginBottom:0}}>{s.t}</div></div>
          <span className="snorm">{s.norm}</span><span className="sarr">→</span>
        </div>
      ))}</div>
    </section>
    <Band h="¿Necesita este dictamen?" s="Consulta inicial sin coste · Plazo por contrato" open={open}/>
  </>);
}

/* ── CASOS ────────────────────────────────────── */
function Casos({go,open}){
  return(<>
    <PHero go={go} bc={<b>Casos</b>} h1='Dictámenes de<br/><em>alta cuantía resueltos</em>'
      sub="Selección de casos resueltos en edificación, obra civil y siniestros industriales. Importes y detalles anonimizados para preservar la confidencialidad de las partes."/>
    <section className="sec">
      <div className="cgrid">{CASOS.map((c,i)=>(
        <div key={i} className="cc"><div className="ctag">{c.tag}</div><div className="cimp">{c.imp}</div><div className="ctit">{c.t}</div><div className="cdesc">{c.d}</div>
        <div className="cpills">{c.pills.map(p=><span key={p} className="cp">{p}</span>)}</div></div>
      ))}</div>
    </section>
    <Band h="¿Tiene un caso similar?" s="Consulta sin compromiso" open={open}/>
  </>);
}

/* ── ABOGADOS B2B ─────────────────────────────── */
function Abogados({go,open}){
  return(<>
    <PHero go={go} bc={<b>B2B</b>} h1='Servicio técnico para<br/><em>despachos y aseguradoras</em>'
      sub="Protocolo de colaboración B2B para despachos especializados en construcción y compañías aseguradoras que necesitan un perito de parte independiente."/>
    <Ticker/>
    <section className="sec">
      <div className="sgrid" style={{gridTemplateColumns:"1fr 1fr"}}>
        {[["Protocolo A — Despachos","Para Despachos de Abogados",["Informe preliminar de viabilidad técnica en 48 horas","Honorarios fijos pactados por escrito","Ratificación garantizada (LEC art. 347) incluida","Múltiples procedimientos simultáneos","Informe de avance periódico al letrado"]],
          ["Protocolo B — Aseguradoras","Para Aseguradoras y Reaseguradoras",["Valoración de causa, alcance y cuantía del siniestro","Contrapericia frente al perito del asegurado","Colaboración en siniestros concurrentes","Certificación IRD — INESE Insurance School","Interlocución directa con dirección de siniestros"]]].map(([n,t,items],i)=>(
          <div key={i} className="qual" style={{position:"static"}}>
            <div className="q-h">{n}</div>
            <div className="q-v" style={{fontSize:"1.4rem"}}>{t}</div>
            {items.map(x=><div key={x} className="q-li"><b>✓</b>{x}</div>)}
            <button className="btn-p" style={{width:"100%",marginTop:"1.3rem"}} onClick={open}>Iniciar colaboración →</button>
          </div>
        ))}
      </div>
    </section>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sh"><div><div className="eyebrow">Declaraciones B2B</div><h2 className="st">Referencias</h2></div></div>
      <div className="tgr">{TESTI.map((t,i)=>(
        <div key={i} className="tcard"><div className="tq">"{t.q}"</div><div className="ta">{t.a}</div><div className="tr">{t.r}</div></div>
      ))}</div>
    </section>
    <Band h="¿Su despacho necesita" em="un perito de parte solvente?" s="Informe de viabilidad en 48 horas · Sin compromiso" btn="Iniciar colaboración" open={open}/>
  </>);
}

/* ── HONORARIOS ───────────────────────────────── */
function Honorarios({go,open}){
  return(<>
    <PHero go={go} bc={<b>Honorarios</b>} h1='Honorarios de<br/><em>informes periciales</em>'
      sub="Honorarios fijos acordados antes del inicio del encargo. Sin costes variables ni sorpresas. La ratificación en sala está incluida sin sobrecoste."/>
    <section className="sec">
      <div className="sgrid">
        <div>
          <h3 className="body-h3">Presupuesto cerrado antes del inicio</h3>
          <p className="body-p">No se utiliza una tarifa estándar porque cada caso es técnicamente diferente. El coste depende de la complejidad, el número de visitas, los ensayos requeridos y el alcance del análisis. Tras analizar la documentación inicial, se emite una propuesta técnica con honorarios fijos cerrados.</p>
          <h3 className="body-h3">Qué incluye el presupuesto</h3>
          <p className="body-p"><b>Inspección</b> del inmueble o infraestructura · <b>análisis</b> de la documentación técnica · <b>redacción</b> y maquetación del dictamen · <b>revisión interna</b> y control de calidad · <b>ratificación en sede judicial</b> e interrogatorio cruzado · <b>desplazamientos</b> en toda España.</p>
          <p className="body-p">No hay costes adicionales posteriores al presupuesto acordado.</p>
        </div>
        <Qual label="Factores de coste" open={open} cta="Solicitar presupuesto →" note="Primera consulta sin coste"
          items={[["01","Tipo de dictamen — parte, judicial o contrainforme"],["02","Complejidad técnica del caso"],["03","Número de visitas de inspección"],["04","Ensayos — termografía, testigos, FEM"],["05","Alcance geográfico"],["06","Urgencia del plazo"]]}/>
      </div>
    </section>
    <Band h="¿Quiere saber cuánto costaría su informe?" s="Primera consulta sin coste" btn="Solicitar presupuesto" open={open}/>
  </>);
}

/* ── DESPACHO ─────────────────────────────────── */
function Despacho({go,open}){
  return(<>
    <PHero go={go} bc={<b>El Despacho</b>} h1='Albert Vilardell Serra<br/><em>Ingeniero Civil · Perito Judicial</em>'
      sub="Despacho de ingeniería forense fundado en Barcelona. Más de 15 años en peritaje de edificación, obra civil y siniestros complejos para el mercado legal y asegurador."/>
    <section className="sec">
      <div className="sgrid">
        <div>
          <h3 className="body-h3">Especialización, no generalismo</h3>
          <p className="body-p">Este despacho no acepta cualquier encargo. La especialización en dictámenes para litigios de alta cuantía implica rechazar casos que no se ajustan al perfil de trabajo y concentrar los recursos en los asuntos donde el impacto técnico es determinante.</p>
          <p className="body-p">La independencia técnica y la solvencia del dictamen son el único activo. No se trabaja en exclusiva para ninguna aseguradora ni se depende de ninguna constructora.</p>
          <h3 className="body-h3">Principios de trabajo</h3>
          <p className="body-p"><b>Independencia técnica</b> — innegociable, sin exclusivas. <b>Plazos por contrato</b> — si no se puede garantizar, no se acepta el encargo. <b>Honorarios fijos</b> — acordados antes del inicio, ratificación incluida. <b>Claridad técnica</b> — un dictamen que no se entiende en sala no tiene valor.</p>
        </div>
        <Qual label="Habilitación profesional" open={open} cta="Consultar disponibilidad →" note="L–J 9h–18h · V 9h–14h · Cita previa"
          items={[["TÍT","Ingeniero Civil — ETSECCPB · UPC"],["COL","ECCAT nº 16448"],["JUD","Perito Judicial — Ministerio de Justicia"],["IRD","Perito de Seguros — INESE Insurance School"],["BCN","C. de Numància, 95, Local 5 · 08029 Barcelona"],["GRA","C. Navarra, 14 · 08401 Granollers"]]}/>
      </div>
    </section>
    <Band h="¿Necesita un perito con esta formación?" open={open}/>
  </>);
}

/* ── CONTACTO ─────────────────────────────────── */
function Contacto({go,open}){
  return(<>
    <PHero go={go} bc={<b>Contacto</b>} h1='Solicitar<br/><em>consulta técnica</em>'
      sub="Primera valoración sin coste. Respuesta en menos de 24 horas laborables. Para asuntos urgentes, contacto directo por teléfono."/>
    <section className="sec">
      <div className="sgrid">
        <div>
          <h3 className="body-h3">Canales</h3>
          <p className="body-p fm" style={{fontSize:"1rem",fontWeight:500,color:"var(--i)"}}>+34 614 194 985<br/>info@perito.barcelona</p>
          <h3 className="body-h3">Sedes</h3>
          <p className="body-p"><b>Barcelona (principal)</b><br/>Carrer de Numància, 95, Local 5 · 08029 Barcelona<br/>Con cita previa · L–J 9h–18h · V 9h–14h</p>
          <p className="body-p"><b>Granollers</b><br/>Carrer Navarra, 14 · 08401 Granollers<br/>Con cita previa</p>
          <h3 className="body-h3">Confidencialidad</h3>
          <p className="body-p">Toda la información de la consulta inicial se trata con estricta confidencialidad conforme al RGPD (Reglamento UE 2016/679), exclusivamente para la gestión de la consulta.</p>
        </div>
        <Qual label="Consulta guiada" open={open} cta="Iniciar consulta guiada →" note="Confidencial · Sin compromiso"
          items={[["01","Tipo de asunto"],["02","Descripción breve"],["03","Importe en disputa"],["04","Situación procesal"],["05","Datos de contacto"]]}/>
      </div>
    </section>
  </>);
}

/* ── APP ──────────────────────────────────────── */
export default function App(){
  const [page,setPage]=useState("home");
  const [form,setForm]=useState(false);
  const go=p=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"});};
  const open=()=>setForm(true);
  const svc=page.startsWith("svc-")?SVCS.find(s=>s.slug===page.slice(4)):null;
  return(<>
    <style>{CSS}</style>
    <Nav page={page} go={go} open={open}/>
    <main>
      {page==="home"&&<Home go={go} open={open}/>}
      {page==="construccion"&&<Construccion go={go} open={open}/>}
      {page==="informes"&&<Informes go={go} open={open}/>}
      {svc&&<Svc svc={svc} go={go} open={open}/>}
      {page==="casos"&&<Casos go={go} open={open}/>}
      {page==="abogados"&&<Abogados go={go} open={open}/>}
      {page==="honorarios"&&<Honorarios go={go} open={open}/>}
      {page==="despacho"&&<Despacho go={go} open={open}/>}
      {page==="contacto"&&<Contacto go={go} open={open}/>}
    </main>
    <Footer go={go}/>
    {form&&<Typeform onClose={()=>setForm(false)}/>}
  </>);
}

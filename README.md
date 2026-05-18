<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Performing Resistance</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #f0e8d8;
    --rust: #c2410c;
    --gold: #b45309;
    --smoke: #1a1714;
    --char: #0d0b09;
    --ash: #2d2925;
    --fog: #6b6560;
    --paper: #e8dcc8;
  }

  html, body {
    width: 100%; height: 100%;
    background: var(--char);
    overflow: hidden;
    font-family: 'Cormorant Garamond', serif;
    cursor: none;
  }

  .cursor {
    position: fixed;
    width: 8px; height: 8px;
    background: var(--rust);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s;
    mix-blend-mode: normal;
  }

  #slideshow {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .slide {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: none;
    overflow: hidden;
  }

  .slide.active {
    opacity: 1;
    pointer-events: all;
  }

  .slide.entering { animation: slideEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .slide.exiting  { animation: slideExit  0.7s cubic-bezier(0.4, 0, 1, 1) forwards; }

  @keyframes slideEnter {
    from { opacity: 0; transform: translateY(40px) scale(0.97); filter: blur(6px); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
  }
  @keyframes slideExit {
    from { opacity: 1; transform: translateY(0)     scale(1);    filter: blur(0); }
    to   { opacity: 0; transform: translateY(-30px) scale(1.02); filter: blur(4px); }
  }

  /* ─── GRAIN OVERLAY ─── */
  #grain {
    position: fixed; inset: 0; z-index: 100;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px;
    opacity: 0.35;
  }

  /* ─── PROGRESS BAR ─── */
  #progress {
    position: fixed;
    bottom: 0; left: 0;
    height: 2px;
    background: var(--rust);
    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 200;
  }

  /* ─── SLIDE NUMBER ─── */
  #counter {
    position: fixed;
    bottom: 1.5rem; right: 2rem;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--fog);
    z-index: 200;
    letter-spacing: 0.1em;
  }

  /* ─── NAV HINTS ─── */
  #nav-hint {
    position: fixed;
    bottom: 1.5rem; left: 2rem;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--fog);
    z-index: 200;
    opacity: 0.6;
  }

  /* ─── TYPOGRAPHY ─── */
  .label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--rust);
    margin-bottom: 1.5rem;
  }

  .title-xl {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 700;
    color: var(--cream);
    line-height: 1.05;
    text-align: center;
  }

  .title-xl em {
    font-style: italic;
    color: var(--paper);
    opacity: 0.7;
  }

  .title-lg {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--cream);
    line-height: 1.1;
    text-align: center;
  }

  .title-lg em { font-style: italic; color: var(--paper); }

  .title-md {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3.5vw, 2.8rem);
    font-weight: 400;
    font-style: italic;
    color: var(--paper);
    line-height: 1.2;
    text-align: center;
  }

  .body-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 300;
    color: var(--paper);
    opacity: 0.8;
    line-height: 1.7;
    text-align: center;
    max-width: 700px;
  }

  .quote-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 3vw, 2.2rem);
    font-style: italic;
    font-weight: 400;
    color: var(--cream);
    line-height: 1.4;
    text-align: center;
    max-width: 750px;
  }

  .quote-attr {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: var(--rust);
    margin-top: 1.5rem;
    text-transform: uppercase;
  }

  .divider {
    width: 60px;
    height: 1px;
    background: var(--rust);
    margin: 1.5rem auto;
    opacity: 0.6;
  }

  /* ─── KEYWORD CLOUD ─── */
  .keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    justify-content: center;
    max-width: 800px;
  }

  .kw {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color: var(--paper);
    opacity: 0.5;
    transition: opacity 0.3s;
  }
  .kw:nth-child(1) { font-size: 2.8rem; opacity: 0.9; color: var(--cream); }
  .kw:nth-child(2) { font-size: 1.4rem; opacity: 0.6; }
  .kw:nth-child(3) { font-size: 2.2rem; opacity: 0.75; }
  .kw:nth-child(4) { font-size: 1.8rem; opacity: 0.65; }
  .kw:nth-child(5) { font-size: 3.2rem; opacity: 0.85; color: var(--cream); }
  .kw:nth-child(6) { font-size: 1.2rem; opacity: 0.5; }
  .kw:nth-child(7) { font-size: 2rem; opacity: 0.7; }

  /* ─── PILLARS ─── */
  .pillars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    max-width: 800px;
    width: 90%;
    border: 1px solid rgba(255,255,255,0.06);
  }

  .pillar {
    padding: 2rem 1.5rem;
    border: 1px solid rgba(255,255,255,0.06);
    text-align: center;
  }

  .pillar-num {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--rust);
    letter-spacing: 0.3em;
    display: block;
    margin-bottom: 0.75rem;
  }

  .pillar-word {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-style: italic;
    color: var(--cream);
  }

  /* ─── VERTICAL LIST ─── */
  .v-list {
    list-style: none;
    text-align: left;
    max-width: 600px;
    width: 90%;
  }

  .v-list li {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 300;
    color: var(--paper);
    opacity: 0.8;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  .v-list li::before {
    content: '—';
    color: var(--rust);
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  /* ─── SLIDE BACKGROUNDS ─── */
  .bg-char   { background: var(--char); }
  .bg-smoke  { background: var(--smoke); }
  .bg-ash    { background: var(--ash); }

  .bg-texture {
    background-color: var(--char);
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(194,65,12,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(180,83,9,0.05) 0%, transparent 50%);
  }

  .bg-rust-accent {
    background-color: var(--char);
    position: relative;
  }

  .bg-rust-accent::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: var(--rust);
  }

  /* ─── SPECIAL ELEMENTS ─── */
  .stage-line {
    width: 100px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--rust), transparent);
    margin: 2rem auto;
  }

  .spotlight {
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(194,65,12,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ─── MEME SLIDE ─── */
  .meme-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    max-width: 700px;
  }

  .meme-img-area {
    width: 420px;
    height: 280px;
    background: var(--ash);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .meme-top, .meme-bottom {
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    font-size: 1.4rem;
    color: white;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black;
    position: absolute;
    left: 1rem; right: 1rem;
    letter-spacing: 0.05em;
    line-height: 1.2;
  }

  .meme-top { top: 0.75rem; }
  .meme-bottom { bottom: 0.75rem; }

  .meme-face {
    font-size: 7rem;
    line-height: 1;
    filter: grayscale(1) contrast(1.2);
  }

  .meme-caption {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--fog);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-align: center;
  }

  /* ─── TRANSITION VARIANTS ─── */
  .slide.curtain-enter { animation: curtainEnter 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .slide.curtain-exit  { animation: curtainExit  0.7s ease-in forwards; }

  @keyframes curtainEnter {
    from { clip-path: inset(0 100% 0 0); opacity: 1; }
    to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
  }

  @keyframes curtainExit {
    from { clip-path: inset(0 0% 0 0);   opacity: 1; }
    to   { clip-path: inset(0 0% 0 100%); opacity: 1; }
  }

  /* ─── TEXT REVEAL ─── */
  .reveal { opacity: 0; transform: translateY(20px); }
  .revealed { animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes revealUp {
    to { opacity: 1; transform: translateY(0); }
  }

  .delay-1 { animation-delay: 0.15s; }
  .delay-2 { animation-delay: 0.3s; }
  .delay-3 { animation-delay: 0.45s; }
  .delay-4 { animation-delay: 0.6s; }
  .delay-5 { animation-delay: 0.75s; }
  .delay-6 { animation-delay: 0.9s; }

  /* ─── SCAN LINE ─── */
  .scanline {
    position: absolute;
    left: 0; right: 0; height: 2px;
    background: rgba(194,65,12,0.4);
    animation: scan 3s linear infinite;
    pointer-events: none;
  }

  @keyframes scan {
    from { top: -2px; }
    to   { top: 100%; }
  }

  /* ─── LARGE BG TEXT ─── */
  .ghost-text {
    position: absolute;
    font-family: 'Playfair Display', serif;
    font-size: clamp(8rem, 20vw, 18rem);
    font-weight: 700;
    font-style: italic;
    color: rgba(255,255,255,0.025);
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }

  /* ─── THESIS BOX ─── */
  .thesis-box {
    border: 1px solid rgba(194,65,12,0.4);
    padding: 2.5rem 3rem;
    max-width: 750px;
    position: relative;
  }

  .thesis-box::before, .thesis-box::after {
    content: '';
    position: absolute;
    width: 20px; height: 20px;
    border-color: var(--rust);
    border-style: solid;
    opacity: 0.6;
  }

  .thesis-box::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
  .thesis-box::after  { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

  /* ─── BODY POLITICAL ─── */
  .body-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    max-width: 700px;
    width: 90%;
  }

  .body-cell {
    padding: 1.5rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    text-align: center;
  }

  .body-cell-word {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-style: italic;
    color: var(--cream);
    display: block;
    margin-bottom: 0.4rem;
  }

  .body-cell-sub {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rust);
  }

  /* ─── FINAL SLIDE ─── */
  .final-line {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 3vw, 2rem);
    font-style: italic;
    font-weight: 400;
    color: var(--cream);
    text-align: center;
    max-width: 650px;
    line-height: 1.5;
  }

  /* flicker animation for spotlight */
  @keyframes flicker {
    0%, 96%, 100% { opacity: 1; }
    97% { opacity: 0.7; }
    98% { opacity: 1; }
    99% { opacity: 0.8; }
  }

  .flicker { animation: flicker 4s infinite; }

</style>
</head>
<body>

<div class="cursor" id="cursor"></div>
<div id="grain"></div>
<div id="progress"></div>
<div id="counter">01 / 17</div>
<div id="nav-hint">← → or click to navigate</div>

<div id="slideshow">

  <!-- SLIDE 1: Opening -->
  <div class="slide active bg-char" id="s1">
    <div class="spotlight" style="top:10%; left:30%;"></div>
    <div class="spotlight" style="bottom:20%; right:20%;"></div>
    <div class="ghost-text" style="bottom:-3rem; right:-2rem; opacity:0.018;">GODOT</div>
    <div class="label reveal">Theatre Studies — Academic Presentation</div>
    <div class="title-xl reveal delay-1" style="max-width:800px; padding:0 2rem;">
      Waiting for Godot<br><em>in Sarajevo</em>
    </div>
    <div class="divider" style="opacity:1;"></div>
    <div class="title-md reveal delay-2">Theatre as Resistance</div>
    <div class="stage-line reveal delay-3" style="width:200px; margin-top:3rem;"></div>
    <p class="reveal delay-3" style="font-family:'Space Mono',monospace; font-size:10px; color:var(--fog); letter-spacing:0.2em; margin-top:1rem; text-transform:uppercase;">Sarajevo · Censorship · Feminism · Butler · Sontag</p>
  </div>

  <!-- SLIDE 2: Opening question -->
  <div class="slide bg-smoke" id="s2">
    <div class="ghost-text" style="top:-4rem; left:-2rem;">WHY</div>
    <div style="position:relative; z-index:1; text-align:center; padding: 2rem;">
      <div class="label reveal">The Central Question</div>
      <div class="title-lg reveal delay-1" style="max-width:750px;">
        Why perform theatre<br>during a <em>war?</em>
      </div>
      <div class="divider"></div>
      <p class="body-text reveal delay-2">When bombs fall and silence is enforced,<br>some choose to stand on a stage.</p>
      <p class="body-text reveal delay-3" style="margin-top:1rem; opacity:0.5; font-style:italic;">This is not escapism. This is resistance.</p>
    </div>
  </div>

  <!-- SLIDE 3: Yugoslavia -->
  <div class="slide bg-ash" id="s3">
    <div class="ghost-text" style="bottom:-2rem; right:-1rem; font-size:10rem;">1991</div>
    <div style="position:relative; z-index:1; text-align:center; max-width:800px; padding:2rem;">
      <div class="label reveal">Context</div>
      <div class="title-lg reveal delay-1">Yugoslavia after <em>1991</em></div>
      <div class="divider"></div>
      <ul class="v-list reveal delay-2" style="margin:0 auto;">
        <li>Collapse of federal state</li>
        <li>Ethnic fragmentation and civil war</li>
        <li>Cultural institutions dismantled</li>
        <li>Language itself becomes a weapon</li>
        <li>Art becomes survival</li>
      </ul>
    </div>
  </div>

  <!-- SLIDE 4: Theatre during crisis -->
  <div class="slide bg-texture" id="s4">
    <div class="keywords reveal">
      <span class="kw">Memory</span>
      <span class="kw">Trauma</span>
      <span class="kw">Survival</span>
      <span class="kw">Endurance</span>
      <span class="kw">Resistance</span>
      <span class="kw">Grief</span>
      <span class="kw">Witness</span>
    </div>
    <div class="label reveal delay-3" style="margin-top:3rem;">Theatre as Response to Crisis</div>
  </div>

  <!-- SLIDE 5: Sarajevo siege -->
  <div class="slide bg-char" id="s5">
    <div class="scanline"></div>
    <div style="text-align:center; max-width:750px; padding:2rem; position:relative; z-index:1;">
      <div class="label reveal">1992 – 1996</div>
      <div class="title-lg reveal delay-1">Sarajevo<br><em>Under Siege</em></div>
      <div class="divider"></div>
      <ul class="v-list reveal delay-2" style="margin:0 auto;">
        <li>Longest siege of a capital in modern warfare</li>
        <li>No electricity. No heat. Constant shelling.</li>
        <li>Theatres continued to operate</li>
        <li>Audiences risked death to attend performances</li>
        <li>Art as proof that civilization endures</li>
      </ul>
    </div>
  </div>

  <!-- SLIDE 6: Susan Sontag -->
  <div class="slide bg-smoke" id="s6">
    <div class="ghost-text" style="top:-2rem; left:-1rem; font-size:9rem; opacity:0.02;">SONTAG</div>
    <div style="position:relative; z-index:1; text-align:center; max-width:750px; padding:2rem;">
      <div class="label reveal">Turning Point — 1993</div>
      <div class="title-lg reveal delay-1"><em>Susan Sontag</em><br>arrives in Sarajevo</div>
      <div class="divider"></div>
      <div class="thesis-box reveal delay-2" style="margin:0 auto;">
        <div class="quote-text">"Culture was not a luxury.<br>It was a necessity."</div>
      </div>
      <p class="body-text reveal delay-3" style="margin-top:2rem; opacity:0.6;">She directed Beckett's <em>Waiting for Godot</em><br>in a darkened theatre — by candlelight.</p>
    </div>
  </div>

  <!-- SLIDE 7: Waiting for Godot — the play -->
  <div class="slide bg-ash" id="s7">
    <div class="ghost-text" style="bottom:-3rem; left:-2rem; font-size:11rem;">GODOT</div>
    <div style="position:relative; z-index:1; text-align:center; max-width:800px; padding:2rem;">
      <div class="label reveal">Samuel Beckett, 1953</div>
      <div class="title-lg reveal delay-1"><em>Waiting for Godot</em></div>
      <div class="divider"></div>
      <div class="pillars reveal delay-2">
        <div class="pillar">
          <span class="pillar-num">01</span>
          <span class="pillar-word">Waiting</span>
        </div>
        <div class="pillar">
          <span class="pillar-num">02</span>
          <span class="pillar-word">Uncertainty</span>
        </div>
        <div class="pillar">
          <span class="pillar-num">03</span>
          <span class="pillar-word">Suspension</span>
        </div>
        <div class="pillar">
          <span class="pillar-num">04</span>
          <span class="pillar-word">Absurdity</span>
        </div>
        <div class="pillar">
          <span class="pillar-num">05</span>
          <span class="pillar-word">Endurance</span>
        </div>
        <div class="pillar">
          <span class="pillar-num">06</span>
          <span class="pillar-word">Companionship</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SLIDE 8: Why Godot became political -->
  <div class="slide bg-char" id="s8">
    <div style="text-align:center; max-width:800px; padding:2rem;">
      <div class="label reveal">The Intellectual Center</div>
      <div class="title-lg reveal delay-1">When Waiting<br><em>Becomes Real</em></div>
      <div class="divider"></div>
      <div class="thesis-box reveal delay-2" style="margin:0 auto;">
        <p class="quote-text" style="font-size:clamp(1.2rem,2.5vw,1.8rem);">
          The play was no longer abstract absurdism.<br>
          In Sarajevo, waiting was not a metaphor.<br>
          <em>It was a siege.</em>
        </p>
      </div>
      <p class="body-text reveal delay-3" style="margin-top:2rem; opacity:0.55;">Vladimir and Estragon wait for something that never comes.<br>So did the people of Sarajevo — for rescue, for peace, for an end.</p>
    </div>
  </div>

  <!-- SLIDE 9: Censorship -->
  <div class="slide bg-smoke" id="s9">
    <div class="ghost-text" style="top:-1rem; right:-2rem; font-size:9rem; opacity:0.02;">SILENCE</div>
    <div style="position:relative; z-index:1; text-align:center; max-width:750px; padding:2rem;">
      <div class="label reveal">Political Theatre</div>
      <div class="title-lg reveal delay-1">Theatre Against<br><em>Censorship</em></div>
      <div class="divider"></div>
      <ul class="v-list reveal delay-2" style="margin:0 auto;">
        <li>Authoritarian regimes control speech</li>
        <li>They cannot easily control a living body on stage</li>
        <li>Theatre creates unauthorized speech</li>
        <li>The stage becomes a space outside power</li>
        <li>Contemporary echoes — from Belgrade to Tehran</li>
      </ul>
    </div>
  </div>

  <!-- SLIDE 10: Feminism on stage -->
  <div class="slide bg-ash" id="s10">
    <div style="text-align:center; max-width:750px; padding:2rem;">
      <div class="label reveal">Gender & War</div>
      <div class="title-lg reveal delay-1">Feminism<br><em>on Stage</em></div>
      <div class="divider"></div>
      <p class="body-text reveal delay-2">
        Women's bodies bear gendered violence disproportionately.<br>
        The stage becomes a space where that violence is witnessed,<br>named, and refused.
      </p>
      <div class="stage-line reveal delay-3"></div>
      <ul class="v-list reveal delay-3" style="margin:0 auto;">
        <li>Gendered trauma and post-war theatre</li>
        <li>Public versus private — who owns a woman's body?</li>
        <li>Performance as testimony</li>
      </ul>
    </div>
  </div>

  <!-- SLIDE 11: Judith Butler -->
  <div class="slide bg-char" id="s11">
    <div class="ghost-text" style="bottom:-3rem; right:-1rem; font-size:9rem; opacity:0.025;">BUTLER</div>
    <div style="position:relative; z-index:1; text-align:center; max-width:750px; padding:2rem;">
      <div class="label reveal">Theory</div>
      <div class="title-lg reveal delay-1"><em>Judith Butler</em></div>
      <div class="divider"></div>
      <div class="thesis-box reveal delay-2" style="margin:0 auto;">
        <div class="quote-text">Gender is not something you <em>are.</em><br>It is something you <em>perform.</em></div>
      </div>
      <div class="body-grid reveal delay-3" style="margin-top:2rem;">
        <div class="body-cell">
          <span class="body-cell-word">Theatre</span>
          <span class="body-cell-sub">exposes performance</span>
        </div>
        <div class="body-cell">
          <span class="body-cell-word">Politics</span>
          <span class="body-cell-sub">performs identity</span>
        </div>
        <div class="body-cell">
          <span class="body-cell-word">States</span>
          <span class="body-cell-sub">perform power</span>
        </div>
        <div class="body-cell">
          <span class="body-cell-word">Bodies</span>
          <span class="body-cell-sub">resist through visibility</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SLIDE 12: MEME — are you listening? -->
  <div class="slide bg-smoke" id="s12">
    <div style="text-align:center; max-width:700px; padding:2rem;">
      <div class="label reveal" style="color:var(--fog);">Slide 12 of 17 — Attention Check</div>
      <div class="meme-container reveal delay-1">
        <div class="meme-img-area">
          <div class="meme-face flicker">🧍</div>
          <div class="meme-top">BECKETT WRITING GODOT</div>
          <div class="meme-bottom">I WONDER IF SOMEDAY THIS WILL SAVE A CITY</div>
        </div>
        <p class="meme-caption">if you're reading this, you survived the theory slides</p>
        <p style="font-family:'Space Mono',monospace; font-size:9px; color:var(--rust); letter-spacing:0.3em; text-transform:uppercase; margin-top:0.5rem;">
          ✓ still listening
        </p>
      </div>
    </div>
  </div>

  <!-- SLIDE 13: The Body as Political Space -->
  <div class="slide bg-char" id="s13">
    <div class="ghost-text" style="top:-2rem; left:-1rem; opacity:0.02;">BODY</div>
    <div style="position:relative; z-index:1; text-align:center; max-width:800px; padding:2rem;">
      <div class="label reveal">Butler × Sontag × Sarajevo</div>
      <div class="title-lg reveal delay-1">The Body as<br><em>Political Space</em></div>
      <div class="divider"></div>
      <div class="body-grid reveal delay-2" style="margin:0 auto 2rem;">
        <div class="body-cell">
          <span class="body-cell-word">Protest</span>
          <span class="body-cell-sub">body as declaration</span>
        </div>
        <div class="body-cell">
          <span class="body-cell-word">Silence</span>
          <span class="body-cell-sub">enforced erasure</span>
        </div>
        <div class="body-cell">
          <span class="body-cell-word">Visibility</span>
          <span class="body-cell-sub">refusal to disappear</span>
        </div>
        <div class="body-cell">
          <span class="body-cell-word">Vulnerability</span>
          <span class="body-cell-sub">as resistance</span>
        </div>
      </div>
      <p class="body-text reveal delay-3" style="opacity:0.5; font-style:italic;">Contemporary protests also use performative acts of the body — from Sarajevo to Tehran.</p>
    </div>
  </div>

  <!-- SLIDE 14: Contemporary Theatre -->
  <div class="slide bg-ash" id="s14">
    <div style="text-align:center; max-width:750px; padding:2rem;">
      <div class="label reveal">Today</div>
      <div class="title-lg reveal delay-1"><em>Our</em> Theatre</div>
      <div class="divider"></div>
      <ul class="v-list reveal delay-2" style="margin:0 auto;">
        <li>Experimental and site-specific performance</li>
        <li>Documentary theatre — staging testimony</li>
        <li>Feminist performance art</li>
        <li>Post-traumatic and verbatim theatre</li>
        <li>Theatre as archive of collective memory</li>
      </ul>
      <p class="body-text reveal delay-4" style="margin-top:2rem; opacity:0.5; font-style:italic;">Schauspielhaus Graz · Burgtheater Wien · and beyond</p>
    </div>
  </div>

  <!-- SLIDE 15: Thesis -->
  <div class="slide bg-char" id="s15">
    <div class="ghost-text" style="top:-2rem; right:-2rem; font-size:9rem; opacity:0.02;">RESIST</div>
    <div style="position:relative; z-index:1; text-align:center; max-width:800px; padding:2rem;">
      <div class="label reveal">The Argument</div>
      <div class="title-lg reveal delay-1">The Central <em>Thesis</em></div>
      <div class="divider"></div>
      <div class="thesis-box reveal delay-2" style="margin:0 auto;">
        <div class="quote-text" style="font-size:clamp(1.3rem,3vw,2rem); line-height:1.5;">
          Theatre becomes political resistance<br>
          when <em>ordinary speech</em><br>is no longer enough.
        </div>
      </div>
    </div>
  </div>

  <!-- SLIDE 16: Questions -->
  <div class="slide bg-smoke" id="s16">
    <div style="text-align:center; max-width:750px; padding:2rem;">
      <div class="label reveal">Open Questions</div>
      <div class="title-lg reveal delay-1">Why Theatre<br><em>Still Matters</em></div>
      <div class="divider"></div>
      <ul class="v-list reveal delay-2" style="margin:0 auto;">
        <li>Can theatre resist power?</li>
        <li>Can performance preserve collective memory?</li>
        <li>Can silence itself become political?</li>
        <li>Who gets to be visible on the stage?</li>
        <li>What does it cost to perform under threat?</li>
      </ul>
    </div>
  </div>

  <!-- SLIDE 17: Final -->
  <div class="slide bg-char" id="s17">
    <div class="spotlight" style="top:20%; left:35%; width:400px; height:400px; opacity:0.6;" class="flicker"></div>
    <div class="scanline" style="opacity:0.3;"></div>
    <div style="position:relative; z-index:1; text-align:center; max-width:700px; padding:2rem;">
      <div class="stage-line reveal" style="width:100px; margin:0 auto 3rem;"></div>
      <div class="final-line reveal delay-1">
        "As long as people perform,<br>silence is never complete."
      </div>
      <div class="divider reveal delay-2"></div>
      <div class="label reveal delay-3" style="margin-bottom:0.5rem; color:var(--fog);">Thank you</div>
      <p class="reveal delay-4" style="font-family:'Space Mono',monospace; font-size:9px; color:var(--fog); letter-spacing:0.2em; text-transform:uppercase;">
        Sarajevo · Beckett · Sontag · Butler · Resistance
      </p>
      <div class="stage-line reveal delay-5" style="width:100px; margin:3rem auto 0;"></div>
    </div>
  </div>

</div><!-- /slideshow -->

<script>
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  let animating = false;

  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = (e.clientX - 4) + 'px';
    cursor.style.top  = (e.clientY - 4) + 'px';
  });

  function updateUI() {
    const n = slides.length;
    document.getElementById('counter').textContent =
      String(current + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    document.getElementById('progress').style.width =
      ((current + 1) / n * 100) + '%';
  }

  function triggerReveals(slide) {
    slide.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('revealed');
      void el.offsetWidth;
      el.classList.add('revealed');
    });
  }

  function goTo(next) {
    if (animating || next === current || next < 0 || next >= slides.length) return;
    animating = true;

    const outSlide = slides[current];
    const inSlide  = slides[next];

    outSlide.classList.add('exiting');
    outSlide.addEventListener('animationend', () => {
      outSlide.classList.remove('active', 'exiting');
      outSlide.style.opacity = '0';
    }, { once: true });

    setTimeout(() => {
      inSlide.style.opacity = '0';
      inSlide.classList.add('active', 'entering');
      inSlide.addEventListener('animationend', () => {
        inSlide.classList.remove('entering');
        inSlide.style.opacity = '1';
        triggerReveals(inSlide);
        animating = false;
      }, { once: true });
    }, 200);

    current = next;
    updateUI();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  });

  document.addEventListener('click', e => {
    if (e.clientX > window.innerWidth / 2) next(); else prev();
  });

  triggerReveals(slides[0]);
  updateUI();
</script>
</body>
</html>

function lerp(a, b, t) { return a + (b-a) * t; }

/* ===========================
   히어로 파티클
=========================== */
function drawHeroParticles(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth  || window.innerWidth;
  canvas.height = canvas.offsetHeight || window.innerHeight;
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < 80; i++) {
    const x = Math.random()*w, y = Math.random()*h;
    const s = Math.random()*2.2+0.2, a = Math.random()*0.45+0.05;
    ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI*2);
    ctx.fillStyle = `rgba(100,210,255,${a})`; ctx.fill();
  }
  for (let i = 0; i < 5; i++) {
    const x = Math.random()*w, y = Math.random()*h;
    const r = Math.random()*120+40;
    const g2 = ctx.createRadialGradient(x,y,0,x,y,r);
    g2.addColorStop(0,'rgba(0,150,255,0.06)');
    g2.addColorStop(1,'rgba(0,150,255,0)');
    ctx.fillStyle = g2; ctx.fillRect(x-r,y-r,r*2,r*2);
  }
}

/* ===========================
   카드 배경 공통
=========================== */
function drawCardBg(ctx, w, h) {
  const g = ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'#030e20'); g.addColorStop(1,'#0a2040');
  ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
  for (let i = 0; i < 40; i++) {
    const x = Math.random()*w, y = Math.random()*h;
    ctx.beginPath(); ctx.arc(x,y,Math.random()*1.5+0.2,0,Math.PI*2);
    ctx.fillStyle = `rgba(100,200,255,${Math.random()*0.25+0.03})`; ctx.fill();
  }
}

/* ===========================
   생물 일러스트 — 어류
=========================== */
function illustSnailfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.45);const glow=ctx.createRadialGradient(0,0,0,0,0,90);glow.addColorStop(0,'rgba(180,220,255,0.15)');glow.addColorStop(1,'transparent');ctx.fillStyle=glow;ctx.fillRect(-100,-100,200,200);ctx.save();ctx.rotate(-0.15);ctx.beginPath();ctx.moveTo(70,0);ctx.bezierCurveTo(40,-18,-40,-22,-80,0);ctx.bezierCurveTo(-40,22,40,18,70,0);ctx.fillStyle='rgba(160,210,240,0.85)';ctx.fill();ctx.beginPath();ctx.moveTo(-80,0);ctx.bezierCurveTo(-100,-20,-110,-8,-105,0);ctx.bezierCurveTo(-110,8,-100,20,-80,0);ctx.fillStyle='rgba(130,185,220,0.7)';ctx.fill();ctx.beginPath();ctx.arc(55,-5,7,0,Math.PI*2);ctx.fillStyle='rgba(220,240,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(57,-5,3.5,0,Math.PI*2);ctx.fillStyle='#0a1a2e';ctx.fill();for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(30-i*18,-12);ctx.lineTo(22-i*18,-28);ctx.lineTo(14-i*18,-12);ctx.fillStyle='rgba(140,195,230,0.5)';ctx.fill();}ctx.restore();ctx.restore();}

function illustAnglerfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.48);const glow=ctx.createRadialGradient(20,-55,0,20,-55,45);glow.addColorStop(0,'rgba(80,255,160,0.7)');glow.addColorStop(1,'transparent');ctx.fillStyle=glow;ctx.fillRect(-60,-120,160,160);ctx.beginPath();ctx.ellipse(0,0,62,52,0,0,Math.PI*2);ctx.fillStyle='rgba(30,50,100,0.9)';ctx.fill();ctx.strokeStyle='rgba(50,80,140,0.6)';ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.moveTo(-62,0);ctx.bezierCurveTo(-90,-30,-95,-10,-90,0);ctx.bezierCurveTo(-95,10,-90,30,-62,0);ctx.fillStyle='rgba(30,50,100,0.8)';ctx.fill();ctx.beginPath();ctx.moveTo(30,20);ctx.lineTo(62,35);ctx.lineTo(62,-35);ctx.lineTo(30,-20);ctx.closePath();ctx.fillStyle='rgba(25,42,88,0.8)';ctx.fill();[-50,-30,-10,10,30,50].forEach(tx=>{ctx.beginPath();ctx.moveTo(tx,38);ctx.lineTo(tx+6,60);ctx.lineTo(tx+12,38);ctx.fillStyle='rgba(220,235,255,0.85)';ctx.fill();});ctx.beginPath();ctx.arc(-18,-12,16,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.12)';ctx.fill();ctx.beginPath();ctx.arc(-15,-10,9,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(-13,-8,5,0,Math.PI*2);ctx.fillStyle='#060e1e';ctx.fill();ctx.beginPath();ctx.moveTo(18,-52);ctx.quadraticCurveTo(55,-90,22,-58);ctx.strokeStyle='rgba(160,200,220,0.6)';ctx.lineWidth=2;ctx.stroke();const glowDot=ctx.createRadialGradient(22,-58,0,22,-58,14);glowDot.addColorStop(0,'rgba(80,255,160,1)');glowDot.addColorStop(1,'transparent');ctx.fillStyle=glowDot;ctx.beginPath();ctx.arc(22,-58,14,0,Math.PI*2);ctx.fill();ctx.restore();}

function illustViperfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.45);ctx.save();ctx.rotate(0.1);ctx.beginPath();ctx.moveTo(75,0);ctx.bezierCurveTo(30,-14,-50,-18,-85,0);ctx.bezierCurveTo(-50,18,30,14,75,0);ctx.fillStyle='rgba(20,60,120,0.9)';ctx.fill();ctx.beginPath();ctx.moveTo(-85,0);ctx.bezierCurveTo(-105,-25,-115,-10,-108,0);ctx.bezierCurveTo(-115,10,-105,25,-85,0);ctx.fillStyle='rgba(20,55,110,0.8)';ctx.fill();[20,35,48,58,66].forEach((fx,i)=>{const len=[38,48,42,32,24][i];ctx.beginPath();ctx.moveTo(fx,-8);ctx.lineTo(fx+3,len);ctx.lineTo(fx+7,-8);ctx.fillStyle='rgba(200,225,255,0.9)';ctx.fill();});for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(-30+i*14,-15,3,0,Math.PI*2);ctx.fillStyle=`rgba(100,200,255,${0.4+i*0.07})`;ctx.fill();}ctx.beginPath();ctx.arc(58,-5,9,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(60,-4,5,0,Math.PI*2);ctx.fillStyle='#03080f';ctx.fill();ctx.restore();ctx.restore();}

function illustDragonfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.48);ctx.save();ctx.rotate(-0.05);ctx.beginPath();ctx.moveTo(80,0);ctx.bezierCurveTo(40,-20,-55,-20,-90,0);ctx.bezierCurveTo(-55,20,40,20,80,0);ctx.fillStyle='rgba(15,25,70,0.92)';ctx.fill();ctx.beginPath();ctx.moveTo(-90,0);ctx.bezierCurveTo(-115,-28,-120,-8,-112,0);ctx.bezierCurveTo(-120,8,-115,28,-90,0);ctx.fillStyle='rgba(15,25,70,0.8)';ctx.fill();for(let i=0;i<10;i++){const lx=60-i*16,pulse=0.5+i*0.05;const lg=ctx.createRadialGradient(lx,14,0,lx,14,8);lg.addColorStop(0,`rgba(0,200,255,${pulse})`);lg.addColorStop(1,'transparent');ctx.fillStyle=lg;ctx.beginPath();ctx.arc(lx,14,8,0,Math.PI*2);ctx.fill();}ctx.beginPath();ctx.moveTo(40,-40);ctx.quadraticCurveTo(70,-70,50,-45);ctx.strokeStyle='rgba(150,190,220,0.5)';ctx.lineWidth=1.5;ctx.stroke();const dp=ctx.createRadialGradient(50,-45,0,50,-45,12);dp.addColorStop(0,'rgba(255,100,0,0.9)');dp.addColorStop(1,'transparent');ctx.fillStyle=dp;ctx.beginPath();ctx.arc(50,-45,12,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(62,-8,10,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(64,-7,5,0,Math.PI*2);ctx.fillStyle='#030810';ctx.fill();ctx.restore();ctx.restore();}

function illustBarreleye(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.48);const headGlow=ctx.createRadialGradient(0,-20,0,0,-20,55);headGlow.addColorStop(0,'rgba(100,200,255,0.12)');headGlow.addColorStop(1,'transparent');ctx.fillStyle=headGlow;ctx.fillRect(-70,-80,140,120);ctx.beginPath();ctx.ellipse(0,-15,50,42,0,0,Math.PI*2);ctx.fillStyle='rgba(80,160,220,0.18)';ctx.fill();ctx.strokeStyle='rgba(120,200,255,0.35)';ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.ellipse(0,30,55,28,0,0,Math.PI*2);ctx.fillStyle='rgba(30,70,130,0.85)';ctx.fill();ctx.beginPath();ctx.ellipse(0,42,70,14,0,0,Math.PI*2);ctx.fillStyle='rgba(25,60,115,0.8)';ctx.fill();[[-20,-25],[20,-25]].forEach(([ex,ey])=>{const eg=ctx.createRadialGradient(ex,ey,0,ex,ey,16);eg.addColorStop(0,'rgba(0,220,180,0.9)');eg.addColorStop(1,'transparent');ctx.fillStyle=eg;ctx.beginPath();ctx.arc(ex,ey,16,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(ex,ey,9,0,Math.PI*2);ctx.fillStyle='rgba(0,180,140,0.95)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,4,0,Math.PI*2);ctx.fillStyle='#010a08';ctx.fill();});ctx.beginPath();ctx.moveTo(-55,42);ctx.bezierCurveTo(-80,20,-85,5,-78,0);ctx.bezierCurveTo(-85,-5,-80,-20,-55,28);ctx.fillStyle='rgba(28,65,120,0.7)';ctx.fill();ctx.restore();}

function illustBlackswallower(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.48);ctx.beginPath();ctx.ellipse(10,15,40,55,0,0,Math.PI*2);ctx.fillStyle='rgba(20,40,90,0.5)';ctx.fill();ctx.beginPath();ctx.ellipse(0,0,55,35,0,0,Math.PI*2);ctx.fillStyle='rgba(15,30,75,0.9)';ctx.fill();ctx.beginPath();ctx.moveTo(-55,0);ctx.bezierCurveTo(-80,-20,-85,-5,-78,0);ctx.bezierCurveTo(-85,5,-80,20,-55,0);ctx.fillStyle='rgba(15,30,75,0.8)';ctx.fill();ctx.beginPath();ctx.moveTo(55,-25);ctx.lineTo(85,0);ctx.lineTo(55,25);ctx.closePath();ctx.fillStyle='rgba(15,30,75,0.7)';ctx.fill();ctx.beginPath();ctx.arc(-40,-8,12,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(-38,-6,6,0,Math.PI*2);ctx.fillStyle='#020710';ctx.fill();ctx.restore();}

function illustGulpereel(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.moveTo(60,-5);ctx.bezierCurveTo(20,-8,-60,-6,-95,-2);ctx.bezierCurveTo(-60,6,20,8,60,5);ctx.closePath();ctx.fillStyle='rgba(20,35,85,0.85)';ctx.fill();ctx.beginPath();ctx.moveTo(60,-5);ctx.bezierCurveTo(75,-2,85,12,80,25);ctx.bezierCurveTo(65,22,55,10,60,5);ctx.closePath();ctx.fillStyle='rgba(20,35,85,0.9)';ctx.fill();ctx.beginPath();ctx.moveTo(60,-5);ctx.bezierCurveTo(75,-8,85,-22,80,-35);ctx.bezierCurveTo(65,-32,55,-14,60,5);ctx.closePath();ctx.fillStyle='rgba(20,35,85,0.9)';ctx.fill();ctx.beginPath();ctx.arc(42,-22,8,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.85)';ctx.fill();ctx.beginPath();ctx.arc(44,-20,4,0,Math.PI*2);ctx.fillStyle='#020710';ctx.fill();const tg=ctx.createRadialGradient(-95,0,0,-95,0,18);tg.addColorStop(0,'rgba(255,80,80,0.8)');tg.addColorStop(1,'transparent');ctx.fillStyle=tg;ctx.beginPath();ctx.arc(-95,0,18,0,Math.PI*2);ctx.fill();ctx.restore();}

function illustLanternfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.47);ctx.save();ctx.rotate(0.08);ctx.beginPath();ctx.moveTo(60,0);ctx.bezierCurveTo(30,-15,-40,-16,-70,0);ctx.bezierCurveTo(-40,16,30,15,60,0);ctx.fillStyle='rgba(25,55,110,0.88)';ctx.fill();ctx.beginPath();ctx.moveTo(-70,0);ctx.bezierCurveTo(-90,-22,-95,-8,-88,0);ctx.bezierCurveTo(-95,8,-90,22,-70,0);ctx.fillStyle='rgba(25,55,110,0.75)';ctx.fill();for(let i=0;i<7;i++){const lx=45-i*16,pulse=0.5+i*0.07;const lg=ctx.createRadialGradient(lx,8,0,lx,8,7);lg.addColorStop(0,`rgba(80,220,255,${pulse})`);lg.addColorStop(1,'transparent');ctx.fillStyle=lg;ctx.beginPath();ctx.arc(lx,8,7,0,Math.PI*2);ctx.fill();}ctx.beginPath();ctx.arc(45,-6,11,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.88)';ctx.fill();ctx.beginPath();ctx.arc(47,-5,6,0,Math.PI*2);ctx.fillStyle='#030b1a';ctx.fill();ctx.restore();ctx.restore();}

function illustGhostshark(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.47);ctx.beginPath();ctx.moveTo(80,0);ctx.bezierCurveTo(40,-25,-50,-28,-90,0);ctx.bezierCurveTo(-50,28,40,25,80,0);ctx.fillStyle='rgba(100,150,200,0.55)';ctx.fill();ctx.strokeStyle='rgba(140,190,230,0.3)';ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.moveTo(-10,-28);ctx.lineTo(10,-62);ctx.lineTo(25,-28);ctx.fillStyle='rgba(90,140,195,0.7)';ctx.fill();ctx.beginPath();ctx.moveTo(-90,0);ctx.lineTo(-120,-30);ctx.lineTo(-105,0);ctx.lineTo(-120,30);ctx.closePath();ctx.fillStyle='rgba(85,135,190,0.6)';ctx.fill();ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(80,35);ctx.lineTo(80,-35);ctx.closePath();ctx.fillStyle='rgba(90,140,195,0.55)';ctx.fill();ctx.beginPath();ctx.arc(55,-5,12,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.85)';ctx.fill();ctx.beginPath();ctx.arc(57,-4,6,0,Math.PI*2);ctx.fillStyle='#06101e';ctx.fill();ctx.restore();}

function illustBlackdragon(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.47);ctx.save();ctx.rotate(-0.08);ctx.beginPath();ctx.moveTo(85,0);ctx.bezierCurveTo(45,-16,-60,-18,-95,0);ctx.bezierCurveTo(-60,18,45,16,85,0);ctx.fillStyle='rgba(5,8,25,0.97)';ctx.fill();ctx.beginPath();ctx.moveTo(-95,0);ctx.bezierCurveTo(-118,-28,-125,-8,-115,0);ctx.bezierCurveTo(-125,8,-118,28,-95,0);ctx.fillStyle='rgba(5,8,25,0.85)';ctx.fill();for(let i=0;i<12;i++){const lx=70-i*14;const cl=ctx.createRadialGradient(lx,10,0,lx,10,7);cl.addColorStop(0,`rgba(0,180,255,${0.35+i*0.04})`);cl.addColorStop(1,'transparent');ctx.fillStyle=cl;ctx.beginPath();ctx.arc(lx,10,7,0,Math.PI*2);ctx.fill();}ctx.beginPath();ctx.arc(65,-6,11,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.88)';ctx.fill();ctx.beginPath();ctx.arc(67,-5,5.5,0,Math.PI*2);ctx.fillStyle='#020408';ctx.fill();ctx.restore();ctx.restore();}

/* ===========================
   생물 일러스트 — 두족류
=========================== */
function illustVampireSquid(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.46);const bg=ctx.createRadialGradient(0,0,0,0,0,80);bg.addColorStop(0,'rgba(120,30,160,0.15)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(-90,-90,180,180);ctx.beginPath();ctx.ellipse(0,0,42,38,0,0,Math.PI*2);ctx.fillStyle='rgba(80,15,110,0.9)';ctx.fill();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.cos(a)*35,Math.sin(a)*32);ctx.bezierCurveTo(Math.cos(a)*55+Math.cos(a+1)*20,Math.sin(a)*55+Math.sin(a+1)*20,Math.cos(a)*65+Math.cos(a-1)*15,Math.sin(a)*65+Math.sin(a-1)*15,Math.cos(a)*80,Math.sin(a)*80);ctx.strokeStyle='rgba(140,40,180,0.7)';ctx.lineWidth=4;ctx.stroke();}[[-16,-10],[16,-10]].forEach(([ex,ey])=>{const eg=ctx.createRadialGradient(ex,ey,0,ex,ey,12);eg.addColorStop(0,'rgba(255,100,50,0.9)');eg.addColorStop(1,'transparent');ctx.fillStyle=eg;ctx.beginPath();ctx.arc(ex,ey,12,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(ex,ey,6,0,Math.PI*2);ctx.fillStyle='rgba(255,80,30,0.95)';ctx.fill();});ctx.restore();}

function illustDumboOctopus(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.48);ctx.beginPath();ctx.ellipse(0,5,48,42,0,0,Math.PI*2);ctx.fillStyle='rgba(180,140,220,0.75)';ctx.fill();ctx.beginPath();ctx.moveTo(-48,-10);ctx.bezierCurveTo(-75,-40,-80,-20,-65,0);ctx.bezierCurveTo(-80,20,-75,40,-48,15);ctx.fillStyle='rgba(160,120,200,0.7)';ctx.fill();ctx.beginPath();ctx.moveTo(48,-10);ctx.bezierCurveTo(75,-40,80,-20,65,0);ctx.bezierCurveTo(80,20,75,40,48,15);ctx.fillStyle='rgba(160,120,200,0.7)';ctx.fill();for(let i=0;i<8;i++){const a=Math.PI*0.15+i*(Math.PI*0.85/7);ctx.beginPath();ctx.moveTo(Math.cos(a)*40,Math.sin(a)*36+5);ctx.quadraticCurveTo(Math.cos(a)*60+10,Math.sin(a)*60+20,Math.cos(a)*75,Math.sin(a)*80+5);ctx.strokeStyle='rgba(180,140,220,0.6)';ctx.lineWidth=5;ctx.stroke();}[[-18,-5],[18,-5]].forEach(([ex,ey])=>{ctx.beginPath();ctx.arc(ex,ey,12,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(ex+1,ey+1,6,0,Math.PI*2);ctx.fillStyle='#100820';ctx.fill();});ctx.restore();}

function illustGiantSquid(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.42);ctx.beginPath();ctx.ellipse(0,-10,24,62,0,0,Math.PI*2);ctx.fillStyle='rgba(160,60,80,0.8)';ctx.fill();ctx.beginPath();ctx.moveTo(-24,-72);ctx.lineTo(0,-100);ctx.lineTo(24,-72);ctx.fillStyle='rgba(150,55,75,0.7)';ctx.fill();for(let i=0;i<10;i++){const a=(i/10)*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.cos(a)*20,Math.sin(a)*10+52);ctx.bezierCurveTo(Math.cos(a)*30,Math.sin(a)*15+80,Math.cos(a)*25,Math.sin(a)*20+110,Math.cos(a)*28,Math.sin(a)*22+130);ctx.strokeStyle=i<2?'rgba(200,80,100,0.8)':'rgba(160,60,80,0.65)';ctx.lineWidth=i<2?6:3;ctx.stroke();}[[-12,0],[12,0]].forEach(([ex,ey])=>{ctx.beginPath();ctx.arc(ex,ey,16,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,13,0,Math.PI*2);ctx.fillStyle='rgba(255,240,180,0.9)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,7,0,Math.PI*2);ctx.fillStyle='#0a0505';ctx.fill();});ctx.restore();}

function illustHumboldtSquid(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.44);ctx.beginPath();ctx.ellipse(0,0,26,58,0,0,Math.PI*2);ctx.fillStyle='rgba(200,50,50,0.82)';ctx.fill();ctx.beginPath();ctx.moveTo(-26,-58);ctx.lineTo(0,-82);ctx.lineTo(26,-58);ctx.fillStyle='rgba(185,45,45,0.75)';ctx.fill();for(let i=0;i<10;i++){const a=(i/10)*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.cos(a)*22,Math.sin(a)*12+58);ctx.quadraticCurveTo(Math.cos(a)*32,Math.sin(a)*20+90,Math.cos(a)*30,Math.sin(a)*22+115);ctx.strokeStyle=i<2?'rgba(240,80,80,0.85)':'rgba(200,55,55,0.65)';ctx.lineWidth=i<2?7:3.5;ctx.stroke();}[[-12,-5],[12,-5]].forEach(([ex,ey])=>{ctx.beginPath();ctx.arc(ex,ey,11,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.88)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,5.5,0,Math.PI*2);ctx.fillStyle='#080305';ctx.fill();});ctx.restore();}

function illustGlassSquid(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.46);ctx.beginPath();ctx.ellipse(0,0,22,52,0,0,Math.PI*2);ctx.fillStyle='rgba(150,210,255,0.18)';ctx.fill();ctx.strokeStyle='rgba(180,230,255,0.35)';ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.moveTo(-22,-52);ctx.lineTo(0,-72);ctx.lineTo(22,-52);ctx.fillStyle='rgba(150,210,255,0.15)';ctx.fill();ctx.beginPath();ctx.ellipse(0,10,14,20,0,0,Math.PI*2);ctx.fillStyle='rgba(60,120,200,0.55)';ctx.fill();for(let i=0;i<10;i++){const a=(i/10)*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.cos(a)*18,Math.sin(a)*10+52);ctx.quadraticCurveTo(Math.cos(a)*25,Math.sin(a)*15+80,Math.cos(a)*22,95);ctx.strokeStyle='rgba(150,210,255,0.25)';ctx.lineWidth=2;ctx.stroke();}[[-10,2],[10,2]].forEach(([ex,ey])=>{ctx.beginPath();ctx.arc(ex,ey,9,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.85)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,4.5,0,Math.PI*2);ctx.fillStyle='#040c18';ctx.fill();});ctx.restore();}

function illustDeepOctopus(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.46);ctx.beginPath();ctx.ellipse(0,-5,45,40,0,0,Math.PI*2);ctx.fillStyle='rgba(100,40,140,0.85)';ctx.fill();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2,cx=Math.cos(a)*38,cy=Math.sin(a)*35+5;ctx.beginPath();ctx.moveTo(cx*0.6,cy*0.6);ctx.bezierCurveTo(cx+Math.cos(a+1)*20,cy+Math.sin(a+1)*25,cx+Math.cos(a-0.5)*30,cy+Math.sin(a-0.5)*30,cx*1.4+Math.sin(i)*10,cy*1.4);ctx.strokeStyle='rgba(130,60,180,0.75)';ctx.lineWidth=7;ctx.stroke();}[[-16,-10],[16,-10]].forEach(([ex,ey])=>{ctx.beginPath();ctx.arc(ex,ey,13,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,6.5,0,Math.PI*2);ctx.fillStyle='#0c0514';ctx.fill();});ctx.restore();}

function illustScalySnail(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();for(let a=0;a<Math.PI*6;a+=0.05){const r=8+a*6.5,x=Math.cos(a)*r,y=Math.sin(a)*r*0.75;a<0.05?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.strokeStyle='rgba(80,80,90,0.9)';ctx.lineWidth=14;ctx.stroke();ctx.strokeStyle='rgba(140,150,160,0.4)';ctx.lineWidth=8;ctx.stroke();ctx.beginPath();ctx.ellipse(-58,18,22,16,0.3,0,Math.PI*2);ctx.fillStyle='rgba(60,80,100,0.8)';ctx.fill();ctx.restore();}

function illustDeepClam(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.55);ctx.beginPath();ctx.ellipse(0,0,70,38,0,0,Math.PI);ctx.fillStyle='rgba(80,110,150,0.85)';ctx.fill();ctx.beginPath();ctx.ellipse(0,0,70,38,0,Math.PI,Math.PI*2);ctx.fillStyle='rgba(70,100,140,0.85)';ctx.fill();ctx.beginPath();ctx.ellipse(0,2,60,25,0,0,Math.PI);ctx.fillStyle='rgba(200,180,120,0.6)';ctx.fill();for(let i=0;i<5;i++){const bg=ctx.createRadialGradient(-20+i*10,5,0,-20+i*10,5,8);bg.addColorStop(0,'rgba(0,220,180,0.6)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.beginPath();ctx.arc(-20+i*10,5,8,0,Math.PI*2);ctx.fill();}ctx.restore();}

function illustNautilus(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();for(let a=0;a<Math.PI*4.5;a+=0.04){const r=10+a*9,x=Math.cos(a)*r,y=Math.sin(a)*r;a<0.04?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.strokeStyle='rgba(200,160,80,0.85)';ctx.lineWidth=16;ctx.stroke();ctx.strokeStyle='rgba(140,100,40,0.4)';ctx.lineWidth=10;ctx.stroke();for(let i=0;i<12;i++){const ta=(i/12)*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.cos(ta)*75,Math.sin(ta)*75);ctx.lineTo(Math.cos(ta)*90+Math.sin(i)*5,Math.sin(ta)*90+Math.cos(i)*5);ctx.strokeStyle='rgba(180,140,60,0.5)';ctx.lineWidth=3;ctx.stroke();}ctx.restore();}

/* ===========================
   생물 일러스트 — 갑각류
=========================== */
function illustAmphipoda(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<7;i++){const sx=-42+i*14,sw=16-i*0.5,sh=10-i*0.3;ctx.beginPath();ctx.ellipse(sx,0,sw,sh,0,0,Math.PI*2);ctx.fillStyle=`rgba(${180-i*10},${200-i*8},${220-i*5},0.82)`;ctx.fill();}for(let i=0;i<6;i++){const lx=-35+i*12,side=i%2?1:-1;ctx.beginPath();ctx.moveTo(lx,8);ctx.quadraticCurveTo(lx+side*10,20,lx+side*15,32);ctx.strokeStyle='rgba(160,185,210,0.7)';ctx.lineWidth=2;ctx.stroke();}ctx.restore();}

function illustGiantIsopod(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<9;i++){const ix=-52+i*12,iw=14-i*0.2,ih=18-i*0.5;ctx.beginPath();ctx.ellipse(ix,0,iw,ih,0,0,Math.PI*2);ctx.fillStyle=`rgba(${140+i*5},${150+i*4},${170+i*3},0.85)`;ctx.fill();}for(let i=0;i<14;i++){const lx=-50+i*8,side=i%2?1:-1;ctx.beginPath();ctx.moveTo(lx,16);ctx.lineTo(lx+side*8,30);ctx.lineTo(lx+side*12,44);ctx.strokeStyle='rgba(160,175,200,0.65)';ctx.lineWidth=2.2;ctx.stroke();}ctx.restore();}

function illustDeepShrimp(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.moveTo(55,0);ctx.bezierCurveTo(30,-15,-30,-15,-55,0);ctx.bezierCurveTo(-30,15,30,15,55,0);ctx.fillStyle='rgba(220,100,80,0.8)';ctx.fill();ctx.beginPath();ctx.moveTo(55,0);ctx.lineTo(80,20);ctx.lineTo(80,-20);ctx.closePath();ctx.fillStyle='rgba(210,90,70,0.7)';ctx.fill();for(let i=0;i<5;i++){const lx=-35+i*18,side=i%2?1:-1;ctx.beginPath();ctx.moveTo(lx,12);ctx.lineTo(lx+side*8,28);ctx.lineTo(lx+side*12,42);ctx.strokeStyle='rgba(225,110,90,0.65)';ctx.lineWidth=2.2;ctx.stroke();}ctx.restore();}

function illustCopepod(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.ellipse(0,-8,18,30,0,0,Math.PI*2);ctx.fillStyle='rgba(180,220,255,0.75)';ctx.fill();ctx.beginPath();ctx.ellipse(0,28,12,18,0,0,Math.PI*2);ctx.fillStyle='rgba(160,205,250,0.65)';ctx.fill();for(let i=0;i<6;i++){const side=i<3?1:-1,idx=i%3,lx=side*18,ly=-15+idx*16;ctx.beginPath();ctx.moveTo(lx,ly);ctx.quadraticCurveTo(side*35,ly+5,side*52,ly-5);ctx.strokeStyle='rgba(180,220,255,0.7)';ctx.lineWidth=2;ctx.stroke();}ctx.restore();}

function illustBarnacle(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.6);for(let i=0;i<6;i++){const a=(i/6)*Math.PI*2,bx=Math.cos(a)*38,by=Math.sin(a)*32;ctx.beginPath();ctx.arc(bx,by,14,0,Math.PI*2);ctx.fillStyle='rgba(140,150,165,0.85)';ctx.fill();}ctx.beginPath();ctx.arc(0,0,18,0,Math.PI*2);ctx.fillStyle='rgba(150,160,175,0.9)';ctx.fill();ctx.restore();}

function illustKrill(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.save();ctx.rotate(0.12);ctx.beginPath();ctx.moveTo(55,-5);ctx.bezierCurveTo(25,-12,-30,-12,-55,-5);ctx.bezierCurveTo(-30,12,25,12,55,5);ctx.closePath();ctx.fillStyle='rgba(255,160,120,0.78)';ctx.fill();for(let i=0;i<6;i++){const lx=-40+i*16,side=i%2?1:-1;ctx.beginPath();ctx.moveTo(lx,10);ctx.lineTo(lx+side*6,24);ctx.lineTo(lx+side*10,38);ctx.strokeStyle='rgba(255,170,130,0.65)';ctx.lineWidth=2.2;ctx.stroke();}ctx.restore();ctx.restore();}

function illustDeepCrab(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.52);ctx.beginPath();ctx.ellipse(0,0,50,35,0,0,Math.PI*2);ctx.fillStyle='rgba(160,90,50,0.85)';ctx.fill();for(let i=0;i<4;i++){for(let s of[-1,1]){const lx=s*(20+i*14),ly=-8+i*4;ctx.beginPath();ctx.moveTo(s*50,ly);ctx.lineTo(lx+s*20,ly-15);ctx.lineTo(lx+s*35,ly+5);ctx.lineTo(lx+s*48,ly-8);ctx.strokeStyle='rgba(170,95,55,0.75)';ctx.lineWidth=4;ctx.stroke();}}for(let s of[-1,1]){ctx.beginPath();ctx.moveTo(s*50,-15);ctx.bezierCurveTo(s*75,-30,s*85,-15,s*80,0);ctx.bezierCurveTo(s*85,15,s*75,28,s*55,20);ctx.strokeStyle='rgba(175,100,60,0.7)';ctx.lineWidth=7;ctx.stroke();}[[-18,-5],[18,-5]].forEach(([ex,ey])=>{ctx.beginPath();ctx.arc(ex,ey,9,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,4.5,0,Math.PI*2);ctx.fillStyle='#0a0504';ctx.fill();});ctx.restore();}

function illustOstracoda(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.ellipse(-5,0,52,42,0.15,0,Math.PI*2);ctx.fillStyle='rgba(160,190,220,0.82)';ctx.fill();ctx.strokeStyle='rgba(190,215,240,0.4)';ctx.lineWidth=1.5;ctx.stroke();for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(-42+i*18,-42);ctx.quadraticCurveTo(-38+i*18,-60,-36+i*18,-75);ctx.strokeStyle='rgba(170,200,230,0.55)';ctx.lineWidth=1.8;ctx.stroke();}ctx.restore();}

function illustDeepLobster(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<7;i++){const sx=-45+i*14,sw=14-i*0.5,sh=11-i*0.4;ctx.beginPath();ctx.ellipse(sx,0,sw,sh,0,0,Math.PI*2);ctx.fillStyle=`rgba(${180+i*4},${70+i*5},${40+i*3},0.86)`;ctx.fill();}for(let s of[-1,1]){ctx.beginPath();ctx.moveTo(52,s*5);ctx.bezierCurveTo(75,s*12,90,s*8,95,s*20);ctx.strokeStyle='rgba(185,75,45,0.7)';ctx.lineWidth=6;ctx.stroke();ctx.beginPath();ctx.ellipse(95,s*20,14,10,s*0.4,0,Math.PI*2);ctx.fillStyle='rgba(190,80,48,0.8)';ctx.fill();}ctx.restore();}

function illustTanaidacea(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<8;i++){const sx=-42+i*11,sw=10-i*0.3,sh=7-i*0.2;ctx.beginPath();ctx.ellipse(sx,0,sw,sh,0,0,Math.PI*2);ctx.fillStyle=`rgba(${155+i*5},${175+i*4},${195+i*3},0.8)`;ctx.fill();}for(let i=0;i<6;i++){const lx=-38+i*12,side=i%2?1:-1;ctx.beginPath();ctx.moveTo(lx,6);ctx.quadraticCurveTo(lx+side*6,16,lx+side*10,26);ctx.strokeStyle='rgba(165,185,208,0.6)';ctx.lineWidth=1.8;ctx.stroke();}ctx.restore();}

/* ===========================
   생물 일러스트 — 자포동물
=========================== */
function illustDeepJellyfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.38);const bg=ctx.createRadialGradient(0,0,0,0,0,100);bg.addColorStop(0,'rgba(100,200,255,0.18)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(-110,-110,220,220);ctx.beginPath();for(let a=0;a<Math.PI*2;a+=0.06){const r=52+Math.sin(a*6)*6;a<0.06?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r-10):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r-10);}ctx.closePath();ctx.fillStyle='rgba(80,160,220,0.35)';ctx.fill();ctx.strokeStyle='rgba(120,200,255,0.5)';ctx.lineWidth=2;ctx.stroke();for(let a=0;a<Math.PI*2;a+=Math.PI/6){const rx=Math.cos(a)*40,ry=Math.sin(a)*30-10;ctx.beginPath();ctx.moveTo(rx,ry);ctx.bezierCurveTo(rx+Math.cos(a+1)*20,ry+Math.sin(a+1)*20+30,rx+Math.cos(a-0.5)*15,ry+Math.sin(a-0.5)*15+60,rx*0.8+Math.sin(a)*15,ry+90+Math.sin(a)*20);ctx.strokeStyle='rgba(100,200,255,0.45)';ctx.lineWidth=2.5;ctx.stroke();}ctx.restore();}

function illustSiphonophore(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.12);for(let i=0;i<22;i++){const sy=i*28,wave=Math.sin(i*0.7)*20;ctx.beginPath();ctx.ellipse(wave,sy,10-i*0.25,7-i*0.18,Math.sin(i*0.5)*0.3,0,Math.PI*2);ctx.fillStyle=`rgba(${80+i*4},${160+i*2},${220+i},${0.7-i*0.02})`;ctx.fill();}ctx.restore();}

function illustCombJelly(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.ellipse(0,0,38,62,0,0,Math.PI*2);ctx.fillStyle='rgba(200,240,255,0.18)';ctx.fill();ctx.strokeStyle='rgba(220,248,255,0.45)';ctx.lineWidth=1.5;ctx.stroke();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;ctx.beginPath();for(let t=0;t<1;t+=0.05){const r=42+Math.sin(t*Math.PI*4)*4,x=Math.cos(a+t*0.15)*r*Math.cos(t*Math.PI),y=Math.sin(a+t*0.15)*r*0.6-62+t*124;t===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}const hue=i*(360/8);ctx.strokeStyle=`hsla(${hue},100%,85%,0.65)`;ctx.lineWidth=3;ctx.stroke();}ctx.restore();}

function illustDeepCoral(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.85);function branch(x,y,len,angle,depth){if(depth<0||len<3)return;const ex=x+Math.cos(angle)*len,ey=y-Math.sin(angle)*len;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(ex,ey);ctx.strokeStyle=`rgba(${200-depth*20},${80+depth*15},${100+depth*10},${0.7+depth*0.05})`;ctx.lineWidth=depth*1.8;ctx.stroke();branch(ex,ey,len*0.72,angle-0.45,depth-1);branch(ex,ey,len*0.68,angle+0.42,depth-1);if(depth>3)branch(ex,ey,len*0.55,angle+0.05,depth-2);}branch(-30,0,55,Math.PI/2,7);branch(30,0,48,Math.PI/2,6);branch(0,0,62,Math.PI/2,7);ctx.restore();}

function illustDeepAnemone(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.75);ctx.beginPath();ctx.ellipse(0,0,38,22,0,0,Math.PI*2);ctx.fillStyle='rgba(200,100,150,0.8)';ctx.fill();const tentCount=18;for(let i=0;i<tentCount;i++){const a=(i/tentCount)*Math.PI*2,tx=Math.cos(a)*26,ty=Math.sin(a)*14-8,tlen=35+Math.sin(i*1.4)*12;ctx.beginPath();ctx.moveTo(tx,ty);ctx.bezierCurveTo(tx+Math.cos(a)*tlen*0.4+Math.sin(i)*8,ty-tlen*0.4,tx+Math.cos(a)*tlen*0.7-Math.sin(i)*6,ty-tlen*0.7,tx+Math.cos(a)*tlen,ty-tlen);ctx.strokeStyle='rgba(230,130,170,0.65)';ctx.lineWidth=2.2;ctx.stroke();}ctx.restore();}

function illustHydroid(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.82);function stem(x,y,len,angle,depth){if(depth<0||len<4)return;const ex=x+Math.cos(angle)*len,ey=y-Math.sin(angle)*len;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(ex,ey);ctx.strokeStyle=`rgba(100,${160+depth*12},${200+depth*8},${0.6+depth*0.06})`;ctx.lineWidth=depth*1.4;ctx.stroke();if(depth===1){const pg=ctx.createRadialGradient(ex,ey,0,ex,ey,10);pg.addColorStop(0,'rgba(180,230,255,0.7)');pg.addColorStop(1,'transparent');ctx.fillStyle=pg;ctx.beginPath();ctx.arc(ex,ey,10,0,Math.PI*2);ctx.fill();}stem(ex,ey,len*0.65,angle-0.5,depth-1);stem(ex,ey,len*0.62,angle+0.48,depth-1);}stem(-25,0,40,Math.PI/2,5);stem(0,0,50,Math.PI/2,5);stem(25,0,42,Math.PI/2,5);ctx.restore();}

function illustBoxJellyfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.42);const bg=ctx.createRadialGradient(0,0,0,0,0,70);bg.addColorStop(0,'rgba(100,220,200,0.2)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(-80,-80,160,160);ctx.beginPath();ctx.roundRect(-48,-50,96,80,16);ctx.fillStyle='rgba(80,200,180,0.3)';ctx.fill();ctx.strokeStyle='rgba(120,230,210,0.6)';ctx.lineWidth=2;ctx.stroke();[[-25,-40],[25,-40],[-25,-10],[25,-10]].forEach(([ex,ey])=>{ctx.beginPath();ctx.arc(ex,ey,8,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.85)';ctx.fill();ctx.beginPath();ctx.arc(ex,ey,4,0,Math.PI*2);ctx.fillStyle='rgba(80,200,180,0.9)';ctx.fill();});for(let i=0;i<4;i++){const tx=-36+i*24;ctx.beginPath();ctx.moveTo(tx,30);ctx.bezierCurveTo(tx+Math.sin(i)*12,60,tx+Math.cos(i)*15,90,tx+Math.sin(i+1)*10,120);ctx.strokeStyle='rgba(100,220,200,0.45)';ctx.lineWidth=2.5;ctx.stroke();}ctx.restore();}

function illustStauromedusa(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.55);ctx.beginPath();ctx.moveTo(0,-50);ctx.lineTo(-15,-15);ctx.lineTo(-45,-5);ctx.lineTo(-20,15);ctx.lineTo(-28,45);ctx.lineTo(0,28);ctx.lineTo(28,45);ctx.lineTo(20,15);ctx.lineTo(45,-5);ctx.lineTo(15,-15);ctx.closePath();ctx.fillStyle='rgba(200,120,180,0.65)';ctx.fill();ctx.strokeStyle='rgba(230,150,200,0.5)';ctx.lineWidth=1.5;ctx.stroke();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2-Math.PI/8,tx=Math.cos(a)*50,ty=Math.sin(a)*50;const tg=ctx.createRadialGradient(tx,ty,0,tx,ty,10);tg.addColorStop(0,'rgba(255,180,230,0.8)');tg.addColorStop(1,'transparent');ctx.fillStyle=tg;ctx.beginPath();ctx.arc(tx,ty,10,0,Math.PI*2);ctx.fill();}ctx.beginPath();ctx.moveTo(0,55);ctx.lineTo(0,85);ctx.strokeStyle='rgba(200,120,180,0.5)';ctx.lineWidth=5;ctx.stroke();ctx.restore();}

function illustNarcomedusa(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.48);const bg=ctx.createRadialGradient(0,0,0,0,0,65);bg.addColorStop(0,'rgba(255,180,100,0.15)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(-75,-75,150,150);ctx.beginPath();for(let a=0;a<Math.PI*2;a+=0.06){const r=48+Math.sin(a*8)*6;a<0.06?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fillStyle='rgba(255,160,80,0.25)';ctx.fill();ctx.strokeStyle='rgba(255,190,110,0.5)';ctx.lineWidth=2;ctx.stroke();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2,tx=Math.cos(a)*42,ty=Math.sin(a)*42-30;ctx.beginPath();ctx.moveTo(tx,ty);ctx.bezierCurveTo(tx+Math.cos(a)*20,ty-20,tx+Math.cos(a)*35,ty-50,tx+Math.cos(a)*50,ty-80);ctx.strokeStyle='rgba(255,190,110,0.45)';ctx.lineWidth=2.5;ctx.stroke();}ctx.restore();}

function illustTrachymedusa(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.44);ctx.beginPath();for(let a=0;a<Math.PI*2;a+=0.05){const r=55+Math.sin(a*4)*8;a<0.05?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fillStyle='rgba(60,180,160,0.28)';ctx.fill();ctx.strokeStyle='rgba(80,210,188,0.55)';ctx.lineWidth=2.5;ctx.stroke();for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.cos(a)*52,Math.sin(a)*52);ctx.bezierCurveTo(Math.cos(a)*65+Math.sin(a)*12,Math.sin(a)*65-Math.cos(a)*12,Math.cos(a)*75+Math.sin(a)*8,Math.sin(a)*75-Math.cos(a)*8,Math.cos(a)*88+Math.sin(a)*18,Math.sin(a)*88-Math.cos(a)*18);ctx.strokeStyle='rgba(80,210,190,0.38)';ctx.lineWidth=2;ctx.stroke();}ctx.restore();}

/* ===========================
   생물 일러스트 — 환형동물
=========================== */
function illustTubeworm(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.85);[[-30,0],[0,0],[25,-10],[-15,-5],[15,-8]].forEach(([tx,base],ti)=>{const tlen=90+ti*12;ctx.beginPath();ctx.moveTo(tx,base);ctx.bezierCurveTo(tx+Math.sin(ti)*8,base-tlen*0.4,tx+Math.cos(ti)*10,base-tlen*0.7,tx+Math.sin(ti*2)*6,base-tlen);ctx.strokeStyle=`rgba(${180-ti*15},${100+ti*10},${60+ti*8},0.85)`;ctx.lineWidth=10-ti*0.8;ctx.stroke();for(let i=0;i<10;i++){const a=(i/10)*Math.PI*2;ctx.beginPath();ctx.moveTo(tx+Math.sin(ti*2)*6,base-tlen);ctx.bezierCurveTo(tx+Math.cos(a)*18+Math.sin(ti*2)*6,base-tlen-12,tx+Math.cos(a)*22+Math.sin(ti*2)*6,base-tlen-22,tx+Math.cos(a)*18+Math.sin(ti*2)*6,base-tlen-30);ctx.strokeStyle=`rgba(${200+ti*10},${80+ti*15},${120+ti*12},0.75)`;ctx.lineWidth=3;ctx.stroke();}});ctx.restore();}

function illustPolychaete(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);const pts=[];for(let i=0;i<14;i++)pts.push({x:-65+i*10,y:Math.sin(i*0.55)*18});ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.strokeStyle='rgba(200,160,80,0.88)';ctx.lineWidth=14;ctx.stroke();pts.forEach((p,i)=>{if(i%2===0){for(let s of[-1,1]){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+s*12,p.y+s*16);ctx.lineTo(p.x+s*20,p.y+s*8);ctx.strokeStyle=`rgba(${220+i*2},${170+i*3},${90+i},0.6)`;ctx.lineWidth=2.5;ctx.stroke();}}});ctx.restore();}

function illustZombieWorm(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.ellipse(0,35,45,22,0,0,Math.PI*2);ctx.fillStyle='rgba(180,140,100,0.75)';ctx.fill();for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2,rx=Math.cos(a)*32,ry=Math.sin(a)*18+30;ctx.beginPath();ctx.moveTo(rx,ry);ctx.bezierCurveTo(rx+Math.cos(a)*18,ry+Math.sin(a)*15+8,rx+Math.cos(a)*30,ry+Math.sin(a)*25+15,rx+Math.cos(a)*28,ry+Math.sin(a)*30+25);ctx.strokeStyle='rgba(160,120,85,0.65)';ctx.lineWidth=3;ctx.stroke();}ctx.restore();}

function illustFireworm(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);const pts2=[];for(let i=0;i<12;i++)pts2.push({x:-55+i*10,y:Math.sin(i*0.7)*15+Math.cos(i)*5});ctx.beginPath();ctx.moveTo(pts2[0].x,pts2[0].y);for(let i=1;i<pts2.length;i++)ctx.lineTo(pts2[i].x,pts2[i].y);ctx.strokeStyle='rgba(200,80,40,0.88)';ctx.lineWidth=14;ctx.stroke();pts2.forEach((p,i)=>{for(let s of[-1,1]){const fg=ctx.createRadialGradient(p.x+s*14,p.y+s*12,0,p.x+s*14,p.y+s*12,10);fg.addColorStop(0,'rgba(255,220,80,0.7)');fg.addColorStop(1,'transparent');ctx.fillStyle=fg;ctx.fillRect(p.x+s*8,p.y+s*6,20,20);}});ctx.restore();}

function illustSeaCucumber(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.52);ctx.beginPath();ctx.moveTo(70,0);ctx.bezierCurveTo(40,-28,-40,-28,-70,-5);ctx.bezierCurveTo(-40,28,40,28,70,0);ctx.fillStyle='rgba(160,100,60,0.85)';ctx.fill();for(let i=0;i<6;i++){const bx=-50+i*20;ctx.beginPath();ctx.ellipse(bx,-26,5,12,0,0,Math.PI*2);ctx.fillStyle='rgba(180,120,75,0.7)';ctx.fill();}ctx.restore();}

function illustDeepStarfish(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<5;i++){const a=(i/5)*Math.PI*2-Math.PI/2;ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(Math.cos(a-0.4)*22,Math.sin(a-0.4)*22,Math.cos(a-0.2)*55,Math.sin(a-0.2)*55,Math.cos(a)*68,Math.sin(a)*68);ctx.bezierCurveTo(Math.cos(a+0.2)*55,Math.sin(a+0.2)*55,Math.cos(a+0.4)*22,Math.sin(a+0.4)*22,0,0);ctx.fillStyle=`rgba(${220-i*8},${90+i*8},${60+i*5},0.8)`;ctx.fill();}ctx.beginPath();ctx.arc(0,0,14,0,Math.PI*2);ctx.fillStyle='rgba(230,110,70,0.9)';ctx.fill();ctx.restore();}

function illustBritttlestar(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<5;i++){const a=(i/5)*Math.PI*2-Math.PI/2;ctx.beginPath();ctx.moveTo(Math.cos(a)*14,Math.sin(a)*14);ctx.bezierCurveTo(Math.cos(a+0.6)*40+Math.sin(a)*20,Math.sin(a+0.6)*40-Math.cos(a)*20,Math.cos(a-0.4)*65+Math.sin(a)*15,Math.sin(a-0.4)*65-Math.cos(a)*15,Math.cos(a)*88+Math.sin(a+1)*10,Math.sin(a)*88-Math.cos(a+1)*10);ctx.strokeStyle='rgba(180,160,220,0.75)';ctx.lineWidth=5;ctx.stroke();}ctx.beginPath();ctx.arc(0,0,12,0,Math.PI*2);ctx.fillStyle='rgba(190,170,225,0.88)';ctx.fill();ctx.restore();}

function illustDeepUrchin(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.arc(0,0,38,0,Math.PI*2);ctx.fillStyle='rgba(80,30,100,0.85)';ctx.fill();for(let i=0;i<28;i++){const a=(i/28)*Math.PI*2,sl=22+Math.random()*18;ctx.beginPath();ctx.moveTo(Math.cos(a)*36,Math.sin(a)*36);ctx.lineTo(Math.cos(a)*(36+sl),Math.sin(a)*(36+sl));ctx.strokeStyle='rgba(140,60,180,0.7)';ctx.lineWidth=2;ctx.stroke();}ctx.restore();}

function illustFeatherStar(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.55);for(let i=0;i<10;i++){const a=(i/10)*Math.PI*2-Math.PI/2;ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(Math.cos(a)*20,Math.sin(a)*20,Math.cos(a)*50,Math.sin(a)*50,Math.cos(a)*70,Math.sin(a)*70);ctx.strokeStyle=`rgba(${180+i*5},${140+i*6},${80+i*8},0.7)`;ctx.lineWidth=4;ctx.stroke();}ctx.beginPath();ctx.arc(0,0,12,0,Math.PI*2);ctx.fillStyle='rgba(190,150,90,0.85)';ctx.fill();ctx.restore();}

function illustSeaLily(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.85);ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(-10,-40,10,-80,0,-110);ctx.strokeStyle='rgba(160,130,70,0.8)';ctx.lineWidth=7;ctx.stroke();for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2;ctx.beginPath();ctx.moveTo(0,-110);ctx.bezierCurveTo(Math.cos(a)*18,-110-18,Math.cos(a)*32,-110-32,Math.cos(a)*28,-110-44);ctx.bezierCurveTo(Math.cos(a)*22,-110-38,Math.cos(a)*8,-110-20,0,-110);ctx.fillStyle=`rgba(${180+i*3},${150+i*4},${80+i*5},0.65)`;ctx.fill();}ctx.restore();}

/* ===========================
   생물 일러스트 — 미생물
=========================== */
function illustXenophyophore(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2,r=30+Math.random()*30,ex=Math.cos(a)*r,ey=Math.sin(a)*r;ctx.beginPath();for(let j=0;j<8;j++){const ja=(j/8)*Math.PI*2,jr=12+Math.random()*10,jx=ex+Math.cos(ja)*jr,jy=ey+Math.sin(ja)*jr;j===0?ctx.moveTo(jx,jy):ctx.lineTo(jx,jy);}ctx.closePath();ctx.fillStyle=`rgba(${60+Math.random()*40},${180+Math.random()*40},${140+Math.random()*30},0.4)`;ctx.fill();}ctx.beginPath();ctx.arc(0,0,18,0,Math.PI*2);ctx.fillStyle='rgba(60,180,130,0.65)';ctx.fill();ctx.restore();}

function illustForaminifera(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let ring=0;ring<4;ring++){const cnt=ring===0?1:(ring*6);for(let i=0;i<cnt;i++){const a=(i/cnt)*Math.PI*2,r=ring*22,cx=Math.cos(a)*r,cy=Math.sin(a)*r,cr=10-ring*1.5;ctx.beginPath();ctx.arc(cx,cy,cr,0,Math.PI*2);ctx.fillStyle=`rgba(${200-ring*20},${180-ring*15},${120-ring*10},${0.75-ring*0.08})`;ctx.fill();}}ctx.restore();}

function illustSulfurBacteria(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<18;i++){const a=(i/18)*Math.PI*2,r=28+Math.random()*38,bx=Math.cos(a)*r,by=Math.sin(a)*r,bl=8+Math.random()*12;ctx.beginPath();ctx.ellipse(bx,by,bl,bl*0.4,a+Math.PI/2,0,Math.PI*2);ctx.fillStyle=`rgba(${180+Math.random()*30},${200+Math.random()*20},${60+Math.random()*30},0.55)`;ctx.fill();}ctx.restore();}

function illustArchaea(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<20;i++){const a=(i/20)*Math.PI*2,r=18+Math.random()*42,ax=Math.cos(a)*r,ay=Math.sin(a)*r;ctx.beginPath();for(let j=0;j<6;j++){const ja=(j/6)*Math.PI*2,jr=5+Math.random()*6;j===0?ctx.moveTo(ax+Math.cos(ja)*jr,ay+Math.sin(ja)*jr):ctx.lineTo(ax+Math.cos(ja)*jr,ay+Math.sin(ja)*jr);}ctx.closePath();ctx.fillStyle=`rgba(${220+Math.random()*30},${80+Math.random()*40},${40+Math.random()*20},${0.5+Math.random()*0.2})`;ctx.fill();}ctx.restore();}

function illustNematode(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let n=0;n<5;n++){const pts3=[],yOff=-40+n*20;for(let i=0;i<20;i++)pts3.push({x:-80+i*8.5,y:yOff+Math.sin(i*0.7+n)*12+Math.cos(i*0.4+n*2)*8});ctx.beginPath();ctx.moveTo(pts3[0].x,pts3[0].y);for(let i=1;i<pts3.length;i++)ctx.lineTo(pts3[i].x,pts3[i].y);ctx.strokeStyle=`rgba(${200-n*15},${220-n*10},${180-n*8},${0.55+n*0.05})`;ctx.lineWidth=2.5-n*0.2;ctx.stroke();}ctx.restore();}

function illustRadiolaria(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.arc(0,0,28,0,Math.PI*2);ctx.fillStyle='rgba(180,220,255,0.35)';ctx.fill();ctx.strokeStyle='rgba(200,235,255,0.55)';ctx.lineWidth=1.5;ctx.stroke();for(let i=0;i<24;i++){const a=(i/24)*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.cos(a)*26,Math.sin(a)*26);ctx.lineTo(Math.cos(a)*80,Math.sin(a)*80);ctx.strokeStyle='rgba(180,220,255,0.45)';ctx.lineWidth=1.2;ctx.stroke();if(i%3===0){ctx.beginPath();ctx.arc(Math.cos(a)*80,Math.sin(a)*80,4,0,Math.PI*2);ctx.fillStyle='rgba(200,235,255,0.6)';ctx.fill();}}ctx.restore();}

function illustDiatom(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.ellipse(0,0,48,28,0,0,Math.PI*2);ctx.fillStyle='rgba(180,210,150,0.4)';ctx.fill();ctx.strokeStyle='rgba(200,230,170,0.6)';ctx.lineWidth=2;ctx.stroke();for(let i=-5;i<=5;i++){ctx.beginPath();ctx.moveTo(i*8,-28);ctx.lineTo(i*8,28);ctx.strokeStyle='rgba(190,220,160,0.3)';ctx.lineWidth=0.8;ctx.stroke();}const dg=ctx.createRadialGradient(0,0,0,0,0,25);dg.addColorStop(0,'rgba(220,240,180,0.5)');dg.addColorStop(1,'transparent');ctx.fillStyle=dg;ctx.fillRect(-50,-30,100,60);ctx.restore();}

function illustDeepVirus(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<25;i++){const vx=(Math.random()-0.5)*140,vy=(Math.random()-0.5)*140;ctx.beginPath();ctx.arc(vx,vy,3+Math.random()*4,0,Math.PI*2);ctx.fillStyle=`rgba(${60+Math.random()*40},${200+Math.random()*40},${180+Math.random()*40},${0.4+Math.random()*0.35})`;ctx.fill();const spikes=Math.floor(4+Math.random()*5);for(let s=0;s<spikes;s++){const sa=(s/spikes)*Math.PI*2,sr=6+Math.random()*6;ctx.beginPath();ctx.moveTo(vx+Math.cos(sa)*3,vy+Math.sin(sa)*3);ctx.lineTo(vx+Math.cos(sa)*sr,vy+Math.sin(sa)*sr);ctx.strokeStyle='rgba(80,220,200,0.4)';ctx.lineWidth=0.8;ctx.stroke();}}ctx.restore();}

function illustCiliate(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);ctx.beginPath();ctx.ellipse(0,0,30,48,0,0,Math.PI*2);ctx.fillStyle='rgba(120,200,180,0.55)';ctx.fill();ctx.strokeStyle='rgba(160,225,205,0.45)';ctx.lineWidth=1.5;ctx.stroke();for(let i=0;i<32;i++){const a=(i/32)*Math.PI*2,cr=i<16?30:48,cx=Math.cos(a)*cr,cy=Math.sin(a)*(cr===30?30:48);ctx.beginPath();ctx.moveTo(cx,cy);ctx.quadraticCurveTo(cx+Math.cos(a+0.5)*10,cy+Math.sin(a+0.5)*10,cx+Math.cos(a+0.8)*18,cy+Math.sin(a+0.8)*18);ctx.strokeStyle='rgba(140,215,195,0.55)';ctx.lineWidth=1.2;ctx.stroke();}ctx.restore();}

function illustThermoArchaea(ctx,w,h){ctx.save();ctx.translate(w*0.5,h*0.5);for(let i=0;i<16;i++){const a=(i/16)*Math.PI*2,r=18+Math.random()*42,tx=Math.cos(a)*r,ty=Math.sin(a)*r;ctx.beginPath();ctx.arc(tx,ty,5+Math.random()*6,0,Math.PI*2);ctx.fillStyle=`rgba(${230+Math.random()*20},${90+Math.random()*35},${20+Math.random()*20},${0.55+Math.random()*0.25})`;ctx.fill();for(let s=0;s<6;s++){const sa=(s/6)*Math.PI*2;ctx.beginPath();ctx.moveTo(tx+Math.cos(sa)*5,ty+Math.sin(sa)*5);ctx.lineTo(tx+Math.cos(sa)*12,ty+Math.sin(sa)*12);ctx.strokeStyle='rgba(255,150,50,0.4)';ctx.lineWidth=1;ctx.stroke();}}ctx.restore();}

/* ===========================
   일러스트 맵
=========================== */
const FISH_ILLUSTS        = [illustSnailfish,illustAnglerfish,illustViperfish,illustDragonfish,illustBarreleye,illustBlackswallower,illustGulpereel,illustLanternfish,illustGhostshark,illustBlackdragon];
const CEPHALOPOD_ILLUSTS  = [illustVampireSquid,illustDumboOctopus,illustGiantSquid,illustHumboldtSquid,illustGlassSquid,illustDeepOctopus,illustScalySnail,illustDeepClam,illustNautilus,illustNautilus];
const CRUSTACEAN_ILLUSTS  = [illustAmphipoda,illustGiantIsopod,illustDeepShrimp,illustCopepod,illustBarnacle,illustKrill,illustDeepCrab,illustOstracoda,illustDeepLobster,illustTanaidacea];
const CNIDARIAN_ILLUSTS   = [illustDeepJellyfish,illustSiphonophore,illustCombJelly,illustDeepCoral,illustDeepAnemone,illustHydroid,illustBoxJellyfish,illustStauromedusa,illustNarcomedusa,illustTrachymedusa];
const WORM_ILLUSTS        = [illustTubeworm,illustPolychaete,illustZombieWorm,illustFireworm,illustSeaCucumber,illustDeepStarfish,illustBritttlestar,illustDeepUrchin,illustFeatherStar,illustSeaLily];
const MICROBE_ILLUSTS     = [illustXenophyophore,illustForaminifera,illustSulfurBacteria,illustArchaea,illustNematode,illustRadiolaria,illustDiatom,illustDeepVirus,illustCiliate,illustThermoArchaea];

function getIllustSet() {
  const path = window.location.pathname;
  if (path.includes('fish'))       return FISH_ILLUSTS;
  if (path.includes('cephalopod')) return CEPHALOPOD_ILLUSTS;
  if (path.includes('crustacean')) return CRUSTACEAN_ILLUSTS;
  if (path.includes('cnidarian'))  return CNIDARIAN_ILLUSTS;
  if (path.includes('worm'))       return WORM_ILLUSTS;
  if (path.includes('microbe'))    return MICROBE_ILLUSTS;
  return null;
}

/* ===========================
   카드 드로우
=========================== */
function drawCreatureCard(canvas, idx) {
  const ctx = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth  || 300;
  canvas.height = canvas.offsetHeight || 400;
  const w = canvas.width, h = canvas.height;
  drawCardBg(ctx, w, h);
  const set = getIllustSet();
  if (set && set[idx]) set[idx](ctx, w, h);
}

function drawCategoryCard(canvas, idx) {
  const ctx = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth  || 300;
  canvas.height = canvas.offsetHeight || 400;
  const w = canvas.width, h = canvas.height;
  drawCardBg(ctx, w, h);
  const sets = [FISH_ILLUSTS,CEPHALOPOD_ILLUSTS,CRUSTACEAN_ILLUSTS,CNIDARIAN_ILLUSTS,WORM_ILLUSTS,MICROBE_ILLUSTS];
  if (sets[idx] && sets[idx][0]) sets[idx][0](ctx, w, h);
}

/* ===========================
   페이지 초기화
=========================== */
window.addEventListener('load', () => {

  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    drawHeroParticles(heroCanvas);
    setInterval(() => drawHeroParticles(heroCanvas), 3000);
  }

  for (let i = 1; i <= 6; i++) {
    const c = document.getElementById('cc' + i);
    if (c) drawCategoryCard(c, i - 1);
  }

  const grid = document.getElementById('creatureGrid');
  if (grid) {
    grid.querySelectorAll('.creature-card').forEach((card, i) => {
      const canvas = card.querySelector('canvas');
      if (canvas) drawCreatureCard(canvas, i);
    });
  }
});

/* ===========================
   리사이즈
=========================== */
window.addEventListener('resize', () => {
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) drawHeroParticles(heroCanvas);

  for (let i = 1; i <= 6; i++) {
    const c = document.getElementById('cc' + i);
    if (c) drawCategoryCard(c, i - 1);
  }

  const grid = document.getElementById('creatureGrid');
  if (grid) {
    grid.querySelectorAll('.creature-card').forEach((card, i) => {
      const canvas = card.querySelector('canvas');
      if (canvas) drawCreatureCard(canvas, i);
    });
  }
});
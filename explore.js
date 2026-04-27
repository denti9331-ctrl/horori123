(function(){
'use strict';

const canvas = document.getElementById('gc');
const ctx    = canvas.getContext('2d');

function resize(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* ===========================
   유틸
=========================== */
function lerp(a,b,t){ return a+(b-a)*t; }
function clamp(v,mn,mx){ return Math.max(mn,Math.min(mx,v)); }
function dist2(ax,ay,bx,by){ return (ax-bx)**2+(ay-by)**2; }

/* ===========================
   상수
=========================== */
const MAX_DEPTH = 11034;
const WORLD_W   = 2400;
let animT       = 0;
let lastTime    = 0;
let depth       = 0;
let targetDepth = 0;

/* 마우스 */
let mouseX = 0;
let mouseY = 0;

/* ===========================
   배경 이미지
=========================== */
const bgImg  = new Image();
let bgLoaded = false;
bgImg.onload = ()=>{ bgLoaded=true; };
bgImg.src    = 'images/bg-deep.jpg';

/* ===========================
   수심별 색상
=========================== */
const DEPTH_COLORS = [
  { depth:0,     r:8,  g:80,  b:160 },
  { depth:200,   r:4,  g:50,  b:120 },
  { depth:1000,  r:2,  g:28,  b:80  },
  { depth:4000,  r:1,  g:12,  b:45  },
  { depth:6000,  r:0,  g:6,   b:25  },
  { depth:11034, r:0,  g:2,   b:10  },
];

function getDepthColor(d){
  for(let i=DEPTH_COLORS.length-1;i>=0;i--){
    if(d>=DEPTH_COLORS[i].depth){
      if(i===DEPTH_COLORS.length-1)
        return [DEPTH_COLORS[i].r,DEPTH_COLORS[i].g,DEPTH_COLORS[i].b];
      const nx=DEPTH_COLORS[i+1];
      const t=(d-DEPTH_COLORS[i].depth)/(nx.depth-DEPTH_COLORS[i].depth);
      return [
        Math.round(lerp(DEPTH_COLORS[i].r,nx.r,t)),
        Math.round(lerp(DEPTH_COLORS[i].g,nx.g,t)),
        Math.round(lerp(DEPTH_COLORS[i].b,nx.b,t)),
      ];
    }
  }
  return [8,80,160];
}

/* ===========================
   배경 파티클
=========================== */
const BG_PARTICLES = Array.from({length:180},()=>({
  x:          Math.random(),
  y:          Math.random(),
  r:          Math.random()*1.8+0.2,
  op:         Math.random()*0.3+0.05,
  blink:      Math.random()*Math.PI*2,
  blinkSpeed: Math.random()*0.02+0.005,
  isGreen:    Math.random()<0.3,
}));

/* ===========================
   빛 줄기
=========================== */
const LIGHT_RAYS = Array.from({length:7},(_,i)=>({
  x:     0.06+i*0.14,
  angle: (Math.random()-0.5)*0.06,
  width: Math.random()*35+15,
  phase: Math.random()*Math.PI*2,
}));

/* ===========================
   지형 데이터 (초기화 필요)
=========================== */
let TERRAIN_LAYERS = [];
let CORAL_LIST     = [];
let VENTS          = [];

function initTerrainData(){
  function makePts(count,seed){
    return Array.from({length:count+1},(_,i)=>({
      x: i/count,
      y: Math.sin(i*seed*1.3+seed*5)*0.06+Math.sin(i*seed*0.7)*0.04+Math.random()*0.03,
    }));
  }
  TERRAIN_LAYERS=[
    {parallax:0.3,color:'rgba(0,20,60,0.45)', stroke:'rgba(0,40,100,0.25)',pts:makePts(12,0.3)},
    {parallax:0.6,color:'rgba(0,14,42,0.6)',  stroke:'rgba(0,28,75,0.3)',  pts:makePts(14,0.6)},
    {parallax:1.0,color:'rgba(0,8,26,0.78)',  stroke:'rgba(0,18,55,0.35)', pts:makePts(16,1.0)},
  ];
  CORAL_LIST=Array.from({length:18},()=>({
    x:     Math.random(),
    type:  Math.random()<0.5?'coral':'seaweed',
    size:  Math.random()*28+16,
    phase: Math.random()*Math.PI*2,
    r:     180+Math.floor(Math.random()*50),
    g:     50+Math.floor(Math.random()*40),
    b:     100+Math.floor(Math.random()*40),
    gr:    30+Math.floor(Math.random()*20),
    gg:    150+Math.floor(Math.random()*80),
    gb:    60+Math.floor(Math.random()*40),
    isGreen: Math.random()<0.5,
  }));
  VENTS=[{x:0.22},{x:0.55},{x:0.78}];
}

/* ===========================
   수심대 데이터
=========================== */
const ZONES=[
  {
    name:'유광층',icon:'☀️',range:'0 ~ 200m',
    minDepth:0,color:'#7dd4fc',
    meta:'수온 20~27°C · 광합성 가능 구간',
    desc:'햇빛이 닿는 유일한 구간입니다. 지구 해양 생물의 90%가 이 구간에 서식합니다. 산호초, 돌고래, 참치 등 친숙한 생물들의 터전이며 파도와 해류가 활발하게 일어납니다.',
    facts:[{label:'광투과율',val:'100%'},{label:'평균 수온',val:'25°C'},{label:'생물 비중',val:'90%'}],
    event:null,
  },
  {
    name:'박광층',icon:'🌊',range:'200 ~ 1,000m',
    minDepth:200,color:'#60a0e0',
    meta:'수온 4~20°C · 희미한 빛만 도달',
    desc:'태양빛이 극히 약하게 스며드는 구간입니다. 많은 생물들이 낮에는 깊은 곳에 머물다 밤에 수면 가까이 올라오는 일주이동을 합니다. 오징어, 랜턴피쉬 등이 서식합니다.',
    facts:[{label:'수압',val:'20~100기압'},{label:'광투과율',val:'1% 미만'},{label:'수온',val:'4~20°C'}],
    event:null,
  },
  {
    name:'심해대',icon:'🔦',range:'1,000 ~ 4,000m',
    minDepth:1000,color:'#4060c0',
    meta:'수온 2~4°C · 완전한 암흑',
    desc:'완전한 어둠이 지배하는 세계입니다. 수압이 대기압의 100~400배에 달하며, 생물들은 생물발광으로 소통합니다. 열수분출공이 이 구간에 위치해 독특한 생태계를 형성합니다.',
    facts:[{label:'수압',val:'100~400기압'},{label:'수온',val:'2~4°C'},{label:'특징',val:'열수분출공'}],
    event:{icon:'🌋',title:'열수분출공 발견!',desc:'수심 2,000m 부근에 열수분출공이 있습니다. 300°C가 넘는 물이 뿜어져 나오지만 독특한 생태계가 형성되어 있습니다.'},
  },
  {
    name:'심연대',icon:'🌑',range:'4,000 ~ 6,000m',
    minDepth:4000,color:'#304090',
    meta:'수온 1~2°C · 극한의 수압',
    desc:'지구 해저면의 대부분을 차지하는 구간입니다. 퇴적물로 덮인 평탄한 해저 평원이 펼쳐지며, 극히 일부의 생물만이 적응해 살아갑니다.',
    facts:[{label:'수압',val:'400~600기압'},{label:'수온',val:'1~2°C'},{label:'지형',val:'해저 평원'}],
    event:{icon:'⚓',title:'난파선 발견',desc:'심해에 가라앉은 난파선이 발견됐습니다. 심해 생물들의 새로운 터전이 되었습니다.'},
  },
  {
    name:'초심해대',icon:'⚡',range:'6,000 ~ 11,034m',
    minDepth:6000,color:'#202860',
    meta:'수온 1~4°C · 수압 600기압 이상',
    desc:'해구에서만 발견되는 극한의 환경입니다. 수압이 600기압을 넘어서며, 암피포다 등 특수한 갑각류가 이 압력에서도 생존합니다. 지구에서 가장 탐험되지 않은 영역입니다.',
    facts:[{label:'수압',val:'600~1100기압'},{label:'수온',val:'1~4°C'},{label:'서식지',val:'극한 생물만'}],
    event:{icon:'👾',title:'챌린저 딥 접근',desc:'지구에서 가장 깊은 지점에 접근 중입니다. 1960년 트리에스테호가 최초로 도달했습니다.'},
  },
];

/* ===========================
   생물 데이터
=========================== */
const CREATURES=[
  {
    name:'스네일피쉬',latin:'Pseudoliparis swirei',
    depth:'6,000~8,336m',icon:'🐟',color:'#64c8ff',
    image:'images/creatures/snailfish.jpg',
    desc:'수심 8,336m에서 발견된 가장 깊은 척추동물. 압력에 적응한 유연한 젤리 같은 몸 구조를 가집니다.',
    stats:[{l:'최대 수심',v:'8,336m'},{l:'몸길이',v:'약 28cm'},{l:'수온',v:'1~2°C'},{l:'수압',v:'800기압'}],
    tags:['극한생존','척추동물','최심부'],
    minDepth:6000,speed:1.2,
  },
  {
    name:'심해아귀',latin:'Melanocetus johnsonii',
    depth:'200~2,000m',icon:'🐡',color:'#ff8040',
    image:'images/creatures/anglerfish.jpg',
    desc:'머리의 발광 기관으로 먹이를 유인합니다. 암컷이 수컷보다 수십 배 크며 수컷은 기생합니다.',
    stats:[{l:'서식 수심',v:'200~2,000m'},{l:'암컷 크기',v:'최대 20cm'},{l:'수컷 크기',v:'약 3cm'},{l:'발광',v:'생물발광'}],
    tags:['발광','기생','포식자'],
    minDepth:200,speed:0.8,
  },
  {
    name:'바이퍼피쉬',latin:'Chauliodus sloani',
    depth:'200~5,000m',icon:'🦷',color:'#8080ff',
    image:'images/creatures/viperfish.jpg',
    desc:'몸길이 절반에 달하는 거대한 이빨을 가진 심해 포식자. 야간에 수면 가까이 올라와 사냥합니다.',
    stats:[{l:'서식 수심',v:'200~5,000m'},{l:'몸길이',v:'최대 35cm'},{l:'이빨',v:'몸길이 절반'},{l:'사냥',v:'야간'}],
    tags:['이빨','포식자','일주이동'],
    minDepth:200,speed:1.6,
  },
  {
    name:'뱀파이어 오징어',latin:'Vampyroteuthis infernalis',
    depth:'600~900m',icon:'🦑',color:'#a040c0',
    image:'images/creatures/vampire-squid.jpg',
    desc:'3억 년간 변하지 않은 살아있는 화석. 위협 시 망토처럼 몸을 감싸 가시를 드러냅니다.',
    stats:[{l:'서식 수심',v:'600~900m'},{l:'몸길이',v:'약 30cm'},{l:'발광',v:'몸 전체'},{l:'역사',v:'3억 년'}],
    tags:['고대생물','발광','두족류'],
    minDepth:600,speed:0.7,
  },
  {
    name:'덤보 문어',latin:'Grimpoteuthis spp.',
    depth:'1,000~7,000m',icon:'🐙',color:'#c080ff',
    image:'images/creatures/dumbo-octopus.jpg',
    desc:'귀처럼 생긴 지느러미로 천천히 유영합니다. 심해에서 발견되는 가장 귀여운 두족류입니다.',
    stats:[{l:'서식 수심',v:'1,000~7,000m'},{l:'크기',v:'20~30cm'},{l:'지느러미',v:'귀 모양'},{l:'먹이',v:'통째로 삼킴'}],
    tags:['두족류','희귀','심해'],
    minDepth:1000,speed:0.6,
  },
  {
    name:'심해 해파리',latin:'Tiburonia granrojo',
    depth:'200~3,000m',icon:'🪼',color:'#80ffff',
    image:'images/creatures/jellyfish.jpg',
    desc:'5억 년간 거의 변하지 않은 생물. 완전한 암흑 속에서 생물발광으로 빛을 냅니다.',
    stats:[{l:'서식 수심',v:'200~3,000m'},{l:'역사',v:'5억 년'},{l:'발광',v:'생물발광'},{l:'신체',v:'95% 수분'}],
    tags:['자포동물','고대','발광'],
    minDepth:200,speed:0.5,
  },
  {
    name:'관벌레',latin:'Riftia pachyptila',
    depth:'2,000~4,000m',icon:'🐛',color:'#ff6060',
    image:'images/creatures/tubeworm.jpg',
    desc:'열수분출공에서 길이 2m 이상 자랍니다. 소화 기관 없이 공생 박테리아에만 의존합니다.',
    stats:[{l:'서식 수심',v:'2,000~4,000m'},{l:'몸길이',v:'최대 2m'},{l:'에너지',v:'화학합성'},{l:'공생',v:'박테리아'}],
    tags:['열수분출공','공생','환형동물'],
    minDepth:2000,speed:0,
  },
  {
    name:'암피포다',latin:'Hirondellea gigas',
    depth:'6,000~11,000m',icon:'🦐',color:'#80c0ff',
    image:'images/creatures/amphipoda.jpg',
    desc:'챌린저 딥 최심부에서도 발견됩니다. 수압 1,100기압을 견디며 해저를 청소합니다.',
    stats:[{l:'서식 수심',v:'6,000~11,000m'},{l:'수압',v:'1,100기압'},{l:'역할',v:'분해자'},{l:'크기',v:'약 7cm'}],
    tags:['극한생존','갑각류','최심부'],
    minDepth:6000,speed:1.8,
  },
];

/* ===========================
   상태
=========================== */
const foundSet     = new Set();
let currentZoneIdx = -1;
let shownEvents    = new Set();
let challengerShown= false;
let infoCardTimer  = 0;
let deepShown      = false;

let creatures  = [];
let bubbles    = [];
let particles  = [];

/* ===========================
   좌표 변환
=========================== */
function depthToWy(d){ return d*8; }

/* ===========================
   생물 스폰
=========================== */
function spawnCreature(near){
  const avail=CREATURES.filter(c=>c.minDepth<=depth+800);
  if(!avail.length) return;
  const tmpl=avail[Math.floor(Math.random()*avail.length)];
  const currentWy=depthToWy(depth);
  const wx=(Math.random()-0.5)*canvas.width*1.2;
  const wy=near
    ? currentWy+(Math.random()-0.5)*canvas.height*0.7
    : currentWy+canvas.height*(0.5+Math.random()*0.8);
  creatures.push({
    wx,wy,tmpl,
    vx:(Math.random()-0.5)*(tmpl.speed||0.5)*2,
    vy:0,
    size:Math.random()*14+10,
    phase:Math.random()*Math.PI*2,
    hover:false,
  });
}

/* ===========================
   키 & 스크롤
=========================== */
const keys={};
window.addEventListener('keydown',e=>{
  keys[e.code]=true;
  if(['ArrowUp','ArrowDown','KeyW','KeyS'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup',e=>{ keys[e.code]=false; });

window.addEventListener('wheel',e=>{
  e.preventDefault();
  targetDepth=clamp(targetDepth+e.deltaY*1.5,0,MAX_DEPTH);
},{passive:false});

/* 마우스 추적 */
window.addEventListener('mousemove',e=>{
  mouseX=e.clientX;
  mouseY=e.clientY;
});

/* ===========================
   UI 함수
=========================== */
function showInfoCard(zone){
  document.getElementById('icBadge').textContent=zone.name;
  document.getElementById('icBadge').style.color=zone.color;
  document.getElementById('icBadge').style.borderColor=zone.color+'50';
  document.getElementById('icTitle').textContent=zone.icon+' '+zone.range;
  document.getElementById('icMeta').textContent=zone.meta;
  document.getElementById('icDesc').textContent=zone.desc;
  document.getElementById('icFacts').innerHTML=zone.facts.map(f=>
    `<div class="ic-fact"><strong style="color:${zone.color}">${f.val}</strong>${f.label}</div>`
  ).join('');
  document.getElementById('infoCard').classList.add('show');
  infoCardTimer=320;
}

document.getElementById('icClose').addEventListener('click',()=>{
  document.getElementById('infoCard').classList.remove('show');
  infoCardTimer=0;
});

let zoneToastTO=null;
function showZoneToast(zone){
  const el=document.getElementById('zoneToast');
  document.getElementById('ztIcon').textContent=zone.icon;
  document.getElementById('ztName').textContent=zone.name;
  document.getElementById('ztRange').textContent=zone.range;
  el.classList.add('show');
  if(zoneToastTO) clearTimeout(zoneToastTO);
  zoneToastTO=setTimeout(()=>el.classList.remove('show'),3000);
}

let eventTO=null;
function showEvent(ev){
  const el=document.getElementById('eventBanner');
  document.getElementById('ebIcon').textContent=ev.icon;
  document.getElementById('ebTitle').textContent=ev.title;
  document.getElementById('ebDesc').textContent=ev.desc;
  el.classList.add('show');
  if(eventTO) clearTimeout(eventTO);
  eventTO=setTimeout(()=>el.classList.remove('show'),4500);
}

let discoverTO=null;
function showDiscoverToast(tmpl,isNew){
  const el=document.getElementById('discoverToast');
  document.getElementById('dtIcon').textContent=tmpl.icon;
  document.getElementById('dtText').innerHTML=
    `<strong style="color:${tmpl.color}">${tmpl.name}</strong><br>`+
    (isNew?'<span style="color:rgba(100,220,150,0.8)">✨ 새로운 발견!</span>':'클릭해서 자세히 보기');
  el.classList.add('show');
  if(discoverTO) clearTimeout(discoverTO);
  discoverTO=setTimeout(()=>el.classList.remove('show'),2500);
}

function updateDogan(){
  const cnt=foundSet.size,total=CREATURES.length;
  document.getElementById('spCatch').textContent=cnt+' / '+total+'종';
  document.getElementById('doganProgFill').style.width=(cnt/total*100)+'%';
  document.getElementById('doganProgText').textContent=cnt+' / '+total+'종 발견';
  const grid=document.getElementById('doganGrid');
  if(!grid) return;
  grid.innerHTML='';
  CREATURES.forEach(c=>{
    const found=foundSet.has(c.name);
    const div=document.createElement('div');
    div.className='dogan-card'+(found?' found':' locked');
    div.innerHTML=`<div class="dc-emoji">${found?c.icon:'❓'}</div><div class="dc-name">${found?c.name:'???'}</div>`;
    if(found) div.addEventListener('click',()=>openPopup(c));
    grid.appendChild(div);
  });
}

document.getElementById('doganBtn').addEventListener('click',()=>{
  document.getElementById('doganPanel').classList.toggle('show');
});
document.getElementById('doganClose').addEventListener('click',()=>{
  document.getElementById('doganPanel').classList.remove('show');
});

function openPopup(tmpl,isNew){
  const img=document.getElementById('cpImg');
  const fb=document.getElementById('cpFallback');
  if(tmpl.image){
    img.src=tmpl.image; img.alt=tmpl.name;
    img.style.display='block'; fb.style.display='none';
    img.onerror=()=>{ img.style.display='none'; fb.style.display='flex'; fb.textContent=tmpl.icon; };
  } else {
    img.style.display='none'; fb.style.display='flex'; fb.textContent=tmpl.icon;
  }
  const badge=document.getElementById('cpBadge');
  badge.textContent=tmpl.depth;
  badge.style.borderColor=tmpl.color;
  badge.style.color=tmpl.color;
  document.getElementById('cpLatin').textContent=tmpl.latin;
  document.getElementById('cpName').textContent=tmpl.name;
  document.getElementById('cpDesc').textContent=tmpl.desc;
  document.getElementById('cpStats').innerHTML=tmpl.stats.map(s=>
    `<div class="cp-stat"><div class="cp-stat-label">${s.l}</div><div class="cp-stat-val" style="color:${tmpl.color}">${s.v}</div></div>`
  ).join('');
  document.getElementById('cpTags').innerHTML=tmpl.tags.map(t=>
    `<span class="cp-tag" style="border-color:${tmpl.color}40;color:${tmpl.color}">${t}</span>`
  ).join('');
  document.getElementById('cpNew').textContent=isNew?'✨ 새로운 생물을 발견했습니다!':'';
  if(!foundSet.has(tmpl.name)){
    foundSet.add(tmpl.name);
    updateDogan();
    for(let i=0;i<16;i++){
      const a=Math.random()*Math.PI*2,s=Math.random()*4+1;
      particles.push({
        wx:(Math.random()-0.5)*canvas.width*0.5,
        wy:depthToWy(depth)+(Math.random()-0.5)*canvas.height*0.3,
        vx:Math.cos(a)*s,vy:Math.sin(a)*s-1,
        r:Math.random()*5+2,op:1,
      });
    }
  }
  document.getElementById('creaturePopup').classList.add('show');
}

document.getElementById('cpClose').addEventListener('click',()=>{
  document.getElementById('creaturePopup').classList.remove('show');
});
document.getElementById('cpOverlay').addEventListener('click',()=>{
  document.getElementById('creaturePopup').classList.remove('show');
});
document.addEventListener('keydown',e=>{
  if(e.code==='Escape') document.getElementById('creaturePopup').classList.remove('show');
});

function showDeepestReach(){
  if(deepShown) return; deepShown=true;
  const el=document.getElementById('deepestReach');
  document.getElementById('drTitle').textContent='챌린저 딥 도달!';
  document.getElementById('drDesc').textContent=
    '수심 11,034m — 지구에서 가장 깊은 지점\n에베레스트산을 놓으면 꼭대기도 수면 아래 1.6km\n1960년 트리에스테호가 최초 유인 잠수에 성공';
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),5000);
}

/* 클릭 감지 */
canvas.addEventListener('click',e=>{
  const currentWy=depthToWy(depth);
  const mx=e.clientX, my=e.clientY;
  for(const c of creatures){
    const sx=canvas.width/2+c.wx;
    const sy=canvas.height/2+(c.wy-currentWy);
    if(dist2(mx,my,sx,sy)<(c.size+16)**2){
      openPopup(c.tmpl,!foundSet.has(c.tmpl.name));
      break;
    }
  }
});

canvas.addEventListener('mousemove',e=>{
  mouseX=e.clientX; mouseY=e.clientY;
  const currentWy=depthToWy(depth);
  let hovering=false;
  creatures.forEach(c=>{
    const sx=canvas.width/2+c.wx;
    const sy=canvas.height/2+(c.wy-currentWy);
    c.hover=dist2(mouseX,mouseY,sx,sy)<(c.size+16)**2;
    if(c.hover){ hovering=true; showDiscoverToast(c.tmpl,!foundSet.has(c.tmpl.name)); }
  });
  canvas.style.cursor=hovering?'pointer':'none';
});

/* ===========================
   업데이트
=========================== */
function updateDepth(){
  if(keys['KeyS']||keys['ArrowDown']) targetDepth=clamp(targetDepth+8,0,MAX_DEPTH);
  if(keys['KeyW']||keys['ArrowUp'])   targetDepth=clamp(targetDepth-8,0,MAX_DEPTH);
  depth=lerp(depth,targetDepth,0.04);
  const pct=depth/MAX_DEPTH;
  document.getElementById('spDepth').textContent=Math.round(depth).toLocaleString()+'m';
  document.getElementById('spTemp').textContent=Math.round(lerp(27,1,pct))+'°C';
  document.getElementById('spPress').textContent=Math.round(1+pct*1099).toLocaleString()+'기압';
  document.getElementById('dbFill').style.height=pct*100+'%';
  document.getElementById('dbDot').style.top=pct*100+'%';
}

function updateCreatures(){
  const currentWy=depthToWy(depth);

  creatures.forEach(c=>{
    c.wx+=c.vx;
    c.phase+=0.015;
    if(Math.abs(c.wx)>canvas.width*0.75) c.vx*=-1;
    if(Math.random()<0.003) c.vx+=(Math.random()-0.5)*0.3;
    c.vx=clamp(c.vx,-2.5,2.5);
  });

  /* 화면 밖으로 완전히 벗어난 생물 제거 */
  creatures=creatures.filter(c=>{
    const sy=canvas.height/2+(c.wy-currentWy);
    return sy>-250&&sy<canvas.height+250;
  });

  /* 화면 안에 항상 최소 6마리 유지 */
  const visible=creatures.filter(c=>{
    const sy=canvas.height/2+(c.wy-currentWy);
    return sy>-80&&sy<canvas.height+80;
  }).length;

  if(visible<6){
    const avail=CREATURES.filter(c=>c.minDepth<=depth+500);
    if(avail.length>0){
      for(let i=0;i<3;i++){
        const tmpl=avail[Math.floor(Math.random()*avail.length)];
        creatures.push({
          wx:(Math.random()-0.5)*canvas.width*1.1,
          wy:currentWy+(Math.random()-0.5)*canvas.height*0.65,
          tmpl,
          vx:(Math.random()-0.5)*(tmpl.speed||0.5)*1.5,
          vy:0,
          size:Math.random()*14+10,
          phase:Math.random()*Math.PI*2,
          hover:false,
        });
      }
    }
  }

  /* 버블 */
  if(Math.random()<0.10){
    bubbles.push({
      wx:(Math.random()-0.5)*canvas.width*0.9,
      wy:currentWy+canvas.height*0.2+Math.random()*canvas.height*0.5,
      vx:(Math.random()-0.5)*0.4,
      vy:-(Math.random()*2+0.6),
      r:Math.random()*4+1,
      op:Math.random()*0.5+0.2,
      wobble:Math.random()*Math.PI*2,
    });
  }
  bubbles.forEach(b=>{
    b.wobble+=0.05;
    b.wx+=b.vx+Math.sin(b.wobble)*0.3;
    b.wy+=b.vy;
    b.op*=0.985;
  });
  bubbles=bubbles.filter(b=>{
    const sy=canvas.height/2+(b.wy-currentWy);
    return sy>-50&&b.op>0.02;
  });

  particles.forEach(p=>{p.wx+=p.vx;p.wy+=p.vy;p.vy+=0.05;p.op-=0.02;});
  particles=particles.filter(p=>p.op>0.02);

  if(infoCardTimer>0){
    infoCardTimer--;
    if(infoCardTimer<=0) document.getElementById('infoCard').classList.remove('show');
  }
}

function checkZoneAndEvents(){
  let zi=0;
  for(let i=ZONES.length-1;i>=0;i--){
    if(depth>=ZONES[i].minDepth){ zi=i; break; }
  }
  if(zi!==currentZoneIdx){
    currentZoneIdx=zi;
    const zone=ZONES[zi];
    showZoneToast(zone);
    showInfoCard(zone);
    document.getElementById('spZone').textContent=zone.name;
    document.getElementById('spZone').style.color=zone.color;
    if(zone.event&&!shownEvents.has(zi)){
      shownEvents.add(zi);
      setTimeout(()=>showEvent(zone.event),2000);
    }
  }
  if(depth>=11000&&!challengerShown){
    challengerShown=true;
    showDeepestReach();
  }
}

/* ===========================
   드로잉 — 배경
=========================== */
function drawBG(){
  const pct=depth/MAX_DEPTH;
  const cw=canvas.width, ch=canvas.height;
  const [r,g,b]=getDepthColor(depth);
  const scrollOffset=(depth*0.8)%ch;

  /* 기본 그라데이션 */
  const bgGrad=ctx.createLinearGradient(0,0,0,ch);
  bgGrad.addColorStop(0,`rgb(${Math.min(255,r+15)},${Math.min(255,g+20)},${Math.min(255,b+30)})`);
  bgGrad.addColorStop(1,`rgb(${r},${g},${b})`);
  ctx.fillStyle=bgGrad;
  ctx.fillRect(0,0,cw,ch);

  /* 배경 이미지 */
  if(bgLoaded&&bgImg.complete&&bgImg.naturalWidth>0){
    const sc=cw/bgImg.naturalWidth;
    const dh=bgImg.naturalHeight*sc;
    const totalScroll=pct*Math.max(dh,ch*3);
    const sy=-(totalScroll%(dh>ch?dh:ch*2));
    ctx.globalAlpha=0.32;
    ctx.drawImage(bgImg,0,sy,cw,dh);
    if(sy+dh<ch) ctx.drawImage(bgImg,0,sy+dh,cw,dh);
    ctx.globalAlpha=1;
  }

  /* 수면 빛 줄기 */
  if(pct<0.25){
    const op=(1-pct/0.25)*0.16;
    LIGHT_RAYS.forEach(ray=>{
      const rx=ray.x*cw+Math.sin(animT*0.3+ray.phase)*28;
      ctx.save(); ctx.translate(rx,0); ctx.rotate(ray.angle);
      const rg=ctx.createLinearGradient(0,0,0,ch*1.2);
      rg.addColorStop(0,`rgba(120,210,255,${op*1.2})`);
      rg.addColorStop(0.5,`rgba(100,180,255,${op*0.5})`);
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg;
      ctx.beginPath();
      ctx.moveTo(-ray.width/2,0); ctx.lineTo(ray.width/2,0);
      ctx.lineTo(ray.width*1.8,ch*1.2); ctx.lineTo(-ray.width*1.8,ch*1.2);
      ctx.closePath(); ctx.fill(); ctx.restore();
    });
    for(let i=0;i<Math.floor((1-pct/0.25)*18);i++){
      ctx.beginPath();
      ctx.arc(Math.random()*cw,Math.random()*(ch*0.12),Math.random()*1.5+0.3,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,240,255,${0.1+Math.random()*0.3})`; ctx.fill();
    }
  }

  /* 배경 파티클 — 수심에 따라 스크롤 */
  BG_PARTICLES.forEach(p=>{
    p.blink+=p.blinkSpeed;
    const flicker=0.5+Math.sin(p.blink)*0.5;
    const op=p.op*flicker;
    let col;
    if(p.isGreen&&pct>0.4){
      col=`rgba(0,255,160,${op*(pct-0.4)/0.6})`;
    } else {
      col=`rgba(100,200,255,${op*(1-pct*0.3)})`;
    }
    const py=((p.y*ch-scrollOffset)%ch+ch)%ch;
    ctx.beginPath(); ctx.arc(p.x*cw,py,p.r,0,Math.PI*2);
    ctx.fillStyle=col; ctx.fill();
  });

  /* 해양설 */
  const snowCnt=Math.floor(pct*22)+4;
  for(let i=0;i<snowCnt;i++){
    const sx=((i*0.618+0.1)%1)*cw+Math.sin(animT*0.5+i)*18;
    const sy=((i*0.17+animT*0.08+pct*3)%1)*ch;
    ctx.beginPath(); ctx.arc(sx,sy,Math.random()*1.5+0.3,0,Math.PI*2);
    ctx.fillStyle=`rgba(200,230,255,${Math.random()*0.18+0.03})`; ctx.fill();
  }

  /* 해저 지형 */
  TERRAIN_LAYERS.forEach(layer=>{
    const offsetX=depth*layer.parallax*0.08;
    const scrollY=depth*layer.parallax*0.04;
    const baseY=ch*(0.74-scrollY/ch*0.5);
    const clampedY=Math.max(ch*0.3,baseY);
    ctx.save(); ctx.beginPath(); ctx.moveTo(-50,ch);
    layer.pts.forEach((p,i)=>{
      const px=((p.x-(offsetX/cw%1)+2)%1)*cw*1.4-cw*0.2;
      const py=clampedY+p.y*ch*0.32;
      if(i===0) ctx.lineTo(px,py); else ctx.lineTo(px,py);
    });
    ctx.lineTo(cw+50,ch); ctx.closePath();
    ctx.fillStyle=layer.color; ctx.fill();
    ctx.strokeStyle=layer.stroke; ctx.lineWidth=1; ctx.stroke();
    ctx.restore();
  });

  /* 산호 & 해초 */
  if(pct<0.35){
    const coralOp=Math.min(1,(1-pct/0.35));
    ctx.save(); ctx.globalAlpha=coralOp;
    CORAL_LIST.forEach(c=>{
      const cx2=((c.x-depth/50000)%1+1)%1*cw;
      const cy2=ch*0.76;
      if(c.type==='coral') drawCoral(cx2,cy2,c.size,c.r,c.g,c.b,c.phase);
      else drawSeaweed(cx2,cy2,c.size,c.gr,c.gg,c.gb,c.phase);
    });
    ctx.restore();
  }

  /* 열수분출공 */
  if(pct>0.25){
    const ventOp=Math.min(1,(pct-0.25)/0.1);
    VENTS.forEach(v=>{
      const vx=((v.x-depth/100000)%1+1)%1*cw;
      drawVent(vx,ch*0.82,ventOp);
    });
  }

  /* 안개 & 비네팅 */
  const fog=ctx.createLinearGradient(0,ch*0.62,0,ch);
  fog.addColorStop(0,'transparent');
  fog.addColorStop(1,`rgba(${r},${g},${b},0.5)`);
  ctx.fillStyle=fog; ctx.fillRect(0,ch*0.62,cw,ch*0.38);

  const lv=ctx.createLinearGradient(0,0,cw*0.1,0);
  lv.addColorStop(0,'rgba(0,3,12,0.55)'); lv.addColorStop(1,'transparent');
  ctx.fillStyle=lv; ctx.fillRect(0,0,cw*0.1,ch);
  const rv=ctx.createLinearGradient(cw,0,cw*0.9,0);
  rv.addColorStop(0,'rgba(0,3,12,0.55)'); rv.addColorStop(1,'transparent');
  ctx.fillStyle=rv; ctx.fillRect(cw*0.9,0,cw*0.1,ch);
}

function drawCoral(x,y,size,r,g,b,phase){
  const col=`rgba(${r},${g},${b},0.75)`;
  ctx.strokeStyle=col; ctx.lineWidth=size*0.12; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-size); ctx.stroke();
  const branches=3+Math.floor(size/14);
  for(let i=0;i<branches;i++){
    const bh=(0.3+i*0.2)*size;
    const ba=-Math.PI/2+(i%2===0?1:-1)*(Math.PI/4+Math.sin(phase+i)*0.2);
    const bLen=size*(0.28+Math.sin(phase+i*0.5)*0.08);
    ctx.beginPath();
    ctx.moveTo(x,y-bh);
    ctx.lineTo(x+Math.cos(ba)*bLen,y-bh+Math.sin(ba)*bLen);
    ctx.lineWidth=size*0.07; ctx.stroke();
    ctx.beginPath();
    ctx.arc(x+Math.cos(ba)*bLen,y-bh+Math.sin(ba)*bLen,size*0.08,0,Math.PI*2);
    ctx.fillStyle=col; ctx.fill();
  }
}

function drawSeaweed(x,y,size,r,g,b,phase){
  ctx.strokeStyle=`rgba(${r},${g},${b},0.72)`;
  ctx.lineWidth=size*0.1; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x,y);
  for(let i=1;i<=7;i++){
    const t=i/7;
    const wave=Math.sin(animT*1.2+phase+i*0.9)*size*0.28*(1-t*0.4);
    ctx.lineTo(x+wave,y-size*t);
  }
  ctx.stroke();
}

function drawVent(x,y,op){
  ctx.save(); ctx.globalAlpha=op;
  ctx.fillStyle='rgba(35,35,50,0.92)';
  ctx.beginPath();
  ctx.moveTo(x-12,y); ctx.lineTo(x-8,y-40);
  ctx.lineTo(x+8,y-40); ctx.lineTo(x+12,y);
  ctx.closePath(); ctx.fill();
  for(let i=0;i<6;i++){
    const t=((animT*0.4+i*0.18)%1);
    const vy2=y-40-t*110;
    const vx2=x+Math.sin(animT*1.2+i)*18*t;
    const vr=6+t*22;
    const va=(0.45-t*0.4)*op;
    const vg=ctx.createRadialGradient(vx2,vy2,0,vx2,vy2,vr);
    vg.addColorStop(0,`rgba(255,${120+Math.floor(t*80)},0,${va})`);
    vg.addColorStop(1,'transparent');
    ctx.fillStyle=vg;
    ctx.beginPath(); ctx.arc(vx2,vy2,vr,0,Math.PI*2); ctx.fill();
  }
  const glow=ctx.createRadialGradient(x,y-40,0,x,y-40,48);
  glow.addColorStop(0,`rgba(255,100,0,${0.2*op})`);
  glow.addColorStop(1,'transparent');
  ctx.fillStyle=glow; ctx.fillRect(x-50,y-88,100,98);
  ctx.restore();
}

/* ===========================
   드로잉 — 생물
=========================== */
function drawBubbles(){
  const currentWy=depthToWy(depth);
  bubbles.forEach(b=>{
    const sx=canvas.width/2+b.wx;
    const sy=canvas.height/2+(b.wy-currentWy);
    ctx.save();
    ctx.beginPath(); ctx.arc(sx,sy,b.r,0,Math.PI*2);
    ctx.strokeStyle=`rgba(180,230,255,${b.op*0.7})`; ctx.lineWidth=0.8; ctx.stroke();
    const gg=ctx.createRadialGradient(sx-b.r*0.3,sy-b.r*0.3,0,sx,sy,b.r);
    gg.addColorStop(0,`rgba(220,245,255,${b.op*0.22})`); gg.addColorStop(1,'transparent');
    ctx.fillStyle=gg; ctx.fill();
    ctx.restore();
  });
}

function drawCreatures(){
  const currentWy=depthToWy(depth);
  creatures.forEach(c=>{
    const sx=canvas.width/2+c.wx;
    const sy=canvas.height/2+(c.wy-currentWy);
    if(sx<-80||sx>canvas.width+80||sy<-80||sy>canvas.height+80) return;
    ctx.save(); ctx.translate(sx,sy);
    const pulse=0.85+Math.sin(animT*2+c.phase)*0.15;
    const dir=c.vx<0?1:-1;
    ctx.scale(dir,1);

    /* 발광 */
    const gw=ctx.createRadialGradient(0,0,0,0,0,c.size*2.8*pulse);
    gw.addColorStop(0,c.tmpl.color+'55'); gw.addColorStop(1,'transparent');
    ctx.fillStyle=gw; ctx.fillRect(-c.size*3,-c.size*3,c.size*6,c.size*6);

    /* 호버 링 */
    if(c.hover){
      ctx.beginPath(); ctx.arc(0,0,c.size*1.8,0,Math.PI*2);
      ctx.strokeStyle=c.tmpl.color+'80'; ctx.lineWidth=1.5;
      ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
    }

    /* 몸 */
    ctx.beginPath(); ctx.ellipse(0,0,c.size,c.size*0.45,0,0,Math.PI*2);
    ctx.fillStyle=c.tmpl.color; ctx.fill();

    /* 꼬리 */
    const tail=Math.sin(animT*3+c.phase)*0.3;
    ctx.save(); ctx.translate(-c.size,0); ctx.rotate(tail);
    ctx.beginPath(); ctx.moveTo(0,0);
    ctx.lineTo(-c.size*0.7,c.size*0.5); ctx.lineTo(-c.size*0.7,-c.size*0.5);
    ctx.closePath(); ctx.fillStyle=c.tmpl.color; ctx.fill(); ctx.restore();

    /* 눈 */
    ctx.beginPath(); ctx.arc(c.size*0.5,-c.size*0.1,c.size*0.13,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.fill();
    ctx.beginPath(); ctx.arc(c.size*0.52,-c.size*0.09,c.size*0.07,0,Math.PI*2);
    ctx.fillStyle='#020810'; ctx.fill();

    ctx.globalAlpha=1;
    ctx.scale(dir,1);
    ctx.font='11px sans-serif'; ctx.textAlign='center';
    ctx.fillStyle=`rgba(255,255,255,${c.hover?0.92:0.5})`;
    ctx.fillText(c.tmpl.name,0,-c.size*1.75);
    if(c.hover){
      ctx.font='9px sans-serif';
      ctx.fillStyle='rgba(160,220,255,0.7)';
      ctx.fillText('클릭하여 자세히 보기',0,-c.size*2.45);
    }
    ctx.textAlign='start'; ctx.restore();
  });
}

/* ===========================
   드로잉 — 파티클
=========================== */
function drawParticles(){
  const currentWy=depthToWy(depth);
  particles.forEach(p=>{
    const sx=canvas.width/2+p.wx;
    const sy=canvas.height/2+(p.wy-currentWy);
    ctx.beginPath(); ctx.arc(sx,sy,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(180,220,255,${p.op})`; ctx.fill();
  });
}

/* ===========================
   드로잉 — 어둠 & 손전등
=========================== */
function drawDarkness(){
  const pct=depth/MAX_DEPTH;
  if(pct<0.018) return;

  const dark=Math.min(0.97,pct*1.25);
  const cw=canvas.width, ch=canvas.height;

  /* 전체 화면 어둠 */
  ctx.fillStyle=`rgba(0,3,10,${dark})`;
  ctx.fillRect(0,0,cw,ch);

  /* destination-out 으로 마우스 위치 빛 뚫기 */
  ctx.globalCompositeOperation='destination-out';

  /* 깊을수록 손전등 범위 넓어짐 + 밝아짐 */
  const flashR=lerp(50, Math.max(cw,ch)*0.72, pct);
  const brightness=lerp(dark*0.15, dark, pct);

  const mg=ctx.createRadialGradient(mouseX,mouseY,0,mouseX,mouseY,flashR);
  mg.addColorStop(0,   `rgba(0,0,0,${brightness})`);
  mg.addColorStop(0.2, `rgba(0,0,0,${brightness*0.95})`);
  mg.addColorStop(0.5, `rgba(0,0,0,${brightness*0.55})`);
  mg.addColorStop(0.78,`rgba(0,0,0,${brightness*0.15})`);
  mg.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle=mg;
  ctx.beginPath(); ctx.arc(mouseX,mouseY,flashR,0,Math.PI*2); ctx.fill();

  ctx.globalCompositeOperation='source-over';

  /* 손전등 발광 테두리 — 깊을수록 강해짐 */
  const glowIntensity=pct*0.22;
  const glow=ctx.createRadialGradient(mouseX,mouseY,0,mouseX,mouseY,flashR*0.45);
  glow.addColorStop(0,  `rgba(180,230,255,${glowIntensity})`);
  glow.addColorStop(0.5,`rgba(120,190,255,${glowIntensity*0.4})`);
  glow.addColorStop(1,  'transparent');
  ctx.fillStyle=glow;
  ctx.beginPath(); ctx.arc(mouseX,mouseY,flashR*0.45,0,Math.PI*2); ctx.fill();

  /* 커서 중심 밝은 점 */
  const dotR=lerp(3,16,pct);
  const dot=ctx.createRadialGradient(mouseX,mouseY,0,mouseX,mouseY,dotR);
  dot.addColorStop(0,  `rgba(220,245,255,${pct*0.9})`);
  dot.addColorStop(0.5,`rgba(180,220,255,${pct*0.4})`);
  dot.addColorStop(1,  'transparent');
  ctx.fillStyle=dot;
  ctx.beginPath(); ctx.arc(mouseX,mouseY,dotR,0,Math.PI*2); ctx.fill();

  /* 커서 십자선 */
  if(pct>0.05){
    const crossOp=Math.min(0.5,pct*0.6);
    const crossSize=lerp(6,18,pct);
    ctx.strokeStyle=`rgba(200,235,255,${crossOp})`;
    ctx.lineWidth=0.8;
    ctx.beginPath();
    ctx.moveTo(mouseX-crossSize,mouseY); ctx.lineTo(mouseX+crossSize,mouseY);
    ctx.moveTo(mouseX,mouseY-crossSize); ctx.lineTo(mouseX,mouseY+crossSize);
    ctx.stroke();
  }
}

/* ===========================
   메인 루프
=========================== */
function loop(ts){
  const dt=Math.min((ts-lastTime)/1000,0.05);
  lastTime=ts; animT+=0.016;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  updateDepth();
  updateCreatures();
  checkZoneAndEvents();
  drawBG();
  drawBubbles();
  drawCreatures();
  drawDarkness();
  drawParticles();
  requestAnimationFrame(loop);
}

/* ===========================
   초기화
=========================== */
function init(){
  mouseX=canvas.width/2;
  mouseY=canvas.height/2;
  initTerrainData();

  /* 초기 생물 스폰 */
  const initCreatures=[CREATURES[1],CREATURES[2],CREATURES[5]];
  for(let i=0;i<9;i++){
    const tmpl=initCreatures[i%initCreatures.length];
    creatures.push({
      wx:(Math.random()-0.5)*canvas.width*1.1,
      wy:depthToWy(0)+(Math.random()-0.5)*canvas.height*0.7,
      tmpl,
      vx:(Math.random()-0.5)*(tmpl.speed||0.5)*1.5,
      vy:0,
      size:Math.random()*14+10,
      phase:Math.random()*Math.PI*2,
      hover:false,
    });
  }

  updateDogan();
  showZoneToast(ZONES[0]);
  showInfoCard(ZONES[0]);
  requestAnimationFrame(loop);
}

init();

})();

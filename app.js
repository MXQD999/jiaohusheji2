/* ============================================================
   指尖遇春 · 交互逻辑
   状态机：loading → cover → awaken(冰封) → spring → choice
           → lichun(六雪) → yushui(六雨) → poster → jingzhe
   ============================================================ */
(() => {
  'use strict';

  /* ---------------- 内容数据 ---------------- */
  const KNOWLEDGE = {
    lichun: [
      {
        chapter: '物候 · 三候', title: '东风解冻', art: '#artPlum', caption: '一候 · 冰澌溶泄',
        body: [
          '立春一候，东风送暖，冻了一冬的土地开始松软。古人把立春十五天分作三候：初候东风解冻，二候蛰虫始振，三候鱼陟负冰——鱼儿负着未化的碎冰浮上水面。',
          '一候五日，是黄河流域的物候刻度。它提醒我们：春天不是一天来的，是一寸一寸化开的。'
        ],
        quote: '「立，始建也。春气始而建立也。」——《月令七十二候集解》'
      },
      {
        chapter: '食俗 · 咬春', title: '春盘', art: '#artDish', caption: '一物 · 春饼与五辛',
        body: [
          '立春吃春饼、春卷，把时蔬卷进薄饼，一口咬下，名唤「咬春」。北方咬萝卜，取「咬得草根断，则百事可做」的劲头。',
          '南方摆五辛盘：葱、蒜、椒、姜、芥，辛味发散，替身体开一扇窗。唐时春盘已是立春标配。'
        ],
        quote: '「春日春盘细生菜，忽忆两京梅发时。」——杜甫'
      },
      {
        chapter: '民俗 · 打春', title: '春牛', art: 'seal:打春', caption: '鞭春牛 · 戴春鸡',
        body: [
          '立春前一日，官府迎春于东郊；次日鞭打土牛，谓之「打春」。牛腹塞五谷，鞭破则谷落，众人争抢，寓意五谷丰登。',
          '民间还给孩子戴「春鸡」——布缝的小公鸡缀在帽上，「鸡」谐「吉」，也取报晓催耕之意。'
        ],
        quote: '「立春之日，天子亲率三公九卿诸侯大夫，以迎春于东郊。」——《礼记·月令》'
      },
      {
        chapter: '诗词 · 立春', title: '草木知春', art: '#artScroll', caption: '张栻《立春偶成》',
        body: [
          '南宋张栻写立春，只四句，句句是「化开」：律回岁晚冰霜少，春到人间草木知。',
          '便觉眼前生意满，东风吹水绿参差。冰霜渐少不是轰然的，是草木先知道——这份「先觉」，正是节气的细腻处。'
        ],
        quote: '「律回岁晚冰霜少，春到人间草木知。」——张栻'
      },
      {
        chapter: '农事 · 备耕', title: '顶凌耙地', art: '#artSprout', caption: '立春一年端',
        body: [
          '立春后地气上升，表土昼消夜冻，农人趁「顶凌」耙地保墒。华北备种育苗，江南检修农具。',
          '此时最怕「倒春寒」——一场霜，能把返青的麦子打回原形。'
        ],
        quote: '「立春一年端，种地早盘算。」——农谚'
      },
      {
        chapter: '民俗 · 荣华', title: '绒花', art: '#artRonghua', caption: '蚕丝染色 · 永不凋谢',
        body: [
          '绒花以蚕丝染色，盘成花瓣，谐音「荣华」，是旧时立春和春节女子佩戴的应景饰物。',
          '它永不凋谢：丝线不腐，花色不褪，戴在鬓边，是一整年的好彩头。唐代已为宫廷贡品，宋代遍及民间。'
        ],
        quote: '「戴绒花，趁春风。」——民间俗语'
      }
    ],
    yushui: [
      {
        chapter: '物候 · 三候', title: '獭祭鱼', art: '#artGoose', caption: '一候 · 水暖鱼上',
        body: [
          '雨水一候「獭祭鱼」：水暖鱼上，水獭捕鱼后陈列岸边，古人视作祭祀。',
          '二候「鸿雁来」，雁自南方北归；三候「草木萌动」，土里的种子开始抽芽。三个物候都指向同一件事：水，回来了。'
        ],
        quote: '「正月中，天一生水。春始属木，然生木者必水也。」——《月令七十二候集解》'
      },
      {
        chapter: '食俗 · 罐罐肉', title: '春笋', art: '#artBamboo', caption: '春笋 · 罐罐肉',
        body: [
          '雨水时节，春笋破土，江南人「油焖笋」「腌笃鲜」，吃的是那一口脆嫩。',
          '川西出嫁的女儿这天回娘家，提一罐「罐罐肉」——猪脚炖大豆，海带缠口，谢父母养育。客家人「占稻色」，爆炒糯谷，卜一年收成。'
        ],
        quote: '「好雨知时节，当春乃发生。」——杜甫'
      },
      {
        chapter: '民俗 · 归宁', title: '回娘家', art: 'seal:归宁', caption: '接寿 · 拉保保',
        body: [
          '川西「回娘家」：出嫁女携礼归宁，母亲回赠一把红伞，寓意「遮风挡雨」。',
          '广汉一带「拉保保」：为孩子认干爹，取护佑之意，仪式就在雨水这天。还有「撞拜寄」——清早出门，撞见谁就让谁给孩子取名。'
        ],
        quote: '「雨水节，回娘家，罐罐肉香飘满坝。」——川西民谣'
      },
      {
        chapter: '诗词 · 喜雨', title: '春夜喜雨', art: '#artScroll', caption: '杜甫 · 成都草堂',
        body: [
          '杜甫在成都草堂写下《春夜喜雨》，把一场雨写成了懂事的客人。',
          '「随风潜入夜，润物细无声」——好雨不喧哗，只在夜里慢慢渗进土里。末句「晓看红湿处，花重锦官城」，雨后的成都是沉甸甸的春天。'
        ],
        quote: '「随风潜入夜，润物细无声。」——杜甫《春夜喜雨》'
      },
      {
        chapter: '养生 · 春捂', title: '春捂', art: 'seal:春捂', caption: '下厚上薄 · 少酸多甘',
        body: [
          '雨水前后寒气未退，养生讲「春捂」：下厚上薄，护住腿脚与腰腹。',
          '饮食少酸多甘：山药、红枣、小米粥，养脾胃以应春气。作息宜早睡早起，「被发缓形」，把身体松开，才接得住春天。'
        ],
        quote: '「春捂秋冻，不生杂病。」——民间俗语'
      },
      {
        chapter: '农事 · 春灌', title: '小春管理', art: 'seal:春灌', caption: '大春备耕',
        body: [
          '雨水一到，小麦返青、油菜抽薹，小春作物进入水肥关键期，抓紧春灌、追肥、清沟排渍。',
          '大春备耕也开始了：选种、修渠、育秧。一年的忙碌，从这场雨起头。'
        ],
        quote: '「雨水有雨庄稼好，大春小春一片宝。」——农谚'
      }
    ]
  };

  const POS = {
    wide: [[35, 27], [53, 22], [71, 33], [39, 55], [58, 60], [77, 63]],
    narrow: [[27, 26], [73, 23], [30, 45], [70, 43], [27, 64], [72, 62]]
  };

  /* ---------------- 状态 ---------------- */
  const state = {
    read: { lichun: new Set(), yushui: new Set() },
    term: 'lichun',
    stack: ['loading'],
    iceDone: false
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isNarrow = () => window.matchMedia('(max-width: 820px)').matches;

  /* ---------------- 屏切换 ---------------- */
  const screens = {};
  $$('.screen').forEach(el => { screens[el.id.replace('s-', '')] = el; });

  function show(name, opts = {}) {
    const prevName = state.stack[state.stack.length - 1];
    const cur = screens[prevName];
    const next = screens[name];
    if (!next || cur === next) return;
    if (opts.push !== false) state.stack.push(name);
    if (cur) { cur.classList.remove('is-active'); cur.classList.add('is-leaving'); }
    next.classList.add('is-active');
    setTimeout(() => { if (cur) cur.classList.remove('is-leaving'); }, 1000);
    if (prevName === 'awaken' && name !== 'awaken') stopFrostLoop();
    if (name === 'lichun') enterTerm('lichun');
    if (name === 'yushui') enterTerm('yushui');
    if (name === 'poster') drawPoster();
    if (name === 'awaken') initFrost();
  }

  function goBack(target) {
    if (target && screens[target]) { show(target); return; }
    const idx = state.stack.length - 1;
    if (idx > 0) {
      const prev = state.stack[idx - 1];
      state.stack.pop();
      show(prev, { push: false });
    }
  }

  /* ---------------- toast ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-on'), 1800);
  }

  /* ---------------- 冰封画布 ---------------- */
  const frost = { canvas: null, ctx: null, dpr: 1, w: 0, h: 0, erased: 0, lastMove: 0, timer: 0, bound: false, done: false };

  function initFrost() {
    const c = $('#frost');
    frost.canvas = c;
    frost.ctx = c.getContext('2d');
    frost.done = false;
    frost.erased = 0;
    frost.lastMove = performance.now();
    sizeFrost();
    paintFrost();
    bindFrost();
    updateIcePct(0);
    c.style.opacity = '1';
    startFrostLoop();
  }

  function startFrostLoop() {
    stopFrostLoop();
    frost.timer = setInterval(tickFrost, 140);
  }
  function stopFrostLoop() {
    if (frost.timer) { clearInterval(frost.timer); frost.timer = 0; }
  }

  function sizeFrost() {
    const c = frost.canvas;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    frost.dpr = dpr;
    frost.w = window.innerWidth;
    frost.h = window.innerHeight;
    c.width = Math.floor(frost.w * dpr);
    c.height = Math.floor(frost.h * dpr);
    c.style.width = frost.w + 'px';
    c.style.height = frost.h + 'px';
    frost.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function paintFrost() {
    const ctx = frost.ctx, w = frost.w, h = frost.h;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, w * 0.35, h);
    g.addColorStop(0, 'rgba(230,243,246,0.94)');
    g.addColorStop(0.42, 'rgba(206,228,234,0.92)');
    g.addColorStop(1, 'rgba(180,210,219,0.93)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // 霜的颗粒
    for (let i = 0; i < Math.round(w * h / 2800); i++) {
      const x = Math.random() * w, y = Math.random() * h;
      const r = Math.random() * 1.4 + 0.3;
      ctx.fillStyle = Math.random() > 0.55 ? 'rgba(255,255,255,0.55)' : 'rgba(150,190,202,0.3)';
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }

    // 冰裂纹：自四边向内蔓延的折线
    const crack = (x, y, ang, len, width, depth) => {
      const ink = ctx.strokeStyle;
      let cx = x, cy = y, a = ang;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      let remaining = len;
      while (remaining > 6) {
        const seg = Math.min(remaining, 26 + Math.random() * 54);
        a += (Math.random() - 0.5) * 0.9;
        cx += Math.cos(a) * seg;
        cy += Math.sin(a) * seg;
        ctx.lineTo(cx, cy);
        remaining -= seg;
        if (depth > 0 && Math.random() > 0.45) {
          crack(cx, cy, a + (Math.random() - 0.5) * 1.8, seg * 0.8, width * 0.6, depth - 1);
          ctx.lineWidth = width;
          ctx.strokeStyle = ink;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
        }
      }
      ctx.stroke();
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const seeds = [
      [w * 0.02, h * 0.18, -0.28, 300, 1.6, 2],
      [w * 0.98, h * 0.44, Math.PI + 0.22, 380, 1.7, 2],
      [w * 0.28, h * 0.99, -Math.PI / 2 + 0.3, 260, 1.4, 2],
      [w * 0.74, h * 0.02, Math.PI / 2 - 0.35, 280, 1.5, 2],
      [w * 0.12, h * 0.72, -0.5, 160, 1.0, 1],
      [w * 0.86, h * 0.9, -Math.PI + 0.4, 170, 1.0, 1]
    ];
    // 先一层冷灰阴影，再压一道白霜线——让冰裂在纸面上读得出来
    ctx.strokeStyle = 'rgba(112,150,166,0.13)';
    seeds.forEach(s => crack(s[0], s[1], s[2], s[3], s[4] * 2.6, s[5]));
    ctx.strokeStyle = 'rgba(255,255,255,0.72)';
    seeds.forEach(s => crack(s[0], s[1], s[2], s[3], s[4], s[5]));

    // 边缘霜花丛
    ctx.strokeStyle = 'rgba(255,255,255,0.44)';
    ctx.lineWidth = 0.9;
    const spots = 18;
    for (let i = 0; i < spots; i++) {
      const edge = Math.floor(Math.random() * 4);
      let sx, sy;
      if (edge === 0) { sx = Math.random() * w; sy = Math.random() * h * 0.1; }
      else if (edge === 1) { sx = Math.random() * w; sy = h - Math.random() * h * 0.1; }
      else if (edge === 2) { sx = Math.random() * w * 0.08; sy = Math.random() * h; }
      else { sx = w - Math.random() * w * 0.08; sy = Math.random() * h; }
      const arms = 5 + Math.floor(Math.random() * 4);
      const r = 12 + Math.random() * 26;
      for (let k = 0; k < arms; k++) {
        const a = (Math.PI * 2 / arms) * k + Math.random() * 0.3;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r);
        ctx.stroke();
      }
    }

    // 边缘冷光
    const edge = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.62);
    edge.addColorStop(0, 'rgba(255,255,255,0)');
    edge.addColorStop(1, 'rgba(246,252,253,0.5)');
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, w, h);

    // 冰下的冷光
    const rg = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, Math.max(w, h) * 0.5);
    rg.addColorStop(0, 'rgba(255,255,255,0.3)');
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, w, h);
  }

  function bindFrost() {
    const c = frost.canvas;
    if (frost.bound) return;
    frost.bound = true;
    let drawing = false;
    let last = null;

    const pos = e => {
      const r = c.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    };

    const erase = (x, y) => {
      const ctx = frost.ctx;
      const radius = Math.max(52, Math.min(frost.w, frost.h) * 0.1);
      ctx.globalCompositeOperation = 'destination-out';
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(0.62, 'rgba(0,0,0,0.92)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const drawLine = (a, b) => {
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      const steps = Math.max(1, Math.ceil(dist / 12));
      for (let i = 1; i <= steps; i++) {
        erase(a.x + (b.x - a.x) * i / steps, a.y + (b.y - a.y) * i / steps);
      }
      if (dist < 6) erase(b.x, b.y);
    };

    const start = e => {
      e.preventDefault();
      drawing = true; last = pos(e); frost.lastMove = performance.now();
      erase(last.x, last.y);
    };
    const move = e => {
      if (!drawing) return;
      e.preventDefault();
      const p = pos(e);
      if (last) drawLine(last, p);
      last = p;
      frost.lastMove = performance.now();
    };
    const end = () => { drawing = false; last = null; };

    if (window.PointerEvent) {
      c.addEventListener('pointerdown', start);
      c.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    } else {
      c.addEventListener('mousedown', start);
      c.addEventListener('mousemove', move);
      window.addEventListener('mouseup', end);
      c.addEventListener('touchstart', start, { passive: false });
      c.addEventListener('touchmove', move, { passive: false });
      c.addEventListener('touchend', end);
    }
  }

  function frostRatio() {
    const ctx = frost.ctx;
    if (!ctx) return 0;
    const step = 26;
    const w = frost.w, h = frost.h;
    let total = 0, clear = 0;
    for (let y = step / 2; y < h; y += step) {
      for (let x = step / 2; x < w; x += step) {
        total++;
        const d = ctx.getImageData(Math.floor(x * frost.dpr), Math.floor(y * frost.dpr), 1, 1).data;
        if (d[3] < 110) clear++;
      }
    }
    return total ? clear / total : 0;
  }

  let lastRatioAt = 0;
  function tickFrost() {
    if (frost.done || !frost.ctx) return;
    const now = performance.now();
    if (now - lastRatioAt > 300) {
      lastRatioAt = now;
      frost.erased = frostRatio();
      updateIcePct(Math.round(frost.erased * 100));
      if (frost.erased > 0.8) { meltIce(); return; }
    }
    // 停止滑动后缓慢回冻
    if (now - frost.lastMove > 1700 && frost.erased < 0.78 && frost.erased > 0.02) {
      const ctx = frost.ctx;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(214,232,236,0.035)';
      ctx.fillRect(0, 0, frost.w, frost.h);
    }
  }

  function updateIcePct(v) {
    const el = $('#icePct');
    if (el) el.textContent = v;
  }

  function meltIce() {
    if (frost.done) return;
    frost.done = true;
    stopFrostLoop();
    const c = frost.canvas;
    if (c) { c.style.transition = 'opacity 1.3s cubic-bezier(.22,.61,.36,1)'; c.style.opacity = '0'; }
    setTimeout(() => { show('spring'); }, 900);
  }

  /* ---------------- 节气探索 ---------------- */
  function positions() { return isNarrow() ? POS.narrow : POS.wide; }

  function buildField(term) {
    const field = $('#' + term + 'Field');
    if (!field || field.dataset.built) return;
    const items = KNOWLEDGE[term];
    items.forEach((k, i) => {
      const b = document.createElement('button');
      b.className = 'node ' + (term === 'lichun' ? 'snow' : 'drop');
      b.type = 'button';
      b.dataset.index = i;
      b.style.setProperty('--d', (i * 0.16).toFixed(2) + 's');
      b.setAttribute('aria-label', k.chapter + '：' + k.title);
      if (term === 'lichun') {
        b.style.setProperty('--sz', [62, 84, 54, 92, 74, 60][i] + 'px');
        b.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#flake"/></svg>' +
          '<span class="snow-tag">' + k.title + '<small>点击查看</small></span>';
      } else {
        b.style.setProperty('--sz', [26, 34, 22, 38, 30, 26][i] + 'px');
        b.innerHTML = '<svg viewBox="0 0 40 56" aria-hidden="true"><use href="#drop"/></svg>' +
          '<span class="snow-tag">' + k.title + '<small>点击查看</small></span>';
      }
      b.addEventListener('click', () => openKnow(term, i));
      field.appendChild(b);
    });
    field.dataset.built = '1';
    layoutField(term);
    renderProgress(term);
  }

  function layoutField(term) {
    const field = $('#' + term + 'Field');
    if (!field) return;
    const p = positions();
    $$('.node', field).forEach((el, i) => {
      el.style.left = p[i][0] + '%';
      el.style.top = p[i][1] + '%';
    });
  }

  function renderProgress(term) {
    const n = KNOWLEDGE[term].length;
    const read = state.read[term].size;
    const countEl = $('#' + (term === 'lichun' ? 'lcCount' : 'ysCount'));
    const dotsEl = $('#' + (term === 'lichun' ? 'lcDots' : 'ysDots'));
    const hintEl = $('#' + (term === 'lichun' ? 'lcHint' : 'ysHint'));
    const cn = ['〇', '一', '二', '三', '四', '五', '六'];
    if (countEl) countEl.textContent = cn[read] || read;
    if (dotsEl) {
      if (!dotsEl.dataset.built) {
        dotsEl.innerHTML = Array.from({ length: n }, () => '<span></span>').join('');
        dotsEl.dataset.built = '1';
      }
      $$('span', dotsEl).forEach((d, i) => d.classList.toggle('on', i < read));
    }
    if (hintEl) {
      hintEl.textContent = read === 0
        ? (term === 'lichun' ? '点一片雪 · 解一段春' : '点一滴雨 · 听一段春')
        : (read < n ? '已解 ' + read + ' 处 · 还剩 ' + (n - read) + ' 处' : (term === 'lichun' ? '雪已尽 · 可化而为雨' : '雨已足 · 可成海报'));
    }

    // 下一处提示
    const nodes = $$('.node', $('#' + term + 'Field'));
    nodes.forEach((el, i) => {
      el.classList.toggle('is-read', state.read[term].has(i));
      el.classList.remove('is-next');
    });
    const nextIdx = KNOWLEDGE[term].findIndex((_, i) => !state.read[term].has(i));
    if (nextIdx >= 0 && nodes[nextIdx]) nodes[nextIdx].classList.add('is-next');

    // 解锁
    if (term === 'lichun') {
      const done = read >= n;
      const cont = $('#lcContinue');
      if (cont) cont.disabled = !done;
      $('#dockYushui').disabled = !done;
      $('#pickYushui').disabled = !done;
      $('#pickYushui').classList.toggle('is-locked', !done);
      const cond = $('#lcCond');
      if (cond) cond.textContent = done ? '雪尽雨来' : '集齐六雪解锁';
      if (done && !state.iceDone) {
        state.iceDone = true;
        toast('六雪已尽 · 可化而为雨');
      }
    }
    if (term === 'yushui') {
      const done = read >= n;
      const cont = $('#ysContinue');
      if (cont) cont.disabled = !done;
      if ($('#dockPoster2')) $('#dockPoster2').disabled = !done;
      if ($('#dockPoster')) $('#dockPoster').disabled = !done;
      const cond = $('#ysCond');
      if (cond) cond.textContent = done ? '海报已可生成' : '集齐六雨解锁';
    }
  }

  function enterTerm(term) {
    state.term = term;
    buildField(term);
    layoutField(term);
    renderProgress(term);
  }

  /* ---------------- 知识弹窗 ---------------- */
  let current = null;
  const modal = $('#modal');

  // art 规格：'#artXxx' 引用 symbol；'seal:印文' 生成朱砂印
  function artMarkup(spec) {
    if (spec && spec.indexOf('seal:') === 0) {
      const chars = spec.slice(5).split('');
      const y0 = chars.length > 1 ? 172 : 186;
      const lines = chars.map((c, i) =>
        '<text x="120" y="' + (y0 + i * 36) + '" text-anchor="middle" font-size="30" ' +
        'letter-spacing="2" fill="#A63D2A" font-family="Noto Serif SC, serif">' + c + '</text>').join('');
      return '<svg viewBox="0 0 240 320"><g fill="none">' +
        '<rect x="74" y="116" width="92" height="92" rx="3" fill="rgba(166,61,42,.06)" stroke="#A63D2A" stroke-width="2"/>' +
        '<rect x="80" y="122" width="80" height="80" fill="none" stroke="#A63D2A" stroke-width=".7" opacity=".45"/>' +
        '</g>' + lines +
        '<path d="M120 224 L120 260" stroke="#A63D2A" stroke-width="1" opacity=".25"/></svg>';
    }
    return '<svg viewBox="0 0 240 320"><use href="' + spec + '"/></svg>';
  }

  function openKnow(term, index) {
    const k = KNOWLEDGE[term][index];
    current = { term, index };
    $('#modalChapter').textContent = k.chapter;
    $('#modalTitle').textContent = k.title;
    $('#modalCaption').textContent = k.caption;
    $('#modalArt').innerHTML = artMarkup(k.art);
    $('#modalText').innerHTML = k.body.map(p => '<p>' + p + '</p>').join('');
    $('#modalQuote').textContent = k.quote;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';

    state.read[term].add(index);
    renderProgress(term);

    // 下一片雪：优先同节气内未读的下一片
    const list = KNOWLEDGE[term];
    let nextIdx = -1;
    for (let step = 1; step <= list.length; step++) {
      const j = (index + step) % list.length;
      if (!state.read[term].has(j)) { nextIdx = j; break; }
    }
    const nextBtn = $('#modalNext');
    nextBtn.hidden = nextIdx < 0;
    nextBtn.dataset.next = String(nextIdx);
    nextBtn.innerHTML = '下一' + (term === 'lichun' ? '片雪' : '滴雨') + '<span class="arrow-mini"></span>';
  }

  function closeKnow() {
    if (!current) return;
    modal.classList.remove('is-open');
    setTimeout(() => { modal.hidden = true; }, 620);
    current = null;
  }

  $('#modalClose').addEventListener('click', closeKnow);
  $('#modalDone').addEventListener('click', closeKnow);
  $('#modalNext').addEventListener('click', () => {
    if (!current) return;
    const { term } = current;
    const idx = Number($('#modalNext').dataset.next);
    if (isNaN(idx) || idx < 0) return;
    modal.classList.remove('is-open');
    setTimeout(() => {
      modal.classList.add('is-open');
      openKnow(term, idx);
    }, 260);
  });
  $('.modal-veil').addEventListener('click', closeKnow);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (current) closeKnow(); }
  });

  $('#copyKnow').addEventListener('click', async () => {
    if (!current) return;
    const k = KNOWLEDGE[current.term][current.index];
    const text = k.title + '｜' + k.chapter + '\n' + k.body.join('\n') + '\n' + k.quote + '\n—— 指尖遇春 · ' + (current.term === 'lichun' ? '立春' : '雨水');
    try {
      await navigator.clipboard.writeText(text);
      toast('已复制这段知识');
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('已复制这段知识'); }
      catch (e2) { toast('复制失败，请手动选择'); }
      ta.remove();
    }
  });

  /* ---------------- 海报 ---------------- */
  function drawPoster() {
    const cv = $('#posterCanvas');
    if (!cv) return;
    const W = 675, H = 900, S = 2;
    cv.width = W * S; cv.height = H * S;
    const ctx = cv.getContext('2d');
    ctx.setTransform(S, 0, 0, S, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 纸
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#FBF8EF');
    bg.addColorStop(1, '#EFE7D4');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // 颗粒
    for (let i = 0; i < 5200; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(30,33,28,0.035)' : 'rgba(255,255,255,0.35)';
      ctx.fillRect(x, y, 1, 1);
    }

    // 远山
    const mY = 640;
    ctx.save();
    ctx.beginPath(); ctx.moveTo(0, H);
    ctx.lineTo(0, mY + 40);
    ctx.bezierCurveTo(120, mY - 20, 200, mY + 30, 300, mY - 10);
    ctx.bezierCurveTo(400, mY - 46, 470, mY + 10, 560, mY - 20);
    ctx.bezierCurveTo(620, mY - 40, 660, mY - 10, W, mY - 26);
    ctx.lineTo(W, H); ctx.closePath();
    ctx.fillStyle = 'rgba(185,199,174,0.55)'; ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath(); ctx.moveTo(0, H);
    ctx.lineTo(0, mY + 120);
    ctx.bezierCurveTo(150, mY + 80, 260, mY + 140, 380, mY + 108);
    ctx.bezierCurveTo(500, mY + 76, 580, mY + 130, W, mY + 112);
    ctx.lineTo(W, H); ctx.closePath();
    ctx.fillStyle = 'rgba(78,110,86,0.16)'; ctx.fill();
    ctx.restore();

    // 日轮
    const sun = ctx.createRadialGradient(520, 150, 0, 520, 150, 150);
    sun.addColorStop(0, 'rgba(232,206,142,0.55)');
    sun.addColorStop(1, 'rgba(232,206,142,0)');
    ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(520, 150, 150, 0, Math.PI * 2); ctx.fill();

    // 边框
    ctx.strokeStyle = 'rgba(30,33,28,0.22)'; ctx.lineWidth = 1;
    ctx.strokeRect(28.5, 28.5, W - 57, H - 57);
    ctx.strokeStyle = 'rgba(201,161,92,0.55)';
    ctx.strokeRect(36.5, 36.5, W - 73, H - 73);

    // 竖排文字工具
    const vText = (text, x, y, size, color, gap = 1.02, weight = 400, family = 'serif') => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = weight + ' ' + size + 'px ' + family;
      let cy = y;
      for (const ch of text) {
        ctx.fillText(ch, x, cy);
        cy += size * gap;
      }
      ctx.restore();
      return cy;
    };
    const serif = '"Noto Serif SC","Songti SC",serif';
    const num = '"Cormorant Garamond","Times New Roman",serif';

    // 标题
    vText('指尖遇春', 74, 92, 30, '#1E211C', 1.08, 700, serif);
    vText('立春 · 雨水', 74, 330, 11, '#6F7466', 1.25, 400, serif);

    // 诗
    vText('好雨知时节', 372, 118, 40, '#1E211C', 1.04, 700, serif);
    vText('当春乃发生', 300, 118, 40, '#2F4C3E', 1.04, 700, serif);
    vText('—— 杜甫《春夜喜雨》', 430, 300, 11, '#6F7466', 1.3, 400, serif);

    // 中央水印
    ctx.save();
    ctx.globalAlpha = 0.022;
    ctx.fillStyle = '#2F4C3E';
    ctx.font = '700 210px ' + serif;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('春', 300, 486);
    ctx.restore();

    // 分隔
    ctx.strokeStyle = 'rgba(30,33,28,0.14)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(118, 578); ctx.lineTo(556, 578); ctx.stroke();
    ctx.fillStyle = '#8A8F80';
    ctx.font = '400 13px ' + serif;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('六 雪 · 六 雨 · 一 卷 春 已 读 尽', 337, 604);

    // 十二节气小印
    const terms = ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑'];
    const startX = 84, gap = 40;
    terms.forEach((t, i) => {
      const x = startX + i * gap, y = 700;
      const hot = i < 2;
      ctx.strokeStyle = hot ? 'rgba(166,61,42,0.9)' : 'rgba(30,33,28,0.22)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 13, y - 13, 26, 26);
      ctx.fillStyle = hot ? '#A63D2A' : 'rgba(30,33,28,0.28)';
      ctx.font = '600 10px ' + serif;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(t, x, y + 0.5);
    });

    // 底部
    ctx.fillStyle = '#1E211C';
    ctx.font = '500 22px ' + num;
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('2026 · 春', 74, 826);
    ctx.fillStyle = '#6F7466';
    ctx.font = '400 11px ' + num;
    ctx.fillText('NO. 0031  ·  二十四节气 · 春之卷', 74, 848);

    // 朱砂大印
    ctx.fillStyle = '#A63D2A';
    ctx.fillRect(548, 776, 54, 54);
    ctx.strokeStyle = 'rgba(251,248,239,0.55)'; ctx.lineWidth = 1;
    ctx.strokeRect(552, 780, 46, 46);
    ctx.fillStyle = '#FBF8EF';
    ctx.font = '700 28px ' + serif;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('春', 575, 804);
  }

  $('#savePoster').addEventListener('click', () => {
    const cv = $('#posterCanvas');
    cv.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '指尖遇春-立春雨水.png';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 3000);
      toast('海报已保存');
    }, 'image/png');
  });

  /* ---------------- 事件绑定 ---------------- */
  $('#startBtn').addEventListener('click', () => show('awaken'));
  $('#springNext').addEventListener('click', () => show('choice'));
  $('#pickLichun').addEventListener('click', () => show('lichun'));
  $('#pickYushui').addEventListener('click', () => {
    if ($('#pickYushui').disabled) { toast('集齐六雪后，雨水自开'); return; }
    show('yushui');
  });

  $('#lcContinue').addEventListener('click', () => {
    if ($('#lcContinue').disabled) return;
    const wipe = document.createElement('div');
    wipe.className = 'wipe';
    document.body.appendChild(wipe);
    requestAnimationFrame(() => wipe.classList.add('is-on'));
    setTimeout(() => { show('yushui'); }, 620);
    setTimeout(() => { wipe.remove(); }, 2000);
  });

  $('#ysContinue').addEventListener('click', () => {
    if ($('#ysContinue').disabled) return;
    show('poster');
  });

  $('#dockPoster').addEventListener('click', () => { if (!$('#dockPoster').disabled) show('poster'); });
  $('#dockPoster2').addEventListener('click', () => { if (!$('#dockPoster2').disabled) show('poster'); });
  $('#dockYushui').addEventListener('click', () => { if (!$('#dockYushui').disabled) show('yushui'); });

  $$('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.back;
      if (t === 'poster' && $('#dockPoster') && $('#dockPoster').disabled) { toast('先集齐立春与雨水'); return; }
      show(t);
    });
  });

  $('#replayBtn').addEventListener('click', () => {
    state.read.lichun.clear();
    state.read.yushui.clear();
    state.iceDone = false;
    ['lichun', 'yushui'].forEach(t => {
      const field = $('#' + t + 'Field');
      if (field) { field.innerHTML = ''; delete field.dataset.built; }
      renderProgress(t);
    });
    frost.done = false;
    if (frost.canvas) { frost.canvas.style.opacity = '1'; }
    state.stack = ['loading'];
    show('cover');
    toast('已重新开始');
  });

  $('#lcContinue').addEventListener('click', () => {
    if (!$('#lcContinue').disabled) setTimeout(() => toast('雪尽 · 化而为雨'), 1400);
  });
  $('#ysContinue').addEventListener('click', () => {
    if (!$('#ysContinue').disabled) setTimeout(() => toast('春之卷 · 已成'), 900);
  });

  $('#nightBack').addEventListener('click', () => { show('cover'); });
  $('#toJingzhe').addEventListener('click', () => show('jingzhe'));

  /* ---------------- 启动 ---------------- */
  window.addEventListener('resize', () => {
    layoutField('lichun');
    layoutField('yushui');
    if (state.stack[state.stack.length - 1] === 'awaken' && !frost.done) {
      sizeFrost();
      paintFrost();
    }
  });

  window.addEventListener('load', () => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { if (state.stack[state.stack.length - 1] === 'poster') drawPoster(); });
    }
  });

  setTimeout(() => {
    if (state.stack[state.stack.length - 1] === 'loading') {
      show('cover');
      state.stack = ['cover'];
    }
  }, 2650);

  // 预热：首屏后构建节点
  setTimeout(() => { buildField('lichun'); buildField('yushui'); }, 1200);

  /* ---------------- 直达（便于预览与分享） ----------------
     例：#lichun-3 直接进入立春并标记已解三处；#modal-0 打开立春第一条 */
  const direct = decodeURIComponent((location.hash || '').replace('#', '')).trim();
  if (direct) {
    const [name, num] = direct.split('-');
    if (name === 'modal') {
      const i = parseInt(num || '0', 10);
      buildField('lichun');
      setTimeout(() => { show('lichun'); openKnow('lichun', i); }, 40);
    } else if (screens[name]) {
      const k = num ? Math.min(parseInt(num, 10) || 0, 6) : 0;
      const term = name === 'yushui' ? 'yushui' : 'lichun';
      for (let i = 0; i < k; i++) state.read[term].add(i);
      setTimeout(() => show(name), 40);
    }
  }
})();

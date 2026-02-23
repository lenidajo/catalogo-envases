/* ═══════════════════════════════════════════════
   SWEET FRAGRANCE · SCRIPT MODO VENTA 2030
   Upgrades: countdown real · social proof live
             stock urgency · precio animado
             partículas WA · glitch FX
   ═══════════════════════════════════════════════ */

const WHATSAPP = "573209373528";
const catalogo = document.getElementById("catalogo");

/* ── ÍCONOS ── */
const waIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .611.625l5.882-1.54A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.382l-.36-.214-3.733.979.997-3.648-.235-.374A9.818 9.818 0 1 1 12 21.818z"/></svg>`;
const boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM4 5h16a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2z"/></svg>`;

/* ═══════════════════════════════════════════════
   1. COUNTDOWN REAL · Oferta hasta medianoche
   ═══════════════════════════════════════════════ */
function initCountdown() {
  const banner = document.getElementById("countdown-banner");
  if (!banner) return;

  function tick() {
    const now   = new Date();
    const end   = new Date();
    end.setHours(23, 59, 59, 999);
    const diff  = end - now;
    if (diff <= 0) { banner.innerHTML = "⏰ Oferta renovada — ¡Nuevos precios activos!"; return; }
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    banner.innerHTML = `🔥 PRECIO MAYORISTA ACTIVO · Expira en <span class="cd-time">${h}:${m}:${s}</span> · ¡Pide ya!`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════
   2. SOCIAL PROOF LIVE · Clientes comprando ahora
   ═══════════════════════════════════════════════ */
const SOCIAL_NAMES = [
  "Carlos de Medellín", "Diana de Bogotá", "Andrés de Cali",
  "Sandra de Barranquilla", "Felipe de Bucaramanga",
  "Luisa de Manizales", "Ricardo de Pereira",
  "Valentina de Ibagué", "Jhon de Cartagena",
  "Mónica de Cúcuta"
];

const SOCIAL_ACTIONS = [
  (n, p) => `${n} compró <b>${p}</b> hace <b>3 min</b>`,
  (n, p) => `${n} pidió <b>10+ cajas</b> de <b>${p}</b>`,
  (n, p) => `${n} está viendo <b>${p}</b> ahora mismo`,
  (n, p) => `🛒 <b>Nuevo pedido:</b> ${n} — ${p}`,
  (n, p) => `${n} acaba de reclamar el precio mayorista de <b>${p}</b>`,
];

function initSocialProof() {
  const el = document.getElementById("social-ticker");
  if (!el) return;

  const products = Array.from(document.querySelectorAll(".card-name"))
    .map(e => e.textContent.trim())
    .filter(Boolean);

  if (!products.length) return;

  function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function rotate() {
    const name   = randomItem(SOCIAL_NAMES);
    const prod   = randomItem(products);
    const action = randomItem(SOCIAL_ACTIONS);
    el.style.opacity = "0";
    el.style.transform = "translateY(-6px)";
    setTimeout(() => {
      el.innerHTML = "🟢 " + action(name, prod);
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 400);
  }

  rotate();
  setInterval(rotate, 5000);
}

/* ═══════════════════════════════════════════════
   3. STOCK URGENCY · Cajas "quedando" por producto
   ═══════════════════════════════════════════════ */
function getStock(nombre) {
  // Semilla determinista por nombre → siempre el mismo número
  let hash = 0;
  for (const c of nombre) hash = (hash * 31 + c.charCodeAt(0)) & 0xFFFF;
  return 3 + (hash % 8); // Entre 3 y 10 cajas "disponibles"
}

/* ═══════════════════════════════════════════════
   4. ANIMACIÓN PRECIO · Counter up al entrar en vista
   ═══════════════════════════════════════════════ */
function animatePrice(el, target) {
  if (!el || el.dataset.animated) return;
  el.dataset.animated = "1";
  const start    = Math.floor(target * 0.6);
  const duration = 900;
  const startTime = performance.now();

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * ease);
    el.textContent = "$" + current.toLocaleString("es-CO");
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = "$" + target.toLocaleString("es-CO");
  }
  requestAnimationFrame(frame);
}

/* ═══════════════════════════════════════════════
   5. PARTÍCULAS EN CTA WhatsApp
   ═══════════════════════════════════════════════ */
function addParticleBurst(btn) {
  btn.addEventListener("click", function(e) {
    const rect   = btn.getBoundingClientRect();
    const colors = ["#25D366","#128C7E","#fff","#ffd566"];
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement("span");
      dot.style.cssText = `
        position:fixed;pointer-events:none;z-index:9999;
        width:8px;height:8px;border-radius:50%;
        background:${colors[i % colors.length]};
        left:${rect.left + rect.width/2}px;
        top:${rect.top + rect.height/2}px;
        transform:translate(-50%,-50%);
        transition:all 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        opacity:1;
      `;
      document.body.appendChild(dot);
      const angle = (i / 12) * 360;
      const rad   = angle * Math.PI / 180;
      const dist  = 40 + Math.random() * 40;
      setTimeout(() => {
        dot.style.left   = `${rect.left + rect.width/2 + Math.cos(rad) * dist}px`;
        dot.style.top    = `${rect.top + rect.height/2 + Math.sin(rad) * dist}px`;
        dot.style.opacity = "0";
        dot.style.transform = "translate(-50%,-50%) scale(0)";
      }, 10);
      setTimeout(() => dot.remove(), 700);
    }
  });
}

/* ═══════════════════════════════════════════════
   6. GLITCH FX · Título del producto
   ═══════════════════════════════════════════════ */
function addGlitch(el) {
  if (!el) return;
  el.addEventListener("mouseenter", () => {
    el.classList.add("glitch-active");
    setTimeout(() => el.classList.remove("glitch-active"), 600);
  });
}

/* ═══════════════════════════════════════════════
   UTIL
   ═══════════════════════════════════════════════ */
function cop(val) {
  return "$" + val.toLocaleString("es-CO");
}

function mostrarSkeletons(n = 4) {
  catalogo.innerHTML = Array(n).fill(`
    <div class="skeleton-card">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line s"></div>
        <div class="skeleton-line xl"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>`).join("");
}

/* ═══════════════════════════════════════════════
   CARD BUILDER · Con todos los upgrades
   ═══════════════════════════════════════════════ */
function crearCard(prod) {
  const card = document.createElement("div");
  card.className = "card";

  const p  = prod.precios || {};
  const p1 = p["1_4"]   || prod.precio || 0;
  const p2 = p["5_9"]   || prod.precio || 0;
  const p3 = p["10mas"] || prod.precio || 0;

  const ml   = prod.ml ? prod.ml + " ML" : "";
  const unid = prod.unidades_caja ? `${prod.unidades_caja}<br>UNID.` : "";
  const nota = prod.nota || "";

  const ahorro      = p1 - p3;
  const porcAhorro  = Math.round((ahorro / p1) * 100);
  const precioAntes = Math.round(p1 * 1.15 / 100) * 100;

  const bgColor   = prod.color_fondo || "rgba(4,13,30,0.95)";
  const glowColor = prod.color_glow  || "rgba(0,212,255,0.15)";

  const stock = getStock(prod.nombre);
  const stockUrgency = stock <= 4
    ? `<div class="stock-critical">🔴 ¡Solo ${stock} cajas disponibles!</div>`
    : `<div class="stock-ok">🟡 ${stock} cajas en stock</div>`;

  const msg   = encodeURIComponent(`Hola Sweet Fragrance 👋\nMe interesa: *${prod.nombre}${ml ? " " + ml : ""}*\n¿Precio y disponibilidad?`);
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;
  const ph    = `https://placehold.co/400x280/050f20/00d4ff?text=${encodeURIComponent(prod.nombre)}`;

  card.style.cssText = `background: linear-gradient(180deg, ${bgColor} 0%, #010a18 100%); border-color: rgba(0,212,255,0.12);`;

  card.innerHTML = `
    <div class="card-img-wrap" style="background: radial-gradient(ellipse at 50% 60%, ${bgColor}, #010a18 100%);">
      <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy" onerror="this.src='${ph}'">

      <div class="card-urgency">
        <span class="urgency-tag tag-hot">🔥 Más vendido</span>
        <span class="urgency-tag tag-stock">⚡ Stock limitado</span>
      </div>

      ${ml   ? `<div class="ml-badge">${prod.ml}<br>ML</div>` : ""}
      ${unid ? `<div class="unidades-badge">${unid}</div>` : ""}

      <div class="card-podium">
        <div class="podium-stage"><div class="podium-shine"></div></div>
        <div class="podium-base"></div>
      </div>
    </div>

    <div class="card-name-banner" style="border-left: 4px solid ${glowColor}">
      <div class="card-name-label">Envase</div>
      <div class="card-name" data-text="${prod.nombre}">${prod.nombre}</div>
      ${ml ? `<div class="card-name-ml">${ml} · Caja Surtida</div>` : ""}
    </div>

    <!-- UPGRADE: Stock urgency -->
    <div class="card-stock">${stockUrgency}</div>

    <div class="card-price-hero">
      <div class="price-from">
        <span class="price-desde">Desde</span>
        <span class="price-tachado">${cop(precioAntes)}</span>
        <span class="price-actual" data-target="${p1}">
          ${cop(p1)} <span class="price-cu">c/u</span>
        </span>
      </div>
      <div class="price-saving">
        <div class="saving-label">Ahorro máximo</div>
        <div class="saving-amount">${cop(ahorro)}</div>
        <div class="saving-desc">${porcAhorro}% · 10+ cajas</div>
      </div>
    </div>

    <div class="card-social">
      <span class="social-stars">★★★★★</span>
      <span class="social-text"><strong>+120 clientes</strong> mayoristas</span>
      <span class="social-badge">🏪 MAYORISTA</span>
    </div>

    <div class="card-body">
      ${nota ? `<div class="card-nota">*${nota}</div>` : ""}
      <div class="tabla-wrap">
        <div class="tabla-header">${boxIcon} Precio por unidad · Según cantidad</div>
        <table class="precio-table">
          <tr>
            <td class="pt-rango"><span class="pt-dot dot-1"></span>1–4 Cajas</td>
            <td class="pt-precio p1">${cop(p1)} <small style="font-weight:400;font-size:0.68rem;opacity:0.6">c/u</small></td>
          </tr>
          <tr>
            <td class="pt-rango"><span class="pt-dot dot-2"></span>5–9 Cajas</td>
            <td class="pt-precio p2">${cop(p2)} <small style="font-weight:400;font-size:0.68rem;opacity:0.6">c/u</small></td>
          </tr>
          <tr style="background:rgba(255,213,102,0.06)">
            <td class="pt-rango"><span class="pt-dot dot-3"></span>10+ Cajas <span style="font-size:0.55rem;color:#ffd566;margin-left:3px">★ MEJOR PRECIO</span></td>
            <td class="pt-precio p3">${cop(p3)} <small style="font-weight:400;font-size:0.68rem;opacity:0.6">c/u</small></td>
          </tr>
        </table>
      </div>

      <!-- UPGRADE: CTA con pulso y partículas -->
      <a class="btn btn-wa-pulse" href="${waUrl}" target="_blank" rel="noopener noreferrer">
        ${waIcon} ¡Quiero este precio ahora!
      </a>
    </div>
  `;

  return card;
}

/* ═══════════════════════════════════════════════
   MAIN LOADER
   ═══════════════════════════════════════════════ */
async function cargarProductos() {
  mostrarSkeletons(4);
  try {
    const res = await fetch("productos.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    catalogo.innerHTML = "";
    data.forEach(prod => catalogo.appendChild(crearCard(prod)));

    /* ── Post-render: activar upgrades ── */
    bindUpgrades();
    initSocialProof();

  } catch (err) {
    console.error("Error:", err);
    catalogo.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;opacity:.6;">
        <p style="font-size:2.5rem;margin-bottom:16px;">⚠️</p>
        <p style="font-family:var(--font-head);font-size:0.9rem;line-height:1.8">
          No se pudieron cargar los productos.<br>
          Verifica que <code>productos.json</code> exista.
        </p>
      </div>`;
  }
}

/* ═══════════════════════════════════════════════
   BIND UPGRADES · Después de renderizar cards
   ═══════════════════════════════════════════════ */
function bindUpgrades() {
  /* Partículas en cada botón WA */
  document.querySelectorAll(".btn-wa-pulse").forEach(addParticleBurst);

  /* Glitch en cada nombre de producto */
  document.querySelectorAll(".card-name").forEach(addGlitch);

  /* IntersectionObserver → animar precio al entrar en vista */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target.querySelector(".price-actual");
        const target = parseInt(el?.dataset.target || "0", 10);
        if (el && target) animatePrice(el.querySelector ? el : el, target);
        // Animamos el span de texto, no el contenedor
        const priceSpan = entry.target.querySelector(".price-actual");
        if (priceSpan) {
          const t = parseInt(priceSpan.dataset.target || "0", 10);
          if (t) {
            // Extraer solo el texto de precio, no el <span> hijo
            const textNode = priceSpan.childNodes[0];
            if (textNode && textNode.nodeType === 3) {
              animatePriceNode(textNode, priceSpan, t);
            }
          }
        }
        entry.target.classList.add("card-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".card").forEach(c => observer.observe(c));

  /* Cards: entrada con stagger */
  document.querySelectorAll(".card").forEach((c, i) => {
    c.style.animationDelay = `${i * 0.08}s`;
    c.classList.add("card-anim");
  });
}

function animatePriceNode(textNode, container, target) {
  if (container.dataset.animated) return;
  container.dataset.animated = "1";
  const start    = Math.floor(target * 0.55);
  const duration = 900;
  const startTime = performance.now();
  const cuSpan = container.querySelector(".price-cu");

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * ease);
    container.innerHTML = `$${current.toLocaleString("es-CO")} <span class="price-cu">c/u</span>`;
    if (progress < 1) requestAnimationFrame(frame);
    else container.innerHTML = `$${target.toLocaleString("es-CO")} <span class="price-cu">c/u</span>`;
  }
  requestAnimationFrame(frame);
}

/* ═══════════════════════════════════════════════
   INYECTAR CSS DE UPGRADES (sin tocar styles.css)
   ═══════════════════════════════════════════════ */
(function injectUpgradeCSS() {
  const style = document.createElement("style");
  style.textContent = `
    /* Countdown banner */
    #countdown-banner {
      background: linear-gradient(90deg, #1a0000, #2d0000, #1a0000);
      border-bottom: 1px solid rgba(255,60,60,0.3);
      color: #ff8888;
      font-family: var(--font-head, 'Orbitron', monospace);
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-align: center;
      padding: 10px 20px;
      animation: pulse-bar 2s ease-in-out infinite;
    }
    .cd-time {
      color: #ff4444;
      font-weight: 900;
      font-size: 0.9rem;
      letter-spacing: 0.15em;
      text-shadow: 0 0 12px rgba(255,60,60,0.6);
    }
    @keyframes pulse-bar {
      0%,100% { background: linear-gradient(90deg,#1a0000,#2d0000,#1a0000); }
      50%      { background: linear-gradient(90deg,#2d0000,#400000,#2d0000); }
    }

    /* Social ticker */
    #social-ticker {
      transition: opacity 0.4s ease, transform 0.4s ease;
      font-size: 0.75rem;
      color: rgba(232,244,255,0.65);
      padding: 6px 20px;
      background: rgba(0,212,255,0.04);
      border-bottom: 1px solid rgba(0,212,255,0.1);
      text-align: center;
      letter-spacing: 0.02em;
    }
    #social-ticker b { color: #00d4ff; }

    /* Stock urgency */
    .card-stock {
      padding: 5px 14px;
      flex-shrink: 0;
    }
    .stock-critical {
      font-family: var(--font-head, 'Orbitron', monospace);
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #ff6b6b;
      background: rgba(255,60,60,0.08);
      border: 1px solid rgba(255,60,60,0.25);
      border-radius: 8px;
      padding: 5px 10px;
      text-align: center;
      animation: blink-stock 1.5s ease-in-out infinite;
    }
    .stock-ok {
      font-family: var(--font-head, 'Orbitron', monospace);
      font-size: 0.62rem;
      letter-spacing: 0.06em;
      color: #ffaa44;
      background: rgba(255,170,0,0.07);
      border: 1px solid rgba(255,170,0,0.2);
      border-radius: 8px;
      padding: 5px 10px;
      text-align: center;
    }
    @keyframes blink-stock {
      0%,100% { opacity:1; }
      50%      { opacity:0.6; }
    }

    /* CTA pulse */
    .btn-wa-pulse {
      position: relative;
      overflow: hidden;
    }
    .btn-wa-pulse::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .btn-wa-pulse:hover::after { opacity: 1; }
    .btn-wa-pulse {
      animation: wa-pulse 2.5s ease-in-out infinite;
      box-shadow: 0 4px 18px rgba(37,211,102,0.35), 0 0 0 0 rgba(37,211,102,0.4);
    }
    @keyframes wa-pulse {
      0%,100% { box-shadow: 0 4px 18px rgba(37,211,102,0.35), 0 0 0 0 rgba(37,211,102,0.4); }
      50%      { box-shadow: 0 4px 28px rgba(37,211,102,0.55), 0 0 0 8px rgba(37,211,102,0); }
    }

    /* Glitch FX */
    .card-name[data-text] { position: relative; cursor: default; }
    .glitch-active {
      animation: glitch-fx 0.6s linear;
    }
    @keyframes glitch-fx {
      0%  { text-shadow: none; }
      20% { text-shadow: -2px 0 #ff0066, 2px 0 #00ffcc; transform: translate(-1px, 0); }
      40% { text-shadow: 2px 0 #ff0066, -2px 0 #00ffcc; transform: translate(1px, 0); }
      60% { text-shadow: -2px 0 #ff0066, 2px 0 #00ffcc; transform: translate(-1px, 0); }
      80% { text-shadow: 2px 0 #00ffcc, -2px 0 #ff0066; transform: translate(0, 1px); }
      100%{ text-shadow: none; transform: translate(0); }
    }

    /* Card entrada animada */
    .card-anim {
      opacity: 0;
      transform: translateY(28px);
      animation: card-in 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    @keyframes card-in {
      to { opacity:1; transform:translateY(0); }
    }

    /* Price highlight al animar */
    .card-visible .price-actual {
      color: #ffd566 !important;
      transition: color 0.3s ease;
    }
  `;
  document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════════
   INYECTAR BANNERS en el DOM (si no existen)
   ═══════════════════════════════════════════════ */
(function injectBanners() {
  // Countdown
  if (!document.getElementById("countdown-banner")) {
    const cb = document.createElement("div");
    cb.id = "countdown-banner";
    document.body.insertBefore(cb, document.body.firstChild);
  }
  // Social ticker
  if (!document.getElementById("social-ticker")) {
    const st = document.createElement("div");
    st.id = "social-ticker";
    st.textContent = "Cargando actividad...";
    const topbar = document.querySelector(".topbar");
    if (topbar && topbar.nextSibling) {
      topbar.parentNode.insertBefore(st, topbar.nextSibling);
    } else {
      document.body.insertBefore(st, document.body.children[1] || null);
    }
  }
  initCountdown();
})();

/* ── ARRANQUE ── */
cargarProductos();
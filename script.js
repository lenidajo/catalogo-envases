const WHATSAPP = "573209373528"; // <-- Cambia por tu número
const catalogo = document.getElementById("catalogo");

/* ── Ícono WhatsApp ── */
const waIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .611.625l5.882-1.54A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.382l-.36-.214-3.733.979.997-3.648-.235-.374A9.818 9.818 0 1 1 12 21.818z"/></svg>`;

/* ── Ícono caja ── */
const boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM4 5h16a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2z"/></svg>`;

/* ── Skeletons ── */
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

/* ── Formato pesos colombianos ── */
function cop(val) {
  return "$" + val.toLocaleString("es-CO");
}

/* ── Crear card ── */
function crearCard(prod) {
  const card = document.createElement("div");
  card.className = "card";

  const ml = prod.ml ? prod.ml + " ML" : "";
  const unid = prod.unidades_caja ? `${prod.unidades_caja}<br>UNID.` : "";
  const nota = prod.nota || "";

  // Mensaje WhatsApp personalizado
  const msg = encodeURIComponent(
    `Hola Sweet Fragrance 👋\nEstoy interesado en: *${prod.nombre} ${ml}*\n¿Podría darme más información sobre precios y disponibilidad?`
  );
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;

  // Precios escalonados
  const p = prod.precios || {};
  const p1 = p["1_4"]  || prod.precio || 0;
  const p2 = p["5_9"]  || prod.precio || 0;
  const p3 = p["10mas"]|| prod.precio || 0;

  card.innerHTML = `
    <div class="card-img-wrap">
      <img src="${prod.imagen}" alt="${prod.nombre}"
           loading="lazy"
           onerror="this.src='https://placehold.co/400x280/050f20/00d4ff?text=${encodeURIComponent(prod.nombre)}'">
      ${ml ? `<div class="ml-badge">${prod.ml}<br>ML</div>` : ""}
      ${unid ? `<div class="unidades-badge">${unid}</div>` : ""}
    </div>

    <div class="card-body">
      <div>
        <div class="card-name">${prod.nombre}</div>
        ${nota ? `<div class="card-nota">*${nota}</div>` : ""}
      </div>

      <div class="tabla-wrap">
        <div class="tabla-header">${boxIcon} Caja Surtida · Precio por unidad</div>
        <table class="precio-table">
          <tr>
            <td class="pt-rango"><span class="pt-dot dot-1"></span>1–4 Cajas</td>
            <td class="pt-precio p1">${cop(p1)} <small style="font-weight:400;font-size:0.7rem;color:var(--muted)">c/u</small></td>
          </tr>
          <tr>
            <td class="pt-rango"><span class="pt-dot dot-2"></span>5–9 Cajas</td>
            <td class="pt-precio p2">${cop(p2)} <small style="font-weight:400;font-size:0.7rem;color:var(--muted)">c/u</small></td>
          </tr>
          <tr>
            <td class="pt-rango"><span class="pt-dot dot-3"></span>10+ Cajas</td>
            <td class="pt-precio p3">${cop(p3)} <small style="font-weight:400;font-size:0.7rem;color:var(--muted)">c/u</small></td>
          </tr>
        </table>
      </div>

      <a class="btn" href="${waUrl}" target="_blank" rel="noopener noreferrer">
        ${waIcon} Pedir por WhatsApp
      </a>
    </div>
  `;

  return card;
}

/* ── Cargar productos ── */
async function cargarProductos() {
  mostrarSkeletons(4);
  try {
    const res = await fetch("productos.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    catalogo.innerHTML = "";
    data.forEach(prod => catalogo.appendChild(crearCard(prod)));
    console.log(`✅ ${data.length} productos cargados · Sweet Fragrance`);
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

cargarProductos();
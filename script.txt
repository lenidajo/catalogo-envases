fetch('productos.json')
  .then(r => r.json())
  .then(data => {
    const cont = document.getElementById('catalogo');

    data.forEach(p => {
      cont.innerHTML += `
        <div class="card">
          <img src="${p.imagen}" alt="${p.nombre}">
          <h3>${p.nombre}</h3>
          <p>$${p.precio.toLocaleString()}</p>
          <a href="https://wa.me/573209373528?text=Hola%20quiero%20${encodeURIComponent(p.nombre)}" target="_blank">
            <button>Comprar</button>
          </a>
        </div>
      `;
    });
  });

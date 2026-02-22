console.log("JS cargado OK");

fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    const catalogo = document.getElementById("catalogo");

    data.forEach(prod => {
      const card = document.createElement("div");
      card.className = "card";

      const mensaje = encodeURIComponent(
        `Hola, quiero el ${prod.nombre}`
      );

      card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="precio">$${prod.precio.toLocaleString()}</p>
        <a class="btn" target="_blank"
           href="https://wa.me/57TU_NUMERO?text=${mensaje}">
           Comprar por WhatsApp
        </a>
      `;

      catalogo.appendChild(card);
    });
  })
  .catch(err => console.error("Error cargando productos:", err));

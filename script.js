const map = L.map('map').setView([-16.5, -68.15], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marcadores = [];

fetch('nodos.json')
  .then(res => res.json())
  .then(data => {
    let puntos = 0, cash = 0;

    data.features.forEach(nodo => {
      const props = nodo.properties;
      const coords = nodo.geometry.coordinates.reverse();

      // 🧙‍♂️ Generador mágico por nodo
      const nombreCaja = `Caja P${Math.floor(Math.random() * 4) + 1}_${Math.floor(Math.random() * 5) + 2}`;
      const celular = `60000${Math.floor(100 + Math.random() * 899)}`;
      const puertos = Math.floor(Math.random() * 12) + 5;

      const marker = L.marker(coords).addTo(map)
        .bindPopup(`<b>${props.nombre}</b><br>Status: ${props.estado}<br>Cash: $${props.cash}`);

      marker.estado = props.estado;
      marker.on('click', () => {
        const panel = document.getElementById("panel");
        panel.innerHTML = `
          <div class="caja-info">
            <h2>📦 ${nombreCaja}</h2>
            <p><strong>${props.nombre}</strong></p>
            <p>📞 Celular de atención: ${celular}</p>
            <p>🔌 Puertos disponibles: ${puertos}</p>
            <p>Status: ${props.estado.toUpperCase()}</p>
            <p>💰 Cash acumulado: $${props.cash}</p>
          </div>
        `;
        panel.classList.add("animado");
        setTimeout(() => panel.classList.remove("animado"), 900);
      });

      marcadores.push(marker);
      puntos++;
      cash += props.cash;
    });

    document.getElementById("puntos").textContent = puntos;
    document.getElementById("cash").textContent = cash.toFixed(2);
    document.getElementById("fecha").textContent = new Date().toLocaleDateString();
  });

function filtrar

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

      // 🔀 Datos aleatorios por caja
      const nombreCaja = `Caja P${Math.floor(Math.random() * 5) + 1}_${Math.floor(Math.random() * 5) + 1}`;
      const celular = `60000${Math.floor(100 + Math.random() * 899)}`;
      const puertos = Math.floor(Math.random() * 16) + 1;
      const olt = `OLT-${props.nombre.split(" ")[1] || "X"}-${Math.floor(Math.random() * 10) + 1}`;

      const marker = L.marker(coords).addTo(map)
        .bindPopup(`<b>${props.nombre}</b><br>Status: ${props.estado}<br>Cash: $${props.cash}`);

      marker.estado = props.estado;
      marker.on('click', () => {
        const panel = document.getElementById("panel");
        panel.innerHTML = `
          <div class="panel-contenido">
            <h2>${props.nombre}</h2>
            <p><strong>${nombreCaja}</strong></p>
            <p>📞 Técnico: ${celular}</p>
            <p>🔌 Puertos disponibles: ${puertos}</p>
            <p>🧠 OLT asignado: ${olt}</p>
            <p>⚠️ Estado: <span class="estado ${props.estado}">${props.estado}</span></p>
            <p>💰 Cash acumulado: $${props.cash}</p>
          </div>
        `;
        panel.classList.add("animado");
        setTimeout(() => panel.classList.remove("animado"), 800);
      });

      marcadores.push(marker);
      puntos++;
      cash += props.cash;
    });

    document.getElementById("puntos").textContent = puntos;
    document.getElementById("cash").textContent = cash.toFixed(2);
    document.getElementById("fecha").textContent = new Date().toLocaleDateString();
  });

function filtrar(estado) {
  marcadores.forEach(marker => {
    if (estado === 'todos' || marker.estado === estado) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
}

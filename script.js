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

      const marker = L.marker(coords).addTo(map)
        .bindPopup(`<b>${props.nombre}</b><br>Status: ${props.estado}<br>Cash: $${props.cash}`);

      marker.estado = props.estado;
      marker.on('click', () => {
        document.getElementById("panel").innerHTML =
          `<h2>${props.nombre}</h2><p>Status: ${props.estado}</p><p>Cash: $${props.cash}</p>`;
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

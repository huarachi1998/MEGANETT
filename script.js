let puntos = 120;
let cash = 350;

document.getElementById("puntos").textContent = puntos;
document.getElementById("cash").textContent = cash;

const map = L.map('map').setView([-16.5, -68.1], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Cargar nodos
fetch('nodos.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(nodo => {
      const marker = L.marker([nodo.lat, nodo.lng]).addTo(map);
      marker.bindPopup(`<strong>${nodo.nombre}</strong><br>Estado: ${nodo.estado}`);
      marker.on('click', () => {
        document.getElementById('panel').innerHTML = `
          <h2>${nodo.nombre}</h2>
          <p>Estado: ${nodo.estado}</p>
          <p>Cliente/s: ${nodo.clientes}</p>
        `;
      });
      marker._nodoEstado = nodo.estado;
    });
  });

// Filtro
function filtrar(estado) {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker && layer._nodoEstado) {
      if (estado === 'todos' || layer._nodoEstado === estado) {
        layer.addTo(map);
      } else {
        map.removeLayer(layer);
      }
    }
  });
}

// Fecha actual
document.getElementById("fecha").textContent = new Date().toLocaleString();

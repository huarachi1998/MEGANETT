document.getElementById("fecha").textContent = new Date().toLocaleString();

const map = L.map('map').setView([-16.5, -68.15], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

let markers = [];

fetch('naps.json')
  .then(r => r.json())
  .then(data => {
    data.forEach(nap => {
      const marker = L.marker([nap.lat, nap.lng]).addTo(map)
        .bindPopup(`
          <strong>${nap.nombre}</strong><br>
          Estado: ${nap.estado}<br>
          Capacidad: ${nap.capacidad}<br>
          Puertos libres: ${nap.puertos_libres}<br>
          OLT: ${nap.olt}<br>
          Potencia: ${nap.potencia}<br>
          Precinto: ${nap.precinto}<br>
          <a href="mailto:${nap.correo}">${nap.correo}</a>
        `);
      marker.estado = nap.estado;
      markers.push(marker);

      const panel = document.getElementById("panel");
      const item = document.createElement("div");
      item.innerHTML = `<strong>${nap.nombre}</strong><br>
        Estado: ${nap.estado}<br>
        Puertos libres: ${nap.puertos_libres}<hr>`;
      panel.appendChild(item);
    });
  });

function filtrar(estado) {
  markers.forEach(m => {
    if (estado === 'todos' || m.estado === estado) {
      map.addLayer(m);
    } else {
      map.removeLayer(m);
    }
  });
}

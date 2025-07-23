const map = L.map('map').setView([-16.5, -68.15], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// URL pública de tu hoja publicada
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQlk65RTfv4d02i7zaa4qEJ85bygNqnr1LCgLmUXkeL9szUz1I_Alwk2RK-0pPbIkAj_BXT66BFJU3z/pubhtml?gid=0&single=true';

// Cargar Tabletop.js una vez que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  Tabletop.init({
    key: sheetURL,
    callback: mostrarClientes,
    simpleSheet: true
  });
});

function mostrarClientes(data) {
  data.forEach(cliente => {
    const lat = parseFloat(cliente.latitud);
    const lng = parseFloat(cliente.longitud);
    const nombre = cliente.nombre || "Cliente sin nombre";
    const servicio = cliente.servicio || "Servicio no especificado";
    const estado = cliente.estado || "pendiente";

    if (!isNaN(lat) && !isNaN(lng)) {
      L.marker([lat, lng], {
        icon: L.divIcon({ html: '👤', className: '', iconSize: [18, 18] })
      }).addTo(map)
      .bindPopup(`
        <div style="font-family:'Segoe UI';min-width:200px;">
          <h3>${nombre}</h3>
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Estado:</strong> ${estado}</p>
        </div>
      `);
    }
  });
}

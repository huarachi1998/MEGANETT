const map = L.map('map').setView([-16.5, -68.15], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ✅ Colores por estado
function iconoMEGANET(estado) {
  const colores = {
    activo: '#2ecc71',
    saturado: '#e74c3c',
    mantenimiento: '#f39c12'
  };
  return L.divIcon({
    html: `<div style="background:${colores[estado] || '#95a5a6'};width:14px;height:14px;border-radius:50%;border:2px solid #fff;"></div>`,
    className: '',
    iconSize: [18, 18]
  });
}

// ✅ 1. Dibujar cajas NAP desde nodos.json
fetch('nodos.json')
  .then(res => res.json())
  .then(data => {
    data.features.forEach(nodo => {
      const props = nodo.properties;
      const coords = [...nodo.geometry.coordinates].reverse();

      L.marker(coords, {
        icon: iconoMEGANET(props.estado)
      }).addTo(map)
      .bindPopup(`
        <div style="font-family:'Segoe UI';min-width:200px;">
          <h3>${props.nombre}</h3>
          <p><strong>Estado:</strong> ${props.estado}</p>
          <p><strong>Cash acumulado:</strong> $${props.cash}</p>
        </div>
      `);
    });
  });

// ✅ 2. Clientes desde Google Sheets
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQlk65RTfv4d02i7zaa4qEJ85bygNqnr1LCgLmUXkeL9szUz1I_Alwk2RK-0pPbIkAj_BXT66BFJU3z/pubhtml?gid=0&single=true';

window.addEventListener('DOMContentLoaded', () => {
  Tabletop.init({
    key: sheetURL,
    callback: mostrarDatosGoogleSheets,
    simpleSheet: true
  });
});

function mostrarDatosGoogleSheets(data) {
  data.forEach(item => {
    const lat = parseFloat(item.latitud);
    const lng = parseFloat(item.longitud);
    const tipo = item.tipo?.toLowerCase();

    if (!isNaN(lat) && !isNaN(lng)) {
      if (tipo === "nap") {
        const estado = item.estado || "activo";
        const cash = item.cash || 0;

        L.marker([lat, lng], {
          icon: iconoMEGANET(estado)
        }).addTo(map)
        .bindPopup(`
          <h3>${item.nombre}</h3>
          <p><strong>Estado:</strong> ${estado}</p>
          <p><strong>Cash acumulado:</strong> $${cash}</p>
        `);
      }

      if (tipo === "cliente") {
        const nombre = item.nombre || "Cliente sin nombre";
        const servicio = item.servicio || "Servicio no especificado";
        const estado = item.estado || "pendiente";

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
    }
  });
}

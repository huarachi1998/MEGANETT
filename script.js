const sheetURL = "https://docs.google.com/spreadsheets/d/e/XXXXXXXXXXXX/pubhtml?gid=0&single=true"; // reemplaza con tu enlace publicado

window.addEventListener("DOMContentLoaded", () => {
  Tabletop.init({
    key: sheetURL,
    callback: mostrarClientesDesdeSheets,
    simpleSheet: true
  });
});

function mostrarClientesDesdeSheets(data) {
  data.forEach(item => {
    const lat = parseFloat(item.latitud);
    const lng = parseFloat(item.longitud);
    const nombre = item.nombre || "Cliente sin nombre";
    const servicio = item.servicio || "Servicio no especificado";

    if (!isNaN(lat) && !isNaN(lng)) {
      L.marker([lat, lng], {
        icon: L.divIcon({ html: '👤', className: '', iconSize: [18, 18] })
      }).addTo(map)
        .bindPopup(`
          <h3>${nombre}</h3>
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><em>Registrado en Sheets</em></p>
        `);
    }
  });
}

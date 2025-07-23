// 🧠 Evento: clic en el mapa → formulario emergente
map.on('click', function(e) {
  const latlng = e.latlng;

  L.popup()
    .setLatLng(latlng)
    .setContent(`
      <div style="font-family:'Segoe UI';min-width:220px;">
        <h3>📥 Nuevo Cliente</h3>
        <input id="nombreCliente" type="text" placeholder="Nombre" style="width:100%;margin-bottom:6px;padding:4px;" />
        <input id="servicioCliente" type="text" placeholder="Servicio (ej. 300 Mbps)" style="width:100%;margin-bottom:6px;padding:4px;" />
        <button onclick="agregarCliente(${latlng.lat}, ${latlng.lng})"
          style="background:#2ecc71;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;">
          📍 Agregar
        </button>
      </div>
    `)
    .openOn(map);
});

// 🧠 Función: agregar cliente al mapa
function agregarCliente(lat, lng) {
  const nombre = document.getElementById("nombreCliente").value || "Cliente sin nombre";
  const servicio = document.getElementById("servicioCliente").value || "Servicio no especificado";

  L.marker([lat, lng], {
    icon: L.divIcon({ html: '👤', className: '', iconSize: [18, 18] })
  }).addTo(map)
  .bindPopup(`
    <div style="font-family:'Segoe UI';min-width:200px;">
      <h3>${nombre}</h3>
      <p><strong>Servicio:</strong> ${servicio}</p>
      <p><em>Agregado manualmente</em></p>
    </div>
  `);

  map.closePopup();
}

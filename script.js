const map = L.map('map').setView([-16.5, -68.15], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ✅ Evento: clic en el mapa → formulario emergente
map.on('click', function (e) {
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

// ✅ Función: agregar cliente y enviar a Google Sheets
function agregarCliente(lat, lng) {
  const nombre = document.getElementById("nombreCliente").value || "Cliente sin nombre";
  const servicio = document.getElementById("servicioCliente").value || "Servicio no especificado";

  // Dibujar el cliente en el mapa
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

  // Enviar a Google Sheets vía Apps Script
  fetch("https://script.google.com/macros/s/AKfycbxcgS6ofltD56QNTFHXeYdT7Z1qTrOXUVwx4SGL_I7N8uSf6QVWnRF8JUsYsgpYmHo4/exec", {
    method: "POST",
    body: JSON.stringify({
      nombre,
      servicio,
      latitud: lat,
      longitud: lng,
      estado: "pendiente"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(msg => console.log("📋 Cliente guardado en Sheets:", msg))
    .catch(err => console.error("❌ Error al guardar cliente:", err));
}

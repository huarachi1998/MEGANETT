function crearYGuardarCliente(lat, lng) {
  const nombre = document.getElementById("nombreCliente").value || "Cliente sin nombre";
  const servicio = document.getElementById("servicioCliente").value || "Servicio no especificado";

  // Mostrar en mapa
  L.marker([lat, lng], {
    icon: L.divIcon({ html: '👤', className: '', iconSize: [18, 18] })
  }).addTo(map)
    .bindPopup(`
      <h3>${nombre}</h3>
      <p><strong>Servicio:</strong> ${servicio}</p>
      <p><em>Agregado manualmente</em></p>
    `);

  map.closePopup();

  // Enviar a Google Sheets
  fetch("https://script.google.com/macros/s/AKfycbxcgS6ofltD56QNTFHXeYdT7Z1qTrOXUVwx4SGL_I7N8uSf6QVWnRF8JUsYsgpYmHo4/exec", {
    method: "POST",
    body: JSON.stringify({
      nombre,
      servicio,
      latitud: lat,
      longitud: lng,
      estado: "pendiente"
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(msg => {
      console.log("✅ Cliente guardado:", msg);
      alert("✅ Cliente guardado correctamente en Google Sheets");
    })
    .catch(err => {
      console.error("❌ Error:", err);
      alert("❌ Error: No se pudo guardar el cliente");
    });
}

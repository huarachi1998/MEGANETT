const map = L.map('map').setView([-16.5, -68.15], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function iconoMEGANET(estado) {
  const colores = {
    activo: '#2ecc71',
    saturado: '#e74c3c',
    mantenimiento: '#f39c12'
  };
  return L.divIcon({
    html: `<div style="background:${colores[estado]};width:14px;height:14px;border-radius:50%;border:2px solid #fff;"></div>`,
    className: '',
    iconSize: [18, 18]
  });
}

fetch('nodos.json')
  .then(res => res.json())
  .then(data => {
    let puntos = 0;

    data.features.forEach(nodo => {
      const props = nodo.properties;
      const coords = [...nodo.geometry.coordinates].reverse();  // Clonamos para no romper el orden

      const nombreCaja = `Caja P${Math.floor(Math.random() * 5) + 1}_${Math.floor(Math.random() * 5) + 1}`;
      const celular = `60000${Math.floor(100 + Math.random() * 899)}`;
      const puertos = Math.floor(Math.random() * 16) + 1;
      const olt = `OLT-${props.nombre.split(" ")[1] || "X"}-${Math.floor(Math.random() * 10) + 1}`;

      const marker = L.marker(coords, { icon: iconoMEGANET(props.estado) }).addTo(map)
        .bindPopup(`
          <div style="min-width:240px; font-family:'Segoe UI', sans-serif;">
            <h3 style="color:#2c3e50;">${props.nombre}</h3>
            <div style="background:#f0f4f8;padding:8px;border-radius:6px;">
              <p><strong>📦 Caja:</strong> ${nombreCaja}</p>
              <p>📞 <strong>Técnico:</strong> ${celular}</p>
              <p>🧠 <strong>OLT:</strong> ${olt}</p>
              <p>🔌 <strong>Puertos disponibles:</strong> ${puertos}</p>
              <div style="background:#e0e0e0;height:8px;border-radius:4px;overflow:hidden;">
                <div style="width:${(puertos / 16) * 100}%;height:8px;background:#2ecc71;"></div>
              </div>
              <p style="font-size:12px;color:#555;">Disponibilidad de puertos</p>
              <p><strong>⚠️ Estado:</strong> <span class="estado ${props.estado}">${props.estado}</span></p>
              <p><strong>💰 Cash acumulado:</strong> $${props.cash}</p>
            </div>
            <button onclick="solicitarConexion('${props.nombre}')">🚀 Solicitar conexión</button>
          </div>
        `);

      puntos++;
    });

    document.getElementById("puntos").textContent = puntos;
  });

function solicitarConexion(nombre) {
  alert(`📡 Solicitud enviada para el nodo: ${nombre}`);
}

map.on('click', function(e) {
  const latlng = e.latlng;

  L.popup()
    .setLatLng(latlng)
    .setContent(`
      <div style="font-family:'Segoe UI';min-width:220px;">
        <h3>📥 Nuevo Cliente</h3>
        <input id="nombreCliente" type="text" placeholder="Nombre" style="width:100%;margin-bottom:6px;padding:4px;" />
        <input id="servicioCliente" type="text" placeholder="Servicio (ej. 300 Mbps)" style="width:100%;margin-bottom:6px;padding:4px;" />
        <button onclick="agregarCliente(${latlng.lat}, ${latlng.lng})" style="background:#2ecc71;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;">📍 Agregar</button>
      </div>
    `)
    .openOn(map);
});

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

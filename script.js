fetch('nodos.json')
  .then(res => res.json())
  .then(data => {
    data.features.forEach(nodo => {
      const props = nodo.properties;
      const coords = [...nodo.geometry.coordinates].reverse();

      const nombreCaja = `Caja P${Math.floor(Math.random() * 5) + 1}_${Math.floor(Math.random() * 5) + 1}`;
      const celular = `60000${Math.floor(100 + Math.random() * 899)}`;
      const puertos = Math.floor(Math.random() * 16) + 1;
      const olt = `OLT-${props.nombre.split(" ")[1] || "X"}-${Math.floor(Math.random() * 10) + 1}`;

      L.marker(coords, {
        icon: iconoMEGANET(props.estado)
      }).addTo(map)
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
            <p><strong>⚠️ Estado:</strong> ${props.estado}</p>
            <p><strong>💰 Cash acumulado:</strong> $${props.cash}</p>
          </div>
          <button onclick="solicitarConexion('${props.nombre}')">🚀 Solicitar conexión</button>
        </div>
      `);
    });
  });

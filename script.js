fetch('nodos.json')
  .then(res => res.json())
  .then(data => {
    let puntos = 0, cash = 0;

    data.features.forEach(nodo => {
      const props = nodo.properties;
      const coords = nodo.geometry.coordinates.reverse();

      // 🔀 Datos simulados avanzados
      const nombreCaja = `Caja P${Math.floor(Math.random() * 5) + 1}_${Math.floor(Math.random() * 5) + 1}`;
      const celular = `60000${Math.floor(100 + Math.random() * 899)}`;
      const puertos = Math.floor(Math.random() * 16) + 1;
      const olt = `OLT-${props.nombre.split(" ")[1] || "X"}-${Math.floor(Math.random() * 10) + 1}`;

      const marker = L.marker(coords).addTo(map)
        .bindPopup(`
          <div style="min-width:220px">
            <h3>${props.nombre}</h3>
            <p><strong>${nombreCaja}</strong></p>
            <p>📞 Técnico: ${celular}</p>
            <p>🔌 Puertos disponibles: ${puertos}</p>
            <p>🧠 OLT asignado: ${olt}</p>
            <p>⚠️ Estado: <span class="estado ${props.estado}">${props.estado}</span></p>
            <p>💰 Cash acumulado: $${props.cash}</p>
            <button onclick="solicitarConexion('${props.nombre}')">🚀 Solicitar conexión</button>
          </div>
        `);

      marker.estado = props.estado;
      marcadores.push(marker);
      puntos++;
      cash += props.cash;
    });

    document.getElementById("puntos").textContent = puntos;
    document.getElementById("cash").textContent = cash.toFixed(2);
    document.getElementById("fecha").textContent = new Date().toLocaleDateString();
  });

const marker = L.marker(coords, { icon: iconoMEGANET(props.estado) }).addTo(map)
  .bindPopup(`
    <div style="min-width:240px; font-family:'Segoe UI', sans-serif;">
      <h3 style="margin-bottom:4px;color:#2c3e50;">${props.nombre}</h3>
      <div style="background:#f0f4f8;padding:8px;border-radius:6px;">
        <p style="margin:4px 0;"><strong>📦 Caja:</strong> ${nombreCaja}</p>
        <p style="margin:4px 0;">📞 <strong>Técnico:</strong> ${celular}</p>
        <p style="margin:4px 0;">🧠 <strong>OLT:</strong> ${olt}</p>
        <p style="margin:4px 0;">🔌 <strong>Puertos disponibles:</strong> ${puertos}</p>
        <div style="background:#e0e0e0;height:8px;border-radius:4px;overflow:hidden;margin:6px 0;">
          <div style="width:${(puertos / 16) * 100}%;height:8px;background:#2ecc71;"></div>
        </div>
        <p style="font-size:12px;color:#555;">Disponibilidad de puertos</p>
        <p style="margin:8px 0 4px;"><strong>⚠️ Estado:</strong> <span class="estado ${props.estado}">${props.estado}</span></p>
        <p style="margin:4px 0;">💰 <strong>Cash acumulado:</strong> $${props.cash}</p>
      </div>
      <button onclick="solicitarConexion('${props.nombre}')" style="
        margin-top:10px; 
        background:#3498db;
        color:white;
        border:none;
        padding:6px 12px;
        border-radius:4px;
        font-weight:bold;
        cursor:pointer;">🚀 Solicitar conexión</button>
    </div>
  `);

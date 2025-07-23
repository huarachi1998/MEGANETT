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

// --- TOGGLE DEL SIDEBAR (colapsar / expandir) ---
const sidebar = document.getElementById('sidebar');
const btnToggleSidebar = document.getElementById('btnToggleSidebar');

let isCollapsed = false;

btnToggleSidebar.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('collapsed', isCollapsed);
    sidebar.classList.toggle('locked', isCollapsed);
    btnToggleSidebar.classList.toggle('active', isCollapsed);
    btnToggleSidebar.innerHTML = isCollapsed
        ? '<i class="bi bi-unlock-fill"></i>'
        : '<i class="bi bi-lock-fill"></i>';
});
  // ---- Datos de ejemplo: reemplaza esto con tus documentos reales ----
  const documentos = [
    { nombre: "Plan Postpago Ilimitado.xlsx", tipo: "excel", fecha: "12 Ago 2026", tamano: "245 KB", url: "#" },
    { nombre: "Condiciones Plan Prepago.docx", tipo: "word", fecha: "10 Ago 2026", tamano: "180 KB", url: "#" },
    { nombre: "Presentación Planes 2026.pptx", tipo: "ppt", fecha: "08 Ago 2026", tamano: "3.1 MB", url: "#" },
    { nombre: "Tarifario Corporativo.xlsx", tipo: "excel", fecha: "05 Ago 2026", tamano: "312 KB", url: "#" },
    { nombre: "Términos y Condiciones.docx", tipo: "word", fecha: "01 Ago 2026", tamano: "95 KB", url: "#" },
    { nombre: "Onboarding Comercial.pptx", tipo: "ppt", fecha: "28 Jul 2026", tamano: "4.4 MB", url: "#" },
  ];
 
  const icons = {
    excel: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 3h11l5 5v13a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" fill="#1a7f4b"/><path d="M15 3v5h5" fill="#166b3f"/><path d="M8 10l3 6M11 10l-3 6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    word: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 3h11l5 5v13a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" fill="#2b579a"/><path d="M15 3v5h5" fill="#1e3f70"/><path d="M7.5 10l1.2 6h.1l1.2-4.5 1.2 4.5h.1L12.5 10" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    ppt: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 3h11l5 5v13a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" fill="#c8401f"/><path d="M15 3v5h5" fill="#9d2f15"/><path d="M9 9v8M9 9h2.2a2 2 0 010 4H9" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`
  };
 
  const labels = { excel: "Excel", word: "Word", ppt: "PowerPoint" };
 
  const grid = document.getElementById("grid");
  const buttons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");
  let activeFilter = "all";
  let searchTerm = "";
 
  function render() {
    let items = activeFilter === "all"
      ? documentos
      : documentos.filter(d => d.tipo === activeFilter);
 
    if (searchTerm.trim() !== "") {
      const term = searchTerm.trim().toLowerCase();
      items = items.filter(d => d.nombre.toLowerCase().includes(term));
    }
 
    if (items.length === 0) {
      grid.innerHTML = `<div class="empty">No se encontraron documentos${searchTerm ? ` para "${searchTerm}"` : " en esta categoría"}.</div>`;
      return;
    }
 
    grid.innerHTML = items.map(doc => `
      <div class="card">
        <div class="card-top">
          <div class="icon ${doc.tipo}">${icons[doc.tipo]}</div>
          <span class="badge ${doc.tipo}">${labels[doc.tipo]}</span>
        </div>
        <p class="card-title">${doc.nombre}</p>
        <div class="card-meta">
          <span>${doc.fecha}</span>
          <span class="dot"></span>
          <span>${doc.tamano}</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-secondary" onclick="window.open('${doc.url}', '_blank')">Ver</button>
          <button class="btn btn-primary" onclick="descargar('${doc.nombre}', '${doc.url}')">Descargar</button>
        </div>
      </div>
    `).join("");
  }
 
  function descargar(nombre, url) {
    // Reemplaza con tu lógica real de descarga (fetch al backend, etc.)
    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    a.click();
  }
 
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      render();
    });
  });
 
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    render();
  });
 
  render();
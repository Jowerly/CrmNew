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
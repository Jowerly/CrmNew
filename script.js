// --- CARRUSEL DE TARJETAS ---
const track = document.getElementById('carouselTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const cards = Array.from(track.children);

// Elementos del Modal
const btnExpand = document.getElementById('btnExpand');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalGrid = document.getElementById('modalGrid');

let index = 0;
const visibleCards = 4;

function updateCarousel() {
    // Ancho del contenedor para desplazar de 4 en 4
    const containerWidth = track.clientWidth;
    track.scrollTo({ left: index * containerWidth, behavior: 'smooth' });
}

btnNext.addEventListener('click', () => {
    // Salta de 4 en 4 tarjetas
    if (index < Math.ceil(cards.length / visibleCards) - 1) {
        index++;
        updateCarousel();
    }
});

btnPrev.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateCarousel();
    }
});

// --- LÓGICA DEL MODAL (Agrandar / Ver Todos) ---
btnExpand.addEventListener('click', () => {
    modalGrid.innerHTML = ''; // Limpiar previo

    // Clona las tarjetas existentes para mostrarlas dentro del Grid del Modal
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        modalGrid.appendChild(clone);
    });

    modalOverlay.classList.add('active');
});

// Cerrar Modal al hacer clic en 'X' o fuera del contenido
modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

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
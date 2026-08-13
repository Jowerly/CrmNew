const track = document.getElementById('carouselTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const cards = track.children;

let index = 0;
const visibleCards = 4;

function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width + 16; // + gap
    track.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
}

btnNext.addEventListener('click', () => {
    if (index < cards.length - visibleCards) {
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
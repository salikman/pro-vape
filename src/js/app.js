import * as flsFunctions from "./modules/functions.js";
import * as lazyLoad from "./modules/lazyload.js";

flsFunctions.isWebp();
lazyLoad.lazyLoad();
AOS.init();

$('.header__phone').on('click', function() {
    $('.header').toggleClass('open-info');

    $('.header__info svg').on('click', function() {
        $('.header').removeClass('open-info');
    });
});

$('.header__collapse').on('click', function() {
    var wScroll = $(this).scrollTop();

    $('body').toggleClass('open-menu');
});

///////////////////////////
// Smooth scroll
$(".main-nav a[href^='#']").on('click', function(e) {
    e.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top - 105
    }, 600);
});

document.addEventListener('wheel', function(event) {
    event.preventDefault();
    var delta = event.deltaY; // отримання напрямку прокрутки
    var $sections = document.querySelectorAll('[id]'); // знаходження всіх елементів з id
    var currentScrollPosition = window.pageYOffset;

    var $nearestSection = null;
    var nearestDistance = Number.MAX_SAFE_INTEGER;

    $sections.forEach(function(section) {
        var sectionOffset = section.offsetTop;
        var distance = Math.abs(sectionOffset - currentScrollPosition);

        if ((delta < 0 && sectionOffset < currentScrollPosition) || (delta > 0 && sectionOffset > currentScrollPosition)) {
            if (distance < nearestDistance) {
                nearestDistance = distance;
                $nearestSection = section;
            }
        }
    });

    if ($nearestSection !== null) {
        window.scrollTo({
            top: $nearestSection.offsetTop,
            behavior: 'smooth'
        });
    }
}, { passive: false });


window.addEventListener('DOMContentLoaded', (event) => {
    const boxes = document.querySelectorAll('.box');
    const minDistance = 100; // Мінімальна відстань між елементами

    function getRandomPosition() {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        return { x: randomX, y: randomY };
    }

    function isOverlap(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
    }

    function repositionBoxes() {
        const positions = new Map();
        boxes.forEach(box => {
            let newPos = getRandomPosition();
            while (Array.from(positions.values()).some(pos => isOverlap(pos, newPos))) {
                newPos = getRandomPosition();
            }
            positions.set(box, newPos);
        });

        positions.forEach((pos, box) => {
            const randomRotation = Math.random() * 360; // Випадкове значення обертання
            box.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${randomRotation}deg)`;
        });
    }

    repositionBoxes();
});




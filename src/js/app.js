import * as flsFunctions from "./modules/functions.js";
import * as lazyLoad from "./modules/lazyload.js";

flsFunctions.isWebp();
lazyLoad.lazyLoad();

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

AOS.init();
$(document).ready(function() {
    // Перевірка при ресайзі вікна
    $(window).resize(function() {
        if ($(window).width() <= 991) {
            AOS.init({
                disable: true // Вимкнення AOS
            });
        } else {
            AOS.init({
                disable: false // Увімкнення AOS
            });
        }
    });
});
$('[data-aos]').each(function(){ $(this).addClass("aos-init"); });

$('#fullpage').fullpage({
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling:true,
    scrollHorizontally: true,
    responsiveWidth: 991,
    menu: '#menu',
    anchors: ['page1', 'page2', 'page3','page4','page5','page6','page7','page8','page9','page10','page11','page12','page13','page14'],
    // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['1 page', '2 page', '3 page','4 page','5 page','6 page','7 page','8 page','9 page','10 page','11 page','12 page','13 page','14 page'],
    onLeave: function(){
        $('.section [data-aos]').each(function(){
            $(this).removeClass("aos-animate")
        });
    },
    onSlideLeave: function(){
        $('.slide [data-aos]').each(function(){
            $(this).removeClass("aos-animate")
        });
    },
    afterSlideLoad: function(){
        $('.slide.active [data-aos]').each(function(){
            $(this).addClass("aos-animate")
        });
    },
    afterLoad: function(){
        $('.section.active [data-aos]').each(function(){
            $(this).addClass("aos-animate")
        });
    },
});

if (window.innerWidth < 992) {
    $("#menu a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 105
        }, 600);
    });
    // document.addEventListener('wheel', function(event) {
    //     event.preventDefault();
    //     var delta = event.deltaY; // отримання напрямку прокрутки
    //     var $sections = document.querySelectorAll('[id]'); // знаходження всіх елементів з id
    //     var currentScrollPosition = window.pageYOffset;
    //
    //     var $nearestSection = null;
    //     var nearestDistance = Number.MAX_SAFE_INTEGER;
    //
    //     $sections.forEach(function(section) {
    //         var sectionOffset = section.offsetTop;
    //         var distance = Math.abs(sectionOffset - currentScrollPosition);
    //
    //         if ((delta < 0 && sectionOffset < currentScrollPosition) || (delta > 0 && sectionOffset > currentScrollPosition)) {
    //             if (distance < nearestDistance) {
    //                 nearestDistance = distance;
    //                 $nearestSection = section;
    //             }
    //         }
    //     });
    //
    //     if ($nearestSection !== null) {
    //         window.scrollTo({
    //             top: $nearestSection.offsetTop,
    //             behavior: 'smooth'
    //         });
    //     }
    // }, { passive: false });
}


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

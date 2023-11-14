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

///////////////////////////
// Smooth scroll
$(".main-nav a[href^='#']").on('click', function(e) {
    e.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top - 105
    }, 600);
});

///////////////////////////
// On Scroll
$(window).on('scroll', function() {
    var wScroll = $(this).scrollTop();

    wScroll > 1 ? $('.header').addClass('fixed-nav') : $('.header').removeClass('fixed-nav');
});
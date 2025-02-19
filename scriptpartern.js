const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 2500, // Slow movement (2.5s)
        disableOnInteraction: false,
    },
    slidesPerView: 5,  // Show 5 logos at a time
    spaceBetween: 20,  // Add spacing between logos
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Speed up when buttons are clicked
document.querySelector('.swiper-button-next').addEventListener('click', () => {
    swiper.autoplay.stop();
    swiper.slideNext();
    swiper.autoplay.start();
});

document.querySelector('.swiper-button-prev').addEventListener('click', () => {
    swiper.autoplay.stop();
    swiper.slidePrev();
    swiper.autoplay.start();
});

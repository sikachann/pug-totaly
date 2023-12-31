const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  spaceBetween: 30,
  loop: true,
  speed: 1000,
  pagination: { 
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});

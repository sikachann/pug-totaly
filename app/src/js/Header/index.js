const toggler = document.querySelector('.header__toggler');
const header__list = document.querySelector('.header__list');

toggler.addEventListener('click', () => {
  toggler.classList.toggle('active');
  header__list.classList.toggle('active');
})

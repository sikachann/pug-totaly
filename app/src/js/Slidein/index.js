const intersectors = document.querySelectorAll("[data-intersector]");
const options = {
  root: null,
  rootMargin: "0px 0px",
  threshold: 0
};
const observer = new IntersectionObserver(doWhenIntersect, options);
intersectors.forEach(intersector => {
  observer.observe(intersector);
});

function doWhenIntersect(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activateIndex(entry.target);
    }
  });
}

function activateIndex(element) {
  element.setAttribute('data-intersector', 'visible');
}


window.onload = function () {
  const CLASSNAME = "-visible";
  const TIMEOUT = 500;
  const DELAY = .8;
  const $target1 = $(".title");
  const $target2 = $(".sentence");

  setInterval(() => {
    $target1.addClass(CLASSNAME);
    setTimeout(() => {
      $target2.addClass(CLASSNAME);
    }, DELAY);
  }, TIMEOUT * 1);
};

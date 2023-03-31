import { Carousel } from './carrousel.js';

const images = [
  './assets/images/image-slide-1.jpg',
  './assets/images/image-slide-2.jpg',
  './assets/images/image-slide-3.jpg',
  './assets/images/image-slide-4.jpg',
  './assets/images/image-slide-5.jpg'
];

function insertCarousel(carousel) {
  document.querySelector('.wrapper')
    .insertAdjacentElement('afterend', carousel.render());
}

function main () {
  document.addEventListener('DOMContentLoaded', () => {
    insertCarousel(new Carousel(images));
  });
}

main();
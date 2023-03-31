import config from './config.js';

export class Carousel {
  #images;
  #wrapper;
  #translate;
  constructor(imagesPath) {
    if(!imagesPath.length) {
      throw new Error('Your image array is empty');
    }
    this.#images = this.#createImagesItem(imagesPath);
    this.#wrapper = document.createElement('section');
    this.#wrapper.classList.add(config.CLASS.containerCarousel);
    this.#translate = 0;
    this.currentSlide = this.#images.length % 2 === 0 
      ? this.#images.length/2 
      : Math.round(this.#images.length/2);
    this.click = 0;
    this.#setTile();
    window.addEventListener('resize', this.#updateTranslateValue);
  }

  #setTile() {
    const title = document.createElement('h2');
    title.innerText = config.TEXT.titleCarousel;
    config.CLASS.carouselTitle
      .forEach(className => title.classList.add(className));

    this.#wrapper.append(title);
  }

  #createImagesItem(imagesPath) {
    return imagesPath.map(image => {
      const li = document.createElement('li');
      li.classList.add(config.CLASS.carouselItem);
      li.innerHTML = `<img src="${image}" alt="" class="${config.CLASS.carouselImage}">`;

      return li;
    });
  }

  #updateTranslateValue = () => {
    const size = this.#images[0].offsetWidth;
    this.#translate = (size * this.click) / window.innerWidth;
    this.#wrapper.querySelector('ul').style.transform = `translateX(${this.#translate * 100}%)`;
  };

  #createButton(directionClass){
    const Button = document.createElement('button');
    Button.setAttribute('type', 'button');
    Button.classList.add(config.CLASS.carouselBtn, `${directionClass}-btn`);
    Button.setAttribute('aria-hidden', 'true');

    return Button;
  }

  #nextElement = () => {
    if(this.currentSlide < this.#images.length){
      const size = this.#images[0].offsetWidth;
      this.#translate -= (size/window.innerWidth);
      this.click--;
      this.currentSlide++;
      console.log(this.#wrapper.querySelector('ul'));
      this.#wrapper.querySelector('ul').style.transform = `translateX(${this.#translate*100}%)`;
    }
  };

  #previousElement = () => {
    if(this.currentSlide > 1){
      const size = this.#images[0].offsetWidth;
      this.#translate += (size/window.innerWidth);
      this.currentSlide--;
      this.click++;
      console.log(this.#wrapper.querySelector('ul'));
      this.#wrapper.querySelector('ul').style.transform = `translateX(${this.#translate*100}%)`;
    }
  };

  #setButton() {
    const rightButton = this.#createButton('right');
    rightButton.addEventListener('click', this.#previousElement);
    const leftButton = this.#createButton('left');
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add(config.CLASS.carouselBtnWrapper);
    btnWrapper.append(leftButton, rightButton);
    leftButton.addEventListener('click', this.#nextElement);

    this.#wrapper.append(btnWrapper);
  }

  render() {
    const list = document.createElement('ul');
    this.#images.forEach(element => list.append(element));
    this.#wrapper.append(list);
    this.#setButton();

    return this.#wrapper;
  }
}
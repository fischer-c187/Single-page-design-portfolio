import config from './config.js';
/**
 * class representing a carousel
 */
export class Carousel {
  #images;
  #wrapper;
  #translate;
  #currentSlide;
  /**
   * create a carousel
   * @param {String[]} imagesPath the array contains the urls to the images we want to display in our carousel
   */
  constructor(imagesPath) {
    if(!imagesPath.length) {
      throw new Error('Your image array is empty');
    }
    this.#images = this.#createImagesItem(imagesPath);
    this.#wrapper = document.createElement('section');
    this.#wrapper.classList.add(config.CLASS.containerCarousel);
    this.#translate = 0;
    this.#currentSlide = Math.round(this.#images.length/2);
    this.#setTile();
  }

  /**
   * set the title of our carousel, put it in an h2 
   */
  #setTile() {
    const title = document.createElement('h2');
    title.innerText = config.TEXT.titleCarousel;
    config.CLASS.carouselTitle
      .forEach(className => title.classList.add(className));

    this.#wrapper.append(title);
  }

  /**
   * create our item list for all url
   * @param {String[]} imagesPath the array contains the urls to the images we want to display in our carousel
   * @returns {HTMLElement[]}
   */
  #createImagesItem(imagesPath) {
    return imagesPath.map(image => {
      const li = document.createElement('li');
      li.classList.add(config.CLASS.carouselItem);
      li.innerHTML = `<img src="${image}" alt="" class="${config.CLASS.carouselImage}">`;

      return li;
    });
  }

  /**
   * managing the resize screen event
   */
  #handleResize() {
    window.addEventListener('resize', this.#refreshTranslateValueAfterResize);
  }

  /**
   * when screen is resize, recalculate the pourcentage translate
   */
  #refreshTranslateValueAfterResize = () => {
    const newValue = this.#getRatioTranslate(this.#nbrOfTranslate());
    this.#updateTranslateValue(newValue);
  };

  /**
   * changes the value of translate with our new value, 
   * also changes the value of the translate of our container
   * @param {Number} newValue 
   */
  #updateTranslateValue (newValue) {
    this.#translate = newValue;
    this.#wrapper.querySelector('ul').style.transform = `translateX(${this.#translate * 100}%)`;
  }

  /**
   * get the ratio : image size / window size
   * @param {Number} multiplier 
   * @returns {Number}
   */
  #getRatioTranslate(multiplier = 1) {
    // this.#images[0] contain image HTMLElement
    return (this.#images[0].offsetWidth*multiplier) / window.innerWidth;
  }

  /**
   * create button element
   * @param {String} directionClass left | right
   * @param {Function} functionEventClick function to attach to our click event
   * @returns {HTMLElement}
   */
  #createButton(directionClass, functionEventClick=undefined){
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-hidden', 'true');
    button.classList.add(config.CLASS.carouselBtn, `${directionClass}-btn`);
    button.innerText = directionClass;
    if(functionEventClick){
      button.addEventListener('click', functionEventClick);
    }

    return button;
  }

  /**
   * gives us the number of clicks made on the buttons
   * @returns Number
   */
  #nbrOfTranslate() {
    return Math.round(this.#images.length/2)-this.#currentSlide;
  }

  /**
   * display the next image
   */
  #nextElement = () => {
    if(this.#currentSlide < this.#images.length){
      const newValue = this.#translate - this.#getRatioTranslate();
      this.#updateTranslateValue(newValue);
      this.#currentSlide++;
    }
  };

  /**
   * display the previous image
   */
  #previousElement = () => {  
    if(this.#currentSlide > 1){
      const newValue = this.#translate + this.#getRatioTranslate();
      this.#updateTranslateValue(newValue);
      this.#currentSlide--;
    }
  };

  /**
   * create and display our navigations buttons
   */
  #setButton() {
    const rightButton = this.#createButton('right', this.#previousElement);
    const leftButton = this.#createButton('left', this.#nextElement);

    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add(config.CLASS.carouselBtnWrapper);
    btnWrapper.append(leftButton, rightButton);

    this.#wrapper.append(btnWrapper);
  }

  /**
   * 
   * @returns {HTMLElement}
   */
  render() {
    const list = document.createElement('ul');
    list.style.transform = `translateX(${this.#translate*100}%)`;
    this.#images.forEach(element => list.append(element));
    this.#wrapper.append(list);
    this.#setButton();
    this.#handleResize();

    return this.#wrapper;
  }
}
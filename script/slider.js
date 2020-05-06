const images = [
  '/img/image1.jpg',
  '/img/image2.jpg',
  '/img/image3.jpg',
  '/img/image4.jpg',
]

class Slider {
  constructor(images) {
    this.images = images;
    this.image = null;
    this.slide = null;
    this.buttonNext = null;
    this.buttonPrev = null;
    this.currentSlide = 0;
    this.slidesArrayLength = 0
    this.slideCaption = null;
    this.UiSelectors = {
      slide: '[data-slide]',
      buttonPrev: '[data-button-prev]',
      buttonNext: '[data-button-next]',
    }
  }
  initializeSlider = () => {
    this.slide = document.querySelector(this.UiSelectors.slide)
    this.buttonNext = document.querySelector(this.UiSelectors.buttonNext)
    this.buttonPrev = document.querySelector(this.UiSelectors.buttonPrev)
    this.image = document.createElement('img')
    this.image.classList.add('slide__image')
    this.setSliderAttributes(this.currentSlide)
    this.slide.appendChild(this.image)
    this.addListeners()
    this.slidesArrayLength = this.images.length
    this.slideCaption = document.createElement('figcaption')
    this.addCaption()
    this.slideCaption.classList.add('slide__caption')
    this.slide.appendChild(this.slideCaption)
  }

  setSliderAttributes = (index) => {
    this.disableButtons()
    this.image.setAttribute('src', this.images[index])
    this.image.setAttribute('alt', `Slide ${index + 1}`)
  }

  addListeners() {
    this.buttonPrev.addEventListener('click', () => this.changeSlide(this.currentSlide - 1));
    this.buttonNext.addEventListener('click', () => this.changeSlide(this.currentSlide + 1));
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 37) {
        this.changeSlide(this.currentSlide - 1)
      } else if (e.keyCode === 39) {
        this.changeSlide(this.currentSlide + 1)
      }
    })
  }

  changeSlide = (index) => {
    if (index === -1 || index === this.slidesArrayLength) return
    this.currentSlide = index
    this.setSliderAttributes(index)
    this.addCaption()
  }

  disableButtons() {
    this.currentSlide === 0 ? this.buttonPrev.setAttribute('disabled', true) : this.buttonPrev.removeAttribute('disabled');
    this.currentSlide === this.slidesArrayLength - 1 ? this.buttonNext.setAttribute('disabled', true) : this.buttonNext.removeAttribute('disabled');
  }

  addCaption() {
    this.slideCaption.innerText = `${this.currentSlide + 1}/${this.slidesArrayLength}`
  }

}


const slider = new Slider(images)
slider.initializeSlider()




/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
var slideIndex = 1;
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const slidesImage = document.getElementsByClassName('mainSlidesImage');
  const currentImage = document.getElementsByClassName('smallSlidesImages');
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < currentImage.length; i++) {
    currentImage[i].className = currentImage[i].className.replace(' active', '');
  }
  slidesImage[slideIndex - 1].className += ' mx-auto d-block';
  slides[slideIndex - 1].style.display = 'block';
  currentImage[slideIndex - 1].className += ' active';

}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

showSlides(slideIndex);

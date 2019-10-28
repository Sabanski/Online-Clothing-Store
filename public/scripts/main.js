/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
let slideIndex = 1;
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const slidesImage = document.getElementsByClassName('mainSlidesImage');
  const currentImage = document.getElementsByClassName('smallSlidesImages');
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
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

$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    items: 1,
    margin: 0,
    stagePadding: 0,
    autoplay: false,
    dots: true,
  });

  slidecount = 1;
  jQuery('.owl-item').not('.cloned').each(function () {
    jQuery(this).addClass(`slidenumber${slidecount}`);
    slidecount += 1;
  });

  $('.minus').click(function () {
    let $input = $(this).parent().find('input');
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    let $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
  $('.size-active').on('click', function () {
    $('.size-active').not(this).removeClass('size-active-border');
    $(this).toggleClass('size-active-border');
  });
  $('.active-image').on('click', function () {
    $('.active-image').not(this).removeClass('size-active-border');
    $(this).toggleClass('size-active-border');
  });
});

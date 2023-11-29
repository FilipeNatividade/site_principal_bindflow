// ==================MENU===================

document.addEventListener('DOMContentLoaded', function () {
  let openNav = false;
  let navBarButton = document.getElementById('navBarButton');
  let navBar = document.querySelector('.nav_bar');

  navBarButton.addEventListener('click', function () {
    openNav = !openNav;
    navBar.style.display = openNav ? 'flex' : 'none';
  });
});

// ==================CARROSEL===================

let slideIndex = 0;
showSlides();

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides() {
  let slides = document.getElementsByClassName('mySlides');

  let i;
  let countSlides;

  if (window.innerWidth <= 499) {
    countSlides = 1;
  } else if (window.innerWidth >= 500 && window.innerWidth <= 705) {
    countSlides = 2;
  } else if (window.innerWidth >= 706 && window.innerWidth <= 999) {
    countSlides = 3;
  } else if (window.innerWidth >= 1000) {
    countSlides = 4;
  }

  slideIndex = (slideIndex + slides.length) % slides.length;

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (i = slideIndex; i < slideIndex + countSlides; i++) {
    const adjustedIndex = (i + slides.length) % slides.length;
    slides[adjustedIndex].style.display = 'block';
  }
}

window.addEventListener('resize', showSlides);

// ==================resetar formulario===================

function resetarFormulario() {
  document.getElementById("meuFormulario").reset();
  return false;
}
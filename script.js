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

// ==================ENVIAR EMAIL===================

document
  .getElementById('formulario')
  .addEventListener('submit', function (event) {
    event.preventDefault(); 

    enviarEmail();
  });

async function enviarEmail() {
  try {
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('telefone').value;
    const message = document.getElementById('mensagem').value;

    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject:"Contato Bindflow",
        name: name,
        emailClient: email,
        phone: phone,
        message: message,
      }),
    });

    if (response.ok) {
      window.location.href = 'https://obrigaado-pelo-contato.vercel.app/';
      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
      document.getElementById('telefone').value = '';
      document.getElementById('mensagem').value = '';
    } else {
      console.error('Erro ao enviar e-mail:', response.statusText);
      alert('Erro ao enviar e-mail. Por favor, tente novamente.');
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
    alert('Erro inesperado. Por favor, tente novamente.');
  }
}

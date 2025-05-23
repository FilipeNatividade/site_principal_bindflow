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
  const name = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('telefone').value;
  const message = document.getElementById('mensagem').value;

  const payload = {
    "de": "no-reply@bindflow.com.br",
    // "para": "contato@bindflow.com.br",
    "para": "filipe.natividade@bindflow.com.br",
    "assunto": "Contato pelo site Bindflow",
    "corpo": `${name} \n\n` +
      `${email} \n\n` +
      `${phone} \n\n` +
      `${message}`
  };

  try {
    const response = await fetch(
      'https://functions-delivery.azurewebsites.net/api/Enviar?code=3JuuSqixm_yWDiQltHigzCpdWhFfHi-5YF4sDKvkCxaJAzFuwEu9CA%3D%3D',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const text = await response.text();
    if (response.ok) {
      alert("Mensagem enviada com sucesso!");
      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
      document.getElementById('telefone').value = '';
      document.getElementById('mensagem').value = '';
    } else {
      throw new Error(text);
    }
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro ao enviar: " + error.message);
  }
}

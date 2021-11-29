export default function initSlide() {
  const slides = document.querySelectorAll("[data-slide]");
  const bolinhas = document.querySelectorAll("[data-btn-slide] span");
  let contador = 0;
  let slideAutomatico;
  let pause = false;

  if (slides.length > 0 && bolinhas.length > 0) {
    slides[0].classList.add("ativo");
    bolinhas[0].classList.add("ativo");

    bolinhas.forEach((bolinha, indice) => {
      bolinha.addEventListener("click", () => {
        removeClassAtivo(bolinhas);
        removeClassAtivo(slides);
        adicionaClassAtivo(indice);
        contador = indice;
        // limpamos e reutilizamos a funçao SlideAuto para o tempo começar a contar novamente.
        // Caso não fizermos isso, o slide clicado vai passar muito rapido
        clearInterval(slideAutomatico);
        slideAuto();
      });
    });
  }
  function slideAuto() {
    slideAutomatico = setInterval(() => {
      if (!pause) {
        // tem que ter pelo menos um ativo, caso ocorra uma ativaçao por clique, o contador armazenaá para usarmos aqui
        if (slides[contador].classList.contains("ativo")) {
          if (contador == 3) {
            contador = 0;
            removeClassAtivo(bolinhas);
            removeClassAtivo(slides);
            adicionaClassAtivo(contador);
          } else {
            removeClassAtivo(bolinhas);
            removeClassAtivo(slides);
            adicionaClassAtivo(contador + 1);
            contador++;
          }
        }
      }
    }, 2000);
  }
  slideAuto();
  function adicionaClassAtivo(contador) {
    slides[contador].classList.add("ativo");
    bolinhas[contador].classList.add("ativo");
    slides[contador].addEventListener("mouseenter", () => {
      pause = true;
    });
  }
  function removeClassAtivo(array) {
    array.forEach((elem, indice) => {
      elem.classList.remove("ativo");
    });
    slides.forEach((elem) => {
      elem.addEventListener("mouseleave", () => {
        pause = false;
      });
    });

    console.log("aquu");
  }
}

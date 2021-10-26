export default function initSlide() {
  const slides = document.querySelectorAll("[data-slide]");
  const bolinhas = document.querySelectorAll("[data-btn-slide] span");
  let contador = 0;
  let slideAutomatico;

  if (slides.length > 0 && bolinhas.length > 0) {
    slides[0].classList.add("ativo");
    bolinhas[0].classList.add("ativo");

    bolinhas.forEach((bolinha, indice) => {
      bolinha.addEventListener("click", () => {
        slides.forEach((slide) => {
          slide.classList.remove("ativo");
          // eu poderia retirar essa parte e me basear pelo slide(se colocarmos isso em pratica vamos economizar 3 linhas). vamos ter que passar
          // um indice para  o slide caso queiramos implementar oque está inscrito acima
          bolinhas.forEach((elem) => {
            elem.classList.remove("ativo");
          });
        });
        slides[indice].classList.add("ativo");
        bolinha.classList.add("ativo");
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
      // tem que ter pelo menos um ativo, caso ocorra uma ativaçao por clique, o contador armazenaá para usarmos aqui
      if (slides[contador].classList.contains("ativo")) {
        if (contador == 3) {
          contador = 0;
          slides.forEach((elem) => {
            elem.classList.remove("ativo");
          });
          bolinhas.forEach((elem) => {
            elem.classList.remove("ativo");
          });
          slides[contador].classList.add("ativo");
          bolinhas[contador].classList.add("ativo");
        } else {
          slides[contador].classList.remove("ativo");
          bolinhas[contador].classList.remove("ativo");
          slides[contador + 1].classList.add("ativo");
          bolinhas[contador + 1].classList.add("ativo");
          contador++;
        }
      }
    }, 2000);
  }
  slideAuto();
}

/*poderiamos depois para deixar o codigo mais organizado, criar duas funçoes, uma para retirar classes e outra para coloca-las.
assim podemos passar os elementos html por parametro e economizar mais linhas, alem de deixar o codigo mais limpo e legivel */

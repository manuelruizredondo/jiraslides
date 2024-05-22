let observedElements = document.querySelectorAll('.inview');

const options = { 
  threshold: 0.3
};

const inViewCallback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-inview');

      if (entry.target.classList.contains('animated-counter-w')) {
        console.log("esta countere");

        $({ Counter: 0 }).animate({
          Counter: parseInt($('.animated-counter1').text(), 10)
        }, {
          duration: 2000,
          easing: 'swing',
          step: function() {
            console.log(this.Counter);
            $('.animated-counter1').text(Math.ceil(this.Counter));
          }
        });
        
        $({ Counter2: 0 }).animate({
          Counter2: parseInt($('.animated-counter2').text(), 10)
        }, {
          duration: 2500,
          easing: 'swing',
          step: function() {
            console.log(this.Counter2);
            $('.animated-counter2').text(Math.ceil(this.Counter2));
          }
        });
        
        // Desconectar el observador de este elemento para evitar futuras animaciones
        observer.unobserve(entry.target);
      }
    }
  });
};

let observer = new IntersectionObserver(inViewCallback, options); 

observedElements.forEach(element => {
  observer.observe(element);
  // Inicialización: Comprueba si el elemento está en la vista y procesa en caso afirmativo
  const isVisible = element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom >= 0;
  if (isVisible) {
    element.classList.add('is-inview');
    observer.unobserve(element); // Asegúrate de no volver a procesar el elemento
  }
});

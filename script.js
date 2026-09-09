/* =====================================================
   PORTAFOLIO PERSONAL — ADA MONTES
   JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------
     1. RESALTAR EL ENLACE ACTIVO DEL MENÚ SEGÚN LA SECCIÓN
        (usa las secciones: inicio, quien-soy, logros,
        proyectos, contacto)
  ----------------------------------------------------- */
  const secciones = document.querySelectorAll('section[id]');
  const enlacesNav = document.querySelectorAll('.nav-menu a');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        enlacesNav.forEach(enlace => {
          enlace.classList.toggle(
            'active',
            enlace.getAttribute('href') === '#' + id
          );
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  secciones.forEach(seccion => observerNav.observe(seccion));


  /* -----------------------------------------------------
     2. ANIMACIÓN AL APARECER (fade-in) PARA
        LAS CARDS DE LOGROS Y LOS PROYECTOS
  ----------------------------------------------------- */
  const elementosAnimados = document.querySelectorAll('.card, .project');

  elementosAnimados.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observerAnimacion = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementosAnimados.forEach(el => observerAnimacion.observe(el));


  /* -----------------------------------------------------
     3. ENVÍO DEL FORMULARIO DE CONTACTO SIN RECARGAR
        LA PÁGINA (usa el action de Formspree ya definido
        en el HTML)
  ----------------------------------------------------- */
  const formulario = document.querySelector('.contact-form form');

  if (formulario) {
    // Creamos un mensaje de estado debajo del formulario
    const mensajeEstado = document.createElement('p');
    mensajeEstado.style.marginTop = '15px';
    mensajeEstado.style.fontSize = '14px';
    mensajeEstado.style.display = 'none';
    formulario.appendChild(mensajeEstado);

    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();

      const boton = formulario.querySelector('button[type="submit"]');
      const textoOriginal = boton.textContent;

      boton.textContent = 'Enviando...';
      boton.disabled = true;

      try {
        const datos = new FormData(formulario);

        const respuesta = await fetch(formulario.action, {
          method: 'POST',
          body: datos,
          headers: { 'Accept': 'application/json' }
        });

        if (respuesta.ok) {
          mensajeEstado.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
          mensajeEstado.style.color = '#4D8DFF';
          formulario.reset();
        } else {
          mensajeEstado.textContent = 'Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.';
          mensajeEstado.style.color = '#ff6b6b';
        }
      } catch (error) {
        mensajeEstado.textContent = 'No se pudo conectar. Revisa tu internet e inténtalo de nuevo.';
        mensajeEstado.style.color = '#ff6b6b';
      } finally {
        mensajeEstado.style.display = 'block';
        boton.textContent = textoOriginal;
        boton.disabled = false;
      }
    });
  }


  /* -----------------------------------------------------
     4. AÑO ACTUAL AUTOMÁTICO EN EL FOOTER
  ----------------------------------------------------- */
  const textoFooter = document.querySelector('.footer-content p');

  if (textoFooter) {
    const anioActual = new Date().getFullYear();
    textoFooter.textContent = textoFooter.textContent.replace(/\d{4}/, anioActual);
  }

});
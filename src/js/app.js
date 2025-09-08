import '../css/main.css';
// Importación más robusta de lucide
import { createIcons, icons } from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ICONOS ---
    const initLucideIcons = () => {
        createIcons({ icons });
    };

    // --- 2. EFECTOS DE SCROLL ---
    const initScrollEffects = () => {
      const headerNav = document.getElementById('header-nav');
      const aboutSection = document.getElementById('about');
      const parallaxBg = document.querySelector('.parallax-bg');

      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        // Header flotante
        if (aboutSection && headerNav) {
          if (scrollPosition > aboutSection.offsetTop - 100) {
            headerNav.classList.add('scrolled');
          } else {
            headerNav.classList.remove('scrolled');
          }
        }

        // Parallax
        if (parallaxBg) {
          parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
      });

      // Animaciones de entrada
      const scrollElements = document.querySelectorAll('.animate-on-scroll');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      scrollElements.forEach(el => observer.observe(el));
    };

    // --- 3. MENÚ MÓVIL (LÓGICA SIMPLIFICADA) ---
    const initMobileMenu = () => {
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

      const toggleMenu = () => {
        if (mobileMenu) {
          // Alterna las clases `hidden` y `flex` para mostrar/ocultar
          mobileMenu.classList.toggle('hidden');
          mobileMenu.classList.toggle('flex');
        }
      };

      const closeMenu = () => {
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }
      };

      // El botón de hamburguesa ahora abre y cierra
      if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);
      }
      
      // Los enlaces del menú siempre lo cierran
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    };

    // --- INICIALIZACIÓN ---
    initLucideIcons();
    initScrollEffects();
    initMobileMenu();
});

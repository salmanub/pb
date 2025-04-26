// link-preloader.js
export function linkPreloader(config) {
    // Registrar el shortcode para usar en templates
    config.addShortcode("linkPreloader", function() {
      return `
        
          // Configuración
          const preloadConfig = {
            // Enlaces que NO queremos precargar
            excludePatterns: [
              /\\.pdf$/,
              /\\.zip$/,
              /^tel:/,
              /^mailto:/,
              /^#/,
              /^javascript:/
            ],
            // Prioridad de tipos de preload
            priorities: {
              samePage: 'high',
              sameOrigin: 'low',
              external: 'lowest'
            }
          };
  
          // Función principal de precarga
          function initLinkPreloader() {
            // Crear observer para detectar cuando el usuario está inactivo
            let idleCallback = window.requestIdleCallback || 
              function(cb) { return setTimeout(cb, 1); };
  
            // Obtener todos los enlaces de la página
            const links = Array.from(document.links);
  
            idleCallback(() => {
              links
                .filter(link => shouldPreloadLink(link))
                .forEach(link => preloadLink(link));
            });
          }
  
          // Determinar si debemos precargar un enlace
          function shouldPreloadLink(link) {
            const href = link.href;
            
            // Verificar exclusiones
            const isExcluded = preloadConfig.excludePatterns.some(pattern => 
              pattern.test(href)
            );
            
            if (isExcluded) return false;
  
            // No precargar si ya está en caché
            if (performance.getEntriesByName(href).length > 0) return false;
  
            // No precargar si está fuera de viewport
            const rect = link.getBoundingClientRect();
            const isInViewport = (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= window.innerHeight &&
              rect.right <= window.innerWidth
            );
            
            if (!isInViewport) return false;
  
            return true;
          }
  
          // Precargar un enlace específico
          function preloadLink(link) {
            const href = link.href;
            
            // Determinar prioridad
            let priority = 'auto';
            if (link.host === window.location.host) {
              if (link.pathname === window.location.pathname) {
                priority = preloadConfig.priorities.samePage;
              } else {
                priority = preloadConfig.priorities.sameOrigin;
              }
            } else {
              priority = preloadConfig.priorities.external;
            }
  
            // Crear elemento de precarga
            const preloader = document.createElement('link');
            preloader.rel = 'prefetch';
            preloader.href = href;
            preloader.as = 'document';
            preloader.importance = priority;
  
            // Agregar a head
            document.head.appendChild(preloader);
          }
  
          // Inicializar cuando el documento esté listo
          if (document.readyState === 'complete') {
            initLinkPreloader();
          } else {
            window.addEventListener('load', initLinkPreloader);
          }
  
          // Bonus: Integración con Partytown
          if (window.partytown) {
            window.partytown.forward(['requestIdleCallback']);
          }
        
      `;
    });
  };
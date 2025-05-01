// Nombre de los caches
const CACHE_KEYS = {
    PRE_CACHE: `precache-${VERSION}`,
    RUNTIME: `runtime-${VERSION}`,
    STATIC: `static-${VERSION}`
  };
  
  // URLs que no queremos que terminen en caché
  const EXCLUDED_URLS = [
    'admin',
    '.netlify',
    'https://identity.netlify.com/v1/netlify-identity-widget.js',
    'https://unpkg.com/netlify-cms@^2.9.3/dist/netlify-cms.js',
    '/contact',
    '/thank-you',
    '/api/'
  ];
  
  // URLs que queremos cachear cuando el worker se instala (assets críticos)
  const PRE_CACHE_URLS = [
    '/',
    '/index.html',
    '/fonts/lora-v13-latin-700.woff',
    '/css/main.css',
    '/js/main.js'
  ];
  
  // Hosts que queremos ignorar (no cachear)
  const IGNORED_HOSTS = ['localhost', 'unpkg.com'];
  
  // Tipos de archivos estáticos que se pueden cachear agresivamente
  const STATIC_CACHE_TYPES = [
    'font',
    'image',
    'style',
    'script'
  ];
  
  /**
   * Añade elementos a un store de caché específico
   * @param {String} cacheName
   * @param {Array} items=[]
   */
  const addItemsToCache = async function(cacheName, items = []) {
    const cache = await caches.open(cacheName);
    return cache.addAll(items);
  };
  
  /**
   * Limpia los caches antiguos que no coinciden con los actuales
   */
  const clearOldCaches = async function() {
    const keys = await caches.keys();
    const oldKeys = keys.filter(key => !Object.values(CACHE_KEYS).includes(key));
    return Promise.all(oldKeys.map(key => caches.delete(key)));
  };
  
  /**
   * Determina si una solicitud debe ser cacheada en función de su tipo
   * @param {Request} request
   */
  const isStaticRequest = request => {
    const url = new URL(request.url);
    return STATIC_CACHE_TYPES.some(type => request.destination === type) && 
           !EXCLUDED_URLS.some(page => url.pathname.includes(page));
  };
  
  /**
   * Comprueba si un URL está excluido del caché
   * @param {String} url
   */
  const isExcluded = url => {
    return EXCLUDED_URLS.some(excluded => url.includes(excluded));
  };
  
  /**
   * Implementación optimizada de "stale-while-revalidate"
   * Usa la caché primero, luego actualiza la caché con la respuesta de la red
   * @param {Request} request
   */
  const staleWhileRevalidate = async (request) => {
    const cache = await caches.open(CACHE_KEYS.RUNTIME);
    const cachedResponse = await cache.match(request);
    
    // Inicia la revalidación en segundo plano
    const fetchAndCache = async () => {
      try {
        const response = await fetch(request);
        // Solo cachear respuestas válidas (status 200)
        if (response.ok) {
          await cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        console.error('Error fetching:', error);
        return null;
      }
    };
  
    // Si tenemos una respuesta en caché, úsala mientras actualizamos en segundo plano
    if (cachedResponse) {
      fetchAndCache(); // No esperamos a que termine - actualización en segundo plano
      return cachedResponse;
    }
    
    // Si no hay caché, esperar a la red
    return fetchAndCache() || new Response('Network error', { 
      status: 408, 
      headers: { 'Content-Type': 'text/plain' } 
    });
  };
  
  // Evento de instalación - cachea los recursos iniciales
  self.addEventListener('install', evt => {
    console.log(`[Service Worker] Instalando versión ${VERSION}`);
    
    // Precarga los recursos críticos
    evt.waitUntil(
      addItemsToCache(CACHE_KEYS.PRE_CACHE, PRE_CACHE_URLS)
        .then(() => {
          // Activa inmediatamente sin esperar a que se cierren las pestañas
          return self.skipWaiting();
        })
    );
  });
  
  // Evento de activación - limpia los caches antiguos
  self.addEventListener('activate', evt => {
    console.log(`[Service Worker] Activando versión ${VERSION}`);
    evt.waitUntil(
        clearOldCaches()
            .then(() => {
                console.log('[Service Worker] Caches antiguos eliminados.');
                return self.clients.claim();
            })
            .then(() => {
                console.log('[Service Worker] Ahora controla todas las pestañas.');
                return self.clients.matchAll().then(clients => {
                    return Promise.all(
                        clients.map(client => {
                            return client.postMessage({
                                type: 'SW_UPDATED',
                                version: VERSION
                            });
                        })
                    );
                });
            })
    );
  });
  
  // Evento de fetch - estrategia de caché según el tipo de recurso
  self.addEventListener('fetch', evt => {
    const request = evt.request;
    const url = new URL(request.url);
    
    // Ignoramos los hosts definidos
    if (IGNORED_HOSTS.some(host => url.hostname.includes(host))) {
      return;
    }
    
    // Ignoramos URLs excluidas
    if (isExcluded(url.href)) {
      return;
    }
    
    // Estrategia según el tipo de solicitud
    if (request.method !== 'GET') {
      // Para métodos que no son GET, vamos directo a la red
      return;
    } else if (isStaticRequest(request)) {
      // Para assets estáticos, usar cache-first
      evt.respondWith(
        caches.match(request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Si no está en caché, buscarlo y cachear
            return fetch(request)
              .then(response => {
                if (!response || !response.ok) {
                  return response;
                }
                // Clonar y guardar en caché
                const clonedResponse = response.clone();
                caches.open(CACHE_KEYS.STATIC).then(cache => {
                  cache.put(request, clonedResponse);
                });
                return response;
              });
          })
      );
    } else {
      // Para otras peticiones, usar stale-while-revalidate
      evt.respondWith(staleWhileRevalidate(request));
    }
  });
  
  // Evento de mensaje - manejar mensajes de los clientes
  self.addEventListener('message', evt => {
    // Si el cliente pide refrescar la caché
    if (evt.data && evt.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    
    // Si el cliente pide verificar actualizaciones
    if (evt.data && evt.data.type === 'CHECK_VERSION') {
      evt.ports[0].postMessage({
        type: 'VERSION',
        version: VERSION
      });
    }
  });
  
  // Script para confirmar actualización al cliente
  // Añade esto a tu script principal
  /*
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        // Verificar versión actual
        if (registration.active) {
          navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'SW_UPDATED') {
              // Notificar al usuario de la actualización
              console.log('Contenido actualizado. Recarga para ver los cambios.');
              // Opcional: Mostrar notificación visual al usuario
            }
          });
        }
      });
    }
  */
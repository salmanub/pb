
document.addEventListener('DOMContentLoaded', function () {
    const currentLang = document.documentElement.lang || 'es';
    const availableLangs = ['es', 'en', 'ca', 'fr', 'it'];
    const defaultLang = 'es';

    // Nombres de idiomas para mostrar al usuario
    const langNames = {
        es: 'Español',
        en: 'English',
        ca: 'Català',
        fr: 'Français',
        it: 'Italiano'
    };

    // Función para extraer el slug de una URL, ignorando el prefijo de idioma
    function extractSlug(url) {
        const path = new URL(url, window.location.origin).pathname;
        const slugMatch = path.match(/(?:\/(?:en|ca|fr|it))?(\/.*)/);
        return slugMatch ? slugMatch[1] : null;
    }

    // Función para crear la URL de un idioma específico
    function getLangUrl(lang, slug) {
        if (lang === defaultLang) {
            return slug;
        }
        return `/${lang}${slug}`;
    }

    // Función para comprobar si una URL existe
    function checkUrlExists(url) {
        return fetch(url, { 
            method: 'HEAD',
            redirect: 'manual' // No seguir redirecciones para obtener el estado real
        })
        .then(response => response.ok)
        .catch(() => false);
    }

    // Función para buscar alternativas en otros idiomas
    async function findAlternatives(slug) {
        const otherLangs = availableLangs.filter(lang => lang !== currentLang);
        const alternatives = [];

        for (const lang of otherLangs) {
            const url = getLangUrl(lang, slug);
            const exists = await checkUrlExists(url);
            if (exists) {
                alternatives.push({ lang, url });
            }
        }

        return alternatives;
    }

    // Función para mostrar el modal de alternativas
    function showAlternativesModal(alternatives, originalUrl) {
        // Obtener textos desde el objeto global (si existe)
        let pageUnavailableText = "Esta página no está disponible en su idioma.";
        let pageAvailableInText = "Sin embargo, la hemos encontrado en";
        let viewPageInText = "Ver en";

        if (window.error404Texts) {
            pageUnavailableText = window.error404Texts.pageUnavailable;
            pageAvailableInText = window.error404Texts.pageAvailableIn;
            viewPageInText = window.error404Texts.viewPageIn;
        }

        const linksHTML = alternatives.map(alt => 
            `<a href="${alt.url}" class="inline-block px-4 py-2 mx-1 mb-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors">${viewPageInText} ${langNames[alt.lang]}</a>`
        ).join('');

        const modalHTML = `
            <div id="language-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 max-w-md mx-4 text-center shadow-lg">
                    <h3 class="text-lg font-semibold text-slate-800 mb-3">${pageUnavailableText}</h3>
                    <p class="text-slate-600 mb-4">${pageAvailableInText}:</p>
                    <div class="mb-4">${linksHTML}</div>
                    <div class="flex gap-2 justify-center">
                        <button id="continue-anyway" class="px-4 py-2 bg-slate-300 text-slate-700 rounded hover:bg-slate-400 transition-colors">
                            Ir de todas formas
                        </button>
                        <button id="close-modal" class="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event listeners para los botones del modal
        document.getElementById('continue-anyway').addEventListener('click', () => {
            document.getElementById('language-modal').remove();
            window.location.href = originalUrl;
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('language-modal').remove();
        });

        // Cerrar modal al hacer clic fuera
        document.getElementById('language-modal').addEventListener('click', (e) => {
            if (e.target.id === 'language-modal') {
                document.getElementById('language-modal').remove();
            }
        });
    }

    // Interceptar clics en enlaces internos
    document.addEventListener('click', async function(e) {
        const link = e.target.closest('a');
        
        // Solo procesar enlaces internos que no sean externos, mailto, tel, etc.
        if (!link || 
            !link.href || 
            link.href.startsWith('mailto:') || 
            link.href.startsWith('tel:') || 
            link.href.startsWith('#') ||
            link.target === '_blank' ||
            link.hostname !== window.location.hostname) {
            return;
        }

        const targetUrl = link.href;
        const slug = extractSlug(targetUrl);

        // No procesar la página de inicio
        if (!slug || slug === '/') {
            return;
        }

        // Comprobar si la página de destino existe
        e.preventDefault(); // Prevenir la navegación por defecto

        const exists = await checkUrlExists(targetUrl);
        
        if (exists) {
            // La página existe, navegar normalmente
            window.location.href = targetUrl;
        } else {
            // La página no existe, buscar alternativas
            const alternatives = await findAlternatives(slug);
            
            if (alternatives.length > 0) {
                // Mostrar modal con alternativas
                showAlternativesModal(alternatives, targetUrl);
            } else {
                // No hay alternativas, ir a la página 404
                window.location.href = targetUrl;
            }
        }
    });
});

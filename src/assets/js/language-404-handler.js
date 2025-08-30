
document.addEventListener('DOMContentLoaded', function () {
    const currentLang = document.documentElement.lang || 'es';
    const path = window.location.pathname;
    const availableLangs = ['es', 'en', 'ca', 'fr', 'it'];
    const defaultLang = 'es';

    // Expresión regular para extraer el slug de la URL, ignorando el prefijo de idioma
    const slugMatch = path.match(/(?:\/(?:en|ca|fr|it))?(\/.*)/);
    if (!slugMatch) return;

    const slug = slugMatch[1];

    // No ejecutar en la página de inicio
    if (slug === '/') return;

    const otherLangs = availableLangs.filter(lang => lang !== currentLang);
    const promises = [];

    // Función para crear la URL de un idioma específico
    function getLangUrl(lang, slug) {
        if (lang === defaultLang) {
            return slug;
        }
        return `/${lang}${slug}`;
    }

    // Comprobar la existencia de la página en otros idiomas
    otherLangs.forEach(lang => {
        const url = getLangUrl(lang, slug);
        promises.push(
            fetch(url, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        return { lang, url };
                    }
                    return null;
                })
                .catch(() => null)
        );
    });

    // Cuando todas las comprobaciones terminen
    Promise.all(promises).then(results => {
        const availableTranslations = results.filter(r => r !== null);

        if (availableTranslations.length > 0) {
            const suggestionContainer = document.getElementById('language-suggestion');
            if (suggestionContainer) {
                const langNames = {
                    es: 'Español',
                    en: 'English',
                    ca: 'Català',
                    fr: 'Français',
                    it: 'Italiano'
                };

                // Obtener textos desde el objeto global
                const pageUnavailableText = window.error404Texts.pageUnavailable;
                const pageAvailableInText = window.error404Texts.pageAvailableIn;
                const viewPageInText = window.error404Texts.viewPageIn;

                let linksHTML = availableTranslations.map(t => 
                    `<a href="${t.url}" class="underline text-cyan-600 hover:text-cyan-800 transition-colors">${viewPageInText} ${langNames[t.lang]}</a>`
                ).join(', ');

                suggestionContainer.innerHTML = `
                    <div class="mt-8 p-6 bg-cyan-50 border border-cyan-200 rounded-lg max-w-2xl mx-auto text-center">
                        <p class="text-lg text-slate-700">${pageUnavailableText}</p>
                        <p class="mt-2 text-md text-slate-600">${pageAvailableInText}: ${linksHTML}.</p>
                    </div>
                `;
                suggestionContainer.classList.remove('hidden');
            }
        }
    });
});

/**
 * Controlador del menú móvil
 * Este script maneja la funcionalidad del menú móvil, asegurando que
 * funcione correctamente incluso después de navegar entre páginas.
 */
 
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
});

/**
 * Inicializa la funcionalidad del menú móvil
 */
function initializeMobileMenu() {
    // Obtener los elementos necesarios
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const talkToExpert = document.getElementById('talkToExpert');
    
    // Verificar que los elementos existan antes de continuar
    if (!menuButton || !mobileMenu) {
        console.error('Elementos del menú móvil no encontrados');
        return;
    }
    
    // Eliminar listeners anteriores para evitar duplicados
    const newMenuButton = menuButton.cloneNode(true);
    menuButton.parentNode.replaceChild(newMenuButton, menuButton);
    
    // Agregar el listener para el botón hamburguesa
    newMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMobileMenu(newMenuButton, mobileMenu, talkToExpert);
    });
    
    // Manejar los clics dentro del menú móvil para cerrarlo cuando se navega
    mobileMenu.addEventListener('click', function(e) {
        // Si el clic fue en un enlace (<a>) o dentro de un enlace
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            // No cerrar el menú si el enlace tiene un submenú (si es necesario)
            if (e.target.classList.contains('has-submenu') || 
                (e.target.closest('a') && e.target.closest('a').classList.contains('has-submenu'))) {
                return;
            }
            
            // Cerrar el menú
            closeMobileMenu(newMenuButton, mobileMenu, talkToExpert);
        }
    });
    
    // Inicializar el estado del botón flotante
    updateFloatingButton(talkToExpert, mobileMenu);
    
    // Listener para actualizar el botón flotante al hacer scroll
    window.addEventListener('scroll', function() {
        updateFloatingButton(talkToExpert, mobileMenu);
    });
}

/**
 * Alterna el estado del menú móvil (abierto/cerrado)
 */
function toggleMobileMenu(menuButton, mobileMenu, talkToExpert) {
    const isMenuOpen = !mobileMenu.classList.contains('translate-x-full');
    
    if (isMenuOpen) {
        closeMobileMenu(menuButton, mobileMenu, talkToExpert);
    } else {
        openMobileMenu(menuButton, mobileMenu, talkToExpert);
    }
}

/**
 * Abre el menú móvil
 */
function openMobileMenu(menuButton, mobileMenu, talkToExpert) {
    mobileMenu.classList.remove('translate-x-full');
    menuButton.classList.add('active');
    
    // Ocultar el botón flotante cuando el menú está abierto
    if (talkToExpert) {
        talkToExpert.classList.add('hidden');
        talkToExpert.classList.remove('flex');
    }
    
    // Prevenir scroll en el body
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el menú móvil
 */
function closeMobileMenu(menuButton, mobileMenu, talkToExpert) {
    mobileMenu.classList.add('translate-x-full');
    menuButton.classList.remove('active');
    
    // Restaurar el scroll en el body
    document.body.style.overflow = '';
    
    // Actualizar visibilidad del botón flotante
    updateFloatingButton(talkToExpert, mobileMenu);
}

/**
 * Actualiza la visibilidad del botón flotante según el scroll
 */
function updateFloatingButton(talkToExpert, mobileMenu) {
    if (!talkToExpert) return;
    
    // No mostrar si el menú está abierto
    if (!mobileMenu.classList.contains('translate-x-full')) {
        talkToExpert.classList.add('hidden');
        talkToExpert.classList.remove('flex');
        return;
    }
    
    // Mostrar/ocultar según la posición del scroll
    if (window.scrollY > 300) {
        talkToExpert.classList.remove('hidden');
        talkToExpert.classList.add('flex');
    } else {
        talkToExpert.classList.add('hidden');
        talkToExpert.classList.remove('flex');
    }
}

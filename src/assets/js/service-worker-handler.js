// Manejo del Service Worker y actualizaciones
class ServiceWorkerHandler {
    constructor() {
        this.registration = null;
        this.updateNotificationShown = false;
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        if ('serviceWorker' in navigator) {
            try {
                // Registrar el service worker
                this.registration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('Service Worker registrado con éxito');

                // Escuchar mensajes del service worker
                navigator.serviceWorker.addEventListener('message', (event) => this.handleMessage(event));

                // Si ya hay un service worker activo
                if (this.registration.active) {
                    this.checkForUpdates();
                }
            } catch (error) {
                console.error('Error al registrar el Service Worker:', error);
            }
        }
    }

    async checkForUpdates() {
        try {
            // Forzar una actualización del service worker
            await this.registration.update();
        } catch (error) {
            console.error('Error al verificar actualizaciones:', error);
        }
    }

    handleMessage(event) {
        if (!event.data) return;

        switch (event.data.type) {
            case 'NEW_VERSION_AVAILABLE':
                this.showUpdateNotification();
                break;
            case 'SW_ACTIVATED':
                console.log('Nuevo Service Worker activado');
                break;
        }
    }

    showUpdateNotification() {
        // Evitar mostrar múltiples notificaciones
        if (this.updateNotificationShown) return;
        this.updateNotificationShown = true;

        // Crear el contenedor de la notificación
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-lg border border-cyan-100 p-4 z-50 flex items-center gap-4">
                <div class="flex-grow">
                    <p class="text-slate-800 font-medium">¡Nueva versión disponible!</p>
                    <p class="text-slate-600 text-sm">Hay una versión actualizada del sitio.</p>
                </div>
                <div class="flex gap-2">
                    <button class="reload-button px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">
                        Actualizar ahora
                    </button>
                    <button class="dismiss-button p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Agregar la notificación al DOM
        document.body.appendChild(notification);

        // Manejar el botón de actualizar
        notification.querySelector('.reload-button').addEventListener('click', () => {
            window.location.reload();
        });

        // Manejar el botón de descartar
        notification.querySelector('.dismiss-button').addEventListener('click', () => {
            notification.remove();
            this.updateNotificationShown = false;
        });
    }
}

// Inicializar el manejador
const swHandler = new ServiceWorkerHandler();

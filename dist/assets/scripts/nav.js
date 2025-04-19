document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const navGroups = document.querySelectorAll('.mobile-nav-group');

  // Toggle menú móvil
  function toggleMenu() {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  }

  mobileMenuToggle?.addEventListener('click', toggleMenu);
  mobileMenuClose?.addEventListener('click', toggleMenu);

  // Toggle submenús
  navGroups.forEach(group => {
    const toggle = group.querySelector('.mobile-nav-toggle');
    toggle?.addEventListener('click', () => {
      group.classList.toggle('active');
    });
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // Cerrar al hacer click en enlaces
  const links = mobileMenu.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
});

function initNav() {
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    });
  });
}

document.addEventListener('DOMContentLoaded', initNav);

// Contact form handler: Task 8

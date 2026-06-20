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
function handleContactForm(e) {
  e.preventDefault();
  var name    = document.getElementById('contact-name').value.trim();
  var email   = document.getElementById('contact-email').value.trim();
  var message = document.getElementById('contact-message').value.trim();

  var to      = '[email]';
  var subject = encodeURIComponent('Enquiry from ' + name);
  var body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);

  window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
}

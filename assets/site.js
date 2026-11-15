// The few things the pages do with JavaScript; every page reads the same without it.
// A copy button on each code block, the documentation menu on phones, and the table of contents marking the
// section on screen.

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  for (const pre of document.querySelectorAll('pre')) {
    const code = pre.querySelector('code');
    if (!code || !navigator.clipboard) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ''));
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => (button.textContent = 'Copy'), 1500);
    });
    pre.appendChild(button);
  }

  const sidebar = document.getElementById('sidebar');
  const toggle = sidebar && sidebar.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const links = [...document.querySelectorAll('.toc a')];
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  if (targets.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const mark = () => {
      const first = targets.find((t) => visible.has(t));
      if (!first) return;
      for (const a of links) a.classList.toggle('current', a.hash === '#' + first.id);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        mark();
      },
      { rootMargin: '-60px 0px -65% 0px' },
    );
    for (const t of targets) observer.observe(t);
  }
});

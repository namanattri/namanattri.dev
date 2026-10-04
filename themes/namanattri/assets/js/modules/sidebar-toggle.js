const STORAGE_KEY = 'sidebar';

/** Collapses and expands the desktop sidebar. The choice persists in localStorage. */
export function initSidebarToggle(buttons) {
  const root = document.documentElement;

  function render() {
    const collapsed = root.dataset.sidebar === 'collapsed';
    buttons.forEach((button) => button.setAttribute('aria-expanded', String(!collapsed)));
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const collapsed = root.dataset.sidebar !== 'collapsed';
      if (collapsed) {
        root.dataset.sidebar = 'collapsed';
      } else {
        delete root.dataset.sidebar;
      }
      render();
      try {
        if (collapsed) {
          localStorage.setItem(STORAGE_KEY, 'collapsed');
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // Storage can be unavailable (private mode); the choice still applies for this visit.
      }
    });
  });

  render();
}

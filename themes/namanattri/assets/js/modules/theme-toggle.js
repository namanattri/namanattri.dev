const STORAGE_KEY = 'theme';
const CYCLE = ['system', 'light', 'dark'];

function storedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}

/**
 * A single button that cycles system, light and dark. "System" removes the
 * override so the OS preference applies. The choice persists in localStorage.
 */
export function initThemeToggle(button) {
  const root = document.documentElement;
  let mode = storedTheme();

  function apply(next) {
    mode = next;
    if (mode === 'system') {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = mode;
    }
    const label = `${button.dataset.label}: ${button.dataset[`label${mode[0].toUpperCase()}${mode.slice(1)}`]}`;
    button.dataset.mode = mode;
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  apply(mode);

  button.addEventListener('click', () => {
    apply(CYCLE[(CYCLE.indexOf(mode) + 1) % CYCLE.length]);
    try {
      if (mode === 'system') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, mode);
      }
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
  });
}

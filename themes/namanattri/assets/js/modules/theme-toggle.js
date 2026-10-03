const STORAGE_KEY = 'theme';

function storedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Light, dark or system (no override). The choice persists in localStorage. */
export function initThemeToggle(toggle) {
  const root = document.documentElement;
  const buttons = toggle.querySelectorAll('[data-theme-choice]');

  function apply(choice) {
    if (choice === 'light' || choice === 'dark') {
      root.dataset.theme = choice;
    } else {
      choice = 'system';
      delete root.dataset.theme;
    }
    buttons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === choice)),
    );
    return choice;
  }

  apply(storedTheme());

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const choice = apply(button.dataset.themeChoice);
      try {
        if (choice === 'system') {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, choice);
        }
      } catch {
        // Storage can be unavailable (private mode); the choice still applies for this visit.
      }
    });
  });
}

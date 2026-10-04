/** Toggles line wrapping on a code block; unwrapped lines scroll sideways. */
export function initCodeWrap() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-code-wrap]');
    if (!button) {
      return;
    }
    const block = button.closest('[data-code-block]');
    const wrapped = block.classList.toggle('is-wrapped');
    button.setAttribute('aria-pressed', String(wrapped));
  });
}

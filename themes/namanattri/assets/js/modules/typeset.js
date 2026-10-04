/** Renders math in dynamically inserted content when MathJax is on the page. */
export function typeset(element) {
  const { MathJax } = window;
  if (MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([element]).catch(console.error);
  }
}

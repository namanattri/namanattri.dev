import { initInfiniteList } from './modules/infinite-list.js';
import { initPostStream } from './modules/post-stream.js';

const scroller = document.querySelector('[data-scroller]');

if (scroller) {
  document
    .querySelectorAll('[data-infinite-list]')
    .forEach((list) => initInfiniteList(list, scroller));
  document
    .querySelectorAll('[data-post-stream]')
    .forEach((stream) => initPostStream(stream, scroller));
}

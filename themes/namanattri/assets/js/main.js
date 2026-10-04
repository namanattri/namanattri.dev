import { initInfiniteList } from './modules/infinite-list.js';
import { initPostPager } from './modules/post-pager.js';
import { initTagFilter } from './modules/tag-filter.js';
import { initThemeToggle } from './modules/theme-toggle.js';
import { initSidebarToggle } from './modules/sidebar-toggle.js';
import { initCodeWrap } from './modules/code-wrap.js';
import { decorateTags, selectedTags } from './modules/tags.js';

document.querySelectorAll('[data-theme-toggle]').forEach(initThemeToggle);
initSidebarToggle(document.querySelectorAll('[data-sidebar-toggle]'));

initCodeWrap();
decorateTags(document);

// A filtered blog list is rendered from the post index; otherwise lists page through the server.
const filterBar = document.querySelector('[data-tag-filter]');
if (filterBar) {
  initTagFilter(filterBar);
}
if (!filterBar || selectedTags().length === 0) {
  document.querySelectorAll('[data-infinite-list]').forEach(initInfiniteList);
}
document.querySelectorAll('[data-post-pager]').forEach(initPostPager);

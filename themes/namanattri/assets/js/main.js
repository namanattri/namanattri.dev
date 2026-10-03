import { initInfiniteList } from './modules/infinite-list.js';
import { initPostStream } from './modules/post-stream.js';
import { initThemeToggle } from './modules/theme-toggle.js';
import { initSidebarToggle } from './modules/sidebar-toggle.js';
import { initExperienceClock } from './modules/experience-clock.js';

document.querySelectorAll('[data-theme-toggle]').forEach(initThemeToggle);
initSidebarToggle(document.querySelectorAll('[data-sidebar-toggle]'));
document.querySelectorAll('[data-experience-clock]').forEach(initExperienceClock);
document.querySelectorAll('[data-infinite-list]').forEach(initInfiniteList);
document.querySelectorAll('[data-post-stream]').forEach(initPostStream);

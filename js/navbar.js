// IMPORTS
import { showModal } from './modal.js';

// SELECTORS
const nav = document.getElementById('nav');

// LISTENERS
nav.addEventListener('click', () => {
  window.scrollTo(0, 0); // Scroll to the very top
  showModal();
});



import { initializeEvents } from './application/events_initializer.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeEvents();
    console.log("Music Player Application Initialized.");
});
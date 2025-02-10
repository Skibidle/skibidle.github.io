import { ComponentLoader } from './modules/componentLoader.js';
import { initSearch } from './modules/searchFilter.js';
import { setupUI } from './modules/uiController.js';

class App {
    static async initialize() {
        try {
            const loader = new ComponentLoader();
            await loader.loadComponents();
            
            setupUI();
            initSearch();
            
            console.log('Application initialized successfully');
        } catch (error) {
            console.error('Application initialization failed:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', App.initialize);

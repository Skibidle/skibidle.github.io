import { ComponentLoader } from './modules/componentLoader.js';
import { setupSearch } from './modules/search.js';
import { NotificationManager } from './modules/notifications.js';

class App {
    static async initialize() {
        const loader = new ComponentLoader();
        await loader.loadComponents();
        
        setupSearch();
        new NotificationManager();
    }
}

document.addEventListener('DOMContentLoaded', App.initialize);

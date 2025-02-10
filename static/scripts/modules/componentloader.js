export class ComponentLoader {
    constructor() {
        this.components = {
            header: '/components/header.html',
            cards: '/components/cards.html',
            footer: '/components/footer.html'
        };
    }

    async loadComponent(component) {
        const response = await fetch(component);
        if (!response.ok) throw new Error(`Failed to load ${component}`);
        return await response.text();
    }

    async loadComponents() {
        try {
            const loadTasks = Object.entries(this.components).map(
                async ([name, path]) => {
                    const html = await this.loadComponent(path);
                    document.getElementById(`${name}-container`).innerHTML = html;
                }
            );
            
            await Promise.all(loadTasks);
            this.injectArticles();
        } catch (error) {
            throw new Error(`Component loading error: ${error.message}`);
        }
    }

    injectArticles() {
        // Article data would be imported from /data/articles.js
        const articleGrid = document.getElementById('card-container');
        // Dynamic article injection logic here
    }
}

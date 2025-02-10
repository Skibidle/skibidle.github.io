export class ComponentLoader {
    async loadComponents() {
        const components = ['navbar', 'footer'];
        const loadPromises = components.map(name => this.loadComponent(name));
        await Promise.all(loadPromises);
    }

    async loadComponent(name) {
        const response = await fetch(`/components/${name}.html`);
        const html = await response.text();
        document.getElementById(`${name}-container`).innerHTML = html;
    }
}

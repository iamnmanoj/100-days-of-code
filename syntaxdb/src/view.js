import { createElement } from './utils';

export class ViewManager {

    #root;

    #$ = {
        container: createElement('div', { class: 'container' }),
        category: createElement('div', { 'class': 'category' }),
        concepts: document.createElement('div', { 'class': 'concepts' }),
        conceptDescription: document.createElement('div', { 'class': 'conceptDescription' })
    }

    #eventManager;

    constructor(eventManager, root) {
        this.#root = root;
        this.#eventManager = eventManager;
        this.#eventManager.on('uiboot', () => this.boot())
    }

    boot() {
        this.#initEvents();
        this.addAppToRoot();
    }

    #initEvents() {
        this.#eventManager.on('conceptChange', () => this.onConceptChange());
        this.#eventManager.on('categoryChange', () => this.toggleCategory());
        this.#eventManager.on('loadCategoriesCompleted', (data) => this.renderCategories(data))
    }

    addAppToRoot() {
        this.#$.category.textContent = 'Category';
        this.#$.conceptDescription.textContent = 'Descsription';
        this.#root.appendChild(this.#$.container)
        this.#$.container.appendChild(this.#$.category);
        this.#$.container.appendChild(this.#$.conceptDescription);
        this.#eventManager.dispatch('loadCategories');
    }

    renderCategories(categories) {
        for (let key in categories) {
            const category = categories[key];
            const elem = createElement('div', { id: category.id });
            elem.textContent = category.category_name;
            this.#$.category.appendChild(elem);
        }
    }

    renderConceptDescription() {

    }

    onConceptChange() {

    }

    expandCategory() {

    }

    collapseCategory() {

    }
}
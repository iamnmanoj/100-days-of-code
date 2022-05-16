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
    }

    addAppToRoot() {
        this.#root.appendChild(this.#$.container)
        this.renderAppInContainer();
    }

    renderAppInContainer() {
        this.renderCategory()
        this.renderConceptDescription();
    }

    renderCategory() {
        this.#$.category.textContent = 'Category';
        this.#$.container.appendChild(this.#$.category);
    }

    renderConceptDescription() {
        this.#$.conceptDescription.textContent = 'Descsription';
        this.#$.container.appendChild(this.#$.conceptDescription);
    }

    onConceptChange() {

    }

    expandCategory() {

    }

    collapseCategory() {

    }
}
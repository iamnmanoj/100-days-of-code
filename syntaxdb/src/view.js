import { createElement } from './utils';
import { Collapsible } from './custom-elements';

export class ViewManager {

    #root;

    #$ = {
        container: createElement('div', { class: 'root' }),
        category: createElement('div', { 'class': 'categoryContainer' }),
        concepts: document.createElement('div', { 'class': 'concepts' }),
        conceptDescription: document.createElement('div', { 'class': 'conceptDescription' })
    }

    #renderItems = undefined;

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
        this.#eventManager.on('loadCategoriesCompleted', (data) => this._onCategoriesLoadCompleted(data));
        this.#eventManager.on('loadConceptCompleted', (data) => this._onConceptsLoadCompleted(data))
    }

    addAppToRoot() {
        this.#$.category.textContent = 'Category';
        this.#$.conceptDescription.textContent = 'Descsription';
        this.#root.appendChild(this.#$.container)
        this.#$.container.appendChild(this.#$.category);
        this.#$.container.appendChild(this.#$.conceptDescription);
        this.#eventManager.dispatch('loadCategories');
    }

    _onCategoriesLoadCompleted(categories) {
        for (let key in categories) {
            this.renderCategory(categories[key]);
        }
    }

    renderCategory(category) {
        const props = {
            root: this.#$.category,
            onClick: this.getItems,
            onCollapse: () => { },
            label: category.category_name,
            id: category.id
        };
        new Collapsible(props);
        // this.#$.category.appendChild(elem);
    }

    _onConceptsLoadCompleted(concepts) {
        this.#renderItems(concepts);
        this.#renderItems = undefined;
    }

    attachClickEventToElement(eventHandler) {

    }

    getItems = (id, renderItems) => {
        this.#eventManager.dispatch('loadConcepts', id)
        this.#renderItems = renderItems;
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
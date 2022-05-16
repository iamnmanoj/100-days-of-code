import '../style.css'
import { ServiceLayer } from './service-client';
import { EventManager } from './event-manager';
import { ViewManager } from './view';


// const serviceClient = new ServiceLayer('https://syntaxdb.com/api/v1/languages');

// async function test() {
//     const response = await serviceClient.fetchCategoriesByLanguage('javascript');
//     console.log(response);

//     const response1 = await serviceClient.fetchConceptsByLanguageAndId('javascript', '33');
//     console.log(response1);
// }

// test();

export class App {
    #eventManager;
    #viewManager;
    #language = 'javascript';
    #serviceLayer;

    constructor(root) {
        this.#eventManager = new EventManager();
        this.#viewManager = new ViewManager(this.#eventManager, root);
        this.#serviceLayer = new ServiceLayer('https://syntaxdb.com/api/v1/languages');
    }

    boot() {
        this.#initEvents();
        this.#eventManager.dispatch('uiboot');
        this.#eventManager.dispatch('loadConcepts');
    }

    #initEvents() {
        this.#eventManager.on('languageChange', (language) => this.#onLanguageChange(language));
        this.#eventManager.on('conceptChange');
        this.#eventManager.on('loadCategories', () => this.getCategoriesByLanguage());
    }

    #onLanguageChange(language) {
        this.#language = language;
    }

    async getCategoriesByLanguage() {
        const categories = await this.#serviceLayer.fetchCategoriesByLanguage(this.#language);
        this.#eventManager.dispatch('loadCategoriesCompleted', categories)
    }

    getConceptsByLanguage() {

    }
}

new App(document.querySelector('#app')).boot();

import '../style.css'
import { ServiceLayer } from './service-client';
import { EventManager } from './event-manager';
import { ViewManager } from './view';


// const serviceClient = new ServiceLayer('https://syntaxdb.com/api/v1/languages');

// async function test() {
//     const response = await serviceClient.fetchCategoriesByLanguage('javascript');
//     console.log(response);

//     const response1 = await serviceClient.fetchConceptByLanguageAndId('javascript', '33');
//     await serviceClient.fetchConceptByLanguageAndId('javascript', '33')
//     await serviceClient.fetchConceptByLanguageAndId('javascript', '33')
//     await serviceClient.fetchConceptByLanguageAndId('javascript', '33')
//     await serviceClient.fetchConceptByLanguageAndId('javascript', '33')
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
    }

    #initEvents() {
        this.#eventManager.on('languageChange', (language) => this.#onLanguageChange(language));
        this.#eventManager.on('loadCategories', () => this.getCategoriesByLanguage());
        this.#eventManager.on('loadConcepts', (id) => this.getConceptsByLanguageAndId(id))
    }

    #onLanguageChange(language) {
        this.#language = language;
    }

    async getCategoriesByLanguage() {
        const categories = await this.#serviceLayer.fetchCategoriesByLanguage(this.#language);
        this.#eventManager.dispatch('loadCategoriesCompleted', categories)
    }

    async getConceptsByLanguageAndId(id) {
        const concepts = await this.#serviceLayer.fetchConceptsByLanguageAndId(this.#language, id);
        this.#eventManager.dispatch('loadConceptCompleted', concepts);
    }
}

new App(document.querySelector('#app')).boot();

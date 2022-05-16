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
    #language;
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
        this.#eventManager.on('loadCategory', this.getCategories);
        this.#eventManager.on('loadConcepts', this.getCategories);
    }

    getCategories() { }

    #onLanguageChange(language) {
        this.#language = language;
    }

    getCategoriesByLanguage() {
        const language = this.#language
    }

    getConceptsByLanguage() {

    }
}

new App(document.querySelector('#app')).boot();

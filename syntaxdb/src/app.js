import '../style.css'
import { ServiceLayer } from './service-client';
import { EventManager } from './event-manager';


const serviceClient = new ServiceLayer('https://syntaxdb.com/api/v1/languages');

async function test() {
    const response = await serviceClient.fetchCategoriesByLanguage('javascript');
    console.log(response);

    const response1 = await serviceClient.fetchConceptsByLanguageAndId('javascript', '33');
    console.log(response1);
}

test();

export class App {
    #containerElement = document.createElement('div');
    #eventManager;
    #language;

    constructor(eventManager) {
        this.#eventManager = new EventManager();
    }

    boot() {
        this.#initEvents()
    }

    #initEvents() {
        this.#eventManager.on('languageChange', (language) => this.#onLanguageChange(language));
        this.#eventManager.on('conceptChange');
    }

    #onLanguageChange(language) {
        this.#language = language;
    }
    
    #onConceptChange() { }

    renderContainer() {

    }

    getCategoriesByLanguage() {

    }

    getConceptsByLanguage() {

    }
}

new App().boot();



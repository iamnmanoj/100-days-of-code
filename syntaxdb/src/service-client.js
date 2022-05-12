export class ServiceLayer {
    #baseUrl;

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    #fetchData(route, requestOptions = { method: 'Get' }) {
        return fetch(`${this.#baseUrl}/${route}`, requestOptions);
    }

    async fetchCategoriesByLanguage(language, requestOptions) {
        const response = await this.#fetchData(`${language}/categories`, requestOptions);
        return response.json();
    }

    async fetchConceptsByLanguageAndId(language, id, requestOptions) {
        const response = await this.#fetchData(`${language}/categories/${id}/concepts`, requestOptions);
        return response.json();
    }
}
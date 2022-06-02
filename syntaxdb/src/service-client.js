export class ServiceLayer {
    #baseUrl;
    #conceptsCache = new Map();

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    #fetchData(route, requestOptions = { method: 'Get' }) {
        return fetch(`${this.#baseUrl}/${route}`, requestOptions);
    }

    async fetchCategoriesByLanguage(language, requestOptions) {
        let response = await this.#fetchData(`${language}/categories`, requestOptions);
        response = await response.json();
        return this.normaliseCategories(response);
    }

    async fetchConceptsByLanguageAndId(language, id, requestOptions) {
        const cachedData = this.#conceptsCache.get(id.toString());
        if (cachedData) {
            return cachedData;
        }
        let response = await this.#fetchData(`${language}/categories/${id}/concepts`, requestOptions);
        response = await response.json();
        response = this.normaliseConcepts(response);
        this.#conceptsCache.set(id.toString(), response);
        return response;
    }

    async fetchAllConceptsByLanguage(language) {
        const response = await this.#fetchData(`languages/${language}/concepts`, requestOptions);
        const concepts = response.json();
        return concepts ? this.normaliseConcepts(response.json()) : {};
    }

    normaliseConcepts(concepts) {
        return concepts.reduce((acc, concept) => {
            acc[concept.concept_name] = concept;
            return acc;
        }, {})
    }

    normaliseCategories(categories) {
        return categories.reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
        }, {})
    }
}
export class ServiceLayer {
    #baseUrl;

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
        const response = await this.#fetchData(`${language}/categories/${id}/concepts`, requestOptions);
        return response.json();
    }

    async fetchAllConceptsByLanguage(language) {
        const response = await this.#fetchData(`languages/${language}/concepts`, requestOptions);
        const concepts = response.json();
        return concepts ? this.normaliseConcepts(response.json()) : {};
    }

    normaliseConcepts(concepts) {
        concepts.forEach((concept) => {
            if (normalisedConcepts[concept.category_id] === undefined) {
                normalisedConcepts[concept.category_id] = concept
            } else {
                normalisedConcepts[concept.category_id].push(concept)
            }
        });

        return normalisedConcepts;
    }

    normaliseCategories(categories) {
        return categories.reduce((acc, category) => {
            acc[category.category_name] = category;
            return acc;
        }, {})
    }
}
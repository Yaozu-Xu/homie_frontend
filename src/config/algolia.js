import algoliasearch from 'algoliasearch/lite'
import {algoliaKey, algoliaPwd} from './env'

class Algolia {

    constructor(index) {
        this.client = algoliasearch(algoliaKey, algoliaPwd);
        this.index = this.client.initIndex(index)
    }

    search(query) {
        return this.index.search(query, {
            attributesToRetrieve: ['content', 'category', 'articleName'],
            hitsPerPage: 50,
        })
    }
}

export default Algolia
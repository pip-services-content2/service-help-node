const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { IHelpArticlesPersistence } from '../../src/persistence/IHelpArticlesPersistence';
import { HelpArticleV1 } from '../../src/data/version1/HelpArticleV1';

let HELP_ARTICLE1 = <HelpArticleV1>{
    id: '1',
    topic_id: '1',
    app: 'Test App 1',
    min_ver: 0,
    max_ver: 9999,
    status: 'new'
};
let HELP_ARTICLE2 = <HelpArticleV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    topic_id: '1',
    app: 'Test App 1',
    min_ver: 2,
    max_ver: 9999,
    status: 'new'
};
let HELP_ARTICLE3 = <HelpArticleV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    topic_id: '2',
    app: 'Test App 2',
    min_ver: 0,
    max_ver: 2,
    status: 'translating'
};

export class HelpArticlesPersistenceFixture {
    private _persistence: IHelpArticlesPersistence;
    
    constructor(persistence: IHelpArticlesPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async createArticles() {

        // Create one article
        let article = await this._persistence.create(null, HELP_ARTICLE1);

        assert.isObject(article);
        assert.equal(article.id, HELP_ARTICLE1.id);
        assert.equal(article.topic_id, HELP_ARTICLE1.topic_id);
        assert.equal(article.status, HELP_ARTICLE1.status);

        // Create another article
        article = await this._persistence.create(null, HELP_ARTICLE2);

        assert.isObject(article);
        assert.equal(article.id, HELP_ARTICLE2.id);
        assert.equal(article.topic_id, HELP_ARTICLE2.topic_id);
        assert.equal(article.status, HELP_ARTICLE2.status);

        // Create yet another article
        article = await this._persistence.create(null, HELP_ARTICLE3);

        assert.isObject(article);
        assert.equal(article.id, HELP_ARTICLE3.id);
        assert.equal(article.topic_id, HELP_ARTICLE3.topic_id);
        assert.equal(article.status, HELP_ARTICLE3.status);
    }
                
    public async testCrudOperations() {
        let article1: HelpArticleV1;

        // Create articles
        await this.createArticles();

        // Get all articles
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        article1 = page.data[0];

        // Update the article
        article1.app = 'New App 1';

        let article = await this._persistence.update(null, article1);

        assert.isObject(article);
        assert.equal(article.app, 'New App 1');
        assert.equal(article.id, article1.id);

        // Delete article
        await this._persistence.deleteById(null, article1.id);

        // Try to get delete article
        article = await this._persistence.getOneById(null, article1.id);

        assert.isNull(article || null);
    }

    public async testGetWithFilter() {
        // Create articles
        await this.createArticles();

        // Get articles filtered by tags
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                tags: ['tag1']
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get articles filtered by application
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                app: HELP_ARTICLE3.app
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Get articles filtered by topic id
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                topic_id: HELP_ARTICLE1.topic_id
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get articles filtered by version
        let help = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                version: 1
            }),
            new PagingParams()
        );

        assert.isObject(help);
        assert.lengthOf(help.data, 2);
    }

    public async testGetRandom() {
        // Create articles
        await this.createArticles();

        // Get random article filtered by tags
        let help = await this._persistence.getOneRandom(
            null,
            FilterParams.fromValue({
                tags: ['tag1'],
                status: 'new'
            })
        );

        assert.isObject(help);
        assert.equal(HELP_ARTICLE2.id, help.id);
    }
}

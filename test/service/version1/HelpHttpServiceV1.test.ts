const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { HelpTopicV1 } from '../../../src/data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../../../src/data/version1/HelpArticleV1';
import { HelpTopicsMemoryPersistence } from '../../../src/persistence/HelpTopicsMemoryPersistence';
import { HelpArticlesMemoryPersistence } from '../../../src/persistence/HelpArticlesMemoryPersistence';
import { HelpController } from '../../../src/logic/HelpController';
import { HelpHttpServiceV1 } from '../../../src/services/version1/HelpHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let HELP_TOPIC1 = <HelpTopicV1>{
    id: '1',
    app: 'Test App 1',
    title: new MultiString({ en: 'Main topic' })
};
let HELP_TOPIC2 = <HelpTopicV1>{
    id: '2',
    parent_id: '1',
    app: 'Test App 1',
    title: new MultiString({ en: 'Subtopic 1' }),
    popular: true
};

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

suite('HelpHttpServiceV1', ()=> {
    let service: HelpHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistenceTopics = new HelpTopicsMemoryPersistence();
        let persistenceArticles = new HelpArticlesMemoryPersistence();
        let controller = new HelpController();

        service = new HelpHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-help', 'persistence-topics', 'memory', 'default', '1.0'), persistenceTopics,
            new Descriptor('service-help', 'persistence-articles', 'memory', 'default', '1.0'), persistenceArticles,
            new Descriptor('service-help', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-help', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('Topics CRUD Operations', async () => {
        let topic1, topic2: HelpTopicV1;

        // Create one topic
        let topic = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/create_topic',
                {
                    topic: HELP_TOPIC1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(topic);
        assert.equal(topic.id, HELP_TOPIC1.id);
        assert.equal(topic.app, HELP_TOPIC1.app);

        topic1 = topic;

        // Create another topic
        topic = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/create_topic',
                {
                    topic: HELP_TOPIC2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(topic);
        assert.equal(topic.id, HELP_TOPIC2.id);
        assert.equal(topic.app, HELP_TOPIC2.app);

        topic2 = topic;

        // Get all topics
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/get_topics',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the topic
        topic1.app = 'New App 1';
        topic = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/update_topic',
                {
                    topic: topic1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(topic);
        assert.equal(topic.app, 'New App 1');
        assert.equal(topic.id, HELP_TOPIC1.id);

        topic1 = topic;

        // Delete topic
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/delete_topic_by_id',
                {
                    topic_id: topic1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Try to get delete topic
        topic = await await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/get_topic_by_id',
                {
                    topic_id: topic1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(topic || null);
    });

    test('Articles CRUD Operations', async () => {
        let article1, article2: HelpTopicV1;

        // Create one article
        let article = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/create_article',
                {
                    article: HELP_ARTICLE1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(article);
        assert.equal(article.id, HELP_ARTICLE1.id);
        assert.equal(article.app, HELP_TOPIC1.app);

        article1 = article;

        // Create another article
        article = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/create_article',
                {
                    article: HELP_ARTICLE2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(article);
        assert.equal(article.id, HELP_ARTICLE2.id);
        assert.equal(article.app, HELP_ARTICLE2.app);

        article2 = article;

        // Get all articles
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/get_articles',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the article
        article1.app = 'New App 1';

        article = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/update_article',
                {
                    article: article1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(article);
        assert.equal(article.app, 'New App 1');
        assert.equal(article.id, HELP_ARTICLE1.id);

        article1 = article;

        // Delete article
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/delete_article_by_id',
                {
                    article_id: article1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Try to get delete article
        article = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/help/get_article_by_id',
                {
                    article_id: article1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(article || null);
    });
});
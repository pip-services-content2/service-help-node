const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { HelpTopicV1 } from '../../src/data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../../src/data/version1/HelpArticleV1';
import { HelpLambdaFunction } from '../../src/container/HelpLambdaFunction';

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

suite('HelpLambdaFunction', ()=> {
    let lambda: HelpLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence-topics.descriptor', 'service-help:persistence-topics:memory:default:1.0',
            'persistence-articles.descriptor', 'service-help:persistence-articles:memory:default:1.0',
            'controller.descriptor', 'service-help:controller:default:default:1.0'
        );

        lambda = new HelpLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Topics CRUD Operations', async () => {
        let topic1, topic2: HelpTopicV1;

        // Create one topic
        let topic = await lambda.act(
            {
                role: 'help',
                cmd: 'create_topic',
                topic: HELP_TOPIC1
            }
        );

        assert.isObject(topic);
        assert.equal(topic.id, HELP_TOPIC1.id);
        assert.equal(topic.app, HELP_TOPIC1.app);

        topic1 = topic;

        // Create another topic
        topic = await lambda.act(
            {
                role: 'help',
                cmd: 'create_topic',
                topic: HELP_TOPIC2
            }
        );

        assert.isObject(topic);
        assert.equal(topic.id, HELP_TOPIC2.id);
        assert.equal(topic.app, HELP_TOPIC2.app);

        topic2 = topic;

        // Get all topics
        let page = await lambda.act(
            {
                role: 'help',
                cmd: 'get_topics'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the topic
        topic1.app = 'New App 1';

        topic = await lambda.act(
            {
                role: 'help',
                cmd: 'update_topic',
                topic: topic1
            }
        );

        assert.isObject(topic);
        assert.equal(topic.app, 'New App 1');
        assert.equal(topic.id, HELP_TOPIC1.id);

        topic1 = topic;
        
        // Delete topic
        await lambda.act(
            {
                role: 'help',
                cmd: 'delete_topic_by_id',
                topic_id: topic1.id
            }
        );

        // Try to get delete topic
        topic = await lambda.act(
            {
                role: 'help',
                cmd: 'get_topic_by_id',
                topic_id: topic1.id
            }
        );


        assert.isNull(topic || null);
    });

    test('Articles CRUD Operations', async () => {
        let article1, article2: HelpArticleV1;

        // Create one article
        let article = await lambda.act(
            {
                role: 'help',
                cmd: 'create_article',
                article: HELP_ARTICLE1
            }
        );

        assert.isObject(article);
        assert.equal(article.id, HELP_ARTICLE1.id);
        assert.equal(article.app, HELP_ARTICLE1.app);

        article1 = article;

        // Create another article
        article = await lambda.act(
            {
                role: 'help',
                cmd: 'create_article',
                article: HELP_ARTICLE2
            }
        );

        assert.isObject(article);
        assert.equal(article.id, HELP_ARTICLE2.id);
        assert.equal(article.app, HELP_ARTICLE2.app);

        article2 = article;

        // Get all articles
        let page = await lambda.act(
            {
                role: 'help',
                cmd: 'get_articles'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the article
        article1.app = 'New App 1';

        article = await lambda.act(
            {
                role: 'help',
                cmd: 'update_article',
                article: article1
            }
        );

        assert.isObject(article);
        assert.equal(article.app, 'New App 1');
        assert.equal(article.id, HELP_ARTICLE1.id);

        article1 = article;

        await lambda.act(
            {
                role: 'help',
                cmd: 'delete_article_by_id',
                article_id: article1.id
            }
        );

        // Try to get delete article
        article = await lambda.act(
            {
                role: 'help',
                cmd: 'get_article_by_id',
                article_id: article1.id
            }
        );

        assert.isNull(article || null);
    });

});
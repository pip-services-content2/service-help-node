const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { IHelpTopicsPersistence } from '../../src/persistence/IHelpTopicsPersistence';
import { HelpTopicV1 } from '../../src/data/version1/HelpTopicV1';

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
let HELP_TOPIC3 = <HelpTopicV1>{
    id: '3',
    parent_id: '1',
    app: 'Test App 2',
    title: new MultiString({ en: 'Subtopic 2' }),
    popular: false
};

export class HelpTopicsPersistenceFixture {
    private _persistence: IHelpTopicsPersistence;
        
    constructor(persistence: IHelpTopicsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async createTopics() {
        // Create one topic
        let topic = await this._persistence.create(null, HELP_TOPIC1);

        assert.isObject(topic);
        assert.equal(topic.id, HELP_TOPIC1.id);
        assert.equal(topic.app, HELP_TOPIC1.app);
        assert.equal(topic.title.get('en'), HELP_TOPIC1.title.get('en'));

        // Create another topic
        topic = await this._persistence.create(null, HELP_TOPIC2);

        assert.isObject(topic);
        assert.equal(topic.id, HELP_TOPIC2.id);
        assert.equal(topic.parent_id, HELP_TOPIC2.parent_id);
        assert.equal(topic.app, HELP_TOPIC2.app);
        assert.equal(topic.title.get('en'), HELP_TOPIC2.title.get('en'));

        // Create yet another topic
        topic = await this._persistence.create(null, HELP_TOPIC3);


        assert.isObject(topic);
        assert.equal(topic.id, HELP_TOPIC3.id);
        assert.equal(topic.parent_id, HELP_TOPIC3.parent_id);
        assert.equal(topic.app, HELP_TOPIC3.app);
        assert.equal(topic.title.get('en'), HELP_TOPIC3.title.get('en'));
    }
                
    public async testCrudOperations() {
        let topic1: HelpTopicV1;

        // Create items
        await this.createTopics();

        // Get all topics
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        topic1 = page.data[0];

        // Update the topic
        topic1.app = 'New App 1';

        let topic = await this._persistence.update(null, topic1);

        assert.isObject(topic);
        assert.equal(topic.app, 'New App 1');
        assert.equal(topic.id, topic1.id);

        // Delete topic
        await this._persistence.deleteById(null, topic1.id);

        // Try to get delete topic
        let help = await this._persistence.getOneById(null, topic1.id);

        assert.isNull(help || null);
    }

    public async testGetWithFilter() {
        // Create topics
        await this.createTopics();

        // Get topics filtered by app
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                app: 'Test App 1'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get topics filtered by parent id
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                parent_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get topics filtered by popular
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                popular: true
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 1);
    }
}

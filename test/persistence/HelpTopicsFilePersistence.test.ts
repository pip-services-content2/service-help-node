import { HelpTopicsFilePersistence } from '../../src/persistence/HelpTopicsFilePersistence';
import { HelpTopicsPersistenceFixture } from './HelpTopicsPersistenceFixture';

suite('HelpTopicsFilePersistence', ()=> {
    let persistence: HelpTopicsFilePersistence;
    let fixture: HelpTopicsPersistenceFixture;
    
    setup(async () => {
        persistence = new HelpTopicsFilePersistence('./data/help_topics.test.json');

        fixture = new HelpTopicsPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});
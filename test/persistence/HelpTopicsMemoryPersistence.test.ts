import { HelpTopicsMemoryPersistence } from '../../src/persistence/HelpTopicsMemoryPersistence';
import { HelpTopicsPersistenceFixture } from './HelpTopicsPersistenceFixture';

suite('HelpTopicsMemoryPersistence', ()=> {
    let persistence: HelpTopicsMemoryPersistence;
    let fixture: HelpTopicsPersistenceFixture;
    
    setup(async () => {
        persistence = new HelpTopicsMemoryPersistence();
        fixture = new HelpTopicsPersistenceFixture(persistence);
        
        await persistence.open(null);
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
import { HelpArticlesMemoryPersistence } from '../../src/persistence/HelpArticlesMemoryPersistence';
import { HelpArticlesPersistenceFixture } from './HelpArticlesPersistenceFixture';

suite('HelpArticleMemoryPersistence', ()=> {
    let persistence: HelpArticlesMemoryPersistence;
    let fixture: HelpArticlesPersistenceFixture;
    
    setup(async () => {
        persistence = new HelpArticlesMemoryPersistence();
        fixture = new HelpArticlesPersistenceFixture(persistence);
        
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

    test('Get Random', async () => {
        await fixture.testGetRandom();
    });

});
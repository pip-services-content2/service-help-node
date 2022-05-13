import { HelpArticlesFilePersistence } from '../../src/persistence/HelpArticlesFilePersistence';
import { HelpArticlesPersistenceFixture } from './HelpArticlesPersistenceFixture';

suite('HelpArticlesFilePersistence', ()=> {
    let persistence: HelpArticlesFilePersistence;
    let fixture: HelpArticlesPersistenceFixture;
    
    setup(async () => {
        persistence = new HelpArticlesFilePersistence('./data/help_articles.test.json');

        fixture = new HelpArticlesPersistenceFixture(persistence);
        
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

    test('Get Random', async () => {
        await fixture.testGetRandom();
    });

});
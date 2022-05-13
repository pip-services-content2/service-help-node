import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpArticlesPersistence } from './IHelpArticlesPersistence';
export declare class HelpArticlesMongoDbPersistence extends IdentifiableMongoDbPersistence<HelpArticleV1, string> implements IHelpArticlesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpArticleV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<HelpArticleV1>;
}

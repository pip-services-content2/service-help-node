import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
export interface IHelpArticlesPersistence extends IGetter<HelpArticleV1, string>, IWriter<HelpArticleV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpArticleV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<HelpArticleV1>;
    getOneById(correlationId: string, id: string): Promise<HelpArticleV1>;
    create(correlationId: string, item: HelpArticleV1): Promise<HelpArticleV1>;
    update(correlationId: string, item: HelpArticleV1): Promise<HelpArticleV1>;
    deleteById(correlationId: string, id: string): Promise<HelpArticleV1>;
}

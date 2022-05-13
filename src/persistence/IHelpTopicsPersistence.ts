import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';

export interface IHelpTopicsPersistence
    extends IGetter<HelpTopicV1, string>, IWriter<HelpTopicV1, string>  {
    
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpTopicV1>>;

    getOneById(correlationId: string, id: string): Promise<HelpTopicV1>;

    create(correlationId: string, item: HelpTopicV1): Promise<HelpTopicV1>;

    update(correlationId: string, item: HelpTopicV1): Promise<HelpTopicV1>;

    deleteById(correlationId: string, id: string): Promise<HelpTopicV1>;
}


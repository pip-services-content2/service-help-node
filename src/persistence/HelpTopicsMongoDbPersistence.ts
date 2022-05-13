import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { IHelpTopicsPersistence } from './IHelpTopicsPersistence';

export class HelpTopicsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<HelpTopicV1, string> 
    implements IHelpTopicsPersistence {

    constructor() {
        super('help_topics');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let parentId = filter.getAsNullableString('parent_id');
        if (parentId != null)
            criteria.push({ parent_id: parentId });

        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });

        let popular = filter.getAsNullableBoolean('popular');
        if (popular != null)
            criteria.push({ popular: popular });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpTopicV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, 'id', null);
    }

}

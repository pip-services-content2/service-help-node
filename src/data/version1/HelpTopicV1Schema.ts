import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class HelpTopicV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('parent_id', TypeCode.String);
        this.withRequiredProperty('app', TypeCode.String);
        this.withOptionalProperty('index', TypeCode.Integer);
        this.withRequiredProperty('title', TypeCode.Map);
        this.withOptionalProperty('popular', TypeCode.Boolean);

        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}

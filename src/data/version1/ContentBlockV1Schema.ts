import { ObjectSchema, ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

import { ChecklistItemV1Schema } from './ChecklistItemV1Schema';
import { DocumentV1Schema } from './DocumentV1Schema';

export class ContentBlockV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('type', TypeCode.String);
        this.withOptionalProperty('text', TypeCode.String);
        this.withOptionalProperty('checklist', new ArraySchema(new ChecklistItemV1Schema()));
        this.withOptionalProperty('loc_name', TypeCode.String);
        this.withOptionalProperty('lock_pos', null);
        this.withOptionalProperty('start', null); // TypeCode.DateTime);
        this.withOptionalProperty('end', null); // TypeCode.DateTime);
        this.withOptionalProperty('all_day', TypeCode.Boolean);
        this.withOptionalProperty('pic_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('docs', new ArraySchema(new DocumentV1Schema()));
        this.withOptionalProperty('embed_type', TypeCode.String);
        this.withOptionalProperty('embed_uri', TypeCode.String);
        this.withOptionalProperty('custom', null);
    }
}

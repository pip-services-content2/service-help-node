import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class DocumentV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('file_id', TypeCode.String);
        this.withRequiredProperty('file_name', TypeCode.String);
    }
}

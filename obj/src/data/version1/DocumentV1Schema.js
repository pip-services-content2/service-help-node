"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class DocumentV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('file_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('file_name', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.DocumentV1Schema = DocumentV1Schema;
//# sourceMappingURL=DocumentV1Schema.js.map
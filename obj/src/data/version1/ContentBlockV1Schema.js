"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentBlockV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const ChecklistItemV1Schema_1 = require("./ChecklistItemV1Schema");
const DocumentV1Schema_1 = require("./DocumentV1Schema");
class ContentBlockV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('type', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('text', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('checklist', new pip_services3_commons_nodex_1.ArraySchema(new ChecklistItemV1Schema_1.ChecklistItemV1Schema()));
        this.withOptionalProperty('loc_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('lock_pos', null);
        this.withOptionalProperty('start', null); // TypeCode.DateTime);
        this.withOptionalProperty('end', null); // TypeCode.DateTime);
        this.withOptionalProperty('all_day', pip_services3_commons_nodex_2.TypeCode.Boolean);
        this.withOptionalProperty('pic_ids', new pip_services3_commons_nodex_1.ArraySchema(pip_services3_commons_nodex_2.TypeCode.String));
        this.withOptionalProperty('docs', new pip_services3_commons_nodex_1.ArraySchema(new DocumentV1Schema_1.DocumentV1Schema()));
        this.withOptionalProperty('embed_type', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('embed_uri', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('custom', null);
    }
}
exports.ContentBlockV1Schema = ContentBlockV1Schema;
//# sourceMappingURL=ContentBlockV1Schema.js.map
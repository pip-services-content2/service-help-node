"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpTopicV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class HelpTopicV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('parent_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('app', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('index', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withRequiredProperty('title', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('popular', pip_services3_commons_nodex_2.TypeCode.Boolean);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.HelpTopicV1Schema = HelpTopicV1Schema;
//# sourceMappingURL=HelpTopicV1Schema.js.map
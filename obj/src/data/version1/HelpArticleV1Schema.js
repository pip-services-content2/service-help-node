"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpArticleV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const HelpArticleContentV1Schema_1 = require("./HelpArticleContentV1Schema");
class HelpArticleV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('topic_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('app', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('index', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('min_ver', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('max_ver', pip_services3_commons_nodex_2.TypeCode.Integer);
        /* Auto-generated fields */
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_2.TypeCode.DateTime); //TypeCode.DateTime);
        /* Search */
        this.withOptionalProperty('tags', new pip_services3_commons_nodex_3.ArraySchema(pip_services3_commons_nodex_2.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services3_commons_nodex_3.ArraySchema(pip_services3_commons_nodex_2.TypeCode.String));
        /* Content */
        this.withOptionalProperty('content', new pip_services3_commons_nodex_3.ArraySchema(new HelpArticleContentV1Schema_1.HelpArticleContentV1Schema()));
        /* Status */
        this.withOptionalProperty('status', pip_services3_commons_nodex_2.TypeCode.String);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.HelpArticleV1Schema = HelpArticleV1Schema;
//# sourceMappingURL=HelpArticleV1Schema.js.map
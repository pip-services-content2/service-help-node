"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpArticleContentV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const ContentBlockV1Schema_1 = require("./ContentBlockV1Schema");
class HelpArticleContentV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('language', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('title', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('content', new pip_services3_commons_nodex_3.ArraySchema(new ContentBlockV1Schema_1.ContentBlockV1Schema()));
    }
}
exports.HelpArticleContentV1Schema = HelpArticleContentV1Schema;
//# sourceMappingURL=HelpArticleContentV1Schema.js.map
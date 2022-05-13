"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItemV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class ChecklistItemV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('text', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('checked', pip_services3_commons_nodex_2.TypeCode.Boolean);
    }
}
exports.ChecklistItemV1Schema = ChecklistItemV1Schema;
//# sourceMappingURL=ChecklistItemV1Schema.js.map
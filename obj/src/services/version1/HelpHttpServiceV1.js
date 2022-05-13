"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class HelpHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/help');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-help', 'controller', 'default', '*', '1.0'));
    }
}
exports.HelpHttpServiceV1 = HelpHttpServiceV1;
//# sourceMappingURL=HelpHttpServiceV1.js.map
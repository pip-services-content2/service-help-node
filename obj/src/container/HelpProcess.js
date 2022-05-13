"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const HelpServiceFactory_1 = require("../build/HelpServiceFactory");
class HelpProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("help", "Context help microservice");
        this._factories.add(new HelpServiceFactory_1.HelpServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.HelpProcess = HelpProcess;
//# sourceMappingURL=HelpProcess.js.map
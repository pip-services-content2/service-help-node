"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.HelpLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const HelpServiceFactory_1 = require("../build/HelpServiceFactory");
class HelpLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("help", "Context help function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-help', 'controller', 'default', '*', '*'));
        this._factories.add(new HelpServiceFactory_1.HelpServiceFactory());
    }
}
exports.HelpLambdaFunction = HelpLambdaFunction;
exports.handler = new HelpLambdaFunction().getHandler();
//# sourceMappingURL=HelpLambdaFunction.js.map
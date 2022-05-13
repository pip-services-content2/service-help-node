import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';

import { HelpServiceFactory } from '../build/HelpServiceFactory';

export class HelpLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("help", "Context help function");
        
        this._dependencyResolver.put('controller', new Descriptor('service-help', 'controller', 'default', '*', '*'));
        
        this._factories.add(new HelpServiceFactory());
    }
}

export const handler = new HelpLambdaFunction().getHandler();
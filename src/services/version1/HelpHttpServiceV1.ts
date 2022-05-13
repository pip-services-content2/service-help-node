import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class HelpHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/help');
        this._dependencyResolver.put('controller', new Descriptor('service-help', 'controller', 'default', '*', '1.0'));
    }
}
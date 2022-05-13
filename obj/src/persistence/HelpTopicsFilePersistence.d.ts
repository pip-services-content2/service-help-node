import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { HelpTopicsMemoryPersistence } from './HelpTopicsMemoryPersistence';
import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
export declare class HelpTopicsFilePersistence extends HelpTopicsMemoryPersistence {
    protected _persister: JsonFilePersister<HelpTopicV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}

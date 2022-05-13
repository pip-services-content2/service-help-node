import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { HelpArticlesMemoryPersistence } from './HelpArticlesMemoryPersistence';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
export declare class HelpArticlesFilePersistence extends HelpArticlesMemoryPersistence {
    protected _persister: JsonFilePersister<HelpArticleV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}

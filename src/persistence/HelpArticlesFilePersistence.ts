import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { HelpArticlesMemoryPersistence } from './HelpArticlesMemoryPersistence';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';

export class HelpArticlesFilePersistence extends HelpArticlesMemoryPersistence {
	protected _persister: JsonFilePersister<HelpArticleV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<HelpArticleV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}
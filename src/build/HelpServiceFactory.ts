import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { HelpTopicsMongoDbPersistence } from '../persistence/HelpTopicsMongoDbPersistence';
import { HelpTopicsFilePersistence } from '../persistence/HelpTopicsFilePersistence';
import { HelpTopicsMemoryPersistence } from '../persistence/HelpTopicsMemoryPersistence';
import { HelpArticlesMongoDbPersistence } from '../persistence/HelpArticlesMongoDbPersistence';
import { HelpArticlesFilePersistence } from '../persistence/HelpArticlesFilePersistence';
import { HelpArticlesMemoryPersistence } from '../persistence/HelpArticlesMemoryPersistence';
import { HelpController } from '../logic/HelpController';
import { HelpHttpServiceV1 } from '../services/version1/HelpHttpServiceV1';

export class HelpServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-help", "factory", "default", "default", "1.0");
	public static TopicsMemoryPersistenceDescriptor = new Descriptor("service-help", "persistence-topics", "memory", "*", "1.0");
	public static TopicsFilePersistenceDescriptor = new Descriptor("service-help", "persistence-topics", "file", "*", "1.0");
	public static TopicsMongoDbPersistenceDescriptor = new Descriptor("service-help", "persistence-topics", "mongodb", "*", "1.0");
	public static ArticlesMemoryPersistenceDescriptor = new Descriptor("service-help", "persistence-articles", "memory", "*", "1.0");
	public static ArticlesFilePersistenceDescriptor = new Descriptor("service-help", "persistence-articles", "file", "*", "1.0");
	public static ArticlesMongoDbPersistenceDescriptor = new Descriptor("service-help", "persistence-articles", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-help", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-help", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(HelpServiceFactory.TopicsMemoryPersistenceDescriptor, HelpTopicsMemoryPersistence);
		this.registerAsType(HelpServiceFactory.TopicsFilePersistenceDescriptor, HelpTopicsFilePersistence);
		this.registerAsType(HelpServiceFactory.TopicsMongoDbPersistenceDescriptor, HelpTopicsMongoDbPersistence);
		this.registerAsType(HelpServiceFactory.ArticlesMemoryPersistenceDescriptor, HelpArticlesMemoryPersistence);
		this.registerAsType(HelpServiceFactory.ArticlesFilePersistenceDescriptor, HelpArticlesFilePersistence);
		this.registerAsType(HelpServiceFactory.ArticlesMongoDbPersistenceDescriptor, HelpArticlesMongoDbPersistence);
		this.registerAsType(HelpServiceFactory.ControllerDescriptor, HelpController);
		this.registerAsType(HelpServiceFactory.HttpServiceDescriptor, HelpHttpServiceV1);
	}
	
}

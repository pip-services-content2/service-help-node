import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
export declare class HelpServiceFactory extends Factory {
    static Descriptor: Descriptor;
    static TopicsMemoryPersistenceDescriptor: Descriptor;
    static TopicsFilePersistenceDescriptor: Descriptor;
    static TopicsMongoDbPersistenceDescriptor: Descriptor;
    static ArticlesMemoryPersistenceDescriptor: Descriptor;
    static ArticlesFilePersistenceDescriptor: Descriptor;
    static ArticlesMongoDbPersistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static HttpServiceDescriptor: Descriptor;
    constructor();
}

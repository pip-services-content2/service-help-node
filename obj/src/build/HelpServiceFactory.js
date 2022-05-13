"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const HelpTopicsMongoDbPersistence_1 = require("../persistence/HelpTopicsMongoDbPersistence");
const HelpTopicsFilePersistence_1 = require("../persistence/HelpTopicsFilePersistence");
const HelpTopicsMemoryPersistence_1 = require("../persistence/HelpTopicsMemoryPersistence");
const HelpArticlesMongoDbPersistence_1 = require("../persistence/HelpArticlesMongoDbPersistence");
const HelpArticlesFilePersistence_1 = require("../persistence/HelpArticlesFilePersistence");
const HelpArticlesMemoryPersistence_1 = require("../persistence/HelpArticlesMemoryPersistence");
const HelpController_1 = require("../logic/HelpController");
const HelpHttpServiceV1_1 = require("../services/version1/HelpHttpServiceV1");
class HelpServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(HelpServiceFactory.TopicsMemoryPersistenceDescriptor, HelpTopicsMemoryPersistence_1.HelpTopicsMemoryPersistence);
        this.registerAsType(HelpServiceFactory.TopicsFilePersistenceDescriptor, HelpTopicsFilePersistence_1.HelpTopicsFilePersistence);
        this.registerAsType(HelpServiceFactory.TopicsMongoDbPersistenceDescriptor, HelpTopicsMongoDbPersistence_1.HelpTopicsMongoDbPersistence);
        this.registerAsType(HelpServiceFactory.ArticlesMemoryPersistenceDescriptor, HelpArticlesMemoryPersistence_1.HelpArticlesMemoryPersistence);
        this.registerAsType(HelpServiceFactory.ArticlesFilePersistenceDescriptor, HelpArticlesFilePersistence_1.HelpArticlesFilePersistence);
        this.registerAsType(HelpServiceFactory.ArticlesMongoDbPersistenceDescriptor, HelpArticlesMongoDbPersistence_1.HelpArticlesMongoDbPersistence);
        this.registerAsType(HelpServiceFactory.ControllerDescriptor, HelpController_1.HelpController);
        this.registerAsType(HelpServiceFactory.HttpServiceDescriptor, HelpHttpServiceV1_1.HelpHttpServiceV1);
    }
}
exports.HelpServiceFactory = HelpServiceFactory;
HelpServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "factory", "default", "default", "1.0");
HelpServiceFactory.TopicsMemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "persistence-topics", "memory", "*", "1.0");
HelpServiceFactory.TopicsFilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "persistence-topics", "file", "*", "1.0");
HelpServiceFactory.TopicsMongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "persistence-topics", "mongodb", "*", "1.0");
HelpServiceFactory.ArticlesMemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "persistence-articles", "memory", "*", "1.0");
HelpServiceFactory.ArticlesFilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "persistence-articles", "file", "*", "1.0");
HelpServiceFactory.ArticlesMongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "persistence-articles", "mongodb", "*", "1.0");
HelpServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "controller", "default", "*", "1.0");
HelpServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-help", "service", "http", "*", "1.0");
//# sourceMappingURL=HelpServiceFactory.js.map
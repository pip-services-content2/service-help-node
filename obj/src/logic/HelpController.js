"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const HelpCommandSet_1 = require("./HelpCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class HelpController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(HelpController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistenceTopics = this._dependencyResolver.getOneRequired('persistence-topics');
        this._persistenceArticles = this._dependencyResolver.getOneRequired('persistence-articles');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new HelpCommandSet_1.HelpCommandSet(this);
        return this._commandSet;
    }
    getTopics(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceTopics.getPageByFilter(correlationId, filter, paging);
        });
    }
    getTopicById(correlationId, helpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceTopics.getOneById(correlationId, helpId);
        });
    }
    createTopic(correlationId, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceTopics.create(correlationId, topic);
        });
    }
    updateTopic(correlationId, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceTopics.update(correlationId, topic);
        });
    }
    deleteTopicById(correlationId, topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceTopics.deleteById(correlationId, topicId);
        });
    }
    getArticles(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceArticles.getPageByFilter(correlationId, filter, paging);
        });
    }
    getRandomArticle(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceArticles.getOneRandom(correlationId, filter);
        });
    }
    getArticleById(correlationId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistenceArticles.getOneById(correlationId, articleId);
        });
    }
    createArticle(correlationId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            let newArticle = null;
            article.create_time = new Date();
            article.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#content');
            newArticle = yield this._persistenceArticles.create(correlationId, article);
            yield this._attachmentsConnector.addAttachments(correlationId, newArticle);
            return newArticle;
        });
    }
    updateArticle(correlationId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldArticle = null;
            let newArticle = null;
            article.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#content');
            oldArticle = yield this._persistenceArticles.getOneById(correlationId, article.id);
            if (oldArticle == null) {
                throw new pip_services3_commons_nodex_4.NotFoundException(correlationId, 'ARTICLE_NOT_FOUND', 'Help article ' + article.id + ' was not found').withDetails('article_id', article.id);
            }
            newArticle = yield this._persistenceArticles.update(correlationId, article);
            yield this._attachmentsConnector.updateAttachments(correlationId, oldArticle, newArticle);
            return newArticle;
        });
    }
    deleteArticleById(correlationId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldArticle = null;
            oldArticle = yield this._persistenceArticles.deleteById(correlationId, articleId);
            yield this._attachmentsConnector.removeAttachments(correlationId, oldArticle);
            return oldArticle;
        });
    }
}
exports.HelpController = HelpController;
HelpController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence-topics', 'service-help:persistence-topics:*:*:1.0', 'dependencies.persistence-articles', 'service-help:persistence-articles:*:*:1.0', 'dependencies.attachments', 'service-attachments:client:*:*:1.0');
//# sourceMappingURL=HelpController.js.map
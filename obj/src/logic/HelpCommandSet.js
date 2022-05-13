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
exports.HelpCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const HelpTopicV1Schema_1 = require("../data/version1/HelpTopicV1Schema");
const HelpArticleV1Schema_1 = require("../data/version1/HelpArticleV1Schema");
class HelpCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetTopicsCommand());
        this.addCommand(this.makeGetTopicByIdCommand());
        this.addCommand(this.makeCreateTopicCommand());
        this.addCommand(this.makeUpdateTopicCommand());
        this.addCommand(this.makeDeleteTopicByIdCommand());
        this.addCommand(this.makeGetArticlesCommand());
        this.addCommand(this.makeGetRandomArticleCommand());
        this.addCommand(this.makeGetArticleByIdCommand());
        this.addCommand(this.makeCreateArticleCommand());
        this.addCommand(this.makeUpdateArticleCommand());
        this.addCommand(this.makeDeleteArticleByIdCommand());
    }
    makeGetTopicsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_topics", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getTopics(correlationId, filter, paging);
        }));
    }
    makeGetTopicByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_topic_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('topic_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let topicId = args.getAsNullableString("topic_id");
            return yield this._logic.getTopicById(correlationId, topicId);
        }));
    }
    makeCreateTopicCommand() {
        return new pip_services3_commons_nodex_2.Command("create_topic", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('topic', new HelpTopicV1Schema_1.HelpTopicV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let topic = args.get("topic");
            return yield this._logic.createTopic(correlationId, topic);
        }));
    }
    makeUpdateTopicCommand() {
        return new pip_services3_commons_nodex_2.Command("update_topic", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('topic', new HelpTopicV1Schema_1.HelpTopicV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let topic = args.get("topic");
            return yield this._logic.updateTopic(correlationId, topic);
        }));
    }
    makeDeleteTopicByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_topic_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('topic_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let topicId = args.getAsNullableString("topic_id");
            return yield this._logic.deleteTopicById(correlationId, topicId);
        }));
    }
    makeGetArticlesCommand() {
        return new pip_services3_commons_nodex_2.Command("get_articles", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getArticles(correlationId, filter, paging);
        }));
    }
    makeGetRandomArticleCommand() {
        return new pip_services3_commons_nodex_2.Command("get_random_article", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            return yield this._logic.getRandomArticle(correlationId, filter);
        }));
    }
    makeGetArticleByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_article_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('article_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let articleId = args.getAsNullableString("article_id");
            return yield this._logic.getArticleById(correlationId, articleId);
        }));
    }
    makeCreateArticleCommand() {
        return new pip_services3_commons_nodex_2.Command("create_article", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('article', new HelpArticleV1Schema_1.HelpArticleV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let article = args.get("article");
            return yield this._logic.createArticle(correlationId, article);
        }));
    }
    makeUpdateArticleCommand() {
        return new pip_services3_commons_nodex_2.Command("update_article", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('article', new HelpArticleV1Schema_1.HelpArticleV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let article = args.get("article");
            return yield this._logic.updateArticle(correlationId, article);
        }));
    }
    makeDeleteArticleByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_article_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('article_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let articleId = args.getAsNullableString("article_id");
            return yield this._logic.deleteArticleById(correlationId, articleId);
        }));
    }
}
exports.HelpCommandSet = HelpCommandSet;
//# sourceMappingURL=HelpCommandSet.js.map
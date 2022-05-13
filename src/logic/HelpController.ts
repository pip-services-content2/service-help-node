import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpTopicsPersistence } from '../persistence/IHelpTopicsPersistence';
import { IHelpArticlesPersistence } from '../persistence/IHelpArticlesPersistence';
import { IHelpController } from './IHelpController';
import { HelpCommandSet } from './HelpCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class HelpController implements IConfigurable, IReferenceable, ICommandable, IHelpController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence-topics', 'service-help:persistence-topics:*:*:1.0',
        'dependencies.persistence-articles', 'service-help:persistence-articles:*:*:1.0',
        'dependencies.attachments', 'service-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(HelpController._defaultConfig);
    private _persistenceTopics: IHelpTopicsPersistence;
    private _persistenceArticles: IHelpArticlesPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: HelpCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistenceTopics = this._dependencyResolver.getOneRequired<IHelpTopicsPersistence>('persistence-topics');
        this._persistenceArticles = this._dependencyResolver.getOneRequired<IHelpArticlesPersistence>('persistence-articles');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new HelpCommandSet(this);
        return this._commandSet;
    }

    public async getTopics(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpTopicV1>> {
        return await this._persistenceTopics.getPageByFilter(correlationId, filter, paging);
    }

    public async getTopicById(correlationId: string, helpId: string): Promise<HelpTopicV1> {
        return await this._persistenceTopics.getOneById(correlationId, helpId);
    }

    public async createTopic(correlationId: string, topic: HelpTopicV1): Promise<HelpTopicV1> {
        return await this._persistenceTopics.create(correlationId, topic);
    }

    public async updateTopic(correlationId: string, topic: HelpTopicV1): Promise<HelpTopicV1> {
        return await this._persistenceTopics.update(correlationId, topic);
    }

    public async deleteTopicById(correlationId: string, topicId: string): Promise<HelpTopicV1> {
        return await this._persistenceTopics.deleteById(correlationId, topicId);
    }

    public async getArticles(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpArticleV1>> {
        return await this._persistenceArticles.getPageByFilter(correlationId, filter, paging);
    }

    public async getRandomArticle(correlationId: string, filter: FilterParams): Promise<HelpArticleV1> {
        return await this._persistenceArticles.getOneRandom(correlationId, filter);
    }

    public async getArticleById(correlationId: string, articleId: string): Promise<HelpArticleV1> {
        return await this._persistenceArticles.getOneById(correlationId, articleId);
    }

    public async createArticle(correlationId: string, article: HelpArticleV1): Promise<HelpArticleV1> {
        let newArticle: HelpArticleV1 = null;

        article.create_time = new Date();
        article.all_tags = TagsProcessor.extractHashTags(
            '#content'
        );

        newArticle = await this._persistenceArticles.create(correlationId, article);

        await this._attachmentsConnector.addAttachments(correlationId, newArticle);

        return newArticle;
    }

    public async updateArticle(correlationId: string, article: HelpArticleV1): Promise<HelpArticleV1> {
        let oldArticle: HelpArticleV1 = null;
        let newArticle: HelpArticleV1 = null;
        
        article.all_tags = TagsProcessor.extractHashTags(
            '#content'
        );

        oldArticle = await this._persistenceArticles.getOneById(correlationId, article.id);
        if (oldArticle == null) {
            throw new NotFoundException(
                correlationId,
                'ARTICLE_NOT_FOUND',
                'Help article ' + article.id + ' was not found'
            ).withDetails('article_id', article.id);
        }

        newArticle = await this._persistenceArticles.update(correlationId, article);

        await this._attachmentsConnector.updateAttachments(correlationId, oldArticle, newArticle);

        return newArticle;
    }

    public async deleteArticleById(correlationId: string, articleId: string): Promise<HelpArticleV1> {
        let oldArticle: HelpArticleV1 = null;

        oldArticle = await this._persistenceArticles.deleteById(correlationId, articleId);

        await this._attachmentsConnector.removeAttachments(correlationId, oldArticle);
        
        return oldArticle;
    }

}

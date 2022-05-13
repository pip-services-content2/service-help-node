import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';

export interface IHelpController {
    getTopics(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpTopicV1>>;

    getTopicById(correlationId: string, topicId: string): Promise<HelpTopicV1>;

    createTopic(correlationId: string, topic: HelpTopicV1): Promise<HelpTopicV1>;

    updateTopic(correlationId: string, topic: HelpTopicV1): Promise<HelpTopicV1>;

    deleteTopicById(correlationId: string, topicId: string): Promise<HelpTopicV1>;

    getArticles(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpArticleV1>>;

    getRandomArticle(correlationId: string, filter: FilterParams): Promise<HelpArticleV1>;

    getArticleById(correlationId: string, articleId: string): Promise<HelpArticleV1>;

    createArticle(correlationId: string, article: HelpArticleV1): Promise<HelpArticleV1>;

    updateArticle(correlationId: string, article: HelpArticleV1): Promise<HelpArticleV1>;

    deleteArticleById(correlationId: string, articleId: string): Promise<HelpArticleV1>;
}

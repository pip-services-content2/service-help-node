import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { HelpTopicV1Schema } from '../data/version1/HelpTopicV1Schema';
import { HelpArticleV1Schema } from '../data/version1/HelpArticleV1Schema';
import { IHelpController } from './IHelpController';

export class HelpCommandSet extends CommandSet {
    private _logic: IHelpController;

	constructor(logic: IHelpController) {
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

	private makeGetTopicsCommand(): ICommand {
		return new Command(
			"get_topics",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getTopics(correlationId, filter, paging);
			}
		);
	}

	private makeGetTopicByIdCommand(): ICommand {
		return new Command(
			"get_topic_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('topic_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let topicId = args.getAsNullableString("topic_id");
				return await this._logic.getTopicById(correlationId, topicId);
			}
		);
	}

	private makeCreateTopicCommand(): ICommand {
		return new Command(
			"create_topic",
			new ObjectSchema(true)
				.withRequiredProperty('topic', new HelpTopicV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let topic = args.get("topic");
				return await this._logic.createTopic(correlationId, topic);
			}
		);
	}

	private makeUpdateTopicCommand(): ICommand {
		return new Command(
			"update_topic",
			new ObjectSchema(true)
				.withRequiredProperty('topic', new HelpTopicV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let topic = args.get("topic");
				return await this._logic.updateTopic(correlationId, topic);
			}
		);
	}

	private makeDeleteTopicByIdCommand(): ICommand {
		return new Command(
			"delete_topic_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('topic_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let topicId = args.getAsNullableString("topic_id");
				return await this._logic.deleteTopicById(correlationId, topicId);
			}
		);
	}

	private makeGetArticlesCommand(): ICommand {
		return new Command(
			"get_articles",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getArticles(correlationId, filter, paging);
			}
		);
	}

	private makeGetRandomArticleCommand(): ICommand {
		return new Command(
			"get_random_article",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				return await this._logic.getRandomArticle(correlationId, filter);
			}
		);
	}

	private makeGetArticleByIdCommand(): ICommand {
		return new Command(
			"get_article_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('article_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let articleId = args.getAsNullableString("article_id");
				return await this._logic.getArticleById(correlationId, articleId);
			}
		);
	}

	private makeCreateArticleCommand(): ICommand {
		return new Command(
			"create_article",
			new ObjectSchema(true)
				.withRequiredProperty('article', new HelpArticleV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let article = args.get("article");
				return await this._logic.createArticle(correlationId, article);
			}
		);
	}

	private makeUpdateArticleCommand(): ICommand {
		return new Command(
			"update_article",
			new ObjectSchema(true)
				.withRequiredProperty('article', new HelpArticleV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let article = args.get("article");
				return await this._logic.updateArticle(correlationId, article);
			}
		);
	}

	private makeDeleteArticleByIdCommand(): ICommand {
		return new Command(
			"delete_article_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('article_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let articleId = args.getAsNullableString("article_id");
				return await this._logic.deleteArticleById(correlationId, articleId);
			}
		);
	}	
}
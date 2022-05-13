import { CommandSet } from 'pip-services3-commons-nodex';
import { IHelpController } from './IHelpController';
export declare class HelpCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IHelpController);
    private makeGetTopicsCommand;
    private makeGetTopicByIdCommand;
    private makeCreateTopicCommand;
    private makeUpdateTopicCommand;
    private makeDeleteTopicByIdCommand;
    private makeGetArticlesCommand;
    private makeGetRandomArticleCommand;
    private makeGetArticleByIdCommand;
    private makeCreateArticleCommand;
    private makeUpdateArticleCommand;
    private makeDeleteArticleByIdCommand;
}

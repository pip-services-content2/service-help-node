import { IAttachmentsClientV1 } from 'client-attachments-node';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, article: HelpArticleV1): Promise<void>;
    updateAttachments(correlationId: string, oldArticle: HelpArticleV1, newArticle: HelpArticleV1): Promise<void>;
    removeAttachments(correlationId: string, article: HelpArticleV1): Promise<void>;
}

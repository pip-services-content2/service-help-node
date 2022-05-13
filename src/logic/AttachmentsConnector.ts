import { ReferenceV1 } from 'client-attachments-node';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { HelpArticleV1 } from '../data/version1/HelpArticleV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(article: HelpArticleV1): string[] {
        let ids: string[] = [];

        article.content = article.content || [];
        for (let content of article.content) {
            content.content = content.content || [];
            for (let block of content.content) {
                block.pic_ids = block.pic_ids || [];
                block.docs = block.docs || [];

                ids.push(...block.pic_ids);
                for (let doc of block.docs) {
                    ids.push(doc.file_id);
                }
            }
        }

        return ids;
    }

    public async addAttachments(correlationId: string, article: HelpArticleV1): Promise<void> {
        
        if (this._attachmentsClient == null || article == null)
            return;

        let ids = this.extractAttachmentIds(article);
        let reference = new ReferenceV1(article.id, 'help-article');
        await this._attachmentsClient.addAttachments(correlationId, reference, ids)
    }

    public async updateAttachments(correlationId: string, oldArticle: HelpArticleV1, newArticle: HelpArticleV1): Promise<void> {
        
        if (this._attachmentsClient == null || oldArticle == null || newArticle == null)
            return;
        

        let oldIds = this.extractAttachmentIds(oldArticle);
        let newIds = this.extractAttachmentIds(newArticle);
        let reference = new ReferenceV1(newArticle.id, 'help-article');
        await this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds);
    }

    public async removeAttachments(correlationId: string, article: HelpArticleV1): Promise<void> {
        
        if (this._attachmentsClient == null || article == null)
            return;
        
        let ids = this.extractAttachmentIds(article);
        let reference = new ReferenceV1(article.id, 'help-article');
        await this._attachmentsClient.removeAttachments(correlationId, reference, ids)
    }

}
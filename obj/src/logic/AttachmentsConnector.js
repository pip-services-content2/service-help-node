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
exports.AttachmentsConnector = void 0;
const client_attachments_node_1 = require("client-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(article) {
        let ids = [];
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
    addAttachments(correlationId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || article == null)
                return;
            let ids = this.extractAttachmentIds(article);
            let reference = new client_attachments_node_1.ReferenceV1(article.id, 'help-article');
            yield this._attachmentsClient.addAttachments(correlationId, reference, ids);
        });
    }
    updateAttachments(correlationId, oldArticle, newArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || oldArticle == null || newArticle == null)
                return;
            let oldIds = this.extractAttachmentIds(oldArticle);
            let newIds = this.extractAttachmentIds(newArticle);
            let reference = new client_attachments_node_1.ReferenceV1(newArticle.id, 'help-article');
            yield this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds);
        });
    }
    removeAttachments(correlationId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || article == null)
                return;
            let ids = this.extractAttachmentIds(article);
            let reference = new client_attachments_node_1.ReferenceV1(article.id, 'help-article');
            yield this._attachmentsClient.removeAttachments(correlationId, reference, ids);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map
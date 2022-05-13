import { ChecklistItemV1 } from './ChecklistItemV1';
import { DocumentV1 } from './DocumentV1';
export declare class ContentBlockV1 {
    type: string;
    text?: string;
    checklist?: ChecklistItemV1[];
    loc_name?: string;
    loc_pos?: any;
    start?: Date;
    end?: Date;
    all_day?: boolean;
    pic_ids?: string[];
    docs?: DocumentV1[];
    embed_type: string;
    embed_uri: string;
    custom?: any;
}

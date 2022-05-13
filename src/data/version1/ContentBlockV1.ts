import { ChecklistItemV1 } from './ChecklistItemV1';
import { DocumentV1 } from './DocumentV1';

export class ContentBlockV1 {
    public type: string;
    public text?: string;
    public checklist?: ChecklistItemV1[];
    public loc_name?: string;
    public loc_pos?: any; // GeoJSON
    public start?: Date;
    public end?: Date;
    public all_day?: boolean;
    public pic_ids?: string[];
    public docs?: DocumentV1[];
    public embed_type: string;
    public embed_uri: string;
    public custom?: any;
}
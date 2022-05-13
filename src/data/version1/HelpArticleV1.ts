import { IStringIdentifiable } from 'pip-services3-commons-nodex';

import { HelpArticleContentV1 } from './HelpArticleContentV1';

export class HelpArticleV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public topic_id?: string;
    public app: string;
    public index?: number;
    public min_ver?: number;
    public max_ver?: number;

    /* Auto-generated fields */
    public create_time?: Date;

    /* Content */
    public content: HelpArticleContentV1[];
    
    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;
   
    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { HelpArticleContentV1 } from './HelpArticleContentV1';
export declare class HelpArticleV1 implements IStringIdentifiable {
    id: string;
    topic_id?: string;
    app: string;
    index?: number;
    min_ver?: number;
    max_ver?: number;
    create_time?: Date;
    content: HelpArticleContentV1[];
    tags?: string[];
    all_tags?: string[];
    status?: string;
    custom_hdr?: any;
    custom_dat?: any;
}

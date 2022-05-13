import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
export declare class HelpTopicV1 implements IStringIdentifiable {
    id: string;
    parent_id?: string;
    app: string;
    index?: number;
    title: MultiString;
    popular?: boolean;
    custom_hdr?: any;
    custom_dat?: any;
}

import { IOption } from './interface';
declare class cybereye {
    private context;
    private type;
    private uploadURL;
    private storageInstance;
    private timer;
    /**
     * @param uploadURL 上传文件地址
     * @param context 小程序上下文
     */
    constructor(option: IOption, context: any, type: 'web' | 'mini');
    private syncLog;
    /**
     * API 记录日志·
     * @param event 日志类型
     * @param content 日志内容
     */
    markALog(event: string, content: string): void;
}
export default cybereye;

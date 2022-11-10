import { ILog } from './interface';
declare class storage {
    private storageKey;
    private singleToneLogArray;
    private unitCount;
    private maxCount;
    private context;
    constructor(unitCount?: number, maxCount?: number, context?: any);
    add(item: ILog): void;
    delete(index: number): void;
    query(): ILog[];
}
export default storage;

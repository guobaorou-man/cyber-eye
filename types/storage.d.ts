import { ILog } from './interface';
declare class storage {
    private storageKey;
    private singleToneLogArray;
    private unitCount;
    private maxCount;
    private context;
    private type;
    constructor(unitCount: number | undefined, maxCount: number | undefined, context: any, type: string);
    add(item: ILog): void;
    delete(index: number): void;
    query(): ILog[];
}
export default storage;

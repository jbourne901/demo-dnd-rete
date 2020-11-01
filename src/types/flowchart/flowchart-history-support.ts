import {Action as ReteHistoryAction} from "../../rete/pluginsjs/history-plugin";

export type IFlowchartHistorySupportHandler<T> = (v: T) => void;
console.log(`hisotyrplygin action=`)
console.dir(ReteHistoryAction)
export class FlowchartHistorySupport<T> extends ReteHistoryAction {
    private prev: T;
    private next: T;
    private set: IFlowchartHistorySupportHandler<T>;
    constructor(prev: T, next: T, set: IFlowchartHistorySupportHandler<T>) {
        super();
        this.prev = prev;
        this.next = next;
        this.set = set;
    }
    undo() {
        this.set(this.prev);
    }
    redo() {
        this.set(this.next);
    }
};

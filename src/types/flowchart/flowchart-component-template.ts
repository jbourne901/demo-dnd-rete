import {Socket as ReteSocket, Component as ReteComponent} from "rete";

export abstract class FlowchartComponentTemplate extends ReteComponent {
    protected socketType: ReteSocket;
    constructor(name: string, socketType: ReteSocket) {
        super(name);
        this.socketType=socketType;
    }
};

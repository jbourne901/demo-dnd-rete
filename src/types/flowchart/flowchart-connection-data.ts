import {Connection as ReteConnection} from "rete";

export interface IFlowchartConnectionData {
    d: string;
    connection: ReteConnection;
    points: number[];
}
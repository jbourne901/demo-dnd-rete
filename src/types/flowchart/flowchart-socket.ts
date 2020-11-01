import {Input as ReteInput, Output as ReteOutput} from "rete/types";

export type IFlowchartSocketType = "input"|"output";
export type IBindSocket = (el: HTMLElement, type: IFlowchartSocketType, io: ReteInput|ReteOutput) => void;

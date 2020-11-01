import {Control as ReteControl} from "rete/types";

export interface IFlowchartControl {
    name: string;
}

const defaultControls = new Map<string, IFlowchartControl>();

export {defaultControls};

export type IBindControl =  (el: HTMLElement, control: ReteControl) => void;


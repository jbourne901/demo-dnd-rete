import {IFlowchartInput, defaultInputs} from "./flowchart-input";
import {IFlowchartOutput, baseOutputs} from "./flowchart-output";
import { IFlowchartControl, defaultControls } from "./flowchart-control";

export interface IFlowchartNode {
    name: string;
    selected: boolean;
    title: string;
    inputs: Map<string, IFlowchartInput>;
    outputs: Map<string, IFlowchartOutput>;
    controls: Map<string, IFlowchartControl>;
}

export const testNode: IFlowchartNode = {
    name: "DTMFEntry",
    selected: false,
    title: "DTMFEntry",
    inputs: {...defaultInputs},
    outputs: {...baseOutputs},
    controls: {...defaultControls}
}
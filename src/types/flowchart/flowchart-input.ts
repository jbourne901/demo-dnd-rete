export interface IFlowchartInput {
    name: string;
}

const defaultInputs = new Map<string, IFlowchartInput>();
defaultInputs.set("input", {
                            name: "input"
                           }
);

export {defaultInputs};


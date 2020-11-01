export interface IFlowchartOutput {
    name: string;
    title: string;
    tooltip: string;
}

const baseOutputs = new Map<string, IFlowchartOutput>();
baseOutputs.set("success", {
                                name: "success",
                                title: "Next", 
                                tooltip: "Next",
                            }
);

baseOutputs.set("failure", {
    name: "failure",
    title: "Fail", 
    tooltip: "Fail",
}
);

export {baseOutputs};
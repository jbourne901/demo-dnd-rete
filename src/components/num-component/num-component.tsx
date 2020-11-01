import React from "react";
import Rete, {Socket as ReteSocket, Node as ReteNode} from "rete";
import {NodeData as ReteNodeData, WorkerInputs, WorkerOutputs} from "rete/types/core/data";
import NumControl from "../num-control";
import { FlowchartComponentTemplate } from "../../types/flowchart/flowchart-component-template";
//import FlowchartNode from "../flowchart/flowchart-node";

class NumComponent extends FlowchartComponentTemplate {
    constructor(socketType: ReteSocket) {
      super("Number1", socketType);
      //(this.data as any).render="react";
      //(this.data as any).component=FlowchartNode;
      //(this.data as any).props = {};
    }
  
    public async builder(node: ReteNode) {
      //false = dont allow multiple connections from the same output
      const out1 = new Rete.Output("num", "Number", this.socketType, false);
      const ctrl = new NumControl(this.editor, "num", node);  
      //return
      node.addControl(ctrl).addOutput(out1);
    }
  
    public worker(node: ReteNodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
      outputs["num"] = node.data.num;
    }
}

export default NumComponent;
  
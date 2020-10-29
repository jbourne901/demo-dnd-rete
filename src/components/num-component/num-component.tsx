import Rete, {Socket as ReteSocket, Node as ReteNode} from "rete";
import {NodeData as ReteNodeData, WorkerInputs, WorkerOutputs} from "rete/types/core/data";
import NumControl from "../num-control";

class NumComponent extends Rete.Component {
    private numSocket: ReteSocket;
    constructor(numSocket: ReteSocket) {
      super("Number");
      this.numSocket = numSocket;
    }
  
    public async builder(node: ReteNode) {
      const out1 = new Rete.Output("num", "Number", this.numSocket);
      const ctrl = new NumControl(this.editor, "num", node);  
      //return
      node.addControl(ctrl).addOutput(out1);
    }
  
    public worker(node: ReteNodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
      outputs["num"] = node.data.num;
    }
}

export default NumComponent;
  
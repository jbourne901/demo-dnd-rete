import Rete, {Socket as ReteSocket, Node as ReteNode, Component as ReteComponent} from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import NumControl from "../num-control";
import { FlowchartComponentTemplate } from "../../types/flowchart/flowchart-component-template";

class AddComponent extends FlowchartComponentTemplate {
  constructor(socketType: ReteSocket) {
    super("Add", socketType);
    //TODO review
    //(this.data as any).component = MyNode;
  }

  public async builder(node: ReteNode) {
    //true = allow multiple connections from to the same input
    const inp1 = new Rete.Input("num1", "Number", this.socketType, true);
    const inp2 = new Rete.Input("num2", "Number2", this.socketType, true);
    //false = dont' allow multiple connections from the same output
    const out = new Rete.Output("num", "Number", this.socketType, false);

    inp1.addControl(new NumControl(this.editor, "num1", node));
    inp2.addControl(new NumControl(this.editor, "num2", node));

    //return 
    node
      .addInput(inp1)
      .addInput(inp2)
      .addControl(new NumControl(this.editor, "preview", node, true))
      .addOutput(out);
  }

  public worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    //TODO review
    const n1 = (inputs["num1"].length ? inputs["num1"][0] : node.data.num1) as number;
    const n2 = (inputs["num2"].length ? inputs["num2"][0] : node.data.num2) as number;
    const sum = n1 + n2;

    if(this.editor) {
      const nn = this.editor.nodes.find((n) => n.id === node.id);
      const preview = nn?.controls?.get("preview");
      if(preview && preview instanceof NumControl) {
        //TODO review
        (preview as NumControl).setValue(sum);    
      }
    }
    outputs["num"] = sum;
  }
}

export default AddComponent;
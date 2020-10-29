import Rete, {Socket as ReteSocket, Node as ReteNode, Component as ReteComponent} from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import NumControl from "../num-control";

class AddComponent extends ReteComponent {
  private numSocket: ReteSocket;
  constructor(numSocket: ReteSocket) {
    super("Add");
    //TODO review
    //(this.data as any).component = MyNode;
    this.numSocket = numSocket;
  }

  public async builder(node: ReteNode) {
    const inp1 = new Rete.Input("num1", "Number", this.numSocket);
    const inp2 = new Rete.Input("num2", "Number2", this.numSocket);
    const out = new Rete.Output("num", "Number", this.numSocket);

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
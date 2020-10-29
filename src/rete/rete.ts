import Rete, {Socket as ReteSocket} from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import {ReactRenderPlugin} from "./pluginsjs/react-render-plugin";
import {AreaPlugin} from "./pluginsjs/area-plugin";

import NumComponent from "../components/num-component";
import AddComponent from "../components/add-component";



export async function createEditor(container: HTMLElement|null, numSocket: ReteSocket|null) {
  if(!container || !numSocket) {
    return;
  }
  const components = [new NumComponent(numSocket), new AddComponent(numSocket)];

  const editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);

  const engine = new Rete.Engine("demo@0.1.0");

  components.forEach( (c) => {
    editor.register(c);
    engine.register(c);
  });

  const n1 = await components[0].createNode({ num: 2 });
  const n2 = await components[0].createNode({ num: 3 });
  const add = await components[1].createNode();

  n1.position = [80, 200];
  n2.position = [80, 400];
  add.position = [500, 240];

  editor.addNode(n1);
  editor.addNode(n2);
  editor.addNode(add);

  const o1 = n1.outputs.get("num");
  const o2 = n2.outputs.get("num");
  const i1 = add.inputs.get("num1");
  const i2 = add.inputs.get("num2");
  if(o1 && o2 && i1 && i2) {
    editor.connect(o1, i1);
    editor.connect(o2, i2);  
  }

  editor.on(
    ["process","nodecreated","noderemoved","connectioncreated","connectionremoved"],
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);
}

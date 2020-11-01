import Rete, {Component as ReteComponent} from "rete";
import ConnectionPlugin from "rete-connection-plugin";
//import ConnectionPathPlugin from "rete-connection-path-plugin";
import {HistoryPlugin} from "./pluginsjs/history-plugin";
import {ReactRenderPlugin} from "./pluginsjs/react-render-plugin";
import {AreaPlugin} from "./pluginsjs/area-plugin";
import FlowchartNode from "../components/flowchart/flowchart-node";
import {FlowchartComponentTemplate} from "../types/flowchart/flowchart-component-template";
import {IFlowchartConnectionRendererProps, flowchartConnectionRenderer, flowchartConnectionUpdater} from "../components/flowchart/flowchart-connection";

 
export async function createEditor(container: HTMLElement|null, templates: FlowchartComponentTemplate[], schema: string) {
  if(!container) {
    return;
  }
  const editor = new Rete.NodeEditor("solo@0.1.0", container);
  editor.use(ReactRenderPlugin, {component: FlowchartNode});
  editor.use(ConnectionPlugin);
  editor.use(HistoryPlugin, {keyboard: true});
 
 
 editor.on('connectionpath', (data) => {
    console.log(`++++ connectionpath`)
    const curvature = 0.8;
    const [x1, y1, x2, y2] = data.points;
    const xx1 = x1+10;
    const xx2 = x2-10;
    const hx1 = xx1 + Math.abs(xx2 - xx1) * curvature;
    const hx2 = xx2 - Math.abs(xx2 - xx1) * curvature;
    data.d = `M ${x1} ${y1} L ${xx1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${xx2} ${y2} L ${x2} ${y2}`;
    data.points=[];
  });
 

  editor.on('keydown', (e: KeyboardEvent) => {
    console.log(`keydown ${e.code}`)
    switch (e.code) {
      case 'Delete':
          editor.selected.each(n => editor.removeNode(n));
          break;
      break;
    }
  });

/*
default:
  <path class="main-path" d="M 260 447 C 356 447 404 359 500 359"></path>

  straight:
  <path class="main-path" d="M 260 447 C 260 447 512 381 512 381"></path>

  editor.events["renderconnection"] = [ (props: IFlowchartConnectionRendererProps) => {
    console.log('renderconnection')
    flowchartConnectionRenderer(editor, props);
  }];

  editor.events["updateconnection"] = [(props: IFlowchartConnectionRendererProps) => {
    flowchartConnectionUpdater(editor, props);
  }];
 
  */


  const engine = new Rete.Engine("solo@0.1.0");

  templates.forEach( (c) => {
    editor.register(c);
    engine.register(c);
  });

  /*
  const n1 = await templates[0].createNode({ num: 5 });
  const n2 = await templates[0].createNode({ num: 3 });
  const add = await templates[1].createNode();

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
  */

  editor.on(
    ["process","nodecreated","noderemoved","connectioncreated","connectionremoved"],
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());      
    }
  );

  await editor.fromJSON(JSON.parse(schema));

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);
  console.log('----json---')
  console.dir(JSON.stringify(editor.toJSON()))
}

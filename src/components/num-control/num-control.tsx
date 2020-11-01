import {Node as ReteNode} from "rete";
import {Emitter as ReteEmitter} from "rete/types/core/emitter";
import {EventsTypes as ReteEventsTypes} from "rete/types/events";
import NumControlComponent from "./num-control-component";
import {ReteUpdatableControl} from "../../types/flowchart/rete-updatable-control";

interface INumControlProps {
  readonly: boolean,
  value: number,
  onChange: (v: number) => void;
}

class NumControl extends ReteUpdatableControl {
    static COMPONENT = NumControlComponent;
    private component: typeof NumControl.COMPONENT;
    private emitter: ReteEmitter<ReteEventsTypes>|null;
    private props: INumControlProps;
    constructor(emitter: ReteEmitter<ReteEventsTypes>|null, key: string, node: ReteNode, readonly: boolean = false) {
      super(key);
      this.emitter = emitter;
      this.key = key;
      this.component = NumControl.COMPONENT;
      let initial: number = (node.data[key] as number);
      if(!initial) {
        initial=0;
      }
      node.data[key] = initial;
      this.props = {
        readonly,
        value: initial,
        onChange: (v) => {
          this.setValue(v);
          if(this.emitter) {
            this.emitter.trigger("process");
          }          
        }
      };
    }
  
    public setValue(val: number) {
      this.props.value = val;
      this.putData(this.key, val);
      console.log(`++++ update = `);
      console.dir((this as any).update);
      this.update();
    }
  }

export default NumControl;
  
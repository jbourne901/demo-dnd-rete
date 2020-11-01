import {Socket as ReteSocket} from "rete";
import { FlowchartComponentTemplate } from "./flowchart-component-template";

export abstract class Flowchart {
    public static socketType: ReteSocket = new ReteSocket("Any");
}

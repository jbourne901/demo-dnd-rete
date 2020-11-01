import React, {useState, useEffect} from 'react';
import {NodeEditor as ReteNodeEditor} from "rete";
import {Node as ReteNode, Input as ReteInput, Output as ReteOutput, Control as ReteControl} from "rete/types";
import {Control as ReteReactControl, Socket as ReteReactSocket} from "../../../rete/pluginsjs/react-render-plugin"
import {IBindSocket} from "../../../types/flowchart/flowchart-socket";
import {IBindControl} from "../../../types/flowchart/flowchart-control";
import FlowchartNodeSocket from "./flowchart-node-socket";
import EditIcon from "@material-ui/icons/Edit";
import "./flowchart-node.css";
import FlowchartNodeTitleEditor from "./flowchart-node-titleeditor";
import {FlowchartHistorySupport} from "../../../types/flowchart/flowchart-history-support";


//const FlowchartNodeSocket = ReteReactSocket;

interface IFlowchartNodeProps {
    node: ReteNode;
    editor: ReteNodeEditor;
    bindSocket: IBindSocket;
    bindControl: IBindControl;
}

interface IFlowchartNodeState {
    inputs: ReteInput[];
    outputs: ReteOutput[];
    controls: ReteControl[];
    selected: "selected"|""|undefined;
    title: string;
    editingTitle: boolean;
    titleError: string;
}

class FlowchartNode extends React.Component<IFlowchartNodeProps, IFlowchartNodeState> {

    constructor(props: IFlowchartNodeProps) {
        super(props);
        this.state = {
            inputs: [],
            outputs: [],
            controls: [],
            selected: undefined,
            title: props.node.name,
            editingTitle: false,
            titleError: ""
        };        
    }

    public static getDerivedStateFromProps(props: IFlowchartNodeProps) {
        const st = {
            outputs: Array.from(props.node.outputs.values()),
            controls: Array.from(props.node.controls.values()),
            inputs: Array.from(props.node.inputs.values()),
            selected: props.editor.selected.contains(props.node) ? 'selected' : "",
        };
        return st;
    }

    protected editTitle() {
        console.log(`onclick- editTitle`)
        this.setState({editingTitle: true});
    }

    protected onChangeTitle(t: string) {
        this.setState( (prevState: IFlowchartNodeState) => {
            const nextState: IFlowchartNodeState = {...prevState, editingTitle: false, title: t};
            //TODO fix
            (this.props.editor as any).trigger("addhistory", new FlowchartHistorySupport(prevState.title, nextState.title, (t: string) => this.undoChangeTitle(t)));
            return nextState;
        });
    }

    protected undoChangeTitle(prevTitle: string) {
        this.setState({title: prevTitle});
    }

    public render() {  
        console.log(`edting title=${this.state.editingTitle}`)
        const { node, bindSocket, bindControl } = this.props;
        const {selected, inputs, outputs, controls} = this.state;
 
        let clsNode = `flowchart-node`;
        if(selected) {
            clsNode = `flowchart-node flowchart-node-selected`;
        }
        const clsNodeTitle="flowchart-node-title";
        const clsOutput="flowchart-node-output";
        const clsOutputTitle="flowchart-node-output-title";
        const clsInput="flowchart-node-input";
        const clsInputTitle="flowchart-node-input-title";
        const clsInputControl="flowchart-node-input-control";
        const clsControl="flowchart-node-control";
        
        let clsTitleEditIcon="flowchart-node-titleediticon";
        let clsTitleInput="flowchart-node-titleinput-hidden";  
        let clsNodeTitleLabel="flowchart-node-titlelabel";
        

        const title = this.state.title;
        const titleError = this.state.titleError;

        let jsxTitleEditor: JSX.Element|null = null;
        let jsxTitleLabel: JSX.Element|null=(
            <span className="flowchart-node-titlelabel">
                {title}
            </span>
        );
        let jsxEditTitleIcon: JSX.Element | null = (
            <EditIcon 
                className="flowchart-node-titleediticon"
                onClick={() => this.editTitle()}
            />
        );
        if(this.state.editingTitle) {
            jsxTitleLabel=null;
            jsxEditTitleIcon=null;
            jsxTitleEditor = (<FlowchartNodeTitleEditor 
                                title={title} 
                                onChange={(t) => this.onChangeTitle(t)} 
                                error={titleError}
                              />);
        }
        const jsxControls: JSX.Element[] = [];
        controls.map((control: ReteControl) => (
            <ReteReactControl className={clsControl} key={control.key} control={control} innerRef={bindControl} />
        ));

        return (
            <div className={clsNode}>
                <div className={clsNodeTitle}>                    
                    {jsxTitleLabel}
                    {jsxTitleEditor}
                    {jsxEditTitleIcon}                    
                </div>

                {outputs.map((output: ReteOutput) => (
                    <div className={clsOutput} key={output.key}>
                        <div className={clsOutputTitle}>{output.name}</div>
                        <FlowchartNodeSocket type="output" socket={output.socket} io={output} innerRef={bindSocket} />
                    </div>
                ))}

                {jsxControls}

                {inputs.map((input: ReteInput) => (
                    <div className={clsInput} key={input.key}>
                        <FlowchartNodeSocket type="input" socket={input.socket} io={input} innerRef={bindSocket} />
                        {!input.showControl() && 
                            <div className={clsInputTitle}>{input.name}</div>
                        }
                        {input.showControl() && 
                            <ReteReactControl className={clsInputControl} control={input.control} innerRef={bindControl} />
                        }
                    </div>
                ))}
            </div>
        );
    }
}

export default FlowchartNode;
import React from 'react';
import {Socket as ReteSocket} from "rete/types/socket";
import {IBindSocket, IFlowchartSocketType} from "../../../../types/flowchart/flowchart-socket";
import {IFlowchartIOType} from "../../../../types/flowchart/flowchart-io";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import "./flowchart-node-socket.css";

interface IFlowchartSocketProps {
    innerRef: IBindSocket;
    type: IFlowchartSocketType;
    io: IFlowchartIOType;
    socket: ReteSocket;
    className?: string;
}

class FlowchartSocket extends React.Component<IFlowchartSocketProps> {
    private createRef (el: HTMLDivElement) {
        const { innerRef, type, io } = this.props;
        el && innerRef(el, type, io);
    };

    render () {
        const { socket, type} = this.props;
        let cls = this.props.className;
        if(!cls) {
            cls=`flowchart-node-socket flowchart-node-${type}-socket`;            
            //cls=`socket ${type}`;
        }
        let icon=<ArrowRightIcon 
                    className="flowchart-node-socket-icon" 
                />;
        return (
            <div
                className={cls}
                title={socket.name}
                ref={(el: HTMLDivElement) => this.createRef(el)}
            >
                {icon}
            </div>
        )
    }
}

export default FlowchartSocket;
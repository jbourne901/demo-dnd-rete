import {Emitter as ReteEmitter, Connection as ReteConnection} from "rete";
import {EventsTypes} from "rete/types/core/events";
import "./flowchart-connection.css";

/*
editor.on('renderconnection', (editor: ReteEditor, props: IFlowchartConnectionRendererProps) => 
    flowchartConnectionRenderer(editor, props);
);

editor.on('updateconnection', (editor: ReteEditor, props: IFlowchartConnectionRendererProps) => {
    flowchartConnectionUpdater(editor, props);
});

*/

export interface IFlowchartConnectionRendererProps {
    el: HTMLElement;
    connection: ReteConnection;
    points: number[];
}

export const flowchartConnectionRenderer = (emitter: ReteEmitter<EventsTypes>, props: IFlowchartConnectionRendererProps) => {
    const { el, connection, points } = props;
    const d = flowchartConnectionRenderPathData(emitter, points, connection);
    flowchartConnectionRenderConnection({ el, d, connection })
};

export const flowchartConnectionUpdater = (emitter: ReteEmitter<EventsTypes>, props: IFlowchartConnectionRendererProps) => {
    const d = flowchartConnectionRenderPathData(emitter, props.points, props.connection);
    flowchartConnectionUpdateConnection({ el: props.el, d });
};


const flowchartConnectionToTrainCase = (str: string) => {
    return str.toLowerCase().replace(/ /g, '-');
}

const flowchartConnectionDefaultPath = (points: number[], curvature: number) => {
    const [x1, y1, x2, y2] = points;
    const hx1 = x1 + Math.abs(x2 - x1) * curvature;
    const hx2 = x2 - Math.abs(x2 - x1) * curvature;

    return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
};

const flowchartConnectionRenderPathData = (emitter: ReteEmitter<EventsTypes>, points: number[], connection?: ReteConnection) => {
    const data = { points, connection, d: '' };

    //TODO fix
    (emitter as any).trigger('connectionpath', data);

    return data.d || flowchartConnectionDefaultPath(points, 0.4);
}

const flowchartConnectionUpdateConnection = ({ el, d } : { el: HTMLElement, d: string }) => {
    const path = el.querySelector('.connection path');

    if (!path) throw new Error('Path of connection was broken');

    path.setAttribute('d', d);
};

const flowchartConnectionRenderConnection = ({ el, d, connection } : { el: HTMLElement, d: string, connection?: ReteConnection }) => {
    const classed = connection ? [
        'flowchart-connection-input-' + flowchartConnectionToTrainCase(connection.input.name),
        'flowchart-connection-output-' + flowchartConnectionToTrainCase(connection.output.name),
        'flowchart-connection-socket-input-' + flowchartConnectionToTrainCase(connection.input.socket.name),
        'flowchart-connection-socket-output-' + flowchartConnectionToTrainCase(connection.output.socket.name)
    ] : [];

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    svg.classList.add('flowchart-connection', ...classed);
    path.classList.add('flowchart-connection-main-path');
    path.setAttribute('d', d);

    svg.appendChild(path);
    el.appendChild(svg);

    flowchartConnectionUpdateConnection({ el, d });
}

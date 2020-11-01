import React, {useState, useEffect} from "react";
import "./flowchart-node-titleeditor.css";

interface IFlowchartNodeTitleEditorProps {
    title: string;
    error: string;
    onChange: (t: string) => void;
}

const FlowchartNodeTitleEditor = (props: IFlowchartNodeTitleEditorProps) => {
    const [input, setInput] = useState<string>(props.title);

    useEffect(() => {
        setInput(props.title);
    }, [props.title]);

    const onChange = () => {
        console.log("onchange")
        props.onChange(input);
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onChange();
    }

    return (
        <form 
            className="flowchart-node-titleeditor-form"
            onSubmit={(e) => onSubmit(e)}
        >
            <input 
                autoFocus
                className="flowchart-node-titleeditor-input"
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onBlur = {(e) => onChange()}
            />
            <button 
                type="submit" 
                className="flowchart-node-titleeditor-submit"
            >
            </button>                    
        </form>
    )
};

export default FlowchartNodeTitleEditor;
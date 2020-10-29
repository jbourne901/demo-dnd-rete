import React from "react";

interface INumControlComponentProps {
  value: number;
  onChange: (v: number) => void;
}

const NumControlComponent = (props: INumControlComponentProps) => {
  return (
    <input
      type="number"
      value={props.value}
      ref={(element) => {
        if(element) {
          element.addEventListener("pointerdown", e => e.stopPropagation());
        }
      }}
      onChange={e => props.onChange(+e.target.value)}
    />
  );
};

export default NumControlComponent;
import React from "react";
import "../../App.css";

interface Input {
  type: string;
  placeholder: string;
  value?: any;
  name?: string;
  checked?: boolean | any;
  onChange: (value: any) => void;
}

const index = (props: Input) => {
  return (
    <>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className="todo-input"
      />
    </>
  );
};

export default index;

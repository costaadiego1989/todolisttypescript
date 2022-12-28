import React from "react";

interface Button {
  type: "button" | "submit" | "reset";
  value?: any;
  text: string;
}

const index = (obj: Button) => {
  return (
    <>
      <button type={obj.type} value={obj.value} className="create-task-btn">
        {obj.text}
      </button>
      ;
    </>
  );
};

export default index;

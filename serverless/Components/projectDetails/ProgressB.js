import React from "react";

function ProgressB(props) {
  const widthValue = props.value;
  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
        style={{ width: widthValue }}
      >
        {" "}
        {widthValue}
      </div>
    </div>
  );
}

export default ProgressB;

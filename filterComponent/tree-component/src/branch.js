import React, { useState } from "react";
import Node from "./node";

const Branch = (props) => {
  return (
    <div className="flex flex-col justify-start items-start bg-gray-200">
      {props.data.map((item, index) => {
        return (
          <Node
            key={item.key}
            title={item.title}
            checked={props.data[index].checked}
            onChange={props.onChange}
          />
        );
      })}
    </div>
  );
};

export default Branch;

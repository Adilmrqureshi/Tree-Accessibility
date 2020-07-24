import React from "react";
import { Checkbox } from "antd";
//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
const Node = (props) => {
  return (
    <Checkbox
      className="px-4 "
      onChange={props.onChange}
      checked={props.checked}
      tabindex={props.nodeKey}
      {...props}
    >
      {" " + props.title}
    </Checkbox>
  );
};

export default Node;

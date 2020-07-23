import React from "react";
import { Checkbox } from "antd";

const Node = (props) => {
  return (
    <Checkbox
      onChange={props.onChange}
      checked={props.checked}
      key={props.key}
      tabindex={props.key}
      {...props}
    >
      {props.title}
    </Checkbox>
  );
};

export default Node;

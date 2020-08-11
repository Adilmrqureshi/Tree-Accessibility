import React, { useContext } from "react";
import { Checkbox } from "antd";
import { RootContext } from "../../context/rootContext";

//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features

function Node(props) {
  const context = useContext(RootContext);
  const { data } = props;

  const onCheck = (e) => {
    context.onChecked({
      key: data.key,
      checked: e.target.checked,
    });
  };

  // If the node has children we will display its children
  let branch = null;
  if (data.children) {
    console.log(data.children);
    branch = data.children.map((item) => <Node data={item} />);
  }
  const shouldCheck =
    context.checkedKeys.find((element) => element.key === props.data.key) !==
    undefined;
  return (
    <div>
      <Checkbox onChange={onCheck} checked={shouldCheck} {...props}>
        {props.data.title}
      </Checkbox>
      {branch}
    </div>
  );
}

export default Node;

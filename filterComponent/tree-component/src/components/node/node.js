import React, { useContext, memo, useCallback } from "react";
import { Checkbox } from "antd";
import { RootContext } from "../../context/rootContext";

//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features

function Node({ data, indent }) {
  const context = useContext(RootContext);

  const onCheck = useCallback(
    (e) => {
      context.onChecked({
        key: data.key,
        checked: e.target.checked,
      });
    },
    [data.key, context]
  );

  // If the node has children we will display its children
  let branch = null;
  if (data.children) {
    branch = data.children.map((item) => (
      <Node data={item} indent={indent + 7} />
    ));
  }
  const shouldCheck = context.checkedKeys.find(
    (element) => element.key === data.key
  );
  return (
    <div>
      <Checkbox
        style={{ paddingLeft: indent }}
        onChange={onCheck}
        checked={shouldCheck ? shouldCheck.checked : false}
      >
        {data.title}
      </Checkbox>
      {branch}
    </div>
  );
}

export default memo(Node);

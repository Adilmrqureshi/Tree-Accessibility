import React, { useContext, memo, useCallback } from "react";
import { Checkbox, Collapse } from "antd";

import { RootContext } from "../../context/rootContext";

const { Panel } = Collapse;
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

  const expandHandler = (event) => {
    console.log(event);
  };

  const shouldCheck = context.checkedKeys.find(
    (element) => element.key === data.key
  );

  // If the node has children we will display its children
  let branch = (
    <Checkbox
      style={{ paddingLeft: indent }}
      onChange={onCheck}
      checked={shouldCheck ? shouldCheck.checked : false}
    >
      {data.title}
    </Checkbox>
  );
  if (data.children) {
    branch = (
      <Panel
        header={
          <Checkbox
            style={{ paddingLeft: indent }}
            onChange={onCheck}
            checked={shouldCheck ? shouldCheck.checked : false}
          >
            {data.title}
          </Checkbox>
        }
        key={data.key}
      >
        {data.children.map((item) => (
          <Node data={item} indent={indent + 7} />
        ))}
      </Panel>
    );
  }

  return branch;
}

export default memo(Node);

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

  const onExpand = (key) => {
    if (context.onExpand && Array.isArray(key))
      context.onExpand(key[key.length - 1]);
  };

  const shouldCheck = context.checkedKeys.find(
    (element) => element.key === data.key
  );

  if (data.children) {
    return (
      <Collapse bordered={false} onChange={onExpand}>
        {data.children.map((child) => (
          <Collapse.Panel
            key={child.key}
            header={
              <Checkbox
                style={{ paddingLeft: indent }}
                onChange={onCheck}
                checked={shouldCheck ? shouldCheck.checked : false}
              >
                {child.title}
              </Checkbox>
            }
          >
            <Node data={child} indent={indent + 7} />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  } else {
    return null;
    //(
    //   <Checkbox
    //     style={{ paddingLeft: indent }}
    //     onChange={onCheck}
    //     checked={shouldCheck ? shouldCheck.checked : false}
    //   >
    //     {data.title}
    //   </Checkbox>
    // );
  }
}

export default memo(Node);

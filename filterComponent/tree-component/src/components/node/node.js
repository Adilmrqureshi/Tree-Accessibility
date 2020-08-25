import React, { useContext, memo, useCallback } from "react";
import { Checkbox, Collapse } from "antd";

import { RootContext } from "../../context/rootContext";

//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features

function Node({ data, indent }) {
  const context = useContext(RootContext);
  let node = null;

  const onCheck = useCallback(
    (e, key) => {
      context.onChecked({
        key: key,
        checked: e.target.checked,
      });
    },
    [context]
  );

  const onExpand = (key) => {
    console.log(key);
    context.onExpand(key);
  };

  const customPanelStyle = {
    border: 0,
    overflow: "hidden",
  };

  if (data) {
    node = data.map((item) => {
      const shouldCheck = context.checkedKeys.find(
        (element) => element.key === item.key
      );

      if (item.children) {
        return (
          <Collapse
            activeKey={context.expandedKeys}
            key={item.key}
            bordered={false}
            onChange={onExpand}
          >
            <Collapse.Panel
              forceRender={true}
              style={customPanelStyle}
              key={item.key}
              header={
                <Checkbox
                  className="z-50"
                  onChange={(event) => onCheck(event, item.key)}
                  checked={shouldCheck?.checked}
                >
                  {item.title}
                </Checkbox>
              }
            >
              <Node data={item.children} indent={indent + 7} />
            </Collapse.Panel>
          </Collapse>
        );
      } else {
        return (
          <Checkbox
            key={item.key}
            style={{
              padding: `12px 16px 12px ${indent + 38}px`,
              margin: 0,
            }}
            className={"w-full z-50"}
            onChange={(event) => onCheck(event, item.key)}
            checked={shouldCheck?.checked}
          >
            {item.title}
          </Checkbox>
        );
      }
    });
  }
  return node;
}

export default memo(Node);

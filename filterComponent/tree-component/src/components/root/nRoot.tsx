import React, { memo, useContext, useCallback } from "react";
import Node from "../node/node";
import { CheckElement } from "../../interface";
import { RootContext } from "../../context/rootContext";
import { Collapse, Checkbox } from "antd";
import "antd/dist/antd.css";

interface Props {
  data: CheckElement[];
}

const Root: React.FC<Props> = ({ data }) => {
  const context = useContext(RootContext);

  const onCheck = useCallback(
    (e: any, key: string) => {
      if (context.onChecked) {
        context.onChecked({
          key: key,
          checked: e.target.checked,
        });
      }
    },
    [context]
  );

  const onExpand = (key: string[]) => {
    context.onExpand(key);
  };

  const customPanelStyle = {
    border: 0,
    overflow: "hidden",
  };

  return (
    <div>
      <Collapse
        activeKey={context.expandedKeys}
        bordered={false}
        onChange={onExpand}
      >
        {data.map((dataItem) => {
          let shouldCheck = null;
          let render = null;
          if (context.checkedKeys) {
            shouldCheck = context.checkedKeys.find(
              (element) => element.key === dataItem.key
            );
            if (shouldCheck !== undefined) shouldCheck = shouldCheck.checked;
          }
          if (dataItem.children) {
            render = (
              <Collapse.Panel
                forceRender={true}
                style={customPanelStyle}
                header={
                  <Checkbox
                    style={{ paddingLeft: 2 }}
                    onChange={(event) => onCheck(event, dataItem.key)}
                    checked={shouldCheck}
                  >
                    {dataItem.title}
                  </Checkbox>
                }
                key={dataItem.key}
              >
                <Node indent={2} data={dataItem.children} />
              </Collapse.Panel>
            );
          } else {
            render = (
              <div style={{ width: "100%", padding: "12px 16px 12px 40px" }}>
                <Checkbox
                  key={dataItem.key}
                  style={{ paddingLeft: 2 }}
                  onChange={(event) => onCheck(event, dataItem.key)}
                  checked={shouldCheck}
                >
                  {dataItem.title}
                </Checkbox>
              </div>
            );
          }
          return render;
        })}
      </Collapse>
    </div>
  );
};
export default memo(Root);

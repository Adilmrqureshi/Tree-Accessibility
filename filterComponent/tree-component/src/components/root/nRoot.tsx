import React, { memo, useContext, useState, useCallback } from "react";
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
  React.useEffect(() => {
    console.log(context.checkedKeys);
  }, [context.checkedKeys]);

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

  const onExpand = (key: string | string[]) => {
    if (context.onExpand && Array.isArray(key))
      context.onExpand(key[key.length - 1]);
  };

  return (
    <div>
      <Collapse
        defaultActiveKey={context.expandedKeys}
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
          }

          if (dataItem.children) {
            render = (
              <Collapse.Panel
                header={
                  <Checkbox
                    style={{ paddingLeft: 2 }}
                    onChange={(event) => onCheck(event, dataItem.key)}
                    checked={shouldCheck ? shouldCheck.checked : false}
                  >
                    {dataItem.title}
                  </Checkbox>
                }
                key={dataItem.key}
              >
                <Node indent={2} data={dataItem} />
              </Collapse.Panel>
            );
          } else {
            render = (
              <div style={{ width: "100%", padding: "12px 16px 12px 40px" }}>
                <Checkbox
                  style={{ paddingLeft: 2 }}
                  onChange={(event) => onCheck(event, dataItem.key)}
                  checked={shouldCheck ? shouldCheck.checked : false}
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

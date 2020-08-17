import React, {memo, useContext, useState} from "react";
import Node from "../node/node";
import { CheckElement } from "../../interface";
import { RootContext } from "../../context/rootContext";
import {Collapse} from 'antd';
import 'antd/dist/antd.css';

interface Props {
  data: CheckElement[];
}

const Root: React.FC<Props> = ({ data }) => {
  const context = useContext(RootContext);
  React.useEffect(() => {
    console.log(context.checkedKeys);
  }, [context.checkedKeys]);
  const [activeKeys, setActiveKeys] = useState(['0']);
  console.log(activeKeys);
  return (
    <div>
      <Collapse defaultActiveKey={activeKeys}  onChange={(key: any) => setActiveKeys(key)}>
        {data.map((dataItem) => {
          return <Collapse.Panel header={dataItem.title} key={dataItem.key}><Node indent={2} data={dataItem} /></Collapse.Panel>
        })}
      </Collapse>
    </div>
  );
};
export default memo(Root);

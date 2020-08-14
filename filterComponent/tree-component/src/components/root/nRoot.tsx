import React, { memo, useContext } from "react";
import Node from "../node/node";
import { CheckElement } from "../../interface";
import { RootContext } from "../../context/rootContext";

interface Props {
  data: CheckElement[];
}

const Root: React.FC<Props> = ({ data }) => {
  const context = useContext(RootContext);
  React.useEffect(() => {
    console.log(context.checkedKeys);
  }, [context.checkedKeys]);
  return (
    <div className="flex flex-col items-start">
      {/*Function to Map through items and create CheckBox groups*/}
      {data.map((dataItem) => {
        return <Node indent={2} data={dataItem} />;
      })}
    </div>
  );
};
export default memo(Root);

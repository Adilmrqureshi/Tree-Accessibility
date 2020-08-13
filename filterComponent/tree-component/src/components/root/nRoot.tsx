import React, { memo } from "react";
import Node from "../node/node";
import { CheckElement } from "../../interface";

interface Props {
  data: CheckElement[];
}

const Root: React.FC<Props> = ({ data }) => {
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

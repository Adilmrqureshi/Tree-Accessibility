import React from "react";
import Node from "../node/node";
import RootContext from "../../context/rootContext";
//
const Root = ({ data }) => {
  return (
    <div className="max-w-sm m-1 p-1 tree">
      {/*Function to Map through items and create CheckBox groups*/}
      {data.map((dataItem) => {
        return (
          <RootContext>
            <Node
              data={dataItem}
              key={dataItem.key}
              title={dataItem.title}
              defaultOptions={dataItem.children}
            />
          </RootContext>
        );
      })}
    </div>
  );
};
export default Root;

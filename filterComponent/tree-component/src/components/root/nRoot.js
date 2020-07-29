import React, { useState, useEffect } from "react";
import Node from "../node/node";
import RootContext from "../../context/rootContext";
//
const Root = ({ data }) => {
  // const [treeData, settreeData] = useState([])
  // const recursionHandler = (treeData) => {
  //   if (treeData.children) {
  //     return recursionHandler(treeData.children);
  //   } else {
  //     return;
  //   }
  // };
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

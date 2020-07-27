import React, { useState, useEffect } from "react";
import Node from "../node";
//
const Root = ({ data }) => {
  return (
    <div className="max-w-sm m-1 p-1 tree">
      {/*Function to Map through items and create CheckBox groups*/}
      {data.map((dataItem) => (
        <Node
          data={dataItem}
          key={dataItem.key}
          title={dataItem.title}
          defaultOptions={dataItem.children}
        />
      ))}
    </div>
  );
};
export default Root;

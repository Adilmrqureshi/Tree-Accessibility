import React, { useState, useEffect } from "react";
import Node from "../node";

const Root = ({ data }) => {
  const [display, setDisplay] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setcheckAll] = useState(false);

  useEffect(() => {
    const displayData = data.map(({ title }) => title);
    setDisplay(displayData);
  }, []);

  console.log(display);
  return (
    <div className="max-w-sm m-1 p-1">
      {/*Function to Map through items and create CheckBox groups*/}
      {data.map((dataItem) => (
        <Node
          data={dataItem}
          key={dataItem.key}
          title={dataItem.title}
          defaultOptions={dataItem.children}
          //checkedList={checkedList}
        />
      ))}
    </div>
  );
};
export default Root;

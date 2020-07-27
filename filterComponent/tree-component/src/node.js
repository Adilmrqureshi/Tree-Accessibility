import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import Branch from "./branch";

//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
const Node = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setcheckAll] = useState(false);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    let displayTitles = null;
    if (props.data.children) {
      displayTitles = props.data.children.map(({ title }) => title);
    }
    setDisplay(displayTitles);
  }, []);

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? display : []);
    setIndeterminate(false);
    setcheckAll(e.target.checked);
  };

  const onChange = (checkedList) => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < display.length
    );
    setcheckAll(checkedList.length === display.length);
  };

  //If the node has children we will display its children
  let branch = null;
  if (display) {
    branch = (
      <div className="flex flex-col justify-start items-start px-5">
        <Branch
          defaultOptions={display}
          onChange={onChange}
          checkedList={checkedList}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start bg-gray-200">
      <Checkbox
        //onChange={props.onChange}
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        //checked={props.checked}
        tabindex={props.nodeKey}
        {...props}
      >
        {" " + props.title}
      </Checkbox>
      {branch}
    </div>
  );
};

export default Node;

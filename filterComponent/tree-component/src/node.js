import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import Branch from "./branch";

//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
const Node = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setcheckAll] = useState(false);
  const [display, setDisplay] = useState([]);

  /*
    useEffect transforms the array of children nodes by taking out the title props
    and creating an array of strings from the titles
    display and setDisplay are utilized here
  */
  useEffect(() => {
    let displayTitles = null;
    if (props.data.children) {
      displayTitles = props.data.children.map(({ title }) => title);
    }
    setDisplay(displayTitles);
  }, []);

  //This is the function for the parent components, It gives the functionality to check all children
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? display : []);
    setIndeterminate(false);
    setcheckAll(e.target.checked);
  };
  //onChange allows children nodes to be individually ticked and can also tick parent if all chidren are ticked.
  const onChange = (checkedList) => {
    console.log();
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < display.length
    );
    setcheckAll(checkedList.length === display.length);
  };

  //If the node has children we will display its children in the Branch Component
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
    //These are the parent components that will be rendered to the screen
    <div className="flex flex-col justify-start items-start bg-gray-200">
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
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

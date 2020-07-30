import React, { useState, useEffect, useContext, useCallback } from "react";
import { Checkbox } from "antd";
import Branch from "../branch/branch";
import { RootContext } from "../../context/rootContext";
//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
const Node = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [display, setDisplay] = useState([]);
  const [children, setChildren] = useState([]);
  const context = useContext(RootContext);

  const { data } = props;

  useEffect(() => {
    let displayTitles = null;
    if (data.children) {
      displayTitles = data.children.map(({ title }) => title);
      setChildren(data.children);
      setDisplay(displayTitles);
    }
  }, [data]);

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? display : []);
    setIndeterminate(false);
    context.setCheck(e.target.checked);
  };

  const onChange = (checkedList) => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < display.length
    );
    context.setCheck(checkedList.length === display.length);
    console.log(checkedList, "node");
  };
  //If the node has children we will display its children
  let branch = null;
  if (display && display.length > 0) {
    branch = (
      <Branch
        defaultOptions={display}
        onChange={onChange}
        data={children}
        checkedList={checkedList}
      />
    );
  }

  return (
    <div className="flex flex-col justify-start items-start bg-gray-200">
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={context.checkAll}
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

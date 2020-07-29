import React, { Fragment, useState } from "react";
import { Checkbox } from "antd";
import "./branch.css";
import { displayItems } from "../node/displayItems";

const CheckboxGroup = Checkbox.Group;

//Branch component is takes the children of a given node and creates a CheckBoxGroup to create parent - children interactivity
const Branch = (props) => {
  const [checkAll, setcheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState([]);

  //This function will cause the parent component to check all of the children
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? props.defaultOptions : []);
    setcheckAll(e.target.checked);
  };

  const onChange = (checkedList) => {
    console.log(checkedList);
    setCheckedList(checkedList);
    setcheckAll(checkedList.length === props.defaultOptions.length);
  };

  let checkbox = null;
  //if the elemenet is on the root level then I don't want to include the checkbox
  if (props.embedded) {
    checkbox = (
      <div>
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          {props.title}
        </Checkbox>
        <CheckboxGroup
          options={props.defaultOptions}
          value={checkedList}
          onChange={onChange}
        />
      </div>
    );
  } else {
    checkbox = (
      <div className="site-checkbox-all-wrapper branch px-5">
        <CheckboxGroup
          options={props.defaultOptions}
          value={props.checkedList}
          onChange={props.onChange}
        />
      </div>
    );
  }

  return checkbox;
};

export default Branch;

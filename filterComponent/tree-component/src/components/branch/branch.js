import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import "./branch.css";

const CheckboxGroup = Checkbox.Group;

//Branch component is takes the children of a given node and creates a CheckBoxGroup to create parent - children interactivity
const Branch = (props) => {
  const [checkAll, setcheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [hasChildren, setHasChildren] = useState("");
  const [remainder, setRemainder] = useState([]);

  const { data } = props;

  useEffect(() => {
    const parents = [...hasChildren];
    const remain = [...remainder];
    console.log(data);
    if (data.length > 0) {
      data.forEach((element) => {
        if (element.children) {
          parents.push(data);
        } else {
          remain.push(element);
        }
      });
      setHasChildren(parents);
      setRemainder(remain);
    }
  }, []);

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
  if (hasChildren !== "") {
    checkbox = (
      <div>
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          {hasChildren.title}
        </Checkbox>
        <CheckboxGroup
          options={hasChildren.children}
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

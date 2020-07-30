import React, { useState, useEffect, useContext } from "react";
import { Checkbox } from "antd";
import "./branch.css";
import { RootContext } from "../../context/rootContext";

const CheckboxGroup = Checkbox.Group;

//Branch component is takes the children of a given node and creates a CheckBoxGroup to create parent - children interactivity
const Branch = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [totalCheckBoxes, setTotalCheckboxes] = useState(0);
  const [hasChildren, setHasChildren] = useState([]);
  const [remainder, setRemainder] = useState([]);
  const context = useContext(RootContext);
  const [checkAll, setcheckAll] = useState(context.checkAll);

  const { data } = props;

  useEffect(() => {
    const parents = [...hasChildren];
    const remain = [...remainder];
    if (data.length > 0) {
      data.forEach((element, index) => {
        if (element.children) {
          parents.push(data[index]);
        } else {
          remain.push(element);
        }
      });
      const remainTitles = remain.map(({ title }) => title);
      setHasChildren(parents);
      setRemainder(remainTitles);
      const sum = parents.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.children.length,
        0
      );
      setTotalCheckboxes(sum);
    }
  }, [data]);

  //everytime there is a change in context then upadate the checkAll value for all children
  useEffect(() => {
    setcheckAll(context.checkAll);
    hasChildren.forEach((parent) => {
      const childrenTitles = parent.children.map(({ title }) => title);
      onCheckAllChange(context.checkAll, childrenTitles);
    });
  }, [context]);

  //This function will cause the parent component to check all of the children
  const onCheckAllChange = (event, defaultOptions) => {
    setCheckedList((prevState) =>
      event ? prevState.concat(defaultOptions) : []
    );
    setcheckAll(event);
    if (
      totalCheckBoxes + props.defaultOptions.length ===
      checkedList.length + props.checkedList.length + hasChildren.length
    ) {
      context.setCheck(true);
    } else {
      context.setCheck(false);
    }
  };

  const onChange = (checkedList, maxLength) => {
    setCheckedList(checkedList);
    setcheckAll(checkedList.length === maxLength);
    if (
      totalCheckBoxes + props.defaultOptions.length ===
      checkedList.length + props.checkedList.length + hasChildren.length
    ) {
      context.setCheck(true);
    } else {
      context.setCheck(false);
    }
  };

  let checkbox = null;
  //if the elemenet is on the root level then I don't want to include the checkbox

  if (hasChildren.length > 0) {
    const hasChildTitles = hasChildren[0].children.map(({ title }) => title);
    checkbox = (
      <div>
        <div className="site-checkbox-all-wrapper branch px-3">
          <Checkbox
            onChange={(event) =>
              onCheckAllChange(event.target.checked, hasChildTitles)
            }
            checked={checkAll}
          >
            {hasChildren[0].title}
          </Checkbox>
        </div>
        <div className="px-6">
          <CheckboxGroup
            options={hasChildTitles}
            value={checkedList}
            onChange={(checkedList) =>
              onChange(checkedList, hasChildTitles.length)
            }
          />
        </div>
        <div className="site-checkbox-all-wrapper branch px-3">
          <CheckboxGroup
            options={remainder}
            value={props.checkedList}
            onChange={props.onChange}
          />
        </div>
      </div>
    );
  } else {
    checkbox = (
      <div className="site-checkbox-all-wrapper branch px-3">
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

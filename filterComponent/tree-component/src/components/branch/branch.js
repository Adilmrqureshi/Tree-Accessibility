import React, { useState, useEffect, useContext } from "react";
import { Checkbox } from "antd";
import "./branch.css";
import { RootContext } from "../../context/rootContext";
import { branchHidden } from "./style";
import Leaf from "../leaf/leaf";

const CheckboxGroup = Checkbox.Group;

//Branch component is takes the children of a given node and creates a CheckBoxGroup to create parent - children interactivity
const Branch = (props) => {
  //stores all of the currently checked boxes
  const [checkedList, setCheckedList] = useState([]);
  //total number of children
  const [totalCheckBoxes, setTotalCheckboxes] = useState(0);
  //an array of all of the nodes that have children
  const [hasChildren, setHasChildren] = useState([]);
  //all of the elements that don't have children, they will be directly handled by the parent component
  const [remainder, setRemainder] = useState([]);
  //Whether the parent component is checked or not
  const [checkAll, setcheckAll] = useState(false);

  //used to reference the context API
  const context = useContext(RootContext);

  const { data, defaultOptions } = props;

  //this will intialise the data from the node component
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
      //extracts the titles as the antd element only functions with an array of strings this occurs manny times in this script
      const remainTitles = remain.map(({ title }) => title);
      setHasChildren(parents);
      setRemainder(remainTitles);
      //calculates the total amount of children this is so that when all the children are checked I will set the context.
      const sum = parents.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.children.length,
        0
      );
      setTotalCheckboxes(sum);
    }
  }, [data]);

  //this will check all of the children if the parent is ticked.
  useEffect(() => {
    setcheckAll(context.checkAll);
    hasChildren.forEach((parent) => {
      const childrenTitles = parent.children.map(({ title }) => title);
    });
  }, [context.checkAll]);

  const onChange = (checkedList, maxLength) => {
    setCheckedList(checkedList);
    setcheckAll(checkedList.length === maxLength);
  };

  let checkbox = null;
  //if the elemenet is on the root level then I don't want to include the checkbox

  if (hasChildren.length > 0) {
    //maps through all of the parent and creates a checkbox and checkbox group
    checkbox = hasChildren.map((parent) => {
      const hasChildTitles = parent.children.map(({ title }) => title);
      return (
        <div className={branchHidden}>
          <div className="site-checkbox-all-wrapper branch px-3">
            <Checkbox checked={checkAll}>{parent.title}</Checkbox>
          </div>
          <div className="px-6">
            <CheckboxGroup
              //options={hasChildTitles}
              value={checkedList}
              onChange={(checkedList) =>
                onChange(checkedList, hasChildTitles.length)
              }
            />
          </div>
          <div className="site-checkbox-all-wrapper branch px-3">
            <CheckboxGroup
              //options={remainder}
              value={props.checkedList}
              onChange={props.onChange}
            />
          </div>
        </div>
      );
    });
  } else {
    //renders all of the elements that have no children.
    checkbox = (
      <div className="site-checkbox-all-wrapper branch px-3">
        <CheckboxGroup
          options={defaultOptions}
          value={props.checkedList}
          //onChange={props.onChange}
        />
      </div>
    );
  }

  return checkbox;
};

export default Branch;

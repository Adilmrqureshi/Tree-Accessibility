import React, { useState, useEffect, useContext } from "react";
import { Checkbox } from "antd";
import "./branch.css";
import { RootContext } from "../../context/rootContext";

const CheckboxGroup = Checkbox.Group;

//Branch component is takes the children of a given node and creates a CheckBoxGroup to create parent - children interactivity
const Branch = (props) => {
  const [checkAll, setcheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [hasChildren, setHasChildren] = useState([]);
  const [remainder, setRemainder] = useState([]);
  const context = useContext(RootContext);

  const { data } = props;

  useEffect(() => {
    const parents = [...hasChildren];
    const remain = [...remainder];
    console.log(data);
    if (data.length > 0) {
      data.forEach((element, index) => {
        if (element.children) {
          parents.push(data[index]);
        } else {
          remain.push(element);
        }
      });
      console.log(parents, "Parents");
      const remainTitles = remain.map(({ title }) => title);
      setHasChildren(parents);
      setRemainder(remainTitles);
    }
  }, [data]);

  //This function will cause the parent component to check all of the children
  const onCheckAllChange = (e, defaultOptions) => {
    console.log(context.checkAll);
    setCheckedList(e.target.checked ? defaultOptions : []);
    setcheckAll(e.target.checked || context.checkAll);
  };

  const onChange = (checkedList) => {
    setCheckedList(checkedList);
    setcheckAll(checkedList.length === props.defaultOptions.length);
  };

  let checkbox = null;
  //if the elemenet is on the root level then I don't want to include the checkbox

  if (hasChildren.length > 0) {
    console.log(hasChildren, "HasChildren");
    const hasChildTitles = hasChildren[0].children.map(({ title }) => title);
    checkbox = (
      <div>
        <div>
          <Checkbox
            onChange={(event) => onCheckAllChange(event, hasChildTitles)}
            checked={checkAll}
          >
            {hasChildren[0].title}
          </Checkbox>
          <CheckboxGroup
            options={hasChildTitles}
            value={checkedList}
            onChange={onChange}
          />
        </div>
        <div className="site-checkbox-all-wrapper branch px-5">
          <CheckboxGroup
            options={remainder}
            value={checkedList}
            onChange={onChange}
          />
        </div>
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

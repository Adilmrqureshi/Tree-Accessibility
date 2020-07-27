import React, { useState, Fragment } from "react";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;
//Branch component is takes the children of a given node and creates a CheckBoxGroup to create parent - children interactivity
const Branch = (props) => {
  return (
    <Fragment>
      <div className="site-checkbox-all-wrapper"></div>
      <CheckboxGroup
        options={props.defaultOptions}
        value={props.checkedList}
        onChange={props.onChange}
      />
    </Fragment>
  );
};

export default Branch;

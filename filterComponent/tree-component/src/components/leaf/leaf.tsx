import React, { useContext } from "react";
import CheckBox from "antd/lib/checkbox";
import { Checkbox } from "antd";
import { RootContext } from "../../context/rootContext";
import CheckboxGroup from "antd/lib/checkbox/Group";
import { CheckElement } from "../../interface";

const CheckGroup = Checkbox.Group;

interface Props {
  checkAll: boolean;
  options: string[];
  title: string;
  value: string[];
  checkedList: string[];
  child: CheckElement[];
}

const Leaf: React.FC<Props> = (props) => {
  const context = useContext(RootContext);
  return (
    <div>
      <div className="site-checkbox-all-wrapper branch px-3">
        <Checkbox checked={props.checkAll}>{props.title}</Checkbox>
      </div>
      <div className="px-6">
        <CheckboxGroup
          options={props.options}
          value={props.value}
          //onChange={context.onChange}
        />
      </div>
      <div className="site-checkbox-all-wrapper branch px-3">
        <CheckboxGroup
          options={props.child.map(({ title }) => title)}
          value={props.checkedList}
          //onChange={context.onChange}
        />
      </div>
    </div>
  );
};

export default Leaf;

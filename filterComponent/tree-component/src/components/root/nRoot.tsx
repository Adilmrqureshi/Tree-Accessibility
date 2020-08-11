import React from "react";
import Node from "../node/node";
import RootContext from "../../context/rootContext";
import { CheckElement } from "../../interface";

interface Props {
  data: CheckElement[];
  checkedKeys: Check[];
  onChecked: (payload: { key: string; checked: boolean }) => void;
}

const Root: React.FC<Props> = ({ data, checkedKeys, onChecked }) => {
  return (
    <div className="flex flex-col items-start">
      <RootContext
        checkAll={false}
        checkedKeys={checkedKeys}
        onChecked={onChecked}
      >
        {/*Function to Map through items and create CheckBox groups*/}
        {data.map((dataItem) => {
          return (
            <Node
              indent={0}
              data={dataItem}
              defaultOptions={dataItem.children}
            />
          );
        })}
      </RootContext>
    </div>
  );
};
export default Root;

// //This function will cause the parent component to check all of the children
// const onCheckAllChange = (event, def) => {
//   //this will amend the array or return an empty array
//   setCheckedList((prevState) => (event ? prevState.concat(def) : []));
//   setcheckAll(event);
//   // if (
//   //   totalCheckBoxes + defaultOptions.length ===
//   //   checkedList.length + props.checkedList.length + hasChildren.length
//   // ) {
//   //   context.setCheck(true);
//   // } else {
//   //   context.setCheck(false);
//   // }
// };

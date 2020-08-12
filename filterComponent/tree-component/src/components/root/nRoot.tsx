import React from "react";
import Node from "../node/node";
import { CheckElement } from "../../interface";

interface Props {
  data: CheckElement[];
  checkedKeys: Check[];
}

const Root: React.FC<Props> = ({ data, checkedKeys }) => {
  return (
    <div className="flex flex-col items-start">
      {/*Function to Map through items and create CheckBox groups*/}
      {data.map((dataItem) => {
        return <Node indent={2} data={dataItem} />;
      })}
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

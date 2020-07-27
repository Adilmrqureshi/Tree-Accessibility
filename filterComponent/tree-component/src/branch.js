import React, { useState, Fragment } from "react";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

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

/*{
   <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          Check all
        </Checkbox> 
}*/

// const Branch = (props) => {
//   return (
//     <div className="flex flex-col justify-start items-start bg-gray-200">
//       {props.data.map((item, index) => {
//         return (
//           <Node
//             key={item.key}
//             title={item.title}
//             checked={props.data[index].checked}
//             onChange={props.onChange}
//           />
//         );
//       })}
//     </div>
//   );
// };

// import React, { useState, useEffect, useContext, useCallback } from "react";
// import { Checkbox } from "antd";
// import Branch from "../branch/branch";

// import { displayItems } from "./displayItems";

// //Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
// const Node = (props) => {
//   const [checkedList, setCheckedList] = useState([]);
//   const [indeterminate, setIndeterminate] = useState(false);
//   const [display, setDisplay] = useState([]);
//   //I use context so that if context is checked all of the children will become checked
//   const context = useContext(RootContext);

//   useEffect(() => {
//     let displayTitles = null;
//     if (props.data.children) {
//       //console.log(props.data);
//       displayTitles = childHandler(props.data.children);
//     }
//     console.log(displayTitles);
//     setDisplay(displayTitles);
//   }, []);

//   const childHandler = (data) => {
//     const childrenArray = [];
//     data.forEach((element) => {
//       if (element.children) {
//         childrenArray.push(childHandler(element.children));
//       } else {
//         childrenArray.push(element.title);
//       }
//     });
//     return childrenArray;
//   };

//   const onCheckAllChange = (e) => {
//     setCheckedList(e.target.checked ? display : []);
//     setIndeterminate(false);
//     context.setCheck(e.target.checked);
//   };

//   const onChange = useCallback(
//     () => (checkedList) => {
//       setCheckedList(checkedList);
//       setIndeterminate(
//         !!checkedList.length && checkedList.length < display.length
//       );
//       context.setCheck(checkedList.length === display.length);
//     },
//     [context]
//   );

//   //If the node has children we will display its children
//   let branch = null;
//   if (display) {
//     console.log(display, "Display");
//     branch = display.map((item) => {
//       if (Array.isArray(item)) {
//         return null;
//       }
//       return (
//         <div className="flex flex-col justify-start items-start">
//           <Branch
//             defaultOptions={display}
//             onChange={onChange}
//             checkedList={checkedList}
//           />
//         </div>
//       );
//     });
//   }

//   return (
//     <div className="flex flex-col justify-start items-start bg-gray-200">
//       <Checkbox
//         onChange={onCheckAllChange}
//         checked={context.checkAll}
//         tabindex={props.nodeKey}
//         {...props}
//       >
//         {" " + props.title}
//       </Checkbox>
//       {branch}
//     </div>
//   );
// };

import React, { useState, useEffect, useContext, useCallback } from "react";
import { Checkbox } from "antd";
import Branch from "../branch/branch";
import { RootContext } from "../../context/rootContext";
//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
const Node = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [defaultData, setDefaultData] = useState([]);
  const [display, setDisplay] = useState([]);
  const context = useContext(RootContext);

  useEffect(() => {
    let displayTitles = null;
    if (props.data.children) {
      displayTitles = props.data.children.map(({ title }) => title);
      setDefaultData(props.data.children);
      setDisplay(displayTitles);
    }
  }, []);

  // const onCheckAllChange = (e) => {
  //   setCheckedList(e.target.checked ? display : []);
  //   setIndeterminate(false);
  //   setcheckAll(e.target.checked);
  // };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? display : []);
    setIndeterminate(false);
    context.setCheck(e.target.checked);
  };

  const onChange = (checkedList) => {
    console.log(checkedList);
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < display.length
    );
    context.setCheck(checkedList.length === display.length);
  };
  //If the node has children we will display its children
  let branch = null;
  if (display) {
    branch = (
      <div className="flex flex-col justify-start items-start px-5">
        <Branch
          defaultOptions={display}
          onChange={onChange}
          data={defaultData}
          checkedList={checkedList}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start bg-gray-200">
      <Checkbox
        //onChange={props.onChange}
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={context.checkAll}
        //checked={props.checked}
        tabindex={props.nodeKey}
        {...props}
      >
        {" " + props.title}
      </Checkbox>
      {branch}
    </div>
  );
};

export default Node;

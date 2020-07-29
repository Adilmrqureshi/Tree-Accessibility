import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import Branch from "./branch";

//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
const Node = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setcheckAll] = useState([false]);
  const [display, setDisplay] = useState([]);

  /*
    useEffect transforms the array of children nodes by taking out the title props
    and creating an array of strings from the titles
    display and setDisplay are utilized here
  */

  useEffect(() => {
    let displayItems = null;
    if (props.data) {
      displayItems = childHandler(props.data.children, props.title);
      //displayTitles = props.data.children.map(({ title }) => title);
    }
    //console.log(displayItems, " display data");
    setDisplay(displayItems);
  }, []);

  //This function will take all of the element and seperate them into elements that have children and elements that don't
  const childHandler = (data, parent) => {
    const childrenArray = [];
    data.forEach((element) => {
      if (element.children) {
        childrenArray.push(childHandler(element.children, element));
      } else {
        childrenArray.push({ parent, child: element });
      }
    });
    return childrenArray;
  };

  //This is the function for the parent components, It gives the functionality to check all children
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? display : []);
    setcheckAll((prevState) => [e.target.checked, ...prevState]);
  };
  //onChange allows children nodes to be individually ticked and can also tick parent if all chidren are ticked.
  const onChange = (checkedList) => {
    setCheckedList(checkedList);
    setcheckAll(checkedList.length === display.length);
  };

  const onCheckIntermidiate = (e, data) => {
    //get the title elements of the children elements
    const children = data.map(({ child }) => child.title);
    //add the children to the checked list array
    setCheckedList((prevState) => [...prevState, e.target.checked && children]);
    //add a new entry to the checkd all array
    setcheckAll((prevState) => [...prevState, e.target.value]);
  };

  return (
    //These are the parent components that will be rendered to the screen
    <div className="flex flex-col justify-start items-start bg-gray-200">
      <Checkbox
        onChange={onCheckAllChange}
        checked={checkAll[0]}
        tabindex={props.key}
        {...props}
      >
        {" " + props.title}
      </Checkbox>
      {display
        ? display.map((item, index) => {
            //i put item in a const so that I can chagne its value
            let itemTemp = null;
            if (Array.isArray(item)) {
              return;
            }
            itemTemp = item.child;
            console.log(item);
            return (
              <div>
                <Checkbox
                  onChange={onCheckAllChange}
                  checked={checkAll[index]}
                  tabindex={itemTemp.key}
                  {...props}
                >
                  {" " + itemTemp.title}
                </Checkbox>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Node;

/*
    GrandparentHandler handles the creation of the Parent node (Checkbox)
    and the creation of its children (Branch)
  */
// const makeGrandparentHandler = (key, checkAll, title, children) => {
//   const childenToString = children.map(({ title }) => title);
//   return (
//     <div className="flex flex-col justify-start items-start bg-gray-200 px-2">
//       <Checkbox
//         indeterminate={indeterminate}
//         onChange={(e) => onCheckAllChange(e)}
//         checked={checkAll}
//         tabindex={key}
//         {...props}
//       >
//         {" " + title}
//       </Checkbox>
//       {/* <div className="flex flex-col justify-start items-start px-5">
//         <Branch
//           defaultOptions={childenToString}
//           onChange={change}
//           checkedList={checkedList}
//         />
//       </div> */}
//     </div>
//   );
// };

//ConsoleLog Stuff
//console.log(checkedList);

//If the node has children we will display its children in the Branch Component

// let branch = [];
// if (display) {
//   //console.log(display);
//   const branchData = [];
//   display.forEach((element, index) => {
//     if(element.parent){
//       if(element.parent !== display[index-1].parent){

//       }
//     }
//     // if (Array.isArray(element)) {
//     //   branch.push(
//     //     makeGrandparentHandler(
//     //       parents[parentCounter].key,
//     //       checkAll,
//     //       parents[parentCounter].title,
//     //       element,
//     //       onCheckAllChange,
//     //       onChange
//     //     )
//     //   );
//     //   parentCounter++;
//     // } else {
//     branchData.push(element.title);
//     //}
//   });
//   branch.push(
//     <div className="flex flex-col justify-start items-start px-2">
//       <Branch
//         defaultOptions={branchData}
//         onChange={onChange}
//         checkedList={checkedList}
//       />
//     </div>
//   );
// }

let branch = null;
if (display) {
  const leaf = [];
  const branch = [];
  branch = display.map((item) => {
    //any of the children that haven't got children will be rendered differently
    const conditional = null;
    if (Array.isArray(item)) {
      branch.push(item);
      conditional = (
        <Branch
          defaultOptions={display}
          onChange={onChange}
          title={item}
          //checkedList={checkedList}
        />
      );
    } else {
      leaf.push(item);
    }
    return null;
  });
}

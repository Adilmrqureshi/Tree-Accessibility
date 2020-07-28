import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import Branch from "./branch";

//Here the Nodes are created using Antd Checkbox components which have keyboard accessibility features
const Node = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setcheckAll] = useState(false);
  const [display, setDisplay] = useState([]);
  const [parents, setParents] = useState([]);

  /*
    useEffect transforms the array of children nodes by taking out the title props
    and creating an array of strings from the titles
    display and setDisplay are utilized here
  */
  useEffect(() => {
    let displayItems = null;
    if (props.data.children) {
      displayItems = childHandler(props.data.children);
      //displayTitles = props.data.children.map(({ title }) => title);
    }
    //console.log(displayItems, "Display Items");
    setDisplay(displayItems);
  }, []);

  //This function will take all of the element and seperate them into elements that have children and elements that don't
  const childHandler = (data) => {
    const childrenArray = [];
    const parentArray = [];
    data.forEach((element) => {
      if (element.children) {
        parentArray.push(element);
        childrenArray.push(childHandler(element.children));
      } else {
        childrenArray.push(element);
      }
    });
    setParents(parentArray);
    return childrenArray;
  };

  /*
    GrandparentHandler handles the creation of the Parent node (Checkbox)
    and the creation of its children (Branch)
  */
  const makeGrandparentHandler = (key, checkAll, title, children) => {
    console.log(typeof key, "key");
    // console.log(checkAll, "checkAll");
    // console.log(title, "title");
    // console.log(children, "children");
    // console.log(indeterminate, "indeterminate");
    const childenToString = children.map(({ title }) => title);
    return (
      <div className="flex flex-col justify-start items-start bg-gray-200 px-2">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          tabindex={key}
          {...props}
        >
          {" " + title}
        </Checkbox>
        <div className="flex flex-col justify-start items-start px-5">
          <Branch
            defaultOptions={childenToString}
            onChange={onChange}
            checkedList={checkedList}
          />
        </div>
      </div>
    );
  };

  //This is the function for the parent components, It gives the functionality to check all children
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? display : []);
    setIndeterminate(false);
    setcheckAll(e.target.checked);
  };
  //onChange allows children nodes to be individually ticked and can also tick parent if all chidren are ticked.
  const onChange = (checkedList) => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < display.length
    );
    setcheckAll(checkedList.length === display.length);
  };

  //If the node has children we will display its children in the Branch Component

  let branch = [];
  if (display) {
    const branchData = [];
    let parentCounter = 0;
    display.forEach((element) => {
      if (Array.isArray(element)) {
        branch.push(
          makeGrandparentHandler(
            parents[parentCounter].key,
            checkAll,
            parents[parentCounter].title,
            element
          )
        );
        parentCounter++;
      } else {
        branchData.push(element.title);
      }
      // console.log(branchData, "Branch Data");
      // console.log(checkedList, "checkedList");
    });
    branch.push(
      <div className="flex flex-col justify-start items-start px-2">
        <Branch
          defaultOptions={branchData}
          onChange={onChange}
          checkedList={checkedList}
        />
      </div>
    );
  }

  return (
    //These are the parent components that will be rendered to the screen
    <div className="flex flex-col justify-start items-start bg-gray-200">
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
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

// const createChildren = (children) => {
//   let hasChildren = false;
//   let renderComponent = null;
//   for (let child in children) {
//     if (!child.children) {
//       continue;
//     } else {
//       hasChildren = true;
//       break;
//     }
//   }
//   if (hasChildren) {
//   } else {
//   }
// };

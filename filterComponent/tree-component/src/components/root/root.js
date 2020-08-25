import React, { useState } from "react";
import Node from "../node/node";

const Root = (props) => {
  const [checked, setChecked] = useState([]);
  const { data } = props;

  /*onChildHandler function takes data, value and check
   *It will return a null value if the given node as no children
   *However, if the node has children nodes, it loops through those children
   *and recursively calls the function for each one, repeating the process.
   */
  /** Function has a second feature which allows for
   * unticking of parent component also unticking children components
   */

  const onChildHandler = (data, value, check) => {
    //if the component has no children then it returns
    const children = data.children;
    if (!children) return;
    else {
      const arrayToReturn = [];
      //this checked whether event.target.checked is true which means that the use checked a box
      if (value) {
        for (let child in children) {
          const helper = children[child];
          if (helper.children) {
            //this is a recursive call which allows this solution to support an infinite amount of nested children
            arrayToReturn.push(onChildHandler(helper.children, value, check));
          } else {
            //If this is component
            if (!check.find((item) => item === helper.key)) {
              arrayToReturn.push(helper.key);
            }
          }
        }
      } else {
        const arrayToReturn = check;
        children.forEach((element) => {
          const keyToRemove = element.key;
          const indexOfKey = arrayToReturn.find((key) => key === keyToRemove);
          arrayToReturn.splice(indexOfKey, 1);
        });
      }
      return arrayToReturn;
    }
  };

  //OnChangeHandler is adding and removing items from the 'checked' Array
  const onChangeHandler = (event, index, revelantData) => {
    const checkedClone = [...checked];
    const indexLastDigit = index.split("")[index.length - 1];
    let shouldUpdate = checkedClone.findIndex((item) => item === index);
    if (event.target.checked) {
      const arrayFromChildren = onChildHandler(
        revelantData[indexLastDigit],
        event.target.checked,
        checkedClone
      );
      checkedClone.push(index);
      for (let key in arrayFromChildren) {
        checkedClone.push(arrayFromChildren[key]);
      }
    } else {
      checkedClone.splice(shouldUpdate, 1);
      onChildHandler(
        revelantData[indexLastDigit],
        event.target.checked,
        checkedClone
      );
    }
    setChecked(checkedClone);
  };

  return (
    //Main return method for root
    //method checks dataItem for if they have children and if they do then map through the children and render them.
    //tailwind also used to create max width, padding and margin
    <div className="max-w-sm m-1 p-1">
      {data.map((dataItem) => {
        let family = null;
        if (dataItem.children) {
          family = dataItem.children.map((item) => {
            const arrayLength = item.key.length;
            return (
              //Node component used to render children
              <Node
                onChange={(event) =>
                  onChangeHandler(event, item.key, dataItem.children)
                }
                checked={checked.find((check) => check === item.key)}
                title={item.title}
                nodeKey={item.key[arrayLength]}
                key={item.key}
              />
            );
          });
        }
        return (
          //Here, parent components are rendered using Node component
          // TailwindCSS used to implement flex and arrange nodes vertically
          <div
            key={dataItem.key}
            className="flex flex-col justify-start items-start bg-gray-200 tree"
          >
            <Node
              onChange={(event) => onChangeHandler(event, dataItem.key, data)}
              nodeKey={dataItem.key}
              title={dataItem.title}
              checked={checked.find((check) => check === dataItem.key)}
            />
            {/* TailwindCSS used here to indent children nodes */}
            <div className="flex flex-col justify-start items-start px-5">
              {family}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Root;

import React, { useState } from "react";
import Node from "./node";
const Root = () => {
  //useState filled with practice Data, includes Children
  const [data] = useState([
    {
      title: "George",
      key: "0",
      children: [
        { title: "Bongiyangwa", key: "0-0" },
        { title: "Alom Geer", key: "0-1" },
        { title: "Qureshi", key: "0-2" },
      ],
    },
    {
      title: "Mamunur",
      key: "1",
      children: [
        { title: "Bongiyangwa", key: "1-0" },
        { title: "Alom Geer", key: "1-1" },
        { title: "Qureshi", key: "1-2" },
      ],
    },
    { title: "Michael", key: "2" },
    { title: "Bradley Cooper", key: "3" },
    { title: "Priya", key: "4" },
    { title: "Annie", key: "5" },
    { title: "Random", key: "6" },
    { title: "Geezer", key: "7" },
  ]);
  const [checked, setChecked] = useState([]);

  //OnChangeHandler is adding and removing items from the 'checked' Array
  const onChangeHandler = (event, index) => {
    const checkedClone = [...checked];
    let shouldUpdate = null;
    shouldUpdate = checked.findIndex((item) => item === index);
    console.log(shouldUpdate);
    console.log(event.target.checked);
    if (event.target.checked) {
      checkedClone.push(index);
      console.log(checkedClone);
    } else {
      checkedClone.splice(shouldUpdate, 1);
      console.log(checkedClone);
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
            const keyArray = item.key;
            const arrayLength = keyArray.length;
            return (
              //Node component used to render children
              <Node
                onChange={(event) => onChangeHandler(event, keyArray)}
                checked={checked.find((check) => check === item.key)}
                title={item.title}
                nodeKey={keyArray[arrayLength]}
                key={item.key}
              />
            );
          });
        }
        return (
          //Here, parent components are rendered using Node component
          // TailwindCSS used to implement flex and rrange nodes vertically
          <div
            key={dataItem.key}
            className="flex flex-col justify-start items-start bg-gray-200"
          >
            <Node
              onChange={(event) => onChangeHandler(event, dataItem.key)}
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

import React, { useState } from "react";
import Node from "./node";

const Root = () => {
  const [data, setData] = useState([
    {
      title: "George",
      key: "0",
      children: [
        { title: "Bongiyangwa", key: "0-0" },
        { title: "Alom Geer", key: "0-1" },
        { title: "Qureshi", key: "0-2" },
      ],
    },
    { title: "Mamunur", key: "1" },
    { title: "Michael", key: "2" },
    { title: "Bradley Cooper", key: "3" },
    { title: "Priya", key: "4" },
    { title: "Annie", key: "5" },
    { title: "Random", key: "6" },
    { title: "Geezer", key: "7" },
  ]);
  const [checked, setChecked] = useState([]);

  const onChangeHandler = (event, datata, index, child) => {
    const arrayClone = [...datata];
    const checkedClone = [...checked];
    console.log(index);
    let shouldUpdate = null;
    console.log(event.target.checked);
    //let newIndex = index
    // if (child) {
    //   newIndex = index[index.length - 1]; //This should be correct ;
    //   console.log(newIndex);
    // }
    shouldUpdate = checked.findIndex((item) => item === index);
    console.log(shouldUpdate);
    if (event.target.checked && shouldUpdate >= 0) {
      checkedClone.splice(shouldUpdate, 1);
      console.log(index);
    } else {
      checkedClone.push(index);
      console.log(index, checkedClone);
    }
    // let elementToUpdate = arrayClone[index];
    // console.log(elementToUpdate);
    // elementToUpdate = { ...elementToUpdate, checked: event.target.checked };
    // console.log(elementToUpdate);
    // arrayClone.splice(index, 1, elementToUpdate);
    //console.log(arrayClone);
    setChecked(checkedClone);
  };

  return (
    <div className="max-w-sm m-1 p-1">
      {data.map((dataItem) => {
        let family = null;
        if (dataItem.children) {
          family = dataItem.children.map((item) => {
            const keyArray = item.key;
            const arrayLength = keyArray.length;
            console.log(checked.findIndex((check) => check === item.key) < 0);
            return (
              <Node
                onChange={(event) =>
                  onChangeHandler(event, dataItem.children, keyArray)
                }
                checked={checked.findIndex((check) => check === item.key) < 0}
                title={item.title}
                nodeKey={keyArray[arrayLength]}
                key={item.key}
              />
            );
          });
        }
        return (
          <div
            key={dataItem.key}
            className="flex flex-col justify-start items-start bg-gray-200"
          >
            <Node
              onChange={(event) => onChangeHandler(event, data, dataItem.key)}
              nodeKey={dataItem.key}
              title={dataItem.title}
              checked={checked.findIndex((check) => check === dataItem.key) < 0}
            />
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

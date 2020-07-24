import React, { useState } from "react";
import Branch from "./branch";
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
    let newIndex = index;
    // if (child) {
    //   newIndex = index[index.length - 1]; //This should be correct ;
    //   console.log(newIndex);
    // }
    let shouldUpdate = arrayClone.find((item) => checked.key === newIndex);
    console.log(shouldUpdate);
    let elementToUpdate = arrayClone[newIndex];
    console.log(elementToUpdate);
    elementToUpdate = { ...elementToUpdate, checked: event.target.checked };
    console.log(elementToUpdate);
    arrayClone.splice(newIndex, 1, elementToUpdate);
    console.log(arrayClone);
    if (child) {
      // const finalData = [...data];

      setData(arrayClone);
    } else {
      setData(arrayClone);
    }
  };

  return (
    <div className="Root">
      {data.map((dataItem) => {
        let family = null;
        if (dataItem.children) {
          family = dataItem.children.map((item) => {
            const keyArray = item.key;
            const arrayLength = keyArray.length;
            return (
              <Node
                onChange={(event) =>
                  onChangeHandler(event, dataItem.children, keyArray, true)
                }
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
              onChange={(event) =>
                onChangeHandler(event, data, dataItem.key, false)
              }
              nodeKey={dataItem.key}
              title={dataItem.title}
              checked={dataItem.checked}
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

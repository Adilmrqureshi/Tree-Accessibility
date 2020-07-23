import React, { useState } from "react";
import Node from "./node";

const Filter = (props) => {
  const [data, setData] = useState([
    { title: "George", checked: false, key: 0 },
    { title: "Mamunur", checked: false, key: 1 },
  ]);

  const onChangeHandler = (event, index) => {
    const arrayClone = [...data];
    let elementToUpdate = arrayClone[index];
    elementToUpdate = { ...elementToUpdate, checked: event.target.checked };
    arrayClone.splice(index, 1, elementToUpdate);
    setData(arrayClone);
  };

  return (
    <div>
      {data.map((item, index) => {
        return (
          <Node
            key={item.key}
            title={item.title}
            checked={data[index].checked}
            onChange={(event) => onChangeHandler(event, index)}
          />
        );
      })}
    </div>
  );
};

export default Filter;

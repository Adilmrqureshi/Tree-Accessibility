import React, { useState } from "react";
import Node from "./node";

const filter = (props) => {
  const [data, setData] = useState([{ title: "George", checked: false , key=0}, { title: "Mamunur",checked=false, key=1 }]);

  const onChangeHandler = (event, index)=>{
      setData([]);
  }
  return (
    <div>
      {Object.keys(data).map((item,index) => (
        <Node key={item.key} checked={data[index].checked} onChange={onChangeHandler(event, index)}/>
      ))}
    </div>
  );
};

export default filter;

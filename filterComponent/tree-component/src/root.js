import React, { useState } from "react";
import Filter from "./branch";

const Root = () => {
  const [data, setData] = useState([]);

  return (
    <div className="Root">
      {data.map((dataItem) => (
        <React.Fragment>
          <p>{dataItem.title}</p>
          <Filter data={data} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Root;

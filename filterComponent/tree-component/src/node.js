import React from "react";
import { Checkbox } from "antd";

const node = ({ checked, title, key }) => {
  const onChangeHandler = (event) => {};

  return (
    <Checkbox
      onChange={(e) => onChange(e, item.key)}
      checked={item.checked}
      key={item.key}
      tabindex={item.key}
      {...props}
    >
      {item.title}
    </Checkbox>
  );
};

export default node;

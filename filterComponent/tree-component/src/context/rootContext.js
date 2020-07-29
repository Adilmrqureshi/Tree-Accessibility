import React, { useState } from "react";

export const RootContext = React.createContext({
  checkAll: false,
  onCheck: () => {},
});

const RootProvider = (props) => {
  const [checkAll, setCheckAll] = useState(false);

  const onCheckAllHandler = (shouldCheck) => {
    setCheckAll((prevState) => shouldCheck);
  };
  return (
    <RootContext.Provider value={{ setCheck: onCheckAllHandler, checkAll }}>
      {props.children}
    </RootContext.Provider>
  );
};

export default RootProvider;

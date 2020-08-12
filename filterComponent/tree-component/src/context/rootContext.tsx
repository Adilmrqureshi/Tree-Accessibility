import React from "react";

type ContextProps = {
  checkAll?: boolean;
  expandedKeys?: Check[];
  checkedKeys?: Check[];
  onChecked?: (payload: { key: string; checked: boolean }) => void;
};

interface Props {
  checkAll?: boolean;
  expandedKeys?: Check[];
  checkedKeys?: Check[];
  onChecked?: (payload: { key: string; checked: boolean }) => void;
}

export const RootContext = React.createContext<Partial<ContextProps>>({});

const RootProvider: React.FC<Props> = (props) => {
  return (
    <RootContext.Provider
      value={{
        onChecked: props.onChecked,
        checkedKeys: props.checkedKeys,
      }}
    >
      {props.children}
    </RootContext.Provider>
  );
};

export default RootProvider;

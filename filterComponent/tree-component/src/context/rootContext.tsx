import React from "react";

type ContextProps = {
  onExpand?: (key: string[]) => void;
  expandedKeys?: string[];
  checkedKeys?: Check[];
  onChecked?: (payload: Check) => void;
};

interface Props {
  onExpand?: (key: string[]) => void;
  expandedKeys?: string[];
  checkedKeys?: Check[];
  onChecked?: (payload: Check) => void;
}

export const RootContext = React.createContext<Partial<ContextProps>>({});

const RootProvider: React.FC<Props> = (props) => {
  return (
    <RootContext.Provider
      value={{
        onChecked: props.onChecked,
        onExpand: props.onExpand,
        checkedKeys: props.checkedKeys,
        expandedKeys: props.expandedKeys,
      }}
    >
      {props.children}
    </RootContext.Provider>
  );
};

export default RootProvider;

import React, { useState } from "react";
import "./App.css";
//import Root from "./root/root";
import Root from "./components/root/nRoot";
import { CheckElement } from "./interface";
//App.js implements Root
//Move state here

const data: CheckElement[] = [
  {
    title: "George",
    key: "0",
    children: [
      {
        title: "Bongiyangwa",
        key: "0-0",
        children: [{ title: "Grandchild", key: "0-0-1" }],
      },
      { title: "Alom Geer", key: "0-1" },
      { title: "Qureshi", key: "0-2" },
    ],
  },
  {
    title: "Mamunur",
    key: "1",
    children: [
      {
        title: "Bongiyangwa",
        key: "1-0",
        children: [{ title: "Grandchild2", key: "1-0-0" }],
      },
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
];

const App = () => {
  //useState filled with practice Data, includes Children
  const [checkedKeys, setCheckedKeys] = useState<Check[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Check[]>([]);
  return (
    <div className="App">
      <Root
        data={data}
        checkedKeys={checkedKeys}
        onChecked={(payload) => {
          //payload : {checked: boolean, key: string}
          const checkedClone = [...checkedKeys];
          if (payload.checked) {
            const elementToCheck = data.find(
              (element) => element.key === payload.key
            );
            if (elementToCheck !== undefined) {
              checkedClone.push({ key: elementToCheck.key, checked: true });
              setCheckedKeys(checkedClone);
            }
          } else {
            const finalArray = checkedClone.filter(
              (element) => element.key !== payload.key
            );
            setCheckedKeys(finalArray);
          }
        }}
      />
    </div>
  );
};

export default App;
//

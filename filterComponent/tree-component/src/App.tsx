import React, { useState, useEffect } from "react";
import "./App.css";
//import Root from "./root/root";
import Root from "./components/root/nRoot";
import { CheckElement } from "./interface";
import RootContext from "./context/rootContext";
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
  //const [expandedKeys, setExpandedKeys] = useState<Check[]>([]);

  useEffect(() => {
    let checkedClone: Check[] = checkAllChildren(data, false);
    setCheckedKeys(checkedClone);
  }, []);

  function checkAllChildren(data: CheckElement[] | Check[], check: boolean) {
    let arraytoReturn: any[] = [];
    data.forEach((element: CheckElement | Check) => {
      if (element.children !== undefined) {
        arraytoReturn.push({
          key: element.key,
          checked: check,
          children: element.children,
        });
        arraytoReturn = arraytoReturn.concat(
          checkAllChildren(element.children, check)
        );
      } else {
        arraytoReturn.push({ key: element.key, checked: check });
      }
    });
    return arraytoReturn;
  }

  function onCheckHandler(payload: { checked: boolean; key: string }) {
    //payload : {checked: boolean, key: string}
    let checkedClone: Check[] = [...checkedKeys];
    if (payload.checked) {
      if (payload.key !== undefined) {
        const elementToCheck = checkedClone.find(
          (element) => element.key === payload.key
        );
        const IndexToCheck = checkedClone.findIndex(
          (element) => element.key === payload.key
        );
        if (elementToCheck !== undefined)
          if (elementToCheck.children) {
            // This method will return all of the children of an element in a nested array
            const flattened = checkAllChildren(elementToCheck.children, true);
            flattened.forEach((child) => {
              const foundEle = checkedClone.findIndex(
                (ele) => ele.key === child.key
              );
              if (foundEle > -1) {
                checkedClone[foundEle] = {
                  ...checkedClone[foundEle],
                  checked: true,
                };
              }
            });
            // Change the parent element to true
            checkedClone[IndexToCheck] = {
              ...elementToCheck,
              checked: true,
              children: elementToCheck.children,
            };
          } else {
            checkedClone[IndexToCheck] = { ...elementToCheck, checked: true };
          }
        setCheckedKeys(checkedClone);
      }
    } else {
      checkedClone = [...checkedKeys];
      const finalArray = checkedClone.filter(
        (element) => element.key !== payload.key
      );
      setCheckedKeys(finalArray);
    }
  }

  return (
    <RootContext checkedKeys={checkedKeys} onChecked={onCheckHandler}>
      <div className="App">
        <Root data={data} checkedKeys={checkedKeys} />
      </div>
    </RootContext>
  );
};

export default App;

import React, { useState, useEffect, useCallback } from "react";
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
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    let checkedClone: Check[] = checkAllChildren(data, false);
    setCheckedKeys(checkedClone);
  }, []);

  const checkAllChildren = useCallback(
    (data: CheckElement[] | Check[], check: boolean) => {
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
    },
    []
  );

  const splitKey = (key: string) => {
    let parentKey: string[] | string = key.split("");
    parentKey = parentKey.slice(0, key.length - 2);
    return (parentKey = parentKey.join(""));
  };

  // If the children are unchecked then uncheck the children
  const checkAllSiblings = useCallback(
    (payload: Check): any => {
      const checkedClone: Check[] = [...checkedKeys];
      let arrayToReturn: Check[] = [];
      const { key, checked } = payload;
      // The base case: If the key is of length 1 then we have reach the highest level in the tree and there is no more need for recursion
      if (key.length <= 1) return;
      // Might need to check the top parent element in this block if needed
      else {
        // every digit in the key apart from the last two gives information about the parents
        let parentKey: string[] | string = splitKey(key);
        // if it is not a top most parent element then run this function again until it reached that level
        if (parentKey.length > 1) {
          arrayToReturn = arrayToReturn.concat(
            checkAllSiblings({ key: parentKey, checked })
          );
        }
        // I then check if the siblings are checked and if so then check the parent
        const element = checkedClone.find(
          (element) => element.key === parentKey
        );
        const areSiblingsChecked: Check[] = [];
        // All of the siblings of the current element
        const siblings: Check[] = checkedClone.filter((sibling) => {
          let siblingKey: string[] | string = splitKey(sibling.key);
          return (
            sibling.key.length === key.length &&
            siblingKey === parentKey &&
            sibling.key !== key
          );
        });
        siblings.push({ key: key, checked: checked });
        console.log(siblings, "total siblings");
        siblings.forEach((sibling) => {
          if (sibling.checked) areSiblingsChecked.push(sibling);
        });
        console.log(areSiblingsChecked, "are siblings checked");
        if (areSiblingsChecked.length === siblings.length) {
          const returnEle = { ...element, checked: true, key: parentKey };
          arrayToReturn.push(returnEle);
          return arrayToReturn;
        } else {
          const returnEle = { ...element, checked: false, key: parentKey };
          arrayToReturn.push(returnEle);
          return arrayToReturn;
        }
      }
    },
    [checkedKeys]
  );

  const onCheckHandler = useCallback(
    (payload: Check) => {
      //payload : {checked: boolean, key: string}
      let checkedClone: Check[] = [...checkedKeys];
      const elementToCheck = checkedClone.find(
        (element) => element.key === payload.key
      );
      const IndexToCheck = checkedClone.findIndex(
        (element) => element.key === payload.key
      );
      if (elementToCheck !== undefined)
        if (elementToCheck.children) {
          // This method will return all of the children of an element in a nested array
          const flattened = checkAllChildren(
            elementToCheck.children,
            payload.checked
          );
          flattened.forEach((child) => {
            const foundEle = checkedClone.findIndex(
              (ele) => ele.key === child.key
            );
            if (foundEle > -1) {
              checkedClone[foundEle] = {
                ...checkedClone[foundEle],
                checked: payload.checked,
              };
            }
          });
          // Change the parent element to true
          checkedClone[IndexToCheck] = {
            ...elementToCheck,
            checked: payload.checked,
            children: elementToCheck.children,
          };
        } else {
          checkedClone[IndexToCheck] = {
            ...elementToCheck,
            checked: payload.checked,
          };
        }
      setCheckedKeys(checkedClone);
      let siblings = checkAllSiblings(payload);
      if (siblings !== undefined) {
        siblings = siblings.filter(
          (ele: Check | undefined) => ele !== undefined
        );
        siblings.forEach((sibling: Check) => {
          const index = checkedClone.findIndex((check) => {
            return check.key === sibling.key;
          });
          checkedClone[index] = sibling;
        });
      }
      setCheckedKeys(checkedClone);
    },
    [checkAllChildren, checkAllSiblings, checkedKeys]
  );

  //expand handler
  const expandHandler = (key: string) => {
    const expandClone = [...expandedKeys];
    const shouldAdd = expandClone.findIndex((element) => element === key);
    if (shouldAdd > -1) {
      expandClone.splice(shouldAdd, 1);
    } else {
      expandClone.push(key);
    }
  };

  return (
    <RootContext
      checkedKeys={checkedKeys}
      onChecked={onCheckHandler}
      expandedKeys={expandedKeys}
      onExpand={expandHandler}
    >
      <Root data={data} />
    </RootContext>
  );
};

export default App;

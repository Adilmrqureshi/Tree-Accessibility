import React, { useEffect, useCallback } from "react";

const Tree = (props) => {
  const dataToReturn = [];

  useEffect(() => {
    dataToReturn.unshift(childHandler(props.data));
  }, []);

  const childHandler = useCallback((data) => {
    const childrenArray = [];
    data.forEach((element) => {
      if (element.children) {
        childrenArray.push(childHandler(element.children, element));
      } else {
        childrenArray.push(element);
      }
    });
    return childrenArray;
  }, []);

  return props.children;
};

export default Tree;

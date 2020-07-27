import React, { useState, useEffect } from "react";

const useChild = (display) => {
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    if (display) {
      display.forEach((element) => {
        console.log(element);
      });
    }
  }, []);

  return display;
};

export default useChild;

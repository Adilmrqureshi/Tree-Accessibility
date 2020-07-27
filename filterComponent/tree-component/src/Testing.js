import React from "react";

const Testing = (hello) => {
  if (hello > 10) {
    return <div>Done</div>;
  } else {
    return (
      <div>
        Hi
        <Testing hello={hello + 1} />
      </div>
    );
  }
};

export default Testing;

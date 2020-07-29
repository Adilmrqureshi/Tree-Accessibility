import React from "react";
import Branch from "../branch/branch";

export const displayItems = (props) => {
  if (props.data) {
    props.data.children.map((item) => {
      return (
        <div className="flex flex-col justify-start items-start">
          <Branch defaultOptions={props.data} />
        </div>
      );
    });
  }
};

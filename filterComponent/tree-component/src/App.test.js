import React, { createFactory } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { toBeChecked } from "@testing-library/jest-dom";
import App from "./App";

describe("basic functionality", () => {
  let array = [];
  beforeEach(() => {
    const { queryAllByRole } = render(<App />);
    array = queryAllByRole("checkbox");
  });

  test("all check boxes should be in the document", () => {
    expect(
      array.forEach((element) => {
        expect(element).toBeInTheDocument();
      })
    );
  });
  test("All checkboxes should be checked when clicked", () => {
    expect(
      array.forEach((element) => {
        fireEvent.change(element, { target: { checked: true } });
        expect(element).toBeChecked();
      })
    );
  });
});

describe("Basic check logic", () => {
  const checkbox = [];
  const expand = [];
  beforeEach(() => {
    const { queryAllByRole } = render(<App />);
    checkbox = queryAllByRole("checkbox");
    expand = queryAllByRole("checkbox");
  });
  test("If a checkbox has no children it should be checked", ()=>{
    expand.forEach((element)=>{
      const {queryByRole} = element;
      if(queryByRole('checkbox')){
        fireEvent.change(queryByRole('checkbox'), {target: {ce}})
      }
    })
  })
});

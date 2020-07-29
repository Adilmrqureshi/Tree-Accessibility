import React, { useState } from "react";
import "./App.css";
//import Root from "./root/root";
import Root from "./components/root/nRoot";
import Testing from "./Testing";

//App.js implements Root
//Move state here

function App() {
  //useState filled with practice Data, includes Children
  const [data] = useState([
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
  ]);
  return (
    <div className="App">
      <Root data={data} />
    </div>
  );
}

export default App;
//

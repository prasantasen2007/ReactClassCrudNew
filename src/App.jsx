import { useState } from "react";
import { DynamicTable } from "./components/DynamicTable";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <DynamicTable />
      <ToastContainer />
    </>
  );
}

export default App;

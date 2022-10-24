import React, { memo } from "react";
import ReactDOM from "react-dom";
import GlobalDatePicker from "./components/GlobalDatePicker";
import GlobalSelect from "./components/GlobalSelect";
import GlobalDropDown from "./components/GlobalDropDown";

const cells_root = document.getElementById("cells_root");

const GlobalCells = () => {
  return ReactDOM.createPortal(
    <>
      <GlobalDatePicker />
      <GlobalSelect />
      {/* <GlobalDropDown /> */}
    </>,
    cells_root
  );
};

export default memo(GlobalCells);

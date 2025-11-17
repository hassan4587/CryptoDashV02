import React from "react";
import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

function Spinner({ color = "grey", size = "150" }) {
  return (
    <div>
      <BarLoader
        color={color}
        size={size}
        cssOverride={override}
        aria-label="Loading..."
      />
    </div>
  );
}

export default Spinner;

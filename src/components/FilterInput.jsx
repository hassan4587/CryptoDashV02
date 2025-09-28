import React from "react";

function FilterInput({ filter, onFilterCahnge }) {
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        placeholder="Filter coins by Symbol or Name"
        onChange={(e) => {
          onFilterCahnge(e.target.value);
        }}
      />
    </div>
  );
}

export default FilterInput;

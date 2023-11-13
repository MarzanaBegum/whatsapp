import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="bg-search-input-container-background p-3 h-14 flex items-center gap-3">
      <div className="bg-panel-header-background w-full px-3 py-1 flex-grow gap-3 rounded-md flex items-center">
        <BiSearchAlt2 className="text-lg text-panel-header-icon cursor-pointer" />
        <div className="w-full">
          <input
            type="text"
            name="search"
            className="bg-transparent focus:outline-none w-full text-white text-sm"
            placeholder="Search or start a chat"
          />
        </div>
      </div>
      <div>
        <BsFilter className="text-lg text-panel-header-icon cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchBar;

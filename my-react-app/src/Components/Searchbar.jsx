import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <input
          type="search"
          placeholder="Recent transactions.."
          className="py-2.5 pl-3 pr-10 rounded-full outline-0 border border-black mt-2" // Adjust the width here (e.g., w-64 for 16rem)
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <FontAwesomeIcon icon={faSearch} className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
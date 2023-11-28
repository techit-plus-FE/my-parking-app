import React, { useState } from "react";
import IconSearch from "../../assets/icon/icon-search.svg?react";

const SearchHeader = () => {
  const [isClicked, setIsClicked] = useState(true);

  return isClicked ? (
    <header>
      <IconSearch
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      />
    </header>
  ) : (
    <header>
      <input type="text" />
      <IconSearch
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      />
    </header>
  );
};

export default SearchHeader;

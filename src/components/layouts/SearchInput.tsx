import React, { ChangeEvent, useState, forwardRef } from "react";

interface SearchInputProps {
  onKeywordChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  searchInfo: MapInfoType;
  setSearchInfo: (searchInfo: MapInfoType) => void;
}

const SearchInput = 
forwardRef(function SearchInput(props: SearchInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  const { onKeywordChange,
    onKeyDown,
    onClick,
    searchInfo,
    setSearchInfo} = props;
  
  const [period] = useState(['', ''])
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e),
    setSearchInfo({...searchInfo, period : period})
  }

  return (
    <div>
    <input
        type="text"
        onChange={onKeywordChange}
        onKeyDown={onKeyDown}
        ref = {ref}
      />
      <input type="date"
      onChange = {(e)=> {
        period[0] = e.target.value
      }}/>
      <input type="date"
      onChange = {(e)=> {
        period[1] = e.target.value
      }}/>
      <button onClick={handleClick}>검색하기</button>
    </div>
  );
});

export default SearchInput;

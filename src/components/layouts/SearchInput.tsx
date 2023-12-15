import React, { ChangeEvent, useEffect, useState, forwardRef, MutableRefObject } from "react";

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
  
  const [period, setPeriod] = useState(['', ''])
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e),
    setSearchInfo({...searchInfo, period : period})
    console.log(period)
  }

  return (
    <div>
    <input
        type="text"
        onChange={onKeywordChange}
        onKeyDown={onKeyDown}
        // value={value || ""}
        ref = {ref}
      />
      <input type="date"
      onChange = {(e)=> {
        // const formattedDate = (originalDate: Date)=>`${originalDate.getFullYear()}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getDate().toString().padStart(2, '0')}`
        // const period_start = formattedDate(new Date(e.target.value))
        // const period_end = formattedDate(new Date(e.target.value))
        period[0] = e.target.value
      }}/>
      <input type="date"
      onChange = {(e)=> {
        // const formattedDate = (originalDate: Date)=>`${originalDate.getFullYear()}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getDate().toString().padStart(2, '0')}`
        // const period_start = formattedDate(new Date(e.target.value))
        // const period_end = formattedDate(new Date(e.target.value))
        period[1] = e.target.value
      }}/>
      <button onClick={handleClick}>검색하기</button>
    </div>
  );
});

export default SearchInput;

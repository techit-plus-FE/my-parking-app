import React, { ChangeEvent, useEffect } from "react";

interface SearchInputProps {
  onKeywordChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  searchInfo: MapInfoType;
  setSearchInfo: (searchInfo: MapInfoType) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onKeywordChange,
  onKeyDown,
  value,
  onClick,
  searchInfo,
  setSearchInfo
}) => {


  return (
    <div>
      <input
        type="text"
        onChange={onKeywordChange}
        onKeyDown={onKeyDown}
        value={value || ""}
      />
      <input type="date"
      onChange = {(e)=> {
        const formattedDate = (originalDate: Date)=>`${originalDate.getFullYear()}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getDate().toString().padStart(2, '0')}`
        const period_start = formattedDate(new Date(e.target.value))
        const period_end = formattedDate(new Date(e.target.value))
        console.log(period_start, period_end)
        setSearchInfo({...searchInfo, period : [period_start, period_end]});
      }}/>
      <button onClick={onClick}>검색하기</button>
    </div>
  );
};

export default SearchInput;

import React, { ChangeEvent } from "react";

interface SearchInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  onKeyDown,
  value,
  onClick,
}) => {
  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value || ""}
      />
      <input type="date" />
      <button onClick={onClick}>검색하기</button>
    </div>
  );
};

export default SearchInput;

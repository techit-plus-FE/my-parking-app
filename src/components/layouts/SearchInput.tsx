import React, { useState, forwardRef } from "react";
import { Box, Input } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import SearchIcon from "@mui/icons-material/Search";

import MediaQueryMain from "../UI/MediaQueryMain";
import { CommonButton } from "../UI/CommonButton";

import classes from "./SearchInput.module.css";
interface SearchInputProps {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  searchInfo: MapInfoType;
  setSearchInfo: (searchInfo: MapInfoType) => void;
}

const SearchInput = forwardRef(function SearchInput(
  props: SearchInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const isMobile = MediaQueryMain();
  const { onKeyDown, handleSearch, searchInfo, setSearchInfo } = props;

  // const [period] = useState(["", ""]);
  const [period, setPeriod] = useState<DateRange<Dayjs>>([
    dayjs("2024-01-01"),
    dayjs("2024-01-02"),
  ]);

  const handleClick = () => {
    handleSearch();
    setSearchInfo({ ...searchInfo, period: period });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        gap: isMobile ? "30px" : "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          gap: isMobile ? "30px" : "50px",
        }}
      >
        <Input
          className={classes.searchInput}
          type="text"
          onKeyDown={onKeyDown}
          inputRef={ref}
          placeholder="찾을 주차장을 검색하세요."
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem component={"DateRangePicker"}>
            <DateRangePicker
              localeText={{ start: "시작일", end: "종료일" }}
              value={period}
              onChange={(period) => {
                setPeriod(period);
              }}
            />
          </DemoItem>
        </LocalizationProvider>
      </Box>
      {isMobile ? (
        <button onClick={handleClick} className={classes.searchBtn}>
          <SearchIcon />
        </button>
      ) : (
        <CommonButton text="검색하기" btnType={true} onClick={handleClick} />
      )}
    </Box>
  );
});

export default SearchInput;

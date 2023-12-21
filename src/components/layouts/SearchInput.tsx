import React, { useState, forwardRef } from "react";
import { Box, Input } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange} from "@mui/x-date-pickers-pro";
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
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
    dayjs("2023-12-01"),
    dayjs("2024-01-31"),
  ]);

  const [period, setPeriod] = useState<string[]>([
    "2023-12-01",  
    "2024-01-31"
  ]);

  const handleClick = () => {
    handleSearch();
    setSearchInfo({ ...searchInfo, period: period });
  };

  const handleDatePicking: (value: DateRange<Dayjs>) => void = (value) => {
    setDateRange(value)
    //period setting logic here
    if (value[0] === null) return
    if (value[1] === null) return
    setPeriod([value[0]?.format('YYYY-MM-DD'), value[1]?.format('YYYY-MM-DD')])
  }

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
            <DateRangePicker
              localeText={{ start: "시작일", end: "종료일" }}
              value={dateRange}
              onChange={(dateRange) => {
                handleDatePicking(dateRange)
              }}
            />
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

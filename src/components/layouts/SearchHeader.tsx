import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { useBoundStore } from "../../store";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";

const SearchHeader = () => {
  const isDark = useBoundStore((state) => state.isDark);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
      }}
    >
      <BottomNavigation
        sx={{
          justifyContent: "space-between",
          maxWidth: "var(--main-max-width)",
          borderBottom: isDark ? null : "1px solid var(--color-gray-300)",
          alignItems: "center",
        }}
      >
        <BottomNavigationAction
          onClick={() => navigate(-1)}
          icon={<ArrowBackIcon />}
          sx={{
            alignItems: "flex-start",
          }}
        />
        <SearchInput />
      </BottomNavigation>
    </Box>
  );
};

export default SearchHeader;

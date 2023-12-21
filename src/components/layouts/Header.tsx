import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useBoundStore } from "../../store";
import { useNavigate } from "react-router-dom";
import Toggle from "./Toggle";

const Header = () => {
  const isDark = useBoundStore((state) => state.isDark);
  const setIsDark = useBoundStore((state) => state.setIsDark);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuOptionClick = (option: string) => {
    // 예시: 각 메뉴 항목에 따른 동작 수행
    if (option === "option1") {
      // 메뉴 항목 1에 대한 동작 수행
    } else if (option === "option2") {
      // 메뉴 항목 2에 대한 동작 수행
    } else if (option === "option3") {
      setIsDark(isDark);
    }

    // 메뉴 닫기
    handleCloseMenu();
  };

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
        }}
      >
        <BottomNavigationAction
          onClick={() => navigate(-1)}
          icon={<ArrowBackIcon />}
          sx={{
            alignItems: "flex-start",
          }}
        />
        <BottomNavigationAction
          icon={<MoreVertIcon />}
          sx={{
            alignItems: "end",
          }}
          onClick={handleMenuClick}
        />
      </BottomNavigation>

      {/* 드롭다운 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleMenuOptionClick("option1")}>
          <Toggle />
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("option2")}>
          메뉴 항목 2
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("option3")}></MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;

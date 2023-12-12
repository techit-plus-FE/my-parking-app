import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import { useBoundStore } from "../../store";

const Header = () => {
  const isDark = useBoundStore((state) => state.isDark);
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
        />
      </BottomNavigation>
    </Box>
  );
};

export default Header;

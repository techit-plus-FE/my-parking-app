import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid var(--color-gray-400)",
      }}
    >
      <BottomNavigation
        sx={{
          justifyContent: "space-between",
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

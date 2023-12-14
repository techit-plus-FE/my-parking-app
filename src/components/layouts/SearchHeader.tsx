import Box from "@mui/material/Box";
import { useBoundStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useTheme } from "@emotion/react";

interface SearchHeaderProps {
  children?: ReactNode;
}
const SearchHeader: React.FC<SearchHeaderProps> = ({ children }) => {
  const theme = useTheme();

  const isDark = useBoundStore((state) => state.isDark);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        display: "flex",
        top: 0,
        zIndex: 1300,
        maxWidth: "var(--main-max-width)",
        borderBottom: isDark ? null : "1px solid var(--color-gray-300)",
        alignItems: "center",
        bgcolor: theme.palette.background.default,
        height: "50px",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default SearchHeader;

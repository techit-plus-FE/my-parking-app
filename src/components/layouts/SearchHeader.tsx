import Box from "@mui/material/Box";
import { useBoundStore } from "../../store";
import { ReactNode } from "react";
import { useTheme } from "@mui/material";

interface SearchHeaderProps {
  children?: ReactNode;
}
const SearchHeader: React.FC<SearchHeaderProps> = ({ children }) => {
  const theme = useTheme();

  const isDark = useBoundStore((state) => state.isDark);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 100,
        width: "100vw",
        borderBottom: isDark ? null : "1px solid var(--color-gray-300)",
        bgcolor: theme.palette.background.default,
        padding: "10px",
      }}
    >
      {children}
    </Box>
  );
};

export default SearchHeader;

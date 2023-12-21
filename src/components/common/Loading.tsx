import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
      }}
    >
      <CircularProgress size="180px" />
    </Box>
  );
};

export default Loading;

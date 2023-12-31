import useMediaQuery from "@mui/material/useMediaQuery";
import json2mq from "json2mq";
import { useTheme } from "@mui/material/styles";

const MediaQueryMain = () => {
  const theme = useTheme();
  const LargeScreen = useMediaQuery(
    json2mq({
      maxWidth: theme.breakpoints.values.lg,
    })
  );

  return LargeScreen;
};

export default MediaQueryMain;

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import json2mq from "json2mq";

const MediaQuery = () => {
  const theme = useTheme();
  const matches = useMediaQuery(
    json2mq({
      maxWidth: theme.breakpoints.values.sm,
    })
  );

  return matches;
};

export default MediaQuery;

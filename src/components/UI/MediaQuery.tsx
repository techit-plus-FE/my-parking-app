import React from "react";
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

  const mediumScreen = useMediaQuery(
    json2mq({
      minWidth: theme.breakpoints.values.sm + 1,
      maxWidth: theme.breakpoints.values.md - 1,
    })
  );

  return matches;
};

export default MediaQuery;

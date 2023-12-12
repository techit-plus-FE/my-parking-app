import useMediaQuery from "@mui/material/useMediaQuery";
import json2mq from "json2mq";

const MediaQueryMain = () => {
  const LargeWidth = "1400px";

  const LargeScreen = useMediaQuery(
    json2mq({
      maxWidth: LargeWidth,
    })
  );

  return LargeScreen;
};

export default MediaQueryMain;

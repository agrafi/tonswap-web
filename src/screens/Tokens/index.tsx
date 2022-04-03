import { Box, useMediaQuery } from "@mui/material";
import { Title } from "components";
import { useStyles } from "./styles";
import Mobile from "./Mobile";
import theme from "theme";
import Desktop from "./Desktop";
import Fade from "@mui/material/Fade";
import { useStore } from "store";
import { useEffect } from "react";

export const Tokens = () => {
  const classes = useStyles();
  const store = useStore();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    store.setToken(undefined);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fade in>
      <Box className={classes.root}>
        <Title>Select a token to trade</Title>
        <Box className={classes.lists}>
          {isMobile ? <Mobile /> : <Desktop />}
        </Box>
      </Box>
    </Fade>
  );
};

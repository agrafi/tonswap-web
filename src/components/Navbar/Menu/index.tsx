import { IconButton, useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import LogoWithText from "../LogoWithText";
import { useStyles } from "./style";
import NoToken from "./NoToken";
import SelectedToken from "./SelectedToken";
import WalletAddress from "./WalletAddress";

interface Props {
  open: boolean;
  hide: () => void;
}

function Menu({ open, hide }: Props) {
  const matches = useMediaQuery("(max-width:600px)");

  const classes = useStyles();
  const store = {} as any

  return (
    <Drawer anchor="left" open={open} onClose={hide}>
      <Box className={classes.drawer}>
        <Box className={classes.drawerTop}>
          <LogoWithText />
          <IconButton
            onClick={hide}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ padding: 0 }}
          >
            <CloseRoundedIcon fontSize="large" className={classes.closeBtn} />
          </IconButton>
        </Box>
        {matches && (
          <Box marginTop='20px'>
            <WalletAddress />
          </Box>
        )}
        {store.selectedToken ? (
          <SelectedToken hideMenu={hide} token={store.selectedToken} />
        ) : (
          <NoToken hideMenu={hide} />
        )}
      </Box>
    </Drawer>
  );
}

export default Menu;

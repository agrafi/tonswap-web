import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import { useStyles } from "./styles";
import LogoWithText from "./LogoWithText";
import Menu from "./Menu";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { LAYOUT_MAX_WIDTH } from "consts";
import { Box, Grid, Typography } from "@mui/material";
import WalletAddressImg from "assets/images/shared/wallet-address.svg";
import { observer } from "mobx-react";
import { useStore } from "store";
import useMobile from "hooks/useMobile";

const desktopNavbarHeight = "120px";
const mobileNavbarHeight = "80px";

export const Navbar = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const store = useStore();

  const isMobile = useMobile();

  const navbarHeight = isMobile ? mobileNavbarHeight : desktopNavbarHeight;
  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          boxShadow: "unset",
          maxWidth: LAYOUT_MAX_WIDTH,
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        <Toolbar
          style={{
            width: "100%",
            justifyContent: "space-between",
            height: navbarHeight,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Grid
            container
            style={{
              justifyContent: "space-between",
              alignItems: isMobile ? "center" : "flex-end",
              height: "100%",
              paddingBottom: isMobile ? 0 : 27,
            }}
          >
            <Grid item className={classes.leftGrid}>
              <IconButton
                onClick={() => setOpen(true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                style={{
                  padding: 0,
                  marginLeft: 0,
                  marginRight: isMobile ? 10 : 28,
                }}
              >
                <MenuRoundedIcon
                  fontSize="large"
                  className={classes.menuIcon}
                />
              </IconButton>
              <Link className={classes.link} to={ store.address ?  ROUTES.tokens : ROUTES.connect}>
                <LogoWithText onClick={() => navigate(ROUTES.tokens)} />
              </Link>
            </Grid>
            {store.address && (
              <Grid item className={classes.rightGrid}>
                <img src={WalletAddressImg} alt="wallet" />
                <Typography fontSize="12px">{store.address}</Typography>
              </Grid>
            )}
          </Grid>
        </Toolbar>
        <Menu open={open} hide={() => setOpen(false)} />
      </AppBar>
      <Box
        style={{
          height: navbarHeight,
          width: "100%",
          top: 0,
          background: "white",
          zIndex: 99,
          position: "sticky",
        }}
      ></Box>
    </>
  );
});
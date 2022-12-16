import React, { useRef, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  Avatar,
  Divider,
  InputAdornment,
  useScrollTrigger,
} from "@material-ui/core";
import { Box, Slide } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { useSelector, useDispatch } from "react-redux";
import Div100vh from "react-div-100vh";

import { useTheme } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { logout } from "../actions";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SubHeaderManager from "./NavBar/SubHeaderManager";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10%",
    height: "100%",
    paddingRight: "10%",
    width: "100%",
  },

  SearchBar: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },

  container: {
    display: "flex",
    flex: 1,
    height: 40,
  },
  toolBarSpace: {
    ...theme.mixins.toolbar,
  },

  icon: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  grow: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  menuButton: {
    marginLeft: "50px",
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    fontSize: 16,

    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  Logo: {
    fontFamily: "Lobster",
    fontSize: 35,
    cursor: "pointer",
    color: "white",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  BoxItem: {
    height: 50,
    minHeight: 50,
    fontSize: 16,
    color: "rgb(117,117,117)",
    fontFamily: "Helvetica",
    position: "relative",
  },
  Slide: {
    WebkitOverflowScrolling: "touch",
    backgroundColor: "white",
    overflowY: "scroll",
    padding: 3,
    position: "relative",
  },
}));

const Header = ({ onSearchSubmit }) => {
  const classes = useStyles();
  const history = useNavigate();

  const [term, setTerm] = useState("");
  const state = useSelector((state) => state.auth);
  const avatarRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const unReadNotification = useSelector(
    (state) => state.notification.unReadNotification
  );
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isAuth = (handleClose) => {
    if (!state.loading && state.isAuthenticated) {
      return (
        <MenuItem
          className={classes.BoxItem}
          style={{ color: "#fa5250" }}
          onClick={() => {
            dispatch(logout(history));
            handleClose();
          }}
        >
          Se déconnecter
        </MenuItem>
      );
    } else {
      return (
        <MenuItem
          className={classes.BoxItem}
          onClick={() => {
            history("/signup");
            handleClose();
          }}
        >
          S'inscrire | se connecter
        </MenuItem>
      );
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuDesktop = (event) => {
    if (anchorEl === null) {
      setAnchorEl(avatarRef.current);
    } else {
      setAnchorEl(null);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(true);
  };

  const onInputChange = (e) => {
    setTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(term);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      id={menuId}
      disableScrollLock={true}
      open={isMenuOpen}
      anchorEl={avatarRef.current}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transitionDuration={0}
      disableAutoFocusItem
      disablePortal={true}
      PaperProps={{
        style: {
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          transform: "translateX(-90%) translateY(55px)",
        },
      }}
      onClose={handleMenuDesktop}
    >
      <MenuItem
        className={classes.BoxItem}
        onClick={() => {
          history("/settings/profile");
          handleMenuDesktop();
        }}
      >
        Mon profile
      </MenuItem>
      <MenuItem
        className={classes.BoxItem}
        onClick={() => {
          history("/members/myFrips");
          handleMenuDesktop();
        }}
      >
        Mes Annonces
      </MenuItem>
      <MenuItem
        className={classes.BoxItem}
        onClick={() => {
          history("/settings/profile");
          handleMenuDesktop();
        }}
      >
        Créer une réduction
      </MenuItem>
      {isAuth(handleMenuDesktop)}
    </Menu>
  );

  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Slide
      direction="up"
      in={isMobileMenuOpen}
      mountOnEnter
      unmountOnExit
      timeout={200}
    >
      <Div100vh className={classes.Slide}>
        <Box height={40} />
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleMobileMenuClose}>
            {" "}
            <CloseIcon />{" "}
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" padding={3}>
          <Button
            onClick={() => {
              history("/items/new");
              handleMobileMenuClose();
            }}
            variant="contained"
            style={{
              backgroundColor: "#82A0C2",
              color: "white",
              fontSize: 14,
              width: "100%",
            }}
          >
            Vendre un article
          </Button>
        </Box>
        <Divider />
        <Box height={40} />

        <Box display="flex" flexDirection="column">
          <Box marginBottom={2} marginTop={1}>
            <Typography style={{ fontSize: 16, color: "black" }}>
              Catégorie
            </Typography>
          </Box>
          <Box>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/items/Femme");
                handleMobileMenuClose();
              }}
            >
              Femme
            </MenuItem>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/items/Homme");
                handleMobileMenuClose();
              }}
            >
              Homme
            </MenuItem>
          </Box>
        </Box>

        <Divider />
        <Box height={40} width={"100%"} />

        <Box display="flex" flexDirection="column">
          <Box marginBottom={2} marginTop={1}>
            <Typography style={{ fontSize: 16, color: "black" }}>
              Mon Compte
            </Typography>
          </Box>
          <Box>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/settings/profile");

                handleMobileMenuClose();
              }}
            >
              Mon Profil
            </MenuItem>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/items/Homme");
                handleMobileMenuClose();
              }}
            >
              Mes Offres
            </MenuItem>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/items/Homme");
                handleMobileMenuClose();
              }}
            >
              Créer une réduction
            </MenuItem>
            {isAuth(handleMenuDesktop)}
          </Box>
        </Box>

        <Box height={40} width={"100%"} />

        <Divider />

        <Box display="flex" flexDirection="column">
          <Box marginBottom={2} marginTop={1}>
            <Typography style={{ fontSize: 16, color: "black" }}>
              Autres
            </Typography>
          </Box>
          <Box>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                handleMobileMenuClose();

                history("/Aide");
              }}
            >
              Aide
            </MenuItem>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                handleMobileMenuClose();

                history("/assisstance");
              }}
            >
              Assisstance
            </MenuItem>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/Condition-général-de-vente-et-politique");
                handleMobileMenuClose();
              }}
            >
              Politique
            </MenuItem>
          </Box>
        </Box>

        <Box height={40} width={"100%"} />

        <Divider />

        <Box display="flex" flexDirection="column">
          <Box marginBottom={2} marginTop={1}>
            <Typography style={{ fontSize: 16, color: "black" }}>
              Réseaux sociaux
            </Typography>
          </Box>
          <Box>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/items/Femme");
                handleMobileMenuClose();
              }}
            >
              Instagram
            </MenuItem>
            <MenuItem
              className={classes.BoxItem}
              onClick={() => {
                history("/items/Homme");
                handleMobileMenuClose();
              }}
            >
              Facebook
            </MenuItem>
          </Box>
        </Box>

        <Box height={40} width={"100%"} />

        <Divider />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={10}
        >
          <Box
            marginBottom={2}
            marginTop={1}
            display="flex"
            alignItems="center"
          >
            <CopyrightIcon style={{ color: "black" }} />

            <Typography
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "Lobster",
                padding: 6,
              }}
            >
              Frips
            </Typography>
            <Typography style={{ fontSize: 14, color: "black" }}>
              Tous droits réservés
            </Typography>
          </Box>
        </Box>
      </Div100vh>
    </Slide>
  );

  return (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar
          position="fixed"
          elevation={0}
          style={{ backgroundColor: "transparent" }}
        >
          <Toolbar
            className={classes.root}
            style={{ backgroundColor: "#82A0C2" }}
          >
            <Box
              variant="h6"
              height={"100%"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingRight={2}
              onClick={() => {
                history("/");
              }}
            >
              <Typography className={classes.Logo}>
                {mobile ? "F" : "Frips"}
              </Typography>
            </Box>
            {!mobile ? (
              <Box width={500}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <form onSubmit={onSubmit}>
                    <InputBase
                      fullWidth
                      placeholder="Rechercher des items"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      value={term}
                      onChange={onInputChange}
                    />
                  </form>
                </div>
              </Box>
            ) : null}

            <div className={classes.grow} />
            {!state.loading ? (
              <Box>
                <div className={classes.sectionDesktop}>
                  <Box flexGrow={1} display="flex" alignItems={"center"}>
                    {!state.isAuthenticated ? (
                      <Box paddingLeft={2} alignItems="center">
                        <Button
                          onClick={() => history("/signup")}
                          variant="outlined"
                          style={{ backgroundColor: "#F7F9FB" }}
                        >
                          <Typography style={{ fontSize: 12 }}>
                            S'inscrire | se connecter
                          </Typography>
                        </Button>
                      </Box>
                    ) : null}

                    {state.isAuthenticated ? <Box paddingLeft={2}></Box> : null}
                    <Button
                      onClick={() => history("/items/new")}
                      variant="contained"
                      style={{ backgroundColor: "#F7F9FB" }}
                    >
                      <Typography style={{ fontSize: 12 }}>
                        Vendre un article
                      </Typography>
                    </Button>
                  </Box>
                  {state.isAuthenticated ? (
                    <Box display="flex">
                      <IconButton
                        aria-label="show 4 new mails"
                        color="inherit"
                        onClick={() => {
                          history("/member/conversation");
                        }}
                      >
                        <Badge
                          badgeContent={unReadNotification}
                          color="secondary"
                        >
                          <MailIcon />
                        </Badge>
                      </IconButton>
                      <IconButton
                        aria-label="show  new notifications"
                        color="inherit"
                        onClick={() => {
                          history("/member/myFavorite");
                        }}
                      >
                        <Badge color="secondary">
                          <FavoriteIcon />
                        </Badge>
                      </IconButton>

                      <Box
                        display={"flex"}
                        alignItems="center"
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            cursor: "pointer",
                            zIndex: 1500,
                          }}
                          onClick={handleMenuDesktop}
                          alt={`${state.user.Pseudo}`}
                          src={`/imageProfile/${state.user.id}/${state.user.image?.image}`}
                        />

                        <Box
                          style={{ cursor: "pointer", zIndex: 1500 }}
                          ref={avatarRef}
                          onClick={handleMenuDesktop}
                        >
                          {Boolean(anchorEl) ? (
                            <ExpandLess style={{ cursor: "pointer" }} />
                          ) : (
                            <ExpandMore style={{ cursor: "pointer" }} />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ) : null}
                </div>

                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => {
                      history("/member/conversation");
                    }}
                  >
                    <Badge badgeContent={unReadNotification} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-label="show  new notifications"
                    color="inherit"
                  >
                    <Badge color="secondary">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>

                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Box>
            ) : null}
          </Toolbar>

          <Box height={2} bgcolor="white" />

          {mobile ? (
            <Box
              width={"100%"}
              style={{ backgroundColor: "#82A0C2" }}
              height={40}
              margin="auto"
              alignItems="center"
              display="flex"
              margin="auto"
            >
              <Box width={"100%"} className={classes.SearchBar}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <form onSubmit={onSubmit}>
                    <InputBase
                      fullWidth
                      placeholder="Rechercher des items"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      value={term}
                      onChange={onInputChange}
                    />
                  </form>
                </div>
              </Box>
            </Box>
          ) : (
            <SubHeaderManager />
          )}
          {renderMobileMenu}

          {renderMenu}
        </AppBar>
      </div>
      <div className={classes.toolBarSpace} />
    </React.Fragment>
  );
};

export default Header;
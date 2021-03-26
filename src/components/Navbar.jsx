import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar:{
    position: "relative",
  },
  title: {
    flexGrow: 1,
  },
  field: {
    backgroundColor: "white",
    borderRadius: "5px",
    marginRight: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar className={classes.appBar}>
      <Container>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Popular films</MenuItem>
            <MenuItem onClick={handleClose}>Liked films</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Movie Viewer
          </Typography>
          <form>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              variant="outlined"
              className={classes.field}
            />
          </form>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

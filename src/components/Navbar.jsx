import React, { useState, useEffect } from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import FilmPage from "../pages/FilmPage"
import Urls from "../Urls";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    minWidth: 344,
  },
  appBar: {
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

const Navbar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [films, setFilms] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOpen = (e) => {
    let film = 0;
    if (e.target.value !== "") {
      film = films.find((film) => film.title === e.target.value);
    }
    if (film) {
      document.location.href='/films/'+film.id
      console.log(film.id);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let url = Urls({ request: "search", param: searchValue });
    let cancel;
    axios({
      method: "GET",
      url: url,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setFilms(response.data.results);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [searchValue]);

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
          <Autocomplete
            className={classes.autocomplete}
            freeSolo
            onSelect={handleOpen}
            options={films.map((film) => film.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="freeSolo"
                margin="normal"
                variant="outlined"
                className={classes.field}
                onChange={handleChange}
              />
            )}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

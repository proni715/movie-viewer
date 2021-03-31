import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Urls from "../Urls";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    width: "25vw",
    borderColor: "#424242",
  },
  appBar: {
    position: "relative",
    backgroundColor: "#424242",
  },
  title: {
    flexGrow: 1,
  },
  field: {
    margin: "0",
    backgroundColor: "white",
    borderColor: "#424242",
    borderRadius: "5px",
  },
}));

export const Navbar = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [films, setFilms] = useState([]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOpen = (e) => {
    let film = 0;
    if (e.target.value !== "") {
      film = films.find((film) => film.title === e.target.value);
    }
    if (film) {
      document.location.href = "/films/" + film.id;
    }
  };

  const handlePopular = () => {
    document.location.href = "/films/";
  };
  const handleLiked = () => {
    document.location.href = "/liked/";
  };

  useEffect(() => {
    let url = Urls({ request: "search", param: searchValue });
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        setFilms(response.data.results);
      })
      .catch((e) => {});
  }, [searchValue]);

  return (
    <AppBar className={classes.appBar}>
      <Container>
        <Toolbar>
          <div className={classes.title}>
            <Button onClick={handlePopular} color="inherit">
              <Typography variant="h6">Movie Viewer</Typography>
            </Button>
          </div>
          <Button onClick={handleLiked} color="inherit">
            <Typography variant="h6">Liked</Typography>
          </Button>
          <Autocomplete
            className={classes.autocomplete}
            freeSolo
            onSelect={handleOpen}
            options={films.map((film) => film.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
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

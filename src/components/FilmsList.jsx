import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, makeStyles } from "@material-ui/core";
import FilmCard from "./FilmCard";

export const FilmsList = (url) => {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: "1rem auto",
      maxWidth: 1280,
      justifyContent: "center",
    },
    paper: {
      height: "15rem",
      width: "13rem",
      backgroundColor: "blue",
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  useEffect(() => {
    if (fetching) {
      axios
        .get(url.url + "&page=" + currentPage)
        .then((response) => {
          setFilms([...films, ...response.data.results]);
          setCurrentPage((prevState) => prevState + 1);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (event) => {
    if (
      event.target.documentElement.scrollHeight -
        (event.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };
  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {films.map((film) => (
            <Grid item>
              <FilmCard film={film}></FilmCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilmsList;

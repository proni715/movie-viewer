import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, makeStyles } from "@material-ui/core";
import FilmCard from "./FilmCard";

export const FilmsList = ({ url, limit }) => {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [genres, setGenres] = useState([]);

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

  useEffect(async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=339c5b0853bccc574e98f7edf445813d"
      )
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((e) => {
        console.log(e);
      });
    if (fetching) {
      await axios
        .get(url + "&page=" + currentPage)
        .then((response) => {
          setFilms([...films, ...response.data.results]);
          setCurrentPage((prevState) => prevState + 1);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setFetching(false));
    }
    if (limit) {
      setFilms(films.slice(0, 6));
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
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          {films.map((film) => (
            <Grid key={film.id + ""} item>
              <FilmCard film={film} genres={genres}></FilmCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilmsList;

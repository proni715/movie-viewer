import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FilmPoster from "../components/FilmPoster";
import Urls from "../Urls";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    flexGrow: 1,
    margin: "0 auto",
    maxWidth: 1280,
    justifyContent: "center",
  },
}));

export const FilmPage = (props) => {
  const { id } = props.match.params;
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const finalGenres = film.genres;
  useEffect(() => {
    if (loading) {
      axios
        .get(Urls({ request: "film", param: id }))
        .then((response) => {
          setFilm(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [loading]);
  const classes = useStyles();
  return (
    <>
      <Navbar></Navbar>
      <main className={classes.root}>
        <FilmPoster film={film}></FilmPoster>
        <Typography gutterBottom variant="h5" component="h2">
          {film.title}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {film.overview}
        </Typography>
      </main>
    </>
  );
};

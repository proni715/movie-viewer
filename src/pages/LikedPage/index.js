import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import FilmCard from "../../components/FilmCard";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

export const LikedFilms = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState([]);

  useEffect(async () => {
    setLiked(JSON.parse(localStorage.getItem("liked")));
    setLoading(false);
  }, [loading]);
  return (
    <>
      <Navbar></Navbar>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {liked ? (
            <Grid container justify="center">
              {liked.map((film) =>
                film.id ? (
                  <Grid item key={film.id + ""}>
                    <FilmCard film={film}></FilmCard>
                  </Grid>
                ) : null
              )}
            </Grid>
          ) : (
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              No liked films
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

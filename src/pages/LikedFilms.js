import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FilmCard from "../components/FilmCard";

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

export const LikedFilms = () => {
  const classes = useStyles();
  const [spacing, setSpacing] = useState(2);
  const liked = JSON.parse(localStorage.getItem("liked"));
  return (
    <>
      <Navbar></Navbar>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {liked.map((film) =>
              film.id ? (
                <Grid item>
                  <FilmCard film={film}></FilmCard>
                </Grid>
              ) : null
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

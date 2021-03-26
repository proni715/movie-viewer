import React, { Component } from "react";
import axios from "axios";
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";
import FilmCard from "./FilmCard"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem auto",
    maxWidth: 1280,
    justifyContent: "center"
    

  },
  paper: {
    height: "15rem",
    width: "13rem",
    backgroundColor: 'blue'
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export const FilmsList = (films) => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {films.films.map((film) => (
            <Grid key={film.id} item>
              <FilmCard film ={film}></FilmCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilmsList;
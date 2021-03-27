import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { FavoriteBorder } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function FilmPoster(props) {
  const classes = useStyles();
  const { film } = props;
  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{
        backgroundImage:
          "url(https://image.tmdb.org/t/p/w500" + film.poster_path + ")",
      }}
    >
      {<img style={{ display: "none" }} src={""} alt="{film.title}" />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {film.title}
            </Typography>
            {film.genres ? (
              <Typography variant="body2" color="inherit" component="p">
                {film.genres.map((genre) => genre.name + " ")}
              </Typography>
            ) : null}
          </div>
        </Grid>
      </Grid>
      <Button size="large" color="inherit">
        <FavoriteBorder></FavoriteBorder>
      </Button>
    </Paper>
  );
}

FilmPoster.propTypes = {
  post: PropTypes.object,
};

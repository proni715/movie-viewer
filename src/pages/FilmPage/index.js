import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import Urls from "../../Urls";
import FilmsList from "../../components/FilmsList";
import useStyles from "./style";

export const FilmPage = (props) => {
  const classes = useStyles();
  const { id } = props.match.params;
  const [film, setFilm] = useState({});
  const [video, setVideo] = useState();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const query = async () => {
      await axios
        .get(Urls({ request: "film", param: id }))
        .then((response) => {
          setFilm(response.data);
        })
        .catch((e) => {});
    };
    query();
  }, []);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("liked"));
    if (liked && film) {
      for (let i = 0; i < liked.length; i++) {
        if (liked[i].id === film.id) {
          setIsLiked(true);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    const query = async () => {
      await axios
        .get(Urls({ request: "movieVideos", param: id }))
        .then((response) => {
          const videos = response.data.results;
          setVideo("https://www.youtube.com/watch?v=" + videos[0].key);
        })
        .catch((e) => {});
    };
    query();
  }, []);

  const handleUnlike = () => {
    let liked = JSON.parse(localStorage.getItem("liked"));
    if (liked) {
      for (let i = 0; i < liked.length; i++) {
        if (liked[i].id === film.id) {
          liked.splice(i, 1);
          localStorage.setItem("liked", JSON.stringify(liked));
          setIsLiked(false);
          break;
        }
      }
    }
  };

  const handleLike = () => {
    let liked = JSON.parse(localStorage.getItem("liked"));
    if (liked) {
      liked.push(film);
    } else {
      liked = [film];
    }
    localStorage.setItem("liked", JSON.stringify(liked));
    setIsLiked(true);
  };

  return (
    <>
      <Navbar></Navbar>
      <main className={classes.root}>
        <Paper
          className={classes.mainFeaturedPost}
          style={{
            backgroundImage:
              "url(https://image.tmdb.org/t/p/w500" + film.poster_path + ")",
          }}
        >
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={12}>
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
                  <Typography color="inherit" component="p">
                    {film.genres.map((genre) => genre.name + " ")}
                  </Typography>
                ) : null}
              </div>
            </Grid>
          </Grid>
          <Typography style={{ margin: "3%" }} color="inherit" component="p">
            {film.tagline}
          </Typography>
          <Typography style={{ margin: "3%" }} color="inherit" component="p">
            {film.status} {film.release_date}
          </Typography>
          {isLiked ? (
            <Button onClick={handleUnlike} size="large" color="inherit">
              <Favorite></Favorite>
            </Button>
          ) : (
            <Button onClick={handleLike} size="large" color="inherit">
              <FavoriteBorder></FavoriteBorder>
            </Button>
          )}
        </Paper>
        <Typography
          style={{ margin: "2%" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {film.title}
        </Typography>

        <Typography
          style={{ margin: "2%" }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {film.overview}
        </Typography>
        <Grid container justify="center">
          <ReactPlayer url={video} />
        </Grid>
        <Typography
          style={{ margin: "2%" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Recomendations:
        </Typography>
        <FilmsList
          url={Urls({ request: "recomendations", param: id })}
          limit={true}
        ></FilmsList>
      </main>
    </>
  );
};

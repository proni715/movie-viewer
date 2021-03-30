import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    margin: "1rem",
    maxWidth: 345,
    minWidth: 344,
    minHeight: 300,
    maxHeight: 400,
  },
  description: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  genres: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export const FilmCard = ({ film, genres }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [genresList, setGenres] = useState([]);
  useEffect(async () => {
    let finalGenres = new Array();
    if (genres) {
      for (let i = 0; i < genres.length; i++) {
        for (let j = 0; j < film.genre_ids.length; j++) {
          if (genres[i].id === film.genre_ids[j]) {
            finalGenres.push(genres[i].name);
          }
        }
      }
    }
    setGenres(finalGenres);
    const liked = await JSON.parse(localStorage.getItem("liked"));
    if (liked) {
      for (let i = 0; i < liked.length; i++) {
        if (liked[i].id === film.id) {
          setIsLiked(true);
          break;
        }
      }
    }
    setLoading(false);
  }, [loading]);

  const handleUnlike = () => {
    let liked = JSON.parse(localStorage.getItem("liked"));
    for (let i = 0; i < liked.length; i++) {
      if (liked[i].id === film.id) {
        liked.splice(i, 1);
        localStorage.setItem("liked", JSON.stringify(liked));
        setIsLiked(false);
        break;
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
  const handleOpen = () => {
    document.location.href = "/films/" + film.id;
  };
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={"https://image.tmdb.org/t/p/w500" + film.poster_path}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            className={classes.description}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {film.title}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {film.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isLiked ? (
          <Button onClick={handleUnlike} size="small" color="#424242">
            <Favorite></Favorite>
          </Button>
        ) : (
          <Button onClick={handleLike} size="small" color="#424242">
            <FavoriteBorder></FavoriteBorder>
          </Button>
        )}
        <Typography
          className={classes.description}
          variant="body2"
          color="#424242"
          component="p"
        >
          {genres ? genresList.map((genre) => genre + " ") : null}
        </Typography>
      </CardActions>
    </Card>
  );
};
export default FilmCard;

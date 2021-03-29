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

export default function FIlmCard(film) {
  const classes = useStyles();
  const genres = JSON.parse(localStorage.getItem("genres"));
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  let liked = JSON.parse(localStorage.getItem("liked"));
  let finalGenres = [];

  useEffect(() => {
    if (!liked) {
      localStorage.setItem("liked", JSON.stringify([{ id: 0 }]));
    }
    for (let i = 0; i < liked.length; i++) {
      if (liked[i].id === film.film.id) {
        setIsLiked(true);
      }
    }
    if (loading) {
      for (let i = 0; i < genres.length; i++) {
        for (let j = 0; j < film.film.genre_ids.length; j++) {
          if (genres[i].id === film.film.genre_ids[j]) {
            finalGenres.push(genres[i].name);
          }
        }
      }
      console.log("isLiked:" + film.film.title, isLiked);
      setLoading(false);
    }
  }, [loading]);

  const handleUnlike = () => {
    liked = JSON.parse(localStorage.getItem("liked"));
    for (let i = 0; i < liked.length; i++) {
      if (liked[i].id===film.film.id) {
        liked.splice(i, 1);
        setIsLiked(false)
      }
    }
    localStorage.setItem("liked", JSON.stringify(liked));
    console.log(JSON.parse(localStorage.getItem("liked")));
  };
  const handleLike = () => {
    liked = JSON.parse(localStorage.getItem("liked"));
    if (!isLiked) {
      liked.push(film.film);
      localStorage.setItem("liked", JSON.stringify(liked));
      setIsLiked(true);
    }
    console.log(isLiked);
    console.log(liked);
  };
  const handleOpen = () => {
    document.location.href = "/films/" + film.film.id;
    console.log(film.film.id);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={"https://image.tmdb.org/t/p/w500" + film.film.poster_path}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            className={classes.description}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {film.film.title}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {film.film.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isLiked ? (
          <Button onClick={handleUnlike} size="small" color="primary">
            <Favorite></Favorite>
          </Button>
        ) : (
          <Button onClick={handleLike} size="small" color="primary">
            <FavoriteBorder></FavoriteBorder>
          </Button>
        )}
        <Button onClick={handleOpen} size="small" color="primary">
          Learn More
        </Button>
        <Typography
          className={classes.description}
          variant="body2"
          color="primary"
          component="p"
        >
          {finalGenres.map((genre) => genre + " ")}
        </Typography>
      </CardActions>
    </Card>
  );
}

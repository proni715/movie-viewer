import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {FavoriteBorder} from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    maxHeight:400
  },
  description:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis' 
  }
});

export default function FIlmCard(film) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={"https://image.tmdb.org/t/p/w500"+film.film.poster_path}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.description} gutterBottom variant="h5" component="h2">
            {film.film.title}
          </Typography>
          <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
            {film.film.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <FavoriteBorder></FavoriteBorder>  
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
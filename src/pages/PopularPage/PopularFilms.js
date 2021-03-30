import React,{useEffect,useState} from "react";
import Navbar from "../../components/Navbar";
import FilmsList from "../../components/FilmsList";
import Urls from "../../Urls";
import axios from "axios";

export const PopularFilms = () => {
  const [loading,setLoading] = useState(true);
  useEffect(async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=339c5b0853bccc574e98f7edf445813d"
      )
      .then((response) => {
        localStorage.setItem("genres", JSON.stringify(response.data.genres));
      })
      .catch((error) => {
        console.log(error);
      });
      setLoading(false)
  }, [loading]);

  const url = Urls({ request: "popular" });
  return (
    <>
      <Navbar></Navbar>
      <FilmsList url={url}></FilmsList>
    </>
  );
};

export default PopularFilms;

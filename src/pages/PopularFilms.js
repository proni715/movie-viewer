import React, { Component } from "react";
import Navbar from "../components/Navbar";
import FilmsList from "../components/FilmsList";
import Urls from "../Urls";
import axios from "axios";

class PopularFilms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=339c5b0853bccc574e98f7edf445813d"
      )
      .then((response) => {
        this.setState({ genres: response.data.genres });
        localStorage.setItem("genres", JSON.stringify(response.data.genres));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const url = Urls({ request: "popular" });
    return (
      <>
        <Navbar></Navbar>
        <FilmsList url={url}></FilmsList>
      </>
    );
  }
}

export default PopularFilms;

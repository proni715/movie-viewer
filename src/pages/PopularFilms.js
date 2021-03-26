import React, { Component } from "react";
import Navbar from "../components/Navbar";
import FilmsList from "../components/FilmsList";
import Urls from "../Urls";

class PopularFilms extends Component {

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

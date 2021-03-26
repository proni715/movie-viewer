import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import FilmsList from "../components/FilmsList";
import Urls from "../Urls";

class PopularFilms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
    };
  }

  async componentDidMount() {
    const url = Urls({ request: "popular" });
    await axios
      .get(url)
      .then((response) => {
        this.setState({ films: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { films } = this.state;
    return (
      <>
        <Navbar></Navbar>
        <FilmsList films={films}></FilmsList>
      </>
    );
  }
}

export default PopularFilms;

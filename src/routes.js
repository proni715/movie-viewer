import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PopularFilms from "./pages/PopularPage/index";
import { LikedFilms } from "./pages/LikedPage/index";
import { FilmPage } from "./pages/FilmPage/index";

export const useRoutes = () => {
  return (
    <Switch>
      <Route exact path="/films" component={PopularFilms} />
      <Route exact path="/films/:id" component={FilmPage} />
      <Route exact path="/liked" component={LikedFilms} />
      <Redirect to="/films" />
    </Switch>
  );
};

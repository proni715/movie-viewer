import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PopularFilms from "./pages/PopularFilms";
import { LikedFilms } from "./pages/LikedFilms";
import { FilmPage } from "./pages/FilmPage";

export const useRoutes = () => {
  return (
    <Switch>
      <Route exact path="/films" exact component={PopularFilms} />
      <Route exact path="/films/:id" exact component={FilmPage} />
      <Route exact path="/liked" exact component={LikedFilms} />
      <Redirect to="/films" />
    </Switch>
  );
};

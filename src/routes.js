import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PopularFilms from "./pages/PopularFilms"
import {SearchedFilms} from "./pages/SearchedFilms"
import {LikedFilms} from "./pages/LikedFilms"
import {FilmPage} from "./pages/FilmPage"





export const useRoutes = () => {
    return( 
        <Switch>
            <Route path="/" exact>
                <PopularFilms/>
            </Route>
            
            <Route path="/search" exact>
                <SearchedFilms/>
            </Route>

            <Route path="/liked" exact>
                <LikedFilms/>
            </Route>
            
            <Route path="/movie" exact>
                <FilmPage/>
            </Route>

            <Redirect to='/'/>
            
        </Switch>
    )
};

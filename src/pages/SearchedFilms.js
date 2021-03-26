import Navbar from "../components/Navbar";
import FilmsList from "../components/FilmsList";
import Urls from "../Urls";

export const SearchedFilms = (query) => {
  let url = Urls({ request: "search", param: query });
  return (
    <>
      <Navbar></Navbar>
      <FilmsList url={url}></FilmsList>
    </>
  );
};

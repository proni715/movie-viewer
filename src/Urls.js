export default function Urls({ request, param }) {
  const baseUrl = "https://api.themoviedb.org/3";
  const key = "?api_key=339c5b0853bccc574e98f7edf445813d";

  switch (request) {
    case "popular":
      return baseUrl + "/movie/popular" + key;

    case "search":
      return baseUrl + "/search/movie" + key + "&query=" + param;

    case "film":
      return baseUrl + "/movie/" + param + key;

    case "recomendations":
      return baseUrl + "/movie/" + param + "/recommendations" + key;

    case "movieVideos":
      return baseUrl + "/movie/" + param+"/videos" + key;
    default:
       return 
  }
}

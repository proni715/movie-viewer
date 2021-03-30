import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    flexGrow: 1,
    margin: "0 auto",
    maxWidth: 1280,
    justifyContent: "center",
    justify: "center",
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    marginLeft: "3%",
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    margin: "3%",
  },
}));

export default useStyles;

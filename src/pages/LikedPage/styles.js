import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem auto",
    maxWidth: 1280,
    justifyContent: "center",
  },
  paper: {
    height: "15rem",
    width: "13rem",
    backgroundColor: "blue",
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export default useStyles;

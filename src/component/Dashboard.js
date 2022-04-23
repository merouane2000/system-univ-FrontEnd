import React from "react";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
  Paper,
} from "@material-ui/core";
import Header from "./Header";
import SideMenu from "./SideMenu";
import StudentsForm from "../page/StudentsForm";
import SubjectForm from "../page/SubjectForm";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
  ContentPage: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
});
const Dashboard = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <Paper className={classes.ContentPage}>
          <SubjectForm />
        </Paper>
        <Paper className={classes.ContentPage}>
          <StudentsForm />
        </Paper>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default Dashboard;

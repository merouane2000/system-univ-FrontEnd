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
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import MarksTable from "./MarksTable";
import axios from "axios";

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
const Dashboard = (props) => {

  const getSubjects = ()=>{
    axios
    .post("http://localhost:4000/get-subjects", 
    {
      selectedClass: props.selectedClass,
      student_id: props.student._id,
    },
    { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      let listedSubjectes = [...res.data];
      props.updateSubjects(listedSubjectes);
      // console.log(listedSubjectes);
    });
  }

  const handleSelectClass = (data) => {
    props.updateClass(data);
    // console.log(props.selectedClass)
    getSubjects()
  };
  const listYears = () => {
    const chips = [];
    const classes = props.student.classes;
    if (classes != null) {
      classes.map((tmpClass) => {
        chips.push(
          <Chip
            key={tmpClass._id}
            variant="outlined"
            color="primary"
            avatar={<Avatar>F</Avatar>}
            label={tmpClass.year + "  |  " + tmpClass.semastre}
            onClick={() => {
              handleSelectClass( tmpClass );
            }}
          />
        );
      });
    }
    return chips;
  };

  const classes = useStyles();
  const chips = listYears();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <Paper className={classes.ContentPage}>
          {chips}
          <MarksTable />

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
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudents: (data) => {
      dispatch({ type: "UPDATE_STUDENTS", payload: data });
    },
    updateClass: (data) => {
      dispatch({ type: "UPDATE_CLASS", payload: data });
    },
    updateSubjects: (data) => {
      dispatch({ type: "UPDATE_LISTED_SUBJECTS", payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
    student: state.selectedStudent,
    selectedClass: state.selectedClass
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import { withStyles } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";

const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "320px",
    height: "775px",
    backgroundColor: "#253053",
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SideMenu = (props) => {
  const classes = useStyles();
  useEffect(()=>{
    axios.get("http://localhost:4000/get-student-and-promo").then((res) => {
      setStudents(res.data);
    });
  },[props.students])

  const handleSelectStudent = student => {
    props.updateStudent(student);
    console.log(props.students)
  }

  const studentsList = () => {
    const list = [];
    students.map((student) => {
      list.push(
        <ListItem key={student._id}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary={student.familyName} />
          <ListItemSecondaryAction>
            <IconButton
              color="primary"
              onClick={(e) => handleSelectStudent(student, e)}
            >
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <List
        subheader={<ListSubheader>Student</ListSubheader>}
        className={classes.root}
      >
        {list}
      </List>
    );
  };
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/get-student-and-promo").then((res) => {
      setStudents(res.data);
      props.updateStudents(res.data);
    });
  }, []);

  return (
    <div className={classes.sideMenu}>
      {studentsList()}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudents: (data) => {
      dispatch({ type: "UPDATE_STUDENTS", payload: data });
    },
    updateStudent: (data) => {
      dispatch({ type: "UPDATE_STUDENT", payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(SideMenu));

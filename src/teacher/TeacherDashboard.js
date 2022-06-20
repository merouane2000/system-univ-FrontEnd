import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeacherInfo from "./TeacherInfo";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  }
}));

const TeacherDashboad = () => {
  const classes = useStyles();

  return (
    <div >
       <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
           Teacher Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    < TeacherInfo />
    </div>
  );
};

export default TeacherDashboad;

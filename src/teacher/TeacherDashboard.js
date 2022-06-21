import React, { useState, useEffect, useLocation } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeacherInfo from "./TeacherInfo";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import TeacherTabel from "./TeacherTabel";
import SideMenu from "../component/SideMenu";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  }
}));

const TeacherDashboad = () => {
  const classes = useStyles();
  const navigate = useNavigate ()
  const email = sessionStorage.getItem('email')

  useEffect(()=>{
    axios
    .get(
      "http://localhost:4000/teacher-info"
    )
    .then((res) => {
      res.data.map(teacher =>{
        if(teacher.email === email && teacher.isActive){
          navigate('/teacher/tabel');
        }

      })
   
    })
    .catch((error) => {
      console.log(error.data);
    });

  },[])
 
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

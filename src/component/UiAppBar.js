import React, { useState, useEffect, useLocation } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  Button:{
    marginLeft:1160
  }
}));

const UiAppBar = () => {
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
        <Button type="submit" variant="contained" color="primary"  className={classes.Button} onClick={()=>navigate("/")}>
               Log Out {""}
            <ExitToAppIcon fontSize="small" />
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default UiAppBar;

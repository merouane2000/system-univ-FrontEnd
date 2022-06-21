import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import { useNavigate  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
 
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
}));


const InitialValues = {
  FirstName: "",
  FamilyName: "",
  email: "",
  teacherSubject: "",
};

export default function AddressForm() {
  const [value, setValue] = useState(InitialValues);
  const navigate = useNavigate ()
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit=()=>{
    axios
      .post(
        "http://localhost:4000/teacher-create",
        {
          values: value,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        navigate('/teacher/tabel');
      })
      .catch((error) => {
        console.log(error.data);
      });
  
  
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
        Teacher Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="FirstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="FamilyName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="teacherSubject"
            name="teacherSubject"
            label="Teacher Subject"
            fullWidth
            autoComplete="teacherSubject"
            onChange={handleChange}
          />
        </Grid>
        <div className={classes.buttons}>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmit}
                  >
                   submit
                  </Button>
                </div>
      </Grid>
        </Paper>
        </main>
     
    </React.Fragment>
  );
}
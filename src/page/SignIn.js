import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
     
        Your Website
    
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const handleSubmite = (e) => {
    
    e.preventDefault();
    axios
    .post(
      "http://localhost:4000/user/login",
      {
        email: Email,
        password: Password,
        role:Role
      },
      { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res.data.role)
        
       if(res.data.IsCreated === true && res.data.role ==="Admin"){
        navigate('/admin/dashboard');
        }
       if(res.data.IsCreated === true && res.data.role === "Teacher"){
        navigate('/teacher/dashboard'  );
        sessionStorage.setItem("email" , Email)
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
    };

  const navigate = useNavigate ()
  const classes = useStyles();
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Role, setRole] = useState("Admin");




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SignIn
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={Password}
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          .
           <Grid item xs={12}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">SignIn As : </FormLabel>
                    <RadioGroup row
                      aria-label="gender"
                      name="Role"
                      value={Role}
                     
                    >
                      <FormControlLabel
                        value="Admin"
                        control={<Radio />}
                        label="Admin"
                        onChange={(e)=>{setRole(e.target.value)}}
                      />
                      <FormControlLabel
                        value="Teacher"
                        control={<Radio />}
                        label="Teacher"
                        onChange={(e) =>{setRole(e.target.value )}}

                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked />}
            label="Remember me"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmite}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

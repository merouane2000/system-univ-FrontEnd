import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    fontColor:"black"
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

function Header(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [state,setState] = useState()
  
  const handelSendRachatAVG=()=>{
    let clone = props.rachatavg;
    clone = state
    props.updateRachatAVG(clone)
  }

  
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="The RACHAT AVG"
              className={classes.searchInput}
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              
            />
      
            <InputBase
              placeholder="The RACHAT CREDIT"
              className={classes.searchInput}
              
            />
            <Button type="submit" variant="contained" color="primary" onClick={handelSendRachatAVG}>
             Submit
            </Button>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" onClick={()=>navigate("/get-results")}>
              Get Results
            </Button> {"  "}
        
            <Button type="submit" variant="contained" color="primary" onClick={()=>navigate("/")}>
               Log Out {""}
            <ExitToAppIcon fontSize="small" />
            </Button>
           
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateRachatAVG: (data) => {
      dispatch({ type: "UPDATE_RACHAT_AVG", payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    rachatavg: state.rachatAVG,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

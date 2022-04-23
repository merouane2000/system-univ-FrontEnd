import React from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
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

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="Search topics"
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
            />
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

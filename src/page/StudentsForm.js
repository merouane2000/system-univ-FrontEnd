import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { Typography, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { InputBase } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "16px",
    margin: 0,

    padding: theme.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(0),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = withStyles(useStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const Promo = [
  { classYear: "2013/2012" },
  { classYear: "2014/2013" },
  { classYear: "2015/2014" },
  { classYear: "2016/2015" },
  { classYear: "2017/2016" },
  { classYear: "2018/2017" },
  { classYear: "2019/2018" },
  { classYear: "2020/2019" },
  { classYear: "2021/2020" },
  { classYear: "2022/2021" },
  { classYear: "2023/2022" },
];
const Semasters = [
  { Semastername: "L1-S1" },
  { Semastername: "L1-S2" },
  { Semastername: "L2-S1" },
  { Semastername: "L2-S2" },
  { Semastername: "L3-S1" },
  { Semastername: "L3-S2" },
  { Semastername: "M1-S1" },
  { Semastername: "M1-S2" },
  { Semastername: "M2-S1" },
  { Semastername: "M2-S2" },
];

const InitialValues = {
  FirstName: "",
  FamilyName: "",
  RegistrationNumber: null,
  Promo: "",
  Semaster: "",
};

const StudentsForm = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(InitialValues);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/get-subject").then((res) => {
      let getdata = res.data;
      setData(getdata);
    });
  }, []);
  const handleAddToSession = () => {
    sessionStorage.setItem("Promo", value.Promo);
    sessionStorage.setItem("Year", value.Semaster);
  };

  const handleSubmite = (e) => {
    console.log(value);
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/student",
        {
          values: value,
          data: data,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.isCreated) {
          let clone = [...props.students];
          clone.push(res.data.student);
          props.updateStudents(clone);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
    console.log(value);
    handleClose();
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddSemaster = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Grid container direction="row" justifyContent="space-between">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Insert Students
        </Button>
        <Autocomplete
          id="combo-box-demo"
          options={Promo}
          getOptionLabel={(option) => option.classYear}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Current promo "
              variant="outlined"
              name="Promo"
              onSelect={handleAddSemaster}
            />
          )}
        />
        <Autocomplete
          id="combo-box-demo"
          options={Semasters}
          getOptionLabel={(option) => option.Semastername}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Semastre"
              variant="outlined"
              name="Semaster"
              onSelect={handleAddSemaster}
            />
          )}
        />

        <Button variant="outlined" color="primary" onClick={handleAddToSession}>
          Insert the Current year
        </Button>
      </Grid>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Insert Students
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            spacing={2}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Family Name"
                name="FamilyName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="First Name"
                name="FirstName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Registration Number"
                name="RegistrationNumber"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={Promo}
                getOptionLabel={(option) => option.classYear}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Current promo "
                    variant="outlined"
                    name="Promo"
                    onSelect={handleAddSemaster}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={Semasters}
                getOptionLabel={(option) => option.Semastername}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Semastre"
                    variant="outlined"
                    name="Semaster"
                    onSelect={handleAddSemaster}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmite} color="primary">
            Submite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudents: (data) => {
      dispatch({ type: "UPDATE_STUDENTS", payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
    student: state.selectedStudent,
    selectedClass: state.selectedClass,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsForm);

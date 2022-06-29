import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Typography, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Grid } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "20px",
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(0),
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

const InitialValues = {
  name: "",
  coef: 0,
  credit: 0,
  coefTD: 0.2,
  coefTP: 0.2,
  coefExam: 0.6,
};

const Unites = [
  { UniteName: "UE fondamentales" },
  { UniteName: "UE méthodologie" },
  { UniteName: "UE Decouverte " },
  { UniteName: "UE transversale" },
];

const SubjectForm = (props) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const classes = useStyles();
  const [value, setValue] = useState(InitialValues);

  const handleSave = (e) => {
    console.log(value);

    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/subject",
        {
          values: value,
          selectedClass : props.selectedClass,
          student_id:props.student._id
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        
        
        console.log(res);
      })
      .catch((error) => {
        console.log(error.data);
      });
      handleClose()
  };

  const handleAddSemaster = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Insert Subject
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Insert subject 
          {" "}
          <br/>
          {props.student.name + "   "}
          <br/>
          {props.selectedClass.year+ "  "}
          <br/>
          {props.selectedClass.semastre}
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            spacing={3}
            rowSpacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="name"
                name="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
            <Autocomplete
                id="combo-box-demo"
                options={Unites}
                getOptionLabel={(option) => option.UniteName}
                style={{ width: 220 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subject Unite "
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="coef"
                name="coef"
                value={value.coef}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="credit"
                name="credit"
                value={value.credit}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="Coef exam"
                name="coefExam"
                value={value.coefExam}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="Coef TD"
                name="coefTD"
                value={value.coefTD}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="Coef TP"
                name="coefTP"
                value={value.coefTP}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            SAVE
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
    updateClass: (data) => {
      dispatch({ type: "UPDATE_CLASS", payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
    student: state.selectedStudent,
    selectedClass:state.selectedClass
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);

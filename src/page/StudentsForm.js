import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "20px",
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(0),
  },
}));
const InitialValues = {
  FirstName: "",
  FamilyName: "",
  ClassRoom: "",
  RegistrationNumber: null,
  Points: {
    subjectName: "",
    Exam: "",
    TD: "",
    TP: "",
    subjectMoyenne: "",
  },
  subjectInfo:{
    IncludeExam: false,
    includeTD: false,
    includTP: false,
    coif: "",
    credit: "",
  }
};

const StudentsForm = () => {
  const classes = useStyles();
  const [value, setValue] = useState(InitialValues);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/get-subject").then((res) => {
      let getdata = res.data;
      setData(getdata);
    });
  }, []);

  const handleSubmite = (e) => {
  console.log(value)
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
        console.log(res);
      })
      .catch((error) => {
        console.log(error.data);
      });
      console.log(value)
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSubjectName = (e) => {
    setValue({
      ...value,
      Points: {
        ...value.Points,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAddEXAM = (e) => {
    setValue({
      ...value,
      Points: {
        ...value.Points,
        [e.target.name]: parseFloat(e.target.value),
      },
    });
  };

  const handleAddTP = (e) => {
    setValue({
      ...value,
      Points: {
        ...value.Points,
        [e.target.name]: parseFloat(e.target.value),
      },
    });
  };

  const handleAddTD = (e) => {
    setValue({
      ...value,
      Points: {
        ...value.Points,
        [e.target.name]: parseFloat(e.target.value),
      },
    });
  };

  return (
    <form>
      <div className={classes.root}>
        <div className={classes.pageIcon}>
          <Typography variant="h6" component="div">
            Insert Students{" "}
          </Typography>
        </div>
      </div>
      <TextField
        variant="outlined"
        label="Family Name"
        name="FamilyName"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        label="First Name"
        name="FirstName"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        label="Registration Number"
        name="RegistrationNumber"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        label="Class Room"
        name="ClassRoom"
        onChange={handleChange}
      />

      <Autocomplete
        options={data}
        getOptionLabel={(option) => option.subjectName}
        renderInput={(params) => (
          <TextField
            value={value.Points.subjectName}
            label="subject Name"
            variant="outlined"
            name="subjectName"
            onSelect={handleAddSubjectName}
            {...params}
          />
        )}
      />

      <TextField
        variant="outlined"
        label="Exam"
        name="Exam"
        type="number"
        step="0.1"
        min="0"
        max="20"
        value={value.Points.Exam}
        onChange={handleAddEXAM}
      />
      <TextField
        variant="outlined"
        label="TD"
        type="number"
        step="0.1"
        min="0"
        max="20"
        value={value.Points.TD}
        name="TD"
        onChange={handleAddTD}
      />
      <TextField
        variant="outlined"
        label="TP"
        type="number"
        step="0.1"
        min="0"
        max="20"
        value={value.Points.TP}
        name="TP"
        onChange={handleAddTP}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmite}
      >
        Submit
      </Button>
    </form>
  );
};

export default StudentsForm;

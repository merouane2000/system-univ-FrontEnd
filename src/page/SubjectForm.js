import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  subjectName: "",
  coif: null,
  credit: null,
  EXAM: false,
  TP: false,
  TD: false,
  Semaster: "",
};

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

const SubjectForm = () => {
  const classes = useStyles();
  const [value, setValue] = useState(InitialValues);

  const handleSubmite = (e) => {
    console.log(value);

    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/subject",
        {
          values: value,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.data);
      });
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
    <form>
      <div className={classes.root}>
        <div className={classes.pageIcon}>
          <Typography variant="h6" component="div">
            Insert Subjects{" "}
          </Typography>
        </div>
      </div>
      <TextField
        variant="outlined"
        label="subjectName"
        name="subjectName"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        label="coif"
        name="coif"
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        label="credit"
        name="credit"
        onChange={handleChange}
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
            value={value.Semaster}
            variant="outlined"
            name="Semaster"
            onSelect={handleAddSemaster}
          />
        )}
      />
      EXAM :{" "}
      <Checkbox
        name="EXAM"
        value={!value.EXAM}
        size="small"
        onClick={handleChange}
      />
      TD{" "}
      <Checkbox
        name="TD"
        value={!value.TD}
        size="small"
        onClick={handleChange}
      />
      TP{" "}
      <Checkbox
        name="TP"
        value={!value.TP}
        size="small"
        onChange={handleChange}
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

export default SubjectForm;

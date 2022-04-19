import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";

const InitialValues = {
  subjectName: "",
  coif: null,
  credit: null,
  EXAM: "",
  TP: "",
  TD: "",
  Semaster: "",
};

const SubjectForm = () => {
  const [value, setValue] = useState(InitialValues);

  const handleSubmite = (e) => {
    
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
      console.log(res)
      })
      .catch((error) => {
        console.log(error.data);
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
      <TextField
        variant="outlined"
        label="Semaster"
        name="Semaster"
        onChange={handleChange}
      />
      EXAM :{" "}
      <Checkbox
        name="EXAM"
        value='EXAM'
        size="small"
        onChange={handleChange}
      />
      TD{" "}
      <Checkbox
        name="TD"
        value='TD'
        size="small"
        onChange={handleChange}
      />
      TP{" "}
      <Checkbox
        name="TP"
        value='TP'
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

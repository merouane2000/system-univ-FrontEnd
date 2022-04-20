import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import Button from "@material-ui/core/Button";

const StudentsForm = () => {
  const handleSubmite = (e) => {
    e.preventDefault();
    axios
    .post(
      "http://localhost:4000/student",
      {
       values: value,
       datas:data

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

  const [value, setValue] = useState({
    FirstName: "",
    FamilyName: "",
    ClassRoom: "",
    RegistrationNumber: null,
    Points: {
      subjectName: "",
      Exam: null,
      TD: null,
      TP: null,
    },
  });

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
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleAddTP = (e) => {
    setValue({
      ...value,
      Points: {
        ...value.Points,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleAddTD = (e) => {
    setValue({
      ...value,
      Points: {
        ...value.Points,
        [e.target.name]: e.target.value,
      },
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/get-subject").then((res) => {
      let getdata = res.data;
      setData(getdata);
      console.log(data);
    });
  }, []);

  return (
    <form>
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
      <TextField
        variant="outlined"
        label="Exam"
        name="Exam"
        value={value.Points.Exam}
        onChange={handleAddEXAM}
      />
      <TextField
        variant="outlined"
        label="TD"
        value={value.Points.TD}
        name="TD"
        onChange={handleAddTD}
      />
      <TextField
        variant="outlined"
        label="TP"
        value={value.Points.TP}
        name="TP"
        onChange={handleAddTP}
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

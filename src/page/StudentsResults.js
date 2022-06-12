import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const columns = [
  {
    field: "familyName",
    headerName: "First name",
    width: 200,
    editable: true,
  },
  {
    field: "name",
    headerName: "Last name",
    width: 200,
    editable: true,
  },
  {
    field: "registrationNumber",
    headerName: "registration Number",
    width: 200,
    editable: true,
  },
  {
    field: "avg",
    headerName: "AVG",
    width: 200,
    editable: true,
  },
  {
    field: "admission",
    headerName: "Admission",
    width: 200,
    editable: true,
  },
  // {
  //   field: "credit",
  //   headerName: "Credit",
  //   width: 200,
  //   editable: true,
  // },
];
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

export default function StudentsResults() {
  const classes = useStyles();
  const calculateAverage = (subjects) => {
    let sum = 0;
    let coefs = 0;
    subjects.map((subject) => {
      if (subject.semester === semester && subject.year === promo) {
        let local =
          subject.TD * subject.coefTD +
          subject.TP * subject.coefTP +
          subject.exam * subject.coefExam;
        sum += local * subject.coef;
        coefs += subject.coef;
      }
    });
    return coefs != 0 ? parseFloat(sum / coefs ).toFixed(2) : 0;
  };

  const calculateCredit = (subjects) => {
    let sum = 0;
    subjects.map((subject) => {
      if (subject.semester === semester && subject.year === promo) {
        let local =
          subject.TD * subject.coefTD +
          subject.TP * subject.coefTP +
          subject.exam * subject.coefExam;
        if (local > 10) sum += subject.credit;
      }
    });
    return sum;
  };

  const [data, setData] = useState([]);
  const [semester, setSemester] = useState("");
  const [promo, setPromo] = useState("");
  const [currentStudents, setCurrentStudents] = useState([]);

  const selectCurrentStudents = () => {
    let listedStudents = [];
    data.map((student) => {
      console.log(`${promo} ooo ${semester}`);
      const output = student.classes.some(
        (cls) => cls.year === promo && cls.semastre === semester
      );
      console.log(output);
      if (output) listedStudents.push(student);
    });
    setCurrentStudents(listedStudents);
  };

  const calculateCurrentStudentAverage = () => {
    let clone = [...currentStudents];
    clone = clone.map((student) => {
      const subjects = student.subjects;
      const avg = calculateAverage(subjects);
      const credit = calculateCredit(subjects);
      student.credit = credit;
      student.avg = avg;
      if (avg >= 10) {
        student.admission = "ACCEPTED";
        student.credit = 30;
      }
      if (avg < 10 && avg > 9.5) student.admission = "ACCEPTED / DEBT";
      if (avg < 9.5 && avg >= 9) student.admission = "RACHAT";
      if (avg < 9) student.admission = "REJECTED";

      return student;
    });
    setCurrentStudents(clone);
  };

  useEffect(() => {}, [data]);
  useEffect(() => {
    calculateCurrentStudentAverage();
  }, [currentStudents]);
  useEffect(() => {
    selectCurrentStudents();
  }, [promo]);
  useEffect(() => {
    selectCurrentStudents();
  }, [semester]);
  useEffect(() => {
    axios.get("http://localhost:4000/get-student").then((res) => {
      const output = [];
      res.data.map((obj) => {
        output.push(obj._doc);
      });
      setData(output);
    });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Grid container spacing={3} style={{ padding: 5 }}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Affichage</Paper>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
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
                value={promo}
                onSelect={(e) => {
                  setPromo(e.target.value);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
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
                value={semester}
                onSelect={(e) => {
                  setSemester(e.target.value);
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <DataGrid
        rows={currentStudents}
        getRowId={(data) => data._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

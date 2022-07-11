import { withStyles, makeStyles, alpha } from "@material-ui/core/styles";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import UiAppBar from "../component/UiAppBar";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    marginBottom: 5,
  },
  icon: {
    marginRight: 20,
  },
  nobutton: {
    marginLeft: 400,
  },
  Alert: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  layout: {
    width: 1000,

    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    width: 1000,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const CustomInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    minWidth: 50,
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "auto",
    maxWidth: "35px",
    padding: "5px 5px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);


function TeacherTabel() {
  const classes = useStyles();
  const [underAvg, setUnderavg] = useState([]);
  const [teacherSubject, setTeacherSubject] = useState("");
  const [addedValue, setAddedValue] = useState(0);


  const changeTD = (e, index) => {
    let clone = index;
    clone.TD = e.target.value;
  };

  const changeTP = (e, index) => {
    let clone = index;
    clone.TP = e.target.value;
  };

  const changeExam = (e, index) => {
    let clone = index;
    clone.exam = e.target.value;
  };

  const calculateAverage = (subjects) => {
    let sum = 0;
    let coefs = 0;
    subjects.map((subject) => {
      if (
        subject.semester === sessionSemester &&
        subject.year === sessionPromo
      ) {
        let local =
          subject.TD * subject.coefTD +
          subject.TP * subject.coefTP +
          subject.exam * subject.coefExam;
        sum += local * subject.coef;
        coefs += subject.coef;
      }
    });
    return coefs != 0 ? parseFloat(sum / coefs).toFixed(2) : 0;
  };
  const selectSubjectUnderAverage = (subjects) => {
    let avg = 0;
    subjects.map((subject) => {
      if (subject.name == teacherSubject) {
        avg = parseFloat(
          subject.TD * subject.coefTD +
            subject.TP * subject.coefTP +
            subject.exam * subject.coefExam
        ).toFixed(2);
        subject.avg = avg;
      }
    });
    return avg;
  };
  const calculateSelectedSubjectAverage = (subject) => {
    let avg = 0;
    return (avg = parseFloat(
      subject.TD * subject.coefTD +
        subject.TP * subject.coefTP +
        subject.exam * subject.coefExam
    ).toFixed(2));
  };

  const sessionPromo = sessionStorage.getItem("Promo");
  const sessionSemester = sessionStorage.getItem("Year");
  const handelSearch = async () => {
    console.log("handelSearch clicked");

    await axios.get("http://localhost:4000/get-student").then((res) => {
      const output = [];
      res.data.map((obj) => {
        output.push(obj._doc);
      });
      let cloneUnderAvg = [];
      console.log(output);
      output.map((student) => {
        const isSelcted = student.classes.some(
          (cls) => cls.year === sessionPromo && cls.semastre === sessionSemester
        );
        if (isSelcted) {
          const avg = calculateAverage(student.subjects);
          const subjectavg = selectSubjectUnderAverage(student.subjects);
          student.avg = avg;
          if (avg < 10 && subjectavg < 10 && avg >= parseFloat(rachat)) {
            cloneUnderAvg.push(student);
          }
          setUnderavg(cloneUnderAvg);
        }
        console.log("handelSearch end");
      });
    });
  };

  const handelRechatAccepted = async (subject) => {
    let clone = [...underAvg];
    clone.map((student) => {
      if (student._id == subject.student_id) {
        student.subjects.find(
          (subject) => subject.name === teacherSubject
        ).exam = subject.exam + parseFloat(addedValue);
      }
    });
    setUnderavg(clone);
    calculateAverage(
      underAvg.find((student) => student._id == subject.student_id).subjects
    );

    await axios
      .post(
        "http://localhost:4000/student",
        {
          values: underAvg.find((student) => student._id == subject.student_id),
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log("sayi");
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const rachat = sessionStorage.getItem("Rachat");

  const proposeRachat = (subject) => {
    let rachat = 0;
    rachat = parseFloat(
      10 - (subject.TD * subject.coefTD + subject.TP * subject.coefTP) / 0.6
    ).toFixed(2);
    return rachat;
  };
  const handelRechatDecline = (subject) => {
    let clone = [...underAvg];
    clone.map((student) => {
      if (student._id == subject.student_id) {
        student.subjects.find(
          (subject) => subject.name === teacherSubject
        ).exam = subject.exam - parseFloat(addedValue);
      }
    });
    setUnderavg(clone);
    calculateAverage(
      underAvg.find((student) => student._id == subject.student_id).subjects
    );
  };

  return (
    <div>
      <UiAppBar />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container direction="row" rowSpacing={1}>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label=" Secondary Teacher Subject"
                variant="outlined"
                onChange={(e) => {
                  setTeacherSubject(e.target.value);
                }}
              />
            </Grid>
            <Grid
              container
              item
              xs={3}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handelSearch()}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          .
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Marks table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>code</StyledTableCell>
                  <StyledTableCell align="right">Family Name</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Note EXAM</StyledTableCell>
                  <StyledTableCell align="right">Note TD</StyledTableCell>
                  <StyledTableCell align="right">Note TP</StyledTableCell>
                  <StyledTableCell align="right">Added Mark </StyledTableCell>
                  <StyledTableCell align="right">
                    Rachat Suggestion
                  </StyledTableCell>
                  <StyledTableCell align="right">Subject Avg</StyledTableCell>
                  <StyledTableCell align="right">Validation </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {underAvg === null && typeof underAvg === typeof undefined
                  ? console.log("empty")
                  : underAvg.map((student, index) => (
                      <StyledTableRow key={student.name}>
                        <StyledTableCell align="right">{index}</StyledTableCell>
                        <StyledTableCell align="right">
                          {student.familyName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {" "}
                          {student.name}{" "}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <FormControl className={classes.margin}>
                            <CustomInput
                              defaultValue={
                                student.subjects.find(
                                  (subject) => subject.name === teacherSubject
                                ).exam
                              }
                              name="exam"
                              onChange={(e) =>
                                changeExam(
                                  e,
                                  student.subjects.find(
                                    (subject) => subject.name === teacherSubject
                                  )
                                )
                              }
                            />
                          </FormControl>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <FormControl className={classes.margin}>
                            <CustomInput
                              defaultValue={
                                student.subjects.find(
                                  (subject) => subject.name === teacherSubject
                                ).TD
                              }
                              name="TD"
                              onChange={(e) =>
                                changeTD(
                                  e,
                                  student.subjects.find(
                                    (subject) => subject.name === teacherSubject
                                  )
                                )
                              }
                            />
                          </FormControl>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <FormControl className={classes.margin}>
                            <CustomInput
                              defaultValue={
                                student.subjects.find(
                                  (subject) => subject.name === teacherSubject
                                ).TP
                              }
                              name="TP"
                              onChange={(e) =>
                                changeTP(
                                  e,
                                  student.subjects.find(
                                    (subject) => subject.name === teacherSubject
                                  )
                                )
                              }
                            />
                          </FormControl>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <CustomInput
                            type="number"
                            disabled={
                              calculateSelectedSubjectAverage(
                                student.subjects.find(
                                  (subject) => subject.name === teacherSubject
                                )
                              ) >= 10
                            }
                            defaultValue={0}
                            onChange={(e) => setAddedValue(e.target.value)}
                          />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          style={{ color: "green" }}
                        >
                          <FormControl className={classes.margin}>
                            +{" "}
                            {proposeRachat(
                              student.subjects.find(
                                (subject) => subject.name === teacherSubject
                              )
                            )}
                          </FormControl>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <FormControl className={classes.margin}>
                            {calculateSelectedSubjectAverage(
                              student.subjects.find(
                                (subject) => subject.name === teacherSubject
                              )
                            )}
                          </FormControl>
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <Button
                            className={classes.button}
                            variant="outlined"
                            size="small"
                            color="primary"
                            disabled={
                              calculateSelectedSubjectAverage(
                                student.subjects.find(
                                  (subject) => subject.name === teacherSubject
                                )
                              ) >= 10
                            }
                            id={index}
                            onClick={() =>
                              handelRechatAccepted(
                                student.subjects.find(
                                  (subject) => subject.name === teacherSubject
                                )
                              )
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            className={classes.button}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() =>
                              handelRechatDecline(
                                student.subjects.find(
                                  (subject) => subject.name === teacherSubject
                                )
                              )
                            }
                          >
                            Decline
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                <StyledTableRow></StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </main>
    </div>
  );
}

export default TeacherTabel;

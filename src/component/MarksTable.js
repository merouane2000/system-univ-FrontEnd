import { withStyles, makeStyles, alpha } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Alert from "@material-ui/lab/Alert";

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
    marginLeft: 570,
   
  },
  Alert: {
    alignItems: "center",
    justifyContent: "space-between"
   
  },
}));

const CustomInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
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

function MarksTable(props) {
  const classes = useStyles();
  const changeTD = (e, index) => {
    let clone = [...props.selectedListedSubjects];
    clone[index].TD = e.target.value;
    props.updateListedSubjects(clone);
  };

  const changeTP = (e, index) => {
    let clone = [...props.selectedListedSubjects];
    clone[index].TP = e.target.value;
    props.updateListedSubjects(clone);
    console.log(e.target.value);
  };

  const changeExam = (e, index) => {
    let clone = [...props.selectedListedSubjects];
    clone[index].exam = e.target.value;
    props.updateListedSubjects(clone);
    console.log(e.target.value);
  };

  const handleUpdate = () => {
    axios
      .post(
        "http://localhost:4000/update-subjects",
        {
          selectedClass: props.selectedClass,
          student_id: props.student._id,
          subjects: props.selectedListedSubjects,
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

  const calculateAverage = () => {
    let sum = 0;
    let coefs = 0;
    props.selectedListedSubjects.map((subject) => {
      let local =
        subject.TD * subject.coefTD +
        subject.TP * subject.coefTP +
        subject.exam * subject.coefExam;
      sum += local * subject.coef;
      coefs += subject.coef;
    });
    return coefs != 0 ? parseFloat(sum / coefs).toFixed(2) : 0;
  };
  const calculateCredit = () => {
    if (calculateAverage() >= 10) return 30;
    else {
      let sum = 0;
      props.selectedListedSubjects.map((subject) => {
        let local =
          subject.TD * subject.coefTD +
          subject.TP * subject.coefTP +
          subject.exam * subject.coefExam;
        if (local > 10) sum += subject.credit;
      });

      return sum;
    }
  };

  const [state, setState] = useState({ severity: "", Msg: "", visibility: "hidden" });

  const calculateSubjectAverage = (subject) => {
    let subjectAvg = 0;
    return (subjectAvg = parseFloat(
      subject.TD * subject.coefTD +
        subject.TP * subject.coefTP +
        subject.exam * subject.coefExam
    ).toFixed(2));
  };
  const handelRechat = (subject) => {
    var addedValueExam = parseFloat(10 - subject.exam).toFixed(2);
    var addedValueTP = parseFloat(10 - subject.TP).toFixed(2);
    var addedValueTD = parseFloat(10 - subject.TD).toFixed(2);
    if (addedValueExam > 10) {
      addedValueExam = addedValueExam;
    }
    if (subject.coefTD == 0 || 10 - subject.TD < 0) {
      addedValueTD = 0;
    } else {
      addedValueTD = addedValueTD;
    }
    if (subject.coefTP == 0 || 10 - subject.TP < 0) {
      addedValueTP = 0;
    } else {
      addedValueTP = addedValueTP;
    }
    setState({
      severity: "success",
      Msg:
        " you add " +
        Number(addedValueExam).toFixed(2)  +
        " in Exam and " +
        Number(addedValueTD).toFixed(2)  +
        " in TD and " +
        Number(addedValueTP).toFixed(2)  +
        " in TP",
      visibility: "visible",
    });
    let subjectAvg = 0;
    return (subjectAvg = 10.00);
  };

  return (
    <div>
      <Alert severity={state.severity} className={classes.Alert}>
        {state.Msg}
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          style={{visibility: state.visibility }}
          className={classes.nobutton}
        
        >
          Undo
        </Button>
        
      </Alert>
      .
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Marks table">
          <TableHead>
            <TableRow>
              <StyledTableCell>code</StyledTableCell>
              <StyledTableCell align="right">Subject name</StyledTableCell>
              <StyledTableCell align="right">Note exam</StyledTableCell>
              <StyledTableCell align="right">Coef exam</StyledTableCell>
              <StyledTableCell align="right">Note TD</StyledTableCell>
              <StyledTableCell align="right">Coef TD</StyledTableCell>
              <StyledTableCell align="right">Note TP</StyledTableCell>
              <StyledTableCell align="right">Coef TP</StyledTableCell>
              <StyledTableCell align="right">Subject Avg</StyledTableCell>
              <StyledTableCell align="right">Credit</StyledTableCell>
              <StyledTableCell align="right">Subject Coef</StyledTableCell>
              <StyledTableCell align="right">Validation </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.selectedListedSubjects.map((subject, index) => (
              <StyledTableRow key={subject.name}>
                <StyledTableCell align="right">{index}</StyledTableCell>
                <StyledTableCell component="th" scope="subject">
                  {subject.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormControl className={classes.margin}>
                    <CustomInput
                      defaultValue={subject.exam}
                      name="exam"
                      onChange={(e) => changeExam(e, index)}
                    />
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {subject.coefExam}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormControl className={classes.margin}>
                    <CustomInput
                      defaultValue={subject.TD}
                      name="TD"
                      onChange={(e) => changeTD(e, index)}
                    />
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {subject.coefTD}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormControl className={classes.margin}>
                    <CustomInput
                      defaultValue={subject.TP}
                      name="TP"
                      onChange={(e) => changeTP(e, index)}
                    />
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {subject.coefTP}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {calculateSubjectAverage(subject)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {subject.credit}
                </StyledTableCell>
                <StyledTableCell align="right">{subject.coef}</StyledTableCell>
                <StyledTableCell align="right">
                  {calculateAverage() >= 10 ? (
                    <CheckCircleTwoToneIcon className={classes.icon} />
                  ) : calculateSubjectAverage(subject) < 10 ? (
                    <>
                      <Button
                        className={classes.button}
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => handelRechat(subject)}
                      >
                        Yes
                      </Button>
                    </>
                  ) : (
                    <CheckCircleTwoToneIcon className={classes.icon} />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={5}>
                Average mark: {calculateAverage() + "/20"}
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={5}>
                Credit: {calculateCredit() + "/30"}
              </StyledTableCell>
              <StyledTableCell align="left" colSpan={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudents: (data) => {
      dispatch({ type: "UPDATE_STUDENTS", payload: data });
    },
    updateClass: (data) => {
      dispatch({ type: "UPDATE_CLASS", payload: data });
    },
    updateListedSubjects: (data) => {
      dispatch({ type: "UPDATE_LISTED_SUBJECTS", payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
    student: state.selectedStudent,
    selectedClass: state.selectedClass,
    selectedListedSubjects: state.listedSubjects,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MarksTable);

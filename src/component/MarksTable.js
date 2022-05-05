import React, { useState, useEffect } from "react";
import { withStyles, makeStyles,alpha } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function RedditTextField(props) {
  const classes = useStylesReddit();
  return <TextField InputProps={{ classes, disableUnderline: true, shrink: true  }} {...props} />;
}

function MarksTable(props) {
  const classes = useStyles();
  const subjects = props.selectedListedSubjects;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Marks table">
        <TableHead>
          <TableRow>
            <StyledTableCell>code</StyledTableCell>
            <StyledTableCell align="right">Subject name</StyledTableCell>
            <StyledTableCell align="right">Note TD</StyledTableCell>
            <StyledTableCell align="right">Coef TD</StyledTableCell>
            <StyledTableCell align="right">Note TP</StyledTableCell>
            <StyledTableCell align="right">Coef TP</StyledTableCell>
            <StyledTableCell align="right">Note exam</StyledTableCell>
            <StyledTableCell align="right">Coef exam</StyledTableCell>
            <StyledTableCell align="right">Subject Avg</StyledTableCell>
            <StyledTableCell align="right">Credit</StyledTableCell>
            <StyledTableCell align="right">Subject Coef</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, code) => (
            <StyledTableRow key={subject.name}>
              <StyledTableCell align="right">{code}</StyledTableCell>
              <StyledTableCell component="th" scope="subject">
                {subject.name}
              </StyledTableCell>
              <StyledTableCell align="right">
              <RedditTextField
                label="Reddit"
                className={classes.margin}
                defaultValue="0"
                variant="filled"
                id="reddit-input"
              />
              </StyledTableCell>
              <StyledTableCell align="right">{subject.coefTD}</StyledTableCell>
              <StyledTableCell align="right">{subject.TP}</StyledTableCell>
              <StyledTableCell align="right">{subject.coefTP}</StyledTableCell>
              <StyledTableCell align="right">{subject.exam}</StyledTableCell>
              <StyledTableCell align="right">
                {subject.coefExam}
              </StyledTableCell>
              <StyledTableCell align="right">
                {subject.TD * subject.coefTD +
                  subject.TP * subject.coefTP +
                  subject.exam * subject.coefExam}
              </StyledTableCell>
              <StyledTableCell align="right">{subject.credit}</StyledTableCell>
              <StyledTableCell align="right">{subject.coef}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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

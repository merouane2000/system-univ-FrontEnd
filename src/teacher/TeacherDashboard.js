import React, { useState, useEffect, useLocation } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeacherInfo from "./TeacherInfo";


import axios from "axios";
import { useNavigate } from "react-router-dom";
import UiAppBar from "../component/UiAppBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
}));

const TeacherDashboad = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    axios
      .get("http://localhost:4000/teacher-info")
      .then((res) => {
        res.data.map((teacher) => {
          if (teacher.email === email && teacher.isActive) {
            navigate("/teacher/tabel");
          }
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  return (
    <div>
      <UiAppBar />
      <TeacherInfo />
    </div>
  );
};

export default TeacherDashboad;

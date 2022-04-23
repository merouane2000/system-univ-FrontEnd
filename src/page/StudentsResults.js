import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
    field: "subjectMoyenne",
    headerName: "subject Moyenne",
    width: 200,
    editable: true,
  },
  {
    field: "classRoom",
    headerName: "class Room",
    width: 200,
    editable: true,
  },
];

export default function StudentsResults() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/get-student").then((res) => {
      let getdata = res.data;
      setData(getdata);
    });
  }, []);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data}
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

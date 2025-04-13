// import * as React from "react";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getData, remove } from "../Functions/user";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Info() {
  const [data, setData] = useState([]);
  const currentUserId = parseInt(localStorage.getItem("id"));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <TableContainer component={Paper} sx={{ padding: 10 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.age}</StyledTableCell>
                    <StyledTableCell align="right">{item.role}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.id === currentUserId ? (
                        <span
                          onClick={() => handleDelete(item.id)}
                          className="!text-red-700 cursor-pointer"
                        >
                          Delete
                        </span>
                      ) : (
                        "-"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.id === currentUserId ? (
                        <Link
                          to={"/edit/" + item.id}
                          className="!text-blue-700"
                        >
                          Edit
                        </Link>
                      ) : (
                        "-"
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

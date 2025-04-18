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
import { Link, useParams } from "react-router-dom";
import { getData, read, remove, update } from "../Functions/user";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const currentUser = localStorage.getItem("isAdmin");
  const [currentUserData, setCurrentUserData] = useState(null);

  // console.log(currentUserData);

  useEffect(() => {
    const id = parseInt(localStorage.getItem("id"));
    if (!isNaN(id)) {
      read(id)
        .then((res) => setCurrentUserData(res.data))
        .catch((err) => setCurrentUserData(null));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id)
          .then((res) => {
            console.log(res);
            // localStorage.removeItem("authtoken");
            // localStorage.removeItem("user");
            // localStorage.removeItem("id");

            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            }).then(() => {
              // window.location.reload();
              loadData();
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error", "Something went wrong!", "error");
          });
      }
    });
  };

  const ishaveUser = async () => {
    const id = parseInt(localStorage.getItem("id"));

    if (!id || isNaN(id)) {
      Swal.fire({
        icon: "error",
        title: "Invalid ID",
        text: "User not found.",
      });
      return;
    }

    try {
      await read(id); // ถ้ามี user อยู่
      navigate("/form/" + id);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "User not found",
        text: "Cannot proceed because the user does not exist.",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <div className="absolute top-15 right-20">
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={ishaveUser}
          >
            Add data
          </Button>
        </div>
      </div>
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
                      {currentUser === "true" ? (
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
                      {currentUser === "true" ? (
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

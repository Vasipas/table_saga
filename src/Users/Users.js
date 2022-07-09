import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Users(props) {
  const [page, setPage] = useState(0)
  let [rows, setRows] = useState([])
  let navigate = useNavigate()
  const rowsPerPage = 5
  
  useEffect(() => {
    let firstRow = page * rowsPerPage
    let lastRow = firstRow + rowsPerPage
    let newRows = [...props.users].slice(firstRow, lastRow)
    setRows(newRows)
  }, [page, props.users])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (e) => {
    navigate(`edit/${e.currentTarget.id}`)
  }

  const handleCreate = () => {
    navigate(`edit/create`)
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: '20px auto'}}>
      <Button onClick={handleCreate} variant="contained">CREATE</Button>
      <TablePagination
        component="div"
        count={props.users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Surname</TableCell>
            <TableCell align="center">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              onClick={handleRowClick}
              id={row.user_id}
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="center">{row.surname}</TableCell>
              <TableCell align="center">{(row.desc.length > 50) ? `${row.desc.slice(0,50)}...`: row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

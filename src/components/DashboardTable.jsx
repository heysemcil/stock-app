import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

export default function DashboardTable({title, header, data}) {
  return (
    <TableContainer component={Paper} sx={{ height: 350 }}>
      <Typography variant="h6" align="center" p={2}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((item, index)=>(
            <TableCell align="center" key={index}>{item}</TableCell>
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(-3)
            .reverse()
            .map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                {row.firm&&  <TableCell align="center">{row.firm}</TableCell>}
                <TableCell align="center">{row.product}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">{row.category[0].name}</TableCell>
                <TableCell align="center">${row.price}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">${row.price_total}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

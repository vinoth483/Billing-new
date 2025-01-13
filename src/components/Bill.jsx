import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import "../style/billVerification.css";

const BillVerification = () => {
  const initialBills = [
    {
      siNo: 1,
      companyName: "ABC Corp",
      contactNumber: "1234567890",
      gstin: "22ABCDE1234F1Z5",
      bankDetails: "Bank A, Account No: 12345",
    },
    {
      siNo: 2,
      companyName: "XYZ Ltd",
      contactNumber: "9876543210",
      gstin: "33ABCDE5678G2H5",
      bankDetails: "Bank B, Account No: 67890",
    },
  ];

  return (
    <div className="bill-verification">
      <header className="bill-verification-header">
        <h3>Bill Verification</h3>
      </header>
<center>
      <div className="bill-verification-search">
      <input
          className="search-input"
          type="text"
          name="name"
          placeholder="Search by Name"
          sx={{ width: '600px' }}
        />
        <Button
          variant="contained"
          className="bill-verification-search-button"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
            width: "150px",
          }} 
        >
          Verifiy Bill
        </Button>
      </div>
      </center>
      <TableContainer component={Paper} className="bill-verification-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SI NO</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>GSTIN</TableCell>
              <TableCell>Bank Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialBills.map((bill) => (
              <TableRow key={bill.siNo}>
                <TableCell>{bill.siNo}</TableCell>
                <TableCell>{bill.companyName}</TableCell>
                <TableCell>{bill.contactNumber}</TableCell>
                <TableCell>{bill.gstin}</TableCell>
                <TableCell>{bill.bankDetails}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BillVerification;

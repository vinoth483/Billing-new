import React, { useState } from "react";
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
  Dialog,
  DialogContent,
} from "@mui/material";
import "../style/company.css";

const Company = () => {
  const [open, setOpen] = useState(false);

  const initialCompanies = [
    {
      siNo: 1,
      companyName: "ABC Corp",
      contactNumber: "1234567890",
      gstin: "22ABCDE1234F1Z5",
      bankDetails: "Bank A, Account No: 12345",
      theme: "Default",
    },
    {
      siNo: 2,
      companyName: "XYZ Ltd",
      contactNumber: "9876543210",
      gstin: "33ABCDE5678G2H5",
      bankDetails: "Bank B, Account No: 67890",
      theme: "Dark",
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="company">
      <header className="company-header">
        <h3>Company</h3>
        <Button
          variant="contained"
          className="company-add-button"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
            width: "400px",
            marginBottom: "20px",
          }}
          onClick={handleOpen}
        >
          + Company
        </Button>
      </header>

      <TableContainer component={Paper} className="company-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SI NO</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>GSTIN</TableCell>
              <TableCell>Bank Details</TableCell>
              <TableCell>Theme Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialCompanies.map((company) => (
              <TableRow key={company.siNo}>
                <TableCell>{company.siNo}</TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.contactNumber}</TableCell>
                <TableCell>{company.gstin}</TableCell>
                <TableCell>{company.bankDetails}</TableCell>
                <TableCell>{company.theme}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <div className="popup-grid">
            <TextField placeholder="Enter Company Name" variant="outlined" size="small" />
            <TextField placeholder="Enter Contact" variant="outlined" size="small" />
            <TextField placeholder="Enter Email" variant="outlined" size="small" />
            <TextField placeholder="Enter Website" variant="outlined" size="small" />
            <TextField placeholder="Enter GSTIN" variant="outlined" size="small" />
            <TextField placeholder="Enter Acc No" variant="outlined" size="small" />
            <TextField placeholder="Enter IFSC" variant="outlined" size="small" />
            <TextField placeholder="Enter Terms and Condition" variant="outlined" size="small" />
            <TextField placeholder="Enter Invoice Format" variant="outlined" size="small" />
            <TextField placeholder="Enter Quote Format" variant="outlined" size="small" />

            <Button variant="outlined" className="reset-button">Reset</Button>
            <Button variant="contained" className="cancel-button">Cancel</Button>
            <Button variant="contained" className="logo-button">Select Logo</Button>
            <Button variant="contained" className="save-button">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Company;

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
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  IconButton,
  Checkbox,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../style/company.css";

const Company = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [companies, setCompanies] = useState([
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
  ]);

  // A backup of the original company list for search functionality
  const [originalCompanies] = useState(companies);

  const [formValues, setFormValues] = useState({
    companyName: "",
    contactNumber: "",
    gstin: "",
    bankDetails: "",
    theme: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormValues({
      companyName: "",
      contactNumber: "",
      gstin: "",
      bankDetails: "",
      theme: "",
    });
    setOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setCompanies((prev) => [
      ...prev,
      { siNo: prev.length + 1, ...formValues },
    ]);
    handleClose();
  };

  const handleSearch = () => {
    const filteredCompanies = originalCompanies.filter((company) =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCompanies(filteredCompanies);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    handleCloseMenu();
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  return (
    <div className="company">
      <h3>Company</h3>
      <center>
      <div
        className="user__search"
        style={{ display: "flex", justifyContent: "center", gap: "16px" }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '600px' }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#2b356bd3", color: "white" }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2b356bd3", color: "white" }}
          onClick={handleOpen} // Changed to handleOpen
        >
          + Company
        </Button>
      </div>
      </center>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.siNo}>
                <TableCell>{company.siNo}</TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.contactNumber}</TableCell>
                <TableCell>{company.gstin}</TableCell>
                <TableCell>{company.bankDetails}</TableCell>
                <TableCell>{company.theme}</TableCell>
                <TableCell>
                  <IconButton
                    className="small-icon-button"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </TableCell>
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
            <TextField placeholder="Enter Bank Name" variant="outlined" size="small" />
            <TextField placeholder="Enter IFSC" variant="outlined" size="small" />
            <TextField placeholder="Enter Terms and Condition" variant="outlined" size="small" />
            <TextField placeholder="Enter Invoice Format" variant="outlined" size="small" />
            <TextField placeholder="Enter Quote Format" variant="outlined" size="small" />
            <TextField placeholder="Select Quate Theme" variant="outlined" size="small" />
            <TextField placeholder="Select Invoice Theme" variant="outlined" size="small" />

            <Button
  sx={{
    color: 'black',
    border: '1px solid black', // Add black border
    '&:hover': {
      color: 'white',
    },
  }}
  className="reset-button"
  onClick={() =>
    setFormValues({
      companyName: "",
      contactNumber: "",
      gstin: "",
      bankDetails: "",
      theme: "",
    })
  }
>
  Reset
</Button>
<Button
  sx={{
    color: 'black',
    border: '1px solid black', // Add black border
    '&:hover': {
      color: 'white',
    },
  }}
  className="cancel-button"
>
  Cancel
</Button>
<Button
  sx={{
    color: 'black',
    border: '0.5px solid black', // Add black border
    '&:hover': {
      color: 'white',
    },
  }}
  className="logo-button"
>
  Select Logo
</Button>
<Button
  sx={{
    color: 'black',
    border: '0.5px solid black', // Add black border
    '&:hover': {
      color: 'white',
    },
  }}
  className="save-button"
>
  Save
</Button>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Company;

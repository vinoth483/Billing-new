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
  Select,
  Checkbox,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from '@mui/icons-material/Close';
import "../style/company.css";

const Company = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);  // to store the invoice being edited
const [openEditDialog, setOpenEditDialog] = useState(false);  // to control the dialog visibility

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


  const handleOpen = () => setOpen(true);
  const handleEdit = () => setOpen(true);
const handleClose = () => setOpen(false);

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
  
  const handleDelete = (index) => {
    // Confirm before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this quotation?");
    if (confirmDelete) {
      // Filter out the row by its index
      const updatedData = filteredData.filter((_, i) => i !== index);
      setFilteredData(updatedData); // Update the filtered data state
      handleCloseMenu(); // Close the menu
    }
  };
  

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      
      // Create a FileReader to read the image file and generate a preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setImagePreview(URL.createObjectURL(file)); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleCancel = () => {
    setImagePreview(null); // Clear the image preview
    document.getElementById('fileInput').value = ''; // Clear the file input
  };
  const [open, setOpen] = useState(false); // Manage dialog state
  const [formValues, setFormValues] = useState({
    companyName: "",
    contactNumber: "",
    email: "",
    website: "",
    gstin: "",
    terms: "",
    bankName: "",
    bankAccNo: "",
    ifsc: "",
    invoiceFormat: "",
    quoteFormat: "",
    quoteTheme: "",
    invoiceTheme: ""
  });
  const handleReset = () => {
    setFormValues({
      companyName: "",
      contactNumber: "",
      email: "",
      website: "",
      gstin: "",
      terms: "",
      bankName: "",
      bankAccNo: "",
      ifsc: "",
      invoiceFormat: "",
      quoteFormat: "",
      quoteTheme: "",
      invoiceTheme: ""
    });
    setImagePreview(null);
    document.getElementById("fileInput").value = ""; // Reset file input
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); // Close the dialog
  };
  
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true); // Open the dialog
  };


  return (
    <div className="company">
      <h3>Company</h3>
      <center>
      <div
        className="user__search"
        style={{ display: "flex", justifyContent: "center", gap: "16px" }}
      >
        <input
          className="search-input"
          type="text"
          name="name"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '600px' }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#2b356bd3", color: "white", height: "40px" }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2b356bd3", color: "white", height: "40px" }}
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
            <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Company Name</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Contact Number</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>GSTIN</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Bank Details</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Theme Select</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                   <MenuItem onClick={ handleEdit}>Edit</MenuItem>
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
      <DialogTitle>
        Add Company
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 40,
            top: 10,
            width: 20,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="popup-grid">
          {[
            { placeholder: "Enter Company Name", value: formValues.companyName, key: "companyName" },
            { placeholder: "Enter Contact", value: formValues.contactNumber, key: "contactNumber" },
            { placeholder: "Enter Email", value: formValues.email, key: "email" },
            { placeholder: "Enter Website", value: formValues.website, key: "website" },
            { placeholder: "Enter GSTIN", value: formValues.gstin, key: "gstin" },
            { placeholder: "Enter Terms and Condition", value: formValues.terms, key: "terms" },
            { placeholder: "Enter Bank Name", value: formValues.bankName, key: "bankName" },
            { placeholder: "Enter Bank Acc No", value: formValues.bankAccNo, key: "bankAccNo" },
            { placeholder: "Enter IFSC", value: formValues.ifsc, key: "ifsc" },
            { placeholder: "Enter Invoice Format", value: formValues.invoiceFormat, key: "invoiceFormat" },
            { placeholder: "Enter Quote Format", value: formValues.quoteFormat, key: "quoteFormat" },
            { placeholder: "Select Quote Theme", value: formValues.quoteTheme, key: "quoteTheme", isDropdown: true, options: ["Classic", "Modern", "Elegant"] },
            { placeholder: "Select Invoice Theme", value: formValues.invoiceTheme, key: "invoiceTheme", isDropdown: true, options: ["Basic", "Detailed", "Creative"] },
          ].map(({ placeholder, value, key, isDropdown, options }) =>
            isDropdown ? (
<Select
  key={key}
  value={value}
  onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
  displayEmpty
  fullWidth
  size="small"
  sx={{
    '.MuiSelect-select': {
      minHeight: '30px', // Increases the height of the select field
    },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: '300px', // Adjust dropdown menu height
      },
    },
  }}
>
  <MenuItem value="" disabled>
    {placeholder}
  </MenuItem>
  {options.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ))}
</Select>

            ) : (
              <TextField
                key={key}
                placeholder={placeholder}
                size="small"
                value={value}
                onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
                fullWidth
              />
            )
          )}

          {/* File Upload */}
          <Button
            sx={{
              color: "white",
              backgroundColor: "#2b356bcb",
              width: "100%",
              height: "40px",
              marginTop: "1px",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            Select Logo
          </Button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {imagePreview && (
            <div>
              <p>Preview:</p>
              <img
                src={imagePreview}
                alt="Selected logo"
                style={{
                  width: "50px",
                  height: "50px",
                  marginTop: "1px",
                  objectFit: "cover",
                  display: "inline-block",
                }}
              />
            </div>
          )}
        </div>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#2b356bcb",
            width: "100%",
            height: "40px",
            marginTop: "1px",
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#2b356bcb",
            width: "100%",
            height: "40px",
            marginTop: "1px",
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#2b356bcb",
            width: "100%",
            height: "40px",
            marginTop: "1px",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>


      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
  <DialogTitle>Edit Company
  <IconButton
  edge="end"
  color="inherit"
  onClick={handleCloseEditDialog} // Call a function instead of directly setting state
  aria-label="close"
  sx={{
    position: 'absolute',
    right: 40,
    top: 10,
    width: 20,
  }}
>
  <CloseIcon />
</IconButton>

  </DialogTitle>
  <DialogContent>
    <TextField
      label="Company Name"
      name="description"
      value={editInvoice?.description || ""}
      onChange={(e) => setEditInvoice({ ...editInvoice, description: e.target.value })}
      fullWidth
    />
    <TextField
      label="Contact Number"
      name="brand"
      value={editInvoice?.brand || ""}
      onChange={(e) => setEditInvoice({ ...editInvoice, brand: e.target.value })}
      fullWidth
    />
    <TextField
      label="GSTIN"
      name="qty"
      value={editInvoice?.qty || ""}
      onChange={(e) => setEditInvoice({ ...editInvoice, qty: e.target.value })}
      fullWidth
    />
    <TextField
      label="Bank Details"
      name="rate"
      value={editInvoice?.rate || ""}
      onChange={(e) => setEditInvoice({ ...editInvoice, rate: e.target.value })}
      fullWidth
    />
    <TextField
      label="Theme Select"
      name="category"
      value={editInvoice?.category || ""}
      onChange={(e) => setEditInvoice({ ...editInvoice, category: e.target.value })}
      fullWidth
    />
    {/* Add more fields as required */}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)}       sx={{
        color: 'black !important',
        '&:hover': {
          color: 'white !important',
        },
      }}>Cancel</Button>
    <Button
      onClick={() => {
        // Save changes logic
        setFilteredData(filteredData.map((item) => (item.siNo === editInvoice.siNo ? editInvoice : item)));
        setOpenEditDialog(false);  // Close the dialog after saving
      }}
      sx={{
        color: 'black !important',
        '&:hover': {
          color: 'white !important',
        },
      }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Company;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Menu,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import "../style/DeliveryChalan.css";

const DeliveryChalan = () => {
  const initialData = [
    {
      siNo: 1,
      dcNumber: "Invoice001-dc1",
      customerName: "John Doe",
      company: "ABC Corp",
      invoiceDate: "2024-11-17",
      deliveredBy: "Jane Smith",
      receivedBy: "Alex Brown",
      file: "file1.pdf",
    },
    {
      siNo: 2,
      dcNumber: "DC002",
      customerName: "Customer 2",
      company: "Company B",
      invoiceDate: "2024-11-05",
      deliveredBy: "Jane Smith",
      receivedBy: "Samuel Lee",
      file: "file2.pdf",
    },
    {
      siNo: 3,
      dcNumber: "DC003",
      customerName: "Customer 3",
      company: "Company C",
      invoiceDate: "2024-11-10",
      deliveredBy: "Michael Lee",
      receivedBy: "Nancy White",
      file: "file3.pdf",
    },
  ];

  const [searchFields, setSearchFields] = useState({
    dcNumber: "",
    customerName: "",
    company: "",
    invoiceDate: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    code: "",
    address: "",
    city: "",
    state: "",
    stateCode: "",
    email: "",
    contact: "",
    gstin: "",
  });

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewCustomer({
      name: "",
      code: "",
      address: "",
      city: "",
      state: "",
      stateCode: "",
      email: "",
      contact: "",
      gstin: "",
    });
  };

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveCustomer = () => {
    console.log("Customer details:", newCustomer);
    handleDialogClose();
  };


  const [filteredData, setFilteredData] = useState(initialData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const navigate = useNavigate();
  const [newChalan, setNewChalan] = useState({
    dcNumber: "",
    customerName: "",
    company: "",
    invoiceDate: "",
    deliveredBy: "",
    receivedBy: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = initialData.filter((row) => {
      return (
        (!searchFields.dcNumber || row.dcNumber.includes(searchFields.dcNumber)) &&
        (!searchFields.customerName ||
          row.customerName.toLowerCase().includes(searchFields.customerName.toLowerCase())) &&
        (!searchFields.company ||
          row.company.toLowerCase().includes(searchFields.company.toLowerCase())) &&
        (!searchFields.invoiceDate || row.invoiceDate.includes(searchFields.invoiceDate))
      );
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchFields({
      dcNumber: "",
      customerName: "",
      company: "",
      invoiceDate: "",
    });
    setFilteredData(initialData);
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditOpen = () => {
    setOpenEditDialog(true);
    handleMenuClose();
  };

const handleDelete = (index) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this quotation?");
  if (confirmDelete) {
    const updatedData = filteredData.filter((_, i) => i !== index);
    setFilteredData(updatedData); 
    handleCloseMenu();
  }
};

  const handleEditSave = () => {
    setFilteredData((prevData) =>
      prevData.map((row) =>
        row.siNo === selectedRow.siNo ? { ...selectedRow } : row
      )
    );
    setOpenEditDialog(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewChalan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFileChange = (e) => {
    setNewChalan((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleAddSave = () => {
    const newChalanWithId = {
      ...newChalan,
      siNo: filteredData.length + 1,
      file: newChalan.file ? newChalan.file.name : "No File",
    };

    setFilteredData((prevData) => [...prevData, newChalanWithId]);
    setNewChalan({
      dcNumber: "",
      customerName: "",
      company: "",
      invoiceDate: "",
      deliveredBy: "",
      receivedBy: "",
      file: null,
    });
    setOpenAddPopup(false);
  };
const FilteredData=([
    { siNo: 1, description: "New Item 1", qty: 12 },
    { siNo: 2, description: "New Item 2", qty: 8 },
  ]);

  const handleSearchDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  const handleInvoiceDateChange = (event) => {
    setInvoiceDate(event.target.value);
  };
  const handleClose = () => {
    setOpenAddPopup(false);
};
const handleFileDownload = () => {
  // Logic for downloading the uploaded file
  const fileUrl = "path/to/your/uploaded/file"; // Replace with your file's actual URL or logic
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "uploaded_file_name.extension"; // Replace with the desired file name
  link.click();
};

const handleDCDownload = () => {
  // Logic for downloading table data as a file
  const tableData = [
    ["Header1", "Header2", "Header3"], // Replace with your actual table data
    ["Row1Col1", "Row1Col2", "Row1Col3"],
    ["Row2Col1", "Row2Col2", "Row2Col3"],
  ];

  const csvContent =
    "data:text/csv;charset=utf-8," +
    tableData.map((row) => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.href = encodedUri;
  link.download = "table_data.csv";
  link.click();
};


  return (
    <div className="delivery-chalan-page">
      <h3>Delivery Chalan List</h3>

      
      <div className="delivery-chalan-header-section">
        <div className="delivery-chalan-action-buttons">
        <Button
  className="action-btn"
  variant="contained"
  color="primary"
  startIcon={<AddCircleOutlineIcon />}
  onClick={() => setOpenAddPopup(true)}
>
  Add Delivery Chalan
</Button>

          <Button
            className="action-btn"
            variant="outlined"
            color="secondary"
            onClick={() => alert("Exporting...")}
          >
            Export
          </Button>
        </div>

        <div className="delivery-chalan-search-section">
          <IconButton className="backspace-btn" onClick={handleReset} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <input
            className="search-input"
            type="text"
            name="dcNumber"
            placeholder="Search by Number"
            value={searchFields.dcNumber}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="customerName"
            placeholder="Search by Customer"
            value={searchFields.customerName}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="company"
            placeholder="Search by Company"
            value={searchFields.company}
            onChange={handleInputChange}
          />
<div style={{ marginBottom: "1px" }}>
  <input
    className="date-input"
    type="text"
    id="invoice-date"
    value={invoiceDate}
    onChange={handleInvoiceDateChange}
    style={{
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "210px",
      height: "40px",
      backgroundColor: "white",
      color: invoiceDate ? "black" : "#aaa",
    }}
    placeholder="Search By Date"
    onFocus={(e) => (e.target.type = "date")}
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")}
  />
</div>


<lable className="main-search-btn" onClick={handleSearch}>Search</lable>
        </div>
      </div>

    
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Sl. No</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>DC Number</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Invoice Date</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Delivered By</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Received By</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>File</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.siNo}>
                <TableCell>{row.siNo}</TableCell>
                <TableCell>{row.dcNumber}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.invoiceDate}</TableCell>
                <TableCell>{row.deliveredBy}</TableCell>
                <TableCell>{row.receivedBy}</TableCell>
                <TableCell>
                  <a href={`#${row.file}`} download>
                    {row.file}
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton className="small-icon-button"
                    aria-controls="actions-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleMenuOpen(e, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
  id="actions-menu"
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
  <MenuItem onClick={handleDelete}>Delete</MenuItem>
  <MenuItem onClick={handleFileDownload}>File Download</MenuItem>
  <MenuItem onClick={handleDCDownload}>DC Download</MenuItem>
</Menu>

                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

   
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle>Edit Delivery Chalan 
        </DialogTitle>
        <DialogContent >
          <TextField
            label="DC Number"
            name="dcNumber"
            value={newChalan.dcNumber}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
      <TextField
        label="Enter Customer Name"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleDialogOpen}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
          <TextField
            label="Company Name"
            name="company"
            value={newChalan.company}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
<div style={{ marginBottom: "1px" }}>
  <input
    className="date-input"
    type="text" // Set to text to show the placeholder
    id="invoice-date"
    value={invoiceDate}
    onChange={handleInvoiceDateChange}
    style={{
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "552px",
      height: "55px",
      backgroundColor: "white",
      color: invoiceDate ? "black" : "#aaa", // Placeholder color
    }}
    placeholder="Select DC Date" // Set the placeholder to show first
    onFocus={(e) => (e.target.type = "date")} // Switch to date picker on focus
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")} // Switch back to text if no date is selected
  />
</div>


          <TextField
            label="Enter Delivered By"
            name="deliveredBy"
            value={newChalan.deliveredBy}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter Received By"
            name="receivedBy"
            value={newChalan.receivedBy}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: "10px" ,
              color: 'white',
              backgroundColor: '#2b356bcb',}}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleAddFileChange}
            />
          </Button>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table>
                    <TableHead>
                      <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Description of Goods</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {FilteredData.length > 0 ? (
                        filteredData.map((row) => (
                          <TableRow key={row.siNo}>
                            <TableCell>{row.siNo}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.qty}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">No results found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                    </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}  sx={{
           color: 'white',
           backgroundColor: '#2b356bcb',
    }}>Cancel</Button>
          <Button onClick={handleEditSave}  sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Save</Button>
        </DialogActions>
      </Dialog>

   
      <Dialog
        open={openAddPopup}
        onClose={() => setOpenAddPopup(false)}
        
      >
        <DialogTitle>Add New Delivery Chalan
        <IconButton
      edge="end"
      color="inherit"
      onClick={handleClose}
      aria-label="close"
      sx={{
        position: 'absolute',
        right: 40,
        top: 10,
        width:20,
      }}
    >
      <CloseIcon />
    </IconButton>
        </DialogTitle>
        <DialogContent >
          <TextField
            label="DC Number"
            name="dcNumber"
            value={newChalan.dcNumber}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
      <TextField
        label="Enter Customer Name"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleDialogOpen}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

          <TextField
            label="Company Name"
            name="company"
            value={newChalan.company}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
<div style={{ marginBottom: "1px" }}>
  <input
    className="date-input"
    type="text" // Set to text to show the placeholder
    id="invoice-date"
    value={invoiceDate}
    onChange={handleInvoiceDateChange}
    style={{
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "552px",
      height: "55px",
      backgroundColor: "white",
      color: invoiceDate ? "black" : "#aaa", // Placeholder color
    }}
    placeholder="Select DC Date" // Set the placeholder to show first
    onFocus={(e) => (e.target.type = "date")} // Switch to date picker on focus
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")} // Switch back to text if no date is selected
  />
</div>


          <TextField
            label="Enter Delivered By"
            name="deliveredBy"
            value={newChalan.deliveredBy}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter Received By"
            name="receivedBy"
            value={newChalan.receivedBy}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: "10px" ,
              color: 'white',
              backgroundColor: '#2b356bcb',}}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleAddFileChange}
            />
          </Button>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table>
                    <TableHead>
                      <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Description of Goods</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {FilteredData.length > 0 ? (
                        filteredData.map((row) => (
                          <TableRow key={row.siNo}>
                            <TableCell>{row.siNo}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.qty}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">No results found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                    </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddPopup(false)}  sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Cancel</Button>
          <Button onClick={handleAddSave}  sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Enter Customer Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
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
          {[
            { label: "Enter Name", name: "name" },
            { label: "Enter Customer Code", name: "code" },
            { label: "Enter Address", name: "address" },
            { label: "Enter City", name: "city" },
            { label: "Enter State", name: "state" },
            { label: "Enter State Code", name: "stateCode" },
            { label: "Enter Email", name: "email" },
            { label: "Enter Contact", name: "contact" },
            { label: "Enter GSTIN", name: "gstin" },
          ].map(({ label, name }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              value={newCustomer[name]}
              onChange={handleNewCustomerInputChange}
              fullWidth
              margin="dense"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              color: "white",
              backgroundColor: "#2b356bcb",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCustomer}
            sx={{
              color: "white",
              backgroundColor: "#2b356bcb",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeliveryChalan;

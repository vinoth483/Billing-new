import React, { useState, useEffect } from "react";
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
import Checkbox from '@mui/material/Checkbox';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../style/Quotation.css";

const Invoice = () => {
  const [open, setOpen] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [searchFields, setSearchFields] = useState({
    description: "",
    brand: "",
    hsn: "",
    rate: "",
    category: "",
    gst: "",
    company: "",
    type: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);  
  const [openEditDialog, setOpenEditDialog] = useState(false);  
  const [openMenu, setOpenMenu] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    description: "",
    brand: "",
    qty: "",
    category: "",
    hsn: "",
    gst: "",
    rate: "",
    company: "",
    type: "",
  });
  const [initialData, setInitialData] = useState([]);

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

  useEffect(() => {
    // Fetch or initialize company and type options
    setCompanyOptions(["Company 1", "Company 2", "Company 3"]);
    setTypeOptions(["Type 1", "Type 2", "Type 3"]);
  
    // Initialize data for Table 1
    setFilteredData([
      {
        siNo: 1,
        quoteNumber: "QT-001",
        company: "John Doe",
        quotationDate: "19-12-2024", // Indian format
        quotationType: "Type A",
      },
      {
        siNo: 2,
        quoteNumber: "QT-002",
        company: "Jane Smith",
        quotationDate: "18-12-2024", // Indian format
        quotationType: "Type B",
      },
      {
        siNo: 3,
        quoteNumber: "QT-003",
        company: "ABC Corp",
        quotationDate: "17-12-2024", // Indian format
        quotationType: "Type C",
      },
    ]);
  
    // Initialize data for Table 2
    setInitialData([
      {
        siNo: 1,
        description: "Material 1",
        brand: "Brand A",
        qty: 10,
        category: "Category X",
        hsn: "1234",
        gst: "18%",
        rate: 100,
      },
      {
        siNo: 2,
        description: "Material 2",
        brand: "Brand B",
        qty: 20,
        category: "Category Y",
        hsn: "5678",
        gst: "12%",
        rate: 150,
      },
      {
        siNo: 3,
        description: "Material 3",
        brand: "Brand C",
        qty: 30,
        category: "Category Z",
        hsn: "9101",
        gst: "5%",
        rate: 200,
      },
    ]);
  }, []);
  
  const [invoicePreviewData, setInvoicePreviewData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(initialData.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };
  const handleRowCheckboxToggle = (index) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
    } else {
      newSelectedRows.push(index);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === data.length);
  };

const handleSearch = () => {
  console.log("Search button clicked!");

  if (!data || !searchFields) {
    console.error("Data or search fields are missing.");
    console.log('Searching for invoices...');
    return;
  }

  console.log("Search Fields:", searchFields);
  console.log("Data:", data);

  const filtered = data.filter((row) => {
    return Object.keys(searchFields).some((key) => {
      const searchValue = searchFields[key]?.trim().toLowerCase();
      const rowValue = row[key]?.toString().trim().toLowerCase();

      // Match only if the search field is not empty
      if (searchValue) {
        return rowValue?.includes(searchValue);
      }
      return false; // Skip empty search fields
    });
  });

  if (filtered.length > 0) {
    console.log("Filtered Data:", filtered);
    setFilteredData(filtered);
  } else {
    console.warn("No results found.");
    setFilteredData([]);
    alert("No results found. Please adjust your search criteria.");
  }
};
  const handleReset = () => {
    setSearchFields({
      description: "",
      brand: "",
      hsn: "",
      rate: "",
      category: "",
      gst: "",
      company: "",
      type: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields({ ...searchFields, [name]: value });
  };

  const handleAddInvoiceClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenNewPopup(false);
  };

  const handleNewInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
  };
 // Existing state for Add Invoice dialog
const [openNewPopup, setOpenNewPopup] = useState(false); // New state for the second popup

const handleSaveInvoice = () => {
  // Filter selected rows from initialData
  const selectedData = initialData.filter((_, index) => selectedRows.includes(index));
  
  // Update the preview data state
  setInvoicePreviewData(selectedData);

  // Close the current dialog if needed
  handleClose();
  
  // Open the preview dialog
  setOpenNewPopup(true);
  console.log('Saving invoice...');
    // Implement your save logic here
    setOpenExportDialog(false);

};

const handleSaveExportInvoice = () => {
  const content = document.getElementById("invoice-preview-content"); // Reference the Invoice Preview content

  if (content) {
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, mm units, A4 paper

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice_preview.pdf");
    });
  }
};

const handleCloseNewPopup = () => {
  setOpenNewPopup(false);
};
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  setOpenMenu(true);
};
const handleEdit = (row) => {
  setEditInvoice(row); // Set the row data to the edit state
  setOpenEditDialog(true); // Open the dialog for editing
};

const handleDelete = (index) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this quotation?");
  if (confirmDelete) {
    const updatedData = filteredData.filter((_, i) => i !== index);
    setFilteredData(updatedData); 
    handleCloseMenu();
  }
};

const handleCloseMenu = () => {
  setAnchorEl(null);
  setOpenMenu(false);
};

const handleExportInvoice = () => {
  console.log('Exporting invoice...');
  setOpenExportDialog(true);
};

const handleCloseExportDialog = () => {
  setOpenExportDialog(false);
};
  const [searchDate, setSearchDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
const handleSearchDateChange = (event) => {
  setSearchDate(event.target.value);
};

const handleInvoiceDateChange = (event) => {
  setInvoiceDate(event.target.value);
};
  return (
    <div className="invoice-dashboard">
      <h3>Quotation List</h3>
      <div className="invoice-action-section">
        <div className="invoice-action-buttons">
          <label className="invoice-common-btn invoice-add-material-btn" onClick={handleAddInvoiceClick}>
            + Add Quotation
          </label>
          <label
        className="invoice-common-btn invoice-add-material-btn"
        onClick={() => setOpenExportDialog(true)}
      >
        Export Quotation
      </label>
        </div>

        <div className="search-buttons">
          <IconButton className="backspace-btn" onClick={handleReset} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <input
            className="search-input"
            type="text"
            name="description"
            placeholder="Search by Number"
            value={searchFields.description}
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
          <select
  className="search-input"
  name="company"
  value={searchFields.company}
  onChange={handleInputChange}
>
  <option value="">Search by Company</option>
  <option value="Company A">Company A</option>
  <option value="Company B">Company B</option>
  <option value="Company C">Company C</option>
</select>
<select
  className="search-input"
  name="type"
  value={searchFields.type}
  onChange={handleInputChange}
>
  <option value="">Search by Type</option>
  <option value="Type A">Type A</option>
  <option value="Type B">Type B</option>
  <option value="Type C">Type C</option>
</select>
        
<lable className="main-search-btn" onClick={handleSearch}>Search</lable>
        </div>
      </div>
            <div className="table-section">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
    <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Quote Number</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Quotation Date</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Quotation Type</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
        <TableCell>{row.quoteNumber}</TableCell>
        <TableCell>{row.company}</TableCell>
        <TableCell>{row.quotationDate}</TableCell>
        <TableCell>{row.quotationType}</TableCell>
        <TableCell>
        <IconButton className="small-icon-button" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
  anchorEl={anchorEl}
  open={openMenu}
  onClose={handleCloseMenu} 
>
  <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
  <MenuItem onClick={() => handleDelete(index)}>Delete</MenuItem>
  <MenuItem onClick={() => handleExportInvoice()}>Invoice Export</MenuItem>
  </Menu>
              </TableCell>
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
      </div>
      

      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{
          style: {
            width: '100%', // Set the width to 80% or any value you desire
            maxWidth: 'none', // Remove the maximum width limit
          }
        }}
      >
  <DialogTitle>Add Quotation
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
  <DialogContent style={{ maxHeight: "1000px" }}>
    <div className="popup-grid"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)", // 7 equal columns
      gap: "5px",
      alignItems: "center",

    }}>
      <TextField
        margin="dense"
        label="Search by Description"
        name="description"
        value={newInvoice.description}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by Brand"
        name="brand"
        value={newInvoice.brand}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by Category"
        name="category"
        value={newInvoice.category}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by HSN"
        name="hsn"
        value={newInvoice.hsn}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by GST"
        name="gst"
        value={newInvoice.gst}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by Rate"
        name="rate"
        value={newInvoice.rate}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      
      
      <lable className="invoice-main-search-btn" onClick={handleSearch}>Search</lable>
    </div>
    <DialogActions>
      <Button onClick={handleClose}  sx={{
           color: 'white',
           backgroundColor: '#2b356bcb',
    }}>
        Cancel
      </Button>
      <Button onClick={handleSaveInvoice}  sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>
        Save
      </Button>
    </DialogActions>

    {/* Table Section */}
    <div className="table-section">
    <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>HSN</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>GST</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {initialData.map((row, index) => (
        <TableRow key={index}>
           <TableCell padding="checkbox">
                      <Checkbox checked={selectedRows.includes(index)} onChange={() => handleRowCheckboxToggle(index)} />
                    </TableCell>
          <TableCell>{row.siNo}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.brand}</TableCell>
          <TableCell>{row.category}</TableCell>
          <TableCell>{row.hsn}</TableCell>
          <TableCell>{row.gst}</TableCell>
          <TableCell>{row.rate}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
  </DialogContent>
</Dialog>

  {/* New Popup Dialog */}
  <Dialog open={openNewPopup} onClose={handleCloseNewPopup}PaperProps={{
          style: {
            width: '100%', // Set the width to 80% or any value you desire
            maxWidth: 'none', // Remove the maximum width limit
          }
        }}
      >
      <DialogTitle>Quotation Preview
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
      <DialogContent id="invoice-preview-content" style={{ maxHeight: "1000px" }}>
    <div className="popup-grid"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)", // 7 equal columns
      gap: "5px",
      alignItems: "center",
    }}>
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
        margin="dense"
        label="Enter Terms & Condition"
        name="qty"
        value={newInvoice.qty}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
<div >
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
      width: "255px",
      height: "52px",
      backgroundColor: "white", 
      color: "black", 
      marginTop: "5px"
    }}
    placeholder="Select Quote Date" // Set the placeholder to show first
    onFocus={(e) => (e.target.type = "date")} // Switch to date picker on focus
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")}
  />
</div>
      <TextField
        margin="dense"
        label="Enter Quote Number"
        name="rate"
        value={newInvoice.rate}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <FormControl fullWidth margin="dense">
        <InputLabel> Select Company</InputLabel>
        <Select name="company" value={newInvoice.company} onChange={handleNewInvoiceChange}>
          {companyOptions.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel>Select Quotation Type</InputLabel>
        <Select name="type" value={newInvoice.type} onChange={handleNewInvoiceChange}>
          {typeOptions.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
      <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Description of Goods</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Units Price</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Total Amt</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {invoicePreviewData.map((row, index) => (
      <TableRow key={index}>
      <TableCell>{index + 1}</TableCell> {/* SI NO */}
      <TableCell>{row.description}</TableCell> {/* Description of Goods */}
      <TableCell>{row.rate}</TableCell>
      <TableCell>{row.qty}</TableCell> {/* Qty */}
      <TableCell>{(row.rate * row.qty).toFixed(2)}</TableCell> {/* Total Amt */}
    </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      {/* Save and Cancel Buttons */}
      <DialogActions>
  <Button onClick={handleCloseNewPopup}  sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Cancel</Button>
  <Button onClick={handleSaveExportInvoice}  sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Save & Export</Button>
</DialogActions>


 
  </DialogContent>
    </Dialog>
    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}
             PaperProps={{
              style: {
                width: '100%', // Set the width to 80% or any value you desire
                maxWidth: 'none', // Remove the maximum width limit
              }
            }} >
  <DialogTitle>Edit Quotation</DialogTitle>
  <DialogContent style={{ maxHeight: "1000px" }}>
    <div className="popup-grid"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)", // 7 equal columns
      gap: "5px",
      alignItems: "center",

    }}>
      <TextField
        margin="dense"
        label="Search by Description"
        name="description"
        value={newInvoice.description}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by Brand"
        name="brand"
        value={newInvoice.brand}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by Category"
        name="category"
        value={newInvoice.category}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by HSN"
        name="hsn"
        value={newInvoice.hsn}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by GST"
        name="gst"
        value={newInvoice.gst}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by Rate"
        name="rate"
        value={newInvoice.rate}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      
      
      <lable className="invoice-main-search-btn" onClick={handleSearch}>Search</lable>
    </div>
    <DialogActions>
      <Button onClick={handleClose}  sx={{
           color: 'white',
           backgroundColor: '#2b356bcb',
    }}>
        Cancel
      </Button>
      <Button onClick={handleSaveInvoice}  sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>
        Save
      </Button>
    </DialogActions>

    {/* Table Section */}
    <div className="table-section">
    <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>HSN</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>GST</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {initialData.map((row, index) => (
        <TableRow key={index}>
           <TableCell padding="checkbox">
                      <Checkbox checked={selectedRows.includes(index)} onChange={() => handleRowCheckboxToggle(index)} />
                    </TableCell>
          <TableCell>{row.siNo}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.brand}</TableCell>
          <TableCell>{row.category}</TableCell>
          <TableCell>{row.hsn}</TableCell>
          <TableCell>{row.gst}</TableCell>
          <TableCell>{row.rate}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
  </DialogContent>
</Dialog>

 {/* Export Invoice Dialog */}
 <Dialog
        open={openExportDialog}
        onClose={handleCloseExportDialog}
        PaperProps={{
          style: {
            width: '100%',
            maxWidth: 'none',
          }
        }}
      >
        <DialogTitle>
         Export Invoice
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseExportDialog}
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

        <DialogContent style={{ maxHeight: "1000px" }}>
          <div className="popup-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <TextField
              margin="dense"
              label="Search by Description"
              name="description"
              value={newInvoice.description}
              onChange={handleNewInvoiceChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Search by Brand"
              name="brand"
              value={newInvoice.brand}
              onChange={handleNewInvoiceChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Search by Category"
              name="category"
              value={newInvoice.category}
              onChange={handleNewInvoiceChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Search by HSN"
              name="hsn"
              value={newInvoice.hsn}
              onChange={handleNewInvoiceChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Search by GST"
              name="gst"
              value={newInvoice.gst}
              onChange={handleNewInvoiceChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Search by Rate"
              name="rate"
              value={newInvoice.rate}
              onChange={handleNewInvoiceChange}
              fullWidth
            />

            <label className="invoice-main-search-btn" onClick={handleSearch}>Search</label>
          </div>

          <DialogActions>
            <Button
              onClick={handleCloseExportDialog}
              sx={{
                color: 'white',
                backgroundColor: '#2b356bcb',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveInvoice}
              color="primary"
              sx={{
                color: 'white',
                backgroundColor: '#2b356bcb',
              }}
            >
              Save
            </Button>
          </DialogActions>

          {/* Table Section */}
          <div className="table-section">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectAll} onChange={handleSelectAll} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>HSN</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>GST</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={selectedRows.includes(index)} onChange={() => handleRowCheckboxToggle(index)} />
                      </TableCell>
                      <TableCell>{row.siNo}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.brand}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.hsn}</TableCell>
                      <TableCell>{row.gst}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
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

export default Invoice;

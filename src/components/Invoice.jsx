import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import "jspdf-autotable";
import { PDFDocument } from "pdf-lib";
import html2canvas from "html2canvas";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../style/Invoice.css";

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
    const [openMenu, setOpenMenu] = useState(false);
    const [openAddInvoiceDialog, setOpenAddInvoiceDialog] = useState(false);
    const [openInvoicePreviewDialog, setOpenInvoicePreviewDialog] = useState(false);
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
  const [exportOptions, setExportOptions] = useState({
    fromDate: "",
    toDate: "",
    exportType: "csv",
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
    setCompanyOptions(["Company 1", "Company 2", "Company 3"]);
    setTypeOptions(["Type 1", "Type 2", "Type 3"]);
    setFilteredData([
      {
        description: "INV001",
        brand: "John Doe",
        qty: "Type A",
        category: "$1000",
        hsn: "$200",
      },
      {
        description: "INV002",
        brand: "Jane Smith",
        qty: "Type B",
        category: "$2000",
        hsn: "$500",
      },
      {
        description: "INV003",
        brand: "ABC Corp",
        qty: "Type C",
        category: "$1500",
        hsn: "$700",
      },
    ]);
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
    setSelectAll((prev) => !prev);
    setSelectedRows(!selectAll ? filteredData.map((_, index) => index) : []);
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
    return;
  }

  console.log("Search Fields:", searchFields);
  console.log("Data:", data);

  const filtered = data.filter((row) => {
    return Object.keys(searchFields).some((key) => {
      const searchValue = searchFields[key]?.trim().toLowerCase();
      const rowValue = row[key]?.toString().trim().toLowerCase();
      if (searchValue) {
        return rowValue?.includes(searchValue);
      }
      return false; 
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
  const handleOpenAddInvoiceDialog = () => setOpenAddInvoiceDialog(true);
  const handleOpenInvoicePreviewDialog = () => setOpenInvoicePreviewDialog(true);
  const handleClose = () => {
    setOpen(false);
    setOpenNewPopup(false);
    setOpenAddInvoiceDialog(false);
    setOpenInvoicePreviewDialog(false);
  };

  const handleNewInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
    setNewInvoice({ ...newInvoice, description: event.target.value });
  };
  
  const handleExportDialogClose = () => {
    setOpenExportDialog(false);
  };

  const handleExportOptionChange = (e) => {
    const { name, value } = e.target;
    setExportOptions({ ...exportOptions, [name]: value });
  };

  const handleInvoiceExport = () => {
    const exportData = filteredData.map((row) => ({
      Description: row.description,
      Brand: row.brand,
      Qty: row.qty,
      Category: row.category,
      HSN: row.hsn,
      GST: row.gst,
      Rate: row.rate,
    }));
    const csvContent = `data:text/csv;charset=utf-8,${Object.keys(exportData[0]).join(",")}\n${exportData.map((row) => Object.values(row).join(",")).join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    setOpenExportDialog(false);
  };
 
const [openNewPopup, setOpenNewPopup] = useState(false); 

const handleSaveInvoice = () => {
  const selectedData = initialData.filter((_, index) => selectedRows.includes(index));
  setInvoicePreviewData(selectedData);
  handleClose();
  setOpenNewPopup(true);
};

const handleSaveExportInvoice = () => {
  try {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(18);
    doc.text("Proforma Invoice", 105, 15, { align: "center" });

    // Add dynamic content
    doc.setFontSize(12);
    doc.text("Date: 24/12/2024", 20, 30);
    doc.text("Quote No: 0076866698", 20, 40);

    // Add a sample table
    doc.autoTable({
      startY: 50,
      head: [["S.No", "Description", "Qty", "Rate", "Total"]],
      body: selectedRows.map((row, index) => [
        index + 1,
        row.description || "N/A",
        row.qty || 0,
        row.rate || 0,
        ((row.qty || 0) * (row.rate || 0)).toFixed(2),
      ]),
    });

    // Save the file
    doc.save("invoice.pdf");
    console.log("PDF exported successfully.");
  } catch (error) {
    console.error("Error exporting PDF:", error);
  }
};

const handleCloseNewPopup = () => {
  setOpenNewPopup(false);
};


const createPDF = (invoice) => {
  const doc = new jsPDF();
  doc.text("Invoice Details", 20, 20);
  doc.text(`Customer Name: ${invoice.description || ""}`, 20, 40);
  doc.text(`Brand: ${invoice.brand || ""}`, 20, 50);
  doc.text(`From Date: ${invoice.qty || ""}`, 20, 60);
  doc.text(`To Date: ${invoice.category || ""}`, 20, 70);
  doc.text(`Company: ${invoice.company || ""}`, 20, 80);
  doc.text(`Type: ${invoice.type || ""}`, 20, 90);
  doc.text(`Export Type: ${invoice.exportType || ""}`, 20, 100);
  doc.text(`File Type: ${invoice.fileType || ""}`, 20, 110);

  // Return the PDF as an ArrayBuffer
  return doc.output("arraybuffer");
};

// Function to merge PDFs
const mergePDFs = async (pdfBuffers) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const pdfBuffer of pdfBuffers) {
      const pdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();
    return mergedPdfFile;
  } catch (error) {
    console.error("Error merging PDFs:", error);
    throw error;
  }
};

// Export Multiple PDFs as One
const handleExportPDFs = async (invoices) => {
  try {
    // Generate PDFs for each invoice
    const pdfBuffers = invoices.map((invoice) => createPDF(invoice));

    // Merge PDFs into one
    const mergedPdfFile = await mergePDFs(pdfBuffers);

    // Download the merged PDF
    const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "All-Invoices.pdf";
    document.body.appendChild(link); // Append to body for Firefox compatibility
    link.click();
    document.body.removeChild(link); // Clean up
  } catch (error) {
    console.error("Error exporting PDFs:", error);
    alert("An error occurred while exporting PDFs. Check the console for details.");
  }
};

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  setOpenMenu(true);
};
const handleEdit = () => {
  console.log('Edit clicked');
  handleCloseMenu();
};

const handleCloseMenu = () => {
  setAnchorEl(null);
  setOpenMenu(false);
};
const handleProformaInvoice = () => {
  console.log('Proforma Invoice clicked');
  handleCloseMenu();
};
const handleDeliveryChallan = () => {
  console.log('Delivery Challan clicked');
  setOpenAddPopup(true);
  handleCloseMenu();
};
const [openAddPopup, setOpenAddPopup] = useState(false);
const [newChalan, setNewChalan] = useState({
  dcNumber: "",
  customerName: "",
  company: "",
  invoiceDate: "",
  deliveredBy: "",
  receivedBy: "",
});
const navigate = useNavigate();
const handleAddInputChange = (e) => {
  const { name, value } = e.target;
  setNewChalan({ ...newChalan, [name]: value });
};
const handleAddSave = () => {
    const deliveryChallanData = {
    ...newChalan,
    items: initialData, 
  };
  const updatedData = [...filteredData, newChalan];
  setFilteredData(updatedData); 
  setOpenAddPopup(false); 
  navigate('/dashboard/DeliveryChalan', { state: { deliveryChallanData } });
};
  const [searchDate, setSearchDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
const handleSearchDateChange = (event) => {
  setSearchDate(event.target.value);
};

const handleInvoiceDateChange = (event) => {
  setInvoiceDate(event.target.value);
};

const handleDownload = async () => {
  const response = await fetch('/path-to-pdf');
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'downloaded-file.pdf';
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const handleDelete = (index) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this quotation?");
  if (confirmDelete) {
    const updatedData = filteredData.filter((_, i) => i !== index); // Remove the item at the specified index
    setFilteredData(updatedData); // Update the state
    handleCloseMenu(); // Close the menu after deletion
  }
};

const handleAddCompany = () => {
  console.log('Add company icon clicked!');
  // Perform desired action (e.g., open a modal or navigate to another page)
};
const allInvoices = [
  {
    description: "John Doe",
    brand: "Apple",
    qty: "2025-01-01",
    category: "2025-01-07",
    company: "Tech Solutions",
    type: "Retail",
    exportType: "Direct",
    fileType: "PDF",
  },
  {
    description: "Jane Smith",
    brand: "Samsung",
    qty: "2025-02-01",
    category: "2025-02-10",
    company: "Gadget World",
    type: "Wholesale",
    exportType: "Indirect",
    fileType: "PDF",
  },
];


  return (
    <div className="invoice-dashboard">
      <h3>Search Invoice</h3>
      <div className="invoice-action-section">
        <div className="invoice-action-buttons">
          <label  onClick={handleAddInvoiceClick}>
            + Add Invoice
          </label>
          <label
        onClick={() => setOpenExportDialog(true)}
      >
        Export Invoice
      </label>

      <Dialog open={openExportDialog} onClose={() => setOpenExportDialog(false)} fullWidth PaperProps={{
    style: {
      width: '100%',
      maxWidth: 'none',
    }
  }}>
  <DialogTitle>
    Export Invoice
    <IconButton
      edge="end"
      color="inherit"
      onClick={() => setOpenExportDialog(false)}
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
    <div className="popup-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
        alignItems: "center",
      }}>
      <TextField
        margin="dense"
        label="Search by Cus Name"
        name="description"
        value={newInvoice.description}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by brand"
        name="brand"
        value={newInvoice.brand}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <div>
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
          placeholder="Select From Date"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")}
        />
      </div>
      <TextField
        margin="dense"
        label="Select To Date"
        name="category"
        value={newInvoice.category}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <FormControl fullWidth margin="dense">
        <InputLabel> Select by Company</InputLabel>
        <Select name="company" value={newInvoice.company} onChange={handleNewInvoiceChange}>
          {companyOptions.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel>Select by Type</InputLabel>
        <Select name="type" value={newInvoice.type} onChange={handleNewInvoiceChange}>
          {typeOptions.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Updated Export Type Select */}
      <FormControl fullWidth margin="dense">
        <InputLabel>Select Export Type</InputLabel>
        <Select
          name="exportType"
          value={newInvoice.exportType}
          onChange={handleNewInvoiceChange}>
          {/* CSV, EXL, and PDF as options */}
          <MenuItem value="CSV">CSV</MenuItem>
          <MenuItem value="EXL">EXL</MenuItem>
          <MenuItem value="PDF">PDF</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
  <InputLabel>Select File Type</InputLabel>
  <Select name="fileType" value={newInvoice.fileType} onChange={handleNewInvoiceChange}>
    <MenuItem value="csv">CSV</MenuItem>
    <MenuItem value="exl">EXL</MenuItem>
    <MenuItem value="pdf">PDF</MenuItem>
  </Select>
</FormControl>

    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenExportDialog(false)} sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
      Cancel
    </Button>
<Button
  onClick={() => handleExportPDFs(allInvoices)} // Pass your array of invoices
  sx={{
    color: "black",
    "&:hover": {
      color: "white",
    },
  }}
>
  Export All Invoices
</Button>

  </DialogActions>
</Dialog>

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
          <input
            className="search-input"
            type="text"
            name="hsn"
            placeholder="Search by Cus Name"
            value={searchFields.hsn}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="rate"
            placeholder="Search by Rate"
            value={searchFields.rate}
            onChange={handleInputChange}
          />
          <select
  className="search-input"
  name="company"
  value={searchFields.company}
  onChange={handleInputChange}
>
  <option value="">Select Company</option>
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
  <option value="">Select Type</option>
  <option value="Type A">CSV</option>
  <option value="Type B">EXl</option>
  <option value="Type C">PDF</option>
</select>
        
<lable className="main-search-btn" onClick={handleSearch}>Search</lable>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Export Options</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="From Date"
              type="date"
              name="fromDate"
              value={exportOptions.fromDate}
              onChange={handleExportOptionChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="To Date"
              type="date"
              name="toDate"
              value={exportOptions.toDate}
              onChange={handleExportOptionChange}
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Export Type</InputLabel>
              <Select name="exportType" value={exportOptions.exportType} onChange={handleExportOptionChange}>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
  <Button
    onClick={handleExportDialogClose}
    sx={{
      color: 'black !important',
      '&:hover': {
        color: 'white !important',
      },
    }}
  >
    Cancel
  </Button>
  <Button
  onClick={() => handleExportPDFs(allInvoices)} // Pass an array of invoice objects
  sx={{
    color: "black",
    "&:hover": {
      color: "white",
    },
  }}
>
  Export All Invoices
</Button>

</DialogActions>


        </Dialog>
      </div>
      <div className="table-section">
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Invoice Number</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Cus Name</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Invoice Type</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Pending Amount</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>More Options</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredData.length > 0 ? (
          filteredData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.qty}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.hsn}</TableCell>
              <TableCell>
                <IconButton className="small-icon-button" onClick={(event) => handleClick(event, row)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleOpenAddInvoiceDialog}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(index)}>Delete</MenuItem>
                  <MenuItem onClick={handleProformaInvoice}>Proforma Invoice</MenuItem>
                  <MenuItem onClick={handleDeliveryChallan}>Delivery Challan</MenuItem>
                  <MenuItem onClick={handleDownload}>Download</MenuItem>
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
            width: '100%',
            maxWidth: 'none', 
          }
        }}
      >
  <DialogTitle>Add New Invoice
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
      gridTemplateColumns: "repeat(7, 1fr)", 
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
        name="hsn"
        value={newInvoice.hsn}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Search by Category"
        name="hsn"
        value={newInvoice.hsn}
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
  <Button
    onClick={handleClose}
    sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}
  >
    Cancel
  </Button>
  <Button
    onClick={handleSaveInvoice}
    color="primary"
    sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}
  >
    Save
  </Button>
</DialogActions>
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

  <Dialog open={openNewPopup}PaperProps={{
          style: {
            width: '100%', 
            maxWidth: 'none', 
          }
        }}
      >
      <DialogTitle>Invoice Preview
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
      gridTemplateColumns: "repeat(7, 1fr)", 
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
        label="Select Terms of Pay"
        name="brand"
        value={newInvoice.brand}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Enter Terms & Condition"
        name="qty"
        value={newInvoice.qty}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Enter Pending Amt"
        name="category"
        value={newInvoice.category}
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
    placeholder="Select P.O Date" // Set the placeholder to show first
    onFocus={(e) => (e.target.type = "date")} // Switch to date picker on focus
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")}
  />
</div>
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
    placeholder="Select D.C Date" // Set the placeholder to show first
    onFocus={(e) => (e.target.type = "date")} // Switch to date picker on focus
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")}
  />
</div>
      <TextField
        margin="dense"
        label="Enter Invoice Number"
        name="rate"
        value={newInvoice.rate}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
       <TextField
        margin="dense"
        label="Enter P.O Number"
        name="rate"
        value={newInvoice.rate}
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
    placeholder="Select Invoice Date" // Set the placeholder to show first
    onFocus={(e) => (e.target.type = "date")} // Switch to date picker on focus
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")}
  />
</div>
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
        <InputLabel>Select Invoice Type</InputLabel>
        <Select name="type" value={newInvoice.type} onChange={handleNewInvoiceChange}>
          {typeOptions.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel>Select Export Type</InputLabel>
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
    <TableCell sx={{ fontWeight: 'bold' }}>HSN/SAC <Checkbox /></TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Qty <Checkbox /></TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Disc <Checkbox /></TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>GST <Checkbox /></TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Rate <Checkbox /></TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>GST Amt <Checkbox /></TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Total Amt <Checkbox /></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {invoicePreviewData.map((row, index) => (
      <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{row.description}</TableCell> 
      <TableCell>{row.hsn}</TableCell>
      <TableCell>{row.qty}</TableCell>
      <TableCell>{row.discount || "N/A"}</TableCell>
      <TableCell>{row.gst}%</TableCell>
      <TableCell>{row.rate}</TableCell>
      <TableCell>{((row.rate * row.qty * row.gst) / 100).toFixed(2)}</TableCell>
      <TableCell>{(row.rate * row.qty).toFixed(2)}</TableCell>
    </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
      <DialogActions>
  <Button onClick={handleCloseNewPopup} sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }} >Cancel</Button>
<Button
  onClick={handleSaveExportInvoice}
  sx={{
    color: "black",
    "&:hover": {
      color: "white",
    },
  }}
>
  Save & Export
</Button>

</DialogActions>
  </DialogContent>
    </Dialog>


    <Dialog
  open={openAddPopup}
  onClose={() => setOpenAddPopup(false)}
>
  <DialogTitle>Add New Delivery Challan</DialogTitle>
  <DialogContent>
    <TextField
      label="DC Number"
      name="dcNumber"
      value={newChalan.dcNumber}
      onChange={handleAddInputChange}
      fullWidth
      margin="dense"
    />
    <TextField
      label="Customer Name"
      name="customerName"
      value={newChalan.customerName}
      onChange={handleAddInputChange}
      fullWidth
      margin="dense"
    />
    <TextField
      label="Company Name"
      name="company"
      value={newChalan.company}
      onChange={handleAddInputChange}
      fullWidth
      margin="dense"
    />
    <TextField
      label="Invoice Date"
      name="invoiceDate"
      value={newChalan.invoiceDate}
      onChange={handleAddInputChange}
      fullWidth
      margin="dense"
    />
    <TextField
      label="Delivered By"
      name="deliveredBy"
      value={newChalan.deliveredBy}
      onChange={handleAddInputChange}
      fullWidth
      margin="dense"
    />
    <TextField
      label="Received By"
      name="receivedBy"
      value={newChalan.receivedBy}
      onChange={handleAddInputChange}
      fullWidth
      margin="dense"
    />
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
          {filteredData.length > 0 ? (
            initialData.map((row) => (
              <TableRow key={row.siNo}>
                <TableCell>{row.siNo}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.qty}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddPopup(false)} sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>Cancel</Button>
    <Button onClick={handleAddSave} sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }} >
      Save
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={openAddInvoiceDialog}
  onClose={handleClose}
  PaperProps={{
    style: {
      width: '100%',
      maxWidth: 'none',
    },
  }}
>
  <DialogTitle>
    Edit Invoice
    <IconButton
      edge="end"
      color="inherit"
      onClick={handleClose}
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
  <DialogContent style={{ maxHeight: '1000px' }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
        alignItems: 'center',
      }}
    >
      {['Description', 'Brand', 'Category', 'HSN', 'GST', 'Rate'].map((field) => (
        <TextField
          key={field}
          margin="dense"
          label={`Search by ${field}`}
          name={field.toLowerCase()}
          value={newInvoice[field.toLowerCase()] || ''}
          onChange={handleNewInvoiceChange}
          fullWidth
        />
      ))}
      <label
        className="invoice-main-search-btn"
        onClick={handleSearch}
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          padding: '10px 20px',
          backgroundColor: ' #2b356be1',
          color: '#fff',
          borderRadius: '4px',
          marginTop:'10px'
         
        }}
      >
        Search
      </label>
    </div>
    <DialogActions>
      <Button
        onClick={handleClose}
        sx={{
          color: 'black',
          '&:hover': {
            color: 'white',
          },
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={handleSaveInvoice}
        color="primary"
        sx={{
          color: 'black',
          '&:hover': {
            color: 'white',
          },
        }}
      >
        Save
      </Button>
    </DialogActions>
    <div className="table-section">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              {['SI NO', 'Description', 'Brand', 'Category', 'HSN', 'GST', 'Rate'].map((col) => (
                <TableCell key={col} sx={{ fontWeight: 'bold' }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {initialData.map((row, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowCheckboxToggle(index)}
                  />
                </TableCell>
                {['siNo', 'description', 'brand', 'category', 'hsn', 'gst', 'rate'].map((field) => (
                  <TableCell key={field}>{row[field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </DialogContent>
</Dialog>

<Dialog
  open={openInvoicePreviewDialog}
  onClose={handleClose}
  PaperProps={{
    style: {
      width: '100%',
      maxWidth: 'none',
    },
  }}
>
  <DialogTitle>
    Invoice Preview
    <IconButton
      edge="end"
      color="inherit"
      onClick={handleClose}
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
  <DialogContent style={{ maxHeight: '1000px' }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
        alignItems: 'center',
      }}
    >
      {['Customer Name', 'Terms of Pay', 'Terms & Condition', 'Pending Amt', 'Invoice Number', 'P.O Number'].map(
        (field) => (
          <TextField
            key={field}
            margin="dense"
            label={`Enter ${field}`}
            name={field.replace(/\s+/g, '').toLowerCase()}
            value={newInvoice[field.replace(/\s+/g, '').toLowerCase()] || ''}
            onChange={handleNewInvoiceChange}
            fullWidth
          />
        )
      )}
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

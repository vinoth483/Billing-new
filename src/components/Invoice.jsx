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
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Checkbox from '@mui/material/Checkbox';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CloseIcon from '@mui/icons-material/Close';
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
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
  const content = document.getElementById("invoice-preview-content"); 

  if (content) {
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); 
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
const handleExportPDF = () => {
  const doc = new jsPDF();
  doc.text("Invoice Details", 20, 20);
  doc.text(`Customer Name: ${newInvoice.description || ''}`, 20, 40);
  doc.text(`Brand: ${newInvoice.brand || ''}`, 20, 50);
  doc.text(`From Date: ${newInvoice.qty || ''}`, 20, 60);
  doc.text(`To Date: ${newInvoice.category || ''}`, 20, 70);
  doc.text(`Company: ${newInvoice.company || ''}`, 20, 80);
  doc.text(`Type: ${newInvoice.type || ''}`, 20, 90);
  doc.text(`Export Type: ${newInvoice.exportType || ''}`, 20, 100);
  doc.text(`File Type: ${newInvoice.fileType || ''}`, 20, 110);
  doc.save("invoice.pdf");
  setOpenExportDialog(false);
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
  handleClose();
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
  return (
    <div className="invoice-dashboard">
      <h3>Search Invoice</h3>
      <div className="invoice-action-section">
        <div className="invoice-action-buttons">
          <label className="invoice-common-btn invoice-add-material-btn" onClick={handleAddInvoiceClick}>
            + Add Invoice
          </label>
          <label
        className="invoice-common-btn invoice-add-material-btn"
        onClick={() => setOpenExportDialog(true)}
      >
        Export Invoice
      </label>

      <Dialog open={openExportDialog} onClose={() => setOpenExportDialog(false)} fullWidth  PaperProps={{
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
        width:20,
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
          <TextField
            margin="dense"
            label="Select From Date"
            name="qty"
            value={newInvoice.qty}
            onChange={handleNewInvoiceChange}
            fullWidth
          />
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
      <FormControl fullWidth margin="dense">
        <InputLabel>Select File Type</InputLabel>
        <Select name="type" value={newInvoice.type} onChange={handleNewInvoiceChange}>
          {typeOptions.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExportDialog(false)}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
            Cancel
          </Button>
          <Button onClick={handleExportPDF}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
            Export
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
          <input
            className="search-input"
            type="text"
            name="brand"
            placeholder="Search by Date"
            value={searchFields.brand}
            onChange={handleInputChange}
          />
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
  <option value="Type A">Type A</option>
  <option value="Type B">Type B</option>
  <option value="Type C">Type C</option>
</select>
        
          <button className="main-search-btn" onClick={handleSearch}>Search</button>
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
    onClick={handleInvoiceExport}
    sx={{
      color: 'black !important',
      '&:hover': {
        color: 'white !important',
      },
    }}
  >
    Export
  </Button>
</DialogActions>


        </Dialog>
      </div>
      <div className="table-section">
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>SI NO</TableCell>
          <TableCell>Invoice Number</TableCell>
          <TableCell>Cus Name</TableCell>
          <TableCell>Invoice Type</TableCell>
          <TableCell>Total Amount</TableCell>
          <TableCell>Pending Amount</TableCell>
          <TableCell>More Options</TableCell>
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
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  <MenuItem onClick={handleProformaInvoice}>Proforma Invoice</MenuItem>
                  <MenuItem onClick={handleDeliveryChallan}>Delivery Challan</MenuItem>
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
      onClick={() => setOpenExportDialog(false)}
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
        <TableCell>SI NO</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Brand</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>HSN</TableCell>
        <TableCell>GST</TableCell>
        <TableCell>Rate</TableCell>
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

  <Dialog open={openNewPopup} onClose={handleCloseNewPopup}PaperProps={{
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
      onClick={() => setOpenExportDialog(false)}
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
        margin="dense"
        label="Search By Name"
        name="description"
        value={newInvoice.description}
        onChange={handleNewInvoiceChange}
        fullWidth
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
      <TextField
        margin="dense"
        label="Select P.O Date"
        name="hsn"
        value={newInvoice.hsn}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Select D.C Date"
        name="gst"
        value={newInvoice.gst}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
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
       <TextField
        margin="dense"
        label="Select Invoice Date"
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
        <TableCell>SI NO </TableCell>
        <TableCell>Description of Goods</TableCell>
        <TableCell>HSN/SAC   <Checkbox /></TableCell>
        <TableCell>Qty   <Checkbox /></TableCell>
        <TableCell>Disc   <Checkbox /></TableCell>
        <TableCell>GST   <Checkbox /></TableCell>
        <TableCell>Rate   <Checkbox /></TableCell>
        <TableCell>GST Amt   <Checkbox /></TableCell>
        <TableCell>Total Amt   <Checkbox /></TableCell>
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
  <Button onClick={handleSaveExportInvoice} sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>Save & Export</Button>
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
            <TableCell>SI NO</TableCell>
            <TableCell>Description of Goods</TableCell>
            <TableCell>Qty</TableCell>
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

    </div>
  );
};

export default Invoice;

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
    // Fetch or initialize company and type options
    setCompanyOptions(["Company 1", "Company 2", "Company 3"]);
    setTypeOptions(["Type 1", "Type 2", "Type 3"]);
  
    // Initialize data for Table 1
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
  const filtered = data.filter((row) => {
    return Object.keys(searchFields).every((key) =>
      row[key].toLowerCase().includes(searchFields[key].toLowerCase())
    );
  });
  setFilteredData(filtered);
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

const handleExportPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.text("Invoice Details", 20, 20);

  // Add TextField and Select values
  doc.text(`Customer Name: ${newInvoice.description || ''}`, 20, 40);
  doc.text(`Brand: ${newInvoice.brand || ''}`, 20, 50);
  doc.text(`From Date: ${newInvoice.qty || ''}`, 20, 60);
  doc.text(`To Date: ${newInvoice.category || ''}`, 20, 70);
  doc.text(`Company: ${newInvoice.company || ''}`, 20, 80);
  doc.text(`Type: ${newInvoice.type || ''}`, 20, 90);
  doc.text(`Export Type: ${newInvoice.exportType || ''}`, 20, 100);
  doc.text(`File Type: ${newInvoice.fileType || ''}`, 20, 110);

  // Save and download the PDF
  doc.save("invoice.pdf");

  // Optional: Close the dialog after export
  setOpenExportDialog(false);
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

      {/* Popup Dialog */}
      <Dialog open={openExportDialog} onClose={() => setOpenExportDialog(false)} fullWidth  PaperProps={{
          style: {
            width: '100%', // Set the width to 80% or any value you desire
            maxWidth: 'none', // Remove the maximum width limit
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
      gridTemplateColumns: "repeat(7, 1fr)", // 7 equal columns
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
          <Button onClick={() => setOpenExportDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleExportPDF}>
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
            placeholder="Description"
            value={searchFields.description}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="brand"
            placeholder="Brand"
            value={searchFields.brand}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="hsn"
            placeholder="HSN"
            value={searchFields.hsn}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="rate"
            placeholder="Rate"
            value={searchFields.rate}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="category"
            placeholder="Category"
            value={searchFields.category}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="gst"
            placeholder="GST"
            value={searchFields.gst}
            onChange={handleInputChange}
          />
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
            <Button onClick={handleExportDialogClose} color="primary">Cancel</Button>
            <Button onClick={handleInvoiceExport} color="primary">Export</Button>
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
                <TableCell>Name</TableCell>
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
                    <TableCell>{row.gst}</TableCell>
                    <TableCell>{row.rate}</TableCell>
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
      gridTemplateColumns: "repeat(7, 1fr)", // 7 equal columns
      gap: "5px",
      alignItems: "center",
    }}>
      <TextField
        margin="dense"
        label="Description"
        name="description"
        value={newInvoice.description}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Brand"
        name="brand"
        value={newInvoice.brand}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Quantity"
        name="qty"
        value={newInvoice.qty}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Category"
        name="category"
        value={newInvoice.category}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="HSN"
        name="hsn"
        value={newInvoice.hsn}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="GST"
        name="gst"
        value={newInvoice.gst}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Rate"
        name="rate"
        value={newInvoice.rate}
        onChange={handleNewInvoiceChange}
        fullWidth
      />
      
      <FormControl fullWidth margin="dense">
        <InputLabel>Company</InputLabel>
        <Select name="company" value={newInvoice.company} onChange={handleNewInvoiceChange}>
          {companyOptions.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel>Type</InputLabel>
        <Select name="type" value={newInvoice.type} onChange={handleNewInvoiceChange}>
          {typeOptions.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <lable className="invoice-main-search-btn" onClick={handleSearch}>Search</lable>
    </div>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleSaveInvoice} color="primary">
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

  {/* New Popup Dialog */}
  <Dialog open={openNewPopup} onClose={handleCloseNewPopup}PaperProps={{
          style: {
            width: '100%', // Set the width to 80% or any value you desire
            maxWidth: 'none', // Remove the maximum width limit
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
      gridTemplateColumns: "repeat(7, 1fr)", // 7 equal columns
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
      <TableCell>{index + 1}</TableCell> {/* SI NO */}
      <TableCell>{row.description}</TableCell> {/* Description of Goods */}
      <TableCell>{row.hsn}</TableCell> {/* HSN/SAC */}
      <TableCell>{row.qty}</TableCell> {/* Qty */}
      <TableCell>{row.discount || "N/A"}</TableCell> {/* Disc */}
      <TableCell>{row.gst}%</TableCell> {/* GST */}
      <TableCell>{row.rate}</TableCell> {/* Rate */}
      <TableCell>{((row.rate * row.qty * row.gst) / 100).toFixed(2)}</TableCell> {/* GST Amt */}
      <TableCell>{(row.rate * row.qty).toFixed(2)}</TableCell> {/* Total Amt */}
    </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      {/* Save and Cancel Buttons */}
      <DialogActions>
  <Button onClick={handleCloseNewPopup} color="secondary">Cancel</Button>
  <Button onClick={handleSaveExportInvoice} color="primary">Save & Export</Button>
</DialogActions>


 
  </DialogContent>
    </Dialog>
    </div>
  );
};

export default Invoice;

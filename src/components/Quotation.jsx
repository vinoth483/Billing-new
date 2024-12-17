import React, { useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../style/Quotation.css";

const Quotation = () => {
  const initialData = [
    { siNo: 1, description: "Item 1", brand: "Brand A", qty: 10, category: "School", hsn: "HSN001", gst: 18, rate: 100 },
    { siNo: 2, description: "Item 2", brand: "Brand B", qty: 5, category: "College", hsn: "HSN002", gst: 12, rate: 200 },
    { siNo: 3, description: "Item 3", brand: "Brand C", qty: 20, category: "Company", hsn: "HSN003", gst: 5, rate: 150 },
  ];

  const [searchFields, setSearchFields] = useState({
    number: "",
    company: "",
    type: "",
    date: "",
  });
  const [newInvoice, setNewInvoice] = useState({
    company: '',
    type: '',
  });

  const [filteredData, setFilteredData] = useState(initialData);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newQuotation, setNewQuotation] = useState({
    description: "",
    brand: "",
    qty: "",
    category: "",
    hsn: "",
    gst: "",
    rate: "",
  });
  const companyOptions = ['Company 1', 'Company 2', 'Company 3']; // example
const typeOptions = ['Type 1', 'Type 2', 'Type 3']; // example


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuotationChange = (e) => {
    const { name, value } = e.target;
    setNewQuotation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = initialData.filter((row) => {
      return (
        (!searchFields.number || row.description.includes(searchFields.number)) &&
        (!searchFields.company || row.company?.toLowerCase().includes(searchFields.company.toLowerCase())) &&
        (!searchFields.type || row.category.toLowerCase().includes(searchFields.type.toLowerCase())) &&
        (!searchFields.date || row.date?.includes(searchFields.date))
      );
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchFields({
      number: "",
      company: "",
      type: "",
      date: "",
    });
    setFilteredData(initialData);
  };

  const handleAddQuotation = () => {
    const newEntry = {
      siNo: filteredData.length + 1,
      ...newQuotation,
    };
    setFilteredData([...filteredData, newEntry]);
    setOpenAddDialog(false);
    setNewQuotation({
      description: "",
      brand: "",
      qty: "",
      category: "",
      hsn: "",
      gst: "",
      rate: "",
    });
  };
  const handleNewInvoiceChange = (event) => {
    const { name, value } = event.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="quotation-page">
      <h3>Quotation List</h3>

      <div className="quotation-header-section">
        <div className="quotation-action-buttons">
          <Button
            className="action-btn"
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Quotation
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

        <div className="quotation-search-section">
          <IconButton className="backspace-btn" onClick={handleReset} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <input
            className="search-input"
            type="text"
            name="number"
            placeholder="Search by Number"
            value={searchFields.number}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="company"
            placeholder="Search by Date"
            value={searchFields.company}
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
  <option value="Type 1">Type 1</option>
  <option value="Type 2">Type 2</option>
  <option value="Type 3">Type 3</option>
</select>
        
          <button className="main-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="table-section">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SI NO</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>HSN</TableCell>
                <TableCell>GST</TableCell>
                <TableCell align="right">Rate</TableCell>
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
                    <TableCell align="right">${row.rate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} className="quotation-dialog"  PaperProps={{
          style: {
            width: '100%', // Set the width to 80% or any value you desire
            maxWidth: 'none', // Remove the maximum width limit
          }
        }}>
        <DialogTitle>Add New Quotation</DialogTitle>
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
              value={newQuotation.description}
              onChange={handleAddQuotationChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Brand"
              name="brand"
              value={newQuotation.brand}
              onChange={handleAddQuotationChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Quantity"
              name="qty"
              value={newQuotation.qty}
              onChange={handleAddQuotationChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Category"
              name="category"
              value={newQuotation.category}
              onChange={handleAddQuotationChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="HSN"
              name="hsn"
              value={newQuotation.hsn}
              onChange={handleAddQuotationChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="GST"
              name="gst"
              value={newQuotation.gst}
              onChange={handleAddQuotationChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Rate"
              name="rate"
              value={newQuotation.rate}
              onChange={handleAddQuotationChange}
              fullWidth
            />
          </div>
          {/* Added Table in Popup */}
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>SI NO</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>HSN</TableCell>
              <TableCell>GST</TableCell>
              <TableCell align="right">Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.siNo}>
                  <TableCell>{row.siNo}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.hsn}</TableCell>
                  <TableCell>{row.gst}</TableCell>
                  <TableCell align="right">${row.rate}</TableCell>
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
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddQuotation} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Quotation;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  Menu, 
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import CloseIcon from '@mui/icons-material/Close';
import "../style/dashboard.css";

const Dashboard = () => {
  const initialData = [
    { siNo: 1, description: "Material 1", brand: "Brand A", qty: 10, category: "Category X", hsn: "1234", gst: "18%", rate: 100 },
    { siNo: 2, description: "Material 2", brand: "Brand B", qty: 20, category: "Category Y", hsn: "5678", gst: "12%", rate: 150 },
    { siNo: 3, description: "Material 3", brand: "Brand C", qty: 30, category: "Category Z", hsn: "9101", gst: "5%", rate: 200 },
    { siNo: 4, description: "Material 4", brand: "Brand D", qty: 40, category: "Category W", hsn: "1121", gst: "28%", rate: 250 },
    { siNo: 5, description: "Material 5", brand: "Brand E", qty: 50, category: "Category V", hsn: "3141", gst: "15%", rate: 300 },
    { siNo: 6, description: "Material 6", brand: "Brand F", qty: 60, category: "Category U", hsn: "5161", gst: "10%", rate: 350 },
    { siNo: 7, description: "Material 7", brand: "Brand G", qty: 70, category: "Category T", hsn: "7181", gst: "8%", rate: 400 },
    { siNo: 8, description: "Material 8", brand: "Brand H", qty: 80, category: "Category S", hsn: "9202", gst: "25%", rate: 450 },
  ];

  const [searchFields, setSearchFields] = useState({
    description: "",
    brand: "",
    hsn: "",
    rate: "",
    category: "",
    gst: "",
  });

  const [filteredData, setFilteredData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    siNo: "",
    description: "",
    brand: "",
    qty: "",
    category: "",
    hsn: "",
    gst: "",
    rate: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([
    { id: 1, description: 'Sample Item 1', brand: 'Brand A' },
    { id: 2, description: 'Sample Item 2', brand: 'Brand B' },
    // Add more data as needed
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleSearch = () => {
    const filtered = initialData.filter((row) => {
      const isMatch =
        (!searchFields.description || row.description.toLowerCase().includes(searchFields.description.toLowerCase())) &&
        (!searchFields.brand || row.brand.toLowerCase().includes(searchFields.brand.toLowerCase())) &&
        (!searchFields.hsn || row.hsn.toString().includes(searchFields.hsn)) &&
        (!searchFields.rate || row.rate.toString().includes(searchFields.rate.replace('$', ''))) &&
        (!searchFields.category || row.category.toLowerCase().includes(searchFields.category.toLowerCase())) &&
        (!searchFields.gst || row.gst.toLowerCase().includes(searchFields.gst.toLowerCase()));
      return isMatch;
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
    });
    setFilteredData(initialData);
    setShowCheckboxes(false);
    setSelectedRows([]);  
  };

  const handleInputChange = (e) => {
    setSearchFields({
      ...searchFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMaterialClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewMaterialChange = (e) => {
    setNewMaterial({
      ...newMaterial,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveMaterial = () => {
    const newEntry = {
      ...newMaterial,
      siNo: filteredData.length + 1,
      qty: parseInt(newMaterial.qty),
      rate: parseFloat(newMaterial.rate),
    };
    setFilteredData([...filteredData, newEntry]);
    setOpen(false);
    setNewMaterial({ siNo: "", description: "", brand: "", qty: "", category: "", hsn: "", gst: "", rate: "" });
  };

  const handleExport = () => {
    const exportData = filteredData.map(({ siNo, description, brand, qty, category, hsn, gst, rate }) => ({
      siNo,
      description,
      brand,
      qty,
      category,
      hsn,
      gst,
      rate,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      exportData.map((item) => Object.values(item).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "material_list.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const lines = csvData.split("\n");
        const importedData = lines.slice(1).map((line) => {
          const [siNo, description, brand, qty, category, hsn, gst, rate] = line.split(",");
          return {
            siNo: parseInt(siNo),
            description,
            brand,
            qty: parseInt(qty),
            category,
            hsn,
            gst,
            rate: parseFloat(rate),
          };
        });
        setFilteredData(importedData);
      };
      reader.readAsText(file);
    }
  };

  const handleCheckboxChange = (siNo) => {
    setSelectedRows(prevSelected => 
      prevSelected.includes(siNo) 
        ? prevSelected.filter(id => id !== siNo) 
        : [...prevSelected, siNo]
    );
  };

  const handleDeleteClick = () => {
    if (showCheckboxes) {
      // If checkboxes are visible, delete the selected rows
      const updatedData = filteredData.filter(row => !selectedRows.includes(row.siNo));
      setFilteredData(updatedData);
      setSelectedRows([]); // Reset selection
      setShowCheckboxes(false); // Hide checkboxes after deletion
    } else {
      // If checkboxes are not visible, show them
      setShowCheckboxes(true);
    }
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpen(true); // Open the dialog on "Edit" click
    handleMenuClose();
  };
  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);  // Set anchorEl to the clicked button
    setSelectedRow(row); // Optionally, track which row the menu is opened for
  };

  return (
    <div className="dashboard">
      <h3>Search Material Price</h3>
      <div className="action-section">
        <div className="action-buttons">
        <label className="common-btn export-btn" onClick={handleExport}>
  Export List
</label>
<label htmlFor="import-file" className="common-btn import-btn">
  Import List
</label>
<input
  type="file"
  id="import-file"
  style={{ display: "none" }}
  accept=".csv"
  onChange={handleImport}
/>
<label className="common-btn add-material-btn" onClick={handleAddMaterialClick}>
  + Material
</label>
<button
  className="unique-delete-btn"
  onClick={handleDeleteClick}
  aria-label={showCheckboxes ? "Delete selected" : "Select materials for deletion"}
>
  {showCheckboxes ? "Delete Selected" : "Delete"}
</button>

        </div>

        <div className="search-buttons">
          <IconButton className="backspace-btn" onClick={handleReset}  aria-label="Reset filters and selections">
            <ArrowBackIcon />
          </IconButton>
          <input
            className="search-input"
            type="text"
            name="description"
            placeholder="Name"
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
         <lable className="main-search-btn" onClick={handleSearch}>Search</lable>
        </div>
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
        <DialogTitle>
          Add Material
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
        <DialogContent style={{ maxHeight: "1000px" }}>
          <div
            className="popup-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)", // 7 equal columns
              gap: "5px",
              alignItems: "center",
            }}
          >
            <TextField margin="dense" label="Description" name="description" value={newMaterial.description} onChange={handleNewMaterialChange} fullWidth />
            <FormControl fullWidth margin="dense">
  <InputLabel>Brand</InputLabel>
  <Select
    name="brand"
    value={newMaterial.brand}
    onChange={handleNewMaterialChange}
    label="Brand"
    sx={{
      height: 52,
      fontSize: '0.875rem',
      paddingTop: '4px',
      paddingBottom: '4px',
    }}
  >
    <MenuItem value="brand1">Brand 1</MenuItem>
    <MenuItem value="brand2">Brand 2</MenuItem>
    <MenuItem value="brand3">Brand 3</MenuItem>
    {/* Add more options here */}
  </Select>
</FormControl>

<FormControl fullWidth margin="dense">
  <InputLabel>Category</InputLabel>
  <Select
    name="category"
    value={newMaterial.category}
    onChange={handleNewMaterialChange}
    label="Category"
    sx={{
      height: 52,
      fontSize: '0.875rem',
      paddingTop: '4px',
      paddingBottom: '4px',
    }}
  >
    <MenuItem value="category1">Category 1</MenuItem>
    <MenuItem value="category2">Category 2</MenuItem>
    <MenuItem value="category3">Category 3</MenuItem>
    {/* Add more options here */}
  </Select>
</FormControl>
            <TextField margin="dense" label="HSN" name="hsn" value={newMaterial.hsn} onChange={handleNewMaterialChange} fullWidth />
            <TextField margin="dense" label="GST" name="gst" value={newMaterial.gst} onChange={handleNewMaterialChange} fullWidth />
            <TextField margin="dense" label="Rate" name="rate" value={newMaterial.rate} onChange={handleNewMaterialChange} fullWidth />
            <label className="main1-search-btn" onClick={handleSearch} style={{ height: '50px' }}>Search</label>
          </div>
          <DialogActions>
            <Button onClick={handleClose} sx={{
              color: 'white',
              backgroundColor: '#2b356bcb',
            }}>Cancel</Button>
            <Button onClick={handleSaveMaterial} sx={{
              color: 'white',
              backgroundColor: '#2b356bcb',
            }}>Save</Button>
          </DialogActions>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>HSN</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>GST</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
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
                      <TableCell>${row.rate}</TableCell>
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
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {showCheckboxes && <TableCell>Select</TableCell>}
            <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>HSN</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>GST</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell> {/* Actions column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <TableRow key={row.siNo}>
                {showCheckboxes && (
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row.siNo)}
                      onChange={() => handleCheckboxChange(row.siNo)}
                    />
                  </TableCell>
                )}
                <TableCell>{row.siNo}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.hsn}</TableCell>
                <TableCell>{row.gst}</TableCell>
                <TableCell>${row.rate}</TableCell>
                <TableCell>
                  {/* Three-dot menu with reduced width */}
                  <IconButton 
                    onClick={(event) => handleMenuClick(event, row)} 
                    sx={{ padding: 0.5, 
                      width: '30px',
                      height: '30px'
                    }}  // Reduce the padding to decrease the width
                  >
                    <MoreVertIcon sx={{ fontSize: '20px' }} />  {/* Adjust icon size if needed */}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">No results found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Menu for actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
      
    </TableContainer>
      </div>
  );
};

export default Dashboard;

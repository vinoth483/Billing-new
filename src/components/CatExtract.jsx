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
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import "../style/CatExtract.css";

const CatExtract = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [brands, setBrands] = useState(["Omron", "Honeywell"]);
  const [categories, setCategories] = useState(["Lab Controller", "Other"]);
  const [newFile, setNewFile] = useState({
    fileName: "",
    fileType: "",
    numPages: "",
    progress: "In progress",
    status: "In progress",
  });

  const initialData = [
    { siNo: 1, fileName: "-", fileType: "-", numPages: "-", progress: "In progress", status: "In progress" },
  ];

  const [filteredData, setFilteredData] = useState(initialData);

  const handleAddFileChange = (e) => {
    const { name, value } = e.target;
    setNewFile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFile = () => {
    const newEntry = {
      siNo: filteredData.length + 1,
      ...newFile,
    };
    setFilteredData([...filteredData, newEntry]);
    setOpenAddDialog(false);
    setNewFile({ fileName: "", fileType: "", numPages: "", progress: "In progress", status: "In progress" });
  };

  const handleAddBrand = () => {
    const newBrand = prompt("Enter new brand:");
    if (newBrand && !brands.includes(newBrand.trim())) {
      setBrands((prev) => [...prev, newBrand.trim()]);
    }
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category:");
    if (newCategory && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
    }
  };

  const handleClose = () => {
    setOpenAddDialog(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <div className="cat-extract-container">
      <div className="header">
        <h2>File Extract</h2>
        <Button
          className="upload-button"
          variant="contained"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
          }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Upload File
        </Button>
      </div>

      <TableContainer component={Paper} className="file-table-container">
        <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Sl No</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>File Type</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Number of Pages</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Progress</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.siNo}>
                <TableCell>{row.siNo}</TableCell>
                <TableCell>{row.fileName}</TableCell>
                <TableCell>{row.fileType}</TableCell>
                <TableCell>{row.numPages}</TableCell>
                <TableCell>{row.progress}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddDialog} onClose={handleClose} className="add-file-dialog">
        <DialogTitle>
          File Upload
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
        <DialogContent className="add-file-dialog-content">
          <div className="dialog-row">
            <TextField
              label="Select Brand"
              name="fileName"
              value={newFile.fileName}
              onChange={handleAddFileChange}
              variant="outlined"
              fullWidth
              margin="dense"
              select
              style={{ width: "80%" }}
            >
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown closure
                  handleAddBrand();
                }}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <AddIcon color="primary" />
                <Typography variant="body2" color="primary">
                  Add New Brand
                </Typography>
              </MenuItem>
            </TextField>

            <TextField
              label="Select Category"
              name="fileType"
              value={newFile.fileType}
              onChange={handleAddFileChange}
              variant="outlined"
              fullWidth
              margin="dense"
              select
              style={{ width: "80%" }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown closure
                  handleAddCategory();
                }}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <AddIcon color="primary" />
                <Typography variant="body2" color="primary">
                  Add New Category
                </Typography>
              </MenuItem>
            </TextField>
          </div>
          <Button
        component="label"
        className="upload-button"
        sx={{
          color: "white",
          backgroundColor: "#2b356bcb",
        }}
      >
        Select File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {selectedFile && (
        <div className="file-preview" style={{ marginTop: "10px", color: "#2b356b" }}>
          <strong>Selected File:</strong> {selectedFile.name}
        </div>
      )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button
            onClick={() => setOpenAddDialog(false)}
            className="dialog-actions-btn cancel-btn"
            sx={{
              color: 'white',
              backgroundColor: '#2b356bcb',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddFile}
            className="dialog-actions-btn save-btn"
            sx={{
              color: 'white',
              backgroundColor: '#2b356bcb',
            }}
          >
            Extract File
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CatExtract;

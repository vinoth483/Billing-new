import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,  Typography,   MenuItem, } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import "../style/new.css";

const CatExtract = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
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

  return (
    <div className="cat-extract-container">
      <div className="header">
        <h2>File Extract</h2>
        <Button className="upload-button" variant="contained"  sx={{
        backgroundColor: " #2b356bd3 ",
        color: "white",

     
     
      }}  startIcon={<AddCircleOutlineIcon />} onClick={() => setOpenAddDialog(true)}>
          Upload File
        </Button>
      </div>

      <TableContainer component={Paper} className="file-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>File Type</TableCell>
              <TableCell>Number of Pages</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
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

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} className="add-file-dialog">
  <DialogTitle>File Upload</DialogTitle>
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
    <Button variant="outlined" component="label" className="upload-button"  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
      Select File
      <input type="file" hidden />
    </Button>
  </DialogContent>
  <DialogActions className="dialog-actions">
    <Button onClick={() => setOpenAddDialog(false)} className="dialog-actions-btn cancel-btn"  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
      Cancel
    </Button>
    <Button onClick={handleAddFile} className="dialog-actions-btn save-btn" sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
      Extract File
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default CatExtract;

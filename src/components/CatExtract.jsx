import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../style/new.css";

const CatExtract = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
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
        <option value="Omron">Omron</option>
        <option value="Honeywell">Honeywell</option>
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
        <option value="Lab Controller">Lab Controller</option>
        <option value="Other">Other</option>
      </TextField>
    </div>
    <Button variant="outlined" component="label" className="upload-button">
      Select File
      <input type="file" hidden />
    </Button>
  </DialogContent>
  <DialogActions className="dialog-actions">
    <Button onClick={() => setOpenAddDialog(false)} className="dialog-actions-btn cancel-btn">
      Cancel
    </Button>
    <Button onClick={handleAddFile} className="dialog-actions-btn save-btn">
      Extract File
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default CatExtract;

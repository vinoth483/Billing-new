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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

  const [filteredData, setFilteredData] = useState(initialData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

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

  const handleDelete = () => {
    setFilteredData((prevData) =>
      prevData.filter((row) => row.siNo !== selectedRow.siNo)
    );
    handleMenuClose();
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
          <input
            className="search-input"
            type="text"
            name="invoiceDate"
            placeholder="Search by Date"
            value={searchFields.invoiceDate}
            onChange={handleInputChange}
          />
          <button className="main-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

    
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl. No</TableCell>
              <TableCell>DC Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Delivered By</TableCell>
              <TableCell>Received By</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Actions</TableCell>
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
        <DialogTitle>Edit Delivery Chalan</DialogTitle>
        <DialogContent>
          <TextField
            label="DC Number"
            name="dcNumber"
            value={selectedRow?.dcNumber || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Customer Name"
            name="customerName"
            value={selectedRow?.customerName || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Company"
            name="company"
            value={selectedRow?.company || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Invoice Date"
            name="invoiceDate"
            value={selectedRow?.invoiceDate || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
            type="text"
          />
          <TextField
            label="Delivered By"
            name="deliveredBy"
            value={selectedRow?.deliveredBy || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Received By"
            name="receivedBy"
            value={selectedRow?.receivedBy || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>Cancel</Button>
          <Button onClick={handleEditSave}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>Save</Button>
        </DialogActions>
      </Dialog>

   
      <Dialog
        open={openAddPopup}
        onClose={() => setOpenAddPopup(false)}
        
      >
        <DialogTitle>Add New Delivery Chalan</DialogTitle>
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
            label="Select DC Date"
            name="invoiceDate"
            value={newChalan.invoiceDate}
            onChange={handleAddInputChange}
            fullWidth
            margin="dense"
            type="text"
          />
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
              color: 'black',
              '&:hover': {
                color: 'white',
              
            }}}
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
                        <TableCell>SI NO</TableCell>
                        <TableCell>Description of Goods</TableCell>
                        <TableCell>Qty</TableCell>
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
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>Cancel</Button>
          <Button onClick={handleAddSave}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeliveryChalan;

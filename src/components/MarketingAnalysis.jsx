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
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../style/MarketAnalysis.css";

const AddClientPopup = ({ open, onClose, onSave, categories, handleAddCategory }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Enter Client Details</DialogTitle>
    <DialogContent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        <TextField label="Enter Name" variant="outlined" fullWidth />
        <TextField label="Select Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
        <TextField
          label="Select Category"
          variant="outlined"
          fullWidth
          select
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
          <MenuItem onClick={handleAddCategory}>
            <AddIcon />
            Add Category
          </MenuItem>
        </TextField>
        <TextField label="Enter State" variant="outlined" fullWidth />
        <TextField label="Enter Contact Name" variant="outlined" fullWidth />
        <TextField label="Enter Contact" variant="outlined" fullWidth />
        <TextField label="Enter Email" variant="outlined" fullWidth />
        <TextField
          label="Enter Remarks"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          style={{ gridColumn: "span 3" }}
        />
        <TextField
          label="Select Next Meet Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </div>
    </DialogContent>
    <DialogActions style={{ justifyContent: "center" }}>
      <Button onClick={onClose} sx={{ color: "black", "&:hover": { color: "white" } }}>
        Cancel
      </Button>
      <Button
        onClick={onSave}
        sx={{ color: "black", "&:hover": { color: "white" } }}
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

const AddGreetingPopup = ({ open, onClose, onSave }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Add Greeting Message</DialogTitle>
    <DialogContent>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          label="Enter Message to Send"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
<Button variant="contained" component="label" style={{ alignSelf: "flex-start" }}>
  Upload Photo
  <input type="file" hidden onChange={handleAddFileChange} />
</Button>
{newFile.file && <p>{newFile.file.name}</p>}
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
        Cancel
      </Button>
      <Button
        onClick={onSave}
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
  </Dialog>
);

const MarketAnalysis = () => {
  const [isClientPopupOpen, setIsClientPopupOpen] = useState(false);
  const [isGreetingPopupOpen, setIsGreetingPopupOpen] = useState(false);
  const [searchFields, setSearchFields] = useState({
    category: "",
    state: "",
    name: "",
    date: "",
    nextMeetingDate: "",
  });
  const [data, setData] = useState([
    {
      siNo: 1,
      date: "2023-11-01",
      customerName: "Customer A",
      category: "Tech",
      state: "NY",
      contact: "John Doe",
      contactNumber: "1234567890",
      remarks: "Follow-up needed",
      nextMeeting: "2023-11-20",
    },
    {
      siNo: 2,
      date: "2023-11-02",
      customerName: "Customer B",
      category: "Retail",
      state: "CA",
      contact: "Jane Smith",
      contactNumber: "0987654321",
      remarks: "Demo scheduled",
      nextMeeting: "2023-11-25",
    },
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newFile, setNewFile] = useState({ fileName: "", fileType: "" });
  const [categories, setCategories] = useState(["Tech", "Retail"]);

  const handleSearch = () => {
    const filtered = data.filter((row) => {
      const isMatch =
        (!searchFields.category || row.category.toLowerCase().includes(searchFields.category.toLowerCase())) &&
        (!searchFields.state || row.state.toLowerCase().includes(searchFields.state.toLowerCase())) &&
        (!searchFields.name || row.customerName.toLowerCase().includes(searchFields.name.toLowerCase())) &&
        (!searchFields.date || row.date.includes(searchFields.date)) &&
        (!searchFields.nextMeetingDate ||
          row.nextMeeting.toLowerCase().includes(searchFields.nextMeetingDate.toLowerCase()));
      return isMatch;
    });

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchFields({
      category: "",
      state: "",
      name: "",
      date: "",
      nextMeetingDate: "",
    });
    setFilteredData(data);
  };

  const handleClickMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setSelectedRow(currentRow);
    setOpenEditDialog(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setFilteredData((prevData) =>
      prevData.filter((row) => row.siNo !== selectedRow.siNo)
    );
    handleCloseMenu();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow({
      ...selectedRow,
      [name]: value,
    });
  };

  const handleEditSave = () => {
    const updatedData = data.map((row) =>
      row.siNo === selectedRow.siNo ? selectedRow : row
    );
    setData(updatedData);
    setOpenEditDialog(false);
  };

  const handleAddFileChange = (event) => {
    const { name, value } = event.target;
    setNewFile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category:");
    if (newCategory && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
    }
  };
  return (
    <div className="marketAnalysis-container">
      <h3 className="marketAnalysis-title">Market Analysis</h3>
      <div className="marketAnalysis-actions">
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2b356bd3", color: "white", width: "400px" }}
          onClick={() => setIsGreetingPopupOpen(true)}
        >
          Greeting Mail
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2b356bd3", color: "white", width: "400px" }}
          onClick={() => setIsClientPopupOpen(true)}
        >
          + New Client
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2b356bd3", color: "white", width: "400px" }}
        >
          Export
        </Button>
      </div>
      <div className="marketAnalysis-search">
        <IconButton className="backspace-btn" onClick={handleReset} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <input
          className="search-input"
          type="text"
          name="category"
          placeholder="Search by Category"
          value={searchFields.category}
          onChange={(e) => setSearchFields({ ...searchFields, category: e.target.value })}
        />
        <input
          className="search-input"
          type="text"
          name="state"
          placeholder="Search by State"
          value={searchFields.state}
          onChange={(e) => setSearchFields({ ...searchFields, state: e.target.value })}
        />
        <input
          className="search-input"
          type="text"
          name="name"
          placeholder="Search by Name"
          value={searchFields.name}
          onChange={(e) => setSearchFields({ ...searchFields, name: e.target.value })}
        />
        <input
          className="search-input"
          type="text"
          name="date"
          placeholder="Search by Date"
          value={searchFields.date}
          onChange={(e) => setSearchFields({ ...searchFields, date: e.target.value })}
        />
        <input
          className="search-input"
          type="text"
          name="nextMeetingDate"
          placeholder="Search by Next Meeting Date"
          value={searchFields.nextMeetingDate}
          onChange={(e) => setSearchFields({ ...searchFields, nextMeetingDate: e.target.value })}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ backgroundColor: "#2b356bd3", color: "white", width: "150px" }}
        >
          Search
        </Button>
      </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SI NO</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Next Meeting</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.siNo}>
                <TableCell>{row.siNo}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.contactNumber}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>{row.nextMeeting}</TableCell>
                <TableCell>
                  <IconButton className="small-icon-button" onClick={(e) => handleClickMenu(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddClientPopup
        open={isClientPopupOpen}
        onClose={() => setIsClientPopupOpen(false)}
        onSave={handleEditSave}
        categories={categories}
        handleAddCategory={handleAddCategory}
      />
      <AddGreetingPopup
        open={isGreetingPopupOpen}
        onClose={() => setIsGreetingPopupOpen(false)}
        onSave={() => alert("Greeting saved!")}
      />
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
    </div>
  );
};

export default MarketAnalysis;

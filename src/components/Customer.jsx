import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../style/new.css";

const CustomerPage = () => {
  const initialCustomers = [
    {
      siNo: 1,
      name: "John Doe",
      code: "C001",
      city: "New York",
      state: "NY",
      email: "john@example.com",
      contact: "1234567890",
      gstin: "22ABCDE1234F1Z5",
      pendingAmount: 500,
    },
    {
      siNo: 2,
      name: "Jane Smith",
      code: "C002",
      city: "Los Angeles",
      state: "CA",
      email: "jane@example.com",
      contact: "9876543210",
      gstin: "33ABCDE5678G2H5",
      pendingAmount: 1000,
    },
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [searchFields, setSearchFields] = useState({
    name: "",
    city: "",
    state: "",
    contact: "",
    gstin: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuClick = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleEdit = () => {
    setSelectedRow(selectedCustomer);
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete customer:", selectedCustomer);
    setCustomers(customers.filter((customer) => customer.siNo !== selectedCustomer.siNo));
    handleMenuClose();
  };

  const handleSearch = () => {
    const filtered = initialCustomers.filter((customer) => {
      return (
        (!searchFields.name || customer.name.toLowerCase().includes(searchFields.name.toLowerCase())) &&
        (!searchFields.city || customer.city.toLowerCase().includes(searchFields.city.toLowerCase())) &&
        (!searchFields.state || customer.state.toLowerCase().includes(searchFields.state.toLowerCase())) &&
        (!searchFields.contact || customer.contact.includes(searchFields.contact)) &&
        (!searchFields.gstin || customer.gstin.toLowerCase().includes(searchFields.gstin.toLowerCase()))
      );
    });
    setCustomers(filtered);
  };

  const handleReset = () => {
    setSearchFields({
      name: "",
      city: "",
      state: "",
      contact: "",
      gstin: "",
    });
    setCustomers(initialCustomers);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields({ ...searchFields, [name]: value });
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

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
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCustomer = () => {
    console.log("New Customer Data:", newCustomer);
    setCustomers((prev) => [
      ...prev,
      { siNo: prev.length + 1, ...newCustomer, pendingAmount: 0 },
    ]);
    handleDialogClose();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setCustomers(customers.map((customer) =>
      customer.siNo === selectedRow.siNo ? selectedRow : customer
    ));
    setOpenEditDialog(false);
  };

  return (
    <div className="customer">
      <h3 className="customer__title">Customer List</h3>
      <div className="customer__actions">
        <Button
          variant="contained"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
            width: "400px",
          }} 
          className="customer__add-button"
          onClick={handleDialogOpen}
        >
          + Customer
        </Button>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
            width: "400px",
          }} 
          className="customer__export-button"
        >
          Export
        </Button>
      </div>

      <div className="customer__search">
        <IconButton className="backspace-btn" onClick={handleReset} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <input
          className="search-input"
          type="text"
          name="state"
          placeholder="Search by State"
          value={searchFields.state}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="contact"
          placeholder="Search by Contact"
          value={searchFields.contact}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="gstin"
          placeholder="Search by GSTIN"
          value={searchFields.gstin}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="name"
          placeholder="Search by Name"
          value={searchFields.name}
          onChange={handleInputChange}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
          }} 
          onClick={handleSearch}
          className="customer__search-button"
          style={{ width: "150px" }}
        >
          Search
        </Button>
      </div>

      <TableContainer component={Paper} className="customer__table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SI No</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Code</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>GSTIN</TableCell>
              <TableCell>Total Pending Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.siNo}>
                  <TableCell>{customer.siNo}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.code}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>{customer.state}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>{customer.gstin}</TableCell>
                  <TableCell>${customer.pendingAmount}</TableCell>
                  <TableCell>
                    <IconButton
                      className="small-icon-button"
                      onClick={(event) => handleMenuClick(event, customer)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No Customers Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Enter Customer Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Name"
            name="name"
            value={newCustomer.name}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter Customer Code"
            name="code"
            value={newCustomer.code}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter Address"
            name="address"
            value={newCustomer.address}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter City"
            name="city"
            value={newCustomer.city}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter State"
            name="state"
            value={newCustomer.state}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter State Code"
            name="stateCode"
            value={newCustomer.stateCode}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter Email"
            name="email"
            value={newCustomer.email}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter Contact"
            name="contact"
            value={newCustomer.contact}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Enter GSTIN"
            name="gstin"
            value={newCustomer.gstin}
            onChange={handleNewCustomerInputChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
            Cancel
          </Button>
          <Button onClick={handleSaveCustomer}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="Customer Name"
            name="name"
            value={selectedRow?.name || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Customer Code"
            name="code"
            value={selectedRow?.code || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Address"
            name="address"
            value={selectedRow?.address || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="City"
            name="city"
            value={selectedRow?.city || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="State"
            name="state"
            value={selectedRow?.state || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="State Code"
            name="stateCode"
            value={selectedRow?.stateCode || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={selectedRow?.email || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Contact"
            name="contact"
            value={selectedRow?.contact || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="GSTIN"
            name="gstin"
            value={selectedRow?.gstin || ""}
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
    }}>
            Cancel
          </Button>
          <Button onClick={handleEditSave}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerPage;

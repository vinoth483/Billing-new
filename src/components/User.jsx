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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../style/new.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", password: "******", dashboard: "Read", invoice: "Create", quotation: "Read" },
    { id: 2, name: "Jane Smith", password: "******", dashboard: "All", invoice: "Edit", quotation: "Delete" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    if (newUser.name && newUser.password) {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          ...newUser,
          dashboard: "All",
          invoice: "Read",
          quotation: "None",
        },
      ]);
      setNewUser({ name: "", password: "" });
      setOpen(false);
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleClickMenu = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  return (
    <div className="user">
      <h1 className="user__title">User Management</h1>

      {/* Center the Search Input, Search Button, and Add User Button */}
      <div
        className="user__search"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
            width: 150,
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: " #2b356bd3 ",
            color: "white",
            width: 150,
          }}
          onClick={handleOpenModal}
        >
          + User
        </Button>
      </div>

      <TableContainer component={Paper} className="user__table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SI NO</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Dashboard</TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell>Quotation</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.dashboard}</TableCell>
                <TableCell>{user.invoice}</TableCell>
                <TableCell>{user.quotation}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleClickMenu(e, user)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={() => handleCloseMenu()}>Edit</MenuItem>
                    <MenuItem onClick={() => handleCloseMenu()}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            variant="outlined"
            size="small"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;

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
  Checkbox,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from '@mui/icons-material/Close';
import "../style/new.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      password: "******",
      dashboard: "Read",
      invoice: "Create",
      quotation: "Read",
      billExtract: "None",
      dc: "None",
      purchase: "All",
      customer: "None",
      marketAnalysis: "None",
    },
    {
      id: 2,
      name: "Jane Smith",
      password: "******",
      dashboard: "All",
      invoice: "Edit",
      quotation: "Delete",
      billExtract: "All",
      dc: "Read",
      purchase: "All",
      customer: "Create",
      marketAnalysis: "Edit",
    },
  ]);
  
  const [newUser, setNewUser] = useState({ name: "", password: "", email: "", confirmPassword: "" });
  const [permissions, setPermissions] = useState({
    Dashboard: { All: false, Create: false, Read: false, Edit: false, Delete: false },
    Invoice: { All: false, Create: false, Read: false, Edit: false, Delete: false },
    Quotation: { All: false, Create: false, Read: false, Edit: false, Delete: false },
    BillExtract: { All: false, Create: false, Read: false, Edit: false, Delete: false },
    DC: { All: false, Create: false, Read: false, Edit: false, Delete: false },
    Purchase: { All: false, Create: false, Read: false, Edit: false, Delete: false },
    Customer: { All: false, Create: false, Read: false, Edit: false, Delete: false },
    MarketAnalysis: { All: false, Create: false, Read: false, Edit: false, Delete: false },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    if (newUser.name && newUser.password && newUser.email && newUser.password === newUser.confirmPassword) {
      const permissionSummary = Object.keys(permissions).reduce((summary, section) => {
        summary[section.toLowerCase()] = Object.keys(permissions[section])
          .filter((perm) => perm !== "All" && permissions[section][perm])
          .join(", ") || "None";
        return summary;
      }, {});

      setUsers([
        ...users,
        {
          id: users.length + 1,
          name: newUser.name,
          password: "******",
          ...permissionSummary,
        },
      ]);
      setNewUser({ name: "", password: "", email: "", confirmPassword: "" });
      setPermissions({
        Dashboard: { All: false, Create: false, Read: false, Edit: false, Delete: false },
        Invoice: { All: false, Create: false, Read: false, Edit: false, Delete: false },
        Quotation: { All: false, Create: false, Read: false, Edit: false, Delete: false },
        BillExtract: { All: false, Create: false, Read: false, Edit: false, Delete: false },
        DC: { All: false, Create: false, Read: false, Edit: false, Delete: false },
        Purchase: { All: false, Create: false, Read: false, Edit: false, Delete: false },
        Customer: { All: false, Create: false, Read: false, Edit: false, Delete: false },
        MarketAnalysis: { All: false, Create: false, Read: false, Edit: false, Delete: false },
      });
      setOpen(false);
    } else {
      alert("Please fill out all fields and ensure passwords match.");
    }
  };

  const handlePermissionChange = (section, permission) => {
    if (permission === "All") {
      setPermissions((prev) => ({
        ...prev,
        [section]: Object.keys(prev[section]).reduce((all, perm) => {
          all[perm] = !prev[section].All;
          return all;
        }, {}),
      }));
    } else {
      setPermissions((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [permission]: !prev[section][permission],
          All: false,
        },
      }));
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleClickMenu = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEditOpen = () => {
    setOpenEditDialog(true);
    handleCloseMenu();
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quotation?");
    if (confirmDelete) {
      const updatedData = filteredData.filter((_, i) => i !== index);
      setFilteredData(updatedData);
      handleCloseMenu();
    }
  };
  

  const handleEditSave = () => {
    setUsers(users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...selectedUser } : user
    ));
    setOpenEditDialog(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };
  return (
    <div className="user">
      <h1 className="user__title">User Management</h1>
      <center>
        <div className="user__search" style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <input
          className="search-input"
          type="text"
          name="name"
          placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '600px' }}
          />
          <Button variant="contained" style={{ backgroundColor: "#2b356bd3", color: "white" }} onClick={handleSearch}>
            Search
          </Button>
          <Button variant="contained" style={{ backgroundColor: "#2b356bd3", color: "white" }} onClick={handleOpenModal}>
            + User
          </Button>
        </div>
      </center>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Password</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Dashboard</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Invoice</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Quotation</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Bill Extract</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>DC</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Purchase</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Market Analysis</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                <TableCell>{user.billExtract}</TableCell>
                <TableCell>{user.dc}</TableCell>
                <TableCell>{user.purchase}</TableCell>
                <TableCell>{user.customer}</TableCell>
                <TableCell>{user.marketAnalysis}</TableCell>
                <TableCell>
                  <IconButton className="small-icon-button" onClick={(e) => handleClickMenu(e, user)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Add New User
        <IconButton
  edge="end"
  color="inherit"
  onClick={handleCloseModal} // Use the same function that closes the modal
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
        <DialogContent
        style={{ maxHeight: "1000px" }}>
        <div className="popup-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 7 equal columns
          gap: "5px",
          alignItems: "center",
          
        }}>
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
            label="User Email"
            variant="outlined"
            size="small"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          </div>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Section</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>All</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Create</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Read</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Edit</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(permissions).map((section) => (
                <TableRow key={section}>
                  <TableCell>{section}</TableCell>
                  {Object.keys(permissions[section]).map((permission) => (
                    <TableCell key={permission}>
                      <Checkbox
                        checked={permissions[section][permission]}
                        onChange={() => handlePermissionChange(section, permission)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Cancel</Button>
          <Button onClick={handleAddUser} sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User
        <IconButton
      edge="end"
      color="inherit"
      onClick={() => setOpenEditDialog(false)} // Directly close the dialog
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
        <DialogContent
        style={{ maxHeight: "1000px" }}>
        <div className="popup-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 7 equal columns
          gap: "5px",
          alignItems: "center",
          
        }}>
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
            label="User Email"
            variant="outlined"
            size="small"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          </div>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Section</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>All</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Create</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Read</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Edit</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(permissions).map((section) => (
                <TableRow key={section}>
                  <TableCell>{section}</TableCell>
                  {Object.keys(permissions[section]).map((permission) => (
                    <TableCell key={permission}>
                      <Checkbox
                        checked={permissions[section][permission]}
                        onChange={() => handlePermissionChange(section, permission)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Cancel</Button>
          <Button onClick={handleAddUser} sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
    }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
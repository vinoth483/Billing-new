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
  InputAdornment,
  Badge,
  Box,
  Popover,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../style/MarketAnalysis.css";

const AddClientPopup = ({ open, onClose, onSave }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Enter Client Details</DialogTitle>
    <DialogContent>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        <TextField
          label="Enter Customer Name"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Select Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField label="Select Category" variant="outlined" fullWidth />
        <TextField label="Enter State" variant="outlined" fullWidth />
        <TextField
          label="Enter Contact Name"
          variant="outlined"
          fullWidth
        />
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
      <Button
        onClick={onClose}
        sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
        }}
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
      <div
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="Enter Message to Send"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          component="label"
          style={{ alignSelf: "flex-start" }}
        >
          Upload Photo
          <input type="file" hidden />
        </Button>
      </div>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        sx={{
          color: 'white',
          backgroundColor: '#2b356bcb',
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

  // Notification State
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications,  setNotifications] = useState([
    { id: 1, message: "Next meeting data 12/10/2024", read: false },
    { id: 2, message: "Meeting scheduled with Customer A.", read: false },
  ]);

  const handleSearch = () => {
    const filtered = data.filter((row) => {
      const isMatch =
        (!searchFields.category ||
          row.category
            .toLowerCase()
            .includes(searchFields.category.toLowerCase())) &&
        (!searchFields.state ||
          row.state.toLowerCase().includes(searchFields.state.toLowerCase())) &&
        (!searchFields.name ||
          row.customerName
            .toLowerCase()
            .includes(searchFields.name.toLowerCase())) &&
        (!searchFields.date || row.date.includes(searchFields.date)) &&
        (!searchFields.nextMeetingDate ||
          row.nextMeeting.includes(searchFields.nextMeetingDate));
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

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quotation?"
    );
    if (confirmDelete) {
      const updatedData = filteredData.filter((_, i) => i !== index);
      setFilteredData(updatedData);
      handleCloseMenu();
    }
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

  // Notification Handlers
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    // Optionally mark notifications as read
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const openNotification = Boolean(notificationAnchorEl);
  const notificationId = openNotification ? "notification-popover" : undefined;
  const handleToggleNotifications = (event) => {
    setNotificationAnchorEl(notificationAnchorEl ? null : event.currentTarget);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

    const [searchDate, setSearchDate] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
  const handleSearchDateChange = (event) => {
    setSearchDate(event.target.value);
  };
  
  const handleInvoiceDateChange = (event) => {
    setInvoiceDate(event.target.value);
  };
  return (
    <div className="marketAnalysis-container">
      {/* Header with Notification Icon */}
      <Box
        display="flex"
        justifyContent="space-between"
        marginLeft="500px"
        mb={2}
      >
        <h3 className="marketAnalysis-title">Market Analysis</h3>
        <IconButton
         className="notification-icon-button"
          color="inherit"
          onClick={handleNotificationClick}
          aria-describedby={notificationId}
          sx={{
            width: "40px",
            height: "40px",
            color: "#2b356bd3",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "#f5f5f5", 
            },
          }}
        >
          <Badge
            badgeContent={notifications.filter((n) => !n.read).length}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
        id={notificationId}
        open={openNotification}
        anchorEl={notificationAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="notification-popover"
      >
        <Box>
          <Typography variant="h6">Notifications</Typography>
          {notifications.length === 0 ? (
            <Typography className="no-notifications" variant="body2">
              No new notifications.
            </Typography>
          ) : (
            notifications.map((notif) => (
              <Box
                key={notif.id}
                className={`notification-item ${
                  notif.read ? "read" : "unread"
                }`}
              >
                <span className="icon">🔔</span>
                <Typography>{notif.message}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Popover>

      </Box>

      <div className="marketAnalysis-actions">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2b356bd3",
            color: "white",
            width: "500px",
          }}
          onClick={() => setIsGreetingPopupOpen(true)}
        >
          Greeting Mail
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2b356bd3",
            color: "white",
            width: "500px",
          }}
          onClick={() => setIsClientPopupOpen(true)}
        >
          + New Client
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2b356bd3",
            color: "white",
            width: "400px",
          }}
        >
          Export
        </Button>
      </div>
      <div className="marketAnalysis-search">
        <IconButton
          className="backspace-btn"
          onClick={handleReset}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <input
          className="search-input"
          type="text"
          name="category"
          placeholder="Search by Category"
          value={searchFields.category}
          onChange={(e) =>
            setSearchFields({ ...searchFields, category: e.target.value })
          }
        />
        <input
          className="search-input"
          type="text"
          name="state"
          placeholder="Search by State"
          value={searchFields.state}
          onChange={(e) =>
            setSearchFields({ ...searchFields, state: e.target.value })
          }
        />
        <input
          className="search-input"
          type="text"
          name="name"
          placeholder="Search by Name"
          value={searchFields.name}
          onChange={(e) =>
            setSearchFields({ ...searchFields, name: e.target.value })
          }
        />
 <div style={{ marginBottom: "1px" }}>
  <input
    className="date-input"
    type="text"
    id="invoice-date"
    value={invoiceDate}
    onChange={handleInvoiceDateChange}
    style={{
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "210px",
      height: "40px",
      backgroundColor: "white",
      color: invoiceDate ? "black" : "#aaa",
    }}
    placeholder="Search By Date"
    onFocus={(e) => (e.target.type = "date")}
    onBlur={(e) => (e.target.type = invoiceDate ? "date" : "text")}
  />
</div>
        <input
          className="search-input"
          type="text"
          name="nextMeetingDate"
          placeholder="Search by Next Meeting Date"
          value={searchFields.nextMeetingDate}
          onChange={(e) =>
            setSearchFields({
              ...searchFields,
              nextMeetingDate: e.target.value,
            })
          }
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#2b356bd3",
            color: "white",
            width: "150px",
          }}
        >
          Search
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>SI NO</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>State</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Contact Person</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Contact Number</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Remarks</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Next Meeting</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
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
                  <IconButton
                    className="small-icon-button"
                    onClick={(e) => handleClickMenu(e, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && currentRow?.siNo === row.siNo}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDelete(index)}>
                      Delete
                    </MenuItem>
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
        onSave={() => {
          // Implement save logic here
          setIsClientPopupOpen(false);
          // Optionally add a notification
          setNotifications((prev) => [
            ...prev,
            { id: prev.length + 1, message: "New client added.", read: false },
          ]);
        }}
      />
      <AddGreetingPopup
        open={isGreetingPopupOpen}
        onClose={() => setIsGreetingPopupOpen(false)}
        onSave={() => {
          // Implement save logic here
          setIsGreetingPopupOpen(false);
          // Optionally add a notification
          setNotifications((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              message: "Greeting mail sent.",
              read: false,
            },
          ]);
        }}
      />
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Marketing Analysis</DialogTitle>
        <DialogContent>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        <TextField
          label="Enter Customer Name"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Select Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField label="Select Category" variant="outlined" fullWidth />
        <TextField label="Enter State" variant="outlined" fullWidth />
        <TextField
          label="Enter Contact Name"
          variant="outlined"
          fullWidth
        />
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
        <DialogActions>
          <Button
            onClick={() => setOpenEditDialog(false)}
            sx={{
              color: 'white',
              backgroundColor: '#2b356bcb',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            sx={{
              color: 'white',
              backgroundColor: '#2b356bcb',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MarketAnalysis;
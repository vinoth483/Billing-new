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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../style/purchase.css";

const Purchase = () => {
  const initialData = [
    { siNo: 1, purchaseBill: "PB001", sellerName: "Seller A", category: "Electronics", hsn: "1234", gst: "18%", amount: 1000, bank: "Bank A" },
    { siNo: 2, purchaseBill: "PB002", sellerName: "Seller B", category: "Furniture", hsn: "5678", gst: "12%", amount: 2000, bank: "Bank B" },
    { siNo: 3, purchaseBill: "PB003", sellerName: "Seller C", category: "Stationery", hsn: "9101", gst: "5%", amount: 1500, bank: "Bank C" },
    { siNo: 4, purchaseBill: "PB004", sellerName: "Seller D", category: "Textiles", hsn: "1121", gst: "28%", amount: 3000, bank: "Bank D" },
  ];

  const [searchFields, setSearchFields] = useState({
    purchaseBill: "",
    sellerName: "",
    category: "",
    hsn: "",
    gst: "",
    amount: "",
    bank: "",
  });

  const [filteredData, setFilteredData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    siNo: "",
    purchaseBill: "",
    sellerName: "",
    category: "",
    hsn: "",
    gst: "",
    amount: "",
    bank: "",
  });

  const handleSearch = () => {
    const filtered = initialData.filter((row) => {
      const isMatch =
        (!searchFields.purchaseBill || row.purchaseBill.toLowerCase().includes(searchFields.purchaseBill.toLowerCase())) &&
        (!searchFields.sellerName || row.sellerName.toLowerCase().includes(searchFields.sellerName.toLowerCase())) &&
        (!searchFields.category || row.category.toLowerCase().includes(searchFields.category.toLowerCase())) &&
        (!searchFields.hsn || row.hsn.toString().includes(searchFields.hsn)) &&
        (!searchFields.gst || row.gst.toLowerCase().includes(searchFields.gst.toLowerCase())) &&
        (!searchFields.amount || row.amount.toString().includes(searchFields.amount)) &&
        (!searchFields.bank || row.bank.toLowerCase().includes(searchFields.bank.toLowerCase()));
      return isMatch;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchFields({
      purchaseBill: "",
      sellerName: "",
      category: "",
      hsn: "",
      gst: "",
      amount: "",
      bank: "",
    });
    setFilteredData(initialData);
  };

  const handleInputChange = (e) => {
    setSearchFields({
      ...searchFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPurchaseClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewPurchaseChange = (e) => {
    setNewPurchase({
      ...newPurchase,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavePurchase = () => {
    const newEntry = {
      ...newPurchase,
      siNo: filteredData.length + 1,
      amount: parseFloat(newPurchase.amount),
    };
    setFilteredData([...filteredData, newEntry]);
    setOpen(false);
    setNewPurchase({ siNo: "", purchaseBill: "", sellerName: "", category: "", hsn: "", gst: "", amount: "", bank: "" });
  };

  return (
    <div className="purchase">
      <h3>Purchases</h3>
      <div className="action-section">
        <div className="action-buttons">
          <label className="common-btn add-purchase-btn" onClick={handleAddPurchaseClick}>
            + Add Purchase
          </label>
          <button className="common-btn reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="search-buttons">
          <IconButton className="backspace-btn" onClick={handleReset} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <input
            className="search-input"
            type="text"
            name="purchaseBill"
            placeholder="Purchase Bill"
            value={searchFields.purchaseBill}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="sellerName"
            placeholder="Seller Name"
            value={searchFields.sellerName}
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
            name="hsn"
            placeholder="HSN"
            value={searchFields.hsn}
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
          <input
            className="search-input"
            type="text"
            name="amount"
            placeholder="Amount"
            value={searchFields.amount}
            onChange={handleInputChange}
          />
          <input
            className="search-input"
            type="text"
            name="bank"
            placeholder="Bank"
            value={searchFields.bank}
            onChange={handleInputChange}
          />
          <button className="main-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Purchase</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Purchase Bill" name="purchaseBill" value={newPurchase.purchaseBill} onChange={handleNewPurchaseChange} fullWidth />
          <TextField margin="dense" label="Seller Name" name="sellerName" value={newPurchase.sellerName} onChange={handleNewPurchaseChange} fullWidth />
          <TextField margin="dense" label="Category" name="category" value={newPurchase.category} onChange={handleNewPurchaseChange} fullWidth />
          <TextField margin="dense" label="HSN" name="hsn" value={newPurchase.hsn} onChange={handleNewPurchaseChange} fullWidth />
          <TextField margin="dense" label="GST" name="gst" value={newPurchase.gst} onChange={handleNewPurchaseChange} fullWidth />
          <TextField margin="dense" label="Amount" name="amount" value={newPurchase.amount} onChange={handleNewPurchaseChange} fullWidth />
          <TextField margin="dense" label="Bank" name="bank" value={newPurchase.bank} onChange={handleNewPurchaseChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>Cancel</Button>
          <Button onClick={handleSavePurchase}  sx={{
      color: 'black',
      '&:hover': {
        color: 'white',
      },
    }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div className="table-section">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SI NO</TableCell>
                <TableCell>Purchase Bill</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>HSN</TableCell>
                <TableCell>GST</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Bank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <TableRow key={row.siNo}>
                    <TableCell>{row.siNo}</TableCell>
                    <TableCell>{row.purchaseBill}</TableCell>
                    <TableCell>{row.sellerName}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.hsn}</TableCell>
                    <TableCell>{row.gst}</TableCell>
                    <TableCell align="right">${row.amount}</TableCell>
                    <TableCell>{row.bank}</TableCell>
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
      </div>
    </div>
  );
};

export default Purchase;

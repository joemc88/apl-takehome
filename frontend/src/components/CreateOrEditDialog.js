import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';


function CreateOrEditDialog({id, name, description, price, open, onClose, onSave }) {
	const [productName, setProductName] = useState(name);
  	const [productDescription, setProductDescription] = useState(description);
    const [productPrice, setProductPrice] = useState(price);

    let title = "Create Product";
    if (name !== ""){
  			title = "Edit Product";
    }

    const handleConfirmSave = () => {
	    // Handle delete action
	    onSave(productName, productDescription,productPrice);
	    onClose();
    };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}<hr/></DialogTitle>

      <DialogContent >
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop:"2%" }}>
       <TextField   
          id="outlined-required"
          label="Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <TextField    
          id="outlined-required"
          label="Description"
          multiline
          value={productDescription}
          onChange={e => setProductDescription(e.target.value)}
          sx={{height: 'auto', marginBottom: '16px' }}
        />
        <TextField
          id="outlined-required"
          label="Price"
          value={productPrice}
          onChange={e => setProductPrice(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateOrEditDialog;

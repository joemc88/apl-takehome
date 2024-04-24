import {React, useState,useContext } from 'react';
import {Delete as DeleteIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteDialog from './DeleteDialog';

import AuthContext from '../AuthContext';

export default function Deletebutton({id, name, updateListCallback}){
	const { sessionToken } = useContext(AuthContext);
	const apiUrl = process.env.REACT_APP_API_URL;
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
    	setDeleteDialogOpen(true);
  	};

  	const handleConfirmDelete = () => {
  		//delete to api here
  		fetch(apiUrl+`api/products/${id}/`, {
  			method: 'DELETE',
  			headers:{
    			'Authorization': `Token ${sessionToken}`
    		}
		})
  		.then(response => {
    		if (!response.ok) {
      			throw new Error('Failed to delete product');
    		}
  		})
  		.then(() => {
    		// Handle successful response
    		setDeleteDialogOpen(false);
    		updateListCallback();
  		})
  		.catch(error => {
    		// Handle error
    		console.error(error);
    		setDeleteDialogOpen(false);
  		});
  	};

	return (
		<>
		<Tooltip title="Delete Product">
			<IconButton onClick={handleDelete} aria-label="delete">
	          	<DeleteIcon />
	        </IconButton>
        </Tooltip>
        <DeleteDialog
        	name={name}
        	open={isDeleteDialogOpen}
        	onClose={() => setDeleteDialogOpen(false)}
        	onDelete={handleConfirmDelete}
      	/>
        </>
	);
}

import React, { useState,useContext } from 'react';
import {Edit as EditIcon} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CreateOrEditDialog from './CreateOrEditDialog';
import AuthContext from '../AuthContext';

export default function EditButton({id, name, description, price, updateListCallback}){
	const { sessionToken } = useContext(AuthContext);
	const apiUrl = process.env.REACT_APP_API_URL;
	const [isEditDialogOpen, setEditDialogOpen] = useState(false);
	
	const handleEdit = () => {
    	setEditDialogOpen(true);
  	};

  	const handleSave = (name, description, price) => {
  
  		let updateProductData = {
  			"name": name,
        	"description": description,
        	"price": price
  		}

  		//put to api here
  		fetch(apiUrl+`api/products/${id}/`, {
  			method: 'PUT', // or 'PATCH'
  			headers: {
    		'Content-Type': 'application/json',
    		'Authorization': `Token ${sessionToken}`
  		},
  		body: JSON.stringify(updateProductData),
		})
  		.then(response => response.json())
  		.then(data => {
    		// Handle successful response
    		setEditDialogOpen(false);
    		updateListCallback();
  		})
  		.catch(error => {
    		// Handle error
    		console.error(error);
    		setEditDialogOpen(false);
  		});
  	};

	return (
		<>
			<Tooltip title="Edit Product">
				<IconButton onClick={handleEdit} aria-label="edit">
	    	      	<EditIcon />
	        	</IconButton>
	        </Tooltip>
	        <CreateOrEditDialog
		    	id={id}
	        	name={name}
	        	description={description}
	        	price={price}
	        	open={isEditDialogOpen}
	        	onClose={() => setEditDialogOpen(false)}
	        	onSave={handleSave}
	      	/>
      	</>
	);
}

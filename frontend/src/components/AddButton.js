import React, { useState, useContext } from 'react';

import {Add as AddIcon} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { blue } from '@mui/material/colors';
import AuthContext from '../AuthContext';
import CreateOrEditDialog from './CreateOrEditDialog';

export default function AddButton({updateListCallback}){
	const [isAddDialogOpen, setAddDialogOpen] = useState(false);
	const { sessionToken } = useContext(AuthContext);
	const apiUrl = process.env.REACT_APP_API_URL;

	const handleAdd = () => {
    	setAddDialogOpen(true);
  	};

  	const handleSave = (name, description, price) => {
  		console.log()
  		let createProductData = {
  			"name": name,
        	"description": description,
        	"price": price
  		};


  		//post to api here
  		fetch(apiUrl+'api/products/', {
	  		method: 'POST',
	  		headers: {
	    		'Content-Type': 'application/json',
	    		'Authorization': `Token ${sessionToken}`
	  		},
	  		body: JSON.stringify(createProductData),
		})
  		.then(response => response.json())
  		.then(data => {
    		// Handle successful response
    		setAddDialogOpen(false);
    		updateListCallback();
  		})
  		.catch(error => {
    		// Handle error
    		console.error(error);
    		setAddDialogOpen(false);
  		});
  	};

	return (
		<>
		<Tooltip title="Add Product">
		    <IconButton onClick={handleAdd} aria-label="delete">
	          	<AddIcon 
	          		sx={{ 
		          		backgroundColor: blue[500],
		          	 	color:"#ffffff",borderRadius:10 
		          	}}
		        />
	        </IconButton>
	    </Tooltip>
	    <CreateOrEditDialog
	    	id=""
        	name=""
        	description=""
        	price=""
        	open={isAddDialogOpen}
        	onClose={() => setAddDialogOpen(false)}
        	onSave={handleSave}
      	/>
        </>
	);
}
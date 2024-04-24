import React, { useState, useEffect, useContext } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from '@mui/material/Grid';
import { TextField, Button, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import AuthContext from '../AuthContext';
import ProductRow from './ProductRow';
import AddButton from './AddButton';

import Title from './Title';

export default function Products(){
	const { sessionToken } = useContext(AuthContext);
	const apiUrl = process.env.REACT_APP_API_URL;
	const [products, setProducts] = useState([]);
	let [searchKeyword, setSearchKeyword] = useState("");

	const updateProductList =()=>{
		fetch(apiUrl+'api/products/searchProducts',{
    		method: 'POST', 
    		headers: {
    		'Content-Type': 'application/json',
    		'Authorization': `Token ${sessionToken}`
  			},
  			body: JSON.stringify({"keyword": searchKeyword}),
		})
      		.then(response => response.json())
      		.then(data => setProducts(data))
      		.catch(error => console.error('Error fetching products:', error));
	}

    useEffect(() => {
    	updateProductList();
  	},[]);

  	useEffect(() => {
    	updateProductList();
  	}, [searchKeyword]);

 	return (
 		<Grid item xs={12}>
    		<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
	    	<Title>Products</Title>
	    	
	        <Table size="small">
	        	<TableHead>
	          		<TableRow>
		            	<TableCell><strong>Id</strong></TableCell>
		            	<TableCell><strong>Product Name</strong></TableCell>
		            	<TableCell><strong>Description</strong></TableCell>
		            	<TableCell><strong>Price</strong></TableCell>
		            	<TableCell>
		            		<TextField
		            			label="Search"
		            			value={searchKeyword}
          						onChange={e => setSearchKeyword(e.target.value)}/>
          					</TableCell>
	          		</TableRow>
	        </TableHead>
	        <TableBody>
	            {products.map((row) => (
	            	<ProductRow 
		            	id={row.id}
		             	name={row.name}
		             	description={row.description}
		             	price={row.price}
		             	updateListCallback={()=>updateProductList()}
		            /> 
	            ))}
	            <TableRow>
	          	    <TableCell>
          				<AddButton updateListCallback={()=>updateProductList()}/> 
        			</TableCell>  	
        			<TableCell/>		
        			<TableCell/>		
        			<TableCell/>		
        			<TableCell/>		
	            </TableRow>
	        </TableBody>
	      </Table>
    	</Paper>
    </Grid>
     
  );
}
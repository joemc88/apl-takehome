import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';



export default function ProductRow(props){
	const {id, name, description, price, updateListCallback} = props;

	return(
		<TableRow key={id}>
	    	<TableCell>{id}</TableCell>
	    	<TableCell>{name}</TableCell>
	        <TableCell>{description}</TableCell>
	        <TableCell>${price}</TableCell>
			<TableCell>
	  			<EditButton id={id} name={name} description={description} price={price} updateListCallback={()=>updateListCallback()}/>        			
	  			<DeleteButton id={id} name={name} updateListCallback={()=>updateListCallback()}/>
			</TableCell>
	    </TableRow>
	);
	
}
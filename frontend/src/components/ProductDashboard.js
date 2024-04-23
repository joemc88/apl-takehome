import React, { useState, useEffect } from 'react';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Products from './Products';

export default function ProductDashboard(){

 return (
 	<Grid container spacing={1}>
		<Products/>
    </Grid>
   );
}
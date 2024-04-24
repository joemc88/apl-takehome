import {React, useState,useContext } from 'react';
import Grid from '@mui/material/Grid';
import Products from './Products';
import AuthContext from '../AuthContext';
import Login from './Login';

export default function ProductDashboard(){
    const { sessionToken } = useContext(AuthContext);
    if (sessionToken !== undefined && sessionToken !== null && sessionToken[0]!== undefined){
        return (
 	      <Grid container spacing={1}>

		      <Products sessionToken={sessionToken}/>
            </Grid>
        );
    }else{
        return (<Login/>);
    }
}
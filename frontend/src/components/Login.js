import React, { useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import { TextField, Button, Container } from '@mui/material';

function Login({sessionToken, setSessionToken}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);


  const handleLogin = () => {
    fetch(apiUrl+'api/products/login/', {
        method: 'POST',
        headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
     .then(response => {
    	if (response.ok) {
       		return response.json(); // Parse response JSON if status is OK
    	} else {
        	alert('Login failed');
        	return null
    	}
	})
	.then(data => {
      if (data != null){
        const sessionToken = data.token;
      login(sessionToken);
      }
    	
  	});}

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
      <h2>Login</h2>
      <TextField
        value={username}
        onChange={e => setUsername(e.target.value)}
        label="Username"
        variant="outlined"
        style={{ marginBottom: '16px' }}
      />
      <TextField
        value={password}
        onChange={e => setPassword(e.target.value)}
        label="Password"
        type="password"
        variant="outlined"
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
}

export default Login;

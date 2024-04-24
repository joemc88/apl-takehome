import { UserContext } from './providers/UserProvider';
import {
  React,
  useState,
  useContext
} from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export async function signIntoCloud (username, password){
  return await fetch(apiUrl+"auth/sign-in", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => {
      if (response.status== 200) {
        return response.json(); 
      }
       if (response.status== 401) {
        return "access denied"; 
      }
      throw response;
    }).catch((err) => {
      console.error(err);
    });
}

export async function signOutOfCloud (user){
  return await fetch(apiUrl+"auth/sign-out", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token '+user['apiToken']
      },
      body: JSON.stringify({
        apiToken: user['apiToken']
      })
    }).then((response) => {
      if (response.ok) {
        return response.json(); 
      }
      throw response;
    }).catch((err) => {
      console.error(err);
    });
}
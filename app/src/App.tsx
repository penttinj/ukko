import React from 'react';
import { Button } from "@mui/material"
import Grid from '@mui/material/Grid';
import logo from './logo.svg';
import './App.css';

function App(props: any) {
  console.log("props=", props)
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        Shoop
      </Grid>
      <Grid item xs={4}>
        Da
      </Grid>
      <Grid item xs={6}>
        Whoop
      </Grid>
      <Grid item xs={6}>
        Whoop
      </Grid>
    </Grid>
  );
}

export default App;

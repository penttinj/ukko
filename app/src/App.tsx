import React from 'react';
// import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import TestComp from './TestComp/TestComp';
import SensorCell from './SensorCell';
// import logo from './logo.svg';
import './App.css';

function App(props: any) {
    console.log('props=', props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <TestComp>
                    Shoop
                </TestComp>
            </Grid>
            <Grid item xs={12} md={4}>
                <TestComp>
                    Da
                </TestComp>
            </Grid>
            <Grid item xs={12} md={6}>
                <TestComp>
                    Whoop
                </TestComp>
            </Grid>
            <Grid item xs={12} md={6}>
                <SensorCell>
                    <a>Sup</a>
                </SensorCell>
            </Grid>
        </Grid>
    );
}

export default App;

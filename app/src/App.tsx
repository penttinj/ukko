import React from 'react';
// import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
// import TestComp from './TestComp/TestComp';
import SensorItem from './SensorCell';
// import logo from './logo.svg';
import './App.css';

function App(props: any) {
    console.log('props=', props);

    return (
        <Grid container height="100vh">
            <SensorItem item xs={12} md={8} padding={1}>
                <div style={{ height: '100%', background: 'SeaShell' }}>Здравствуй!</div>
            </SensorItem>
            <SensorItem item xs={12} md={4} padding={1}>
                Привет
            </SensorItem>
            <SensorItem item xs={12} md={6} padding={1}>
                Hello
            </SensorItem>
            <SensorItem item xs={12} md={6} padding={1}>
                Hi
            </SensorItem>
        </Grid>
    );
}

export default App;

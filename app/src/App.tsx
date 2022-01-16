import React, { useRef } from 'react';
// import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import SensorItem from './SensorCell';
// import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import TestComp from './TestComp/TestComp';

function App(props: any) {
    const data = useRef(1);
    console.log('props=', props);
    console.log('data=', data);

    return (
        <Grid container height="100vh">
            <SensorItem item xs={12} md={4} padding={1}>
                <div style={{ height: '100%', background: 'MediumAquaMarine' }}>Здравствуй! {data.current}</div>
            </SensorItem>
            <SensorItem item xs={12} md={4} padding={1}>
                <div style={{ height: '100%', background: 'MediumAquaMarine' }}>Здравствуй!</div>
            </SensorItem>
            <SensorItem item xs={12} md={4} padding={1}>
                <div style={{ height: '100%', background: 'MediumAquaMarine' }}>Здравствуй!</div>
            </SensorItem>
            <SensorItem item xs={12} md={4} padding={1}>
                <div style={{ height: '100%', background: 'MediumAquaMarine' }}>Здравствуй!</div>
            </SensorItem>
            <SensorItem item xs={12} md={4} padding={1}>
                <div style={{ height: '100%', background: 'MediumAquaMarine' }}>Здравствуй!
                    <TestComp>yo</TestComp>
                </div>
            </SensorItem>
            <SensorItem item xs={12} md={4} padding={1}>
                <div style={{ height: '100%', background: 'MediumAquaMarine' }}>Здравствssуй!<br/>
                    <Button onClick={() => {
                        data.current += 1;
                    }}>Toggle Data</Button>
                </div>
            </SensorItem>
        </Grid>
    );
}

export default App;

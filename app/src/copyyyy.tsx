import React from 'react';
import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import TestComp from './TestComp/TestComp';
import {SplitScreen} from './TestComp/SplitScreen';
import logo from './logo.svg';
import './App.css';

const LeftHandComp = () => <h1>Left!</h1>;

const RightHandComponent = () => <h2>Right!</h2>;

function App(props: any) {
    console.log('props=', props);

    return (
        <SplitScreen
            leftWeight={1}
            rightWeight={3}>
            <LeftHandComp />
            <RightHandComponent />
        </SplitScreen>
    );
}

export default App;

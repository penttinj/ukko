/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import GridItem from './GridItem';
// import logo from './logo.svg';
import './App.css';
import TestComp from './TestComp/TestComp';
import { Button, Card, Fab, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ResourceLoader } from './ResourceLoader';
import { Dht22Data } from './Dht22Data';

interface SensorData {
    Balkongen?: {
        current_day: number;
        feels_like: number;
        humidity: number;
        max: number;
        min: number;
        node_name: string;
        temperature: number;
    }
    updated?: Date;
}

const Background = styled('div')(({ theme }) => ({
    background: theme.palette.background.default,
}));

const Symbol = styled('span')(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.symbol.size,
    verticalAlign: 'text-top',
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: theme.item.radius,
}));

function App(props: any) {
    const apiUrl = 'http://192.168.31.4:5000/api/v1/sensors';
    const [data, setData]: [SensorData, any] = useState({});

    console.log('props=', props);

    return (
        <Background>
            <Grid
                container
                height="100vh"
            >
                <GridItem item xs={12} sm={3}>
                    <ResourceLoader resourceUrl={`${apiUrl}/balkongen`} resourceName="dht22">
                        <Dht22Data dht22={null}/>
                    </ResourceLoader>
                </GridItem>
                <GridItem item xs={12} sm={3}>
                </GridItem>
                <GridItem item xs={12} sm={6}>
                </GridItem>
                <GridItem item xs={12} sm={6}>
                </GridItem>
                <GridItem item xs={12} sm={3}>
                </GridItem>
                <GridItem item xs={12} sm={3}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </GridItem>
            </Grid>
        </Background>
    );
}

export default App;

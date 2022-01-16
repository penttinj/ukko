/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import GridItem from './GridItem';
// import logo from './logo.svg';
import './App.css';
import TestComp from './TestComp/TestComp';
import { Card, Fab, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

    const getSumData = async (url: string) => {
        const response = await fetch(`${url}`);
        const responseString = await response.text();
        const parsed: SensorData = JSON.parse(responseString);
        console.log('parsed json:', parsed);
        setData(parsed);
    };

    useEffect(() => {
        getSumData(apiUrl);
    }, []);

    console.log('props=', props);
    console.log('data=', data);

    return (
        <Grid
            container
            height="100vh"
            columnSpacing={3}
            rowGap={3}
            justifyContent="space-around"
        >
            <GridItem item xs={12} md={4}>
                <div>
                    Temperature is: {data?.updated === undefined
                        ? 'Waiting For Data...'
                        : data.Balkongen?.temperature}
                </div>
            </GridItem>
            <GridItem item xs={12} md={4}>
                <div>Line One</div><div>Line Two</div>
            </GridItem>
            <GridItem item xs={12} md={4}>
                <Card>Hi My name is Daisy!</Card>
            </GridItem>
            <GridItem item xs={12} md={4}>
                <Item>xs=8</Item>
            </GridItem>
            <GridItem item xs={12} md={4}>
                asdfasdf
            </GridItem>
            <GridItem item xs={12} md={4}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </GridItem>
        </Grid>
    );
}

export default App;

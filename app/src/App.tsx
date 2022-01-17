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
        <Background>
            <Grid
                container
                height="100vh"
            >
                <GridItem item xs={12} md={3}>
                    <Typography variant="body1">
                    Temperature is: {data?.updated === undefined
                            ? 'Waiting For Data...'
                            : <>
                                {data.Balkongen?.temperature}
                                <Symbol>°C</Symbol>
                            </>}
                    </Typography>
                </GridItem>
                <GridItem item xs={12} md={3}>
                    <div>Line One</div><div>Line Two</div>
                </GridItem>
                <GridItem item xs={12} md={6}>
                    <Paper>
                        Hi My name is Daisy!<br/>
                        <Button variant="contained" color="info">Pls click.</Button>
                    </Paper>
                </GridItem>
                <GridItem item xs={12} md={6}>
                    <Item>xs=8</Item>
                </GridItem>
                <GridItem item xs={12} md={3}>
                asdfasdf
                </GridItem>
                <GridItem item xs={12} md={3}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </GridItem>
            </Grid>
        </Background>
    );
}

export default App;

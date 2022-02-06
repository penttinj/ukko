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
import { Dht22 } from './Dht22';
import { Ds18 } from './Ds18';

type Resource = 'dht22' | 'ds18';
interface ISensorIdentifier {
    name: string;
    type: Resource;
}

const Background = styled('div')(({ theme }) => ({
    background: theme.palette.background.default,
}));

const Symbol = styled('span')(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.symbol.size,
    verticalAlign: 'text-top',
}));

function App(props: any) {
    const apiUrl = 'http://192.168.31.4:5000/api/v1/sensors';
    const [slot1, setSlot1] = useState<ISensorIdentifier>({ name: 'Balkongen', type: 'dht22' });
    const [slot2, setSlot2] = useState<ISensorIdentifier>({ name: 'Bastu', type: 'ds18' });
    const [slot3, setSlot3] = useState<ISensorIdentifier>({ name: 'Balkongen', type: 'dht22' });
    const [slot4, setSlot4] = useState<ISensorIdentifier>({ name: 'Bastu', type: 'ds18' });

    const renderResource = (resource: Resource) => {
        switch (resource) {
        case 'dht22':
            return <Dht22 dht22={null}/>;
        case 'ds18':
            return <Ds18 ds18={null}/>;
        default:
            return <p>Unrecognized sensor.</p>;
        }
    };

    console.log('props=', props);

    return (
        <Background>
            <Grid
                container
                height="100vh"
            >
                <GridItem item xs={12} sm={3}>
                    <ResourceLoader
                        resourceUrl={`${apiUrl}/${slot1.name}`}
                        resourceName={slot1.type}>
                        {renderResource(slot1.type)}
                    </ResourceLoader>
                </GridItem>
                <GridItem item xs={12} sm={3}>
                </GridItem>
                <GridItem item xs={12} sm={6}>
                </GridItem>
                <GridItem item xs={12} sm={6}>
                </GridItem>
                <GridItem item xs={12} sm={3}>
                    <ResourceLoader
                        resourceUrl={`${apiUrl}/${slot2.name}`}
                        resourceName={slot2.type}>
                        {renderResource(slot2.type)}
                    </ResourceLoader>
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

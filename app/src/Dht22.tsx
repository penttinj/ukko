/* eslint-disable no-negated-condition */
import { Typography } from '@mui/material';
import React from 'react';

interface IDht22 {
    name: string,
    humidity: number,
    temperature: number,
    min: number,
    max: number,
    updated: Date,
}

export const Dht22 = ({ dht22 }: { dht22: IDht22 | null }) => {
    const { temperature, humidity, max, min, name, updated } = dht22 || {};
    console.log(name, 'updated at', updated);
    return <>
        {dht22 ? <Typography>
            <h3>{name}</h3>
            {temperature}<br />
            {humidity}<br />
            {max}<br />
            {min}<br />
        </Typography > : <h3>Loading...</h3>}

    </>;
};

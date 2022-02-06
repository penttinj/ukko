import { Typography } from '@mui/material';
import React from 'react';

interface Dht22 {
    name: string,
    humidity: number,
    temperature: number,
    min: number,
    max: number,
    updated: Date,
}

export const Dht22Data = ({ dht22 }: { dht22: Dht22 | null }) => {
    const { temperature, humidity, max, min, name, updated } = dht22 || {};
    console.log(name, 'updated at', updated);
    return <>
        <Typography>
            <h3>{name}</h3>
            <li>
                <ul>{temperature}</ul>
                <ul>{humidity}</ul>
                <ul>{max}</ul>
                <ul>{min}</ul>
            </li>
        </Typography>
    </>;
};

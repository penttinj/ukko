import { Typography } from '@mui/material';
import React from 'react';

interface IDs18 {
    name: string,
    temperature: number,
    min: number,
    max: number,
    updated: Date,
}

export const Ds18 = ({ ds18 }: { ds18: IDs18 | null }) => {
    const { temperature, max, min, name, updated } = ds18 || {};
    console.log(name, 'updated at', updated);
    return <>
        {ds18 ? <Typography>
            <h3>{name}</h3>
            <li>
                <ul>{temperature}</ul>
                <ul>{max}</ul>
                <ul>{min}</ul>
            </li>
        </Typography> : <h3>Loading...</h3>}

    </>;
};

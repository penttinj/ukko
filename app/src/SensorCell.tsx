import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';

interface CellProps {
    // eslint-disable-next-line no-undef
    children: JSX.Element;
}

const Test = styled.div`
    color: black;
    background: #DB827B;
    width: 100%;
    height: 100%;
`;

export const GridItem = muiStyled(Grid)(({ theme }) => {
    console.log('theme=', theme);
    return ({
        background: '#DB827B',
        padding: theme.padding,
    });
});

export const SensorCell = (props: CellProps) => {
    console.log('Yeet', props.children);
    // const asdf = props.children;
    return (
        <Test />
    );
};

export default GridItem;

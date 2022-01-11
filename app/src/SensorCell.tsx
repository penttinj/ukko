import React from 'react';
// import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';

interface CellProps {
    // eslint-disable-next-line no-undef
    children: JSX.Element;
}

export const SensorCell = (props: CellProps) => {
    console.log('Yeet', props.children);
    return (
        <Paper sx={{textAlign: 'center'}}>
            <img src="https://i.imgur.com/MptlRRl.png" height="200"/> <br />
            Hello There.
        </Paper>
    );
};

export default SensorCell;

import React from 'react';
import styled from '@emotion/styled';
// import { Button } from '@mui/material';

const Test = styled.div`
    color: black;
    background: MediumAquaMarine;
    width: 100%;
    
`;
// https://www.designcise.com/web/tutorial/how-to-specify-types-for-
// destructured-object-properties-using-typescript
const TestComp = ({ children }: {children?: string}) => {
    console.log('children=', typeof children);
    return (
        <Test>
            {children}
        </Test>
    );
};

export default TestComp;

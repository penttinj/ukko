import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const Test = styled.div`
    color: black;
    background: MediumAquaMarine;
    width: 100%;
    height: 50vh;
`;
// https://www.designcise.com/web/tutorial/how-to-specify-types-for-
// destructured-object-properties-using-typescript
const TestComp = ({ children }: {children?: string}) => {
    const [data, setData] = useState(1);
    console.log('children=', typeof children);
    return (
        <Test>
            <Button onClick={() => setData(data + 1)}>Toggle Data</Button>
            {data}
        </Test>
    );
};

export default TestComp;

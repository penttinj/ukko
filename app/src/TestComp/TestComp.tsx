import React from 'react';
import styled from '@emotion/styled';

const Test = styled.div`
    color: black;
    background: MediumAquaMarine;
    width: 100%;
    height: 50vh;
`;

const TestComp = ({children}: {children: string}) => { // https://www.designcise.com/web/tutorial/how-to-specify-types-for-destructured-object-properties-using-typescript
    console.log('children=', typeof children);
    return (
        <Test>
            {children}<br />
        </Test>
    );
};

export default TestComp;

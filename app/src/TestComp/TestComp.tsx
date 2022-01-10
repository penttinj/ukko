import React from 'react';

const TestComp = (props: any) => {
    console.log(`yoyooy${4}`);
    return (
        <div>
            {props.children}
        </div>
    );
};

export default TestComp;

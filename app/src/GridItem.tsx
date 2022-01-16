import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export const GridItem = (props: any) => {
    const Item = styled(Grid)(({ theme }) =>
        ({
            foo: theme.item.padding,
        }),
    );

    const ContentWrapper = styled('div')(({ theme }) =>
        ({
            width: '100%',
            height: '100%',
            background: theme.item.background,
            borderRadius: theme.item.radius,
            textAlign: 'center',
        }),
    );
    console.log('GridItem: props=', props);
    console.log('TODO: Change ContentWrapper to a flexbox? No. The children should decide that');
    return <Item {...props}>
        <ContentWrapper>
            {props.children}
        </ContentWrapper>
    </Item>;
};

export default GridItem;

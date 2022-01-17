import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';

export const GridItem = (props: any) => {
    const Item = styled(Grid)(({ theme }) =>
        ({
            padding: theme.item.padding,
        }),
    );

    const ContentWrapper = styled(Card)(({ theme }) =>
        ({
            height: '100%',
            borderRadius: theme.item.radius,
            textAlign: 'center',
        }),
    );
    return <Item {...props}>
        <ContentWrapper>
            {props.children}
        </ContentWrapper>
    </Item>;
};

export default GridItem;
